const express = require("express"),
	app = express(),
	bodyParser = require("body-parser");
port = process.env.PORT || 3000;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/Routes");
routes(app);
