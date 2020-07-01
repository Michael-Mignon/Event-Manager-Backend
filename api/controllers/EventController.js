"use strict";

const Event = require("../models/Event.js");

exports.get_event = (req, res) => {
	const eventId = req.params.eventId;
	Event.getEvent(eventId, (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.find_all_events = (req, res) => {
	Event.findAllEvents((err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.add_event = (req, res) => {
	console.log("Adding normal event");
	const newEvent = new Event(req.body);
	Event.addEvent(newEvent, (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.update_event = (req, res) => {
	Event.updateEvent(new Event(req.body), (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.remove_event = (req, res) => {
	Event.removeEvent(new Event(req.body), (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};
