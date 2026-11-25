import { oc } from '@orpc/contract'
import { type } from 'arktype'
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
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(PrivateApplicationResponseSchema),
  patchApplicationsApplicationId: oc
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
        'team_id?': type('null').or(SnowflakeTypeSchema),
        'flags?': type('number.integer | null'),
        'interactions_endpoint_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
          ),
        ).or('null'),
        'explicit_content_filter?': type('null').or(ApplicationExplicitContentFilterTypesSchema),
        'max_participants?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= -1 | null',
        ),
        'type?': type('null').or(ApplicationTypesSchema),
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
        'install_params?': type('null').or(ApplicationOAuth2InstallParamsSchema),
        'role_connections_verification_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
          ),
        ).or('null'),
        'integration_types_config?': type(
          type({ '[string]': type('null').or(ApplicationIntegrationTypeConfigurationSchema) }),
        ).or('null'),
        'event_webhooks_status?': type('null').or(ApplicationEventWebhooksStatusSchema),
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
    .output(PrivateApplicationResponseSchema),
  getApplicationsApplicationIdActivityInstancesInstanceId: oc
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
    .output(EmbeddedActivityInstanceSchema),
  postApplicationsApplicationIdAttachment: oc
    .route({
      method: 'POST',
      path: '/applications/{application_id}/attachment',
      successDescription: '200 response for upload_application_attachment',
    })
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(ActivitiesAttachmentResponseSchema),
  getApplicationsApplicationIdCommands: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/commands',
      successDescription: '200 response for list_application_commands',
    })
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        'with_localizations?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    )
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null')),
  postApplicationsApplicationIdCommands: oc
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
        'handler?': type('null')
          .or(ApplicationCommandHandlerSchema)
          .describe(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          ),
        'type?': type('null').or(ApplicationCommandTypeSchema),
      }),
    )
    .output(ApplicationCommandResponseSchema),
  putApplicationsApplicationIdCommands: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/commands',
      successDescription: '200 response for bulk_set_application_commands',
    })
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null')),
  getApplicationsApplicationIdCommandsCommandId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/commands/{command_id}',
      successDescription: '200 response for get_application_command',
    })
    .input(type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .output(ApplicationCommandResponseSchema),
  deleteApplicationsApplicationIdCommandsCommandId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/commands/{command_id}',
      successStatus: 204,
      successDescription: '204 response for delete_application_command',
    })
    .input(type({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema })),
  patchApplicationsApplicationIdCommandsCommandId: oc
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
        'handler?': type('null')
          .or(ApplicationCommandHandlerSchema)
          .describe(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
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
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(ListApplicationEmojisResponseSchema),
  postApplicationsApplicationIdEmojis: oc
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
    .output(EmojiResponseSchema),
  getApplicationsApplicationIdEmojisEmojiId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/emojis/{emoji_id}',
      successDescription: '200 response for get_application_emoji',
    })
    .input(type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema),
  deleteApplicationsApplicationIdEmojisEmojiId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/emojis/{emoji_id}',
      successStatus: 204,
      successDescription: '204 response for delete_application_emoji',
    })
    .input(type({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
  patchApplicationsApplicationIdEmojisEmojiId: oc
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
    .output(EmojiResponseSchema),
  getApplicationsApplicationIdEntitlements: oc
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
                            .to('null'),
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
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
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
    .output(type(EntitlementResponseSchema).array()),
  postApplicationsApplicationIdEntitlements: oc
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
    .output(EntitlementResponseSchema),
  getApplicationsApplicationIdEntitlementsEntitlementId: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/entitlements/{entitlement_id}',
      successDescription: '200 response for get_entitlement',
    })
    .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .output(EntitlementResponseSchema),
  deleteApplicationsApplicationIdEntitlementsEntitlementId: oc
    .route({
      method: 'DELETE',
      path: '/applications/{application_id}/entitlements/{entitlement_id}',
      successStatus: 204,
      successDescription: '204 response for delete_entitlement',
    })
    .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema })),
  postApplicationsApplicationIdEntitlementsEntitlementIdConsume: oc
    .route({
      method: 'POST',
      path: '/applications/{application_id}/entitlements/{entitlement_id}/consume',
      successStatus: 204,
      successDescription: '204 response for consume_entitlement',
    })
    .input(type({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema })),
  getApplicationsApplicationIdGuildsGuildIdCommands: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/guilds/{guild_id}/commands',
      successDescription: '200 response for list_guild_application_commands',
    })
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        'with_localizations?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    )
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null')),
  postApplicationsApplicationIdGuildsGuildIdCommands: oc
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
        'handler?': type('null')
          .or(ApplicationCommandHandlerSchema)
          .describe(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          ),
        'type?': type('null').or(ApplicationCommandTypeSchema),
      }),
    )
    .output(ApplicationCommandResponseSchema),
  putApplicationsApplicationIdGuildsGuildIdCommands: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/guilds/{guild_id}/commands',
      successDescription: '200 response for bulk_set_guild_application_commands',
    })
    .input(type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(type(type(ApplicationCommandResponseSchema).array()).or('null')),
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissions: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
      successDescription: '200 response for list_guild_application_command_permissions',
    })
    .input(type({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(type(CommandPermissionsResponseSchema).array()),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
    .output(ApplicationCommandResponseSchema),
  deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
    ),
  patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId: oc
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
        'handler?': type('null')
          .or(ApplicationCommandHandlerSchema)
          .describe(
            "Determines whether the interaction is handled by the app's interactions handler or by Discord",
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
      type({
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
      type({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
        'permissions?': type(
          type(type(ApplicationCommandPermissionSchema).array()).and(type('unknown[] <= 100')),
        ).or('null'),
      }),
    )
    .output(CommandPermissionsResponseSchema),
  getApplicationsApplicationIdRoleConnectionsMetadata: oc
    .route({
      method: 'GET',
      path: '/applications/{application_id}/role-connections/metadata',
      successDescription: '200 response for get_application_role_connections_metadata',
    })
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(type(type(ApplicationRoleConnectionsMetadataItemResponseSchema).array()).or('null')),
  putApplicationsApplicationIdRoleConnectionsMetadata: oc
    .route({
      method: 'PUT',
      path: '/applications/{application_id}/role-connections/metadata',
      successDescription: '200 response for update_application_role_connections_metadata',
    })
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(type(type(ApplicationRoleConnectionsMetadataItemResponseSchema).array()).or('null')),
  getChannelsChannelId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}',
      successDescription: '200 response for get_channel',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
          PrivateGroupChannelResponseSchema,
        ),
      ).or(ThreadResponseSchema),
    ),
  deleteChannelsChannelId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}',
      successDescription: '200 response for delete_channel',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
          PrivateGroupChannelResponseSchema,
        ),
      ).or(ThreadResponseSchema),
    ),
  patchChannelsChannelId: oc
    .route({
      method: 'PATCH',
      path: '/channels/{channel_id}',
      successDescription: '200 response for update_channel',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
          PrivateGroupChannelResponseSchema,
        ),
      ).or(ThreadResponseSchema),
    ),
  postChannelsChannelIdFollowers: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/followers',
      successDescription: '200 response for follow_channel',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
    .output(ChannelFollowerResponseSchema),
  getChannelsChannelIdInvites: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/invites',
      successDescription: '200 response for list_channel_invites',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
              GuildInviteResponseSchema,
            ),
          ).or('null'),
        ).array(),
      ).or('null'),
    ),
  postChannelsChannelIdInvites: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/invites',
      successDescription: '200 response for create_channel_invite',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
        GuildInviteResponseSchema,
      ),
    ),
  getChannelsChannelIdMessages: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages',
      successDescription: '200 response for list_messages',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'around?': SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
      }),
    )
    .output(type(type(MessageResponseSchema).array()).or('null')),
  postChannelsChannelIdMessages: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages',
      successDescription: '200 response for create_message',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
        'sticker_ids?': type(
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3')),
        ).or('null'),
        'components?': type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(ActionRowComponentForMessageRequestSchema).or(
                          ContainerComponentForMessageRequestSchema,
                        ),
                      ).or(FileComponentForMessageRequestSchema),
                    ).or(MediaGalleryComponentForMessageRequestSchema),
                  ).or(SectionComponentForMessageRequestSchema),
                ).or(SeparatorComponentForMessageRequestSchema),
              ).or(TextDisplayComponentForMessageRequestSchema),
            ).array(),
          ).and(type('unknown[] <= 40')),
        ).or('null'),
        'flags?': type('number.integer | null'),
        'attachments?': type(
          type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
        ).or('null'),
        'poll?': type('null').or(PollCreateRequestSchema),
        'shared_client_theme?': type('null').or(CustomClientThemeShareRequestSchema),
        'message_reference?': type('null').or(MessageReferenceRequestSchema),
        'nonce?': type(
          type(
            type('bigint | number.integer')
              .or(/^-?\d+$/)
              .pipe((data) => BigInt(data))
              .narrow(
                (data, ctx) =>
                  (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                  ctx.mustBe('an int64'),
              )
              .narrow(
                (data, ctx) =>
                  data >= -9223372036854775808n || ctx.mustBe('at least -9223372036854775808'),
              )
              .narrow(
                (data, ctx) =>
                  data <= 9223372036854775808n || ctx.mustBe('at most 9223372036854775808'),
              ),
          ).or(
            type('string').narrow(
              (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
            ),
          ),
        ).or('null'),
        'enforce_nonce?': type('boolean | null'),
        'tts?': type('boolean | null'),
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
      type({
        channel_id: SnowflakeTypeSchema,
        messages: type(type(SnowflakeTypeSchema).array())
          .and(type('2 <= unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      }),
    ),
  getChannelsChannelIdMessagesPins: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/pins',
      successDescription: '200 response for list_pins',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 50'),
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
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdMessagesPinsMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for delete_pin',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/{message_id}',
      successDescription: '200 response for get_message',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  deleteChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}',
      successStatus: 204,
      successDescription: '204 response for delete_message',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  patchChannelsChannelIdMessagesMessageId: oc
    .route({
      method: 'PATCH',
      path: '/channels/{channel_id}/messages/{message_id}',
      successDescription: '200 response for update_message',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'flags?': type('number.integer | null'),
        'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
        'sticker_ids?': type(
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 1521')),
        ).or('null'),
        'components?': type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(ActionRowComponentForMessageRequestSchema).or(
                          ContainerComponentForMessageRequestSchema,
                        ),
                      ).or(FileComponentForMessageRequestSchema),
                    ).or(MediaGalleryComponentForMessageRequestSchema),
                  ).or(SectionComponentForMessageRequestSchema),
                ).or(SeparatorComponentForMessageRequestSchema),
              ).or(TextDisplayComponentForMessageRequestSchema),
            ).array(),
          ).and(type('unknown[] <= 40')),
        ).or('null'),
        'attachments?': type(
          type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
        ).or('null'),
      }),
    )
    .output(MessageResponseSchema),
  postChannelsChannelIdMessagesMessageIdCrosspost: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/messages/{message_id}/crosspost',
      successDescription: '200 response for crosspost_message',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  deleteChannelsChannelIdMessagesMessageIdReactions: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions',
      successStatus: 204,
      successDescription: '204 response for delete_all_message_reactions',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdMessagesMessageIdReactionsEmojiName: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
      successDescription: '200 response for list_message_reactions_by_emoji',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'type?': ReactionTypesSchema,
      }),
    )
    .output(type(UserResponseSchema).array()),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
      successStatus: 204,
      successDescription: '204 response for delete_all_message_reactions_by_emoji',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
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
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
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
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
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
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
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
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'auto_archive_duration?': type('null').or(ThreadAutoArchiveDurationSchema),
        'rate_limit_per_user?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 21600 | null',
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
      type({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'implicit?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
      type({
        channel_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        'implicit?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
      type({
        channel_id: SnowflakeTypeSchema,
        overwrite_id: SnowflakeTypeSchema,
        'type?': type('null').or(ChannelPermissionOverwritesSchema),
        'allow?': type('number.integer | null'),
        'deny?': type('number.integer | null'),
      }),
    ),
  deleteChannelsChannelIdPermissionsOverwriteId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/permissions/{overwrite_id}',
      successStatus: 204,
      successDescription: '204 response for delete_channel_permission_overwrite',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema })),
  getChannelsChannelIdPins: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/pins',
      successDescription: '200 response for deprecated_list_pins',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(type(type(MessageResponseSchema).array()).or('null')),
  putChannelsChannelIdPinsMessageId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for deprecated_create_pin',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdPinsMessageId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/pins/{message_id}',
      successStatus: 204,
      successDescription: '204 response for deprecated_delete_pin',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
  getChannelsChannelIdPollsMessageIdAnswersAnswerId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
      successDescription: '200 response for get_answer_voters',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to(
            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 10',
          ),
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
      }),
    )
    .output(PollAnswerDetailsResponseSchema),
  postChannelsChannelIdPollsMessageIdExpire: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/polls/{message_id}/expire',
      successDescription: '200 response for poll_expire',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema),
  putChannelsChannelIdRecipientsUserId: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/recipients/{user_id}',
      successStatus: 201,
      successDescription: '201 response for add_group_dm_user',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'access_token?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(type(PrivateChannelResponseSchema).or(PrivateGroupChannelResponseSchema)),
  deleteChannelsChannelIdRecipientsUserId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/recipients/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_group_dm_user',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postChannelsChannelIdSendSoundboardSound: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/send-soundboard-sound',
      successStatus: 204,
      successDescription: '204 response for send_soundboard_sound',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        'source_guild_id?': type('null').or(SnowflakeTypeSchema),
      }),
    ),
  getChannelsChannelIdThreadMembers: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/thread-members',
      successDescription: '200 response for list_thread_members',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(ThreadMemberResponseSchema).array()),
  putChannelsChannelIdThreadMembersMe: oc
    .route({
      method: 'PUT',
      path: '/channels/{channel_id}/thread-members/@me',
      successStatus: 204,
      successDescription: '204 response for join_thread',
    })
    .input(type({ channel_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdThreadMembersMe: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/thread-members/@me',
      successStatus: 204,
      successDescription: '204 response for leave_thread',
    })
    .input(type({ channel_id: SnowflakeTypeSchema })),
  getChannelsChannelIdThreadMembersUserId: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/thread-members/{user_id}',
      successDescription: '200 response for get_thread_member',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
    .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  deleteChannelsChannelIdThreadMembersUserId: oc
    .route({
      method: 'DELETE',
      path: '/channels/{channel_id}/thread-members/{user_id}',
      successStatus: 204,
      successDescription: '204 response for delete_thread_member',
    })
    .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postChannelsChannelIdThreads: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/threads',
      successStatus: 201,
      successDescription: '201 response for create_thread',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(CreatedThreadResponseSchema),
  getChannelsChannelIdThreadsArchivedPrivate: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/threads/archived/private',
      successDescription: '200 response for list_private_archived_threads',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 2 & number.integer <= 100'),
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
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 2 & number.integer <= 100'),
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
      type({
        channel_id: SnowflakeTypeSchema,
        'name?': type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
        'slop?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'min_id?': SnowflakeTypeSchema,
        'max_id?': SnowflakeTypeSchema,
        'tag?': type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('string'),
            type('unknown').pipe(
              (data) => (data === undefined || Array.isArray(data) ? data : [data]),
              type(type(SnowflakeTypeSchema).array())
                .and(type('unknown[] <= 20'))
                .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
            ),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
        'tag_setting?': ThreadSearchTagSettingSchema,
        'archived?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'sort_by?': ThreadSortingModeSchema,
        'sort_order?': SortingOrderSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 25'),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 9975'),
      }),
    )
    .output(ThreadSearchResponseSchema),
  postChannelsChannelIdTyping: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/typing',
      successDescription: '200 response for trigger_typing_indicator',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(TypingIndicatorResponseSchema),
  getChannelsChannelIdUsersMeThreadsArchivedPrivate: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/users/@me/threads/archived/private',
      successDescription: '200 response for list_my_private_archived_threads',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 2 & number.integer <= 100'),
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
      type({
        channel_id: SnowflakeTypeSchema,
        'status?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
          ),
        )
          .or('null')
          .describe('The new voice channel status'),
      }),
    ),
  getChannelsChannelIdWebhooks: oc
    .route({
      method: 'GET',
      path: '/channels/{channel_id}/webhooks',
      successDescription: '200 response for list_channel_webhooks',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
          ).or(GuildIncomingWebhookResponseSchema),
        ).array(),
      ).or('null'),
    ),
  postChannelsChannelIdWebhooks: oc
    .route({
      method: 'POST',
      path: '/channels/{channel_id}/webhooks',
      successDescription: '200 response for create_webhook',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        'avatar?': type('string | null'),
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
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(GuildTemplateResponseSchema),
  getGuildsGuildId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}',
      successDescription: '200 response for get_guild',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
      type({
        guild_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
        ).or('null'),
        'region?': type('string | null'),
        'icon?': type('string | null'),
        'verification_level?': type('null').or(VerificationLevelsSchema),
        'default_message_notifications?': type('null').or(UserNotificationSettingsSchema),
        'explicit_content_filter?': type('null').or(GuildExplicitContentFilterTypesSchema),
        'preferred_locale?': type('null').or(AvailableLocalesEnumSchema),
        'afk_timeout?': type('null').or(AfkTimeoutsSchema),
        'afk_channel_id?': type('null').or(SnowflakeTypeSchema),
        'system_channel_id?': type('null').or(SnowflakeTypeSchema),
        'splash?': type('string | null'),
        'banner?': type('string | null'),
        'system_channel_flags?': type('number.integer | null'),
        'features?': type(
          type(
            type(
              type(
                type('string').narrow(
                  (data, ctx) =>
                    [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
                ),
              ).or('null'),
            ).array(),
          )
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'discovery_splash?': type('string | null'),
        'home_header?': type('string | null'),
        'rules_channel_id?': type('null').or(SnowflakeTypeSchema),
        'safety_alerts_channel_id?': type('null').or(SnowflakeTypeSchema),
        'public_updates_channel_id?': type('null').or(SnowflakeTypeSchema),
        'premium_progress_bar_enabled?': type('boolean | null'),
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
      type({
        guild_id: SnowflakeTypeSchema,
        'user_id?': SnowflakeTypeSchema,
        'target_id?': SnowflakeTypeSchema,
        'action_type?': AuditLogActionTypesSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
      }),
    )
    .output(GuildAuditLogResponseSchema),
  getGuildsGuildIdAutoModerationRules: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/auto-moderation/rules',
      successDescription: '200 response for list_auto_moderation_rules',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(
              type(
                type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
                  MLSpamRuleResponseSchema,
                ),
              ).or(MentionSpamRuleResponseSchema),
            ).or(UserProfileRuleResponseSchema),
          ).or('null'),
        ).array(),
      ).or('null'),
    ),
  postGuildsGuildIdAutoModerationRules: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/auto-moderation/rules',
      successDescription: '200 response for create_auto_moderation_rule',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
            MLSpamRuleResponseSchema,
          ),
        ).or(MentionSpamRuleResponseSchema),
      ).or(UserProfileRuleResponseSchema),
    ),
  getGuildsGuildIdAutoModerationRulesRuleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
      successDescription: '200 response for get_auto_moderation_rule',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
            MLSpamRuleResponseSchema,
          ),
        ).or(MentionSpamRuleResponseSchema),
      ).or(UserProfileRuleResponseSchema),
    ),
  deleteGuildsGuildIdAutoModerationRulesRuleId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
      successStatus: 204,
      successDescription: '204 response for delete_auto_moderation_rule',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdAutoModerationRulesRuleId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
      successDescription: '200 response for update_auto_moderation_rule',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
            MLSpamRuleResponseSchema,
          ),
        ).or(MentionSpamRuleResponseSchema),
      ).or(UserProfileRuleResponseSchema),
    ),
  getGuildsGuildIdBans: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/bans',
      successDescription: '200 response for list_guild_bans',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 1000'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(type(GuildBanResponseSchema).array()).or('null')),
  getGuildsGuildIdBansUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successDescription: '200 response for get_guild_ban',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildBanResponseSchema),
  putGuildsGuildIdBansUserId: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successStatus: 204,
      successDescription: '204 response for ban_user_from_guild',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'delete_message_seconds?': type('number.integer >= 0 & number.integer <= 604800 | null'),
        'delete_message_days?': type('number.integer >= 0 & number.integer <= 7 | null'),
      }),
    ),
  deleteGuildsGuildIdBansUserId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/bans/{user_id}',
      successStatus: 204,
      successDescription: '204 response for unban_user_from_guild',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postGuildsGuildIdBulkBan: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/bulk-ban',
      successDescription: '200 response for bulk_ban_users_from_guild',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_ids: type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 200'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'delete_message_seconds?': type('number.integer >= 0 & number.integer <= 604800 | null'),
      }),
    )
    .output(BulkBanUsersResponseSchema),
  getGuildsGuildIdChannels: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/channels',
      successDescription: '200 response for list_guild_channels',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
              PrivateGroupChannelResponseSchema,
            ),
          ).or(ThreadResponseSchema),
        ).array(),
      ).or('null'),
    ),
  postGuildsGuildIdChannels: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/channels',
      successStatus: 201,
      successDescription: '201 response for create_guild_channel',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'type?': type('null').or(ChannelTypesSchema),
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'position?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
        ),
        'topic?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow(
              (data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
            ),
        ).or('null'),
        'bitrate?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 8000 | null',
        ),
        'user_limit?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
        ),
        'nsfw?': type('boolean | null'),
        'rate_limit_per_user?': type('number.integer >= 0 & number.integer <= 21600 | null'),
        'parent_id?': type('null').or(SnowflakeTypeSchema),
        'permission_overwrites?': type(
          type(type(ChannelPermissionOverwriteRequestSchema).array()).and(type('unknown[] <= 100')),
        ).or('null'),
        'rtc_region?': type('string | null'),
        'video_quality_mode?': type('null').or(VideoQualityModesSchema),
        'default_auto_archive_duration?': type('null').or(ThreadAutoArchiveDurationSchema),
        'default_reaction_emoji?': type('null').or(UpdateDefaultReactionEmojiRequestSchema),
        'default_thread_rate_limit_per_user?': type(
          'number.integer >= 0 & number.integer <= 21600 | null',
        ),
        'default_sort_order?': type('null').or(ThreadSortOrderSchema),
        'default_forum_layout?': type('null').or(ForumLayoutSchema),
        'default_tag_setting?': type('null').or(ThreadSearchTagSettingSchema),
        'available_tags?': type(
          type(type(type('null').or(CreateOrUpdateThreadTagRequestSchema)).array()).and(
            type('unknown[] <= 20'),
          ),
        ).or('null'),
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
    .input(type({ guild_id: SnowflakeTypeSchema })),
  getGuildsGuildIdEmojis: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/emojis',
      successDescription: '200 response for list_guild_emojis',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(type(EmojiResponseSchema).array()).or('null')),
  postGuildsGuildIdEmojis: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/emojis',
      successStatus: 201,
      successDescription: '201 response for create_guild_emoji',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        image: type('string'),
        'roles?': type(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
      }),
    )
    .output(EmojiResponseSchema),
  getGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successDescription: '200 response for get_guild_emoji',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema),
  deleteGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_emoji',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdEmojisEmojiId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/emojis/{emoji_id}',
      successDescription: '200 response for update_guild_emoji',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        'roles?': type(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
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
      type({
        guild_id: SnowflakeTypeSchema,
        'invites_disabled_until?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('When invites will be enabled again'),
        'dms_disabled_until?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('When direct messages will be enabled again'),
      }),
    )
    .output(GuildIncidentsDataResponseSchema),
  getGuildsGuildIdIntegrations: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/integrations',
      successDescription: '200 response for list_guild_integrations',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(DiscordIntegrationResponseSchema).or(ExternalConnectionIntegrationResponseSchema),
          ).or(GuildSubscriptionIntegrationResponseSchema),
        ).array(),
      ).or('null'),
    ),
  deleteGuildsGuildIdIntegrationsIntegrationId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/integrations/{integration_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_integration',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema })),
  getGuildsGuildIdInvites: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/invites',
      successDescription: '200 response for list_guild_invites',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
              GuildInviteResponseSchema,
            ),
          ).or('null'),
        ).array(),
      ).or('null'),
    ),
  getGuildsGuildIdMembers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/members',
      successDescription: '200 response for list_guild_members',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 1000'),
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(GuildMemberResponseSchema).array()),
  patchGuildsGuildIdMembersMe: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/members/@me',
      successDescription: '200 response for update_my_guild_member',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'avatar?': type('string | null'),
        'bio?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'),
          ),
        ).or('null'),
        'banner?': type('string | null'),
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
      type({
        guild_id: SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 1000'),
        query: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      }),
    )
    .output(type(GuildMemberResponseSchema).array()),
  getGuildsGuildIdMembersUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/members/{user_id}',
      successDescription: '200 response for get_guild_member',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildMemberResponseSchema),
  putGuildsGuildIdMembersUserId: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/members/{user_id}',
      successStatus: 201,
      successDescription: '201 response for add_guild_member',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'roles?': type(
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 250'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'mute?': type('boolean | null'),
        'deaf?': type('boolean | null'),
        access_token: type('string').narrow(
          (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
        ),
        'flags?': type('number.integer | null'),
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
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdMembersUserId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/members/{user_id}',
      successDescription: '200 response for update_guild_member',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'roles?': type(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 350'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'mute?': type('boolean | null'),
        'deaf?': type('boolean | null'),
        'channel_id?': type('null').or(SnowflakeTypeSchema),
        'communication_disabled_until?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ).or('null'),
        'flags?': type('number.integer | null'),
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
      type({
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
      type({
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
      type({
        guild_id: SnowflakeTypeSchema,
        'sort_by?': SortingModeSchema,
        'sort_order?': SortingOrderSchema,
        'content?': type('string').narrow(
          (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
        ),
        'slop?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'author_id?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'author_type?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(AuthorTypeSchema).array())
            .and(type('unknown[] <= 6'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'mentions?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'mentions_role_id?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'replied_to_user_id?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'replied_to_message_id?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'mention_everyone?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'min_id?': SnowflakeTypeSchema,
        'max_id?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 25'),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 9975'),
        'has?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(HasOptionSchema).array())
            .and(type('unknown[] <= 18'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'link_hostname?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type(
              type('string').narrow(
                (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
              ),
            ).array(),
          )
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'embed_provider?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type(
              type('string').narrow(
                (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
              ),
            ).array(),
          )
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'embed_type?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SearchableEmbedTypeSchema).array())
            .and(type('unknown[] <= 5'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'attachment_extension?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type(
              type('string').narrow(
                (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
              ),
            ).array(),
          )
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'attachment_filename?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type(
              type('string').narrow(
                (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
              ),
            ).array(),
          )
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'pinned?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'include_nsfw?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'channel_id?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 500'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
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
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildHomeSettingsResponseSchema),
  getGuildsGuildIdOnboarding: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/onboarding',
      successDescription: '200 response for get_guilds_onboarding',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(UserGuildOnboardingResponseSchema),
  putGuildsGuildIdOnboarding: oc
    .route({
      method: 'PUT',
      path: '/guilds/{guild_id}/onboarding',
      successDescription: '200 response for put_guilds_onboarding',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'prompts?': type(
          type(type(UpdateOnboardingPromptRequestSchema).array()).and(type('unknown[] <= 15')),
        ).or('null'),
        'enabled?': type('boolean | null'),
        'default_channel_ids?': type(
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 500'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'mode?': type('null').or(GuildOnboardingModeSchema),
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
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema),
  getGuildsGuildIdPermissionsRoleRoleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/permissions/role/{role_id}',
      description:
        "Returns the permissions a role grants at the guild level, combining the role's own permissions with @everyone's.",
      successDescription: '200 response for get_guild_role_permissions',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema),
  getGuildsGuildIdPreview: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/preview',
      successDescription: '200 response for get_guild_preview',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildPreviewResponseSchema),
  getGuildsGuildIdPrune: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/prune',
      successDescription: '200 response for preview_prune_guild',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'days?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 30'),
        'include_roles?': type('unknown').pipe((data, ctx) => {
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
                            .to('null'),
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
      type({
        guild_id: SnowflakeTypeSchema,
        'days?': type('number.integer >= 1 & number.integer <= 30 | null'),
        'compute_prune_count?': type('boolean | null'),
        'include_roles?': type(
          type('string').or(
            type(type(SnowflakeTypeSchema).array())
              .and(type('unknown[] <= 100'))
              .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
          ),
        ).or('null'),
      }),
    )
    .output(GuildPruneResponseSchema),
  getGuildsGuildIdRegions: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/regions',
      successDescription: '200 response for list_guild_voice_regions',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(type(VoiceRegionResponseSchema).array()).or('null')),
  getGuildsGuildIdRequests: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/requests',
      description: 'List join requests for guild, optionally filtered by application status',
      successDescription: '200 response for get_guild_join_requests',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'status?': GuildJoinRequestApplicationStatusSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
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
      type({
        guild_id: SnowflakeTypeSchema,
        request_id: SnowflakeTypeSchema,
        'action?': GuildJoinRequestApplicationStatusSchema.describe(
          'Whether to approve or reject the join request',
        ),
        'rejection_reason?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 160 || ctx.mustBe('at most 160 characters'),
          ),
        )
          .or('null')
          .describe('Reason for rejection. Only used when action is REJECTED'),
      }),
    )
    .output(GuildJoinRequestResponseSchema),
  getGuildsGuildIdRoles: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for list_guild_roles',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(GuildRoleResponseSchema).array()),
  postGuildsGuildIdRoles: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for create_guild_role',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
        'permissions?': type('number.integer | null'),
        'color?': type('number.integer >= 0 & number.integer <= 16777215 | null'),
        'colors?': type('null').or(RoleColorsSchema),
        'hoist?': type('boolean | null'),
        'mentionable?': type('boolean | null'),
        'icon?': type('string | null'),
        'unicode_emoji?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildRoleResponseSchema),
  patchGuildsGuildIdRoles: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/roles',
      successDescription: '200 response for bulk_update_guild_roles',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(GuildRoleResponseSchema).array()),
  getGuildsGuildIdRolesMemberCounts: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles/member-counts',
      successDescription: '200 response for guild_role_member_counts',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type({ '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647' })),
  getGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successDescription: '200 response for get_guild_role',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(GuildRoleResponseSchema),
  deleteGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_role',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdRolesRoleId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/roles/{role_id}',
      successDescription: '200 response for update_guild_role',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
        'permissions?': type('number.integer | null'),
        'color?': type('number.integer >= 0 & number.integer <= 16777215 | null'),
        'colors?': type('null').or(RoleColorsSchema),
        'hoist?': type('boolean | null'),
        'mentionable?': type('boolean | null'),
        'icon?': type('string | null'),
        'unicode_emoji?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
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
      type({
        guild_id: SnowflakeTypeSchema,
        'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    )
    .output(
      type(
        type(
          type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
            VoiceScheduledEventResponseSchema,
          ),
        ).array(),
      ).or('null'),
    ),
  postGuildsGuildIdScheduledEvents: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/scheduled-events',
      successDescription: '200 response for create_guild_scheduled_event',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
        VoiceScheduledEventResponseSchema,
      ),
    ),
  getGuildsGuildIdScheduledEventsGuildScheduledEventId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
      successDescription: '200 response for get_guild_scheduled_event',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    )
    .output(
      type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
        VoiceScheduledEventResponseSchema,
      ),
    ),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_scheduled_event',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
      successDescription: '200 response for update_guild_scheduled_event',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
    .output(
      type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
        VoiceScheduledEventResponseSchema,
      ),
    ),
  postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions',
      description: 'Create an exception to a recurring guild scheduled event',
      successDescription: '200 response for create_guild_scheduled_event_exception',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'scheduled_start_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden start time of this occurrence'),
        'scheduled_end_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden end time of this occurrence'),
        original_scheduled_start_time: type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ).describe('The original start time of the occurrence to create an exception for'),
        'is_canceled?': type('boolean | null').describe('Whether this occurrence is canceled'),
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
      type({
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
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
        'scheduled_start_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden start time of this occurrence'),
        'scheduled_end_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden end time of this occurrence'),
        'is_canceled?': type('boolean | null').describe('Whether this occurrence is canceled'),
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
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(type(ScheduledEventUserResponseSchema).array()).or('null')),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
      description: 'Get the count of users subscribed to a guild scheduled event',
      successDescription: '200 response for count_guild_scheduled_event_users',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'guild_scheduled_event_exception_ids?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 10')),
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
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(type(ScheduledEventUserResponseSchema).array()).or('null')),
  getGuildsGuildIdSoundboardSounds: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/soundboard-sounds',
      successDescription: '200 response for list_guild_soundboard_sounds',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(ListGuildSoundboardSoundsResponseSchema),
  postGuildsGuildIdSoundboardSounds: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/soundboard-sounds',
      successStatus: 201,
      successDescription: '201 response for create_guild_soundboard_sound',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        'volume?': type('number >= 0 & number <= 1 | null'),
        'emoji_id?': type('null').or(SnowflakeTypeSchema),
        'emoji_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        ).or('null'),
        sound: type('string'),
      }),
    )
    .output(SoundboardSoundResponseSchema),
  getGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successDescription: '200 response for get_guild_soundboard_sound',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .output(SoundboardSoundResponseSchema),
  deleteGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_soundboard_sound',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdSoundboardSoundsSoundId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
      successDescription: '200 response for update_guild_soundboard_sound',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        'volume?': type('number >= 0 & number <= 1 | null'),
        'emoji_id?': type('null').or(SnowflakeTypeSchema),
        'emoji_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        ).or('null'),
      }),
    )
    .output(SoundboardSoundResponseSchema),
  getGuildsGuildIdStickers: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/stickers',
      successDescription: '200 response for list_guild_stickers',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(GuildStickerResponseSchema).array()),
  postGuildsGuildIdStickers: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/stickers',
      successStatus: 201,
      successDescription: '201 response for create_guild_sticker',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema),
  getGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successDescription: '200 response for get_guild_sticker',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema),
  deleteGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'DELETE',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successStatus: 204,
      successDescription: '204 response for delete_guild_sticker',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
  patchGuildsGuildIdStickersStickerId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/stickers/{sticker_id}',
      successDescription: '200 response for update_guild_sticker',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        sticker_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters')),
        'tags?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 200 || ctx.mustBe('at most 200 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildStickerResponseSchema),
  getGuildsGuildIdTemplates: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/templates',
      successDescription: '200 response for list_guild_templates',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(type(GuildTemplateResponseSchema).array()).or('null')),
  postGuildsGuildIdTemplates: oc
    .route({
      method: 'POST',
      path: '/guilds/{guild_id}/templates',
      successDescription: '200 response for create_guild_template',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'),
          ),
        ).or('null'),
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
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
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
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
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
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildTemplateResponseSchema),
  getGuildsGuildIdThreadsActive: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/threads/active',
      successDescription: '200 response for get_active_guild_threads',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(ThreadsResponseSchema),
  getGuildsGuildIdVanityUrl: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/vanity-url',
      successDescription: '200 response for get_guild_vanity_url',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(VanityURLResponseSchema),
  getGuildsGuildIdVoiceStatesMe: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/voice-states/@me',
      successDescription: '200 response for get_self_voice_state',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema),
  patchGuildsGuildIdVoiceStatesMe: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/voice-states/@me',
      successStatus: 204,
      successDescription: '204 response for update_self_voice_state',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'request_to_speak_timestamp?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ).or('null'),
        'suppress?': type('boolean | null'),
        'channel_id?': type('null').or(SnowflakeTypeSchema),
      }),
    ),
  getGuildsGuildIdVoiceStatesUserId: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/voice-states/{user_id}',
      successDescription: '200 response for get_voice_state',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema),
  patchGuildsGuildIdVoiceStatesUserId: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/voice-states/{user_id}',
      successStatus: 204,
      successDescription: '204 response for update_voice_state',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'suppress?': type('boolean | null'),
        'channel_id?': type('null').or(SnowflakeTypeSchema),
      }),
    ),
  getGuildsGuildIdWebhooks: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/webhooks',
      successDescription: '200 response for get_guild_webhooks',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
          ).or(GuildIncomingWebhookResponseSchema),
        ).array(),
      ).or('null'),
    ),
  getGuildsGuildIdWelcomeScreen: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/welcome-screen',
      successDescription: '200 response for get_guild_welcome_screen',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildWelcomeScreenResponseSchema),
  patchGuildsGuildIdWelcomeScreen: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/welcome-screen',
      successDescription: '200 response for update_guild_welcome_screen',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 140 || ctx.mustBe('at most 140 characters'),
          ),
        ).or('null'),
        'welcome_channels?': type(
          type(type(GuildWelcomeChannelSchema).array()).and(type('unknown[] <= 5')),
        ).or('null'),
        'enabled?': type('boolean | null'),
      }),
    )
    .output(GuildWelcomeScreenResponseSchema),
  getGuildsGuildIdWidget: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget',
      successDescription: '200 response for get_guild_widget_settings',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetSettingsResponseSchema),
  patchGuildsGuildIdWidget: oc
    .route({
      method: 'PATCH',
      path: '/guilds/{guild_id}/widget',
      successDescription: '200 response for update_guild_widget_settings',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'channel_id?': type('null').or(SnowflakeTypeSchema),
        'enabled?': type('boolean | null'),
      }),
    )
    .output(WidgetSettingsResponseSchema),
  getGuildsGuildIdWidgetJson: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget.json',
      successDescription: '200 response for get_guild_widget',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetResponseSchema),
  getGuildsGuildIdWidgetPng: oc
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/widget.png',
      successDescription: '200 response for get_guild_widget_png',
    })
    .input(type({ guild_id: SnowflakeTypeSchema, 'style?': WidgetImageStylesSchema })),
  postInteractionsInteractionIdInteractionTokenCallback: oc
    .route({
      method: 'POST',
      path: '/interactions/{interaction_id}/{interaction_token}/callback',
      successDescription: '200 response for create_interaction_response',
    })
    .input(
      type({
        interaction_id: SnowflakeTypeSchema,
        interaction_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'with_response?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'guild_scheduled_event_id?': SnowflakeTypeSchema,
        'target_channel_id?': SnowflakeTypeSchema,
        'target_message_id?': SnowflakeTypeSchema,
      }),
    )
    .output(
      type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
        GuildInviteResponseSchema,
      ),
    ),
  deleteInvitesCode: oc
    .route({
      method: 'DELETE',
      path: '/invites/{code}',
      successDescription: '200 response for invite_revoke',
    })
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(
      type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
        GuildInviteResponseSchema,
      ),
    ),
  getInvitesCodeTargetUsers: oc
    .route({
      method: 'GET',
      path: '/invites/{code}/target-users',
      description: 'Get the target users for an invite.',
      successDescription: '200 response for get_invite_target_users',
    })
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
  putInvitesCodeTargetUsers: oc
    .route({
      method: 'PUT',
      path: '/invites/{code}/target-users',
      description: 'Update the target users for an existing invite.',
      successStatus: 204,
      successDescription: '204 response for update_invite_target_users',
    })
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
  postInvitesCodeTargetUsersBulkAdd: oc
    .route({
      method: 'POST',
      path: '/invites/{code}/target-users/bulk-add',
      description: 'Add multiple target users to an existing invite.',
      successStatus: 204,
      successDescription: '204 response for bulk_add_invite_target_users',
    })
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_ids: type(type(SnowflakeTypeSchema).array())
          .and(type('1 <= unknown[] <= 1000'))
          .describe('The IDs of the users to target.'),
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
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_ids: type(type(SnowflakeTypeSchema).array())
          .and(type('1 <= unknown[] <= 1000'))
          .describe('The IDs of the users to stop targeting.'),
      }),
    ),
  getInvitesCodeTargetUsersJobStatus: oc
    .route({
      method: 'GET',
      path: '/invites/{code}/target-users/job-status',
      description: 'Get the target users job status for an invite.',
      successDescription: '200 response for get_invite_target_users_job_status',
    })
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
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
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_id: SnowflakeTypeSchema,
      }),
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
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_id: SnowflakeTypeSchema,
      }),
    ),
  postLobbies: oc
    .route({
      method: 'POST',
      path: '/lobbies',
      successStatus: 201,
      successDescription: '201 response for create_lobby',
    })
    .input(
      type({
        'idle_timeout_seconds?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 604800 | null',
        'members?': type(
          type(type(LobbyMemberRequestSchema).array()).and(type('unknown[] <= 25')),
        ).or('null'),
        'metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        'flags?': 'null | 1',
        'override_event_webhooks_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
          ),
        ).or('null'),
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
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
      type({
        'idle_timeout_seconds?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 604800 | null',
        'lobby_metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        'member_metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        secret: type('string').narrow(
          (data, ctx) => [...data].length <= 250 || ctx.mustBe('at most 250 characters'),
        ),
        'flags?': 'null | 1',
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
      }),
    )
    .output(LobbyResponseSchema),
  getLobbiesLobbyId: oc
    .route({
      method: 'GET',
      path: '/lobbies/{lobby_id}',
      successDescription: '200 response for get_lobby',
    })
    .input(type({ lobby_id: SnowflakeTypeSchema }))
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
    .input(type({ lobby_id: SnowflakeTypeSchema })),
  patchLobbiesLobbyId: oc
    .route({
      method: 'PATCH',
      path: '/lobbies/{lobby_id}',
      successDescription: '200 response for edit_lobby',
    })
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        'idle_timeout_seconds?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 604800 | null',
        ),
        'metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        'members?': type(
          type(type(LobbyMemberRequestSchema).array()).and(type('unknown[] <= 25')),
        ).or('null'),
        'flags?': type('null | 1'),
        'override_event_webhooks_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
          ),
        ).or('null'),
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
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
      type({ lobby_id: SnowflakeTypeSchema, 'channel_id?': type('null').or(SnowflakeTypeSchema) }),
    )
    .output(LobbyResponseSchema),
  deleteLobbiesLobbyIdMembersMe: oc
    .route({
      method: 'DELETE',
      path: '/lobbies/{lobby_id}/members/@me',
      successStatus: 204,
      successDescription: '204 response for leave_lobby',
    })
    .input(type({ lobby_id: SnowflakeTypeSchema })),
  postLobbiesLobbyIdMembersMeInvites: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/@me/invites',
      successDescription: '200 response for create_linked_lobby_guild_invite_for_self',
    })
    .input(type({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema),
  postLobbiesLobbyIdMembersBulk: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/bulk',
      successDescription: '200 response for bulk_update_lobby_members',
    })
    .input(type({ lobby_id: SnowflakeTypeSchema }))
    .output(type(type(LobbyMemberResponseSchema).array()).or('null')),
  putLobbiesLobbyIdMembersUserId: oc
    .route({
      method: 'PUT',
      path: '/lobbies/{lobby_id}/members/{user_id}',
      successDescription: '200 response for add_lobby_member',
    })
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        'flags?': type('null | 1'),
        'additional_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        ).or('null'),
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
    .input(type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
  postLobbiesLobbyIdMembersUserIdInvites: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/members/{user_id}/invites',
      successDescription: '200 response for create_linked_lobby_guild_invite_for_user',
    })
    .input(type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema),
  getLobbiesLobbyIdMessages: oc
    .route({
      method: 'GET',
      path: '/lobbies/{lobby_id}/messages',
      successDescription: '200 response for get_lobby_messages',
    })
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 200'),
      }),
    )
    .output(type(type(LobbyMessageResponseSchema).array()).or('null')),
  postLobbiesLobbyIdMessages: oc
    .route({
      method: 'POST',
      path: '/lobbies/{lobby_id}/messages',
      successStatus: 201,
      successDescription: '201 response for create_lobby_message',
    })
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
        'sticker_ids?': type(
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3')),
        ).or('null'),
        'components?': type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(ActionRowComponentForMessageRequestSchema).or(
                          ContainerComponentForMessageRequestSchema,
                        ),
                      ).or(FileComponentForMessageRequestSchema),
                    ).or(MediaGalleryComponentForMessageRequestSchema),
                  ).or(SectionComponentForMessageRequestSchema),
                ).or(SeparatorComponentForMessageRequestSchema),
              ).or(TextDisplayComponentForMessageRequestSchema),
            ).array(),
          ).and(type('unknown[] <= 40')),
        ).or('null'),
        'flags?': type('number.integer | null'),
        'attachments?': type(
          type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
        ).or('null'),
        'poll?': type('null').or(PollCreateRequestSchema),
        'shared_client_theme?': type('null').or(CustomClientThemeShareRequestSchema),
        'message_reference?': type('null').or(MessageReferenceRequestSchema),
        'nonce?': type(
          type(
            type('bigint | number.integer')
              .or(/^-?\d+$/)
              .pipe((data) => BigInt(data))
              .narrow(
                (data, ctx) =>
                  (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                  ctx.mustBe('an int64'),
              )
              .narrow(
                (data, ctx) =>
                  data >= -9223372036854775808n || ctx.mustBe('at least -9223372036854775808'),
              )
              .narrow(
                (data, ctx) =>
                  data <= 9223372036854775808n || ctx.mustBe('at most 9223372036854775808'),
              ),
          ).or(
            type('string').narrow(
              (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
            ),
          ),
        ).or('null'),
        'enforce_nonce?': type('boolean | null'),
        'tts?': type('boolean | null'),
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
    .input(type({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
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
      type({
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
      type({
        client_id: SnowflakeTypeSchema,
        'client_secret?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
          ),
        ).or('null'),
        external_auth_token: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
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
      type({
        external_user_id: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
      }),
    ),
  postPartnerSdkToken: oc
    .route({
      method: 'POST',
      path: '/partner-sdk/token',
      successDescription: '200 response for partner_sdk_token',
    })
    .input(
      type({
        client_id: SnowflakeTypeSchema,
        'client_secret?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
          ),
        ).or('null'),
        external_auth_token: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
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
      type({
        'provisional_user_id?': type('null').or(SnowflakeTypeSchema),
        external_user_id: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
        'preferred_global_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        ).or('null'),
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
      type({
        sku_id: SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'user_id?': SnowflakeTypeSchema,
      }),
    )
    .output(type(SubscriptionResponseSchema).array()),
  getSkusSkuIdSubscriptionsSubscriptionId: oc
    .route({
      method: 'GET',
      path: '/skus/{sku_id}/subscriptions/{subscription_id}',
      description: 'Get a subscription by its ID.',
      successDescription: '200 response for get_sku_subscription',
    })
    .input(
      type({
        sku_id: SnowflakeTypeSchema,
        subscription_id: SnowflakeTypeSchema,
        'user_id?': SnowflakeTypeSchema,
      }),
    )
    .output(SubscriptionResponseSchema),
  getSoundboardDefaultSounds: oc
    .route({
      method: 'GET',
      path: '/soundboard-default-sounds',
      successDescription: '200 response for get_soundboard_default_sounds',
    })
    .output(type(SoundboardSoundResponseSchema).array()),
  postStageInstances: oc
    .route({
      method: 'POST',
      path: '/stage-instances',
      successDescription: '200 response for create_stage_instance',
    })
    .input(
      type({
        topic: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
        channel_id: SnowflakeTypeSchema,
        'privacy_level?': type('null').or(StageInstancesPrivacyLevelsSchema),
        'guild_scheduled_event_id?': type('null').or(SnowflakeTypeSchema),
        'send_start_notification?': 'boolean | null',
      }),
    )
    .output(StageInstanceResponseSchema),
  getStageInstancesChannelId: oc
    .route({
      method: 'GET',
      path: '/stage-instances/{channel_id}',
      successDescription: '200 response for get_stage_instance',
    })
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(StageInstanceResponseSchema),
  deleteStageInstancesChannelId: oc
    .route({
      method: 'DELETE',
      path: '/stage-instances/{channel_id}',
      successStatus: 204,
      successDescription: '204 response for delete_stage_instance',
    })
    .input(type({ channel_id: SnowflakeTypeSchema })),
  patchStageInstancesChannelId: oc
    .route({
      method: 'PATCH',
      path: '/stage-instances/{channel_id}',
      successDescription: '200 response for update_stage_instance',
    })
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'topic?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
        'privacy_level?': StageInstancesPrivacyLevelsSchema,
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
    .input(type({ pack_id: SnowflakeTypeSchema }))
    .output(StickerPackResponseSchema),
  getStickersStickerId: oc
    .route({
      method: 'GET',
      path: '/stickers/{sticker_id}',
      successDescription: '200 response for get_sticker',
    })
    .input(type({ sticker_id: SnowflakeTypeSchema }))
    .output(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema)),
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
      type({
        application_id: SnowflakeTypeSchema,
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
                            .to('null'),
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
        'exclude_consumed?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    )
    .output(type(EntitlementResponseSchema).array()),
  getUsersMeApplicationsApplicationIdRoleConnection: oc
    .route({
      method: 'GET',
      path: '/users/@me/applications/{application_id}/role-connection',
      successDescription: '200 response for get_application_user_role_connection',
    })
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(ApplicationUserRoleConnectionResponseSchema),
  putUsersMeApplicationsApplicationIdRoleConnection: oc
    .route({
      method: 'PUT',
      path: '/users/@me/applications/{application_id}/role-connection',
      successDescription: '200 response for update_application_user_role_connection',
    })
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        'platform_name?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters'),
          ),
        ).or('null'),
        'platform_username?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
        'metadata?': type(
          type({
            '[string]': type('string')
              .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
              .narrow(
                (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
              ),
          }),
        ).or('null'),
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
    .input(type({ application_id: SnowflakeTypeSchema })),
  postUsersMeChannels: oc
    .route({
      method: 'POST',
      path: '/users/@me/channels',
      successDescription: '200 response for create_dm',
    })
    .input(CreatePrivateChannelRequestSchema)
    .output(type(PrivateChannelResponseSchema).or(PrivateGroupChannelResponseSchema)),
  getUsersMeConnections: oc
    .route({
      method: 'GET',
      path: '/users/@me/connections',
      successDescription: '200 response for list_my_connections',
    })
    .output(type(type(ConnectedAccountResponseSchema).array()).or('null')),
  getUsersMeGuilds: oc
    .route({
      method: 'GET',
      path: '/users/@me/guilds',
      successDescription: '200 response for list_my_guilds',
    })
    .input(
      type({
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 200'),
        'shard?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    )
    .output(type(type(MyGuildResponseSchema).array()).or('null')),
  deleteUsersMeGuildsGuildId: oc
    .route({
      method: 'DELETE',
      path: '/users/@me/guilds/{guild_id}',
      successStatus: 204,
      successDescription: '204 response for leave_guild',
    })
    .input(type({ guild_id: SnowflakeTypeSchema })),
  getUsersMeGuildsGuildIdMember: oc
    .route({
      method: 'GET',
      path: '/users/@me/guilds/{guild_id}/member',
      successDescription: '200 response for get_my_guild_member',
    })
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(PrivateGuildMemberResponseSchema),
  getUsersUserId: oc
    .route({
      method: 'GET',
      path: '/users/{user_id}',
      successDescription: '200 response for get_user',
    })
    .input(type({ user_id: SnowflakeTypeSchema }))
    .output(UserResponseSchema),
  getVoiceRegions: oc
    .route({
      method: 'GET',
      path: '/voice/regions',
      successDescription: '200 response for list_voice_regions',
    })
    .output(type(type(VoiceRegionResponseSchema).array()).or('null')),
  getWebhooksWebhookId: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}',
      successDescription: '200 response for get_webhook',
    })
    .input(type({ webhook_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
      ).or(GuildIncomingWebhookResponseSchema),
    ),
  deleteWebhooksWebhookId: oc
    .route({
      method: 'DELETE',
      path: '/webhooks/{webhook_id}',
      successStatus: 204,
      successDescription: '204 response for delete_webhook',
    })
    .input(type({ webhook_id: SnowflakeTypeSchema })),
  patchWebhooksWebhookId: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}',
      successDescription: '200 response for update_webhook',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        'avatar?': type('string | null'),
        'channel_id?': type('null').or(SnowflakeTypeSchema),
      }),
    )
    .output(
      type(
        type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
      ).or(GuildIncomingWebhookResponseSchema),
    ),
  getWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successDescription: '200 response for get_webhook_by_token',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(
      type(
        type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
      ).or(GuildIncomingWebhookResponseSchema),
    ),
  postWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'POST',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successDescription: '200 response for execute_webhook',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'wait?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'thread_id?': SnowflakeTypeSchema,
        'with_components?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
  patchWebhooksWebhookIdWebhookToken: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}',
      successDescription: '200 response for update_webhook_by_token',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        'avatar?': type('string | null'),
      }),
    )
    .output(
      type(
        type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
      ).or(GuildIncomingWebhookResponseSchema),
    ),
  postWebhooksWebhookIdWebhookTokenGithub: oc
    .route({
      method: 'POST',
      path: '/webhooks/{webhook_id}/{webhook_token}/github',
      successStatus: 204,
      successDescription: '204 response for execute_github_compatible_webhook',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'wait?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'thread_id?': SnowflakeTypeSchema,
        'action?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
        'ref?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
        'ref_type?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
        'comment?': type('null').or(GithubCommentSchema),
        'issue?': type('null').or(GithubIssueSchema),
        'pull_request?': type('null').or(GithubIssueSchema),
        'repository?': type('null').or(GithubRepositorySchema),
        'forkee?': type('null').or(GithubRepositorySchema),
        sender: GithubUserSchema,
        'member?': type('null').or(GithubUserSchema),
        'release?': type('null').or(GithubReleaseSchema),
        'head_commit?': type('null').or(GithubCommitSchema),
        'commits?': type(type(type(GithubCommitSchema).array()).and(type('unknown[] <= 1521'))).or(
          'null',
        ),
        'forced?': type('boolean | null'),
        'compare?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
          ),
        ).or('null'),
        'review?': type('null').or(GithubReviewSchema),
        'check_run?': type('null').or(GithubCheckRunSchema),
        'check_suite?': type('null').or(GithubCheckSuiteSchema),
        'discussion?': type('null').or(GithubDiscussionSchema),
        'answer?': type('null').or(GithubCommentSchema),
      }),
    ),
  getWebhooksWebhookIdWebhookTokenMessagesOriginal: oc
    .route({
      method: 'GET',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
      successDescription: '200 response for get_original_webhook_message',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'thread_id?': SnowflakeTypeSchema,
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
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'thread_id?': SnowflakeTypeSchema,
      }),
    ),
  patchWebhooksWebhookIdWebhookTokenMessagesOriginal: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
      successDescription: '200 response for update_original_webhook_message',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'thread_id?': SnowflakeTypeSchema,
        'with_components?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
        'components?': type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(ActionRowComponentForMessageRequestSchema).or(
                          ContainerComponentForMessageRequestSchema,
                        ),
                      ).or(FileComponentForMessageRequestSchema),
                    ).or(MediaGalleryComponentForMessageRequestSchema),
                  ).or(SectionComponentForMessageRequestSchema),
                ).or(SeparatorComponentForMessageRequestSchema),
              ).or(TextDisplayComponentForMessageRequestSchema),
            ).array(),
          ).and(type('unknown[] <= 40')),
        ).or('null'),
        'attachments?': type(
          type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
        ).or('null'),
        'poll?': type('null').or(PollCreateRequestSchema),
        'flags?': type('number.integer | null'),
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
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        message_id: SnowflakeTypeSchema,
        'thread_id?': SnowflakeTypeSchema,
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
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        message_id: SnowflakeTypeSchema,
        'thread_id?': SnowflakeTypeSchema,
      }),
    ),
  patchWebhooksWebhookIdWebhookTokenMessagesMessageId: oc
    .route({
      method: 'PATCH',
      path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
      successDescription: '200 response for update_webhook_message',
    })
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        message_id: SnowflakeTypeSchema,
        'thread_id?': SnowflakeTypeSchema,
        'with_components?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
        'components?': type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(ActionRowComponentForMessageRequestSchema).or(
                          ContainerComponentForMessageRequestSchema,
                        ),
                      ).or(FileComponentForMessageRequestSchema),
                    ).or(MediaGalleryComponentForMessageRequestSchema),
                  ).or(SectionComponentForMessageRequestSchema),
                ).or(SeparatorComponentForMessageRequestSchema),
              ).or(TextDisplayComponentForMessageRequestSchema),
            ).array(),
          ).and(type('unknown[] <= 40')),
        ).or('null'),
        'attachments?': type(
          type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
        ).or('null'),
        'poll?': type('null').or(PollCreateRequestSchema),
        'flags?': type('number.integer | null'),
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
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'wait?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'thread_id?': SnowflakeTypeSchema,
        'text?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
          ),
        ).or('null'),
        'username?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
        'icon_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
          ),
        ).or('null'),
        'attachments?': type(
          type(type(WebhookSlackEmbedSchema).array()).and(type('unknown[] <= 1521')),
        ).or('null'),
      }),
    )
    .output(type('string | null')),
}
