import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema, SchemaTransformation } from 'effect'
import {
  ActivitiesAttachmentResponseSchema,
  ApplicationCommandCreateRequestSchema,
  ApplicationCommandPatchRequestPartialSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationFormPartialSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
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
              schema: resolver(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('json', Schema.toStandardSchemaV1(ApplicationFormPartialSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
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
              schema: resolver(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator('json', Schema.toStandardSchemaV1(ApplicationFormPartialSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(EmbeddedActivityInstanceSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ActivitiesAttachmentResponseSchema)),
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
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator('form', Schema.toStandardSchemaV1(Schema.Struct({ file: Schema.String }))),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator(
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator(
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator('json', Schema.toStandardSchemaV1(ApplicationCommandCreateRequestSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(ApplicationCommandPatchRequestPartialSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ListApplicationEmojisResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EmojiResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator(
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EmojiResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EmojiResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
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
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(EntitlementResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator(
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EntitlementResponseSchema)),
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
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator('json', Schema.toStandardSchemaV1(CreateEntitlementRequestDataSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EntitlementResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(ApplicationCommandCreateRequestSchema)),
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
              schema: resolver(
                Schema.toStandardSchemaV1(Schema.Array(CommandPermissionsResponseSchema)),
              ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(ApplicationCommandPatchRequestPartialSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(CommandPermissionsResponseSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(CommandPermissionsResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ApplicationRoleConnectionsMetadataItemResponseSchema)),
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
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ApplicationRoleConnectionsMetadataItemResponseSchema)),
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
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })),
    ),
    validator(
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
