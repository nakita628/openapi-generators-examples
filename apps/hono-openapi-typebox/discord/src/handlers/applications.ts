import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ActivitiesAttachmentResponseSchema,
  ApplicationCommandCreateRequestSchema,
  ApplicationCommandPatchRequestPartialSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationUpdateFormPartialSchema,
  CommandPermissionsResponseSchema,
  CreateEntitlementRequestDataSchema,
  EmbeddedActivityInstanceSchema,
  EmojiResponseSchema,
  EntitlementResponseSchema,
  ListApplicationEmojisResponseSchema,
  PrivateApplicationResponseSchema,
  SnowflakeTypeSchema,
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

export const applicationsHandler = new Hono()
  .get(
    '/applications/@me',
    describeRoute({
      operationId: 'get_my_application',
      responses: {
        '200': {
          description: '200 response for get_my_application',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PrivateApplicationResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/@me',
    describeRoute({
      operationId: 'update_my_application',
      responses: {
        '200': {
          description: '200 response for update_my_application',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PrivateApplicationResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('json', toStandardSchemaV1(ApplicationUpdateFormPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id',
    describeRoute({
      operationId: 'get_application',
      responses: {
        '200': {
          description: '200 response for get_application',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PrivateApplicationResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id',
    describeRoute({
      operationId: 'update_application',
      responses: {
        '200': {
          description: '200 response for update_application',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PrivateApplicationResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator('json', toStandardSchemaV1(ApplicationUpdateFormPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/activity-instances/:instance_id',
    describeRoute({
      operationId: 'applications_get_activity_instance',
      responses: {
        '200': {
          description: '200 response for applications_get_activity_instance',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(EmbeddedActivityInstanceSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          application_id: SnowflakeTypeSchema,
          instance_id: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/attachment',
    describeRoute({
      operationId: 'upload_application_attachment',
      responses: {
        '200': {
          description: '200 response for upload_application_attachment',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ActivitiesAttachmentResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [
        { BotToken: [] },
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
    validator('form', toStandardSchemaV1(Type.Object({ file: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands',
    describeRoute({
      operationId: 'list_application_commands',
      responses: {
        '200': {
          description: '200 response for list_application_commands',
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
                  Type.Union([Type.Array(ApplicationCommandResponseSchema), Type.Null()]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      toStandardSchemaV1(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/commands',
    describeRoute({
      operationId: 'bulk_set_application_commands',
      responses: {
        '200': {
          description: '200 response for bulk_set_application_commands',
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
                  Type.Union([Type.Array(ApplicationCommandResponseSchema), Type.Null()]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Union([
          Type.Array(ApplicationCommandUpdateRequestSchema, { maxItems: 130 }),
          Type.Null(),
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/commands',
    describeRoute({
      operationId: 'create_application_command',
      responses: {
        '200': {
          description: '200 response for create_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '201': {
          description: '201 response for create_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator('json', toStandardSchemaV1(ApplicationCommandCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    describeRoute({
      operationId: 'get_application_command',
      responses: {
        '200': {
          description: '200 response for get_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    describeRoute({
      operationId: 'delete_application_command',
      responses: {
        '204': {
          description: '204 response for delete_application_command',
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
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/commands/:command_id',
    describeRoute({
      operationId: 'update_application_command',
      responses: {
        '200': {
          description: '200 response for update_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', toStandardSchemaV1(ApplicationCommandPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis',
    describeRoute({
      operationId: 'list_application_emojis',
      responses: {
        '200': {
          description: '200 response for list_application_emojis',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ListApplicationEmojisResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/emojis',
    describeRoute({
      operationId: 'create_application_emoji',
      responses: {
        '201': {
          description: '201 response for create_application_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(EmojiResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({ name: Type.String({ minLength: 2, maxLength: 32 }), image: Type.String() }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    describeRoute({
      operationId: 'get_application_emoji',
      responses: {
        '200': {
          description: '200 response for get_application_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(EmojiResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    describeRoute({
      operationId: 'delete_application_emoji',
      responses: {
        '204': {
          description: '204 response for delete_application_emoji',
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
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/applications/:application_id/emojis/:emoji_id',
    describeRoute({
      operationId: 'update_application_emoji',
      responses: {
        '200': {
          description: '200 response for update_application_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(EmojiResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({ name: Type.Optional(Type.String({ minLength: 2, maxLength: 32 })) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements',
    describeRoute({
      operationId: 'get_entitlements',
      responses: {
        '200': {
          description: '200 response for get_entitlements',
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
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      toStandardSchemaV1(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements',
    describeRoute({
      operationId: 'create_entitlement',
      responses: {
        '200': {
          description: '200 response for create_entitlement',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(EntitlementResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator('json', toStandardSchemaV1(CreateEntitlementRequestDataSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    describeRoute({
      operationId: 'get_entitlement',
      responses: {
        '200': {
          description: '200 response for get_entitlement',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(EntitlementResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    describeRoute({
      operationId: 'delete_entitlement',
      responses: {
        '204': {
          description: '204 response for delete_entitlement',
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
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    describeRoute({
      operationId: 'consume_entitlement',
      responses: {
        '204': {
          description: '204 response for consume_entitlement',
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
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands',
    describeRoute({
      operationId: 'list_guild_application_commands',
      responses: {
        '200': {
          description: '200 response for list_guild_application_commands',
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
                  Type.Union([Type.Array(ApplicationCommandResponseSchema), Type.Null()]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands',
    describeRoute({
      operationId: 'bulk_set_guild_application_commands',
      responses: {
        '200': {
          description: '200 response for bulk_set_guild_application_commands',
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
                  Type.Union([Type.Array(ApplicationCommandResponseSchema), Type.Null()]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Union([
          Type.Array(ApplicationCommandUpdateRequestSchema, { maxItems: 130 }),
          Type.Null(),
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/applications/:application_id/guilds/:guild_id/commands',
    describeRoute({
      operationId: 'create_guild_application_command',
      responses: {
        '200': {
          description: '200 response for create_guild_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '201': {
          description: '201 response for create_guild_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', toStandardSchemaV1(ApplicationCommandCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    describeRoute({
      operationId: 'list_guild_application_command_permissions',
      responses: {
        '200': {
          description: '200 response for list_guild_application_command_permissions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(Type.Array(CommandPermissionsResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    describeRoute({
      operationId: 'get_guild_application_command',
      responses: {
        '200': {
          description: '200 response for get_guild_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
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
    describeRoute({
      operationId: 'delete_guild_application_command',
      responses: {
        '204': {
          description: '204 response for delete_guild_application_command',
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
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
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
    describeRoute({
      operationId: 'update_guild_application_command',
      responses: {
        '200': {
          description: '200 response for update_guild_application_command',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ApplicationCommandResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(ApplicationCommandPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    describeRoute({
      operationId: 'get_guild_application_command_permissions',
      responses: {
        '200': {
          description: '200 response for get_guild_application_command_permissions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(CommandPermissionsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
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
    describeRoute({
      operationId: 'set_guild_application_command_permissions',
      responses: {
        '200': {
          description: '200 response for set_guild_application_command_permissions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(CommandPermissionsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          permissions: Type.Optional(
            Type.Union([
              Type.Array(ApplicationCommandPermissionSchema, { maxItems: 100 }),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    describeRoute({
      operationId: 'get_application_role_connections_metadata',
      responses: {
        '200': {
          description: '200 response for get_application_role_connections_metadata',
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
                  Type.Union([
                    Type.Array(ApplicationRoleConnectionsMetadataItemResponseSchema),
                    Type.Null(),
                  ]),
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
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/applications/:application_id/role-connections/metadata',
    describeRoute({
      operationId: 'update_application_role_connections_metadata',
      responses: {
        '200': {
          description: '200 response for update_application_role_connections_metadata',
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
                  Type.Union([
                    Type.Array(ApplicationRoleConnectionsMetadataItemResponseSchema),
                    Type.Null(),
                  ]),
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
    validator('param', toStandardSchemaV1(Type.Object({ application_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Union([
          Type.Array(ApplicationRoleConnectionsMetadataItemRequestSchema, { maxItems: 5 }),
          Type.Null(),
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
