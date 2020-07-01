"use strict";

const PrivateEvent = require("../models/PrivateEvent.js");
const Event = require("../models/Event.js");

exports.list_all_private_events = (req, res) => {
	const uid = req.params.uid;
	PrivateEvent.listEvents(uid, (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.list_all_private_events_super_admin = (req, res) => {
	const uid = req.params.uid;
	PrivateEvent.listEventsSuperAdmin(uid, (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.list_all_activated_private_events = (req, res) => {
	PrivateEvent.listActiveEvents((err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.add_private_event = async (req, res) => {
	const newEvent = new Event(req.body);
	const private_event = new PrivateEvent(req.body);

	try {
		await Event.addEvent(newEvent, (err, event) => {
			if (err) {
				res.send(err);
			} else {
				PrivateEvent.addEvent(private_event, (p_err, p_event) => {
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

exports.activate_private_event = async (req, res) => {
    const private_event = new PrivateEvent(req.body);

    try {
		await PrivateEvent.activateEvent(private_event, (p_err, p_event) => {
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
