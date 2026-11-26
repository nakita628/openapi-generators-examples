import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  ChatCompletionDeletedSchema,
  ChatCompletionListSchema,
  ChatCompletionMessageListSchema,
  CreateChatCompletionRequestSchema,
  CreateChatCompletionResponseSchema,
  MetadataSchema,
} from '../components'

export const getChatCompletions = os
  .route({
    method: 'GET',
    path: '/chat/completions',
    tags: ['Chat'],
    summary: 'List Chat Completions',
    description:
      'List stored Chat Completions. Only Chat Completions that have been stored\nwith the `store` parameter set to `true` will be returned.\n',
    successDescription: 'A list of Chat Completions',
  })
  .input(
    v.object({
      model: v.optional(v.string()),
      metadata: v.optional(MetadataSchema),
      after: v.optional(v.string()),
      limit: v.optional(
        v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
    }),
  )
  .output(ChatCompletionListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChatCompletions = os
  .route({
    method: 'POST',
    path: '/chat/completions',
    tags: ['Chat'],
    summary: 'Create chat completion',
    description:
      '**Starting a new project?** We recommend trying [Responses](https://developers.openai.com/api/reference/resources/responses)\nto take advantage of the latest OpenAI platform features. Compare\n[Chat Completions with Responses](https://developers.openai.com/api/docs/guides/migrate-to-responses?api-mode=responses).\n\n---\n\nCreates a model response for the given chat conversation. Learn more in the\n[text generation](https://developers.openai.com/api/docs/guides/text), [vision](https://developers.openai.com/api/docs/guides/images-vision),\nand [audio](https://developers.openai.com/api/docs/guides/audio) guides.\n\nParameter support can differ depending on the model used to generate the\nresponse, particularly for newer reasoning models. Parameters that are only\nsupported for reasoning models are noted below. For the current state of\nunsupported parameters in reasoning models,\n[refer to the reasoning guide](https://developers.openai.com/api/docs/guides/reasoning).\n\nReturns a chat completion object, or a streamed sequence of chat completion\nchunk objects if the request is streamed.\n',
    successDescription:
      'Returns a Chat Completion object for a non-streaming request.\n\nIf `stream` is `true`, returns server-sent events (`text/event-stream`).\nSuccessful chunk frames contain a JSON Chat Completion chunk matching\n`CreateChatCompletionStreamResponse`. On normal completion, the final\nframe is:\n\n```text\ndata: [DONE]\n\n```\n\nThe final frame ends with a blank line. `[DONE]` is literal text, not a\nJSON chunk, and this frame has no `event: done` field.\n\nIf a failure occurs after streaming has started, a data frame may\ncontain a JSON object with an `error` field instead of a completion\nchunk. The streaming schema describes successful JSON chunks, not\nerror frames or the completion marker. An interrupted stream may end\nwithout the marker.\n',
  })
  .input(CreateChatCompletionRequestSchema)
  .output(CreateChatCompletionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChatCompletionsCompletionId = os
  .route({
    method: 'GET',
    path: '/chat/completions/{completion_id}',
    tags: ['Chat'],
    summary: 'Get chat completion',
    description:
      'Get a stored chat completion. Only Chat Completions that have been created\nwith the `store` parameter set to `true` will be returned.\n',
    successDescription: 'A chat completion',
  })
  .input(v.object({ completion_id: v.string() }))
  .output(CreateChatCompletionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChatCompletionsCompletionId = os
  .route({
    method: 'POST',
    path: '/chat/completions/{completion_id}',
    tags: ['Chat'],
    summary: 'Update chat completion',
    description:
      'Modify a stored chat completion. Only Chat Completions that have been\ncreated with the `store` parameter set to `true` can be modified. Currently,\nthe only supported modification is to update the `metadata` field.\n',
    successDescription: 'A chat completion',
  })
  .input(v.object({ completion_id: v.string(), metadata: MetadataSchema }))
  .output(CreateChatCompletionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChatCompletionsCompletionId = os
  .route({
    method: 'DELETE',
    path: '/chat/completions/{completion_id}',
    tags: ['Chat'],
    summary: 'Delete chat completion',
    description:
      'Delete a stored chat completion. Only Chat Completions that have been\ncreated with the `store` parameter set to `true` can be deleted.\n',
    successDescription: 'The chat completion was deleted successfully.',
  })
  .input(v.object({ completion_id: v.string() }))
  .output(ChatCompletionDeletedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChatCompletionsCompletionIdMessages = os
  .route({
    method: 'GET',
    path: '/chat/completions/{completion_id}/messages',
    tags: ['Chat'],
    summary: 'Get chat messages',
    description:
      'Get the messages in a stored chat completion. Only Chat Completions that\nhave been created with the `store` parameter set to `true` will be\nreturned.\n',
    successDescription: 'A list of messages',
  })
  .input(
    v.object({
      completion_id: v.string(),
      after: v.optional(v.string()),
      limit: v.optional(
        v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
    }),
  )
  .output(ChatCompletionMessageListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
