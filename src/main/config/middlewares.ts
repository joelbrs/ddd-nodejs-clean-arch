import { Express } from "express"
import { BodyParser } from "../middlewares"

export const Middleware = (app: Express): void => {
  app.use(BodyParser)
} 