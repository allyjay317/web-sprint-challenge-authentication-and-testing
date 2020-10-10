/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'it\'s a secret to everyone'

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, secret)
    req.decoded = decoded
    next()
  }
  catch (error) {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
