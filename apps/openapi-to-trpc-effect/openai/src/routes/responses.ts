import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
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
    .input(Schema.toStandardSchemaV1(CreateResponseSchema))
    .output(Schema.toStandardSchemaV1(ResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
          include: Schema.optionalKey(Schema.Array(IncludeEnumSchema)),
          stream: Schema.optionalKey(Schema.Boolean),
          starting_after: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          include_obfuscation: Schema.optionalKey(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.Literal('response.deleted').pipe(
            Schema.withDecodingDefault(Effect.succeed('response.deleted')),
          ),
          deleted: Schema.Boolean,
          id: Schema.String,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdInputItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
          after: Schema.optionalKey(Schema.String),
          include: Schema.optionalKey(Schema.Array(IncludeEnumSchema)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ResponseItemListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesInputTokens: t.procedure
    .input(Schema.toStandardSchemaV1(TokenCountsBodySchema))
    .output(Schema.toStandardSchemaV1(TokenCountsResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesCompact: t.procedure
    .input(Schema.toStandardSchemaV1(CompactResponseMethodPublicBodySchema))
    .output(Schema.toStandardSchemaV1(CompactResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdBetaTrue: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
          include: Schema.optionalKey(Schema.Array(BetaIncludeEnumSchema)),
          stream: Schema.optionalKey(Schema.Boolean),
          starting_after: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          include_obfuscation: Schema.optionalKey(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BetaResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteResponsesResponseIdBetaTrue: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.Literal('response.deleted').pipe(
            Schema.withDecodingDefault(Effect.succeed('response.deleted')),
          ),
          deleted: Schema.Boolean,
          id: Schema.String,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesResponseIdCancelBetaTrue: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BetaResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesCompactBetaTrue: t.procedure
    .input(Schema.toStandardSchemaV1(BetaCompactResponseMethodPublicBodySchema))
    .output(Schema.toStandardSchemaV1(BetaCompactResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getResponsesResponseIdInputItemsBetaTrue: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
          after: Schema.optionalKey(Schema.String),
          include: Schema.optionalKey(Schema.Array(BetaIncludeEnumSchema)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BetaResponseItemListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postResponsesInputTokensBetaTrue: t.procedure
    .input(Schema.toStandardSchemaV1(BetaTokenCountsBodySchema))
    .output(Schema.toStandardSchemaV1(BetaTokenCountsResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
