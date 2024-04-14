import { Express, Router } from "express"
import fg from 'fast-glob'

export const Routes = async (app: Express) => {
  const router = Router()

  fg.sync('**/src/main/routes/**routes.ts').forEach(async file => (await import(`../../../${file}`)).default(router))

  app.use(router)
}