import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  ActionTypesSchema,
  ActivitiesAttachmentResponseSchema,
  ApplicationCommandAttachmentOptionSchema,
  ApplicationCommandBooleanOptionSchema,
  ApplicationCommandChannelOptionSchema,
  ApplicationCommandHandlerSchema,
  ApplicationCommandIntegerOptionSchema,
  ApplicationCommandMentionableOptionSchema,
  ApplicationCommandNumberOptionSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandRoleOptionSchema,
  ApplicationCommandStringOptionSchema,
  ApplicationCommandSubcommandGroupOptionSchema,
  ApplicationCommandSubcommandOptionSchema,
  ApplicationCommandTypeSchema,
  ApplicationCommandUserOptionSchema,
  ApplicationEventWebhooksStatusSchema,
  ApplicationExplicitContentFilterTypesSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationTypesSchema,
  ApplicationUpdateFormPartialSchema,
  CommandPermissionsResponseSchema,
  EmbeddedActivityInstanceSchema,
  EmojiResponseSchema,
  EntitlementOwnerTypesSchema,
  EntitlementResponseSchema,
  InteractionContextTypeSchema,
  ListApplicationEmojisResponseSchema,
  PrivateApplicationResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

export const getApplicationsMe = os
  .route({
    method: 'GET',
    path: '/applications/@me',
    successDescription: '200 response for get_my_application',
  })
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsMe = os
  .route({
    method: 'PATCH',
    path: '/applications/@me',
    successDescription: '200 response for update_my_application',
  })
  .input(ApplicationUpdateFormPartialSchema)
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}',
    successDescription: '200 response for get_application',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsApplicationId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}',
    successDescription: '200 response for update_application',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      description: v.optional(
        v.nullable(
          v.object({
            default: v.pipe(v.string(), v.maxCodePoints(400)),
            localizations: v.optional(
              v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(400)))),
            ),
          }),
        ),
      ),
      icon: v.optional(v.nullable(v.string())),
      cover_image: v.optional(v.nullable(v.string())),
      team_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
      flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      interactions_endpoint_url: v.optional(
        v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      ),
      explicit_content_filter: v.optional(
        v.union([v.null(), ApplicationExplicitContentFilterTypesSchema]),
      ),
      max_participants: v.optional(
        v.nullable(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.minValue(-1),
          ),
        ),
      ),
      type: v.optional(v.union([v.null(), ApplicationTypesSchema])),
      tags: v.optional(
        v.nullable(
          v.pipe(
            v.array(v.pipe(v.string(), v.maxCodePoints(20))),
            v.maxLength(5),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      custom_install_url: v.optional(
        v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      ),
      install_params: v.optional(v.union([v.null(), ApplicationOAuth2InstallParamsSchema])),
      role_connections_verification_url: v.optional(
        v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      ),
      integration_types_config: v.optional(
        v.nullable(
          v.record(v.string(), v.union([v.null(), ApplicationIntegrationTypeConfigurationSchema])),
        ),
      ),
      event_webhooks_status: v.optional(v.union([v.null(), ApplicationEventWebhooksStatusSchema])),
      event_webhooks_url: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
          v.description('Event webhooks URL for the app to receive webhook events'),
        ),
      ),
      event_webhooks_types: v.optional(
        v.nullable(
          v.pipe(
            v.array(ActionTypesSchema),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
    }),
  )
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdActivityInstancesInstanceId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/activity-instances/{instance_id}',
    successDescription: '200 response for applications_get_activity_instance',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      instance_id: v.pipe(v.string(), v.maxCodePoints(152133)),
    }),
  )
  .output(EmbeddedActivityInstanceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdAttachment = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/attachment',
    successDescription: '200 response for upload_application_attachment',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .output(ActivitiesAttachmentResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdCommands = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for list_application_commands',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      with_localizations: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdCommands = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for create_application_command',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
      name_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
      ),
      description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      description_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        ),
      ),
      options: v.optional(
        v.nullable(
          v.pipe(
            v.array(
              v.union([
                ApplicationCommandAttachmentOptionSchema,
                ApplicationCommandBooleanOptionSchema,
                ApplicationCommandChannelOptionSchema,
                ApplicationCommandIntegerOptionSchema,
                ApplicationCommandMentionableOptionSchema,
                ApplicationCommandNumberOptionSchema,
                ApplicationCommandRoleOptionSchema,
                ApplicationCommandStringOptionSchema,
                ApplicationCommandSubcommandGroupOptionSchema,
                ApplicationCommandSubcommandOptionSchema,
                ApplicationCommandUserOptionSchema,
              ]),
            ),
            v.maxLength(25),
          ),
        ),
      ),
      default_member_permissions: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
      ),
      dm_permission: v.optional(v.nullable(v.boolean())),
      contexts: v.optional(
        v.nullable(
          v.pipe(
            v.array(InteractionContextTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      integration_types: v.optional(
        v.nullable(
          v.pipe(
            v.array(ApplicationIntegrationTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      handler: v.optional(
        v.pipe(
          v.union([v.null(), ApplicationCommandHandlerSchema]),
          v.description(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          ),
        ),
      ),
      type: v.optional(v.union([v.null(), ApplicationCommandTypeSchema])),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putApplicationsApplicationIdCommands = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for bulk_set_application_commands',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/commands/{command_id}',
    successDescription: '200 response for get_application_command',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/commands/{command_id}',
    successStatus: 204,
    successDescription: '204 response for delete_application_command',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/commands/{command_id}',
    successDescription: '200 response for update_application_command',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
      name_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
      ),
      description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      description_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        ),
      ),
      options: v.optional(
        v.nullable(
          v.pipe(
            v.array(
              v.union([
                ApplicationCommandAttachmentOptionSchema,
                ApplicationCommandBooleanOptionSchema,
                ApplicationCommandChannelOptionSchema,
                ApplicationCommandIntegerOptionSchema,
                ApplicationCommandMentionableOptionSchema,
                ApplicationCommandNumberOptionSchema,
                ApplicationCommandRoleOptionSchema,
                ApplicationCommandStringOptionSchema,
                ApplicationCommandSubcommandGroupOptionSchema,
                ApplicationCommandSubcommandOptionSchema,
                ApplicationCommandUserOptionSchema,
              ]),
            ),
            v.maxLength(25),
          ),
        ),
      ),
      default_member_permissions: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
      ),
      dm_permission: v.optional(v.nullable(v.boolean())),
      contexts: v.optional(
        v.nullable(
          v.pipe(
            v.array(InteractionContextTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      integration_types: v.optional(
        v.nullable(
          v.pipe(
            v.array(ApplicationIntegrationTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      handler: v.optional(
        v.pipe(
          v.union([v.null(), ApplicationCommandHandlerSchema]),
          v.description(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          ),
        ),
      ),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdEmojis = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/emojis',
    successDescription: '200 response for list_application_emojis',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .output(ListApplicationEmojisResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdEmojis = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/emojis',
    successStatus: 201,
    successDescription: '201 response for create_application_emoji',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
      image: v.string(),
    }),
  )
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successDescription: '200 response for get_application_emoji',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successStatus: 204,
    successDescription: '204 response for delete_application_emoji',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successDescription: '200 response for update_application_emoji',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      emoji_id: SnowflakeTypeSchema,
      name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32))),
    }),
  )
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdEntitlements = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/entitlements',
    successDescription: '200 response for get_entitlements',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      user_id: v.optional(SnowflakeTypeSchema),
      sku_ids: v.optional(
        v.union([
          v.string(),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
      ),
      guild_id: v.optional(SnowflakeTypeSchema),
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      exclude_ended: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      exclude_deleted: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      only_active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(v.array(EntitlementResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdEntitlements = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/entitlements',
    successDescription: '200 response for create_entitlement',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      sku_id: SnowflakeTypeSchema,
      owner_id: SnowflakeTypeSchema,
      owner_type: EntitlementOwnerTypesSchema,
    }),
  )
  .output(EntitlementResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdEntitlementsEntitlementId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/entitlements/{entitlement_id}',
    successDescription: '200 response for get_entitlement',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .output(EntitlementResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteApplicationsApplicationIdEntitlementsEntitlementId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/entitlements/{entitlement_id}',
    successStatus: 204,
    successDescription: '204 response for delete_entitlement',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdEntitlementsEntitlementIdConsume = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/entitlements/{entitlement_id}/consume',
    successStatus: 204,
    successDescription: '204 response for consume_entitlement',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for list_guild_application_commands',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      with_localizations: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for create_guild_application_command',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
      name_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
      ),
      description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      description_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        ),
      ),
      options: v.optional(
        v.nullable(
          v.pipe(
            v.array(
              v.union([
                ApplicationCommandAttachmentOptionSchema,
                ApplicationCommandBooleanOptionSchema,
                ApplicationCommandChannelOptionSchema,
                ApplicationCommandIntegerOptionSchema,
                ApplicationCommandMentionableOptionSchema,
                ApplicationCommandNumberOptionSchema,
                ApplicationCommandRoleOptionSchema,
                ApplicationCommandStringOptionSchema,
                ApplicationCommandSubcommandGroupOptionSchema,
                ApplicationCommandSubcommandOptionSchema,
                ApplicationCommandUserOptionSchema,
              ]),
            ),
            v.maxLength(25),
          ),
        ),
      ),
      default_member_permissions: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
      ),
      dm_permission: v.optional(v.nullable(v.boolean())),
      contexts: v.optional(
        v.nullable(
          v.pipe(
            v.array(InteractionContextTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      integration_types: v.optional(
        v.nullable(
          v.pipe(
            v.array(ApplicationIntegrationTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      handler: v.optional(
        v.pipe(
          v.union([v.null(), ApplicationCommandHandlerSchema]),
          v.description(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          ),
        ),
      ),
      type: v.optional(v.union([v.null(), ApplicationCommandTypeSchema])),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for bulk_set_guild_application_commands',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdGuildsGuildIdCommandsPermissions = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
    successDescription: '200 response for list_guild_application_command_permissions',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
  .output(v.array(CommandPermissionsResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    successDescription: '200 response for get_guild_application_command',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_application_command',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    successDescription: '200 response for update_guild_application_command',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
      name_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
      ),
      description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      description_localizations: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        ),
      ),
      options: v.optional(
        v.nullable(
          v.pipe(
            v.array(
              v.union([
                ApplicationCommandAttachmentOptionSchema,
                ApplicationCommandBooleanOptionSchema,
                ApplicationCommandChannelOptionSchema,
                ApplicationCommandIntegerOptionSchema,
                ApplicationCommandMentionableOptionSchema,
                ApplicationCommandNumberOptionSchema,
                ApplicationCommandRoleOptionSchema,
                ApplicationCommandStringOptionSchema,
                ApplicationCommandSubcommandGroupOptionSchema,
                ApplicationCommandSubcommandOptionSchema,
                ApplicationCommandUserOptionSchema,
              ]),
            ),
            v.maxLength(25),
          ),
        ),
      ),
      default_member_permissions: v.optional(
        v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
      ),
      dm_permission: v.optional(v.nullable(v.boolean())),
      contexts: v.optional(
        v.nullable(
          v.pipe(
            v.array(InteractionContextTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      integration_types: v.optional(
        v.nullable(
          v.pipe(
            v.array(ApplicationIntegrationTypeSchema),
            v.minLength(1),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      ),
      handler: v.optional(
        v.pipe(
          v.union([v.null(), ApplicationCommandHandlerSchema]),
          v.description(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          ),
        ),
      ),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    successDescription: '200 response for get_guild_application_command_permissions',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
    }),
  )
  .output(CommandPermissionsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    successDescription: '200 response for set_guild_application_command_permissions',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      permissions: v.optional(
        v.nullable(v.pipe(v.array(ApplicationCommandPermissionSchema), v.maxLength(100))),
      ),
    }),
  )
  .output(CommandPermissionsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdRoleConnectionsMetadata = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/role-connections/metadata',
    successDescription: '200 response for get_application_role_connections_metadata',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putApplicationsApplicationIdRoleConnectionsMetadata = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/role-connections/metadata',
    successDescription: '200 response for update_application_role_connections_metadata',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
