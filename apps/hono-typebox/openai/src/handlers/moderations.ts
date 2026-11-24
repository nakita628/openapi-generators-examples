import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { CreateModerationRequestSchema } from '../components'

export const moderationsHandler = new Hono().post(
  '/moderations',
  tbValidator('json', CreateModerationRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
