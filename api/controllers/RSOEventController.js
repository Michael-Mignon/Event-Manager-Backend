"use strict";

const RSOEvent = require("../models/RsoEvent.js");
const Event = require("../models/Event.js");

exports.list_all_rso_events = (req, res) => {
	RSOEvent.listEvents((err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.add_rso_event = async (req, res) => {
	const newEvent = new Event(req.body);
	const rso_event = new RSOEvent(req.body);

	try {
		await Event.addEvent(newEvent, (err, event) => {
			if (err) {
				res.send(err);
			} else {
				RSOEvent.addEvent(rso_event, (r_err, r_event) => {
					if (r_err) {
						res.send(r_err);
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

exports.update_rso_event = (req, res) => {};
exports.remove_rso_event = (req, res) => {};
