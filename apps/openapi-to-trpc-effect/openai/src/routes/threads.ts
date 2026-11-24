import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import {
  AssistantSupportedModelsSchema,
  AssistantToolsCodeSchema,
  AssistantToolsFileSearchSchema,
  AssistantToolsFileSearchTypeOnlySchema,
  AssistantToolsFunctionSchema,
  AssistantsApiResponseFormatOptionSchema,
  AssistantsApiToolChoiceOptionSchema,
  CreateMessageRequestSchema,
  CreateThreadAndRunRequestSchema,
  CreateThreadRequestSchema,
  DeleteMessageResponseSchema,
  DeleteThreadResponseSchema,
  ListMessagesResponseSchema,
  ListRunStepsResponseSchema,
  ListRunsResponseSchema,
  MessageContentImageFileObjectSchema,
  MessageContentImageUrlObjectSchema,
  MessageObjectSchema,
  MessageRequestContentTextObjectSchema,
  MetadataSchema,
  ParallelToolCallsSchema,
  ReasoningEffortSchema,
  RunObjectSchema,
  RunStepObjectSchema,
  ThreadObjectSchema,
  TruncationObjectSchema,
} from '../components'

const t = initTRPC.create()

export const threadsRouter = t.router({
  postThreads: t.procedure
    .input(Schema.toStandardSchemaV1(CreateThreadRequestSchema))
    .output(Schema.toStandardSchemaV1(ThreadObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsRuns: t.procedure
    .input(Schema.toStandardSchemaV1(CreateThreadAndRunRequestSchema))
    .output(Schema.toStandardSchemaV1(RunObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getThreadsThreadId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ThreadObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsThreadId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          tool_resources: Schema.Union([
            Schema.Struct({
              code_interpreter: Schema.Struct({
                file_ids: Schema.Array(Schema.String)
                  .check(Schema.isMaxLength(20))
                  .pipe(Schema.withDecodingDefault(Effect.succeed([])))
                  .annotate({
                    description:
                      'A list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
                  }),
              }),
              file_search: Schema.optionalKey(
                Schema.Struct({
                  vector_store_ids: Schema.optionalKey(
                    Schema.Array(Schema.String)
                      .check(Schema.isMaxLength(1))
                      .annotate({
                        description:
                          'The [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this thread. There can be a maximum of 1 vector store attached to the thread.\n',
                      }),
                  ),
                }),
              ),
            }).annotate({
              description:
                "A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
            }),
            Schema.Null,
          ]),
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteThreadsThreadId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(DeleteThreadResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getThreadsThreadIdMessages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
          run_id: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsThreadIdMessages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          role: Schema.Literals(['user', 'assistant']).annotate({
            description:
              'The role of the entity that is creating the message. Allowed values include:\n- `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.\n- `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.\n',
          }),
          content: Schema.Union([
            Schema.String.annotate({ description: 'The text contents of the message.' }),
            Schema.Array(
              Schema.Union([
                MessageContentImageFileObjectSchema,
                MessageContentImageUrlObjectSchema,
                MessageRequestContentTextObjectSchema,
              ]),
            )
              .check(Schema.isMinLength(1))
              .annotate({
                description:
                  'An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://developers.openai.com/api/docs/models).',
              }),
          ]),
          attachments: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  file_id: Schema.optionalKey(
                    Schema.String.annotate({
                      description: 'The ID of the file to attach to the message.',
                    }),
                  ),
                  tools: Schema.optionalKey(
                    Schema.Array(
                      Schema.Union([
                        AssistantToolsCodeSchema,
                        AssistantToolsFileSearchTypeOnlySchema,
                      ]),
                    ).annotate({ description: 'The tools to add this file to.' }),
                  ),
                }),
              ).annotate({
                description:
                  'A list of files attached to the message, and the tools they should be added to.',
              }),
              Schema.Null,
            ]),
          ),
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getThreadsThreadIdMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsThreadIdMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          message_id: Schema.String,
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteThreadsThreadIdMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeleteMessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getThreadsThreadIdRuns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListRunsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsThreadIdRuns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          'include[]': Schema.optionalKey(
            Schema.Array(
              Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
            ),
          ),
          assistant_id: Schema.String.annotate({
            description:
              'The ID of the [assistant](https://developers.openai.com/api/docs/assistants/migration) to use to execute this run.',
          }),
          model: Schema.optionalKey(
            Schema.Union([Schema.String, AssistantSupportedModelsSchema, Schema.Null]).annotate({
              description:
                'The ID of the [Model](https://developers.openai.com/api/reference/resources/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.',
              jsonSchemaExamples: ['gpt-4.1'],
            }),
          ),
          reasoning_effort: Schema.optionalKey(ReasoningEffortSchema),
          instructions: Schema.optionalKey(
            Schema.NullOr(Schema.String).annotate({
              description:
                'Overrides the [instructions](https://developers.openai.com/api/docs/assistants/migration) of the assistant. This is useful for modifying the behavior on a per-run basis.',
            }),
          ),
          additional_instructions: Schema.optionalKey(
            Schema.NullOr(Schema.String).annotate({
              description:
                'Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.',
            }),
          ),
          additional_messages: Schema.optionalKey(
            Schema.NullOr(Schema.Array(CreateMessageRequestSchema)).annotate({
              description: 'Adds additional messages to the thread before creating the run.',
            }),
          ),
          tools: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  AssistantToolsCodeSchema,
                  AssistantToolsFileSearchSchema,
                  AssistantToolsFunctionSchema,
                ]),
              ).check(Schema.isMaxLength(20)),
            ).annotate({
              description:
                'Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.',
            }),
          ),
          metadata: Schema.optionalKey(MetadataSchema),
          temperature: Schema.NullOr(
            Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(2)),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(1)))
            .annotate({
              description:
                'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
              jsonSchemaExamples: [1],
            }),
          top_p: Schema.NullOr(
            Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(1)))
            .annotate({
              description:
                'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
              jsonSchemaExamples: [1],
            }),
          stream: Schema.optionalKey(
            Schema.NullOr(Schema.Boolean).annotate({
              description:
                'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
            }),
          ),
          max_prompt_tokens: Schema.optionalKey(
            Schema.NullOr(
              Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(256)),
            ).annotate({
              description:
                'The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
            }),
          ),
          max_completion_tokens: Schema.optionalKey(
            Schema.NullOr(
              Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(256)),
            ).annotate({
              description:
                'The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
            }),
          ),
          truncation_strategy: Schema.optionalKey(Schema.NullOr(TruncationObjectSchema)),
          tool_choice: Schema.optionalKey(Schema.NullOr(AssistantsApiToolChoiceOptionSchema)),
          parallel_tool_calls: Schema.optionalKey(ParallelToolCallsSchema),
          response_format: Schema.optionalKey(
            Schema.NullOr(AssistantsApiResponseFormatOptionSchema),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RunObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getThreadsThreadIdRunsRunId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(RunObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsThreadIdRunsRunId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          run_id: Schema.String,
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RunObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsThreadIdRunsRunIdCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(RunObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getThreadsThreadIdRunsRunIdSteps: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          run_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
          'include[]': Schema.optionalKey(
            Schema.Array(
              Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListRunStepsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getThreadsThreadIdRunsRunIdStepsStepId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          run_id: Schema.String,
          step_id: Schema.String,
          'include[]': Schema.optionalKey(
            Schema.Array(
              Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RunStepObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postThreadsThreadIdRunsRunIdSubmitToolOutputs: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String,
          run_id: Schema.String,
          tool_outputs: Schema.Array(
            Schema.Struct({
              tool_call_id: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    'The ID of the tool call in the `required_action` object within the run object the output is being submitted for.',
                }),
              ),
              output: Schema.optionalKey(
                Schema.String.annotate({
                  description: 'The output of the tool call to be submitted to continue the run.',
                }),
              ),
            }),
          ).annotate({ description: 'A list of tools for which the outputs are being submitted.' }),
          stream: Schema.optionalKey(
            Schema.Union([
              Schema.Boolean.annotate({
                description:
                  'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
              }),
              Schema.Null,
            ]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RunObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
