'use strict';

var University = require('../models/University.js');
var SuperAdmin = require('../models/SuperAdmin.js');

exports.get_university = (req, res) => {
	const universityId = req.params.universityId;
	University.getUniversity(universityId, (err, university) => {
		if (err) {
			res.send(err);
		}
		res.send(university);
	});
};

exports.list_all_universities = (req, res) => {
	University.findAllUniversities((err, university) => {
		if (err) {
			res.send(err);
		}
		res.send(university);
	});
};


exports.registerUniversity = function(req, res) {
	let uni = new University(req.body);
	let callback = function(err, university) {
		if (err) {
			res.send(err);
		}
		res.json(university);
	};

	SuperAdmin.getUser(uni.uid, function(err, user) {
		if (err) {
			res.send(err);
		}

		if (user === undefined || user.length === 0) {
			SuperAdmin.addUser(new SuperAdmin(uni), function(err, newSuperAdmin) {
				if (err) {
					res.send(err);
				}
				University.addUniversity(uni, callback);
			});
		} else {
			University.addUniversity(uni, callback);
		}
	});
};

exports.update_university = (req, res) => {
	University.updateUniversity(new University(req.body), (err, university) => {
		if (err) {
			res.send(err);
		}
		res.send(university);
	});
};

exports.remove_university = (req, res) => {
	University.removeUniversity(new University(req.body), (err, university) => {
		if (err) {
			res.send(err);
		}
		res.send(university);
	});
};