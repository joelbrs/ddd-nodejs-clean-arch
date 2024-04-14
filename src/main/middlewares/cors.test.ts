import app from "../config/app"
import request from 'supertest'

describe('Cors Middleware', () => {
  it('should cors enabled', async () => {
    app.post('/test_cors', (req, res) => {
      res.send({})

      console.log(req.headers, res.header)
    })

    console.log(await request(app)
    .post('/test_cors'))

    await request(app)
          .post('/test_cors')
          .expect('access-control-allow-origin', '*')
  })
})