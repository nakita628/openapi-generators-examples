import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  BotAccountPatchRequestSchema,
  CreatePrivateChannelRequestSchema,
  SnowflakeTypeSchema,
  UpdateApplicationUserRoleConnectionRequestSchema,
} from '../components'

export const usersHandler = new Hono()
  .get('/users/@me', (c) => { throw new Error('Not implemented') })
  .patch('/users/@me', sValidator('json', BotAccountPatchRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/users/@me/applications/:application_id/entitlements',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        sku_ids: z
          .union([
            z.string(),
            z.preprocess(
              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
              z
                .array(
                  z.preprocess(
                    (val) => (val === 'null' ? null : val),
                    z
                      .union([
                        z.preprocess((val) => (val === 'null' ? null : val), z.null()),
                        SnowflakeTypeSchema,
                      ])
                      .nullable(),
                  ),
                )
                .max(100)
                .refine((val) => new Set(val).size === val.length),
            ),
          ])
          .exactOptional(),
        exclude_consumed: z.stringbool().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateApplicationUserRoleConnectionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/users/@me/channels', sValidator('json', CreatePrivateChannelRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/users/@me/connections', (c) => { throw new Error('Not implemented') })
  .get(
    '/users/@me/guilds',
    sValidator(
      'query',
      z.object({
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(200),
          )
          .exactOptional(),
        shard: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        with_counts: z.stringbool().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/:user_id',
    sValidator('param', z.object({ user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
