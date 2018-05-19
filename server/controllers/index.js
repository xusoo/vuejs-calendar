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

const sendRenderedTemplateWithEvents = (req, res, events) => {
	const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
	req.renderer.renderToString({ events, url: req.url }, (err, html) => {
		res.send(template.replace(
			'<!-- APP -->',
			`<script> var __INITIAL_STATE__ = { events: ${serializer(events)} }; </script> ${html}`
		));
	});
};

app.get('/', async (req, res, next) => {
	try {
		let events = await Event.all();
		sendRenderedTemplateWithEvents(req, res, events);
	} catch (e) {
		next(e);
	}
});

app.use(require('./events'));

module.exports = app;