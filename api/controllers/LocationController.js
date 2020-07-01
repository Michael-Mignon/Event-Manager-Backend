'use strict';

var Location = require('../models/Location.js');

exports.get_location = (req, res) => {
	const lname = req.params.lname;
	Location.getLocation(lname, (err, location) => {
		if (err) {
			res.send(err);
		}
		res.send(location);
	});
}

exports.list_all_locations = function(req, res) {
	Location.findAllLocations(function(err, location) {
		if (err) {
			res.send(err);
		}
		res.send(location);
	});
};

exports.add_new_location = function(req, res) {
	let newLocation = new Location(req.body);
	Location.addLocation(newLocation, function(err, location) {
		if (err) {
			res.send(err);
		}
		res.json(location);
	});
};

exports.update_location = function(req, res) {
	let newLocation = new Location(req.body);
	Location.updateLocation(newLocation, function(err, location) {
		if (err) {
			res.send(err);
		}
		res.json(location);
	});
};

exports.remove_location = (req, res) => {
	Event.removeEvent(new Location(req.body), (err, event) => {
		if (err) {
			res.send(err);
		}
		res.send(event);
	});
};