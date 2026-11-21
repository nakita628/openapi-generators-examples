import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .handler(async ({ input }) => {})

export const getResponsesResponseId = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}',
    tags: ['Responses'],
    summary: 'Get a model response',
    description: 'Retrieves a model response with the given ID.\n',
  })
  .input(
    v.object({
      response_id: v.pipe(
        v.string(),
        v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      ),
      include: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(IncludeEnumSchema),
        ),
      ),
      stream: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      starting_after: v.optional(
        v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      ),
      include_obfuscation: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(ResponseSchema)
  .handler(async ({ input }) => {})

export const deleteResponsesResponseId = os
  .route({
    method: 'DELETE',
    path: '/responses/{response_id}',
    tags: ['Responses'],
    summary: 'Delete a model response',
    description: 'Deletes a model response with the given ID.\n',
  })
  .input(
    v.object({
      response_id: v.pipe(
        v.string(),
        v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      ),
    }),
  )
  .output(
    v.object({
      object: v.optional(v.literal('response.deleted'), 'response.deleted'),
      deleted: v.boolean(),
      id: v.string(),
    }),
  )
  .handler(async ({ input }) => {})

export const postResponsesResponseIdCancel = os
  .route({
    method: 'POST',
    path: '/responses/{response_id}/cancel',
    tags: ['Responses'],
    summary: 'Cancel a response',
    description:
      'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
  })
  .input(
    v.object({
      response_id: v.pipe(
        v.string(),
        v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      ),
    }),
  )
  .output(ResponseSchema)
  .handler(async ({ input }) => {})

export const getResponsesResponseIdInputItems = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}/input_items',
    tags: ['Responses'],
    summary: 'List input items',
    description: 'Returns a list of input items for a given response.',
  })
  .input(
    v.object({
      response_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.picklist(['asc', 'desc'])),
      after: v.optional(v.string()),
      include: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(IncludeEnumSchema),
        ),
      ),
    }),
  )
  .output(ResponseItemListSchema)
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

export const getResponsesResponseIdBetaTrue = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}?beta=true',
    tags: ['Responses'],
    summary: 'Get a model response',
    description: 'Retrieves a model response with the given ID.\n',
  })
  .input(
    v.object({
      response_id: v.pipe(
        v.string(),
        v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      ),
      include: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(BetaIncludeEnumSchema),
        ),
      ),
      stream: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      starting_after: v.optional(
        v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      ),
      include_obfuscation: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(BetaResponseSchema)
  .handler(async ({ input }) => {})

export const deleteResponsesResponseIdBetaTrue = os
  .route({
    method: 'DELETE',
    path: '/responses/{response_id}?beta=true',
    tags: ['Responses'],
    summary: 'Delete a model response',
    description: 'Deletes a model response with the given ID.\n',
  })
  .input(
    v.object({
      response_id: v.pipe(
        v.string(),
        v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      ),
    }),
  )
  .output(
    v.object({
      object: v.optional(v.literal('response.deleted'), 'response.deleted'),
      deleted: v.boolean(),
      id: v.string(),
    }),
  )
  .handler(async ({ input }) => {})

export const postResponsesResponseIdCancelBetaTrue = os
  .route({
    method: 'POST',
    path: '/responses/{response_id}/cancel?beta=true',
    tags: ['Responses'],
    summary: 'Cancel a response',
    description:
      'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
  })
  .input(
    v.object({
      response_id: v.pipe(
        v.string(),
        v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      ),
    }),
  )
  .output(BetaResponseSchema)
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

export const getResponsesResponseIdInputItemsBetaTrue = os
  .route({
    method: 'GET',
    path: '/responses/{response_id}/input_items?beta=true',
    tags: ['Responses'],
    summary: 'List input items',
    description: 'Returns a list of input items for a given response.',
  })
  .input(
    v.object({
      response_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.picklist(['asc', 'desc'])),
      after: v.optional(v.string()),
      include: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(BetaIncludeEnumSchema),
        ),
      ),
    }),
  )
  .output(BetaResponseItemListSchema)
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})
