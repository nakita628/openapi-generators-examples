import { os } from '@orpc/server'
import * as z from 'zod'
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
  .input(z.object({ thread_id: z.string() }))
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
    z.object({
      thread_id: z.string(),
      tool_resources: z
        .union([
          z
            .object({
              code_interpreter: z
                .object({
                  file_ids: z
                    .array(z.string())
                    .max(20)
                    .default([])
                    .meta({
                      description:
                        'A list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
                    })
                    .exactOptional(),
                })
                .exactOptional(),
              file_search: z
                .object({
                  vector_store_ids: z
                    .array(z.string())
                    .max(1)
                    .meta({
                      description:
                        'The [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this thread. There can be a maximum of 1 vector store attached to the thread.\n',
                    })
                    .exactOptional(),
                })
                .exactOptional(),
            })
            .meta({
              description:
                "A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      metadata: MetadataSchema.exactOptional(),
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
  .input(z.object({ thread_id: z.string() }))
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
    z.object({
      thread_id: z.string(),
      limit: z.coerce.number().int().default(20).exactOptional(),
      order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      after: z.string().exactOptional(),
      before: z.string().exactOptional(),
      run_id: z.string().exactOptional(),
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
    z.object({
      thread_id: z.string(),
      role: z
        .enum(['user', 'assistant'])
        .meta({
          description:
            'The role of the entity that is creating the message. Allowed values include:\n- `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.\n- `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.\n',
        }),
      content: z.xor([
        z.string().meta({ description: 'The text contents of the message.' }),
        z
          .array(
            z.xor([
              MessageContentImageFileObjectSchema,
              MessageContentImageUrlObjectSchema,
              MessageRequestContentTextObjectSchema,
            ]),
          )
          .min(1)
          .meta({
            description:
              'An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://developers.openai.com/api/docs/models).',
          }),
      ]),
      attachments: z
        .union([
          z
            .array(
              z.object({
                file_id: z
                  .string()
                  .meta({ description: 'The ID of the file to attach to the message.' })
                  .exactOptional(),
                tools: z
                  .array(z.xor([AssistantToolsCodeSchema, AssistantToolsFileSearchTypeOnlySchema]))
                  .meta({ description: 'The tools to add this file to.' })
                  .exactOptional(),
              }),
            )
            .meta({
              description:
                'A list of files attached to the message, and the tools they should be added to.',
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      metadata: MetadataSchema.exactOptional(),
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
  .input(z.object({ thread_id: z.string(), message_id: z.string() }))
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
    z.object({
      thread_id: z.string(),
      message_id: z.string(),
      metadata: MetadataSchema.exactOptional(),
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
  .input(z.object({ thread_id: z.string(), message_id: z.string() }))
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
    z.object({
      thread_id: z.string(),
      limit: z.coerce.number().int().default(20).exactOptional(),
      order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      after: z.string().exactOptional(),
      before: z.string().exactOptional(),
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
    z.object({
      thread_id: z.string(),
      'include[]': z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
        )
        .exactOptional(),
      assistant_id: z
        .string()
        .meta({
          description:
            'The ID of the [assistant](https://developers.openai.com/api/docs/assistants/migration) to use to execute this run.',
        }),
      model: z
        .union([z.string(), AssistantSupportedModelsSchema, z.null().nullable()])
        .meta({
          description:
            'The ID of the [Model](https://developers.openai.com/api/reference/resources/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.',
          examples: ['gpt-4.1'],
        })
        .exactOptional(),
      reasoning_effort: ReasoningEffortSchema.exactOptional(),
      instructions: z
        .string()
        .nullable()
        .meta({
          description:
            'Overrides the [instructions](https://developers.openai.com/api/docs/assistants/migration) of the assistant. This is useful for modifying the behavior on a per-run basis.',
        })
        .exactOptional(),
      additional_instructions: z
        .string()
        .nullable()
        .meta({
          description:
            'Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.',
        })
        .exactOptional(),
      additional_messages: z
        .array(CreateMessageRequestSchema)
        .nullable()
        .meta({ description: 'Adds additional messages to the thread before creating the run.' })
        .exactOptional(),
      tools: z
        .array(
          z.xor([
            AssistantToolsCodeSchema,
            AssistantToolsFileSearchSchema,
            AssistantToolsFunctionSchema,
          ]),
        )
        .max(20)
        .nullable()
        .meta({
          description:
            'Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.',
        })
        .exactOptional(),
      metadata: MetadataSchema.exactOptional(),
      temperature: z
        .number()
        .min(0)
        .max(2)
        .nullable()
        .default(1)
        .meta({
          description:
            'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
          examples: [1],
        })
        .exactOptional(),
      top_p: z
        .number()
        .min(0)
        .max(1)
        .nullable()
        .default(1)
        .meta({
          description:
            'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
          examples: [1],
        })
        .exactOptional(),
      stream: z
        .boolean()
        .nullable()
        .meta({
          description:
            'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
        })
        .exactOptional(),
      max_prompt_tokens: z
        .int()
        .min(256)
        .nullable()
        .meta({
          description:
            'The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
        })
        .exactOptional(),
      max_completion_tokens: z
        .int()
        .min(256)
        .nullable()
        .meta({
          description:
            'The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
        })
        .exactOptional(),
      truncation_strategy: TruncationObjectSchema.nullable().exactOptional(),
      tool_choice: AssistantsApiToolChoiceOptionSchema.nullable().exactOptional(),
      parallel_tool_calls: ParallelToolCallsSchema.exactOptional(),
      response_format: AssistantsApiResponseFormatOptionSchema.exactOptional(),
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
  .input(z.object({ thread_id: z.string(), run_id: z.string() }))
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
    z.object({
      thread_id: z.string(),
      run_id: z.string(),
      metadata: MetadataSchema.exactOptional(),
    }),
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
  .input(z.object({ thread_id: z.string(), run_id: z.string() }))
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
    z.object({
      thread_id: z.string(),
      run_id: z.string(),
      limit: z.coerce.number().int().default(20).exactOptional(),
      order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      after: z.string().exactOptional(),
      before: z.string().exactOptional(),
      'include[]': z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
        )
        .exactOptional(),
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
    z.object({
      thread_id: z.string(),
      run_id: z.string(),
      step_id: z.string(),
      'include[]': z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
        )
        .exactOptional(),
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
    z.object({
      thread_id: z.string(),
      run_id: z.string(),
      tool_outputs: z
        .array(
          z.object({
            tool_call_id: z
              .string()
              .meta({
                description:
                  'The ID of the tool call in the `required_action` object within the run object the output is being submitted for.',
              })
              .exactOptional(),
            output: z
              .string()
              .meta({
                description: 'The output of the tool call to be submitted to continue the run.',
              })
              .exactOptional(),
          }),
        )
        .meta({ description: 'A list of tools for which the outputs are being submitted.' }),
      stream: z
        .union([
          z
            .boolean()
            .meta({
              description:
                'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
    }),
  )
  .output(RunObjectSchema)
  .handler(async ({ input }) => {})
