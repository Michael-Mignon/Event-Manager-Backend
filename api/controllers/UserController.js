"use strict";

var User = require("../models/User.js");

exports.get_user = (req, res) => {
	const uid = req.params.uid;
	User.getUser(uid, (err, user) => {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
};

exports.list_all_users = function(req, res) {
	User.findAllUsers(function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send(user);
	});
};

exports.add_new_user = function(req, res) {
	let newUser = new User(req.body);

	User.addUser(newUser, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
};

exports.update_user = function(req, res) {
	let newUser = new User(req.body);

	User.updateUser(newUser, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
};

exports.login = function(req, res) {
	let loginUser = new User(req.body);
	User.login(loginUser, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send(user);
	});
};
