"use strict";
var sql = require("./db.js");

// RSO constructor
var RSO = function(rso) {
	this.rsoId = rso.rsoId;
	this.status = rso.status;
	this.uid = rso.uid;
};

RSO.findAllRSOs = result => {
	sql.query("SELECT * FROM rsos", (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

RSO.addRSO = function(newRSO, result) {
	console.log(newRSO);
	sql.query("INSERT INTO rsos SET ?", newRSO, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, newRSO);
		}
	});
};

RSO.removeRSO = (currentRSO, result) => {
	sql.query(
		"DELETE FROM rsos WHERE rsoId = ?",
		currentRSO.rsoId,
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, currentRSO);
			}
		}
	);
};

RSO.getAdminEmailDomain = (rsoId, result) => {
	sql.query(
		"SELECT u.emailDomain FROM rsos r, users u WHERE  r.rsoId = ? AND r.uid = u.uid",
		rsoId,
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

RSO.findJoinableRSOs = (emailDomain, result) => {
	sql.query(
		"SELECT r.* FROM rsos r, users u WHERE r.uid = u.uid AND u.emailDomain = ?",
		emailDomain,
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

RSO.findRSOsByAdmin = (uid, result) => {
	sql.query("SELECT * FROM rsos WHERE uid = ? AND status = 'active'", uid, (err, res) => {
		if (err) {
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = RSO;
