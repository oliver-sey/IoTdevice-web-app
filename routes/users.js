var express = require('express');
var router = express.Router();
var User = require("../models/users");

/* Get user account */
router.get('/user', (req, res) => {
  // console.log("req", req, JSON.parse(req))
  console.log("req", req.query.email, req.query.password)
  let Email = req.query.email
  User.findOne({email: Email, password: req.query.password}).then(result => {
    if (result !== null && result.length !== 0) {
      res.status(200).send(result)
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
/* Post user account */
router.post('/create', (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    })
    newUser.save().then(result => {
      res.status(201).send({"success" : result})
      console.log("created", result)
    }).catch(err => {
      res.status(400).send({"error" : "email or password required"});
      console.log("register error", err)
    })
  }
  catch (err) {
    console.log("signin failed", err)
  }
});

/* Patch user account */
router.patch('/update', (req, res) => {
  User.updateOne({email: req.body.email}, {$set: {password: req.body.password}}).then(result => {
    res.status(200).send({"success" : "user updated"})
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
