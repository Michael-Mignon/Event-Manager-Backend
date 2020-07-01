"use strict";

const Admin = require("../models/Admin.js");
const SuperAdmin = require("../models/SuperAdmin.js");

exports.get_all_users = (req, res) => {
	Admin.getAllUsers((err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.add_user = (req, res) => {
	const newUser = new Admin(req.body);
	Admin.addUser(newUser, (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};

exports.get_admin = (req, res) => {
	const uid = req.params.uid;
	Admin.getUser(uid, (err, admin) => {
		if (err) {
			res.send(err);
		} else {
			res.send(admin);
		}
	});
};

exports.get_super_admin = (req, res) => {
	const uid = req.params.uid;
	SuperAdmin.getUser(uid, (err, admin) => {
		if (err) {
			res.send(err);
		} else {
			res.send(admin);
		}
	});
};

exports.get_all_super_admins = (req, res) => {
	SuperAdmin.getAllUsers((err, admin) => {
		if (err) {
			res.send(err);
		} else {
			res.send(admin);
		}
	});
};

exports.add_super_admin = (req, res) => {
	const newUser = new SuperAdmin(req.body);
	SuperAdmin.addUser(newUser, (err, admin) => {
		if (err) {
			res.send(err);
		}
		res.send(admin);
	});
};

// exports.update_user = (req, res) => {
// 	Admin.updateUser(req.body, (err, event) => {
// 		if (err) {
// 			res.send(err);
// 		}
// 		res.send(event);
// 	});
// };

// exports.remove_user = (req, res) => {
// 	Admin.removeUser(req.body, (err, event) => {
// 		if (err) {
// 			res.send(err);
// 		}
// 		res.send(event);
// 	});
// };
