import { Express } from "express"
import { BodyParser } from "../middlewares"
import { Cors } from "../middlewares/cors"
import { ContentType } from "../middlewares/content-type"

export const Middleware = (app: Express): void => {
  app.use(BodyParser)
  app.use(Cors)
  app.use(ContentType as any)
} 