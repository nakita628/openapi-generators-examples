import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
    validator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
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
          content: { 'application/json': { schema: resolver(GuildResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'user_id?': SnowflakeTypeSchema,
        'target_id?': SnowflakeTypeSchema,
        'action_type?': type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('1'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('10'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('11'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('12'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('13'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('14'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('15'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('16')
              .describe('Channels were reordered'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('20'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('21'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('22'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('23'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('24'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('25'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('26'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('27'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('28'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('30'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('31'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('32'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('33')
              .describe('Roles were reordered'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('40'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('41'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('42'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('50'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('51'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('52'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('60'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('61'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('62'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('72'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('73'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('74'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('75'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('80'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('81'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('82'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('83'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('84'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('85'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('90'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('91'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('92'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('100'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('101'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('102'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('110'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('111'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('112'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('121'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('130'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('131'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('132'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('140'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('141'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('142'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('143'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('144'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('145'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('146'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('150'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('151'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('163'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('164'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('165'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('166'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('167'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('171'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('172'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('180'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('190'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('191'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('192'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('193'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('200')
              .describe('Scheduled event exception was created'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('201')
              .describe('Scheduled event exception was updated'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('202')
              .describe('Scheduled event exception was deleted'),
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isFinite(value) ? value : ctx.error('a number')
              })
              .to('211'),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
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
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema),
                          ).or(MLSpamRuleResponseSchema),
                        ).or(MentionSpamRuleResponseSchema),
                      ).or(UserProfileRuleResponseSchema),
                    ).or('null | null'),
                  ).array(),
                ).or('null'),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
                type(
                  type(
                    type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
                      MLSpamRuleResponseSchema,
                    ),
                  ).or(MentionSpamRuleResponseSchema),
                ).or(UserProfileRuleResponseSchema),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type(
        type(
          type(type(DefaultKeywordListUpsertRequestSchema).or(KeywordUpsertRequestSchema)).or(
            MLSpamUpsertRequestSchema,
          ),
        ).or(MentionSpamUpsertRequestSchema),
      ).or(UserProfileUpsertRequestSchema),
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
                type(
                  type(
                    type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
                      MLSpamRuleResponseSchema,
                    ),
                  ).or(MentionSpamRuleResponseSchema),
                ).or(UserProfileRuleResponseSchema),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
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
                type(
                  type(
                    type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
                      MLSpamRuleResponseSchema,
                    ),
                  ).or(MentionSpamRuleResponseSchema),
                ).or(UserProfileRuleResponseSchema),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type(
        type(
          type(
            type(DefaultKeywordListUpsertRequestPartialSchema).or(
              KeywordUpsertRequestPartialSchema,
            ),
          ).or(MLSpamUpsertRequestPartialSchema),
        ).or(MentionSpamUpsertRequestPartialSchema),
      ).or(UserProfileUpsertRequestPartialSchema),
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
              schema: resolver(type(type(GuildBanResponseSchema).array()).or('null')),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 1000'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type(
        type({
          'id?': type('null | null').or(SnowflakeTypeSchema),
          'position?':
            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
          'parent_id?': type('null | null').or(SnowflakeTypeSchema),
          'lock_permissions?': 'boolean | null',
        }),
      ).array(),
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
              schema: resolver(type(type(EmojiResponseSchema).array()).or('null')),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        image: 'string',
        'roles?': type(
          type(type(type('null | null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        'roles?': type(
          type(type(type('null | null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
                type(
                  type(
                    type(
                      type(DiscordIntegrationResponseSchema).or(
                        ExternalConnectionIntegrationResponseSchema,
                      ),
                    ).or(GuildSubscriptionIntegrationResponseSchema),
                  ).array(),
                ).or('null'),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
      type({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
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
                type(
                  type(
                    type(
                      type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
                        GuildInviteResponseSchema,
                      ),
                    ).or('null | null'),
                  ).array(),
                ).or('null'),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
            'application/json': { schema: resolver(type(GuildMemberResponseSchema).array()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 1000'),
        'after?': SnowflakeTypeSchema,
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'avatar?': 'string | null',
        'bio?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'),
          ),
        ).or('null'),
        'banner?': 'string | null',
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
          content: {
            'application/json': { schema: resolver(type(GuildMemberResponseSchema).array()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 1000'),
        query: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'roles?': type(
          type(type(type('null | null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 350'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'mute?': 'boolean | null',
        'deaf?': 'boolean | null',
        'channel_id?': type('null | null').or(SnowflakeTypeSchema),
        'communication_disabled_until?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ).or('null'),
        'flags?': 'number.integer | null',
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
      type({
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
      type({
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'sort_by?': SortingModeSchema,
        'sort_order?': SortingOrderSchema,
        'content?': type('string').narrow(
          (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
        ),
        'slop?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
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
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 25'),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'days?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
            'application/json': {
              schema: resolver(type(type(VoiceRegionResponseSchema).array()).or('null')),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'status?': GuildJoinRequestApplicationStatusSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
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
            'application/json': { schema: resolver(type(GuildRoleResponseSchema).array()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
          content: {
            'application/json': { schema: resolver(type(GuildRoleResponseSchema).array()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator('json', type(UpdateRolePositionsRequestSchema).array()),
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
              schema: resolver(
                type({
                  '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647',
                }),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
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
                type(
                  type(
                    type(
                      type(ExternalScheduledEventResponseSchema).or(
                        StageScheduledEventResponseSchema,
                      ),
                    ).or(VoiceScheduledEventResponseSchema),
                  ).array(),
                ).or('null'),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
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
                type(
                  type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema),
                ).or(VoiceScheduledEventResponseSchema),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type(
        type(ExternalScheduledEventCreateRequestSchema).or(StageScheduledEventCreateRequestSchema),
      ).or(VoiceScheduledEventCreateRequestSchema),
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
                type(
                  type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema),
                ).or(VoiceScheduledEventResponseSchema),
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
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      type({
        'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
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
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
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
                type(
                  type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema),
                ).or(VoiceScheduledEventResponseSchema),
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
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      type(
        type(ExternalScheduledEventPatchRequestPartialSchema).or(
          StageScheduledEventPatchRequestPartialSchema,
        ),
      ).or(VoiceScheduledEventPatchRequestPartialSchema),
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
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
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
      type({
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
      type({
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
              schema: resolver(type(type(ScheduledEventUserResponseSchema).array()).or('null')),
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
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      type({
        'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
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
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    validator(
      'query',
      type({
        'guild_scheduled_event_exception_ids?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 10')),
        ),
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
              schema: resolver(type(type(ScheduledEventUserResponseSchema).array()).or('null')),
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
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
      }),
    ),
    validator(
      'query',
      type({
        'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
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
            'application/json': { schema: resolver(type(GuildStickerResponseSchema).array()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'form',
      type({
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters')),
        tags: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 200 || ctx.mustBe('at most 200 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
        file: 'string',
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
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
              schema: resolver(type(type(GuildTemplateResponseSchema).array()).or('null')),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'),
          ),
        ).or('null'),
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
    validator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
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
          content: { 'application/json': { schema: resolver(GuildTemplateResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    validator(
      'json',
      type({
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'),
          ),
        ).or('null'),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
                type(
                  type(
                    type(
                      type(ApplicationIncomingWebhookResponseSchema).or(
                        ChannelFollowerWebhookResponseSchema,
                      ),
                    ).or(GuildIncomingWebhookResponseSchema),
                  ).array(),
                ).or('null'),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        'channel_id?': type('null | null').or(SnowflakeTypeSchema),
        'enabled?': 'boolean | null',
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
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
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
          content: { 'image/png': { schema: resolver(type('string')) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', type({ guild_id: SnowflakeTypeSchema })),
    validator('query', type({ 'style?': WidgetImageStylesSchema })),
    (c) => { throw new Error('Not implemented') },
  )
