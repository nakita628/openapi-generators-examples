import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ErrorResponseSchema,
  LiveCallAcceptRequestSchema,
  LiveCallReferRequestSchema,
  LiveCallRejectRequestSchema,
  LiveCreateResponseSchema,
  LiveForkRequestSchema,
  LiveSessionCreateRequestSchema,
  LiveSessionCreateResponseSchema,
  TooManyRequestsResponse,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const liveHandler = new Hono()
  .post(
    '/live/sessions',
    describeRoute({
      operationId: 'create-live',
      summary: 'Create session',
      description:
        'Create a Live WebRTC session or place an outbound SIP call. Start with the\n[Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting) for session configuration\nand [Telephony and SIP](https://developers.openai.com/api/docs/guides/voice-sip?api=live#place-an-outbound-call)\nfor trunk setup and call monitoring.\n\nSet transport.type to `webrtc` and supply an SDP offer, or set it to `sip`\nand supply an E.164 destination and trunk credentials.\nRinging is limited to 3 minutes and connected calls to 2 hours; these limits\nare not configurable in the request.\n\nReturns `201 Created` after session initialization. WebRTC responses include an\nSDP answer. SIP responses do not wait for the callee to answer. Attach a\nsideband connection using session.id to monitor SIP call progress.\n\nEach SIP request creates a new call. If a request times out or the connection\nfails, retry with caution: the original request may have succeeded, and a\nretry can place another call.',
      tags: ['Live'],
      responses: {
        '201': {
          description:
            'Returns 201 Created with a WebRTC answer or an initialized outbound SIP session. A SIP response does not mean the callee has answered.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(LiveSessionCreateResponseSchema)),
              examples: {
                webrtc: {
                  summary: 'WebRTC session created (201 Created)',
                  value: {
                    session: { id: 'live_123' },
                    transport: { type: 'webrtc', sdp: '<SDP answer>' },
                  },
                },
                sip: {
                  summary: 'Outbound SIP session initialized (201 Created)',
                  value: { session: { id: 'live_123' }, transport: { type: 'sip' } },
                },
              },
            },
          },
        },
        '400': {
          description: 'Invalid Live session request.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
            'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) },
          },
        },
        '413': {
          description: 'The Live session request exceeds the supported size limit.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
            'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) },
          },
        },
        '429': {
          description: 'The session could not start because a rate or quota limit was exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'An internal error occurred. The response body is plain text.',
          content: { 'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
        '502': {
          description: 'The SIP gateway could not initialize the outbound call.',
          content: { 'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
        '503': {
          description: 'The session is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
            'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) },
          },
        },
        '504': {
          description: 'SIP session initialization timed out. The error code is sip_setup_timeout.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(LiveSessionCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/accept',
    describeRoute({
      operationId: 'accept-live-session',
      summary: 'Accept call',
      description:
        'Accept an incoming SIP call. Supply session with type live, the model, and startup configuration. Before accepting calls, follow the [Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting) to write frontend conversation instructions and a separate backend prompt. SIP media format is negotiated; omit audio.format.',
      tags: ['Live'],
      responses: {
        '200': { description: 'Session accept request accepted.' },
        '400': {
          description: 'Invalid request body or headers.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The session or call was not found or is unavailable for this operation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '409': {
          description: 'The session or call can no longer accept this operation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The session could not start because a rate or quota limit was exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'An internal error occurred. The response body is plain text.',
          content: { 'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
        '503': {
          description: 'The session is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ session_id: Type.String() }))),
    validator('json', toStandardSchemaV1(LiveCallAcceptRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/fork',
    describeRoute({
      operationId: 'fork-live-session',
      summary: 'Fork session',
      description: 'Fork a stored Live session onto a new WebRTC connection.',
      tags: ['Live'],
      responses: {
        '201': {
          description: 'Forked Live session created with a WebRTC answer.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(LiveCreateResponseSchema)) },
          },
        },
        '400': {
          description: 'Invalid Live session request.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'Invalid session ID.',
          content: { 'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
        '413': {
          description: 'The Live session request exceeds the supported size limit.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The session could not start because a rate or quota limit was exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'An internal error occurred. The response body is plain text.',
          content: { 'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
        '503': {
          description: 'The session is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ session_id: Type.String() }))),
    validator('json', toStandardSchemaV1(LiveForkRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/hangup',
    describeRoute({
      operationId: 'hangup-live-session',
      summary: 'Hang up session',
      description: 'End a SIP call identified by session_id.',
      tags: ['Live'],
      responses: {
        '200': { description: 'Session hangup request accepted.' },
        '404': {
          description: 'The session or call was not found or is unavailable for this operation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ session_id: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/refer',
    describeRoute({
      operationId: 'refer-live-session',
      summary: 'Transfer call',
      description:
        'Transfer a SIP call to another destination. Supply a nonblank target_uri for the SIP Refer-To header.',
      tags: ['Live'],
      responses: {
        '200': { description: 'Session refer request accepted.' },
        '400': {
          description: 'Invalid request body or headers.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The session or call was not found or is unavailable for this operation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'An internal error occurred. The response body is plain text.',
          content: { 'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ session_id: Type.String() }))),
    validator('json', toStandardSchemaV1(LiveCallReferRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live/sessions/:session_id/reject',
    describeRoute({
      operationId: 'reject-live-session',
      summary: 'Reject call',
      description:
        'Reject an incoming SIP call. Send a required SIP rejection status_code between 300 and 699.',
      tags: ['Live'],
      responses: {
        '200': { description: 'Session reject request accepted.' },
        '400': {
          description: 'Invalid request body or headers.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The session or call was not found or is unavailable for this operation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '409': {
          description: 'The session or call can no longer accept this operation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'An internal error occurred. The response body is plain text.',
          content: { 'text/plain': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ session_id: Type.String() }))),
    validator('json', toStandardSchemaV1(LiveCallRejectRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/live/sessions/:session_id/content',
    describeRoute({
      tags: ['Live'],
      summary: 'Download recording',
      description: 'Get Live session content',
      operationId: 'download-live-recording',
      responses: {
        '200': {
          description:
            'Stored session recording. Input audio is in the left channel and output audio is in the right channel.',
          content: {
            'audio/wav': {
              schema: resolver(
                toStandardSchemaV1(
                  Type.String({
                    description:
                      'The Live session recording as a stereo WAV file, with input audio in the left channel and output audio in the right channel.',
                  }),
                ),
              ),
            },
          },
        },
        '400': {
          description: 'Invalid Live session ID.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The endpoint is unavailable or the stored session recording was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The stored session audio could not be exported.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': {
          description: 'The audio export is temporarily unavailable.',
          headers: {
            'Retry-After': {
              description: 'The minimum number of seconds to wait before retrying.',
              schema: { type: 'integer', minimum: 1 },
            },
          },
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({
            pattern: '^live_[A-Za-z0-9_-]{1,128}$',
            description:
              'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
