import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  LiveCallAcceptRequestSchema,
  LiveCallReferRequestSchema,
  LiveCallRejectRequestSchema,
  LiveForkRequestSchema,
  LiveSessionCreateRequestSchema,
} from '../components'

export const liveHandler = new Hono()
  .post('/live/sessions', sValidator('json', LiveSessionCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/live/sessions/:session_id/accept',
    sValidator('param', v.object({ session_id: v.string() })),
    sValidator('json', LiveCallAcceptRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/fork',
    sValidator('param', v.object({ session_id: v.string() })),
    sValidator('json', LiveForkRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/hangup',
    sValidator('param', v.object({ session_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/refer',
    sValidator('param', v.object({ session_id: v.string() })),
    sValidator('json', LiveCallReferRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/reject',
    sValidator('param', v.object({ session_id: v.string() })),
    sValidator('json', LiveCallRejectRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/live/sessions/:session_id/content',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(
          v.pipe(v.string(), v.regex(/^live_[A-Za-z0-9_-]{1,128}$/)),
          v.description(
            'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
