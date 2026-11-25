import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator('json', ApplicationUpdateFormPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/activity-instances/:instance_id',
    sValidator(
      'param',
      type({
        application_id: SnowflakeTypeSchema,
        instance_id: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/attachment',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator('form', type({ file: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      type({
        'with_localizations?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/commands',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      type(
        type(type(ApplicationCommandUpdateRequestSchema).array()).and(type('unknown[] <= 130')),
      ).or('null'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/commands',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', ApplicationCommandPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/emojis',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      type({
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        image: 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      type({
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      type({
        'user_id?': SnowflakeTypeSchema,
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
                            .to('null'),
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
        'guild_id?': SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'exclude_ended?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'exclude_deleted?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'only_active?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator('json', CreateEntitlementRequestDataSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'query',
      type({
        'with_localizations?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      type(
        type(type(ApplicationCommandUpdateRequestSchema).array()).and(type('unknown[] <= 130')),
      ).or('null'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    sValidator(
      'param',
      type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      type({
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
      type({
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
      type({
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
      type({
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
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
      'json',
      type({
        'permissions?': type(
          type(type(ApplicationCommandPermissionSchema).array()).and(type('unknown[] <= 100')),
        ).or('null'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/role-connections/metadata',
    sValidator('param', type({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      type(
        type(type(ApplicationRoleConnectionsMetadataItemRequestSchema).array()).and(
          type('unknown[] <= 5'),
        ),
      ).or('null'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
