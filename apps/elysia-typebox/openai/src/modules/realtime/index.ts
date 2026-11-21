import { Elysia, t } from 'elysia'
import {
  AudioTranscriptionSchema,
  AudioTranscriptionResponseSchema,
  CallableToolAllowedCallerSchema,
  ErrorSchema,
  ErrorResponseSchema,
  FileInputDetailSchema,
  ImageDetailSchema,
  InputFileContentSchema,
  InputImageContentSchema,
  InputTextContentSchema,
  MCPToolSchema,
  MCPToolFilterSchema,
  MisalignmentErrorDetailsResourceSchema,
  NoiseReductionTypeSchema,
  PromptSchema,
  PromptCacheBreakpointConfigSchema,
  RealtimeAudioFormatsSchema,
  RealtimeCallCreateRequestSchema,
  RealtimeCallReferRequestSchema,
  RealtimeCallRejectRequestSchema,
  RealtimeCreateClientSecretRequestSchema,
  RealtimeCreateClientSecretResponseSchema,
  RealtimeFunctionToolSchema,
  RealtimeNoiseReductionStrengthSchema,
  RealtimeReasoningSchema,
  RealtimeReasoningEffortSchema,
  RealtimeSessionCreateRequestSchema,
  RealtimeSessionCreateRequestGASchema,
  RealtimeSessionCreateResponseSchema,
  RealtimeSessionCreateResponseGASchema,
  RealtimeTranscriptionSessionCreateRequestSchema,
  RealtimeTranscriptionSessionCreateRequestGASchema,
  RealtimeTranscriptionSessionCreateResponseSchema,
  RealtimeTranscriptionSessionCreateResponseGASchema,
  RealtimeTranslationClientSecretCreateRequestSchema,
  RealtimeTranslationClientSecretCreateResponseSchema,
  RealtimeTranslationSessionSchema,
  RealtimeTranslationSessionCreateRequestSchema,
  RealtimeTruncationSchema,
  RealtimeTurnDetectionSchema,
  ResponsePromptVariablesSchema,
  ToolChoiceFunctionSchema,
  ToolChoiceMCPSchema,
  ToolChoiceOptionsSchema,
  VoiceIdsOrCustomVoiceSchema,
  VoiceIdsSharedSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { RealtimeModel } from './model'

export const realtime = new Elysia()
  .model({
    AudioTranscription: AudioTranscriptionSchema,
    AudioTranscriptionResponse: AudioTranscriptionResponseSchema,
    CallableToolAllowedCaller: CallableToolAllowedCallerSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    FileInputDetail: FileInputDetailSchema,
    ImageDetail: ImageDetailSchema,
    InputFileContent: InputFileContentSchema,
    InputImageContent: InputImageContentSchema,
    InputTextContent: InputTextContentSchema,
    MCPTool: MCPToolSchema,
    MCPToolFilter: MCPToolFilterSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    NoiseReductionType: NoiseReductionTypeSchema,
    Prompt: PromptSchema,
    PromptCacheBreakpointConfig: PromptCacheBreakpointConfigSchema,
    RealtimeAudioFormats: RealtimeAudioFormatsSchema,
    RealtimeCallCreateRequest: RealtimeCallCreateRequestSchema,
    RealtimeCallReferRequest: RealtimeCallReferRequestSchema,
    RealtimeCallRejectRequest: RealtimeCallRejectRequestSchema,
    RealtimeCreateClientSecretRequest: RealtimeCreateClientSecretRequestSchema,
    RealtimeCreateClientSecretResponse: RealtimeCreateClientSecretResponseSchema,
    RealtimeFunctionTool: RealtimeFunctionToolSchema,
    RealtimeNoiseReductionStrength: RealtimeNoiseReductionStrengthSchema,
    RealtimeReasoning: RealtimeReasoningSchema,
    RealtimeReasoningEffort: RealtimeReasoningEffortSchema,
    RealtimeSessionCreateRequest: RealtimeSessionCreateRequestSchema,
    RealtimeSessionCreateRequestGA: RealtimeSessionCreateRequestGASchema,
    RealtimeSessionCreateResponse: RealtimeSessionCreateResponseSchema,
    RealtimeSessionCreateResponseGA: RealtimeSessionCreateResponseGASchema,
    RealtimeTranscriptionSessionCreateRequest: RealtimeTranscriptionSessionCreateRequestSchema,
    RealtimeTranscriptionSessionCreateRequestGA: RealtimeTranscriptionSessionCreateRequestGASchema,
    RealtimeTranscriptionSessionCreateResponse: RealtimeTranscriptionSessionCreateResponseSchema,
    RealtimeTranscriptionSessionCreateResponseGA:
      RealtimeTranscriptionSessionCreateResponseGASchema,
    RealtimeTranslationClientSecretCreateRequest:
      RealtimeTranslationClientSecretCreateRequestSchema,
    RealtimeTranslationClientSecretCreateResponse:
      RealtimeTranslationClientSecretCreateResponseSchema,
    RealtimeTranslationSession: RealtimeTranslationSessionSchema,
    RealtimeTranslationSessionCreateRequest: RealtimeTranslationSessionCreateRequestSchema,
    RealtimeTruncation: RealtimeTruncationSchema,
    RealtimeTurnDetection: RealtimeTurnDetectionSchema,
    ResponsePromptVariables: ResponsePromptVariablesSchema,
    ToolChoiceFunction: ToolChoiceFunctionSchema,
    ToolChoiceMCP: ToolChoiceMCPSchema,
    ToolChoiceOptions: ToolChoiceOptionsSchema,
    VoiceIdsOrCustomVoice: VoiceIdsOrCustomVoiceSchema,
    VoiceIdsShared: VoiceIdsSharedSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/realtime/calls', ({ body }) => {}, {
    body: 'RealtimeCallCreateRequest',
    response: { 201: t.Void() },
    detail: {
      tags: ['Realtime'],
      summary: 'Create call',
      description:
        'Create a new Realtime API call over WebRTC and receive the SDP answer needed\nto complete the peer connection.',
      operationId: 'create-realtime-call',
    },
  })
  .post('/realtime/calls/:call_id/accept', ({ params, body }) => {}, {
    params: RealtimeModel.acceptRealtimeCallParams,
    body: 'RealtimeSessionCreateRequestGA',
    response: { 200: t.Void(), 404: 'ErrorResponse', 409: 'ErrorResponse', 500: t.Void() },
    detail: {
      tags: ['Realtime'],
      summary: 'Accept call',
      description:
        'Accept an incoming SIP call and configure the realtime session that will\nhandle it.',
      operationId: 'accept-realtime-call',
    },
  })
  .post('/realtime/calls/:call_id/hangup', ({ params }) => {}, {
    params: RealtimeModel.hangupRealtimeCallParams,
    response: { 200: t.Void(), 404: 'ErrorResponse' },
    detail: {
      tags: ['Realtime'],
      summary: 'Hang up call',
      description: 'End an active Realtime API call, whether it was initiated over SIP or\nWebRTC.',
      operationId: 'hangup-realtime-call',
    },
  })
  .post('/realtime/calls/:call_id/refer', ({ params, body }) => {}, {
    params: RealtimeModel.referRealtimeCallParams,
    body: 'RealtimeCallReferRequest',
    response: { 200: t.Void(), 404: 'ErrorResponse', 500: t.Void() },
    detail: {
      tags: ['Realtime'],
      summary: 'Refer call',
      description: 'Transfer an active SIP call to a new destination using the SIP REFER verb.',
      operationId: 'refer-realtime-call',
    },
  })
  .post('/realtime/calls/:call_id/reject', ({ params, body }) => {}, {
    params: RealtimeModel.rejectRealtimeCallParams,
    body: 'RealtimeCallRejectRequest',
    response: { 200: t.Void(), 404: 'ErrorResponse', 409: 'ErrorResponse', 500: t.Void() },
    detail: {
      tags: ['Realtime'],
      summary: 'Reject call',
      description: 'Decline an incoming SIP call by returning a SIP status code to the caller.',
      operationId: 'reject-realtime-call',
    },
  })
  .post('/realtime/client_secrets', ({ body }) => {}, {
    body: 'RealtimeCreateClientSecretRequest',
    response: {
      200: 'RealtimeCreateClientSecretResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Realtime'],
      summary: 'Create client secret',
      description:
        'Create a Realtime client secret with an associated session configuration.\n\nClient secrets are short-lived tokens that can be passed to a client app,\nsuch as a web frontend or mobile client, which grants access to the Realtime API without\nleaking your main API key. You can configure a custom TTL for each client secret.\n\nYou can also attach session configuration options to the client secret, which will be\napplied to any sessions created using that client secret, but these can also be overridden\nby the client connection.\n\n[Learn more about authentication with client secrets over WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc).\n\nReturns the created client secret and the effective session object. The client secret is a string that looks like `ek_1234`.\n',
      operationId: 'create-realtime-client-secret',
    },
  })
  .post('/realtime/sessions', ({ body }) => {}, {
    body: 'RealtimeSessionCreateRequest',
    response: { 200: 'RealtimeSessionCreateResponse' },
    detail: {
      tags: ['Realtime'],
      summary: 'Create session',
      description:
        'Create an ephemeral API token for use in client-side applications with the\nRealtime API. Can be configured with the same session parameters as the\n`session.update` client event.\n\nIt responds with a session object, plus a `client_secret` key which contains\na usable ephemeral API token that can be used to authenticate browser clients\nfor the Realtime API.\n\nReturns the created Realtime session object, plus an ephemeral key.\n',
      operationId: 'create-realtime-session',
    },
  })
  .post('/realtime/transcription_sessions', ({ body }) => {}, {
    body: 'RealtimeTranscriptionSessionCreateRequest',
    response: { 200: 'RealtimeTranscriptionSessionCreateResponse' },
    detail: {
      tags: ['Realtime'],
      summary: 'Create transcription session',
      description:
        'Create an ephemeral API token for use in client-side applications with the\nRealtime API specifically for realtime transcriptions. \nCan be configured with the same session parameters as the `transcription_session.update` client event.\n\nIt responds with a session object, plus a `client_secret` key which contains\na usable ephemeral API token that can be used to authenticate browser clients\nfor the Realtime API.\n\nReturns the created Realtime transcription session object, plus an ephemeral key.\n',
      operationId: 'create-realtime-transcription-session',
    },
  })
  .post('/realtime/translations/client_secrets', ({ body }) => {}, {
    body: 'RealtimeTranslationClientSecretCreateRequest',
    response: {
      200: 'RealtimeTranslationClientSecretCreateResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Realtime'],
      summary: 'Create translation client secret',
      description:
        'Create a Realtime translation client secret with an associated translation session configuration.\n\nClient secrets are short-lived tokens that can be passed to a client app,\nsuch as a web frontend or mobile client, which grants access to the Realtime\nTranslation API without leaking your main API key. You can configure a custom\nTTL for each client secret.\n\nReturns the created client secret and the effective translation session object.\nThe client secret is a string that looks like `ek_1234`.\n',
      operationId: 'create-realtime-translation-client-secret',
    },
  })
