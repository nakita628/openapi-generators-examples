import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { SnowflakeTypeSchema, StageInstancesPrivacyLevelsSchema } from '../components'

export const stageInstancesHandler = new Hono()
  .post(
    '/stage-instances',
    sValidator(
      'json',
      z.object({
        topic: z.string().min(1).max(120),
        channel_id: SnowflakeTypeSchema,
        privacy_level: z
          .xor([z.null().nullable(), StageInstancesPrivacyLevelsSchema])
          .exactOptional(),
        guild_scheduled_event_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        send_start_notification: z.boolean().nullable().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/stage-instances/:channel_id',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/stage-instances/:channel_id',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/stage-instances/:channel_id',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({
        topic: z.string().min(1).max(120).exactOptional(),
        privacy_level: StageInstancesPrivacyLevelsSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
