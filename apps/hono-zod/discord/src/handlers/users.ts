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
  .get('/users/@me', (c) => {})
  .patch('/users/@me', sValidator('json', BotAccountPatchRequestSchema), (c) => {})
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
                        z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
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
    (c) => {},
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateApplicationUserRoleConnectionRequestSchema),
    (c) => {},
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post('/users/@me/channels', sValidator('json', CreatePrivateChannelRequestSchema), (c) => {})
  .get('/users/@me/connections', (c) => {})
  .get(
    '/users/@me/guilds',
    sValidator(
      'query',
      z.object({
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(200).exactOptional(),
        shard: z.coerce.number().int().min(0).exactOptional(),
        with_counts: z.stringbool().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/users/:user_id',
    sValidator('param', z.object({ user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
