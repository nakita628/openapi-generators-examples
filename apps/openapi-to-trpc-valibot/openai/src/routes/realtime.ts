import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        call_id: v.string(),
        type: v.pipe(
          v.literal('realtime'),
          v.description('The type of session to create. Always `realtime` for the Realtime API.\n'),
        ),
        output_modalities: v.pipe(
          v.optional(v.array(v.picklist(['text', 'audio'])), ['audio']),
          v.description(
            'The set of modalities the model can respond with. It defaults to `["audio"]`, indicating\nthat the model will respond with audio plus a transcript. `["text"]` can be used to make\nthe model respond with text only. It is not possible to request both `text` and `audio` at the same time.\n',
          ),
        ),
        model: v.optional(
          v.pipe(
            v.union([
              v.string(),
              v.picklist([
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
            ]),
            v.description('The Realtime model used for this session.\n'),
            v.metadata({ examples: ['gpt-realtime-2.1'] }),
          ),
        ),
        instructions: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.\n\nNote that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.\n',
            ),
          ),
        ),
        audio: v.optional(
          v.pipe(
            v.partial(
              v.object({
                input: v.partial(
                  v.object({
                    format: v.pipe(
                      RealtimeAudioFormatsSchema,
                      v.description('The format of the input audio.'),
                    ),
                    transcription: v.pipe(
                      AudioTranscriptionSchema,
                      v.description(
                        'Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.\n',
                      ),
                    ),
                    noise_reduction: v.pipe(
                      v.custom<unknown>(
                        (input) =>
                          !Array.isArray(input) &&
                          typeof input !== 'string' &&
                          typeof input !== 'number' &&
                          typeof input !== 'boolean',
                      ),
                      v.description(
                        'When you supply a `noise_reduction` object, you must set `type` to `near_field` or `far_field`.\nSet `noise_reduction` to `null` to turn off input audio noise reduction.\nNoise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.\nFiltering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.\n',
                      ),
                    ),
                    turn_detection: RealtimeTurnDetectionSchema,
                  }),
                ),
                output: v.object({
                  format: v.optional(
                    v.pipe(
                      RealtimeAudioFormatsSchema,
                      v.description('The format of the output audio.'),
                    ),
                  ),
                  voice: v.pipe(
                    v.optional(VoiceIdsOrCustomVoiceSchema, 'alloy'),
                    v.description(
                      'The voice the model uses to respond. Supported built-in voices are\n`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`,\n`marin`, and `cedar`. You may also provide a custom voice object with\nan `id`, for example `{ "id": "voice_1234" }`. Voice cannot be changed\nduring the session once the model has responded with audio at least once.\nCustom voices must be created from audio samples. Voices created from text prompts are supported only in Live.\nWe recommend `marin` and `cedar` for best quality.\n',
                    ),
                  ),
                  speed: v.pipe(
                    v.optional(v.pipe(v.number(), v.minValue(0.25), v.maxValue(1.5)), 1),
                    v.description(
                      "The speed of the model's spoken response as a multiple of the original speed.\n1.0 is the default speed. 0.25 is the minimum speed. 1.5 is the maximum speed. This value can only be changed in between model turns, not while a response is in progress.\n\nThis parameter is a post-processing adjustment to the audio after it is generated, it's\nalso possible to prompt the model to speak faster or slower.\n",
                    ),
                  ),
                }),
              }),
            ),
            v.description('Configuration for input and output audio.\n'),
          ),
        ),
        include: v.optional(
          v.pipe(
            v.array(v.literal('item.input_audio_transcription.logprobs')),
            v.description(
              'Additional fields to include in server outputs.\n\n`item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.\n',
            ),
          ),
        ),
        tracing: v.pipe(
          v.optional(
            v.union([
              v.pipe(
                v.optional(v.literal('auto'), 'auto'),
                v.description(
                  'Enables tracing and sets default values for tracing configuration options. Always `auto`.\n',
                ),
              ),
              v.pipe(
                v.partial(
                  v.object({
                    workflow_name: v.pipe(
                      v.string(),
                      v.description(
                        'The name of the workflow to attach to this trace. This is used to\nname the trace in the Traces Dashboard.\n',
                      ),
                    ),
                    group_id: v.pipe(
                      v.string(),
                      v.description(
                        'The group id to attach to this trace to enable filtering and\ngrouping in the Traces Dashboard.\n',
                      ),
                    ),
                    metadata: v.pipe(
                      v.object({}),
                      v.description(
                        'The arbitrary metadata to attach to this trace to enable\nfiltering in the Traces Dashboard.\n',
                      ),
                    ),
                  }),
                ),
                v.description('Granular configuration for tracing.\n'),
              ),
              v.null(),
            ]),
            null,
          ),
          v.description(
            'Realtime API can write session traces to the [Traces Dashboard](https://platform.openai.com/logs?api=traces). Set to null to disable tracing. Once\ntracing is enabled for a session, the configuration cannot be modified.\n\n`auto` will create a trace for the session with default values for the\nworkflow name, group id, and metadata.\n',
          ),
        ),
        tools: v.optional(
          v.pipe(
            v.array(v.union([RealtimeFunctionToolSchema, MCPToolSchema])),
            v.description('Tools available to the model.'),
          ),
        ),
        tool_choice: v.pipe(
          v.optional(
            v.union([ToolChoiceOptionsSchema, ToolChoiceFunctionSchema, ToolChoiceMCPSchema]),
            'auto',
          ),
          v.description(
            'How the model chooses tools. Provide one of the string modes or force a specific\nfunction/MCP tool.\n',
          ),
        ),
        parallel_tool_calls: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              'Whether the model may call multiple tools in parallel. Only supported by\nreasoning Realtime models such as `gpt-realtime-2`.\n',
            ),
          ),
        ),
        reasoning: v.optional(RealtimeReasoningSchema),
        max_output_tokens: v.optional(
          v.pipe(
            v.union([v.pipe(v.number(), v.integer()), v.literal('inf')]),
            v.description(
              'Maximum number of output tokens for a single assistant response,\ninclusive of tool calls. Provide an integer between 1 and 4096 to\nlimit output tokens, or `inf` for the maximum available tokens for a\ngiven model. Defaults to `inf`.\n',
            ),
          ),
        ),
        truncation: v.optional(RealtimeTruncationSchema),
        prompt: v.optional(PromptSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeCallsCallIdHangup: t.procedure
    .input(v.object({ call_id: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeCallsCallIdRefer: t.procedure
    .input(
      v.object({
        call_id: v.string(),
        target_uri: v.pipe(
          v.string(),
          v.description(
            'URI that should appear in the SIP Refer-To header. Supports values like\n`tel:+14155550123` or `sip:agent@example.com`.',
          ),
          v.metadata({ examples: ['tel:+14155550123'] }),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeCallsCallIdReject: t.procedure
    .input(
      v.object({
        call_id: v.string(),
        status_code: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'SIP response code to send back to the caller. Defaults to `603` (Decline)\nwhen omitted.',
            ),
            v.metadata({ examples: [486] }),
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeClientSecrets: t.procedure
    .input(RealtimeCreateClientSecretRequestSchema)
    .output(RealtimeCreateClientSecretResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeSessions: t.procedure
    .input(RealtimeSessionCreateRequestSchema)
    .output(RealtimeSessionCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeTranscriptionSessions: t.procedure
    .input(RealtimeTranscriptionSessionCreateRequestSchema)
    .output(RealtimeTranscriptionSessionCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postRealtimeTranslationsClientSecrets: t.procedure
    .input(RealtimeTranslationClientSecretCreateRequestSchema)
    .output(RealtimeTranslationClientSecretCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
