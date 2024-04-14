import { Express } from "express"
import { BodyParser } from "../middlewares"
import { Cors } from "../middlewares/cors"

export const Middleware = (app: Express): void => {
  app.use(BodyParser)
  app.use(Cors)
} 