import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ApplicationIncomingWebhookResponseSchema,
  AuditLogActionTypesSchema,
  AuthorTypeSchema,
  BanUserFromGuildRequestSchema,
  BotAddGuildMemberRequestSchema,
  BulkBanUsersRequestSchema,
  BulkBanUsersResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  CreateGuildChannelRequestSchema,
  CreateRoleRequestSchema,
  DefaultKeywordListUpsertRequestSchema,
  DefaultKeywordListUpsertRequestPartialSchema,
  DefaultKeywordRuleResponseSchema,
  DiscordIntegrationResponseSchema,
  EmojiResponseSchema,
  ExternalConnectionIntegrationResponseSchema,
  ExternalScheduledEventCreateRequestSchema,
  ExternalScheduledEventPatchRequestPartialSchema,
  ExternalScheduledEventResponseSchema,
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildAuditLogResponseSchema,
  GuildBanResponseSchema,
  GuildChannelResponseSchema,
  GuildHomeSettingsResponseSchema,
  GuildIncidentActionsRequestSchema,
  GuildIncidentsDataResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  GuildJoinRequestApplicationStatusSchema,
  GuildJoinRequestResponseSchema,
  GuildJoinRequestsListResponseSchema,
  GuildMemberResponseSchema,
  GuildOnboardingResponseSchema,
  GuildPatchRequestPartialSchema,
  GuildPreviewResponseSchema,
  GuildPruneResponseSchema,
  GuildResponseSchema,
  GuildRoleResponseSchema,
  GuildScheduledEventExceptionCreateRequestSchema,
  GuildScheduledEventExceptionPatchRequestPartialSchema,
  GuildScheduledEventExceptionResponseSchema,
  GuildSearchResponseSchema,
  GuildStickerResponseSchema,
  GuildSubscriptionIntegrationResponseSchema,
  GuildTemplateResponseSchema,
  GuildWelcomeScreenResponseSchema,
  GuildWithCountsResponseSchema,
  HasOptionSchema,
  KeywordRuleResponseSchema,
  KeywordUpsertRequestSchema,
  KeywordUpsertRequestPartialSchema,
  ListGuildSoundboardSoundsResponseSchema,
  MLSpamRuleResponseSchema,
  MLSpamUpsertRequestSchema,
  MLSpamUpsertRequestPartialSchema,
  MentionSpamRuleResponseSchema,
  MentionSpamUpsertRequestSchema,
  MentionSpamUpsertRequestPartialSchema,
  PermissionsResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  PrivateGuildMemberResponseSchema,
  PruneGuildRequestSchema,
  ScheduledEventUserCountResponseSchema,
  ScheduledEventUserResponseSchema,
  SearchIndexNotReadyResponseSchema,
  SearchableEmbedTypeSchema,
  SnowflakeTypeSchema,
  SortingModeSchema,
  SortingOrderSchema,
  SoundboardCreateRequestSchema,
  SoundboardPatchRequestPartialSchema,
  SoundboardSoundResponseSchema,
  StageScheduledEventCreateRequestSchema,
  StageScheduledEventPatchRequestPartialSchema,
  StageScheduledEventResponseSchema,
  ThreadResponseSchema,
  ThreadsResponseSchema,
  UnbanUserFromGuildRequestSchema,
  UpdateGuildOnboardingRequestSchema,
  UpdateRolePositionsRequestSchema,
  UpdateRoleRequestPartialSchema,
  UpdateSelfVoiceStateRequestPartialSchema,
  UpdateVoiceStateRequestPartialSchema,
  UserGuildOnboardingResponseSchema,
  UserProfileRuleResponseSchema,
  UserProfileUpsertRequestSchema,
  UserProfileUpsertRequestPartialSchema,
  VanityURLResponseSchema,
  VoiceRegionResponseSchema,
  VoiceScheduledEventCreateRequestSchema,
  VoiceScheduledEventPatchRequestPartialSchema,
  VoiceScheduledEventResponseSchema,
  VoiceStateResponseSchema,
  WelcomeScreenPatchRequestPartialSchema,
  WidgetImageStylesSchema,
  WidgetResponseSchema,
  WidgetSettingsResponseSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const guildsHandler = new Hono()
  .get(
    '/guilds/templates/:code',
    describeRoute({
      operationId: 'get_guild_template',
      responses: {
        '200': {
          description: '200 response for get_guild_template',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildTemplateResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id',
    describeRoute({
      operationId: 'get_guild',
      responses: {
        '200': {
          description: '200 response for get_guild',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildWithCountsResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          with_counts: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id',
    describeRoute({
      operationId: 'update_guild',
      responses: {
        '200': {
          description: '200 response for update_guild',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(GuildPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/audit-logs',
    describeRoute({
      operationId: 'list_guild_audit_log_entries',
      responses: {
        '200': {
          description: '200 response for list_guild_audit_log_entries',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildAuditLogResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          user_id: Type.Optional(SnowflakeTypeSchema),
          target_id: Type.Optional(SnowflakeTypeSchema),
          action_type: Type.Optional(AuditLogActionTypesSchema),
          before: Type.Optional(SnowflakeTypeSchema),
          after: Type.Optional(SnowflakeTypeSchema),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules',
    describeRoute({
      operationId: 'list_auto_moderation_rules',
      responses: {
        '200': {
          description: '200 response for list_auto_moderation_rules',
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
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        DefaultKeywordRuleResponseSchema,
                        KeywordRuleResponseSchema,
                        MLSpamRuleResponseSchema,
                        MentionSpamRuleResponseSchema,
                        UserProfileRuleResponseSchema,
                        Type.Union([Type.Null(), Type.Null()]),
                      ]),
                    ),
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/auto-moderation/rules',
    describeRoute({
      operationId: 'create_auto_moderation_rule',
      responses: {
        '200': {
          description: '200 response for create_auto_moderation_rule',
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
                Compile(
                  Type.Union([
                    DefaultKeywordRuleResponseSchema,
                    KeywordRuleResponseSchema,
                    MLSpamRuleResponseSchema,
                    MentionSpamRuleResponseSchema,
                    UserProfileRuleResponseSchema,
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Union([
          DefaultKeywordListUpsertRequestSchema,
          KeywordUpsertRequestSchema,
          MLSpamUpsertRequestSchema,
          MentionSpamUpsertRequestSchema,
          UserProfileUpsertRequestSchema,
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    describeRoute({
      operationId: 'get_auto_moderation_rule',
      responses: {
        '200': {
          description: '200 response for get_auto_moderation_rule',
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
                Compile(
                  Type.Union([
                    DefaultKeywordRuleResponseSchema,
                    KeywordRuleResponseSchema,
                    MLSpamRuleResponseSchema,
                    MentionSpamRuleResponseSchema,
                    UserProfileRuleResponseSchema,
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
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    describeRoute({
      operationId: 'delete_auto_moderation_rule',
      responses: {
        '204': {
          description: '204 response for delete_auto_moderation_rule',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    describeRoute({
      operationId: 'update_auto_moderation_rule',
      responses: {
        '200': {
          description: '200 response for update_auto_moderation_rule',
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
                Compile(
                  Type.Union([
                    DefaultKeywordRuleResponseSchema,
                    KeywordRuleResponseSchema,
                    MLSpamRuleResponseSchema,
                    MentionSpamRuleResponseSchema,
                    UserProfileRuleResponseSchema,
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
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Union([
          DefaultKeywordListUpsertRequestPartialSchema,
          KeywordUpsertRequestPartialSchema,
          MLSpamUpsertRequestPartialSchema,
          MentionSpamUpsertRequestPartialSchema,
          UserProfileUpsertRequestPartialSchema,
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/bans',
    describeRoute({
      operationId: 'list_guild_bans',
      responses: {
        '200': {
          description: '200 response for list_guild_bans',
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
                Compile(Type.Union([Type.Array(GuildBanResponseSchema), Type.Null()])),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          before: Type.Optional(SnowflakeTypeSchema),
          after: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/bans/:user_id',
    describeRoute({
      operationId: 'get_guild_ban',
      responses: {
        '200': {
          description: '200 response for get_guild_ban',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildBanResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/bans/:user_id',
    describeRoute({
      operationId: 'ban_user_from_guild',
      responses: {
        '204': {
          description: '204 response for ban_user_from_guild',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(BanUserFromGuildRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/bans/:user_id',
    describeRoute({
      operationId: 'unban_user_from_guild',
      responses: {
        '204': {
          description: '204 response for unban_user_from_guild',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(UnbanUserFromGuildRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    describeRoute({
      operationId: 'bulk_ban_users_from_guild',
      responses: {
        '200': {
          description: '200 response for bulk_ban_users_from_guild',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(BulkBanUsersResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(BulkBanUsersRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/channels',
    describeRoute({
      operationId: 'list_guild_channels',
      responses: {
        '200': {
          description: '200 response for list_guild_channels',
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
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        GuildChannelResponseSchema,
                        PrivateChannelResponseSchema,
                        PrivateGroupChannelResponseSchema,
                        ThreadResponseSchema,
                      ]),
                    ),
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
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/channels',
    describeRoute({
      operationId: 'create_guild_channel',
      responses: {
        '201': {
          description: '201 response for create_guild_channel',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildChannelResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(CreateGuildChannelRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/channels',
    describeRoute({
      operationId: 'bulk_update_guild_channels',
      responses: {
        '204': {
          description: '204 response for bulk_update_guild_channels',
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Array(
          Type.Object({
            id: Type.Optional(
              Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
            ),
            position: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
            parent_id: Type.Optional(
              Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
            ),
            lock_permissions: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
          }),
        ),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/emojis',
    describeRoute({
      operationId: 'list_guild_emojis',
      responses: {
        '200': {
          description: '200 response for list_guild_emojis',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(Type.Union([Type.Array(EmojiResponseSchema), Type.Null()]))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/emojis',
    describeRoute({
      operationId: 'create_guild_emoji',
      responses: {
        '201': {
          description: '201 response for create_guild_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(EmojiResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.String({ minLength: 2, maxLength: 32 }),
          image: Type.String(),
          roles: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                { maxItems: 1521, uniqueItems: true },
              ),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/emojis/:emoji_id',
    describeRoute({
      operationId: 'get_guild_emoji',
      responses: {
        '200': {
          description: '200 response for get_guild_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(EmojiResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    describeRoute({
      operationId: 'delete_guild_emoji',
      responses: {
        '204': {
          description: '204 response for delete_guild_emoji',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/emojis/:emoji_id',
    describeRoute({
      operationId: 'update_guild_emoji',
      responses: {
        '200': {
          description: '200 response for update_guild_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(EmojiResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.Optional(Type.String({ minLength: 2, maxLength: 32 })),
          roles: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                { maxItems: 1521, uniqueItems: true },
              ),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/incident-actions',
    describeRoute({
      description: 'Modifies the incident actions of the guild',
      operationId: 'update_guild_incident_actions',
      responses: {
        '200': {
          description: '200 response for update_guild_incident_actions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildIncidentsDataResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(GuildIncidentActionsRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/integrations',
    describeRoute({
      operationId: 'list_guild_integrations',
      responses: {
        '200': {
          description: '200 response for list_guild_integrations',
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
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        DiscordIntegrationResponseSchema,
                        ExternalConnectionIntegrationResponseSchema,
                        GuildSubscriptionIntegrationResponseSchema,
                      ]),
                    ),
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    describeRoute({
      operationId: 'delete_guild_integration',
      responses: {
        '204': {
          description: '204 response for delete_guild_integration',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/invites',
    describeRoute({
      operationId: 'list_guild_invites',
      responses: {
        '200': {
          description: '200 response for list_guild_invites',
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
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        FriendInviteResponseSchema,
                        GroupDMInviteResponseSchema,
                        GuildInviteResponseSchema,
                        Type.Union([Type.Null(), Type.Null()]),
                      ]),
                    ),
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members',
    describeRoute({
      operationId: 'list_guild_members',
      responses: {
        '200': {
          description: '200 response for list_guild_members',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(Type.Array(GuildMemberResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          after: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/@me',
    describeRoute({
      operationId: 'update_my_guild_member',
      responses: {
        '200': {
          description: '200 response for update_my_guild_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(PrivateGuildMemberResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          nick: Type.Optional(Type.Union([Type.String({ maxLength: 32 }), Type.Null()])),
          avatar: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          bio: Type.Optional(Type.Union([Type.String({ maxLength: 300 }), Type.Null()])),
          banner: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members/search',
    describeRoute({
      operationId: 'search_guild_members',
      responses: {
        '200': {
          description: '200 response for search_guild_members',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(Type.Array(GuildMemberResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          query: Type.String({ minLength: 1, maxLength: 100 }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members/:user_id',
    describeRoute({
      operationId: 'get_guild_member',
      responses: {
        '200': {
          description: '200 response for get_guild_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildMemberResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id',
    describeRoute({
      operationId: 'add_guild_member',
      responses: {
        '201': {
          description: '201 response for add_guild_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildMemberResponseSchema)) } },
        },
        '204': {
          description: '204 response for add_guild_member',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(BotAddGuildMemberRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    describeRoute({
      operationId: 'delete_guild_member',
      responses: {
        '204': {
          description: '204 response for delete_guild_member',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/:user_id',
    describeRoute({
      operationId: 'update_guild_member',
      responses: {
        '200': {
          description: '200 response for update_guild_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildMemberResponseSchema)) } },
        },
        '204': {
          description: '204 response for update_guild_member',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          nick: Type.Optional(Type.Union([Type.String({ maxLength: 32 }), Type.Null()])),
          roles: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                { maxItems: 350, uniqueItems: true },
              ),
              Type.Null(),
            ]),
          ),
          mute: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
          deaf: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
          channel_id: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
          ),
          communication_disabled_until: Type.Optional(
            Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
          ),
          flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    describeRoute({
      operationId: 'add_guild_member_role',
      responses: {
        '204': {
          description: '204 response for add_guild_member_role',
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    describeRoute({
      operationId: 'delete_guild_member_role',
      responses: {
        '204': {
          description: '204 response for delete_guild_member_role',
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/messages/search',
    describeRoute({
      operationId: 'guild_search',
      responses: {
        '200': {
          description: '200 response for guild_search',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildSearchResponseSchema)) } },
        },
        '202': {
          description: '202 response for guild_search',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(SearchIndexNotReadyResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          sort_by: Type.Optional(SortingModeSchema),
          sort_order: Type.Optional(SortingOrderSchema),
          content: Type.Optional(Type.String({ maxLength: 1024 })),
          slop: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          author_id: Type.Optional(
            Type.Array(SnowflakeTypeSchema, { maxItems: 100, uniqueItems: true }),
          ),
          author_type: Type.Optional(
            Type.Array(AuthorTypeSchema, { maxItems: 6, uniqueItems: true }),
          ),
          mentions: Type.Optional(
            Type.Array(SnowflakeTypeSchema, { maxItems: 100, uniqueItems: true }),
          ),
          mentions_role_id: Type.Optional(
            Type.Array(SnowflakeTypeSchema, { maxItems: 100, uniqueItems: true }),
          ),
          replied_to_user_id: Type.Optional(
            Type.Array(SnowflakeTypeSchema, { maxItems: 100, uniqueItems: true }),
          ),
          replied_to_message_id: Type.Optional(
            Type.Array(SnowflakeTypeSchema, { maxItems: 100, uniqueItems: true }),
          ),
          mention_everyone: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          min_id: Type.Optional(SnowflakeTypeSchema),
          max_id: Type.Optional(SnowflakeTypeSchema),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          offset: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          has: Type.Optional(Type.Array(HasOptionSchema, { maxItems: 18, uniqueItems: true })),
          link_hostname: Type.Optional(
            Type.Array(Type.String({ maxLength: 256 }), { maxItems: 100, uniqueItems: true }),
          ),
          embed_provider: Type.Optional(
            Type.Array(Type.String({ maxLength: 256 }), { maxItems: 100, uniqueItems: true }),
          ),
          embed_type: Type.Optional(
            Type.Array(SearchableEmbedTypeSchema, { maxItems: 5, uniqueItems: true }),
          ),
          attachment_extension: Type.Optional(
            Type.Array(Type.String({ maxLength: 256 }), { maxItems: 100, uniqueItems: true }),
          ),
          attachment_filename: Type.Optional(
            Type.Array(Type.String({ maxLength: 1024 }), { maxItems: 100, uniqueItems: true }),
          ),
          pinned: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          include_nsfw: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          channel_id: Type.Optional(
            Type.Array(SnowflakeTypeSchema, { maxItems: 500, uniqueItems: true }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/new-member-welcome',
    describeRoute({
      operationId: 'get_guild_new_member_welcome',
      responses: {
        '200': {
          description: '200 response for get_guild_new_member_welcome',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildHomeSettingsResponseSchema)) },
          },
        },
        '204': {
          description: '204 response for get_guild_new_member_welcome',
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/onboarding',
    describeRoute({
      operationId: 'get_guilds_onboarding',
      responses: {
        '200': {
          description: '200 response for get_guilds_onboarding',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(UserGuildOnboardingResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/onboarding',
    describeRoute({
      operationId: 'put_guilds_onboarding',
      responses: {
        '200': {
          description: '200 response for put_guilds_onboarding',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildOnboardingResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(UpdateGuildOnboardingRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    describeRoute({
      description:
        "Returns the fully cascaded guild-level permissions for a member, applying all of their roles including @everyone's",
      operationId: 'get_guild_member_permissions',
      responses: {
        '200': {
          description: '200 response for get_guild_member_permissions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(PermissionsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    describeRoute({
      description:
        "Returns the permissions a role grants at the guild level, combining the role's own permissions with @everyone's.",
      operationId: 'get_guild_role_permissions',
      responses: {
        '200': {
          description: '200 response for get_guild_role_permissions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(PermissionsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/preview',
    describeRoute({
      operationId: 'get_guild_preview',
      responses: {
        '200': {
          description: '200 response for get_guild_preview',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildPreviewResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/prune',
    describeRoute({
      operationId: 'preview_prune_guild',
      responses: {
        '200': {
          description: '200 response for preview_prune_guild',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildPruneResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          days: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          include_roles: Type.Optional(
            Type.Union([
              Type.String(),
              Type.Array(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                { maxItems: 100, uniqueItems: true },
              ),
            ]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/prune',
    describeRoute({
      operationId: 'prune_guild',
      responses: {
        '200': {
          description: '200 response for prune_guild',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildPruneResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(PruneGuildRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/regions',
    describeRoute({
      operationId: 'list_guild_voice_regions',
      responses: {
        '200': {
          description: '200 response for list_guild_voice_regions',
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
                Compile(Type.Union([Type.Array(VoiceRegionResponseSchema), Type.Null()])),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/requests',
    describeRoute({
      description: 'List join requests for guild, optionally filtered by application status',
      operationId: 'get_guild_join_requests',
      responses: {
        '200': {
          description: '200 response for get_guild_join_requests',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildJoinRequestsListResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          status: Type.Optional(GuildJoinRequestApplicationStatusSchema),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          before: Type.Optional(SnowflakeTypeSchema),
          after: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/requests/:request_id',
    describeRoute({
      description: 'Approve or reject guild join request',
      operationId: 'action_guild_join_request',
      responses: {
        '200': {
          description: '200 response for action_guild_join_request',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildJoinRequestResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          action: Type.Optional(GuildJoinRequestApplicationStatusSchema),
          rejection_reason: Type.Optional(
            Type.Union([
              Type.String({
                maxLength: 160,
                description: 'Reason for rejection. Only used when action is REJECTED',
              }),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles',
    describeRoute({
      operationId: 'list_guild_roles',
      responses: {
        '200': {
          description: '200 response for list_guild_roles',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(Type.Array(GuildRoleResponseSchema))) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/roles',
    describeRoute({
      operationId: 'create_guild_role',
      responses: {
        '200': {
          description: '200 response for create_guild_role',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildRoleResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(CreateRoleRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles',
    describeRoute({
      operationId: 'bulk_update_guild_roles',
      responses: {
        '200': {
          description: '200 response for bulk_update_guild_roles',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(Type.Array(GuildRoleResponseSchema))) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(Type.Array(UpdateRolePositionsRequestSchema))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    describeRoute({
      operationId: 'guild_role_member_counts',
      responses: {
        '200': {
          description: '200 response for guild_role_member_counts',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(Type.Record(Type.String(), Type.Integer()))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    describeRoute({
      operationId: 'get_guild_role',
      responses: {
        '200': {
          description: '200 response for get_guild_role',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildRoleResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    describeRoute({
      operationId: 'delete_guild_role',
      responses: {
        '204': {
          description: '204 response for delete_guild_role',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles/:role_id',
    describeRoute({
      operationId: 'update_guild_role',
      responses: {
        '200': {
          description: '200 response for update_guild_role',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GuildRoleResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(UpdateRoleRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events',
    describeRoute({
      operationId: 'list_guild_scheduled_events',
      responses: {
        '200': {
          description: '200 response for list_guild_scheduled_events',
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
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        ExternalScheduledEventResponseSchema,
                        StageScheduledEventResponseSchema,
                        VoiceScheduledEventResponseSchema,
                      ]),
                    ),
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          with_user_count: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/scheduled-events',
    describeRoute({
      operationId: 'create_guild_scheduled_event',
      responses: {
        '200': {
          description: '200 response for create_guild_scheduled_event',
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
                Compile(
                  Type.Union([
                    ExternalScheduledEventResponseSchema,
                    StageScheduledEventResponseSchema,
                    VoiceScheduledEventResponseSchema,
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Union([
          ExternalScheduledEventCreateRequestSchema,
          StageScheduledEventCreateRequestSchema,
          VoiceScheduledEventCreateRequestSchema,
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    describeRoute({
      operationId: 'get_guild_scheduled_event',
      responses: {
        '200': {
          description: '200 response for get_guild_scheduled_event',
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
                Compile(
                  Type.Union([
                    ExternalScheduledEventResponseSchema,
                    StageScheduledEventResponseSchema,
                    VoiceScheduledEventResponseSchema,
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
    validator(
      'param',
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          with_user_count: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    describeRoute({
      operationId: 'delete_guild_scheduled_event',
      responses: {
        '204': {
          description: '204 response for delete_guild_scheduled_event',
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    describeRoute({
      operationId: 'update_guild_scheduled_event',
      responses: {
        '200': {
          description: '200 response for update_guild_scheduled_event',
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
                Compile(
                  Type.Union([
                    ExternalScheduledEventResponseSchema,
                    StageScheduledEventResponseSchema,
                    VoiceScheduledEventResponseSchema,
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
    validator(
      'param',
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'json',
      Compile(
        Type.Union([
          ExternalScheduledEventPatchRequestPartialSchema,
          StageScheduledEventPatchRequestPartialSchema,
          VoiceScheduledEventPatchRequestPartialSchema,
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions',
    describeRoute({
      description: 'Create an exception to a recurring guild scheduled event',
      operationId: 'create_guild_scheduled_event_exception',
      responses: {
        '200': {
          description: '200 response for create_guild_scheduled_event_exception',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(GuildScheduledEventExceptionResponseSchema)),
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator('json', Compile(GuildScheduledEventExceptionCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    describeRoute({
      description: 'Delete an exception to a recurring guild scheduled event',
      operationId: 'delete_guild_scheduled_event_exception',
      responses: {
        '204': {
          description: '204 response for delete_guild_scheduled_event_exception',
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    describeRoute({
      description: 'Modify an exception to a recurring guild scheduled event',
      operationId: 'update_guild_scheduled_event_exception',
      responses: {
        '200': {
          description: '200 response for update_guild_scheduled_event_exception',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(GuildScheduledEventExceptionResponseSchema)),
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator('json', Compile(GuildScheduledEventExceptionPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    describeRoute({
      operationId: 'list_guild_scheduled_event_users',
      responses: {
        '200': {
          description: '200 response for list_guild_scheduled_event_users',
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
                Compile(Type.Union([Type.Array(ScheduledEventUserResponseSchema), Type.Null()])),
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          with_member: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          before: Type.Optional(SnowflakeTypeSchema),
          after: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users/counts',
    describeRoute({
      description: 'Get the count of users subscribed to a guild scheduled event',
      operationId: 'count_guild_scheduled_event_users',
      responses: {
        '200': {
          description: '200 response for count_guild_scheduled_event_users',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(ScheduledEventUserCountResponseSchema)),
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          guild_scheduled_event_exception_ids: Type.Optional(
            Type.Array(SnowflakeTypeSchema, { maxItems: 10 }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/:guild_scheduled_event_exception_id/users',
    describeRoute({
      description: 'Get a list of users subscribed to a guild scheduled event exception',
      operationId: 'list_guild_scheduled_event_exception_users',
      responses: {
        '200': {
          description: '200 response for list_guild_scheduled_event_exception_users',
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
                Compile(Type.Union([Type.Array(ScheduledEventUserResponseSchema), Type.Null()])),
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
      Compile(
        Type.Object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          with_member: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          before: Type.Optional(SnowflakeTypeSchema),
          after: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds',
    describeRoute({
      operationId: 'list_guild_soundboard_sounds',
      responses: {
        '200': {
          description: '200 response for list_guild_soundboard_sounds',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(ListGuildSoundboardSoundsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    describeRoute({
      operationId: 'create_guild_soundboard_sound',
      responses: {
        '201': {
          description: '201 response for create_guild_soundboard_sound',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(SoundboardSoundResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(SoundboardCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    describeRoute({
      operationId: 'get_guild_soundboard_sound',
      responses: {
        '200': {
          description: '200 response for get_guild_soundboard_sound',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(SoundboardSoundResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    describeRoute({
      operationId: 'delete_guild_soundboard_sound',
      responses: {
        '204': {
          description: '204 response for delete_guild_soundboard_sound',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    describeRoute({
      operationId: 'update_guild_soundboard_sound',
      responses: {
        '200': {
          description: '200 response for update_guild_soundboard_sound',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(SoundboardSoundResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(SoundboardPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers',
    describeRoute({
      operationId: 'list_guild_stickers',
      responses: {
        '200': {
          description: '200 response for list_guild_stickers',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(Type.Array(GuildStickerResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/stickers',
    describeRoute({
      operationId: 'create_guild_sticker',
      responses: {
        '201': {
          description: '201 response for create_guild_sticker',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildStickerResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'form',
      Compile(
        Type.Object({
          name: Type.String({ minLength: 2, maxLength: 30 }),
          tags: Type.String({ minLength: 1, maxLength: 200 }),
          description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
          file: Type.String(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers/:sticker_id',
    describeRoute({
      operationId: 'get_guild_sticker',
      responses: {
        '200': {
          description: '200 response for get_guild_sticker',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildStickerResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    describeRoute({
      operationId: 'delete_guild_sticker',
      responses: {
        '204': {
          description: '204 response for delete_guild_sticker',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/stickers/:sticker_id',
    describeRoute({
      operationId: 'update_guild_sticker',
      responses: {
        '200': {
          description: '200 response for update_guild_sticker',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildStickerResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.Optional(Type.String({ minLength: 2, maxLength: 30 })),
          tags: Type.Optional(Type.String({ minLength: 1, maxLength: 200 })),
          description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/templates',
    describeRoute({
      operationId: 'list_guild_templates',
      responses: {
        '200': {
          description: '200 response for list_guild_templates',
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
                Compile(Type.Union([Type.Array(GuildTemplateResponseSchema), Type.Null()])),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/templates',
    describeRoute({
      operationId: 'create_guild_template',
      responses: {
        '200': {
          description: '200 response for create_guild_template',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildTemplateResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.String({ minLength: 1, maxLength: 100 }),
          description: Type.Optional(Type.Union([Type.String({ maxLength: 120 }), Type.Null()])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/templates/:code',
    describeRoute({
      operationId: 'sync_guild_template',
      responses: {
        '200': {
          description: '200 response for sync_guild_template',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildTemplateResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({ guild_id: SnowflakeTypeSchema, code: Type.String({ maxLength: 152133 }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/templates/:code',
    describeRoute({
      operationId: 'delete_guild_template',
      responses: {
        '200': {
          description: '200 response for delete_guild_template',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildTemplateResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({ guild_id: SnowflakeTypeSchema, code: Type.String({ maxLength: 152133 }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/templates/:code',
    describeRoute({
      operationId: 'update_guild_template',
      responses: {
        '200': {
          description: '200 response for update_guild_template',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildTemplateResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({ guild_id: SnowflakeTypeSchema, code: Type.String({ maxLength: 152133 }) }),
      ),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
          description: Type.Optional(Type.Union([Type.String({ maxLength: 120 }), Type.Null()])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/threads/active',
    describeRoute({
      operationId: 'get_active_guild_threads',
      responses: {
        '200': {
          description: '200 response for get_active_guild_threads',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(ThreadsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    describeRoute({
      operationId: 'get_guild_vanity_url',
      responses: {
        '200': {
          description: '200 response for get_guild_vanity_url',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(VanityURLResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    describeRoute({
      operationId: 'get_self_voice_state',
      responses: {
        '200': {
          description: '200 response for get_self_voice_state',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(VoiceStateResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    describeRoute({
      operationId: 'update_self_voice_state',
      responses: {
        '204': {
          description: '204 response for update_self_voice_state',
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(UpdateSelfVoiceStateRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    describeRoute({
      operationId: 'get_voice_state',
      responses: {
        '200': {
          description: '200 response for get_voice_state',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(VoiceStateResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/:user_id',
    describeRoute({
      operationId: 'update_voice_state',
      responses: {
        '204': {
          description: '204 response for update_voice_state',
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
      Compile(Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(UpdateVoiceStateRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/webhooks',
    describeRoute({
      operationId: 'get_guild_webhooks',
      responses: {
        '200': {
          description: '200 response for get_guild_webhooks',
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
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        ApplicationIncomingWebhookResponseSchema,
                        ChannelFollowerWebhookResponseSchema,
                        GuildIncomingWebhookResponseSchema,
                      ]),
                    ),
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
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    describeRoute({
      operationId: 'get_guild_welcome_screen',
      responses: {
        '200': {
          description: '200 response for get_guild_welcome_screen',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildWelcomeScreenResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    describeRoute({
      operationId: 'update_guild_welcome_screen',
      responses: {
        '200': {
          description: '200 response for update_guild_welcome_screen',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildWelcomeScreenResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Compile(WelcomeScreenPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget',
    describeRoute({
      operationId: 'get_guild_widget_settings',
      responses: {
        '200': {
          description: '200 response for get_guild_widget_settings',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(WidgetSettingsResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/widget',
    describeRoute({
      operationId: 'update_guild_widget_settings',
      responses: {
        '200': {
          description: '200 response for update_guild_widget_settings',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(WidgetSettingsResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          channel_id: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
          ),
          enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.json',
    describeRoute({
      operationId: 'get_guild_widget',
      responses: {
        '200': {
          description: '200 response for get_guild_widget',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(WidgetResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.png',
    describeRoute({
      operationId: 'get_guild_widget_png',
      responses: {
        '200': {
          description: '200 response for get_guild_widget_png',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'image/png': { schema: resolver(Compile(Type.String())) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ guild_id: SnowflakeTypeSchema }))),
    validator('query', Compile(Type.Object({ style: Type.Optional(WidgetImageStylesSchema) }))),
    (c) => { throw new Error('Not implemented') },
  )
