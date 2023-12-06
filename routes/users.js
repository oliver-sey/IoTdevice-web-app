var express = require('express');
var router = express.Router();
var User = require("../models/users");
const jwt = require("jwt-simple");
const secret = "1z98AJf901JZAa"
const bcrypt = require("bcryptjs");
const salt = "oihweoif"//use for salted hashing password


/* Get user account(Login) */
router.post('/user', (req, res) => {
  User.findOne({email: req.body.email}).then(result => {//find one user info in mongodb
    console.log("result", result)
    if (result !== null && result.length !== 0 && bcrypt.compareSync(req.body.password + salt, result.password)) {//check if password matches the hashed password inside the database
        // add JWT token calculation
        const jwtString = jwt.encode({email:req.body.email}, secret);//send back teh JWT token
        res.status(200).send({result: result, jwt: jwtString})
        console.log("get", result)
    }
    else{
      res.status(404).send({"error" : "get user failed"})
    }
  }).catch(err => {
    res.status(400).send({"error" : "get user failed"});
    console.log("get error", err)
  })
})
/* Post user account (create account)*/
router.post('/create', (req, res) => {
  console.log("create account")
  const encryptedPassword = bcrypt.hashSync(req.body.password + salt, 10)//hash the user password
  console.log("hash password", encryptedPassword)
  try {
    const newUser = new User({//create User Model with encrypted password
      email: req.body.email,
      password: encryptedPassword,
      userName: req.body.userName
    })
    newUser.save().then(result => {//save that new user info into mongodb
      res.status(201).send({"success" : result})
      console.log("created", result)
    }).catch(err => {
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
  const encryptedPassword = bcrypt.hashSync(req.body.password + salt, 10)//hash the user password
  console.log("hash password", encryptedPassword)
  User.updateOne({email: req.body.email}, {password: encryptedPassword, userName: req.body.userName}).then(result => {//update new user info from user input
    res.status(200).send(result)//if success, send back the result
      console.log("updated", result)
  }).catch(err => {
    res.status(400).send({"error" : "update failed"});
    console.log("update error", err)
  })
})

/* Delete user account */
router.delete('/delete', (req, res) => {
  User.deleteOne({email: req.body.email}).then(result => {
    res.status(200).send({"success" : "user deleted"})
      console.log("deleted", result)
  }).catch(err => {
    res.status(400).send({"error" : "delete failed"});
    console.log("delete error", err)
  })
})

module.exports = router;
