import express from 'express'
import { Middleware } from './middlewares'
import { Routes } from './routes'

const app = express()
Middleware(app)
Routes(app)

export default app