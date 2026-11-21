import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
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
  KeywordUpsertRequestSchema,
  KeywordUpsertRequestPartialSchema,
  MLSpamUpsertRequestSchema,
  MLSpamUpsertRequestPartialSchema,
  MentionSpamUpsertRequestSchema,
  MentionSpamUpsertRequestPartialSchema,
  PruneGuildRequestSchema,
  SnowflakeTypeSchema,
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
} from '../components'

export const guildsHandler = new Hono()
  .get(
    '/guilds/templates/:code',
    sValidator('param', z.object({ code: z.string().max(152133) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('query', z.object({ with_counts: z.stringbool().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', GuildPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/audit-logs',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        user_id: SnowflakeTypeSchema.exactOptional(),
        target_id: SnowflakeTypeSchema.exactOptional(),
        action_type: z
          .union([
            z.coerce.number().pipe(z.literal(1)),
            z.coerce.number().pipe(z.literal(10)),
            z.coerce.number().pipe(z.literal(11)),
            z.coerce.number().pipe(z.literal(12)),
            z.coerce.number().pipe(z.literal(13)),
            z.coerce.number().pipe(z.literal(14)),
            z.coerce.number().pipe(z.literal(15)),
            z.coerce.number().pipe(z.literal(16)).meta({ description: 'Channels were reordered' }),
            z.coerce.number().pipe(z.literal(20)),
            z.coerce.number().pipe(z.literal(21)),
            z.coerce.number().pipe(z.literal(22)),
            z.coerce.number().pipe(z.literal(23)),
            z.coerce.number().pipe(z.literal(24)),
            z.coerce.number().pipe(z.literal(25)),
            z.coerce.number().pipe(z.literal(26)),
            z.coerce.number().pipe(z.literal(27)),
            z.coerce.number().pipe(z.literal(28)),
            z.coerce.number().pipe(z.literal(30)),
            z.coerce.number().pipe(z.literal(31)),
            z.coerce.number().pipe(z.literal(32)),
            z.coerce.number().pipe(z.literal(33)).meta({ description: 'Roles were reordered' }),
            z.coerce.number().pipe(z.literal(40)),
            z.coerce.number().pipe(z.literal(41)),
            z.coerce.number().pipe(z.literal(42)),
            z.coerce.number().pipe(z.literal(50)),
            z.coerce.number().pipe(z.literal(51)),
            z.coerce.number().pipe(z.literal(52)),
            z.coerce.number().pipe(z.literal(60)),
            z.coerce.number().pipe(z.literal(61)),
            z.coerce.number().pipe(z.literal(62)),
            z.coerce.number().pipe(z.literal(72)),
            z.coerce.number().pipe(z.literal(73)),
            z.coerce.number().pipe(z.literal(74)),
            z.coerce.number().pipe(z.literal(75)),
            z.coerce.number().pipe(z.literal(80)),
            z.coerce.number().pipe(z.literal(81)),
            z.coerce.number().pipe(z.literal(82)),
            z.coerce.number().pipe(z.literal(83)),
            z.coerce.number().pipe(z.literal(84)),
            z.coerce.number().pipe(z.literal(85)),
            z.coerce.number().pipe(z.literal(90)),
            z.coerce.number().pipe(z.literal(91)),
            z.coerce.number().pipe(z.literal(92)),
            z.coerce.number().pipe(z.literal(100)),
            z.coerce.number().pipe(z.literal(101)),
            z.coerce.number().pipe(z.literal(102)),
            z.coerce.number().pipe(z.literal(110)),
            z.coerce.number().pipe(z.literal(111)),
            z.coerce.number().pipe(z.literal(112)),
            z.coerce.number().pipe(z.literal(121)),
            z.coerce.number().pipe(z.literal(130)),
            z.coerce.number().pipe(z.literal(131)),
            z.coerce.number().pipe(z.literal(132)),
            z.coerce.number().pipe(z.literal(140)),
            z.coerce.number().pipe(z.literal(141)),
            z.coerce.number().pipe(z.literal(142)),
            z.coerce.number().pipe(z.literal(143)),
            z.coerce.number().pipe(z.literal(144)),
            z.coerce.number().pipe(z.literal(145)),
            z.coerce.number().pipe(z.literal(146)),
            z.coerce.number().pipe(z.literal(150)),
            z.coerce.number().pipe(z.literal(151)),
            z.coerce.number().pipe(z.literal(163)),
            z.coerce.number().pipe(z.literal(164)),
            z.coerce.number().pipe(z.literal(165)),
            z.coerce.number().pipe(z.literal(166)),
            z.coerce.number().pipe(z.literal(167)),
            z.coerce.number().pipe(z.literal(171)),
            z.coerce.number().pipe(z.literal(172)),
            z.coerce.number().pipe(z.literal(180)),
            z.coerce.number().pipe(z.literal(190)),
            z.coerce.number().pipe(z.literal(191)),
            z.coerce.number().pipe(z.literal(192)),
            z.coerce.number().pipe(z.literal(193)),
            z.coerce
              .number()
              .pipe(z.literal(200))
              .meta({ description: 'Scheduled event exception was created' }),
            z.coerce
              .number()
              .pipe(z.literal(201))
              .meta({ description: 'Scheduled event exception was updated' }),
            z.coerce
              .number()
              .pipe(z.literal(202))
              .meta({ description: 'Scheduled event exception was deleted' }),
            z.coerce.number().pipe(z.literal(211)),
          ])
          .exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema })),
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(1).max(1000).exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', BanUserFromGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/bans/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', UnbanUserFromGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', BulkBanUsersRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/channels',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/channels',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', CreateGuildChannelRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/channels',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.array(
        z.object({
          id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
          position: z.int32().min(0).nullable().exactOptional(),
          parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
          lock_permissions: z.boolean().nullable().exactOptional(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/emojis',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/emojis',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({
        name: z.string().min(2).max(32),
        image: z.string(),
        roles: z
          .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({
        name: z.string().min(2).max(32).exactOptional(),
        roles: z
          .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', GuildIncidentActionsRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/integrations',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/invites',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(1).max(1000).exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/@me',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(1).max(1000).exactOptional(),
        query: z.string().min(1).max(100),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', BotAddGuildMemberRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({
        nick: z.string().max(32).nullable().exactOptional(),
        roles: z
          .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
          .max(350)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        mute: z.boolean().nullable().exactOptional(),
        deaf: z.boolean().nullable().exactOptional(),
        channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        communication_disabled_until: z.iso.datetime({ offset: true }).nullable().exactOptional(),
        flags: z.int().nullable().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    sValidator(
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
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        sort_by: z.union([z.literal('relevance'), z.literal('timestamp')]).exactOptional(),
        sort_order: z.union([z.literal('asc'), z.literal('desc')]).exactOptional(),
        content: z.string().max(1024).exactOptional(),
        slop: z.coerce.number().int().min(0).max(100).exactOptional(),
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
        limit: z.coerce.number().int().min(1).max(25).exactOptional(),
        offset: z.coerce.number().int().min(0).max(9975).exactOptional(),
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/onboarding',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/onboarding',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateGuildOnboardingRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/preview',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/prune',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        days: z.coerce.number().int().min(1).max(30).exactOptional(),
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
                        z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', PruneGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/regions',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/requests',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/requests/:request_id',
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/roles',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', CreateRoleRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', z.array(UpdateRolePositionsRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles/:role_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateRoleRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('query', z.object({ with_user_count: z.stringbool().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/scheduled-events',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', z.object({ with_user_count: z.stringbool().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', GuildScheduledEventExceptionCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    sValidator(
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
    sValidator(
      'param',
      z.object({
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
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'query',
      z.object({
        with_member: z.stringbool().exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users/counts',
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    sValidator(
      'param',
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
      'query',
      z.object({
        with_member: z.stringbool().exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', SoundboardCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema })),
    sValidator('json', SoundboardPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/stickers',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/templates',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/templates/:code',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/templates/:code',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) })),
    sValidator(
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
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateSelfVoiceStateRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    sValidator('json', UpdateVoiceStateRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/webhooks',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator('json', WelcomeScreenPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/widget',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({
        channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.json',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.png',
    sValidator('param', z.object({ guild_id: SnowflakeTypeSchema })),
    sValidator(
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
