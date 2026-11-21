import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { SnowflakeTypeSchema } from '../components'

export const invitesHandler = new Hono()
  .get(
    '/invites/:code',
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    sValidator(
      'query',
      v.partial(
        v.object({
          with_counts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          guild_scheduled_event_id: SnowflakeTypeSchema,
          target_channel_id: SnowflakeTypeSchema,
          target_message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code',
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users',
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users',
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    sValidator('form', v.object({ target_users_file: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-add',
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    sValidator(
      'json',
      v.object({
        user_ids: v.pipe(
          v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
          v.description('The IDs of the users to target.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-delete',
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    sValidator(
      'json',
      v.object({
        user_ids: v.pipe(
          v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
          v.description('The IDs of the users to stop targeting.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users/job-status',
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users/:user_id',
    sValidator(
      'param',
      v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code/target-users/:user_id',
    sValidator(
      'param',
      v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
