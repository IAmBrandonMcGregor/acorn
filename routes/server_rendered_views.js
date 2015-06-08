
/*
	These routes are rooted to calls to /[view-route]
*/

// Cache references to other modules.
var express = require('express'),
	router = express.Router(),
	path = require('path'),
	fs = require('fs');

// Serve the main index.html file. This is integral to bootstrapping our application.
router.get('/', function (req, res, next) {

	// read the contents of the Baseline CSS file and render them into the index view.
	fs.readFile('static/styles/css/baseline.css', function (err, css) {

		// pass any error to the default error handler...
		if (err) return next(new Error(err));

		// otherwise, render the css into the view and send it.
		res.render('index', {
			title: 'Acorn',
			baselineCSS: css
		});
	});
});

module.exports = router;