"use strict";
module.exports = function(app) {
	var userController = require("../controllers/UserController");
	var universityController = require("../controllers/UniversityController");
	var rsoController = require("../controllers/RSOController");
	var locationController = require("../controllers/LocationController");
	var eventController = require("../controllers/EventController");
	const rso_event_controller = require("../controllers/RSOEventController");
	const private_event_controller = require("../controllers/PrivateEventController");
	const public_event_controller = require("../controllers/PublicEventController");
	const admin_controller = require("../controllers/AdminController");
	const comment_controller = require("../controllers/CommentController");
	const rso_membership_controller = require("../controllers/RsoMembershipController");

	// Routes
	app.route("/user")
		.get(userController.list_all_users)
		.post(userController.add_new_user)
		.put(userController.update_user);

	app.route("/user/:uid").get(userController.get_user);

	app.route("/login").post(userController.login);

	app.route("/university")
		.get(universityController.list_all_universities)
		.post(universityController.registerUniversity)
		.put(universityController.update_university)
		.delete(universityController.remove_university);

	app.route("/university/:universityId").get(
		universityController.get_university
	);

	app.route("/rso")
		.get(rsoController.find_all_rsos)
		.post(rsoController.register_rso)
		.delete(rsoController.remove_rso);
	
	app.route("/rso/:emailDomain")
		.get(rsoController.find_joinable_rsos);

	app.route("/rso/admin/:uid")
		.get(rsoController.find_rsos_by_admin);

	app.route("/location")
		.get(locationController.list_all_locations)
		.post(locationController.add_new_location)
		.put(locationController.update_location)
		.delete(locationController.remove_location);

	app.route("/location/:lname").get(locationController.get_location);

	app.route("/event")
		.get(eventController.find_all_events)
		.post(eventController.add_event)
		.put(eventController.update_event)
		.delete(eventController.remove_event);

	app.route("/event/:eventId").get(eventController.get_event);

	app.route("/rso_event")
		.get(rso_event_controller.list_all_rso_events)
		.post(rso_event_controller.add_rso_event);

	app.route("/private_event")
		//.get(private_event_controller.list_all_private_events)
		.post(private_event_controller.add_private_event);

	app.route("/private_event/:uid")
		.get(private_event_controller.list_all_private_events);

	app.route("/private_event/superadmin/:uid")
		.get(private_event_controller.list_all_private_events_super_admin);

	app.route("/private_event/activate")
		.get(private_event_controller.list_all_activated_private_events)
		.post(private_event_controller.activate_private_event);

	app.route("/public_event")
		.get(public_event_controller.list_all_public_events)
		.post(public_event_controller.add_public_event);

	app.route("/public_event/activate")
		.get(public_event_controller.list_all_activated_public_events)
		.post(public_event_controller.activate_public_event);

	app.route("/public_event/superadmin/:uid")
		.get(public_event_controller.list_all_public_events_super_admin);

	app.route("/admin")
		.get(admin_controller.get_all_users)
		.post(admin_controller.add_user);

	app.route("/superadmin")
		.get(admin_controller.get_all_super_admins)
		.post(admin_controller.add_super_admin);

	app.route("/superadmin/:uid").get(admin_controller.get_super_admin);

	app.route("/comment")
		.post(comment_controller.add_comment)
		.put(comment_controller.update_comment)
		.delete(comment_controller.remove_comment);

	app.route("/comment/user/:uid").get(comment_controller.get_comments_by_uid);

	app.route("/comment/event/:eventId").get(
		comment_controller.get_comments_by_event_id
	);

	app.route("/rsomembership")
		.post(rso_membership_controller.add_membership)
		.delete(rso_membership_controller.remove_membership);

	app.route("/rsomembership/user/:uid").get(
		rso_membership_controller.get_membership_by_uid
	);

	app.route("/rsomembership/rso/:rsoId").get(
		rso_membership_controller.get_membership_by_rso_id
	);

	app.route("/admin/:uid").get(admin_controller.get_admin);
};
