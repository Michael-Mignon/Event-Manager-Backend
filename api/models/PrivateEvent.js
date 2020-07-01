"use strict";
var sql = require("./db.js");

// PrivateEvent constructor
var PrivateEvent = function(privateEvent) {
	this.eventId = privateEvent.eventId;
	this.adminUid = privateEvent.adminUid;
	this.superAdminUid = privateEvent.superAdminUid;
};

PrivateEvent.listEvents = (uid, result) => {
	sql.query(
		"SELECT e.* FROM privateEvents e, users u1, users u2 WHERE e.adminUid = u1.uid AND u1.universityId = u2.universityId AND u2.uid = ? AND e.superAdminUid IS NOT NULL",
		uid,
		(err, res) => {
			if (err) {
				result(null, err);
			}
			result(null, res);
		}
	);
};

PrivateEvent.listEventsSuperAdmin = (uid, result) => {
	sql.query(
		"SELECT e.* FROM privateEvents e, users u, universityProfiles p WHERE e.adminUid = u.uid AND u.universityId = p.universityId AND p.uid = ?",
		uid,
		(err, res) => {
			if (err) {
				result(null, err);
			}
			result(null, res);
		}
	);
};

PrivateEvent.listActiveEvents = result => {
	sql.query(
		"SELECT * FROM privateEvents WHERE superAdminUid IS NOT NULL",
		(err, res) => {
			if (err) {
				result(null, err);
			}
			result(null, res);
		}
	);
};

PrivateEvent.addEvent = (newEvent, result) => {
	sql.query("INSERT INTO privateEvents SET ?", newEvent, (err, res) => {
		if (err) {
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

PrivateEvent.activateEvent = (newEvent, result) => {
	sql.query(
		"UPDATE privateEvents SET superAdminUid = ? WHERE eventId = ?",
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

module.exports = PrivateEvent;
