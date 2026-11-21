import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_counts: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(GuildPatchRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/audit-logs',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.optional(SnowflakeTypeSchema),
          target_id: Schema.optional(SnowflakeTypeSchema),
          action_type: Schema.optional(
            Schema.Union([
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(1))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(10))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(11))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(12))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(13))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(14))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(15))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(16))).annotate({
                description: 'Channels were reordered',
              }),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(20))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(21))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(22))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(23))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(24))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(25))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(26))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(27))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(28))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(30))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(31))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(32))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(33))).annotate({
                description: 'Roles were reordered',
              }),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(40))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(41))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(42))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(50))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(51))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(52))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(60))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(61))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(62))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(72))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(73))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(74))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(75))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(80))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(81))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(82))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(83))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(84))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(85))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(90))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(91))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(92))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(100))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(101))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(102))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(110))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(111))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(112))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(121))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(130))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(131))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(132))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(140))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(141))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(142))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(143))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(144))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(145))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(146))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(150))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(151))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(163))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(164))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(165))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(166))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(167))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(171))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(172))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(180))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(190))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(191))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(192))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(193))),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(200))).annotate({
                description: 'Scheduled event exception was created',
              }),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(201))).annotate({
                description: 'Scheduled event exception was updated',
              }),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(202))).annotate({
                description: 'Scheduled event exception was deleted',
              }),
              Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(211))),
            ]),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/auto-moderation/rules',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Union([
          DefaultKeywordListUpsertRequestSchema,
          KeywordUpsertRequestSchema,
          MLSpamUpsertRequestSchema,
          MentionSpamUpsertRequestSchema,
          UserProfileUpsertRequestSchema,
        ]),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Union([
          DefaultKeywordListUpsertRequestPartialSchema,
          KeywordUpsertRequestPartialSchema,
          MLSpamUpsertRequestPartialSchema,
          MentionSpamUpsertRequestPartialSchema,
          UserProfileUpsertRequestPartialSchema,
        ]),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/bans',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/bans/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/bans/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BanUserFromGuildRequestSchema)),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/bans/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UnbanUserFromGuildRequestSchema)),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BulkBanUsersRequestSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/channels',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/channels',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateGuildChannelRequestSchema)),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/channels',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
            position: Schema.optional(
              Schema.NullOr(
                Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0)),
              ),
            ),
            parent_id: Schema.optional(
              Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
            ),
            lock_permissions: Schema.optional(Schema.NullOr(Schema.Boolean)),
          }),
        ),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/emojis',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/emojis',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 2, {
              expected: 'a string of at least 2 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 32, {
              expected: 'a string of at most 32 characters',
            }),
          ),
          image: Schema.String,
          roles: Schema.optional(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(1521),
                Schema.isUnique(),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
          roles: Schema.optional(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(1521),
                Schema.isUnique(),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/incident-actions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(GuildIncidentActionsRequestSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/integrations',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/invites',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/members',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/members/@me',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          nick: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          avatar: Schema.optional(Schema.NullOr(Schema.String)),
          bio: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 300, {
                  expected: 'a string of at most 300 characters',
                }),
              ),
            ),
          ),
          banner: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/members/search',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/members/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/members/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BotAddGuildMemberRequestSchema)),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/members/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          nick: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          roles: Schema.optional(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(350),
                Schema.isUnique(),
              ),
            ),
          ),
          mute: Schema.optional(Schema.NullOr(Schema.Boolean)),
          deaf: Schema.optional(Schema.NullOr(Schema.Boolean)),
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          communication_disabled_until: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
          ),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/messages/search',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          sort_by: Schema.optional(SortingModeSchema),
          sort_order: Schema.optional(SortingOrderSchema),
          content: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 1024, {
                expected: 'a string of at most 1024 characters',
              }),
            ),
          ),
          slop: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          author_id: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          author_type: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(AuthorTypeSchema).check(Schema.isMaxLength(6), Schema.isUnique()),
              ),
            ),
          ),
          mentions: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          mentions_role_id: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          replied_to_user_id: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          replied_to_message_id: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          mention_everyone: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          min_id: Schema.optional(SnowflakeTypeSchema),
          max_id: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(25),
            ),
          ),
          offset: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(9975),
            ),
          ),
          has: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(HasOptionSchema).check(Schema.isMaxLength(18), Schema.isUnique()),
              ),
            ),
          ),
          link_hostname: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 256, {
                      expected: 'a string of at most 256 characters',
                    }),
                  ),
                ).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          embed_provider: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 256, {
                      expected: 'a string of at most 256 characters',
                    }),
                  ),
                ).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          embed_type: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(SearchableEmbedTypeSchema).check(
                  Schema.isMaxLength(5),
                  Schema.isUnique(),
                ),
              ),
            ),
          ),
          attachment_extension: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 256, {
                      expected: 'a string of at most 256 characters',
                    }),
                  ),
                ).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          attachment_filename: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 1024, {
                      expected: 'a string of at most 1024 characters',
                    }),
                  ),
                ).check(Schema.isMaxLength(100), Schema.isUnique()),
              ),
            ),
          ),
          pinned: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          include_nsfw: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          channel_id: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(500), Schema.isUnique()),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/new-member-welcome',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/onboarding',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/onboarding',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateGuildOnboardingRequestSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/preview',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/prune',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          days: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(30),
            ),
          ),
          include_roles: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(
                  Schema.Array(
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(
                        Schema.NullOr(
                          Schema.Union([
                            Schema.Unknown.pipe(
                              Schema.decodeTo(
                                Schema.Unknown,
                                SchemaTransformation.transform<unknown, unknown>({
                                  decode: (input) => (input === 'null' ? null : input),
                                  encode: (output) => output,
                                }),
                              ),
                              Schema.decodeTo(Schema.NullOr(Schema.Null)),
                            ),
                            SnowflakeTypeSchema,
                          ]),
                        ),
                      ),
                    ),
                  ).check(Schema.isMaxLength(100), Schema.isUnique()),
                ),
              ),
            ]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/prune',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PruneGuildRequestSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/regions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/requests',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          status: Schema.optional(GuildJoinRequestApplicationStatusSchema),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/requests/:request_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          action: Schema.optional(
            GuildJoinRequestApplicationStatusSchema.annotate({
              description: 'Whether to approve or reject the join request',
            }),
          ),
          rejection_reason: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 160, {
                  expected: 'a string of at most 160 characters',
                }),
              ),
            ).annotate({ description: 'Reason for rejection. Only used when action is REJECTED' }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateRoleRequestSchema)),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(Schema.Array(UpdateRolePositionsRequestSchema))),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateRoleRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_user_count: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/scheduled-events',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Union([
          ExternalScheduledEventCreateRequestSchema,
          StageScheduledEventCreateRequestSchema,
          VoiceScheduledEventCreateRequestSchema,
        ]),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_user_count: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Union([
          ExternalScheduledEventPatchRequestPartialSchema,
          StageScheduledEventPatchRequestPartialSchema,
          VoiceScheduledEventPatchRequestPartialSchema,
        ]),
      ),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(GuildScheduledEventExceptionCreateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(GuildScheduledEventExceptionPatchRequestPartialSchema),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_member: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users/counts',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_scheduled_event_exception_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(10))),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/:guild_scheduled_event_exception_id/users',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_member: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(SoundboardCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(SoundboardPatchRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/stickers',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/stickers',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 2, {
              expected: 'a string of at least 2 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 30, {
              expected: 'a string of at most 30 characters',
            }),
          ),
          tags: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 200, {
              expected: 'a string of at most 200 characters',
            }),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          file: Schema.String,
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 30, {
                expected: 'a string of at most 30 characters',
              }),
            ),
          ),
          tags: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 200, {
                expected: 'a string of at most 200 characters',
              }),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/templates',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/guilds/:guild_id/templates',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 120, {
                  expected: 'a string of at most 120 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/templates/:code',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 100, {
                expected: 'a string of at most 100 characters',
              }),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 120, {
                  expected: 'a string of at most 120 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/threads/active',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateSelfVoiceStateRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateVoiceStateRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/webhooks',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(WelcomeScreenPatchRequestPartialSchema)),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/widget',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/guilds/:guild_id/widget',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/widget.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/guilds/:guild_id/widget.png',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(Schema.Struct({ style: Schema.optional(WidgetImageStylesSchema) })),
    ),
    (c) => {},
  )
