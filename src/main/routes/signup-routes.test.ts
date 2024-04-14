import { MongoHelper } from "../../infra/database/mongodb/helpers/mongo";
import app from "../config/app"
import request from 'supertest'

describe('SignUpRoute', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection("accounts").deleteMany({});
  });

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