
/*
	These routes are rooted to calls to /api/[api-route]
*/

// Cache references to other modules.
var express = require('express'),
	router = express.Router();

// Respond to GET requests.
router.get('/books', function (req, res) {
	res.send([
		{
			title: "The Moon is a Harsh Mistress",
			author: "Robert A. Heinlein",
			isbn: "0340837942"
		},
		{
			title: "The Forever War",
			author: "Joe Halderman",
			isbn: "0060510862"
		}
	]);
});

module.exports = router;