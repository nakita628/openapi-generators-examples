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
          privacy_level: Schema.optionalKey(
            Schema.Union([Schema.Null, StageInstancesPrivacyLevelsSchema]),
          ),
          guild_scheduled_event_id: Schema.optionalKey(
            Schema.Union([Schema.Null, SnowflakeTypeSchema]),
          ),
          send_start_notification: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/stage-instances/:channel_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/stage-instances/:channel_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
