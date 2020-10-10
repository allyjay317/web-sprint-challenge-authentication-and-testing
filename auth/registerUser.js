const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../database/dbConfig')

module.exports = {
  async function(user) {
    const hashed = bcrypt.hashSync(user.password, 10)
    user.password = hashed
    const newUser = await db.insertUser(user)
    const token = generateToken(newUser)
    return { ...newUser, token }
  }
}