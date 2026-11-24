import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
            'application/json': { schema: resolver(toStandardSchemaV1(UserPIIResponseSchema)) },
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
            'application/json': { schema: resolver(toStandardSchemaV1(UserPIIResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('json', toStandardSchemaV1(BotAccountPatchRequestSchema)),
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
              schema: resolver(toStandardSchemaV1(Type.Array(EntitlementResponseSchema))),
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
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          sku_ids: Type.Optional(
            Type.Union([
              Type.String(),
              Type.Array(Type.Union([Type.Null(), SnowflakeTypeSchema]), {
                maxItems: 100,
                uniqueItems: true,
              }),
            ]),
          ),
          exclude_consumed: Type.Optional(
            Codec(
              Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
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
              schema: resolver(toStandardSchemaV1(ApplicationUserRoleConnectionResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ OAuth2: ['role_connections.write'] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
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
              schema: resolver(toStandardSchemaV1(ApplicationUserRoleConnectionResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ OAuth2: ['role_connections.write'] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator('json', toStandardSchemaV1(UpdateApplicationUserRoleConnectionRequestSchema)),
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
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
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
                toStandardSchemaV1(
                  Type.Union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
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
    validator('json', toStandardSchemaV1(CreatePrivateChannelRequestSchema)),
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
                toStandardSchemaV1(
                  Type.Union([Type.Array(ConnectedAccountResponseSchema), Type.Null()]),
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
                toStandardSchemaV1(Type.Union([Type.Array(MyGuildResponseSchema), Type.Null()])),
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
      toStandardSchemaV1(
        Type.Object({
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
                (value) => Number(value) <= 200,
                () => 'must be <= 200',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          shard: Type.Optional(
            Codec(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          with_counts: Type.Optional(
            Codec(
              Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
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
    validator('param', toStandardSchemaV1(Type.Object({ guild_id: SnowflakeTypeSchema }))),
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
              schema: resolver(toStandardSchemaV1(PrivateGuildMemberResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ OAuth2: ['guilds.members.read'] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': { schema: resolver(toStandardSchemaV1(UserResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ user_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
