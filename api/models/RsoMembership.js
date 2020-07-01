'use strict';
var sql = require('./db.js');

// RsoMembership constructor
var RsoMembership = function(rsoMembership) {
	this.uid = rsoMembership.uid
	this.rsoId = rsoMembership.rsoId;
	this.since = rsoMembership.since;
}

RsoMembership.findMembershipByUid = (uid, result) => {
	sql.query("SELECT * FROM rsoMembership WHERE uid = ?", uid, (err, res) =>{
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

RsoMembership.findMembershipByRsoId = (rsoId, result) => {
	sql.query("SELECT * FROM rsoMembership WHERE rsoId = ?", rsoId, (err, res) =>{
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

RsoMembership.addMembership = (newMembership, result) => {
	sql.query("INSERT INTO rsoMembership VALUES (?, ?, NOW())", [newMembership.uid, newMembership.rsoId], (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, newMembership);
		}
	});
};

RsoMembership.removeMembership = (currentMembership, result) => {
	sql.query("DELETE FROM rsoMembership WHERE uid = ? AND rsoId = ?", [currentMembership.uid, currentMembership.rsoId], (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, currentMembership);
		}
	});
};

module.exports = RsoMembership;