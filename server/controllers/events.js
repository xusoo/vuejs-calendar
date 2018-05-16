const express = require('express');
const app = express();

const Event = require('../model/event');

app.get('/events', (req, res) => res.send(Event.all()));

app.post('/events', (req, res) => {
	try {
		res.send(Event.add(req.body));
	} catch (e) {
		console.error(e);
		res.sendStatus(409); // Conflict, already exists
	}
});

app.put('/events', (req, res) => {
	try {
		Event.update(req.body);
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.sendStatus(404);
	}
});

app.delete('/events/:id', (req, res) => {
	try {
		Event.delete(parseInt(req.params.id));
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.sendStatus(404);
	}
});

module.exports = app;