import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        include: z.array(IncludeEnumSchema).exactOptional(),
        stream: z.boolean().exactOptional(),
        starting_after: z.int().exactOptional(),
        include_obfuscation: z.boolean().exactOptional(),
      }),
    )
    .output(ResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseId: t.procedure
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    )
    .output(
      z.object({
        object: z.literal('response.deleted').default('response.deleted'),
        deleted: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancel: t.procedure
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    )
    .output(ResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdInputItems: t.procedure
    .input(
      z.object({
        response_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z.array(IncludeEnumSchema).exactOptional(),
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
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        include: z.array(BetaIncludeEnumSchema).exactOptional(),
        stream: z.boolean().exactOptional(),
        starting_after: z.int().exactOptional(),
        include_obfuscation: z.boolean().exactOptional(),
      }),
    )
    .output(BetaResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseIdBetaTrue: t.procedure
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    )
    .output(
      z.object({
        object: z.literal('response.deleted').default('response.deleted'),
        deleted: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancelBetaTrue: t.procedure
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
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
      z.object({
        response_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z.array(BetaIncludeEnumSchema).exactOptional(),
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
