"use strict";
var sql = require("./db.js");

// PublicEvent constructor
var PublicEvent = function(publicEvent) {
	this.eventId = publicEvent.eventId;
	this.adminUid = publicEvent.adminUid;
	this.superAdminUid = publicEvent.superAdminUid;
};

PublicEvent.listEvents = result => {
	sql.query("SELECT e.*, p.universityId, p.uname FROM publicEvents e, users u, universityProfiles p WHERE e.adminUid = u.uid AND u.universityId = p.universityId", (err, res) => {
		if (err) {
			result(null, err);
		}
		result(null, res);
	});
};

PublicEvent.listEventsSuperAdmin = (uid, result) => {
	sql.query("SELECT e.* FROM publicEvents e, users u, universityProfiles p WHERE e.adminUid = u.uid AND u.universityId = p.universityId AND p.uid = ?", uid, (err, res) => {
		if (err) {
			result(null, err);
		}
		result(null, res);
	});
};

PublicEvent.listActiveEvents = result => {
	sql.query(
		"SELECT e.*, p.universityId, p.uname FROM publicEvents e, users u, universityProfiles p WHERE e.adminUid = u.uid AND u.universityId = p.universityId AND e.superAdminUid IS NOT NULL",
		(err, res) => {
			if (err) {
				result(null, err);
			}
			result(null, res);
		}
	);
};

PublicEvent.addEvent = (newEvent, result) => {
	console.log("Adding public event");
	sql.query("INSERT INTO publicEvents SET ?", newEvent, (err, res) => {
		if (err) {
			console.log("err", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

PublicEvent.activateEvent = (newEvent, result) => {
	sql.query(
		"UPDATE publicEvents SET superAdminUid = ? WHERE eventId = ?",
		[newEvent.superAdminUid, newEvent.eventId],
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

module.exports = PublicEvent;
