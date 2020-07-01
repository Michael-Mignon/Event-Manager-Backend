"use strict";
const sql = require("./db.js");

// RsoEvent constructor
var RsoEvent = function(rsoEvent) {
	this.eventId = rsoEvent.eventId;
	this.rsoId = rsoEvent.rsoId;
};

RsoEvent.listEvents = result => {
	sql.query("SELECT * FROM rsoEvents", (err, res) => {
		if (err) {
			result(null, err);
		}
		result(null, res);
	});
};

RsoEvent.addEvent = (newEvent, result) => {
	sql.query("INSERT INTO rsoEvents SET ?", newEvent, (err, res) => {
		if (err) {
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

RsoEvent.updateEvent = () => {};
RsoEvent.removeEvent = () => {};

module.exports = RsoEvent;
