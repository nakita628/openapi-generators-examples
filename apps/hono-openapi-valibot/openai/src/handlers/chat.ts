import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  ChatCompletionDeletedSchema,
  ChatCompletionListSchema,
  ChatCompletionMessageListSchema,
  CreateChatCompletionRequestSchema,
  CreateChatCompletionResponseSchema,
  CreateChatCompletionStreamResponseSchema,
  ErrorResponseSchema,
  MetadataSchema,
  TooManyRequestsResponse,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

export const chatHandler = new Hono()
  .get(
    '/chat/completions',
    describeRoute({
      operationId: 'listChatCompletions',
      tags: ['Chat'],
      summary: 'List Chat Completions',
      description:
        'List stored Chat Completions. Only Chat Completions that have been stored\nwith the `store` parameter set to `true` will be returned.\n',
      responses: {
        '200': {
          description: 'A list of Chat Completions',
          content: { 'application/json': { schema: resolver(ChatCompletionListSchema) } },
        },
        '400': {
          description: 'Invalid pagination or filter parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'An internal error prevented the request from being completed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'query',
      v.object({
        model: v.optional(v.string()),
        metadata: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(
              v.union([
                v.pipe(
                  v.record(v.string(), v.string()),
                  v.description(
                    'Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat, and querying for objects via API or the dashboard.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n',
                  ),
                ),
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(v.null()),
                ),
              ]),
            ),
          ),
        ),
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => {},
  )
  .post(
    '/chat/completions',
    describeRoute({
      operationId: 'createChatCompletion',
      tags: ['Chat'],
      summary: 'Create chat completion',
      description:
        '**Starting a new project?** We recommend trying [Responses](https://developers.openai.com/api/reference/resources/responses)\nto take advantage of the latest OpenAI platform features. Compare\n[Chat Completions with Responses](https://developers.openai.com/api/docs/guides/migrate-to-responses?api-mode=responses).\n\n---\n\nCreates a model response for the given chat conversation. Learn more in the\n[text generation](https://developers.openai.com/api/docs/guides/text), [vision](https://developers.openai.com/api/docs/guides/images-vision),\nand [audio](https://developers.openai.com/api/docs/guides/audio) guides.\n\nParameter support can differ depending on the model used to generate the\nresponse, particularly for newer reasoning models. Parameters that are only\nsupported for reasoning models are noted below. For the current state of\nunsupported parameters in reasoning models,\n[refer to the reasoning guide](https://developers.openai.com/api/docs/guides/reasoning).\n\nReturns a chat completion object, or a streamed sequence of chat completion\nchunk objects if the request is streamed.\n',
      responses: {
        '200': {
          description:
            'Returns a Chat Completion object for a non-streaming request.\n\nIf `stream` is `true`, returns server-sent events (`text/event-stream`).\nSuccessful chunk frames contain a JSON Chat Completion chunk matching\n`CreateChatCompletionStreamResponse`. On normal completion, the final\nframe is:\n\n```text\ndata: [DONE]\n\n```\n\nThe final frame ends with a blank line. `[DONE]` is literal text, not a\nJSON chunk, and this frame has no `event: done` field.\n\nIf a failure occurs after streaming has started, a data frame may\ncontain a JSON object with an `error` field instead of a completion\nchunk. The streaming schema describes successful JSON chunks, not\nerror frames or the completion marker. An interrupted stream may end\nwithout the marker.\n',
          content: {
            'application/json': { schema: resolver(CreateChatCompletionResponseSchema) },
            'text/event-stream': { schema: resolver(CreateChatCompletionStreamResponseSchema) },
          },
        },
        '400': {
          description: 'Invalid chat completion request or incompatible request parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '401': {
          description:
            'Authentication failed because the API key is missing or revoked, or the client IP is not authorized.',
          content: {
            'application/json': { schema: resolver(ErrorResponseSchema) },
            'text/plain': {
              schema: resolver(
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
              ),
            },
          },
        },
        '403': {
          description:
            'Access to a personal API organization is blocked by the organization policy.',
          content: {
            'text/plain': {
              schema: resolver(
                v.pipe(
                  v.string(),
                  v.description(
                    'JSON-encoded error text containing an error object and the HTTP status.',
                  ),
                ),
              ),
            },
          },
        },
        '404': {
          description:
            'The requested model or a referenced resource was not found or is unavailable to this caller.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The chat completion could not be processed due to an internal error.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', CreateChatCompletionRequestSchema),
    (c) => {},
  )
  .get(
    '/chat/completions/:completion_id',
    describeRoute({
      operationId: 'getChatCompletion',
      tags: ['Chat'],
      summary: 'Get chat completion',
      description:
        'Get a stored chat completion. Only Chat Completions that have been created\nwith the `store` parameter set to `true` will be returned.\n',
      responses: {
        '200': {
          description: 'A chat completion',
          content: { 'application/json': { schema: resolver(CreateChatCompletionResponseSchema) } },
        },
        '404': {
          description: 'No stored chat completion was found with the specified ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'An internal error prevented the request from being completed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ completion_id: v.string() })),
    (c) => {},
  )
  .post(
    '/chat/completions/:completion_id',
    describeRoute({
      operationId: 'updateChatCompletion',
      tags: ['Chat'],
      summary: 'Update chat completion',
      description:
        'Modify a stored chat completion. Only Chat Completions that have been\ncreated with the `store` parameter set to `true` can be modified. Currently,\nthe only supported modification is to update the `metadata` field.\n',
      responses: {
        '200': {
          description: 'A chat completion',
          content: { 'application/json': { schema: resolver(CreateChatCompletionResponseSchema) } },
        },
        '400': {
          description: 'Invalid metadata update.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'No stored chat completion was found with the specified ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'An internal error prevented the request from being completed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ completion_id: v.string() })),
    validator('json', v.object({ metadata: MetadataSchema })),
    (c) => {},
  )
  .delete(
    '/chat/completions/:completion_id',
    describeRoute({
      operationId: 'deleteChatCompletion',
      tags: ['Chat'],
      summary: 'Delete chat completion',
      description:
        'Delete a stored chat completion. Only Chat Completions that have been\ncreated with the `store` parameter set to `true` can be deleted.\n',
      responses: {
        '200': {
          description: 'The chat completion was deleted successfully.',
          content: { 'application/json': { schema: resolver(ChatCompletionDeletedSchema) } },
        },
        '404': {
          description: 'No stored chat completion was found with the specified ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'An internal error prevented the request from being completed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ completion_id: v.string() })),
    (c) => {},
  )
  .get(
    '/chat/completions/:completion_id/messages',
    describeRoute({
      operationId: 'getChatCompletionMessages',
      tags: ['Chat'],
      summary: 'Get chat messages',
      description:
        'Get the messages in a stored chat completion. Only Chat Completions that\nhave been created with the `store` parameter set to `true` will be\nreturned.\n',
      responses: {
        '200': {
          description: 'A list of messages',
          content: { 'application/json': { schema: resolver(ChatCompletionMessageListSchema) } },
        },
        '400': {
          description: 'Invalid message pagination parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'No stored chat completion was found with the specified ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'An internal error prevented the request from being completed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ completion_id: v.string() })),
    validator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => {},
  )
