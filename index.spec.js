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

      it('should retrieve a user and a token when passed valid credentials', async () => {
        await db('users').truncate()
        await registerUser(user)
        const response = await request(server)
          .post('/api/auth/login')
          .send(user)

        expect(response.body.id).toBeTruthy()
        expect(response.body.token).toBeTruthy()
      });
    });
    describe('/api/auth/register', () => {

    });
  });
  describe('/api/jokes', () => {

  });
});