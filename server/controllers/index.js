const express = require('express');
const app = express();
const serializer = require('serialize-javascript');
const path = require('path');
const fs = require('fs');

const Event = require('../model/event');

app.use(require('body-parser').json());
app.use('/public', express.static(path.join(__dirname, '../../public')));

if (process.env.NODE_ENV === 'production') {
	app.use('/dist', express.static(path.join(__dirname, '../../dist')));
}

app.get('/', (req, res) => {
	const events = Event.all();

	let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
	req.renderer.renderToString({ events }, (err, html) => {
		res.send(template.replace('<!-- APP -->', `
            <script>
                var __INITIAL_STATE__ = {
                    events: ${serializer(events)}
                };
            </script>
            
            ${html}
        `));
	});
});

app.use(require('./events'));

module.exports = app;