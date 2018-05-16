const fs = require('fs');
const express = require('express');
const app = express();

let renderer;
app.get('/', (req, res, next) => {
	if (!renderer) {
		res.send('<p>Awaiting compilation...</p><script src="/reload/reload.js"></script>');
		return;
	}
	req.renderer = renderer;
	next();
});

if (process.env.NODE_ENV === 'production') {
	let bundle = fs.readFileSync('./dist/node.bundle.js', 'utf8');
	renderer = require('vue-server-renderer').createBundleRenderer(bundle);
}

module.exports = (server) => {
	if (process.env.NODE_ENV === 'development') {
		const reload = require('reload');
		const reloadServer = reload(server, app);
		require('./webpack-dev-middleware').init(app);
		require('./webpack-server-compiler').init((bundle) => {
			renderer = require('vue-server-renderer').createBundleRenderer(bundle);
			reloadServer.reload();
		});
	}

	return app;
};