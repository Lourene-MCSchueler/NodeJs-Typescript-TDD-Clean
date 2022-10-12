import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Lou',
        email: 'lourene.camargo@gmail.com',
        password: '159753',
        passwordConfirmation: '159753'
      })
      .expect(200)
  })
})
