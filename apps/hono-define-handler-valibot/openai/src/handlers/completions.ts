import { Hono } from 'hono'
import { postCompletionsHandler } from '../routes'

export const completionsHandler = new Hono().post(
  '/completions',
  postCompletionsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
)
