import app from "../config/app"
import request from 'supertest'

describe('SignUpRoute', () => {
  it('should returns an account on success', async () => {
    await request(app)
          .post('/signup')
          .send({
            name: 'Joel',
            email: 'joel@mail.com',
            password: '1234',
            password_confirmation: '1234'
          })
          .expect(200)
  })
})