import app from "../config/app"
import request from 'supertest'

describe('Content-Type Middleware', () => {
  it('should returns json as default content-type', async () => {
    app.post('/test_content_type', (_, res) => {
      res.send('')
    })

    await request(app)
          .post('/test_content_type')
          .expect('content-type', /json/)
  })

  it('should set content-type to xml when forced', async () => {
    app.post('/test_content_type_xml', (_, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
          .post('/test_content_type_xml')
          .expect('content-type', /xml/)
  })
})