import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  ApplicationCommandCreateRequestSchema,
  ApplicationCommandPatchRequestPartialSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationFormPartialSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  CreateEntitlementRequestDataSchema,
  SnowflakeTypeSchema,
} from '../components'

export const applicationsHandler = new Hono()
  .get('/applications/@me', (c) => { throw new Error('Not implemented') })
  .patch('/applications/@me', sValidator('json', ApplicationFormPartialSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/applications/:application_id',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', ApplicationFormPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/activity-instances/:instance_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, instance_id: z.string().max(152133) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/attachment',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('form', z.object({ file: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('query', z.object({ with_localizations: z.stringbool().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/commands',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', z.array(ApplicationCommandUpdateRequestSchema).max(130).nullable()),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/commands',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', ApplicationCommandPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/emojis',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', z.object({ name: z.string().min(2).max(32), image: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', z.object({ name: z.string().min(2).max(32).exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        user_id: SnowflakeTypeSchema.exactOptional(),
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
        guild_id: SnowflakeTypeSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        exclude_ended: z.stringbool().exactOptional(),
        exclude_deleted: z.stringbool().exactOptional(),
        only_active: z.stringbool().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator('json', CreateEntitlementRequestDataSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', z.object({ with_localizations: z.stringbool().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', z.array(ApplicationCommandUpdateRequestSchema).max(130).nullable()),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    sValidator(
      'param',
      z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      z.object({
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
      z.object({
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
      z.object({
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
      z.object({
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
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
      'json',
      z.object({
        permissions: z
          .array(ApplicationCommandPermissionSchema)
          .max(100)
          .nullable()
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/role-connections/metadata',
    sValidator('param', z.object({ application_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.array(ApplicationRoleConnectionsMetadataItemRequestSchema).max(5).nullable(),
    ),
    (c) => { throw new Error('Not implemented') },
  )
