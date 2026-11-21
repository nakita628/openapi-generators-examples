import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  ApplicationCommandAutocompleteCallbackRequestSchema,
  CreateMessageInteractionCallbackRequestSchema,
  InteractionCallbackResponseSchema,
  LaunchActivityInteractionCallbackRequestSchema,
  ModalInteractionCallbackRequestSchema,
  PongInteractionCallbackRequestSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  SnowflakeTypeSchema,
  SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UpdateMessageInteractionCallbackRequestSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const interactionsHandler = new Hono().post(
  '/interactions/:interaction_id/:interaction_token/callback',
  describeRoute({
    operationId: 'create_interaction_response',
    responses: {
      '200': {
        description: '200 response for create_interaction_response',
        headers: {
          'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
          'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
          'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
          'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
          'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
        },
        content: { 'application/json': { schema: resolver(InteractionCallbackResponseSchema) } },
      },
      '204': {
        description: '204 response for create_interaction_response',
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
    security: [{}, { BotToken: [] }],
  }),
  validator(
    'param',
    z.object({ interaction_id: SnowflakeTypeSchema, interaction_token: z.string().max(152133) }),
  ),
  validator('query', z.object({ with_response: z.stringbool().exactOptional() })),
  validator(
    'json',
    z.union([
      ApplicationCommandAutocompleteCallbackRequestSchema,
      CreateMessageInteractionCallbackRequestSchema,
      LaunchActivityInteractionCallbackRequestSchema,
      ModalInteractionCallbackRequestSchema,
      PongInteractionCallbackRequestSchema,
      SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema,
      UpdateMessageInteractionCallbackRequestSchema,
    ]),
  ),
  validator(
    'form',
    z.union([
      z.object({
        type: z.union([
          z.coerce.number().pipe(z.literal(1)),
          z.coerce.number().pipe(z.literal(4)),
          z.coerce.number().pipe(z.literal(5)),
          z.coerce.number().pipe(z.literal(6)),
          z.coerce.number().pipe(z.literal(7)),
          z.coerce.number().pipe(z.literal(8)),
          z.coerce.number().pipe(z.literal(9)),
          z.coerce.number().pipe(z.literal(12)),
          z.coerce.number().pipe(z.literal(13)),
        ]),
        data: z.union([
          z.object({
            choices: z
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
                              z.object({
                                name: z.string().min(1).max(100),
                                name_localizations: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.record(z.string(), z.string().min(1).max(100)).nullable(),
                                  )
                                  .exactOptional(),
                                value: z.coerce
                                  .bigint()
                                  .pipe(z.int64().min(-9007199254740991n).max(9007199254740991n)),
                              }),
                            ])
                            .nullable(),
                        ),
                      )
                      .max(25),
                  )
                  .nullable(),
              )
              .exactOptional(),
          }),
          z.object({
            choices: z
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
                              z.object({
                                name: z.string().min(1).max(100),
                                name_localizations: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.record(z.string(), z.string().min(1).max(100)).nullable(),
                                  )
                                  .exactOptional(),
                                value: z.coerce.number(),
                              }),
                            ])
                            .nullable(),
                        ),
                      )
                      .max(25),
                  )
                  .nullable(),
              )
              .exactOptional(),
          }),
          z.object({
            choices: z
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
                              z.object({
                                name: z.string().min(1).max(100),
                                name_localizations: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.record(z.string(), z.string().min(1).max(100)).nullable(),
                                  )
                                  .exactOptional(),
                                value: z.string().max(6000),
                              }),
                            ])
                            .nullable(),
                        ),
                      )
                      .max(25),
                  )
                  .nullable(),
              )
              .exactOptional(),
          }),
        ]),
      }),
      z.object({
        type: z.union([
          z.coerce.number().pipe(z.literal(1)),
          z.coerce.number().pipe(z.literal(4)),
          z.coerce.number().pipe(z.literal(5)),
          z.coerce.number().pipe(z.literal(6)),
          z.coerce.number().pipe(z.literal(7)),
          z.coerce.number().pipe(z.literal(8)),
          z.coerce.number().pipe(z.literal(9)),
          z.coerce.number().pipe(z.literal(12)),
          z.coerce.number().pipe(z.literal(13)),
        ]),
        data: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  content: z.string().max(2000).nullable().exactOptional(),
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
                                timestamp: z.iso
                                  .datetime({ offset: true })
                                  .nullable()
                                  .exactOptional(),
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
                                          placeholder: z
                                            .string()
                                            .max(64)
                                            .nullable()
                                            .exactOptional(),
                                          placeholder_version: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce
                                                .number()
                                                .int()
                                                .min(0)
                                                .max(2147483647)
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          is_animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .max(4096)
                                            .nullable()
                                            .exactOptional(),
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
                                          placeholder: z
                                            .string()
                                            .max(64)
                                            .nullable()
                                            .exactOptional(),
                                          placeholder_version: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce
                                                .number()
                                                .int()
                                                .min(0)
                                                .max(2147483647)
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          is_animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .max(4096)
                                            .nullable()
                                            .exactOptional(),
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
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
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
                                          placeholder: z
                                            .string()
                                            .max(64)
                                            .nullable()
                                            .exactOptional(),
                                          placeholder_version: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce
                                                .number()
                                                .int()
                                                .min(0)
                                                .max(2147483647)
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          is_animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .max(4096)
                                            .nullable()
                                            .exactOptional(),
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
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
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
                                                description:
                                                  'Controls @everyone and @here mentions',
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
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
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
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
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
                                  accent_color: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(16777215).nullable(),
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
                                            components: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.union([
                                                    z.object({
                                                      type: z.union([
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(1))
                                                          .meta({
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                      url: z
                                                        .url()
                                                        .max(512)
                                                        .nullable()
                                                        .exactOptional(),
                                                      sku_id: z
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
                                                    z.object({
                                                      type: z.union([
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(1))
                                                          .meta({
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                                    new Set(val).size ===
                                                                    val.length,
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z.stringbool().nullable(),
                                                                )
                                                                .exactOptional(),
                                                              emoji: z
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
                                                                      z.object({
                                                                        id: z
                                                                          .preprocess(
                                                                            (val) =>
                                                                              val === 'null'
                                                                                ? null
                                                                                : val,
                                                                            z
                                                                              .union([
                                                                                z.preprocess(
                                                                                  (val) =>
                                                                                    val === 'null'
                                                                                      ? null
                                                                                      : val,
                                                                                  z
                                                                                    .null()
                                                                                    .nullable(),
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                            items: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
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
                                            components: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(1))
                                                        .meta({
                                                          description:
                                                            'Container for other components',
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
                                                        .meta({
                                                          description: 'Select menu for users',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(6))
                                                        .meta({
                                                          description: 'Select menu for roles',
                                                        }),
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
                                                        .meta({
                                                          description: 'Thumbnail component',
                                                        }),
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
                                                        .meta({
                                                          description: 'Separator component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(17))
                                                        .meta({
                                                          description: 'Container component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(18))
                                                        .meta({ description: 'Label component' }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(19))
                                                        .meta({
                                                          description: 'File upload component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(21))
                                                        .meta({
                                                          description: 'Radio group component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(22))
                                                        .meta({
                                                          description: 'Checkbox group component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(23))
                                                        .meta({
                                                          description: 'Checkbox component',
                                                        }),
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
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ])
                                                          .meta({
                                                            description:
                                                              'The ID of the custom emoji',
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
                                                            description:
                                                              'Whether the emoji is animated',
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
                                  .meta({
                                    description: 'Whether a user can select multiple answers',
                                  }),
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
                                    description:
                                      'The layout type of the poll. Defaults to... DEFAULT!',
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
                  tts: z
                    .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
                    .exactOptional(),
                  flags: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z.coerce.number().int().nullable(),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
      }),
      z.object({
        type: z.union([
          z.coerce.number().pipe(z.literal(1)),
          z.coerce.number().pipe(z.literal(4)),
          z.coerce.number().pipe(z.literal(5)),
          z.coerce.number().pipe(z.literal(6)),
          z.coerce.number().pipe(z.literal(7)),
          z.coerce.number().pipe(z.literal(8)),
          z.coerce.number().pipe(z.literal(9)),
          z.coerce.number().pipe(z.literal(12)),
          z.coerce.number().pipe(z.literal(13)),
        ]),
      }),
      z.object({
        type: z.union([
          z.coerce.number().pipe(z.literal(1)),
          z.coerce.number().pipe(z.literal(4)),
          z.coerce.number().pipe(z.literal(5)),
          z.coerce.number().pipe(z.literal(6)),
          z.coerce.number().pipe(z.literal(7)),
          z.coerce.number().pipe(z.literal(8)),
          z.coerce.number().pipe(z.literal(9)),
          z.coerce.number().pipe(z.literal(12)),
          z.coerce.number().pipe(z.literal(13)),
        ]),
        data: z.object({
          custom_id: z.string().min(1).max(100),
          title: z.string().min(1).max(45),
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
                      z.coerce.number().pipe(z.literal(2)).meta({ description: 'Button object' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(3))
                        .meta({ description: 'Select menu for picking from defined text options' }),
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
                        .meta({ description: 'Select menu for mentionables (users and roles)' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(8))
                        .meta({ description: 'Select menu for channels' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(9))
                        .meta({ description: 'Section component' }),
                      z.coerce.number().pipe(z.literal(10)).meta({ description: 'Text component' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(11))
                        .meta({ description: 'Thumbnail component' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(12))
                        .meta({ description: 'Media gallery component' }),
                      z.coerce.number().pipe(z.literal(13)).meta({ description: 'File component' }),
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
                            custom_id: z.string().min(1).max(100),
                            style: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Single-line input' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Multi-line input' }),
                            ]),
                            label: z.string().min(1).max(45).nullable().exactOptional(),
                            value: z.string().max(4000).nullable().exactOptional(),
                            placeholder: z.string().max(100).nullable().exactOptional(),
                            required: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            min_length: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().int().min(0).max(4000).nullable(),
                              )
                              .exactOptional(),
                            max_length: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().int().min(1).max(4000).nullable(),
                              )
                              .exactOptional(),
                          }),
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
                      z.coerce.number().pipe(z.literal(2)).meta({ description: 'Button object' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(3))
                        .meta({ description: 'Select menu for picking from defined text options' }),
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
                        .meta({ description: 'Select menu for mentionables (users and roles)' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(8))
                        .meta({ description: 'Select menu for channels' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(9))
                        .meta({ description: 'Section component' }),
                      z.coerce.number().pipe(z.literal(10)).meta({ description: 'Text component' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(11))
                        .meta({ description: 'Thumbnail component' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(12))
                        .meta({ description: 'Media gallery component' }),
                      z.coerce.number().pipe(z.literal(13)).meta({ description: 'File component' }),
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
                    label: z.string().min(1).max(45),
                    description: z.string().min(1).max(100).nullable().exactOptional(),
                    component: z.union([
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
                                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
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
                                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                                z
                                  .array(
                                    z.union([
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(1))
                                        .meta({ description: 'A direct message between users' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(3))
                                        .meta({
                                          description: 'A direct message between multiple users',
                                        }),
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
                                          description: 'Channel that can only contain threads',
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
                        custom_id: z.string().min(1).max(100),
                        default: z
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
                        custom_id: z.string().min(1).max(100),
                        min_values: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(0).max(10).nullable(),
                          )
                          .exactOptional(),
                        max_values: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(1).max(10).nullable(),
                          )
                          .exactOptional(),
                        required: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        options: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                label: z.string().min(1).max(100),
                                value: z.string().min(1).max(100),
                                description: z.string().max(100).nullable().exactOptional(),
                                default: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
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
                        custom_id: z.string().min(1).max(100),
                        min_values: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(0).max(10).nullable(),
                          )
                          .exactOptional(),
                        max_values: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(1).max(10).nullable(),
                          )
                          .exactOptional(),
                        required: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        file_types: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z
                              .preprocess(
                                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                                z
                                  .array(z.string().min(1).max(16))
                                  .max(10)
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
                                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
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
                        custom_id: z.string().min(1).max(100),
                        required: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        options: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                label: z.string().min(1).max(100),
                                value: z.string().min(1).max(100),
                                description: z.string().max(100).nullable().exactOptional(),
                                default: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                              }),
                            )
                            .min(2)
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
                                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
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
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                label: z.string().min(1).max(100),
                                value: z.string().min(1).max(100),
                                description: z.string().max(100).nullable().exactOptional(),
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
                        custom_id: z.string().min(1).max(100),
                        style: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Single-line input' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Multi-line input' }),
                        ]),
                        label: z.string().min(1).max(45).nullable().exactOptional(),
                        value: z.string().max(4000).nullable().exactOptional(),
                        placeholder: z.string().max(100).nullable().exactOptional(),
                        required: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        min_length: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(0).max(4000).nullable(),
                          )
                          .exactOptional(),
                        max_length: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(1).max(4000).nullable(),
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
                                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
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
                  }),
                  z.object({
                    type: z.union([
                      z.coerce
                        .number()
                        .pipe(z.literal(1))
                        .meta({ description: 'Container for other components' }),
                      z.coerce.number().pipe(z.literal(2)).meta({ description: 'Button object' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(3))
                        .meta({ description: 'Select menu for picking from defined text options' }),
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
                        .meta({ description: 'Select menu for mentionables (users and roles)' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(8))
                        .meta({ description: 'Select menu for channels' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(9))
                        .meta({ description: 'Section component' }),
                      z.coerce.number().pipe(z.literal(10)).meta({ description: 'Text component' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(11))
                        .meta({ description: 'Thumbnail component' }),
                      z.coerce
                        .number()
                        .pipe(z.literal(12))
                        .meta({ description: 'Media gallery component' }),
                      z.coerce.number().pipe(z.literal(13)).meta({ description: 'File component' }),
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
        }),
      }),
      z.object({
        type: z.union([
          z.coerce.number().pipe(z.literal(1)),
          z.coerce.number().pipe(z.literal(4)),
          z.coerce.number().pipe(z.literal(5)),
          z.coerce.number().pipe(z.literal(6)),
          z.coerce.number().pipe(z.literal(7)),
          z.coerce.number().pipe(z.literal(8)),
          z.coerce.number().pipe(z.literal(9)),
          z.coerce.number().pipe(z.literal(12)),
          z.coerce.number().pipe(z.literal(13)),
        ]),
      }),
      z.object({
        type: z.union([
          z.coerce.number().pipe(z.literal(1)),
          z.coerce.number().pipe(z.literal(4)),
          z.coerce.number().pipe(z.literal(5)),
          z.coerce.number().pipe(z.literal(6)),
          z.coerce.number().pipe(z.literal(7)),
          z.coerce.number().pipe(z.literal(8)),
          z.coerce.number().pipe(z.literal(9)),
          z.coerce.number().pipe(z.literal(12)),
          z.coerce.number().pipe(z.literal(13)),
        ]),
        data: z.object({
          eligible: z.stringbool(),
          ineligible_reason: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce.number().pipe(z.literal(0)).meta({ description: 'Other / catch-all' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(1))
                      .meta({ description: 'User already owns this SKU or one of its components' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(2))
                      .meta({ description: 'User account is not on an eligible platform' }),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          ineligible_reason_description: z.string().max(255).nullable().exactOptional(),
        }),
      }),
      z.object({
        type: z.union([
          z.coerce.number().pipe(z.literal(1)),
          z.coerce.number().pipe(z.literal(4)),
          z.coerce.number().pipe(z.literal(5)),
          z.coerce.number().pipe(z.literal(6)),
          z.coerce.number().pipe(z.literal(7)),
          z.coerce.number().pipe(z.literal(8)),
          z.coerce.number().pipe(z.literal(9)),
          z.coerce.number().pipe(z.literal(12)),
          z.coerce.number().pipe(z.literal(13)),
        ]),
        data: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  content: z.string().max(2000).nullable().exactOptional(),
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
                                timestamp: z.iso
                                  .datetime({ offset: true })
                                  .nullable()
                                  .exactOptional(),
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
                                          placeholder: z
                                            .string()
                                            .max(64)
                                            .nullable()
                                            .exactOptional(),
                                          placeholder_version: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce
                                                .number()
                                                .int()
                                                .min(0)
                                                .max(2147483647)
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          is_animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .max(4096)
                                            .nullable()
                                            .exactOptional(),
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
                                          placeholder: z
                                            .string()
                                            .max(64)
                                            .nullable()
                                            .exactOptional(),
                                          placeholder_version: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce
                                                .number()
                                                .int()
                                                .min(0)
                                                .max(2147483647)
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          is_animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .max(4096)
                                            .nullable()
                                            .exactOptional(),
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
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
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
                                          placeholder: z
                                            .string()
                                            .max(64)
                                            .nullable()
                                            .exactOptional(),
                                          placeholder_version: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce
                                                .number()
                                                .int()
                                                .min(0)
                                                .max(2147483647)
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          is_animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .max(4096)
                                            .nullable()
                                            .exactOptional(),
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
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
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
                                                description:
                                                  'Controls @everyone and @here mentions',
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
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
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
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
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
                                  accent_color: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(16777215).nullable(),
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
                                            components: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.union([
                                                    z.object({
                                                      type: z.union([
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(1))
                                                          .meta({
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                      url: z
                                                        .url()
                                                        .max(512)
                                                        .nullable()
                                                        .exactOptional(),
                                                      sku_id: z
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
                                                    z.object({
                                                      type: z.union([
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(1))
                                                          .meta({
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                                    new Set(val).size ===
                                                                    val.length,
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z.stringbool().nullable(),
                                                                )
                                                                .exactOptional(),
                                                              emoji: z
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
                                                                      z.object({
                                                                        id: z
                                                                          .preprocess(
                                                                            (val) =>
                                                                              val === 'null'
                                                                                ? null
                                                                                : val,
                                                                            z
                                                                              .union([
                                                                                z.preprocess(
                                                                                  (val) =>
                                                                                    val === 'null'
                                                                                      ? null
                                                                                      : val,
                                                                                  z
                                                                                    .null()
                                                                                    .nullable(),
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
                                                            description:
                                                              'Container for other components',
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
                                                          .meta({
                                                            description: 'Text input object',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(5))
                                                          .meta({
                                                            description: 'Select menu for users',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(6))
                                                          .meta({
                                                            description: 'Select menu for roles',
                                                          }),
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
                                                          .meta({
                                                            description: 'Section component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(10))
                                                          .meta({ description: 'Text component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(11))
                                                          .meta({
                                                            description: 'Thumbnail component',
                                                          }),
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
                                                          .meta({
                                                            description: 'Separator component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(17))
                                                          .meta({
                                                            description: 'Container component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(18))
                                                          .meta({ description: 'Label component' }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(19))
                                                          .meta({
                                                            description: 'File upload component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(21))
                                                          .meta({
                                                            description: 'Radio group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(22))
                                                          .meta({
                                                            description: 'Checkbox group component',
                                                          }),
                                                        z.coerce
                                                          .number()
                                                          .pipe(z.literal(23))
                                                          .meta({
                                                            description: 'Checkbox component',
                                                          }),
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
                                                                val === undefined ||
                                                                Array.isArray(val)
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
                                            items: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
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
                                            components: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(1))
                                                        .meta({
                                                          description:
                                                            'Container for other components',
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
                                                        .meta({
                                                          description: 'Select menu for users',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(6))
                                                        .meta({
                                                          description: 'Select menu for roles',
                                                        }),
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
                                                        .meta({
                                                          description: 'Thumbnail component',
                                                        }),
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
                                                        .meta({
                                                          description: 'Separator component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(17))
                                                        .meta({
                                                          description: 'Container component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(18))
                                                        .meta({ description: 'Label component' }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(19))
                                                        .meta({
                                                          description: 'File upload component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(21))
                                                        .meta({
                                                          description: 'Radio group component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(22))
                                                        .meta({
                                                          description: 'Checkbox group component',
                                                        }),
                                                      z.coerce
                                                        .number()
                                                        .pipe(z.literal(23))
                                                        .meta({
                                                          description: 'Checkbox component',
                                                        }),
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
                  flags: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z.coerce.number().int().nullable(),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
      }),
    ]),
  ),
  (c) => { throw new Error('Not implemented') },
)
