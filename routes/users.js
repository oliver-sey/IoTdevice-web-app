var express = require('express');
var router = express.Router();
var User = require("../models/users");
const jwt = require("jwt-simple");
const secret = "1z98AJf901JZAa"
const bcrypt = require("bcryptjs");
const salt = "oihweoif" // Salt used for hashing passwords

/* Get user account (Login) */
router.post('/user', (req, res) => {
  // Find one user by email in MongoDB
  User.findOne({email: req.body.email}).then(result => {
    console.log("result", result)
    // Check if user exists and password matches the hashed password in the database
    if (result !== null && result.length !== 0 && bcrypt.compareSync(req.body.password + salt, result.password)) {
        // Encode a JWT token and send it back to the user
        const jwtString = jwt.encode({email:req.body.email}, secret);
        res.status(200).send({result: result, jwt: jwtString})
        console.log("get", result)
    }
    else{
      // Send error response if login fails
      res.status(404).send({"error" : "get user failed"})
    }
  }).catch(err => {
    // Error handling for database operation
    res.status(400).send({"error" : "get user failed"});
    console.log("get error", err)
  })
})

/* Post user account (create account)*/
router.post('/create', (req, res) => {
  console.log("create account")
  // Hash the user's password
  const encryptedPassword = bcrypt.hashSync(req.body.password + salt, 10)
  console.log("hash password", encryptedPassword)
  try {
    // Create a new User model instance with encrypted password
    const newUser = new User({
      email: req.body.email,
      password: encryptedPassword,
      userName: req.body.userName
    })
    // Save the new user info into MongoDB
    newUser.save().then(result => {
      res.status(201).send({"success" : result})
      console.log("created", result)
    }).catch(err => {
      // Error handling for user creation
      res.status(400).send({"error" : "email or password required"});
      console.log("create account fail", err)
    })
  }
  catch (err) {
    console.log("create account failed", err)
  }
});

/* Patch user account */
router.patch('/update', (req, res) => {
  // Hash the new password provided by the user
  const encryptedPassword = bcrypt.hashSync(req.body.password + salt, 10)
  console.log("hash password", encryptedPassword)
  // Update user info in MongoDB
  User.updateOne({email: req.body.email}, {password: encryptedPassword, userName: req.body.userName}).then(result => {
    res.status(200).send(result) // Send success response
    console.log("updated", result)
  }).catch(err => {
    // Error handling for user update
    res.status(400).send({"error" : "update failed"});
    console.log("update error", err)
  })
})

/* Delete user account */
router.delete('/delete', (req, res) => {
  // Delete a user by email from MongoDB
  User.deleteOne({email: req.body.email}).then(result => {
    res.status(200).send({"success" : "user deleted"})
    console.log("deleted", result)
  }).catch(err => {
    // Error handling for user deletion
    res.status(400).send({"error" : "delete failed"});
    console.log("delete error", err)
  })
})

// Export the router to be used in other parts of the application
module.exports = router;
