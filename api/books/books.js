
// Include external modules.
var express = require('express');

// Cache a reference to the application router.
var router = express.Router();

// Configure routing for this Books module.
router.get('/', function getAllBooks (req, res) {

	res.json([
		{
			title: 'The Lord Of The Rings',
			author: 'J.R.R. Tolkien'
		},
		{
			title: 'The Hitchhiker\'s Guide To The Galaxy',
			author: 'Douglas Adams'
		},
		{
			title: 'Ender\'s Game',
			author: 'Orsor Scott Card'
		},
		{
			title: 'The Dune Chronicles',
			author: 'Frank Herbert'
		},
		{
			title: 'Stranger In A Strange Land',
			author: 'Robert A. Heinlein'
		}
	]);

});

module.exports = router;