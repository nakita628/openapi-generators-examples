import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  ApplicationIncomingWebhookResponseSchema,
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildWithCountsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          with_counts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', GuildPatchRequestPartialSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildAuditLogResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          user_id: SnowflakeTypeSchema,
          target_id: SnowflakeTypeSchema,
          action_type: v.union([
            v.pipe(v.string(), v.transform(Number), v.literal(1)),
            v.pipe(v.string(), v.transform(Number), v.literal(10)),
            v.pipe(v.string(), v.transform(Number), v.literal(11)),
            v.pipe(v.string(), v.transform(Number), v.literal(12)),
            v.pipe(v.string(), v.transform(Number), v.literal(13)),
            v.pipe(v.string(), v.transform(Number), v.literal(14)),
            v.pipe(v.string(), v.transform(Number), v.literal(15)),
            v.pipe(
              v.pipe(v.string(), v.transform(Number), v.literal(16)),
              v.description('Channels were reordered'),
            ),
            v.pipe(v.string(), v.transform(Number), v.literal(20)),
            v.pipe(v.string(), v.transform(Number), v.literal(21)),
            v.pipe(v.string(), v.transform(Number), v.literal(22)),
            v.pipe(v.string(), v.transform(Number), v.literal(23)),
            v.pipe(v.string(), v.transform(Number), v.literal(24)),
            v.pipe(v.string(), v.transform(Number), v.literal(25)),
            v.pipe(v.string(), v.transform(Number), v.literal(26)),
            v.pipe(v.string(), v.transform(Number), v.literal(27)),
            v.pipe(v.string(), v.transform(Number), v.literal(28)),
            v.pipe(v.string(), v.transform(Number), v.literal(30)),
            v.pipe(v.string(), v.transform(Number), v.literal(31)),
            v.pipe(v.string(), v.transform(Number), v.literal(32)),
            v.pipe(
              v.pipe(v.string(), v.transform(Number), v.literal(33)),
              v.description('Roles were reordered'),
            ),
            v.pipe(v.string(), v.transform(Number), v.literal(40)),
            v.pipe(v.string(), v.transform(Number), v.literal(41)),
            v.pipe(v.string(), v.transform(Number), v.literal(42)),
            v.pipe(v.string(), v.transform(Number), v.literal(50)),
            v.pipe(v.string(), v.transform(Number), v.literal(51)),
            v.pipe(v.string(), v.transform(Number), v.literal(52)),
            v.pipe(v.string(), v.transform(Number), v.literal(60)),
            v.pipe(v.string(), v.transform(Number), v.literal(61)),
            v.pipe(v.string(), v.transform(Number), v.literal(62)),
            v.pipe(v.string(), v.transform(Number), v.literal(72)),
            v.pipe(v.string(), v.transform(Number), v.literal(73)),
            v.pipe(v.string(), v.transform(Number), v.literal(74)),
            v.pipe(v.string(), v.transform(Number), v.literal(75)),
            v.pipe(v.string(), v.transform(Number), v.literal(80)),
            v.pipe(v.string(), v.transform(Number), v.literal(81)),
            v.pipe(v.string(), v.transform(Number), v.literal(82)),
            v.pipe(v.string(), v.transform(Number), v.literal(83)),
            v.pipe(v.string(), v.transform(Number), v.literal(84)),
            v.pipe(v.string(), v.transform(Number), v.literal(85)),
            v.pipe(v.string(), v.transform(Number), v.literal(90)),
            v.pipe(v.string(), v.transform(Number), v.literal(91)),
            v.pipe(v.string(), v.transform(Number), v.literal(92)),
            v.pipe(v.string(), v.transform(Number), v.literal(100)),
            v.pipe(v.string(), v.transform(Number), v.literal(101)),
            v.pipe(v.string(), v.transform(Number), v.literal(102)),
            v.pipe(v.string(), v.transform(Number), v.literal(110)),
            v.pipe(v.string(), v.transform(Number), v.literal(111)),
            v.pipe(v.string(), v.transform(Number), v.literal(112)),
            v.pipe(v.string(), v.transform(Number), v.literal(121)),
            v.pipe(v.string(), v.transform(Number), v.literal(130)),
            v.pipe(v.string(), v.transform(Number), v.literal(131)),
            v.pipe(v.string(), v.transform(Number), v.literal(132)),
            v.pipe(v.string(), v.transform(Number), v.literal(140)),
            v.pipe(v.string(), v.transform(Number), v.literal(141)),
            v.pipe(v.string(), v.transform(Number), v.literal(142)),
            v.pipe(v.string(), v.transform(Number), v.literal(143)),
            v.pipe(v.string(), v.transform(Number), v.literal(144)),
            v.pipe(v.string(), v.transform(Number), v.literal(145)),
            v.pipe(v.string(), v.transform(Number), v.literal(146)),
            v.pipe(v.string(), v.transform(Number), v.literal(150)),
            v.pipe(v.string(), v.transform(Number), v.literal(151)),
            v.pipe(v.string(), v.transform(Number), v.literal(163)),
            v.pipe(v.string(), v.transform(Number), v.literal(164)),
            v.pipe(v.string(), v.transform(Number), v.literal(165)),
            v.pipe(v.string(), v.transform(Number), v.literal(166)),
            v.pipe(v.string(), v.transform(Number), v.literal(167)),
            v.pipe(v.string(), v.transform(Number), v.literal(171)),
            v.pipe(v.string(), v.transform(Number), v.literal(172)),
            v.pipe(v.string(), v.transform(Number), v.literal(180)),
            v.pipe(v.string(), v.transform(Number), v.literal(190)),
            v.pipe(v.string(), v.transform(Number), v.literal(191)),
            v.pipe(v.string(), v.transform(Number), v.literal(192)),
            v.pipe(v.string(), v.transform(Number), v.literal(193)),
            v.pipe(
              v.pipe(v.string(), v.transform(Number), v.literal(200)),
              v.description('Scheduled event exception was created'),
            ),
            v.pipe(
              v.pipe(v.string(), v.transform(Number), v.literal(201)),
              v.description('Scheduled event exception was updated'),
            ),
            v.pipe(
              v.pipe(v.string(), v.transform(Number), v.literal(202)),
              v.description('Scheduled event exception was deleted'),
            ),
            v.pipe(v.string(), v.transform(Number), v.literal(211)),
          ]),
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
        }),
      ),
    ),
    (c) => {},
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
                v.nullable(
                  v.array(
                    v.union([
                      DefaultKeywordRuleResponseSchema,
                      KeywordRuleResponseSchema,
                      MLSpamRuleResponseSchema,
                      MentionSpamRuleResponseSchema,
                      UserProfileRuleResponseSchema,
                      v.nullable(v.null()),
                    ]),
                  ),
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
                v.union([
                  DefaultKeywordRuleResponseSchema,
                  KeywordRuleResponseSchema,
                  MLSpamRuleResponseSchema,
                  MentionSpamRuleResponseSchema,
                  UserProfileRuleResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.union([
        DefaultKeywordListUpsertRequestSchema,
        KeywordUpsertRequestSchema,
        MLSpamUpsertRequestSchema,
        MentionSpamUpsertRequestSchema,
        UserProfileUpsertRequestSchema,
      ]),
    ),
    (c) => {},
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
                v.union([
                  DefaultKeywordRuleResponseSchema,
                  KeywordRuleResponseSchema,
                  MLSpamRuleResponseSchema,
                  MentionSpamRuleResponseSchema,
                  UserProfileRuleResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => {},
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
                v.union([
                  DefaultKeywordRuleResponseSchema,
                  KeywordRuleResponseSchema,
                  MLSpamRuleResponseSchema,
                  MentionSpamRuleResponseSchema,
                  UserProfileRuleResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.union([
        DefaultKeywordListUpsertRequestPartialSchema,
        KeywordUpsertRequestPartialSchema,
        MLSpamUpsertRequestPartialSchema,
        MentionSpamUpsertRequestPartialSchema,
        UserProfileUpsertRequestPartialSchema,
      ]),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(v.nullable(v.array(GuildBanResponseSchema))) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(1000),
          ),
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildBanResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', BanUserFromGuildRequestSchema),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', UnbanUserFromGuildRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(BulkBanUsersResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', BulkBanUsersRequestSchema),
    (c) => {},
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildChannelResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', CreateGuildChannelRequestSchema),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.array(
        v.partial(
          v.object({
            id: v.union([v.nullable(v.null()), SnowflakeTypeSchema]),
            position: v.nullable(
              v.pipe(
                v.number(),
                v.integer(),
                v.minValue(-2147483648),
                v.maxValue(2147483647),
                v.minValue(0),
              ),
            ),
            parent_id: v.union([v.nullable(v.null()), SnowflakeTypeSchema]),
            lock_permissions: v.nullable(v.boolean()),
          }),
        ),
      ),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(v.nullable(v.array(EmojiResponseSchema))) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.object({
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        image: v.string(),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.partial(
        v.object({
          name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
          roles: v.nullable(
            v.pipe(
              v.array(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildIncidentsDataResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', GuildIncidentActionsRequestSchema),
    (c) => {},
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
      v.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
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
                v.nullable(
                  v.array(
                    v.union([
                      FriendInviteResponseSchema,
                      GroupDMInviteResponseSchema,
                      GuildInviteResponseSchema,
                      v.nullable(v.null()),
                    ]),
                  ),
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(v.array(GuildMemberResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(1000),
          ),
          after: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(PrivateGuildMemberResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.partial(
        v.object({
          nick: v.nullable(v.pipe(v.string(), v.maxCodePoints(32))),
          avatar: v.nullable(v.string()),
          bio: v.nullable(v.pipe(v.string(), v.maxCodePoints(300))),
          banner: v.nullable(v.string()),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(v.array(GuildMemberResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(1000),
          ),
        ),
        query: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildMemberResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildMemberResponseSchema) } },
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', BotAddGuildMemberRequestSchema),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildMemberResponseSchema) } },
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.partial(
        v.object({
          nick: v.nullable(v.pipe(v.string(), v.maxCodePoints(32))),
          roles: v.nullable(
            v.pipe(
              v.array(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
              v.maxLength(350),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
          mute: v.nullable(v.boolean()),
          deaf: v.nullable(v.boolean()),
          channel_id: v.union([v.nullable(v.null()), SnowflakeTypeSchema]),
          communication_disabled_until: v.nullable(
            v.pipe(
              v.string(),
              v.regex(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          flags: v.nullable(v.pipe(v.number(), v.integer())),
        }),
      ),
    ),
    (c) => {},
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildSearchResponseSchema) } },
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
          content: { 'application/json': { schema: resolver(SearchIndexNotReadyResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          sort_by: SortingModeSchema,
          sort_order: SortingOrderSchema,
          content: v.pipe(v.string(), v.maxCodePoints(1024)),
          slop: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          author_id: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          author_type: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(AuthorTypeSchema),
            v.maxLength(6),
            v.check((input) => new Set(input).size === input.length),
          ),
          mentions: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          mentions_role_id: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          replied_to_user_id: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          replied_to_message_id: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          mention_everyone: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          min_id: SnowflakeTypeSchema,
          max_id: SnowflakeTypeSchema,
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(25),
          ),
          offset: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(9975),
          ),
          has: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(HasOptionSchema),
            v.maxLength(18),
            v.check((input) => new Set(input).size === input.length),
          ),
          link_hostname: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          embed_provider: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          embed_type: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SearchableEmbedTypeSchema),
            v.maxLength(5),
            v.check((input) => new Set(input).size === input.length),
          ),
          attachment_extension: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          attachment_filename: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.pipe(v.string(), v.maxCodePoints(1024))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
          pinned: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          include_nsfw: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          channel_id: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(500),
            v.check((input) => new Set(input).size === input.length),
          ),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildHomeSettingsResponseSchema) } },
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(UserGuildOnboardingResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildOnboardingResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', UpdateGuildOnboardingRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(PermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(PermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildPreviewResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildPruneResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          days: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(30),
          ),
          include_roles: v.union([
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
                        v.nullable(v.null()),
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
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildPruneResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', PruneGuildRequestSchema),
    (c) => {},
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
              schema: resolver(v.nullable(v.array(VoiceRegionResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
            'application/json': { schema: resolver(GuildJoinRequestsListResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          status: GuildJoinRequestApplicationStatusSchema,
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildJoinRequestResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      v.partial(
        v.object({
          action: v.pipe(
            GuildJoinRequestApplicationStatusSchema,
            v.description('Whether to approve or reject the join request'),
          ),
          rejection_reason: v.pipe(
            v.nullable(v.pipe(v.string(), v.maxCodePoints(160))),
            v.description('Reason for rejection. Only used when action is REJECTED'),
          ),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(v.array(GuildRoleResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildRoleResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', CreateRoleRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(v.array(GuildRoleResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', v.array(UpdateRolePositionsRequestSchema)),
    (c) => {},
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
              schema: resolver(
                v.record(
                  v.string(),
                  v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildRoleResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildRoleResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    validator('json', UpdateRoleRequestPartialSchema),
    (c) => {},
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      v.partial(
        v.object({
          with_user_count: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => {},
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
                v.union([
                  ExternalScheduledEventResponseSchema,
                  StageScheduledEventResponseSchema,
                  VoiceScheduledEventResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.union([
        ExternalScheduledEventCreateRequestSchema,
        StageScheduledEventCreateRequestSchema,
        VoiceScheduledEventCreateRequestSchema,
      ]),
    ),
    (c) => {},
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
                v.union([
                  ExternalScheduledEventResponseSchema,
                  StageScheduledEventResponseSchema,
                  VoiceScheduledEventResponseSchema,
                ]),
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
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          with_user_count: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => {},
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
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
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
                v.union([
                  ExternalScheduledEventResponseSchema,
                  StageScheduledEventResponseSchema,
                  VoiceScheduledEventResponseSchema,
                ]),
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
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      v.union([
        ExternalScheduledEventPatchRequestPartialSchema,
        StageScheduledEventPatchRequestPartialSchema,
        VoiceScheduledEventPatchRequestPartialSchema,
      ]),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(GuildScheduledEventExceptionResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator('json', GuildScheduledEventExceptionCreateRequestSchema),
    (c) => {},
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(GuildScheduledEventExceptionResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    validator('json', GuildScheduledEventExceptionPatchRequestPartialSchema),
    (c) => {},
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
              schema: resolver(v.nullable(v.array(ScheduledEventUserResponseSchema))),
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
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          with_member: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(ScheduledEventUserCountResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          guild_scheduled_event_exception_ids: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(10),
          ),
        }),
      ),
    ),
    (c) => {},
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
              schema: resolver(v.nullable(v.array(ScheduledEventUserResponseSchema))),
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
      }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          with_member: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(ListGuildSoundboardSoundsResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(SoundboardSoundResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', SoundboardCreateRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(SoundboardSoundResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(SoundboardSoundResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    validator('json', SoundboardPatchRequestPartialSchema),
    (c) => {},
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
            'application/json': { schema: resolver(v.array(GuildStickerResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildStickerResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'form',
      v.object({
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(30)),
        tags: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200)),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        file: v.string(),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildStickerResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
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
      v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildStickerResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      v.partial(
        v.object({
          name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(30)),
          tags: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200)),
          description: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
        }),
      ),
    ),
    (c) => {},
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
              schema: resolver(v.nullable(v.array(GuildTemplateResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.object({
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
    validator(
      'json',
      v.partial(
        v.object({
          name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
          description: v.nullable(v.pipe(v.string(), v.maxCodePoints(120))),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ThreadsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(VanityURLResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(VoiceStateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', UpdateSelfVoiceStateRequestPartialSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(VoiceStateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', UpdateVoiceStateRequestPartialSchema),
    (c) => {},
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildWelcomeScreenResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(GuildWelcomeScreenResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', WelcomeScreenPatchRequestPartialSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(WidgetSettingsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(WidgetSettingsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.partial(
        v.object({
          channel_id: v.union([v.nullable(v.null()), SnowflakeTypeSchema]),
          enabled: v.nullable(v.boolean()),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(WidgetResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
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
          content: { 'image/png': { schema: resolver(v.string()) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    validator('query', v.partial(v.object({ style: WidgetImageStylesSchema }))),
    (c) => {},
  )
