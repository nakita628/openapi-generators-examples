import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        audienceGroupId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        description: v.optional(
          v.pipe(
            v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
            v.description(
              "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
            ),
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      v.object({
        audienceGroupId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    )
    .output(GetAudienceDataResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      v.object({
        audienceGroupId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupList: t.procedure
    .input(
      v.object({
        page: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
        ),
        description: v.optional(v.string()),
        status: v.optional(AudienceGroupStatusSchema),
        size: v.optional(
          v.pipe(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.maxValue(40n),
            ),
            v.metadata({ examples: [20] }),
          ),
        ),
        includesExternalPublicGroups: v.optional(
          v.pipe(v.boolean(), v.metadata({ examples: [true] })),
        ),
        createRoute: v.optional(AudienceGroupCreateRouteSchema),
      }),
    )
    .output(GetAudienceGroupsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedAudienceGroupId: t.procedure
    .input(
      v.object({
        audienceGroupId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    )
    .output(GetSharedAudienceDataResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedList: t.procedure
    .input(
      v.object({
        page: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
        ),
        description: v.optional(v.string()),
        status: v.optional(AudienceGroupStatusSchema),
        size: v.optional(
          v.pipe(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.maxValue(40n),
            ),
            v.metadata({ examples: [20] }),
          ),
        ),
        createRoute: v.optional(AudienceGroupCreateRouteSchema),
        includesOwnedAudienceGroups: v.optional(v.boolean(), false),
      }),
    )
    .output(GetSharedAudienceGroupsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
