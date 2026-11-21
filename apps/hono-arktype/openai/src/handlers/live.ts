import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  LiveCallAcceptRequestSchema,
  LiveCallReferRequestSchema,
  LiveCallRejectRequestSchema,
  LiveForkRequestSchema,
  LiveSessionCreateRequestSchema,
} from '../components'

export const liveHandler = new Hono()
  .post('/live/sessions', sValidator('json', LiveSessionCreateRequestSchema), (c) => {})
  .post(
    '/live/sessions/:session_id/accept',
    sValidator('param', type({ session_id: 'string' })),
    sValidator('json', LiveCallAcceptRequestSchema),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/fork',
    sValidator('param', type({ session_id: 'string' })),
    sValidator('json', LiveForkRequestSchema),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/hangup',
    sValidator('param', type({ session_id: 'string' })),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/refer',
    sValidator('param', type({ session_id: 'string' })),
    sValidator('json', LiveCallReferRequestSchema),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/reject',
    sValidator('param', type({ session_id: 'string' })),
    sValidator('json', LiveCallRejectRequestSchema),
    (c) => {},
  )
  .get(
    '/live/sessions/:session_id/content',
    sValidator(
      'param',
      type({
        session_id: type('string')
          .and(/^live_[A-Za-z0-9_-]{1,128}$/)
          .describe(
            'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          ),
      }),
    ),
    (c) => {},
  )
