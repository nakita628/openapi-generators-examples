import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { SnowflakeTypeSchema, StageInstancesPrivacyLevelsSchema } from '../components'

export const stageInstancesHandler = new Hono()
  .post(
    '/stage-instances',
    tbValidator(
      'json',
      Type.Object({
        topic: Type.String({ minLength: 1, maxLength: 120 }),
        channel_id: SnowflakeTypeSchema,
        privacy_level: Type.Optional(
          Type.Union([Type.Union([Type.Null(), Type.Null()]), StageInstancesPrivacyLevelsSchema]),
        ),
        guild_scheduled_event_id: Type.Optional(
          Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
        ),
        send_start_notification: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
      }),
    ),
    (c) => {},
  )
  .get(
    '/stage-instances/:channel_id',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/stage-instances/:channel_id',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/stage-instances/:channel_id',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        topic: Type.Optional(Type.String({ minLength: 1, maxLength: 120 })),
        privacy_level: Type.Optional(StageInstancesPrivacyLevelsSchema),
      }),
    ),
    (c) => {},
  )
