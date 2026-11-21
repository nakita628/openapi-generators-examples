import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const responsesRouter = t.router({
  postResponses: t.procedure
    .input(CreateResponseSchema)
    .output(ResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseId: t.procedure
    .input(
      type({
        response_id: 'string',
        'include?': type(IncludeEnumSchema).array(),
        'stream?': 'boolean',
        'starting_after?': 'number.integer',
        'include_obfuscation?': 'boolean',
      }),
    )
    .output(ResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseId: t.procedure
    .input(type({ response_id: 'string' }))
    .output(type({ object: "'response.deleted'", deleted: 'boolean', id: 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancel: t.procedure
    .input(type({ response_id: 'string' }))
    .output(ResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdInputItems: t.procedure
    .input(
      type({
        response_id: 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type(IncludeEnumSchema).array(),
      }),
    )
    .output(ResponseItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesInputTokens: t.procedure
    .input(TokenCountsBodySchema)
    .output(TokenCountsResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesCompact: t.procedure
    .input(CompactResponseMethodPublicBodySchema)
    .output(CompactResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdBetaTrue: t.procedure
    .input(
      type({
        response_id: 'string',
        'include?': type(BetaIncludeEnumSchema).array(),
        'stream?': 'boolean',
        'starting_after?': 'number.integer',
        'include_obfuscation?': 'boolean',
      }),
    )
    .output(BetaResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseIdBetaTrue: t.procedure
    .input(type({ response_id: 'string' }))
    .output(type({ object: "'response.deleted'", deleted: 'boolean', id: 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancelBetaTrue: t.procedure
    .input(type({ response_id: 'string' }))
    .output(BetaResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesCompactBetaTrue: t.procedure
    .input(BetaCompactResponseMethodPublicBodySchema)
    .output(BetaCompactResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdInputItemsBetaTrue: t.procedure
    .input(
      type({
        response_id: 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type(BetaIncludeEnumSchema).array(),
      }),
    )
    .output(BetaResponseItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesInputTokensBetaTrue: t.procedure
    .input(BetaTokenCountsBodySchema)
    .output(BetaTokenCountsResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
