import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { CreateCompletionRequestSchema } from '../components'

export const completionsHandler = new Hono().post(
  '/completions',
  tbValidator('json', CreateCompletionRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
