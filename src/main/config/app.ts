import express from 'express'
import { Middleware } from './middlewares'

const app = express()
Middleware(app)

export default app