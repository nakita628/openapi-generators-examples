import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { SnowflakeTypeSchema } from '../components'

export const invitesHandler = new Hono()
  .get(
    '/invites/:code',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    sValidator(
      'query',
      type({
        'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'guild_scheduled_event_id?': SnowflakeTypeSchema,
        'target_channel_id?': SnowflakeTypeSchema,
        'target_message_id?': SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    sValidator('form', type({ target_users_file: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-add',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        user_ids: type(type(SnowflakeTypeSchema).array())
          .and(type('1 <= unknown[] <= 1000'))
          .describe('The IDs of the users to target.'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-delete',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        user_ids: type(type(SnowflakeTypeSchema).array())
          .and(type('1 <= unknown[] <= 1000'))
          .describe('The IDs of the users to stop targeting.'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users/job-status',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users/:user_id',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code/target-users/:user_id',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
