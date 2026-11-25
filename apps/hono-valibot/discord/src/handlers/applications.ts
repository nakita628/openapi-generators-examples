import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  ApplicationCommandCreateRequestSchema,
  ApplicationCommandPatchRequestPartialSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationUpdateFormPartialSchema,
  CreateEntitlementRequestDataSchema,
  SnowflakeTypeSchema,
} from '../components'

export const applicationsHandler = new Hono()
  .get('/applications/@me', (c) => { throw new Error('Not implemented') })
  .patch('/applications/@me', sValidator('json', ApplicationUpdateFormPartialSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/applications/:application_id',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', ApplicationUpdateFormPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/activity-instances/:instance_id',
    sValidator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        instance_id: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/attachment',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator('form', v.object({ file: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          with_localizations: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/commands',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.nullable(v.pipe(v.array(ApplicationCommandUpdateRequestSchema), v.maxLength(130))),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/commands',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', ApplicationCommandPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/emojis',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.object({
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        image: v.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      v.partial(v.object({ name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          user_id: SnowflakeTypeSchema,
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
                        v.null(),
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
          guild_id: SnowflakeTypeSchema,
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          exclude_ended: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          exclude_deleted: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          only_active: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', CreateEntitlementRequestDataSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          with_localizations: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      v.nullable(v.pipe(v.array(ApplicationCommandUpdateRequestSchema), v.maxLength(130))),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    sValidator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator('json', ApplicationCommandPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    sValidator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    sValidator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
      'json',
      v.partial(
        v.object({
          permissions: v.nullable(
            v.pipe(v.array(ApplicationCommandPermissionSchema), v.maxLength(100)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/role-connections/metadata',
    sValidator('param', v.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.nullable(
        v.pipe(v.array(ApplicationRoleConnectionsMetadataItemRequestSchema), v.maxLength(5)),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
