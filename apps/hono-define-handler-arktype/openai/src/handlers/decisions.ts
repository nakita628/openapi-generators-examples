import { Hono } from 'hono'
import { postDecisionsHandler } from '../routes'

export const decisionsHandler = new Hono().post(
  '/decisions',
  postDecisionsHandler(async (c, { json }) => {}),
)
