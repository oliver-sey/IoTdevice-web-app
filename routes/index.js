var express = require('express');
var router = express.Router();
var path = require('path');

// Define a route for the GET request to the home page
router.get('/', function(req, res, next) {
  // Send the 'signin.html' file as the response
  // The path is constructed to locate the 'signin.html' file in the 'public' directory
  res.sendFile(path.join(__dirname, '..', 'public', 'signin.html'));
});

// Export the router to be used in other parts of the application
module.exports = router;
