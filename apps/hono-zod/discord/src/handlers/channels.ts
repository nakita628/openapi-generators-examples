import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  ChannelPermissionOverwritesSchema,
  CreateForumThreadRequestSchema,
  CreateGroupDMInviteRequestSchema,
  CreateGuildInviteRequestSchema,
  CreateTextThreadWithMessageRequestSchema,
  CreateTextThreadWithoutMessageRequestSchema,
  MessageCreateRequestSchema,
  MessageEditRequestPartialSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  SnowflakeTypeSchema,
  SoundboardSoundSendRequestSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UpdateDMRequestPartialSchema,
  UpdateGroupDMRequestPartialSchema,
  UpdateGuildChannelRequestPartialSchema,
  UpdateThreadRequestPartialSchema,
} from '../components'

export const channelsHandler = new Hono()
  .get(
    '/channels/:channel_id',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/channels/:channel_id',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.union([
        UpdateDMRequestPartialSchema,
        UpdateGroupDMRequestPartialSchema,
        UpdateGuildChannelRequestPartialSchema,
        UpdateThreadRequestPartialSchema,
      ]),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/followers',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator('json', z.object({ webhook_channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/invites',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/invites',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator('json', z.union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema])),
    sValidator(
      'form',
      z.union([
        z.object({
          max_age: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().int().min(1).max(2592000).nullable(),
            )
            .exactOptional(),
        }),
        z.object({
          max_age: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().int().min(0).max(5184000).nullable(),
            )
            .exactOptional(),
          temporary: z
            .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
            .exactOptional(),
          max_uses: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().int().min(0).max(100).nullable(),
            )
            .exactOptional(),
          unique: z
            .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
            .exactOptional(),
          target_user_id: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  SnowflakeTypeSchema,
                ])
                .nullable(),
            )
            .exactOptional(),
          target_application_id: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  SnowflakeTypeSchema,
                ])
                .nullable(),
            )
            .exactOptional(),
          target_type: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce.number().pipe(z.literal(1)),
                    z.coerce.number().pipe(z.literal(2)),
                    z.coerce.number().pipe(z.literal(3)),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          role_ids: z
            .union([
              z.string(),
              z.preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(SnowflakeTypeSchema)
                  .max(250)
                  .refine((val) => new Set(val).size === val.length),
              ),
              z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
            ])
            .exactOptional(),
          target_user_ids: z
            .union([
              z.string(),
              z.preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(SnowflakeTypeSchema)
                  .max(1000)
                  .refine((val) => new Set(val).size === val.length),
              ),
              z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
            ])
            .meta({ description: 'The IDs of the users to target with this invite.' })
            .exactOptional(),
        }),
      ]),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        around: SnowflakeTypeSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator('json', MessageCreateRequestSchema),
    sValidator(
      'form',
      z.object({
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      type: z.string().max(152133).nullable().exactOptional(),
                      url: z.url().max(2048).nullable().exactOptional(),
                      title: z.string().max(256).nullable().exactOptional(),
                      color: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().int().min(0).max(16777215).nullable(),
                        )
                        .exactOptional(),
                      timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
                      description: z.string().max(4096).nullable().exactOptional(),
                      author: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAuthorSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      image: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      thumbnail: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      footer: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedFooterSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      fields: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    name: z.string().max(256),
                                    value: z.string().max(1024),
                                    inline: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                  }),
                                )
                                .max(25),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      provider: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedProviderSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      video: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      audio: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAudioSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
        allowed_mentions: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  parse: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z
                                    .literal('users')
                                    .meta({ description: 'Controls role mentions' }),
                                  z
                                    .literal('roles')
                                    .meta({ description: 'Controls user mentions' }),
                                  z
                                    .literal('everyone')
                                    .meta({ description: 'Controls @everyone and @here mentions' }),
                                ]),
                              ]),
                            )
                            .max(1521)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  users: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  roles: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  replied_user: z
                    .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        sticker_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(SnowflakeTypeSchema).max(3),
              )
              .nullable(),
          )
          .exactOptional(),
        components: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.union([
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                                  style: z.union([
                                    z.coerce.number().pipe(z.literal(1)),
                                    z.coerce.number().pipe(z.literal(2)),
                                    z.coerce.number().pipe(z.literal(3)),
                                    z.coerce.number().pipe(z.literal(4)),
                                    z.coerce.number().pipe(z.literal(5)),
                                    z.coerce.number().pipe(z.literal(6)),
                                  ]),
                                  label: z.string().max(80).nullable().exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  url: z.url().max(512).nullable().exactOptional(),
                                  sku_id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          SnowflakeTypeSchema,
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  emoji: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.object({
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            name: z.string().max(32),
                                          }),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  channel_types: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({
                                                    description: 'A direct message between users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(3))
                                                  .meta({
                                                    description:
                                                      'A direct message between multiple users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(0))
                                                  .meta({
                                                    description: 'A text channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({
                                                    description: 'A voice channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(4))
                                                  .meta({
                                                    description:
                                                      'An organizational category that contains up to 50 channels',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(5))
                                                  .meta({
                                                    description:
                                                      'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(10))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(11))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(12))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(13))
                                                  .meta({
                                                    description:
                                                      'A voice channel for hosting events with an audience',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(14))
                                                  .meta({
                                                    description:
                                                      'The channel in a hub containing the listed servers',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(15))
                                                  .meta({
                                                    description:
                                                      'Channel that can only contain threads',
                                                  }),
                                              ]),
                                            )
                                            .refine((val) => new Set(val).size === val.length),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                              ]),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  options: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          label: z.string().min(1).max(100),
                                          value: z.string().min(1).max(100),
                                          description: z
                                            .string()
                                            .max(100)
                                            .nullable()
                                            .exactOptional(),
                                          default: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          emoji: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  z.object({
                                                    id: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                    name: z.string().max(32),
                                                  }),
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                        }),
                                      )
                                      .min(1)
                                      .max(25),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(5),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        accent_color: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(0).max(16777215).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.union([
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z
                                              .string()
                                              .min(1)
                                              .max(100)
                                              .nullable()
                                              .exactOptional(),
                                            style: z.union([
                                              z.coerce.number().pipe(z.literal(1)),
                                              z.coerce.number().pipe(z.literal(2)),
                                              z.coerce.number().pipe(z.literal(3)),
                                              z.coerce.number().pipe(z.literal(4)),
                                              z.coerce.number().pipe(z.literal(5)),
                                              z.coerce.number().pipe(z.literal(6)),
                                            ]),
                                            label: z.string().max(80).nullable().exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            url: z.url().max(512).nullable().exactOptional(),
                                            sku_id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            emoji: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    z.object({
                                                      id: z
                                                        .preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z
                                                            .union([
                                                              z.preprocess(
                                                                (val) =>
                                                                  val === 'null' ? null : val,
                                                                z.null().nullable(),
                                                              ),
                                                              SnowflakeTypeSchema,
                                                            ])
                                                            .nullable(),
                                                        )
                                                        .exactOptional(),
                                                      name: z.string().max(32),
                                                    }),
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            channel_types: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(1))
                                                            .meta({
                                                              description:
                                                                'A direct message between users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(3))
                                                            .meta({
                                                              description:
                                                                'A direct message between multiple users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(0))
                                                            .meta({
                                                              description:
                                                                'A text channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(2))
                                                            .meta({
                                                              description:
                                                                'A voice channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(4))
                                                            .meta({
                                                              description:
                                                                'An organizational category that contains up to 50 channels',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(5))
                                                            .meta({
                                                              description:
                                                                'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(10))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(11))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(12))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(13))
                                                            .meta({
                                                              description:
                                                                'A voice channel for hosting events with an audience',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(14))
                                                            .meta({
                                                              description:
                                                                'The channel in a hub containing the listed servers',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(15))
                                                            .meta({
                                                              description:
                                                                'Channel that can only contain threads',
                                                            }),
                                                        ]),
                                                      )
                                                      .refine(
                                                        (val) => new Set(val).size === val.length,
                                                      ),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                        ]),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            options: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    label: z.string().min(1).max(100),
                                                    value: z.string().min(1).max(100),
                                                    description: z
                                                      .string()
                                                      .max(100)
                                                      .nullable()
                                                      .exactOptional(),
                                                    default: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.stringbool().nullable(),
                                                      )
                                                      .exactOptional(),
                                                    emoji: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            z.object({
                                                              id: z
                                                                .preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z
                                                                    .union([
                                                                      z.preprocess(
                                                                        (val) =>
                                                                          val === 'null'
                                                                            ? null
                                                                            : val,
                                                                        z.null().nullable(),
                                                                      ),
                                                                      SnowflakeTypeSchema,
                                                                    ])
                                                                    .nullable(),
                                                                )
                                                                .exactOptional(),
                                                              name: z.string().max(32),
                                                            }),
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                  }),
                                                )
                                                .min(1)
                                                .max(25),
                                            ),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                        ]),
                                      )
                                      .min(1)
                                      .max(5),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spoiler: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  items: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          description: z
                                            .string()
                                            .min(1)
                                            .max(1024)
                                            .nullable()
                                            .exactOptional(),
                                          spoiler: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      )
                                      .min(1)
                                      .max(10),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          content: z.string().min(1).max(4000),
                                        }),
                                      )
                                      .min(1)
                                      .max(3),
                                  ),
                                  accessory: z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z
                                        .string()
                                        .min(1)
                                        .max(100)
                                        .nullable()
                                        .exactOptional(),
                                      style: z.union([
                                        z.coerce.number().pipe(z.literal(1)),
                                        z.coerce.number().pipe(z.literal(2)),
                                        z.coerce.number().pipe(z.literal(3)),
                                        z.coerce.number().pipe(z.literal(4)),
                                        z.coerce.number().pipe(z.literal(5)),
                                        z.coerce.number().pipe(z.literal(6)),
                                      ]),
                                      label: z.string().max(80).nullable().exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      url: z.url().max(512).nullable().exactOptional(),
                                      sku_id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      emoji: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.object({
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                name: z.string().max(32),
                                              }),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      description: z
                                        .string()
                                        .min(1)
                                        .max(1024)
                                        .nullable()
                                        .exactOptional(),
                                      spoiler: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      media: UnfurledMediaRequestSchema,
                                    }),
                                  ]),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spacing: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({ description: 'Small spacing' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Large spacing' }),
                                          ]),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  divider: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  content: z.string().min(1).max(4000),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(40),
                        ),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        items: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                description: z.string().min(1).max(1024).nullable().exactOptional(),
                                spoiler: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                media: UnfurledMediaRequestSchema,
                              }),
                            )
                            .min(1)
                            .max(10),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                content: z.string().min(1).max(4000),
                              }),
                            )
                            .min(1)
                            .max(3),
                        ),
                        accessory: z.union([
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                            style: z.union([
                              z.coerce.number().pipe(z.literal(1)),
                              z.coerce.number().pipe(z.literal(2)),
                              z.coerce.number().pipe(z.literal(3)),
                              z.coerce.number().pipe(z.literal(4)),
                              z.coerce.number().pipe(z.literal(5)),
                              z.coerce.number().pipe(z.literal(6)),
                            ]),
                            label: z.string().max(80).nullable().exactOptional(),
                            disabled: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            url: z.url().max(512).nullable().exactOptional(),
                            sku_id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                            emoji: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.object({
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      name: z.string().max(32),
                                    }),
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            description: z.string().min(1).max(1024).nullable().exactOptional(),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            media: UnfurledMediaRequestSchema,
                          }),
                        ]),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spacing: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z
                              .union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Small spacing' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Large spacing' }),
                                ]),
                              ])
                              .nullable(),
                          )
                          .exactOptional(),
                        divider: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        content: z.string().min(1).max(4000),
                      }),
                    ]),
                  )
                  .max(40),
              )
              .nullable(),
          )
          .exactOptional(),
        flags: z
          .preprocess((val) => (val === 'null' ? null : val), z.coerce.number().int().nullable())
          .exactOptional(),
        attachments: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      id: SnowflakeTypeSchema,
                      filename: z.string().min(1).max(1024).nullable().exactOptional(),
                      description: z.string().max(1024).nullable().exactOptional(),
                      duration_secs: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().min(0).max(2147483647).nullable(),
                        )
                        .exactOptional(),
                      waveform: z.string().max(400).nullable().exactOptional(),
                      title: z.string().max(1024).nullable().exactOptional(),
                      is_spoiler: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.stringbool().nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
        poll: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  question: z
                    .object({
                      text: z
                        .string()
                        .min(1)
                        .max(300)
                        .nullable()
                        .meta({ description: 'The text of the field' })
                        .exactOptional(),
                      emoji: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .meta({ description: 'The ID of the custom emoji' })
                                      .nullable(),
                                  )
                                  .exactOptional(),
                                name: z
                                  .string()
                                  .max(32)
                                  .nullable()
                                  .meta({
                                    description:
                                      'The name of the emoji, or the unicode emoji character',
                                  })
                                  .exactOptional(),
                                animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .stringbool()
                                      .nullable()
                                      .meta({ description: 'Whether the emoji is animated' }),
                                  )
                                  .exactOptional(),
                              }),
                            ])
                            .meta({ description: 'The emoji of the field' })
                            .nullable(),
                        )
                        .exactOptional(),
                    })
                    .meta({ description: 'The question of the poll. Only `text` is supported.' }),
                  answers: z
                    .preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z
                        .array(
                          z.object({
                            poll_media: z
                              .object({
                                text: z
                                  .string()
                                  .min(1)
                                  .max(300)
                                  .nullable()
                                  .meta({ description: 'The text of the field' })
                                  .exactOptional(),
                                emoji: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        z.object({
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  SnowflakeTypeSchema,
                                                ])
                                                .meta({ description: 'The ID of the custom emoji' })
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          name: z
                                            .string()
                                            .max(32)
                                            .nullable()
                                            .meta({
                                              description:
                                                'The name of the emoji, or the unicode emoji character',
                                            })
                                            .exactOptional(),
                                          animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .stringbool()
                                                .nullable()
                                                .meta({
                                                  description: 'Whether the emoji is animated',
                                                }),
                                            )
                                            .exactOptional(),
                                        }),
                                      ])
                                      .meta({ description: 'The emoji of the field' })
                                      .nullable(),
                                  )
                                  .exactOptional(),
                              })
                              .meta({ description: 'The data of the answer' }),
                          }),
                        )
                        .min(1)
                        .max(10),
                    )
                    .meta({ description: 'Each of the answers available in the poll, up to 10' }),
                  allow_multiselect: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .stringbool()
                        .nullable()
                        .meta({ description: 'Whether a user can select multiple answers' }),
                    )
                    .exactOptional(),
                  layout_type: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          z.union([
                            z.coerce
                              .number()
                              .pipe(z.literal(1))
                              .meta({ description: 'The, uhm, default layout type.' }),
                          ]),
                        ])
                        .meta({
                          description: 'The layout type of the poll. Defaults to... DEFAULT!',
                        })
                        .nullable(),
                    )
                    .exactOptional(),
                  duration: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z.coerce
                        .number()
                        .pipe(z.int32().min(1).max(768))
                        .nullable()
                        .meta({
                          description:
                            'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
                        }),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        shared_client_theme: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  colors: z.preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z.array(z.string().length(6)).min(1).max(5),
                  ),
                  gradient_angle: z.coerce.number().pipe(z.int32().min(0).max(360)),
                  base_mix: z.coerce.number().pipe(z.int32().min(0).max(100)),
                  base_theme: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          z.union([
                            z.coerce
                              .number()
                              .pipe(z.literal(0))
                              .meta({ description: 'No base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(1))
                              .meta({ description: 'Dark base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(2))
                              .meta({ description: 'Light base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(3))
                              .meta({ description: 'Darker base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(4))
                              .meta({ description: 'Midnight base theme' }),
                          ]),
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        message_reference: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  guild_id: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          SnowflakeTypeSchema,
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                  channel_id: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          SnowflakeTypeSchema,
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                  message_id: SnowflakeTypeSchema,
                  fail_if_not_exists: z
                    .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
                    .exactOptional(),
                  type: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          z.union([
                            z.coerce
                              .number()
                              .pipe(z.literal(0))
                              .meta({ description: 'Reference to a message' }),
                          ]),
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        nonce: z
          .union([
            z.coerce.bigint().pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
            z.string().max(25),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        enforce_nonce: z
          .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
          .exactOptional(),
        tts: z
          .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages/bulk-delete',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({
        messages: z
          .array(SnowflakeTypeSchema)
          .min(2)
          .max(100)
          .refine((val) => new Set(val).size === val.length),
      }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages/pins',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.coerce.number().int().min(1).max(50).exactOptional(),
      }),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/messages/pins/:message_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/pins/:message_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages/:message_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .patch(
    '/channels/:channel_id/messages/:message_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', MessageEditRequestPartialSchema),
    sValidator(
      'form',
      z.object({
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      type: z.string().max(152133).nullable().exactOptional(),
                      url: z.url().max(2048).nullable().exactOptional(),
                      title: z.string().max(256).nullable().exactOptional(),
                      color: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().int().min(0).max(16777215).nullable(),
                        )
                        .exactOptional(),
                      timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
                      description: z.string().max(4096).nullable().exactOptional(),
                      author: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAuthorSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      image: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      thumbnail: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      footer: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedFooterSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      fields: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    name: z.string().max(256),
                                    value: z.string().max(1024),
                                    inline: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                  }),
                                )
                                .max(25),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      provider: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedProviderSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      video: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      audio: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAudioSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
        flags: z
          .preprocess((val) => (val === 'null' ? null : val), z.coerce.number().int().nullable())
          .exactOptional(),
        allowed_mentions: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  parse: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z
                                    .literal('users')
                                    .meta({ description: 'Controls role mentions' }),
                                  z
                                    .literal('roles')
                                    .meta({ description: 'Controls user mentions' }),
                                  z
                                    .literal('everyone')
                                    .meta({ description: 'Controls @everyone and @here mentions' }),
                                ]),
                              ]),
                            )
                            .max(1521)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  users: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  roles: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  replied_user: z
                    .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        sticker_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(SnowflakeTypeSchema).max(1521),
              )
              .nullable(),
          )
          .exactOptional(),
        components: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.union([
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                                  style: z.union([
                                    z.coerce.number().pipe(z.literal(1)),
                                    z.coerce.number().pipe(z.literal(2)),
                                    z.coerce.number().pipe(z.literal(3)),
                                    z.coerce.number().pipe(z.literal(4)),
                                    z.coerce.number().pipe(z.literal(5)),
                                    z.coerce.number().pipe(z.literal(6)),
                                  ]),
                                  label: z.string().max(80).nullable().exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  url: z.url().max(512).nullable().exactOptional(),
                                  sku_id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          SnowflakeTypeSchema,
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  emoji: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.object({
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            name: z.string().max(32),
                                          }),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  channel_types: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({
                                                    description: 'A direct message between users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(3))
                                                  .meta({
                                                    description:
                                                      'A direct message between multiple users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(0))
                                                  .meta({
                                                    description: 'A text channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({
                                                    description: 'A voice channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(4))
                                                  .meta({
                                                    description:
                                                      'An organizational category that contains up to 50 channels',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(5))
                                                  .meta({
                                                    description:
                                                      'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(10))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(11))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(12))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(13))
                                                  .meta({
                                                    description:
                                                      'A voice channel for hosting events with an audience',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(14))
                                                  .meta({
                                                    description:
                                                      'The channel in a hub containing the listed servers',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(15))
                                                  .meta({
                                                    description:
                                                      'Channel that can only contain threads',
                                                  }),
                                              ]),
                                            )
                                            .refine((val) => new Set(val).size === val.length),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                              ]),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  options: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          label: z.string().min(1).max(100),
                                          value: z.string().min(1).max(100),
                                          description: z
                                            .string()
                                            .max(100)
                                            .nullable()
                                            .exactOptional(),
                                          default: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          emoji: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  z.object({
                                                    id: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                    name: z.string().max(32),
                                                  }),
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                        }),
                                      )
                                      .min(1)
                                      .max(25),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(5),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        accent_color: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(0).max(16777215).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.union([
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z
                                              .string()
                                              .min(1)
                                              .max(100)
                                              .nullable()
                                              .exactOptional(),
                                            style: z.union([
                                              z.coerce.number().pipe(z.literal(1)),
                                              z.coerce.number().pipe(z.literal(2)),
                                              z.coerce.number().pipe(z.literal(3)),
                                              z.coerce.number().pipe(z.literal(4)),
                                              z.coerce.number().pipe(z.literal(5)),
                                              z.coerce.number().pipe(z.literal(6)),
                                            ]),
                                            label: z.string().max(80).nullable().exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            url: z.url().max(512).nullable().exactOptional(),
                                            sku_id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            emoji: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    z.object({
                                                      id: z
                                                        .preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z
                                                            .union([
                                                              z.preprocess(
                                                                (val) =>
                                                                  val === 'null' ? null : val,
                                                                z.null().nullable(),
                                                              ),
                                                              SnowflakeTypeSchema,
                                                            ])
                                                            .nullable(),
                                                        )
                                                        .exactOptional(),
                                                      name: z.string().max(32),
                                                    }),
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            channel_types: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(1))
                                                            .meta({
                                                              description:
                                                                'A direct message between users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(3))
                                                            .meta({
                                                              description:
                                                                'A direct message between multiple users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(0))
                                                            .meta({
                                                              description:
                                                                'A text channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(2))
                                                            .meta({
                                                              description:
                                                                'A voice channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(4))
                                                            .meta({
                                                              description:
                                                                'An organizational category that contains up to 50 channels',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(5))
                                                            .meta({
                                                              description:
                                                                'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(10))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(11))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(12))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(13))
                                                            .meta({
                                                              description:
                                                                'A voice channel for hosting events with an audience',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(14))
                                                            .meta({
                                                              description:
                                                                'The channel in a hub containing the listed servers',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(15))
                                                            .meta({
                                                              description:
                                                                'Channel that can only contain threads',
                                                            }),
                                                        ]),
                                                      )
                                                      .refine(
                                                        (val) => new Set(val).size === val.length,
                                                      ),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                        ]),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            options: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    label: z.string().min(1).max(100),
                                                    value: z.string().min(1).max(100),
                                                    description: z
                                                      .string()
                                                      .max(100)
                                                      .nullable()
                                                      .exactOptional(),
                                                    default: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.stringbool().nullable(),
                                                      )
                                                      .exactOptional(),
                                                    emoji: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            z.object({
                                                              id: z
                                                                .preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z
                                                                    .union([
                                                                      z.preprocess(
                                                                        (val) =>
                                                                          val === 'null'
                                                                            ? null
                                                                            : val,
                                                                        z.null().nullable(),
                                                                      ),
                                                                      SnowflakeTypeSchema,
                                                                    ])
                                                                    .nullable(),
                                                                )
                                                                .exactOptional(),
                                                              name: z.string().max(32),
                                                            }),
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                  }),
                                                )
                                                .min(1)
                                                .max(25),
                                            ),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                        ]),
                                      )
                                      .min(1)
                                      .max(5),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spoiler: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  items: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          description: z
                                            .string()
                                            .min(1)
                                            .max(1024)
                                            .nullable()
                                            .exactOptional(),
                                          spoiler: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      )
                                      .min(1)
                                      .max(10),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          content: z.string().min(1).max(4000),
                                        }),
                                      )
                                      .min(1)
                                      .max(3),
                                  ),
                                  accessory: z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z
                                        .string()
                                        .min(1)
                                        .max(100)
                                        .nullable()
                                        .exactOptional(),
                                      style: z.union([
                                        z.coerce.number().pipe(z.literal(1)),
                                        z.coerce.number().pipe(z.literal(2)),
                                        z.coerce.number().pipe(z.literal(3)),
                                        z.coerce.number().pipe(z.literal(4)),
                                        z.coerce.number().pipe(z.literal(5)),
                                        z.coerce.number().pipe(z.literal(6)),
                                      ]),
                                      label: z.string().max(80).nullable().exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      url: z.url().max(512).nullable().exactOptional(),
                                      sku_id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      emoji: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.object({
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                name: z.string().max(32),
                                              }),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      description: z
                                        .string()
                                        .min(1)
                                        .max(1024)
                                        .nullable()
                                        .exactOptional(),
                                      spoiler: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      media: UnfurledMediaRequestSchema,
                                    }),
                                  ]),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spacing: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({ description: 'Small spacing' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Large spacing' }),
                                          ]),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  divider: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  content: z.string().min(1).max(4000),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(40),
                        ),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        items: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                description: z.string().min(1).max(1024).nullable().exactOptional(),
                                spoiler: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                media: UnfurledMediaRequestSchema,
                              }),
                            )
                            .min(1)
                            .max(10),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                content: z.string().min(1).max(4000),
                              }),
                            )
                            .min(1)
                            .max(3),
                        ),
                        accessory: z.union([
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                            style: z.union([
                              z.coerce.number().pipe(z.literal(1)),
                              z.coerce.number().pipe(z.literal(2)),
                              z.coerce.number().pipe(z.literal(3)),
                              z.coerce.number().pipe(z.literal(4)),
                              z.coerce.number().pipe(z.literal(5)),
                              z.coerce.number().pipe(z.literal(6)),
                            ]),
                            label: z.string().max(80).nullable().exactOptional(),
                            disabled: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            url: z.url().max(512).nullable().exactOptional(),
                            sku_id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                            emoji: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.object({
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      name: z.string().max(32),
                                    }),
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            description: z.string().min(1).max(1024).nullable().exactOptional(),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            media: UnfurledMediaRequestSchema,
                          }),
                        ]),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spacing: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z
                              .union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Small spacing' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Large spacing' }),
                                ]),
                              ])
                              .nullable(),
                          )
                          .exactOptional(),
                        divider: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        content: z.string().min(1).max(4000),
                      }),
                    ]),
                  )
                  .max(40),
              )
              .nullable(),
          )
          .exactOptional(),
        attachments: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      id: SnowflakeTypeSchema,
                      filename: z.string().min(1).max(1024).nullable().exactOptional(),
                      description: z.string().max(1024).nullable().exactOptional(),
                      duration_secs: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().min(0).max(2147483647).nullable(),
                        )
                        .exactOptional(),
                      waveform: z.string().max(400).nullable().exactOptional(),
                      title: z.string().max(1024).nullable().exactOptional(),
                      is_spoiler: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.stringbool().nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages/:message_id/crosspost',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    sValidator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
    sValidator(
      'query',
      z.object({
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        type: z
          .union([
            z.coerce.number().pipe(z.literal(0)).meta({ description: 'Normal reaction type' }),
            z.coerce.number().pipe(z.literal(1)).meta({ description: 'Burst reaction type' }),
          ])
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    sValidator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    sValidator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    sValidator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id',
    sValidator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
        user_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages/:message_id/threads',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    sValidator('json', CreateTextThreadWithMessageRequestSchema),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/permissions/member/:user_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', z.object({ implicit: z.stringbool().exactOptional() })),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/permissions/role/:role_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', z.object({ implicit: z.stringbool().exactOptional() })),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/permissions/:overwrite_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      z.object({
        type: z.xor([z.null().nullable(), ChannelPermissionOverwritesSchema]).exactOptional(),
        allow: z.int().nullable().exactOptional(),
        deny: z.int().nullable().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/permissions/:overwrite_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/pins',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/pins/:message_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/pins/:message_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/polls/:message_id/answers/:answer_id',
    sValidator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: z.coerce.number().pipe(z.int32().min(1).max(10)),
      }),
    ),
    sValidator(
      'query',
      z.object({
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/polls/:message_id/expire',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/recipients/:user_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    sValidator(
      'json',
      z.object({
        access_token: z.string().max(152133).nullable().exactOptional(),
        nick: z.string().max(152133).nullable().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/recipients/:user_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/send-soundboard-sound',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator('json', SoundboardSoundSendRequestSchema),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/thread-members',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        with_member: z.stringbool().exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/thread-members/@me',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/thread-members/@me',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/thread-members/:user_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', z.object({ with_member: z.stringbool().exactOptional() })),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/thread-members/:user_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/thread-members/:user_id',
    sValidator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/threads',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.union([CreateForumThreadRequestSchema, CreateTextThreadWithoutMessageRequestSchema]),
    ),
    sValidator(
      'form',
      z.union([
        z.object({
          name: z.string().min(1).max(100),
          auto_archive_duration: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce.number().pipe(z.literal(60)).meta({ description: 'One hour' }),
                    z.coerce.number().pipe(z.literal(1440)).meta({ description: 'One day' }),
                    z.coerce.number().pipe(z.literal(4320)).meta({ description: 'Three days' }),
                    z.coerce.number().pipe(z.literal(10080)).meta({ description: 'Seven days' }),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          rate_limit_per_user: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().pipe(z.int32().min(0).max(21600)).nullable(),
            )
            .exactOptional(),
          applied_tags: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .preprocess(
                  (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                  z.array(SnowflakeTypeSchema).max(5),
                )
                .nullable(),
            )
            .exactOptional(),
          message: z.object({
            content: z.string().max(4000).nullable().exactOptional(),
            embeds: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z
                      .array(
                        z.object({
                          type: z.string().max(152133).nullable().exactOptional(),
                          url: z.url().max(2048).nullable().exactOptional(),
                          title: z.string().max(256).nullable().exactOptional(),
                          color: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z.coerce.number().int().min(0).max(16777215).nullable(),
                            )
                            .exactOptional(),
                          timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
                          description: z.string().max(4096).nullable().exactOptional(),
                          author: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedAuthorSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          image: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    url: z.url().max(2048).nullable().exactOptional(),
                                    width: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    height: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    placeholder: z.string().max(64).nullable().exactOptional(),
                                    placeholder_version: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().min(0).max(2147483647).nullable(),
                                      )
                                      .exactOptional(),
                                    is_animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    description: z.string().max(4096).nullable().exactOptional(),
                                  }),
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          thumbnail: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    url: z.url().max(2048).nullable().exactOptional(),
                                    width: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    height: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    placeholder: z.string().max(64).nullable().exactOptional(),
                                    placeholder_version: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().min(0).max(2147483647).nullable(),
                                      )
                                      .exactOptional(),
                                    is_animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    description: z.string().max(4096).nullable().exactOptional(),
                                  }),
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          footer: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedFooterSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          fields: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .preprocess(
                                  (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                                  z
                                    .array(
                                      z.object({
                                        name: z.string().max(256),
                                        value: z.string().max(1024),
                                        inline: z
                                          .preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.stringbool().nullable(),
                                          )
                                          .exactOptional(),
                                      }),
                                    )
                                    .max(25),
                                )
                                .nullable(),
                            )
                            .exactOptional(),
                          provider: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedProviderSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          video: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    url: z.url().max(2048).nullable().exactOptional(),
                                    width: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    height: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    placeholder: z.string().max(64).nullable().exactOptional(),
                                    placeholder_version: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().min(0).max(2147483647).nullable(),
                                      )
                                      .exactOptional(),
                                    is_animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    description: z.string().max(4096).nullable().exactOptional(),
                                  }),
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          audio: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedAudioSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                        }),
                      )
                      .max(10),
                  )
                  .nullable(),
              )
              .exactOptional(),
            allowed_mentions: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .union([
                    z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                    z.object({
                      parse: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.union([
                                      z
                                        .literal('users')
                                        .meta({ description: 'Controls role mentions' }),
                                      z
                                        .literal('roles')
                                        .meta({ description: 'Controls user mentions' }),
                                      z
                                        .literal('everyone')
                                        .meta({
                                          description: 'Controls @everyone and @here mentions',
                                        }),
                                    ]),
                                  ]),
                                )
                                .max(1521)
                                .refine((val) => new Set(val).size === val.length),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      users: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .nullable(),
                                  ),
                                )
                                .max(100)
                                .refine((val) => new Set(val).size === val.length),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      roles: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .nullable(),
                                  ),
                                )
                                .max(100)
                                .refine((val) => new Set(val).size === val.length),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      replied_user: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.stringbool().nullable(),
                        )
                        .exactOptional(),
                    }),
                  ])
                  .nullable(),
              )
              .exactOptional(),
            sticker_ids: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z.array(SnowflakeTypeSchema).max(3),
                  )
                  .nullable(),
              )
              .exactOptional(),
            components: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z
                      .array(
                        z.union([
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            components: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z
                                        .string()
                                        .min(1)
                                        .max(100)
                                        .nullable()
                                        .exactOptional(),
                                      style: z.union([
                                        z.coerce.number().pipe(z.literal(1)),
                                        z.coerce.number().pipe(z.literal(2)),
                                        z.coerce.number().pipe(z.literal(3)),
                                        z.coerce.number().pipe(z.literal(4)),
                                        z.coerce.number().pipe(z.literal(5)),
                                        z.coerce.number().pipe(z.literal(6)),
                                      ]),
                                      label: z.string().max(80).nullable().exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      url: z.url().max(512).nullable().exactOptional(),
                                      sku_id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      emoji: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.object({
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                name: z.string().max(32),
                                              }),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.literal('user'),
                                                      z.literal('role'),
                                                      z.literal('channel'),
                                                    ]),
                                                    id: SnowflakeTypeSchema,
                                                  }),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      channel_types: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.union([
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(1))
                                                      .meta({
                                                        description:
                                                          'A direct message between users',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(3))
                                                      .meta({
                                                        description:
                                                          'A direct message between multiple users',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(0))
                                                      .meta({
                                                        description:
                                                          'A text channel within a server',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(2))
                                                      .meta({
                                                        description:
                                                          'A voice channel within a server',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(4))
                                                      .meta({
                                                        description:
                                                          'An organizational category that contains up to 50 channels',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(5))
                                                      .meta({
                                                        description:
                                                          'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(10))
                                                      .meta({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(11))
                                                      .meta({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(12))
                                                      .meta({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(13))
                                                      .meta({
                                                        description:
                                                          'A voice channel for hosting events with an audience',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(14))
                                                      .meta({
                                                        description:
                                                          'The channel in a hub containing the listed servers',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(15))
                                                      .meta({
                                                        description:
                                                          'Channel that can only contain threads',
                                                      }),
                                                  ]),
                                                )
                                                .refine((val) => new Set(val).size === val.length),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.union([
                                                    z.object({
                                                      type: z.union([
                                                        z.literal('user'),
                                                        z.literal('role'),
                                                        z.literal('channel'),
                                                      ]),
                                                      id: SnowflakeTypeSchema,
                                                    }),
                                                    z.object({
                                                      type: z.union([
                                                        z.literal('user'),
                                                        z.literal('role'),
                                                        z.literal('channel'),
                                                      ]),
                                                      id: SnowflakeTypeSchema,
                                                    }),
                                                  ]),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.literal('user'),
                                                      z.literal('role'),
                                                      z.literal('channel'),
                                                    ]),
                                                    id: SnowflakeTypeSchema,
                                                  }),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      options: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.object({
                                              label: z.string().min(1).max(100),
                                              value: z.string().min(1).max(100),
                                              description: z
                                                .string()
                                                .max(100)
                                                .nullable()
                                                .exactOptional(),
                                              default: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z.stringbool().nullable(),
                                                )
                                                .exactOptional(),
                                              emoji: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z
                                                    .union([
                                                      z.preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.null().nullable(),
                                                      ),
                                                      z.object({
                                                        id: z
                                                          .preprocess(
                                                            (val) => (val === 'null' ? null : val),
                                                            z
                                                              .union([
                                                                z.preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z.null().nullable(),
                                                                ),
                                                                SnowflakeTypeSchema,
                                                              ])
                                                              .nullable(),
                                                          )
                                                          .exactOptional(),
                                                        name: z.string().max(32),
                                                      }),
                                                    ])
                                                    .nullable(),
                                                )
                                                .exactOptional(),
                                            }),
                                          )
                                          .min(1)
                                          .max(25),
                                      ),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.literal('user'),
                                                      z.literal('role'),
                                                      z.literal('channel'),
                                                    ]),
                                                    id: SnowflakeTypeSchema,
                                                  }),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                  ]),
                                )
                                .min(1)
                                .max(5),
                            ),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            accent_color: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().int().min(0).max(16777215).nullable(),
                              )
                              .exactOptional(),
                            components: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      components: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.union([
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z
                                                  .string()
                                                  .min(1)
                                                  .max(100)
                                                  .nullable()
                                                  .exactOptional(),
                                                style: z.union([
                                                  z.coerce.number().pipe(z.literal(1)),
                                                  z.coerce.number().pipe(z.literal(2)),
                                                  z.coerce.number().pipe(z.literal(3)),
                                                  z.coerce.number().pipe(z.literal(4)),
                                                  z.coerce.number().pipe(z.literal(5)),
                                                  z.coerce.number().pipe(z.literal(6)),
                                                ]),
                                                label: z
                                                  .string()
                                                  .max(80)
                                                  .nullable()
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                url: z.url().max(512).nullable().exactOptional(),
                                                sku_id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                emoji: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        z.object({
                                                          id: z
                                                            .preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z
                                                                .union([
                                                                  z.preprocess(
                                                                    (val) =>
                                                                      val === 'null' ? null : val,
                                                                    z.null().nullable(),
                                                                  ),
                                                                  SnowflakeTypeSchema,
                                                                ])
                                                                .nullable(),
                                                            )
                                                            .exactOptional(),
                                                          name: z.string().max(32),
                                                        }),
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.object({
                                                              type: z.union([
                                                                z.literal('user'),
                                                                z.literal('role'),
                                                                z.literal('channel'),
                                                              ]),
                                                              id: SnowflakeTypeSchema,
                                                            }),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                channel_types: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.union([
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(1))
                                                                .meta({
                                                                  description:
                                                                    'A direct message between users',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(3))
                                                                .meta({
                                                                  description:
                                                                    'A direct message between multiple users',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(0))
                                                                .meta({
                                                                  description:
                                                                    'A text channel within a server',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(2))
                                                                .meta({
                                                                  description:
                                                                    'A voice channel within a server',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(4))
                                                                .meta({
                                                                  description:
                                                                    'An organizational category that contains up to 50 channels',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(5))
                                                                .meta({
                                                                  description:
                                                                    'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(10))
                                                                .meta({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(11))
                                                                .meta({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(12))
                                                                .meta({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(13))
                                                                .meta({
                                                                  description:
                                                                    'A voice channel for hosting events with an audience',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(14))
                                                                .meta({
                                                                  description:
                                                                    'The channel in a hub containing the listed servers',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(15))
                                                                .meta({
                                                                  description:
                                                                    'Channel that can only contain threads',
                                                                }),
                                                            ]),
                                                          )
                                                          .refine(
                                                            (val) =>
                                                              new Set(val).size === val.length,
                                                          ),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.union([
                                                              z.object({
                                                                type: z.union([
                                                                  z.literal('user'),
                                                                  z.literal('role'),
                                                                  z.literal('channel'),
                                                                ]),
                                                                id: SnowflakeTypeSchema,
                                                              }),
                                                              z.object({
                                                                type: z.union([
                                                                  z.literal('user'),
                                                                  z.literal('role'),
                                                                  z.literal('channel'),
                                                                ]),
                                                                id: SnowflakeTypeSchema,
                                                              }),
                                                            ]),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.object({
                                                              type: z.union([
                                                                z.literal('user'),
                                                                z.literal('role'),
                                                                z.literal('channel'),
                                                              ]),
                                                              id: SnowflakeTypeSchema,
                                                            }),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                options: z.preprocess(
                                                  (val) =>
                                                    val === undefined || Array.isArray(val)
                                                      ? val
                                                      : [val],
                                                  z
                                                    .array(
                                                      z.object({
                                                        label: z.string().min(1).max(100),
                                                        value: z.string().min(1).max(100),
                                                        description: z
                                                          .string()
                                                          .max(100)
                                                          .nullable()
                                                          .exactOptional(),
                                                        default: z
                                                          .preprocess(
                                                            (val) => (val === 'null' ? null : val),
                                                            z.stringbool().nullable(),
                                                          )
                                                          .exactOptional(),
                                                        emoji: z
                                                          .preprocess(
                                                            (val) => (val === 'null' ? null : val),
                                                            z
                                                              .union([
                                                                z.preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z.null().nullable(),
                                                                ),
                                                                z.object({
                                                                  id: z
                                                                    .preprocess(
                                                                      (val) =>
                                                                        val === 'null' ? null : val,
                                                                      z
                                                                        .union([
                                                                          z.preprocess(
                                                                            (val) =>
                                                                              val === 'null'
                                                                                ? null
                                                                                : val,
                                                                            z.null().nullable(),
                                                                          ),
                                                                          SnowflakeTypeSchema,
                                                                        ])
                                                                        .nullable(),
                                                                    )
                                                                    .exactOptional(),
                                                                  name: z.string().max(32),
                                                                }),
                                                              ])
                                                              .nullable(),
                                                          )
                                                          .exactOptional(),
                                                      }),
                                                    )
                                                    .min(1)
                                                    .max(25),
                                                ),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.object({
                                                              type: z.union([
                                                                z.literal('user'),
                                                                z.literal('role'),
                                                                z.literal('channel'),
                                                              ]),
                                                              id: SnowflakeTypeSchema,
                                                            }),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                            ]),
                                          )
                                          .min(1)
                                          .max(5),
                                      ),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      spoiler: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      items: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.object({
                                              description: z
                                                .string()
                                                .min(1)
                                                .max(1024)
                                                .nullable()
                                                .exactOptional(),
                                              spoiler: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z.stringbool().nullable(),
                                                )
                                                .exactOptional(),
                                              media: UnfurledMediaRequestSchema,
                                            }),
                                          )
                                          .min(1)
                                          .max(10),
                                      ),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      components: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.object({
                                              type: z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({
                                                    description: 'Container for other components',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({ description: 'Button object' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(3))
                                                  .meta({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(4))
                                                  .meta({ description: 'Text input object' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(5))
                                                  .meta({ description: 'Select menu for users' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(6))
                                                  .meta({ description: 'Select menu for roles' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(7))
                                                  .meta({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(8))
                                                  .meta({
                                                    description: 'Select menu for channels',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(9))
                                                  .meta({ description: 'Section component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(10))
                                                  .meta({ description: 'Text component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(11))
                                                  .meta({ description: 'Thumbnail component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(12))
                                                  .meta({ description: 'Media gallery component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(13))
                                                  .meta({ description: 'File component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(14))
                                                  .meta({ description: 'Separator component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(17))
                                                  .meta({ description: 'Container component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(18))
                                                  .meta({ description: 'Label component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(19))
                                                  .meta({ description: 'File upload component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(21))
                                                  .meta({ description: 'Radio group component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(22))
                                                  .meta({
                                                    description: 'Checkbox group component',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(23))
                                                  .meta({ description: 'Checkbox component' }),
                                              ]),
                                              id: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.int32().min(0))
                                                    .nullable(),
                                                )
                                                .exactOptional(),
                                              content: z.string().min(1).max(4000),
                                            }),
                                          )
                                          .min(1)
                                          .max(3),
                                      ),
                                      accessory: z.union([
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          custom_id: z
                                            .string()
                                            .min(1)
                                            .max(100)
                                            .nullable()
                                            .exactOptional(),
                                          style: z.union([
                                            z.coerce.number().pipe(z.literal(1)),
                                            z.coerce.number().pipe(z.literal(2)),
                                            z.coerce.number().pipe(z.literal(3)),
                                            z.coerce.number().pipe(z.literal(4)),
                                            z.coerce.number().pipe(z.literal(5)),
                                            z.coerce.number().pipe(z.literal(6)),
                                          ]),
                                          label: z.string().max(80).nullable().exactOptional(),
                                          disabled: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          url: z.url().max(512).nullable().exactOptional(),
                                          sku_id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  SnowflakeTypeSchema,
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          emoji: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  z.object({
                                                    id: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                    name: z.string().max(32),
                                                  }),
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                        }),
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .min(1)
                                            .max(1024)
                                            .nullable()
                                            .exactOptional(),
                                          spoiler: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      ]),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      spacing: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({ description: 'Small spacing' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({ description: 'Large spacing' }),
                                              ]),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      divider: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      content: z.string().min(1).max(4000),
                                    }),
                                  ]),
                                )
                                .min(1)
                                .max(40),
                            ),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            items: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    description: z
                                      .string()
                                      .min(1)
                                      .max(1024)
                                      .nullable()
                                      .exactOptional(),
                                    spoiler: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    media: UnfurledMediaRequestSchema,
                                  }),
                                )
                                .min(1)
                                .max(10),
                            ),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            components: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    type: z.union([
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(1))
                                        .meta({ description: 'Container for other components' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(2))
                                        .meta({ description: 'Button object' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(3))
                                        .meta({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(4))
                                        .meta({ description: 'Text input object' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(5))
                                        .meta({ description: 'Select menu for users' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(6))
                                        .meta({ description: 'Select menu for roles' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(7))
                                        .meta({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(8))
                                        .meta({ description: 'Select menu for channels' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(9))
                                        .meta({ description: 'Section component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(10))
                                        .meta({ description: 'Text component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(11))
                                        .meta({ description: 'Thumbnail component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(12))
                                        .meta({ description: 'Media gallery component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(13))
                                        .meta({ description: 'File component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(14))
                                        .meta({ description: 'Separator component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(17))
                                        .meta({ description: 'Container component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(18))
                                        .meta({ description: 'Label component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(19))
                                        .meta({ description: 'File upload component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(21))
                                        .meta({ description: 'Radio group component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(22))
                                        .meta({ description: 'Checkbox group component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(23))
                                        .meta({ description: 'Checkbox component' }),
                                    ]),
                                    id: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                      )
                                      .exactOptional(),
                                    content: z.string().min(1).max(4000),
                                  }),
                                )
                                .min(1)
                                .max(3),
                            ),
                            accessory: z.union([
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                                style: z.union([
                                  z.coerce.number().pipe(z.literal(1)),
                                  z.coerce.number().pipe(z.literal(2)),
                                  z.coerce.number().pipe(z.literal(3)),
                                  z.coerce.number().pipe(z.literal(4)),
                                  z.coerce.number().pipe(z.literal(5)),
                                  z.coerce.number().pipe(z.literal(6)),
                                ]),
                                label: z.string().max(80).nullable().exactOptional(),
                                disabled: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                url: z.url().max(512).nullable().exactOptional(),
                                sku_id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .nullable(),
                                  )
                                  .exactOptional(),
                                emoji: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        z.object({
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  SnowflakeTypeSchema,
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          name: z.string().max(32),
                                        }),
                                      ])
                                      .nullable(),
                                  )
                                  .exactOptional(),
                              }),
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().min(1).max(1024).nullable().exactOptional(),
                                spoiler: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                media: UnfurledMediaRequestSchema,
                              }),
                            ]),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            spacing: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.union([
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(1))
                                        .meta({ description: 'Small spacing' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(2))
                                        .meta({ description: 'Large spacing' }),
                                    ]),
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                            divider: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            content: z.string().min(1).max(4000),
                          }),
                        ]),
                      )
                      .max(40),
                  )
                  .nullable(),
              )
              .exactOptional(),
            flags: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z.coerce.number().int().nullable(),
              )
              .exactOptional(),
            attachments: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z
                      .array(
                        z.object({
                          id: SnowflakeTypeSchema,
                          filename: z.string().min(1).max(1024).nullable().exactOptional(),
                          description: z.string().max(1024).nullable().exactOptional(),
                          duration_secs: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z.coerce.number().min(0).max(2147483647).nullable(),
                            )
                            .exactOptional(),
                          waveform: z.string().max(400).nullable().exactOptional(),
                          title: z.string().max(1024).nullable().exactOptional(),
                          is_spoiler: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z.stringbool().nullable(),
                            )
                            .exactOptional(),
                        }),
                      )
                      .max(10),
                  )
                  .nullable(),
              )
              .exactOptional(),
            poll: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .union([
                    z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                    z.object({
                      question: z
                        .object({
                          text: z
                            .string()
                            .min(1)
                            .max(300)
                            .nullable()
                            .meta({ description: 'The text of the field' })
                            .exactOptional(),
                          emoji: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    id: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z
                                          .union([
                                            z.preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.null().nullable(),
                                            ),
                                            SnowflakeTypeSchema,
                                          ])
                                          .meta({ description: 'The ID of the custom emoji' })
                                          .nullable(),
                                      )
                                      .exactOptional(),
                                    name: z
                                      .string()
                                      .max(32)
                                      .nullable()
                                      .meta({
                                        description:
                                          'The name of the emoji, or the unicode emoji character',
                                      })
                                      .exactOptional(),
                                    animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z
                                          .stringbool()
                                          .nullable()
                                          .meta({ description: 'Whether the emoji is animated' }),
                                      )
                                      .exactOptional(),
                                  }),
                                ])
                                .meta({ description: 'The emoji of the field' })
                                .nullable(),
                            )
                            .exactOptional(),
                        })
                        .meta({
                          description: 'The question of the poll. Only `text` is supported.',
                        }),
                      answers: z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                poll_media: z
                                  .object({
                                    text: z
                                      .string()
                                      .min(1)
                                      .max(300)
                                      .nullable()
                                      .meta({ description: 'The text of the field' })
                                      .exactOptional(),
                                    emoji: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z
                                          .union([
                                            z.preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.null().nullable(),
                                            ),
                                            z.object({
                                              id: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z
                                                    .union([
                                                      z.preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.null().nullable(),
                                                      ),
                                                      SnowflakeTypeSchema,
                                                    ])
                                                    .meta({
                                                      description: 'The ID of the custom emoji',
                                                    })
                                                    .nullable(),
                                                )
                                                .exactOptional(),
                                              name: z
                                                .string()
                                                .max(32)
                                                .nullable()
                                                .meta({
                                                  description:
                                                    'The name of the emoji, or the unicode emoji character',
                                                })
                                                .exactOptional(),
                                              animated: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z
                                                    .stringbool()
                                                    .nullable()
                                                    .meta({
                                                      description: 'Whether the emoji is animated',
                                                    }),
                                                )
                                                .exactOptional(),
                                            }),
                                          ])
                                          .meta({ description: 'The emoji of the field' })
                                          .nullable(),
                                      )
                                      .exactOptional(),
                                  })
                                  .meta({ description: 'The data of the answer' }),
                              }),
                            )
                            .min(1)
                            .max(10),
                        )
                        .meta({
                          description: 'Each of the answers available in the poll, up to 10',
                        }),
                      allow_multiselect: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .stringbool()
                            .nullable()
                            .meta({ description: 'Whether a user can select multiple answers' }),
                        )
                        .exactOptional(),
                      layout_type: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.union([
                                z.coerce
                                  .number()
                                  .pipe(z.literal(1))
                                  .meta({ description: 'The, uhm, default layout type.' }),
                              ]),
                            ])
                            .meta({
                              description: 'The layout type of the poll. Defaults to... DEFAULT!',
                            })
                            .nullable(),
                        )
                        .exactOptional(),
                      duration: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce
                            .number()
                            .pipe(z.int32().min(1).max(768))
                            .nullable()
                            .meta({
                              description:
                                'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
                            }),
                        )
                        .exactOptional(),
                    }),
                  ])
                  .nullable(),
              )
              .exactOptional(),
            shared_client_theme: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .union([
                    z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                    z.object({
                      colors: z.preprocess(
                        (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                        z.array(z.string().length(6)).min(1).max(5),
                      ),
                      gradient_angle: z.coerce.number().pipe(z.int32().min(0).max(360)),
                      base_mix: z.coerce.number().pipe(z.int32().min(0).max(100)),
                      base_theme: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.union([
                                z.coerce
                                  .number()
                                  .pipe(z.literal(0))
                                  .meta({ description: 'No base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(1))
                                  .meta({ description: 'Dark base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(2))
                                  .meta({ description: 'Light base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(3))
                                  .meta({ description: 'Darker base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(4))
                                  .meta({ description: 'Midnight base theme' }),
                              ]),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                    }),
                  ])
                  .nullable(),
              )
              .exactOptional(),
          }),
        }),
        z.object({
          name: z.string().min(1).max(100),
          auto_archive_duration: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce.number().pipe(z.literal(60)).meta({ description: 'One hour' }),
                    z.coerce.number().pipe(z.literal(1440)).meta({ description: 'One day' }),
                    z.coerce.number().pipe(z.literal(4320)).meta({ description: 'Three days' }),
                    z.coerce.number().pipe(z.literal(10080)).meta({ description: 'Seven days' }),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          rate_limit_per_user: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().pipe(z.int32().min(0).max(21600)).nullable(),
            )
            .exactOptional(),
          type: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce
                      .number()
                      .pipe(z.literal(1))
                      .meta({ description: 'A direct message between users' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(3))
                      .meta({ description: 'A direct message between multiple users' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(0))
                      .meta({ description: 'A text channel within a server' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(2))
                      .meta({ description: 'A voice channel within a server' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(4))
                      .meta({
                        description: 'An organizational category that contains up to 50 channels',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(5))
                      .meta({
                        description:
                          'A channel that users can follow and crosspost into their own server (formerly news channels)',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(10))
                      .meta({
                        description: 'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(11))
                      .meta({
                        description:
                          'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(12))
                      .meta({
                        description:
                          'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(13))
                      .meta({ description: 'A voice channel for hosting events with an audience' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(14))
                      .meta({ description: 'The channel in a hub containing the listed servers' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(15))
                      .meta({ description: 'Channel that can only contain threads' }),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          invitable: z
            .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
            .exactOptional(),
        }),
      ]),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/threads/archived/private',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.coerce.number().int().min(2).max(100).exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/threads/archived/public',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.coerce.number().int().min(2).max(100).exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/threads/search',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        name: z.string().max(100).exactOptional(),
        slop: z.coerce.number().int().min(0).max(100).exactOptional(),
        min_id: SnowflakeTypeSchema.exactOptional(),
        max_id: SnowflakeTypeSchema.exactOptional(),
        tag: z
          .union([
            z.string(),
            z.preprocess(
              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
              z
                .array(SnowflakeTypeSchema)
                .max(20)
                .refine((val) => new Set(val).size === val.length),
            ),
          ])
          .exactOptional(),
        tag_setting: z
          .union([
            z
              .literal('match_all')
              .meta({ description: 'The thread tags must contain all tags in the search query' }),
            z
              .literal('match_some')
              .meta({
                description:
                  'The thread tags must contain at least one of tags in the search query',
              }),
          ])
          .exactOptional(),
        archived: z.stringbool().exactOptional(),
        sort_by: z
          .union([
            z.literal('relevance'),
            z.literal('creation_time'),
            z.literal('last_message_time'),
            z.literal('archive_time'),
          ])
          .exactOptional(),
        sort_order: z.union([z.literal('asc'), z.literal('desc')]).exactOptional(),
        limit: z.coerce.number().int().min(1).max(25).exactOptional(),
        offset: z.coerce.number().int().min(0).max(9975).exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/typing',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/users/@me/threads/archived/private',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        before: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(2).max(100).exactOptional(),
      }),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/voice-status',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({
        status: z
          .string()
          .max(500)
          .nullable()
          .meta({ description: 'The new voice channel status' })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/webhooks',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/webhooks',
    sValidator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    sValidator(
      'json',
      z.object({ name: z.string().min(1).max(80), avatar: z.string().nullable().exactOptional() }),
    ),
    (c) => {},
  )
