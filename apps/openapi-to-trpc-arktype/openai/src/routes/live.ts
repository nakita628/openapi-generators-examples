import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  LiveCallAcceptSessionSchema,
  LiveCreateResponseSchema,
  LiveMediaSessionForkParamsSchema,
  LiveSessionCreateRequestSchema,
  LiveSessionCreateResponseSchema,
  LiveWebRTCTransportSchema,
  TargetUriSchema,
} from '../components'

const t = initTRPC.create()

export const liveRouter = t.router({
  postLiveSessions: t.procedure
    .input(LiveSessionCreateRequestSchema)
    .output(LiveSessionCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdAccept: t.procedure
    .input(
      type({
        session_id: 'string',
        session: LiveCallAcceptSessionSchema.describe(
          'Model and startup configuration for the Live session that answers the incoming SIP call.',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdFork: t.procedure
    .input(
      type({
        session_id: 'string',
        'session?': LiveMediaSessionForkParamsSchema.describe(
          "Optional configuration overrides for the new Live session. Omit this object or send an empty object to inherit the stored session's settings.",
        ),
        transport: LiveWebRTCTransportSchema.describe(
          'WebRTC transport with an SDP offer for the new connection to the forked session.',
        ),
      }),
    )
    .output(LiveCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdHangup: t.procedure
    .input(type({ session_id: 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdRefer: t.procedure
    .input(
      type({
        session_id: 'string',
        target_uri: TargetUriSchema.describe(
          'Nonblank URI for the SIP Refer-To header, such as tel:+14155550123 or sip:agent@example.com.',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdReject: t.procedure
    .input(
      type({
        session_id: 'string',
        status_code: type('number.integer >= 300 & number.integer <= 699').describe(
          'SIP rejection status sent to the caller. This field is required.',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLiveSessionsSessionIdContent: t.procedure
    .input(
      type({
        session_id: type('string')
          .and(/^live_[A-Za-z0-9_-]{1,128}$/)
          .describe(
            'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          ),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
