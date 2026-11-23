import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  BetaCompactResourceSchema,
  BetaCompactResponseMethodPublicBodySchema,
  BetaIncludeEnumSchema,
  BetaResponseItemListSchema,
  BetaResponseSchema,
  BetaTokenCountsBodySchema,
  BetaTokenCountsResourceSchema,
  CompactResourceSchema,
  CompactResponseMethodPublicBodySchema,
  CreateResponseSchema,
  IncludeEnumSchema,
  ResponseItemListSchema,
  ResponseSchema,
  TokenCountsBodySchema,
  TokenCountsResourceSchema,
} from '../components'

export const postResponses = os
  .route({
    method: 'POST',
    path: '/responses',
    tags: ['Responses'],
    summary: 'Create a model response',
    description:
      "Creates a model response. Provide [text](https://developers.openai.com/api/docs/guides/text) or\n[image](https://developers.openai.com/api/docs/guides/images-vision) inputs to generate [text](https://developers.openai.com/api/docs/guides/text)\nor [JSON](https://developers.openai.com/api/docs/guides/structured-outputs) outputs. Have the model call\nyour own [custom code](https://developers.openai.com/api/docs/guides/function-calling) or use built-in\n[tools](https://developers.openai.com/api/docs/guides/tools) like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)\nor [file search](https://developers.openai.com/api/docs/guides/tools-file-search) to use your own data\nas input for the model's response.\n",
  })
  .input(CreateResponseSchema)
  .output(ResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getResponsesResponseId = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}',
    tags: ['Responses'],
    summary: 'Get a model response',
    description: 'Retrieves a model response with the given ID.\n',
  })
  .input(
    type({
      response_id: type('string'),
      'include?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(IncludeEnumSchema).array(),
      ),
      'stream?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'starting_after?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'include_obfuscation?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(ResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteResponsesResponseId = os
  .route({
    method: 'DELETE',
    path: '/responses/{response_id}',
    tags: ['Responses'],
    summary: 'Delete a model response',
    description: 'Deletes a model response with the given ID.\n',
  })
  .input(type({ response_id: type('string') }))
  .output(type({ object: "'response.deleted'", deleted: 'boolean', id: 'string' }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postResponsesResponseIdCancel = os
  .route({
    method: 'POST',
    path: '/responses/{response_id}/cancel',
    tags: ['Responses'],
    summary: 'Cancel a response',
    description:
      'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
  })
  .input(type({ response_id: type('string') }))
  .output(ResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getResponsesResponseIdInputItems = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}/input_items',
    tags: ['Responses'],
    summary: 'List input items',
    description: 'Returns a list of input items for a given response.',
  })
  .input(
    type({
      response_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'include?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(IncludeEnumSchema).array(),
      ),
    }),
  )
  .output(ResponseItemListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postResponsesInputTokens = os
  .route({
    method: 'POST',
    path: '/responses/input_tokens',
    tags: ['Responses'],
    summary: 'Get input token counts',
    description:
      'Returns input token counts of the request.\n\nReturns an object with `object` set to `response.input_tokens` and an `input_tokens` count.',
    successDescription: 'Success',
  })
  .input(TokenCountsBodySchema)
  .output(TokenCountsResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postResponsesCompact = os
  .route({
    method: 'POST',
    path: '/responses/compact',
    tags: ['Responses'],
    summary: 'Compact conversation',
    description:
      'Compact a conversation. Returns a compacted response object.\n\nLearn when and how to compact long-running conversations in the [conversation state guide](https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window). For ZDR-compatible compaction details, see [Compaction (advanced)](https://developers.openai.com/api/docs/guides/conversation-state#compaction-advanced).',
    successDescription: 'Success',
  })
  .input(CompactResponseMethodPublicBodySchema)
  .output(CompactResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getResponsesResponseIdBetaTrue = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}?beta=true',
    tags: ['Responses'],
    summary: 'Get a model response',
    description: 'Retrieves a model response with the given ID.\n',
  })
  .input(
    type({
      response_id: type('string'),
      'include?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(BetaIncludeEnumSchema).array(),
      ),
      'stream?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'starting_after?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'include_obfuscation?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(BetaResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteResponsesResponseIdBetaTrue = os
  .route({
    method: 'DELETE',
    path: '/responses/{response_id}?beta=true',
    tags: ['Responses'],
    summary: 'Delete a model response',
    description: 'Deletes a model response with the given ID.\n',
  })
  .input(type({ response_id: type('string') }))
  .output(type({ object: "'response.deleted'", deleted: 'boolean', id: 'string' }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postResponsesResponseIdCancelBetaTrue = os
  .route({
    method: 'POST',
    path: '/responses/{response_id}/cancel?beta=true',
    tags: ['Responses'],
    summary: 'Cancel a response',
    description:
      'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
  })
  .input(type({ response_id: type('string') }))
  .output(BetaResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postResponsesCompactBetaTrue = os
  .route({
    method: 'POST',
    path: '/responses/compact?beta=true',
    tags: ['Responses'],
    summary: 'Compact conversation',
    description:
      'Compact a conversation. Returns a compacted response object.\n\nLearn when and how to compact long-running conversations in the [conversation state guide](https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window). For ZDR-compatible compaction details, see [Compaction (advanced)](https://developers.openai.com/api/docs/guides/conversation-state#compaction-advanced).',
    successDescription: 'Success',
  })
  .input(BetaCompactResponseMethodPublicBodySchema)
  .output(BetaCompactResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getResponsesResponseIdInputItemsBetaTrue = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}/input_items?beta=true',
    tags: ['Responses'],
    summary: 'List input items',
    description: 'Returns a list of input items for a given response.',
  })
  .input(
    type({
      response_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'include?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(BetaIncludeEnumSchema).array(),
      ),
    }),
  )
  .output(BetaResponseItemListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postResponsesInputTokensBetaTrue = os
  .route({
    method: 'POST',
    path: '/responses/input_tokens?beta=true',
    tags: ['Responses'],
    summary: 'Get input token counts',
    description:
      'Returns input token counts of the request.\n\nReturns an object with `object` set to `response.input_tokens` and an `input_tokens` count.',
    successDescription: 'Success',
  })
  .input(BetaTokenCountsBodySchema)
  .output(BetaTokenCountsResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
