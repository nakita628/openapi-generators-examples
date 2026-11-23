import { oc } from '@orpc/contract'
import * as v from 'valibot'
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
  ApplicationFormPartialSchema,
  ApplicationIdentityProviderAuthTypeSchema,
  ApplicationIncomingWebhookResponseSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationTypesSchema,
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
    .input(ApplicationFormPartialSchema)
    .output(PrivateApplicationResponseSchema),
  getApplicationsApplicationId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}',
      successDescription: '200 response for get_application',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(PrivateApplicationResponseSchema),
  patchApplicationsApplicationId: oc
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
            v.record(
              v.string(),
              v.union([v.null(), ApplicationIntegrationTypeConfigurationSchema]),
            ),
          ),
        ),
        event_webhooks_status: v.optional(
          v.union([v.null(), ApplicationEventWebhooksStatusSchema]),
        ),
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
    .output(PrivateApplicationResponseSchema),
  getApplicationsApplicationIdActivityInstancesInstanceId: oc
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
    .output(EmbeddedActivityInstanceSchema),
  postApplicationsApplicationIdAttachment: oc
    .route({
      method: 'POST',
      path: '/applications/{application_id}/attachment',
      successDescription: '200 response for upload_application_attachment',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(ActivitiesAttachmentResponseSchema),
  getApplicationsApplicationIdCommands: oc
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
    .output(v.nullable(v.array(ApplicationCommandResponseSchema))),
  postApplicationsApplicationIdCommands: oc
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
    .output(ApplicationCommandResponseSchema),
  putApplicationsApplicationIdCommands: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/commands',
      successDescription: '200 response for bulk_set_application_commands',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(ApplicationCommandResponseSchema))),
  getApplicationsApplicationIdCommandsCommandId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/commands/{command_id}',
      successDescription: '200 response for get_application_command',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .output(ApplicationCommandResponseSchema),
  deleteApplicationsApplicationIdCommandsCommandId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/commands/{command_id}',
      successStatus: 204,
      successDescription: '204 response for delete_application_command',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema })),
  patchApplicationsApplicationIdCommandsCommandId: oc
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
    .output(ApplicationCommandResponseSchema),
  getApplicationsApplicationIdEmojis: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/emojis',
      successDescription: '200 response for list_application_emojis',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(ListApplicationEmojisResponseSchema),
  postApplicationsApplicationIdEmojis: oc
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
    .output(EmojiResponseSchema),
  getApplicationsApplicationIdEmojisEmojiId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/emojis/{emoji_id}',
      successDescription: '200 response for get_application_emoji',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema),
  deleteApplicationsApplicationIdEmojisEmojiId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/emojis/{emoji_id}',
      successStatus: 204,
      successDescription: '204 response for delete_application_emoji',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
  patchApplicationsApplicationIdEmojisEmojiId: oc
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
    .output(EmojiResponseSchema),
  getApplicationsApplicationIdEntitlements: oc
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
    .output(v.array(EntitlementResponseSchema)),
  postApplicationsApplicationIdEntitlements: oc
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
    .output(EntitlementResponseSchema),
  getApplicationsApplicationIdEntitlementsEntitlementId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/entitlements/{entitlement_id}',
      successDescription: '200 response for get_entitlement',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .output(EntitlementResponseSchema),
  deleteApplicationsApplicationIdEntitlementsEntitlementId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/entitlements/{entitlement_id}',
      successStatus: 204,
      successDescription: '204 response for delete_entitlement',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema })),
  postApplicationsApplicationIdEntitlementsEntitlementIdConsume: oc
    .route({
      method: 'POST',
      path: '/applications/{application_id}/entitlements/{entitlement_id}/consume',
      successStatus: 204,
      successDescription: '204 response for consume_entitlement',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema })),
  getApplicationsApplicationIdGuildsGuildIdCommands: oc
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
    .output(v.nullable(v.array(ApplicationCommandResponseSchema))),
  postApplicationsApplicationIdGuildsGuildIdCommands: oc
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
    .output(ApplicationCommandResponseSchema),
  putApplicationsApplicationIdGuildsGuildIdCommands: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/guilds/{guild_id}/commands',
      successDescription: '200 response for bulk_set_guild_application_commands',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(ApplicationCommandResponseSchema))),
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissions: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
      successDescription: '200 response for list_guild_application_command_permissions',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(v.array(CommandPermissionsResponseSchema)),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
    .output(ApplicationCommandResponseSchema),
  deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
    ),
  patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
    .output(ApplicationCommandResponseSchema),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: oc
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
    .output(CommandPermissionsResponseSchema),
  putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: oc
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
    .output(CommandPermissionsResponseSchema),
  getApplicationsApplicationIdRoleConnectionsMetadata: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/role-connections/metadata',
      successDescription: '200 response for get_application_role_connections_metadata',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema))),
  putApplicationsApplicationIdRoleConnectionsMetadata: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/role-connections/metadata',
      successDescription: '200 response for update_application_role_connections_metadata',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema))),
  getChannelsChannelId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}',
      successDescription: '200 response for get_channel',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
    .output(ChannelFollowerResponseSchema),
  getChannelsChannelIdInvites: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/invites',
      successDescription: '200 response for list_channel_invites',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            v.null(),
          ]),
        ),
      ),
    ),
  postChannelsChannelIdInvites: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/invites',
      successDescription: '200 response for create_channel_invite',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    ),
  getChannelsChannelIdMessages: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages',
      successDescription: '200 response for list_messages',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        around: v.optional(SnowflakeTypeSchema),
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
      }),
    )
    .output(v.nullable(v.array(MessageResponseSchema))),
  postChannelsChannelIdMessages: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages',
      successDescription: '200 response for create_message',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
        sticker_ids: v.optional(v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(3)))),
        components: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ),
              v.maxLength(40),
            ),
          ),
        ),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        attachments: v.optional(
          v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
        ),
        poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
        shared_client_theme: v.optional(v.union([v.null(), CustomClientThemeShareRequestSchema])),
        message_reference: v.optional(v.union([v.null(), MessageReferenceRequestSchema])),
        nonce: v.optional(
          v.union([
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775808n),
            ),
            v.pipe(v.string(), v.maxCodePoints(25)),
            v.null(),
          ]),
        ),
        enforce_nonce: v.optional(v.nullable(v.boolean())),
        tts: v.optional(v.nullable(v.boolean())),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        messages: v.pipe(
          v.array(SnowflakeTypeSchema),
          v.minLength(2),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      }),
    ),
  getChannelsChannelIdMessagesPins: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/pins',
      successDescription: '200 response for list_pins',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(50),
          ),
        ),
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
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdMessagesPinsMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for delete_pin',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/{message_id}',
      successDescription: '200 response for get_message',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  deleteChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}',
      successStatus: 204,
      successDescription: '204 response for delete_message',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  patchChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'PATCH',
      path: '/channels/{channel_id}/messages/{message_id}',
      successDescription: '200 response for update_message',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
        sticker_ids: v.optional(
          v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(1521))),
        ),
        components: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ),
              v.maxLength(40),
            ),
          ),
        ),
        attachments: v.optional(
          v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
        ),
      }),
    )
    .output(MessageResponseSchema),
  postChannelsChannelIdMessagesMessageIdCrosspost: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages/{message_id}/crosspost',
      successDescription: '200 response for crosspost_message',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  deleteChannelsChannelIdMessagesMessageIdReactions: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions',
      successStatus: 204,
      successDescription: '204 response for delete_all_message_reactions',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdMessagesMessageIdReactionsEmojiName: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
      successDescription: '200 response for list_message_reactions_by_emoji',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
        type: v.optional(ReactionTypesSchema),
      }),
    )
    .output(v.array(UserResponseSchema)),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
      successStatus: 204,
      successDescription: '204 response for delete_all_message_reactions_by_emoji',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        auto_archive_duration: v.optional(v.union([v.null(), ThreadAutoArchiveDurationSchema])),
        rate_limit_per_user: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(0),
              v.maxValue(21600),
            ),
          ),
        ),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        implicit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        implicit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        overwrite_id: SnowflakeTypeSchema,
        type: v.optional(v.union([v.null(), ChannelPermissionOverwritesSchema])),
        allow: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        deny: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      }),
    ),
  deleteChannelsChannelIdPermissionsOverwriteId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/permissions/{overwrite_id}',
      successStatus: 204,
      successDescription: '204 response for delete_channel_permission_overwrite',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema })),
  getChannelsChannelIdPins: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/pins',
      successDescription: '200 response for deprecated_list_pins',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(MessageResponseSchema))),
  putChannelsChannelIdPinsMessageId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for deprecated_create_pin',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdPinsMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for deprecated_delete_pin',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdPollsMessageIdAnswersAnswerId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
      successDescription: '200 response for get_answer_voters',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.minValue(1),
          v.maxValue(10),
        ),
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
      }),
    )
    .output(PollAnswerDetailsResponseSchema),
  postChannelsChannelIdPollsMessageIdExpire: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/polls/{message_id}/expire',
      successDescription: '200 response for poll_expire',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  putChannelsChannelIdRecipientsUserId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/recipients/{user_id}',
      successStatus: 201,
      successDescription: '201 response for add_group_dm_user',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        access_token: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
      }),
    )
    .output(v.union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema])),
  deleteChannelsChannelIdRecipientsUserId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/recipients/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_group_dm_user',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postChannelsChannelIdSendSoundboardSound: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/send-soundboard-sound',
      successStatus: 204,
      successDescription: '204 response for send_soundboard_sound',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        source_guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
      }),
    ),
  getChannelsChannelIdThreadMembers: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/thread-members',
      successDescription: '200 response for list_thread_members',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        with_member: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.array(ThreadMemberResponseSchema)),
  putChannelsChannelIdThreadMembersMe: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/thread-members/@me',
      successStatus: 204,
      successDescription: '204 response for join_thread',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdThreadMembersMe: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/thread-members/@me',
      successStatus: 204,
      successDescription: '204 response for leave_thread',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema })),
  getChannelsChannelIdThreadMembersUserId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/thread-members/{user_id}',
      successDescription: '200 response for get_thread_member',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        with_member: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
    .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdThreadMembersUserId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/thread-members/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_thread_member',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postChannelsChannelIdThreads: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/threads',
      successStatus: 201,
      successDescription: '201 response for create_thread',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(CreatedThreadResponseSchema),
  getChannelsChannelIdThreadsArchivedPrivate: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/threads/archived/private',
      successDescription: '200 response for list_private_archived_threads',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(2),
            v.maxValue(100),
          ),
        ),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(2),
            v.maxValue(100),
          ),
        ),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.maxCodePoints(100))),
        slop: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
        ),
        min_id: v.optional(SnowflakeTypeSchema),
        max_id: v.optional(SnowflakeTypeSchema),
        tag: v.optional(
          v.union([
            v.string(),
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(SnowflakeTypeSchema),
              v.maxLength(20),
              v.check((input) => new Set(input).size === input.length),
            ),
          ]),
        ),
        tag_setting: v.optional(ThreadSearchTagSettingSchema),
        archived: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        sort_by: v.optional(ThreadSortingModeSchema),
        sort_order: v.optional(SortingOrderSchema),
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(25),
          ),
        ),
        offset: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(9975),
          ),
        ),
      }),
    )
    .output(ThreadSearchResponseSchema),
  postChannelsChannelIdTyping: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/typing',
      successDescription: '200 response for trigger_typing_indicator',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(TypingIndicatorResponseSchema),
  getChannelsChannelIdUsersMeThreadsArchivedPrivate: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/users/@me/threads/archived/private',
      successDescription: '200 response for list_my_private_archived_threads',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(SnowflakeTypeSchema),
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(2),
            v.maxValue(100),
          ),
        ),
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        status: v.optional(
          v.pipe(
            v.nullable(v.pipe(v.string(), v.maxCodePoints(500))),
            v.description('The new voice channel status'),
          ),
        ),
      }),
    ),
  getChannelsChannelIdWebhooks: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/webhooks',
      successDescription: '200 response for list_channel_webhooks',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        ),
      ),
    ),
  postChannelsChannelIdWebhooks: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/webhooks',
      successDescription: '200 response for create_webhook',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80)),
        avatar: v.optional(v.nullable(v.string())),
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
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .output(GuildTemplateResponseSchema),
  getGuildsGuildId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}',
      successDescription: '200 response for get_guild',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        with_counts: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
      }),
    )
    .output(GuildWithCountsResponseSchema),
  patchGuildsGuildId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}',
      successDescription: '200 response for update_guild',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(100))),
        description: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(300))),
        ),
        region: v.optional(v.nullable(v.string())),
        icon: v.optional(v.nullable(v.string())),
        verification_level: v.optional(v.union([v.null(), VerificationLevelsSchema])),
        default_message_notifications: v.optional(
          v.union([v.null(), UserNotificationSettingsSchema]),
        ),
        explicit_content_filter: v.optional(
          v.union([v.null(), GuildExplicitContentFilterTypesSchema]),
        ),
        preferred_locale: v.optional(v.union([v.null(), AvailableLocalesEnumSchema])),
        afk_timeout: v.optional(v.union([v.null(), AfkTimeoutsSchema])),
        afk_channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        system_channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        splash: v.optional(v.nullable(v.string())),
        banner: v.optional(v.nullable(v.string())),
        system_channel_flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        features: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        discovery_splash: v.optional(v.nullable(v.string())),
        home_header: v.optional(v.nullable(v.string())),
        rules_channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        safety_alerts_channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        public_updates_channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        premium_progress_bar_enabled: v.optional(v.nullable(v.boolean())),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: v.optional(SnowflakeTypeSchema),
        target_id: v.optional(SnowflakeTypeSchema),
        action_type: v.optional(AuditLogActionTypesSchema),
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
      }),
    )
    .output(GuildAuditLogResponseSchema),
  getGuildsGuildIdAutoModerationRules: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/auto-moderation/rules',
      successDescription: '200 response for list_auto_moderation_rules',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            DefaultKeywordRuleResponseSchema,
            KeywordRuleResponseSchema,
            MLSpamRuleResponseSchema,
            MentionSpamRuleResponseSchema,
            UserProfileRuleResponseSchema,
            v.null(),
          ]),
        ),
      ),
    ),
  postGuildsGuildIdAutoModerationRules: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/auto-moderation/rules',
      successDescription: '200 response for create_auto_moderation_rule',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdAutoModerationRulesRuleId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
      successDescription: '200 response for update_auto_moderation_rule',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(1000),
          ),
        ),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.nullable(v.array(GuildBanResponseSchema))),
  getGuildsGuildIdBansUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successDescription: '200 response for get_guild_ban',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildBanResponseSchema),
  putGuildsGuildIdBansUserId: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successStatus: 204,
      successDescription: '204 response for ban_user_from_guild',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        delete_message_seconds: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800))),
        ),
        delete_message_days: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(7))),
        ),
      }),
    ),
  deleteGuildsGuildIdBansUserId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successStatus: 204,
      successDescription: '204 response for unban_user_from_guild',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postGuildsGuildIdBulkBan: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/bulk-ban',
      successDescription: '200 response for bulk_ban_users_from_guild',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_ids: v.pipe(
          v.array(SnowflakeTypeSchema),
          v.maxLength(200),
          v.check((input) => new Set(input).size === input.length),
        ),
        delete_message_seconds: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800))),
        ),
      }),
    )
    .output(BulkBanUsersResponseSchema),
  getGuildsGuildIdChannels: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/channels',
      successDescription: '200 response for list_guild_channels',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        ),
      ),
    ),
  postGuildsGuildIdChannels: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/channels',
      successStatus: 201,
      successDescription: '201 response for create_guild_channel',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        type: v.optional(v.union([v.null(), ChannelTypesSchema])),
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        position: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(0),
            ),
          ),
        ),
        topic: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(4096))),
        ),
        bitrate: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(8000),
            ),
          ),
        ),
        user_limit: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(0),
            ),
          ),
        ),
        nsfw: v.optional(v.nullable(v.boolean())),
        rate_limit_per_user: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600))),
        ),
        parent_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        permission_overwrites: v.optional(
          v.nullable(v.pipe(v.array(ChannelPermissionOverwriteRequestSchema), v.maxLength(100))),
        ),
        rtc_region: v.optional(v.nullable(v.string())),
        video_quality_mode: v.optional(v.union([v.null(), VideoQualityModesSchema])),
        default_auto_archive_duration: v.optional(
          v.union([v.null(), ThreadAutoArchiveDurationSchema]),
        ),
        default_reaction_emoji: v.optional(
          v.union([v.null(), UpdateDefaultReactionEmojiRequestSchema]),
        ),
        default_thread_rate_limit_per_user: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600))),
        ),
        default_sort_order: v.optional(v.union([v.null(), ThreadSortOrderSchema])),
        default_forum_layout: v.optional(v.union([v.null(), ForumLayoutSchema])),
        default_tag_setting: v.optional(v.union([v.null(), ThreadSearchTagSettingSchema])),
        available_tags: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.null(), CreateOrUpdateThreadTagRequestSchema])),
              v.maxLength(20),
            ),
          ),
        ),
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
    .input(v.object({ guild_id: SnowflakeTypeSchema })),
  getGuildsGuildIdEmojis: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/emojis',
      successDescription: '200 response for list_guild_emojis',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(EmojiResponseSchema))),
  postGuildsGuildIdEmojis: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/emojis',
      successStatus: 201,
      successDescription: '201 response for create_guild_emoji',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        image: v.string(),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.null(), SnowflakeTypeSchema])),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
      }),
    )
    .output(EmojiResponseSchema),
  getGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successDescription: '200 response for get_guild_emoji',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema),
  deleteGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_emoji',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successDescription: '200 response for update_guild_emoji',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32))),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.null(), SnowflakeTypeSchema])),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        invites_disabled_until: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('When invites will be enabled again'),
          ),
        ),
        dms_disabled_until: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('When direct messages will be enabled again'),
          ),
        ),
      }),
    )
    .output(GuildIncidentsDataResponseSchema),
  getGuildsGuildIdIntegrations: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/integrations',
      successDescription: '200 response for list_guild_integrations',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            DiscordIntegrationResponseSchema,
            ExternalConnectionIntegrationResponseSchema,
            GuildSubscriptionIntegrationResponseSchema,
          ]),
        ),
      ),
    ),
  deleteGuildsGuildIdIntegrationsIntegrationId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/integrations/{integration_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_integration',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema })),
  getGuildsGuildIdInvites: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/invites',
      successDescription: '200 response for list_guild_invites',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            v.null(),
          ]),
        ),
      ),
    ),
  getGuildsGuildIdMembers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/members',
      successDescription: '200 response for list_guild_members',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(1000),
          ),
        ),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.array(GuildMemberResponseSchema)),
  patchGuildsGuildIdMembersMe: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/members/@me',
      successDescription: '200 response for update_my_guild_member',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(32)))),
        avatar: v.optional(v.nullable(v.string())),
        bio: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(300)))),
        banner: v.optional(v.nullable(v.string())),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(1000),
          ),
        ),
        query: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
      }),
    )
    .output(v.array(GuildMemberResponseSchema)),
  getGuildsGuildIdMembersUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/members/{user_id}',
      successDescription: '200 response for get_guild_member',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildMemberResponseSchema),
  putGuildsGuildIdMembersUserId: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/members/{user_id}',
      successStatus: 201,
      successDescription: '201 response for add_guild_member',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(32)))),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(SnowflakeTypeSchema),
              v.maxLength(250),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        mute: v.optional(v.nullable(v.boolean())),
        deaf: v.optional(v.nullable(v.boolean())),
        access_token: v.pipe(v.string(), v.maxCodePoints(10240)),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
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
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdMembersUserId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/members/{user_id}',
      successDescription: '200 response for update_guild_member',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(32)))),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.null(), SnowflakeTypeSchema])),
              v.maxLength(350),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        mute: v.optional(v.nullable(v.boolean())),
        deaf: v.optional(v.nullable(v.boolean())),
        channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        communication_disabled_until: v.optional(
          v.nullable(
            v.pipe(
              v.string(),
              v.regex(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
        ),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
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
      v.object({
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
      v.object({
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        sort_by: v.optional(SortingModeSchema),
        sort_order: v.optional(SortingOrderSchema),
        content: v.optional(v.pipe(v.string(), v.maxCodePoints(1024))),
        slop: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
        ),
        author_id: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        author_type: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(AuthorTypeSchema),
            v.maxLength(6),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        mentions: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        mentions_role_id: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        replied_to_user_id: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        replied_to_message_id: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        mention_everyone: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        min_id: v.optional(SnowflakeTypeSchema),
        max_id: v.optional(SnowflakeTypeSchema),
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(25),
          ),
        ),
        offset: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(9975),
          ),
        ),
        has: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(HasOptionSchema),
            v.maxLength(18),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        link_hostname: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        embed_provider: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        embed_type: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SearchableEmbedTypeSchema),
            v.maxLength(5),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        attachment_extension: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        attachment_filename: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(1024))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        pinned: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        include_nsfw: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        channel_id: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(500),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      }),
    )
    .output(GuildSearchResponseSchema),
  getGuildsGuildIdNewMemberWelcome: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/new-member-welcome',
      successDescription: '200 response for get_guild_new_member_welcome',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildHomeSettingsResponseSchema),
  getGuildsGuildIdOnboarding: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/onboarding',
      successDescription: '200 response for get_guilds_onboarding',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(UserGuildOnboardingResponseSchema),
  putGuildsGuildIdOnboarding: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/onboarding',
      successDescription: '200 response for put_guilds_onboarding',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        prompts: v.optional(
          v.nullable(v.pipe(v.array(UpdateOnboardingPromptRequestSchema), v.maxLength(15))),
        ),
        enabled: v.optional(v.nullable(v.boolean())),
        default_channel_ids: v.optional(
          v.nullable(
            v.pipe(
              v.array(SnowflakeTypeSchema),
              v.maxLength(500),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        mode: v.optional(v.union([v.null(), GuildOnboardingModeSchema])),
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
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema),
  getGuildsGuildIdPermissionsRoleRoleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/permissions/role/{role_id}',
      description:
        "Returns the permissions a role grants at the guild level, combining the role's own permissions with @everyone's.",
      successDescription: '200 response for get_guild_role_permissions',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema),
  getGuildsGuildIdPreview: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/preview',
      successDescription: '200 response for get_guild_preview',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildPreviewResponseSchema),
  getGuildsGuildIdPrune: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/prune',
      successDescription: '200 response for preview_prune_guild',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        days: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(30),
          ),
        ),
        include_roles: v.optional(
          v.union([
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
        ),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        days: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(30))),
        ),
        compute_prune_count: v.optional(v.nullable(v.boolean())),
        include_roles: v.optional(
          v.union([
            v.string(),
            v.pipe(
              v.array(SnowflakeTypeSchema),
              v.maxLength(100),
              v.check((input) => new Set(input).size === input.length),
            ),
            v.null(),
          ]),
        ),
      }),
    )
    .output(GuildPruneResponseSchema),
  getGuildsGuildIdRegions: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/regions',
      successDescription: '200 response for list_guild_voice_regions',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(VoiceRegionResponseSchema))),
  getGuildsGuildIdRequests: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/requests',
      description: 'List join requests for guild, optionally filtered by application status',
      successDescription: '200 response for get_guild_join_requests',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        status: v.optional(GuildJoinRequestApplicationStatusSchema),
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
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        request_id: SnowflakeTypeSchema,
        action: v.optional(
          v.pipe(
            GuildJoinRequestApplicationStatusSchema,
            v.description('Whether to approve or reject the join request'),
          ),
        ),
        rejection_reason: v.optional(
          v.pipe(
            v.nullable(v.pipe(v.string(), v.maxCodePoints(160))),
            v.description('Reason for rejection. Only used when action is REJECTED'),
          ),
        ),
      }),
    )
    .output(GuildJoinRequestResponseSchema),
  getGuildsGuildIdRoles: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for list_guild_roles',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.array(GuildRoleResponseSchema)),
  postGuildsGuildIdRoles: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for create_guild_role',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
        permissions: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        color: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
        ),
        colors: v.optional(v.union([v.null(), RoleColorsSchema])),
        hoist: v.optional(v.nullable(v.boolean())),
        mentionable: v.optional(v.nullable(v.boolean())),
        icon: v.optional(v.nullable(v.string())),
        unicode_emoji: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      }),
    )
    .output(GuildRoleResponseSchema),
  patchGuildsGuildIdRoles: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for bulk_update_guild_roles',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.array(GuildRoleResponseSchema)),
  getGuildsGuildIdRolesMemberCounts: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles/member-counts',
      successDescription: '200 response for guild_role_member_counts',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.record(
        v.string(),
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      ),
    ),
  getGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successDescription: '200 response for get_guild_role',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(GuildRoleResponseSchema),
  deleteGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_role',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successDescription: '200 response for update_guild_role',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
        permissions: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        color: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
        ),
        colors: v.optional(v.union([v.null(), RoleColorsSchema])),
        hoist: v.optional(v.nullable(v.boolean())),
        mentionable: v.optional(v.nullable(v.boolean())),
        icon: v.optional(v.nullable(v.string())),
        unicode_emoji: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        with_user_count: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
      }),
    )
    .output(
      v.nullable(
        v.array(
          v.union([
            ExternalScheduledEventResponseSchema,
            StageScheduledEventResponseSchema,
            VoiceScheduledEventResponseSchema,
          ]),
        ),
      ),
    ),
  postGuildsGuildIdScheduledEvents: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/scheduled-events',
      successDescription: '200 response for create_guild_scheduled_event',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_user_count: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
      }),
    )
    .output(
      v.union([
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
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
      successDescription: '200 response for update_guild_scheduled_event',
    })
    .input(
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    )
    .output(
      v.union([
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        scheduled_start_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden start time of this occurrence'),
          ),
        ),
        scheduled_end_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden end time of this occurrence'),
          ),
        ),
        original_scheduled_start_time: v.pipe(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          v.description('The original start time of the occurrence to create an exception for'),
        ),
        is_canceled: v.optional(
          v.pipe(v.nullable(v.boolean()), v.description('Whether this occurrence is canceled')),
        ),
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
      v.object({
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
        scheduled_start_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden start time of this occurrence'),
          ),
        ),
        scheduled_end_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden end time of this occurrence'),
          ),
        ),
        is_canceled: v.optional(
          v.pipe(v.nullable(v.boolean()), v.description('Whether this occurrence is canceled')),
        ),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_member: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.nullable(v.array(ScheduledEventUserResponseSchema))),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
      description: 'Get the count of users subscribed to a guild scheduled event',
      successDescription: '200 response for count_guild_scheduled_event_users',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_ids: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(10),
          ),
        ),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        with_member: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.nullable(v.array(ScheduledEventUserResponseSchema))),
  getGuildsGuildIdSoundboardSounds: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/soundboard-sounds',
      successDescription: '200 response for list_guild_soundboard_sounds',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(ListGuildSoundboardSoundsResponseSchema),
  postGuildsGuildIdSoundboardSounds: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/soundboard-sounds',
      successStatus: 201,
      successDescription: '201 response for create_guild_soundboard_sound',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        volume: v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1)))),
        emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        emoji_name: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
        sound: v.string(),
      }),
    )
    .output(SoundboardSoundResponseSchema),
  getGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successDescription: '200 response for get_guild_soundboard_sound',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .output(SoundboardSoundResponseSchema),
  deleteGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_soundboard_sound',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successDescription: '200 response for update_guild_soundboard_sound',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32))),
        volume: v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1)))),
        emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        emoji_name: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
      }),
    )
    .output(SoundboardSoundResponseSchema),
  getGuildsGuildIdStickers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/stickers',
      successDescription: '200 response for list_guild_stickers',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.array(GuildStickerResponseSchema)),
  postGuildsGuildIdStickers: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/stickers',
      successStatus: 201,
      successDescription: '201 response for create_guild_sticker',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema),
  getGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successDescription: '200 response for get_guild_sticker',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema),
  deleteGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_sticker',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successDescription: '200 response for update_guild_sticker',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        sticker_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(30))),
        tags: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200))),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      }),
    )
    .output(GuildStickerResponseSchema),
  getGuildsGuildIdTemplates: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/templates',
      successDescription: '200 response for list_guild_templates',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(GuildTemplateResponseSchema))),
  postGuildsGuildIdTemplates: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/templates',
      successDescription: '200 response for create_guild_template',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
      }),
    )
    .output(GuildTemplateResponseSchema),
  putGuildsGuildIdTemplatesCode: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/templates/{code}',
      successDescription: '200 response for sync_guild_template',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .output(GuildTemplateResponseSchema),
  deleteGuildsGuildIdTemplatesCode: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/templates/{code}',
      successDescription: '200 response for delete_guild_template',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .output(GuildTemplateResponseSchema),
  patchGuildsGuildIdTemplatesCode: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/templates/{code}',
      successDescription: '200 response for update_guild_template',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
      }),
    )
    .output(GuildTemplateResponseSchema),
  getGuildsGuildIdThreadsActive: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/threads/active',
      successDescription: '200 response for get_active_guild_threads',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(ThreadsResponseSchema),
  getGuildsGuildIdVanityUrl: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/vanity-url',
      successDescription: '200 response for get_guild_vanity_url',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(VanityURLResponseSchema),
  getGuildsGuildIdVoiceStatesMe: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/voice-states/@me',
      successDescription: '200 response for get_self_voice_state',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema),
  patchGuildsGuildIdVoiceStatesMe: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/voice-states/@me',
      successStatus: 204,
      successDescription: '204 response for update_self_voice_state',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        request_to_speak_timestamp: v.optional(
          v.nullable(
            v.pipe(
              v.string(),
              v.regex(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
        ),
        suppress: v.optional(v.nullable(v.boolean())),
        channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
      }),
    ),
  getGuildsGuildIdVoiceStatesUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/voice-states/{user_id}',
      successDescription: '200 response for get_voice_state',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema),
  patchGuildsGuildIdVoiceStatesUserId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/voice-states/{user_id}',
      successStatus: 204,
      successDescription: '204 response for update_voice_state',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        suppress: v.optional(v.nullable(v.boolean())),
        channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
      }),
    ),
  getGuildsGuildIdWebhooks: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/webhooks',
      successDescription: '200 response for get_guild_webhooks',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        ),
      ),
    ),
  getGuildsGuildIdWelcomeScreen: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/welcome-screen',
      successDescription: '200 response for get_guild_welcome_screen',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildWelcomeScreenResponseSchema),
  patchGuildsGuildIdWelcomeScreen: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/welcome-screen',
      successDescription: '200 response for update_guild_welcome_screen',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(140)))),
        welcome_channels: v.optional(
          v.nullable(v.pipe(v.array(GuildWelcomeChannelSchema), v.maxLength(5))),
        ),
        enabled: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(GuildWelcomeScreenResponseSchema),
  getGuildsGuildIdWidget: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget',
      successDescription: '200 response for get_guild_widget_settings',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetSettingsResponseSchema),
  patchGuildsGuildIdWidget: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/widget',
      successDescription: '200 response for update_guild_widget_settings',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        enabled: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(WidgetSettingsResponseSchema),
  getGuildsGuildIdWidgetJson: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget.json',
      successDescription: '200 response for get_guild_widget',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetResponseSchema),
  getGuildsGuildIdWidgetPng: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget.png',
      successDescription: '200 response for get_guild_widget_png',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema, style: v.optional(WidgetImageStylesSchema) })),
  postInteractionsInteractionIdInteractionTokenCallback: oc
    .route({
      method: 'POST',
      path: '/interactions/{interaction_id}/{interaction_token}/callback',
      successDescription: '200 response for create_interaction_response',
    })
    .input(
      v.object({
        interaction_id: SnowflakeTypeSchema,
        interaction_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        with_response: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
      v.object({
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        with_counts: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        guild_scheduled_event_id: v.optional(SnowflakeTypeSchema),
        target_channel_id: v.optional(SnowflakeTypeSchema),
        target_message_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(
      v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    ),
  deleteInvitesCode: oc
    .route({
      method: 'DELETE',
      path: '/invites/{code}',
      successDescription: '200 response for invite_revoke',
    })
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .output(
      v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    ),
  getInvitesCodeTargetUsers: oc
    .route({
      method: 'GET',
      path: '/invites/{code}/target-users',
      description: 'Get the target users for an invite.',
      successDescription: '200 response for get_invite_target_users',
    })
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
  putInvitesCodeTargetUsers: oc
    .route({
      method: 'PUT',
      path: '/invites/{code}/target-users',
      description: 'Update the target users for an existing invite.',
      successStatus: 204,
      successDescription: '204 response for update_invite_target_users',
    })
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
  postInvitesCodeTargetUsersBulkAdd: oc
    .route({
      method: 'POST',
      path: '/invites/{code}/target-users/bulk-add',
      description: 'Add multiple target users to an existing invite.',
      successStatus: 204,
      successDescription: '204 response for bulk_add_invite_target_users',
    })
    .input(
      v.object({
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        user_ids: v.pipe(
          v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
          v.description('The IDs of the users to target.'),
        ),
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
      v.object({
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        user_ids: v.pipe(
          v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
          v.description('The IDs of the users to stop targeting.'),
        ),
      }),
    ),
  getInvitesCodeTargetUsersJobStatus: oc
    .route({
      method: 'GET',
      path: '/invites/{code}/target-users/job-status',
      description: 'Get the target users job status for an invite.',
      successDescription: '200 response for get_invite_target_users_job_status',
    })
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .output(TargetUsersJobStatusResponseSchema),
  putInvitesCodeTargetUsersUserId: oc
    .route({
      method: 'PUT',
      path: '/invites/{code}/target-users/{user_id}',
      description: 'Add a target user to an existing invite.',
      successStatus: 204,
      successDescription: '204 response for add_invite_target_user',
    })
    .input(
      v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
    ),
  deleteInvitesCodeTargetUsersUserId: oc
    .route({
      method: 'DELETE',
      path: '/invites/{code}/target-users/{user_id}',
      description: 'Remove a target user from an existing invite.',
      successStatus: 204,
      successDescription: '204 response for remove_invite_target_user',
    })
    .input(
      v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
    ),
  postLobbies: oc
    .route({
      method: 'POST',
      path: '/lobbies',
      successStatus: 201,
      successDescription: '201 response for create_lobby',
    })
    .input(
      v.partial(
        v.object({
          idle_timeout_seconds: v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(5),
              v.maxValue(604800),
            ),
          ),
          members: v.nullable(v.pipe(v.array(LobbyMemberRequestSchema), v.maxLength(25))),
          metadata: v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
          flags: v.union([v.null(), v.literal(1)]),
          override_event_webhooks_url: v.nullable(
            v.pipe(v.string(), v.url(), v.maxCodePoints(512)),
          ),
          name: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        }),
      ),
    )
    .output(LobbyResponseSchema),
  putLobbies: oc
    .route({
      method: 'PUT',
      path: '/lobbies',
      successDescription: '200 response for create_or_join_lobby',
    })
    .input(
      v.object({
        idle_timeout_seconds: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(5),
              v.maxValue(604800),
            ),
          ),
        ),
        lobby_metadata: v.optional(
          v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
        ),
        member_metadata: v.optional(
          v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
        ),
        secret: v.pipe(v.string(), v.maxCodePoints(250)),
        flags: v.optional(v.union([v.null(), v.literal(1)])),
        name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
      }),
    )
    .output(LobbyResponseSchema),
  getLobbiesLobbyId: oc
    .route({
      method: 'GET',
      path: '/lobbies/{lobby_id}',
      successDescription: '200 response for get_lobby',
    })
    .input(v.object({ lobby_id: SnowflakeTypeSchema }))
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
    .input(v.object({ lobby_id: SnowflakeTypeSchema })),
  patchLobbiesLobbyId: oc
    .route({
      method: 'PATCH',
      path: '/lobbies/{lobby_id}',
      successDescription: '200 response for edit_lobby',
    })
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        idle_timeout_seconds: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(5),
              v.maxValue(604800),
            ),
          ),
        ),
        metadata: v.optional(
          v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
        ),
        members: v.optional(v.nullable(v.pipe(v.array(LobbyMemberRequestSchema), v.maxLength(25)))),
        flags: v.optional(v.union([v.null(), v.literal(1)])),
        override_event_webhooks_url: v.optional(
          v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(512))),
        ),
        name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
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
      v.object({
        lobby_id: SnowflakeTypeSchema,
        channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
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
    .input(v.object({ lobby_id: SnowflakeTypeSchema })),
  postLobbiesLobbyIdMembersMeInvites: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/@me/invites',
      successDescription: '200 response for create_linked_lobby_guild_invite_for_self',
    })
    .input(v.object({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema),
  postLobbiesLobbyIdMembersBulk: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/bulk',
      successDescription: '200 response for bulk_update_lobby_members',
    })
    .input(v.object({ lobby_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(LobbyMemberResponseSchema))),
  putLobbiesLobbyIdMembersUserId: oc
    .route({
      method: 'PUT',
      path: '/lobbies/{lobby_id}/members/{user_id}',
      successDescription: '200 response for add_lobby_member',
    })
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        metadata: v.optional(
          v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
        ),
        flags: v.optional(v.union([v.null(), v.literal(1)])),
        additional_name: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
        ),
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
    .input(v.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postLobbiesLobbyIdMembersUserIdInvites: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/{user_id}/invites',
      successDescription: '200 response for create_linked_lobby_guild_invite_for_user',
    })
    .input(v.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema),
  getLobbiesLobbyIdMessages: oc
    .route({
      method: 'GET',
      path: '/lobbies/{lobby_id}/messages',
      successDescription: '200 response for get_lobby_messages',
    })
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(200),
          ),
        ),
      }),
    )
    .output(v.nullable(v.array(LobbyMessageResponseSchema))),
  postLobbiesLobbyIdMessages: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/messages',
      successStatus: 201,
      successDescription: '201 response for create_lobby_message',
    })
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
        sticker_ids: v.optional(v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(3)))),
        components: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ),
              v.maxLength(40),
            ),
          ),
        ),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        attachments: v.optional(
          v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
        ),
        poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
        shared_client_theme: v.optional(v.union([v.null(), CustomClientThemeShareRequestSchema])),
        message_reference: v.optional(v.union([v.null(), MessageReferenceRequestSchema])),
        nonce: v.optional(
          v.union([
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775808n),
            ),
            v.pipe(v.string(), v.maxCodePoints(25)),
            v.null(),
          ]),
        ),
        enforce_nonce: v.optional(v.nullable(v.boolean())),
        tts: v.optional(v.nullable(v.boolean())),
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
    .input(v.object({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
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
      v.object({
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
      v.object({
        client_id: SnowflakeTypeSchema,
        client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
        external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
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
    .input(
      v.object({ external_user_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)) }),
    ),
  postPartnerSdkToken: oc
    .route({
      method: 'POST',
      path: '/partner-sdk/token',
      successDescription: '200 response for partner_sdk_token',
    })
    .input(
      v.object({
        client_id: SnowflakeTypeSchema,
        client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
        external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
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
      v.object({
        provisional_user_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        external_user_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)),
        preferred_global_name: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
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
      v.object({
        sku_id: SnowflakeTypeSchema,
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
        user_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.array(SubscriptionResponseSchema)),
  getSkusSkuIdSubscriptionsSubscriptionId: oc
    .route({
      method: 'GET',
      path: '/skus/{sku_id}/subscriptions/{subscription_id}',
      description: 'Get a subscription by its ID.',
      successDescription: '200 response for get_sku_subscription',
    })
    .input(
      v.object({
        sku_id: SnowflakeTypeSchema,
        subscription_id: SnowflakeTypeSchema,
        user_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(SubscriptionResponseSchema),
  getSoundboardDefaultSounds: oc
    .route({
      method: 'GET',
      path: '/soundboard-default-sounds',
      successDescription: '200 response for get_soundboard_default_sounds',
    })
    .output(v.array(SoundboardSoundResponseSchema)),
  postStageInstances: oc
    .route({
      method: 'POST',
      path: '/stage-instances',
      successDescription: '200 response for create_stage_instance',
    })
    .input(
      v.object({
        topic: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
        channel_id: SnowflakeTypeSchema,
        privacy_level: v.optional(v.union([v.null(), StageInstancesPrivacyLevelsSchema])),
        guild_scheduled_event_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        send_start_notification: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(StageInstanceResponseSchema),
  getStageInstancesChannelId: oc
    .route({
      method: 'GET',
      path: '/stage-instances/{channel_id}',
      successDescription: '200 response for get_stage_instance',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(StageInstanceResponseSchema),
  deleteStageInstancesChannelId: oc
    .route({
      method: 'DELETE',
      path: '/stage-instances/{channel_id}',
      successStatus: 204,
      successDescription: '204 response for delete_stage_instance',
    })
    .input(v.object({ channel_id: SnowflakeTypeSchema })),
  patchStageInstancesChannelId: oc
    .route({
      method: 'PATCH',
      path: '/stage-instances/{channel_id}',
      successDescription: '200 response for update_stage_instance',
    })
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        topic: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120))),
        privacy_level: v.optional(StageInstancesPrivacyLevelsSchema),
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
    .input(v.object({ pack_id: SnowflakeTypeSchema }))
    .output(StickerPackResponseSchema),
  getStickersStickerId: oc
    .route({
      method: 'GET',
      path: '/stickers/{sticker_id}',
      successDescription: '200 response for get_sticker',
    })
    .input(v.object({ sticker_id: SnowflakeTypeSchema }))
    .output(v.union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
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
      v.object({
        application_id: SnowflakeTypeSchema,
        sku_ids: v.optional(
          v.union([
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
        ),
        exclude_consumed: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
      }),
    )
    .output(v.array(EntitlementResponseSchema)),
  getUsersMeApplicationsApplicationIdRoleConnection: oc
    .route({
      method: 'GET',
      path: '/users/@me/applications/{application_id}/role-connection',
      successDescription: '200 response for get_application_user_role_connection',
    })
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(ApplicationUserRoleConnectionResponseSchema),
  putUsersMeApplicationsApplicationIdRoleConnection: oc
    .route({
      method: 'PUT',
      path: '/users/@me/applications/{application_id}/role-connection',
      successDescription: '200 response for update_application_user_role_connection',
    })
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        platform_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(50)))),
        platform_username: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        metadata: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
          ),
        ),
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
    .input(v.object({ application_id: SnowflakeTypeSchema })),
  postUsersMeChannels: oc
    .route({
      method: 'POST',
      path: '/users/@me/channels',
      successDescription: '200 response for create_dm',
    })
    .input(CreatePrivateChannelRequestSchema)
    .output(v.union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema])),
  getUsersMeConnections: oc
    .route({
      method: 'GET',
      path: '/users/@me/connections',
      successDescription: '200 response for list_my_connections',
    })
    .output(v.nullable(v.array(ConnectedAccountResponseSchema))),
  getUsersMeGuilds: oc
    .route({
      method: 'GET',
      path: '/users/@me/guilds',
      successDescription: '200 response for list_my_guilds',
    })
    .input(
      v.object({
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
            v.maxValue(200),
          ),
        ),
        shard: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
        ),
        with_counts: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
      }),
    )
    .output(v.nullable(v.array(MyGuildResponseSchema))),
  deleteUsersMeGuildsGuildId: oc
    .route({
      method: 'DELETE',
      path: '/users/@me/guilds/{guild_id}',
      successStatus: 204,
      successDescription: '204 response for leave_guild',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema })),
  getUsersMeGuildsGuildIdMember: oc
    .route({
      method: 'GET',
      path: '/users/@me/guilds/{guild_id}/member',
      successDescription: '200 response for get_my_guild_member',
    })
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(PrivateGuildMemberResponseSchema),
  getUsersUserId: oc
    .route({
      method: 'GET',
      path: '/users/{user_id}',
      successDescription: '200 response for get_user',
    })
    .input(v.object({ user_id: SnowflakeTypeSchema }))
    .output(UserResponseSchema),
  getVoiceRegions: oc
    .route({
      method: 'GET',
      path: '/voice/regions',
      successDescription: '200 response for list_voice_regions',
    })
    .output(v.nullable(v.array(VoiceRegionResponseSchema))),
  getWebhooksWebhookId: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}',
      successDescription: '200 response for get_webhook',
    })
    .input(v.object({ webhook_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ webhook_id: SnowflakeTypeSchema })),
  patchWebhooksWebhookId: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}',
      successDescription: '200 response for update_webhook',
    })
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
        avatar: v.optional(v.nullable(v.string())),
        channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
      }),
    )
    .output(
      v.union([
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
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .output(
      v.union([
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
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        wait: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        thread_id: v.optional(SnowflakeTypeSchema),
        with_components: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
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
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
  patchWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successDescription: '200 response for update_webhook_by_token',
    })
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
        avatar: v.optional(v.nullable(v.string())),
      }),
    )
    .output(
      v.union([
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
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        wait: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        thread_id: v.optional(SnowflakeTypeSchema),
        action: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        ref: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        ref_type: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        comment: v.optional(v.union([v.null(), GithubCommentSchema])),
        issue: v.optional(v.union([v.null(), GithubIssueSchema])),
        pull_request: v.optional(v.union([v.null(), GithubIssueSchema])),
        repository: v.optional(v.union([v.null(), GithubRepositorySchema])),
        forkee: v.optional(v.union([v.null(), GithubRepositorySchema])),
        sender: GithubUserSchema,
        member: v.optional(v.union([v.null(), GithubUserSchema])),
        release: v.optional(v.union([v.null(), GithubReleaseSchema])),
        head_commit: v.optional(v.union([v.null(), GithubCommitSchema])),
        commits: v.optional(v.nullable(v.pipe(v.array(GithubCommitSchema), v.maxLength(1521)))),
        forced: v.optional(v.nullable(v.boolean())),
        compare: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
        review: v.optional(v.union([v.null(), GithubReviewSchema])),
        check_run: v.optional(v.union([v.null(), GithubCheckRunSchema])),
        check_suite: v.optional(v.union([v.null(), GithubCheckSuiteSchema])),
        discussion: v.optional(v.union([v.null(), GithubDiscussionSchema])),
        answer: v.optional(v.union([v.null(), GithubCommentSchema])),
      }),
    ),
  getWebhooksWebhookIdWebhookTokenMessagesOriginal: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
      successDescription: '200 response for get_original_webhook_message',
    })
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        thread_id: v.optional(SnowflakeTypeSchema),
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
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        thread_id: v.optional(SnowflakeTypeSchema),
      }),
    ),
  patchWebhooksWebhookIdWebhookTokenMessagesOriginal: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
      successDescription: '200 response for update_original_webhook_message',
    })
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        thread_id: v.optional(SnowflakeTypeSchema),
        with_components: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
        components: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ),
              v.maxLength(40),
            ),
          ),
        ),
        attachments: v.optional(
          v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
        ),
        poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
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
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        message_id: SnowflakeTypeSchema,
        thread_id: v.optional(SnowflakeTypeSchema),
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
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        message_id: SnowflakeTypeSchema,
        thread_id: v.optional(SnowflakeTypeSchema),
      }),
    ),
  patchWebhooksWebhookIdWebhookTokenMessagesMessageId: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
      successDescription: '200 response for update_webhook_message',
    })
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        message_id: SnowflakeTypeSchema,
        thread_id: v.optional(SnowflakeTypeSchema),
        with_components: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
        components: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ),
              v.maxLength(40),
            ),
          ),
        ),
        attachments: v.optional(
          v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
        ),
        poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
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
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        wait: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        thread_id: v.optional(SnowflakeTypeSchema),
        text: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
        username: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        icon_url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
        attachments: v.optional(
          v.nullable(v.pipe(v.array(WebhookSlackEmbedSchema), v.maxLength(1521))),
        ),
      }),
    )
    .output(v.nullable(v.string())),
}
