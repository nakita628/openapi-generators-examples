import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { CreateModerationRequestSchema } from '../components'

export const moderationsHandler = new Hono().post(
  '/moderations',
  sValidator('json', Schema.toStandardSchemaV1(CreateModerationRequestSchema)),
  (c) => {},
)
