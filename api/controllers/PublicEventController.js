"use strict";

const PublicEvent = require("../models/PublicEvent.js");
const Event = require("../models/Event.js");

exports.list_all_public_events = (req, res) => {
	PublicEvent.listEvents((err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.list_all_public_events_super_admin = (req, res) => {
	const uid = req.params.uid;
	PublicEvent.listEventsSuperAdmin(uid, (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};


exports.list_all_activated_public_events = (req, res) => {
	PublicEvent.listActiveEvents((err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.add_public_event = async (req, res) => {
	console.log("Adding public event")
	const newEvent = new Event(req.body);
	const public_event = new PublicEvent(req.body);

	try {
		await Event.addEvent(newEvent, (err, event) => {
			if (err) {
				res.send(err);
			} else {
				PublicEvent.addEvent(public_event, (p_err, p_event) => {
					if (p_err) {
						res.send(p_err);
					} else {
						res.send(event);
					}
				});
			}
		});
	} catch (err) {
		res.send(err);
	}
};

exports.activate_public_event = async (req, res) => {
    const public_event = new PublicEvent(req.body);

    try {
		await PublicEvent.activateEvent(public_event, (p_err, p_event) => {
			if (p_err) {
				res.send(p_err);
			} else {
				res.send(p_event);
			}
		});
	} catch (err) {
		res.send(err);
	}
};
