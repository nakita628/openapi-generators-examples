import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
  .patch('/applications/@me', tbValidator('json', ApplicationUpdateFormPartialSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/applications/:application_id',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator('json', ApplicationUpdateFormPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/activity-instances/:instance_id',
    tbValidator(
      'param',
      Type.Object({
        application_id: SnowflakeTypeSchema,
        instance_id: Type.String({ maxLength: 152133 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/attachment',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator('form', Type.Object({ file: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        with_localizations: Type.Optional(
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
  .put(
    '/applications/:application_id/commands',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([
        Type.Array(ApplicationCommandUpdateRequestSchema, { maxItems: 130 }),
        Type.Null(),
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/commands',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/commands/:command_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', ApplicationCommandPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/emojis',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({ name: Type.String({ minLength: 2, maxLength: 32 }), image: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/emojis/:emoji_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Object({ name: Type.Optional(Type.String({ minLength: 2, maxLength: 32 })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        user_id: Type.Optional(SnowflakeTypeSchema),
        sku_ids: Type.Optional(
          Type.Union([
            Type.String(),
            Type.Array(Type.Union([Type.Null(), SnowflakeTypeSchema]), {
              maxItems: 100,
              uniqueItems: true,
            }),
          ]),
        ),
        guild_id: Type.Optional(SnowflakeTypeSchema),
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
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        exclude_ended: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        exclude_deleted: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        only_active: Type.Optional(
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
  .post(
    '/applications/:application_id/entitlements',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator('json', CreateEntitlementRequestDataSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'query',
      Type.Object({
        with_localizations: Type.Optional(
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
  .put(
    '/applications/:application_id/guilds/:guild_id/commands',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Union([
        Type.Array(ApplicationCommandUpdateRequestSchema, { maxItems: 130 }),
        Type.Null(),
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/guilds/:guild_id/commands',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', ApplicationCommandCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    tbValidator(
      'param',
      Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    tbValidator(
      'param',
      Type.Object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    tbValidator(
      'param',
      Type.Object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    tbValidator(
      'param',
      Type.Object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    tbValidator('json', ApplicationCommandPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    tbValidator(
      'param',
      Type.Object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    tbValidator(
      'param',
      Type.Object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        permissions: Type.Optional(
          Type.Union([
            Type.Array(ApplicationCommandPermissionSchema, { maxItems: 100 }),
            Type.Null(),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/role-connections/metadata',
    tbValidator('param', Type.Object({ application_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([
        Type.Array(ApplicationRoleConnectionsMetadataItemRequestSchema, { maxItems: 5 }),
        Type.Null(),
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
