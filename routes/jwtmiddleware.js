// Importing the jwt-simple module for handling JWT tokens
const jwt = require('jwt-simple');

// Secret key for decoding the JWT
const secret = "1z98AJf901JZAa"

// Middleware function to verify the incoming JWT token
function verifyJWT(req, res, next) {
  // Log the incoming request headers for debugging
  console.log("verifyJWT req", req.headers)
  
  // Extract the token from the request headers
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  // If no token is present, return a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    // Attempt to decode the token using the secret key
    console.log("token", token)
    const decoded = jwt.decode(token, secret);

    // Attach the decoded token (user info) to the request object
    req.user = decoded;

    // Proceed to the next middleware function
    next();
  } catch (error) {
    // If token verification fails, return a 403 Forbidden status
    return res.status(403).json({ message: 'Failed to authenticate token.' });
  }
}

// Export the middleware function for use in other parts of the application
module.exports = verifyJWT;
