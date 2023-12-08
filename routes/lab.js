var express = require('express');
var router = express.Router();
var Record = require("../models/lab");

// Commented out GET route for the base URL
// router.get('/', (req, res) => {   
//     res.status(200).send("Lab")
// })

// Route to get the air quality status based on the provided ZIP code
router.get('/status', (req, res) => {
    try {
        // Validate if the ZIP code query parameter is present and is a number
        if (isNaN(req.query.zip) || !req.query.zip){
            res.status(400).send({"error" : "a zip code is required."})
            console.log("Invalid zip")
            throw new TypeError("Invalid zip")
        }
        else{
            let queryZip = req.query.zip
            // Find records in the database with the provided ZIP code
            Record.find({zip: queryZip}).then(result => {
                // Handling different scenarios based on the result
                if(result.length === 0) {
                    // Send error if no record exists for the ZIP code
                    res.status(400).send({"error" : "Zip does not exist in the database."})
                    throw new TypeError("Zip does not exist in the database.")
                }
                else if (result.length === 1) {
                    // Send the air quality if one record is found
                    res.status(200).send(result[0].airQuality.toFixed(2))
                    console.log("get zip status", queryZip, result[0].airQuality.toFixed(2))
                }
                else{
                    // Calculate average air quality if multiple records exist
                    let sumAirQuality = 0;
                    for(let zip of result) {
                        sumAirQuality += zip.airQuality
                    }
                    res.status(200).send((sumAirQuality / result.length).toFixed(2))
                    console.log("get zip status", queryZip, (sumAirQuality / result.length).toFixed(2))
                }
            }).catch(err => {
                // Error handling for database queries
                res.status(400).send({"error" : "a zip code is required."})
                console.log("get status error", err)
            })
        }
    }
    catch(err) {
        // Catch any errors in the try block
        console.log("get status error(catch)", err)
    }
})

// Route to register a new air quality record
router.post('/register', (req, res) => {
    try{
        // Validate the ZIP code in the request body
        if (isNaN(req.body.zip)) {
            res.status(400).send({"error" : "zip and airQuality are required."});
            throw new TypeError("NaN")
        }
        else {
            // Create a new record using the Record model
            const newRecord = new Record({
                zip: req.body.zip,
                airQuality: req.body.airQuality
            })
            // Save the new record to the database
            newRecord.save().then(saveDoc => {
                res.status(201).send({"response" : "Data recorded."})
                console.log("saved", saveDoc)
            }).catch(err => {
                // Error handling for database save operation
                res.status(400).send({"error" : "zip and airQuality are required."});
                console.log("register error", err)
            })
        }
    }
    catch (err) {
        // Catch any errors in the try block
        console.log("register error(catch)", err)
    }
})

// Export the router module for use in other parts of the application
module.exports = router;
