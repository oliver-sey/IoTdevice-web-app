const db = require("../db");

const deviceSchema = new db.Schema({
    email: { type: String },
    deviceName: { type: String },
    channelID: { type: String },
    readAPI_Key: { type: String },
    register_Date: { type: String}
});

const Device = db.model("Device", deviceSchema);

module.exports = Device