import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { CreateCompletionRequestSchema } from '../components'

export const completionsHandler = new Hono().post(
  '/completions',
  sValidator('json', Schema.toStandardSchemaV1(CreateCompletionRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
