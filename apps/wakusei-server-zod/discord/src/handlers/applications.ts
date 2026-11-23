import { os } from '@orpc/server'
import * as z from 'zod'
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
  ApplicationFormPartialSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationTypesSchema,
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
  .input(ApplicationFormPartialSchema)
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}',
    successDescription: '200 response for get_application',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema }))
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsApplicationId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}',
    successDescription: '200 response for update_application',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      description: z
        .object({
          default: z.string().max(400),
          localizations: z.record(z.string(), z.string().max(400)).nullable().exactOptional(),
        })
        .nullable()
        .exactOptional(),
      icon: z.string().nullable().exactOptional(),
      cover_image: z.string().nullable().exactOptional(),
      team_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      flags: z.int().nullable().exactOptional(),
      interactions_endpoint_url: z.url().max(2048).nullable().exactOptional(),
      explicit_content_filter: z
        .xor([z.null(), ApplicationExplicitContentFilterTypesSchema])
        .exactOptional(),
      max_participants: z.int32().min(-1).nullable().exactOptional(),
      type: z.xor([z.null(), ApplicationTypesSchema]).exactOptional(),
      tags: z
        .array(z.string().max(20))
        .max(5)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      custom_install_url: z.url().max(2048).nullable().exactOptional(),
      install_params: z.xor([z.null(), ApplicationOAuth2InstallParamsSchema]).exactOptional(),
      role_connections_verification_url: z.url().max(2048).nullable().exactOptional(),
      integration_types_config: z
        .record(z.string(), z.xor([z.null(), ApplicationIntegrationTypeConfigurationSchema]))
        .nullable()
        .exactOptional(),
      event_webhooks_status: z
        .xor([z.null(), ApplicationEventWebhooksStatusSchema])
        .exactOptional(),
      event_webhooks_url: z
        .url()
        .max(2048)
        .nullable()
        .meta({ description: 'Event webhooks URL for the app to receive webhook events' })
        .exactOptional(),
      event_webhooks_types: z
        .array(ActionTypesSchema)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
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
  .input(z.object({ application_id: SnowflakeTypeSchema, instance_id: z.string().max(152133) }))
  .output(EmbeddedActivityInstanceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdAttachment = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/attachment',
    successDescription: '200 response for upload_application_attachment',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema }))
  .output(ActivitiesAttachmentResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdCommands = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for list_application_commands',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      with_localizations: z.stringbool().exactOptional(),
    }),
  )
  .output(z.array(ApplicationCommandResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdCommands = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for create_application_command',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(32),
      name_localizations: z
        .record(z.string(), z.string().min(1).max(32))
        .nullable()
        .exactOptional(),
      description: z.string().max(100).nullable().exactOptional(),
      description_localizations: z
        .record(z.string(), z.string().min(1).max(100))
        .nullable()
        .exactOptional(),
      options: z
        .array(
          z.xor([
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
        )
        .max(25)
        .nullable()
        .exactOptional(),
      default_member_permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
      dm_permission: z.boolean().nullable().exactOptional(),
      contexts: z
        .array(InteractionContextTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      integration_types: z
        .array(ApplicationIntegrationTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      handler: z
        .xor([z.null(), ApplicationCommandHandlerSchema])
        .meta({
          description:
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        })
        .exactOptional(),
      type: z.xor([z.null(), ApplicationCommandTypeSchema]).exactOptional(),
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
  .input(z.object({ application_id: SnowflakeTypeSchema }))
  .output(z.array(ApplicationCommandResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/commands/{command_id}',
    successDescription: '200 response for get_application_command',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/commands/{command_id}',
    successStatus: 204,
    successDescription: '204 response for delete_application_command',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/commands/{command_id}',
    successDescription: '200 response for update_application_command',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(32).exactOptional(),
      name_localizations: z
        .record(z.string(), z.string().min(1).max(32))
        .nullable()
        .exactOptional(),
      description: z.string().max(100).nullable().exactOptional(),
      description_localizations: z
        .record(z.string(), z.string().min(1).max(100))
        .nullable()
        .exactOptional(),
      options: z
        .array(
          z.xor([
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
        )
        .max(25)
        .nullable()
        .exactOptional(),
      default_member_permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
      dm_permission: z.boolean().nullable().exactOptional(),
      contexts: z
        .array(InteractionContextTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      integration_types: z
        .array(ApplicationIntegrationTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      handler: z
        .xor([z.null(), ApplicationCommandHandlerSchema])
        .meta({
          description:
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        })
        .exactOptional(),
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
  .input(z.object({ application_id: SnowflakeTypeSchema }))
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
    z.object({
      application_id: SnowflakeTypeSchema,
      name: z.string().min(2).max(32),
      image: z.string(),
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
  .input(z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successStatus: 204,
    successDescription: '204 response for delete_application_emoji',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successDescription: '200 response for update_application_emoji',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      emoji_id: SnowflakeTypeSchema,
      name: z.string().min(2).max(32).exactOptional(),
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
    z.object({
      application_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema.exactOptional(),
      sku_ids: z
        .union([
          z.string(),
          z.preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(
                z.preprocess(
                  (val) => (val === 'null' ? null : val),
                  z
                    .union([
                      z.preprocess((val) => (val === 'null' ? null : val), z.null()),
                      SnowflakeTypeSchema,
                    ])
                    .nullable(),
                ),
              )
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          ),
        ])
        .exactOptional(),
      guild_id: SnowflakeTypeSchema.exactOptional(),
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(100),
        )
        .exactOptional(),
      exclude_ended: z.stringbool().exactOptional(),
      exclude_deleted: z.stringbool().exactOptional(),
      only_active: z.stringbool().exactOptional(),
    }),
  )
  .output(z.array(EntitlementResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdEntitlements = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/entitlements',
    successDescription: '200 response for create_entitlement',
  })
  .input(
    z.object({
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
  .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .output(EntitlementResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteApplicationsApplicationIdEntitlementsEntitlementId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/entitlements/{entitlement_id}',
    successStatus: 204,
    successDescription: '204 response for delete_entitlement',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdEntitlementsEntitlementIdConsume = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/entitlements/{entitlement_id}/consume',
    successStatus: 204,
    successDescription: '204 response for consume_entitlement',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for list_guild_application_commands',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      with_localizations: z.stringbool().exactOptional(),
    }),
  )
  .output(z.array(ApplicationCommandResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for create_guild_application_command',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(32),
      name_localizations: z
        .record(z.string(), z.string().min(1).max(32))
        .nullable()
        .exactOptional(),
      description: z.string().max(100).nullable().exactOptional(),
      description_localizations: z
        .record(z.string(), z.string().min(1).max(100))
        .nullable()
        .exactOptional(),
      options: z
        .array(
          z.xor([
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
        )
        .max(25)
        .nullable()
        .exactOptional(),
      default_member_permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
      dm_permission: z.boolean().nullable().exactOptional(),
      contexts: z
        .array(InteractionContextTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      integration_types: z
        .array(ApplicationIntegrationTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      handler: z
        .xor([z.null(), ApplicationCommandHandlerSchema])
        .meta({
          description:
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        })
        .exactOptional(),
      type: z.xor([z.null(), ApplicationCommandTypeSchema]).exactOptional(),
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
  .input(z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
  .output(z.array(ApplicationCommandResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdGuildsGuildIdCommandsPermissions = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
    successDescription: '200 response for list_guild_application_command_permissions',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
  .output(z.array(CommandPermissionsResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    successDescription: '200 response for get_guild_application_command',
  })
  .input(
    z.object({
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
    z.object({
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
    z.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(32).exactOptional(),
      name_localizations: z
        .record(z.string(), z.string().min(1).max(32))
        .nullable()
        .exactOptional(),
      description: z.string().max(100).nullable().exactOptional(),
      description_localizations: z
        .record(z.string(), z.string().min(1).max(100))
        .nullable()
        .exactOptional(),
      options: z
        .array(
          z.xor([
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
        )
        .max(25)
        .nullable()
        .exactOptional(),
      default_member_permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
      dm_permission: z.boolean().nullable().exactOptional(),
      contexts: z
        .array(InteractionContextTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      integration_types: z
        .array(ApplicationIntegrationTypeSchema)
        .min(1)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      handler: z
        .xor([z.null(), ApplicationCommandHandlerSchema])
        .meta({
          description:
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        })
        .exactOptional(),
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
    z.object({
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
    z.object({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      permissions: z.array(ApplicationCommandPermissionSchema).max(100).nullable().exactOptional(),
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
  .input(z.object({ application_id: SnowflakeTypeSchema }))
  .output(z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putApplicationsApplicationIdRoleConnectionsMetadata = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/role-connections/metadata',
    successDescription: '200 response for update_application_role_connections_metadata',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema }))
  .output(z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })
