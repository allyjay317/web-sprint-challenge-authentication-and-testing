const knex = require('knex')
const db = require('../database/dbConfig')

function getUsers() {
  return db('users')
}

function getUserByUsername(username) {
  return db('users').where({ username }).first()
}

async function insertUser(user) {
  const index = await db('users')
    .insert(user)
  return getUserByUsername(user.username)
}


module.exports = {
  getUsers,
  getUserByUsername,
  insertUser
}