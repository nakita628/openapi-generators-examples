import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { CreateCompletionRequestSchema } from '../components'

export const completionsHandler = new Hono().post(
  '/completions',
  sValidator('json', CreateCompletionRequestSchema),
  (c) => {},
)
