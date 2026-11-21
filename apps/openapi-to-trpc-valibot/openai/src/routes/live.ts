import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        session_id: v.string(),
        session: v.pipe(
          LiveCallAcceptSessionSchema,
          v.description(
            'Model and startup configuration for the Live session that answers the incoming SIP call.',
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdFork: t.procedure
    .input(
      v.object({
        session_id: v.string(),
        session: v.optional(
          v.pipe(
            LiveMediaSessionForkParamsSchema,
            v.description(
              "Optional configuration overrides for the new Live session. Omit this object or send an empty object to inherit the stored session's settings.",
            ),
          ),
        ),
        transport: v.pipe(
          LiveWebRTCTransportSchema,
          v.description(
            'WebRTC transport with an SDP offer for the new connection to the forked session.',
          ),
        ),
      }),
    )
    .output(LiveCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdHangup: t.procedure
    .input(v.object({ session_id: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdRefer: t.procedure
    .input(
      v.object({
        session_id: v.string(),
        target_uri: v.pipe(
          TargetUriSchema,
          v.description(
            'Nonblank URI for the SIP Refer-To header, such as tel:+14155550123 or sip:agent@example.com.',
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdReject: t.procedure
    .input(
      v.object({
        session_id: v.string(),
        status_code: v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(300), v.maxValue(699)),
          v.description('SIP rejection status sent to the caller. This field is required.'),
          v.metadata({ examples: [486] }),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLiveSessionsSessionIdContent: t.procedure
    .input(
      v.object({
        session_id: v.pipe(
          v.pipe(v.string(), v.regex(/^live_[A-Za-z0-9_-]{1,128}$/)),
          v.description(
            'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          ),
        ),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
