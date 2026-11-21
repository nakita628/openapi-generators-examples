import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
    .input(Schema.toStandardSchemaV1(LiveSessionCreateRequestSchema))
    .output(Schema.toStandardSchemaV1(LiveSessionCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdAccept: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String,
          session: LiveCallAcceptSessionSchema.annotate({
            description:
              'Model and startup configuration for the Live session that answers the incoming SIP call.',
          }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdFork: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String,
          session: Schema.optional(
            LiveMediaSessionForkParamsSchema.annotate({
              description:
                "Optional configuration overrides for the new Live session. Omit this object or send an empty object to inherit the stored session's settings.",
            }),
          ),
          transport: LiveWebRTCTransportSchema.annotate({
            description:
              'WebRTC transport with an SDP offer for the new connection to the forked session.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LiveCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdHangup: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ session_id: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdRefer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String,
          target_uri: TargetUriSchema.annotate({
            description:
              'Nonblank URI for the SIP Refer-To header, such as tel:+14155550123 or sip:agent@example.com.',
          }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiveSessionsSessionIdReject: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String,
          status_code: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(300),
            Schema.isLessThanOrEqualTo(699),
          ).annotate({
            description: 'SIP rejection status sent to the caller. This field is required.',
            jsonSchemaExamples: [486],
          }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLiveSessionsSessionIdContent: t.procedure
    .input(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
