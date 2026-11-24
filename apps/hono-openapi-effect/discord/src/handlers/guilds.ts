import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema, SchemaTransformation } from 'effect'
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildTemplateResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildWithCountsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_counts: Schema.optionalKey(
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(GuildPatchRequestPartialSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildAuditLogResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.optionalKey(SnowflakeTypeSchema),
          target_id: Schema.optionalKey(SnowflakeTypeSchema),
          action_type: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(1))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(10))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(11))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(12))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(13))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(14))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(15))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(16)))
                .annotate({ description: 'Channels were reordered' }),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(20))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(21))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(22))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(23))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(24))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(25))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(26))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(27))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(28))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(30))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(31))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(32))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(33)))
                .annotate({ description: 'Roles were reordered' }),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(40))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(41))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(42))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(50))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(51))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(52))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(60))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(61))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(62))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(72))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(73))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(74))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(75))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(80))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(81))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(82))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(83))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(84))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(85))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(90))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(91))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(92))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(100))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(101))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(102))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(110))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(111))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(112))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(121))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(130))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(131))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(132))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(140))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(141))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(142))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(143))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(144))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(145))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(146))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(150))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(151))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(163))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(164))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(165))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(166))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(167))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(171))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(172))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(180))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(190))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(191))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(192))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(193))),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(200)))
                .annotate({ description: 'Scheduled event exception was created' }),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(201)))
                .annotate({ description: 'Scheduled event exception was updated' }),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(202)))
                .annotate({ description: 'Scheduled event exception was deleted' }),
              Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                .pipe(
                  Schema.decodeTo(
                    Schema.Finite,
                    SchemaTransformation.transform({
                      decode: (input) => Number(input),
                      encode: (output) => String(output),
                    }),
                  ),
                )
                .pipe(Schema.decodeTo(Schema.Literal(211))),
            ]),
          ),
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(
                    Schema.Array(
                      Schema.Union([
                        DefaultKeywordRuleResponseSchema,
                        KeywordRuleResponseSchema,
                        MLSpamRuleResponseSchema,
                        MentionSpamRuleResponseSchema,
                        UserProfileRuleResponseSchema,
                        Schema.Null,
                      ]),
                    ),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
                Schema.toStandardSchemaV1(
                  Schema.Union([
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
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
                Schema.toStandardSchemaV1(
                  Schema.Union([
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
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
                Schema.toStandardSchemaV1(
                  Schema.Union([
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
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
                Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(GuildBanResponseSchema))),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(1000),
              ),
          ),
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildBanResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(BanUserFromGuildRequestSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UnbanUserFromGuildRequestSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(BulkBanUsersResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(BulkBanUsersRequestSchema)),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(
                    Schema.Array(
                      Schema.Union([
                        GuildChannelResponseSchema,
                        PrivateChannelResponseSchema,
                        PrivateGroupChannelResponseSchema,
                        ThreadResponseSchema,
                      ]),
                    ),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildChannelResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(CreateGuildChannelRequestSchema)),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Array(
          Schema.Struct({
            id: Schema.optionalKey(Schema.Union([Schema.Null, SnowflakeTypeSchema])),
            position: Schema.optionalKey(
              Schema.NullOr(
                Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0)),
              ),
            ),
            parent_id: Schema.optionalKey(Schema.Union([Schema.Null, SnowflakeTypeSchema])),
            lock_permissions: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
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
              schema: resolver(
                Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(EmojiResponseSchema))),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EmojiResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
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
          roles: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.Null, SnowflakeTypeSchema])).check(
                Schema.isMaxLength(1521),
                Schema.isUnique(),
              ),
            ),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EmojiResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EmojiResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
          roles: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.Null, SnowflakeTypeSchema])).check(
                Schema.isMaxLength(1521),
                Schema.isUnique(),
              ),
            ),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildIncidentsDataResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(GuildIncidentActionsRequestSchema)),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(
                    Schema.Array(
                      Schema.Union([
                        DiscordIntegrationResponseSchema,
                        ExternalConnectionIntegrationResponseSchema,
                        GuildSubscriptionIntegrationResponseSchema,
                      ]),
                    ),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
      ),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(
                    Schema.Array(
                      Schema.Union([
                        FriendInviteResponseSchema,
                        GroupDMInviteResponseSchema,
                        GuildInviteResponseSchema,
                        Schema.Null,
                      ]),
                    ),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(GuildMemberResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(1000),
              ),
          ),
          after: Schema.optionalKey(SnowflakeTypeSchema),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PrivateGuildMemberResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          nick: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          avatar: Schema.optionalKey(Schema.NullOr(Schema.String)),
          bio: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 300, {
                  expected: 'a string of at most 300 characters',
                }),
              ),
            ),
          ),
          banner: Schema.optionalKey(Schema.NullOr(Schema.String)),
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
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(GuildMemberResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildMemberResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildMemberResponseSchema)),
            },
          },
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(BotAddGuildMemberRequestSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildMemberResponseSchema)),
            },
          },
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          nick: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          roles: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.Null, SnowflakeTypeSchema])).check(
                Schema.isMaxLength(350),
                Schema.isUnique(),
              ),
            ),
          ),
          mute: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
          deaf: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
          channel_id: Schema.optionalKey(Schema.Union([Schema.Null, SnowflakeTypeSchema])),
          communication_disabled_until: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
          ),
          flags: Schema.optionalKey(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildSearchResponseSchema)),
            },
          },
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SearchIndexNotReadyResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          sort_by: Schema.optionalKey(SortingModeSchema),
          sort_order: Schema.optionalKey(SortingOrderSchema),
          content: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 1024, {
                expected: 'a string of at most 1024 characters',
              }),
            ),
          ),
          slop: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          author_id: Schema.optionalKey(
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
          author_type: Schema.optionalKey(
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
          mentions: Schema.optionalKey(
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
          mentions_role_id: Schema.optionalKey(
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
          replied_to_user_id: Schema.optionalKey(
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
          replied_to_message_id: Schema.optionalKey(
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
          mention_everyone: Schema.optionalKey(
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
          min_id: Schema.optionalKey(SnowflakeTypeSchema),
          max_id: Schema.optionalKey(SnowflakeTypeSchema),
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(25),
              ),
          ),
          offset: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(9975),
              ),
          ),
          has: Schema.optionalKey(
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
          link_hostname: Schema.optionalKey(
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
          embed_provider: Schema.optionalKey(
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
          embed_type: Schema.optionalKey(
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
          attachment_extension: Schema.optionalKey(
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
          attachment_filename: Schema.optionalKey(
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
          pinned: Schema.optionalKey(
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
          include_nsfw: Schema.optionalKey(
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
          channel_id: Schema.optionalKey(
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildHomeSettingsResponseSchema)),
            },
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UserGuildOnboardingResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildOnboardingResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(UpdateGuildOnboardingRequestSchema)),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionsResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionsResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildPreviewResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildPruneResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          days: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(30),
              ),
          ),
          include_roles: Schema.optionalKey(
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
                              Schema.decodeTo(Schema.Null),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildPruneResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(PruneGuildRequestSchema)),
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
                Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(VoiceRegionResponseSchema))),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildJoinRequestsListResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          status: Schema.optionalKey(GuildJoinRequestApplicationStatusSchema),
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildJoinRequestResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, request_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          action: Schema.optionalKey(
            GuildJoinRequestApplicationStatusSchema.annotate({
              description: 'Whether to approve or reject the join request',
            }),
          ),
          rejection_reason: Schema.optionalKey(
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(GuildRoleResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildRoleResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(CreateRoleRequestSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(GuildRoleResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(Schema.Array(UpdateRolePositionsRequestSchema))),
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
                Schema.toStandardSchemaV1(
                  Schema.Record(Schema.String, Schema.Number.check(Schema.isInt32())),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildRoleResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildRoleResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateRoleRequestPartialSchema)),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(
                    Schema.Array(
                      Schema.Union([
                        ExternalScheduledEventResponseSchema,
                        StageScheduledEventResponseSchema,
                        VoiceScheduledEventResponseSchema,
                      ]),
                    ),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_user_count: Schema.optionalKey(
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
                Schema.toStandardSchemaV1(
                  Schema.Union([
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Union([
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
                Schema.toStandardSchemaV1(
                  Schema.Union([
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_user_count: Schema.optionalKey(
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
                Schema.toStandardSchemaV1(
                  Schema.Union([
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Union([
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
              schema: resolver(
                Schema.toStandardSchemaV1(GuildScheduledEventExceptionResponseSchema),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(GuildScheduledEventExceptionCreateRequestSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
              schema: resolver(
                Schema.toStandardSchemaV1(GuildScheduledEventExceptionResponseSchema),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(GuildScheduledEventExceptionPatchRequestPartialSchema),
    ),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ScheduledEventUserResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_member: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
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
              schema: resolver(Schema.toStandardSchemaV1(ScheduledEventUserCountResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_scheduled_event_exception_ids: Schema.optionalKey(
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(Schema.Array(ScheduledEventUserResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_member: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
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
              schema: resolver(Schema.toStandardSchemaV1(ListGuildSoundboardSoundsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SoundboardSoundResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(SoundboardCreateRequestSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SoundboardSoundResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SoundboardSoundResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(SoundboardPatchRequestPartialSchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(GuildStickerResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildStickerResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
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
          description: Schema.optionalKey(
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildStickerResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildStickerResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 30, {
                expected: 'a string of at most 30 characters',
              }),
            ),
          ),
          tags: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 200, {
                expected: 'a string of at most 200 characters',
              }),
            ),
          ),
          description: Schema.optionalKey(
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
                Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(GuildTemplateResponseSchema))),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildTemplateResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
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
          description: Schema.optionalKey(
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildTemplateResponseSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildTemplateResponseSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildTemplateResponseSchema)),
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
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 100, {
                expected: 'a string of at most 100 characters',
              }),
            ),
          ),
          description: Schema.optionalKey(
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ThreadsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VanityURLResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VoiceStateResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(UpdateSelfVoiceStateRequestPartialSchema)),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VoiceStateResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateVoiceStateRequestPartialSchema)),
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
                Schema.toStandardSchemaV1(
                  Schema.NullOr(
                    Schema.Array(
                      Schema.Union([
                        ApplicationIncomingWebhookResponseSchema,
                        ChannelFollowerWebhookResponseSchema,
                        GuildIncomingWebhookResponseSchema,
                      ]),
                    ),
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
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildWelcomeScreenResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GuildWelcomeScreenResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator('json', Schema.toStandardSchemaV1(WelcomeScreenPatchRequestPartialSchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(WidgetSettingsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(WidgetSettingsResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: Schema.optionalKey(Schema.Union([Schema.Null, SnowflakeTypeSchema])),
          enabled: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(WidgetResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
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
          content: { 'image/png': { schema: resolver(Schema.toStandardSchemaV1(Schema.String)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ style: Schema.optionalKey(WidgetImageStylesSchema) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
