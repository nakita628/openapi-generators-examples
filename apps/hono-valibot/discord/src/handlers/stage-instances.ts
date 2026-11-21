import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { SnowflakeTypeSchema, StageInstancesPrivacyLevelsSchema } from '../components'

export const stageInstancesHandler = new Hono()
  .post(
    '/stage-instances',
    sValidator(
      'json',
      v.object({
        topic: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
        channel_id: SnowflakeTypeSchema,
        privacy_level: v.optional(
          v.union([v.nullable(v.null()), StageInstancesPrivacyLevelsSchema]),
        ),
        guild_scheduled_event_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        send_start_notification: v.optional(v.nullable(v.boolean())),
      }),
    ),
    (c) => {},
  )
  .get(
    '/stage-instances/:channel_id',
    sValidator('param', v.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/stage-instances/:channel_id',
    sValidator('param', v.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/stage-instances/:channel_id',
    sValidator('param', v.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.partial(
        v.object({
          topic: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
          privacy_level: StageInstancesPrivacyLevelsSchema,
        }),
      ),
    ),
    (c) => {},
  )
