const router = require('express').Router();
const bcrypt = require('bcrypt')
const db = require('./auth-model')
const registerUser = require('./registerUser')

router.post('/register', async (req, res) => {
  // implement registration
  try {
    const user = req.body
    const newUser = await registerUser(user)

    res.status(201).json(newUser)
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
      res.status(200).json(user)
    }
    else {
      res.status(403).json({ message: 'Sorry, we could not find a user with that username and password' })
    }
  }
  catch (err) {
    res.status(500).json({ message: 'Could not log in', error: err })
  }
});

module.exports = router;
