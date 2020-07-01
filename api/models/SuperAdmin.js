"use strict";
var sql = require("./db.js");

// SuperAdmin constructor
var SuperAdmin = function(superAdmin) {
	this.uid = superAdmin.uid;
};

SuperAdmin.getUser = function(uid, result) {
	sql.query("SELECT * FROM superAdmins WHERE uid = ?", [uid], function(
		err,
		res
	) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

SuperAdmin.getAllUsers = function(result) {
	sql.query("SELECT * FROM superAdmins", function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

SuperAdmin.addUser = function(newUser, result) {
	console.log("Adding super admin: ", newUser);
	sql.query("INSERT INTO superAdmins SET ?", newUser, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = SuperAdmin;
