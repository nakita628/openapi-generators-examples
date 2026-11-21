import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import {
  AllowedMentionTypesSchema,
  BulkLobbyMemberRequestSchema,
  ChannelSelectDefaultValueSchema,
  LobbyMemberRequestSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  RoleSelectDefaultValueSchema,
  SDKMessageRequestSchema,
  SnowflakeTypeSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UserSelectDefaultValueSchema,
} from '../components'

export const lobbiesHandler = new Hono()
  .put(
    '/lobbies',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          idle_timeout_seconds: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt32(),
                Schema.isGreaterThanOrEqualTo(5),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
          lobby_metadata: Schema.optional(
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
          member_metadata: Schema.optional(
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
          flags: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Schema.Literal(1)])),
          name: Schema.optional(
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
    ),
    (c) => {},
  )
  .post(
    '/lobbies',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          idle_timeout_seconds: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt32(),
                Schema.isGreaterThanOrEqualTo(5),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
          members: Schema.optional(
            Schema.NullOr(Schema.Array(LobbyMemberRequestSchema).check(Schema.isMaxLength(25))),
          ),
          metadata: Schema.optional(
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
          flags: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Schema.Literal(1)])),
          override_event_webhooks_url: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ),
          ),
          name: Schema.optional(
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
    ),
    (c) => {},
  )
  .get(
    '/lobbies/:lobby_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/lobbies/:lobby_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/lobbies/:lobby_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          idle_timeout_seconds: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt32(),
                Schema.isGreaterThanOrEqualTo(5),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
          metadata: Schema.optional(
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
          members: Schema.optional(
            Schema.NullOr(Schema.Array(LobbyMemberRequestSchema).check(Schema.isMaxLength(25))),
          ),
          flags: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Schema.Literal(1)])),
          override_event_webhooks_url: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ),
          ),
          name: Schema.optional(
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
    ),
    (c) => {},
  )
  .patch(
    '/lobbies/:lobby_id/channel-linking',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/lobbies/:lobby_id/members/@me',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/members/@me/invites',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/members/bulk',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(BulkLobbyMemberRequestSchema).check(
            Schema.isMinLength(1),
            Schema.isMaxLength(25),
          ),
        ),
      ),
    ),
    (c) => {},
  )
  .put(
    '/lobbies/:lobby_id/members/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          metadata: Schema.optional(
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
          flags: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Schema.Literal(1)])),
          additional_name: Schema.optional(
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
    ),
    (c) => {},
  )
  .delete(
    '/lobbies/:lobby_id/members/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/members/:user_id/invites',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/lobbies/:lobby_id/messages',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(200),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/messages',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ lobby_id: SnowflakeTypeSchema })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(SDKMessageRequestSchema)),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          content: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 4000, {
                  expected: 'a string of at most 4000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optional(
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
                        Schema.Struct({
                          type: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => [...input].length <= 152133, {
                                  expected: 'a string of at most 152133 characters',
                                }),
                              ),
                            ),
                          ),
                          url: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => URL.canParse(input)),
                                Schema.makeFilter((input) => [...input].length <= 2048, {
                                  expected: 'a string of at most 2048 characters',
                                }),
                              ),
                            ),
                          ),
                          title: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => [...input].length <= 256, {
                                  expected: 'a string of at most 256 characters',
                                }),
                              ),
                            ),
                          ),
                          color: Schema.optional(
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
                                  Schema.FiniteFromString.check(
                                    Schema.isInt(),
                                    Schema.isGreaterThanOrEqualTo(0),
                                    Schema.isLessThanOrEqualTo(16777215),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          timestamp: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.isPattern(
                                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                                ),
                              ),
                            ),
                          ),
                          description: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => [...input].length <= 4096, {
                                  expected: 'a string of at most 4096 characters',
                                }),
                              ),
                            ),
                          ),
                          author: Schema.optional(
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
                                    RichEmbedAuthorSchema,
                                  ]),
                                ),
                              ),
                            ),
                          ),
                          image: Schema.optional(
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
                                    Schema.Struct({
                                      url: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => URL.canParse(input)),
                                            Schema.makeFilter(
                                              (input) => [...input].length <= 2048,
                                              { expected: 'a string of at most 2048 characters' },
                                            ),
                                          ),
                                        ),
                                      ),
                                      width: Schema.optional(
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
                                              Schema.FiniteFromString.check(Schema.isInt()),
                                            ),
                                          ),
                                        ),
                                      ),
                                      height: Schema.optional(
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
                                              Schema.FiniteFromString.check(Schema.isInt()),
                                            ),
                                          ),
                                        ),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 64, {
                                              expected: 'a string of at most 64 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      placeholder_version: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(2147483647),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      is_animated: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      description: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter(
                                              (input) => [...input].length <= 4096,
                                              { expected: 'a string of at most 4096 characters' },
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                  ]),
                                ),
                              ),
                            ),
                          ),
                          thumbnail: Schema.optional(
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
                                    Schema.Struct({
                                      url: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => URL.canParse(input)),
                                            Schema.makeFilter(
                                              (input) => [...input].length <= 2048,
                                              { expected: 'a string of at most 2048 characters' },
                                            ),
                                          ),
                                        ),
                                      ),
                                      width: Schema.optional(
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
                                              Schema.FiniteFromString.check(Schema.isInt()),
                                            ),
                                          ),
                                        ),
                                      ),
                                      height: Schema.optional(
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
                                              Schema.FiniteFromString.check(Schema.isInt()),
                                            ),
                                          ),
                                        ),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 64, {
                                              expected: 'a string of at most 64 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      placeholder_version: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(2147483647),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      is_animated: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      description: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter(
                                              (input) => [...input].length <= 4096,
                                              { expected: 'a string of at most 4096 characters' },
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                  ]),
                                ),
                              ),
                            ),
                          ),
                          footer: Schema.optional(
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
                                    RichEmbedFooterSchema,
                                  ]),
                                ),
                              ),
                            ),
                          ),
                          fields: Schema.optional(
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
                                  Schema.Unknown.pipe(
                                    Schema.decodeTo(
                                      Schema.Unknown,
                                      SchemaTransformation.transform<unknown, unknown>({
                                        decode: (input) =>
                                          input === undefined || Array.isArray(input)
                                            ? input
                                            : [input],
                                        encode: (output) => output,
                                      }),
                                    ),
                                    Schema.decodeTo(
                                      Schema.Array(
                                        Schema.Struct({
                                          name: Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 256, {
                                              expected: 'a string of at most 256 characters',
                                            }),
                                          ),
                                          value: Schema.String.check(
                                            Schema.makeFilter(
                                              (input) => [...input].length <= 1024,
                                              { expected: 'a string of at most 1024 characters' },
                                            ),
                                          ),
                                          inline: Schema.optional(
                                            Schema.Unknown.pipe(
                                              Schema.decodeTo(
                                                Schema.Unknown,
                                                SchemaTransformation.transform<unknown, unknown>({
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(
                                                Schema.NullOr(
                                                  Schema.String.check(
                                                    Schema.isPattern(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ),
                                                  ).pipe(
                                                    Schema.decodeTo(
                                                      Schema.Boolean,
                                                      SchemaTransformation.transform({
                                                        decode: (input) =>
                                                          /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                            input,
                                                          ),
                                                        encode: (output) =>
                                                          output ? 'true' : 'false',
                                                      }),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                        }),
                                      ).check(Schema.isMaxLength(25)),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          provider: Schema.optional(
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
                                    RichEmbedProviderSchema,
                                  ]),
                                ),
                              ),
                            ),
                          ),
                          video: Schema.optional(
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
                                    Schema.Struct({
                                      url: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => URL.canParse(input)),
                                            Schema.makeFilter(
                                              (input) => [...input].length <= 2048,
                                              { expected: 'a string of at most 2048 characters' },
                                            ),
                                          ),
                                        ),
                                      ),
                                      width: Schema.optional(
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
                                              Schema.FiniteFromString.check(Schema.isInt()),
                                            ),
                                          ),
                                        ),
                                      ),
                                      height: Schema.optional(
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
                                              Schema.FiniteFromString.check(Schema.isInt()),
                                            ),
                                          ),
                                        ),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 64, {
                                              expected: 'a string of at most 64 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      placeholder_version: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(2147483647),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      is_animated: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      description: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter(
                                              (input) => [...input].length <= 4096,
                                              { expected: 'a string of at most 4096 characters' },
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                  ]),
                                ),
                              ),
                            ),
                          ),
                          audio: Schema.optional(
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
                                    RichEmbedAudioSchema,
                                  ]),
                                ),
                              ),
                            ),
                          ),
                        }),
                      ).check(Schema.isMaxLength(10)),
                    ),
                  ),
                ),
              ),
            ),
          ),
          allowed_mentions: Schema.optional(
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
                    Schema.Struct({
                      parse: Schema.optional(
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
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                            ),
                                            AllowedMentionTypesSchema,
                                          ]),
                                        ),
                                      ),
                                    ),
                                  ).check(Schema.isMaxLength(1521), Schema.isUnique()),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      users: Schema.optional(
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
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
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
                            ),
                          ),
                        ),
                      ),
                      roles: Schema.optional(
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
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
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
                            ),
                          ),
                        ),
                      ),
                      replied_user: Schema.optional(
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
                              Schema.String.check(
                                Schema.isPattern(
                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                ),
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
                          ),
                        ),
                      ),
                    }),
                  ]),
                ),
              ),
            ),
          ),
          sticker_ids: Schema.optional(
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
                  Schema.Unknown.pipe(
                    Schema.decodeTo(
                      Schema.Unknown,
                      SchemaTransformation.transform<unknown, unknown>({
                        decode: (input) =>
                          input === undefined || Array.isArray(input) ? input : [input],
                        encode: (output) => output,
                      }),
                    ),
                    Schema.decodeTo(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(3))),
                  ),
                ),
              ),
            ),
          ),
          components: Schema.optional(
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
                        Schema.Union([
                          Schema.Struct({
                            type: Schema.Union([
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(1)),
                              ).annotate({ description: 'Container for other components' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(2)),
                              ).annotate({ description: 'Button object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(3)),
                              ).annotate({
                                description: 'Select menu for picking from defined text options',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(4)),
                              ).annotate({ description: 'Text input object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(5)),
                              ).annotate({ description: 'Select menu for users' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(6)),
                              ).annotate({ description: 'Select menu for roles' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(7)),
                              ).annotate({
                                description: 'Select menu for mentionables (users and roles)',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(8)),
                              ).annotate({ description: 'Select menu for channels' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(9)),
                              ).annotate({ description: 'Section component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(10)),
                              ).annotate({ description: 'Text component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(11)),
                              ).annotate({ description: 'Thumbnail component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(12)),
                              ).annotate({ description: 'Media gallery component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(13)),
                              ).annotate({ description: 'File component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(14)),
                              ).annotate({ description: 'Separator component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(17)),
                              ).annotate({ description: 'Container component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(18)),
                              ).annotate({ description: 'Label component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(19)),
                              ).annotate({ description: 'File upload component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(21)),
                              ).annotate({ description: 'Radio group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(22)),
                              ).annotate({ description: 'Checkbox group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(23)),
                              ).annotate({ description: 'Checkbox component' }),
                            ]),
                            id: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt32(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            components: Schema.Unknown.pipe(
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
                                  Schema.Union([
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      custom_id: Schema.optional(
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
                                      style: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ),
                                      ]),
                                      label: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 80, {
                                              expected: 'a string of at most 80 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      disabled: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      url: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => URL.canParse(input)),
                                            Schema.makeFilter((input) => [...input].length <= 512, {
                                              expected: 'a string of at most 512 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      sku_id: Schema.optional(
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
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === 'null' ? null : input,
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
                                      ),
                                      emoji: Schema.optional(
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
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === 'null' ? null : input,
                                                      encode: (output) => output,
                                                    }),
                                                  ),
                                                  Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                                ),
                                                Schema.Struct({
                                                  id: Schema.optional(
                                                    Schema.Unknown.pipe(
                                                      Schema.decodeTo(
                                                        Schema.Unknown,
                                                        SchemaTransformation.transform<
                                                          unknown,
                                                          unknown
                                                        >({
                                                          decode: (input) =>
                                                            input === 'null' ? null : input,
                                                          encode: (output) => output,
                                                        }),
                                                      ),
                                                      Schema.decodeTo(
                                                        Schema.NullOr(
                                                          Schema.Union([
                                                            Schema.Unknown.pipe(
                                                              Schema.decodeTo(
                                                                Schema.Unknown,
                                                                SchemaTransformation.transform<
                                                                  unknown,
                                                                  unknown
                                                                >({
                                                                  decode: (input) =>
                                                                    input === 'null' ? null : input,
                                                                  encode: (output) => output,
                                                                }),
                                                              ),
                                                              Schema.decodeTo(
                                                                Schema.NullOr(Schema.Null),
                                                              ),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ]),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                  name: Schema.String.check(
                                                    Schema.makeFilter(
                                                      (input) => [...input].length <= 32,
                                                      {
                                                        expected:
                                                          'a string of at most 32 characters',
                                                      },
                                                    ),
                                                  ),
                                                }),
                                              ]),
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      custom_id: Schema.String.check(
                                        Schema.makeFilter((input) => [...input].length >= 1, {
                                          expected: 'a string of at least 1 character',
                                        }),
                                        Schema.makeFilter((input) => [...input].length <= 100, {
                                          expected: 'a string of at most 100 characters',
                                        }),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 150, {
                                              expected: 'a string of at most 150 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      min_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      max_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(1),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      disabled: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      required: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      default_values: Schema.optional(
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
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === undefined || Array.isArray(input)
                                                        ? input
                                                        : [input],
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.Array(
                                                    ChannelSelectDefaultValueSchema,
                                                  ).check(Schema.isMaxLength(25)),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      channel_types: Schema.optional(
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
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === undefined || Array.isArray(input)
                                                        ? input
                                                        : [input],
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.Array(
                                                    Schema.Union([
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(1)),
                                                      ).annotate({
                                                        description:
                                                          'A direct message between users',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(3)),
                                                      ).annotate({
                                                        description:
                                                          'A direct message between multiple users',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(0)),
                                                      ).annotate({
                                                        description:
                                                          'A text channel within a server',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(2)),
                                                      ).annotate({
                                                        description:
                                                          'A voice channel within a server',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(4)),
                                                      ).annotate({
                                                        description:
                                                          'An organizational category that contains up to 50 channels',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(5)),
                                                      ).annotate({
                                                        description:
                                                          'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(10)),
                                                      ).annotate({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(11)),
                                                      ).annotate({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(12)),
                                                      ).annotate({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(13)),
                                                      ).annotate({
                                                        description:
                                                          'A voice channel for hosting events with an audience',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(14)),
                                                      ).annotate({
                                                        description:
                                                          'The channel in a hub containing the listed servers',
                                                      }),
                                                      Schema.FiniteFromString.pipe(
                                                        Schema.decodeTo(Schema.Literal(15)),
                                                      ).annotate({
                                                        description:
                                                          'Channel that can only contain threads',
                                                      }),
                                                    ]),
                                                  ).check(Schema.isUnique()),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      custom_id: Schema.String.check(
                                        Schema.makeFilter((input) => [...input].length >= 1, {
                                          expected: 'a string of at least 1 character',
                                        }),
                                        Schema.makeFilter((input) => [...input].length <= 100, {
                                          expected: 'a string of at most 100 characters',
                                        }),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 150, {
                                              expected: 'a string of at most 150 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      min_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      max_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(1),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      disabled: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      required: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      default_values: Schema.optional(
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
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === undefined || Array.isArray(input)
                                                        ? input
                                                        : [input],
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.Array(
                                                    Schema.Union([
                                                      RoleSelectDefaultValueSchema,
                                                      UserSelectDefaultValueSchema,
                                                    ]),
                                                  ).check(Schema.isMaxLength(25)),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      custom_id: Schema.String.check(
                                        Schema.makeFilter((input) => [...input].length >= 1, {
                                          expected: 'a string of at least 1 character',
                                        }),
                                        Schema.makeFilter((input) => [...input].length <= 100, {
                                          expected: 'a string of at most 100 characters',
                                        }),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 150, {
                                              expected: 'a string of at most 150 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      min_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      max_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(1),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      disabled: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      required: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      default_values: Schema.optional(
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
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === undefined || Array.isArray(input)
                                                        ? input
                                                        : [input],
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.Array(RoleSelectDefaultValueSchema).check(
                                                    Schema.isMaxLength(25),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      custom_id: Schema.String.check(
                                        Schema.makeFilter((input) => [...input].length >= 1, {
                                          expected: 'a string of at least 1 character',
                                        }),
                                        Schema.makeFilter((input) => [...input].length <= 100, {
                                          expected: 'a string of at most 100 characters',
                                        }),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 150, {
                                              expected: 'a string of at most 150 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      min_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      max_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(1),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      disabled: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      required: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      options: Schema.Unknown.pipe(
                                        Schema.decodeTo(
                                          Schema.Unknown,
                                          SchemaTransformation.transform<unknown, unknown>({
                                            decode: (input) =>
                                              input === undefined || Array.isArray(input)
                                                ? input
                                                : [input],
                                            encode: (output) => output,
                                          }),
                                        ),
                                        Schema.decodeTo(
                                          Schema.Array(
                                            Schema.Struct({
                                              label: Schema.String.check(
                                                Schema.makeFilter(
                                                  (input) => [...input].length >= 1,
                                                  { expected: 'a string of at least 1 character' },
                                                ),
                                                Schema.makeFilter(
                                                  (input) => [...input].length <= 100,
                                                  {
                                                    expected: 'a string of at most 100 characters',
                                                  },
                                                ),
                                              ),
                                              value: Schema.String.check(
                                                Schema.makeFilter(
                                                  (input) => [...input].length >= 1,
                                                  { expected: 'a string of at least 1 character' },
                                                ),
                                                Schema.makeFilter(
                                                  (input) => [...input].length <= 100,
                                                  {
                                                    expected: 'a string of at most 100 characters',
                                                  },
                                                ),
                                              ),
                                              description: Schema.optional(
                                                Schema.NullOr(
                                                  Schema.String.check(
                                                    Schema.makeFilter(
                                                      (input) => [...input].length <= 100,
                                                      {
                                                        expected:
                                                          'a string of at most 100 characters',
                                                      },
                                                    ),
                                                  ),
                                                ),
                                              ),
                                              default: Schema.optional(
                                                Schema.Unknown.pipe(
                                                  Schema.decodeTo(
                                                    Schema.Unknown,
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === 'null' ? null : input,
                                                      encode: (output) => output,
                                                    }),
                                                  ),
                                                  Schema.decodeTo(
                                                    Schema.NullOr(
                                                      Schema.String.check(
                                                        Schema.isPattern(
                                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                        ),
                                                      ).pipe(
                                                        Schema.decodeTo(
                                                          Schema.Boolean,
                                                          SchemaTransformation.transform({
                                                            decode: (input) =>
                                                              /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                input,
                                                              ),
                                                            encode: (output) =>
                                                              output ? 'true' : 'false',
                                                          }),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                              emoji: Schema.optional(
                                                Schema.Unknown.pipe(
                                                  Schema.decodeTo(
                                                    Schema.Unknown,
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === 'null' ? null : input,
                                                      encode: (output) => output,
                                                    }),
                                                  ),
                                                  Schema.decodeTo(
                                                    Schema.NullOr(
                                                      Schema.Union([
                                                        Schema.Unknown.pipe(
                                                          Schema.decodeTo(
                                                            Schema.Unknown,
                                                            SchemaTransformation.transform<
                                                              unknown,
                                                              unknown
                                                            >({
                                                              decode: (input) =>
                                                                input === 'null' ? null : input,
                                                              encode: (output) => output,
                                                            }),
                                                          ),
                                                          Schema.decodeTo(
                                                            Schema.NullOr(Schema.Null),
                                                          ),
                                                        ),
                                                        Schema.Struct({
                                                          id: Schema.optional(
                                                            Schema.Unknown.pipe(
                                                              Schema.decodeTo(
                                                                Schema.Unknown,
                                                                SchemaTransformation.transform<
                                                                  unknown,
                                                                  unknown
                                                                >({
                                                                  decode: (input) =>
                                                                    input === 'null' ? null : input,
                                                                  encode: (output) => output,
                                                                }),
                                                              ),
                                                              Schema.decodeTo(
                                                                Schema.NullOr(
                                                                  Schema.Union([
                                                                    Schema.Unknown.pipe(
                                                                      Schema.decodeTo(
                                                                        Schema.Unknown,
                                                                        SchemaTransformation.transform<
                                                                          unknown,
                                                                          unknown
                                                                        >({
                                                                          decode: (input) =>
                                                                            input === 'null'
                                                                              ? null
                                                                              : input,
                                                                          encode: (output) =>
                                                                            output,
                                                                        }),
                                                                      ),
                                                                      Schema.decodeTo(
                                                                        Schema.NullOr(Schema.Null),
                                                                      ),
                                                                    ),
                                                                    SnowflakeTypeSchema,
                                                                  ]),
                                                                ),
                                                              ),
                                                            ),
                                                          ),
                                                          name: Schema.String.check(
                                                            Schema.makeFilter(
                                                              (input) => [...input].length <= 32,
                                                              {
                                                                expected:
                                                                  'a string of at most 32 characters',
                                                              },
                                                            ),
                                                          ),
                                                        }),
                                                      ]),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            }),
                                          ).check(Schema.isMinLength(1), Schema.isMaxLength(25)),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      custom_id: Schema.String.check(
                                        Schema.makeFilter((input) => [...input].length >= 1, {
                                          expected: 'a string of at least 1 character',
                                        }),
                                        Schema.makeFilter((input) => [...input].length <= 100, {
                                          expected: 'a string of at most 100 characters',
                                        }),
                                      ),
                                      placeholder: Schema.optional(
                                        Schema.NullOr(
                                          Schema.String.check(
                                            Schema.makeFilter((input) => [...input].length <= 150, {
                                              expected: 'a string of at most 150 characters',
                                            }),
                                          ),
                                        ),
                                      ),
                                      min_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      max_values: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt(),
                                                Schema.isGreaterThanOrEqualTo(1),
                                                Schema.isLessThanOrEqualTo(25),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      disabled: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      required: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      default_values: Schema.optional(
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
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === undefined || Array.isArray(input)
                                                        ? input
                                                        : [input],
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.Array(UserSelectDefaultValueSchema).check(
                                                    Schema.isMaxLength(25),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                  ]),
                                ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
                              ),
                            ),
                          }),
                          Schema.Struct({
                            type: Schema.Union([
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(1)),
                              ).annotate({ description: 'Container for other components' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(2)),
                              ).annotate({ description: 'Button object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(3)),
                              ).annotate({
                                description: 'Select menu for picking from defined text options',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(4)),
                              ).annotate({ description: 'Text input object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(5)),
                              ).annotate({ description: 'Select menu for users' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(6)),
                              ).annotate({ description: 'Select menu for roles' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(7)),
                              ).annotate({
                                description: 'Select menu for mentionables (users and roles)',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(8)),
                              ).annotate({ description: 'Select menu for channels' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(9)),
                              ).annotate({ description: 'Section component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(10)),
                              ).annotate({ description: 'Text component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(11)),
                              ).annotate({ description: 'Thumbnail component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(12)),
                              ).annotate({ description: 'Media gallery component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(13)),
                              ).annotate({ description: 'File component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(14)),
                              ).annotate({ description: 'Separator component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(17)),
                              ).annotate({ description: 'Container component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(18)),
                              ).annotate({ description: 'Label component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(19)),
                              ).annotate({ description: 'File upload component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(21)),
                              ).annotate({ description: 'Radio group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(22)),
                              ).annotate({ description: 'Checkbox group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(23)),
                              ).annotate({ description: 'Checkbox component' }),
                            ]),
                            id: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt32(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            accent_color: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                      Schema.isLessThanOrEqualTo(16777215),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            components: Schema.Unknown.pipe(
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
                                  Schema.Union([
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      components: Schema.Unknown.pipe(
                                        Schema.decodeTo(
                                          Schema.Unknown,
                                          SchemaTransformation.transform<unknown, unknown>({
                                            decode: (input) =>
                                              input === undefined || Array.isArray(input)
                                                ? input
                                                : [input],
                                            encode: (output) => output,
                                          }),
                                        ),
                                        Schema.decodeTo(
                                          Schema.Array(
                                            Schema.Union([
                                              Schema.Struct({
                                                type: Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ).annotate({
                                                    description: 'Container for other components',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ).annotate({ description: 'Button object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(3)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(4)),
                                                  ).annotate({ description: 'Text input object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(5)),
                                                  ).annotate({
                                                    description: 'Select menu for users',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(6)),
                                                  ).annotate({
                                                    description: 'Select menu for roles',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(7)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(8)),
                                                  ).annotate({
                                                    description: 'Select menu for channels',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(9)),
                                                  ).annotate({ description: 'Section component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(10)),
                                                  ).annotate({ description: 'Text component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(11)),
                                                  ).annotate({
                                                    description: 'Thumbnail component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(12)),
                                                  ).annotate({
                                                    description: 'Media gallery component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(13)),
                                                  ).annotate({ description: 'File component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(14)),
                                                  ).annotate({
                                                    description: 'Separator component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(17)),
                                                  ).annotate({
                                                    description: 'Container component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(18)),
                                                  ).annotate({ description: 'Label component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(19)),
                                                  ).annotate({
                                                    description: 'File upload component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(21)),
                                                  ).annotate({
                                                    description: 'Radio group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(22)),
                                                  ).annotate({
                                                    description: 'Checkbox group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(23)),
                                                  ).annotate({ description: 'Checkbox component' }),
                                                ]),
                                                id: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt32(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                custom_id: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter(
                                                        (input) => [...input].length >= 1,
                                                        {
                                                          expected:
                                                            'a string of at least 1 character',
                                                        },
                                                      ),
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 100,
                                                        {
                                                          expected:
                                                            'a string of at most 100 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                style: Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(3)),
                                                  ),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(4)),
                                                  ),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(5)),
                                                  ),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(6)),
                                                  ),
                                                ]),
                                                label: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 80,
                                                        {
                                                          expected:
                                                            'a string of at most 80 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                disabled: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                url: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter((input) =>
                                                        URL.canParse(input),
                                                      ),
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 512,
                                                        {
                                                          expected:
                                                            'a string of at most 512 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                sku_id: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.Union([
                                                          Schema.Unknown.pipe(
                                                            Schema.decodeTo(
                                                              Schema.Unknown,
                                                              SchemaTransformation.transform<
                                                                unknown,
                                                                unknown
                                                              >({
                                                                decode: (input) =>
                                                                  input === 'null' ? null : input,
                                                                encode: (output) => output,
                                                              }),
                                                            ),
                                                            Schema.decodeTo(
                                                              Schema.NullOr(Schema.Null),
                                                            ),
                                                          ),
                                                          SnowflakeTypeSchema,
                                                        ]),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                emoji: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.Union([
                                                          Schema.Unknown.pipe(
                                                            Schema.decodeTo(
                                                              Schema.Unknown,
                                                              SchemaTransformation.transform<
                                                                unknown,
                                                                unknown
                                                              >({
                                                                decode: (input) =>
                                                                  input === 'null' ? null : input,
                                                                encode: (output) => output,
                                                              }),
                                                            ),
                                                            Schema.decodeTo(
                                                              Schema.NullOr(Schema.Null),
                                                            ),
                                                          ),
                                                          Schema.Struct({
                                                            id: Schema.optional(
                                                              Schema.Unknown.pipe(
                                                                Schema.decodeTo(
                                                                  Schema.Unknown,
                                                                  SchemaTransformation.transform<
                                                                    unknown,
                                                                    unknown
                                                                  >({
                                                                    decode: (input) =>
                                                                      input === 'null'
                                                                        ? null
                                                                        : input,
                                                                    encode: (output) => output,
                                                                  }),
                                                                ),
                                                                Schema.decodeTo(
                                                                  Schema.NullOr(
                                                                    Schema.Union([
                                                                      Schema.Unknown.pipe(
                                                                        Schema.decodeTo(
                                                                          Schema.Unknown,
                                                                          SchemaTransformation.transform<
                                                                            unknown,
                                                                            unknown
                                                                          >({
                                                                            decode: (input) =>
                                                                              input === 'null'
                                                                                ? null
                                                                                : input,
                                                                            encode: (output) =>
                                                                              output,
                                                                          }),
                                                                        ),
                                                                        Schema.decodeTo(
                                                                          Schema.NullOr(
                                                                            Schema.Null,
                                                                          ),
                                                                        ),
                                                                      ),
                                                                      SnowflakeTypeSchema,
                                                                    ]),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                            name: Schema.String.check(
                                                              Schema.makeFilter(
                                                                (input) => [...input].length <= 32,
                                                                {
                                                                  expected:
                                                                    'a string of at most 32 characters',
                                                                },
                                                              ),
                                                            ),
                                                          }),
                                                        ]),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              }),
                                              Schema.Struct({
                                                type: Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ).annotate({
                                                    description: 'Container for other components',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ).annotate({ description: 'Button object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(3)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(4)),
                                                  ).annotate({ description: 'Text input object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(5)),
                                                  ).annotate({
                                                    description: 'Select menu for users',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(6)),
                                                  ).annotate({
                                                    description: 'Select menu for roles',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(7)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(8)),
                                                  ).annotate({
                                                    description: 'Select menu for channels',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(9)),
                                                  ).annotate({ description: 'Section component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(10)),
                                                  ).annotate({ description: 'Text component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(11)),
                                                  ).annotate({
                                                    description: 'Thumbnail component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(12)),
                                                  ).annotate({
                                                    description: 'Media gallery component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(13)),
                                                  ).annotate({ description: 'File component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(14)),
                                                  ).annotate({
                                                    description: 'Separator component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(17)),
                                                  ).annotate({
                                                    description: 'Container component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(18)),
                                                  ).annotate({ description: 'Label component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(19)),
                                                  ).annotate({
                                                    description: 'File upload component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(21)),
                                                  ).annotate({
                                                    description: 'Radio group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(22)),
                                                  ).annotate({
                                                    description: 'Checkbox group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(23)),
                                                  ).annotate({ description: 'Checkbox component' }),
                                                ]),
                                                id: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt32(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                custom_id: Schema.String.check(
                                                  Schema.makeFilter(
                                                    (input) => [...input].length >= 1,
                                                    {
                                                      expected: 'a string of at least 1 character',
                                                    },
                                                  ),
                                                  Schema.makeFilter(
                                                    (input) => [...input].length <= 100,
                                                    {
                                                      expected:
                                                        'a string of at most 100 characters',
                                                    },
                                                  ),
                                                ),
                                                placeholder: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 150,
                                                        {
                                                          expected:
                                                            'a string of at most 150 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                min_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                max_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(1),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                disabled: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                required: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                default_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.Unknown.pipe(
                                                          Schema.decodeTo(
                                                            Schema.Unknown,
                                                            SchemaTransformation.transform<
                                                              unknown,
                                                              unknown
                                                            >({
                                                              decode: (input) =>
                                                                input === undefined ||
                                                                Array.isArray(input)
                                                                  ? input
                                                                  : [input],
                                                              encode: (output) => output,
                                                            }),
                                                          ),
                                                          Schema.decodeTo(
                                                            Schema.Array(
                                                              ChannelSelectDefaultValueSchema,
                                                            ).check(Schema.isMaxLength(25)),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                channel_types: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.Unknown.pipe(
                                                          Schema.decodeTo(
                                                            Schema.Unknown,
                                                            SchemaTransformation.transform<
                                                              unknown,
                                                              unknown
                                                            >({
                                                              decode: (input) =>
                                                                input === undefined ||
                                                                Array.isArray(input)
                                                                  ? input
                                                                  : [input],
                                                              encode: (output) => output,
                                                            }),
                                                          ),
                                                          Schema.decodeTo(
                                                            Schema.Array(
                                                              Schema.Union([
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(1),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A direct message between users',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(3),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A direct message between multiple users',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(0),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A text channel within a server',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(2),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A voice channel within a server',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(4),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'An organizational category that contains up to 50 channels',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(5),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(10),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(11),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(12),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(13),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'A voice channel for hosting events with an audience',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(14),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'The channel in a hub containing the listed servers',
                                                                }),
                                                                Schema.FiniteFromString.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Literal(15),
                                                                  ),
                                                                ).annotate({
                                                                  description:
                                                                    'Channel that can only contain threads',
                                                                }),
                                                              ]),
                                                            ).check(Schema.isUnique()),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              }),
                                              Schema.Struct({
                                                type: Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ).annotate({
                                                    description: 'Container for other components',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ).annotate({ description: 'Button object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(3)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(4)),
                                                  ).annotate({ description: 'Text input object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(5)),
                                                  ).annotate({
                                                    description: 'Select menu for users',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(6)),
                                                  ).annotate({
                                                    description: 'Select menu for roles',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(7)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(8)),
                                                  ).annotate({
                                                    description: 'Select menu for channels',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(9)),
                                                  ).annotate({ description: 'Section component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(10)),
                                                  ).annotate({ description: 'Text component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(11)),
                                                  ).annotate({
                                                    description: 'Thumbnail component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(12)),
                                                  ).annotate({
                                                    description: 'Media gallery component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(13)),
                                                  ).annotate({ description: 'File component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(14)),
                                                  ).annotate({
                                                    description: 'Separator component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(17)),
                                                  ).annotate({
                                                    description: 'Container component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(18)),
                                                  ).annotate({ description: 'Label component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(19)),
                                                  ).annotate({
                                                    description: 'File upload component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(21)),
                                                  ).annotate({
                                                    description: 'Radio group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(22)),
                                                  ).annotate({
                                                    description: 'Checkbox group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(23)),
                                                  ).annotate({ description: 'Checkbox component' }),
                                                ]),
                                                id: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt32(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                custom_id: Schema.String.check(
                                                  Schema.makeFilter(
                                                    (input) => [...input].length >= 1,
                                                    {
                                                      expected: 'a string of at least 1 character',
                                                    },
                                                  ),
                                                  Schema.makeFilter(
                                                    (input) => [...input].length <= 100,
                                                    {
                                                      expected:
                                                        'a string of at most 100 characters',
                                                    },
                                                  ),
                                                ),
                                                placeholder: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 150,
                                                        {
                                                          expected:
                                                            'a string of at most 150 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                min_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                max_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(1),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                disabled: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                required: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                default_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.Unknown.pipe(
                                                          Schema.decodeTo(
                                                            Schema.Unknown,
                                                            SchemaTransformation.transform<
                                                              unknown,
                                                              unknown
                                                            >({
                                                              decode: (input) =>
                                                                input === undefined ||
                                                                Array.isArray(input)
                                                                  ? input
                                                                  : [input],
                                                              encode: (output) => output,
                                                            }),
                                                          ),
                                                          Schema.decodeTo(
                                                            Schema.Array(
                                                              Schema.Union([
                                                                RoleSelectDefaultValueSchema,
                                                                UserSelectDefaultValueSchema,
                                                              ]),
                                                            ).check(Schema.isMaxLength(25)),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              }),
                                              Schema.Struct({
                                                type: Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ).annotate({
                                                    description: 'Container for other components',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ).annotate({ description: 'Button object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(3)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(4)),
                                                  ).annotate({ description: 'Text input object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(5)),
                                                  ).annotate({
                                                    description: 'Select menu for users',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(6)),
                                                  ).annotate({
                                                    description: 'Select menu for roles',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(7)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(8)),
                                                  ).annotate({
                                                    description: 'Select menu for channels',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(9)),
                                                  ).annotate({ description: 'Section component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(10)),
                                                  ).annotate({ description: 'Text component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(11)),
                                                  ).annotate({
                                                    description: 'Thumbnail component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(12)),
                                                  ).annotate({
                                                    description: 'Media gallery component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(13)),
                                                  ).annotate({ description: 'File component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(14)),
                                                  ).annotate({
                                                    description: 'Separator component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(17)),
                                                  ).annotate({
                                                    description: 'Container component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(18)),
                                                  ).annotate({ description: 'Label component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(19)),
                                                  ).annotate({
                                                    description: 'File upload component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(21)),
                                                  ).annotate({
                                                    description: 'Radio group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(22)),
                                                  ).annotate({
                                                    description: 'Checkbox group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(23)),
                                                  ).annotate({ description: 'Checkbox component' }),
                                                ]),
                                                id: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt32(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                custom_id: Schema.String.check(
                                                  Schema.makeFilter(
                                                    (input) => [...input].length >= 1,
                                                    {
                                                      expected: 'a string of at least 1 character',
                                                    },
                                                  ),
                                                  Schema.makeFilter(
                                                    (input) => [...input].length <= 100,
                                                    {
                                                      expected:
                                                        'a string of at most 100 characters',
                                                    },
                                                  ),
                                                ),
                                                placeholder: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 150,
                                                        {
                                                          expected:
                                                            'a string of at most 150 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                min_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                max_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(1),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                disabled: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                required: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                default_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.Unknown.pipe(
                                                          Schema.decodeTo(
                                                            Schema.Unknown,
                                                            SchemaTransformation.transform<
                                                              unknown,
                                                              unknown
                                                            >({
                                                              decode: (input) =>
                                                                input === undefined ||
                                                                Array.isArray(input)
                                                                  ? input
                                                                  : [input],
                                                              encode: (output) => output,
                                                            }),
                                                          ),
                                                          Schema.decodeTo(
                                                            Schema.Array(
                                                              RoleSelectDefaultValueSchema,
                                                            ).check(Schema.isMaxLength(25)),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              }),
                                              Schema.Struct({
                                                type: Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ).annotate({
                                                    description: 'Container for other components',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ).annotate({ description: 'Button object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(3)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(4)),
                                                  ).annotate({ description: 'Text input object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(5)),
                                                  ).annotate({
                                                    description: 'Select menu for users',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(6)),
                                                  ).annotate({
                                                    description: 'Select menu for roles',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(7)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(8)),
                                                  ).annotate({
                                                    description: 'Select menu for channels',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(9)),
                                                  ).annotate({ description: 'Section component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(10)),
                                                  ).annotate({ description: 'Text component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(11)),
                                                  ).annotate({
                                                    description: 'Thumbnail component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(12)),
                                                  ).annotate({
                                                    description: 'Media gallery component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(13)),
                                                  ).annotate({ description: 'File component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(14)),
                                                  ).annotate({
                                                    description: 'Separator component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(17)),
                                                  ).annotate({
                                                    description: 'Container component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(18)),
                                                  ).annotate({ description: 'Label component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(19)),
                                                  ).annotate({
                                                    description: 'File upload component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(21)),
                                                  ).annotate({
                                                    description: 'Radio group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(22)),
                                                  ).annotate({
                                                    description: 'Checkbox group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(23)),
                                                  ).annotate({ description: 'Checkbox component' }),
                                                ]),
                                                id: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt32(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                custom_id: Schema.String.check(
                                                  Schema.makeFilter(
                                                    (input) => [...input].length >= 1,
                                                    {
                                                      expected: 'a string of at least 1 character',
                                                    },
                                                  ),
                                                  Schema.makeFilter(
                                                    (input) => [...input].length <= 100,
                                                    {
                                                      expected:
                                                        'a string of at most 100 characters',
                                                    },
                                                  ),
                                                ),
                                                placeholder: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 150,
                                                        {
                                                          expected:
                                                            'a string of at most 150 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                min_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                max_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(1),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                disabled: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                required: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                options: Schema.Unknown.pipe(
                                                  Schema.decodeTo(
                                                    Schema.Unknown,
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === undefined || Array.isArray(input)
                                                          ? input
                                                          : [input],
                                                      encode: (output) => output,
                                                    }),
                                                  ),
                                                  Schema.decodeTo(
                                                    Schema.Array(
                                                      Schema.Struct({
                                                        label: Schema.String.check(
                                                          Schema.makeFilter(
                                                            (input) => [...input].length >= 1,
                                                            {
                                                              expected:
                                                                'a string of at least 1 character',
                                                            },
                                                          ),
                                                          Schema.makeFilter(
                                                            (input) => [...input].length <= 100,
                                                            {
                                                              expected:
                                                                'a string of at most 100 characters',
                                                            },
                                                          ),
                                                        ),
                                                        value: Schema.String.check(
                                                          Schema.makeFilter(
                                                            (input) => [...input].length >= 1,
                                                            {
                                                              expected:
                                                                'a string of at least 1 character',
                                                            },
                                                          ),
                                                          Schema.makeFilter(
                                                            (input) => [...input].length <= 100,
                                                            {
                                                              expected:
                                                                'a string of at most 100 characters',
                                                            },
                                                          ),
                                                        ),
                                                        description: Schema.optional(
                                                          Schema.NullOr(
                                                            Schema.String.check(
                                                              Schema.makeFilter(
                                                                (input) => [...input].length <= 100,
                                                                {
                                                                  expected:
                                                                    'a string of at most 100 characters',
                                                                },
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                        default: Schema.optional(
                                                          Schema.Unknown.pipe(
                                                            Schema.decodeTo(
                                                              Schema.Unknown,
                                                              SchemaTransformation.transform<
                                                                unknown,
                                                                unknown
                                                              >({
                                                                decode: (input) =>
                                                                  input === 'null' ? null : input,
                                                                encode: (output) => output,
                                                              }),
                                                            ),
                                                            Schema.decodeTo(
                                                              Schema.NullOr(
                                                                Schema.String.check(
                                                                  Schema.isPattern(
                                                                    /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                                  ),
                                                                ).pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Boolean,
                                                                    SchemaTransformation.transform({
                                                                      decode: (input) =>
                                                                        /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                          input,
                                                                        ),
                                                                      encode: (output) =>
                                                                        output ? 'true' : 'false',
                                                                    }),
                                                                  ),
                                                                ),
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                        emoji: Schema.optional(
                                                          Schema.Unknown.pipe(
                                                            Schema.decodeTo(
                                                              Schema.Unknown,
                                                              SchemaTransformation.transform<
                                                                unknown,
                                                                unknown
                                                              >({
                                                                decode: (input) =>
                                                                  input === 'null' ? null : input,
                                                                encode: (output) => output,
                                                              }),
                                                            ),
                                                            Schema.decodeTo(
                                                              Schema.NullOr(
                                                                Schema.Union([
                                                                  Schema.Unknown.pipe(
                                                                    Schema.decodeTo(
                                                                      Schema.Unknown,
                                                                      SchemaTransformation.transform<
                                                                        unknown,
                                                                        unknown
                                                                      >({
                                                                        decode: (input) =>
                                                                          input === 'null'
                                                                            ? null
                                                                            : input,
                                                                        encode: (output) => output,
                                                                      }),
                                                                    ),
                                                                    Schema.decodeTo(
                                                                      Schema.NullOr(Schema.Null),
                                                                    ),
                                                                  ),
                                                                  Schema.Struct({
                                                                    id: Schema.optional(
                                                                      Schema.Unknown.pipe(
                                                                        Schema.decodeTo(
                                                                          Schema.Unknown,
                                                                          SchemaTransformation.transform<
                                                                            unknown,
                                                                            unknown
                                                                          >({
                                                                            decode: (input) =>
                                                                              input === 'null'
                                                                                ? null
                                                                                : input,
                                                                            encode: (output) =>
                                                                              output,
                                                                          }),
                                                                        ),
                                                                        Schema.decodeTo(
                                                                          Schema.NullOr(
                                                                            Schema.Union([
                                                                              Schema.Unknown.pipe(
                                                                                Schema.decodeTo(
                                                                                  Schema.Unknown,
                                                                                  SchemaTransformation.transform<
                                                                                    unknown,
                                                                                    unknown
                                                                                  >({
                                                                                    decode: (
                                                                                      input,
                                                                                    ) =>
                                                                                      input ===
                                                                                      'null'
                                                                                        ? null
                                                                                        : input,
                                                                                    encode: (
                                                                                      output,
                                                                                    ) => output,
                                                                                  }),
                                                                                ),
                                                                                Schema.decodeTo(
                                                                                  Schema.NullOr(
                                                                                    Schema.Null,
                                                                                  ),
                                                                                ),
                                                                              ),
                                                                              SnowflakeTypeSchema,
                                                                            ]),
                                                                          ),
                                                                        ),
                                                                      ),
                                                                    ),
                                                                    name: Schema.String.check(
                                                                      Schema.makeFilter(
                                                                        (input) =>
                                                                          [...input].length <= 32,
                                                                        {
                                                                          expected:
                                                                            'a string of at most 32 characters',
                                                                        },
                                                                      ),
                                                                    ),
                                                                  }),
                                                                ]),
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      }),
                                                    ).check(
                                                      Schema.isMinLength(1),
                                                      Schema.isMaxLength(25),
                                                    ),
                                                  ),
                                                ),
                                              }),
                                              Schema.Struct({
                                                type: Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ).annotate({
                                                    description: 'Container for other components',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ).annotate({ description: 'Button object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(3)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(4)),
                                                  ).annotate({ description: 'Text input object' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(5)),
                                                  ).annotate({
                                                    description: 'Select menu for users',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(6)),
                                                  ).annotate({
                                                    description: 'Select menu for roles',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(7)),
                                                  ).annotate({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(8)),
                                                  ).annotate({
                                                    description: 'Select menu for channels',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(9)),
                                                  ).annotate({ description: 'Section component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(10)),
                                                  ).annotate({ description: 'Text component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(11)),
                                                  ).annotate({
                                                    description: 'Thumbnail component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(12)),
                                                  ).annotate({
                                                    description: 'Media gallery component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(13)),
                                                  ).annotate({ description: 'File component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(14)),
                                                  ).annotate({
                                                    description: 'Separator component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(17)),
                                                  ).annotate({
                                                    description: 'Container component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(18)),
                                                  ).annotate({ description: 'Label component' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(19)),
                                                  ).annotate({
                                                    description: 'File upload component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(21)),
                                                  ).annotate({
                                                    description: 'Radio group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(22)),
                                                  ).annotate({
                                                    description: 'Checkbox group component',
                                                  }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(23)),
                                                  ).annotate({ description: 'Checkbox component' }),
                                                ]),
                                                id: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt32(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                custom_id: Schema.String.check(
                                                  Schema.makeFilter(
                                                    (input) => [...input].length >= 1,
                                                    {
                                                      expected: 'a string of at least 1 character',
                                                    },
                                                  ),
                                                  Schema.makeFilter(
                                                    (input) => [...input].length <= 100,
                                                    {
                                                      expected:
                                                        'a string of at most 100 characters',
                                                    },
                                                  ),
                                                ),
                                                placeholder: Schema.optional(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.makeFilter(
                                                        (input) => [...input].length <= 150,
                                                        {
                                                          expected:
                                                            'a string of at most 150 characters',
                                                        },
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                min_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(0),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                max_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.FiniteFromString.check(
                                                          Schema.isInt(),
                                                          Schema.isGreaterThanOrEqualTo(1),
                                                          Schema.isLessThanOrEqualTo(25),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                disabled: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                required: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.String.check(
                                                          Schema.isPattern(
                                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                          ),
                                                        ).pipe(
                                                          Schema.decodeTo(
                                                            Schema.Boolean,
                                                            SchemaTransformation.transform({
                                                              decode: (input) =>
                                                                /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                  input,
                                                                ),
                                                              encode: (output) =>
                                                                output ? 'true' : 'false',
                                                            }),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                default_values: Schema.optional(
                                                  Schema.Unknown.pipe(
                                                    Schema.decodeTo(
                                                      Schema.Unknown,
                                                      SchemaTransformation.transform<
                                                        unknown,
                                                        unknown
                                                      >({
                                                        decode: (input) =>
                                                          input === 'null' ? null : input,
                                                        encode: (output) => output,
                                                      }),
                                                    ),
                                                    Schema.decodeTo(
                                                      Schema.NullOr(
                                                        Schema.Unknown.pipe(
                                                          Schema.decodeTo(
                                                            Schema.Unknown,
                                                            SchemaTransformation.transform<
                                                              unknown,
                                                              unknown
                                                            >({
                                                              decode: (input) =>
                                                                input === undefined ||
                                                                Array.isArray(input)
                                                                  ? input
                                                                  : [input],
                                                              encode: (output) => output,
                                                            }),
                                                          ),
                                                          Schema.decodeTo(
                                                            Schema.Array(
                                                              UserSelectDefaultValueSchema,
                                                            ).check(Schema.isMaxLength(25)),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              }),
                                            ]),
                                          ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      spoiler: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      items: Schema.Unknown.pipe(
                                        Schema.decodeTo(
                                          Schema.Unknown,
                                          SchemaTransformation.transform<unknown, unknown>({
                                            decode: (input) =>
                                              input === undefined || Array.isArray(input)
                                                ? input
                                                : [input],
                                            encode: (output) => output,
                                          }),
                                        ),
                                        Schema.decodeTo(
                                          Schema.Array(
                                            Schema.Struct({
                                              description: Schema.optional(
                                                Schema.NullOr(
                                                  Schema.String.check(
                                                    Schema.makeFilter(
                                                      (input) => [...input].length >= 1,
                                                      {
                                                        expected:
                                                          'a string of at least 1 character',
                                                      },
                                                    ),
                                                    Schema.makeFilter(
                                                      (input) => [...input].length <= 1024,
                                                      {
                                                        expected:
                                                          'a string of at most 1024 characters',
                                                      },
                                                    ),
                                                  ),
                                                ),
                                              ),
                                              spoiler: Schema.optional(
                                                Schema.Unknown.pipe(
                                                  Schema.decodeTo(
                                                    Schema.Unknown,
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === 'null' ? null : input,
                                                      encode: (output) => output,
                                                    }),
                                                  ),
                                                  Schema.decodeTo(
                                                    Schema.NullOr(
                                                      Schema.String.check(
                                                        Schema.isPattern(
                                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                        ),
                                                      ).pipe(
                                                        Schema.decodeTo(
                                                          Schema.Boolean,
                                                          SchemaTransformation.transform({
                                                            decode: (input) =>
                                                              /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                input,
                                                              ),
                                                            encode: (output) =>
                                                              output ? 'true' : 'false',
                                                          }),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                              media: UnfurledMediaRequestSchema,
                                            }),
                                          ).check(Schema.isMinLength(1), Schema.isMaxLength(10)),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      components: Schema.Unknown.pipe(
                                        Schema.decodeTo(
                                          Schema.Unknown,
                                          SchemaTransformation.transform<unknown, unknown>({
                                            decode: (input) =>
                                              input === undefined || Array.isArray(input)
                                                ? input
                                                : [input],
                                            encode: (output) => output,
                                          }),
                                        ),
                                        Schema.decodeTo(
                                          Schema.Array(
                                            Schema.Struct({
                                              type: Schema.Union([
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(1)),
                                                ).annotate({
                                                  description: 'Container for other components',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(2)),
                                                ).annotate({ description: 'Button object' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(3)),
                                                ).annotate({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(4)),
                                                ).annotate({ description: 'Text input object' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(5)),
                                                ).annotate({
                                                  description: 'Select menu for users',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(6)),
                                                ).annotate({
                                                  description: 'Select menu for roles',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(7)),
                                                ).annotate({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(8)),
                                                ).annotate({
                                                  description: 'Select menu for channels',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(9)),
                                                ).annotate({ description: 'Section component' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(10)),
                                                ).annotate({ description: 'Text component' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(11)),
                                                ).annotate({ description: 'Thumbnail component' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(12)),
                                                ).annotate({
                                                  description: 'Media gallery component',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(13)),
                                                ).annotate({ description: 'File component' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(14)),
                                                ).annotate({ description: 'Separator component' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(17)),
                                                ).annotate({ description: 'Container component' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(18)),
                                                ).annotate({ description: 'Label component' }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(19)),
                                                ).annotate({
                                                  description: 'File upload component',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(21)),
                                                ).annotate({
                                                  description: 'Radio group component',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(22)),
                                                ).annotate({
                                                  description: 'Checkbox group component',
                                                }),
                                                Schema.FiniteFromString.pipe(
                                                  Schema.decodeTo(Schema.Literal(23)),
                                                ).annotate({ description: 'Checkbox component' }),
                                              ]),
                                              id: Schema.optional(
                                                Schema.Unknown.pipe(
                                                  Schema.decodeTo(
                                                    Schema.Unknown,
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === 'null' ? null : input,
                                                      encode: (output) => output,
                                                    }),
                                                  ),
                                                  Schema.decodeTo(
                                                    Schema.NullOr(
                                                      Schema.FiniteFromString.check(
                                                        Schema.isInt32(),
                                                        Schema.isGreaterThanOrEqualTo(0),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                              content: Schema.String.check(
                                                Schema.makeFilter(
                                                  (input) => [...input].length >= 1,
                                                  { expected: 'a string of at least 1 character' },
                                                ),
                                                Schema.makeFilter(
                                                  (input) => [...input].length <= 4000,
                                                  {
                                                    expected: 'a string of at most 4000 characters',
                                                  },
                                                ),
                                              ),
                                            }),
                                          ).check(Schema.isMinLength(1), Schema.isMaxLength(3)),
                                        ),
                                      ),
                                      accessory: Schema.Union([
                                        Schema.Struct({
                                          type: Schema.Union([
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(1)),
                                            ).annotate({
                                              description: 'Container for other components',
                                            }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(2)),
                                            ).annotate({ description: 'Button object' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(3)),
                                            ).annotate({
                                              description:
                                                'Select menu for picking from defined text options',
                                            }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(4)),
                                            ).annotate({ description: 'Text input object' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(5)),
                                            ).annotate({ description: 'Select menu for users' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(6)),
                                            ).annotate({ description: 'Select menu for roles' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(7)),
                                            ).annotate({
                                              description:
                                                'Select menu for mentionables (users and roles)',
                                            }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(8)),
                                            ).annotate({ description: 'Select menu for channels' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(9)),
                                            ).annotate({ description: 'Section component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(10)),
                                            ).annotate({ description: 'Text component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(11)),
                                            ).annotate({ description: 'Thumbnail component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(12)),
                                            ).annotate({ description: 'Media gallery component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(13)),
                                            ).annotate({ description: 'File component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(14)),
                                            ).annotate({ description: 'Separator component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(17)),
                                            ).annotate({ description: 'Container component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(18)),
                                            ).annotate({ description: 'Label component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(19)),
                                            ).annotate({ description: 'File upload component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(21)),
                                            ).annotate({ description: 'Radio group component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(22)),
                                            ).annotate({ description: 'Checkbox group component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(23)),
                                            ).annotate({ description: 'Checkbox component' }),
                                          ]),
                                          id: Schema.optional(
                                            Schema.Unknown.pipe(
                                              Schema.decodeTo(
                                                Schema.Unknown,
                                                SchemaTransformation.transform<unknown, unknown>({
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(
                                                Schema.NullOr(
                                                  Schema.FiniteFromString.check(
                                                    Schema.isInt32(),
                                                    Schema.isGreaterThanOrEqualTo(0),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                          custom_id: Schema.optional(
                                            Schema.NullOr(
                                              Schema.String.check(
                                                Schema.makeFilter(
                                                  (input) => [...input].length >= 1,
                                                  { expected: 'a string of at least 1 character' },
                                                ),
                                                Schema.makeFilter(
                                                  (input) => [...input].length <= 100,
                                                  {
                                                    expected: 'a string of at most 100 characters',
                                                  },
                                                ),
                                              ),
                                            ),
                                          ),
                                          style: Schema.Union([
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(1)),
                                            ),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(2)),
                                            ),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(3)),
                                            ),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(4)),
                                            ),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(5)),
                                            ),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(6)),
                                            ),
                                          ]),
                                          label: Schema.optional(
                                            Schema.NullOr(
                                              Schema.String.check(
                                                Schema.makeFilter(
                                                  (input) => [...input].length <= 80,
                                                  { expected: 'a string of at most 80 characters' },
                                                ),
                                              ),
                                            ),
                                          ),
                                          disabled: Schema.optional(
                                            Schema.Unknown.pipe(
                                              Schema.decodeTo(
                                                Schema.Unknown,
                                                SchemaTransformation.transform<unknown, unknown>({
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(
                                                Schema.NullOr(
                                                  Schema.String.check(
                                                    Schema.isPattern(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ),
                                                  ).pipe(
                                                    Schema.decodeTo(
                                                      Schema.Boolean,
                                                      SchemaTransformation.transform({
                                                        decode: (input) =>
                                                          /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                            input,
                                                          ),
                                                        encode: (output) =>
                                                          output ? 'true' : 'false',
                                                      }),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                          url: Schema.optional(
                                            Schema.NullOr(
                                              Schema.String.check(
                                                Schema.makeFilter((input) => URL.canParse(input)),
                                                Schema.makeFilter(
                                                  (input) => [...input].length <= 512,
                                                  {
                                                    expected: 'a string of at most 512 characters',
                                                  },
                                                ),
                                              ),
                                            ),
                                          ),
                                          sku_id: Schema.optional(
                                            Schema.Unknown.pipe(
                                              Schema.decodeTo(
                                                Schema.Unknown,
                                                SchemaTransformation.transform<unknown, unknown>({
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(
                                                Schema.NullOr(
                                                  Schema.Union([
                                                    Schema.Unknown.pipe(
                                                      Schema.decodeTo(
                                                        Schema.Unknown,
                                                        SchemaTransformation.transform<
                                                          unknown,
                                                          unknown
                                                        >({
                                                          decode: (input) =>
                                                            input === 'null' ? null : input,
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
                                          ),
                                          emoji: Schema.optional(
                                            Schema.Unknown.pipe(
                                              Schema.decodeTo(
                                                Schema.Unknown,
                                                SchemaTransformation.transform<unknown, unknown>({
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(
                                                Schema.NullOr(
                                                  Schema.Union([
                                                    Schema.Unknown.pipe(
                                                      Schema.decodeTo(
                                                        Schema.Unknown,
                                                        SchemaTransformation.transform<
                                                          unknown,
                                                          unknown
                                                        >({
                                                          decode: (input) =>
                                                            input === 'null' ? null : input,
                                                          encode: (output) => output,
                                                        }),
                                                      ),
                                                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                                    ),
                                                    Schema.Struct({
                                                      id: Schema.optional(
                                                        Schema.Unknown.pipe(
                                                          Schema.decodeTo(
                                                            Schema.Unknown,
                                                            SchemaTransformation.transform<
                                                              unknown,
                                                              unknown
                                                            >({
                                                              decode: (input) =>
                                                                input === 'null' ? null : input,
                                                              encode: (output) => output,
                                                            }),
                                                          ),
                                                          Schema.decodeTo(
                                                            Schema.NullOr(
                                                              Schema.Union([
                                                                Schema.Unknown.pipe(
                                                                  Schema.decodeTo(
                                                                    Schema.Unknown,
                                                                    SchemaTransformation.transform<
                                                                      unknown,
                                                                      unknown
                                                                    >({
                                                                      decode: (input) =>
                                                                        input === 'null'
                                                                          ? null
                                                                          : input,
                                                                      encode: (output) => output,
                                                                    }),
                                                                  ),
                                                                  Schema.decodeTo(
                                                                    Schema.NullOr(Schema.Null),
                                                                  ),
                                                                ),
                                                                SnowflakeTypeSchema,
                                                              ]),
                                                            ),
                                                          ),
                                                        ),
                                                      ),
                                                      name: Schema.String.check(
                                                        Schema.makeFilter(
                                                          (input) => [...input].length <= 32,
                                                          {
                                                            expected:
                                                              'a string of at most 32 characters',
                                                          },
                                                        ),
                                                      ),
                                                    }),
                                                  ]),
                                                ),
                                              ),
                                            ),
                                          ),
                                        }),
                                        Schema.Struct({
                                          type: Schema.Union([
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(1)),
                                            ).annotate({
                                              description: 'Container for other components',
                                            }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(2)),
                                            ).annotate({ description: 'Button object' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(3)),
                                            ).annotate({
                                              description:
                                                'Select menu for picking from defined text options',
                                            }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(4)),
                                            ).annotate({ description: 'Text input object' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(5)),
                                            ).annotate({ description: 'Select menu for users' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(6)),
                                            ).annotate({ description: 'Select menu for roles' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(7)),
                                            ).annotate({
                                              description:
                                                'Select menu for mentionables (users and roles)',
                                            }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(8)),
                                            ).annotate({ description: 'Select menu for channels' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(9)),
                                            ).annotate({ description: 'Section component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(10)),
                                            ).annotate({ description: 'Text component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(11)),
                                            ).annotate({ description: 'Thumbnail component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(12)),
                                            ).annotate({ description: 'Media gallery component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(13)),
                                            ).annotate({ description: 'File component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(14)),
                                            ).annotate({ description: 'Separator component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(17)),
                                            ).annotate({ description: 'Container component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(18)),
                                            ).annotate({ description: 'Label component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(19)),
                                            ).annotate({ description: 'File upload component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(21)),
                                            ).annotate({ description: 'Radio group component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(22)),
                                            ).annotate({ description: 'Checkbox group component' }),
                                            Schema.FiniteFromString.pipe(
                                              Schema.decodeTo(Schema.Literal(23)),
                                            ).annotate({ description: 'Checkbox component' }),
                                          ]),
                                          id: Schema.optional(
                                            Schema.Unknown.pipe(
                                              Schema.decodeTo(
                                                Schema.Unknown,
                                                SchemaTransformation.transform<unknown, unknown>({
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(
                                                Schema.NullOr(
                                                  Schema.FiniteFromString.check(
                                                    Schema.isInt32(),
                                                    Schema.isGreaterThanOrEqualTo(0),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                          description: Schema.optional(
                                            Schema.NullOr(
                                              Schema.String.check(
                                                Schema.makeFilter(
                                                  (input) => [...input].length >= 1,
                                                  { expected: 'a string of at least 1 character' },
                                                ),
                                                Schema.makeFilter(
                                                  (input) => [...input].length <= 1024,
                                                  {
                                                    expected: 'a string of at most 1024 characters',
                                                  },
                                                ),
                                              ),
                                            ),
                                          ),
                                          spoiler: Schema.optional(
                                            Schema.Unknown.pipe(
                                              Schema.decodeTo(
                                                Schema.Unknown,
                                                SchemaTransformation.transform<unknown, unknown>({
                                                  decode: (input) =>
                                                    input === 'null' ? null : input,
                                                  encode: (output) => output,
                                                }),
                                              ),
                                              Schema.decodeTo(
                                                Schema.NullOr(
                                                  Schema.String.check(
                                                    Schema.isPattern(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ),
                                                  ).pipe(
                                                    Schema.decodeTo(
                                                      Schema.Boolean,
                                                      SchemaTransformation.transform({
                                                        decode: (input) =>
                                                          /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                            input,
                                                          ),
                                                        encode: (output) =>
                                                          output ? 'true' : 'false',
                                                      }),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      ]),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      spacing: Schema.optional(
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
                                                    SchemaTransformation.transform<
                                                      unknown,
                                                      unknown
                                                    >({
                                                      decode: (input) =>
                                                        input === 'null' ? null : input,
                                                      encode: (output) => output,
                                                    }),
                                                  ),
                                                  Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                                ),
                                                Schema.Union([
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(1)),
                                                  ).annotate({ description: 'Small spacing' }),
                                                  Schema.FiniteFromString.pipe(
                                                    Schema.decodeTo(Schema.Literal(2)),
                                                  ).annotate({ description: 'Large spacing' }),
                                                ]),
                                              ]),
                                            ),
                                          ),
                                        ),
                                      ),
                                      divider: Schema.optional(
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
                                              Schema.String.check(
                                                Schema.isPattern(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ),
                                              ).pipe(
                                                Schema.decodeTo(
                                                  Schema.Boolean,
                                                  SchemaTransformation.transform({
                                                    decode: (input) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                    encode: (output) => (output ? 'true' : 'false'),
                                                  }),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    }),
                                    Schema.Struct({
                                      type: Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({
                                          description: 'Container for other components',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Button object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(3)),
                                        ).annotate({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(4)),
                                        ).annotate({ description: 'Text input object' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(5)),
                                        ).annotate({ description: 'Select menu for users' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(6)),
                                        ).annotate({ description: 'Select menu for roles' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(7)),
                                        ).annotate({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(8)),
                                        ).annotate({ description: 'Select menu for channels' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(9)),
                                        ).annotate({ description: 'Section component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(10)),
                                        ).annotate({ description: 'Text component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(11)),
                                        ).annotate({ description: 'Thumbnail component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(12)),
                                        ).annotate({ description: 'Media gallery component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(13)),
                                        ).annotate({ description: 'File component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(14)),
                                        ).annotate({ description: 'Separator component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(17)),
                                        ).annotate({ description: 'Container component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(18)),
                                        ).annotate({ description: 'Label component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(19)),
                                        ).annotate({ description: 'File upload component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(21)),
                                        ).annotate({ description: 'Radio group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(22)),
                                        ).annotate({ description: 'Checkbox group component' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(23)),
                                        ).annotate({ description: 'Checkbox component' }),
                                      ]),
                                      id: Schema.optional(
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
                                              Schema.FiniteFromString.check(
                                                Schema.isInt32(),
                                                Schema.isGreaterThanOrEqualTo(0),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      content: Schema.String.check(
                                        Schema.makeFilter((input) => [...input].length >= 1, {
                                          expected: 'a string of at least 1 character',
                                        }),
                                        Schema.makeFilter((input) => [...input].length <= 4000, {
                                          expected: 'a string of at most 4000 characters',
                                        }),
                                      ),
                                    }),
                                  ]),
                                ).check(Schema.isMinLength(1), Schema.isMaxLength(40)),
                              ),
                            ),
                            spoiler: Schema.optional(
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
                                    Schema.String.check(
                                      Schema.isPattern(
                                        /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                      ),
                                    ).pipe(
                                      Schema.decodeTo(
                                        Schema.Boolean,
                                        SchemaTransformation.transform({
                                          decode: (input) =>
                                            /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                          encode: (output) => (output ? 'true' : 'false'),
                                        }),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          }),
                          Schema.Struct({
                            type: Schema.Union([
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(1)),
                              ).annotate({ description: 'Container for other components' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(2)),
                              ).annotate({ description: 'Button object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(3)),
                              ).annotate({
                                description: 'Select menu for picking from defined text options',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(4)),
                              ).annotate({ description: 'Text input object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(5)),
                              ).annotate({ description: 'Select menu for users' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(6)),
                              ).annotate({ description: 'Select menu for roles' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(7)),
                              ).annotate({
                                description: 'Select menu for mentionables (users and roles)',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(8)),
                              ).annotate({ description: 'Select menu for channels' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(9)),
                              ).annotate({ description: 'Section component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(10)),
                              ).annotate({ description: 'Text component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(11)),
                              ).annotate({ description: 'Thumbnail component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(12)),
                              ).annotate({ description: 'Media gallery component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(13)),
                              ).annotate({ description: 'File component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(14)),
                              ).annotate({ description: 'Separator component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(17)),
                              ).annotate({ description: 'Container component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(18)),
                              ).annotate({ description: 'Label component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(19)),
                              ).annotate({ description: 'File upload component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(21)),
                              ).annotate({ description: 'Radio group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(22)),
                              ).annotate({ description: 'Checkbox group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(23)),
                              ).annotate({ description: 'Checkbox component' }),
                            ]),
                            id: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt32(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            spoiler: Schema.optional(
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
                                    Schema.String.check(
                                      Schema.isPattern(
                                        /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                      ),
                                    ).pipe(
                                      Schema.decodeTo(
                                        Schema.Boolean,
                                        SchemaTransformation.transform({
                                          decode: (input) =>
                                            /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                          encode: (output) => (output ? 'true' : 'false'),
                                        }),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                          }),
                          Schema.Struct({
                            type: Schema.Union([
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(1)),
                              ).annotate({ description: 'Container for other components' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(2)),
                              ).annotate({ description: 'Button object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(3)),
                              ).annotate({
                                description: 'Select menu for picking from defined text options',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(4)),
                              ).annotate({ description: 'Text input object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(5)),
                              ).annotate({ description: 'Select menu for users' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(6)),
                              ).annotate({ description: 'Select menu for roles' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(7)),
                              ).annotate({
                                description: 'Select menu for mentionables (users and roles)',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(8)),
                              ).annotate({ description: 'Select menu for channels' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(9)),
                              ).annotate({ description: 'Section component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(10)),
                              ).annotate({ description: 'Text component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(11)),
                              ).annotate({ description: 'Thumbnail component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(12)),
                              ).annotate({ description: 'Media gallery component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(13)),
                              ).annotate({ description: 'File component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(14)),
                              ).annotate({ description: 'Separator component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(17)),
                              ).annotate({ description: 'Container component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(18)),
                              ).annotate({ description: 'Label component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(19)),
                              ).annotate({ description: 'File upload component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(21)),
                              ).annotate({ description: 'Radio group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(22)),
                              ).annotate({ description: 'Checkbox group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(23)),
                              ).annotate({ description: 'Checkbox component' }),
                            ]),
                            id: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt32(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            items: Schema.Unknown.pipe(
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
                                  Schema.Struct({
                                    description: Schema.optional(
                                      Schema.NullOr(
                                        Schema.String.check(
                                          Schema.makeFilter((input) => [...input].length >= 1, {
                                            expected: 'a string of at least 1 character',
                                          }),
                                          Schema.makeFilter((input) => [...input].length <= 1024, {
                                            expected: 'a string of at most 1024 characters',
                                          }),
                                        ),
                                      ),
                                    ),
                                    spoiler: Schema.optional(
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
                                            Schema.String.check(
                                              Schema.isPattern(
                                                /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                              ),
                                            ).pipe(
                                              Schema.decodeTo(
                                                Schema.Boolean,
                                                SchemaTransformation.transform({
                                                  decode: (input) =>
                                                    /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                  encode: (output) => (output ? 'true' : 'false'),
                                                }),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                    media: UnfurledMediaRequestSchema,
                                  }),
                                ).check(Schema.isMinLength(1), Schema.isMaxLength(10)),
                              ),
                            ),
                          }),
                          Schema.Struct({
                            type: Schema.Union([
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(1)),
                              ).annotate({ description: 'Container for other components' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(2)),
                              ).annotate({ description: 'Button object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(3)),
                              ).annotate({
                                description: 'Select menu for picking from defined text options',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(4)),
                              ).annotate({ description: 'Text input object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(5)),
                              ).annotate({ description: 'Select menu for users' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(6)),
                              ).annotate({ description: 'Select menu for roles' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(7)),
                              ).annotate({
                                description: 'Select menu for mentionables (users and roles)',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(8)),
                              ).annotate({ description: 'Select menu for channels' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(9)),
                              ).annotate({ description: 'Section component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(10)),
                              ).annotate({ description: 'Text component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(11)),
                              ).annotate({ description: 'Thumbnail component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(12)),
                              ).annotate({ description: 'Media gallery component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(13)),
                              ).annotate({ description: 'File component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(14)),
                              ).annotate({ description: 'Separator component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(17)),
                              ).annotate({ description: 'Container component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(18)),
                              ).annotate({ description: 'Label component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(19)),
                              ).annotate({ description: 'File upload component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(21)),
                              ).annotate({ description: 'Radio group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(22)),
                              ).annotate({ description: 'Checkbox group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(23)),
                              ).annotate({ description: 'Checkbox component' }),
                            ]),
                            id: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt32(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            components: Schema.Unknown.pipe(
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
                                  Schema.Struct({
                                    type: Schema.Union([
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(1)),
                                      ).annotate({ description: 'Container for other components' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(2)),
                                      ).annotate({ description: 'Button object' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(3)),
                                      ).annotate({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(4)),
                                      ).annotate({ description: 'Text input object' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(5)),
                                      ).annotate({ description: 'Select menu for users' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(6)),
                                      ).annotate({ description: 'Select menu for roles' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(7)),
                                      ).annotate({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(8)),
                                      ).annotate({ description: 'Select menu for channels' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(9)),
                                      ).annotate({ description: 'Section component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(10)),
                                      ).annotate({ description: 'Text component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(11)),
                                      ).annotate({ description: 'Thumbnail component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(12)),
                                      ).annotate({ description: 'Media gallery component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(13)),
                                      ).annotate({ description: 'File component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(14)),
                                      ).annotate({ description: 'Separator component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(17)),
                                      ).annotate({ description: 'Container component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(18)),
                                      ).annotate({ description: 'Label component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(19)),
                                      ).annotate({ description: 'File upload component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(21)),
                                      ).annotate({ description: 'Radio group component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(22)),
                                      ).annotate({ description: 'Checkbox group component' }),
                                      Schema.FiniteFromString.pipe(
                                        Schema.decodeTo(Schema.Literal(23)),
                                      ).annotate({ description: 'Checkbox component' }),
                                    ]),
                                    id: Schema.optional(
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
                                            Schema.FiniteFromString.check(
                                              Schema.isInt32(),
                                              Schema.isGreaterThanOrEqualTo(0),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                    content: Schema.String.check(
                                      Schema.makeFilter((input) => [...input].length >= 1, {
                                        expected: 'a string of at least 1 character',
                                      }),
                                      Schema.makeFilter((input) => [...input].length <= 4000, {
                                        expected: 'a string of at most 4000 characters',
                                      }),
                                    ),
                                  }),
                                ).check(Schema.isMinLength(1), Schema.isMaxLength(3)),
                              ),
                            ),
                            accessory: Schema.Union([
                              Schema.Struct({
                                type: Schema.Union([
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(1)),
                                  ).annotate({ description: 'Container for other components' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(2)),
                                  ).annotate({ description: 'Button object' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(3)),
                                  ).annotate({
                                    description:
                                      'Select menu for picking from defined text options',
                                  }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(4)),
                                  ).annotate({ description: 'Text input object' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(5)),
                                  ).annotate({ description: 'Select menu for users' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(6)),
                                  ).annotate({ description: 'Select menu for roles' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(7)),
                                  ).annotate({
                                    description: 'Select menu for mentionables (users and roles)',
                                  }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(8)),
                                  ).annotate({ description: 'Select menu for channels' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(9)),
                                  ).annotate({ description: 'Section component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(10)),
                                  ).annotate({ description: 'Text component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(11)),
                                  ).annotate({ description: 'Thumbnail component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(12)),
                                  ).annotate({ description: 'Media gallery component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(13)),
                                  ).annotate({ description: 'File component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(14)),
                                  ).annotate({ description: 'Separator component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(17)),
                                  ).annotate({ description: 'Container component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(18)),
                                  ).annotate({ description: 'Label component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(19)),
                                  ).annotate({ description: 'File upload component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(21)),
                                  ).annotate({ description: 'Radio group component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(22)),
                                  ).annotate({ description: 'Checkbox group component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(23)),
                                  ).annotate({ description: 'Checkbox component' }),
                                ]),
                                id: Schema.optional(
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
                                        Schema.FiniteFromString.check(
                                          Schema.isInt32(),
                                          Schema.isGreaterThanOrEqualTo(0),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                custom_id: Schema.optional(
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
                                style: Schema.Union([
                                  Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(1))),
                                  Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(2))),
                                  Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(3))),
                                  Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(4))),
                                  Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(5))),
                                  Schema.FiniteFromString.pipe(Schema.decodeTo(Schema.Literal(6))),
                                ]),
                                label: Schema.optional(
                                  Schema.NullOr(
                                    Schema.String.check(
                                      Schema.makeFilter((input) => [...input].length <= 80, {
                                        expected: 'a string of at most 80 characters',
                                      }),
                                    ),
                                  ),
                                ),
                                disabled: Schema.optional(
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
                                        Schema.String.check(
                                          Schema.isPattern(
                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                          ),
                                        ).pipe(
                                          Schema.decodeTo(
                                            Schema.Boolean,
                                            SchemaTransformation.transform({
                                              decode: (input) =>
                                                /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                              encode: (output) => (output ? 'true' : 'false'),
                                            }),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                url: Schema.optional(
                                  Schema.NullOr(
                                    Schema.String.check(
                                      Schema.makeFilter((input) => URL.canParse(input)),
                                      Schema.makeFilter((input) => [...input].length <= 512, {
                                        expected: 'a string of at most 512 characters',
                                      }),
                                    ),
                                  ),
                                ),
                                sku_id: Schema.optional(
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
                                                decode: (input) =>
                                                  input === 'null' ? null : input,
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
                                ),
                                emoji: Schema.optional(
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
                                                decode: (input) =>
                                                  input === 'null' ? null : input,
                                                encode: (output) => output,
                                              }),
                                            ),
                                            Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                          ),
                                          Schema.Struct({
                                            id: Schema.optional(
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === 'null' ? null : input,
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.NullOr(
                                                    Schema.Union([
                                                      Schema.Unknown.pipe(
                                                        Schema.decodeTo(
                                                          Schema.Unknown,
                                                          SchemaTransformation.transform<
                                                            unknown,
                                                            unknown
                                                          >({
                                                            decode: (input) =>
                                                              input === 'null' ? null : input,
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
                                            ),
                                            name: Schema.String.check(
                                              Schema.makeFilter(
                                                (input) => [...input].length <= 32,
                                                { expected: 'a string of at most 32 characters' },
                                              ),
                                            ),
                                          }),
                                        ]),
                                      ),
                                    ),
                                  ),
                                ),
                              }),
                              Schema.Struct({
                                type: Schema.Union([
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(1)),
                                  ).annotate({ description: 'Container for other components' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(2)),
                                  ).annotate({ description: 'Button object' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(3)),
                                  ).annotate({
                                    description:
                                      'Select menu for picking from defined text options',
                                  }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(4)),
                                  ).annotate({ description: 'Text input object' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(5)),
                                  ).annotate({ description: 'Select menu for users' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(6)),
                                  ).annotate({ description: 'Select menu for roles' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(7)),
                                  ).annotate({
                                    description: 'Select menu for mentionables (users and roles)',
                                  }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(8)),
                                  ).annotate({ description: 'Select menu for channels' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(9)),
                                  ).annotate({ description: 'Section component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(10)),
                                  ).annotate({ description: 'Text component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(11)),
                                  ).annotate({ description: 'Thumbnail component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(12)),
                                  ).annotate({ description: 'Media gallery component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(13)),
                                  ).annotate({ description: 'File component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(14)),
                                  ).annotate({ description: 'Separator component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(17)),
                                  ).annotate({ description: 'Container component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(18)),
                                  ).annotate({ description: 'Label component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(19)),
                                  ).annotate({ description: 'File upload component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(21)),
                                  ).annotate({ description: 'Radio group component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(22)),
                                  ).annotate({ description: 'Checkbox group component' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(23)),
                                  ).annotate({ description: 'Checkbox component' }),
                                ]),
                                id: Schema.optional(
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
                                        Schema.FiniteFromString.check(
                                          Schema.isInt32(),
                                          Schema.isGreaterThanOrEqualTo(0),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                description: Schema.optional(
                                  Schema.NullOr(
                                    Schema.String.check(
                                      Schema.makeFilter((input) => [...input].length >= 1, {
                                        expected: 'a string of at least 1 character',
                                      }),
                                      Schema.makeFilter((input) => [...input].length <= 1024, {
                                        expected: 'a string of at most 1024 characters',
                                      }),
                                    ),
                                  ),
                                ),
                                spoiler: Schema.optional(
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
                                        Schema.String.check(
                                          Schema.isPattern(
                                            /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                          ),
                                        ).pipe(
                                          Schema.decodeTo(
                                            Schema.Boolean,
                                            SchemaTransformation.transform({
                                              decode: (input) =>
                                                /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                              encode: (output) => (output ? 'true' : 'false'),
                                            }),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                            ]),
                          }),
                          Schema.Struct({
                            type: Schema.Union([
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(1)),
                              ).annotate({ description: 'Container for other components' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(2)),
                              ).annotate({ description: 'Button object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(3)),
                              ).annotate({
                                description: 'Select menu for picking from defined text options',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(4)),
                              ).annotate({ description: 'Text input object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(5)),
                              ).annotate({ description: 'Select menu for users' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(6)),
                              ).annotate({ description: 'Select menu for roles' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(7)),
                              ).annotate({
                                description: 'Select menu for mentionables (users and roles)',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(8)),
                              ).annotate({ description: 'Select menu for channels' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(9)),
                              ).annotate({ description: 'Section component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(10)),
                              ).annotate({ description: 'Text component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(11)),
                              ).annotate({ description: 'Thumbnail component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(12)),
                              ).annotate({ description: 'Media gallery component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(13)),
                              ).annotate({ description: 'File component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(14)),
                              ).annotate({ description: 'Separator component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(17)),
                              ).annotate({ description: 'Container component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(18)),
                              ).annotate({ description: 'Label component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(19)),
                              ).annotate({ description: 'File upload component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(21)),
                              ).annotate({ description: 'Radio group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(22)),
                              ).annotate({ description: 'Checkbox group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(23)),
                              ).annotate({ description: 'Checkbox component' }),
                            ]),
                            id: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt32(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            spacing: Schema.optional(
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
                                      Schema.Union([
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(1)),
                                        ).annotate({ description: 'Small spacing' }),
                                        Schema.FiniteFromString.pipe(
                                          Schema.decodeTo(Schema.Literal(2)),
                                        ).annotate({ description: 'Large spacing' }),
                                      ]),
                                    ]),
                                  ),
                                ),
                              ),
                            ),
                            divider: Schema.optional(
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
                                    Schema.String.check(
                                      Schema.isPattern(
                                        /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                      ),
                                    ).pipe(
                                      Schema.decodeTo(
                                        Schema.Boolean,
                                        SchemaTransformation.transform({
                                          decode: (input) =>
                                            /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                          encode: (output) => (output ? 'true' : 'false'),
                                        }),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          }),
                          Schema.Struct({
                            type: Schema.Union([
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(1)),
                              ).annotate({ description: 'Container for other components' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(2)),
                              ).annotate({ description: 'Button object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(3)),
                              ).annotate({
                                description: 'Select menu for picking from defined text options',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(4)),
                              ).annotate({ description: 'Text input object' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(5)),
                              ).annotate({ description: 'Select menu for users' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(6)),
                              ).annotate({ description: 'Select menu for roles' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(7)),
                              ).annotate({
                                description: 'Select menu for mentionables (users and roles)',
                              }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(8)),
                              ).annotate({ description: 'Select menu for channels' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(9)),
                              ).annotate({ description: 'Section component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(10)),
                              ).annotate({ description: 'Text component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(11)),
                              ).annotate({ description: 'Thumbnail component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(12)),
                              ).annotate({ description: 'Media gallery component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(13)),
                              ).annotate({ description: 'File component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(14)),
                              ).annotate({ description: 'Separator component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(17)),
                              ).annotate({ description: 'Container component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(18)),
                              ).annotate({ description: 'Label component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(19)),
                              ).annotate({ description: 'File upload component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(21)),
                              ).annotate({ description: 'Radio group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(22)),
                              ).annotate({ description: 'Checkbox group component' }),
                              Schema.FiniteFromString.pipe(
                                Schema.decodeTo(Schema.Literal(23)),
                              ).annotate({ description: 'Checkbox component' }),
                            ]),
                            id: Schema.optional(
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
                                    Schema.FiniteFromString.check(
                                      Schema.isInt32(),
                                      Schema.isGreaterThanOrEqualTo(0),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            content: Schema.String.check(
                              Schema.makeFilter((input) => [...input].length >= 1, {
                                expected: 'a string of at least 1 character',
                              }),
                              Schema.makeFilter((input) => [...input].length <= 4000, {
                                expected: 'a string of at most 4000 characters',
                              }),
                            ),
                          }),
                        ]),
                      ).check(Schema.isMaxLength(40)),
                    ),
                  ),
                ),
              ),
            ),
          ),
          flags: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.NullOr(Schema.FiniteFromString.check(Schema.isInt()))),
            ),
          ),
          attachments: Schema.optional(
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
                        Schema.Struct({
                          id: SnowflakeTypeSchema,
                          filename: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => [...input].length >= 1, {
                                  expected: 'a string of at least 1 character',
                                }),
                                Schema.makeFilter((input) => [...input].length <= 1024, {
                                  expected: 'a string of at most 1024 characters',
                                }),
                              ),
                            ),
                          ),
                          description: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => [...input].length <= 1024, {
                                  expected: 'a string of at most 1024 characters',
                                }),
                              ),
                            ),
                          ),
                          duration_secs: Schema.optional(
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
                                  Schema.FiniteFromString.check(
                                    Schema.isGreaterThanOrEqualTo(0),
                                    Schema.isLessThanOrEqualTo(2147483647),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          waveform: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => [...input].length <= 400, {
                                  expected: 'a string of at most 400 characters',
                                }),
                              ),
                            ),
                          ),
                          title: Schema.optional(
                            Schema.NullOr(
                              Schema.String.check(
                                Schema.makeFilter((input) => [...input].length <= 1024, {
                                  expected: 'a string of at most 1024 characters',
                                }),
                              ),
                            ),
                          ),
                          is_spoiler: Schema.optional(
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
                                  Schema.String.check(
                                    Schema.isPattern(
                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                    ),
                                  ).pipe(
                                    Schema.decodeTo(
                                      Schema.Boolean,
                                      SchemaTransformation.transform({
                                        decode: (input) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                        encode: (output) => (output ? 'true' : 'false'),
                                      }),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        }),
                      ).check(Schema.isMaxLength(10)),
                    ),
                  ),
                ),
              ),
            ),
          ),
          poll: Schema.optional(
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
                    Schema.Struct({
                      question: Schema.Struct({
                        text: Schema.optional(
                          Schema.NullOr(
                            Schema.String.check(
                              Schema.makeFilter((input) => [...input].length >= 1, {
                                expected: 'a string of at least 1 character',
                              }),
                              Schema.makeFilter((input) => [...input].length <= 300, {
                                expected: 'a string of at most 300 characters',
                              }),
                            ),
                          ).annotate({ description: 'The text of the field' }),
                        ),
                        emoji: Schema.optional(
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
                                  Schema.Struct({
                                    id: Schema.optional(
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
                                                    decode: (input) =>
                                                      input === 'null' ? null : input,
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                              ),
                                              SnowflakeTypeSchema,
                                            ]),
                                          ),
                                        ),
                                      ).annotate({ description: 'The ID of the custom emoji' }),
                                    ),
                                    name: Schema.optional(
                                      Schema.NullOr(
                                        Schema.String.check(
                                          Schema.makeFilter((input) => [...input].length <= 32, {
                                            expected: 'a string of at most 32 characters',
                                          }),
                                        ),
                                      ).annotate({
                                        description:
                                          'The name of the emoji, or the unicode emoji character',
                                      }),
                                    ),
                                    animated: Schema.optional(
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
                                            Schema.String.check(
                                              Schema.isPattern(
                                                /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                              ),
                                            ).pipe(
                                              Schema.decodeTo(
                                                Schema.Boolean,
                                                SchemaTransformation.transform({
                                                  decode: (input) =>
                                                    /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                                                  encode: (output) => (output ? 'true' : 'false'),
                                                }),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ).annotate({ description: 'Whether the emoji is animated' }),
                                    ),
                                  }),
                                ]),
                              ),
                            ),
                          ).annotate({ description: 'The emoji of the field' }),
                        ),
                      }).annotate({
                        description: 'The question of the poll. Only `text` is supported.',
                      }),
                      answers: Schema.Unknown.pipe(
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
                            Schema.Struct({
                              poll_media: Schema.Struct({
                                text: Schema.optional(
                                  Schema.NullOr(
                                    Schema.String.check(
                                      Schema.makeFilter((input) => [...input].length >= 1, {
                                        expected: 'a string of at least 1 character',
                                      }),
                                      Schema.makeFilter((input) => [...input].length <= 300, {
                                        expected: 'a string of at most 300 characters',
                                      }),
                                    ),
                                  ).annotate({ description: 'The text of the field' }),
                                ),
                                emoji: Schema.optional(
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
                                                decode: (input) =>
                                                  input === 'null' ? null : input,
                                                encode: (output) => output,
                                              }),
                                            ),
                                            Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                          ),
                                          Schema.Struct({
                                            id: Schema.optional(
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === 'null' ? null : input,
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.NullOr(
                                                    Schema.Union([
                                                      Schema.Unknown.pipe(
                                                        Schema.decodeTo(
                                                          Schema.Unknown,
                                                          SchemaTransformation.transform<
                                                            unknown,
                                                            unknown
                                                          >({
                                                            decode: (input) =>
                                                              input === 'null' ? null : input,
                                                            encode: (output) => output,
                                                          }),
                                                        ),
                                                        Schema.decodeTo(Schema.NullOr(Schema.Null)),
                                                      ),
                                                      SnowflakeTypeSchema,
                                                    ]),
                                                  ),
                                                ),
                                              ).annotate({
                                                description: 'The ID of the custom emoji',
                                              }),
                                            ),
                                            name: Schema.optional(
                                              Schema.NullOr(
                                                Schema.String.check(
                                                  Schema.makeFilter(
                                                    (input) => [...input].length <= 32,
                                                    {
                                                      expected: 'a string of at most 32 characters',
                                                    },
                                                  ),
                                                ),
                                              ).annotate({
                                                description:
                                                  'The name of the emoji, or the unicode emoji character',
                                              }),
                                            ),
                                            animated: Schema.optional(
                                              Schema.Unknown.pipe(
                                                Schema.decodeTo(
                                                  Schema.Unknown,
                                                  SchemaTransformation.transform<unknown, unknown>({
                                                    decode: (input) =>
                                                      input === 'null' ? null : input,
                                                    encode: (output) => output,
                                                  }),
                                                ),
                                                Schema.decodeTo(
                                                  Schema.NullOr(
                                                    Schema.String.check(
                                                      Schema.isPattern(
                                                        /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                      ),
                                                    ).pipe(
                                                      Schema.decodeTo(
                                                        Schema.Boolean,
                                                        SchemaTransformation.transform({
                                                          decode: (input) =>
                                                            /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                              input,
                                                            ),
                                                          encode: (output) =>
                                                            output ? 'true' : 'false',
                                                        }),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ).annotate({
                                                description: 'Whether the emoji is animated',
                                              }),
                                            ),
                                          }),
                                        ]),
                                      ),
                                    ),
                                  ).annotate({ description: 'The emoji of the field' }),
                                ),
                              }).annotate({ description: 'The data of the answer' }),
                            }),
                          ).check(Schema.isMinLength(1), Schema.isMaxLength(10)),
                        ),
                      ).annotate({
                        description: 'Each of the answers available in the poll, up to 10',
                      }),
                      allow_multiselect: Schema.optional(
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
                              Schema.String.check(
                                Schema.isPattern(
                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                ),
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
                          ),
                        ).annotate({ description: 'Whether a user can select multiple answers' }),
                      ),
                      layout_type: Schema.optional(
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
                                Schema.Union([
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(1)),
                                  ).annotate({ description: 'The, uhm, default layout type.' }),
                                ]),
                              ]),
                            ),
                          ),
                        ).annotate({
                          description: 'The layout type of the poll. Defaults to... DEFAULT!',
                        }),
                      ),
                      duration: Schema.optional(
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
                              Schema.FiniteFromString.check(
                                Schema.isInt32(),
                                Schema.isGreaterThanOrEqualTo(1),
                                Schema.isLessThanOrEqualTo(768),
                              ),
                            ),
                          ),
                        ).annotate({
                          description:
                            'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
                        }),
                      ),
                    }),
                  ]),
                ),
              ),
            ),
          ),
          shared_client_theme: Schema.optional(
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
                    Schema.Struct({
                      colors: Schema.Unknown.pipe(
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
                              Schema.makeFilter((input) => [...input].length === 6, {
                                expected: 'a string of 6 characters',
                              }),
                            ),
                          ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
                        ),
                      ),
                      gradient_angle: Schema.FiniteFromString.check(
                        Schema.isInt32(),
                        Schema.isGreaterThanOrEqualTo(0),
                        Schema.isLessThanOrEqualTo(360),
                      ),
                      base_mix: Schema.FiniteFromString.check(
                        Schema.isInt32(),
                        Schema.isGreaterThanOrEqualTo(0),
                        Schema.isLessThanOrEqualTo(100),
                      ),
                      base_theme: Schema.optional(
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
                                Schema.Union([
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(0)),
                                  ).annotate({ description: 'No base theme' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(1)),
                                  ).annotate({ description: 'Dark base theme' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(2)),
                                  ).annotate({ description: 'Light base theme' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(3)),
                                  ).annotate({ description: 'Darker base theme' }),
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(4)),
                                  ).annotate({ description: 'Midnight base theme' }),
                                ]),
                              ]),
                            ),
                          ),
                        ),
                      ),
                    }),
                  ]),
                ),
              ),
            ),
          ),
          message_reference: Schema.optional(
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
                    Schema.Struct({
                      guild_id: Schema.optional(
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
                      ),
                      channel_id: Schema.optional(
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
                      ),
                      message_id: SnowflakeTypeSchema,
                      fail_if_not_exists: Schema.optional(
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
                              Schema.String.check(
                                Schema.isPattern(
                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                ),
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
                          ),
                        ),
                      ),
                      type: Schema.optional(
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
                                Schema.Union([
                                  Schema.FiniteFromString.pipe(
                                    Schema.decodeTo(Schema.Literal(0)),
                                  ).annotate({ description: 'Reference to a message' }),
                                ]),
                              ]),
                            ),
                          ),
                        ),
                      ),
                    }),
                  ]),
                ),
              ),
            ),
          ),
          nonce: Schema.optional(
            Schema.Union([
              Schema.BigIntFromString.check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(-9223372036854776000n),
                Schema.isLessThanOrEqualToBigInt(9223372036854776000n),
              ),
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 25, {
                  expected: 'a string of at most 25 characters',
                }),
              ),
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
            ]),
          ),
          enforce_nonce: Schema.optional(
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
              ),
            ),
          ),
          tts: Schema.optional(
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
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/lobbies/:lobby_id/messages/:message_id/moderation-metadata',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 2000, {
              expected: 'a string of at most 2000 characters',
            }),
          ),
        ).annotate({ description: 'The moderation metadata attached to the message' }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 2000, {
              expected: 'a string of at most 2000 characters',
            }),
          ),
        ).annotate({ description: 'The moderation metadata attached to the message' }),
      ),
    ),
    (c) => {},
  )
