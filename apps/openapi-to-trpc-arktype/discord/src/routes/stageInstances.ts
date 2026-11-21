import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
} from '../components'

const t = initTRPC.create()

export const stageInstancesRouter = t.router({
  postStageInstances: t.procedure
    .input(
      type({
        topic: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
        channel_id: SnowflakeTypeSchema,
        'privacy_level?': type('null | null').or(StageInstancesPrivacyLevelsSchema),
        'guild_scheduled_event_id?': type('null | null').or(SnowflakeTypeSchema),
        'send_start_notification?': 'boolean | null',
      }),
    )
    .output(StageInstanceResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getStageInstancesChannelId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(StageInstanceResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteStageInstancesChannelId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchStageInstancesChannelId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'topic?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
        'privacy_level?': StageInstancesPrivacyLevelsSchema,
      }),
    )
    .output(StageInstanceResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
