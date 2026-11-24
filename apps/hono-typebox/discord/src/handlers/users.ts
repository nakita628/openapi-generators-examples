import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  BotAccountPatchRequestSchema,
  CreatePrivateChannelRequestSchema,
  SnowflakeTypeSchema,
  UpdateApplicationUserRoleConnectionRequestSchema,
} from '../components'

export const usersHandler = new Hono()
  .get('/users/@me', (c) => { throw new Error('Not implemented') })
  .patch('/users/@me', tbValidator('json', BotAccountPatchRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/users/@me/applications/:application_id/entitlements',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        sku_ids: Type.Optional(
          Type.Union([
            Type.String(),
            Type.Array(Type.Union([Type.Null(), SnowflakeTypeSchema]), {
              maxItems: 100,
              uniqueItems: true,
            }),
          ]),
        ),
        exclude_consumed: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator('json', UpdateApplicationUserRoleConnectionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/users/@me/channels', tbValidator('json', CreatePrivateChannelRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/users/@me/connections', (c) => { throw new Error('Not implemented') })
  .get(
    '/users/@me/guilds',
    tbValidator(
      'query',
      Type.Object({
        before: Type.Optional(SnowflakeTypeSchema),
        after: Type.Optional(SnowflakeTypeSchema),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 200,
              () => 'must be <= 200',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        shard: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        with_counts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/:user_id',
    tbValidator('param', Type.Object({ user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
