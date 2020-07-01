"use strict";
var sql = require("./db.js");

// University constructor
var University = function(university) {
	this.universityId = university.universityId;
	this.uname = university.uname;
	this.description = university.description;
	this.numStudents = university.numStudents;
	this.lname = university.lname;
	this.uid = university.uid;
};

University.getUniversity = (universityId, result) => {
	sql.query(
		"SELECT * FROM universityProfiles WHERE universityId = ?",
		universityId,
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

University.findAllUniversities = result => {
	sql.query("SELECT * FROM universityProfiles", function(err, res) {
		if (err) {
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

University.addUniversity = function(newUniversity, result) {
	console.log(newUniversity);
	sql.query("INSERT INTO universityProfiles SET ?", newUniversity, function(
		err,
		res
	) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, newUniversity);
		}
	});
};

University.updateUniversity = (currentUniversity, result) => {
	console.log("Updating ", currentUniversity);

	sql.query(
		"UPDATE universityProfiles SET ? WHERE universityId = ?",
		[currentUniversity, currentUniversity.universityId],
		(err, res) => {
			if (err) {
				console.log("err: ", err);
				result(null, err);
			} else {
				result(null, currentUniversity);
			}
		}
	);
};

University.removeUniversity = (currentUniversity, result) => {
	sql.query(
		"DELETE FROM universityProfiles WHERE universityId = ?",
		currentUniversity.universityId,
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, currentUniversity);
			}
		}
	);
};

module.exports = University;
