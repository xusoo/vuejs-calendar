const express = require('express');
const app = express();

const Event = require('../model/event');

app.get('/events', async (req, res, next) => {
	try {
		res.send(await Event.all());
	} catch (e) {
		next(e);
	}
});

app.post('/events', async (req, res, next) => {
	try {
		res.send(await Event.add(req.body));
	} catch (e) {
		next(e);
	}
});

app.put('/events', async (req, res, next) => {
	try {
		const event = await Event.update(req.body);
		if (!event) {
			return res.sendStatus(404);
		}
		res.sendStatus(200);
	} catch (e) {
		next(e);
	}
});

app.delete('/events/:id', async (req, res, next) => {
	try {
		const event = await Event.delete(req.params.id);
		if (!event) {
			return res.sendStatus(404);
		}
		res.sendStatus(200);
	} catch (e) {
		next(e);
	}
});

module.exports = app;