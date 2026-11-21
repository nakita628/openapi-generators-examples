import { initTRPC, TRPCError } from '@trpc/server'
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
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
        include: v.optional(v.array(IncludeEnumSchema)),
        stream: v.optional(v.boolean()),
        starting_after: v.optional(v.pipe(v.number(), v.integer())),
        include_obfuscation: v.optional(v.boolean()),
      }),
    )
    .output(ResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancel: t.procedure
    .input(
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    )
    .output(ResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdInputItems: t.procedure
    .input(
      v.object({
        response_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc'])),
        after: v.optional(v.string()),
        include: v.optional(v.array(IncludeEnumSchema)),
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
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
        include: v.optional(v.array(BetaIncludeEnumSchema)),
        stream: v.optional(v.boolean()),
        starting_after: v.optional(v.pipe(v.number(), v.integer())),
        include_obfuscation: v.optional(v.boolean()),
      }),
    )
    .output(BetaResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseIdBetaTrue: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancelBetaTrue: t.procedure
    .input(
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    )
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
      v.object({
        response_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc'])),
        after: v.optional(v.string()),
        include: v.optional(v.array(BetaIncludeEnumSchema)),
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
