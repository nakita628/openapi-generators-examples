import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { SnowflakeTypeSchema, StageInstancesPrivacyLevelsSchema } from '../components'

export const stageInstancesHandler = new Hono()
  .post(
    '/stage-instances',
    sValidator(
      'json',
      type({
        topic: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
        channel_id: SnowflakeTypeSchema,
        'privacy_level?': type('null | null').or(StageInstancesPrivacyLevelsSchema),
        'guild_scheduled_event_id?': type('null | null').or(SnowflakeTypeSchema),
        'send_start_notification?': 'boolean | null',
      }),
    ),
    (c) => {},
  )
  .get(
    '/stage-instances/:channel_id',
    sValidator('param', type({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/stage-instances/:channel_id',
    sValidator('param', type({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/stage-instances/:channel_id',
    sValidator('param', type({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      type({
        'topic?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
        'privacy_level?': StageInstancesPrivacyLevelsSchema,
      }),
    ),
    (c) => {},
  )
