var express = require('express');
var router = express.Router();
var Record = require("../models/lab");

// router.get('/', (req, res) => {
    
//     res.status(200).send("Lab")
// })


router.get('/status', (req, res) => {
    try {
        if (isNaN(req.query.zip) || !req.query.zip){
            res.status(400).send({"error" : "a zip code is required."})
            console.log("Invalid zip")
            throw new TypeError("Invalid zip")
        }
        else{
            let queryZip = req.query.zip
            Record.find({zip: queryZip}).then(result => {
                if(result.length === 0) {
                    res.status(400).send({"error" : "Zip does not exist in the database."})
                    throw new TypeError("Zip does not exist in the database.")
                }
                else if (result.length === 1) {
                    res.status(200).send(result[0].airQuality.toFixed(2))
                    console.log("get zip status", queryZip, result[0].airQuality.toFixed(2))
                }
                else{
                    let sumAirQuality = 0;
                    for(let zip of result) {
                        sumAirQuality += zip.airQuality
                    }
                    res.status(200).send((sumAirQuality / result.length).toFixed(2))
                    console.log("get zip status", queryZip, (sumAirQuality / result.length).toFixed(2))
                }
            }).catch(err => {
                res.status(400).send({"error" : "a zip code is required."})
                console.log("get status error", err)
            })
        }
    }
    catch(err) {
        console.log("get status error(catch)", err)
    }
})

router.post('/register', (req, res) => {
    try{
        if (isNaN(req.body.zip)) {
            res.status(400).send({"error" : "zip and airQuality are required."});
            throw new TypeError("NaN")
        }
        else {
            const newRecord = new Record({
                zip: req.body.zip,
                airQuality: req.body.airQuality
            })
            newRecord.save().then(saveDoc => {
                res.status(201).send({"response" : "Data recorded."})
                console.log("saved", saveDoc)
            }).catch(err => {
                res.status(400).send({"error" : "zip and airQuality are required."});
                console.log("register error", err)
            })
        }
    }
    catch (err) {
        console.log("register error(catch)", err)
    }
})

module.exports = router