"use strict";
var sql = require("./db.js");

// Event constructor
var Event = function(event) {
	this.eventId = event.eventId;
	this.startTime = event.startTime;
	this.endTime = event.endTime;
	this.description = event.description;
	this.eventName = event.eventName;
	this.category = event.category;
	this.lname = event.lname;
	this.contactEmail = event.contactEmail;
	this.contactPhone = event.contactPhone;
};

Event.getEvent = (eventId, result) => {
	sql.query("SELECT * FROM events WHERE eventId = ?", eventId, (err, res) => {
		if (err) {
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Event.findAllEvents = result => {
	sql.query("SELECT * FROM events", function(err, res) {
		if (err) {
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Event.addEvent = (newEvent, result) => {
	console.log("are we even here? ", newEvent);
	sql.query("SELECT * FROM events e WHERE lname = ? AND ((e.startTime <= ? AND e.endTime > ?) OR (e.startTime < ? AND e.endTime >= ?))", [newEvent.lname, newEvent.startTime, newEvent.startTime, newEvent.endTime, newEvent.endTime], (err, res) => {
		console.log("res", res);
		console.log("list length", res.length);
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else if (res.length !== 0) {
			result(null, res);
		} else {
			sql.query("INSERT INTO events SET ?", newEvent, (err, res) => {
				if (err) {
					console.log("Error: ", err);
					result(null, err);
				} else {
					result(null, newEvent);
				}
			});
		}
	})
};

Event.updateEvent = (currentEvent, result) => {
	console.log("Updating ", currentEvent);
	sql.query(
		"UPDATE events SET ? WHERE eventId = ?",
		[currentEvent, currentEvent.eventId],
		(err, res) => {
			if (err) {
				console.log("err: ", err);
				result(null, err);
			} else {
				result(null, currentEvent);
			}
		}
	);
};

Event.removeEvent = (currentEvent, result) => {
	sql.query(
		"DELETE FROM events WHERE eventId = ?",
		currentEvent.eventId,
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, currentEvent);
			}
		}
	);
};

module.exports = Event;
