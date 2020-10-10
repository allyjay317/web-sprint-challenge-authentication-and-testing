const router = require('express').Router();
const bcrypt = require('bcrypt')
const db = require('./auth-model')

const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  // implement registration
  try {
    const user = req.body
    const hashed = bcrypt.hashSync(user.password, 10)
    user.password = hashed
    const newUser = await db.insertUser(user)
    const token = generateToken(newUser)

    res.status(201).json({ ...newUser, token })
  }
  catch (err) {
    res.status(500).json({ message: 'user not created', error: err })
  }
});

router.post('/login', async (req, res) => {
  // implement login
  try {
    const { username, password } = req.body
    const user = await db.getUserByUsername(username)
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({ ...user, token })
    }
    else {
      res.status(403).json({ message: 'Sorry, we could not find a user with that username and password' })
    }

  }
  catch (err) {
    res.status(500).json({ message: 'Could not log in', error: err })
  }
});



function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const secret = process.env.JWT_SECRET || 'it\'s a secret to everyone'

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;
