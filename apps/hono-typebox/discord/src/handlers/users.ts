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
  .get('/users/@me', (c) => {})
  .patch('/users/@me', tbValidator('json', BotAccountPatchRequestSchema), (c) => {})
  .get(
    '/users/@me/applications/:application_id/entitlements',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        sku_ids: Type.Optional(
          Type.Union([
            Type.String(),
            Type.Array(Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]), {
              maxItems: 100,
              uniqueItems: true,
            }),
          ]),
        ),
        exclude_consumed: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator('json', UpdateApplicationUserRoleConnectionRequestSchema),
    (c) => {},
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post('/users/@me/channels', tbValidator('json', CreatePrivateChannelRequestSchema), (c) => {})
  .get('/users/@me/connections', (c) => {})
  .get(
    '/users/@me/guilds',
    tbValidator(
      'query',
      Type.Object({
        before: Type.Optional(SnowflakeTypeSchema),
        after: Type.Optional(SnowflakeTypeSchema),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        shard: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        with_counts: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/users/:user_id',
    tbValidator('param', Type.Object({ user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
