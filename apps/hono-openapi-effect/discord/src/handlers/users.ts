import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema, SchemaTransformation } from 'effect'
import {
  ApplicationUserRoleConnectionResponseSchema,
  BotAccountPatchRequestSchema,
  ConnectedAccountResponseSchema,
  CreatePrivateChannelRequestSchema,
  EntitlementResponseSchema,
  MyGuildResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  PrivateGuildMemberResponseSchema,
  SnowflakeTypeSchema,
  UpdateApplicationUserRoleConnectionRequestSchema,
  UserPIIResponseSchema,
  UserResponseSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const usersHandler = new Hono()
  .get(
    '/users/@me',
    describeRoute({
      operationId: 'get_my_user',
      responses: {
        '200': {
          description: '200 response for get_my_user',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UserPIIResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['identify'] }],
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/users/@me',
    describeRoute({
      operationId: 'update_my_user',
      responses: {
        '200': {
          description: '200 response for update_my_user',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UserPIIResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('json', Schema.toStandardSchemaV1(BotAccountPatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/applications/:application_id/entitlements',
    describeRoute({
      operationId: 'get_current_user_application_entitlements',
      responses: {
        '200': {
          description: '200 response for get_current_user_application_entitlements',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(EntitlementResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [
        {
          OAuth2: [
            'activities.invites.write',
            'activities.read',
            'activities.write',
            'applications.builds.read',
            'applications.builds.upload',
            'applications.commands',
            'applications.commands.permissions.update',
            'applications.commands.update',
            'applications.entitlements',
            'applications.store.update',
            'bot',
            'connections',
            'dm_channels.read',
            'email',
            'gdm.join',
            'guilds',
            'guilds.join',
            'guilds.members.read',
            'identify',
            'messages.read',
            'openid',
            'relationships.read',
            'role_connections.write',
            'rpc',
            'rpc.activities.write',
            'rpc.notifications.read',
            'rpc.screenshare.read',
            'rpc.screenshare.write',
            'rpc.video.read',
            'rpc.video.write',
            'rpc.voice.read',
            'rpc.voice.write',
            'voice',
            'webhook.incoming',
          ],
        },
      ],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
          exclude_consumed: Schema.optionalKey(
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
    describeRoute({
      operationId: 'get_application_user_role_connection',
      responses: {
        '200': {
          description: '200 response for get_application_user_role_connection',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(ApplicationUserRoleConnectionResponseSchema),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ OAuth2: ['role_connections.write'] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    describeRoute({
      operationId: 'update_application_user_role_connection',
      responses: {
        '200': {
          description: '200 response for update_application_user_role_connection',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(ApplicationUserRoleConnectionResponseSchema),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ OAuth2: ['role_connections.write'] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateApplicationUserRoleConnectionRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    describeRoute({
      operationId: 'delete_application_user_role_connection',
      responses: {
        '204': {
          description: '204 response for delete_application_user_role_connection',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ OAuth2: ['role_connections.write'] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/users/@me/channels',
    describeRoute({
      operationId: 'create_dm',
      responses: {
        '200': {
          description: '200 response for create_dm',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(
                  Schema.Union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('json', Schema.toStandardSchemaV1(CreatePrivateChannelRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/connections',
    describeRoute({
      operationId: 'list_my_connections',
      responses: {
        '200': {
          description: '200 response for list_my_connections',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ConnectedAccountResponseSchema)),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['connections'] }],
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/guilds',
    describeRoute({
      operationId: 'list_my_guilds',
      responses: {
        '200': {
          description: '200 response for list_my_guilds',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(MyGuildResponseSchema))),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['guilds'] }],
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
                Schema.isLessThanOrEqualTo(200),
              ),
          ),
          shard: Schema.optionalKey(
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
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          with_counts: Schema.optionalKey(
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
    describeRoute({
      operationId: 'leave_guild',
      responses: {
        '204': {
          description: '204 response for leave_guild',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    describeRoute({
      operationId: 'get_my_guild_member',
      responses: {
        '200': {
          description: '200 response for get_my_guild_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PrivateGuildMemberResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ OAuth2: ['guilds.members.read'] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/:user_id',
    describeRoute({
      operationId: 'get_user',
      responses: {
        '200': {
          description: '200 response for get_user',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(UserResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
