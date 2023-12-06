// middleware for verifying incoming JWT tokens
const jwt = require('jwt-simple');
const secret = "1z98AJf901JZAa"

function verifyJWT(req, res, next) {//check if JWT approve
  console.log("verifyJWT req", req.headers)
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {// if token found, decode it and send it back to user
    console.log("token", token)
    const decoded = jwt.decode(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token.' });
  }
}

module.exports = verifyJWT;