import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  AuthorTypeSchema,
  BanUserFromGuildRequestSchema,
  BotAddGuildMemberRequestSchema,
  BulkBanUsersRequestSchema,
  CreateGuildChannelRequestSchema,
  CreateRoleRequestSchema,
  DefaultKeywordListUpsertRequestSchema,
  DefaultKeywordListUpsertRequestPartialSchema,
  ExternalScheduledEventCreateRequestSchema,
  ExternalScheduledEventPatchRequestPartialSchema,
  GuildIncidentActionsRequestSchema,
  GuildJoinRequestApplicationStatusSchema,
  GuildPatchRequestPartialSchema,
  GuildScheduledEventExceptionCreateRequestSchema,
  GuildScheduledEventExceptionPatchRequestPartialSchema,
  HasOptionSchema,
  KeywordUpsertRequestSchema,
  KeywordUpsertRequestPartialSchema,
  MLSpamUpsertRequestSchema,
  MLSpamUpsertRequestPartialSchema,
  MentionSpamUpsertRequestSchema,
  MentionSpamUpsertRequestPartialSchema,
  PruneGuildRequestSchema,
  SearchableEmbedTypeSchema,
  SnowflakeTypeSchema,
  SortingModeSchema,
  SortingOrderSchema,
  SoundboardCreateRequestSchema,
  SoundboardPatchRequestPartialSchema,
  StageScheduledEventCreateRequestSchema,
  StageScheduledEventPatchRequestPartialSchema,
  UnbanUserFromGuildRequestSchema,
  UpdateGuildOnboardingRequestSchema,
  UpdateRolePositionsRequestSchema,
  UpdateRoleRequestPartialSchema,
  UpdateSelfVoiceStateRequestPartialSchema,
  UpdateVoiceStateRequestPartialSchema,
  UserProfileUpsertRequestSchema,
  UserProfileUpsertRequestPartialSchema,
  VoiceScheduledEventCreateRequestSchema,
  VoiceScheduledEventPatchRequestPartialSchema,
  WelcomeScreenPatchRequestPartialSchema,
  WidgetImageStylesSchema,
} from '../components'

export const guildsHandler = new Hono()
  .get(
    '/guilds/templates/:code',
    sValidator(
      'param',
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      type({
        'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', GuildPatchRequestPartialSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/audit-logs',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      type(
        type(
          type(type(DefaultKeywordListUpsertRequestSchema).or(KeywordUpsertRequestSchema)).or(
            MLSpamUpsertRequestSchema,
          ),
        ).or(MentionSpamUpsertRequestSchema),
      ).or(UserProfileUpsertRequestSchema),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/bans',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', BanUserFromGuildRequestSchema),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', UnbanUserFromGuildRequestSchema),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', BulkBanUsersRequestSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/channels',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/channels',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', CreateGuildChannelRequestSchema),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/channels',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/emojis',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/emojis',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/incident-actions',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', GuildIncidentActionsRequestSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/integrations',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    sValidator(
      'param',
      type({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/invites',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/members',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/members/@me',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/members/search',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', BotAddGuildMemberRequestSchema),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/messages/search',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/new-member-welcome',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/onboarding',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/onboarding',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateGuildOnboardingRequestSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/preview',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/prune',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/prune',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', PruneGuildRequestSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/regions',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/requests',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/requests/:request_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/roles',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/roles',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', CreateRoleRequestSchema),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/roles',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', type(UpdateRolePositionsRequestSchema).array()),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateRoleRequestPartialSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      type({
        'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/scheduled-events',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      type(
        type(ExternalScheduledEventCreateRequestSchema).or(StageScheduledEventCreateRequestSchema),
      ).or(VoiceScheduledEventCreateRequestSchema),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'query',
      type({
        'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      type(
        type(ExternalScheduledEventPatchRequestPartialSchema).or(
          StageScheduledEventPatchRequestPartialSchema,
        ),
      ).or(VoiceScheduledEventPatchRequestPartialSchema),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions',
    sValidator(
      'param',
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', GuildScheduledEventExceptionCreateRequestSchema),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator('json', GuildScheduledEventExceptionPatchRequestPartialSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    sValidator(
      'param',
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users/counts',
    sValidator(
      'param',
      type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'query',
      type({
        'guild_scheduled_event_exception_ids?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 10')),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/:guild_scheduled_event_exception_id/users',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', SoundboardCreateRequestSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    sValidator('json', SoundboardPatchRequestPartialSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/stickers',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/stickers',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/templates',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/templates',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    ),
    sValidator(
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
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/threads/active',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateSelfVoiceStateRequestPartialSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateVoiceStateRequestPartialSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/webhooks',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', WelcomeScreenPatchRequestPartialSchema),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/widget',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/widget',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      type({
        'channel_id?': type('null | null').or(SnowflakeTypeSchema),
        'enabled?': 'boolean | null',
      }),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/widget.json',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/widget.png',
    sValidator('param', type({ guild_id: SnowflakeTypeSchema })),
    sValidator('query', type({ 'style?': WidgetImageStylesSchema })),
    (c) => {},
  )
