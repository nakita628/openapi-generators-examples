import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import {
  LiveCallAcceptRequestSchema,
  LiveCallReferRequestSchema,
  LiveCallRejectRequestSchema,
  LiveForkRequestSchema,
  LiveSessionCreateRequestSchema,
} from '../components'

export const liveHandler = new Hono()
  .post(
    '/live/sessions',
    sValidator('json', Schema.toStandardSchemaV1(LiveSessionCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/accept',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ session_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(LiveCallAcceptRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/fork',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ session_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(LiveForkRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/hangup',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ session_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/refer',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ session_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(LiveCallReferRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/reject',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ session_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(LiveCallRejectRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/live/sessions/:session_id/content',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(Schema.isPattern(/^live_[A-Za-z0-9_-]{1,128}$/)).annotate(
            {
              description:
                'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
            },
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
