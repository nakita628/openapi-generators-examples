import { Elysia, t } from 'elysia'
import {
  AudioResponseFormatSchema,
  CreateSpeechRequestSchema,
  CreateTranscriptionRequestSchema,
  CreateTranscriptionResponseDiarizedJsonSchema,
  CreateTranscriptionResponseJsonSchema,
  CreateTranscriptionResponseVerboseJsonSchema,
  CreateTranslationRequestSchema,
  CreateTranslationResponseJsonSchema,
  CreateTranslationResponseVerboseJsonSchema,
  CreateVoiceConsentRequestSchema,
  CreateVoicePromptRequestSchema,
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  TranscriptTextUsageDurationSchema,
  TranscriptTextUsageTokensSchema,
  TranscriptionDiarizedSegmentSchema,
  TranscriptionIncludeSchema,
  TranscriptionLanguageSchema,
  TranscriptionSegmentSchema,
  TranscriptionWordSchema,
  UpdateVoiceConsentRequestSchema,
  VadConfigSchema,
  VoiceConsentDeletedResourceSchema,
  VoiceConsentListResourceSchema,
  VoiceConsentResourceSchema,
  VoiceDeletedResourceSchema,
  VoiceIdsSharedSchema,
  VoiceResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { AudioModel } from './model'

export const audio = new Elysia()
  .model({
    AudioResponseFormat: AudioResponseFormatSchema,
    CreateSpeechRequest: CreateSpeechRequestSchema,
    CreateTranscriptionRequest: CreateTranscriptionRequestSchema,
    CreateTranscriptionResponseDiarizedJson: CreateTranscriptionResponseDiarizedJsonSchema,
    CreateTranscriptionResponseJson: CreateTranscriptionResponseJsonSchema,
    CreateTranscriptionResponseVerboseJson: CreateTranscriptionResponseVerboseJsonSchema,
    CreateTranslationRequest: CreateTranslationRequestSchema,
    CreateTranslationResponseJson: CreateTranslationResponseJsonSchema,
    CreateTranslationResponseVerboseJson: CreateTranslationResponseVerboseJsonSchema,
    CreateVoiceConsentRequest: CreateVoiceConsentRequestSchema,
    CreateVoicePromptRequest: CreateVoicePromptRequestSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    TranscriptTextUsageDuration: TranscriptTextUsageDurationSchema,
    TranscriptTextUsageTokens: TranscriptTextUsageTokensSchema,
    TranscriptionDiarizedSegment: TranscriptionDiarizedSegmentSchema,
    TranscriptionInclude: TranscriptionIncludeSchema,
    TranscriptionLanguage: TranscriptionLanguageSchema,
    TranscriptionSegment: TranscriptionSegmentSchema,
    TranscriptionWord: TranscriptionWordSchema,
    UpdateVoiceConsentRequest: UpdateVoiceConsentRequestSchema,
    VadConfig: VadConfigSchema,
    VoiceConsentDeletedResource: VoiceConsentDeletedResourceSchema,
    VoiceConsentListResource: VoiceConsentListResourceSchema,
    VoiceConsentResource: VoiceConsentResourceSchema,
    VoiceDeletedResource: VoiceDeletedResourceSchema,
    VoiceIdsShared: VoiceIdsSharedSchema,
    VoiceResource: VoiceResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/audio/speech', ({ body }) => {}, {
    body: 'CreateSpeechRequest',
    response: {
      200: t.Void(),
      400: 'ErrorResponse',
      401: 'ErrorResponse',
      403: t.Void(),
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Audio'],
      summary: 'Create speech',
      description:
        'Generates audio from the input text.\n\nReturns the audio file content, or a stream of audio events.\n\nThe `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, `gpt-4o-mini-tts-2025-03-20`, and\n`gpt-4o-mini-tts-2025-12-15` models are deprecated and scheduled to shut down\non January 6, 2027. These examples use the existing Speech API; for new\nintegrations, migrate to `gpt-realtime-2.1-mini` through the\n[Realtime API](https://developers.openai.com/api/docs/guides/realtime). See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations) for migration details.\n',
      operationId: 'createSpeech',
    },
  })
  .post('/audio/transcriptions', ({ body }) => {}, {
    body: 'CreateTranscriptionRequest',
    response: {
      200: AudioModel.createTranscriptionResponse200,
      400: 'ErrorResponse',
      401: 'ErrorResponse',
      403: t.Void(),
      413: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      502: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Audio'],
      summary: 'Create transcription',
      description:
        'Transcribes audio into the input language.\n\nReturns a transcription object in `json`, `diarized_json`, or `verbose_json`\nformat, plain text in `text`, `srt`, or `vtt` format, or a stream of\ntranscript events. Supported formats depend on the model.\n',
      operationId: 'createTranscription',
    },
  })
  .post('/audio/translations', ({ body }) => {}, {
    body: 'CreateTranslationRequest',
    response: {
      200: AudioModel.createTranslationResponse200,
      400: 'ErrorResponse',
      401: 'ErrorResponse',
      403: t.Void(),
      413: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      502: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Audio'],
      summary: 'Create translation',
      description:
        'Translates audio into English.\n\nThis endpoint supports only `whisper-1`. The endpoint and model are deprecated\nand scheduled to shut down on February 26, 2027. Migrate to\n`/v1/realtime/translations`, which requires a separate integration. See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations)\nfor details.\n',
      operationId: 'createTranslation',
    },
  })
  .get('/audio/voice_consents', ({ query }) => {}, {
    query: AudioModel.listVoiceConsentsQuery,
    response: { 200: 'VoiceConsentListResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Audio'],
      summary: 'List voice consents',
      description: 'Returns a list of voice consent recordings.',
      operationId: 'listVoiceConsents',
    },
  })
  .post('/audio/voice_consents', ({ body }) => {}, {
    body: 'CreateVoiceConsentRequest',
    response: { 200: 'VoiceConsentResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Audio'],
      summary: 'Create voice consent',
      description: 'Upload a voice consent recording.',
      operationId: 'createVoiceConsent',
    },
  })
  .get('/audio/voice_consents/:consent_id', ({ params }) => {}, {
    params: AudioModel.getVoiceConsentParams,
    response: { 200: 'VoiceConsentResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Audio'],
      summary: 'Retrieve voice consent',
      description: 'Retrieves a voice consent recording.',
      operationId: 'getVoiceConsent',
    },
  })
  .post('/audio/voice_consents/:consent_id', ({ params, body }) => {}, {
    params: AudioModel.updateVoiceConsentParams,
    body: 'UpdateVoiceConsentRequest',
    response: { 200: 'VoiceConsentResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Audio'],
      summary: 'Update voice consent',
      description: 'Updates a voice consent recording (metadata only).',
      operationId: 'updateVoiceConsent',
    },
  })
  .delete('/audio/voice_consents/:consent_id', ({ params }) => {}, {
    params: AudioModel.deleteVoiceConsentParams,
    response: { 200: 'VoiceConsentDeletedResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Audio'],
      summary: 'Delete voice consent',
      description: 'Deletes a voice consent recording.',
      operationId: 'deleteVoiceConsent',
    },
  })
  .post('/audio/voices', ({ body }) => {}, {
    body: 'CreateVoicePromptRequest',
    response: {
      200: 'VoiceResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Audio'],
      summary: 'Create voice',
      description:
        'Creates a voice from a text prompt or from a consent recording and an audio sample.\n\nFor prompt-based creation, send `type: "prompt"` with a `name` and `prompt` as JSON or multipart form data. For creation from an audio sample, send `type: "audio_sample"` with a `name`, `audio_sample`, and `consent` recording ID as multipart form data. The type defaults to `audio_sample` when omitted.\n\nReturns the saved voice\'s metadata. Voices created from text prompts are supported only in Live, not in Realtime or the speech endpoint. The response does not include preview audio.\n',
      operationId: 'createVoice',
    },
  })
  .delete('/audio/voices/:voice_id', ({ params }) => {}, {
    params: AudioModel.deleteVoiceParams,
    response: { 200: 'VoiceDeletedResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Audio'],
      summary: 'Delete voice',
      description:
        "Deletes a voice created from a text prompt or an audio sample.\n\nRequires voice write permission and access to the voice's project. Access to voices created from recordings is limited to eligible customers. See the [custom voices guide](https://developers.openai.com/api/docs/guides/custom-voices).\n\nDeleting a voice does not delete its consent recording. Deleting an already deleted voice returns a 404 error.\n",
      operationId: 'deleteVoice',
    },
  })
