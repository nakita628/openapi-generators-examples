import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
  CreateVoicePromptRequestSchema,
  CreateVoiceRequestSchema,
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
            'application/octet-stream': { schema: resolver(v.file()) },
            'audio/mpeg': { schema: resolver(v.file()) },
            'audio/aac': { schema: resolver(v.file()) },
            'audio/opus': { schema: resolver(v.file()) },
            'audio/flac': { schema: resolver(v.file()) },
            'audio/pcm': { schema: resolver(v.file()) },
            'audio/wav': { schema: resolver(v.file()) },
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
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
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
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
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
                v.union([
                  CreateTranscriptionResponseJsonSchema,
                  CreateTranscriptionResponseDiarizedJsonSchema,
                  CreateTranscriptionResponseVerboseJsonSchema,
                ]),
              ),
            },
            'text/plain': { schema: resolver(v.string()) },
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
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
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
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
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
      v.strictObject({
        file: v.pipe(
          v.file(),
          v.description(
            'The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.\nThe request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
          ),
        ),
        model: v.pipe(
          v.union([
            v.string(),
            v.picklist([
              'whisper-1',
              'gpt-transcribe',
              'gpt-4o-transcribe',
              'gpt-4o-mini-transcribe',
              'gpt-4o-mini-transcribe-2025-12-15',
              'gpt-4o-transcribe-diarize',
            ]),
          ]),
          v.description(
            'ID of the model to use. The options are `gpt-transcribe`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.\n',
          ),
          v.metadata({ examples: ['gpt-transcribe'] }),
        ),
        language: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.\n',
            ),
          ),
        ),
        languages: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
              v.minLength(1),
            ),
            v.description(
              'Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe`.\n',
            ),
          ),
        ),
        keywords: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              'Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe`.\n',
            ),
          ),
        ),
        prompt: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
            ),
          ),
        ),
        response_format: v.optional(AudioResponseFormatSchema),
        temperature: v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.finite()), '0'),
          v.description(
            'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          ),
        ),
        include: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(TranscriptionIncludeSchema),
            ),
            v.description(
              "Additional information to include in the transcription response.\n`logprobs` will return the log probabilities of the tokens in the\nresponse to understand the model's confidence in the transcription.\n`logprobs` only works with response_format set to `json` and only with\nthe models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
            ),
          ),
        ),
        timestamp_granularities: v.pipe(
          v.optional(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.picklist(['word', 'segment'])),
            ),
            ['segment'],
          ),
          v.description(
            'The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.\nThis option is not available for `gpt-4o-transcribe-diarize`.\n',
          ),
        ),
        stream: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(
              v.union([
                v.pipe(
                  v.optional(
                    v.pipe(
                      v.string(),
                      v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                      v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
                    ),
                    'false',
                  ),
                  v.description(
                    'If set to true, the model response data will be streamed to the client\nas it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).\nSee the [Streaming section of the Speech-to-Text guide](https://developers.openai.com/api/docs/guides/speech-to-text?lang=curl#streaming)\nfor more information.\n\nNote: Streaming is not supported for the `whisper-1` model and will be ignored.\n',
                  ),
                ),
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(v.null()),
                ),
              ]),
            ),
          ),
        ),
        chunking_strategy: v.optional(
          v.union([
            v.pipe(
              v.union([
                v.pipe(
                  v.optional(v.literal('auto'), 'auto'),
                  v.description(
                    'Automatically set chunking parameters based on the audio. Must be set to `"auto"`.\n',
                  ),
                ),
                v.strictObject({
                  type: v.pipe(
                    v.literal('server_vad'),
                    v.description(
                      'Must be set to `server_vad` to enable manual chunking using server side VAD.',
                    ),
                  ),
                  prefix_padding_ms: v.pipe(
                    v.optional(
                      v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
                      '300',
                    ),
                    v.description(
                      'Amount of audio to include before the VAD detected speech (in \nmilliseconds).\n',
                    ),
                  ),
                  silence_duration_ms: v.pipe(
                    v.optional(
                      v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
                      '200',
                    ),
                    v.description(
                      'Duration of silence to detect speech stop (in milliseconds).\nWith shorter values the model will respond more quickly, \nbut may jump in on short pauses from the user.\n',
                    ),
                  ),
                  threshold: v.pipe(
                    v.optional(
                      v.pipe(v.string(), v.transform(Number), v.number(), v.finite()),
                      '0.5',
                    ),
                    v.description(
                      'Sensitivity threshold (0.0 to 1.0) for voice activity detection. A \nhigher threshold will require louder audio to activate the model, and \nthus might perform better in noisy environments.\n',
                    ),
                  ),
                }),
              ]),
              v.description(
                'Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds. ',
              ),
            ),
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(v.null()),
            ),
          ]),
        ),
        known_speaker_names: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
              v.maxLength(4),
            ),
            v.description(
              'Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.\n',
            ),
          ),
        ),
        known_speaker_references: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
              v.maxLength(4),
            ),
            v.description(
              'Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.\n',
            ),
          ),
        ),
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
                v.union([
                  CreateTranslationResponseJsonSchema,
                  CreateTranslationResponseVerboseJsonSchema,
                ]),
              ),
            },
            'text/plain': { schema: resolver(v.string()) },
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
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
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
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
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
      v.strictObject({
        file: v.pipe(
          v.file(),
          v.description(
            'The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm. The request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
          ),
        ),
        model: v.pipe(
          v.union([v.string(), v.literal('whisper-1')]),
          v.description(
            'ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.\n',
          ),
          v.metadata({ examples: ['whisper-1'] }),
        ),
        prompt: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should be in English.\n",
            ),
          ),
        ),
        response_format: v.pipe(
          v.optional(v.picklist(['json', 'text', 'srt', 'verbose_json', 'vtt']), 'json'),
          v.description(
            'The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.\n',
          ),
        ),
        temperature: v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.finite()), '0'),
          v.description(
            'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          ),
        ),
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
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
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
    validator('param', v.object({ consent_id: v.string() })),
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
    validator('param', v.object({ consent_id: v.string() })),
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
    validator('param', v.object({ consent_id: v.string() })),
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
    validator('form', CreateVoiceRequestSchema),
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
    validator('param', v.object({ voice_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
