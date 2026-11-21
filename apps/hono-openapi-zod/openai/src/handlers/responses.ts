import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  CreateResponseSchema,
  ErrorResponseSchema,
  ResponseSchema,
  ResponseItemListSchema,
  ResponseStreamEventSchema,
  IncludeEnumSchema,
  TokenCountsBodySchema,
  TokenCountsResourceSchema,
  CompactResponseMethodPublicBodySchema,
  CompactResourceSchema,
  BetaTokenCountsResourceSchema,
  BetaTokenCountsBodySchema,
  BetaCompactResponseMethodPublicBodySchema,
  BetaErrorResponseSchema,
  BetaResponseItemListSchema,
  BetaCompactResourceSchema,
  BetaResponseSchema,
  BetaIncludeEnumSchema,
  BetaResponseStreamEventSchema,
  TooManyRequestsResponse,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

export const responsesHandler = new Hono()
  .post(
    '/responses',
    describeRoute({
      operationId: 'createResponse',
      tags: ['Responses'],
      summary: 'Create a model response',
      description:
        "Creates a model response. Provide [text](https://developers.openai.com/api/docs/guides/text) or\n[image](https://developers.openai.com/api/docs/guides/images-vision) inputs to generate [text](https://developers.openai.com/api/docs/guides/text)\nor [JSON](https://developers.openai.com/api/docs/guides/structured-outputs) outputs. Have the model call\nyour own [custom code](https://developers.openai.com/api/docs/guides/function-calling) or use built-in\n[tools](https://developers.openai.com/api/docs/guides/tools) like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)\nor [file search](https://developers.openai.com/api/docs/guides/tools-file-search) to use your own data\nas input for the model's response.\n",
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(ResponseSchema) },
            'text/event-stream': { schema: resolver(ResponseStreamEventSchema) },
          },
        },
        '400': {
          description: 'Invalid response request or incompatible request parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The requested model or a referenced resource was not found or is unavailable to this caller.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', CreateResponseSchema),
    (c) => {},
  )
  .get(
    '/responses/:response_id',
    describeRoute({
      operationId: 'getResponse',
      tags: ['Responses'],
      summary: 'Get a model response',
      description: 'Retrieves a model response with the given ID.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(ResponseSchema) },
            'text/event-stream': { schema: resolver(ResponseStreamEventSchema) },
          },
        },
        '404': {
          description: 'The response was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    validator(
      'query',
      z.object({
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
        stream: z.stringbool().exactOptional(),
        starting_after: z.coerce.number().int().exactOptional(),
        include_obfuscation: z.stringbool().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/responses/:response_id',
    describeRoute({
      operationId: 'deleteResponse',
      tags: ['Responses'],
      summary: 'Delete a model response',
      description: 'Deletes a model response with the given ID.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                z.object({
                  object: z.literal('response.deleted').default('response.deleted'),
                  deleted: z.boolean(),
                  id: z.string(),
                }),
              ),
            },
          },
        },
        '404': {
          description: 'Not Found',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel',
    describeRoute({
      operationId: 'cancelResponse',
      tags: ['Responses'],
      summary: 'Cancel a response',
      description:
        'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ResponseSchema) } },
        },
        '404': {
          description: 'Not Found',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items',
    describeRoute({
      operationId: 'listInputItems',
      tags: ['Responses'],
      summary: 'List input items',
      description: 'Returns a list of input items for a given response.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ResponseItemListSchema) } },
        },
        '404': {
          description: 'The response or the item specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ response_id: z.string() })),
    validator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/input_tokens',
    describeRoute({
      tags: ['Responses'],
      summary: 'Get input token counts',
      description:
        'Returns input token counts of the request.\n\nReturns an object with `object` set to `response.input_tokens` and an `input_tokens` count.',
      operationId: 'Getinputtokencounts',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(TokenCountsResourceSchema) } },
        },
        '400': {
          description:
            'The request to count input tokens is invalid or contains incompatible parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', TokenCountsBodySchema),
    (c) => {},
  )
  .post(
    '/responses/compact',
    describeRoute({
      tags: ['Responses'],
      summary: 'Compact conversation',
      description:
        'Compact a conversation. Returns a compacted response object.\n\nLearn when and how to compact long-running conversations in the [conversation state guide](https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window). For ZDR-compatible compaction details, see [Compaction (advanced)](https://developers.openai.com/api/docs/guides/conversation-state#compaction-advanced).',
      operationId: 'Compactconversation',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(CompactResourceSchema) } },
        },
        '400': {
          description: 'Invalid compaction request or incompatible input parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', CompactResponseMethodPublicBodySchema),
    (c) => {},
  )
  .get(
    '/responses/:response_id?beta=true',
    describeRoute({
      operationId: 'beta_getResponse',
      tags: ['Responses'],
      summary: 'Get a model response',
      description: 'Retrieves a model response with the given ID.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(BetaResponseSchema) },
            'text/event-stream': { schema: resolver(BetaResponseStreamEventSchema) },
          },
        },
        '404': {
          description: 'The response was not found.',
          content: { 'application/json': { schema: resolver(BetaErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    validator(
      'query',
      z.object({
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(BetaIncludeEnumSchema),
          )
          .exactOptional(),
        stream: z.stringbool().exactOptional(),
        starting_after: z.coerce.number().int().exactOptional(),
        include_obfuscation: z.stringbool().exactOptional(),
      }),
    ),
    validator(
      'header',
      z.object({
        'openai-beta': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('responses_multi_agent=v1')),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/responses/:response_id?beta=true',
    describeRoute({
      operationId: 'beta_deleteResponse',
      tags: ['Responses'],
      summary: 'Delete a model response',
      description: 'Deletes a model response with the given ID.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                z.object({
                  object: z.literal('response.deleted').default('response.deleted'),
                  deleted: z.boolean(),
                  id: z.string(),
                }),
              ),
            },
          },
        },
        '404': {
          description: 'Not Found',
          content: { 'application/json': { schema: resolver(BetaErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    validator(
      'header',
      z.object({
        'openai-beta': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('responses_multi_agent=v1')),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel?beta=true',
    describeRoute({
      operationId: 'beta_cancelResponse',
      tags: ['Responses'],
      summary: 'Cancel a response',
      description:
        'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(BetaResponseSchema) } },
        },
        '404': {
          description: 'Not Found',
          content: { 'application/json': { schema: resolver(BetaErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    validator(
      'header',
      z.object({
        'openai-beta': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('responses_multi_agent=v1')),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/compact?beta=true',
    describeRoute({
      tags: ['Responses'],
      summary: 'Compact conversation',
      description:
        'Compact a conversation. Returns a compacted response object.\n\nLearn when and how to compact long-running conversations in the [conversation state guide](https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window). For ZDR-compatible compaction details, see [Compaction (advanced)](https://developers.openai.com/api/docs/guides/conversation-state#compaction-advanced).',
      operationId: 'beta_Compactconversation',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(BetaCompactResourceSchema) } },
        },
        '400': {
          description: 'Invalid compaction request or incompatible input parameters.',
          content: { 'application/json': { schema: resolver(BetaErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator(
      'header',
      z.object({
        'openai-beta': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('responses_multi_agent=v1')),
          )
          .exactOptional(),
      }),
    ),
    validator('json', BetaCompactResponseMethodPublicBodySchema),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items?beta=true',
    describeRoute({
      operationId: 'beta_listInputItems',
      tags: ['Responses'],
      summary: 'List input items',
      description: 'Returns a list of input items for a given response.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(BetaResponseItemListSchema) } },
        },
        '404': {
          description: 'The response or the item specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(BetaErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ response_id: z.string() })),
    validator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(BetaIncludeEnumSchema),
          )
          .exactOptional(),
      }),
    ),
    validator(
      'header',
      z.object({
        'openai-beta': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('responses_multi_agent=v1')),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/input_tokens?beta=true',
    describeRoute({
      tags: ['Responses'],
      summary: 'Get input token counts',
      description:
        'Returns input token counts of the request.\n\nReturns an object with `object` set to `response.input_tokens` and an `input_tokens` count.',
      operationId: 'beta_Getinputtokencounts',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(BetaTokenCountsResourceSchema) } },
        },
        '400': {
          description:
            'The request to count input tokens is invalid or contains incompatible parameters.',
          content: { 'application/json': { schema: resolver(BetaErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'header',
      z.object({
        'openai-beta': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('responses_multi_agent=v1')),
          )
          .exactOptional(),
      }),
    ),
    validator('json', BetaTokenCountsBodySchema),
    (c) => {},
  )
