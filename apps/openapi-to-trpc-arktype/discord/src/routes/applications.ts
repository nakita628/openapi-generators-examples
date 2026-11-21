import { initTRPC, TRPCError } from '@trpc/server'
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
  ApplicationCommandUpdateRequestSchema,
  ApplicationCommandUserOptionSchema,
  ApplicationEventWebhooksStatusSchema,
  ApplicationExplicitContentFilterTypesSchema,
  ApplicationFormPartialSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
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

const t = initTRPC.create()

export const applicationsRouter = t.router({
  getApplicationsMe: t.procedure.output(PrivateApplicationResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  patchApplicationsMe: t.procedure
    .input(ApplicationFormPartialSchema)
    .output(PrivateApplicationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationId: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(PrivateApplicationResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationId: t.procedure
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
        'icon?': 'string | null',
        'cover_image?': 'string | null',
        'team_id?': type('null | null').or(SnowflakeTypeSchema),
        'flags?': 'number.integer | null',
        'interactions_endpoint_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
          ),
        ).or('null'),
        'explicit_content_filter?': type('null | null').or(
          ApplicationExplicitContentFilterTypesSchema,
        ),
        'max_participants?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= -1 | null',
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
          type({
            '[string]': type('null | null').or(ApplicationIntegrationTypeConfigurationSchema),
          }),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdActivityInstancesInstanceId: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        instance_id: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(EmbeddedActivityInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdAttachment: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(ActivitiesAttachmentResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommands: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, 'with_localizations?': 'boolean' }))
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdCommands: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        body: type(
          type(type(ApplicationCommandUpdateRequestSchema).array()).and(type('unknown[] <= 130')),
        ).or('null'),
      }),
    )
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdCommands: t.procedure
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
              .narrow(
                (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
              ),
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
        'default_member_permissions?':
          'number.integer >= 0 & number.integer <= 18014398509481984 | null',
        'dm_permission?': 'boolean | null',
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .output(ApplicationCommandResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdCommandsCommandId: t.procedure
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
              .narrow(
                (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
              ),
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
        'default_member_permissions?':
          'number.integer >= 0 & number.integer <= 18014398509481984 | null',
        'dm_permission?': 'boolean | null',
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojis: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(ListApplicationEmojisResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEmojis: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        image: 'string',
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdEmojisEmojiId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlements: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        'user_id?': SnowflakeTypeSchema,
        'sku_ids?': type('string').or(
          type(type(type('null | null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'guild_id?': SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'exclude_ended?': 'boolean',
        'exclude_deleted?': 'boolean',
        'only_active?': 'boolean',
      }),
    )
    .output(type(EntitlementResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlements: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        sku_id: SnowflakeTypeSchema.describe('ID of the SKU to grant the entitlement to'),
        owner_id: SnowflakeTypeSchema.describe(
          'ID of the guild or user to grant the entitlement to',
        ),
        owner_type: EntitlementOwnerTypesSchema.describe(
          '1 for a guild subscription, 2 for a user subscription',
        ),
      }),
    )
    .output(EntitlementResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .output(EntitlementResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlementsEntitlementIdConsume: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        'with_localizations?': 'boolean',
      }),
    )
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        body: type(
          type(type(ApplicationCommandUpdateRequestSchema).array()).and(type('unknown[] <= 130')),
        ).or('null'),
      }),
    )
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null'))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
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
              .narrow(
                (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
              ),
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
        'default_member_permissions?':
          'number.integer >= 0 & number.integer <= 18014398509481984 | null',
        'dm_permission?': 'boolean | null',
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissions: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(type(CommandPermissionsResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
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
              .narrow(
                (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
              ),
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
        'default_member_permissions?':
          'number.integer >= 0 & number.integer <= 18014398509481984 | null',
        'dm_permission?': 'boolean | null',
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    )
    .output(CommandPermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(type(type(ApplicationRoleConnectionsMetadataItemResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        body: type(
          type(type(ApplicationRoleConnectionsMetadataItemRequestSchema).array()).and(
            type('unknown[] <= 5'),
          ),
        ).or('null'),
      }),
    )
    .output(type(type(ApplicationRoleConnectionsMetadataItemResponseSchema).array()).or('null'))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
