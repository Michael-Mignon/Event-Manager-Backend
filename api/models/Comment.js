"use strict";
var sql = require("./db.js");

// Comment constructor
var Comment = function(comment) {
	this.commentId = comment.commentId;
	this.uid = comment.uid;
	this.eventId = comment.eventId;
	this.text = comment.text;
	this.rating = comment.rating;
};

Comment.findCommentsByUid = (uid, result) => {
	sql.query("SELECT * FROM comments WHERE uid = ?", uid, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Comment.findCommentsByEventId = (eventId, result) => {
	sql.query(
		"SELECT * FROM comments WHERE eventId = ?",
		eventId,
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

Comment.addComment = (newComment, result) => {
	console.log(newComment);
	sql.query("INSERT INTO comments SET ?", newComment, function(err, res) {
		if (err) {
			console.log("Error: ", err);
			result(null, err);
		} else {
			result(null, newComment);
		}
	});
};

Comment.updateComment = (currentComment, result) => {
	console.log("Updating ", currentComment);
	sql.query(
		"UPDATE comments SET ? WHERE commentId = ?",
		[currentComment, currentComment.commentId],
		(err, res) => {
			if (err) {
				console.log("err: ", err);
				result(null, err);
			} else {
				result(null, currentComment);
			}
		}
	);
};

Comment.removeComment = (currentComment, result) => {
	sql.query(
		"DELETE FROM comments WHERE commentId = ?",
		[currentComment.commentId],
		(err, res) => {
			if (err) {
				result(null, err);
			} else {
				result(null, currentComment);
			}
		}
	);
};

module.exports = Comment;
