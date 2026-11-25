import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
} from '../components'

const t = initTRPC.create()

export const stageInstancesRouter = t.router({
  postStageInstances: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          topic: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 120, {
              expected: 'a string of at most 120 characters',
            }),
          ),
          channel_id: SnowflakeTypeSchema,
          privacy_level: Schema.optionalKey(
            Schema.Union([Schema.Null, StageInstancesPrivacyLevelsSchema]),
          ),
          guild_scheduled_event_id: Schema.optionalKey(
            Schema.Union([Schema.Null, SnowflakeTypeSchema]),
          ),
          send_start_notification: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(StageInstanceResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getStageInstancesChannelId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(StageInstanceResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteStageInstancesChannelId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchStageInstancesChannelId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          topic: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 120, {
                expected: 'a string of at most 120 characters',
              }),
            ),
          ),
          privacy_level: Schema.optionalKey(StageInstancesPrivacyLevelsSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(StageInstanceResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
