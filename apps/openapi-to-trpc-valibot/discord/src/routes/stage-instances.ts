import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
} from '../components'

const t = initTRPC.create()

export const stageInstancesRouter = t.router({
  postStageInstances: t.procedure
    .input(
      v.object({
        topic: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
        channel_id: SnowflakeTypeSchema,
        privacy_level: v.optional(v.union([v.null(), StageInstancesPrivacyLevelsSchema])),
        guild_scheduled_event_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        send_start_notification: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(StageInstanceResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getStageInstancesChannelId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(StageInstanceResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteStageInstancesChannelId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchStageInstancesChannelId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        topic: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120))),
        privacy_level: v.optional(StageInstancesPrivacyLevelsSchema),
      }),
    )
    .output(StageInstanceResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
