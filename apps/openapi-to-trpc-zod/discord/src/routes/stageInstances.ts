import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
} from '../components'

const t = initTRPC.create()

export const stageInstancesRouter = t.router({
  postStageInstances: t.procedure
    .input(
      z.object({
        topic: z.string().min(1).max(120),
        channel_id: SnowflakeTypeSchema,
        privacy_level: z
          .xor([z.null().nullable(), StageInstancesPrivacyLevelsSchema])
          .exactOptional(),
        guild_scheduled_event_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        send_start_notification: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(StageInstanceResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getStageInstancesChannelId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(StageInstanceResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteStageInstancesChannelId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchStageInstancesChannelId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        topic: z.string().min(1).max(120).exactOptional(),
        privacy_level: StageInstancesPrivacyLevelsSchema.exactOptional(),
      }),
    )
    .output(StageInstanceResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
