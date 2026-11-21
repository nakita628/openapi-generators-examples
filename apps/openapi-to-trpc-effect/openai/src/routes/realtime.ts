import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  AudioTranscriptionSchema,
  MCPToolSchema,
  PromptSchema,
  RealtimeAudioFormatsSchema,
  RealtimeCreateClientSecretRequestSchema,
  RealtimeCreateClientSecretResponseSchema,
  RealtimeFunctionToolSchema,
  RealtimeReasoningSchema,
  RealtimeSessionCreateRequestSchema,
  RealtimeSessionCreateResponseSchema,
  RealtimeTranscriptionSessionCreateRequestSchema,
  RealtimeTranscriptionSessionCreateResponseSchema,
  RealtimeTranslationClientSecretCreateRequestSchema,
  RealtimeTranslationClientSecretCreateResponseSchema,
  RealtimeTruncationSchema,
  RealtimeTurnDetectionSchema,
  ToolChoiceFunctionSchema,
  ToolChoiceMCPSchema,
  ToolChoiceOptionsSchema,
  VoiceIdsOrCustomVoiceSchema,
} from '../components'

const t = initTRPC.create()

export const realtimeRouter = t.router({
  postRealtimeCalls: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postRealtimeCallsCallIdAccept: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          call_id: Schema.String,
          type: Schema.Literal('realtime').annotate({
            description: 'The type of session to create. Always `realtime` for the Realtime API.\n',
          }),
          output_modalities: Schema.Array(Schema.Literals(['text', 'audio']))
            .pipe(Schema.withDecodingDefault(Effect.succeed(['audio'])))
            .annotate({
              description:
                'The set of modalities the model can respond with. It defaults to `["audio"]`, indicating\nthat the model will respond with audio plus a transcript. `["text"]` can be used to make\nthe model respond with text only. It is not possible to request both `text` and `audio` at the same time.\n',
            }),
          model: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Literals([
                'gpt-realtime',
                'gpt-realtime-1.5',
                'gpt-realtime-2',
                'gpt-realtime-2.1',
                'gpt-realtime-2.1-mini',
                'gpt-realtime-2025-08-28',
                'gpt-4o-realtime-preview',
                'gpt-4o-realtime-preview-2024-10-01',
                'gpt-4o-realtime-preview-2024-12-17',
                'gpt-4o-realtime-preview-2025-06-03',
                'gpt-4o-mini-realtime-preview',
                'gpt-4o-mini-realtime-preview-2024-12-17',
                'gpt-realtime-mini',
                'gpt-realtime-mini-2025-10-06',
                'gpt-realtime-mini-2025-12-15',
                'gpt-audio-1.5',
                'gpt-audio-mini',
                'gpt-audio-mini-2025-10-06',
                'gpt-audio-mini-2025-12-15',
              ]),
            ]).annotate({
              description: 'The Realtime model used for this session.\n',
              jsonSchemaExamples: ['gpt-realtime-2.1'],
            }),
          ),
          instructions: Schema.optional(
            Schema.String.annotate({
              description:
                'The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.\n\nNote that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.\n',
            }),
          ),
          audio: Schema.Struct({
            input: Schema.optional(
              Schema.Struct({
                format: Schema.optional(
                  RealtimeAudioFormatsSchema.annotate({
                    description: 'The format of the input audio.',
                  }),
                ),
                transcription: Schema.optional(
                  AudioTranscriptionSchema.annotate({
                    description:
                      'Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.\n',
                  }),
                ),
                noise_reduction: Schema.optional(
                  Schema.Unknown.check(
                    Schema.makeFilter(
                      (input) =>
                        !Array.isArray(input) &&
                        typeof input !== 'string' &&
                        typeof input !== 'number' &&
                        typeof input !== 'boolean',
                    ),
                  ).annotate({
                    description:
                      'When you supply a `noise_reduction` object, you must set `type` to `near_field` or `far_field`.\nSet `noise_reduction` to `null` to turn off input audio noise reduction.\nNoise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.\nFiltering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.\n',
                  }),
                ),
                turn_detection: Schema.optional(RealtimeTurnDetectionSchema),
              }),
            ),
            output: Schema.Struct({
              format: Schema.optional(
                RealtimeAudioFormatsSchema.annotate({
                  description: 'The format of the output audio.',
                }),
              ),
              voice: VoiceIdsOrCustomVoiceSchema.pipe(
                Schema.withDecodingDefault(Effect.succeed('alloy')),
              ).annotate({
                description:
                  'The voice the model uses to respond. Supported built-in voices are\n`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`,\n`marin`, and `cedar`. You may also provide a custom voice object with\nan `id`, for example `{ "id": "voice_1234" }`. Voice cannot be changed\nduring the session once the model has responded with audio at least once.\nCustom voices must be created from audio samples. Voices created from text prompts are supported only in Live.\nWe recommend `marin` and `cedar` for best quality.\n',
              }),
              speed: Schema.Number.check(
                Schema.isGreaterThanOrEqualTo(0.25),
                Schema.isLessThanOrEqualTo(1.5),
              )
                .pipe(Schema.withDecodingDefault(Effect.succeed(1)))
                .annotate({
                  description:
                    "The speed of the model's spoken response as a multiple of the original speed.\n1.0 is the default speed. 0.25 is the minimum speed. 1.5 is the maximum speed. This value can only be changed in between model turns, not while a response is in progress.\n\nThis parameter is a post-processing adjustment to the audio after it is generated, it's\nalso possible to prompt the model to speak faster or slower.\n",
                }),
            }),
          }).annotate({ description: 'Configuration for input and output audio.\n' }),
          include: Schema.optional(
            Schema.Array(Schema.Literal('item.input_audio_transcription.logprobs')).annotate({
              description:
                'Additional fields to include in server outputs.\n\n`item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.\n',
            }),
          ),
          tracing: Schema.Union([
            Schema.Literal('auto')
              .pipe(Schema.withDecodingDefault(Effect.succeed('auto')))
              .annotate({
                description:
                  'Enables tracing and sets default values for tracing configuration options. Always `auto`.\n',
              }),
            Schema.Struct({
              workflow_name: Schema.optional(
                Schema.String.annotate({
                  description:
                    'The name of the workflow to attach to this trace. This is used to\nname the trace in the Traces Dashboard.\n',
                }),
              ),
              group_id: Schema.optional(
                Schema.String.annotate({
                  description:
                    'The group id to attach to this trace to enable filtering and\ngrouping in the Traces Dashboard.\n',
                }),
              ),
              metadata: Schema.optional(
                Schema.Struct({}).annotate({
                  description:
                    'The arbitrary metadata to attach to this trace to enable\nfiltering in the Traces Dashboard.\n',
                }),
              ),
            }).annotate({ description: 'Granular configuration for tracing.\n' }),
            Schema.NullOr(Schema.Null),
          ]).annotate({
            description:
              'Realtime API can write session traces to the [Traces Dashboard](https://platform.openai.com/logs?api=traces). Set to null to disable tracing. Once\ntracing is enabled for a session, the configuration cannot be modified.\n\n`auto` will create a trace for the session with default values for the\nworkflow name, group id, and metadata.\n',
          }),
          tools: Schema.optional(
            Schema.Array(Schema.Union([RealtimeFunctionToolSchema, MCPToolSchema])).annotate({
              description: 'Tools available to the model.',
            }),
          ),
          tool_choice: Schema.Union([
            ToolChoiceOptionsSchema,
            ToolChoiceFunctionSchema,
            ToolChoiceMCPSchema,
          ])
            .pipe(Schema.withDecodingDefault(Effect.succeed('auto')))
            .annotate({
              description:
                'How the model chooses tools. Provide one of the string modes or force a specific\nfunction/MCP tool.\n',
            }),
          parallel_tool_calls: Schema.optional(
            Schema.Boolean.annotate({
              description:
                'Whether the model may call multiple tools in parallel. Only supported by\nreasoning Realtime models such as `gpt-realtime-2`.\n',
            }),
          ),
          reasoning: Schema.optional(RealtimeReasoningSchema),
          max_output_tokens: Schema.optional(
            Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Literal('inf')]).annotate({
              description:
                'Maximum number of output tokens for a single assistant response,\ninclusive of tool calls. Provide an integer between 1 and 4096 to\nlimit output tokens, or `inf` for the maximum available tokens for a\ngiven model. Defaults to `inf`.\n',
            }),
          ),
          truncation: Schema.optional(RealtimeTruncationSchema),
          prompt: Schema.optional(PromptSchema),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeCallsCallIdHangup: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ call_id: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeCallsCallIdRefer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          call_id: Schema.String,
          target_uri: Schema.String.annotate({
            description:
              'URI that should appear in the SIP Refer-To header. Supports values like\n`tel:+14155550123` or `sip:agent@example.com`.',
            jsonSchemaExamples: ['tel:+14155550123'],
          }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeCallsCallIdReject: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          call_id: Schema.String,
          status_code: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'SIP response code to send back to the caller. Defaults to `603` (Decline)\nwhen omitted.',
              jsonSchemaExamples: [486],
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeClientSecrets: t.procedure
    .input(Schema.toStandardSchemaV1(RealtimeCreateClientSecretRequestSchema))
    .output(Schema.toStandardSchemaV1(RealtimeCreateClientSecretResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeSessions: t.procedure
    .input(Schema.toStandardSchemaV1(RealtimeSessionCreateRequestSchema))
    .output(Schema.toStandardSchemaV1(RealtimeSessionCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeTranscriptionSessions: t.procedure
    .input(Schema.toStandardSchemaV1(RealtimeTranscriptionSessionCreateRequestSchema))
    .output(Schema.toStandardSchemaV1(RealtimeTranscriptionSessionCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeTranslationsClientSecrets: t.procedure
    .input(Schema.toStandardSchemaV1(RealtimeTranslationClientSecretCreateRequestSchema))
    .output(Schema.toStandardSchemaV1(RealtimeTranslationClientSecretCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
