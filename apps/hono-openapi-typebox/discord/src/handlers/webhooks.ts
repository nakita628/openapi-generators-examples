import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  AllowedMentionTypesSchema,
  ApplicationIncomingWebhookResponseSchema,
  ButtonStyleTypesSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelSelectDefaultValueSchema,
  ChannelTypesSchema,
  ComponentEmojiForRequestSchema,
  GithubWebhookSchema,
  GuildIncomingWebhookResponseSchema,
  IncomingWebhookRequestPartialSchema,
  IncomingWebhookUpdateRequestPartialSchema,
  MessageComponentSeparatorSpacingSizeSchema,
  MessageComponentTypesSchema,
  MessageResponseSchema,
  PollLayoutTypesSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  RoleSelectDefaultValueSchema,
  SlackWebhookSchema,
  SnowflakeTypeSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UserSelectDefaultValueSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const webhooksHandler = new Hono()
  .get(
    '/webhooks/:webhook_id',
    describeRoute({
      operationId: 'get_webhook',
      responses: {
        '200': {
          description: '200 response for get_webhook',
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
                Compile(
                  Type.Union([
                    ApplicationIncomingWebhookResponseSchema,
                    ChannelFollowerWebhookResponseSchema,
                    GuildIncomingWebhookResponseSchema,
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
    validator('param', Compile(Type.Object({ webhook_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .delete(
    '/webhooks/:webhook_id',
    describeRoute({
      operationId: 'delete_webhook',
      responses: {
        '204': {
          description: '204 response for delete_webhook',
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
    validator('param', Compile(Type.Object({ webhook_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .patch(
    '/webhooks/:webhook_id',
    describeRoute({
      operationId: 'update_webhook',
      responses: {
        '200': {
          description: '200 response for update_webhook',
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
                Compile(
                  Type.Union([
                    ApplicationIncomingWebhookResponseSchema,
                    ChannelFollowerWebhookResponseSchema,
                    GuildIncomingWebhookResponseSchema,
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
    validator('param', Compile(Type.Object({ webhook_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.Optional(Type.String({ minLength: 1, maxLength: 80 })),
          avatar: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          channel_id: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/webhooks/:webhook_id/:webhook_token',
    describeRoute({
      operationId: 'get_webhook_by_token',
      responses: {
        '200': {
          description: '200 response for get_webhook_by_token',
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
                Compile(
                  Type.Union([
                    ApplicationIncomingWebhookResponseSchema,
                    ChannelFollowerWebhookResponseSchema,
                    GuildIncomingWebhookResponseSchema,
                  ]),
                ),
              ),
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/webhooks/:webhook_id/:webhook_token',
    describeRoute({
      operationId: 'execute_webhook',
      responses: {
        '200': {
          description: '200 response for execute_webhook',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '204': {
          description: '204 response for execute_webhook',
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          wait: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          thread_id: Type.Optional(SnowflakeTypeSchema),
          with_components: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    validator(
      'json',
      Compile(
        Type.Union([
          IncomingWebhookRequestPartialSchema,
          IncomingWebhookUpdateRequestPartialSchema,
        ]),
      ),
    ),
    validator(
      'form',
      Compile(
        Type.Union([
          Type.Object({
            content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
            embeds: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    type: Type.Optional(
                      Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                    ),
                    url: Type.Optional(
                      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                    ),
                    title: Type.Optional(
                      Type.Union([Type.String({ maxLength: 256 }), Type.Null()]),
                    ),
                    color: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    timestamp: Type.Optional(
                      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
                    ),
                    description: Type.Optional(
                      Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                    ),
                    author: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAuthorSchema]),
                    ),
                    image: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    thumbnail: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    footer: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedFooterSchema]),
                    ),
                    fields: Type.Optional(
                      Type.Union([
                        Type.Array(
                          Type.Object({
                            name: Type.String({ maxLength: 256 }),
                            value: Type.String({ maxLength: 1024 }),
                            inline: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          { maxItems: 25 },
                        ),
                        Type.Null(),
                      ]),
                    ),
                    provider: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedProviderSchema]),
                    ),
                    video: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    audio: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAudioSchema]),
                    ),
                  }),
                  { maxItems: 10 },
                ),
                Type.Null(),
              ]),
            ),
            allowed_mentions: Type.Optional(
              Type.Union([
                Type.Union([Type.Null(), Type.Null()]),
                Type.Object({
                  parse: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          AllowedMentionTypesSchema,
                        ]),
                        { maxItems: 1521, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  users: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        { maxItems: 100, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  roles: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        { maxItems: 100, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  replied_user: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
              ]),
            ),
            components: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Union([
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 100 }),
                                Type.Null(),
                              ]),
                            ),
                            style: ButtonStyleTypesSchema,
                            label: Type.Optional(
                              Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            url: Type.Optional(
                              Type.Union([
                                Type.String({ format: 'uri', maxLength: 512 }),
                                Type.Null(),
                              ]),
                            ),
                            sku_id: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                SnowflakeTypeSchema,
                              ]),
                            ),
                            emoji: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                ComponentEmojiForRequestSchema,
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                            channel_types: Type.Optional(
                              Type.Union([
                                Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(
                                  Type.Union([
                                    RoleSelectDefaultValueSchema,
                                    UserSelectDefaultValueSchema,
                                  ]),
                                  { maxItems: 25 },
                                ),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            options: Type.Array(
                              Type.Object({
                                label: Type.String({ minLength: 1, maxLength: 100 }),
                                value: Type.String({ minLength: 1, maxLength: 100 }),
                                description: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                ),
                                default: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              { minItems: 1, maxItems: 25 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                        ]),
                        { minItems: 1, maxItems: 5 },
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      accent_color: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            components: Type.Array(
                              Type.Union([
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.Optional(
                                    Type.Union([
                                      Type.String({ minLength: 1, maxLength: 100 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  style: ButtonStyleTypesSchema,
                                  label: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  url: Type.Optional(
                                    Type.Union([
                                      Type.String({ format: 'uri', maxLength: 512 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  sku_id: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      SnowflakeTypeSchema,
                                    ]),
                                  ),
                                  emoji: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      ComponentEmojiForRequestSchema,
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  channel_types: Type.Optional(
                                    Type.Union([
                                      Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(
                                        Type.Union([
                                          RoleSelectDefaultValueSchema,
                                          UserSelectDefaultValueSchema,
                                        ]),
                                        { maxItems: 25 },
                                      ),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  options: Type.Array(
                                    Type.Object({
                                      label: Type.String({ minLength: 1, maxLength: 100 }),
                                      value: Type.String({ minLength: 1, maxLength: 100 }),
                                      description: Type.Optional(
                                        Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                      ),
                                      default: Type.Optional(
                                        Type.Union([
                                          Codec(
                                            Type.Union([
                                              Type.Literal('true'),
                                              Type.Literal('false'),
                                            ]),
                                          )
                                            .Decode((value) => value === 'true')
                                            .Encode((value) => (value ? 'true' : 'false')),
                                          Type.Null(),
                                        ]),
                                      ),
                                      emoji: Type.Optional(
                                        Type.Union([
                                          Type.Union([Type.Null(), Type.Null()]),
                                          ComponentEmojiForRequestSchema,
                                        ]),
                                      ),
                                    }),
                                    { minItems: 1, maxItems: 25 },
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                              ]),
                              { minItems: 1, maxItems: 5 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            spoiler: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            items: Type.Array(
                              Type.Object({
                                description: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 1024 }),
                                    Type.Null(),
                                  ]),
                                ),
                                spoiler: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                              { minItems: 1, maxItems: 10 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            components: Type.Array(
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                content: Type.String({ minLength: 1, maxLength: 4000 }),
                              }),
                              { minItems: 1, maxItems: 3 },
                            ),
                            accessory: Type.Union([
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 100 }),
                                    Type.Null(),
                                  ]),
                                ),
                                style: ButtonStyleTypesSchema,
                                label: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                url: Type.Optional(
                                  Type.Union([
                                    Type.String({ format: 'uri', maxLength: 512 }),
                                    Type.Null(),
                                  ]),
                                ),
                                sku_id: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    SnowflakeTypeSchema,
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                description: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 1024 }),
                                    Type.Null(),
                                  ]),
                                ),
                                spoiler: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                            ]),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            spacing: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                MessageComponentSeparatorSpacingSizeSchema,
                              ]),
                            ),
                            divider: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            content: Type.String({ minLength: 1, maxLength: 4000 }),
                          }),
                        ]),
                        { minItems: 1, maxItems: 40 },
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      items: Type.Array(
                        Type.Object({
                          description: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 1024 }),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          media: UnfurledMediaRequestSchema,
                        }),
                        { minItems: 1, maxItems: 10 },
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          content: Type.String({ minLength: 1, maxLength: 4000 }),
                        }),
                        { minItems: 1, maxItems: 3 },
                      ),
                      accessory: Type.Union([
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 100 }),
                              Type.Null(),
                            ]),
                          ),
                          style: ButtonStyleTypesSchema,
                          label: Type.Optional(
                            Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 512 }),
                              Type.Null(),
                            ]),
                          ),
                          sku_id: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              SnowflakeTypeSchema,
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              ComponentEmojiForRequestSchema,
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 1024 }),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          media: UnfurledMediaRequestSchema,
                        }),
                      ]),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      spacing: Type.Optional(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          MessageComponentSeparatorSpacingSizeSchema,
                        ]),
                      ),
                      divider: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      content: Type.String({ minLength: 1, maxLength: 4000 }),
                    }),
                  ]),
                  { maxItems: 40 },
                ),
                Type.Null(),
              ]),
            ),
            attachments: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    id: SnowflakeTypeSchema,
                    filename: Type.Optional(
                      Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                    ),
                    description: Type.Optional(
                      Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                    ),
                    duration_secs: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number(value))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    waveform: Type.Optional(
                      Type.Union([Type.String({ maxLength: 400 }), Type.Null()]),
                    ),
                    title: Type.Optional(
                      Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                    ),
                    is_spoiler: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                  }),
                  { maxItems: 10 },
                ),
                Type.Null(),
              ]),
            ),
            poll: Type.Optional(
              Type.Union([
                Type.Union([Type.Null(), Type.Null()]),
                Type.Object({
                  question: Type.Object(
                    {
                      text: Type.Optional(
                        Type.Union([
                          Type.String({
                            minLength: 1,
                            maxLength: 300,
                            description: 'The text of the field',
                          }),
                          Type.Null(),
                        ]),
                      ),
                      emoji: Type.Optional(
                        Type.Union(
                          [
                            Type.Union([Type.Null(), Type.Null()]),
                            Type.Object({
                              id: Type.Optional(
                                Type.Union(
                                  [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                  { description: 'The ID of the custom emoji' },
                                ),
                              ),
                              name: Type.Optional(
                                Type.Union([
                                  Type.String({
                                    maxLength: 32,
                                    description:
                                      'The name of the emoji, or the unicode emoji character',
                                  }),
                                  Type.Null(),
                                ]),
                              ),
                              animated: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                          ],
                          { description: 'The emoji of the field' },
                        ),
                      ),
                    },
                    { description: 'The question of the poll. Only `text` is supported.' },
                  ),
                  answers: Type.Array(
                    Type.Object({
                      poll_media: Type.Object(
                        {
                          text: Type.Optional(
                            Type.Union([
                              Type.String({
                                minLength: 1,
                                maxLength: 300,
                                description: 'The text of the field',
                              }),
                              Type.Null(),
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union(
                              [
                                Type.Union([Type.Null(), Type.Null()]),
                                Type.Object({
                                  id: Type.Optional(
                                    Type.Union(
                                      [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                      { description: 'The ID of the custom emoji' },
                                    ),
                                  ),
                                  name: Type.Optional(
                                    Type.Union([
                                      Type.String({
                                        maxLength: 32,
                                        description:
                                          'The name of the emoji, or the unicode emoji character',
                                      }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  animated: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                              ],
                              { description: 'The emoji of the field' },
                            ),
                          ),
                        },
                        { description: 'The data of the answer' },
                      ),
                    }),
                    {
                      minItems: 1,
                      maxItems: 10,
                      description: 'Each of the answers available in the poll, up to 10',
                    },
                  ),
                  allow_multiselect: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                  layout_type: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), PollLayoutTypesSchema], {
                      description: 'The layout type of the poll. Defaults to... DEFAULT!',
                    }),
                  ),
                  duration: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                }),
              ]),
            ),
            tts: Type.Optional(
              Type.Union([
                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                  .Decode((value) => value === 'true')
                  .Encode((value) => (value ? 'true' : 'false')),
                Type.Null(),
              ]),
            ),
            flags: Type.Optional(
              Type.Union([
                Codec(Type.String())
                  .Decode((value) => Number.parseInt(value, 10))
                  .Encode((value) => String(value)),
                Type.Null(),
              ]),
            ),
            username: Type.Optional(
              Type.Union([Type.String({ minLength: 1, maxLength: 80 }), Type.Null()]),
            ),
            avatar_url: Type.Optional(
              Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
            ),
            thread_name: Type.Optional(
              Type.Union([Type.String({ minLength: 0, maxLength: 100 }), Type.Null()]),
            ),
            applied_tags: Type.Optional(
              Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 5 }), Type.Null()]),
            ),
          }),
          Type.Object({
            content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
            embeds: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    type: Type.Optional(
                      Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                    ),
                    url: Type.Optional(
                      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                    ),
                    title: Type.Optional(
                      Type.Union([Type.String({ maxLength: 256 }), Type.Null()]),
                    ),
                    color: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    timestamp: Type.Optional(
                      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
                    ),
                    description: Type.Optional(
                      Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                    ),
                    author: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAuthorSchema]),
                    ),
                    image: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    thumbnail: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    footer: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedFooterSchema]),
                    ),
                    fields: Type.Optional(
                      Type.Union([
                        Type.Array(
                          Type.Object({
                            name: Type.String({ maxLength: 256 }),
                            value: Type.String({ maxLength: 1024 }),
                            inline: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          { maxItems: 25 },
                        ),
                        Type.Null(),
                      ]),
                    ),
                    provider: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedProviderSchema]),
                    ),
                    video: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    audio: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAudioSchema]),
                    ),
                  }),
                  { maxItems: 10 },
                ),
                Type.Null(),
              ]),
            ),
            allowed_mentions: Type.Optional(
              Type.Union([
                Type.Union([Type.Null(), Type.Null()]),
                Type.Object({
                  parse: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          AllowedMentionTypesSchema,
                        ]),
                        { maxItems: 1521, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  users: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        { maxItems: 100, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  roles: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        { maxItems: 100, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  replied_user: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
              ]),
            ),
            components: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Union([
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 100 }),
                                Type.Null(),
                              ]),
                            ),
                            style: ButtonStyleTypesSchema,
                            label: Type.Optional(
                              Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            url: Type.Optional(
                              Type.Union([
                                Type.String({ format: 'uri', maxLength: 512 }),
                                Type.Null(),
                              ]),
                            ),
                            sku_id: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                SnowflakeTypeSchema,
                              ]),
                            ),
                            emoji: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                ComponentEmojiForRequestSchema,
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                            channel_types: Type.Optional(
                              Type.Union([
                                Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(
                                  Type.Union([
                                    RoleSelectDefaultValueSchema,
                                    UserSelectDefaultValueSchema,
                                  ]),
                                  { maxItems: 25 },
                                ),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            options: Type.Array(
                              Type.Object({
                                label: Type.String({ minLength: 1, maxLength: 100 }),
                                value: Type.String({ minLength: 1, maxLength: 100 }),
                                description: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                ),
                                default: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              { minItems: 1, maxItems: 25 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                        ]),
                        { minItems: 1, maxItems: 5 },
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      accent_color: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            components: Type.Array(
                              Type.Union([
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.Optional(
                                    Type.Union([
                                      Type.String({ minLength: 1, maxLength: 100 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  style: ButtonStyleTypesSchema,
                                  label: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  url: Type.Optional(
                                    Type.Union([
                                      Type.String({ format: 'uri', maxLength: 512 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  sku_id: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      SnowflakeTypeSchema,
                                    ]),
                                  ),
                                  emoji: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      ComponentEmojiForRequestSchema,
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  channel_types: Type.Optional(
                                    Type.Union([
                                      Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(
                                        Type.Union([
                                          RoleSelectDefaultValueSchema,
                                          UserSelectDefaultValueSchema,
                                        ]),
                                        { maxItems: 25 },
                                      ),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  options: Type.Array(
                                    Type.Object({
                                      label: Type.String({ minLength: 1, maxLength: 100 }),
                                      value: Type.String({ minLength: 1, maxLength: 100 }),
                                      description: Type.Optional(
                                        Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                      ),
                                      default: Type.Optional(
                                        Type.Union([
                                          Codec(
                                            Type.Union([
                                              Type.Literal('true'),
                                              Type.Literal('false'),
                                            ]),
                                          )
                                            .Decode((value) => value === 'true')
                                            .Encode((value) => (value ? 'true' : 'false')),
                                          Type.Null(),
                                        ]),
                                      ),
                                      emoji: Type.Optional(
                                        Type.Union([
                                          Type.Union([Type.Null(), Type.Null()]),
                                          ComponentEmojiForRequestSchema,
                                        ]),
                                      ),
                                    }),
                                    { minItems: 1, maxItems: 25 },
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                              ]),
                              { minItems: 1, maxItems: 5 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            spoiler: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            items: Type.Array(
                              Type.Object({
                                description: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 1024 }),
                                    Type.Null(),
                                  ]),
                                ),
                                spoiler: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                              { minItems: 1, maxItems: 10 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            components: Type.Array(
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                content: Type.String({ minLength: 1, maxLength: 4000 }),
                              }),
                              { minItems: 1, maxItems: 3 },
                            ),
                            accessory: Type.Union([
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 100 }),
                                    Type.Null(),
                                  ]),
                                ),
                                style: ButtonStyleTypesSchema,
                                label: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                url: Type.Optional(
                                  Type.Union([
                                    Type.String({ format: 'uri', maxLength: 512 }),
                                    Type.Null(),
                                  ]),
                                ),
                                sku_id: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    SnowflakeTypeSchema,
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                description: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 1024 }),
                                    Type.Null(),
                                  ]),
                                ),
                                spoiler: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                            ]),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            spacing: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                MessageComponentSeparatorSpacingSizeSchema,
                              ]),
                            ),
                            divider: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            content: Type.String({ minLength: 1, maxLength: 4000 }),
                          }),
                        ]),
                        { minItems: 1, maxItems: 40 },
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      items: Type.Array(
                        Type.Object({
                          description: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 1024 }),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          media: UnfurledMediaRequestSchema,
                        }),
                        { minItems: 1, maxItems: 10 },
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          content: Type.String({ minLength: 1, maxLength: 4000 }),
                        }),
                        { minItems: 1, maxItems: 3 },
                      ),
                      accessory: Type.Union([
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 100 }),
                              Type.Null(),
                            ]),
                          ),
                          style: ButtonStyleTypesSchema,
                          label: Type.Optional(
                            Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 512 }),
                              Type.Null(),
                            ]),
                          ),
                          sku_id: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              SnowflakeTypeSchema,
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              ComponentEmojiForRequestSchema,
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 1024 }),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          media: UnfurledMediaRequestSchema,
                        }),
                      ]),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      spacing: Type.Optional(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          MessageComponentSeparatorSpacingSizeSchema,
                        ]),
                      ),
                      divider: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      content: Type.String({ minLength: 1, maxLength: 4000 }),
                    }),
                  ]),
                  { maxItems: 40 },
                ),
                Type.Null(),
              ]),
            ),
            attachments: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    id: SnowflakeTypeSchema,
                    filename: Type.Optional(
                      Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                    ),
                    description: Type.Optional(
                      Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                    ),
                    duration_secs: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number(value))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    waveform: Type.Optional(
                      Type.Union([Type.String({ maxLength: 400 }), Type.Null()]),
                    ),
                    title: Type.Optional(
                      Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                    ),
                    is_spoiler: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                  }),
                  { maxItems: 10 },
                ),
                Type.Null(),
              ]),
            ),
            poll: Type.Optional(
              Type.Union([
                Type.Union([Type.Null(), Type.Null()]),
                Type.Object({
                  question: Type.Object(
                    {
                      text: Type.Optional(
                        Type.Union([
                          Type.String({
                            minLength: 1,
                            maxLength: 300,
                            description: 'The text of the field',
                          }),
                          Type.Null(),
                        ]),
                      ),
                      emoji: Type.Optional(
                        Type.Union(
                          [
                            Type.Union([Type.Null(), Type.Null()]),
                            Type.Object({
                              id: Type.Optional(
                                Type.Union(
                                  [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                  { description: 'The ID of the custom emoji' },
                                ),
                              ),
                              name: Type.Optional(
                                Type.Union([
                                  Type.String({
                                    maxLength: 32,
                                    description:
                                      'The name of the emoji, or the unicode emoji character',
                                  }),
                                  Type.Null(),
                                ]),
                              ),
                              animated: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                          ],
                          { description: 'The emoji of the field' },
                        ),
                      ),
                    },
                    { description: 'The question of the poll. Only `text` is supported.' },
                  ),
                  answers: Type.Array(
                    Type.Object({
                      poll_media: Type.Object(
                        {
                          text: Type.Optional(
                            Type.Union([
                              Type.String({
                                minLength: 1,
                                maxLength: 300,
                                description: 'The text of the field',
                              }),
                              Type.Null(),
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union(
                              [
                                Type.Union([Type.Null(), Type.Null()]),
                                Type.Object({
                                  id: Type.Optional(
                                    Type.Union(
                                      [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                      { description: 'The ID of the custom emoji' },
                                    ),
                                  ),
                                  name: Type.Optional(
                                    Type.Union([
                                      Type.String({
                                        maxLength: 32,
                                        description:
                                          'The name of the emoji, or the unicode emoji character',
                                      }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  animated: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                              ],
                              { description: 'The emoji of the field' },
                            ),
                          ),
                        },
                        { description: 'The data of the answer' },
                      ),
                    }),
                    {
                      minItems: 1,
                      maxItems: 10,
                      description: 'Each of the answers available in the poll, up to 10',
                    },
                  ),
                  allow_multiselect: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                  layout_type: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), PollLayoutTypesSchema], {
                      description: 'The layout type of the poll. Defaults to... DEFAULT!',
                    }),
                  ),
                  duration: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                }),
              ]),
            ),
            flags: Type.Optional(
              Type.Union([
                Codec(Type.String())
                  .Decode((value) => Number.parseInt(value, 10))
                  .Encode((value) => String(value)),
                Type.Null(),
              ]),
            ),
          }),
        ]),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/webhooks/:webhook_id/:webhook_token',
    describeRoute({
      operationId: 'delete_webhook_by_token',
      responses: {
        '204': {
          description: '204 response for delete_webhook_by_token',
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    (c) => {},
  )
  .patch(
    '/webhooks/:webhook_id/:webhook_token',
    describeRoute({
      operationId: 'update_webhook_by_token',
      responses: {
        '200': {
          description: '200 response for update_webhook_by_token',
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
                Compile(
                  Type.Union([
                    ApplicationIncomingWebhookResponseSchema,
                    ChannelFollowerWebhookResponseSchema,
                    GuildIncomingWebhookResponseSchema,
                  ]),
                ),
              ),
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.Optional(Type.String({ minLength: 1, maxLength: 80 })),
          avatar: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/webhooks/:webhook_id/:webhook_token/github',
    describeRoute({
      operationId: 'execute_github_compatible_webhook',
      responses: {
        '204': {
          description: '204 response for execute_github_compatible_webhook',
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          wait: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          thread_id: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    validator('json', Compile(GithubWebhookSchema)),
    (c) => {},
  )
  .get(
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    describeRoute({
      operationId: 'get_original_webhook_message',
      responses: {
        '200': {
          description: '200 response for get_original_webhook_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator('query', Compile(Type.Object({ thread_id: Type.Optional(SnowflakeTypeSchema) }))),
    (c) => {},
  )
  .delete(
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    describeRoute({
      operationId: 'delete_original_webhook_message',
      responses: {
        '204': {
          description: '204 response for delete_original_webhook_message',
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator('query', Compile(Type.Object({ thread_id: Type.Optional(SnowflakeTypeSchema) }))),
    (c) => {},
  )
  .patch(
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    describeRoute({
      operationId: 'update_original_webhook_message',
      responses: {
        '200': {
          description: '200 response for update_original_webhook_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          thread_id: Type.Optional(SnowflakeTypeSchema),
          with_components: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    validator('json', Compile(IncomingWebhookUpdateRequestPartialSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
          embeds: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Object({
                  type: Type.Optional(
                    Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                  ),
                  url: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  title: Type.Optional(Type.Union([Type.String({ maxLength: 256 }), Type.Null()])),
                  color: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  timestamp: Type.Optional(
                    Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
                  ),
                  description: Type.Optional(
                    Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                  ),
                  author: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAuthorSchema]),
                  ),
                  image: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      Type.Object({
                        url: Type.Optional(
                          Type.Union([
                            Type.String({ format: 'uri', maxLength: 2048 }),
                            Type.Null(),
                          ]),
                        ),
                        width: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        height: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                        ),
                        placeholder_version: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        is_animated: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                        ),
                      }),
                    ]),
                  ),
                  thumbnail: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      Type.Object({
                        url: Type.Optional(
                          Type.Union([
                            Type.String({ format: 'uri', maxLength: 2048 }),
                            Type.Null(),
                          ]),
                        ),
                        width: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        height: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                        ),
                        placeholder_version: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        is_animated: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                        ),
                      }),
                    ]),
                  ),
                  footer: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedFooterSchema]),
                  ),
                  fields: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Object({
                          name: Type.String({ maxLength: 256 }),
                          value: Type.String({ maxLength: 1024 }),
                          inline: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        { maxItems: 25 },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  provider: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedProviderSchema]),
                  ),
                  video: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      Type.Object({
                        url: Type.Optional(
                          Type.Union([
                            Type.String({ format: 'uri', maxLength: 2048 }),
                            Type.Null(),
                          ]),
                        ),
                        width: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        height: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                        ),
                        placeholder_version: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        is_animated: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                        ),
                      }),
                    ]),
                  ),
                  audio: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAudioSchema]),
                  ),
                }),
                { maxItems: 10 },
              ),
              Type.Null(),
            ]),
          ),
          allowed_mentions: Type.Optional(
            Type.Union([
              Type.Union([Type.Null(), Type.Null()]),
              Type.Object({
                parse: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        AllowedMentionTypesSchema,
                      ]),
                      { maxItems: 1521, uniqueItems: true },
                    ),
                    Type.Null(),
                  ]),
                ),
                users: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                      { maxItems: 100, uniqueItems: true },
                    ),
                    Type.Null(),
                  ]),
                ),
                roles: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                      { maxItems: 100, uniqueItems: true },
                    ),
                    Type.Null(),
                  ]),
                ),
                replied_user: Type.Optional(
                  Type.Union([
                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                      .Decode((value) => value === 'true')
                      .Encode((value) => (value ? 'true' : 'false')),
                    Type.Null(),
                  ]),
                ),
              }),
            ]),
          ),
          components: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Union([
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    components: Type.Array(
                      Type.Union([
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 100 }),
                              Type.Null(),
                            ]),
                          ),
                          style: ButtonStyleTypesSchema,
                          label: Type.Optional(
                            Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 512 }),
                              Type.Null(),
                            ]),
                          ),
                          sku_id: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              SnowflakeTypeSchema,
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              ComponentEmojiForRequestSchema,
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                              Type.Null(),
                            ]),
                          ),
                          channel_types: Type.Optional(
                            Type.Union([
                              Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(
                                Type.Union([
                                  RoleSelectDefaultValueSchema,
                                  UserSelectDefaultValueSchema,
                                ]),
                                { maxItems: 25 },
                              ),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          options: Type.Array(
                            Type.Object({
                              label: Type.String({ minLength: 1, maxLength: 100 }),
                              value: Type.String({ minLength: 1, maxLength: 100 }),
                              description: Type.Optional(
                                Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                              ),
                              default: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              emoji: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  ComponentEmojiForRequestSchema,
                                ]),
                              ),
                            }),
                            { minItems: 1, maxItems: 25 },
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                              Type.Null(),
                            ]),
                          ),
                        }),
                      ]),
                      { minItems: 1, maxItems: 5 },
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    accent_color: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    components: Type.Array(
                      Type.Union([
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          components: Type.Array(
                            Type.Union([
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 100 }),
                                    Type.Null(),
                                  ]),
                                ),
                                style: ButtonStyleTypesSchema,
                                label: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                url: Type.Optional(
                                  Type.Union([
                                    Type.String({ format: 'uri', maxLength: 512 }),
                                    Type.Null(),
                                  ]),
                                ),
                                sku_id: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    SnowflakeTypeSchema,
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                    Type.Null(),
                                  ]),
                                ),
                                channel_types: Type.Optional(
                                  Type.Union([
                                    Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(
                                      Type.Union([
                                        RoleSelectDefaultValueSchema,
                                        UserSelectDefaultValueSchema,
                                      ]),
                                      { maxItems: 25 },
                                    ),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                options: Type.Array(
                                  Type.Object({
                                    label: Type.String({ minLength: 1, maxLength: 100 }),
                                    value: Type.String({ minLength: 1, maxLength: 100 }),
                                    description: Type.Optional(
                                      Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                    ),
                                    default: Type.Optional(
                                      Type.Union([
                                        Codec(
                                          Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                        )
                                          .Decode((value) => value === 'true')
                                          .Encode((value) => (value ? 'true' : 'false')),
                                        Type.Null(),
                                      ]),
                                    ),
                                    emoji: Type.Optional(
                                      Type.Union([
                                        Type.Union([Type.Null(), Type.Null()]),
                                        ComponentEmojiForRequestSchema,
                                      ]),
                                    ),
                                  }),
                                  { minItems: 1, maxItems: 25 },
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                            ]),
                            { minItems: 1, maxItems: 5 },
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          items: Type.Array(
                            Type.Object({
                              description: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 1024 }),
                                  Type.Null(),
                                ]),
                              ),
                              spoiler: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              media: UnfurledMediaRequestSchema,
                            }),
                            { minItems: 1, maxItems: 10 },
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          components: Type.Array(
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              content: Type.String({ minLength: 1, maxLength: 4000 }),
                            }),
                            { minItems: 1, maxItems: 3 },
                          ),
                          accessory: Type.Union([
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 100 }),
                                  Type.Null(),
                                ]),
                              ),
                              style: ButtonStyleTypesSchema,
                              label: Type.Optional(
                                Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              url: Type.Optional(
                                Type.Union([
                                  Type.String({ format: 'uri', maxLength: 512 }),
                                  Type.Null(),
                                ]),
                              ),
                              sku_id: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  SnowflakeTypeSchema,
                                ]),
                              ),
                              emoji: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  ComponentEmojiForRequestSchema,
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              description: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 1024 }),
                                  Type.Null(),
                                ]),
                              ),
                              spoiler: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              media: UnfurledMediaRequestSchema,
                            }),
                          ]),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          spacing: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              MessageComponentSeparatorSpacingSizeSchema,
                            ]),
                          ),
                          divider: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          content: Type.String({ minLength: 1, maxLength: 4000 }),
                        }),
                      ]),
                      { minItems: 1, maxItems: 40 },
                    ),
                    spoiler: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    spoiler: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                    file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    items: Type.Array(
                      Type.Object({
                        description: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                        ),
                        spoiler: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        media: UnfurledMediaRequestSchema,
                      }),
                      { minItems: 1, maxItems: 10 },
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    components: Type.Array(
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        content: Type.String({ minLength: 1, maxLength: 4000 }),
                      }),
                      { minItems: 1, maxItems: 3 },
                    ),
                    accessory: Type.Union([
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
                        ),
                        style: ButtonStyleTypesSchema,
                        label: Type.Optional(
                          Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        url: Type.Optional(
                          Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
                        ),
                        sku_id: Type.Optional(
                          Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        ),
                        emoji: Type.Optional(
                          Type.Union([
                            Type.Union([Type.Null(), Type.Null()]),
                            ComponentEmojiForRequestSchema,
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                        ),
                        spoiler: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        media: UnfurledMediaRequestSchema,
                      }),
                    ]),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    spacing: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        MessageComponentSeparatorSpacingSizeSchema,
                      ]),
                    ),
                    divider: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    content: Type.String({ minLength: 1, maxLength: 4000 }),
                  }),
                ]),
                { maxItems: 40 },
              ),
              Type.Null(),
            ]),
          ),
          attachments: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Object({
                  id: SnowflakeTypeSchema,
                  filename: Type.Optional(
                    Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                  ),
                  description: Type.Optional(
                    Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                  ),
                  duration_secs: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number(value))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  waveform: Type.Optional(
                    Type.Union([Type.String({ maxLength: 400 }), Type.Null()]),
                  ),
                  title: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
                  is_spoiler: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
                { maxItems: 10 },
              ),
              Type.Null(),
            ]),
          ),
          poll: Type.Optional(
            Type.Union([
              Type.Union([Type.Null(), Type.Null()]),
              Type.Object({
                question: Type.Object(
                  {
                    text: Type.Optional(
                      Type.Union([
                        Type.String({
                          minLength: 1,
                          maxLength: 300,
                          description: 'The text of the field',
                        }),
                        Type.Null(),
                      ]),
                    ),
                    emoji: Type.Optional(
                      Type.Union(
                        [
                          Type.Union([Type.Null(), Type.Null()]),
                          Type.Object({
                            id: Type.Optional(
                              Type.Union(
                                [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                { description: 'The ID of the custom emoji' },
                              ),
                            ),
                            name: Type.Optional(
                              Type.Union([
                                Type.String({
                                  maxLength: 32,
                                  description:
                                    'The name of the emoji, or the unicode emoji character',
                                }),
                                Type.Null(),
                              ]),
                            ),
                            animated: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                        ],
                        { description: 'The emoji of the field' },
                      ),
                    ),
                  },
                  { description: 'The question of the poll. Only `text` is supported.' },
                ),
                answers: Type.Array(
                  Type.Object({
                    poll_media: Type.Object(
                      {
                        text: Type.Optional(
                          Type.Union([
                            Type.String({
                              minLength: 1,
                              maxLength: 300,
                              description: 'The text of the field',
                            }),
                            Type.Null(),
                          ]),
                        ),
                        emoji: Type.Optional(
                          Type.Union(
                            [
                              Type.Union([Type.Null(), Type.Null()]),
                              Type.Object({
                                id: Type.Optional(
                                  Type.Union(
                                    [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                    { description: 'The ID of the custom emoji' },
                                  ),
                                ),
                                name: Type.Optional(
                                  Type.Union([
                                    Type.String({
                                      maxLength: 32,
                                      description:
                                        'The name of the emoji, or the unicode emoji character',
                                    }),
                                    Type.Null(),
                                  ]),
                                ),
                                animated: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                            ],
                            { description: 'The emoji of the field' },
                          ),
                        ),
                      },
                      { description: 'The data of the answer' },
                    ),
                  }),
                  {
                    minItems: 1,
                    maxItems: 10,
                    description: 'Each of the answers available in the poll, up to 10',
                  },
                ),
                allow_multiselect: Type.Optional(
                  Type.Union([
                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                      .Decode((value) => value === 'true')
                      .Encode((value) => (value ? 'true' : 'false')),
                    Type.Null(),
                  ]),
                ),
                layout_type: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), PollLayoutTypesSchema], {
                    description: 'The layout type of the poll. Defaults to... DEFAULT!',
                  }),
                ),
                duration: Type.Optional(
                  Type.Union([
                    Codec(Type.String())
                      .Decode((value) => Number.parseInt(value, 10))
                      .Encode((value) => String(value)),
                    Type.Null(),
                  ]),
                ),
              }),
            ]),
          ),
          flags: Type.Optional(
            Type.Union([
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    describeRoute({
      operationId: 'get_webhook_message',
      responses: {
        '200': {
          description: '200 response for get_webhook_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
          message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator('query', Compile(Type.Object({ thread_id: Type.Optional(SnowflakeTypeSchema) }))),
    (c) => {},
  )
  .delete(
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    describeRoute({
      operationId: 'delete_webhook_message',
      responses: {
        '204': {
          description: '204 response for delete_webhook_message',
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
          message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator('query', Compile(Type.Object({ thread_id: Type.Optional(SnowflakeTypeSchema) }))),
    (c) => {},
  )
  .patch(
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    describeRoute({
      operationId: 'update_webhook_message',
      responses: {
        '200': {
          description: '200 response for update_webhook_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
          message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          thread_id: Type.Optional(SnowflakeTypeSchema),
          with_components: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    validator('json', Compile(IncomingWebhookUpdateRequestPartialSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
          embeds: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Object({
                  type: Type.Optional(
                    Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                  ),
                  url: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  title: Type.Optional(Type.Union([Type.String({ maxLength: 256 }), Type.Null()])),
                  color: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  timestamp: Type.Optional(
                    Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
                  ),
                  description: Type.Optional(
                    Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                  ),
                  author: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAuthorSchema]),
                  ),
                  image: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      Type.Object({
                        url: Type.Optional(
                          Type.Union([
                            Type.String({ format: 'uri', maxLength: 2048 }),
                            Type.Null(),
                          ]),
                        ),
                        width: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        height: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                        ),
                        placeholder_version: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        is_animated: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                        ),
                      }),
                    ]),
                  ),
                  thumbnail: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      Type.Object({
                        url: Type.Optional(
                          Type.Union([
                            Type.String({ format: 'uri', maxLength: 2048 }),
                            Type.Null(),
                          ]),
                        ),
                        width: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        height: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                        ),
                        placeholder_version: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        is_animated: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                        ),
                      }),
                    ]),
                  ),
                  footer: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedFooterSchema]),
                  ),
                  fields: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Object({
                          name: Type.String({ maxLength: 256 }),
                          value: Type.String({ maxLength: 1024 }),
                          inline: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        { maxItems: 25 },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  provider: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedProviderSchema]),
                  ),
                  video: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      Type.Object({
                        url: Type.Optional(
                          Type.Union([
                            Type.String({ format: 'uri', maxLength: 2048 }),
                            Type.Null(),
                          ]),
                        ),
                        width: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        height: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                        ),
                        placeholder_version: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        is_animated: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                        ),
                      }),
                    ]),
                  ),
                  audio: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAudioSchema]),
                  ),
                }),
                { maxItems: 10 },
              ),
              Type.Null(),
            ]),
          ),
          allowed_mentions: Type.Optional(
            Type.Union([
              Type.Union([Type.Null(), Type.Null()]),
              Type.Object({
                parse: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        AllowedMentionTypesSchema,
                      ]),
                      { maxItems: 1521, uniqueItems: true },
                    ),
                    Type.Null(),
                  ]),
                ),
                users: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                      { maxItems: 100, uniqueItems: true },
                    ),
                    Type.Null(),
                  ]),
                ),
                roles: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                      { maxItems: 100, uniqueItems: true },
                    ),
                    Type.Null(),
                  ]),
                ),
                replied_user: Type.Optional(
                  Type.Union([
                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                      .Decode((value) => value === 'true')
                      .Encode((value) => (value ? 'true' : 'false')),
                    Type.Null(),
                  ]),
                ),
              }),
            ]),
          ),
          components: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Union([
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    components: Type.Array(
                      Type.Union([
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 100 }),
                              Type.Null(),
                            ]),
                          ),
                          style: ButtonStyleTypesSchema,
                          label: Type.Optional(
                            Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 512 }),
                              Type.Null(),
                            ]),
                          ),
                          sku_id: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              SnowflakeTypeSchema,
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              ComponentEmojiForRequestSchema,
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                              Type.Null(),
                            ]),
                          ),
                          channel_types: Type.Optional(
                            Type.Union([
                              Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(
                                Type.Union([
                                  RoleSelectDefaultValueSchema,
                                  UserSelectDefaultValueSchema,
                                ]),
                                { maxItems: 25 },
                              ),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          options: Type.Array(
                            Type.Object({
                              label: Type.String({ minLength: 1, maxLength: 100 }),
                              value: Type.String({ minLength: 1, maxLength: 100 }),
                              description: Type.Optional(
                                Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                              ),
                              default: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              emoji: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  ComponentEmojiForRequestSchema,
                                ]),
                              ),
                            }),
                            { minItems: 1, maxItems: 25 },
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                          ),
                          min_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          max_values: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          required: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          default_values: Type.Optional(
                            Type.Union([
                              Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                              Type.Null(),
                            ]),
                          ),
                        }),
                      ]),
                      { minItems: 1, maxItems: 5 },
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    accent_color: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    components: Type.Array(
                      Type.Union([
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          components: Type.Array(
                            Type.Union([
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 100 }),
                                    Type.Null(),
                                  ]),
                                ),
                                style: ButtonStyleTypesSchema,
                                label: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                url: Type.Optional(
                                  Type.Union([
                                    Type.String({ format: 'uri', maxLength: 512 }),
                                    Type.Null(),
                                  ]),
                                ),
                                sku_id: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    SnowflakeTypeSchema,
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                    Type.Null(),
                                  ]),
                                ),
                                channel_types: Type.Optional(
                                  Type.Union([
                                    Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(
                                      Type.Union([
                                        RoleSelectDefaultValueSchema,
                                        UserSelectDefaultValueSchema,
                                      ]),
                                      { maxItems: 25 },
                                    ),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                options: Type.Array(
                                  Type.Object({
                                    label: Type.String({ minLength: 1, maxLength: 100 }),
                                    value: Type.String({ minLength: 1, maxLength: 100 }),
                                    description: Type.Optional(
                                      Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                    ),
                                    default: Type.Optional(
                                      Type.Union([
                                        Codec(
                                          Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                        )
                                          .Decode((value) => value === 'true')
                                          .Encode((value) => (value ? 'true' : 'false')),
                                        Type.Null(),
                                      ]),
                                    ),
                                    emoji: Type.Optional(
                                      Type.Union([
                                        Type.Union([Type.Null(), Type.Null()]),
                                        ComponentEmojiForRequestSchema,
                                      ]),
                                    ),
                                  }),
                                  { minItems: 1, maxItems: 25 },
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                placeholder: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                ),
                                min_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                max_values: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                required: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                default_values: Type.Optional(
                                  Type.Union([
                                    Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                            ]),
                            { minItems: 1, maxItems: 5 },
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          items: Type.Array(
                            Type.Object({
                              description: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 1024 }),
                                  Type.Null(),
                                ]),
                              ),
                              spoiler: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              media: UnfurledMediaRequestSchema,
                            }),
                            { minItems: 1, maxItems: 10 },
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          components: Type.Array(
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              content: Type.String({ minLength: 1, maxLength: 4000 }),
                            }),
                            { minItems: 1, maxItems: 3 },
                          ),
                          accessory: Type.Union([
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 100 }),
                                  Type.Null(),
                                ]),
                              ),
                              style: ButtonStyleTypesSchema,
                              label: Type.Optional(
                                Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              url: Type.Optional(
                                Type.Union([
                                  Type.String({ format: 'uri', maxLength: 512 }),
                                  Type.Null(),
                                ]),
                              ),
                              sku_id: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  SnowflakeTypeSchema,
                                ]),
                              ),
                              emoji: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  ComponentEmojiForRequestSchema,
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              description: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 1024 }),
                                  Type.Null(),
                                ]),
                              ),
                              spoiler: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              media: UnfurledMediaRequestSchema,
                            }),
                          ]),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          spacing: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              MessageComponentSeparatorSpacingSizeSchema,
                            ]),
                          ),
                          divider: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          content: Type.String({ minLength: 1, maxLength: 4000 }),
                        }),
                      ]),
                      { minItems: 1, maxItems: 40 },
                    ),
                    spoiler: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    spoiler: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                    file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    items: Type.Array(
                      Type.Object({
                        description: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                        ),
                        spoiler: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        media: UnfurledMediaRequestSchema,
                      }),
                      { minItems: 1, maxItems: 10 },
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    components: Type.Array(
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        content: Type.String({ minLength: 1, maxLength: 4000 }),
                      }),
                      { minItems: 1, maxItems: 3 },
                    ),
                    accessory: Type.Union([
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
                        ),
                        style: ButtonStyleTypesSchema,
                        label: Type.Optional(
                          Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        url: Type.Optional(
                          Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
                        ),
                        sku_id: Type.Optional(
                          Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        ),
                        emoji: Type.Optional(
                          Type.Union([
                            Type.Union([Type.Null(), Type.Null()]),
                            ComponentEmojiForRequestSchema,
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        description: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                        ),
                        spoiler: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        media: UnfurledMediaRequestSchema,
                      }),
                    ]),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    spacing: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        MessageComponentSeparatorSpacingSizeSchema,
                      ]),
                    ),
                    divider: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                  }),
                  Type.Object({
                    type: MessageComponentTypesSchema,
                    id: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    content: Type.String({ minLength: 1, maxLength: 4000 }),
                  }),
                ]),
                { maxItems: 40 },
              ),
              Type.Null(),
            ]),
          ),
          attachments: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Object({
                  id: SnowflakeTypeSchema,
                  filename: Type.Optional(
                    Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                  ),
                  description: Type.Optional(
                    Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                  ),
                  duration_secs: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number(value))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  waveform: Type.Optional(
                    Type.Union([Type.String({ maxLength: 400 }), Type.Null()]),
                  ),
                  title: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
                  is_spoiler: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
                { maxItems: 10 },
              ),
              Type.Null(),
            ]),
          ),
          poll: Type.Optional(
            Type.Union([
              Type.Union([Type.Null(), Type.Null()]),
              Type.Object({
                question: Type.Object(
                  {
                    text: Type.Optional(
                      Type.Union([
                        Type.String({
                          minLength: 1,
                          maxLength: 300,
                          description: 'The text of the field',
                        }),
                        Type.Null(),
                      ]),
                    ),
                    emoji: Type.Optional(
                      Type.Union(
                        [
                          Type.Union([Type.Null(), Type.Null()]),
                          Type.Object({
                            id: Type.Optional(
                              Type.Union(
                                [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                { description: 'The ID of the custom emoji' },
                              ),
                            ),
                            name: Type.Optional(
                              Type.Union([
                                Type.String({
                                  maxLength: 32,
                                  description:
                                    'The name of the emoji, or the unicode emoji character',
                                }),
                                Type.Null(),
                              ]),
                            ),
                            animated: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                        ],
                        { description: 'The emoji of the field' },
                      ),
                    ),
                  },
                  { description: 'The question of the poll. Only `text` is supported.' },
                ),
                answers: Type.Array(
                  Type.Object({
                    poll_media: Type.Object(
                      {
                        text: Type.Optional(
                          Type.Union([
                            Type.String({
                              minLength: 1,
                              maxLength: 300,
                              description: 'The text of the field',
                            }),
                            Type.Null(),
                          ]),
                        ),
                        emoji: Type.Optional(
                          Type.Union(
                            [
                              Type.Union([Type.Null(), Type.Null()]),
                              Type.Object({
                                id: Type.Optional(
                                  Type.Union(
                                    [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                    { description: 'The ID of the custom emoji' },
                                  ),
                                ),
                                name: Type.Optional(
                                  Type.Union([
                                    Type.String({
                                      maxLength: 32,
                                      description:
                                        'The name of the emoji, or the unicode emoji character',
                                    }),
                                    Type.Null(),
                                  ]),
                                ),
                                animated: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                              }),
                            ],
                            { description: 'The emoji of the field' },
                          ),
                        ),
                      },
                      { description: 'The data of the answer' },
                    ),
                  }),
                  {
                    minItems: 1,
                    maxItems: 10,
                    description: 'Each of the answers available in the poll, up to 10',
                  },
                ),
                allow_multiselect: Type.Optional(
                  Type.Union([
                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                      .Decode((value) => value === 'true')
                      .Encode((value) => (value ? 'true' : 'false')),
                    Type.Null(),
                  ]),
                ),
                layout_type: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), PollLayoutTypesSchema], {
                    description: 'The layout type of the poll. Defaults to... DEFAULT!',
                  }),
                ),
                duration: Type.Optional(
                  Type.Union([
                    Codec(Type.String())
                      .Decode((value) => Number.parseInt(value, 10))
                      .Encode((value) => String(value)),
                    Type.Null(),
                  ]),
                ),
              }),
            ]),
          ),
          flags: Type.Optional(
            Type.Union([
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/webhooks/:webhook_id/:webhook_token/slack',
    describeRoute({
      operationId: 'execute_slack_compatible_webhook',
      responses: {
        '200': {
          description: '200 response for execute_slack_compatible_webhook',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(Type.Union([Type.String(), Type.Null()]))),
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
      Compile(
        Type.Object({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          wait: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          thread_id: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    validator('json', Compile(SlackWebhookSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          text: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
          username: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
          icon_url: Type.Optional(
            Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
          ),
          attachments: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Object({
                  title: Type.Optional(
                    Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                  ),
                  title_link: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  text: Type.Optional(
                    Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                  ),
                  color: Type.Optional(
                    Type.Union([
                      Type.String({
                        pattern: '^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$',
                        maxLength: 7,
                      }),
                      Type.Null(),
                    ]),
                  ),
                  ts: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  pretext: Type.Optional(
                    Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                  ),
                  footer: Type.Optional(
                    Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                  ),
                  footer_icon: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  author_name: Type.Optional(
                    Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                  ),
                  author_link: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  author_icon: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  image_url: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  thumb_url: Type.Optional(
                    Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                  ),
                  fields: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Object({
                          name: Type.Optional(
                            Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                          ),
                          value: Type.Optional(
                            Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                          ),
                          inline: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                        }),
                        { maxItems: 1521 },
                      ),
                      Type.Null(),
                    ]),
                  ),
                }),
                { maxItems: 1521 },
              ),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
