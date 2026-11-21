import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
    (c) => { throw new Error('Not implemented') },
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
    validator('param', type({ response_id: 'string' })),
    validator(
      'query',
      type({
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(IncludeEnumSchema).array(),
        ),
        'stream?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'starting_after?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'include_obfuscation?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
                type({ object: "'response.deleted'", deleted: 'boolean', id: 'string' }),
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
    validator('param', type({ response_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
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
    validator('param', type({ response_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
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
    validator('param', type({ response_id: 'string' })),
    validator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(IncludeEnumSchema).array(),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    validator('param', type({ response_id: 'string' })),
    validator(
      'query',
      type({
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(BetaIncludeEnumSchema).array(),
        ),
        'stream?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'starting_after?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'include_obfuscation?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    validator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
                type({ object: "'response.deleted'", deleted: 'boolean', id: 'string' }),
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
    validator('param', type({ response_id: 'string' })),
    validator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
    validator('param', type({ response_id: 'string' })),
    validator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    validator('json', BetaCompactResponseMethodPublicBodySchema),
    (c) => { throw new Error('Not implemented') },
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
    validator('param', type({ response_id: 'string' })),
    validator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(BetaIncludeEnumSchema).array(),
        ),
      }),
    ),
    validator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    validator('json', BetaTokenCountsBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
