import { Effect, Schema, SchemaTransformation } from 'effect'

export const GetWebhookEndpointResponseSchema = Schema.Struct({
  endpoint: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
    description: 'Webhook URL',
  }),
  active: Schema.Boolean.annotate({
    description:
      'Webhook usage status. Send a webhook event from the LINE Platform to the webhook URL only if enabled.\n\n`true`: Webhook usage is enabled.\n`false`: Webhook usage is disabled.\n',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information',
    },
  })
  .annotate({ identifier: 'GetWebhookEndpointResponse' })

export type GetWebhookEndpointResponse = Schema.Schema.Type<typeof GetWebhookEndpointResponseSchema>

export const SetWebhookEndpointRequestSchema = Schema.Struct({
  endpoint: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length >= 0, {
      expected: 'a string of at least 0 characters',
    }),
    Schema.makeFilter((input) => [...input].length <= 500, {
      expected: 'a string of at most 500 characters',
    }),
  ).annotate({ description: 'A valid webhook URL.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url',
    },
  })
  .annotate({ identifier: 'SetWebhookEndpointRequest' })

export type SetWebhookEndpointRequest = Schema.Schema.Type<typeof SetWebhookEndpointRequestSchema>

export const TestWebhookEndpointRequestSchema = Schema.Struct({
  endpoint: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => URL.canParse(input)),
      Schema.makeFilter((input) => [...input].length >= 0, {
        expected: 'a string of at least 0 characters',
      }),
      Schema.makeFilter((input) => [...input].length <= 500, {
        expected: 'a string of at most 500 characters',
      }),
    ).annotate({ description: 'A webhook URL to be validated.' }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  })
  .annotate({ identifier: 'TestWebhookEndpointRequest' })

export type TestWebhookEndpointRequest = Schema.Schema.Type<typeof TestWebhookEndpointRequestSchema>

export const TestWebhookEndpointResponseSchema = Schema.Struct({
  success: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: 'Result of the communication from the LINE platform to the webhook URL.',
    }),
  ),
  timestamp: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({
    description:
      'Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered.\n',
  }),
  statusCode: Schema.Number.check(Schema.isInt32()).annotate({
    description:
      "The HTTP status code. If the webhook response isn't received, the status code is set to zero or a negative number.",
  }),
  reason: Schema.String.annotate({ description: 'Reason for the response.' }),
  detail: Schema.String.annotate({ description: 'Details of the response.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  })
  .annotate({ identifier: 'TestWebhookEndpointResponse' })

export type TestWebhookEndpointResponse = Schema.Schema.Type<
  typeof TestWebhookEndpointResponseSchema
>

export const GetMessageContentTranscodingResponseSchema = Schema.Struct({
  status: Schema.Literals(['processing', 'succeeded', 'failed']).annotate({
    description:
      'The preparation status. One of:\n\n`processing`: Preparing to get content.\n`succeeded`: Ready to get the content. You can get the content sent by users.\n`failed`: Failed to prepare to get the content.\n',
  }),
})
  .annotate({
    description: 'Transcoding response',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status',
    },
  })
  .annotate({ identifier: 'GetMessageContentTranscodingResponse' })

export type GetMessageContentTranscodingResponse = Schema.Schema.Type<
  typeof GetMessageContentTranscodingResponseSchema
>

export const ActionSchema = Schema.Struct({
  type: Schema.optionalKey(Schema.String.annotate({ description: 'Type of action' })),
  label: Schema.optionalKey(Schema.String.annotate({ description: 'Label for the action.' })),
})
  .annotate({
    description: 'Action',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#action-objects',
    },
  })
  .annotate({ identifier: 'Action' })

export type Action = Schema.Schema.Type<typeof ActionSchema>

export const QuickReplyItemSchema = Schema.Struct({
  imageUrl: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => URL.canParse(input)),
      Schema.makeFilter((input) => [...input].length <= 2000, {
        expected: 'a string of at most 2000 characters',
      }),
    ).annotate({ description: 'URL of the icon that is displayed at the beginning of the button' }),
  ),
  action: Schema.optionalKey(ActionSchema),
  type: Schema.String.pipe(Schema.withDecodingDefault(Effect.succeed('action'))).annotate({
    description: '`action`',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#items-object',
    },
  })
  .annotate({ identifier: 'QuickReplyItem' })

export type QuickReplyItem = Schema.Schema.Type<typeof QuickReplyItemSchema>

export const QuickReplySchema = Schema.Struct({
  items: Schema.optionalKey(
    Schema.Array(QuickReplyItemSchema)
      .check(Schema.isMaxLength(13))
      .annotate({ description: 'Quick reply button objects.' }),
  ),
})
  .annotate({
    description: 'Quick reply',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#items-object',
    },
  })
  .annotate({ identifier: 'QuickReply' })

export type QuickReply = Schema.Schema.Type<typeof QuickReplySchema>

export const SenderSchema = Schema.Struct({
  name: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 20, {
        expected: 'a string of at most 20 characters',
      }),
    ).annotate({ description: 'Display name. Certain words such as `LINE` may not be used.' }),
  ),
  iconUrl: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => URL.canParse(input)),
      Schema.makeFilter((input) => [...input].length <= 2000, {
        expected: 'a string of at most 2000 characters',
      }),
    ).annotate({ description: 'URL of the image to display as an icon when sending a message' }),
  ),
})
  .annotate({ description: 'Change icon and display name' })
  .annotate({ identifier: 'Sender' })

export type Sender = Schema.Schema.Type<typeof SenderSchema>

export const MessageSchema = Schema.Struct({
  type: Schema.String.annotate({ description: 'Type of message' }),
  quickReply: Schema.optionalKey(QuickReplySchema),
  sender: Schema.optionalKey(SenderSchema),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#message-common-properties',
    },
  })
  .annotate({ identifier: 'Message' })

export type Message = Schema.Schema.Type<typeof MessageSchema>

export const NotificationDisabledSchema = Schema.Boolean.pipe(
  Schema.withDecodingDefault(Effect.succeed(false)),
)
  .annotate({
    description:
      '`true`: The user doesn’t receive a push notification when a message is sent.\n`false`: The user receives a push notification when the message is sent (unless they have disabled push notifications in LINE and/or their device).\nThe default value is false.\n',
  })
  .annotate({ identifier: 'NotificationDisabled' })

export type NotificationDisabled = Schema.Schema.Type<typeof NotificationDisabledSchema>

export const ReplyMessageRequestSchema = Schema.Struct({
  replyToken: Schema.String.annotate({ description: 'replyToken received via webhook.' }),
  messages: Schema.Array(MessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'List of messages.' }),
  notificationDisabled: Schema.optionalKey(NotificationDisabledSchema),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message',
    },
  })
  .annotate({ identifier: 'ReplyMessageRequest' })

export type ReplyMessageRequest = Schema.Schema.Type<typeof ReplyMessageRequestSchema>

export const SentMessageSchema = Schema.Struct({
  id: Schema.String.annotate({ description: 'ID of the sent message.' }),
  quoteToken: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Quote token of the message. Only included when a message object that can be specified as a quote target was sent as a push or reply message.\n',
    }),
  ),
}).annotate({ identifier: 'SentMessage' })

export type SentMessage = Schema.Schema.Type<typeof SentMessageSchema>

export const ReplyMessageResponseSchema = Schema.Struct({
  sentMessages: Schema.Array(SentMessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'Array of sent messages.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message-response',
    },
  })
  .annotate({ identifier: 'ReplyMessageResponse' })

export type ReplyMessageResponse = Schema.Schema.Type<typeof ReplyMessageResponseSchema>

export const PushMessageRequestSchema = Schema.Struct({
  to: Schema.String.annotate({ description: 'ID of the receiver.' }),
  messages: Schema.Array(MessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'List of Message objects.' }),
  notificationDisabled: Schema.optionalKey(NotificationDisabledSchema),
  customAggregationUnits: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        'List of aggregation unit name. Case-sensitive.\nThis functions can only be used by corporate users who have submitted the required applications.\n',
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message',
    },
  })
  .annotate({ identifier: 'PushMessageRequest' })

export type PushMessageRequest = Schema.Schema.Type<typeof PushMessageRequestSchema>

export const PushMessageResponseSchema = Schema.Struct({
  sentMessages: Schema.Array(SentMessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'Array of sent messages.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message-response',
    },
  })
  .annotate({ identifier: 'PushMessageResponse' })

export type PushMessageResponse = Schema.Schema.Type<typeof PushMessageResponseSchema>

export const MulticastRequestSchema = Schema.Struct({
  messages: Schema.Array(MessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'Messages to send' }),
  to: Schema.Array(Schema.String)
    .check(Schema.isMinLength(1), Schema.isMaxLength(500))
    .annotate({
      description:
        'Array of user IDs. Use userId values which are returned in webhook event objects. Do not use LINE IDs found on LINE.',
    }),
  notificationDisabled: Schema.optionalKey(NotificationDisabledSchema),
  customAggregationUnits: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isPattern(/^[a-zA-Z0-9_]{1,30}$/),
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 30, {
          expected: 'a string of at most 30 characters',
        }),
      ),
    )
      .check(Schema.isMaxLength(1))
      .annotate({ description: 'Name of aggregation unit. Case-sensitive.' }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-message',
    },
  })
  .annotate({ identifier: 'MulticastRequest' })

export type MulticastRequest = Schema.Schema.Type<typeof MulticastRequestSchema>

export const MulticastResponseSchema = Schema.Struct({})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-response',
    },
  })
  .annotate({ identifier: 'MulticastResponse' })

export type MulticastResponse = Schema.Schema.Type<typeof MulticastResponseSchema>

export const RecipientSchema = Schema.Struct({
  type: Schema.optionalKey(Schema.String.annotate({ description: 'Type of recipient' })),
})
  .annotate({ description: 'Recipient' })
  .annotate({ identifier: 'Recipient' })

export type Recipient = Schema.Schema.Type<typeof RecipientSchema>

export const DemographicFilterSchema = Schema.Struct({
  type: Schema.optionalKey(Schema.String.annotate({ description: 'Type of demographic filter' })),
})
  .annotate({ description: 'Demographic filter' })
  .annotate({ identifier: 'DemographicFilter' })

export type DemographicFilter = Schema.Schema.Type<typeof DemographicFilterSchema>

export const FilterSchema = Schema.Struct({
  demographic: Schema.optionalKey(DemographicFilterSchema),
})
  .annotate({ description: 'Filter for narrowcast' })
  .annotate({ identifier: 'Filter' })

export type Filter = Schema.Schema.Type<typeof FilterSchema>

export const LimitSchema = Schema.Struct({
  max: Schema.optionalKey(
    Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(1)).annotate({
      description:
        'The maximum number of narrowcast messages to send.\nUse this parameter to limit the number of narrowcast messages sent.\nThe recipients will be chosen at random.\n',
    }),
  ),
  upToRemainingQuota: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description:
      'If true, the message will be sent within the maximum number of deliverable messages. The default value is `false`.\n\nTargets will be selected at random.\n',
  }),
  forbidPartialDelivery: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description:
      'This option prevents messages from being delivered to only a subset of the target audience.\nIf true, the narrowcast request success but fails asynchronously.\nYou can check whether message delivery was canceled by retrieving the narrowcast message progress.\n\nThis property can be set to true only if upToRemainingQuota is set to true.\n',
  }),
})
  .annotate({
    description: 'Limit of the Narrowcast',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  })
  .annotate({ identifier: 'Limit' })

export type Limit = Schema.Schema.Type<typeof LimitSchema>

export const NarrowcastRequestSchema = Schema.Struct({
  messages: Schema.Array(MessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'List of Message objects.' }),
  recipient: Schema.optionalKey(RecipientSchema),
  filter: Schema.optionalKey(FilterSchema),
  limit: Schema.optionalKey(LimitSchema),
  notificationDisabled: Schema.optionalKey(NotificationDisabledSchema),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  })
  .annotate({ identifier: 'NarrowcastRequest' })

export type NarrowcastRequest = Schema.Schema.Type<typeof NarrowcastRequestSchema>

export const NarrowcastResponseSchema = Schema.Struct({})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-response',
    },
  })
  .annotate({ identifier: 'NarrowcastResponse' })

export type NarrowcastResponse = Schema.Schema.Type<typeof NarrowcastResponseSchema>

export const OperatorRecipientSchema = (() => {
  const M0 = RecipientSchema
  const M1 = Schema.Struct({
    and: Schema.optionalKey(
      Schema.Array(RecipientSchema).annotate({
        description:
          'Create a new recipient object by taking the logical conjunction (AND) of the specified array of recipient objects.\n',
      }),
    ),
    or: Schema.optionalKey(
      Schema.Array(RecipientSchema).annotate({
        description:
          'Create a new recipient object by taking the logical disjunction (OR) of the specified array of recipient objects.\n',
      }),
    ),
    not: Schema.optionalKey(RecipientSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'OperatorRecipient' })

export type OperatorRecipient = Schema.Schema.Type<typeof OperatorRecipientSchema>

export const AudienceRecipientSchema = (() => {
  const M0 = RecipientSchema
  const M1 = Schema.Struct({
    audienceGroupId: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'AudienceRecipient' })

export type AudienceRecipient = Schema.Schema.Type<typeof AudienceRecipientSchema>

export const RedeliveryRecipientSchema = (() => {
  const M0 = RecipientSchema
  const M1 = Schema.Struct({ requestId: Schema.optionalKey(Schema.String) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'RedeliveryRecipient' })

export type RedeliveryRecipient = Schema.Schema.Type<typeof RedeliveryRecipientSchema>

export const AgeDemographicSchema = Schema.Literals([
  'age_15',
  'age_20',
  'age_25',
  'age_30',
  'age_35',
  'age_40',
  'age_45',
  'age_50',
  'age_55',
  'age_60',
  'age_65',
  'age_70',
]).annotate({ identifier: 'AgeDemographic' })

export type AgeDemographic = Schema.Schema.Type<typeof AgeDemographicSchema>

export const AgeDemographicFilterSchema = (() => {
  const M0 = DemographicFilterSchema
  const M1 = Schema.Struct({
    gte: Schema.optionalKey(AgeDemographicSchema),
    lt: Schema.optionalKey(AgeDemographicSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'AgeDemographicFilter' })

export type AgeDemographicFilter = Schema.Schema.Type<typeof AgeDemographicFilterSchema>

export const AppTypeDemographicSchema = Schema.Literals(['ios', 'android']).annotate({
  identifier: 'AppTypeDemographic',
})

export type AppTypeDemographic = Schema.Schema.Type<typeof AppTypeDemographicSchema>

export const AppTypeDemographicFilterSchema = (() => {
  const M0 = DemographicFilterSchema
  const M1 = Schema.Struct({ oneOf: Schema.optionalKey(Schema.Array(AppTypeDemographicSchema)) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'AppTypeDemographicFilter' })

export type AppTypeDemographicFilter = Schema.Schema.Type<typeof AppTypeDemographicFilterSchema>

export const AreaDemographicSchema = Schema.Literals([
  'jp_01',
  'jp_02',
  'jp_03',
  'jp_04',
  'jp_05',
  'jp_06',
  'jp_07',
  'jp_08',
  'jp_09',
  'jp_10',
  'jp_11',
  'jp_12',
  'jp_13',
  'jp_14',
  'jp_15',
  'jp_16',
  'jp_17',
  'jp_18',
  'jp_19',
  'jp_20',
  'jp_21',
  'jp_22',
  'jp_23',
  'jp_24',
  'jp_25',
  'jp_26',
  'jp_27',
  'jp_28',
  'jp_29',
  'jp_30',
  'jp_31',
  'jp_32',
  'jp_33',
  'jp_34',
  'jp_35',
  'jp_36',
  'jp_37',
  'jp_38',
  'jp_39',
  'jp_40',
  'jp_41',
  'jp_42',
  'jp_43',
  'jp_44',
  'jp_45',
  'jp_46',
  'jp_47',
  'tw_01',
  'tw_02',
  'tw_03',
  'tw_04',
  'tw_05',
  'tw_06',
  'tw_07',
  'tw_08',
  'tw_09',
  'tw_10',
  'tw_11',
  'tw_12',
  'tw_13',
  'tw_14',
  'tw_15',
  'tw_16',
  'tw_17',
  'tw_18',
  'tw_19',
  'tw_20',
  'tw_21',
  'tw_22',
  'th_01',
  'th_02',
  'th_03',
  'th_04',
  'th_05',
  'th_06',
  'th_07',
  'th_08',
  'id_01',
  'id_02',
  'id_03',
  'id_04',
  'id_05',
  'id_06',
  'id_07',
  'id_08',
  'id_09',
  'id_10',
  'id_11',
  'id_12',
])
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  })
  .annotate({ identifier: 'AreaDemographic' })

export type AreaDemographic = Schema.Schema.Type<typeof AreaDemographicSchema>

export const AreaDemographicFilterSchema = (() => {
  const M0 = DemographicFilterSchema
  const M1 = Schema.Struct({ oneOf: Schema.optionalKey(Schema.Array(AreaDemographicSchema)) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'AreaDemographicFilter' })

export type AreaDemographicFilter = Schema.Schema.Type<typeof AreaDemographicFilterSchema>

export const GenderDemographicSchema = Schema.Literals(['male', 'female']).annotate({
  identifier: 'GenderDemographic',
})

export type GenderDemographic = Schema.Schema.Type<typeof GenderDemographicSchema>

export const GenderDemographicFilterSchema = (() => {
  const M0 = DemographicFilterSchema
  const M1 = Schema.Struct({ oneOf: Schema.optionalKey(Schema.Array(GenderDemographicSchema)) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'GenderDemographicFilter' })

export type GenderDemographicFilter = Schema.Schema.Type<typeof GenderDemographicFilterSchema>

export const OperatorDemographicFilterSchema = (() => {
  const M0 = DemographicFilterSchema
  const M1 = Schema.Struct({
    and: Schema.optionalKey(Schema.Array(DemographicFilterSchema)),
    or: Schema.optionalKey(Schema.Array(DemographicFilterSchema)),
    not: Schema.optionalKey(DemographicFilterSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'OperatorDemographicFilter' })

export type OperatorDemographicFilter = Schema.Schema.Type<typeof OperatorDemographicFilterSchema>

export const SubscriptionPeriodDemographicSchema = Schema.Literals([
  'day_7',
  'day_30',
  'day_90',
  'day_180',
  'day_365',
]).annotate({ identifier: 'SubscriptionPeriodDemographic' })

export type SubscriptionPeriodDemographic = Schema.Schema.Type<
  typeof SubscriptionPeriodDemographicSchema
>

export const SubscriptionPeriodDemographicFilterSchema = (() => {
  const M0 = DemographicFilterSchema
  const M1 = Schema.Struct({
    gte: Schema.optionalKey(SubscriptionPeriodDemographicSchema),
    lt: Schema.optionalKey(SubscriptionPeriodDemographicSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'SubscriptionPeriodDemographicFilter' })

export type SubscriptionPeriodDemographicFilter = Schema.Schema.Type<
  typeof SubscriptionPeriodDemographicFilterSchema
>

export const NarrowcastProgressResponseSchema = Schema.Struct({
  phase: Schema.Literals(['waiting', 'sending', 'succeeded', 'failed']).annotate({
    description:
      'The current status. One of:\n\n`waiting`: Messages are not yet ready to be sent. They are currently being filtered or processed in some way.\n`sending`: Messages are currently being sent.\n`succeeded`: Messages were sent successfully. This may not mean the messages were successfully received.\n`failed`: Messages failed to be sent. Use the failedDescription property to find the cause of the failure.\n',
  }),
  successCount: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The number of users who successfully received the message.' }),
  ),
  failureCount: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The number of users who failed to send the message.' }),
  ),
  targetCount: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The number of intended recipients of the message.' }),
  ),
  failedDescription: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The reason the message failed to be sent. This is only included with a `phase` property value of `failed`.',
    }),
  ),
  errorCode: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          "Error summary. This is only included with a phase property value of failed.\nOne of:\n\n`1`: An internal error occurred.\n`2`: An error occurred because there weren't enough recipients.\n`3`: A conflict error of requests occurs because a request that has already been accepted is retried.\n`4`: An audience of less than 50 recipients is included as a condition of sending.\n`5`: Message delivery has been canceled to prevent messages from being delivered only to a subset of the target audience.\n",
      }),
  ),
  acceptedTime: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({
    description:
      'Narrowcast message request accepted time in milliseconds.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
  }),
  completedTime: Schema.optionalKey(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'Processing of narrowcast message request completion time in milliseconds. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status',
    },
  })
  .annotate({ identifier: 'NarrowcastProgressResponse' })

export type NarrowcastProgressResponse = Schema.Schema.Type<typeof NarrowcastProgressResponseSchema>

export const BroadcastRequestSchema = Schema.Struct({
  messages: Schema.Array(MessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'List of Message objects.' }),
  notificationDisabled: Schema.optionalKey(NotificationDisabledSchema),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message',
    },
  })
  .annotate({ identifier: 'BroadcastRequest' })

export type BroadcastRequest = Schema.Schema.Type<typeof BroadcastRequestSchema>

export const BroadcastResponseSchema = Schema.Struct({})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-response',
    },
  })
  .annotate({ identifier: 'BroadcastResponse' })

export type BroadcastResponse = Schema.Schema.Type<typeof BroadcastResponseSchema>

export const QuotaTypeSchema = Schema.Literals(['none', 'limited'])
  .annotate({
    description: 'One of the following values to indicate whether a target limit is set or not.',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota',
    },
  })
  .annotate({ identifier: 'QuotaType' })

export type QuotaType = Schema.Schema.Type<typeof QuotaTypeSchema>

export const MessageQuotaResponseSchema = Schema.Struct({
  type: QuotaTypeSchema,
  value: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'The target limit for sending messages in the current month. This property is returned when the `type` property has a value of `limited`.\n',
      }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota',
    },
  })
  .annotate({ identifier: 'MessageQuotaResponse' })

export type MessageQuotaResponse = Schema.Schema.Type<typeof MessageQuotaResponseSchema>

export const QuotaConsumptionResponseSchema = Schema.Struct({
  totalUsage: Schema.Union([
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
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({ description: 'The number of sent messages in the current month' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-consumption',
    },
  })
  .annotate({ identifier: 'QuotaConsumptionResponse' })

export type QuotaConsumptionResponse = Schema.Schema.Type<typeof QuotaConsumptionResponseSchema>

export const NumberOfMessagesResponseSchema = Schema.Struct({
  status: Schema.Literals([
    'ready',
    'unready',
    'unavailable_for_privacy',
    'out_of_service',
  ]).annotate({
    description:
      "Aggregation process status. One of:\n\n`ready`: The number of messages can be obtained.\n`unready`: We haven't finished calculating the number of sent messages for the specified in date. For example, this property is returned when the delivery date or a future date is specified. Calculation usually takes about a day.\n`unavailable_for_privacy`: The total number of messages on the specified day is less than 20.\n`out_of_service`: The specified date is earlier than the date on which we first started calculating sent messages (March 31, 2018).\n",
  }),
  success: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'The number of messages delivered using the phone number on the date specified in `date`.\nThe response has this property only when the value of `status` is `ready`.\n\n',
      }),
  ),
}).annotate({ identifier: 'NumberOfMessagesResponse' })

export type NumberOfMessagesResponse = Schema.Schema.Type<typeof NumberOfMessagesResponseSchema>

export const ValidateMessageRequestSchema = Schema.Struct({
  messages: Schema.Array(MessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'Array of message objects to validate' }),
}).annotate({ identifier: 'ValidateMessageRequest' })

export type ValidateMessageRequest = Schema.Schema.Type<typeof ValidateMessageRequestSchema>

export const GetAggregationUnitUsageResponseSchema = Schema.Struct({
  numOfCustomAggregationUnits: Schema.Union([
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
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({ description: 'Number of aggregation units used this month.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month',
    },
  })
  .annotate({ identifier: 'GetAggregationUnitUsageResponse' })

export type GetAggregationUnitUsageResponse = Schema.Schema.Type<
  typeof GetAggregationUnitUsageResponseSchema
>

export const GetAggregationUnitNameListResponseSchema = Schema.Struct({
  customAggregationUnits: Schema.Array(Schema.String).annotate({
    description: 'An array of strings indicating the names of aggregation units used this month.',
  }),
  next: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A continuation token to get the next array of unit names.\nReturned only when there are remaining aggregation units that weren't returned in customAggregationUnits in the original request.\n\n",
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month',
    },
  })
  .annotate({ identifier: 'GetAggregationUnitNameListResponse' })

export type GetAggregationUnitNameListResponse = Schema.Schema.Type<
  typeof GetAggregationUnitNameListResponseSchema
>

export const UserProfileResponseSchema = Schema.Struct({
  displayName: Schema.String.annotate({ description: "User's display name" }),
  userId: Schema.String.annotate({ description: 'User ID' }),
  pictureUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
    }),
  ),
  statusMessage: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "User's status message. Not included in the response if the user doesn't have a status message.",
    }),
  ),
  language: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "User's language, as a BCP 47 language tag. Not included in the response if the user hasn't yet consented to the LINE Privacy Policy.",
      jsonSchemaExamples: ['en'],
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-profile',
    },
  })
  .annotate({ identifier: 'UserProfileResponse' })

export type UserProfileResponse = Schema.Schema.Type<typeof UserProfileResponseSchema>

export const GetFollowersResponseSchema = Schema.Struct({
  userIds: Schema.Array(Schema.String)
    .check(Schema.isMaxLength(1000))
    .annotate({
      description:
        'An array of strings indicating user IDs of users that have added the LINE Official Account as a friend.\nOnly users of LINE for iOS and LINE for Android are included in `userIds`.\n',
    }),
  next: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A continuation token to get the next array of user IDs.\nReturned only when there are remaining user IDs that weren't returned in `userIds` in the original request.\nThe number of user IDs in the `userIds` element doesn't have to reach the maximum number specified by `limit` for the `next` property to be included in the response.\n\n",
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-follower-ids',
    },
  })
  .annotate({ identifier: 'GetFollowersResponse' })

export type GetFollowersResponse = Schema.Schema.Type<typeof GetFollowersResponseSchema>

export const BotInfoResponseSchema = Schema.Struct({
  userId: Schema.String.annotate({ description: "Bot's user ID" }),
  basicId: Schema.String.annotate({ description: "Bot's basic ID" }),
  premiumId: Schema.optionalKey(
    Schema.String.annotate({
      description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
    }),
  ),
  displayName: Schema.String.annotate({ description: "Bot's display name" }),
  pictureUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        "Profile image URL. `https` image URL. Not included in the response if the bot doesn't have a profile image.",
    }),
  ),
  chatMode: Schema.Literals(['chat', 'bot']).annotate({
    description:
      'Chat settings set in the LINE Official Account Manager. One of:\n\n`chat`: Chat is set to "On".\n`bot`: Chat is set to "Off".\n',
  }),
  markAsReadMode: Schema.Literals(['auto', 'manual']).annotate({
    description:
      'Automatic read setting for messages. If the chat is set to "Off", auto is returned. If the chat is set to "On", manual is returned.\n\n`auto`: Auto read setting is enabled.\n`manual`: Auto read setting is disabled.\n\n',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-bot-info',
    },
  })
  .annotate({ identifier: 'BotInfoResponse' })

export type BotInfoResponse = Schema.Schema.Type<typeof BotInfoResponseSchema>

export const GroupUserProfileResponseSchema = Schema.Struct({
  displayName: Schema.String.annotate({ description: "User's display name" }),
  userId: Schema.String.annotate({ description: 'User ID' }),
  pictureUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile',
    },
  })
  .annotate({ identifier: 'GroupUserProfileResponse' })

export type GroupUserProfileResponse = Schema.Schema.Type<typeof GroupUserProfileResponseSchema>

export const RoomUserProfileResponseSchema = Schema.Struct({
  displayName: Schema.String.annotate({ description: "User's display name" }),
  userId: Schema.String.annotate({ description: 'User ID' }),
  pictureUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile',
    },
  })
  .annotate({ identifier: 'RoomUserProfileResponse' })

export type RoomUserProfileResponse = Schema.Schema.Type<typeof RoomUserProfileResponseSchema>

export const MembersIdsResponseSchema = Schema.Struct({
  memberIds: Schema.Array(Schema.String)
    .check(Schema.isMaxLength(100))
    .annotate({
      description:
        'List of user IDs of members in the group chat. Only users of LINE for iOS and LINE for Android are included in `memberIds`.',
    }),
  next: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'A continuation token to get the next array of user IDs of the members in the group chat.\nReturned only when there are remaining user IDs that were not returned in `memberIds` in the original request.\n',
    }),
  ),
}).annotate({ identifier: 'MembersIdsResponse' })

export type MembersIdsResponse = Schema.Schema.Type<typeof MembersIdsResponseSchema>

export const GroupSummaryResponseSchema = Schema.Struct({
  groupId: Schema.String.annotate({ description: 'Group ID' }),
  groupName: Schema.String.annotate({ description: 'Group name' }),
  pictureUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        "Group icon URL. Not included in the response if the user doesn't set a group profile icon.",
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-summary',
    },
  })
  .annotate({ identifier: 'GroupSummaryResponse' })

export type GroupSummaryResponse = Schema.Schema.Type<typeof GroupSummaryResponseSchema>

export const GroupMemberCountResponseSchema = Schema.Struct({
  count: Schema.Number.check(Schema.isInt32()).annotate({
    description:
      'The count of members in the group chat. The number returned excludes the LINE Official Account.',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-group-count',
    },
  })
  .annotate({ identifier: 'GroupMemberCountResponse' })

export type GroupMemberCountResponse = Schema.Schema.Type<typeof GroupMemberCountResponseSchema>

export const RoomMemberCountResponseSchema = Schema.Struct({
  count: Schema.Number.check(Schema.isInt32()).annotate({
    description:
      'The count of members in the multi-person chat. The number returned excludes the LINE Official Account.',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-room-count',
    },
  })
  .annotate({ identifier: 'RoomMemberCountResponse' })

export type RoomMemberCountResponse = Schema.Schema.Type<typeof RoomMemberCountResponseSchema>

export const RichMenuSizeSchema = Schema.Struct({
  width: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        Schema.isGreaterThanOrEqualToBigInt(1n),
        Schema.isLessThanOrEqualToBigInt(2147483647n),
      )
      .annotate({ description: 'width' }),
  ),
  height: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        Schema.isGreaterThanOrEqualToBigInt(1n),
        Schema.isLessThanOrEqualToBigInt(2147483647n),
      )
      .annotate({ description: 'height' }),
  ),
})
  .annotate({ description: 'Rich menu size' })
  .annotate({ identifier: 'RichMenuSize' })

export type RichMenuSize = Schema.Schema.Type<typeof RichMenuSizeSchema>

export const RichMenuBoundsSchema = Schema.Struct({
  x: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        Schema.isGreaterThanOrEqualToBigInt(0n),
        Schema.isLessThanOrEqualToBigInt(2147483647n),
      )
      .annotate({
        description: 'Horizontal position relative to the top-left corner of the area.',
      }),
  ),
  y: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        Schema.isGreaterThanOrEqualToBigInt(0n),
        Schema.isLessThanOrEqualToBigInt(2147483647n),
      )
      .annotate({ description: 'Vertical position relative to the top-left corner of the area.' }),
  ),
  width: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        Schema.isGreaterThanOrEqualToBigInt(1n),
        Schema.isLessThanOrEqualToBigInt(2147483647n),
      )
      .annotate({ description: 'Width of the area.' }),
  ),
  height: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        Schema.isGreaterThanOrEqualToBigInt(1n),
        Schema.isLessThanOrEqualToBigInt(2147483647n),
      )
      .annotate({ description: 'Height of the area.' }),
  ),
})
  .annotate({
    description: 'Rich menu bounds',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#bounds-object',
    },
  })
  .annotate({ identifier: 'RichMenuBounds' })

export type RichMenuBounds = Schema.Schema.Type<typeof RichMenuBoundsSchema>

export const RichMenuAreaSchema = Schema.Struct({
  bounds: Schema.optionalKey(RichMenuBoundsSchema),
  action: Schema.optionalKey(ActionSchema),
})
  .annotate({ description: 'Rich menu area' })
  .annotate({ identifier: 'RichMenuArea' })

export type RichMenuArea = Schema.Schema.Type<typeof RichMenuAreaSchema>

export const RichMenuRequestSchema = Schema.Struct({
  size: Schema.optionalKey(RichMenuSizeSchema),
  selected: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: '`true` to display the rich menu by default. Otherwise, `false`.',
    }),
  ),
  name: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 300, {
        expected: 'a string of at most 300 characters',
      }),
    ).annotate({
      description:
        'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
    }),
  ),
  chatBarText: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 14, {
        expected: 'a string of at most 14 characters',
      }),
    ).annotate({ description: 'Text displayed in the chat bar' }),
  ),
  areas: Schema.optionalKey(
    Schema.Array(RichMenuAreaSchema).annotate({
      description: 'Array of area objects which define the coordinates and size of tappable areas',
    }),
  ),
}).annotate({ identifier: 'RichMenuRequest' })

export type RichMenuRequest = Schema.Schema.Type<typeof RichMenuRequestSchema>

export const RichMenuIdResponseSchema = Schema.Struct({
  richMenuId: Schema.String.annotate({ description: 'Rich menu ID' }),
}).annotate({ identifier: 'RichMenuIdResponse' })

export type RichMenuIdResponse = Schema.Schema.Type<typeof RichMenuIdResponseSchema>

export const RichMenuResponseSchema = Schema.Struct({
  richMenuId: Schema.String.annotate({ description: 'ID of a rich menu' }),
  size: RichMenuSizeSchema,
  selected: Schema.Boolean.annotate({
    description: '`true` to display the rich menu by default. Otherwise, `false`.',
  }),
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 300, {
      expected: 'a string of at most 300 characters',
    }),
  ).annotate({
    description:
      'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
  }),
  chatBarText: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 14, {
      expected: 'a string of at most 14 characters',
    }),
  ).annotate({ description: 'Text displayed in the chat bar' }),
  areas: Schema.Array(RichMenuAreaSchema)
    .check(Schema.isMaxLength(20))
    .annotate({
      description: 'Array of area objects which define the coordinates and size of tappable areas',
    }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#rich-menu-response-object',
    },
  })
  .annotate({ identifier: 'RichMenuResponse' })

export type RichMenuResponse = Schema.Schema.Type<typeof RichMenuResponseSchema>

export const RichMenuListResponseSchema = Schema.Struct({
  richmenus: Schema.Array(RichMenuResponseSchema).annotate({ description: 'Rich menus' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list',
    },
  })
  .annotate({ identifier: 'RichMenuListResponse' })

export type RichMenuListResponse = Schema.Schema.Type<typeof RichMenuListResponseSchema>

export const CreateRichMenuAliasRequestSchema = Schema.Struct({
  richMenuAliasId: Schema.String.check(
    Schema.isPattern(/^[a-z0-9_-]{1,32}$/),
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ).annotate({ description: 'Rich menu alias ID, which can be any ID, unique for each channel.' }),
  richMenuId: Schema.String.annotate({
    description: 'The rich menu ID to be associated with the rich menu alias.',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias',
    },
  })
  .annotate({ identifier: 'CreateRichMenuAliasRequest' })

export type CreateRichMenuAliasRequest = Schema.Schema.Type<typeof CreateRichMenuAliasRequestSchema>

export const RichMenuAliasResponseSchema = Schema.Struct({
  richMenuAliasId: Schema.String.annotate({ description: 'Rich menu alias ID.' }),
  richMenuId: Schema.String.annotate({
    description: 'The rich menu ID associated with the rich menu alias.',
  }),
}).annotate({ identifier: 'RichMenuAliasResponse' })

export type RichMenuAliasResponse = Schema.Schema.Type<typeof RichMenuAliasResponseSchema>

export const UpdateRichMenuAliasRequestSchema = Schema.Struct({
  richMenuId: Schema.String.annotate({
    description: 'The rich menu ID to be associated with the rich menu alias.',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias',
    },
  })
  .annotate({ identifier: 'UpdateRichMenuAliasRequest' })

export type UpdateRichMenuAliasRequest = Schema.Schema.Type<typeof UpdateRichMenuAliasRequestSchema>

export const RichMenuAliasListResponseSchema = Schema.Struct({
  aliases: Schema.Array(RichMenuAliasResponseSchema).annotate({
    description: 'Rich menu aliases.',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list',
    },
  })
  .annotate({ identifier: 'RichMenuAliasListResponse' })

export type RichMenuAliasListResponse = Schema.Schema.Type<typeof RichMenuAliasListResponseSchema>

export const RichMenuBulkLinkRequestSchema = Schema.Struct({
  richMenuId: Schema.String.annotate({ description: 'ID of a rich menu' }),
  userIds: Schema.Array(Schema.String)
    .check(Schema.isMinLength(1), Schema.isMaxLength(500))
    .annotate({
      description:
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-users',
    },
  })
  .annotate({ identifier: 'RichMenuBulkLinkRequest' })

export type RichMenuBulkLinkRequest = Schema.Schema.Type<typeof RichMenuBulkLinkRequestSchema>

export const RichMenuBulkUnlinkRequestSchema = Schema.Struct({
  userIds: Schema.Array(Schema.String)
    .check(Schema.isMinLength(1), Schema.isMaxLength(500))
    .annotate({
      description:
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-users',
    },
  })
  .annotate({ identifier: 'RichMenuBulkUnlinkRequest' })

export type RichMenuBulkUnlinkRequest = Schema.Schema.Type<typeof RichMenuBulkUnlinkRequestSchema>

export const RichMenuBatchOperationSchema = Schema.Struct({
  type: Schema.String.annotate({
    description:
      'The type of operation to the rich menu linked to the user. One of link, unlink, or unlinkAll.',
  }),
})
  .annotate({
    description:
      'Rich menu operation object represents the batch operation to the rich menu linked to the user.',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users-operations',
    },
  })
  .annotate({ identifier: 'RichMenuBatchOperation' })

export type RichMenuBatchOperation = Schema.Schema.Type<typeof RichMenuBatchOperationSchema>

export const RichMenuBatchRequestSchema = Schema.Struct({
  operations: Schema.Array(RichMenuBatchOperationSchema)
    .check(Schema.isMaxLength(1000))
    .annotate({ description: 'Array of Rich menu operation object...' }),
  resumeRequestKey: Schema.optionalKey(
    Schema.String.check(
      Schema.isPattern(/^[a-zA-Z0-9_-]{1,100}$/),
      Schema.makeFilter((input) => [...input].length >= 1, {
        expected: 'a string of at least 1 character',
      }),
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ).annotate({
      description: 'Key for retry. Key value is a string matching the regular expression pattern',
    }),
  ),
}).annotate({ identifier: 'RichMenuBatchRequest' })

export type RichMenuBatchRequest = Schema.Schema.Type<typeof RichMenuBatchRequestSchema>

export const RichMenuBatchLinkOperationSchema = (() => {
  const M0 = RichMenuBatchOperationSchema
  const M1 = Schema.Struct({
    from: Schema.optionalKey(Schema.String),
    to: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    description:
      'Replace the rich menu with the rich menu specified in the `to` property for all users linked to the rich menu specified in the `from` property.',
  })
  .annotate({ identifier: 'RichMenuBatchLinkOperation' })

export type RichMenuBatchLinkOperation = Schema.Schema.Type<typeof RichMenuBatchLinkOperationSchema>

export const RichMenuBatchUnlinkOperationSchema = (() => {
  const M0 = RichMenuBatchOperationSchema
  const M1 = Schema.Struct({ from: Schema.optionalKey(Schema.String) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    description:
      'Unlink the rich menu for all users linked to the rich menu specified in the `from` property.',
  })
  .annotate({ identifier: 'RichMenuBatchUnlinkOperation' })

export type RichMenuBatchUnlinkOperation = Schema.Schema.Type<
  typeof RichMenuBatchUnlinkOperationSchema
>

export const RichMenuBatchUnlinkAllOperationSchema = RichMenuBatchOperationSchema.annotate({
  description: 'Unlink the rich menu from all users linked to the rich menu.',
}).annotate({ identifier: 'RichMenuBatchUnlinkAllOperation' })

export type RichMenuBatchUnlinkAllOperation = Schema.Schema.Type<
  typeof RichMenuBatchUnlinkAllOperationSchema
>

export const RichMenuBatchProgressPhaseSchema = Schema.Literals(['ongoing', 'succeeded', 'failed'])
  .annotate({
    description:
      "The current status. One of:\n\n`ongoing`: Rich menu batch control is in progress.\n`succeeded`: Rich menu batch control is complete.\n`failed`: Rich menu batch control failed.\n          This means that the rich menu for one or more users couldn't be controlled.\n          There may also be users whose operations have been successfully completed.\n",
  })
  .annotate({ identifier: 'RichMenuBatchProgressPhase' })

export type RichMenuBatchProgressPhase = Schema.Schema.Type<typeof RichMenuBatchProgressPhaseSchema>

export const RichMenuBatchProgressResponseSchema = Schema.Struct({
  phase: RichMenuBatchProgressPhaseSchema,
  acceptedTime: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({
    description:
      'The accepted time in milliseconds of the request of batch control the rich menu.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
  }),
  completedTime: Schema.optionalKey(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'The completed time in milliseconds of rich menu batch control. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status-response',
    },
  })
  .annotate({ identifier: 'RichMenuBatchProgressResponse' })

export type RichMenuBatchProgressResponse = Schema.Schema.Type<
  typeof RichMenuBatchProgressResponseSchema
>

export const IssueLinkTokenResponseSchema = Schema.Struct({
  linkToken: Schema.String.annotate({
    description: 'Link token.\nLink tokens are valid for 10 minutes and can only be used once.\n\n',
  }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-link-token',
    },
  })
  .annotate({ identifier: 'IssueLinkTokenResponse' })

export type IssueLinkTokenResponse = Schema.Schema.Type<typeof IssueLinkTokenResponseSchema>

export const ChatReferenceSchema = Schema.Struct({
  userId: Schema.String.annotate({ description: 'The target user ID' }),
})
  .annotate({
    description: 'Chat reference',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  })
  .annotate({ identifier: 'ChatReference' })

export type ChatReference = Schema.Schema.Type<typeof ChatReferenceSchema>

export const MarkMessagesAsReadRequestSchema = Schema.Struct({ chat: ChatReferenceSchema })
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  })
  .annotate({ identifier: 'MarkMessagesAsReadRequest' })

export type MarkMessagesAsReadRequest = Schema.Schema.Type<typeof MarkMessagesAsReadRequestSchema>

export const PnpMessagesRequestSchema = Schema.Struct({
  messages: Schema.Array(MessageSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(5))
    .annotate({ description: 'Message to be sent.' }),
  to: Schema.String.annotate({
    description:
      'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
  }),
  notificationDisabled: Schema.optionalKey(NotificationDisabledSchema),
  customAggregationUnits: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isPattern(/^[a-zA-Z0-9_]{1,30}$/),
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 30, {
          expected: 'a string of at most 30 characters',
        }),
      ),
    )
      .check(Schema.isMaxLength(1))
      .annotate({ description: 'Name of aggregation unit. Case-sensitive.' }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message',
    },
  })
  .annotate({ identifier: 'PnpMessagesRequest' })

export type PnpMessagesRequest = Schema.Schema.Type<typeof PnpMessagesRequestSchema>

export const PnpTemplatedEmphasizedItemSchema = Schema.Struct({
  itemKey: Schema.String.annotate({
    description:
      'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
  }),
  content: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 15, {
      expected: 'a string of at most 15 characters',
    }),
  ).annotate({ description: 'String to be displayed as the value of the item.' }),
})
  .annotate({
    description: 'Item to emphasize in the message.',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  })
  .annotate({ identifier: 'PnpTemplatedEmphasizedItem' })

export type PnpTemplatedEmphasizedItem = Schema.Schema.Type<typeof PnpTemplatedEmphasizedItemSchema>

export const PnpTemplatedItemSchema = Schema.Struct({
  itemKey: Schema.String.annotate({
    description:
      'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
  }),
  content: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 300, {
      expected: 'a string of at most 300 characters',
    }),
  ).annotate({ description: 'String to be displayed as the value of the item.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  })
  .annotate({ identifier: 'PnpTemplatedItem' })

export type PnpTemplatedItem = Schema.Schema.Type<typeof PnpTemplatedItemSchema>

export const PnpTemplatedButtonSchema = Schema.Struct({
  buttonKey: Schema.String.annotate({
    description:
      'Specify the key of the button you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#buttons\n',
  }),
  url: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 1000, {
      expected: 'a string of at most 1000 characters',
    }),
  ).annotate({ description: 'URL of the page to be opened when the user presses the button.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-buttons',
    },
  })
  .annotate({ identifier: 'PnpTemplatedButton' })

export type PnpTemplatedButton = Schema.Schema.Type<typeof PnpTemplatedButtonSchema>

export const PnpTemplatedMessageBodySchema = Schema.Struct({
  emphasizedItem: Schema.optionalKey(PnpTemplatedEmphasizedItemSchema),
  items: Schema.optionalKey(
    Schema.Array(PnpTemplatedItemSchema)
      .check(Schema.isMaxLength(15))
      .annotate({
        description:
          'Array of items to include in the message. The `itemKey` must be unique across `emphasizedItem` and `items`.',
      }),
  ),
  buttons: Schema.optionalKey(
    Schema.Array(PnpTemplatedButtonSchema)
      .check(Schema.isMaxLength(2))
      .annotate({
        description: 'Array of buttons to include in the message. The `buttonKey` must be unique.',
      }),
  ),
})
  .annotate({
    description:
      "The body object of the template you want to send. You can't specify the same item more than once in a single message.",
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  })
  .annotate({ identifier: 'PnpTemplatedMessageBody' })

export type PnpTemplatedMessageBody = Schema.Schema.Type<typeof PnpTemplatedMessageBodySchema>

export const PnpTemplatedMessageRequestSchema = Schema.Struct({
  to: Schema.String.annotate({
    description:
      'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
  }),
  templateKey: Schema.String.annotate({
    description:
      'Specify the key of the template you want to send.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#templates\n',
  }),
  body: Schema.optionalKey(PnpTemplatedMessageBodySchema),
  customAggregationUnits: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isPattern(/^[a-zA-Z0-9_]{1,30}$/),
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 30, {
          expected: 'a string of at most 30 characters',
        }),
      ),
    )
      .check(Schema.isMaxLength(1))
      .annotate({
        description:
          'Name of aggregation unit. Case-sensitive.\nFor more information about assigning a unit name, see https://developers.line.biz/en/docs/messaging-api/unit-based-statistics-aggregation/#assign-names-to-units-when-sending-messages\n',
      }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  })
  .annotate({ identifier: 'PnpTemplatedMessageRequest' })

export type PnpTemplatedMessageRequest = Schema.Schema.Type<typeof PnpTemplatedMessageRequestSchema>

export const EmojiSchema = Schema.Struct({
  index: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
  productId: Schema.optionalKey(Schema.String),
  emojiId: Schema.optionalKey(Schema.String),
}).annotate({ identifier: 'Emoji' })

export type Emoji = Schema.Schema.Type<typeof EmojiSchema>

export const TextMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    text: Schema.optionalKey(Schema.String),
    emojis: Schema.optionalKey(Schema.Array(EmojiSchema)),
    quoteToken: Schema.optionalKey(
      Schema.String.annotate({ description: 'Quote token of the message you want to quote.' }),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message',
    },
  })
  .annotate({ identifier: 'TextMessage' })

export type TextMessage = Schema.Schema.Type<typeof TextMessageSchema>

export const SubstitutionObjectSchema = Schema.Struct({
  type: Schema.String.annotate({ description: 'Type of substitution object' }),
})
  .annotate({
    description: 'An object that defines the replacement value for a placeholder in the text.',
  })
  .annotate({ identifier: 'SubstitutionObject' })

export type SubstitutionObject = Schema.Schema.Type<typeof SubstitutionObjectSchema>

export const TextMessageV2Schema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    text: Schema.optionalKey(Schema.String),
    substitution: Schema.optionalKey(
      Schema.Record(Schema.String, SubstitutionObjectSchema).annotate({
        description:
          'A mapping that specifies substitutions for parts enclosed in {} within the `text` field.',
      }),
    ),
    quoteToken: Schema.optionalKey(
      Schema.String.annotate({ description: 'Quote token of the message you want to quote.' }),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2',
    },
  })
  .annotate({ identifier: 'TextMessageV2' })

export type TextMessageV2 = Schema.Schema.Type<typeof TextMessageV2Schema>

export const MentionTargetSchema = Schema.Struct({
  type: Schema.String.annotate({ description: 'Target to be mentioned' }),
}).annotate({ identifier: 'MentionTarget' })

export type MentionTarget = Schema.Schema.Type<typeof MentionTargetSchema>

export const MentionSubstitutionObjectSchema = (() => {
  const M0 = SubstitutionObjectSchema
  const M1 = Schema.Struct({ mentionee: MentionTargetSchema })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    description: 'An object representing a mention substitution.',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mention-object',
    },
  })
  .annotate({ identifier: 'MentionSubstitutionObject' })

export type MentionSubstitutionObject = Schema.Schema.Type<typeof MentionSubstitutionObjectSchema>

export const UserMentionTargetSchema = (() => {
  const M0 = MentionTargetSchema
  const M1 = Schema.Struct({ userId: Schema.String })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-user',
    },
  })
  .annotate({ identifier: 'UserMentionTarget' })

export type UserMentionTarget = Schema.Schema.Type<typeof UserMentionTargetSchema>

export const AllMentionTargetSchema = MentionTargetSchema.annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-all',
  },
}).annotate({ identifier: 'AllMentionTarget' })

export type AllMentionTarget = Schema.Schema.Type<typeof AllMentionTargetSchema>

export const EmojiSubstitutionObjectSchema = (() => {
  const M0 = SubstitutionObjectSchema
  const M1 = Schema.Struct({ productId: Schema.String, emojiId: Schema.String })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    description: 'An object representing a emoji substitution.',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-emoji-object',
    },
  })
  .annotate({ identifier: 'EmojiSubstitutionObject' })

export type EmojiSubstitutionObject = Schema.Schema.Type<typeof EmojiSubstitutionObjectSchema>

export const StickerMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    packageId: Schema.optionalKey(Schema.String),
    stickerId: Schema.optionalKey(Schema.String),
    quoteToken: Schema.optionalKey(
      Schema.String.annotate({ description: 'Quote token of the message you want to quote.' }),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#sticker-message',
    },
  })
  .annotate({ identifier: 'StickerMessage' })

export type StickerMessage = Schema.Schema.Type<typeof StickerMessageSchema>

export const ImageMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    originalContentUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
    previewImageUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#image-message',
    },
  })
  .annotate({ identifier: 'ImageMessage' })

export type ImageMessage = Schema.Schema.Type<typeof ImageMessageSchema>

export const VideoMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    originalContentUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
    previewImageUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
    trackingId: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#video-message',
    },
  })
  .annotate({ identifier: 'VideoMessage' })

export type VideoMessage = Schema.Schema.Type<typeof VideoMessageSchema>

export const AudioMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    originalContentUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
    duration: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#audio-message',
    },
  })
  .annotate({ identifier: 'AudioMessage' })

export type AudioMessage = Schema.Schema.Type<typeof AudioMessageSchema>

export const LocationMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    title: Schema.optionalKey(Schema.String),
    address: Schema.optionalKey(Schema.String),
    latitude: Schema.optionalKey(Schema.Number),
    longitude: Schema.optionalKey(Schema.Number),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#location-message',
    },
  })
  .annotate({ identifier: 'LocationMessage' })

export type LocationMessage = Schema.Schema.Type<typeof LocationMessageSchema>

export const ImagemapBaseSizeSchema = Schema.Struct({
  height: Schema.Number.check(Schema.isInt32()),
  width: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'ImagemapBaseSize' })

export type ImagemapBaseSize = Schema.Schema.Type<typeof ImagemapBaseSizeSchema>

export const ImagemapAreaSchema = Schema.Struct({
  x: Schema.Number.check(Schema.isInt32()),
  y: Schema.Number.check(Schema.isInt32()),
  width: Schema.Number.check(Schema.isInt32()),
  height: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'ImagemapArea' })

export type ImagemapArea = Schema.Schema.Type<typeof ImagemapAreaSchema>

export const ImagemapActionSchema = Schema.Struct({ type: Schema.String, area: ImagemapAreaSchema })
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-action-objects',
    },
  })
  .annotate({ identifier: 'ImagemapAction' })

export type ImagemapAction = Schema.Schema.Type<typeof ImagemapActionSchema>

export const ImagemapExternalLinkSchema = Schema.Struct({
  linkUri: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  label: Schema.optionalKey(Schema.String),
}).annotate({ identifier: 'ImagemapExternalLink' })

export type ImagemapExternalLink = Schema.Schema.Type<typeof ImagemapExternalLinkSchema>

export const ImagemapVideoSchema = Schema.Struct({
  originalContentUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  previewImageUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  area: Schema.optionalKey(ImagemapAreaSchema),
  externalLink: Schema.optionalKey(ImagemapExternalLinkSchema),
}).annotate({ identifier: 'ImagemapVideo' })

export type ImagemapVideo = Schema.Schema.Type<typeof ImagemapVideoSchema>

export const ImagemapMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    baseUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
    altText: Schema.optionalKey(Schema.String),
    baseSize: Schema.optionalKey(ImagemapBaseSizeSchema),
    actions: Schema.optionalKey(Schema.Array(ImagemapActionSchema)),
    video: Schema.optionalKey(ImagemapVideoSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-message',
    },
  })
  .annotate({ identifier: 'ImagemapMessage' })

export type ImagemapMessage = Schema.Schema.Type<typeof ImagemapMessageSchema>

export const MessageImagemapActionSchema = (() => {
  const M0 = ImagemapActionSchema
  const M1 = Schema.Struct({
    text: Schema.optionalKey(Schema.String),
    label: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'MessageImagemapAction' })

export type MessageImagemapAction = Schema.Schema.Type<typeof MessageImagemapActionSchema>

export const URIImagemapActionSchema = (() => {
  const M0 = ImagemapActionSchema
  const M1 = Schema.Struct({
    linkUri: Schema.optionalKey(Schema.String),
    label: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'URIImagemapAction' })

export type URIImagemapAction = Schema.Schema.Type<typeof URIImagemapActionSchema>

export const ClipboardImagemapActionSchema = (() => {
  const M0 = ImagemapActionSchema
  const M1 = Schema.Struct({
    clipboardText: Schema.optionalKey(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 1000, {
          expected: 'a string of at most 1000 characters',
        }),
      ).annotate({
        description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n',
      }),
    ),
    label: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-clipboard-action-object',
    },
  })
  .annotate({ identifier: 'ClipboardImagemapAction' })

export type ClipboardImagemapAction = Schema.Schema.Type<typeof ClipboardImagemapActionSchema>

export const TemplateSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'Template',
})

export type Template = Schema.Schema.Type<typeof TemplateSchema>

export const TemplateMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    altText: Schema.optionalKey(Schema.String),
    template: Schema.optionalKey(TemplateSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#template-messages',
    },
  })
  .annotate({ identifier: 'TemplateMessage' })

export type TemplateMessage = Schema.Schema.Type<typeof TemplateMessageSchema>

export const ButtonsTemplateSchema = (() => {
  const M0 = TemplateSchema
  const M1 = Schema.Struct({
    thumbnailImageUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
    imageAspectRatio: Schema.optionalKey(Schema.String),
    imageSize: Schema.optionalKey(Schema.String),
    imageBackgroundColor: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    text: Schema.optionalKey(Schema.String),
    defaultAction: Schema.optionalKey(ActionSchema),
    actions: Schema.optionalKey(Schema.Array(ActionSchema)),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'ButtonsTemplate' })

export type ButtonsTemplate = Schema.Schema.Type<typeof ButtonsTemplateSchema>

export const TemplateImageAspectRatioSchema = Schema.Literals(['rectangle', 'square'])
  .annotate({
    description:
      'Aspect ratio of the image. This is only for the `imageAspectRatio` in ButtonsTemplate.\nSpecify one of the following values:\n\n`rectangle`: 1.51:1\n`square`: 1:1\n',
  })
  .annotate({ identifier: 'TemplateImageAspectRatio' })

export type TemplateImageAspectRatio = Schema.Schema.Type<typeof TemplateImageAspectRatioSchema>

export const TemplateImageSizeSchema = Schema.Literals(['cover', 'contain'])
  .annotate({
    description:
      'Size of the image.  This is only for the `imageSize` in ButtonsTemplate.\nSpecify one of the following values:\n\n`cover`: The image fills the entire image area. Parts of the image that do not fit in the area are not displayed.\n`contain`: The entire image is displayed in the image area. A background is displayed in the unused areas to the left and right of vertical images and in the areas above and below horizontal images.\n',
  })
  .annotate({ identifier: 'TemplateImageSize' })

export type TemplateImageSize = Schema.Schema.Type<typeof TemplateImageSizeSchema>

export const ConfirmTemplateSchema = (() => {
  const M0 = TemplateSchema
  const M1 = Schema.Struct({
    text: Schema.optionalKey(Schema.String),
    actions: Schema.optionalKey(Schema.Array(ActionSchema)),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'ConfirmTemplate' })

export type ConfirmTemplate = Schema.Schema.Type<typeof ConfirmTemplateSchema>

export const CarouselColumnSchema = Schema.Struct({
  thumbnailImageUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  imageBackgroundColor: Schema.optionalKey(Schema.String),
  title: Schema.optionalKey(Schema.String),
  text: Schema.String,
  defaultAction: Schema.optionalKey(ActionSchema),
  actions: Schema.Array(ActionSchema),
})
  .annotate({ description: 'Column object for carousel template.' })
  .annotate({ identifier: 'CarouselColumn' })

export type CarouselColumn = Schema.Schema.Type<typeof CarouselColumnSchema>

export const CarouselTemplateSchema = (() => {
  const M0 = TemplateSchema
  const M1 = Schema.Struct({
    columns: Schema.optionalKey(Schema.Array(CarouselColumnSchema)),
    imageAspectRatio: Schema.optionalKey(Schema.String),
    imageSize: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CarouselTemplate' })

export type CarouselTemplate = Schema.Schema.Type<typeof CarouselTemplateSchema>

export const ImageCarouselColumnSchema = Schema.Struct({
  imageUrl: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  action: ActionSchema,
}).annotate({ identifier: 'ImageCarouselColumn' })

export type ImageCarouselColumn = Schema.Schema.Type<typeof ImageCarouselColumnSchema>

export const ImageCarouselTemplateSchema = (() => {
  const M0 = TemplateSchema
  const M1 = Schema.Struct({ columns: Schema.optionalKey(Schema.Array(ImageCarouselColumnSchema)) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'ImageCarouselTemplate' })

export type ImageCarouselTemplate = Schema.Schema.Type<typeof ImageCarouselTemplateSchema>

export const CouponMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    couponId: Schema.optionalKey(
      Schema.String.annotate({ description: 'Unique identifier of the coupon.' }),
    ),
    deliveryTag: Schema.optionalKey(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 30, {
          expected: 'a string of at most 30 characters',
        }),
      ).annotate({
        description:
          'Delivery route tag information. It can be used for analysis in LINE OA Manager.',
      }),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#coupon-message',
    },
  })
  .annotate({ identifier: 'CouponMessage' })

export type CouponMessage = Schema.Schema.Type<typeof CouponMessageSchema>

export const FlexContainerSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'FlexContainer',
})

export type FlexContainer = Schema.Schema.Type<typeof FlexContainerSchema>

export const FlexMessageSchema = (() => {
  const M0 = MessageSchema
  const M1 = Schema.Struct({
    altText: Schema.optionalKey(Schema.String),
    contents: Schema.optionalKey(FlexContainerSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#flex-message',
    },
  })
  .annotate({ identifier: 'FlexMessage' })

export type FlexMessage = Schema.Schema.Type<typeof FlexMessageSchema>

export const FlexBlockStyleSchema = Schema.Struct({
  backgroundColor: Schema.optionalKey(Schema.String),
  separator: Schema.optionalKey(Schema.Boolean),
  separatorColor: Schema.optionalKey(Schema.String),
}).annotate({ identifier: 'FlexBlockStyle' })

export type FlexBlockStyle = Schema.Schema.Type<typeof FlexBlockStyleSchema>

export const FlexBubbleStylesSchema = Schema.Struct({
  header: Schema.optionalKey(FlexBlockStyleSchema),
  hero: Schema.optionalKey(FlexBlockStyleSchema),
  body: Schema.optionalKey(FlexBlockStyleSchema),
  footer: Schema.optionalKey(FlexBlockStyleSchema),
}).annotate({ identifier: 'FlexBubbleStyles' })

export type FlexBubbleStyles = Schema.Schema.Type<typeof FlexBubbleStylesSchema>

export const FlexComponentSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'FlexComponent',
})

export type FlexComponent = Schema.Schema.Type<typeof FlexComponentSchema>

export const FlexBoxBackgroundSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'FlexBoxBackground',
})

export type FlexBoxBackground = Schema.Schema.Type<typeof FlexBoxBackgroundSchema>

export const FlexBoxSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    layout: Schema.optionalKey(Schema.Literals(['horizontal', 'vertical', 'baseline'])),
    flex: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
    contents: Schema.optionalKey(Schema.Array(FlexComponentSchema)),
    spacing: Schema.optionalKey(Schema.String),
    margin: Schema.optionalKey(Schema.String),
    position: Schema.optionalKey(Schema.Literals(['relative', 'absolute'])),
    offsetTop: Schema.optionalKey(Schema.String),
    offsetBottom: Schema.optionalKey(Schema.String),
    offsetStart: Schema.optionalKey(Schema.String),
    offsetEnd: Schema.optionalKey(Schema.String),
    backgroundColor: Schema.optionalKey(Schema.String),
    borderColor: Schema.optionalKey(Schema.String),
    borderWidth: Schema.optionalKey(Schema.String),
    cornerRadius: Schema.optionalKey(Schema.String),
    width: Schema.optionalKey(Schema.String),
    maxWidth: Schema.optionalKey(Schema.String),
    height: Schema.optionalKey(Schema.String),
    maxHeight: Schema.optionalKey(Schema.String),
    paddingAll: Schema.optionalKey(Schema.String),
    paddingTop: Schema.optionalKey(Schema.String),
    paddingBottom: Schema.optionalKey(Schema.String),
    paddingStart: Schema.optionalKey(Schema.String),
    paddingEnd: Schema.optionalKey(Schema.String),
    action: Schema.optionalKey(ActionSchema),
    justifyContent: Schema.optionalKey(
      Schema.Literals([
        'center',
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ]),
    ),
    alignItems: Schema.optionalKey(Schema.Literals(['center', 'flex-start', 'flex-end'])),
    background: Schema.optionalKey(FlexBoxBackgroundSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexBox' })

export type FlexBox = Schema.Schema.Type<typeof FlexBoxSchema>

export const FlexBubbleSchema = (() => {
  const M0 = FlexContainerSchema
  const M1 = Schema.Struct({
    direction: Schema.optionalKey(Schema.Literals(['ltr', 'rtl'])),
    styles: Schema.optionalKey(FlexBubbleStylesSchema),
    header: Schema.optionalKey(FlexBoxSchema),
    hero: Schema.optionalKey(FlexComponentSchema),
    body: Schema.optionalKey(FlexBoxSchema),
    footer: Schema.optionalKey(FlexBoxSchema),
    size: Schema.optionalKey(
      Schema.Literals(['nano', 'micro', 'deca', 'hecto', 'kilo', 'mega', 'giga']),
    ),
    action: Schema.optionalKey(ActionSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexBubble' })

export type FlexBubble = Schema.Schema.Type<typeof FlexBubbleSchema>

export const FlexCarouselSchema = (() => {
  const M0 = FlexContainerSchema
  const M1 = Schema.Struct({ contents: Schema.optionalKey(Schema.Array(FlexBubbleSchema)) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexCarousel' })

export type FlexCarousel = Schema.Schema.Type<typeof FlexCarouselSchema>

export const FlexBoxBorderWidthSchema = Schema.Literals([
  'none',
  'light',
  'normal',
  'medium',
  'semi-bold',
  'bold',
])
  .annotate({
    description:
      'Width of box border. This is only for `borderWidth` in FlexBox.\nA value of none means that borders are not rendered; the other values are listed in order of increasing width.\n',
  })
  .annotate({ identifier: 'FlexBoxBorderWidth' })

export type FlexBoxBorderWidth = Schema.Schema.Type<typeof FlexBoxBorderWidthSchema>

export const FlexBoxCornerRadiusSchema = Schema.Literals([
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
])
  .annotate({
    description:
      'Radius at the time of rounding the corners of the box. This is only for `cornerRadius` in FlexBox.\nA value of none means that corners are not rounded; the other values are listed in order of increasing radius.\n',
  })
  .annotate({ identifier: 'FlexBoxCornerRadius' })

export type FlexBoxCornerRadius = Schema.Schema.Type<typeof FlexBoxCornerRadiusSchema>

export const FlexBoxSpacingSchema = Schema.Literals(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .annotate({
    description:
      'You can specify the minimum space between two components with the `spacing` property of the parent box component, in pixels or with a keyword.\nFlexBoxSpacing just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexBoxSpacing' })

export type FlexBoxSpacing = Schema.Schema.Type<typeof FlexBoxSpacingSchema>

export const FlexMarginSchema = Schema.Literals(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .annotate({
    description:
      'You can specify the minimum space before a child component with the `margin` property of the child component, in pixels or with a keyword.\nFlexMargin just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexMargin' })

export type FlexMargin = Schema.Schema.Type<typeof FlexMarginSchema>

export const FlexBoxPaddingSchema = Schema.Literals(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .annotate({
    description:
      'Padding can be specified in pixels, percentage (to the parent box width) or with a keyword.\nFlexBoxPadding just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexBoxPadding' })

export type FlexBoxPadding = Schema.Schema.Type<typeof FlexBoxPaddingSchema>

export const FlexImageSizeSchema = Schema.Literals([
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  '3xl',
  '4xl',
  '5xl',
  'full',
])
  .annotate({
    description:
      'You can set the width of an Flex image component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexImageSize just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexImageSize' })

export type FlexImageSize = Schema.Schema.Type<typeof FlexImageSizeSchema>

export const FlexIconSizeSchema = Schema.Literals([
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  '3xl',
  '4xl',
  '5xl',
])
  .annotate({
    description:
      'You can set the width of an Flex icon component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexIconSize just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexIconSize' })

export type FlexIconSize = Schema.Schema.Type<typeof FlexIconSizeSchema>

export const FlexTextFontSizeSchema = Schema.Literals([
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  '3xl',
  '4xl',
  '5xl',
])
  .annotate({
    description:
      'Font size in the `size` property of the Flex text component.\nYou can specify the size in pixels or with a keyword.\nFlexTextFontSize just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexTextFontSize' })

export type FlexTextFontSize = Schema.Schema.Type<typeof FlexTextFontSizeSchema>

export const FlexSpanSizeSchema = Schema.Literals([
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  '3xl',
  '4xl',
  '5xl',
])
  .annotate({
    description:
      'Font size in the `size` property of the Flex span component.\nYou can specify the size in pixels or with a keyword.\nFlexSpanSize just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexSpanSize' })

export type FlexSpanSize = Schema.Schema.Type<typeof FlexSpanSizeSchema>

export const FlexOffsetSchema = Schema.Literals(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .annotate({
    description:
      'You can specify the offset of a component with the `offset*` property, in pixels or with a keyword.\nYou can also specify the percentage to the box width for `offsetStart` and `offsetEnd` and to the box height for `offsetTop` and `offsetBottom`.\nFlexOffset just provides only keywords.\n',
  })
  .annotate({ identifier: 'FlexOffset' })

export type FlexOffset = Schema.Schema.Type<typeof FlexOffsetSchema>

export const FlexButtonSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    flex: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
    color: Schema.optionalKey(Schema.String),
    style: Schema.optionalKey(Schema.Literals(['primary', 'secondary', 'link'])),
    action: Schema.optionalKey(ActionSchema),
    gravity: Schema.optionalKey(Schema.Literals(['top', 'bottom', 'center'])),
    margin: Schema.optionalKey(Schema.String),
    position: Schema.optionalKey(Schema.Literals(['relative', 'absolute'])),
    offsetTop: Schema.optionalKey(Schema.String),
    offsetBottom: Schema.optionalKey(Schema.String),
    offsetStart: Schema.optionalKey(Schema.String),
    offsetEnd: Schema.optionalKey(Schema.String),
    height: Schema.optionalKey(Schema.Literals(['md', 'sm'])),
    adjustMode: Schema.optionalKey(Schema.Literal('shrink-to-fit')),
    scaling: Schema.optionalKey(Schema.Boolean),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexButton' })

export type FlexButton = Schema.Schema.Type<typeof FlexButtonSchema>

export const FlexImageSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    url: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
        description:
          'Image URL (Max character limit: 2000)\nProtocol: HTTPS (TLS 1.2 or later)\nImage format: JPEG or PNG\nMaximum image size: 1024×1024 pixels\nMaximum file size: 10 MB (300 KB when the animated property is true)\n',
      }),
    ),
    flex: Schema.optionalKey(
      Schema.Number.check(Schema.isInt32()).annotate({
        description: 'The ratio of the width or height of this component within the parent box.',
      }),
    ),
    margin: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'The minimum amount of space to include before this component in its parent container.\n',
      }),
    ),
    position: Schema.optionalKey(
      Schema.Literals(['relative', 'absolute']).annotate({
        description:
          'Reference for offsetTop, offsetBottom, offsetStart, and offsetEnd. Specify one of the following values:\n\n`relative`: Use the previous box as reference.\n`absolute`: Use the top left of parent element as reference. The default value is relative.\n',
      }),
    ),
    offsetTop: Schema.optionalKey(Schema.String.annotate({ description: 'Offset.' })),
    offsetBottom: Schema.optionalKey(Schema.String.annotate({ description: 'Offset.' })),
    offsetStart: Schema.optionalKey(Schema.String.annotate({ description: 'Offset.' })),
    offsetEnd: Schema.optionalKey(Schema.String.annotate({ description: 'Offset.' })),
    align: Schema.optionalKey(
      Schema.Literals(['start', 'end', 'center']).annotate({
        description: 'Alignment style in horizontal direction.\n',
      }),
    ),
    gravity: Schema.optionalKey(
      Schema.Literals(['top', 'bottom', 'center']).annotate({
        description: 'Alignment style in vertical direction.',
      }),
    ),
    size: Schema.String.pipe(Schema.withDecodingDefault(Effect.succeed('md'))).annotate({
      description: 'The maximum image width. This is md by default.\n',
    }),
    aspectRatio: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'Aspect ratio of the image.\n`{width}:{height}` format.\nSpecify the value of `{width}` and `{height}` in the range from `1` to `100000`.\nHowever, you cannot set `{height}` to a value that is more than three times the value of `{width}`.\nThe default value is `1:1`.\n',
      }),
    ),
    aspectMode: Schema.optionalKey(
      Schema.Literals(['fit', 'cover']).annotate({
        description:
          'The display style of the image if the aspect ratio of the image and that specified by the aspectRatio property do not match.\n',
      }),
    ),
    backgroundColor: Schema.optionalKey(
      Schema.String.annotate({
        description: 'Background color of the image. Use a hexadecimal color code.',
      }),
    ),
    action: Schema.optionalKey(ActionSchema),
    animated: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
      description:
        "When this is `true`, an animated image (APNG) plays.\nYou can specify a value of true up to 10 images in a single message.\nYou can't send messages that exceed this limit.\nThis is `false` by default.\nAnimated images larger than 300 KB aren't played back.\n",
    }),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#f-image',
    },
  })
  .annotate({ identifier: 'FlexImage' })

export type FlexImage = Schema.Schema.Type<typeof FlexImageSchema>

export const FlexVideoSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    url: Schema.optionalKey(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
    previewUrl: Schema.optionalKey(
      Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
    ),
    altContent: Schema.optionalKey(FlexComponentSchema),
    aspectRatio: Schema.optionalKey(Schema.String),
    action: Schema.optionalKey(ActionSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexVideo' })

export type FlexVideo = Schema.Schema.Type<typeof FlexVideoSchema>

export const FlexIconSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    url: Schema.optionalKey(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
    size: Schema.optionalKey(Schema.String),
    aspectRatio: Schema.optionalKey(Schema.String),
    margin: Schema.optionalKey(Schema.String),
    position: Schema.optionalKey(Schema.Literals(['relative', 'absolute'])),
    offsetTop: Schema.optionalKey(Schema.String),
    offsetBottom: Schema.optionalKey(Schema.String),
    offsetStart: Schema.optionalKey(Schema.String),
    offsetEnd: Schema.optionalKey(Schema.String),
    scaling: Schema.optionalKey(Schema.Boolean),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#icon' },
  })
  .annotate({ identifier: 'FlexIcon' })

export type FlexIcon = Schema.Schema.Type<typeof FlexIconSchema>

export const FlexSpanSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    text: Schema.optionalKey(Schema.String),
    size: Schema.optionalKey(Schema.String),
    color: Schema.optionalKey(Schema.String),
    weight: Schema.optionalKey(Schema.Literals(['regular', 'bold'])),
    style: Schema.optionalKey(Schema.Literals(['normal', 'italic'])),
    decoration: Schema.optionalKey(Schema.Literals(['none', 'underline', 'line-through'])),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexSpan' })

export type FlexSpan = Schema.Schema.Type<typeof FlexSpanSchema>

export const FlexTextSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    flex: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
    text: Schema.optionalKey(Schema.String),
    size: Schema.optionalKey(Schema.String),
    align: Schema.optionalKey(Schema.Literals(['start', 'end', 'center'])),
    gravity: Schema.optionalKey(Schema.Literals(['top', 'bottom', 'center'])),
    color: Schema.optionalKey(Schema.String),
    weight: Schema.optionalKey(Schema.Literals(['regular', 'bold'])),
    style: Schema.optionalKey(Schema.Literals(['normal', 'italic'])),
    decoration: Schema.optionalKey(Schema.Literals(['none', 'underline', 'line-through'])),
    wrap: Schema.optionalKey(Schema.Boolean),
    lineSpacing: Schema.optionalKey(Schema.String),
    margin: Schema.optionalKey(Schema.String),
    position: Schema.optionalKey(Schema.Literals(['relative', 'absolute'])),
    offsetTop: Schema.optionalKey(Schema.String),
    offsetBottom: Schema.optionalKey(Schema.String),
    offsetStart: Schema.optionalKey(Schema.String),
    offsetEnd: Schema.optionalKey(Schema.String),
    action: Schema.optionalKey(ActionSchema),
    maxLines: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
    contents: Schema.optionalKey(Schema.Array(FlexSpanSchema)),
    adjustMode: Schema.optionalKey(Schema.Literal('shrink-to-fit')),
    scaling: Schema.optionalKey(Schema.Boolean),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexText' })

export type FlexText = Schema.Schema.Type<typeof FlexTextSchema>

export const FlexSeparatorSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({
    margin: Schema.optionalKey(Schema.String),
    color: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexSeparator' })

export type FlexSeparator = Schema.Schema.Type<typeof FlexSeparatorSchema>

export const FlexFillerSchema = (() => {
  const M0 = FlexComponentSchema
  const M1 = Schema.Struct({ flex: Schema.optionalKey(Schema.Number.check(Schema.isInt32())) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexFiller' })

export type FlexFiller = Schema.Schema.Type<typeof FlexFillerSchema>

export const FlexBoxLinearGradientSchema = (() => {
  const M0 = FlexBoxBackgroundSchema
  const M1 = Schema.Struct({
    angle: Schema.optionalKey(Schema.String),
    startColor: Schema.optionalKey(Schema.String),
    endColor: Schema.optionalKey(Schema.String),
    centerColor: Schema.optionalKey(Schema.String),
    centerPosition: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'FlexBoxLinearGradient' })

export type FlexBoxLinearGradient = Schema.Schema.Type<typeof FlexBoxLinearGradientSchema>

export const CameraActionSchema = ActionSchema

export type CameraAction = Schema.Schema.Type<typeof CameraActionSchema>

export const CameraRollActionSchema = ActionSchema

export type CameraRollAction = Schema.Schema.Type<typeof CameraRollActionSchema>

export const ClipboardActionSchema = (() => {
  const M0 = ActionSchema
  const M1 = Schema.Struct({
    clipboardText: Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 1, {
        expected: 'a string of at least 1 character',
      }),
      Schema.makeFilter((input) => [...input].length <= 1000, {
        expected: 'a string of at most 1000 characters',
      }),
    ).annotate({
      description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n',
    }),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#clipboard-action',
    },
  })
  .annotate({ identifier: 'ClipboardAction' })

export type ClipboardAction = Schema.Schema.Type<typeof ClipboardActionSchema>

export const DatetimePickerActionSchema = (() => {
  const M0 = ActionSchema
  const M1 = Schema.Struct({
    data: Schema.optionalKey(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 300, {
          expected: 'a string of at most 300 characters',
        }),
      ),
    ),
    mode: Schema.optionalKey(Schema.Literals(['date', 'time', 'datetime'])),
    initial: Schema.optionalKey(Schema.String),
    max: Schema.optionalKey(Schema.String),
    min: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})()
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action',
    },
  })
  .annotate({ identifier: 'DatetimePickerAction' })

export type DatetimePickerAction = Schema.Schema.Type<typeof DatetimePickerActionSchema>

export const LocationActionSchema = ActionSchema

export type LocationAction = Schema.Schema.Type<typeof LocationActionSchema>

export const MessageActionSchema = (() => {
  const M0 = ActionSchema
  const M1 = Schema.Struct({ text: Schema.optionalKey(Schema.String) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'MessageAction' })

export type MessageAction = Schema.Schema.Type<typeof MessageActionSchema>

export const PostbackActionSchema = (() => {
  const M0 = ActionSchema
  const M1 = Schema.Struct({
    data: Schema.optionalKey(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 300, {
          expected: 'a string of at most 300 characters',
        }),
      ),
    ),
    displayText: Schema.optionalKey(Schema.String),
    text: Schema.optionalKey(Schema.String),
    inputOption: Schema.optionalKey(
      Schema.Literals(['closeRichMenu', 'openRichMenu', 'openKeyboard', 'openVoice']),
    ),
    fillInText: Schema.optionalKey(Schema.String),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'PostbackAction' })

export type PostbackAction = Schema.Schema.Type<typeof PostbackActionSchema>

export const RichMenuSwitchActionSchema = (() => {
  const M0 = ActionSchema
  const M1 = Schema.Struct({
    data: Schema.optionalKey(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 300, {
          expected: 'a string of at most 300 characters',
        }),
      ),
    ),
    richMenuAliasId: Schema.optionalKey(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 32, {
          expected: 'a string of at most 32 characters',
        }),
      ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'RichMenuSwitchAction' })

export type RichMenuSwitchAction = Schema.Schema.Type<typeof RichMenuSwitchActionSchema>

export const AltUriSchema = Schema.Struct({
  desktop: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 0, {
        expected: 'a string of at least 0 characters',
      }),
      Schema.makeFilter((input) => [...input].length <= 10000, {
        expected: 'a string of at most 10000 characters',
      }),
    ),
  ),
}).annotate({ identifier: 'AltUri' })

export type AltUri = Schema.Schema.Type<typeof AltUriSchema>

export const URIActionSchema = (() => {
  const M0 = ActionSchema
  const M1 = Schema.Struct({
    uri: Schema.optionalKey(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 10000, {
          expected: 'a string of at most 10000 characters',
        }),
      ),
    ),
    altUri: Schema.optionalKey(AltUriSchema),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'URIAction' })

export type URIAction = Schema.Schema.Type<typeof URIActionSchema>

export const SubscribedMembershipPlanSchema = Schema.Struct({
  membershipId: Schema.Number.check(Schema.isInt()).annotate({
    description: 'Membership plan ID.',
  }),
  title: Schema.String.annotate({ description: 'Membership plan name.' }),
  description: Schema.String.annotate({ description: 'Membership plan description.' }),
  benefits: Schema.Array(Schema.String)
    .check(Schema.isMinLength(1))
    .annotate({ description: 'List of membership plan perks.' }),
  price: Schema.Number.annotate({
    description: 'Monthly fee for membership plan. (e.g. 1500.00)',
    jsonSchemaExamples: [500],
  }),
  currency: Schema.Literals(['JPY', 'TWD', 'THB']).annotate({
    description: 'The currency of membership.price.',
  }),
})
  .annotate({ description: 'Object containing information about the membership plan.' })
  .annotate({ identifier: 'SubscribedMembershipPlan' })

export type SubscribedMembershipPlan = Schema.Schema.Type<typeof SubscribedMembershipPlanSchema>

export const SubscribedMembershipUserSchema = Schema.Struct({
  membershipNo: Schema.Number.check(Schema.isInt()).annotate({
    description: "The user's member number in the membership plan.",
  }),
  joinedTime: Schema.Number.check(Schema.isInt()).annotate({
    description: 'UNIX timestamp at which the user subscribed to the membership.',
  }),
  nextBillingDate: Schema.String.annotate({
    description:
      'Next payment date for membership plan.\n- Format: yyyy-MM-dd (e.g. 2024-02-08)\n- Timezone: UTC+9\n',
  }),
  totalSubscriptionMonths: Schema.Number.check(Schema.isInt()).annotate({
    description:
      'The period of time in months that the user has been subscribed to a membership plan. If a user previously canceled and then re-subscribed to the same membership plan, only the period after the re-subscription will be counted.',
  }),
})
  .annotate({ description: 'Object containing user membership subscription information.' })
  .annotate({ identifier: 'SubscribedMembershipUser' })

export type SubscribedMembershipUser = Schema.Schema.Type<typeof SubscribedMembershipUserSchema>

export const SubscriptionSchema = Schema.Struct({
  membership: SubscribedMembershipPlanSchema,
  user: SubscribedMembershipUserSchema,
})
  .annotate({ description: 'An array of memberships.' })
  .annotate({ identifier: 'Subscription' })

export type Subscription = Schema.Schema.Type<typeof SubscriptionSchema>

export const GetMembershipSubscriptionResponseSchema = Schema.Struct({
  subscriptions: Schema.Array(SubscriptionSchema)
    .check(Schema.isMinLength(0))
    .annotate({ description: 'List of subscription information' }),
})
  .annotate({
    description: "A user's membership subscription status",
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-a-users-membership-subscription-status',
    },
  })
  .annotate({ identifier: 'GetMembershipSubscriptionResponse' })

export type GetMembershipSubscriptionResponse = Schema.Schema.Type<
  typeof GetMembershipSubscriptionResponseSchema
>

export const MembershipSchema = Schema.Struct({
  membershipId: Schema.Number.check(Schema.isInt()).annotate({
    description: 'Membership plan ID.',
  }),
  title: Schema.String.annotate({ description: 'Membership plan name.' }),
  description: Schema.String.annotate({ description: 'Membership plan description.' }),
  benefits: Schema.Array(Schema.String)
    .check(Schema.isMinLength(1))
    .annotate({ description: 'List of membership plan perks.' }),
  price: Schema.Number.annotate({
    description: 'Monthly fee for membership plan. (e.g. 1500.00)',
    jsonSchemaExamples: [500],
  }),
  currency: Schema.Literals(['JPY', 'TWD', 'THB']).annotate({
    description: 'The currency of membership.price.',
  }),
  memberCount: Schema.Number.check(Schema.isInt()).annotate({
    description: 'Number of members subscribed to the membership plan.',
    jsonSchemaExamples: [100],
  }),
  memberLimit: Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
    description:
      'The upper limit of members who can subscribe. If no upper limit is set, it will be null.',
    jsonSchemaExamples: [1000],
  }),
  isInAppPurchase: Schema.Boolean.annotate({
    description: 'Payment method for users who subscribe to a membership plan.',
  }),
  isPublished: Schema.Boolean.annotate({ description: 'Membership plan status.' }),
}).annotate({ identifier: 'Membership' })

export type Membership = Schema.Schema.Type<typeof MembershipSchema>

export const MembershipListResponseSchema = Schema.Struct({
  memberships: Schema.Array(MembershipSchema)
    .check(Schema.isMinLength(0))
    .annotate({ description: 'List of membership information' }),
})
  .annotate({ description: 'List of memberships' })
  .annotate({ identifier: 'MembershipListResponse' })

export type MembershipListResponse = Schema.Schema.Type<typeof MembershipListResponseSchema>

export const GetJoinedMembershipUsersResponseSchema = Schema.Struct({
  userIds: Schema.Array(Schema.String)
    .check(Schema.isMaxLength(1000))
    .annotate({
      description:
        'A list of user IDs who joined the membership.\nUsers who have not agreed to the bot user agreement, are not following the bot, or are not active will be excluded.\nIf there are no users in the membership, an empty list will be returned.\n',
    }),
  next: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A continuation token to get next remaining membership user IDs.\nReturned only when there are remaining user IDs that weren't returned in the userIds property in the previous request.\nThe continuation token expires in 24 hours (86,400 seconds).\n\n",
    }),
  ),
})
  .annotate({
    description: 'List of users who have joined the membership',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-membership-user-ids',
    },
  })
  .annotate({ identifier: 'GetJoinedMembershipUsersResponse' })

export type GetJoinedMembershipUsersResponse = Schema.Schema.Type<
  typeof GetJoinedMembershipUsersResponseSchema
>

export const AcquisitionConditionRequestSchema = Schema.Struct({
  type: Schema.String.annotate({
    description: 'Determines how the coupon is distributed or used.',
  }),
}).annotate({ identifier: 'AcquisitionConditionRequest' })

export type AcquisitionConditionRequest = Schema.Schema.Type<
  typeof AcquisitionConditionRequestSchema
>

export const CouponRewardRequestSchema = Schema.Struct({
  type: Schema.String.annotate({ description: 'Type of coupon. Determines the benefit provided.' }),
}).annotate({ identifier: 'CouponRewardRequest' })

export type CouponRewardRequest = Schema.Schema.Type<typeof CouponRewardRequestSchema>

export const CouponCreateRequestSchema = Schema.Struct({
  acquisitionCondition: AcquisitionConditionRequestSchema,
  barcodeImageUrl: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'URL of the barcode image associated with the coupon. Used for in-store redemption.',
    }),
  ),
  couponCode: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Unique code to be presented by the user to redeem the coupon. Optional.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 0, {
        expected: 'a string of at least 0 characters',
      }),
      Schema.makeFilter((input) => [...input].length <= 1000, {
        expected: 'a string of at most 1000 characters',
      }),
    ).annotate({ description: 'Detailed description of the coupon. Displayed to users.' }),
  ),
  endTimestamp: Schema.Union([
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
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({
      description: 'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
    }),
  imageUrl: Schema.optionalKey(
    Schema.String.annotate({
      description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
    }),
  ),
  maxUseCountPerTicket: Schema.Number.check(
    Schema.isInt32(),
    Schema.isLessThanOrEqualTo(1),
  ).annotate({
    description:
      'Maximum number of times a single coupon ticket can be used. Use -1 to indicate no limit.',
  }),
  startTimestamp: Schema.Union([
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
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({
      description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
    }),
  title: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 60, {
      expected: 'a string of at most 60 characters',
    }),
  ).annotate({ description: 'Title of the coupon. Displayed in the coupon list.' }),
  usageCondition: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 0, {
        expected: 'a string of at least 0 characters',
      }),
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ).annotate({ description: 'Conditions for using the coupon. Shown to users.' }),
  ),
  reward: Schema.optionalKey(CouponRewardRequestSchema),
  visibility: Schema.Literals(['UNLISTED', 'PUBLIC']).annotate({
    description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
  }),
  timezone: Schema.Literals([
    'ETC_GMT_MINUS_12',
    'ETC_GMT_MINUS_11',
    'PACIFIC_HONOLULU',
    'AMERICA_ANCHORAGE',
    'AMERICA_LOS_ANGELES',
    'AMERICA_PHOENIX',
    'AMERICA_CHICAGO',
    'AMERICA_NEW_YORK',
    'AMERICA_CARACAS',
    'AMERICA_SANTIAGO',
    'AMERICA_ST_JOHNS',
    'AMERICA_SAO_PAULO',
    'ETC_GMT_MINUS_2',
    'ATLANTIC_CAPE_VERDE',
    'EUROPE_LONDON',
    'EUROPE_PARIS',
    'EUROPE_ISTANBUL',
    'EUROPE_MOSCOW',
    'ASIA_TEHRAN',
    'ASIA_TBILISI',
    'ASIA_KABUL',
    'ASIA_TASHKENT',
    'ASIA_COLOMBO',
    'ASIA_KATHMANDU',
    'ASIA_ALMATY',
    'ASIA_RANGOON',
    'ASIA_BANGKOK',
    'ASIA_TAIPEI',
    'ASIA_TOKYO',
    'AUSTRALIA_DARWIN',
    'AUSTRALIA_SYDNEY',
    'ASIA_VLADIVOSTOK',
    'ETC_GMT_PLUS_12',
    'PACIFIC_TONGATAPU',
  ]).annotate({ description: 'Timezone for interpreting start and end timestamps.' }),
})
  .annotate({
    description:
      'Request object for creating a coupon. Contains all configurable coupon properties.',
  })
  .annotate({ identifier: 'CouponCreateRequest' })

export type CouponCreateRequest = Schema.Schema.Type<typeof CouponCreateRequestSchema>

export const NormalAcquisitionConditionRequestSchema = AcquisitionConditionRequestSchema

export type NormalAcquisitionConditionRequest = Schema.Schema.Type<
  typeof NormalAcquisitionConditionRequestSchema
>

export const LotteryAcquisitionConditionRequestSchema = (() => {
  const M0 = AcquisitionConditionRequestSchema
  const M1 = Schema.Struct({
    lotteryProbability: Schema.Number.check(
      Schema.isInt32(),
      Schema.isGreaterThanOrEqualTo(1),
      Schema.isLessThanOrEqualTo(99),
    ).annotate({
      description: 'Probability (1-99) of winning the coupon in lottery-type campaigns.',
    }),
    maxAcquireCount: Schema.Number.check(
      Schema.isInt32(),
      Schema.isLessThanOrEqualTo(999999),
    ).annotate({
      description:
        'Maximum number of coupons that can be issued in total. Use -1 to indicate no limit',
    }),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'LotteryAcquisitionConditionRequest' })

export type LotteryAcquisitionConditionRequest = Schema.Schema.Type<
  typeof LotteryAcquisitionConditionRequestSchema
>

export const CashBackPriceInfoRequestSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'CashBackPriceInfoRequest',
})

export type CashBackPriceInfoRequest = Schema.Schema.Type<typeof CashBackPriceInfoRequestSchema>

export const CouponCashBackRewardRequestSchema = (() => {
  const M0 = CouponRewardRequestSchema
  const M1 = Schema.Struct({ priceInfo: Schema.optionalKey(CashBackPriceInfoRequestSchema) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CouponCashBackRewardRequest' })

export type CouponCashBackRewardRequest = Schema.Schema.Type<
  typeof CouponCashBackRewardRequestSchema
>

export const DiscountPriceInfoRequestSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'DiscountPriceInfoRequest',
})

export type DiscountPriceInfoRequest = Schema.Schema.Type<typeof DiscountPriceInfoRequestSchema>

export const CouponDiscountRewardRequestSchema = (() => {
  const M0 = CouponRewardRequestSchema
  const M1 = Schema.Struct({ priceInfo: Schema.optionalKey(DiscountPriceInfoRequestSchema) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CouponDiscountRewardRequest' })

export type CouponDiscountRewardRequest = Schema.Schema.Type<
  typeof CouponDiscountRewardRequestSchema
>

export const CouponFreeRewardRequestSchema = CouponRewardRequestSchema

export type CouponFreeRewardRequest = Schema.Schema.Type<typeof CouponFreeRewardRequestSchema>

export const CouponGiftRewardRequestSchema = CouponRewardRequestSchema

export type CouponGiftRewardRequest = Schema.Schema.Type<typeof CouponGiftRewardRequestSchema>

export const CouponOthersRewardRequestSchema = CouponRewardRequestSchema

export type CouponOthersRewardRequest = Schema.Schema.Type<typeof CouponOthersRewardRequestSchema>

export const CashBackFixedPriceInfoRequestSchema = (() => {
  const M0 = CashBackPriceInfoRequestSchema
  const M1 = Schema.Struct({
    fixedAmount: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CashBackFixedPriceInfoRequest' })

export type CashBackFixedPriceInfoRequest = Schema.Schema.Type<
  typeof CashBackFixedPriceInfoRequestSchema
>

export const CashBackPercentagePriceInfoRequestSchema = (() => {
  const M0 = CashBackPriceInfoRequestSchema
  const M1 = Schema.Struct({
    percentage: Schema.optionalKey(
      Schema.Number.check(
        Schema.isInt32(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(99),
      ).annotate({
        description:
          'Specifies the cashback rate as a percentage. Must be an integer between 1 and 99.',
      }),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CashBackPercentagePriceInfoRequest' })

export type CashBackPercentagePriceInfoRequest = Schema.Schema.Type<
  typeof CashBackPercentagePriceInfoRequestSchema
>

export const DiscountFixedPriceInfoRequestSchema = (() => {
  const M0 = DiscountPriceInfoRequestSchema
  const M1 = Schema.Struct({
    fixedAmount: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'DiscountFixedPriceInfoRequest' })

export type DiscountFixedPriceInfoRequest = Schema.Schema.Type<
  typeof DiscountFixedPriceInfoRequestSchema
>

export const DiscountPercentagePriceInfoRequestSchema = (() => {
  const M0 = DiscountPriceInfoRequestSchema
  const M1 = Schema.Struct({
    percentage: Schema.optionalKey(
      Schema.Number.check(
        Schema.isInt32(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(99),
      ).annotate({
        description:
          'Specifies the discount rate as a percentage. Must be an integer between 1 and 99.',
      }),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'DiscountPercentagePriceInfoRequest' })

export type DiscountPercentagePriceInfoRequest = Schema.Schema.Type<
  typeof DiscountPercentagePriceInfoRequestSchema
>

export const DiscountExplicitPriceInfoRequestSchema = (() => {
  const M0 = DiscountPriceInfoRequestSchema
  const M1 = Schema.Struct({
    priceAfterDiscount: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
    originalPrice: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'DiscountExplicitPriceInfoRequest' })

export type DiscountExplicitPriceInfoRequest = Schema.Schema.Type<
  typeof DiscountExplicitPriceInfoRequestSchema
>

export const CouponCreateResponseSchema = Schema.Struct({
  couponId: Schema.String.annotate({ description: 'Unique identifier of the coupon.' }),
})
  .annotate({
    description: 'Response object returned after creating a coupon. Contains the coupon ID.',
  })
  .annotate({ identifier: 'CouponCreateResponse' })

export type CouponCreateResponse = Schema.Schema.Type<typeof CouponCreateResponseSchema>

export const AcquisitionConditionResponseSchema = Schema.Struct({
  type: Schema.String.annotate({
    description: 'Determines how the coupon is distributed or used.',
  }),
}).annotate({ identifier: 'AcquisitionConditionResponse' })

export type AcquisitionConditionResponse = Schema.Schema.Type<
  typeof AcquisitionConditionResponseSchema
>

export const CouponRewardResponseSchema = Schema.Struct({
  type: Schema.String.annotate({ description: 'Type of coupon. Determines the benefit provided.' }),
}).annotate({ identifier: 'CouponRewardResponse' })

export type CouponRewardResponse = Schema.Schema.Type<typeof CouponRewardResponseSchema>

export const CouponResponseSchema = Schema.Struct({
  acquisitionCondition: Schema.optionalKey(AcquisitionConditionResponseSchema),
  barcodeImageUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        'URL of the barcode image associated with the coupon. Used for in-store redemption.',
    }),
  ),
  couponCode: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Unique code to be presented by the user to redeem the coupon.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Detailed description of the coupon. Displayed to users.',
    }),
  ),
  endTimestamp: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
      }),
  ),
  imageUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
    }),
  ),
  maxAcquireCount: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'Maximum number of coupons that can be issued in total.' }),
  ),
  maxUseCountPerTicket: Schema.optionalKey(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'Maximum number of times a single coupon ticket can be used.',
    }),
  ),
  maxTicketPerUser: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'Maximum number of coupon tickets a single user can acquire.' }),
  ),
  startTimestamp: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
      }),
  ),
  title: Schema.optionalKey(
    Schema.String.annotate({ description: 'Title of the coupon. Displayed in the coupon list.' }),
  ),
  usageCondition: Schema.optionalKey(
    Schema.String.annotate({ description: 'Conditions for using the coupon. Shown to users.' }),
  ),
  reward: Schema.optionalKey(CouponRewardResponseSchema),
  visibility: Schema.optionalKey(
    Schema.Literals(['UNLISTED', 'PUBLIC', 'PRIVATE']).annotate({
      description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
    }),
  ),
  timezone: Schema.optionalKey(
    Schema.Literals([
      'ETC_GMT_MINUS_12',
      'ETC_GMT_MINUS_11',
      'PACIFIC_HONOLULU',
      'AMERICA_ANCHORAGE',
      'AMERICA_LOS_ANGELES',
      'AMERICA_PHOENIX',
      'AMERICA_CHICAGO',
      'AMERICA_NEW_YORK',
      'AMERICA_CARACAS',
      'AMERICA_SANTIAGO',
      'AMERICA_ST_JOHNS',
      'AMERICA_SAO_PAULO',
      'ETC_GMT_MINUS_2',
      'ATLANTIC_CAPE_VERDE',
      'EUROPE_LONDON',
      'EUROPE_PARIS',
      'EUROPE_ISTANBUL',
      'EUROPE_MOSCOW',
      'ASIA_TEHRAN',
      'ASIA_TBILISI',
      'ASIA_KABUL',
      'ASIA_TASHKENT',
      'ASIA_COLOMBO',
      'ASIA_KATHMANDU',
      'ASIA_ALMATY',
      'ASIA_RANGOON',
      'ASIA_BANGKOK',
      'ASIA_TAIPEI',
      'ASIA_TOKYO',
      'AUSTRALIA_DARWIN',
      'AUSTRALIA_SYDNEY',
      'ASIA_VLADIVOSTOK',
      'ETC_GMT_PLUS_12',
      'PACIFIC_TONGATAPU',
    ]).annotate({ description: 'Timezone for interpreting start and end timestamps.' }),
  ),
  couponId: Schema.optionalKey(
    Schema.String.annotate({ description: 'Unique identifier of the coupon.' }),
  ),
  createdTimestamp: Schema.optionalKey(
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
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'Created timestamp (seconds) of the coupon.' }),
  ),
  status: Schema.optionalKey(
    Schema.Literals(['DRAFT', 'RUNNING', 'CLOSED']).annotate({
      description: 'Current status of the coupon.',
    }),
  ),
})
  .annotate({
    description:
      'Detailed information about a coupon, including all properties and current status.',
  })
  .annotate({ identifier: 'CouponResponse' })

export type CouponResponse = Schema.Schema.Type<typeof CouponResponseSchema>

export const NormalAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type NormalAcquisitionConditionResponse = Schema.Schema.Type<
  typeof NormalAcquisitionConditionResponseSchema
>

export const LotteryAcquisitionConditionResponseSchema = (() => {
  const M0 = AcquisitionConditionResponseSchema
  const M1 = Schema.Struct({
    lotteryProbability: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
    maxAcquireCount: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'LotteryAcquisitionConditionResponse' })

export type LotteryAcquisitionConditionResponse = Schema.Schema.Type<
  typeof LotteryAcquisitionConditionResponseSchema
>

export const ReferralAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type ReferralAcquisitionConditionResponse = Schema.Schema.Type<
  typeof ReferralAcquisitionConditionResponseSchema
>

export const CashBackPriceInfoResponseSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'CashBackPriceInfoResponse',
})

export type CashBackPriceInfoResponse = Schema.Schema.Type<typeof CashBackPriceInfoResponseSchema>

export const CouponCashBackRewardResponseSchema = (() => {
  const M0 = CouponRewardResponseSchema
  const M1 = Schema.Struct({ priceInfo: Schema.optionalKey(CashBackPriceInfoResponseSchema) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CouponCashBackRewardResponse' })

export type CouponCashBackRewardResponse = Schema.Schema.Type<
  typeof CouponCashBackRewardResponseSchema
>

export const DiscountPriceInfoResponseSchema = Schema.Struct({ type: Schema.String }).annotate({
  identifier: 'DiscountPriceInfoResponse',
})

export type DiscountPriceInfoResponse = Schema.Schema.Type<typeof DiscountPriceInfoResponseSchema>

export const CouponDiscountRewardResponseSchema = (() => {
  const M0 = CouponRewardResponseSchema
  const M1 = Schema.Struct({ priceInfo: Schema.optionalKey(DiscountPriceInfoResponseSchema) })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CouponDiscountRewardResponse' })

export type CouponDiscountRewardResponse = Schema.Schema.Type<
  typeof CouponDiscountRewardResponseSchema
>

export const CouponFreeRewardResponseSchema = CouponRewardResponseSchema

export type CouponFreeRewardResponse = Schema.Schema.Type<typeof CouponFreeRewardResponseSchema>

export const CouponGiftRewardResponseSchema = CouponRewardResponseSchema

export type CouponGiftRewardResponse = Schema.Schema.Type<typeof CouponGiftRewardResponseSchema>

export const CouponOthersRewardResponseSchema = CouponRewardResponseSchema

export type CouponOthersRewardResponse = Schema.Schema.Type<typeof CouponOthersRewardResponseSchema>

export const CashBackFixedPriceInfoResponseSchema = (() => {
  const M0 = CashBackPriceInfoResponseSchema
  const M1 = Schema.Struct({
    currency: Schema.optionalKey(
      Schema.Literals(['JPY', 'THB', 'TWD']).annotate({
        description: 'Currency code (e.g., JPY, THB, TWD).',
      }),
    ),
    fixedAmount: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CashBackFixedPriceInfoResponse' })

export type CashBackFixedPriceInfoResponse = Schema.Schema.Type<
  typeof CashBackFixedPriceInfoResponseSchema
>

export const CashBackPercentagePriceInfoResponseSchema = (() => {
  const M0 = CashBackPriceInfoResponseSchema
  const M1 = Schema.Struct({
    percentage: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'CashBackPercentagePriceInfoResponse' })

export type CashBackPercentagePriceInfoResponse = Schema.Schema.Type<
  typeof CashBackPercentagePriceInfoResponseSchema
>

export const DiscountFixedPriceInfoResponseSchema = (() => {
  const M0 = DiscountPriceInfoResponseSchema
  const M1 = Schema.Struct({
    currency: Schema.optionalKey(
      Schema.Literals(['JPY', 'THB', 'TWD']).annotate({
        description: 'Currency code (e.g., JPY, THB, TWD).',
      }),
    ),
    fixedAmount: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'DiscountFixedPriceInfoResponse' })

export type DiscountFixedPriceInfoResponse = Schema.Schema.Type<
  typeof DiscountFixedPriceInfoResponseSchema
>

export const DiscountPercentagePriceInfoResponseSchema = (() => {
  const M0 = DiscountPriceInfoResponseSchema
  const M1 = Schema.Struct({
    percentage: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'DiscountPercentagePriceInfoResponse' })

export type DiscountPercentagePriceInfoResponse = Schema.Schema.Type<
  typeof DiscountPercentagePriceInfoResponseSchema
>

export const DiscountExplicitPriceInfoResponseSchema = (() => {
  const M0 = DiscountPriceInfoResponseSchema
  const M1 = Schema.Struct({
    currency: Schema.optionalKey(
      Schema.Literals(['JPY', 'THB', 'TWD']).annotate({
        description: 'Currency code (e.g., JPY, THB, TWD).',
      }),
    ),
    priceAfterDiscount: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
    originalPrice: Schema.optionalKey(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ),
  })
  const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
    Schema.is(M0)(input) && Schema.is(M1)(input)
  return Schema.Unknown.pipe(
    Schema.decodeTo(Schema.declare(isAll), {
      decode: SchemaGetter.transformEffect((input) =>
        Effect.all([
          Schema.decodeUnknownEffect(M0)(input),
          Schema.decodeUnknownEffect(M1)(input),
        ]).pipe(
          Effect.mapError((error) => error.issue),
          Effect.flatMap((values) => {
            const merged = values.every(
              (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
            )
              ? Object.assign({}, ...values)
              : values[0]
            return isAll(merged)
              ? Effect.succeed(merged)
              : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
          }),
        ),
      ),
      encode: SchemaGetter.passthrough({ strict: false }),
    }),
  )
})().annotate({ identifier: 'DiscountExplicitPriceInfoResponse' })

export type DiscountExplicitPriceInfoResponse = Schema.Schema.Type<
  typeof DiscountExplicitPriceInfoResponseSchema
>

export const CouponListResponseSchema = Schema.Struct({
  couponId: Schema.String.annotate({ description: 'Unique identifier of the coupon.' }),
  title: Schema.String.annotate({
    description: 'Title of the coupon. Displayed in the coupon list.',
  }),
})
  .annotate({ description: 'Summary information about a coupon, used in coupon lists.' })
  .annotate({ identifier: 'CouponListResponse' })

export type CouponListResponse = Schema.Schema.Type<typeof CouponListResponseSchema>

export const MessagingApiPagerCouponListResponseSchema = Schema.Struct({
  items: Schema.Array(CouponListResponseSchema).annotate({
    description: 'List of coupon summary objects.',
  }),
  next: Schema.optionalKey(
    Schema.String.annotate({ description: 'Token for fetching the next page of results.' }),
  ),
})
  .annotate({ description: 'Paginated response object containing a list of coupons.' })
  .annotate({ identifier: 'MessagingApiPagerCouponListResponse' })

export type MessagingApiPagerCouponListResponse = Schema.Schema.Type<
  typeof MessagingApiPagerCouponListResponseSchema
>

export const ShowLoadingAnimationRequestSchema = Schema.Struct({
  chatId: Schema.String.annotate({
    description: 'User ID of the target user for whom the loading animation is to be displayed.',
  }),
  loadingSeconds: Schema.optionalKey(
    Schema.Number.check(
      Schema.isInt32(),
      Schema.isGreaterThanOrEqualTo(5),
      Schema.isLessThanOrEqualTo(60),
    ).annotate({
      description:
        'The number of seconds to display the loading indicator.\nIt must be a multiple of 5. The maximum value is 60 seconds.\n',
    }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-request-body',
    },
  })
  .annotate({ identifier: 'ShowLoadingAnimationRequest' })

export type ShowLoadingAnimationRequest = Schema.Schema.Type<
  typeof ShowLoadingAnimationRequestSchema
>

export const ShowLoadingAnimationResponseSchema = Schema.Struct({})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-response',
    },
  })
  .annotate({ identifier: 'ShowLoadingAnimationResponse' })

export type ShowLoadingAnimationResponse = Schema.Schema.Type<
  typeof ShowLoadingAnimationResponseSchema
>

export const MarkMessagesAsReadByTokenRequestSchema = Schema.Struct({
  markAsReadToken: Schema.String.annotate({ description: 'Token used to mark messages as read.' }),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#mark-as-read-request-body',
    },
  })
  .annotate({ identifier: 'MarkMessagesAsReadByTokenRequest' })

export type MarkMessagesAsReadByTokenRequest = Schema.Schema.Type<
  typeof MarkMessagesAsReadByTokenRequestSchema
>

export const ErrorDetailSchema = Schema.Struct({
  message: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Details of the error. Not included in the response under certain situations.',
    }),
  ),
  property: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
    }),
  ),
}).annotate({ identifier: 'ErrorDetail' })

export type ErrorDetail = Schema.Schema.Type<typeof ErrorDetailSchema>

export const ErrorResponseSchema = Schema.Struct({
  message: Schema.String.annotate({
    description: 'Message containing information about the error.',
  }),
  details: Schema.optionalKey(
    Schema.Array(ErrorDetailSchema).annotate({
      description:
        'An array of error details. If the array is empty, this property will not be included in the response.',
    }),
  ),
  sentMessages: Schema.optionalKey(
    Schema.Array(SentMessageSchema)
      .check(Schema.isMinLength(1), Schema.isMaxLength(5))
      .annotate({ description: 'Array of sent messages.' }),
  ),
})
  .annotate({
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  })
  .annotate({ identifier: 'ErrorResponse' })

export type ErrorResponse = Schema.Schema.Type<typeof ErrorResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
