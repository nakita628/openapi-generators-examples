import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  AudioResponseFormatSchema,
  CreateSpeechRequestSchema,
  CreateVoiceConsentRequestSchema,
  CreateVoicePromptRequestSchema,
  CreateVoiceRequestSchema,
  TranscriptionIncludeSchema,
  UpdateVoiceConsentRequestSchema,
} from '../components'

export const audioHandler = new Hono()
  .post('/audio/speech', sValidator('json', CreateSpeechRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/audio/transcriptions',
    sValidator(
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
    sValidator(
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
    sValidator(
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
  .post('/audio/voice_consents', sValidator('form', CreateVoiceConsentRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/audio/voice_consents/:consent_id',
    sValidator('param', v.object({ consent_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/voice_consents/:consent_id',
    sValidator('param', v.object({ consent_id: v.string() })),
    sValidator('json', UpdateVoiceConsentRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/audio/voice_consents/:consent_id',
    sValidator('param', v.object({ consent_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/voices',
    sValidator('json', CreateVoicePromptRequestSchema),
    sValidator('form', CreateVoiceRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/audio/voices/:voice_id',
    sValidator('param', v.object({ voice_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
