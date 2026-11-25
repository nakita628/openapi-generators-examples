import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
    .input(AddAudienceToAudienceGroupRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotAudienceGroupUpload: t.procedure
    .input(CreateAudienceGroupRequestSchema)
    .output(CreateAudienceGroupResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotAudienceGroupUploadByFile: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotAudienceGroupUploadByFile: t.procedure
    .output(CreateAudienceGroupResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotAudienceGroupClick: t.procedure
    .input(CreateClickBasedAudienceGroupRequestSchema)
    .output(CreateClickBasedAudienceGroupResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotAudienceGroupImp: t.procedure
    .input(CreateImpBasedAudienceGroupRequestSchema)
    .output(CreateImpBasedAudienceGroupResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotAudienceGroupAudienceGroupIdUpdateDescription: t.procedure
    .input(
      type({
        audienceGroupId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'description?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
          .describe(
            "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
          ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      type({
        audienceGroupId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .output(GetAudienceDataResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      type({
        audienceGroupId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupList: t.procedure
    .input(
      type({
        page: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
        'description?': 'string',
        'status?': AudienceGroupStatusSchema,
        'size?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data <= 40n || ctx.mustBe('at most 40')),
        'includesExternalPublicGroups?': 'boolean',
        'createRoute?': AudienceGroupCreateRouteSchema,
      }),
    )
    .output(GetAudienceGroupsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedAudienceGroupId: t.procedure
    .input(
      type({
        audienceGroupId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .output(GetSharedAudienceDataResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedList: t.procedure
    .input(
      type({
        page: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
        'description?': 'string',
        'status?': AudienceGroupStatusSchema,
        'size?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data <= 40n || ctx.mustBe('at most 40')),
        'createRoute?': AudienceGroupCreateRouteSchema,
        'includesOwnedAudienceGroups?': 'boolean',
      }),
    )
    .output(GetSharedAudienceGroupsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
