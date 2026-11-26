import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
            'application/json': { schema: resolver(toStandardSchemaV1(ResponseSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(ResponseStreamEventSchema)),
            },
          },
        },
        '400': {
          description: 'Invalid response request or incompatible request parameters.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The requested model or a referenced resource was not found or is unavailable to this caller.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', toStandardSchemaV1(CreateResponseSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(ResponseSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(ResponseStreamEventSchema)),
            },
          },
        },
        '404': {
          description: 'The response was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          include: Type.Optional(Type.Array(IncludeEnumSchema)),
          stream: Type.Optional(
            Codec(
              Type.String({
                pattern:
                  '^(?:[Tt][Rr][Uu][Ee]|1|[Yy][Ee][Ss]|[Oo][Nn]|[Yy]|[Ee][Nn][Aa][Bb][Ll][Ee][Dd]|[Ff][Aa][Ll][Ss][Ee]|0|[Nn][Oo]|[Oo][Ff][Ff]|[Nn]|[Dd][Ii][Ss][Aa][Bb][Ll][Ee][Dd])$',
              }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          starting_after: Type.Optional(
            Codec(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          include_obfuscation: Type.Optional(
            Codec(
              Type.String({
                pattern:
                  '^(?:[Tt][Rr][Uu][Ee]|1|[Yy][Ee][Ss]|[Oo][Nn]|[Yy]|[Ee][Nn][Aa][Bb][Ll][Ee][Dd]|[Ff][Aa][Ll][Ss][Ee]|0|[Nn][Oo]|[Oo][Ff][Ff]|[Nn]|[Dd][Ii][Ss][Aa][Bb][Ll][Ee][Dd])$',
              }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
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
                toStandardSchemaV1(
                  Type.Object({
                    object: Type.Optional(
                      Type.Literal('response.deleted', { default: 'response.deleted' }),
                    ),
                    deleted: Type.Boolean(),
                    id: Type.String(),
                  }),
                ),
              ),
            },
          },
        },
        '404': {
          description: 'Not Found',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        }),
      ),
    ),
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
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(ResponseSchema)) } },
        },
        '404': {
          description: 'Not Found',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        }),
      ),
    ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ResponseItemListSchema)) },
          },
        },
        '404': {
          description: 'The response or the item specified by `after` was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ response_id: Type.String() }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
          after: Type.Optional(Type.String()),
          include: Type.Optional(Type.Array(IncludeEnumSchema)),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(TokenCountsResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request to count input tokens is invalid or contains incompatible parameters.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', toStandardSchemaV1(TokenCountsBodySchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(CompactResourceSchema)) },
          },
        },
        '400': {
          description: 'Invalid compaction request or incompatible input parameters.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', toStandardSchemaV1(CompactResponseMethodPublicBodySchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(BetaResponseSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(BetaResponseStreamEventSchema)),
            },
          },
        },
        '404': {
          description: 'The response was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          include: Type.Optional(Type.Array(BetaIncludeEnumSchema)),
          stream: Type.Optional(
            Codec(
              Type.String({
                pattern:
                  '^(?:[Tt][Rr][Uu][Ee]|1|[Yy][Ee][Ss]|[Oo][Nn]|[Yy]|[Ee][Nn][Aa][Bb][Ll][Ee][Dd]|[Ff][Aa][Ll][Ss][Ee]|0|[Nn][Oo]|[Oo][Ff][Ff]|[Nn]|[Dd][Ii][Ss][Aa][Bb][Ll][Ee][Dd])$',
              }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          starting_after: Type.Optional(
            Codec(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          include_obfuscation: Type.Optional(
            Codec(
              Type.String({
                pattern:
                  '^(?:[Tt][Rr][Uu][Ee]|1|[Yy][Ee][Ss]|[Oo][Nn]|[Yy]|[Ee][Nn][Aa][Bb][Ll][Ee][Dd]|[Ff][Aa][Ll][Ss][Ee]|0|[Nn][Oo]|[Oo][Ff][Ff]|[Nn]|[Dd][Ii][Ss][Aa][Bb][Ll][Ee][Dd])$',
              }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
        }),
      ),
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
                toStandardSchemaV1(
                  Type.Object({
                    object: Type.Optional(
                      Type.Literal('response.deleted', { default: 'response.deleted' }),
                    ),
                    deleted: Type.Boolean(),
                    id: Type.String(),
                  }),
                ),
              ),
            },
          },
        },
        '404': {
          description: 'Not Found',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        }),
      ),
    ),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaResponseSchema)) },
          },
        },
        '404': {
          description: 'Not Found',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        }),
      ),
    ),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaCompactResourceSchema)) },
          },
        },
        '400': {
          description: 'Invalid compaction request or incompatible input parameters.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(BetaCompactResponseMethodPublicBodySchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(BetaResponseItemListSchema)),
            },
          },
        },
        '404': {
          description: 'The response or the item specified by `after` was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ response_id: Type.String() }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
          after: Type.Optional(Type.String()),
          include: Type.Optional(Type.Array(BetaIncludeEnumSchema)),
        }),
      ),
    ),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(BetaTokenCountsResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request to count input tokens is invalid or contains incompatible parameters.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(BetaTokenCountsBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
