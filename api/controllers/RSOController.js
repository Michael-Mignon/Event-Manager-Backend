"use strict";

var RSO = require("../models/RSO.js");
var RsoMembership = require("../models/RsoMembership.js");
var Admin = require("../models/Admin.js");

exports.find_all_rsos = (req, res) => {
	RSO.findAllRSOs((err, rso) => {
		if (err) {
			res.send(err);
		}
		res.send(rso);
	});
};

exports.register_rso = (req, res) => {
	const rso = new RSO(req.body);
	let handleRSO = (err, regStudenOrg) => {
		if (err) {
			res.send(err);
		}

		RsoMembership.addMembership(
			new RsoMembership(regStudenOrg),
			(err, newMembership) => {
				if (err) {
					res.send(err);
				}
				res.json(regStudenOrg);
			}
		);
	};

	Admin.getUser(rso.uid, (err, user) => {
		if (err) {
			res.send(err);
		}

		if (user === undefined || user.length === 0) {
			Admin.addUser(new Admin(req.body), (err, newAdmin) => {
				if (err) {
					res.send(err);
				}
				RSO.addRSO(rso, handleRSO);
			});
		} else {
			RSO.addRSO(rso, handleRSO);
		}
	});
};

exports.remove_rso = (req, res) => {
	RSO.removeRSO(new RSO(req.body), (err, rso) => {
		if (err) {
			res.send(err);
		}
		res.send(rso);
	});
};

exports.find_joinable_rsos = (req, res) => {
	const emailDomain = req.params.emailDomain;
	RSO.findJoinableRSOs(emailDomain, (err, rsos) => {
		if (err) {
			res.send(err);
		}
		res.send(rsos);
	}) 
};

exports.find_rsos_by_admin = (req, res) => {
	const uid = req.params.uid;
	RSO.findRSOsByAdmin(uid, (err, rsos) => {
		if (err) {
			res.send(err);
		}
		res.send(rsos);
	});
};
