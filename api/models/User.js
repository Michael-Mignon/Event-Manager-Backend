"use strict";
var sql = require("./db.js");

// User object constructor
var User = function(user) {
	console.log(user);
	this.uid = user.uid;
	this.password = user.password;
	this.emailDomain = user.emailDomain;
	this.universityId = user.universityId;
};

User.getUser = (uid, result) => {
	sql.query("SELECT * FROM users WHERE uid = ?", uid, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

User.findAllUsers = function(result) {
	sql.query("SELECT * FROM users", function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

User.addUser = function(newUser, result) {
	console.log("Adding User ", newUser);
	sql.query("INSERT INTO users SET ?", newUser, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, newUser);
		}
	});
};

User.updateUser = (updatedUser, result) => {
	console.log("Updating ", updatedUser);

	sql.query(
		"UPDATE users SET ? WHERE uid = ?",
		[updatedUser, updatedUser.uid],
		(err, res) => {
			if (err) {
				console.log("err: ", err);
				result(null, err);
			} else {
				result(null, updatedUser);
			}
		}
	);
};

User.login = function(user, result) {
	console.log("USER::::::::", user);
	sql.query(
		"SELECT * FROM users WHERE UID = ? AND password = ?",
		[user.uid, user.password],
		function(err, res) {
			if (err) {
				console.log("Error: ", err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

module.exports = User;
