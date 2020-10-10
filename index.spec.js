const db = require('./database/dbConfig')
const registerUser = require('./auth/registerUser')

const request = require('supertest')
const server = require('./api/server')

const user = {
  username: 'frodo',
  password: 'baggins'
}

describe('server.js', () => {
  describe('/api/auth', () => {

    describe('/api/auth/login', () => {

      beforeEach(async () => {
        await db('users').truncate()
      });

      it('should retrieve a user and a token when passed valid credentials', async () => {

        await registerUser({ ...user })
        const response = await request(server)
          .post('/api/auth/login')
          .send(user)
        expect(response.body.id).toBeTruthy()
        expect(response.body.token).toBeTruthy()
      });
      it('should respond with an error if passed invalid credentials', async () => {
        const response = await request(server)
          .post('/api/auth/login')
          .send(user)

        expect(response.body.message).toBeTruthy()
      })
    });
    describe('/api/auth/register', () => {

    });
  });
  describe('/api/jokes', () => {

  });
});