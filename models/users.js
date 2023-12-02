const db = require("../db");

const userSchema = new db.Schema({
    email: { type: String },
    password: { type: String }
});

const User = db.model("User", userSchema);

module.exports = User