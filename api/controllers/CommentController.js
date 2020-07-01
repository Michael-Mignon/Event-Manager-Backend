"use strict";

const Comment = require("../models/Comment.js");

exports.get_comments_by_uid = (req, res) => {
	const uid = req.params.uid;
	Comment.findCommentsByUid(uid, (err, comment) => {
		if (err) {
			res.send(err);
		}
		res.send(comment);
	});
};

exports.get_comments_by_event_id = (req, res) => {
	const eventId = req.params.eventId;
	Comment.findCommentsByEventId(eventId, (err, comment) => {
		if (err) {
			res.send(err);
		}
		res.send(comment);
	});
};

exports.add_comment = (req, res) => {
	const newComment = new Comment(req.body);
	Comment.addComment(newComment, (err, comment) => {
		if (err) {
			res.send(err);
		}
		res.send(comment);
	});
};

exports.update_comment = (req, res) => {
	Comment.updateComment(new Comment(req.body), (err, comment) => {
		if (err) {
			res.send(err);
		}
		res.send(comment);
	});
};

exports.remove_comment = (req, res) => {
	Comment.removeComment(new Comment(req.body), (err, comment) => {
		if (err) {
			res.send(err);
		}
		res.send(comment);
	});
};
