import { oc } from '@orpc/contract'
import * as z from 'zod'
import {
  ActionRowComponentForMessageRequestSchema,
  ActionTypesSchema,
  ActivitiesAttachmentResponseSchema,
  AfkTimeoutsSchema,
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
  ApplicationIdentityProviderAuthTypeSchema,
  ApplicationIncomingWebhookResponseSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationTypesSchema,
  ApplicationUpdateFormPartialSchema,
  ApplicationUserRoleConnectionResponseSchema,
  AuditLogActionTypesSchema,
  AuthorTypeSchema,
  AvailableLocalesEnumSchema,
  BotAccountPatchRequestSchema,
  BulkBanUsersResponseSchema,
  ChannelFollowerResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelPermissionOverwriteRequestSchema,
  ChannelPermissionOverwritesSchema,
  ChannelTypesSchema,
  CommandPermissionsResponseSchema,
  ConnectedAccountResponseSchema,
  ContainerComponentForMessageRequestSchema,
  CreateOrUpdateThreadTagRequestSchema,
  CreatePrivateChannelRequestSchema,
  CreatedThreadResponseSchema,
  CustomClientThemeShareRequestSchema,
  DefaultKeywordRuleResponseSchema,
  DiscordIntegrationResponseSchema,
  EmbeddedActivityInstanceSchema,
  EmojiResponseSchema,
  EntitlementOwnerTypesSchema,
  EntitlementResponseSchema,
  ExternalConnectionIntegrationResponseSchema,
  ExternalScheduledEventResponseSchema,
  FileComponentForMessageRequestSchema,
  ForumLayoutSchema,
  FriendInviteResponseSchema,
  GatewayBotResponseSchema,
  GatewayResponseSchema,
  GithubCheckRunSchema,
  GithubCheckSuiteSchema,
  GithubCommentSchema,
  GithubCommitSchema,
  GithubDiscussionSchema,
  GithubIssueSchema,
  GithubReleaseSchema,
  GithubRepositorySchema,
  GithubReviewSchema,
  GithubUserSchema,
  GroupDMInviteResponseSchema,
  GuildAuditLogResponseSchema,
  GuildBanResponseSchema,
  GuildChannelResponseSchema,
  GuildExplicitContentFilterTypesSchema,
  GuildHomeSettingsResponseSchema,
  GuildIncidentsDataResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  GuildJoinRequestApplicationStatusSchema,
  GuildJoinRequestResponseSchema,
  GuildJoinRequestsListResponseSchema,
  GuildMemberResponseSchema,
  GuildOnboardingModeSchema,
  GuildOnboardingResponseSchema,
  GuildPreviewResponseSchema,
  GuildPruneResponseSchema,
  GuildResponseSchema,
  GuildRoleResponseSchema,
  GuildScheduledEventExceptionResponseSchema,
  GuildSearchResponseSchema,
  GuildStickerResponseSchema,
  GuildSubscriptionIntegrationResponseSchema,
  GuildTemplateResponseSchema,
  GuildWelcomeChannelSchema,
  GuildWelcomeScreenResponseSchema,
  GuildWithCountsResponseSchema,
  HasOptionSchema,
  InteractionCallbackResponseSchema,
  InteractionContextTypeSchema,
  KeywordRuleResponseSchema,
  ListApplicationEmojisResponseSchema,
  ListGuildSoundboardSoundsResponseSchema,
  LobbyGuildInviteResponseSchema,
  LobbyMemberRequestSchema,
  LobbyMemberResponseSchema,
  LobbyMessageResponseSchema,
  LobbyResponseSchema,
  MLSpamRuleResponseSchema,
  MediaGalleryComponentForMessageRequestSchema,
  MentionSpamRuleResponseSchema,
  MessageAllowedMentionsRequestSchema,
  MessageAttachmentRequestSchema,
  MessageReferenceRequestSchema,
  MessageResponseSchema,
  MyGuildResponseSchema,
  OAuth2GetAuthorizationResponseSchema,
  OAuth2GetKeysSchema,
  OAuth2GetOpenIDConnectUserInfoResponseSchema,
  PermissionsResponseSchema,
  PinnedMessagesResponseSchema,
  PollAnswerDetailsResponseSchema,
  PollCreateRequestSchema,
  PrivateApplicationResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  PrivateGuildMemberResponseSchema,
  ProvisionalTokenResponseSchema,
  ReactionTypesSchema,
  RichEmbedSchema,
  RoleColorsSchema,
  ScheduledEventUserCountResponseSchema,
  ScheduledEventUserResponseSchema,
  SearchableEmbedTypeSchema,
  SectionComponentForMessageRequestSchema,
  SeparatorComponentForMessageRequestSchema,
  SnowflakeTypeSchema,
  SortingModeSchema,
  SortingOrderSchema,
  SoundboardSoundResponseSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
  StageScheduledEventResponseSchema,
  StandardStickerResponseSchema,
  StickerPackCollectionResponseSchema,
  StickerPackResponseSchema,
  SubscriptionResponseSchema,
  TargetUsersJobStatusResponseSchema,
  TextDisplayComponentForMessageRequestSchema,
  ThreadAutoArchiveDurationSchema,
  ThreadMemberResponseSchema,
  ThreadResponseSchema,
  ThreadSearchResponseSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortOrderSchema,
  ThreadSortingModeSchema,
  ThreadsResponseSchema,
  TypingIndicatorResponseSchema,
  UpdateDefaultReactionEmojiRequestSchema,
  UpdateOnboardingPromptRequestSchema,
  UserGuildOnboardingResponseSchema,
  UserNotificationSettingsSchema,
  UserPIIResponseSchema,
  UserProfileRuleResponseSchema,
  UserResponseSchema,
  VanityURLResponseSchema,
  VerificationLevelsSchema,
  VideoQualityModesSchema,
  VoiceRegionResponseSchema,
  VoiceScheduledEventResponseSchema,
  VoiceStateResponseSchema,
  WebhookSlackEmbedSchema,
  WidgetImageStylesSchema,
  WidgetResponseSchema,
  WidgetSettingsResponseSchema,
} from './components'

export const contract = {
  getApplicationsMe: oc
    .route({
      method: 'GET',
      path: '/applications/@me',
      successDescription: '200 response for get_my_application',
    })
    .output(PrivateApplicationResponseSchema),
  patchApplicationsMe: oc
    .route({
      method: 'PATCH',
      path: '/applications/@me',
      successDescription: '200 response for update_my_application',
    })
    .input(ApplicationUpdateFormPartialSchema)
    .output(PrivateApplicationResponseSchema),
  getApplicationsApplicationId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}',
      successDescription: '200 response for get_application',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(PrivateApplicationResponseSchema),
  patchApplicationsApplicationId: oc
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
    .output(PrivateApplicationResponseSchema),
  getApplicationsApplicationIdActivityInstancesInstanceId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/activity-instances/{instance_id}',
      successDescription: '200 response for applications_get_activity_instance',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, instance_id: z.string().max(152133) }))
    .output(EmbeddedActivityInstanceSchema),
  postApplicationsApplicationIdAttachment: oc
    .route({
      method: 'POST',
      path: '/applications/{application_id}/attachment',
      successDescription: '200 response for upload_application_attachment',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(ActivitiesAttachmentResponseSchema),
  getApplicationsApplicationIdCommands: oc
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
    .output(z.array(ApplicationCommandResponseSchema).nullable()),
  postApplicationsApplicationIdCommands: oc
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
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
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
    .output(ApplicationCommandResponseSchema),
  putApplicationsApplicationIdCommands: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/commands',
      successDescription: '200 response for bulk_set_application_commands',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(z.array(ApplicationCommandResponseSchema).nullable()),
  getApplicationsApplicationIdCommandsCommandId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/commands/{command_id}',
      successDescription: '200 response for get_application_command',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .output(ApplicationCommandResponseSchema),
  deleteApplicationsApplicationIdCommandsCommandId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/commands/{command_id}',
      successStatus: 204,
      successDescription: '204 response for delete_application_command',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema })),
  patchApplicationsApplicationIdCommandsCommandId: oc
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
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
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
    .output(ApplicationCommandResponseSchema),
  getApplicationsApplicationIdEmojis: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/emojis',
      successDescription: '200 response for list_application_emojis',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(ListApplicationEmojisResponseSchema),
  postApplicationsApplicationIdEmojis: oc
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
    .output(EmojiResponseSchema),
  getApplicationsApplicationIdEmojisEmojiId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/emojis/{emoji_id}',
      successDescription: '200 response for get_application_emoji',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema),
  deleteApplicationsApplicationIdEmojisEmojiId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/emojis/{emoji_id}',
      successStatus: 204,
      successDescription: '204 response for delete_application_emoji',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
  patchApplicationsApplicationIdEmojisEmojiId: oc
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
    .output(EmojiResponseSchema),
  getApplicationsApplicationIdEntitlements: oc
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
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        exclude_ended: z.stringbool().exactOptional(),
        exclude_deleted: z.stringbool().exactOptional(),
        only_active: z.stringbool().exactOptional(),
      }),
    )
    .output(z.array(EntitlementResponseSchema)),
  postApplicationsApplicationIdEntitlements: oc
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
    .output(EntitlementResponseSchema),
  getApplicationsApplicationIdEntitlementsEntitlementId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/entitlements/{entitlement_id}',
      successDescription: '200 response for get_entitlement',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .output(EntitlementResponseSchema),
  deleteApplicationsApplicationIdEntitlementsEntitlementId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/entitlements/{entitlement_id}',
      successStatus: 204,
      successDescription: '204 response for delete_entitlement',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema })),
  postApplicationsApplicationIdEntitlementsEntitlementIdConsume: oc
    .route({
      method: 'POST',
      path: '/applications/{application_id}/entitlements/{entitlement_id}/consume',
      successStatus: 204,
      successDescription: '204 response for consume_entitlement',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema })),
  getApplicationsApplicationIdGuildsGuildIdCommands: oc
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
    .output(z.array(ApplicationCommandResponseSchema).nullable()),
  postApplicationsApplicationIdGuildsGuildIdCommands: oc
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
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
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
    .output(ApplicationCommandResponseSchema),
  putApplicationsApplicationIdGuildsGuildIdCommands: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/guilds/{guild_id}/commands',
      successDescription: '200 response for bulk_set_guild_application_commands',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(z.array(ApplicationCommandResponseSchema).nullable()),
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissions: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
      successDescription: '200 response for list_guild_application_command_permissions',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(z.array(CommandPermissionsResponseSchema)),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
    .output(ApplicationCommandResponseSchema),
  deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
    ),
  patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
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
    .output(ApplicationCommandResponseSchema),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: oc
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
    .output(CommandPermissionsResponseSchema),
  putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: oc
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
        permissions: z
          .array(ApplicationCommandPermissionSchema)
          .max(100)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(CommandPermissionsResponseSchema),
  getApplicationsApplicationIdRoleConnectionsMetadata: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/role-connections/metadata',
      successDescription: '200 response for get_application_role_connections_metadata',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable()),
  putApplicationsApplicationIdRoleConnectionsMetadata: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/role-connections/metadata',
      successDescription: '200 response for update_application_role_connections_metadata',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable()),
  getChannelsChannelId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}',
      successDescription: '200 response for get_channel',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    ),
  deleteChannelsChannelId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}',
      successDescription: '200 response for delete_channel',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    ),
  patchChannelsChannelId: oc
    .route({
      method: 'PATCH',
      path: '/channels/{channel_id}',
      successDescription: '200 response for update_channel',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    ),
  postChannelsChannelIdFollowers: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/followers',
      successDescription: '200 response for follow_channel',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
    .output(ChannelFollowerResponseSchema),
  getChannelsChannelIdInvites: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/invites',
      successDescription: '200 response for list_channel_invites',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            z.null(),
          ]),
        )
        .nullable(),
    ),
  postChannelsChannelIdInvites: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/invites',
      successDescription: '200 response for create_channel_invite',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    ),
  getChannelsChannelIdMessages: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages',
      successDescription: '200 response for list_messages',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        around: SnowflakeTypeSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
      }),
    )
    .output(z.array(MessageResponseSchema).nullable()),
  postChannelsChannelIdMessages: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages',
      successDescription: '200 response for create_message',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
        allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
        sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
        components: z
          .array(
            z.xor([
              ActionRowComponentForMessageRequestSchema,
              ContainerComponentForMessageRequestSchema,
              FileComponentForMessageRequestSchema,
              MediaGalleryComponentForMessageRequestSchema,
              SectionComponentForMessageRequestSchema,
              SeparatorComponentForMessageRequestSchema,
              TextDisplayComponentForMessageRequestSchema,
            ]),
          )
          .max(40)
          .nullable()
          .exactOptional(),
        flags: z.int().nullable().exactOptional(),
        attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
        poll: z.xor([z.null(), PollCreateRequestSchema]).exactOptional(),
        shared_client_theme: z.xor([z.null(), CustomClientThemeShareRequestSchema]).exactOptional(),
        message_reference: z.xor([z.null(), MessageReferenceRequestSchema]).exactOptional(),
        nonce: z
          .xor([
            z
              .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
              .transform((val) => BigInt(val))
              .pipe(z.int64().min(-9223372036854775808n).max(9223372036854775808n)),
            z.string().max(25),
            z.null(),
          ])
          .exactOptional(),
        enforce_nonce: z.boolean().nullable().exactOptional(),
        tts: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(MessageResponseSchema),
  postChannelsChannelIdMessagesBulkDelete: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages/bulk-delete',
      successStatus: 204,
      successDescription: '204 response for bulk_delete_messages',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        messages: z
          .array(SnowflakeTypeSchema)
          .min(2)
          .max(100)
          .refine((val) => new Set(val).size === val.length),
      }),
    ),
  getChannelsChannelIdMessagesPins: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/pins',
      successDescription: '200 response for list_pins',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(50),
          )
          .exactOptional(),
      }),
    )
    .output(PinnedMessagesResponseSchema),
  putChannelsChannelIdMessagesPinsMessageId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/messages/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for create_pin',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdMessagesPinsMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for delete_pin',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/{message_id}',
      successDescription: '200 response for get_message',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  deleteChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}',
      successStatus: 204,
      successDescription: '204 response for delete_message',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  patchChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'PATCH',
      path: '/channels/{channel_id}/messages/{message_id}',
      successDescription: '200 response for update_message',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
        flags: z.int().nullable().exactOptional(),
        allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
        sticker_ids: z.array(SnowflakeTypeSchema).max(1521).nullable().exactOptional(),
        components: z
          .array(
            z.xor([
              ActionRowComponentForMessageRequestSchema,
              ContainerComponentForMessageRequestSchema,
              FileComponentForMessageRequestSchema,
              MediaGalleryComponentForMessageRequestSchema,
              SectionComponentForMessageRequestSchema,
              SeparatorComponentForMessageRequestSchema,
              TextDisplayComponentForMessageRequestSchema,
            ]),
          )
          .max(40)
          .nullable()
          .exactOptional(),
        attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
      }),
    )
    .output(MessageResponseSchema),
  postChannelsChannelIdMessagesMessageIdCrosspost: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages/{message_id}/crosspost',
      successDescription: '200 response for crosspost_message',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  deleteChannelsChannelIdMessagesMessageIdReactions: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions',
      successStatus: 204,
      successDescription: '204 response for delete_all_message_reactions',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdMessagesMessageIdReactionsEmojiName: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
      successDescription: '200 response for list_message_reactions_by_emoji',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        type: ReactionTypesSchema.exactOptional(),
      }),
    )
    .output(z.array(UserResponseSchema)),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
      successStatus: 204,
      successDescription: '204 response for delete_all_message_reactions_by_emoji',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
  putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
      successStatus: 204,
      successDescription: '204 response for add_my_message_reaction',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
      successStatus: 204,
      successDescription: '204 response for delete_my_message_reaction',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_user_message_reaction',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
        user_id: SnowflakeTypeSchema,
      }),
    ),
  postChannelsChannelIdMessagesMessageIdThreads: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages/{message_id}/threads',
      successStatus: 201,
      successDescription: '201 response for create_thread_from_message',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100),
        auto_archive_duration: z.xor([z.null(), ThreadAutoArchiveDurationSchema]).exactOptional(),
        rate_limit_per_user: z.int32().min(0).max(21600).nullable().exactOptional(),
      }),
    )
    .output(ThreadResponseSchema),
  getChannelsChannelIdPermissionsMemberUserId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/permissions/member/{user_id}',
      description:
        "Returns the fully cascaded permissions for a member in this channel, applying their roles and the channel's permission overwrites.",
      successDescription: '200 response for get_channel_member_permissions',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        implicit: z.stringbool().exactOptional(),
      }),
    )
    .output(PermissionsResponseSchema),
  getChannelsChannelIdPermissionsRoleRoleId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/permissions/role/{role_id}',
      description:
        "Returns the permissions a role grants in this channel, applying the channel's permission overwrites on top of the role's guild-level permissions.",
      successDescription: '200 response for get_channel_role_permissions',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        implicit: z.stringbool().exactOptional(),
      }),
    )
    .output(PermissionsResponseSchema),
  putChannelsChannelIdPermissionsOverwriteId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/permissions/{overwrite_id}',
      successStatus: 204,
      successDescription: '204 response for set_channel_permission_overwrite',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        overwrite_id: SnowflakeTypeSchema,
        type: z.xor([z.null(), ChannelPermissionOverwritesSchema]).exactOptional(),
        allow: z.int().nullable().exactOptional(),
        deny: z.int().nullable().exactOptional(),
      }),
    ),
  deleteChannelsChannelIdPermissionsOverwriteId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/permissions/{overwrite_id}',
      successStatus: 204,
      successDescription: '204 response for delete_channel_permission_overwrite',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema })),
  getChannelsChannelIdPins: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/pins',
      successDescription: '200 response for deprecated_list_pins',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(z.array(MessageResponseSchema).nullable()),
  putChannelsChannelIdPinsMessageId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for deprecated_create_pin',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdPinsMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for deprecated_delete_pin',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdPollsMessageIdAnswersAnswerId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
      successDescription: '200 response for get_answer_voters',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: z.preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.int32().min(1).max(10),
        ),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
      }),
    )
    .output(PollAnswerDetailsResponseSchema),
  postChannelsChannelIdPollsMessageIdExpire: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/polls/{message_id}/expire',
      successDescription: '200 response for poll_expire',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  putChannelsChannelIdRecipientsUserId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/recipients/{user_id}',
      successStatus: 201,
      successDescription: '201 response for add_group_dm_user',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        access_token: z.string().max(152133).nullable().exactOptional(),
        nick: z.string().max(152133).nullable().exactOptional(),
      }),
    )
    .output(z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema])),
  deleteChannelsChannelIdRecipientsUserId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/recipients/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_group_dm_user',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postChannelsChannelIdSendSoundboardSound: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/send-soundboard-sound',
      successStatus: 204,
      successDescription: '204 response for send_soundboard_sound',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        source_guild_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      }),
    ),
  getChannelsChannelIdThreadMembers: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/thread-members',
      successDescription: '200 response for list_thread_members',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        with_member: z.stringbool().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(ThreadMemberResponseSchema)),
  putChannelsChannelIdThreadMembersMe: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/thread-members/@me',
      successStatus: 204,
      successDescription: '204 response for join_thread',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdThreadMembersMe: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/thread-members/@me',
      successStatus: 204,
      successDescription: '204 response for leave_thread',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema })),
  getChannelsChannelIdThreadMembersUserId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/thread-members/{user_id}',
      successDescription: '200 response for get_thread_member',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        with_member: z.stringbool().exactOptional(),
      }),
    )
    .output(ThreadMemberResponseSchema),
  putChannelsChannelIdThreadMembersUserId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/thread-members/{user_id}',
      successStatus: 204,
      successDescription: '204 response for add_thread_member',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdThreadMembersUserId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/thread-members/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_thread_member',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postChannelsChannelIdThreads: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/threads',
      successStatus: 201,
      successDescription: '201 response for create_thread',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(CreatedThreadResponseSchema),
  getChannelsChannelIdThreadsArchivedPrivate: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/threads/archived/private',
      successDescription: '200 response for list_private_archived_threads',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(2).max(100),
          )
          .exactOptional(),
      }),
    )
    .output(ThreadsResponseSchema),
  getChannelsChannelIdThreadsArchivedPublic: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/threads/archived/public',
      successDescription: '200 response for list_public_archived_threads',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(2).max(100),
          )
          .exactOptional(),
      }),
    )
    .output(ThreadsResponseSchema),
  getChannelsChannelIdThreadsSearch: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/threads/search',
      successDescription: '200 response for thread_search',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        name: z.string().max(100).exactOptional(),
        slop: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        min_id: SnowflakeTypeSchema.exactOptional(),
        max_id: SnowflakeTypeSchema.exactOptional(),
        tag: z
          .union([
            z.string(),
            z.preprocess(
              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
              z
                .array(SnowflakeTypeSchema)
                .max(20)
                .refine((val) => new Set(val).size === val.length),
            ),
          ])
          .exactOptional(),
        tag_setting: ThreadSearchTagSettingSchema.exactOptional(),
        archived: z.stringbool().exactOptional(),
        sort_by: ThreadSortingModeSchema.exactOptional(),
        sort_order: SortingOrderSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(25),
          )
          .exactOptional(),
        offset: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(9975),
          )
          .exactOptional(),
      }),
    )
    .output(ThreadSearchResponseSchema),
  postChannelsChannelIdTyping: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/typing',
      successDescription: '200 response for trigger_typing_indicator',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(TypingIndicatorResponseSchema),
  getChannelsChannelIdUsersMeThreadsArchivedPrivate: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/users/@me/threads/archived/private',
      successDescription: '200 response for list_my_private_archived_threads',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(2).max(100),
          )
          .exactOptional(),
      }),
    )
    .output(ThreadsResponseSchema),
  putChannelsChannelIdVoiceStatus: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/voice-status',
      description: "Set a voice channel's status.",
      successStatus: 204,
      successDescription: '204 response for update_voice_channel_status',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        status: z
          .string()
          .max(500)
          .nullable()
          .meta({ description: 'The new voice channel status' })
          .exactOptional(),
      }),
    ),
  getChannelsChannelIdWebhooks: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/webhooks',
      successDescription: '200 response for list_channel_webhooks',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        )
        .nullable(),
    ),
  postChannelsChannelIdWebhooks: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/webhooks',
      successDescription: '200 response for create_webhook',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(80),
        avatar: z.string().nullable().exactOptional(),
      }),
    )
    .output(GuildIncomingWebhookResponseSchema),
  getGateway: oc
    .route({ method: 'GET', path: '/gateway', successDescription: '200 response for get_gateway' })
    .output(GatewayResponseSchema),
  getGatewayBot: oc
    .route({
      method: 'GET',
      path: '/gateway/bot',
      successDescription: '200 response for get_bot_gateway',
    })
    .output(GatewayBotResponseSchema),
  getGuildsTemplatesCode: oc
    .route({
      method: 'GET',
      path: '/guilds/templates/{code}',
      successDescription: '200 response for get_guild_template',
    })
    .input(z.object({ code: z.string().max(152133) }))
    .output(GuildTemplateResponseSchema),
  getGuildsGuildId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}',
      successDescription: '200 response for get_guild',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, with_counts: z.stringbool().exactOptional() }))
    .output(GuildWithCountsResponseSchema),
  patchGuildsGuildId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}',
      successDescription: '200 response for update_guild',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(100).exactOptional(),
        description: z.string().min(0).max(300).nullable().exactOptional(),
        region: z.string().nullable().exactOptional(),
        icon: z.string().nullable().exactOptional(),
        verification_level: z.xor([z.null(), VerificationLevelsSchema]).exactOptional(),
        default_message_notifications: z
          .xor([z.null(), UserNotificationSettingsSchema])
          .exactOptional(),
        explicit_content_filter: z
          .xor([z.null(), GuildExplicitContentFilterTypesSchema])
          .exactOptional(),
        preferred_locale: z.xor([z.null(), AvailableLocalesEnumSchema]).exactOptional(),
        afk_timeout: z.xor([z.null(), AfkTimeoutsSchema]).exactOptional(),
        afk_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        system_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        splash: z.string().nullable().exactOptional(),
        banner: z.string().nullable().exactOptional(),
        system_channel_flags: z.int().nullable().exactOptional(),
        features: z
          .array(z.string().max(152133).nullable())
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        discovery_splash: z.string().nullable().exactOptional(),
        home_header: z.string().nullable().exactOptional(),
        rules_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        safety_alerts_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        public_updates_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        premium_progress_bar_enabled: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(GuildResponseSchema),
  getGuildsGuildIdAuditLogs: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/audit-logs',
      successDescription: '200 response for list_guild_audit_log_entries',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema.exactOptional(),
        target_id: SnowflakeTypeSchema.exactOptional(),
        action_type: AuditLogActionTypesSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
      }),
    )
    .output(GuildAuditLogResponseSchema),
  getGuildsGuildIdAutoModerationRules: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/auto-moderation/rules',
      successDescription: '200 response for list_auto_moderation_rules',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            DefaultKeywordRuleResponseSchema,
            KeywordRuleResponseSchema,
            MLSpamRuleResponseSchema,
            MentionSpamRuleResponseSchema,
            UserProfileRuleResponseSchema,
            z.null(),
          ]),
        )
        .nullable(),
    ),
  postGuildsGuildIdAutoModerationRules: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/auto-moderation/rules',
      successDescription: '200 response for create_auto_moderation_rule',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
      ]),
    ),
  getGuildsGuildIdAutoModerationRulesRuleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
      successDescription: '200 response for get_auto_moderation_rule',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
      ]),
    ),
  deleteGuildsGuildIdAutoModerationRulesRuleId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
      successStatus: 204,
      successDescription: '204 response for delete_auto_moderation_rule',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdAutoModerationRulesRuleId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
      successDescription: '200 response for update_auto_moderation_rule',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
      ]),
    ),
  getGuildsGuildIdBans: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/bans',
      successDescription: '200 response for list_guild_bans',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(1000),
          )
          .exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(GuildBanResponseSchema).nullable()),
  getGuildsGuildIdBansUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successDescription: '200 response for get_guild_ban',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildBanResponseSchema),
  putGuildsGuildIdBansUserId: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successStatus: 204,
      successDescription: '204 response for ban_user_from_guild',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
        delete_message_days: z.int().min(0).max(7).nullable().exactOptional(),
      }),
    ),
  deleteGuildsGuildIdBansUserId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successStatus: 204,
      successDescription: '204 response for unban_user_from_guild',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postGuildsGuildIdBulkBan: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/bulk-ban',
      successDescription: '200 response for bulk_ban_users_from_guild',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_ids: z
          .array(SnowflakeTypeSchema)
          .max(200)
          .refine((val) => new Set(val).size === val.length),
        delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
      }),
    )
    .output(BulkBanUsersResponseSchema),
  getGuildsGuildIdChannels: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/channels',
      successDescription: '200 response for list_guild_channels',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        )
        .nullable(),
    ),
  postGuildsGuildIdChannels: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/channels',
      successStatus: 201,
      successDescription: '201 response for create_guild_channel',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        type: z.xor([z.null(), ChannelTypesSchema]).exactOptional(),
        name: z.string().min(1).max(100),
        position: z.int32().min(0).nullable().exactOptional(),
        topic: z.string().min(0).max(4096).nullable().exactOptional(),
        bitrate: z.int32().min(8000).nullable().exactOptional(),
        user_limit: z.int32().min(0).nullable().exactOptional(),
        nsfw: z.boolean().nullable().exactOptional(),
        rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
        parent_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        permission_overwrites: z
          .array(ChannelPermissionOverwriteRequestSchema)
          .max(100)
          .nullable()
          .exactOptional(),
        rtc_region: z.string().nullable().exactOptional(),
        video_quality_mode: z.xor([z.null(), VideoQualityModesSchema]).exactOptional(),
        default_auto_archive_duration: z
          .xor([z.null(), ThreadAutoArchiveDurationSchema])
          .exactOptional(),
        default_reaction_emoji: z
          .xor([z.null(), UpdateDefaultReactionEmojiRequestSchema])
          .exactOptional(),
        default_thread_rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
        default_sort_order: z.xor([z.null(), ThreadSortOrderSchema]).exactOptional(),
        default_forum_layout: z.xor([z.null(), ForumLayoutSchema]).exactOptional(),
        default_tag_setting: z.xor([z.null(), ThreadSearchTagSettingSchema]).exactOptional(),
        available_tags: z
          .array(z.xor([z.null(), CreateOrUpdateThreadTagRequestSchema]))
          .max(20)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(GuildChannelResponseSchema),
  patchGuildsGuildIdChannels: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/channels',
      successStatus: 204,
      successDescription: '204 response for bulk_update_guild_channels',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema })),
  getGuildsGuildIdEmojis: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/emojis',
      successDescription: '200 response for list_guild_emojis',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(EmojiResponseSchema).nullable()),
  postGuildsGuildIdEmojis: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/emojis',
      successStatus: 201,
      successDescription: '201 response for create_guild_emoji',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32),
        image: z.string(),
        roles: z
          .array(z.xor([z.null(), SnowflakeTypeSchema]))
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(EmojiResponseSchema),
  getGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successDescription: '200 response for get_guild_emoji',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema),
  deleteGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_emoji',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successDescription: '200 response for update_guild_emoji',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32).exactOptional(),
        roles: z
          .array(z.xor([z.null(), SnowflakeTypeSchema]))
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(EmojiResponseSchema),
  putGuildsGuildIdIncidentActions: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/incident-actions',
      description: 'Modifies the incident actions of the guild',
      successDescription: '200 response for update_guild_incident_actions',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        invites_disabled_until: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'When invites will be enabled again' })
          .exactOptional(),
        dms_disabled_until: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'When direct messages will be enabled again' })
          .exactOptional(),
      }),
    )
    .output(GuildIncidentsDataResponseSchema),
  getGuildsGuildIdIntegrations: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/integrations',
      successDescription: '200 response for list_guild_integrations',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            DiscordIntegrationResponseSchema,
            ExternalConnectionIntegrationResponseSchema,
            GuildSubscriptionIntegrationResponseSchema,
          ]),
        )
        .nullable(),
    ),
  deleteGuildsGuildIdIntegrationsIntegrationId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/integrations/{integration_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_integration',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema })),
  getGuildsGuildIdInvites: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/invites',
      successDescription: '200 response for list_guild_invites',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            z.null(),
          ]),
        )
        .nullable(),
    ),
  getGuildsGuildIdMembers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/members',
      successDescription: '200 response for list_guild_members',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(1000),
          )
          .exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(GuildMemberResponseSchema)),
  patchGuildsGuildIdMembersMe: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/members/@me',
      successDescription: '200 response for update_my_guild_member',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        nick: z.string().max(32).nullable().exactOptional(),
        avatar: z.string().nullable().exactOptional(),
        bio: z.string().max(300).nullable().exactOptional(),
        banner: z.string().nullable().exactOptional(),
      }),
    )
    .output(PrivateGuildMemberResponseSchema),
  getGuildsGuildIdMembersSearch: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/members/search',
      successDescription: '200 response for search_guild_members',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(1000),
          )
          .exactOptional(),
        query: z.string().min(1).max(100),
      }),
    )
    .output(z.array(GuildMemberResponseSchema)),
  getGuildsGuildIdMembersUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/members/{user_id}',
      successDescription: '200 response for get_guild_member',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildMemberResponseSchema),
  putGuildsGuildIdMembersUserId: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/members/{user_id}',
      successStatus: 201,
      successDescription: '201 response for add_guild_member',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: z.string().max(32).nullable().exactOptional(),
        roles: z
          .array(SnowflakeTypeSchema)
          .max(250)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        mute: z.boolean().nullable().exactOptional(),
        deaf: z.boolean().nullable().exactOptional(),
        access_token: z.string().max(10240),
        flags: z.int().nullable().exactOptional(),
      }),
    )
    .output(GuildMemberResponseSchema),
  deleteGuildsGuildIdMembersUserId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/members/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_member',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdMembersUserId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/members/{user_id}',
      successDescription: '200 response for update_guild_member',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: z.string().max(32).nullable().exactOptional(),
        roles: z
          .array(z.xor([z.null(), SnowflakeTypeSchema]))
          .max(350)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        mute: z.boolean().nullable().exactOptional(),
        deaf: z.boolean().nullable().exactOptional(),
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        communication_disabled_until: z.iso.datetime({ offset: true }).nullable().exactOptional(),
        flags: z.int().nullable().exactOptional(),
      }),
    )
    .output(GuildMemberResponseSchema),
  putGuildsGuildIdMembersUserIdRolesRoleId: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
      successStatus: 204,
      successDescription: '204 response for add_guild_member_role',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
  deleteGuildsGuildIdMembersUserIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_member_role',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
  getGuildsGuildIdMessagesSearch: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/messages/search',
      successDescription: '200 response for guild_search',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        sort_by: SortingModeSchema.exactOptional(),
        sort_order: SortingOrderSchema.exactOptional(),
        content: z.string().max(1024).exactOptional(),
        slop: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        author_id: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SnowflakeTypeSchema)
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        author_type: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(AuthorTypeSchema)
              .max(6)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        mentions: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SnowflakeTypeSchema)
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        mentions_role_id: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SnowflakeTypeSchema)
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        replied_to_user_id: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SnowflakeTypeSchema)
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        replied_to_message_id: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SnowflakeTypeSchema)
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        mention_everyone: z.stringbool().exactOptional(),
        min_id: SnowflakeTypeSchema.exactOptional(),
        max_id: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(25),
          )
          .exactOptional(),
        offset: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(9975),
          )
          .exactOptional(),
        has: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(HasOptionSchema)
              .max(18)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        link_hostname: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(z.string().max(256))
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        embed_provider: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(z.string().max(256))
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        embed_type: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SearchableEmbedTypeSchema)
              .max(5)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        attachment_extension: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(z.string().max(256))
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        attachment_filename: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(z.string().max(1024))
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        pinned: z.stringbool().exactOptional(),
        include_nsfw: z.stringbool().exactOptional(),
        channel_id: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SnowflakeTypeSchema)
              .max(500)
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
      }),
    )
    .output(GuildSearchResponseSchema),
  getGuildsGuildIdNewMemberWelcome: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/new-member-welcome',
      successDescription: '200 response for get_guild_new_member_welcome',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildHomeSettingsResponseSchema),
  getGuildsGuildIdOnboarding: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/onboarding',
      successDescription: '200 response for get_guilds_onboarding',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(UserGuildOnboardingResponseSchema),
  putGuildsGuildIdOnboarding: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/onboarding',
      successDescription: '200 response for put_guilds_onboarding',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        prompts: z.array(UpdateOnboardingPromptRequestSchema).max(15).nullable().exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
        default_channel_ids: z
          .array(SnowflakeTypeSchema)
          .max(500)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        mode: z.xor([z.null(), GuildOnboardingModeSchema]).exactOptional(),
      }),
    )
    .output(GuildOnboardingResponseSchema),
  getGuildsGuildIdPermissionsMemberUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/permissions/member/{user_id}',
      description:
        "Returns the fully cascaded guild-level permissions for a member, applying all of their roles including @everyone's",
      successDescription: '200 response for get_guild_member_permissions',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema),
  getGuildsGuildIdPermissionsRoleRoleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/permissions/role/{role_id}',
      description:
        "Returns the permissions a role grants at the guild level, combining the role's own permissions with @everyone's.",
      successDescription: '200 response for get_guild_role_permissions',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema),
  getGuildsGuildIdPreview: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/preview',
      successDescription: '200 response for get_guild_preview',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildPreviewResponseSchema),
  getGuildsGuildIdPrune: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/prune',
      successDescription: '200 response for preview_prune_guild',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        days: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(30),
          )
          .exactOptional(),
        include_roles: z
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
      }),
    )
    .output(GuildPruneResponseSchema),
  postGuildsGuildIdPrune: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/prune',
      successDescription: '200 response for prune_guild',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        days: z.int().min(1).max(30).nullable().exactOptional(),
        compute_prune_count: z.boolean().nullable().exactOptional(),
        include_roles: z
          .xor([
            z.string(),
            z
              .array(SnowflakeTypeSchema)
              .max(100)
              .refine((val) => new Set(val).size === val.length),
            z.null(),
          ])
          .exactOptional(),
      }),
    )
    .output(GuildPruneResponseSchema),
  getGuildsGuildIdRegions: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/regions',
      successDescription: '200 response for list_guild_voice_regions',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(VoiceRegionResponseSchema).nullable()),
  getGuildsGuildIdRequests: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/requests',
      description: 'List join requests for guild, optionally filtered by application status',
      successDescription: '200 response for get_guild_join_requests',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        status: GuildJoinRequestApplicationStatusSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(GuildJoinRequestsListResponseSchema),
  patchGuildsGuildIdRequestsRequestId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/requests/{request_id}',
      description: 'Approve or reject guild join request',
      successDescription: '200 response for action_guild_join_request',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        request_id: SnowflakeTypeSchema,
        action: GuildJoinRequestApplicationStatusSchema.meta({
          description: 'Whether to approve or reject the join request',
        }).exactOptional(),
        rejection_reason: z
          .string()
          .max(160)
          .nullable()
          .meta({ description: 'Reason for rejection. Only used when action is REJECTED' })
          .exactOptional(),
      }),
    )
    .output(GuildJoinRequestResponseSchema),
  getGuildsGuildIdRoles: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for list_guild_roles',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(GuildRoleResponseSchema)),
  postGuildsGuildIdRoles: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for create_guild_role',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100).nullable().exactOptional(),
        permissions: z.int().nullable().exactOptional(),
        color: z.int().min(0).max(16777215).nullable().exactOptional(),
        colors: z.xor([z.null(), RoleColorsSchema]).exactOptional(),
        hoist: z.boolean().nullable().exactOptional(),
        mentionable: z.boolean().nullable().exactOptional(),
        icon: z.string().nullable().exactOptional(),
        unicode_emoji: z.string().max(100).nullable().exactOptional(),
      }),
    )
    .output(GuildRoleResponseSchema),
  patchGuildsGuildIdRoles: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for bulk_update_guild_roles',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(GuildRoleResponseSchema)),
  getGuildsGuildIdRolesMemberCounts: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles/member-counts',
      successDescription: '200 response for guild_role_member_counts',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.record(z.string(), z.int32())),
  getGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successDescription: '200 response for get_guild_role',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(GuildRoleResponseSchema),
  deleteGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_role',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successDescription: '200 response for update_guild_role',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100).nullable().exactOptional(),
        permissions: z.int().nullable().exactOptional(),
        color: z.int().min(0).max(16777215).nullable().exactOptional(),
        colors: z.xor([z.null(), RoleColorsSchema]).exactOptional(),
        hoist: z.boolean().nullable().exactOptional(),
        mentionable: z.boolean().nullable().exactOptional(),
        icon: z.string().nullable().exactOptional(),
        unicode_emoji: z.string().max(100).nullable().exactOptional(),
      }),
    )
    .output(GuildRoleResponseSchema),
  getGuildsGuildIdScheduledEvents: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events',
      successDescription: '200 response for list_guild_scheduled_events',
    })
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, with_user_count: z.stringbool().exactOptional() }),
    )
    .output(
      z
        .array(
          z.xor([
            ExternalScheduledEventResponseSchema,
            StageScheduledEventResponseSchema,
            VoiceScheduledEventResponseSchema,
          ]),
        )
        .nullable(),
    ),
  postGuildsGuildIdScheduledEvents: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/scheduled-events',
      successDescription: '200 response for create_guild_scheduled_event',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    ),
  getGuildsGuildIdScheduledEventsGuildScheduledEventId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
      successDescription: '200 response for get_guild_scheduled_event',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_user_count: z.stringbool().exactOptional(),
      }),
    )
    .output(
      z.xor([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    ),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_scheduled_event',
    })
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
      successDescription: '200 response for update_guild_scheduled_event',
    })
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    )
    .output(
      z.xor([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    ),
  postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions',
      description: 'Create an exception to a recurring guild scheduled event',
      successDescription: '200 response for create_guild_scheduled_event_exception',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        scheduled_start_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden start time of this occurrence' })
          .exactOptional(),
        scheduled_end_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden end time of this occurrence' })
          .exactOptional(),
        original_scheduled_start_time: z.iso
          .datetime({ offset: true })
          .meta({
            description: 'The original start time of the occurrence to create an exception for',
          }),
        is_canceled: z
          .boolean()
          .nullable()
          .meta({ description: 'Whether this occurrence is canceled' })
          .exactOptional(),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
      description: 'Delete an exception to a recurring guild scheduled event',
      successStatus: 204,
      successDescription: '204 response for delete_guild_scheduled_event_exception',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
      description: 'Modify an exception to a recurring guild scheduled event',
      successDescription: '200 response for update_guild_scheduled_event_exception',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
        scheduled_start_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden start time of this occurrence' })
          .exactOptional(),
        scheduled_end_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden end time of this occurrence' })
          .exactOptional(),
        is_canceled: z
          .boolean()
          .nullable()
          .meta({ description: 'Whether this occurrence is canceled' })
          .exactOptional(),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
      successDescription: '200 response for list_guild_scheduled_event_users',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_member: z.stringbool().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(ScheduledEventUserResponseSchema).nullable()),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
      description: 'Get the count of users subscribed to a guild scheduled event',
      successDescription: '200 response for count_guild_scheduled_event_users',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(SnowflakeTypeSchema).max(10),
          )
          .exactOptional(),
      }),
    )
    .output(ScheduledEventUserCountResponseSchema),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/{guild_scheduled_event_exception_id}/users',
      description: 'Get a list of users subscribed to a guild scheduled event exception',
      successDescription: '200 response for list_guild_scheduled_event_exception_users',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        with_member: z.stringbool().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(ScheduledEventUserResponseSchema).nullable()),
  getGuildsGuildIdSoundboardSounds: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/soundboard-sounds',
      successDescription: '200 response for list_guild_soundboard_sounds',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(ListGuildSoundboardSoundsResponseSchema),
  postGuildsGuildIdSoundboardSounds: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/soundboard-sounds',
      successStatus: 201,
      successDescription: '201 response for create_guild_soundboard_sound',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32),
        volume: z.number().min(0).max(1).nullable().exactOptional(),
        emoji_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
        sound: z.string(),
      }),
    )
    .output(SoundboardSoundResponseSchema),
  getGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successDescription: '200 response for get_guild_soundboard_sound',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .output(SoundboardSoundResponseSchema),
  deleteGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_soundboard_sound',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successDescription: '200 response for update_guild_soundboard_sound',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32).exactOptional(),
        volume: z.number().min(0).max(1).nullable().exactOptional(),
        emoji_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
      }),
    )
    .output(SoundboardSoundResponseSchema),
  getGuildsGuildIdStickers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/stickers',
      successDescription: '200 response for list_guild_stickers',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(GuildStickerResponseSchema)),
  postGuildsGuildIdStickers: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/stickers',
      successStatus: 201,
      successDescription: '201 response for create_guild_sticker',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema),
  getGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successDescription: '200 response for get_guild_sticker',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema),
  deleteGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_sticker',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successDescription: '200 response for update_guild_sticker',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        sticker_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(30).exactOptional(),
        tags: z.string().min(1).max(200).exactOptional(),
        description: z.string().max(100).nullable().exactOptional(),
      }),
    )
    .output(GuildStickerResponseSchema),
  getGuildsGuildIdTemplates: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/templates',
      successDescription: '200 response for list_guild_templates',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(GuildTemplateResponseSchema).nullable()),
  postGuildsGuildIdTemplates: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/templates',
      successDescription: '200 response for create_guild_template',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100),
        description: z.string().max(120).nullable().exactOptional(),
      }),
    )
    .output(GuildTemplateResponseSchema),
  putGuildsGuildIdTemplatesCode: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/templates/{code}',
      successDescription: '200 response for sync_guild_template',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) }))
    .output(GuildTemplateResponseSchema),
  deleteGuildsGuildIdTemplatesCode: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/templates/{code}',
      successDescription: '200 response for delete_guild_template',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) }))
    .output(GuildTemplateResponseSchema),
  patchGuildsGuildIdTemplatesCode: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/templates/{code}',
      successDescription: '200 response for update_guild_template',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        code: z.string().max(152133),
        name: z.string().min(1).max(100).exactOptional(),
        description: z.string().max(120).nullable().exactOptional(),
      }),
    )
    .output(GuildTemplateResponseSchema),
  getGuildsGuildIdThreadsActive: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/threads/active',
      successDescription: '200 response for get_active_guild_threads',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(ThreadsResponseSchema),
  getGuildsGuildIdVanityUrl: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/vanity-url',
      successDescription: '200 response for get_guild_vanity_url',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(VanityURLResponseSchema),
  getGuildsGuildIdVoiceStatesMe: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/voice-states/@me',
      successDescription: '200 response for get_self_voice_state',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema),
  patchGuildsGuildIdVoiceStatesMe: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/voice-states/@me',
      successStatus: 204,
      successDescription: '204 response for update_self_voice_state',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        request_to_speak_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
        suppress: z.boolean().nullable().exactOptional(),
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      }),
    ),
  getGuildsGuildIdVoiceStatesUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/voice-states/{user_id}',
      successDescription: '200 response for get_voice_state',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema),
  patchGuildsGuildIdVoiceStatesUserId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/voice-states/{user_id}',
      successStatus: 204,
      successDescription: '204 response for update_voice_state',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        suppress: z.boolean().nullable().exactOptional(),
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      }),
    ),
  getGuildsGuildIdWebhooks: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/webhooks',
      successDescription: '200 response for get_guild_webhooks',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        )
        .nullable(),
    ),
  getGuildsGuildIdWelcomeScreen: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/welcome-screen',
      successDescription: '200 response for get_guild_welcome_screen',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildWelcomeScreenResponseSchema),
  patchGuildsGuildIdWelcomeScreen: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/welcome-screen',
      successDescription: '200 response for update_guild_welcome_screen',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        description: z.string().max(140).nullable().exactOptional(),
        welcome_channels: z.array(GuildWelcomeChannelSchema).max(5).nullable().exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(GuildWelcomeScreenResponseSchema),
  getGuildsGuildIdWidget: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget',
      successDescription: '200 response for get_guild_widget_settings',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetSettingsResponseSchema),
  patchGuildsGuildIdWidget: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/widget',
      successDescription: '200 response for update_guild_widget_settings',
    })
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(WidgetSettingsResponseSchema),
  getGuildsGuildIdWidgetJson: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget.json',
      successDescription: '200 response for get_guild_widget',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetResponseSchema),
  getGuildsGuildIdWidgetPng: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget.png',
      successDescription: '200 response for get_guild_widget_png',
    })
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, style: WidgetImageStylesSchema.exactOptional() }),
    ),
  postInteractionsInteractionIdInteractionTokenCallback: oc
    .route({
      method: 'POST',
      path: '/interactions/{interaction_id}/{interaction_token}/callback',
      successDescription: '200 response for create_interaction_response',
    })
    .input(
      z.object({
        interaction_id: SnowflakeTypeSchema,
        interaction_token: z.string().max(152133),
        with_response: z.stringbool().exactOptional(),
      }),
    )
    .output(InteractionCallbackResponseSchema),
  getInvitesCode: oc
    .route({
      method: 'GET',
      path: '/invites/{code}',
      successDescription: '200 response for invite_resolve',
    })
    .input(
      z.object({
        code: z.string().max(152133),
        with_counts: z.stringbool().exactOptional(),
        guild_scheduled_event_id: SnowflakeTypeSchema.exactOptional(),
        target_channel_id: SnowflakeTypeSchema.exactOptional(),
        target_message_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(
      z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    ),
  deleteInvitesCode: oc
    .route({
      method: 'DELETE',
      path: '/invites/{code}',
      successDescription: '200 response for invite_revoke',
    })
    .input(z.object({ code: z.string().max(152133) }))
    .output(
      z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    ),
  getInvitesCodeTargetUsers: oc
    .route({
      method: 'GET',
      path: '/invites/{code}/target-users',
      description: 'Get the target users for an invite.',
      successDescription: '200 response for get_invite_target_users',
    })
    .input(z.object({ code: z.string().max(152133) })),
  putInvitesCodeTargetUsers: oc
    .route({
      method: 'PUT',
      path: '/invites/{code}/target-users',
      description: 'Update the target users for an existing invite.',
      successStatus: 204,
      successDescription: '204 response for update_invite_target_users',
    })
    .input(z.object({ code: z.string().max(152133) })),
  postInvitesCodeTargetUsersBulkAdd: oc
    .route({
      method: 'POST',
      path: '/invites/{code}/target-users/bulk-add',
      description: 'Add multiple target users to an existing invite.',
      successStatus: 204,
      successDescription: '204 response for bulk_add_invite_target_users',
    })
    .input(
      z.object({
        code: z.string().max(152133),
        user_ids: z
          .array(SnowflakeTypeSchema)
          .min(1)
          .max(1000)
          .meta({ description: 'The IDs of the users to target.' }),
      }),
    ),
  postInvitesCodeTargetUsersBulkDelete: oc
    .route({
      method: 'POST',
      path: '/invites/{code}/target-users/bulk-delete',
      description: 'Remove multiple target users from an existing invite.',
      successStatus: 204,
      successDescription: '204 response for bulk_remove_invite_target_users',
    })
    .input(
      z.object({
        code: z.string().max(152133),
        user_ids: z
          .array(SnowflakeTypeSchema)
          .min(1)
          .max(1000)
          .meta({ description: 'The IDs of the users to stop targeting.' }),
      }),
    ),
  getInvitesCodeTargetUsersJobStatus: oc
    .route({
      method: 'GET',
      path: '/invites/{code}/target-users/job-status',
      description: 'Get the target users job status for an invite.',
      successDescription: '200 response for get_invite_target_users_job_status',
    })
    .input(z.object({ code: z.string().max(152133) }))
    .output(TargetUsersJobStatusResponseSchema),
  putInvitesCodeTargetUsersUserId: oc
    .route({
      method: 'PUT',
      path: '/invites/{code}/target-users/{user_id}',
      description: 'Add a target user to an existing invite.',
      successStatus: 204,
      successDescription: '204 response for add_invite_target_user',
    })
    .input(z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema })),
  deleteInvitesCodeTargetUsersUserId: oc
    .route({
      method: 'DELETE',
      path: '/invites/{code}/target-users/{user_id}',
      description: 'Remove a target user from an existing invite.',
      successStatus: 204,
      successDescription: '204 response for remove_invite_target_user',
    })
    .input(z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema })),
  postLobbies: oc
    .route({
      method: 'POST',
      path: '/lobbies',
      successStatus: 201,
      successDescription: '201 response for create_lobby',
    })
    .input(
      z.object({
        idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
        members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
        metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
        name: z.string().min(1).max(100).nullable().exactOptional(),
      }),
    )
    .output(LobbyResponseSchema),
  putLobbies: oc
    .route({
      method: 'PUT',
      path: '/lobbies',
      successDescription: '200 response for create_or_join_lobby',
    })
    .input(
      z.object({
        idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
        lobby_metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        member_metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        secret: z.string().max(250),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        name: z.string().min(1).max(100).nullable().exactOptional(),
      }),
    )
    .output(LobbyResponseSchema),
  getLobbiesLobbyId: oc
    .route({
      method: 'GET',
      path: '/lobbies/{lobby_id}',
      successDescription: '200 response for get_lobby',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyResponseSchema),
  deleteLobbiesLobbyId: oc
    .route({
      method: 'DELETE',
      path: '/lobbies/{lobby_id}',
      description:
        'Deletes the specified lobby if it exists. It is safe to call even if the lobby is already deleted.',
      successStatus: 204,
      successDescription: '204 response for delete_lobby',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema })),
  patchLobbiesLobbyId: oc
    .route({
      method: 'PATCH',
      path: '/lobbies/{lobby_id}',
      successDescription: '200 response for edit_lobby',
    })
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
        metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
        name: z.string().min(1).max(100).nullable().exactOptional(),
      }),
    )
    .output(LobbyResponseSchema),
  patchLobbiesLobbyIdChannelLinking: oc
    .route({
      method: 'PATCH',
      path: '/lobbies/{lobby_id}/channel-linking',
      successDescription: '200 response for edit_lobby_channel_link',
    })
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      }),
    )
    .output(LobbyResponseSchema),
  deleteLobbiesLobbyIdMembersMe: oc
    .route({
      method: 'DELETE',
      path: '/lobbies/{lobby_id}/members/@me',
      successStatus: 204,
      successDescription: '204 response for leave_lobby',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema })),
  postLobbiesLobbyIdMembersMeInvites: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/@me/invites',
      successDescription: '200 response for create_linked_lobby_guild_invite_for_self',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema),
  postLobbiesLobbyIdMembersBulk: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/bulk',
      successDescription: '200 response for bulk_update_lobby_members',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema }))
    .output(z.array(LobbyMemberResponseSchema).nullable()),
  putLobbiesLobbyIdMembersUserId: oc
    .route({
      method: 'PUT',
      path: '/lobbies/{lobby_id}/members/{user_id}',
      successDescription: '200 response for add_lobby_member',
    })
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        additional_name: z.string().min(1).max(80).nullable().exactOptional(),
      }),
    )
    .output(LobbyMemberResponseSchema),
  deleteLobbiesLobbyIdMembersUserId: oc
    .route({
      method: 'DELETE',
      path: '/lobbies/{lobby_id}/members/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_lobby_member',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postLobbiesLobbyIdMembersUserIdInvites: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/{user_id}/invites',
      successDescription: '200 response for create_linked_lobby_guild_invite_for_user',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema),
  getLobbiesLobbyIdMessages: oc
    .route({
      method: 'GET',
      path: '/lobbies/{lobby_id}/messages',
      successDescription: '200 response for get_lobby_messages',
    })
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(200),
          )
          .exactOptional(),
      }),
    )
    .output(z.array(LobbyMessageResponseSchema).nullable()),
  postLobbiesLobbyIdMessages: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/messages',
      successStatus: 201,
      successDescription: '201 response for create_lobby_message',
    })
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
        allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
        sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
        components: z
          .array(
            z.xor([
              ActionRowComponentForMessageRequestSchema,
              ContainerComponentForMessageRequestSchema,
              FileComponentForMessageRequestSchema,
              MediaGalleryComponentForMessageRequestSchema,
              SectionComponentForMessageRequestSchema,
              SeparatorComponentForMessageRequestSchema,
              TextDisplayComponentForMessageRequestSchema,
            ]),
          )
          .max(40)
          .nullable()
          .exactOptional(),
        flags: z.int().nullable().exactOptional(),
        attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
        poll: z.xor([z.null(), PollCreateRequestSchema]).exactOptional(),
        shared_client_theme: z.xor([z.null(), CustomClientThemeShareRequestSchema]).exactOptional(),
        message_reference: z.xor([z.null(), MessageReferenceRequestSchema]).exactOptional(),
        nonce: z
          .xor([
            z
              .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
              .transform((val) => BigInt(val))
              .pipe(z.int64().min(-9223372036854775808n).max(9223372036854775808n)),
            z.string().max(25),
            z.null(),
          ])
          .exactOptional(),
        enforce_nonce: z.boolean().nullable().exactOptional(),
        tts: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(LobbyMessageResponseSchema),
  putLobbiesLobbyIdMessagesMessageIdModerationMetadata: oc
    .route({
      method: 'PUT',
      path: '/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata',
      description: 'Update the external moderation metadata for a lobby message.',
      successStatus: 204,
      successDescription: '204 response for update_lobby_message_external_moderation_metadata',
    })
    .input(z.object({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getOauth2Me: oc
    .route({
      method: 'GET',
      path: '/oauth2/@me',
      successDescription: '200 response for get_my_oauth2_authorization',
    })
    .output(OAuth2GetAuthorizationResponseSchema),
  getOauth2ApplicationsMe: oc
    .route({
      method: 'GET',
      path: '/oauth2/applications/@me',
      successDescription: '200 response for get_my_oauth2_application',
    })
    .output(PrivateApplicationResponseSchema),
  getOauth2Keys: oc
    .route({
      method: 'GET',
      path: '/oauth2/keys',
      successDescription: '200 response for get_public_keys',
    })
    .output(OAuth2GetKeysSchema),
  getOauth2Userinfo: oc
    .route({
      method: 'GET',
      path: '/oauth2/userinfo',
      successDescription: '200 response for get_openid_connect_userinfo',
    })
    .output(OAuth2GetOpenIDConnectUserInfoResponseSchema),
  putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata: oc
    .route({
      method: 'PUT',
      path: '/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata',
      description: 'Update the external moderation metadata for a user message (DM).',
      successStatus: 204,
      successDescription: '204 response for update_user_message_external_moderation_metadata',
    })
    .input(
      z.object({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
      }),
    ),
  postPartnerSdkProvisionalAccountsUnmerge: oc
    .route({
      method: 'POST',
      path: '/partner-sdk/provisional-accounts/unmerge',
      successStatus: 204,
      successDescription: '204 response for partner_sdk_unmerge_provisional_account',
    })
    .input(
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
  postPartnerSdkProvisionalAccountsUnmergeBot: oc
    .route({
      method: 'POST',
      path: '/partner-sdk/provisional-accounts/unmerge/bot',
      successStatus: 204,
      successDescription: '204 response for bot_partner_sdk_unmerge_provisional_account',
    })
    .input(z.object({ external_user_id: z.string().min(1).max(1024) })),
  postPartnerSdkToken: oc
    .route({
      method: 'POST',
      path: '/partner-sdk/token',
      successDescription: '200 response for partner_sdk_token',
    })
    .input(
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    )
    .output(ProvisionalTokenResponseSchema),
  postPartnerSdkTokenBot: oc
    .route({
      method: 'POST',
      path: '/partner-sdk/token/bot',
      successDescription: '200 response for bot_partner_sdk_token',
    })
    .input(
      z.object({
        provisional_user_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        external_user_id: z.string().min(1).max(1024),
        preferred_global_name: z.string().min(1).max(32).nullable().exactOptional(),
      }),
    )
    .output(ProvisionalTokenResponseSchema),
  getSkusSkuIdSubscriptions: oc
    .route({
      method: 'GET',
      path: '/skus/{sku_id}/subscriptions',
      description: 'Returns all subscriptions containing the SKU, filtered by user.',
      successDescription: '200 response for get_sku_subscriptions',
    })
    .input(
      z.object({
        sku_id: SnowflakeTypeSchema,
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        user_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(SubscriptionResponseSchema)),
  getSkusSkuIdSubscriptionsSubscriptionId: oc
    .route({
      method: 'GET',
      path: '/skus/{sku_id}/subscriptions/{subscription_id}',
      description: 'Get a subscription by its ID.',
      successDescription: '200 response for get_sku_subscription',
    })
    .input(
      z.object({
        sku_id: SnowflakeTypeSchema,
        subscription_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(SubscriptionResponseSchema),
  getSoundboardDefaultSounds: oc
    .route({
      method: 'GET',
      path: '/soundboard-default-sounds',
      successDescription: '200 response for get_soundboard_default_sounds',
    })
    .output(z.array(SoundboardSoundResponseSchema)),
  postStageInstances: oc
    .route({
      method: 'POST',
      path: '/stage-instances',
      successDescription: '200 response for create_stage_instance',
    })
    .input(
      z.object({
        topic: z.string().min(1).max(120),
        channel_id: SnowflakeTypeSchema,
        privacy_level: z.xor([z.null(), StageInstancesPrivacyLevelsSchema]).exactOptional(),
        guild_scheduled_event_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        send_start_notification: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(StageInstanceResponseSchema),
  getStageInstancesChannelId: oc
    .route({
      method: 'GET',
      path: '/stage-instances/{channel_id}',
      successDescription: '200 response for get_stage_instance',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(StageInstanceResponseSchema),
  deleteStageInstancesChannelId: oc
    .route({
      method: 'DELETE',
      path: '/stage-instances/{channel_id}',
      successStatus: 204,
      successDescription: '204 response for delete_stage_instance',
    })
    .input(z.object({ channel_id: SnowflakeTypeSchema })),
  patchStageInstancesChannelId: oc
    .route({
      method: 'PATCH',
      path: '/stage-instances/{channel_id}',
      successDescription: '200 response for update_stage_instance',
    })
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        topic: z.string().min(1).max(120).exactOptional(),
        privacy_level: StageInstancesPrivacyLevelsSchema.exactOptional(),
      }),
    )
    .output(StageInstanceResponseSchema),
  getStickerPacks: oc
    .route({
      method: 'GET',
      path: '/sticker-packs',
      successDescription: '200 response for list_sticker_packs',
    })
    .output(StickerPackCollectionResponseSchema),
  getStickerPacksPackId: oc
    .route({
      method: 'GET',
      path: '/sticker-packs/{pack_id}',
      successDescription: '200 response for get_sticker_pack',
    })
    .input(z.object({ pack_id: SnowflakeTypeSchema }))
    .output(StickerPackResponseSchema),
  getStickersStickerId: oc
    .route({
      method: 'GET',
      path: '/stickers/{sticker_id}',
      successDescription: '200 response for get_sticker',
    })
    .input(z.object({ sticker_id: SnowflakeTypeSchema }))
    .output(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  getUsersMe: oc
    .route({
      method: 'GET',
      path: '/users/@me',
      successDescription: '200 response for get_my_user',
    })
    .output(UserPIIResponseSchema),
  patchUsersMe: oc
    .route({
      method: 'PATCH',
      path: '/users/@me',
      successDescription: '200 response for update_my_user',
    })
    .input(BotAccountPatchRequestSchema)
    .output(UserPIIResponseSchema),
  getUsersMeApplicationsApplicationIdEntitlements: oc
    .route({
      method: 'GET',
      path: '/users/@me/applications/{application_id}/entitlements',
      successDescription: '200 response for get_current_user_application_entitlements',
    })
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
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
        exclude_consumed: z.stringbool().exactOptional(),
      }),
    )
    .output(z.array(EntitlementResponseSchema)),
  getUsersMeApplicationsApplicationIdRoleConnection: oc
    .route({
      method: 'GET',
      path: '/users/@me/applications/{application_id}/role-connection',
      successDescription: '200 response for get_application_user_role_connection',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(ApplicationUserRoleConnectionResponseSchema),
  putUsersMeApplicationsApplicationIdRoleConnection: oc
    .route({
      method: 'PUT',
      path: '/users/@me/applications/{application_id}/role-connection',
      successDescription: '200 response for update_application_user_role_connection',
    })
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        platform_name: z.string().max(50).nullable().exactOptional(),
        platform_username: z.string().max(100).nullable().exactOptional(),
        metadata: z.record(z.string(), z.string().min(1).max(100)).nullable().exactOptional(),
      }),
    )
    .output(ApplicationUserRoleConnectionResponseSchema),
  deleteUsersMeApplicationsApplicationIdRoleConnection: oc
    .route({
      method: 'DELETE',
      path: '/users/@me/applications/{application_id}/role-connection',
      successStatus: 204,
      successDescription: '204 response for delete_application_user_role_connection',
    })
    .input(z.object({ application_id: SnowflakeTypeSchema })),
  postUsersMeChannels: oc
    .route({
      method: 'POST',
      path: '/users/@me/channels',
      successDescription: '200 response for create_dm',
    })
    .input(CreatePrivateChannelRequestSchema)
    .output(z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema])),
  getUsersMeConnections: oc
    .route({
      method: 'GET',
      path: '/users/@me/connections',
      successDescription: '200 response for list_my_connections',
    })
    .output(z.array(ConnectedAccountResponseSchema).nullable()),
  getUsersMeGuilds: oc
    .route({
      method: 'GET',
      path: '/users/@me/guilds',
      successDescription: '200 response for list_my_guilds',
    })
    .input(
      z.object({
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(200),
          )
          .exactOptional(),
        shard: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        with_counts: z.stringbool().exactOptional(),
      }),
    )
    .output(z.array(MyGuildResponseSchema).nullable()),
  deleteUsersMeGuildsGuildId: oc
    .route({
      method: 'DELETE',
      path: '/users/@me/guilds/{guild_id}',
      successStatus: 204,
      successDescription: '204 response for leave_guild',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema })),
  getUsersMeGuildsGuildIdMember: oc
    .route({
      method: 'GET',
      path: '/users/@me/guilds/{guild_id}/member',
      successDescription: '200 response for get_my_guild_member',
    })
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(PrivateGuildMemberResponseSchema),
  getUsersUserId: oc
    .route({
      method: 'GET',
      path: '/users/{user_id}',
      successDescription: '200 response for get_user',
    })
    .input(z.object({ user_id: SnowflakeTypeSchema }))
    .output(UserResponseSchema),
  getVoiceRegions: oc
    .route({
      method: 'GET',
      path: '/voice/regions',
      successDescription: '200 response for list_voice_regions',
    })
    .output(z.array(VoiceRegionResponseSchema).nullable()),
  getWebhooksWebhookId: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}',
      successDescription: '200 response for get_webhook',
    })
    .input(z.object({ webhook_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
  deleteWebhooksWebhookId: oc
    .route({
      method: 'DELETE',
      path: '/webhooks/{webhook_id}',
      successStatus: 204,
      successDescription: '204 response for delete_webhook',
    })
    .input(z.object({ webhook_id: SnowflakeTypeSchema })),
  patchWebhooksWebhookId: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}',
      successDescription: '200 response for update_webhook',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(80).exactOptional(),
        avatar: z.string().nullable().exactOptional(),
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      }),
    )
    .output(
      z.xor([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
  getWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successDescription: '200 response for get_webhook_by_token',
    })
    .input(z.object({ webhook_id: SnowflakeTypeSchema, webhook_token: z.string().max(152133) }))
    .output(
      z.xor([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
  postWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'POST',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successDescription: '200 response for execute_webhook',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        wait: z.stringbool().exactOptional(),
        thread_id: SnowflakeTypeSchema.exactOptional(),
        with_components: z.stringbool().exactOptional(),
      }),
    )
    .output(MessageResponseSchema),
  deleteWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'DELETE',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successStatus: 204,
      successDescription: '204 response for delete_webhook_by_token',
    })
    .input(z.object({ webhook_id: SnowflakeTypeSchema, webhook_token: z.string().max(152133) })),
  patchWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successDescription: '200 response for update_webhook_by_token',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        name: z.string().min(1).max(80).exactOptional(),
        avatar: z.string().nullable().exactOptional(),
      }),
    )
    .output(
      z.xor([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
  postWebhooksWebhookIdWebhookTokenGithub: oc
    .route({
      method: 'POST',
      path: '/webhooks/{webhook_id}/{webhook_token}/github',
      successStatus: 204,
      successDescription: '204 response for execute_github_compatible_webhook',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        wait: z.stringbool().exactOptional(),
        thread_id: SnowflakeTypeSchema.exactOptional(),
        action: z.string().max(152133).nullable().exactOptional(),
        ref: z.string().max(152133).nullable().exactOptional(),
        ref_type: z.string().max(152133).nullable().exactOptional(),
        comment: z.xor([z.null(), GithubCommentSchema]).exactOptional(),
        issue: z.xor([z.null(), GithubIssueSchema]).exactOptional(),
        pull_request: z.xor([z.null(), GithubIssueSchema]).exactOptional(),
        repository: z.xor([z.null(), GithubRepositorySchema]).exactOptional(),
        forkee: z.xor([z.null(), GithubRepositorySchema]).exactOptional(),
        sender: GithubUserSchema,
        member: z.xor([z.null(), GithubUserSchema]).exactOptional(),
        release: z.xor([z.null(), GithubReleaseSchema]).exactOptional(),
        head_commit: z.xor([z.null(), GithubCommitSchema]).exactOptional(),
        commits: z.array(GithubCommitSchema).max(1521).nullable().exactOptional(),
        forced: z.boolean().nullable().exactOptional(),
        compare: z.url().max(2048).nullable().exactOptional(),
        review: z.xor([z.null(), GithubReviewSchema]).exactOptional(),
        check_run: z.xor([z.null(), GithubCheckRunSchema]).exactOptional(),
        check_suite: z.xor([z.null(), GithubCheckSuiteSchema]).exactOptional(),
        discussion: z.xor([z.null(), GithubDiscussionSchema]).exactOptional(),
        answer: z.xor([z.null(), GithubCommentSchema]).exactOptional(),
      }),
    ),
  getWebhooksWebhookIdWebhookTokenMessagesOriginal: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
      successDescription: '200 response for get_original_webhook_message',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(MessageResponseSchema),
  deleteWebhooksWebhookIdWebhookTokenMessagesOriginal: oc
    .route({
      method: 'DELETE',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
      successStatus: 204,
      successDescription: '204 response for delete_original_webhook_message',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
  patchWebhooksWebhookIdWebhookTokenMessagesOriginal: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
      successDescription: '200 response for update_original_webhook_message',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        thread_id: SnowflakeTypeSchema.exactOptional(),
        with_components: z.stringbool().exactOptional(),
        content: z.string().max(2000).nullable().exactOptional(),
        embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
        allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
        components: z
          .array(
            z.xor([
              ActionRowComponentForMessageRequestSchema,
              ContainerComponentForMessageRequestSchema,
              FileComponentForMessageRequestSchema,
              MediaGalleryComponentForMessageRequestSchema,
              SectionComponentForMessageRequestSchema,
              SeparatorComponentForMessageRequestSchema,
              TextDisplayComponentForMessageRequestSchema,
            ]),
          )
          .max(40)
          .nullable()
          .exactOptional(),
        attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
        poll: z.xor([z.null(), PollCreateRequestSchema]).exactOptional(),
        flags: z.int().nullable().exactOptional(),
      }),
    )
    .output(MessageResponseSchema),
  getWebhooksWebhookIdWebhookTokenMessagesMessageId: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
      successDescription: '200 response for get_webhook_message',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        message_id: SnowflakeTypeSchema,
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(MessageResponseSchema),
  deleteWebhooksWebhookIdWebhookTokenMessagesMessageId: oc
    .route({
      method: 'DELETE',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
      successStatus: 204,
      successDescription: '204 response for delete_webhook_message',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        message_id: SnowflakeTypeSchema,
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
  patchWebhooksWebhookIdWebhookTokenMessagesMessageId: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
      successDescription: '200 response for update_webhook_message',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        message_id: SnowflakeTypeSchema,
        thread_id: SnowflakeTypeSchema.exactOptional(),
        with_components: z.stringbool().exactOptional(),
        content: z.string().max(2000).nullable().exactOptional(),
        embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
        allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
        components: z
          .array(
            z.xor([
              ActionRowComponentForMessageRequestSchema,
              ContainerComponentForMessageRequestSchema,
              FileComponentForMessageRequestSchema,
              MediaGalleryComponentForMessageRequestSchema,
              SectionComponentForMessageRequestSchema,
              SeparatorComponentForMessageRequestSchema,
              TextDisplayComponentForMessageRequestSchema,
            ]),
          )
          .max(40)
          .nullable()
          .exactOptional(),
        attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
        poll: z.xor([z.null(), PollCreateRequestSchema]).exactOptional(),
        flags: z.int().nullable().exactOptional(),
      }),
    )
    .output(MessageResponseSchema),
  postWebhooksWebhookIdWebhookTokenSlack: oc
    .route({
      method: 'POST',
      path: '/webhooks/{webhook_id}/{webhook_token}/slack',
      successDescription: '200 response for execute_slack_compatible_webhook',
    })
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        wait: z.stringbool().exactOptional(),
        thread_id: SnowflakeTypeSchema.exactOptional(),
        text: z.string().max(2000).nullable().exactOptional(),
        username: z.string().max(152133).nullable().exactOptional(),
        icon_url: z.url().max(2048).nullable().exactOptional(),
        attachments: z.array(WebhookSlackEmbedSchema).max(1521).nullable().exactOptional(),
      }),
    )
    .output(z.string().nullable()),
}
