require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const serializer = require('serialize-javascript');

app.use(require('body-parser').json());
app.use('/public', express.static(path.join(__dirname, 'public')));

const events = [];

let renderer;

if (process.env.NODE_ENV === 'production') {
    let bundle = fs.readFileSync('./dist/node.bundle.js', 'utf8');
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
    app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

app.get('/', (req, res) => {
    if (!renderer) {
        res.send('<p>Awaiting compilation...</p><script src="/reload/reload.js"></script>');
        return;
    }

    let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
    renderer.renderToString({ events }, (err, html) => {
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

app.get('/events', (req, res) => res.send(events));

app.post('/events', (req, res) => {
    events.push(req.body);
    res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
    const reload = require('reload');
    const reloadServer = reload(server, app);
    require('./webpack-dev-middleware').init(app);
    require('./webpack-server-compiler').init((bundle) => {
        renderer = require('vue-server-renderer').createBundleRenderer(bundle);
        reloadServer.reload();
    });
}

server.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
    if (process.env.NODE_ENV === 'development') {
        require("open")(`http://localhost:${process.env.PORT}`);
    }
});
