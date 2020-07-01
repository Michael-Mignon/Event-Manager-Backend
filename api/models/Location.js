'use strict';
var sql = require('./db.js');

// Location constructor
var Location = function(location) {
	this.lname = location.lname;
	this.address = location.address;
	this.lattitude = location.lattitude;
	this.longitude = location.longitude
}

Location.getLocation = (lname, result) => {
	sql.query("SELECT * FROM locations WHERE lname = ?", lname, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Location.findAllLocations = function(result) {
	sql.query("SELECT * FROM locations", function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Location.addLocation = function(newLocation, result) {
	sql.query("INSERT INTO locations SET ?", newLocation, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Location.updateLocation = function(newLocation, result) {
	sql.query("UPDATE locations SET ? WHERE lname = ?", newLocation, newLocation.lname, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Location.deleteLocation = function(location, result) {
	sql.query("DELETE FROM locations WHERE lname = ?", location.lname, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = Location;