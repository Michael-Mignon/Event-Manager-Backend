"use strict";

const RsoMembership = require("../models/RsoMembership.js");

exports.get_membership_by_uid = (req, res) => {
	const uid = req.params.uid;
	RsoMembership.findMembershipByUid(uid, (err, membership) => {
		if (err) {
			res.send(err);
		}
		res.send(membership);
	});
};

exports.get_membership_by_rso_id = (req, res) => {
	const rsoId = req.params.rsoId;
	RsoMembership.findMembershipByRsoId(rsoId, (err, membership) => {
		if (err) {
			res.send(err);
		}
		res.send(membership);
	});
};

exports.add_membership = (req, res) => {
	const newMembership = new RsoMembership(req.body);
	RsoMembership.addMembership(newMembership, (err, membership) => {
		if (err) {
			res.send(err);
		}
		res.send(membership);
	});
};

exports.remove_membership = (req, res) => {
	RsoMembership.removeMembership(
		new RsoMembership(req.body),
		(err, membership) => {
			if (err) {
				res.send(err);
			}
			res.send(membership);
		}
	);
};
