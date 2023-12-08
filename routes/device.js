var express = require('express');
var router = express.Router();
var Device = require("../models/device");

// Route to get all devices associated with a user
router.get('/mydevices', (req, res) => {
  // Check if email is provided in query parameters
  if (req.query.email) {
    // MongoDB query using Mongoose to find devices by email
    Device.find({email: req.query.email}).then(result => {
      // If devices are found, send them back in the response
      if (result !== null && result.length !== 0) {
          res.status(200).send(result)
          console.log("get device", result)
      }
      else{
        // If no devices are found, send a 404 status code
        res.status(404).send("no device found")
      }
    })
    .catch(err => {
      // Send a 400 status code if there's an error in fetching devices
      res.status(400).send({"error" : "get devices failed"});
      console.log("get error", err)
    })
  }
  else if (req.query.deviceName) {
    // Fetch devices by deviceName if provided in the query parameters
    Device.find({deviceName: req.query.deviceName}).then(result => {
        // Sending back found devices or 404 if none are found
        if (result !== null && result.length !== 0) {
            res.status(200).send(result)
            console.log("get device", result)
        }
        else{
          res.status(404).send("no device found")
        }
    })
    .catch(err => {
        // Error handling for fetching devices
        res.status(400).send({"error" : "get devices failed"});
        console.log("get error", err)
    })
  }
})

// Route to post/register a new device
router.post('/register', (req, res) => {
    try {
      // Creating a new device using the Device model and request body
      const newDevice = new Device({
        email: req.body.email,
        deviceName: req.body.deviceName,
        channelID: req.body.channelID,
        readAPI_Key: req.body.readAPI_Key,
        register_Date: req.body.register_Date
      })
      // Saving the new device to MongoDB
      newDevice.save().then(result => {
        res.status(201).send(result)
        console.log("created", result)
      }).catch(err => {
        // Error handling for device registration
        res.status(400).send({"error" : "email or password required"});
        console.log("register error", err)
      })
    }
    catch (err) {
      console.log("register device failed", err)
    }
  });

// Route to delete a device
router.delete('/delete', (req, res) => {
  try {
    // MongoDB query to delete a device based on deviceName
    Device.deleteOne({deviceName: req.body.deviceName}).then(result => {
      res.status(200).send(result)
      console.log("deleted", result)
    }).catch(err => {
      // Error handling for device deletion
      res.status(400).send({"error" : "delete failed"})
      console.log("delete failed", err)
    })
  }
  catch (err) {
    console.log("delete device failed", err)
  }
})

// Export the router module for use in the main app
module.exports = router;
