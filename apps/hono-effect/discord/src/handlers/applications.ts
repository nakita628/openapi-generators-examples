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
  .get('/applications/@me', (c) => { throw new Error('Not implemented') })
  .patch(
    '/applications/@me',
    sValidator('json', Schema.toStandardSchemaV1(ApplicationFormPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ApplicationFormPartialSchema)),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/attachment',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('form', Schema.toStandardSchemaV1(Schema.Struct({ file: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
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
          with_localizations: Schema.optionalKey(
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/commands',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ApplicationCommandCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
          name: Schema.optionalKey(
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
    (c) => { throw new Error('Not implemented') },
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
          user_id: Schema.optionalKey(SnowflakeTypeSchema),
          sku_ids: Schema.optionalKey(
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
                              Schema.decodeTo(Schema.Null),
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
          guild_id: Schema.optionalKey(SnowflakeTypeSchema),
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          exclude_ended: Schema.optionalKey(
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
          exclude_deleted: Schema.optionalKey(
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
          only_active: Schema.optionalKey(
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateEntitlementRequestDataSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
          with_localizations: Schema.optionalKey(
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
          permissions: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(ApplicationCommandPermissionSchema).check(Schema.isMaxLength(100)),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
