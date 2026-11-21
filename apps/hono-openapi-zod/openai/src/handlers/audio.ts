import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  AudioResponseFormatSchema,
  CreateSpeechRequestSchema,
  CreateSpeechResponseStreamEventSchema,
  CreateTranscriptionResponseDiarizedJsonSchema,
  CreateTranscriptionResponseJsonSchema,
  CreateTranscriptionResponseStreamEventSchema,
  CreateTranscriptionResponseVerboseJsonSchema,
  CreateTranslationResponseJsonSchema,
  CreateTranslationResponseVerboseJsonSchema,
  CreateVoiceConsentRequestSchema,
  CreateVoiceFromConsentRequestSchema,
  CreateVoicePromptRequestSchema,
  ErrorResponseSchema,
  TranscriptionIncludeSchema,
  UpdateVoiceConsentRequestSchema,
  VoiceConsentDeletedResourceSchema,
  VoiceConsentListResourceSchema,
  VoiceConsentResourceSchema,
  VoiceDeletedResourceSchema,
  VoiceResourceSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

export const audioHandler = new Hono()
  .post(
    '/audio/speech',
    describeRoute({
      operationId: 'createSpeech',
      tags: ['Audio'],
      summary: 'Create speech',
      description:
        'Generates audio from the input text.\n\nReturns the audio file content, or a stream of audio events.\n\nThe `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, `gpt-4o-mini-tts-2025-03-20`, and\n`gpt-4o-mini-tts-2025-12-15` models are deprecated and scheduled to shut down\non January 6, 2027. These examples use the existing Speech API; for new\nintegrations, migrate to `gpt-realtime-2.1-mini` through the\n[Realtime API](https://developers.openai.com/api/docs/guides/realtime). See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations) for migration details.\n',
      responses: {
        '200': {
          description: 'OK',
          headers: { 'Transfer-Encoding': { schema: { type: 'string' }, description: 'chunked' } },
          content: {
            'application/octet-stream': { schema: resolver(z.file()) },
            'audio/mpeg': { schema: resolver(z.file()) },
            'audio/aac': { schema: resolver(z.file()) },
            'audio/opus': { schema: resolver(z.file()) },
            'audio/flac': { schema: resolver(z.file()) },
            'audio/pcm': { schema: resolver(z.file()) },
            'audio/wav': { schema: resolver(z.file()) },
            'text/event-stream': { schema: resolver(CreateSpeechResponseStreamEventSchema) },
          },
        },
        '400': {
          description: 'Invalid speech request, input, output format, or voice.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '401': {
          description:
            'Authentication failed because the API key is missing or revoked, or the client IP is not authorized.',
          content: {
            'application/json': { schema: resolver(ErrorResponseSchema) },
            'text/plain': {
              schema: resolver(
                z
                  .string()
                  .meta({
                    description:
                      'JSON-encoded error text containing an error object and the HTTP status.',
                  }),
              ),
            },
          },
        },
        '403': {
          description:
            'Access to a personal API organization is blocked by the organization policy.',
          content: {
            'text/plain': {
              schema: resolver(
                z
                  .string()
                  .meta({
                    description:
                      'JSON-encoded error text containing an error object and the HTTP status.',
                  }),
              ),
            },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The voice or speech audio could not be processed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', CreateSpeechRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/transcriptions',
    describeRoute({
      operationId: 'createTranscription',
      tags: ['Audio'],
      summary: 'Create transcription',
      description:
        'Transcribes audio into the input language.\n\nReturns a transcription object in `json`, `diarized_json`, or `verbose_json`\nformat, plain text in `text`, `srt`, or `vtt` format, or a stream of\ntranscript events. Supported formats depend on the model.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                z.union([
                  CreateTranscriptionResponseJsonSchema,
                  CreateTranscriptionResponseDiarizedJsonSchema,
                  CreateTranscriptionResponseVerboseJsonSchema,
                ]),
              ),
            },
            'text/plain': { schema: resolver(z.string()) },
            'text/event-stream': { schema: resolver(CreateTranscriptionResponseStreamEventSchema) },
          },
        },
        '400': {
          description: 'Invalid audio input or request parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '401': {
          description:
            'Authentication failed because the API key is missing or revoked, or the client IP is not authorized.',
          content: {
            'application/json': { schema: resolver(ErrorResponseSchema) },
            'text/plain': {
              schema: resolver(
                z
                  .string()
                  .meta({
                    description:
                      'JSON-encoded error text containing an error object and the HTTP status.',
                  }),
              ),
            },
          },
        },
        '403': {
          description:
            'Access to a personal API organization is blocked by the organization policy.',
          content: {
            'text/plain': {
              schema: resolver(
                z
                  .string()
                  .meta({
                    description:
                      'JSON-encoded error text containing an error object and the HTTP status.',
                  }),
              ),
            },
          },
        },
        '413': {
          description: 'The audio request exceeds the supported size limit.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The audio could not be processed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '502': {
          description: 'The upstream audio service connection failed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator(
      'form',
      z.strictObject({
        file: z
          .file()
          .meta({
            description:
              'The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.\nThe request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
          }),
        model: z
          .union([
            z.string(),
            z.enum([
              'whisper-1',
              'gpt-transcribe',
              'gpt-4o-transcribe',
              'gpt-4o-mini-transcribe',
              'gpt-4o-mini-transcribe-2025-12-15',
              'gpt-4o-transcribe-diarize',
            ]),
          ])
          .meta({
            description:
              'ID of the model to use. The options are `gpt-transcribe`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.\n',
            examples: ['gpt-transcribe'],
          }),
        language: z
          .string()
          .meta({
            description:
              'The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.\n',
          })
          .exactOptional(),
        languages: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()).min(1),
          )
          .meta({
            description:
              'Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe`.\n',
          })
          .exactOptional(),
        keywords: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              'Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe`.\n',
          })
          .exactOptional(),
        prompt: z
          .string()
          .meta({
            description:
              "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
          })
          .exactOptional(),
        response_format: AudioResponseFormatSchema.exactOptional(),
        temperature: z.coerce
          .number()
          .default(0)
          .meta({
            description:
              'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          })
          .exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(TranscriptionIncludeSchema),
          )
          .meta({
            description:
              "Additional information to include in the transcription response.\n`logprobs` will return the log probabilities of the tokens in the\nresponse to understand the model's confidence in the transcription.\n`logprobs` only works with response_format set to `json` and only with\nthe models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
          })
          .exactOptional(),
        timestamp_granularities: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['word', 'segment'])),
          )
          .default(['segment'])
          .meta({
            description:
              'The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.\nThis option is not available for `gpt-4o-transcribe-diarize`.\n',
          })
          .exactOptional(),
        stream: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .stringbool()
                  .default(false)
                  .meta({
                    description:
                      'If set to true, the model response data will be streamed to the client\nas it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).\nSee the [Streaming section of the Speech-to-Text guide](https://developers.openai.com/api/docs/guides/speech-to-text?lang=curl#streaming)\nfor more information.\n\nNote: Streaming is not supported for the `whisper-1` model and will be ignored.\n',
                  }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        chunking_strategy: z
          .union([
            z
              .union([
                z
                  .literal('auto')
                  .default('auto')
                  .meta({
                    description:
                      'Automatically set chunking parameters based on the audio. Must be set to `"auto"`.\n',
                  }),
                z.strictObject({
                  type: z
                    .literal('server_vad')
                    .meta({
                      description:
                        'Must be set to `server_vad` to enable manual chunking using server side VAD.',
                    }),
                  prefix_padding_ms: z.coerce
                    .number()
                    .int()
                    .default(300)
                    .meta({
                      description:
                        'Amount of audio to include before the VAD detected speech (in \nmilliseconds).\n',
                    })
                    .exactOptional(),
                  silence_duration_ms: z.coerce
                    .number()
                    .int()
                    .default(200)
                    .meta({
                      description:
                        'Duration of silence to detect speech stop (in milliseconds).\nWith shorter values the model will respond more quickly, \nbut may jump in on short pauses from the user.\n',
                    })
                    .exactOptional(),
                  threshold: z.coerce
                    .number()
                    .default(0.5)
                    .meta({
                      description:
                        'Sensitivity threshold (0.0 to 1.0) for voice activity detection. A \nhigher threshold will require louder audio to activate the model, and \nthus might perform better in noisy environments.\n',
                    })
                    .exactOptional(),
                }),
              ])
              .meta({
                description:
                  'Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds. ',
              }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        known_speaker_names: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()).max(4),
          )
          .meta({
            description:
              'Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.\n',
          })
          .exactOptional(),
        known_speaker_references: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()).max(4),
          )
          .meta({
            description:
              'Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/translations',
    describeRoute({
      operationId: 'createTranslation',
      deprecated: true,
      tags: ['Audio'],
      summary: 'Create translation',
      description:
        'Translates audio into English.\n\nThis endpoint supports only `whisper-1`. The endpoint and model are deprecated\nand scheduled to shut down on February 26, 2027. Migrate to\n`/v1/realtime/translations`, which requires a separate integration. See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations)\nfor details.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                z.xor([
                  CreateTranslationResponseJsonSchema,
                  CreateTranslationResponseVerboseJsonSchema,
                ]),
              ),
            },
            'text/plain': { schema: resolver(z.string()) },
          },
        },
        '400': {
          description: 'Invalid audio input or request parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '401': {
          description:
            'Authentication failed because the API key is missing or revoked, or the client IP is not authorized.',
          content: {
            'application/json': { schema: resolver(ErrorResponseSchema) },
            'text/plain': {
              schema: resolver(
                z
                  .string()
                  .meta({
                    description:
                      'JSON-encoded error text containing an error object and the HTTP status.',
                  }),
              ),
            },
          },
        },
        '403': {
          description:
            'Access to a personal API organization is blocked by the organization policy.',
          content: {
            'text/plain': {
              schema: resolver(
                z
                  .string()
                  .meta({
                    description:
                      'JSON-encoded error text containing an error object and the HTTP status.',
                  }),
              ),
            },
          },
        },
        '413': {
          description: 'The audio request exceeds the supported size limit.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The audio could not be processed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '502': {
          description: 'The upstream audio service connection failed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator(
      'form',
      z.strictObject({
        file: z
          .file()
          .meta({
            description:
              'The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm. The request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
          }),
        model: z
          .union([z.string(), z.literal('whisper-1')])
          .meta({
            description:
              'ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.\n',
            examples: ['whisper-1'],
          }),
        prompt: z
          .string()
          .meta({
            description:
              "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should be in English.\n",
          })
          .exactOptional(),
        response_format: z
          .enum(['json', 'text', 'srt', 'verbose_json', 'vtt'])
          .default('json')
          .meta({
            description:
              'The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.\n',
          })
          .exactOptional(),
        temperature: z.coerce
          .number()
          .default(0)
          .meta({
            description:
              'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio/voice_consents',
    describeRoute({
      operationId: 'listVoiceConsents',
      tags: ['Audio'],
      summary: 'List voice consents',
      description: 'Returns a list of voice consent recordings.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VoiceConsentListResourceSchema) } },
        },
        '400': {
          description: 'Invalid pagination parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The endpoint is unavailable or the pagination cursor was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/voice_consents',
    describeRoute({
      operationId: 'createVoiceConsent',
      tags: ['Audio'],
      summary: 'Create voice consent',
      description: 'Upload a voice consent recording.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VoiceConsentResourceSchema) } },
        },
        '400': {
          description: 'Invalid consent recording or consent phrase.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The endpoint is unavailable to this caller.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('form', CreateVoiceConsentRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio/voice_consents/:consent_id',
    describeRoute({
      operationId: 'getVoiceConsent',
      tags: ['Audio'],
      summary: 'Retrieve voice consent',
      description: 'Retrieves a voice consent recording.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VoiceConsentResourceSchema) } },
        },
        '400': {
          description: 'Invalid consent recording ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The endpoint is unavailable or the consent recording was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ consent_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/voice_consents/:consent_id',
    describeRoute({
      operationId: 'updateVoiceConsent',
      tags: ['Audio'],
      summary: 'Update voice consent',
      description: 'Updates a voice consent recording (metadata only).',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VoiceConsentResourceSchema) } },
        },
        '400': {
          description: 'Invalid consent recording ID or update.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The endpoint is unavailable or the consent recording was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ consent_id: z.string() })),
    validator('json', UpdateVoiceConsentRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/audio/voice_consents/:consent_id',
    describeRoute({
      operationId: 'deleteVoiceConsent',
      tags: ['Audio'],
      summary: 'Delete voice consent',
      description: 'Deletes a voice consent recording.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VoiceConsentDeletedResourceSchema) } },
        },
        '400': {
          description: 'Invalid consent recording ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The endpoint is unavailable or the consent recording was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ consent_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/voices',
    describeRoute({
      operationId: 'createVoice',
      tags: ['Audio'],
      summary: 'Create voice',
      description:
        'Creates a voice from a text prompt or from a consent recording and an audio sample.\n\nFor prompt-based creation, send `type: "prompt"` with a `name` and `prompt` as JSON or multipart form data. For creation from an audio sample, send `type: "audio_sample"` with a `name`, `audio_sample`, and `consent` recording ID as multipart form data. The type defaults to `audio_sample` when omitted.\n\nReturns the saved voice\'s metadata. Voices created from text prompts are supported only in Live, not in Realtime or the speech endpoint. The response does not include preview audio.\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VoiceResourceSchema) } },
        },
        '400': {
          description:
            'Invalid voice request, prompt, script hint, model, consent recording, or audio sample.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The endpoint is unavailable or the consent recording was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The audio sample could not be processed or the voice could not be created.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateVoicePromptRequestSchema),
    validator(
      'form',
      z.union([CreateVoiceFromConsentRequestSchema, CreateVoicePromptRequestSchema]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/audio/voices/:voice_id',
    describeRoute({
      operationId: 'deleteVoice',
      tags: ['Audio'],
      summary: 'Delete voice',
      description:
        "Deletes a voice created from a text prompt or an audio sample.\n\nRequires voice write permission and access to the voice's project. Access to voices created from recordings is limited to eligible customers. See the [custom voices guide](https://developers.openai.com/api/docs/guides/custom-voices).\n\nDeleting a voice does not delete its consent recording. Deleting an already deleted voice returns a 404 error.\n",
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VoiceDeletedResourceSchema) } },
        },
        '400': {
          description: 'Invalid voice ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or the voice was not found in the requested project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ voice_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
