import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  ApplicationIncomingWebhookResponseSchema,
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
  SnowflakeTypeSchema,
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
    validator('param', z.object({ code: z.string().max(152133) })),
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
          content: { 'application/json': { schema: resolver(GuildWithCountsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('query', z.object({ with_counts: z.stringbool().exactOptional() })),
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
          content: { 'application/json': { schema: resolver(GuildResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', GuildPatchRequestPartialSchema),
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
          content: { 'application/json': { schema: resolver(GuildAuditLogResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        user_id: SnowflakeTypeSchema.exactOptional(),
        target_id: SnowflakeTypeSchema.exactOptional(),
        action_type: z
          .union([
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(1),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(10),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(11),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(12),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(13),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(14),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(15),
            ),
            z
              .preprocess(
                (val) =>
                  typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
                z.literal(16),
              )
              .meta({ description: 'Channels were reordered' }),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(20),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(21),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(22),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(23),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(24),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(25),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(26),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(27),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(28),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(30),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(31),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(32),
            ),
            z
              .preprocess(
                (val) =>
                  typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
                z.literal(33),
              )
              .meta({ description: 'Roles were reordered' }),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(40),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(41),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(42),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(50),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(51),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(52),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(60),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(61),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(62),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(72),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(73),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(74),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(75),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(80),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(81),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(82),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(83),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(84),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(85),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(90),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(91),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(92),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(100),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(101),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(102),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(110),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(111),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(112),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(121),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(130),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(131),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(132),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(140),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(141),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(142),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(143),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(144),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(145),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(146),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(150),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(151),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(163),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(164),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(165),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(166),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(167),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(171),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(172),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(180),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(190),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(191),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(192),
            ),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(193),
            ),
            z
              .preprocess(
                (val) =>
                  typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
                z.literal(200),
              )
              .meta({ description: 'Scheduled event exception was created' }),
            z
              .preprocess(
                (val) =>
                  typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
                z.literal(201),
              )
              .meta({ description: 'Scheduled event exception was updated' }),
            z
              .preprocess(
                (val) =>
                  typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
                z.literal(202),
              )
              .meta({ description: 'Scheduled event exception was deleted' }),
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.literal(211),
            ),
          ])
          .exactOptional(),
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
                z.xor([
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.xor([
        DefaultKeywordListUpsertRequestSchema,
        KeywordUpsertRequestSchema,
        MLSpamUpsertRequestSchema,
        MentionSpamUpsertRequestSchema,
        UserProfileUpsertRequestSchema,
      ]),
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
                z.xor([
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
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
                z.xor([
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.union([
        DefaultKeywordListUpsertRequestPartialSchema,
        KeywordUpsertRequestPartialSchema,
        MLSpamUpsertRequestPartialSchema,
        MentionSpamUpsertRequestPartialSchema,
        UserProfileUpsertRequestPartialSchema,
      ]),
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
            'application/json': { schema: resolver(z.array(GuildBanResponseSchema).nullable()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
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
          content: { 'application/json': { schema: resolver(GuildBanResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', BanUserFromGuildRequestSchema),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', UnbanUserFromGuildRequestSchema),
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
          content: { 'application/json': { schema: resolver(BulkBanUsersResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', BulkBanUsersRequestSchema),
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildChannelResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', CreateGuildChannelRequestSchema),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.array(
        z.object({
          id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
          position: z.int32().min(0).nullable().exactOptional(),
          parent_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
          lock_permissions: z.boolean().nullable().exactOptional(),
        }),
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
            'application/json': { schema: resolver(z.array(EmojiResponseSchema).nullable()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        name: z.string().min(2).max(32),
        image: z.string(),
        roles: z
          .array(z.xor([z.null(), SnowflakeTypeSchema]))
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(EmojiResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        name: z.string().min(2).max(32).exactOptional(),
        roles: z
          .array(z.xor([z.null(), SnowflakeTypeSchema]))
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(GuildIncidentsDataResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', GuildIncidentActionsRequestSchema),
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
      z.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(z.array(GuildMemberResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(1000),
          )
          .exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(PrivateGuildMemberResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        nick: z.string().max(32).nullable().exactOptional(),
        avatar: z.string().nullable().exactOptional(),
        bio: z.string().max(300).nullable().exactOptional(),
        banner: z.string().nullable().exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(z.array(GuildMemberResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(1000),
          )
          .exactOptional(),
        query: z.string().min(1).max(100),
      }),
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
          content: { 'application/json': { schema: resolver(GuildMemberResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', BotAddGuildMemberRequestSchema),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
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
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
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
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        sort_by: z.union([z.literal('relevance'), z.literal('timestamp')]).exactOptional(),
        sort_order: z.union([z.literal('asc'), z.literal('desc')]).exactOptional(),
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
              .array(
                z.union([
                  z.literal('user'),
                  z.literal('bot'),
                  z.literal('webhook'),
                  z.literal('-user'),
                  z.literal('-bot'),
                  z.literal('-webhook'),
                ]),
              )
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
              .array(
                z.union([
                  z.literal('link'),
                  z.literal('embed'),
                  z.literal('file'),
                  z.literal('image'),
                  z.literal('video'),
                  z.literal('sound'),
                  z.literal('sticker'),
                  z.literal('poll'),
                  z.literal('snapshot'),
                  z.literal('-link'),
                  z.literal('-embed'),
                  z.literal('-file'),
                  z.literal('-image'),
                  z.literal('-video'),
                  z.literal('-sound'),
                  z.literal('-sticker'),
                  z.literal('-poll'),
                  z.literal('-snapshot'),
                ]),
              )
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
              .array(
                z.union([
                  z.literal('image'),
                  z.literal('video'),
                  z.literal('gif'),
                  z.literal('sound'),
                  z.literal('article'),
                ]),
              )
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(UserGuildOnboardingResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildOnboardingResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', UpdateGuildOnboardingRequestSchema),
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
          content: { 'application/json': { schema: resolver(PermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(PermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildPreviewResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildPruneResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
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
          content: { 'application/json': { schema: resolver(GuildPruneResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', PruneGuildRequestSchema),
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
            'application/json': { schema: resolver(z.array(VoiceRegionResponseSchema).nullable()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
            'application/json': { schema: resolver(GuildJoinRequestsListResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        status: z
          .union([
            z
              .literal('STARTED')
              .meta({ description: 'Applicant started but not yet submitted join request' }),
            z
              .literal('SUBMITTED')
              .meta({ description: 'Applicant submitted join request that is awaiting review' }),
            z.literal('REJECTED').meta({ description: 'Join request rejected' }),
            z.literal('APPROVED').meta({ description: 'Join request approved' }),
          ])
          .exactOptional(),
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
          content: { 'application/json': { schema: resolver(GuildJoinRequestResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      z.object({
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
          content: { 'application/json': { schema: resolver(z.array(GuildRoleResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildRoleResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', CreateRoleRequestSchema),
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
          content: { 'application/json': { schema: resolver(z.array(GuildRoleResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', z.array(UpdateRolePositionsRequestSchema)),
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
          content: { 'application/json': { schema: resolver(z.record(z.string(), z.int32())) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildRoleResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildRoleResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    validator('json', UpdateRoleRequestPartialSchema),
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('query', z.object({ with_user_count: z.stringbool().exactOptional() })),
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
                z.xor([
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.xor([
        ExternalScheduledEventCreateRequestSchema,
        StageScheduledEventCreateRequestSchema,
        VoiceScheduledEventCreateRequestSchema,
      ]),
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
                z.xor([
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
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator('query', z.object({ with_user_count: z.stringbool().exactOptional() })),
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
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
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
                z.xor([
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
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      z.union([
        ExternalScheduledEventPatchRequestPartialSchema,
        StageScheduledEventPatchRequestPartialSchema,
        VoiceScheduledEventPatchRequestPartialSchema,
      ]),
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
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator('json', GuildScheduledEventExceptionCreateRequestSchema),
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
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
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
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    validator('json', GuildScheduledEventExceptionPatchRequestPartialSchema),
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
              schema: resolver(z.array(ScheduledEventUserResponseSchema).nullable()),
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
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      z.object({
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
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      z.object({
        guild_scheduled_event_exception_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(SnowflakeTypeSchema).max(10),
          )
          .exactOptional(),
      }),
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
              schema: resolver(z.array(ScheduledEventUserResponseSchema).nullable()),
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
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
      }),
    ),
    validator(
      'query',
      z.object({
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
            'application/json': { schema: resolver(ListGuildSoundboardSoundsResponseSchema) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(SoundboardSoundResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', SoundboardCreateRequestSchema),
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
          content: { 'application/json': { schema: resolver(SoundboardSoundResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(SoundboardSoundResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    validator('json', SoundboardPatchRequestPartialSchema),
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
            'application/json': { schema: resolver(z.array(GuildStickerResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildStickerResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'form',
      z.object({
        name: z.string().min(2).max(30),
        tags: z.string().min(1).max(200),
        description: z.string().max(100).nullable().exactOptional(),
        file: z.string(),
      }),
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
          content: { 'application/json': { schema: resolver(GuildStickerResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
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
      z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(GuildStickerResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      z.object({
        name: z.string().min(2).max(30).exactOptional(),
        tags: z.string().min(1).max(200).exactOptional(),
        description: z.string().max(100).nullable().exactOptional(),
      }),
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
              schema: resolver(z.array(GuildTemplateResponseSchema).nullable()),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(120).nullable().exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) })),
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) })),
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) })),
    validator(
      'json',
      z.object({
        name: z.string().min(1).max(100).exactOptional(),
        description: z.string().max(120).nullable().exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(ThreadsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(VanityURLResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(VoiceStateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', UpdateSelfVoiceStateRequestPartialSchema),
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
          content: { 'application/json': { schema: resolver(VoiceStateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('json', UpdateVoiceStateRequestPartialSchema),
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildWelcomeScreenResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildWelcomeScreenResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator('json', WelcomeScreenPatchRequestPartialSchema),
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
          content: { 'application/json': { schema: resolver(WidgetSettingsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(WidgetSettingsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(WidgetResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'image/png': { schema: resolver(z.string()) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        style: z
          .union([
            z
              .literal('shield')
              .meta({
                description: 'shield style widget with Discord icon and guild members online count',
              }),
            z
              .literal('banner1')
              .meta({
                description:
                  'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
              }),
            z
              .literal('banner2')
              .meta({
                description:
                  'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
              }),
            z
              .literal('banner3')
              .meta({
                description:
                  'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
              }),
            z
              .literal('banner4')
              .meta({
                description:
                  'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
              }),
          ])
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
