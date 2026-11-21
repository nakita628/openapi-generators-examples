import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
    sValidator('param', z.object({ session_id: z.string() })),
    sValidator('json', LiveCallAcceptRequestSchema),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/fork',
    sValidator('param', z.object({ session_id: z.string() })),
    sValidator('json', LiveForkRequestSchema),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/hangup',
    sValidator('param', z.object({ session_id: z.string() })),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/refer',
    sValidator('param', z.object({ session_id: z.string() })),
    sValidator('json', LiveCallReferRequestSchema),
    (c) => {},
  )
  .post(
    '/live/sessions/:session_id/reject',
    sValidator('param', z.object({ session_id: z.string() })),
    sValidator('json', LiveCallRejectRequestSchema),
    (c) => {},
  )
  .get(
    '/live/sessions/:session_id/content',
    sValidator(
      'param',
      z.object({
        session_id: z
          .string()
          .regex(/^live_[A-Za-z0-9_-]{1,128}$/)
          .meta({
            description:
              'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          }),
      }),
    ),
    (c) => {},
  )
