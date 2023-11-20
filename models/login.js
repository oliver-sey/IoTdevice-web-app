const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require("jwt-simple");
const saltRounds = 10;

const secret = "hahahzlkjxi"


async function authenticate(username, password){
    // get password hash from database

    // add mongo call here


      if (result.length > 0) {
        // verify it matches, if it does return JWT
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, result[0].password_hash, function(err, compareResult) {
                if (err) {
                    // Handle bcrypt error
                    reject(err);
                } else if (compareResult) {
                    // Passwords match, create JWT
                    const jwtString = jwt.encode({ username: username }, secret);
                    resolve(jwtString);
                } else {
                    // Passwords do not match
                    reject(new Error('Authentication failed'));
                }
            });
        });
    } else {
        throw new Error('User not found');
    }
}

module.exports = {
    authenticate
  }