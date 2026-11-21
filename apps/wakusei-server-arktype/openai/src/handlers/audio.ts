import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  CreateSpeechRequestSchema,
  CreateTranscriptionResponseDiarizedJsonSchema,
  CreateTranscriptionResponseJsonSchema,
  CreateTranscriptionResponseVerboseJsonSchema,
  CreateTranslationResponseJsonSchema,
  CreateTranslationResponseVerboseJsonSchema,
  CreateVoicePromptRequestSchema,
  VoiceConsentDeletedResourceSchema,
  VoiceConsentListResourceSchema,
  VoiceConsentResourceSchema,
  VoiceDeletedResourceSchema,
  VoiceResourceSchema,
} from '../components'

export const postAudioSpeech = os
  .route({
    method: 'POST',
    path: '/audio/speech',
    tags: ['Audio'],
    summary: 'Create speech',
    description:
      'Generates audio from the input text.\n\nReturns the audio file content, or a stream of audio events.\n\nThe `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, `gpt-4o-mini-tts-2025-03-20`, and\n`gpt-4o-mini-tts-2025-12-15` models are deprecated and scheduled to shut down\non January 6, 2027. These examples use the existing Speech API; for new\nintegrations, migrate to `gpt-realtime-2.1-mini` through the\n[Realtime API](https://developers.openai.com/api/docs/guides/realtime). See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations) for migration details.\n',
  })
  .input(CreateSpeechRequestSchema)
  .handler(async ({ input }) => {})

export const postAudioTranscriptions = os
  .route({
    method: 'POST',
    path: '/audio/transcriptions',
    tags: ['Audio'],
    summary: 'Create transcription',
    description:
      'Transcribes audio into the input language.\n\nReturns a transcription object in `json`, `diarized_json`, or `verbose_json`\nformat, plain text in `text`, `srt`, or `vtt` format, or a stream of\ntranscript events. Supported formats depend on the model.\n',
  })
  .output(
    type(
      type(CreateTranscriptionResponseJsonSchema).or(CreateTranscriptionResponseDiarizedJsonSchema),
    ).or(CreateTranscriptionResponseVerboseJsonSchema),
  )
  .handler(async ({ input }) => {})

export const postAudioTranslations = os
  .route({
    method: 'POST',
    path: '/audio/translations',
    tags: ['Audio'],
    summary: 'Create translation',
    description:
      'Translates audio into English.\n\nThis endpoint supports only `whisper-1`. The endpoint and model are deprecated\nand scheduled to shut down on February 26, 2027. Migrate to\n`/v1/realtime/translations`, which requires a separate integration. See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations)\nfor details.\n',
    deprecated: true,
  })
  .output(type(CreateTranslationResponseJsonSchema).or(CreateTranslationResponseVerboseJsonSchema))
  .handler(async ({ input }) => {})

export const getAudioVoiceConsents = os
  .route({
    method: 'GET',
    path: '/audio/voice_consents',
    tags: ['Audio'],
    summary: 'List voice consents',
    description: 'Returns a list of voice consent recordings.',
  })
  .input(
    type({
      'after?': type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
    }),
  )
  .output(VoiceConsentListResourceSchema)
  .handler(async ({ input }) => {})

export const postAudioVoiceConsents = os
  .route({
    method: 'POST',
    path: '/audio/voice_consents',
    tags: ['Audio'],
    summary: 'Create voice consent',
    description: 'Upload a voice consent recording.',
  })
  .output(VoiceConsentResourceSchema)
  .handler(async ({ input }) => {})

export const getAudioVoiceConsentsConsentId = os
  .route({
    method: 'GET',
    path: '/audio/voice_consents/{consent_id}',
    tags: ['Audio'],
    summary: 'Retrieve voice consent',
    description: 'Retrieves a voice consent recording.',
  })
  .input(type({ consent_id: type('string') }))
  .output(VoiceConsentResourceSchema)
  .handler(async ({ input }) => {})

export const postAudioVoiceConsentsConsentId = os
  .route({
    method: 'POST',
    path: '/audio/voice_consents/{consent_id}',
    tags: ['Audio'],
    summary: 'Update voice consent',
    description: 'Updates a voice consent recording (metadata only).',
  })
  .input(
    type({
      consent_id: type('string'),
      name: type('string').describe('The updated label for this consent recording.'),
    }),
  )
  .output(VoiceConsentResourceSchema)
  .handler(async ({ input }) => {})

export const deleteAudioVoiceConsentsConsentId = os
  .route({
    method: 'DELETE',
    path: '/audio/voice_consents/{consent_id}',
    tags: ['Audio'],
    summary: 'Delete voice consent',
    description: 'Deletes a voice consent recording.',
  })
  .input(type({ consent_id: type('string') }))
  .output(VoiceConsentDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const postAudioVoices = os
  .route({
    method: 'POST',
    path: '/audio/voices',
    tags: ['Audio'],
    summary: 'Create voice',
    description:
      'Creates a voice from a text prompt or from a consent recording and an audio sample.\n\nFor prompt-based creation, send `type: "prompt"` with a `name` and `prompt` as JSON or multipart form data. For creation from an audio sample, send `type: "audio_sample"` with a `name`, `audio_sample`, and `consent` recording ID as multipart form data. The type defaults to `audio_sample` when omitted.\n\nReturns the saved voice\'s metadata. Voices created from text prompts are supported only in Live, not in Realtime or the speech endpoint. The response does not include preview audio.\n',
  })
  .input(CreateVoicePromptRequestSchema)
  .output(VoiceResourceSchema)
  .handler(async ({ input }) => {})

export const deleteAudioVoicesVoiceId = os
  .route({
    method: 'DELETE',
    path: '/audio/voices/{voice_id}',
    tags: ['Audio'],
    summary: 'Delete voice',
    description:
      "Deletes a voice created from a text prompt or an audio sample.\n\nRequires voice write permission and access to the voice's project. Access to voices created from recordings is limited to eligible customers. See the [custom voices guide](https://developers.openai.com/api/docs/guides/custom-voices).\n\nDeleting a voice does not delete its consent recording. Deleting an already deleted voice returns a 404 error.\n",
  })
  .input(type({ voice_id: type('string') }))
  .output(VoiceDeletedResourceSchema)
  .handler(async ({ input }) => {})
