import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
          content: { 'application/json': { schema: resolver(PrivateApplicationResponseSchema) } },
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
          content: { 'application/json': { schema: resolver(PrivateApplicationResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('json', ApplicationUpdateFormPartialSchema),
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
          content: { 'application/json': { schema: resolver(PrivateApplicationResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(PrivateApplicationResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator('json', ApplicationUpdateFormPartialSchema),
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
          content: { 'application/json': { schema: resolver(EmbeddedActivityInstanceSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        instance_id: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
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
          content: { 'application/json': { schema: resolver(ActivitiesAttachmentResponseSchema) } },
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
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator('form', v.object({ file: v.string() })),
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
              schema: resolver(v.nullable(v.array(ApplicationCommandResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          with_localizations: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
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
              schema: resolver(v.nullable(v.array(ApplicationCommandResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.nullable(v.pipe(v.array(ApplicationCommandUpdateRequestSchema), v.maxLength(130))),
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator('json', ApplicationCommandCreateRequestSchema),
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
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
      v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
    ),
    validator('json', ApplicationCommandPatchRequestPartialSchema),
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
            'application/json': { schema: resolver(ListApplicationEmojisResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.object({
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        image: v.string(),
      }),
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
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
      v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      v.partial(v.object({ name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)) })),
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
          content: { 'application/json': { schema: resolver(v.array(EntitlementResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          user_id: SnowflakeTypeSchema,
          sku_ids: v.union([
            v.string(),
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(
                    v.union([
                      v.pipe(
                        v.unknown(),
                        v.transform((input) => (input === 'null' ? null : input)),
                        v.null(),
                      ),
                      SnowflakeTypeSchema,
                    ]),
                  ),
                ),
              ),
              v.maxLength(100),
              v.check((input) => new Set(input).size === input.length),
            ),
          ]),
          guild_id: SnowflakeTypeSchema,
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          exclude_ended: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          exclude_deleted: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          only_active: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
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
          content: { 'application/json': { schema: resolver(EntitlementResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator('json', CreateEntitlementRequestDataSchema),
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
          content: { 'application/json': { schema: resolver(EntitlementResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    }),
    validator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
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
      v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
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
      v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
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
              schema: resolver(v.nullable(v.array(ApplicationCommandResponseSchema))),
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
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          with_localizations: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
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
              schema: resolver(v.nullable(v.array(ApplicationCommandResponseSchema))),
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
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      v.nullable(v.pipe(v.array(ApplicationCommandUpdateRequestSchema), v.maxLength(130))),
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
    ),
    validator('json', ApplicationCommandCreateRequestSchema),
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
            'application/json': { schema: resolver(v.array(CommandPermissionsResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
    }),
    validator(
      'param',
      v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
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
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
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
          content: { 'application/json': { schema: resolver(ApplicationCommandResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    }),
    validator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    validator('json', ApplicationCommandPatchRequestPartialSchema),
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
          content: { 'application/json': { schema: resolver(CommandPermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
    }),
    validator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
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
          content: { 'application/json': { schema: resolver(CommandPermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
    }),
    validator(
      'param',
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    ),
    validator(
      'json',
      v.partial(
        v.object({
          permissions: v.nullable(
            v.pipe(v.array(ApplicationCommandPermissionSchema), v.maxLength(100)),
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
                v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema)),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
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
                v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema)),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ application_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.nullable(
        v.pipe(v.array(ApplicationRoleConnectionsMetadataItemRequestSchema), v.maxLength(5)),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
