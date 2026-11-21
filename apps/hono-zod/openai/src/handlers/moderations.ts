import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { CreateModerationRequestSchema } from '../components'

export const moderationsHandler = new Hono().post(
  '/moderations',
  sValidator('json', CreateModerationRequestSchema),
  (c) => {},
)
