"use strict";
var sql = require("./db.js");
const User = require("./User.js");

// Admin constructor
var Admin = function(admin) {
	this.uid = admin.uid;
};

Admin.getAllUsers = function(result) {
	sql.query("SELECT * FROM admins", function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Admin.getUser = (uid, result) => {
	sql.query("SELECT * FROM admins WHERE uid = ?", uid, (err, res) => {
		if (err) {
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Admin.addUser = (newUser, result) => {
	console.log("Adding admin: ", newUser);
	sql.query("INSERT INTO admins SET ?", newUser, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = Admin;
