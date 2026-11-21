import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        session_id: z.string(),
        session: LiveCallAcceptSessionSchema.meta({
          description:
            'Model and startup configuration for the Live session that answers the incoming SIP call.',
        }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdFork: t.procedure
    .input(
      z.object({
        session_id: z.string(),
        session: LiveMediaSessionForkParamsSchema.meta({
          description:
            "Optional configuration overrides for the new Live session. Omit this object or send an empty object to inherit the stored session's settings.",
        }).exactOptional(),
        transport: LiveWebRTCTransportSchema.meta({
          description:
            'WebRTC transport with an SDP offer for the new connection to the forked session.',
        }),
      }),
    )
    .output(LiveCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdHangup: t.procedure
    .input(z.object({ session_id: z.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdRefer: t.procedure
    .input(
      z.object({
        session_id: z.string(),
        target_uri: TargetUriSchema.meta({
          description:
            'Nonblank URI for the SIP Refer-To header, such as tel:+14155550123 or sip:agent@example.com.',
        }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdReject: t.procedure
    .input(
      z.object({
        session_id: z.string(),
        status_code: z
          .int()
          .min(300)
          .max(699)
          .meta({
            description: 'SIP rejection status sent to the caller. This field is required.',
            examples: [486],
          }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLiveSessionsSessionIdContent: t.procedure
    .input(
      z.object({
        session_id: z
          .string()
          .regex(/^live_[A-Za-z0-9_-]{1,128}$/)
          .meta({
            description:
              'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          }),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
