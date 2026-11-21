import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { SnowflakeTypeSchema } from '../components'

export const invitesHandler = new Hono()
  .get(
    '/invites/:code',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    sValidator(
      'query',
      z.object({
        with_counts: z.stringbool().exactOptional(),
        guild_scheduled_event_id: SnowflakeTypeSchema.exactOptional(),
        target_channel_id: SnowflakeTypeSchema.exactOptional(),
        target_message_id: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    sValidator('form', z.object({ target_users_file: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-add',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    sValidator(
      'json',
      z.object({
        user_ids: z
          .array(SnowflakeTypeSchema)
          .min(1)
          .max(1000)
          .meta({ description: 'The IDs of the users to target.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-delete',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    sValidator(
      'json',
      z.object({
        user_ids: z
          .array(SnowflakeTypeSchema)
          .min(1)
          .max(1000)
          .meta({ description: 'The IDs of the users to stop targeting.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users/job-status',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users/:user_id',
    sValidator('param', z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code/target-users/:user_id',
    sValidator('param', z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
