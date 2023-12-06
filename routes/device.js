var express = require('express');
var router = express.Router();
var Device = require("../models/device");

// Get all device by user
router.get('/mydevices', (req, res) => {
  //console.log("mydevices request body", req)
  if (req.query.email) {
    Device.find({email: req.query.email}).then(result => {//make mongoose call to get all devices
      if (result !== null && result.length !== 0) {// if device found, send back the result
          res.status(200).send(result)
          console.log("get device", result)
      }
      else{
        res.status(404).send("no device found")// if no device found, send back 404 status code
      }
    })
    .catch(err => {
      res.status(400).send({"error" : "get devices failed"});
      console.log("get error", err)
    })
  }
  else if (req.query.deviceName) {// another way, use deviceName to find devices
    Device.find({deviceName: req.query.deviceName}).then(result => {
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
  }
})

/* Post a new device */
router.post('/register', (req, res) => {
    try {
      const newDevice = new Device({// use mongoose Model to create a new device
        email: req.body.email,
        deviceName: req.body.deviceName,
        channelID: req.body.channelID,
        readAPI_Key: req.body.readAPI_Key,
        register_Date: req.body.register_Date
      })
      newDevice.save().then(result => {//save in mongodb
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


router.delete('/delete', (req, res) => {//delete device
  try {
    Device.deleteOne({deviceName: req.body.deviceName}).then(result => {//use mongoose query to delete one device
      res.status(200).send(result)
      console.log("deleted", result)
    }).catch(err => {
      res.status(400).send({"error" : "delete failed"})
      console.log("delete failed", err)
    })
  }
  catch (err) {
    console.log("delete device failed", err)
  }
})

  module.exports = router;