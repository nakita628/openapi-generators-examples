import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import {
  LiveCallAcceptRequestSchema,
  LiveCallReferRequestSchema,
  LiveCallRejectRequestSchema,
  LiveForkRequestSchema,
  LiveSessionCreateRequestSchema,
} from '../components'

export const liveHandler = new Hono()
  .post('/live/sessions', tbValidator('json', LiveSessionCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/live/sessions/:session_id/accept',
    tbValidator('param', Type.Object({ session_id: Type.String() })),
    tbValidator('json', LiveCallAcceptRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/fork',
    tbValidator('param', Type.Object({ session_id: Type.String() })),
    tbValidator('json', LiveForkRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/hangup',
    tbValidator('param', Type.Object({ session_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/refer',
    tbValidator('param', Type.Object({ session_id: Type.String() })),
    tbValidator('json', LiveCallReferRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/reject',
    tbValidator('param', Type.Object({ session_id: Type.String() })),
    tbValidator('json', LiveCallRejectRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/live/sessions/:session_id/content',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({
          pattern: '^live_[A-Za-z0-9_-]{1,128}$',
          description:
            'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
