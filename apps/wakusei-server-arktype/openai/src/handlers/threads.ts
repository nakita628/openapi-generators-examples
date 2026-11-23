import { os } from '@orpc/server'
import { type } from 'arktype'
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getThreadsThreadId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}',
    tags: ['Assistants'],
    summary: 'Retrieve thread',
    description: 'Retrieves a thread.',
  })
  .input(type({ thread_id: type('string') }))
  .output(ThreadObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postThreadsThreadId = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}',
    tags: ['Assistants'],
    summary: 'Modify thread',
    description: 'Modifies a thread.',
  })
  .input(
    type({
      thread_id: type('string'),
      'tool_resources?': type(
        type({
          'code_interpreter?': type({
            'file_ids?': type('string[]')
              .and(type('unknown[] <= 20'))
              .describe(
                'A list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
              ),
          }),
          'file_search?': type({
            'vector_store_ids?': type('string[]')
              .and(type('unknown[] <= 1'))
              .describe(
                'The [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this thread. There can be a maximum of 1 vector store attached to the thread.\n',
              ),
          }),
        }).describe(
          "A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
        ),
      ).or('null'),
      'metadata?': MetadataSchema,
    }),
  )
  .output(ThreadObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteThreadsThreadId = os
  .route({
    method: 'DELETE',
    path: '/threads/{thread_id}',
    tags: ['Assistants'],
    summary: 'Delete thread',
    description: 'Delete a thread.',
  })
  .input(type({ thread_id: type('string') }))
  .output(DeleteThreadResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getThreadsThreadIdMessages = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/messages',
    tags: ['Assistants'],
    summary: 'List messages',
    description: 'Returns a list of messages for a given thread.',
  })
  .input(
    type({
      thread_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
      'run_id?': type('string'),
    }),
  )
  .output(ListMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postThreadsThreadIdMessages = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/messages',
    tags: ['Assistants'],
    summary: 'Create message',
    description: 'Create a message.',
  })
  .input(
    type({
      thread_id: type('string'),
      role: type("'user' | 'assistant'").describe(
        'The role of the entity that is creating the message. Allowed values include:\n- `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.\n- `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.\n',
      ),
      content: type(type('string').describe('The text contents of the message.')).or(
        type(
          type(
            type(
              type(MessageContentImageFileObjectSchema).or(MessageContentImageUrlObjectSchema),
            ).or(MessageRequestContentTextObjectSchema),
          ).array(),
        )
          .and(type('unknown[] >= 1'))
          .describe(
            'An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://developers.openai.com/api/docs/models).',
          ),
      ),
      'attachments?': type(
        type(
          type({
            'file_id?': type('string').describe('The ID of the file to attach to the message.'),
            'tools?': type(
              type(AssistantToolsCodeSchema).or(AssistantToolsFileSearchTypeOnlySchema),
            )
              .array()
              .describe('The tools to add this file to.'),
          }),
        )
          .array()
          .describe(
            'A list of files attached to the message, and the tools they should be added to.',
          ),
      ).or('null'),
      'metadata?': MetadataSchema,
    }),
  )
  .output(MessageObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getThreadsThreadIdMessagesMessageId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/messages/{message_id}',
    tags: ['Assistants'],
    summary: 'Retrieve message',
    description: 'Retrieve a message.',
  })
  .input(type({ thread_id: type('string'), message_id: type('string') }))
  .output(MessageObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postThreadsThreadIdMessagesMessageId = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/messages/{message_id}',
    tags: ['Assistants'],
    summary: 'Modify message',
    description: 'Modifies a message.',
  })
  .input(
    type({ thread_id: type('string'), message_id: type('string'), 'metadata?': MetadataSchema }),
  )
  .output(MessageObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteThreadsThreadIdMessagesMessageId = os
  .route({
    method: 'DELETE',
    path: '/threads/{thread_id}/messages/{message_id}',
    tags: ['Assistants'],
    summary: 'Delete message',
    description: 'Deletes a message.',
  })
  .input(type({ thread_id: type('string'), message_id: type('string') }))
  .output(DeleteMessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getThreadsThreadIdRuns = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs',
    tags: ['Assistants'],
    summary: 'List runs',
    description: 'Returns a list of runs belonging to a thread.',
  })
  .input(
    type({
      thread_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
    }),
  )
  .output(ListRunsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postThreadsThreadIdRuns = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/runs',
    tags: ['Assistants'],
    summary: 'Create run',
    description: 'Create a run.',
  })
  .input(
    type({
      thread_id: type('string'),
      'include[]?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'step_details.tool_calls[*].file_search.results[*].content'[]"),
      assistant_id: type('string').describe(
        'The ID of the [assistant](https://developers.openai.com/api/docs/assistants/migration) to use to execute this run.',
      ),
      'model?': type(type('string').or(AssistantSupportedModelsSchema))
        .or('null')
        .describe(
          'The ID of the [Model](https://developers.openai.com/api/reference/resources/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.',
        ),
      'reasoning_effort?': ReasoningEffortSchema,
      'instructions?': type('string | null').describe(
        'Overrides the [instructions](https://developers.openai.com/api/docs/assistants/migration) of the assistant. This is useful for modifying the behavior on a per-run basis.',
      ),
      'additional_instructions?': type('string | null').describe(
        'Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.',
      ),
      'additional_messages?': type(type(CreateMessageRequestSchema).array())
        .or('null')
        .describe('Adds additional messages to the thread before creating the run.'),
      'tools?': type(
        type(
          type(
            type(type(AssistantToolsCodeSchema).or(AssistantToolsFileSearchSchema)).or(
              AssistantToolsFunctionSchema,
            ),
          ).array(),
        ).and(type('unknown[] <= 20')),
      )
        .or('null')
        .describe(
          'Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.',
        ),
      'metadata?': MetadataSchema,
      'temperature?': type('number >= 0 & number <= 2 | null').describe(
        'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
      ),
      'top_p?': type('number >= 0 & number <= 1 | null').describe(
        'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
      ),
      'stream?': type('boolean | null').describe(
        'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
      ),
      'max_prompt_tokens?': type('number.integer >= 256 | null').describe(
        'The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
      ),
      'max_completion_tokens?': type('number.integer >= 256 | null').describe(
        'The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
      ),
      'truncation_strategy?': type(TruncationObjectSchema).or('null'),
      'tool_choice?': type(AssistantsApiToolChoiceOptionSchema).or('null'),
      'parallel_tool_calls?': ParallelToolCallsSchema,
      'response_format?': AssistantsApiResponseFormatOptionSchema,
    }),
  )
  .output(RunObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getThreadsThreadIdRunsRunId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs/{run_id}',
    tags: ['Assistants'],
    summary: 'Retrieve run',
    description: 'Retrieves a run.',
  })
  .input(type({ thread_id: type('string'), run_id: type('string') }))
  .output(RunObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postThreadsThreadIdRunsRunId = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/runs/{run_id}',
    tags: ['Assistants'],
    summary: 'Modify run',
    description: 'Modifies a run.',
  })
  .input(type({ thread_id: type('string'), run_id: type('string'), 'metadata?': MetadataSchema }))
  .output(RunObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postThreadsThreadIdRunsRunIdCancel = os
  .route({
    method: 'POST',
    path: '/threads/{thread_id}/runs/{run_id}/cancel',
    tags: ['Assistants'],
    summary: 'Cancel a run',
    description: 'Cancels a run that is `in_progress`.',
  })
  .input(type({ thread_id: type('string'), run_id: type('string') }))
  .output(RunObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getThreadsThreadIdRunsRunIdSteps = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs/{run_id}/steps',
    tags: ['Assistants'],
    summary: 'List run steps',
    description: 'Returns a list of run steps belonging to a run.',
  })
  .input(
    type({
      thread_id: type('string'),
      run_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
      'include[]?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'step_details.tool_calls[*].file_search.results[*].content'[]"),
    }),
  )
  .output(ListRunStepsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getThreadsThreadIdRunsRunIdStepsStepId = os
  .route({
    method: 'GET',
    path: '/threads/{thread_id}/runs/{run_id}/steps/{step_id}',
    tags: ['Assistants'],
    summary: 'Retrieve run step',
    description: 'Retrieves a run step.',
  })
  .input(
    type({
      thread_id: type('string'),
      run_id: type('string'),
      step_id: type('string'),
      'include[]?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'step_details.tool_calls[*].file_search.results[*].content'[]"),
    }),
  )
  .output(RunStepObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      thread_id: type('string'),
      run_id: type('string'),
      tool_outputs: type(
        type({
          'tool_call_id?': type('string').describe(
            'The ID of the tool call in the `required_action` object within the run object the output is being submitted for.',
          ),
          'output?': type('string').describe(
            'The output of the tool call to be submitted to continue the run.',
          ),
        }),
      )
        .array()
        .describe('A list of tools for which the outputs are being submitted.'),
      'stream?': type(
        type('boolean').describe(
          'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
        ),
      ).or('null'),
    }),
  )
  .output(RunObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
