import { initTRPC, TRPCError } from '@trpc/server'
import { Schema, SchemaTransformation } from 'effect'
import {
  ActionRowComponentForMessageRequestSchema,
  BulkLobbyMemberRequestSchema,
  ContainerComponentForMessageRequestSchema,
  CustomClientThemeShareRequestSchema,
  FileComponentForMessageRequestSchema,
  LobbyGuildInviteResponseSchema,
  LobbyMemberRequestSchema,
  LobbyMemberResponseSchema,
  LobbyMessageResponseSchema,
  LobbyResponseSchema,
  MediaGalleryComponentForMessageRequestSchema,
  MessageAllowedMentionsRequestSchema,
  MessageAttachmentRequestSchema,
  MessageReferenceRequestSchema,
  PollCreateRequestSchema,
  RichEmbedSchema,
  SectionComponentForMessageRequestSchema,
  SeparatorComponentForMessageRequestSchema,
  SnowflakeTypeSchema,
  TextDisplayComponentForMessageRequestSchema,
} from '../components'

const t = initTRPC.create()

export const lobbiesRouter = t.router({
  putLobbies: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          idle_timeout_seconds: Schema.optionalKey(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt32(),
                Schema.isGreaterThanOrEqualTo(5),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
          lobby_metadata: Schema.optionalKey(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 1024, {
                    expected: 'a string of at most 1024 characters',
                  }),
                ),
              ),
            ),
          ),
          member_metadata: Schema.optionalKey(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 1024, {
                    expected: 'a string of at most 1024 characters',
                  }),
                ),
              ),
            ),
          ),
          secret: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 250, {
              expected: 'a string of at most 250 characters',
            }),
          ),
          flags: Schema.optionalKey(Schema.Union([Schema.Null, Schema.Literal(1)])),
          name: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LobbyResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbies: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          idle_timeout_seconds: Schema.optionalKey(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt32(),
                Schema.isGreaterThanOrEqualTo(5),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
          members: Schema.optionalKey(
            Schema.NullOr(Schema.Array(LobbyMemberRequestSchema).check(Schema.isMaxLength(25))),
          ),
          metadata: Schema.optionalKey(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 1024, {
                    expected: 'a string of at most 1024 characters',
                  }),
                ),
              ),
            ),
          ),
          flags: Schema.optionalKey(Schema.Union([Schema.Null, Schema.Literal(1)])),
          override_event_webhooks_url: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ),
          ),
          name: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LobbyResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(LobbyResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchLobbiesLobbyId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          lobby_id: SnowflakeTypeSchema,
          idle_timeout_seconds: Schema.optionalKey(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt32(),
                Schema.isGreaterThanOrEqualTo(5),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
          metadata: Schema.optionalKey(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 1024, {
                    expected: 'a string of at most 1024 characters',
                  }),
                ),
              ),
            ),
          ),
          members: Schema.optionalKey(
            Schema.NullOr(Schema.Array(LobbyMemberRequestSchema).check(Schema.isMaxLength(25))),
          ),
          flags: Schema.optionalKey(Schema.Union([Schema.Null, Schema.Literal(1)])),
          override_event_webhooks_url: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ),
          ),
          name: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LobbyResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchLobbiesLobbyIdChannelLinking: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          lobby_id: SnowflakeTypeSchema,
          channel_id: Schema.optionalKey(Schema.Union([Schema.Null, SnowflakeTypeSchema])),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LobbyResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersMe: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersMeInvites: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(LobbyGuildInviteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersBulk: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          lobby_id: SnowflakeTypeSchema,
          body: Schema.NullOr(
            Schema.Array(BulkLobbyMemberRequestSchema).check(
              Schema.isMinLength(1),
              Schema.isMaxLength(25),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(LobbyMemberResponseSchema))))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          lobby_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          metadata: Schema.optionalKey(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 1024, {
                    expected: 'a string of at most 1024 characters',
                  }),
                ),
              ),
            ),
          ),
          flags: Schema.optionalKey(Schema.Union([Schema.Null, Schema.Literal(1)])),
          additional_name: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 80, {
                  expected: 'a string of at most 80 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LobbyMemberResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersUserIdInvites: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LobbyGuildInviteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyIdMessages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          lobby_id: SnowflakeTypeSchema,
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(200),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(LobbyMessageResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMessages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          lobby_id: SnowflakeTypeSchema,
          content: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 4000, {
                  expected: 'a string of at most 4000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optionalKey(
            Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
          ),
          allowed_mentions: Schema.optionalKey(
            Schema.Union([Schema.Null, MessageAllowedMentionsRequestSchema]),
          ),
          sticker_ids: Schema.optionalKey(
            Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(3))),
          ),
          components: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ).check(Schema.isMaxLength(40)),
            ),
          ),
          flags: Schema.optionalKey(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          attachments: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10)),
            ),
          ),
          poll: Schema.optionalKey(Schema.Union([Schema.Null, PollCreateRequestSchema])),
          shared_client_theme: Schema.optionalKey(
            Schema.Union([Schema.Null, CustomClientThemeShareRequestSchema]),
          ),
          message_reference: Schema.optionalKey(
            Schema.Union([Schema.Null, MessageReferenceRequestSchema]),
          ),
          nonce: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(-9223372036854775808n),
                  Schema.isLessThanOrEqualToBigInt(9223372036854775808n),
                ),
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 25, {
                  expected: 'a string of at most 25 characters',
                }),
              ),
              Schema.Null,
            ]),
          ),
          enforce_nonce: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
          tts: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LobbyMessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMessagesMessageIdModerationMetadata: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          lobby_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          body: Schema.Record(
            Schema.String,
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 2000, {
                expected: 'a string of at most 2000 characters',
              }),
            ),
          ).annotate({ description: 'The moderation metadata attached to the message' }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
