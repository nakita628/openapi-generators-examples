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
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(GuildPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BulkBanUsersRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/channels',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/channels',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateGuildChannelRequestSchema)),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(GuildIncidentActionsRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/integrations',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/invites',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/onboarding',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/guilds/:guild_id/onboarding',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateGuildOnboardingRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/preview',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PruneGuildRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/regions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateRoleRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(Schema.Array(UpdateRolePositionsRequestSchema))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(SoundboardCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/stickers',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateSelfVoiceStateRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/webhooks',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(WelcomeScreenPatchRequestPartialSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
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
          channel_id: Schema.optionalKey(Schema.Union([Schema.Null, SnowflakeTypeSchema])),
          enabled: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/guilds/:guild_id/widget.png',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ style: Schema.optionalKey(WidgetImageStylesSchema) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
