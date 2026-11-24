import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
    sValidator('param', v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', GuildPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/audit-logs',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          user_id: SnowflakeTypeSchema,
          target_id: SnowflakeTypeSchema,
          action_type: v.union([
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(1),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(10),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(11),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(12),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(13),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(14),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(15),
            ),
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.literal(16),
              ),
              v.description('Channels were reordered'),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(20),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(21),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(22),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(23),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(24),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(25),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(26),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(27),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(28),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(30),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(31),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(32),
            ),
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.literal(33),
              ),
              v.description('Roles were reordered'),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(40),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(41),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(42),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(50),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(51),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(52),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(60),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(61),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(62),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(72),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(73),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(74),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(75),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(80),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(81),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(82),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(83),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(84),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(85),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(90),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(91),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(92),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(100),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(101),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(102),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(110),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(111),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(112),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(121),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(130),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(131),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(132),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(140),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(141),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(142),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(143),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(144),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(145),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(146),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(150),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(151),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(163),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(164),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(165),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(166),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(167),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(171),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(172),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(180),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(190),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(191),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(192),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(193),
            ),
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.literal(200),
              ),
              v.description('Scheduled event exception was created'),
            ),
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.literal(201),
              ),
              v.description('Scheduled event exception was updated'),
            ),
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.literal(202),
              ),
              v.description('Scheduled event exception was deleted'),
            ),
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.literal(211),
            ),
          ]),
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.union([
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
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.union([
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
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', BanUserFromGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', UnbanUserFromGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', BulkBanUsersRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/channels',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/channels',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', CreateGuildChannelRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/channels',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.array(
        v.partial(
          v.object({
            id: v.union([v.null(), SnowflakeTypeSchema]),
            position: v.nullable(
              v.pipe(
                v.number(),
                v.integer(),
                v.minValue(-2147483648),
                v.maxValue(2147483647),
                v.minValue(0),
              ),
            ),
            parent_id: v.union([v.null(), SnowflakeTypeSchema]),
            lock_permissions: v.nullable(v.boolean()),
          }),
        ),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/emojis',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/emojis',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.object({
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.partial(
        v.object({
          name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
          roles: v.nullable(
            v.pipe(
              v.array(v.union([v.null(), SnowflakeTypeSchema])),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/incident-actions',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', GuildIncidentActionsRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/integrations',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/invites',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(1000),
          ),
          after: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/@me',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members/search',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.object({
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', BotAddGuildMemberRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.partial(
        v.object({
          nick: v.nullable(v.pipe(v.string(), v.maxCodePoints(32))),
          roles: v.nullable(
            v.pipe(
              v.array(v.union([v.null(), SnowflakeTypeSchema])),
              v.maxLength(350),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
          mute: v.nullable(v.boolean()),
          deaf: v.nullable(v.boolean()),
          channel_id: v.union([v.null(), SnowflakeTypeSchema]),
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
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/messages/search',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          sort_by: SortingModeSchema,
          sort_order: SortingOrderSchema,
          content: v.pipe(v.string(), v.maxCodePoints(1024)),
          slop: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
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
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(25),
          ),
          offset: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/new-member-welcome',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/onboarding',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/onboarding',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateGuildOnboardingRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/preview',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/prune',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          days: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
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
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/prune',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', PruneGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/regions',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/requests',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          status: GuildJoinRequestApplicationStatusSchema,
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
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
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/requests/:request_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/roles',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', CreateRoleRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', v.array(UpdateRolePositionsRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateRoleRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/scheduled-events',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.union([
        ExternalScheduledEventCreateRequestSchema,
        StageScheduledEventCreateRequestSchema,
        VoiceScheduledEventCreateRequestSchema,
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      v.union([
        ExternalScheduledEventPatchRequestPartialSchema,
        StageScheduledEventPatchRequestPartialSchema,
        VoiceScheduledEventPatchRequestPartialSchema,
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', GuildScheduledEventExceptionCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator('json', GuildScheduledEventExceptionPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users/counts',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/:guild_scheduled_event_exception_id/users',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
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
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', SoundboardCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    sValidator('json', SoundboardPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/stickers',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'form',
      v.object({
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(30)),
        tags: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200)),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        file: v.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      v.partial(
        v.object({
          name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(30)),
          tags: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200)),
          description: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/templates',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/templates',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.object({
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    ),
    sValidator(
      'json',
      v.partial(
        v.object({
          name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
          description: v.nullable(v.pipe(v.string(), v.maxCodePoints(120))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/threads/active',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateSelfVoiceStateRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateVoiceStateRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/webhooks',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', WelcomeScreenPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/widget',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      v.partial(
        v.object({
          channel_id: v.union([v.null(), SnowflakeTypeSchema]),
          enabled: v.nullable(v.boolean()),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.json',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.png',
    sValidator('param', v.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('query', v.partial(v.object({ style: WidgetImageStylesSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
