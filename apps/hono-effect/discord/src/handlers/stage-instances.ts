import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { SnowflakeTypeSchema, StageInstancesPrivacyLevelsSchema } from '../components'

export const stageInstancesHandler = new Hono()
  .post(
    '/stage-instances',
    sValidator(
      'json',
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
          privacy_level: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), StageInstancesPrivacyLevelsSchema]),
          ),
          guild_scheduled_event_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          send_start_notification: Schema.optional(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/stage-instances/:channel_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/stage-instances/:channel_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/stage-instances/:channel_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          topic: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 120, {
                expected: 'a string of at most 120 characters',
              }),
            ),
          ),
          privacy_level: Schema.optional(StageInstancesPrivacyLevelsSchema),
        }),
      ),
    ),
    (c) => {},
  )
