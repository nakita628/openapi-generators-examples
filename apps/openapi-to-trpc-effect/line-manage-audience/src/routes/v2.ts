import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  AddAudienceToAudienceGroupRequestSchema,
  AudienceGroupCreateRouteSchema,
  AudienceGroupStatusSchema,
  CreateAudienceGroupRequestSchema,
  CreateAudienceGroupResponseSchema,
  CreateClickBasedAudienceGroupRequestSchema,
  CreateClickBasedAudienceGroupResponseSchema,
  CreateImpBasedAudienceGroupRequestSchema,
  CreateImpBasedAudienceGroupResponseSchema,
  GetAudienceDataResponseSchema,
  GetAudienceGroupsResponseSchema,
  GetSharedAudienceDataResponseSchema,
  GetSharedAudienceGroupsResponseSchema,
} from '../components'

const t = initTRPC.create()

export const v2Router = t.router({
  putV2BotAudienceGroupUpload: t.procedure
    .input(Schema.toStandardSchemaV1(AddAudienceToAudienceGroupRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotAudienceGroupUpload: t.procedure
    .input(Schema.toStandardSchemaV1(CreateAudienceGroupRequestSchema))
    .output(Schema.toStandardSchemaV1(CreateAudienceGroupResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotAudienceGroupUploadByFile: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotAudienceGroupUploadByFile: t.procedure
    .output(Schema.toStandardSchemaV1(CreateAudienceGroupResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotAudienceGroupClick: t.procedure
    .input(Schema.toStandardSchemaV1(CreateClickBasedAudienceGroupRequestSchema))
    .output(Schema.toStandardSchemaV1(CreateClickBasedAudienceGroupResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotAudienceGroupImp: t.procedure
    .input(Schema.toStandardSchemaV1(CreateImpBasedAudienceGroupRequestSchema))
    .output(Schema.toStandardSchemaV1(CreateImpBasedAudienceGroupResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotAudienceGroupAudienceGroupIdUpdateDescription: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ),
          description: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 120, {
                expected: 'a string of at most 120 characters',
              }),
            ).annotate({
              description:
                "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetAudienceDataResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupList: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          page: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
            ),
          description: Schema.optionalKey(Schema.String),
          status: Schema.optionalKey(AudienceGroupStatusSchema),
          size: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isLessThanOrEqualToBigInt(40n),
              )
              .annotate({ jsonSchemaExamples: [20] }),
          ),
          includesExternalPublicGroups: Schema.optionalKey(
            Schema.Boolean.annotate({ jsonSchemaExamples: [true] }),
          ),
          createRoute: Schema.optionalKey(AudienceGroupCreateRouteSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetAudienceGroupsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedAudienceGroupId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetSharedAudienceDataResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedList: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          page: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
            ),
          description: Schema.optionalKey(Schema.String),
          status: Schema.optionalKey(AudienceGroupStatusSchema),
          size: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isLessThanOrEqualToBigInt(40n),
              )
              .annotate({ jsonSchemaExamples: [20] }),
          ),
          createRoute: Schema.optionalKey(AudienceGroupCreateRouteSchema),
          includesOwnedAudienceGroups: Schema.Boolean.pipe(
            Schema.withDecodingDefault(Effect.succeed(false)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetSharedAudienceGroupsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
