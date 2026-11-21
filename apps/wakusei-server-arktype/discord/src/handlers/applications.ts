import { os } from '@orpc/server'
import { type } from 'arktype'
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
  .handler(async ({ input }) => {})

export const patchApplicationsMe = os
  .route({
    method: 'PATCH',
    path: '/applications/@me',
    successDescription: '200 response for update_my_application',
  })
  .input(ApplicationFormPartialSchema)
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}',
    successDescription: '200 response for get_application',
  })
  .input(type({ application_id: SnowflakeTypeSchema }))
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => {})

export const patchApplicationsApplicationId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}',
    successDescription: '200 response for update_application',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      'description?': type(
        type({
          default: type('string').narrow(
            (data, ctx) => [...data].length <= 400 || ctx.mustBe('at most 400 characters'),
          ),
          'localizations?': type(
            type({
              '[string]': type('string').narrow(
                (data, ctx) => [...data].length <= 400 || ctx.mustBe('at most 400 characters'),
              ),
            }),
          ).or('null'),
        }),
      ).or('null'),
      'icon?': type('string | null'),
      'cover_image?': type('string | null'),
      'team_id?': type('null | null').or(SnowflakeTypeSchema),
      'flags?': type('number.integer | null'),
      'interactions_endpoint_url?': type(
        type('string.url').narrow(
          (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
        ),
      ).or('null'),
      'explicit_content_filter?': type('null | null').or(
        ApplicationExplicitContentFilterTypesSchema,
      ),
      'max_participants?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= -1 | null',
      ),
      'type?': type('null | null').or(ApplicationTypesSchema),
      'tags?': type(
        type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 20 || ctx.mustBe('at most 20 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 5'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'custom_install_url?': type(
        type('string.url').narrow(
          (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
        ),
      ).or('null'),
      'install_params?': type('null | null').or(ApplicationOAuth2InstallParamsSchema),
      'role_connections_verification_url?': type(
        type('string.url').narrow(
          (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
        ),
      ).or('null'),
      'integration_types_config?': type(
        type({ '[string]': type('null | null').or(ApplicationIntegrationTypeConfigurationSchema) }),
      ).or('null'),
      'event_webhooks_status?': type('null | null').or(ApplicationEventWebhooksStatusSchema),
      'event_webhooks_url?': type(
        type('string.url').narrow(
          (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
        ),
      )
        .or('null')
        .describe('Event webhooks URL for the app to receive webhook events'),
      'event_webhooks_types?': type(
        type(ActionTypesSchema)
          .array()
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
    }),
  )
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdActivityInstancesInstanceId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/activity-instances/{instance_id}',
    successDescription: '200 response for applications_get_activity_instance',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      instance_id: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .output(EmbeddedActivityInstanceSchema)
  .handler(async ({ input }) => {})

export const postApplicationsApplicationIdAttachment = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/attachment',
    successDescription: '200 response for upload_application_attachment',
  })
  .input(type({ application_id: SnowflakeTypeSchema }))
  .output(ActivitiesAttachmentResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdCommands = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for list_application_commands',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      'with_localizations?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
  .handler(async ({ input }) => {})

export const postApplicationsApplicationIdCommands = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for create_application_command',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      'name_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        }),
      ).or('null'),
      'description?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
      ).or('null'),
      'description_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        }),
      ).or('null'),
      'options?': type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(ApplicationCommandAttachmentOptionSchema).or(
                                ApplicationCommandBooleanOptionSchema,
                              ),
                            ).or(ApplicationCommandChannelOptionSchema),
                          ).or(ApplicationCommandIntegerOptionSchema),
                        ).or(ApplicationCommandMentionableOptionSchema),
                      ).or(ApplicationCommandNumberOptionSchema),
                    ).or(ApplicationCommandRoleOptionSchema),
                  ).or(ApplicationCommandStringOptionSchema),
                ).or(ApplicationCommandSubcommandGroupOptionSchema),
              ).or(ApplicationCommandSubcommandOptionSchema),
            ).or(ApplicationCommandUserOptionSchema),
          ).array(),
        ).and(type('unknown[] <= 25')),
      ).or('null'),
      'default_member_permissions?': type(
        'number.integer >= 0 & number.integer <= 18014398509481984 | null',
      ),
      'dm_permission?': type('boolean | null'),
      'contexts?': type(
        type(type(InteractionContextTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'integration_types?': type(
        type(type(ApplicationIntegrationTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'handler?': type('null | null')
        .or(ApplicationCommandHandlerSchema)
        .describe(
          "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        ),
      'type?': type('null | null').or(ApplicationCommandTypeSchema),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => {})

export const putApplicationsApplicationIdCommands = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/commands',
    successDescription: '200 response for bulk_set_application_commands',
  })
  .input(type({ application_id: SnowflakeTypeSchema }))
  .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/commands/{command_id}',
    successDescription: '200 response for get_application_command',
  })
  .input(type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => {})

export const deleteApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/commands/{command_id}',
    successStatus: 204,
    successDescription: '204 response for delete_application_command',
  })
  .input(type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchApplicationsApplicationIdCommandsCommandId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/commands/{command_id}',
    successDescription: '200 response for update_application_command',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      'name_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        }),
      ).or('null'),
      'description?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
      ).or('null'),
      'description_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        }),
      ).or('null'),
      'options?': type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(ApplicationCommandAttachmentOptionSchema).or(
                                ApplicationCommandBooleanOptionSchema,
                              ),
                            ).or(ApplicationCommandChannelOptionSchema),
                          ).or(ApplicationCommandIntegerOptionSchema),
                        ).or(ApplicationCommandMentionableOptionSchema),
                      ).or(ApplicationCommandNumberOptionSchema),
                    ).or(ApplicationCommandRoleOptionSchema),
                  ).or(ApplicationCommandStringOptionSchema),
                ).or(ApplicationCommandSubcommandGroupOptionSchema),
              ).or(ApplicationCommandSubcommandOptionSchema),
            ).or(ApplicationCommandUserOptionSchema),
          ).array(),
        ).and(type('unknown[] <= 25')),
      ).or('null'),
      'default_member_permissions?': type(
        'number.integer >= 0 & number.integer <= 18014398509481984 | null',
      ),
      'dm_permission?': type('boolean | null'),
      'contexts?': type(
        type(type(InteractionContextTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'integration_types?': type(
        type(type(ApplicationIntegrationTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'handler?': type('null | null')
        .or(ApplicationCommandHandlerSchema)
        .describe(
          "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        ),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdEmojis = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/emojis',
    successDescription: '200 response for list_application_emojis',
  })
  .input(type({ application_id: SnowflakeTypeSchema }))
  .output(ListApplicationEmojisResponseSchema)
  .handler(async ({ input }) => {})

export const postApplicationsApplicationIdEmojis = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/emojis',
    successStatus: 201,
    successDescription: '201 response for create_application_emoji',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      image: type('string'),
    }),
  )
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successDescription: '200 response for get_application_emoji',
  })
  .input(type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => {})

export const deleteApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successStatus: 204,
    successDescription: '204 response for delete_application_emoji',
  })
  .input(type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchApplicationsApplicationIdEmojisEmojiId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/emojis/{emoji_id}',
    successDescription: '200 response for update_application_emoji',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      emoji_id: SnowflakeTypeSchema,
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  )
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdEntitlements = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/entitlements',
    successDescription: '200 response for get_entitlements',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      'user_id?': SnowflakeTypeSchema,
      'sku_ids?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string'),
          type('unknown').pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type(
              type(
                type('unknown').pipe(
                  (data) => (data === 'null' ? null : data),
                  type(
                    type('unknown').pipe((data, ctx) => {
                      for (const branch of [
                        type('unknown')
                          .pipe((data) => (data === 'null' ? null : data))
                          .to('null | null'),
                        SnowflakeTypeSchema,
                      ]) {
                        const out = branch(data)
                        if (!(out instanceof type.errors)) return out
                      }
                      return ctx.error('one of the members')
                    }),
                  ).or('null'),
                ),
              ).array(),
            )
              .and(type('unknown[] <= 100'))
              .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
          ),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
      'guild_id?': SnowflakeTypeSchema,
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'exclude_ended?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'exclude_deleted?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'only_active?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(type(EntitlementResponseSchema).array())
  .handler(async ({ input }) => {})

export const postApplicationsApplicationIdEntitlements = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/entitlements',
    successDescription: '200 response for create_entitlement',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      sku_id: SnowflakeTypeSchema,
      owner_id: SnowflakeTypeSchema,
      owner_type: EntitlementOwnerTypesSchema,
    }),
  )
  .output(EntitlementResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdEntitlementsEntitlementId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/entitlements/{entitlement_id}',
    successDescription: '200 response for get_entitlement',
  })
  .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .output(EntitlementResponseSchema)
  .handler(async ({ input }) => {})

export const deleteApplicationsApplicationIdEntitlementsEntitlementId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/entitlements/{entitlement_id}',
    successStatus: 204,
    successDescription: '204 response for delete_entitlement',
  })
  .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const postApplicationsApplicationIdEntitlementsEntitlementIdConsume = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/entitlements/{entitlement_id}/consume',
    successStatus: 204,
    successDescription: '204 response for consume_entitlement',
  })
  .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for list_guild_application_commands',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      'with_localizations?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
  .handler(async ({ input }) => {})

export const postApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'POST',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for create_guild_application_command',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      'name_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        }),
      ).or('null'),
      'description?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
      ).or('null'),
      'description_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        }),
      ).or('null'),
      'options?': type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(ApplicationCommandAttachmentOptionSchema).or(
                                ApplicationCommandBooleanOptionSchema,
                              ),
                            ).or(ApplicationCommandChannelOptionSchema),
                          ).or(ApplicationCommandIntegerOptionSchema),
                        ).or(ApplicationCommandMentionableOptionSchema),
                      ).or(ApplicationCommandNumberOptionSchema),
                    ).or(ApplicationCommandRoleOptionSchema),
                  ).or(ApplicationCommandStringOptionSchema),
                ).or(ApplicationCommandSubcommandGroupOptionSchema),
              ).or(ApplicationCommandSubcommandOptionSchema),
            ).or(ApplicationCommandUserOptionSchema),
          ).array(),
        ).and(type('unknown[] <= 25')),
      ).or('null'),
      'default_member_permissions?': type(
        'number.integer >= 0 & number.integer <= 18014398509481984 | null',
      ),
      'dm_permission?': type('boolean | null'),
      'contexts?': type(
        type(type(InteractionContextTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'integration_types?': type(
        type(type(ApplicationIntegrationTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'handler?': type('null | null')
        .or(ApplicationCommandHandlerSchema)
        .describe(
          "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        ),
      'type?': type('null | null').or(ApplicationCommandTypeSchema),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => {})

export const putApplicationsApplicationIdGuildsGuildIdCommands = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/guilds/{guild_id}/commands',
    successDescription: '200 response for bulk_set_guild_application_commands',
  })
  .input(type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
  .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdGuildsGuildIdCommandsPermissions = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
    successDescription: '200 response for list_guild_application_command_permissions',
  })
  .input(type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
  .output(type(CommandPermissionsResponseSchema).array())
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandId = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    successDescription: '200 response for get_guild_application_command',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => {})

export const deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId = os
  .route({
    method: 'DELETE',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_application_command',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => {})

export const patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId = os
  .route({
    method: 'PATCH',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    successDescription: '200 response for update_guild_application_command',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      'name_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        }),
      ).or('null'),
      'description?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
      ).or('null'),
      'description_localizations?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        }),
      ).or('null'),
      'options?': type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(ApplicationCommandAttachmentOptionSchema).or(
                                ApplicationCommandBooleanOptionSchema,
                              ),
                            ).or(ApplicationCommandChannelOptionSchema),
                          ).or(ApplicationCommandIntegerOptionSchema),
                        ).or(ApplicationCommandMentionableOptionSchema),
                      ).or(ApplicationCommandNumberOptionSchema),
                    ).or(ApplicationCommandRoleOptionSchema),
                  ).or(ApplicationCommandStringOptionSchema),
                ).or(ApplicationCommandSubcommandGroupOptionSchema),
              ).or(ApplicationCommandSubcommandOptionSchema),
            ).or(ApplicationCommandUserOptionSchema),
          ).array(),
        ).and(type('unknown[] <= 25')),
      ).or('null'),
      'default_member_permissions?': type(
        'number.integer >= 0 & number.integer <= 18014398509481984 | null',
      ),
      'dm_permission?': type('boolean | null'),
      'contexts?': type(
        type(type(InteractionContextTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'integration_types?': type(
        type(type(ApplicationIntegrationTypeSchema).array())
          .and(type('unknown[] >= 1'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'handler?': type('null | null')
        .or(ApplicationCommandHandlerSchema)
        .describe(
          "Determines whether the interaction is handled by the app's interactions handler or by Discord",
        ),
    }),
  )
  .output(ApplicationCommandResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    successDescription: '200 response for get_guild_application_command_permissions',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
    }),
  )
  .output(CommandPermissionsResponseSchema)
  .handler(async ({ input }) => {})

export const putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    successDescription: '200 response for set_guild_application_command_permissions',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      guild_id: SnowflakeTypeSchema,
      command_id: SnowflakeTypeSchema,
      'permissions?': type(
        type(type(ApplicationCommandPermissionSchema).array()).and(type('unknown[] <= 100')),
      ).or('null'),
    }),
  )
  .output(CommandPermissionsResponseSchema)
  .handler(async ({ input }) => {})

export const getApplicationsApplicationIdRoleConnectionsMetadata = os
  .route({
    method: 'GET',
    path: '/applications/{application_id}/role-connections/metadata',
    successDescription: '200 response for get_application_role_connections_metadata',
  })
  .input(type({ application_id: SnowflakeTypeSchema }))
  .output(type(type(ApplicationRoleConnectionsMetadataItemResponseSchema).array()).or('null'))
  .handler(async ({ input }) => {})

export const putApplicationsApplicationIdRoleConnectionsMetadata = os
  .route({
    method: 'PUT',
    path: '/applications/{application_id}/role-connections/metadata',
    successDescription: '200 response for update_application_role_connections_metadata',
  })
  .input(type({ application_id: SnowflakeTypeSchema }))
  .output(type(type(ApplicationRoleConnectionsMetadataItemResponseSchema).array()).or('null'))
  .handler(async ({ input }) => {})
