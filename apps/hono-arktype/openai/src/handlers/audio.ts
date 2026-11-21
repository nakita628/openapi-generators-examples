import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
  .post('/audio/speech', sValidator('json', CreateSpeechRequestSchema), (c) => {})
  .post(
    '/audio/transcriptions',
    sValidator(
      'form',
      type({
        file: type('File').describe(
          'The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.\nThe request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
        ),
        model: type(
          "string | 'whisper-1' | 'gpt-transcribe' | 'gpt-4o-transcribe' | 'gpt-4o-mini-transcribe' | 'gpt-4o-mini-transcribe-2025-12-15' | 'gpt-4o-transcribe-diarize'",
        ).describe(
          'ID of the model to use. The options are `gpt-transcribe`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.\n',
        ),
        'language?': type('string').describe(
          'The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.\n',
        ),
        'languages?': type('unknown')
          .pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type('string[]').and(type('unknown[] >= 1')),
          )
          .describe(
            'Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe`.\n',
          ),
        'keywords?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]')
          .describe(
            'Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe`.\n',
          ),
        'prompt?': type('string').describe(
          "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
        ),
        'response_format?': AudioResponseFormatSchema,
        'temperature?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe(
            'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          ),
        'include?': type('unknown')
          .pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type(TranscriptionIncludeSchema).array(),
          )
          .describe(
            "Additional information to include in the transcription response.\n`logprobs` will return the log probabilities of the tokens in the\nresponse to understand the model's confidence in the transcription.\n`logprobs` only works with response_format set to `json` and only with\nthe models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
          ),
        'timestamp_granularities?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'word' | 'segment'[]")
          .describe(
            'The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.\nThis option is not available for `gpt-4o-transcribe-diarize`.\n',
          ),
        'stream?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
                  .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
                  .describe(
                    'If set to true, the model response data will be streamed to the client\nas it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).\nSee the [Streaming section of the Speech-to-Text guide](https://developers.openai.com/api/docs/guides/speech-to-text?lang=curl#streaming)\nfor more information.\n\nNote: Streaming is not supported for the `whisper-1` model and will be ignored.\n',
                  ),
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'chunking_strategy?': type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('unknown')
              .pipe((data, ctx) => {
                for (const branch of [
                  type("'auto'").describe(
                    'Automatically set chunking parameters based on the audio. Must be set to `"auto"`.\n',
                  ),
                  type({
                    type: type("'server_vad'").describe(
                      'Must be set to `server_vad` to enable manual chunking using server side VAD.',
                    ),
                    'prefix_padding_ms?': type('string')
                      .pipe((data, ctx) => {
                        const value = Number(data)
                        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                      })
                      .describe(
                        'Amount of audio to include before the VAD detected speech (in \nmilliseconds).\n',
                      ),
                    'silence_duration_ms?': type('string')
                      .pipe((data, ctx) => {
                        const value = Number(data)
                        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                      })
                      .describe(
                        'Duration of silence to detect speech stop (in milliseconds).\nWith shorter values the model will respond more quickly, \nbut may jump in on short pauses from the user.\n',
                      ),
                    'threshold?': type('string')
                      .pipe((data, ctx) => {
                        const value = Number(data)
                        return Number.isFinite(value) ? value : ctx.error('a number')
                      })
                      .describe(
                        'Sensitivity threshold (0.0 to 1.0) for voice activity detection. A \nhigher threshold will require louder audio to activate the model, and \nthus might perform better in noisy environments.\n',
                      ),
                    '+': 'reject',
                  }),
                ]) {
                  const out = branch(data)
                  if (!(out instanceof type.errors)) return out
                }
                return ctx.error('one of the members')
              })
              .describe(
                'Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds. ',
              ),
            type('unknown')
              .pipe((data) => (data === 'null' ? null : data))
              .to('null | null'),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
        'known_speaker_names?': type('unknown')
          .pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type('string[]').and(type('unknown[] <= 4')),
          )
          .describe(
            'Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.\n',
          ),
        'known_speaker_references?': type('unknown')
          .pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type('string[]').and(type('unknown[] <= 4')),
          )
          .describe(
            'Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.\n',
          ),
        '+': 'reject',
      }),
    ),
    (c) => {},
  )
  .post(
    '/audio/translations',
    sValidator(
      'form',
      type({
        file: type('File').describe(
          'The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm. The request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
        ),
        model: type("string | 'whisper-1'").describe(
          'ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.\n',
        ),
        'prompt?': type('string').describe(
          "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should be in English.\n",
        ),
        'response_format?': type("'json' | 'text' | 'srt' | 'verbose_json' | 'vtt'").describe(
          'The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.\n',
        ),
        'temperature?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe(
            'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          ),
        '+': 'reject',
      }),
    ),
    (c) => {},
  )
  .get(
    '/audio/voice_consents',
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
      }),
    ),
    (c) => {},
  )
  .post('/audio/voice_consents', sValidator('form', CreateVoiceConsentRequestSchema), (c) => {})
  .get(
    '/audio/voice_consents/:consent_id',
    sValidator('param', type({ consent_id: 'string' })),
    (c) => {},
  )
  .post(
    '/audio/voice_consents/:consent_id',
    sValidator('param', type({ consent_id: 'string' })),
    sValidator('json', UpdateVoiceConsentRequestSchema),
    (c) => {},
  )
  .delete(
    '/audio/voice_consents/:consent_id',
    sValidator('param', type({ consent_id: 'string' })),
    (c) => {},
  )
  .post(
    '/audio/voices',
    sValidator('json', CreateVoicePromptRequestSchema),
    sValidator('form', CreateVoiceRequestSchema),
    (c) => {},
  )
  .delete('/audio/voices/:voice_id', sValidator('param', type({ voice_id: 'string' })), (c) => {})
