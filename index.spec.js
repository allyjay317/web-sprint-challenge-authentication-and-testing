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
    beforeEach(async () => {
      await db('users').truncate()
    });

    describe('/api/auth/login', () => {



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
      it('should respond with a new user and a token when registering a new user', async () => {
        const response = await request(server)
          .post('/api/auth/register')
          .send(user)

        expect(response.body.id).toBeTruthy()
        expect(response.body.token).toBeTruthy()
      });
      it('should respond with an error if you try to register a username that already exists', async () => {
        await registerUser({ ...user })
        const response = await request(server)
          .post('/api/auth/register')
          .send(user)


        expect(response.body.message).toBeTruthy()
      })
    });
  });
  describe('/api/jokes', () => {
    beforeEach(async () => {
      await db('users').truncate()
    });

    it('should respond with an error if user did not send an authorization token', async () => {
      const response = await request(server)
        .get('/api/jokes')

      expect(response.body.you).toBeTruthy()
    });
    it('should give all the jokes if the user sent a valid authorization token', async () => {
      const newUser = await registerUser({ ...user })
      const response = await request(server)
        .get('/api/jokes')
        .set('authorization', newUser.token)

      expect(response.body.length).toBeGreaterThan(0)
    });
  });
});