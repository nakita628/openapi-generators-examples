import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  AuditLogActionTypesSchema,
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
    tbValidator('param', Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        with_counts: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', GuildPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/audit-logs',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/auto-moderation/rules',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([
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
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Union([
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
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/bans/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/bans/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', BanUserFromGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/bans/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', UnbanUserFromGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', BulkBanUsersRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/channels',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/channels',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', CreateGuildChannelRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/channels',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/emojis',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/emojis',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        name: Type.String({ minLength: 2, maxLength: 32 }),
        image: Type.String(),
        roles: Type.Optional(
          Type.Union([
            Type.Array(Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]), {
              maxItems: 1521,
              uniqueItems: true,
            }),
            Type.Null(),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/emojis/:emoji_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/emojis/:emoji_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Object({
        name: Type.Optional(Type.String({ minLength: 2, maxLength: 32 })),
        roles: Type.Optional(
          Type.Union([
            Type.Array(Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]), {
              maxItems: 1521,
              uniqueItems: true,
            }),
            Type.Null(),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/incident-actions',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', GuildIncidentActionsRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/integrations',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/invites',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(SnowflakeTypeSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/@me',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        nick: Type.Optional(Type.Union([Type.String({ maxLength: 32 }), Type.Null()])),
        avatar: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        bio: Type.Optional(Type.Union([Type.String({ maxLength: 300 }), Type.Null()])),
        banner: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members/search',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        query: Type.String({ minLength: 1, maxLength: 100 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/members/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', BotAddGuildMemberRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/members/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Object({
        nick: Type.Optional(Type.Union([Type.String({ maxLength: 32 }), Type.Null()])),
        roles: Type.Optional(
          Type.Union([
            Type.Array(Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]), {
              maxItems: 350,
              uniqueItems: true,
            }),
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
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/messages/search',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/new-member-welcome',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/onboarding',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/onboarding',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', UpdateGuildOnboardingRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/preview',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/prune',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        days: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        include_roles: Type.Optional(
          Type.Union([
            Type.String(),
            Type.Array(Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]), {
              maxItems: 100,
              uniqueItems: true,
            }),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/prune',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', PruneGuildRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/regions',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/requests',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/requests/:request_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/roles',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', CreateRoleRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', Type.Array(UpdateRolePositionsRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', UpdateRoleRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        with_user_count: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/scheduled-events',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([
        ExternalScheduledEventCreateRequestSchema,
        StageScheduledEventCreateRequestSchema,
        VoiceScheduledEventCreateRequestSchema,
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'query',
      Type.Object({
        with_user_count: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Union([
        ExternalScheduledEventPatchRequestPartialSchema,
        StageScheduledEventPatchRequestPartialSchema,
        VoiceScheduledEventPatchRequestPartialSchema,
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', GuildScheduledEventExceptionCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    tbValidator(
      'param',
      Type.Object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    tbValidator(
      'param',
      Type.Object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    ),
    tbValidator('json', GuildScheduledEventExceptionPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users/counts',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'query',
      Type.Object({
        guild_scheduled_event_exception_ids: Type.Optional(
          Type.Array(SnowflakeTypeSchema, { maxItems: 10 }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/:guild_scheduled_event_exception_id/users',
    tbValidator(
      'param',
      Type.Object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
      }),
    ),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', SoundboardCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', SoundboardPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/stickers',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'form',
      Type.Object({
        name: Type.String({ minLength: 2, maxLength: 30 }),
        tags: Type.String({ minLength: 1, maxLength: 200 }),
        description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
        file: Type.String(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers/:sticker_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/stickers/:sticker_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Object({
        name: Type.Optional(Type.String({ minLength: 2, maxLength: 30 })),
        tags: Type.Optional(Type.String({ minLength: 1, maxLength: 200 })),
        description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/templates',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/templates',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        name: Type.String({ minLength: 1, maxLength: 100 }),
        description: Type.Optional(Type.Union([Type.String({ maxLength: 120 }), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/templates/:code',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, code: Type.String({ maxLength: 152133 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/templates/:code',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, code: Type.String({ maxLength: 152133 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/templates/:code',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, code: Type.String({ maxLength: 152133 }) }),
    ),
    tbValidator(
      'json',
      Type.Object({
        name: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
        description: Type.Optional(Type.Union([Type.String({ maxLength: 120 }), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/threads/active',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', UpdateSelfVoiceStateRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/:user_id',
    tbValidator(
      'param',
      Type.Object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', UpdateVoiceStateRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/webhooks',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('json', WelcomeScreenPatchRequestPartialSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/widget',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        channel_id: Type.Optional(
          Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
        ),
        enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.json',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.png',
    tbValidator('param', Type.Object({ guild_id: SnowflakeTypeSchema })),
    tbValidator('query', Type.Object({ style: Type.Optional(WidgetImageStylesSchema) })),
    (c) => { throw new Error('Not implemented') },
  )
