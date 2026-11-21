import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { SnowflakeTypeSchema } from '../components'

export const invitesHandler = new Hono()
  .get(
    '/invites/:code',
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    tbValidator(
      'query',
      Type.Object({
        with_counts: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        guild_scheduled_event_id: Type.Optional(SnowflakeTypeSchema),
        target_channel_id: Type.Optional(SnowflakeTypeSchema),
        target_message_id: Type.Optional(SnowflakeTypeSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code',
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users',
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users',
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    tbValidator('form', Type.Object({ target_users_file: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-add',
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    tbValidator(
      'json',
      Type.Object({
        user_ids: Type.Array(SnowflakeTypeSchema, {
          minItems: 1,
          maxItems: 1000,
          description: 'The IDs of the users to target.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-delete',
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    tbValidator(
      'json',
      Type.Object({
        user_ids: Type.Array(SnowflakeTypeSchema, {
          minItems: 1,
          maxItems: 1000,
          description: 'The IDs of the users to stop targeting.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users/job-status',
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users/:user_id',
    tbValidator(
      'param',
      Type.Object({ code: Type.String({ maxLength: 152133 }), user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code/target-users/:user_id',
    tbValidator(
      'param',
      Type.Object({ code: Type.String({ maxLength: 152133 }), user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
