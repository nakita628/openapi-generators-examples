import { os } from '@orpc/server'
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

export const postLiveSessions = os
  .route({
    method: 'POST',
    path: '/live/sessions',
    tags: ['Live'],
    summary: 'Create session',
    description:
      'Create a Live WebRTC session or place an outbound SIP call. Start with the\n[Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting) for session configuration\nand [Telephony and SIP](https://developers.openai.com/api/docs/guides/voice-sip?api=live#place-an-outbound-call)\nfor trunk setup and call monitoring.\n\nSet transport.type to `webrtc` and supply an SDP offer, or set it to `sip`\nand supply an E.164 destination and trunk credentials.\nRinging is limited to 3 minutes and connected calls to 2 hours; these limits\nare not configurable in the request.\n\nReturns `201 Created` after session initialization. WebRTC responses include an\nSDP answer. SIP responses do not wait for the callee to answer. Attach a\nsideband connection using session.id to monitor SIP call progress.\n\nEach SIP request creates a new call. If a request times out or the connection\nfails, retry with caution: the original request may have succeeded, and a\nretry can place another call.',
    successStatus: 201,
    successDescription:
      'Returns 201 Created with a WebRTC answer or an initialized outbound SIP session. A SIP response does not mean the callee has answered.',
  })
  .input(LiveSessionCreateRequestSchema)
  .output(LiveSessionCreateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLiveSessionsSessionIdAccept = os
  .route({
    method: 'POST',
    path: '/live/sessions/{session_id}/accept',
    tags: ['Live'],
    summary: 'Accept call',
    description:
      'Accept an incoming SIP call. Supply session with type live, the model, and startup configuration. Before accepting calls, follow the [Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting) to write frontend conversation instructions and a separate backend prompt. SIP media format is negotiated; omit audio.format.',
    successDescription: 'Session accept request accepted.',
  })
  .input(z.object({ session_id: z.string(), session: LiveCallAcceptSessionSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLiveSessionsSessionIdFork = os
  .route({
    method: 'POST',
    path: '/live/sessions/{session_id}/fork',
    tags: ['Live'],
    summary: 'Fork session',
    description: 'Fork a stored Live session onto a new WebRTC connection.',
    successStatus: 201,
    successDescription: 'Forked Live session created with a WebRTC answer.',
  })
  .input(
    z.object({
      session_id: z.string(),
      session: LiveMediaSessionForkParamsSchema.exactOptional(),
      transport: LiveWebRTCTransportSchema,
    }),
  )
  .output(LiveCreateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLiveSessionsSessionIdHangup = os
  .route({
    method: 'POST',
    path: '/live/sessions/{session_id}/hangup',
    tags: ['Live'],
    summary: 'Hang up session',
    description: 'End a SIP call identified by session_id.',
    successDescription: 'Session hangup request accepted.',
  })
  .input(z.object({ session_id: z.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLiveSessionsSessionIdRefer = os
  .route({
    method: 'POST',
    path: '/live/sessions/{session_id}/refer',
    tags: ['Live'],
    summary: 'Transfer call',
    description:
      'Transfer a SIP call to another destination. Supply a nonblank target_uri for the SIP Refer-To header.',
    successDescription: 'Session refer request accepted.',
  })
  .input(z.object({ session_id: z.string(), target_uri: TargetUriSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLiveSessionsSessionIdReject = os
  .route({
    method: 'POST',
    path: '/live/sessions/{session_id}/reject',
    tags: ['Live'],
    summary: 'Reject call',
    description:
      'Reject an incoming SIP call. Send a required SIP rejection status_code between 300 and 699.',
    successDescription: 'Session reject request accepted.',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getLiveSessionsSessionIdContent = os
  .route({
    method: 'GET',
    path: '/live/sessions/{session_id}/content',
    tags: ['Live'],
    summary: 'Download recording',
    description: 'Get Live session content',
    successDescription:
      'Stored session recording. Input audio is in the left channel and output audio is in the right channel.',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })
