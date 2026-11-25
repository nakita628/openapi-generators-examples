import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        audienceGroupId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
        description: z
          .string()
          .min(1)
          .max(120)
          .meta({
            description:
              "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
          })
          .exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      z.object({
        audienceGroupId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
      }),
    )
    .output(GetAudienceDataResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotAudienceGroupAudienceGroupId: t.procedure
    .input(
      z.object({
        audienceGroupId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupList: t.procedure
    .input(
      z.object({
        page: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n)),
        description: z.string().exactOptional(),
        status: AudienceGroupStatusSchema.exactOptional(),
        size: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().max(40n))
          .meta({ examples: [20] })
          .exactOptional(),
        includesExternalPublicGroups: z
          .boolean()
          .meta({ examples: [true] })
          .exactOptional(),
        createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
      }),
    )
    .output(GetAudienceGroupsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedAudienceGroupId: t.procedure
    .input(
      z.object({
        audienceGroupId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
      }),
    )
    .output(GetSharedAudienceDataResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotAudienceGroupSharedList: t.procedure
    .input(
      z.object({
        page: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n)),
        description: z.string().exactOptional(),
        status: AudienceGroupStatusSchema.exactOptional(),
        size: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().max(40n))
          .meta({ examples: [20] })
          .exactOptional(),
        createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
        includesOwnedAudienceGroups: z.boolean().default(false).exactOptional(),
      }),
    )
    .output(GetSharedAudienceGroupsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
