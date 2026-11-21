import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          sku_ids: v.union([
            v.string(),
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(
                    v.union([
                      v.pipe(
                        v.unknown(),
                        v.transform((input) => (input === 'null' ? null : input)),
                        v.nullable(v.null()),
                      ),
                      SnowflakeTypeSchema,
                    ]),
                  ),
                ),
              ),
              v.maxLength(100),
              v.check((input) => new Set(input).size === input.length),
            ),
          ]),
          exclude_consumed: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateApplicationUserRoleConnectionRequestSchema),
    (c) => {},
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post('/users/@me/channels', sValidator('json', CreatePrivateChannelRequestSchema), (c) => {})
  .get('/users/@me/connections', (c) => {})
  .get(
    '/users/@me/guilds',
    sValidator(
      'query',
      v.partial(
        v.object({
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(200),
          ),
          shard: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          with_counts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/users/:user_id',
    sValidator('param', v.object({ user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
