import { Hono } from 'hono'
import { botHandler, v2Handler } from './handlers'

const app = new Hono()

export const api = app.route('/', botHandler).route('/', v2Handler)

export default app
