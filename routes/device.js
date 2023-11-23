var express = require('express');
var router = express.Router();
var Device = require("../models/device");

// Get all device by user
router.get('/mydevices', (req, res) => {
    Device.find({email: req.query.email}).then(result => {
        if (result !== null && result.length !== 0) {
            res.status(200).send(result)
            console.log("get device", result)
        }
        else{
          res.status(404).send("no device found")
        }
    })
    .catch(err => {
        res.status(400).send({"error" : "get devices failed"});
        console.log("get error", err)
    })
})

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