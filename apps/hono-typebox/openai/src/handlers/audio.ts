import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
  .post('/audio/speech', tbValidator('json', CreateSpeechRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/audio/transcriptions',
    tbValidator(
      'form',
      Type.Object(
        {
          file: Type.String({
            description:
              'The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.\nThe request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
          }),
          model: Type.Union(
            [
              Type.String(),
              Type.Union([
                Type.Literal('whisper-1'),
                Type.Literal('gpt-transcribe'),
                Type.Literal('gpt-4o-transcribe'),
                Type.Literal('gpt-4o-mini-transcribe'),
                Type.Literal('gpt-4o-mini-transcribe-2025-12-15'),
                Type.Literal('gpt-4o-transcribe-diarize'),
              ]),
            ],
            {
              description:
                'ID of the model to use. The options are `gpt-transcribe`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.\n',
              examples: ['gpt-transcribe'],
            },
          ),
          language: Type.Optional(
            Type.String({
              description:
                'The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.\n',
            }),
          ),
          languages: Type.Optional(
            Type.Array(Type.String(), {
              minItems: 1,
              description:
                'Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe`.\n',
            }),
          ),
          keywords: Type.Optional(
            Type.Array(Type.String(), {
              description:
                'Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe`.\n',
            }),
          ),
          prompt: Type.Optional(
            Type.String({
              description:
                "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
            }),
          ),
          response_format: Type.Optional(AudioResponseFormatSchema),
          temperature: Type.Optional(
            Codec(
              Type.String({
                pattern: '^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$',
                default: '0',
              }),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          include: Type.Optional(
            Type.Array(TranscriptionIncludeSchema, {
              description:
                "Additional information to include in the transcription response.\n`logprobs` will return the log probabilities of the tokens in the\nresponse to understand the model's confidence in the transcription.\n`logprobs` only works with response_format set to `json` and only with\nthe models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
            }),
          ),
          timestamp_granularities: Type.Optional(
            Type.Array(Type.Union([Type.Literal('word'), Type.Literal('segment')]), {
              description:
                'The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.\nThis option is not available for `gpt-4o-transcribe-diarize`.\n',
              default: ['segment'],
            }),
          ),
          stream: Type.Optional(
            Type.Union([
              Type.Optional(
                Codec(
                  Type.String({
                    pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                    default: 'false',
                  }),
                )
                  .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
                  .Encode((value) => (value ? 'true' : 'false')),
              ),
              Type.Null(),
            ]),
          ),
          chunking_strategy: Type.Optional(
            Type.Union([
              Type.Union(
                [
                  Type.Optional(
                    Type.Literal('auto', {
                      description:
                        'Automatically set chunking parameters based on the audio. Must be set to `"auto"`.\n',
                      default: 'auto',
                    }),
                  ),
                  Type.Object(
                    {
                      type: Type.Literal('server_vad', {
                        description:
                          'Must be set to `server_vad` to enable manual chunking using server side VAD.',
                      }),
                      prefix_padding_ms: Type.Optional(
                        Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '300' }))
                          .Decode((value) => Number(value))
                          .Encode((value) => String(value)),
                      ),
                      silence_duration_ms: Type.Optional(
                        Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '200' }))
                          .Decode((value) => Number(value))
                          .Encode((value) => String(value)),
                      ),
                      threshold: Type.Optional(
                        Codec(
                          Type.String({
                            pattern: '^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$',
                            default: '0.5',
                          }),
                        )
                          .Decode((value) => Number(value))
                          .Encode((value) => String(value)),
                      ),
                    },
                    { additionalProperties: false },
                  ),
                ],
                {
                  description:
                    'Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds. ',
                },
              ),
              Type.Null(),
            ]),
          ),
          known_speaker_names: Type.Optional(
            Type.Array(Type.String(), {
              maxItems: 4,
              description:
                'Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.\n',
            }),
          ),
          known_speaker_references: Type.Optional(
            Type.Array(Type.String(), {
              maxItems: 4,
              description:
                'Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.\n',
            }),
          ),
        },
        { additionalProperties: false },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/translations',
    tbValidator(
      'form',
      Type.Object(
        {
          file: Type.String({
            description:
              'The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm. The request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
          }),
          model: Type.Union([Type.String(), Type.Literal('whisper-1')], {
            description:
              'ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.\n',
            examples: ['whisper-1'],
          }),
          prompt: Type.Optional(
            Type.String({
              description:
                "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should be in English.\n",
            }),
          ),
          response_format: Type.Optional(
            Type.Union(
              [
                Type.Literal('json'),
                Type.Literal('text'),
                Type.Literal('srt'),
                Type.Literal('verbose_json'),
                Type.Literal('vtt'),
              ],
              {
                description:
                  'The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.\n',
                default: 'json',
              },
            ),
          ),
          temperature: Type.Optional(
            Codec(
              Type.String({
                pattern: '^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$',
                default: '0',
              }),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
        },
        { additionalProperties: false },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio/voice_consents',
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/audio/voice_consents', tbValidator('form', CreateVoiceConsentRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/audio/voice_consents/:consent_id',
    tbValidator('param', Type.Object({ consent_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/voice_consents/:consent_id',
    tbValidator('param', Type.Object({ consent_id: Type.String() })),
    tbValidator('json', UpdateVoiceConsentRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/audio/voice_consents/:consent_id',
    tbValidator('param', Type.Object({ consent_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/audio/voices',
    tbValidator('json', CreateVoicePromptRequestSchema),
    tbValidator('form', CreateVoiceRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/audio/voices/:voice_id',
    tbValidator('param', Type.Object({ voice_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
