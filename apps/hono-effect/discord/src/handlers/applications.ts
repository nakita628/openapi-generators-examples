import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
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
  .get('/applications/@me', (c) => {})
  .patch(
    '/applications/@me',
    sValidator('json', Schema.toStandardSchemaV1(ApplicationFormPartialSchema)),
    (c) => {},
  )
  .get(
    '/applications/:application_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/applications/:application_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ApplicationFormPartialSchema)),
    (c) => {},
  )
  .get(
    '/applications/:application_id/activity-instances/:instance_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          instance_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/applications/:application_id/attachment',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('form', Schema.toStandardSchemaV1(Schema.Struct({ file: Schema.String }))),
    (c) => {},
  )
  .get(
    '/applications/:application_id/commands',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_localizations: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/applications/:application_id/commands',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(ApplicationCommandUpdateRequestSchema).check(Schema.isMaxLength(130)),
        ),
      ),
    ),
    (c) => {},
  )
  .post(
    '/applications/:application_id/commands',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ApplicationCommandCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ApplicationCommandPatchRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/applications/:application_id/emojis',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/applications/:application_id/emojis',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 2, {
              expected: 'a string of at least 2 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 32, {
              expected: 'a string of at most 32 characters',
            }),
          ),
          image: Schema.String,
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/applications/:application_id/entitlements',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.optional(SnowflakeTypeSchema),
          sku_ids: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(
                  Schema.Array(
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(
                        Schema.NullOr(
                          Schema.Union([
                            Schema.Unknown.pipe(
                              Schema.decodeTo(
                                Schema.Unknown,
                                SchemaTransformation.transform<unknown, unknown>({
                                  decode: (input) => (input === 'null' ? null : input),
                                  encode: (output) => output,
                                }),
                              ),
                              Schema.decodeTo(Schema.NullOr(Schema.Null)),
                            ),
                            SnowflakeTypeSchema,
                          ]),
                        ),
                      ),
                    ),
                  ).check(Schema.isMaxLength(100), Schema.isUnique()),
                ),
              ),
            ]),
          ),
          guild_id: Schema.optional(SnowflakeTypeSchema),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          exclude_ended: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          exclude_deleted: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          only_active: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/applications/:application_id/entitlements',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateEntitlementRequestDataSchema)),
    (c) => {},
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_localizations: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(ApplicationCommandUpdateRequestSchema).check(Schema.isMaxLength(130)),
        ),
      ),
    ),
    (c) => {},
  )
  .post(
    '/applications/:application_id/guilds/:guild_id/commands',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ApplicationCommandCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ApplicationCommandPatchRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          permissions: Schema.optional(
            Schema.NullOr(
              Schema.Array(ApplicationCommandPermissionSchema).check(Schema.isMaxLength(100)),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .put(
    '/applications/:application_id/role-connections/metadata',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(ApplicationRoleConnectionsMetadataItemRequestSchema).check(
            Schema.isMaxLength(5),
          ),
        ),
      ),
    ),
    (c) => {},
  )
