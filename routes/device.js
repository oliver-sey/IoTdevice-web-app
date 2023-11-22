var express = require('express');
var router = express.Router();
var Device = require("../models/device");

/* Post a new device */
router.post('/register', (req, res) => {
    try {
      const newDevice = new Device({
        email: req.body.email,
        deviceName: req.body.deviceName,
        channelID: req.body.channelID,
        readAPI_Key: req.body.readAPI_Key
      })
      newDevice.save().then(result => {
        res.status(201).send(result)
        console.log("created", result)
      }).catch(err => {
        res.status(400).send({"error" : "email or password required"});
        console.log("register error", err)
      })
    }
    catch (err) {
      console.log("register device failed", err)
    }
  });

  module.exports = router;