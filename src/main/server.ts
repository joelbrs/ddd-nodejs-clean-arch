import { MongoHelper } from '../infra/database/mongodb/helpers/mongo'
import app from './config/app'
import env from './config/env'

MongoHelper.connect(env.MONGO_URL)
  .then(() => {
    app.listen(env.PORT, () => console.log(`Server running at ${env.PORT}`))
  })
  .catch(console.error)
  