import { t, type UnwrapSchema } from 'elysia'
import {
  CreateTranscriptionResponseDiarizedJsonSchema,
  CreateTranscriptionResponseJsonSchema,
  CreateTranscriptionResponseVerboseJsonSchema,
  CreateTranslationResponseJsonSchema,
  CreateTranslationResponseVerboseJsonSchema,
  VadConfigSchema,
} from '../../components/schemas'

export const AudioModel = {
  createTranscriptionBody: t.Form(
    {
      file: t.File({
        description:
          'The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.\nThe request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
      }),
      model: t.Union(
        [
          t.String(),
          t.UnionEnum(
            [
              'whisper-1',
              'gpt-transcribe',
              'gpt-4o-transcribe',
              'gpt-4o-mini-transcribe',
              'gpt-4o-mini-transcribe-2025-12-15',
              'gpt-4o-transcribe-diarize',
            ],
            { default: undefined },
          ),
        ],
        {
          example: 'gpt-transcribe',
          description:
            'ID of the model to use. The options are `gpt-transcribe`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.\n',
        },
      ),
      language: t.Optional(
        t.String({
          description:
            'The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.\n',
        }),
      ),
      languages: t.Optional(
        t.ArrayQuery(t.String(), {
          minItems: 1,
          description:
            'Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe`.\n',
        }),
      ),
      keywords: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            'Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe`.\n',
        }),
      ),
      prompt: t.Optional(
        t.String({
          description:
            "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
        }),
      ),
      response_format: t.Optional(
        t.UnionEnum(['json', 'text', 'srt', 'verbose_json', 'vtt', 'diarized_json'], {
          description:
            'The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, `vtt`, or `diarized_json`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`. For `gpt-4o-transcribe-diarize`, the supported formats are `json`, `text`, and `diarized_json`, with `diarized_json` required to receive speaker annotations.\n',
          default: 'json',
        }),
      ),
      temperature: t.Optional(
        t.Numeric({
          description:
            'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          default: 0,
        }),
      ),
      include: t.Optional(
        t.ArrayQuery(t.Literal('logprobs'), {
          description:
            "Additional information to include in the transcription response.\n`logprobs` will return the log probabilities of the tokens in the\nresponse to understand the model's confidence in the transcription.\n`logprobs` only works with response_format set to `json` and only with\nthe models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.\n",
        }),
      ),
      timestamp_granularities: t.Optional(
        t.ArrayQuery(t.UnionEnum(['word', 'segment'], { default: undefined }), {
          description:
            'The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.\nThis option is not available for `gpt-4o-transcribe-diarize`.\n',
          default: ['segment'],
        }),
      ),
      stream: t.Optional(
        t.Union([
          t.Boolean({
            description:
              'If set to true, the model response data will be streamed to the client\nas it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).\nSee the [Streaming section of the Speech-to-Text guide](https://developers.openai.com/api/docs/guides/speech-to-text?lang=curl#streaming)\nfor more information.\n\nNote: Streaming is not supported for the `whisper-1` model and will be ignored.\n',
            default: false,
          }),
          t.Null(),
        ]),
      ),
      chunking_strategy: t.Optional(
        t.Union([
          t.Union(
            [
              t.Literal('auto', {
                description:
                  'Automatically set chunking parameters based on the audio. Must be set to `"auto"`.\n',
                default: 'auto',
              }),
              VadConfigSchema,
            ],
            {
              description:
                'Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds. ',
            },
          ),
          t.Null(),
        ]),
      ),
      known_speaker_names: t.Optional(
        t.ArrayQuery(t.String(), {
          maxItems: 4,
          description:
            'Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.\n',
        }),
      ),
      known_speaker_references: t.Optional(
        t.ArrayQuery(t.String(), {
          maxItems: 4,
          description:
            'Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.\n',
        }),
      ),
    },
    { additionalProperties: false },
  ),
  createTranscriptionResponse200: t.Union([
    CreateTranscriptionResponseJsonSchema,
    CreateTranscriptionResponseDiarizedJsonSchema,
    CreateTranscriptionResponseVerboseJsonSchema,
  ]),
  createTranslationBody: t.Form(
    {
      file: t.File({
        description:
          'The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm. The request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.\n',
      }),
      model: t.Union([t.String(), t.Literal('whisper-1')], {
        example: 'whisper-1',
        description:
          'ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.\n',
      }),
      prompt: t.Optional(
        t.String({
          description:
            "An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) should be in English.\n",
        }),
      ),
      response_format: t.Optional(
        t.UnionEnum(['json', 'text', 'srt', 'verbose_json', 'vtt'], {
          description:
            'The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.\n',
          default: 'json',
        }),
      ),
      temperature: t.Optional(
        t.Numeric({
          description:
            'The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n',
          default: 0,
        }),
      ),
    },
    { additionalProperties: false },
  ),
  createTranslationResponse200: t.Union([
    CreateTranslationResponseJsonSchema,
    CreateTranslationResponseVerboseJsonSchema,
  ]),
  listVoiceConsentsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
  }),
  createVoiceConsentBody: t.Form(
    {
      name: t.String({ description: 'The label to use for this consent recording.' }),
      recording: t.File({
        description:
          'The consent audio recording file. Maximum size is 10 MiB.\n\nSupported MIME types:\n`audio/mpeg`, `audio/wav`, `audio/x-wav`, `audio/ogg`, `audio/aac`, `audio/flac`, `audio/webm`, `audio/mp4`.\n',
      }),
      language: t.String({
        description: 'The BCP 47 language tag for the consent phrase (for example, `en-US`).',
      }),
    },
    { additionalProperties: false },
  ),
  getVoiceConsentParams: t.Object({ consent_id: t.String() }),
  updateVoiceConsentParams: t.Object({ consent_id: t.String() }),
  deleteVoiceConsentParams: t.Object({ consent_id: t.String() }),
  deleteVoiceParams: t.Object({ voice_id: t.String() }),
} as const

export type AudioModel = { [k in keyof typeof AudioModel]: UnwrapSchema<(typeof AudioModel)[k]> }
