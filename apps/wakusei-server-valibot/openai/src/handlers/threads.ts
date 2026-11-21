import { os } from '@orpc/server'
import * as v from 'valibot'
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

export const postThreads = os
  .route({
    method: 'POST',
    path: '/threads',
    tags: ['Assistants'],
    summary: 'Create thread',
    description: 'Create a thread.',
  })
  .input(CreateThreadRequestSchema)
  .output(ThreadObjectSchema)
  .handler(async ({ input }) => {})

export const postThreadsRuns = os
  .route({
    method: 'POST',
    path: '/threads/runs',
    tags: ['Assistants'],
    summary: 'Create thread and run',
    description: 'Create a thread and run it in one request.',
  })
  .input(CreateThreadAndRunRequestSchema)
  .output(RunObjectSchema)
  .handler(async ({ input }) => {})

export const getThreadsThreadId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}',
    tags: ['Assistants'],
    summary: 'Retrieve thread',
    description: 'Retrieves a thread.',
  })
  .input(v.object({ thread_id: v.string() }))
  .output(ThreadObjectSchema)
  .handler(async ({ input }) => {})

export const postThreadsThreadId = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}',
    tags: ['Assistants'],
    summary: 'Modify thread',
    description: 'Modifies a thread.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      tool_resources: v.optional(
        v.union([
          v.pipe(
            v.partial(
              v.object({
                code_interpreter: v.object({
                  file_ids: v.pipe(
                    v.optional(v.pipe(v.array(v.string()), v.maxLength(20)), []),
                    v.description(
                      'A list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
                    ),
                  ),
                }),
                file_search: v.partial(
                  v.object({
                    vector_store_ids: v.pipe(
                      v.pipe(v.array(v.string()), v.maxLength(1)),
                      v.description(
                        'The [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this thread. There can be a maximum of 1 vector store attached to the thread.\n',
                      ),
                    ),
                  }),
                ),
              }),
            ),
            v.description(
              "A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
            ),
          ),
          v.nullable(v.null()),
        ]),
      ),
      metadata: v.optional(MetadataSchema),
    }),
  )
  .output(ThreadObjectSchema)
  .handler(async ({ input }) => {})

export const deleteThreadsThreadId = os
  .route({
    method: 'DELETE',
    path: '/threads/{thread_id}',
    tags: ['Assistants'],
    summary: 'Delete thread',
    description: 'Delete a thread.',
  })
  .input(v.object({ thread_id: v.string() }))
  .output(DeleteThreadResponseSchema)
  .handler(async ({ input }) => {})

export const getThreadsThreadIdMessages = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/messages',
    tags: ['Assistants'],
    summary: 'List messages',
    description: 'Returns a list of messages for a given thread.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
      run_id: v.optional(v.string()),
    }),
  )
  .output(ListMessagesResponseSchema)
  .handler(async ({ input }) => {})

export const postThreadsThreadIdMessages = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/messages',
    tags: ['Assistants'],
    summary: 'Create message',
    description: 'Create a message.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      role: v.pipe(
        v.picklist(['user', 'assistant']),
        v.description(
          'The role of the entity that is creating the message. Allowed values include:\n- `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.\n- `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.\n',
        ),
      ),
      content: v.union([
        v.pipe(v.string(), v.description('The text contents of the message.')),
        v.pipe(
          v.pipe(
            v.array(
              v.union([
                MessageContentImageFileObjectSchema,
                MessageContentImageUrlObjectSchema,
                MessageRequestContentTextObjectSchema,
              ]),
            ),
            v.minLength(1),
          ),
          v.description(
            'An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://developers.openai.com/api/docs/models).',
          ),
        ),
      ]),
      attachments: v.optional(
        v.union([
          v.pipe(
            v.array(
              v.partial(
                v.object({
                  file_id: v.pipe(
                    v.string(),
                    v.description('The ID of the file to attach to the message.'),
                  ),
                  tools: v.pipe(
                    v.array(
                      v.union([AssistantToolsCodeSchema, AssistantToolsFileSearchTypeOnlySchema]),
                    ),
                    v.description('The tools to add this file to.'),
                  ),
                }),
              ),
            ),
            v.description(
              'A list of files attached to the message, and the tools they should be added to.',
            ),
          ),
          v.nullable(v.null()),
        ]),
      ),
      metadata: v.optional(MetadataSchema),
    }),
  )
  .output(MessageObjectSchema)
  .handler(async ({ input }) => {})

export const getThreadsThreadIdMessagesMessageId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/messages/{message_id}',
    tags: ['Assistants'],
    summary: 'Retrieve message',
    description: 'Retrieve a message.',
  })
  .input(v.object({ thread_id: v.string(), message_id: v.string() }))
  .output(MessageObjectSchema)
  .handler(async ({ input }) => {})

export const postThreadsThreadIdMessagesMessageId = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/messages/{message_id}',
    tags: ['Assistants'],
    summary: 'Modify message',
    description: 'Modifies a message.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      message_id: v.string(),
      metadata: v.optional(MetadataSchema),
    }),
  )
  .output(MessageObjectSchema)
  .handler(async ({ input }) => {})

export const deleteThreadsThreadIdMessagesMessageId = os
  .route({
    method: 'DELETE',
    path: '/threads/{thread_id}/messages/{message_id}',
    tags: ['Assistants'],
    summary: 'Delete message',
    description: 'Deletes a message.',
  })
  .input(v.object({ thread_id: v.string(), message_id: v.string() }))
  .output(DeleteMessageResponseSchema)
  .handler(async ({ input }) => {})

export const getThreadsThreadIdRuns = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs',
    tags: ['Assistants'],
    summary: 'List runs',
    description: 'Returns a list of runs belonging to a thread.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
    }),
  )
  .output(ListRunsResponseSchema)
  .handler(async ({ input }) => {})

export const postThreadsThreadIdRuns = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/runs',
    tags: ['Assistants'],
    summary: 'Create run',
    description: 'Create a run.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      'include[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.literal('step_details.tool_calls[*].file_search.results[*].content')),
        ),
      ),
      assistant_id: v.pipe(
        v.string(),
        v.description(
          'The ID of the [assistant](https://developers.openai.com/api/docs/assistants/migration) to use to execute this run.',
        ),
      ),
      model: v.optional(
        v.pipe(
          v.union([v.string(), AssistantSupportedModelsSchema, v.nullable(v.null())]),
          v.description(
            'The ID of the [Model](https://developers.openai.com/api/reference/resources/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.',
          ),
          v.metadata({ examples: ['gpt-4.1'] }),
        ),
      ),
      reasoning_effort: v.optional(ReasoningEffortSchema),
      instructions: v.optional(
        v.pipe(
          v.nullable(v.string()),
          v.description(
            'Overrides the [instructions](https://developers.openai.com/api/docs/assistants/migration) of the assistant. This is useful for modifying the behavior on a per-run basis.',
          ),
        ),
      ),
      additional_instructions: v.optional(
        v.pipe(
          v.nullable(v.string()),
          v.description(
            'Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.',
          ),
        ),
      ),
      additional_messages: v.optional(
        v.pipe(
          v.nullable(v.array(CreateMessageRequestSchema)),
          v.description('Adds additional messages to the thread before creating the run.'),
        ),
      ),
      tools: v.optional(
        v.pipe(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
                  AssistantToolsCodeSchema,
                  AssistantToolsFileSearchSchema,
                  AssistantToolsFunctionSchema,
                ]),
              ),
              v.maxLength(20),
            ),
          ),
          v.description(
            'Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.',
          ),
        ),
      ),
      metadata: v.optional(MetadataSchema),
      temperature: v.optional(
        v.pipe(
          v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(2))), 1),
          v.description(
            'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
          ),
          v.metadata({ examples: [1] }),
        ),
      ),
      top_p: v.optional(
        v.pipe(
          v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1))), 1),
          v.description(
            'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
          ),
          v.metadata({ examples: [1] }),
        ),
      ),
      stream: v.optional(
        v.pipe(
          v.nullable(v.boolean()),
          v.description(
            'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
          ),
        ),
      ),
      max_prompt_tokens: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(256))),
          v.description(
            'The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
          ),
        ),
      ),
      max_completion_tokens: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(256))),
          v.description(
            'The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
          ),
        ),
      ),
      truncation_strategy: v.optional(v.nullable(TruncationObjectSchema)),
      tool_choice: v.optional(v.nullable(AssistantsApiToolChoiceOptionSchema)),
      parallel_tool_calls: v.optional(ParallelToolCallsSchema),
      response_format: v.optional(AssistantsApiResponseFormatOptionSchema),
    }),
  )
  .output(RunObjectSchema)
  .handler(async ({ input }) => {})

export const getThreadsThreadIdRunsRunId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs/{run_id}',
    tags: ['Assistants'],
    summary: 'Retrieve run',
    description: 'Retrieves a run.',
  })
  .input(v.object({ thread_id: v.string(), run_id: v.string() }))
  .output(RunObjectSchema)
  .handler(async ({ input }) => {})

export const postThreadsThreadIdRunsRunId = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/runs/{run_id}',
    tags: ['Assistants'],
    summary: 'Modify run',
    description: 'Modifies a run.',
  })
  .input(
    v.object({ thread_id: v.string(), run_id: v.string(), metadata: v.optional(MetadataSchema) }),
  )
  .output(RunObjectSchema)
  .handler(async ({ input }) => {})

export const postThreadsThreadIdRunsRunIdCancel = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/runs/{run_id}/cancel',
    tags: ['Assistants'],
    summary: 'Cancel a run',
    description: 'Cancels a run that is `in_progress`.',
  })
  .input(v.object({ thread_id: v.string(), run_id: v.string() }))
  .output(RunObjectSchema)
  .handler(async ({ input }) => {})

export const getThreadsThreadIdRunsRunIdSteps = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs/{run_id}/steps',
    tags: ['Assistants'],
    summary: 'List run steps',
    description: 'Returns a list of run steps belonging to a run.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      run_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
      'include[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.literal('step_details.tool_calls[*].file_search.results[*].content')),
        ),
      ),
    }),
  )
  .output(ListRunStepsResponseSchema)
  .handler(async ({ input }) => {})

export const getThreadsThreadIdRunsRunIdStepsStepId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs/{run_id}/steps/{step_id}',
    tags: ['Assistants'],
    summary: 'Retrieve run step',
    description: 'Retrieves a run step.',
  })
  .input(
    v.object({
      thread_id: v.string(),
      run_id: v.string(),
      step_id: v.string(),
      'include[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.literal('step_details.tool_calls[*].file_search.results[*].content')),
        ),
      ),
    }),
  )
  .output(RunStepObjectSchema)
  .handler(async ({ input }) => {})

export const postThreadsThreadIdRunsRunIdSubmitToolOutputs = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/runs/{run_id}/submit_tool_outputs',
    tags: ['Assistants'],
    summary: 'Submit tool outputs to run',
    description:
      'When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they\'re all completed. All outputs must be submitted in a single request.\n',
  })
  .input(
    v.object({
      thread_id: v.string(),
      run_id: v.string(),
      tool_outputs: v.pipe(
        v.array(
          v.partial(
            v.object({
              tool_call_id: v.pipe(
                v.string(),
                v.description(
                  'The ID of the tool call in the `required_action` object within the run object the output is being submitted for.',
                ),
              ),
              output: v.pipe(
                v.string(),
                v.description('The output of the tool call to be submitted to continue the run.'),
              ),
            }),
          ),
        ),
        v.description('A list of tools for which the outputs are being submitted.'),
      ),
      stream: v.optional(
        v.union([
          v.pipe(
            v.boolean(),
            v.description(
              'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
            ),
          ),
          v.nullable(v.null()),
        ]),
      ),
    }),
  )
  .output(RunObjectSchema)
  .handler(async ({ input }) => {})
