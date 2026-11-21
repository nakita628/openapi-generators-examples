import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  BotAccountPatchRequestSchema,
  CreatePrivateChannelRequestSchema,
  SnowflakeTypeSchema,
  UpdateApplicationUserRoleConnectionRequestSchema,
} from '../components'

export const usersHandler = new Hono()
  .get('/users/@me', (c) => {})
  .patch('/users/@me', sValidator('json', BotAccountPatchRequestSchema), (c) => {})
  .get(
    '/users/@me/applications/:application_id/entitlements',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      type({
        'sku_ids?': type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('string'),
            type('unknown').pipe(
              (data) => (data === undefined || Array.isArray(data) ? data : [data]),
              type(
                type(
                  type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe((data, ctx) => {
                        for (const branch of [
                          type('unknown')
                            .pipe((data) => (data === 'null' ? null : data))
                            .to('null | null'),
                          SnowflakeTypeSchema,
                        ]) {
                          const out = branch(data)
                          if (!(out instanceof type.errors)) return out
                        }
                        return ctx.error('one of the members')
                      }),
                    ).or('null'),
                  ),
                ).array(),
              )
                .and(type('unknown[] <= 100'))
                .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
            ),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
        'exclude_consumed?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateApplicationUserRoleConnectionRequestSchema),
    (c) => {},
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post('/users/@me/channels', sValidator('json', CreatePrivateChannelRequestSchema), (c) => {})
  .get('/users/@me/connections', (c) => {})
  .get(
    '/users/@me/guilds',
    sValidator(
      'query',
      type({
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 200'),
        'shard?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get('/users/:user_id', sValidator('param', type({ user_id: SnowflakeTypeSchema })), (c) => {})
