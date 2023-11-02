const db = require("../db");

const RecordSchema = new db.Schema({
    zip: { type: Number },
    airQuality: { type: Number }
});

const Record = db.model("Record", RecordSchema);

module.exports = Record