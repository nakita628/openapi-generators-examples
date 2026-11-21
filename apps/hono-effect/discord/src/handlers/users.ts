import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import {
  BotAccountPatchRequestSchema,
  CreatePrivateChannelRequestSchema,
  SnowflakeTypeSchema,
  UpdateApplicationUserRoleConnectionRequestSchema,
} from '../components'

export const usersHandler = new Hono()
  .get('/users/@me', (c) => { throw new Error('Not implemented') })
  .patch(
    '/users/@me',
    sValidator('json', Schema.toStandardSchemaV1(BotAccountPatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/applications/:application_id/entitlements',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
          exclude_consumed: Schema.optional(
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
  .get(
    '/users/@me/applications/:application_id/role-connection',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateApplicationUserRoleConnectionRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/users/@me/channels',
    sValidator('json', Schema.toStandardSchemaV1(CreatePrivateChannelRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/users/@me/connections', (c) => { throw new Error('Not implemented') })
  .get(
    '/users/@me/guilds',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(200),
            ),
          ),
          shard: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          with_counts: Schema.optional(
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
  .delete(
    '/users/@me/guilds/:guild_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/:user_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
