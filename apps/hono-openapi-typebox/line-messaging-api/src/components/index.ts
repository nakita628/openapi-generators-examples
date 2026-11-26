import { Type, type Static } from 'typebox'

export const GetWebhookEndpointResponseSchema = Type.Object(
  {
    endpoint: Type.String({ format: 'uri', description: 'Webhook URL' }),
    active: Type.Boolean({
      description:
        'Webhook usage status. Send a webhook event from the LINE Platform to the webhook URL only if enabled.\n\n`true`: Webhook usage is enabled.\n`false`: Webhook usage is disabled.\n',
    }),
  },
  {
    ref: 'GetWebhookEndpointResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information',
    },
  },
)

export type GetWebhookEndpointResponse = Static<typeof GetWebhookEndpointResponseSchema>

export const SetWebhookEndpointRequestSchema = Type.Object(
  {
    endpoint: Type.String({
      format: 'uri',
      minLength: 0,
      maxLength: 500,
      description: 'A valid webhook URL.',
    }),
  },
  {
    ref: 'SetWebhookEndpointRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url',
    },
  },
)

export type SetWebhookEndpointRequest = Static<typeof SetWebhookEndpointRequestSchema>

export const TestWebhookEndpointRequestSchema = Type.Object(
  {
    endpoint: Type.Optional(
      Type.String({
        format: 'uri',
        minLength: 0,
        maxLength: 500,
        description: 'A webhook URL to be validated.',
      }),
    ),
  },
  {
    ref: 'TestWebhookEndpointRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  },
)

export type TestWebhookEndpointRequest = Static<typeof TestWebhookEndpointRequestSchema>

export const TestWebhookEndpointResponseSchema = Type.Object(
  {
    success: Type.Optional(
      Type.Boolean({
        description: 'Result of the communication from the LINE platform to the webhook URL.',
      }),
    ),
    timestamp: Type.String({
      format: 'date-time',
      description:
        'Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered.\n',
    }),
    statusCode: Type.Integer({
      description:
        "The HTTP status code. If the webhook response isn't received, the status code is set to zero or a negative number.",
    }),
    reason: Type.String({ description: 'Reason for the response.' }),
    detail: Type.String({ description: 'Details of the response.' }),
  },
  {
    ref: 'TestWebhookEndpointResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  },
)

export type TestWebhookEndpointResponse = Static<typeof TestWebhookEndpointResponseSchema>

export const GetMessageContentTranscodingResponseSchema = Type.Object(
  {
    status: Type.Union(
      [Type.Literal('processing'), Type.Literal('succeeded'), Type.Literal('failed')],
      {
        description:
          'The preparation status. One of:\n\n`processing`: Preparing to get content.\n`succeeded`: Ready to get the content. You can get the content sent by users.\n`failed`: Failed to prepare to get the content.\n',
      },
    ),
  },
  {
    ref: 'GetMessageContentTranscodingResponse',
    description: 'Transcoding response',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status',
    },
  },
)

export type GetMessageContentTranscodingResponse = Static<
  typeof GetMessageContentTranscodingResponseSchema
>

export const ActionSchema = Type.Object(
  {
    type: Type.Optional(Type.String({ description: 'Type of action' })),
    label: Type.Optional(Type.String({ description: 'Label for the action.' })),
  },
  {
    ref: 'Action',
    description: 'Action',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#action-objects' },
  },
)

export type Action = Static<typeof ActionSchema>

export const QuickReplyItemSchema = Type.Object(
  {
    imageUrl: Type.Optional(
      Type.String({
        format: 'uri',
        maxLength: 2000,
        description: 'URL of the icon that is displayed at the beginning of the button',
      }),
    ),
    action: Type.Optional(ActionSchema),
    type: Type.Optional(Type.String({ description: '`action`', default: 'action' })),
  },
  {
    ref: 'QuickReplyItem',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' },
  },
)

export type QuickReplyItem = Static<typeof QuickReplyItemSchema>

export const QuickReplySchema = Type.Object(
  {
    items: Type.Optional(
      Type.Array(QuickReplyItemSchema, {
        maxItems: 13,
        description: 'Quick reply button objects.',
      }),
    ),
  },
  {
    ref: 'QuickReply',
    description: 'Quick reply',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' },
  },
)

export type QuickReply = Static<typeof QuickReplySchema>

export const SenderSchema = Type.Object(
  {
    name: Type.Optional(
      Type.String({
        maxLength: 20,
        description: 'Display name. Certain words such as `LINE` may not be used.',
      }),
    ),
    iconUrl: Type.Optional(
      Type.String({
        format: 'uri',
        maxLength: 2000,
        description: 'URL of the image to display as an icon when sending a message',
      }),
    ),
  },
  { ref: 'Sender', description: 'Change icon and display name' },
)

export type Sender = Static<typeof SenderSchema>

export const MessageSchema = Type.Object(
  {
    type: Type.String({ description: 'Type of message' }),
    quickReply: Type.Optional(QuickReplySchema),
    sender: Type.Optional(SenderSchema),
  },
  {
    ref: 'Message',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#message-common-properties',
    },
  },
)

export type Message = Static<typeof MessageSchema>

export const NotificationDisabledSchema = Type.Optional(
  Type.Boolean({
    ref: 'NotificationDisabled',
    description:
      '`true`: The user doesn’t receive a push notification when a message is sent.\n`false`: The user receives a push notification when the message is sent (unless they have disabled push notifications in LINE and/or their device).\nThe default value is false.\n',
    default: false,
  }),
)

export type NotificationDisabled = Static<typeof NotificationDisabledSchema>

export const ReplyMessageRequestSchema = Type.Object(
  {
    replyToken: Type.String({ description: 'replyToken received via webhook.' }),
    messages: Type.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of messages.',
    }),
    notificationDisabled: Type.Optional(NotificationDisabledSchema),
  },
  {
    ref: 'ReplyMessageRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message',
    },
  },
)

export type ReplyMessageRequest = Static<typeof ReplyMessageRequestSchema>

export const SentMessageSchema = Type.Object(
  {
    id: Type.String({ description: 'ID of the sent message.' }),
    quoteToken: Type.Optional(
      Type.String({
        description:
          'Quote token of the message. Only included when a message object that can be specified as a quote target was sent as a push or reply message.\n',
      }),
    ),
  },
  { ref: 'SentMessage' },
)

export type SentMessage = Static<typeof SentMessageSchema>

export const ReplyMessageResponseSchema = Type.Object(
  {
    sentMessages: Type.Array(SentMessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Array of sent messages.',
    }),
  },
  {
    ref: 'ReplyMessageResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message-response',
    },
  },
)

export type ReplyMessageResponse = Static<typeof ReplyMessageResponseSchema>

export const PushMessageRequestSchema = Type.Object(
  {
    to: Type.String({ description: 'ID of the receiver.' }),
    messages: Type.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of Message objects.',
    }),
    notificationDisabled: Type.Optional(NotificationDisabledSchema),
    customAggregationUnits: Type.Optional(
      Type.Array(Type.String(), {
        description:
          'List of aggregation unit name. Case-sensitive.\nThis functions can only be used by corporate users who have submitted the required applications.\n',
      }),
    ),
  },
  {
    ref: 'PushMessageRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message',
    },
  },
)

export type PushMessageRequest = Static<typeof PushMessageRequestSchema>

export const PushMessageResponseSchema = Type.Object(
  {
    sentMessages: Type.Array(SentMessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Array of sent messages.',
    }),
  },
  {
    ref: 'PushMessageResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message-response',
    },
  },
)

export type PushMessageResponse = Static<typeof PushMessageResponseSchema>

export const MulticastRequestSchema = Type.Object(
  {
    messages: Type.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Messages to send',
    }),
    to: Type.Array(Type.String(), {
      minItems: 1,
      maxItems: 500,
      description:
        'Array of user IDs. Use userId values which are returned in webhook event objects. Do not use LINE IDs found on LINE.',
    }),
    notificationDisabled: Type.Optional(NotificationDisabledSchema),
    customAggregationUnits: Type.Optional(
      Type.Array(Type.String({ pattern: '^[a-zA-Z0-9_]{1,30}$', minLength: 1, maxLength: 30 }), {
        maxItems: 1,
        description: 'Name of aggregation unit. Case-sensitive.',
      }),
    ),
  },
  {
    ref: 'MulticastRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-message',
    },
  },
)

export type MulticastRequest = Static<typeof MulticastRequestSchema>

export const MulticastResponseSchema = Type.Object(
  {},
  {
    ref: 'MulticastResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-response',
    },
  },
)

export type MulticastResponse = Static<typeof MulticastResponseSchema>

export const RecipientSchema = Type.Object(
  { type: Type.Optional(Type.String({ description: 'Type of recipient' })) },
  { ref: 'Recipient', description: 'Recipient' },
)

export type Recipient = Static<typeof RecipientSchema>

export const DemographicFilterSchema = Type.Object(
  { type: Type.Optional(Type.String({ description: 'Type of demographic filter' })) },
  { ref: 'DemographicFilter', description: 'Demographic filter' },
)

export type DemographicFilter = Static<typeof DemographicFilterSchema>

export const FilterSchema = Type.Object(
  { demographic: Type.Optional(DemographicFilterSchema) },
  { ref: 'Filter', description: 'Filter for narrowcast' },
)

export type Filter = Static<typeof FilterSchema>

export const LimitSchema = Type.Object(
  {
    max: Type.Optional(
      Type.Integer({
        minimum: 1,
        description:
          'The maximum number of narrowcast messages to send.\nUse this parameter to limit the number of narrowcast messages sent.\nThe recipients will be chosen at random.\n',
      }),
    ),
    upToRemainingQuota: Type.Optional(
      Type.Boolean({
        description:
          'If true, the message will be sent within the maximum number of deliverable messages. The default value is `false`.\n\nTargets will be selected at random.\n',
        default: false,
      }),
    ),
    forbidPartialDelivery: Type.Optional(
      Type.Boolean({
        description:
          'This option prevents messages from being delivered to only a subset of the target audience.\nIf true, the narrowcast request success but fails asynchronously.\nYou can check whether message delivery was canceled by retrieving the narrowcast message progress.\n\nThis property can be set to true only if upToRemainingQuota is set to true.\n',
        default: false,
      }),
    ),
  },
  {
    ref: 'Limit',
    description: 'Limit of the Narrowcast',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  },
)

export type Limit = Static<typeof LimitSchema>

export const NarrowcastRequestSchema = Type.Object(
  {
    messages: Type.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of Message objects.',
    }),
    recipient: Type.Optional(RecipientSchema),
    filter: Type.Optional(FilterSchema),
    limit: Type.Optional(LimitSchema),
    notificationDisabled: Type.Optional(NotificationDisabledSchema),
  },
  {
    ref: 'NarrowcastRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  },
)

export type NarrowcastRequest = Static<typeof NarrowcastRequestSchema>

export const NarrowcastResponseSchema = Type.Object(
  {},
  {
    ref: 'NarrowcastResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-response',
    },
  },
)

export type NarrowcastResponse = Static<typeof NarrowcastResponseSchema>

// FIXME: JSON Schema `not` is not enforced by this generator; TypeBox v1 has no runtime `Type.Not` and `Value.Check` ignores the keyword (the schema is generated without it)
export const OperatorRecipientSchema = Type.Intersect(
  [
    RecipientSchema,
    Type.Object({
      and: Type.Optional(
        Type.Array(RecipientSchema, {
          description:
            'Create a new recipient object by taking the logical conjunction (AND) of the specified array of recipient objects.\n',
        }),
      ),
      or: Type.Optional(
        Type.Array(RecipientSchema, {
          description:
            'Create a new recipient object by taking the logical disjunction (OR) of the specified array of recipient objects.\n',
        }),
      ),
      not: Type.Optional(RecipientSchema),
    }),
  ],
  { ref: 'OperatorRecipient' },
)

export type OperatorRecipient = Static<typeof OperatorRecipientSchema>

export const AudienceRecipientSchema = Type.Intersect(
  [RecipientSchema, Type.Object({ audienceGroupId: Type.Optional(Type.Integer()) })],
  { ref: 'AudienceRecipient' },
)

export type AudienceRecipient = Static<typeof AudienceRecipientSchema>

export const RedeliveryRecipientSchema = Type.Intersect(
  [RecipientSchema, Type.Object({ requestId: Type.Optional(Type.String()) })],
  { ref: 'RedeliveryRecipient' },
)

export type RedeliveryRecipient = Static<typeof RedeliveryRecipientSchema>

export const AgeDemographicSchema = Type.Union(
  [
    Type.Literal('age_15'),
    Type.Literal('age_20'),
    Type.Literal('age_25'),
    Type.Literal('age_30'),
    Type.Literal('age_35'),
    Type.Literal('age_40'),
    Type.Literal('age_45'),
    Type.Literal('age_50'),
    Type.Literal('age_55'),
    Type.Literal('age_60'),
    Type.Literal('age_65'),
    Type.Literal('age_70'),
  ],
  { ref: 'AgeDemographic' },
)

export type AgeDemographic = Static<typeof AgeDemographicSchema>

export const AgeDemographicFilterSchema = Type.Intersect(
  [
    DemographicFilterSchema,
    Type.Object({
      gte: Type.Optional(AgeDemographicSchema),
      lt: Type.Optional(AgeDemographicSchema),
    }),
  ],
  { ref: 'AgeDemographicFilter' },
)

export type AgeDemographicFilter = Static<typeof AgeDemographicFilterSchema>

export const AppTypeDemographicSchema = Type.Union([Type.Literal('ios'), Type.Literal('android')], {
  ref: 'AppTypeDemographic',
})

export type AppTypeDemographic = Static<typeof AppTypeDemographicSchema>

export const AppTypeDemographicFilterSchema = Type.Intersect(
  [
    DemographicFilterSchema,
    Type.Object({ oneOf: Type.Optional(Type.Array(AppTypeDemographicSchema)) }),
  ],
  { ref: 'AppTypeDemographicFilter' },
)

export type AppTypeDemographicFilter = Static<typeof AppTypeDemographicFilterSchema>

export const AreaDemographicSchema = Type.Union(
  [
    Type.Literal('jp_01'),
    Type.Literal('jp_02'),
    Type.Literal('jp_03'),
    Type.Literal('jp_04'),
    Type.Literal('jp_05'),
    Type.Literal('jp_06'),
    Type.Literal('jp_07'),
    Type.Literal('jp_08'),
    Type.Literal('jp_09'),
    Type.Literal('jp_10'),
    Type.Literal('jp_11'),
    Type.Literal('jp_12'),
    Type.Literal('jp_13'),
    Type.Literal('jp_14'),
    Type.Literal('jp_15'),
    Type.Literal('jp_16'),
    Type.Literal('jp_17'),
    Type.Literal('jp_18'),
    Type.Literal('jp_19'),
    Type.Literal('jp_20'),
    Type.Literal('jp_21'),
    Type.Literal('jp_22'),
    Type.Literal('jp_23'),
    Type.Literal('jp_24'),
    Type.Literal('jp_25'),
    Type.Literal('jp_26'),
    Type.Literal('jp_27'),
    Type.Literal('jp_28'),
    Type.Literal('jp_29'),
    Type.Literal('jp_30'),
    Type.Literal('jp_31'),
    Type.Literal('jp_32'),
    Type.Literal('jp_33'),
    Type.Literal('jp_34'),
    Type.Literal('jp_35'),
    Type.Literal('jp_36'),
    Type.Literal('jp_37'),
    Type.Literal('jp_38'),
    Type.Literal('jp_39'),
    Type.Literal('jp_40'),
    Type.Literal('jp_41'),
    Type.Literal('jp_42'),
    Type.Literal('jp_43'),
    Type.Literal('jp_44'),
    Type.Literal('jp_45'),
    Type.Literal('jp_46'),
    Type.Literal('jp_47'),
    Type.Literal('tw_01'),
    Type.Literal('tw_02'),
    Type.Literal('tw_03'),
    Type.Literal('tw_04'),
    Type.Literal('tw_05'),
    Type.Literal('tw_06'),
    Type.Literal('tw_07'),
    Type.Literal('tw_08'),
    Type.Literal('tw_09'),
    Type.Literal('tw_10'),
    Type.Literal('tw_11'),
    Type.Literal('tw_12'),
    Type.Literal('tw_13'),
    Type.Literal('tw_14'),
    Type.Literal('tw_15'),
    Type.Literal('tw_16'),
    Type.Literal('tw_17'),
    Type.Literal('tw_18'),
    Type.Literal('tw_19'),
    Type.Literal('tw_20'),
    Type.Literal('tw_21'),
    Type.Literal('tw_22'),
    Type.Literal('th_01'),
    Type.Literal('th_02'),
    Type.Literal('th_03'),
    Type.Literal('th_04'),
    Type.Literal('th_05'),
    Type.Literal('th_06'),
    Type.Literal('th_07'),
    Type.Literal('th_08'),
    Type.Literal('id_01'),
    Type.Literal('id_02'),
    Type.Literal('id_03'),
    Type.Literal('id_04'),
    Type.Literal('id_05'),
    Type.Literal('id_06'),
    Type.Literal('id_07'),
    Type.Literal('id_08'),
    Type.Literal('id_09'),
    Type.Literal('id_10'),
    Type.Literal('id_11'),
    Type.Literal('id_12'),
  ],
  {
    ref: 'AreaDemographic',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  },
)

export type AreaDemographic = Static<typeof AreaDemographicSchema>

export const AreaDemographicFilterSchema = Type.Intersect(
  [
    DemographicFilterSchema,
    Type.Object({ oneOf: Type.Optional(Type.Array(AreaDemographicSchema)) }),
  ],
  { ref: 'AreaDemographicFilter' },
)

export type AreaDemographicFilter = Static<typeof AreaDemographicFilterSchema>

export const GenderDemographicSchema = Type.Union([Type.Literal('male'), Type.Literal('female')], {
  ref: 'GenderDemographic',
})

export type GenderDemographic = Static<typeof GenderDemographicSchema>

export const GenderDemographicFilterSchema = Type.Intersect(
  [
    DemographicFilterSchema,
    Type.Object({ oneOf: Type.Optional(Type.Array(GenderDemographicSchema)) }),
  ],
  { ref: 'GenderDemographicFilter' },
)

export type GenderDemographicFilter = Static<typeof GenderDemographicFilterSchema>

// FIXME: JSON Schema `not` is not enforced by this generator; TypeBox v1 has no runtime `Type.Not` and `Value.Check` ignores the keyword (the schema is generated without it)
export const OperatorDemographicFilterSchema = Type.Intersect(
  [
    DemographicFilterSchema,
    Type.Object({
      and: Type.Optional(Type.Array(DemographicFilterSchema)),
      or: Type.Optional(Type.Array(DemographicFilterSchema)),
      not: Type.Optional(DemographicFilterSchema),
    }),
  ],
  { ref: 'OperatorDemographicFilter' },
)

export type OperatorDemographicFilter = Static<typeof OperatorDemographicFilterSchema>

export const SubscriptionPeriodDemographicSchema = Type.Union(
  [
    Type.Literal('day_7'),
    Type.Literal('day_30'),
    Type.Literal('day_90'),
    Type.Literal('day_180'),
    Type.Literal('day_365'),
  ],
  { ref: 'SubscriptionPeriodDemographic' },
)

export type SubscriptionPeriodDemographic = Static<typeof SubscriptionPeriodDemographicSchema>

export const SubscriptionPeriodDemographicFilterSchema = Type.Intersect(
  [
    DemographicFilterSchema,
    Type.Object({
      gte: Type.Optional(SubscriptionPeriodDemographicSchema),
      lt: Type.Optional(SubscriptionPeriodDemographicSchema),
    }),
  ],
  { ref: 'SubscriptionPeriodDemographicFilter' },
)

export type SubscriptionPeriodDemographicFilter = Static<
  typeof SubscriptionPeriodDemographicFilterSchema
>

export const NarrowcastProgressResponseSchema = Type.Object(
  {
    phase: Type.Union(
      [
        Type.Literal('waiting'),
        Type.Literal('sending'),
        Type.Literal('succeeded'),
        Type.Literal('failed'),
      ],
      {
        description:
          'The current status. One of:\n\n`waiting`: Messages are not yet ready to be sent. They are currently being filtered or processed in some way.\n`sending`: Messages are currently being sent.\n`succeeded`: Messages were sent successfully. This may not mean the messages were successfully received.\n`failed`: Messages failed to be sent. Use the failedDescription property to find the cause of the failure.\n',
      },
    ),
    successCount: Type.Optional(
      Type.Integer({ description: 'The number of users who successfully received the message.' }),
    ),
    failureCount: Type.Optional(
      Type.Integer({ description: 'The number of users who failed to send the message.' }),
    ),
    targetCount: Type.Optional(
      Type.Integer({ description: 'The number of intended recipients of the message.' }),
    ),
    failedDescription: Type.Optional(
      Type.String({
        description:
          'The reason the message failed to be sent. This is only included with a `phase` property value of `failed`.',
      }),
    ),
    errorCode: Type.Optional(
      Type.Integer({
        description:
          "Error summary. This is only included with a phase property value of failed.\nOne of:\n\n`1`: An internal error occurred.\n`2`: An error occurred because there weren't enough recipients.\n`3`: A conflict error of requests occurs because a request that has already been accepted is retried.\n`4`: An audience of less than 50 recipients is included as a condition of sending.\n`5`: Message delivery has been canceled to prevent messages from being delivered only to a subset of the target audience.\n",
      }),
    ),
    acceptedTime: Type.String({
      format: 'date-time',
      description:
        'Narrowcast message request accepted time in milliseconds.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
    }),
    completedTime: Type.Optional(
      Type.String({
        format: 'date-time',
        description:
          'Processing of narrowcast message request completion time in milliseconds. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
      }),
    ),
  },
  {
    ref: 'NarrowcastProgressResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status',
    },
  },
)

export type NarrowcastProgressResponse = Static<typeof NarrowcastProgressResponseSchema>

export const BroadcastRequestSchema = Type.Object(
  {
    messages: Type.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of Message objects.',
    }),
    notificationDisabled: Type.Optional(NotificationDisabledSchema),
  },
  {
    ref: 'BroadcastRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message',
    },
  },
)

export type BroadcastRequest = Static<typeof BroadcastRequestSchema>

export const BroadcastResponseSchema = Type.Object(
  {},
  {
    ref: 'BroadcastResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-response',
    },
  },
)

export type BroadcastResponse = Static<typeof BroadcastResponseSchema>

export const QuotaTypeSchema = Type.Union([Type.Literal('none'), Type.Literal('limited')], {
  ref: 'QuotaType',
  description: 'One of the following values to indicate whether a target limit is set or not.',
  externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
})

export type QuotaType = Static<typeof QuotaTypeSchema>

export const MessageQuotaResponseSchema = Type.Object(
  {
    type: QuotaTypeSchema,
    value: Type.Optional(
      Type.Integer({
        description:
          'The target limit for sending messages in the current month. This property is returned when the `type` property has a value of `limited`.\n',
      }),
    ),
  },
  {
    ref: 'MessageQuotaResponse',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
  },
)

export type MessageQuotaResponse = Static<typeof MessageQuotaResponseSchema>

export const QuotaConsumptionResponseSchema = Type.Object(
  { totalUsage: Type.Integer({ description: 'The number of sent messages in the current month' }) },
  {
    ref: 'QuotaConsumptionResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-consumption',
    },
  },
)

export type QuotaConsumptionResponse = Static<typeof QuotaConsumptionResponseSchema>

export const NumberOfMessagesResponseSchema = Type.Object(
  {
    status: Type.Union(
      [
        Type.Literal('ready'),
        Type.Literal('unready'),
        Type.Literal('unavailable_for_privacy'),
        Type.Literal('out_of_service'),
      ],
      {
        description:
          "Aggregation process status. One of:\n\n`ready`: The number of messages can be obtained.\n`unready`: We haven't finished calculating the number of sent messages for the specified in date. For example, this property is returned when the delivery date or a future date is specified. Calculation usually takes about a day.\n`unavailable_for_privacy`: The total number of messages on the specified day is less than 20.\n`out_of_service`: The specified date is earlier than the date on which we first started calculating sent messages (March 31, 2018).\n",
      },
    ),
    success: Type.Optional(
      Type.Integer({
        description:
          'The number of messages delivered using the phone number on the date specified in `date`.\nThe response has this property only when the value of `status` is `ready`.\n\n',
      }),
    ),
  },
  { ref: 'NumberOfMessagesResponse' },
)

export type NumberOfMessagesResponse = Static<typeof NumberOfMessagesResponseSchema>

export const ValidateMessageRequestSchema = Type.Object(
  {
    messages: Type.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Array of message objects to validate',
    }),
  },
  { ref: 'ValidateMessageRequest' },
)

export type ValidateMessageRequest = Static<typeof ValidateMessageRequestSchema>

export const GetAggregationUnitUsageResponseSchema = Type.Object(
  {
    numOfCustomAggregationUnits: Type.Integer({
      description: 'Number of aggregation units used this month.',
    }),
  },
  {
    ref: 'GetAggregationUnitUsageResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month',
    },
  },
)

export type GetAggregationUnitUsageResponse = Static<typeof GetAggregationUnitUsageResponseSchema>

export const GetAggregationUnitNameListResponseSchema = Type.Object(
  {
    customAggregationUnits: Type.Array(Type.String(), {
      description: 'An array of strings indicating the names of aggregation units used this month.',
    }),
    next: Type.Optional(
      Type.String({
        description:
          "A continuation token to get the next array of unit names.\nReturned only when there are remaining aggregation units that weren't returned in customAggregationUnits in the original request.\n\n",
      }),
    ),
  },
  {
    ref: 'GetAggregationUnitNameListResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month',
    },
  },
)

export type GetAggregationUnitNameListResponse = Static<
  typeof GetAggregationUnitNameListResponseSchema
>

export const UserProfileResponseSchema = Type.Object(
  {
    displayName: Type.String({ description: "User's display name" }),
    userId: Type.String({ description: 'User ID' }),
    pictureUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      }),
    ),
    statusMessage: Type.Optional(
      Type.String({
        description:
          "User's status message. Not included in the response if the user doesn't have a status message.",
      }),
    ),
    language: Type.Optional(
      Type.String({
        description:
          "User's language, as a BCP 47 language tag. Not included in the response if the user hasn't yet consented to the LINE Privacy Policy.",
        examples: ['en'],
      }),
    ),
  },
  {
    ref: 'UserProfileResponse',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-profile' },
  },
)

export type UserProfileResponse = Static<typeof UserProfileResponseSchema>

export const GetFollowersResponseSchema = Type.Object(
  {
    userIds: Type.Array(Type.String(), {
      maxItems: 1000,
      description:
        'An array of strings indicating user IDs of users that have added the LINE Official Account as a friend.\nOnly users of LINE for iOS and LINE for Android are included in `userIds`.\n',
    }),
    next: Type.Optional(
      Type.String({
        description:
          "A continuation token to get the next array of user IDs.\nReturned only when there are remaining user IDs that weren't returned in `userIds` in the original request.\nThe number of user IDs in the `userIds` element doesn't have to reach the maximum number specified by `limit` for the `next` property to be included in the response.\n\n",
      }),
    ),
  },
  {
    ref: 'GetFollowersResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-follower-ids',
    },
  },
)

export type GetFollowersResponse = Static<typeof GetFollowersResponseSchema>

export const BotInfoResponseSchema = Type.Object(
  {
    userId: Type.String({ description: "Bot's user ID" }),
    basicId: Type.String({ description: "Bot's basic ID" }),
    premiumId: Type.Optional(
      Type.String({
        description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
      }),
    ),
    displayName: Type.String({ description: "Bot's display name" }),
    pictureUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the bot doesn't have a profile image.",
      }),
    ),
    chatMode: Type.Union([Type.Literal('chat'), Type.Literal('bot')], {
      description:
        'Chat settings set in the LINE Official Account Manager. One of:\n\n`chat`: Chat is set to "On".\n`bot`: Chat is set to "Off".\n',
    }),
    markAsReadMode: Type.Union([Type.Literal('auto'), Type.Literal('manual')], {
      description:
        'Automatic read setting for messages. If the chat is set to "Off", auto is returned. If the chat is set to "On", manual is returned.\n\n`auto`: Auto read setting is enabled.\n`manual`: Auto read setting is disabled.\n\n',
    }),
  },
  {
    ref: 'BotInfoResponse',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-bot-info' },
  },
)

export type BotInfoResponse = Static<typeof BotInfoResponseSchema>

export const GroupUserProfileResponseSchema = Type.Object(
  {
    displayName: Type.String({ description: "User's display name" }),
    userId: Type.String({ description: 'User ID' }),
    pictureUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      }),
    ),
  },
  {
    ref: 'GroupUserProfileResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile',
    },
  },
)

export type GroupUserProfileResponse = Static<typeof GroupUserProfileResponseSchema>

export const RoomUserProfileResponseSchema = Type.Object(
  {
    displayName: Type.String({ description: "User's display name" }),
    userId: Type.String({ description: 'User ID' }),
    pictureUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      }),
    ),
  },
  {
    ref: 'RoomUserProfileResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile',
    },
  },
)

export type RoomUserProfileResponse = Static<typeof RoomUserProfileResponseSchema>

export const MembersIdsResponseSchema = Type.Object(
  {
    memberIds: Type.Array(Type.String(), {
      maxItems: 100,
      description:
        'List of user IDs of members in the group chat. Only users of LINE for iOS and LINE for Android are included in `memberIds`.',
    }),
    next: Type.Optional(
      Type.String({
        description:
          'A continuation token to get the next array of user IDs of the members in the group chat.\nReturned only when there are remaining user IDs that were not returned in `memberIds` in the original request.\n',
      }),
    ),
  },
  { ref: 'MembersIdsResponse' },
)

export type MembersIdsResponse = Static<typeof MembersIdsResponseSchema>

export const GroupSummaryResponseSchema = Type.Object(
  {
    groupId: Type.String({ description: 'Group ID' }),
    groupName: Type.String({ description: 'Group name' }),
    pictureUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          "Group icon URL. Not included in the response if the user doesn't set a group profile icon.",
      }),
    ),
  },
  {
    ref: 'GroupSummaryResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-summary',
    },
  },
)

export type GroupSummaryResponse = Static<typeof GroupSummaryResponseSchema>

export const GroupMemberCountResponseSchema = Type.Object(
  {
    count: Type.Integer({
      description:
        'The count of members in the group chat. The number returned excludes the LINE Official Account.',
    }),
  },
  {
    ref: 'GroupMemberCountResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-group-count',
    },
  },
)

export type GroupMemberCountResponse = Static<typeof GroupMemberCountResponseSchema>

export const RoomMemberCountResponseSchema = Type.Object(
  {
    count: Type.Integer({
      description:
        'The count of members in the multi-person chat. The number returned excludes the LINE Official Account.',
    }),
  },
  {
    ref: 'RoomMemberCountResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-room-count',
    },
  },
)

export type RoomMemberCountResponse = Static<typeof RoomMemberCountResponseSchema>

export const RichMenuSizeSchema = Type.Object(
  {
    width: Type.Optional(Type.Integer({ minimum: 1, maximum: 2147483647, description: 'width' })),
    height: Type.Optional(Type.Integer({ minimum: 1, maximum: 2147483647, description: 'height' })),
  },
  { ref: 'RichMenuSize', description: 'Rich menu size' },
)

export type RichMenuSize = Static<typeof RichMenuSizeSchema>

export const RichMenuBoundsSchema = Type.Object(
  {
    x: Type.Optional(
      Type.Integer({
        minimum: 0,
        maximum: 2147483647,
        description: 'Horizontal position relative to the top-left corner of the area.',
      }),
    ),
    y: Type.Optional(
      Type.Integer({
        minimum: 0,
        maximum: 2147483647,
        description: 'Vertical position relative to the top-left corner of the area.',
      }),
    ),
    width: Type.Optional(
      Type.Integer({ minimum: 1, maximum: 2147483647, description: 'Width of the area.' }),
    ),
    height: Type.Optional(
      Type.Integer({ minimum: 1, maximum: 2147483647, description: 'Height of the area.' }),
    ),
  },
  {
    ref: 'RichMenuBounds',
    description: 'Rich menu bounds',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#bounds-object' },
  },
)

export type RichMenuBounds = Static<typeof RichMenuBoundsSchema>

export const RichMenuAreaSchema = Type.Object(
  { bounds: Type.Optional(RichMenuBoundsSchema), action: Type.Optional(ActionSchema) },
  { ref: 'RichMenuArea', description: 'Rich menu area' },
)

export type RichMenuArea = Static<typeof RichMenuAreaSchema>

export const RichMenuRequestSchema = Type.Object(
  {
    size: Type.Optional(RichMenuSizeSchema),
    selected: Type.Optional(
      Type.Boolean({
        description: '`true` to display the rich menu by default. Otherwise, `false`.',
      }),
    ),
    name: Type.Optional(
      Type.String({
        maxLength: 300,
        description:
          'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
      }),
    ),
    chatBarText: Type.Optional(
      Type.String({ maxLength: 14, description: 'Text displayed in the chat bar' }),
    ),
    areas: Type.Optional(
      Type.Array(RichMenuAreaSchema, {
        description:
          'Array of area objects which define the coordinates and size of tappable areas',
      }),
    ),
  },
  { ref: 'RichMenuRequest' },
)

export type RichMenuRequest = Static<typeof RichMenuRequestSchema>

export const RichMenuIdResponseSchema = Type.Object(
  { richMenuId: Type.String({ description: 'Rich menu ID' }) },
  { ref: 'RichMenuIdResponse' },
)

export type RichMenuIdResponse = Static<typeof RichMenuIdResponseSchema>

export const RichMenuResponseSchema = Type.Object(
  {
    richMenuId: Type.String({ description: 'ID of a rich menu' }),
    size: RichMenuSizeSchema,
    selected: Type.Boolean({
      description: '`true` to display the rich menu by default. Otherwise, `false`.',
    }),
    name: Type.String({
      maxLength: 300,
      description:
        'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
    }),
    chatBarText: Type.String({ maxLength: 14, description: 'Text displayed in the chat bar' }),
    areas: Type.Array(RichMenuAreaSchema, {
      maxItems: 20,
      description: 'Array of area objects which define the coordinates and size of tappable areas',
    }),
  },
  {
    ref: 'RichMenuResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#rich-menu-response-object',
    },
  },
)

export type RichMenuResponse = Static<typeof RichMenuResponseSchema>

export const RichMenuListResponseSchema = Type.Object(
  { richmenus: Type.Array(RichMenuResponseSchema, { description: 'Rich menus' }) },
  {
    ref: 'RichMenuListResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list',
    },
  },
)

export type RichMenuListResponse = Static<typeof RichMenuListResponseSchema>

export const CreateRichMenuAliasRequestSchema = Type.Object(
  {
    richMenuAliasId: Type.String({
      pattern: '^[a-z0-9_-]{1,32}$',
      minLength: 1,
      maxLength: 32,
      description: 'Rich menu alias ID, which can be any ID, unique for each channel.',
    }),
    richMenuId: Type.String({
      description: 'The rich menu ID to be associated with the rich menu alias.',
    }),
  },
  {
    ref: 'CreateRichMenuAliasRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias',
    },
  },
)

export type CreateRichMenuAliasRequest = Static<typeof CreateRichMenuAliasRequestSchema>

export const RichMenuAliasResponseSchema = Type.Object(
  {
    richMenuAliasId: Type.String({ description: 'Rich menu alias ID.' }),
    richMenuId: Type.String({
      description: 'The rich menu ID associated with the rich menu alias.',
    }),
  },
  { ref: 'RichMenuAliasResponse' },
)

export type RichMenuAliasResponse = Static<typeof RichMenuAliasResponseSchema>

export const UpdateRichMenuAliasRequestSchema = Type.Object(
  {
    richMenuId: Type.String({
      description: 'The rich menu ID to be associated with the rich menu alias.',
    }),
  },
  {
    ref: 'UpdateRichMenuAliasRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias',
    },
  },
)

export type UpdateRichMenuAliasRequest = Static<typeof UpdateRichMenuAliasRequestSchema>

export const RichMenuAliasListResponseSchema = Type.Object(
  { aliases: Type.Array(RichMenuAliasResponseSchema, { description: 'Rich menu aliases.' }) },
  {
    ref: 'RichMenuAliasListResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list',
    },
  },
)

export type RichMenuAliasListResponse = Static<typeof RichMenuAliasListResponseSchema>

export const RichMenuBulkLinkRequestSchema = Type.Object(
  {
    richMenuId: Type.String({ description: 'ID of a rich menu' }),
    userIds: Type.Array(Type.String(), {
      minItems: 1,
      maxItems: 500,
      description:
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    }),
  },
  {
    ref: 'RichMenuBulkLinkRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-users',
    },
  },
)

export type RichMenuBulkLinkRequest = Static<typeof RichMenuBulkLinkRequestSchema>

export const RichMenuBulkUnlinkRequestSchema = Type.Object(
  {
    userIds: Type.Array(Type.String(), {
      minItems: 1,
      maxItems: 500,
      description:
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    }),
  },
  {
    ref: 'RichMenuBulkUnlinkRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-users',
    },
  },
)

export type RichMenuBulkUnlinkRequest = Static<typeof RichMenuBulkUnlinkRequestSchema>

export const RichMenuBatchOperationSchema = Type.Object(
  {
    type: Type.String({
      description:
        'The type of operation to the rich menu linked to the user. One of link, unlink, or unlinkAll.',
    }),
  },
  {
    ref: 'RichMenuBatchOperation',
    description:
      'Rich menu operation object represents the batch operation to the rich menu linked to the user.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users-operations',
    },
  },
)

export type RichMenuBatchOperation = Static<typeof RichMenuBatchOperationSchema>

export const RichMenuBatchRequestSchema = Type.Object(
  {
    operations: Type.Array(RichMenuBatchOperationSchema, {
      maxItems: 1000,
      description: 'Array of Rich menu operation object...',
    }),
    resumeRequestKey: Type.Optional(
      Type.String({
        pattern: '^[a-zA-Z0-9_-]{1,100}$',
        minLength: 1,
        maxLength: 100,
        description: 'Key for retry. Key value is a string matching the regular expression pattern',
      }),
    ),
  },
  { ref: 'RichMenuBatchRequest' },
)

export type RichMenuBatchRequest = Static<typeof RichMenuBatchRequestSchema>

export const RichMenuBatchLinkOperationSchema = Type.Intersect(
  [
    RichMenuBatchOperationSchema,
    Type.Object({ from: Type.Optional(Type.String()), to: Type.Optional(Type.String()) }),
  ],
  {
    ref: 'RichMenuBatchLinkOperation',
    description:
      'Replace the rich menu with the rich menu specified in the `to` property for all users linked to the rich menu specified in the `from` property.',
  },
)

export type RichMenuBatchLinkOperation = Static<typeof RichMenuBatchLinkOperationSchema>

export const RichMenuBatchUnlinkOperationSchema = Type.Intersect(
  [RichMenuBatchOperationSchema, Type.Object({ from: Type.Optional(Type.String()) })],
  {
    ref: 'RichMenuBatchUnlinkOperation',
    description:
      'Unlink the rich menu for all users linked to the rich menu specified in the `from` property.',
  },
)

export type RichMenuBatchUnlinkOperation = Static<typeof RichMenuBatchUnlinkOperationSchema>

export const RichMenuBatchUnlinkAllOperationSchema = RichMenuBatchOperationSchema

export type RichMenuBatchUnlinkAllOperation = Static<typeof RichMenuBatchUnlinkAllOperationSchema>

export const RichMenuBatchProgressPhaseSchema = Type.Union(
  [Type.Literal('ongoing'), Type.Literal('succeeded'), Type.Literal('failed')],
  {
    ref: 'RichMenuBatchProgressPhase',
    description:
      "The current status. One of:\n\n`ongoing`: Rich menu batch control is in progress.\n`succeeded`: Rich menu batch control is complete.\n`failed`: Rich menu batch control failed.\n          This means that the rich menu for one or more users couldn't be controlled.\n          There may also be users whose operations have been successfully completed.\n",
  },
)

export type RichMenuBatchProgressPhase = Static<typeof RichMenuBatchProgressPhaseSchema>

export const RichMenuBatchProgressResponseSchema = Type.Object(
  {
    phase: RichMenuBatchProgressPhaseSchema,
    acceptedTime: Type.String({
      format: 'date-time',
      description:
        'The accepted time in milliseconds of the request of batch control the rich menu.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
    }),
    completedTime: Type.Optional(
      Type.String({
        format: 'date-time',
        description:
          'The completed time in milliseconds of rich menu batch control. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
      }),
    ),
  },
  {
    ref: 'RichMenuBatchProgressResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status-response',
    },
  },
)

export type RichMenuBatchProgressResponse = Static<typeof RichMenuBatchProgressResponseSchema>

export const IssueLinkTokenResponseSchema = Type.Object(
  {
    linkToken: Type.String({
      description:
        'Link token.\nLink tokens are valid for 10 minutes and can only be used once.\n\n',
    }),
  },
  {
    ref: 'IssueLinkTokenResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-link-token',
    },
  },
)

export type IssueLinkTokenResponse = Static<typeof IssueLinkTokenResponseSchema>

export const ChatReferenceSchema = Type.Object(
  { userId: Type.String({ description: 'The target user ID' }) },
  {
    ref: 'ChatReference',
    description: 'Chat reference',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  },
)

export type ChatReference = Static<typeof ChatReferenceSchema>

export const MarkMessagesAsReadRequestSchema = Type.Object(
  { chat: ChatReferenceSchema },
  {
    ref: 'MarkMessagesAsReadRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  },
)

export type MarkMessagesAsReadRequest = Static<typeof MarkMessagesAsReadRequestSchema>

export const PnpMessagesRequestSchema = Type.Object(
  {
    messages: Type.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Message to be sent.',
    }),
    to: Type.String({
      description:
        'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
    }),
    notificationDisabled: Type.Optional(NotificationDisabledSchema),
    customAggregationUnits: Type.Optional(
      Type.Array(Type.String({ pattern: '^[a-zA-Z0-9_]{1,30}$', minLength: 1, maxLength: 30 }), {
        maxItems: 1,
        description: 'Name of aggregation unit. Case-sensitive.',
      }),
    ),
  },
  {
    ref: 'PnpMessagesRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message',
    },
  },
)

export type PnpMessagesRequest = Static<typeof PnpMessagesRequestSchema>

export const PnpTemplatedEmphasizedItemSchema = Type.Object(
  {
    itemKey: Type.String({
      description:
        'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
    }),
    content: Type.String({
      maxLength: 15,
      description: 'String to be displayed as the value of the item.',
    }),
  },
  {
    ref: 'PnpTemplatedEmphasizedItem',
    description: 'Item to emphasize in the message.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  },
)

export type PnpTemplatedEmphasizedItem = Static<typeof PnpTemplatedEmphasizedItemSchema>

export const PnpTemplatedItemSchema = Type.Object(
  {
    itemKey: Type.String({
      description:
        'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
    }),
    content: Type.String({
      maxLength: 300,
      description: 'String to be displayed as the value of the item.',
    }),
  },
  {
    ref: 'PnpTemplatedItem',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  },
)

export type PnpTemplatedItem = Static<typeof PnpTemplatedItemSchema>

export const PnpTemplatedButtonSchema = Type.Object(
  {
    buttonKey: Type.String({
      description:
        'Specify the key of the button you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#buttons\n',
    }),
    url: Type.String({
      maxLength: 1000,
      description: 'URL of the page to be opened when the user presses the button.',
    }),
  },
  {
    ref: 'PnpTemplatedButton',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-buttons',
    },
  },
)

export type PnpTemplatedButton = Static<typeof PnpTemplatedButtonSchema>

export const PnpTemplatedMessageBodySchema = Type.Object(
  {
    emphasizedItem: Type.Optional(PnpTemplatedEmphasizedItemSchema),
    items: Type.Optional(
      Type.Array(PnpTemplatedItemSchema, {
        maxItems: 15,
        description:
          'Array of items to include in the message. The `itemKey` must be unique across `emphasizedItem` and `items`.',
      }),
    ),
    buttons: Type.Optional(
      Type.Array(PnpTemplatedButtonSchema, {
        maxItems: 2,
        description: 'Array of buttons to include in the message. The `buttonKey` must be unique.',
      }),
    ),
  },
  {
    ref: 'PnpTemplatedMessageBody',
    description:
      "The body object of the template you want to send. You can't specify the same item more than once in a single message.",
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  },
)

export type PnpTemplatedMessageBody = Static<typeof PnpTemplatedMessageBodySchema>

export const PnpTemplatedMessageRequestSchema = Type.Object(
  {
    to: Type.String({
      description:
        'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
    }),
    templateKey: Type.String({
      description:
        'Specify the key of the template you want to send.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#templates\n',
    }),
    body: Type.Optional(PnpTemplatedMessageBodySchema),
    customAggregationUnits: Type.Optional(
      Type.Array(Type.String({ pattern: '^[a-zA-Z0-9_]{1,30}$', minLength: 1, maxLength: 30 }), {
        maxItems: 1,
        description:
          'Name of aggregation unit. Case-sensitive.\nFor more information about assigning a unit name, see https://developers.line.biz/en/docs/messaging-api/unit-based-statistics-aggregation/#assign-names-to-units-when-sending-messages\n',
      }),
    ),
  },
  {
    ref: 'PnpTemplatedMessageRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  },
)

export type PnpTemplatedMessageRequest = Static<typeof PnpTemplatedMessageRequestSchema>

export const EmojiSchema = Type.Object(
  {
    index: Type.Optional(Type.Integer()),
    productId: Type.Optional(Type.String()),
    emojiId: Type.Optional(Type.String()),
  },
  { ref: 'Emoji' },
)

export type Emoji = Static<typeof EmojiSchema>

export const TextMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      text: Type.Optional(Type.String()),
      emojis: Type.Optional(Type.Array(EmojiSchema)),
      quoteToken: Type.Optional(
        Type.String({ description: 'Quote token of the message you want to quote.' }),
      ),
    }),
  ],
  {
    ref: 'TextMessage',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#text-message' },
  },
)

export type TextMessage = Static<typeof TextMessageSchema>

export const SubstitutionObjectSchema = Type.Object(
  { type: Type.String({ description: 'Type of substitution object' }) },
  {
    ref: 'SubstitutionObject',
    description: 'An object that defines the replacement value for a placeholder in the text.',
  },
)

export type SubstitutionObject = Static<typeof SubstitutionObjectSchema>

export const TextMessageV2Schema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      text: Type.Optional(Type.String()),
      substitution: Type.Optional(
        Type.Record(Type.String(), SubstitutionObjectSchema, {
          description:
            'A mapping that specifies substitutions for parts enclosed in {} within the `text` field.',
        }),
      ),
      quoteToken: Type.Optional(
        Type.String({ description: 'Quote token of the message you want to quote.' }),
      ),
    }),
  ],
  {
    ref: 'TextMessageV2',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2',
    },
  },
)

export type TextMessageV2 = Static<typeof TextMessageV2Schema>

export const MentionTargetSchema = Type.Object(
  { type: Type.String({ description: 'Target to be mentioned' }) },
  { ref: 'MentionTarget' },
)

export type MentionTarget = Static<typeof MentionTargetSchema>

export const MentionSubstitutionObjectSchema = Type.Intersect(
  [SubstitutionObjectSchema, Type.Object({ mentionee: MentionTargetSchema })],
  {
    ref: 'MentionSubstitutionObject',
    description: 'An object representing a mention substitution.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mention-object',
    },
  },
)

export type MentionSubstitutionObject = Static<typeof MentionSubstitutionObjectSchema>

export const UserMentionTargetSchema = Type.Intersect(
  [MentionTargetSchema, Type.Object({ userId: Type.String() })],
  {
    ref: 'UserMentionTarget',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-user',
    },
  },
)

export type UserMentionTarget = Static<typeof UserMentionTargetSchema>

export const AllMentionTargetSchema = MentionTargetSchema

export type AllMentionTarget = Static<typeof AllMentionTargetSchema>

export const EmojiSubstitutionObjectSchema = Type.Intersect(
  [SubstitutionObjectSchema, Type.Object({ productId: Type.String(), emojiId: Type.String() })],
  {
    ref: 'EmojiSubstitutionObject',
    description: 'An object representing a emoji substitution.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-emoji-object',
    },
  },
)

export type EmojiSubstitutionObject = Static<typeof EmojiSubstitutionObjectSchema>

export const StickerMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      packageId: Type.Optional(Type.String()),
      stickerId: Type.Optional(Type.String()),
      quoteToken: Type.Optional(
        Type.String({ description: 'Quote token of the message you want to quote.' }),
      ),
    }),
  ],
  {
    ref: 'StickerMessage',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#sticker-message',
    },
  },
)

export type StickerMessage = Static<typeof StickerMessageSchema>

export const ImageMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      originalContentUrl: Type.Optional(Type.String({ format: 'uri' })),
      previewImageUrl: Type.Optional(Type.String({ format: 'uri' })),
    }),
  ],
  {
    ref: 'ImageMessage',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#image-message' },
  },
)

export type ImageMessage = Static<typeof ImageMessageSchema>

export const VideoMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      originalContentUrl: Type.Optional(Type.String({ format: 'uri' })),
      previewImageUrl: Type.Optional(Type.String({ format: 'uri' })),
      trackingId: Type.Optional(Type.String()),
    }),
  ],
  {
    ref: 'VideoMessage',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#video-message' },
  },
)

export type VideoMessage = Static<typeof VideoMessageSchema>

export const AudioMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      originalContentUrl: Type.Optional(Type.String({ format: 'uri' })),
      duration: Type.Optional(Type.Integer()),
    }),
  ],
  {
    ref: 'AudioMessage',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#audio-message' },
  },
)

export type AudioMessage = Static<typeof AudioMessageSchema>

export const LocationMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      title: Type.Optional(Type.String()),
      address: Type.Optional(Type.String()),
      latitude: Type.Optional(Type.Number()),
      longitude: Type.Optional(Type.Number()),
    }),
  ],
  {
    ref: 'LocationMessage',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#location-message',
    },
  },
)

export type LocationMessage = Static<typeof LocationMessageSchema>

export const ImagemapBaseSizeSchema = Type.Object(
  { height: Type.Integer(), width: Type.Integer() },
  { ref: 'ImagemapBaseSize' },
)

export type ImagemapBaseSize = Static<typeof ImagemapBaseSizeSchema>

export const ImagemapAreaSchema = Type.Object(
  { x: Type.Integer(), y: Type.Integer(), width: Type.Integer(), height: Type.Integer() },
  { ref: 'ImagemapArea' },
)

export type ImagemapArea = Static<typeof ImagemapAreaSchema>

export const ImagemapActionSchema = Type.Object(
  { type: Type.String(), area: ImagemapAreaSchema },
  {
    ref: 'ImagemapAction',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-action-objects',
    },
  },
)

export type ImagemapAction = Static<typeof ImagemapActionSchema>

export const ImagemapExternalLinkSchema = Type.Object(
  { linkUri: Type.Optional(Type.String({ format: 'uri' })), label: Type.Optional(Type.String()) },
  { ref: 'ImagemapExternalLink' },
)

export type ImagemapExternalLink = Static<typeof ImagemapExternalLinkSchema>

export const ImagemapVideoSchema = Type.Object(
  {
    originalContentUrl: Type.Optional(Type.String({ format: 'uri' })),
    previewImageUrl: Type.Optional(Type.String({ format: 'uri' })),
    area: Type.Optional(ImagemapAreaSchema),
    externalLink: Type.Optional(ImagemapExternalLinkSchema),
  },
  { ref: 'ImagemapVideo' },
)

export type ImagemapVideo = Static<typeof ImagemapVideoSchema>

export const ImagemapMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      baseUrl: Type.Optional(Type.String({ format: 'uri' })),
      altText: Type.Optional(Type.String()),
      baseSize: Type.Optional(ImagemapBaseSizeSchema),
      actions: Type.Optional(Type.Array(ImagemapActionSchema)),
      video: Type.Optional(ImagemapVideoSchema),
    }),
  ],
  {
    ref: 'ImagemapMessage',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-message',
    },
  },
)

export type ImagemapMessage = Static<typeof ImagemapMessageSchema>

export const MessageImagemapActionSchema = Type.Intersect(
  [
    ImagemapActionSchema,
    Type.Object({ text: Type.Optional(Type.String()), label: Type.Optional(Type.String()) }),
  ],
  { ref: 'MessageImagemapAction' },
)

export type MessageImagemapAction = Static<typeof MessageImagemapActionSchema>

export const URIImagemapActionSchema = Type.Intersect(
  [
    ImagemapActionSchema,
    Type.Object({ linkUri: Type.Optional(Type.String()), label: Type.Optional(Type.String()) }),
  ],
  { ref: 'URIImagemapAction' },
)

export type URIImagemapAction = Static<typeof URIImagemapActionSchema>

export const ClipboardImagemapActionSchema = Type.Intersect(
  [
    ImagemapActionSchema,
    Type.Object({
      clipboardText: Type.Optional(
        Type.String({
          minLength: 1,
          maxLength: 1000,
          description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n',
        }),
      ),
      label: Type.Optional(Type.String()),
    }),
  ],
  {
    ref: 'ClipboardImagemapAction',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-clipboard-action-object',
    },
  },
)

export type ClipboardImagemapAction = Static<typeof ClipboardImagemapActionSchema>

export const TemplateSchema = Type.Object({ type: Type.String() }, { ref: 'Template' })

export type Template = Static<typeof TemplateSchema>

export const TemplateMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({ altText: Type.Optional(Type.String()), template: Type.Optional(TemplateSchema) }),
  ],
  {
    ref: 'TemplateMessage',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#template-messages',
    },
  },
)

export type TemplateMessage = Static<typeof TemplateMessageSchema>

export const ButtonsTemplateSchema = Type.Intersect(
  [
    TemplateSchema,
    Type.Object({
      thumbnailImageUrl: Type.Optional(Type.String({ format: 'uri' })),
      imageAspectRatio: Type.Optional(Type.String()),
      imageSize: Type.Optional(Type.String()),
      imageBackgroundColor: Type.Optional(Type.String()),
      title: Type.Optional(Type.String()),
      text: Type.Optional(Type.String()),
      defaultAction: Type.Optional(ActionSchema),
      actions: Type.Optional(Type.Array(ActionSchema)),
    }),
  ],
  { ref: 'ButtonsTemplate' },
)

export type ButtonsTemplate = Static<typeof ButtonsTemplateSchema>

export const TemplateImageAspectRatioSchema = Type.Union(
  [Type.Literal('rectangle'), Type.Literal('square')],
  {
    ref: 'TemplateImageAspectRatio',
    description:
      'Aspect ratio of the image. This is only for the `imageAspectRatio` in ButtonsTemplate.\nSpecify one of the following values:\n\n`rectangle`: 1.51:1\n`square`: 1:1\n',
  },
)

export type TemplateImageAspectRatio = Static<typeof TemplateImageAspectRatioSchema>

export const TemplateImageSizeSchema = Type.Union(
  [Type.Literal('cover'), Type.Literal('contain')],
  {
    ref: 'TemplateImageSize',
    description:
      'Size of the image.  This is only for the `imageSize` in ButtonsTemplate.\nSpecify one of the following values:\n\n`cover`: The image fills the entire image area. Parts of the image that do not fit in the area are not displayed.\n`contain`: The entire image is displayed in the image area. A background is displayed in the unused areas to the left and right of vertical images and in the areas above and below horizontal images.\n',
  },
)

export type TemplateImageSize = Static<typeof TemplateImageSizeSchema>

export const ConfirmTemplateSchema = Type.Intersect(
  [
    TemplateSchema,
    Type.Object({
      text: Type.Optional(Type.String()),
      actions: Type.Optional(Type.Array(ActionSchema)),
    }),
  ],
  { ref: 'ConfirmTemplate' },
)

export type ConfirmTemplate = Static<typeof ConfirmTemplateSchema>

export const CarouselColumnSchema = Type.Object(
  {
    thumbnailImageUrl: Type.Optional(Type.String({ format: 'uri' })),
    imageBackgroundColor: Type.Optional(Type.String()),
    title: Type.Optional(Type.String()),
    text: Type.String(),
    defaultAction: Type.Optional(ActionSchema),
    actions: Type.Array(ActionSchema),
  },
  { ref: 'CarouselColumn', description: 'Column object for carousel template.' },
)

export type CarouselColumn = Static<typeof CarouselColumnSchema>

export const CarouselTemplateSchema = Type.Intersect(
  [
    TemplateSchema,
    Type.Object({
      columns: Type.Optional(Type.Array(CarouselColumnSchema)),
      imageAspectRatio: Type.Optional(Type.String()),
      imageSize: Type.Optional(Type.String()),
    }),
  ],
  { ref: 'CarouselTemplate' },
)

export type CarouselTemplate = Static<typeof CarouselTemplateSchema>

export const ImageCarouselColumnSchema = Type.Object(
  { imageUrl: Type.String({ format: 'uri' }), action: ActionSchema },
  { ref: 'ImageCarouselColumn' },
)

export type ImageCarouselColumn = Static<typeof ImageCarouselColumnSchema>

export const ImageCarouselTemplateSchema = Type.Intersect(
  [TemplateSchema, Type.Object({ columns: Type.Optional(Type.Array(ImageCarouselColumnSchema)) })],
  { ref: 'ImageCarouselTemplate' },
)

export type ImageCarouselTemplate = Static<typeof ImageCarouselTemplateSchema>

export const CouponMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      couponId: Type.Optional(Type.String({ description: 'Unique identifier of the coupon.' })),
      deliveryTag: Type.Optional(
        Type.String({
          maxLength: 30,
          description:
            'Delivery route tag information. It can be used for analysis in LINE OA Manager.',
        }),
      ),
    }),
  ],
  {
    ref: 'CouponMessage',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#coupon-message' },
  },
)

export type CouponMessage = Static<typeof CouponMessageSchema>

export const FlexContainerSchema = Type.Object({ type: Type.String() }, { ref: 'FlexContainer' })

export type FlexContainer = Static<typeof FlexContainerSchema>

export const FlexMessageSchema = Type.Intersect(
  [
    MessageSchema,
    Type.Object({
      altText: Type.Optional(Type.String()),
      contents: Type.Optional(FlexContainerSchema),
    }),
  ],
  {
    ref: 'FlexMessage',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#flex-message' },
  },
)

export type FlexMessage = Static<typeof FlexMessageSchema>

export const FlexBlockStyleSchema = Type.Object(
  {
    backgroundColor: Type.Optional(Type.String()),
    separator: Type.Optional(Type.Boolean()),
    separatorColor: Type.Optional(Type.String()),
  },
  { ref: 'FlexBlockStyle' },
)

export type FlexBlockStyle = Static<typeof FlexBlockStyleSchema>

export const FlexBubbleStylesSchema = Type.Object(
  {
    header: Type.Optional(FlexBlockStyleSchema),
    hero: Type.Optional(FlexBlockStyleSchema),
    body: Type.Optional(FlexBlockStyleSchema),
    footer: Type.Optional(FlexBlockStyleSchema),
  },
  { ref: 'FlexBubbleStyles' },
)

export type FlexBubbleStyles = Static<typeof FlexBubbleStylesSchema>

export const FlexComponentSchema = Type.Object({ type: Type.String() }, { ref: 'FlexComponent' })

export type FlexComponent = Static<typeof FlexComponentSchema>

export const FlexBoxBackgroundSchema = Type.Object(
  { type: Type.String() },
  { ref: 'FlexBoxBackground' },
)

export type FlexBoxBackground = Static<typeof FlexBoxBackgroundSchema>

export const FlexBoxSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({
      layout: Type.Optional(
        Type.Union([
          Type.Literal('horizontal'),
          Type.Literal('vertical'),
          Type.Literal('baseline'),
        ]),
      ),
      flex: Type.Optional(Type.Integer()),
      contents: Type.Optional(Type.Array(FlexComponentSchema)),
      spacing: Type.Optional(Type.String()),
      margin: Type.Optional(Type.String()),
      position: Type.Optional(Type.Union([Type.Literal('relative'), Type.Literal('absolute')])),
      offsetTop: Type.Optional(Type.String()),
      offsetBottom: Type.Optional(Type.String()),
      offsetStart: Type.Optional(Type.String()),
      offsetEnd: Type.Optional(Type.String()),
      backgroundColor: Type.Optional(Type.String()),
      borderColor: Type.Optional(Type.String()),
      borderWidth: Type.Optional(Type.String()),
      cornerRadius: Type.Optional(Type.String()),
      width: Type.Optional(Type.String()),
      maxWidth: Type.Optional(Type.String()),
      height: Type.Optional(Type.String()),
      maxHeight: Type.Optional(Type.String()),
      paddingAll: Type.Optional(Type.String()),
      paddingTop: Type.Optional(Type.String()),
      paddingBottom: Type.Optional(Type.String()),
      paddingStart: Type.Optional(Type.String()),
      paddingEnd: Type.Optional(Type.String()),
      action: Type.Optional(ActionSchema),
      justifyContent: Type.Optional(
        Type.Union([
          Type.Literal('center'),
          Type.Literal('flex-start'),
          Type.Literal('flex-end'),
          Type.Literal('space-between'),
          Type.Literal('space-around'),
          Type.Literal('space-evenly'),
        ]),
      ),
      alignItems: Type.Optional(
        Type.Union([Type.Literal('center'), Type.Literal('flex-start'), Type.Literal('flex-end')]),
      ),
      background: Type.Optional(FlexBoxBackgroundSchema),
    }),
  ],
  { ref: 'FlexBox' },
)

export type FlexBox = Static<typeof FlexBoxSchema>

export const FlexBubbleSchema = Type.Intersect(
  [
    FlexContainerSchema,
    Type.Object({
      direction: Type.Optional(Type.Union([Type.Literal('ltr'), Type.Literal('rtl')])),
      styles: Type.Optional(FlexBubbleStylesSchema),
      header: Type.Optional(FlexBoxSchema),
      hero: Type.Optional(FlexComponentSchema),
      body: Type.Optional(FlexBoxSchema),
      footer: Type.Optional(FlexBoxSchema),
      size: Type.Optional(
        Type.Union([
          Type.Literal('nano'),
          Type.Literal('micro'),
          Type.Literal('deca'),
          Type.Literal('hecto'),
          Type.Literal('kilo'),
          Type.Literal('mega'),
          Type.Literal('giga'),
        ]),
      ),
      action: Type.Optional(ActionSchema),
    }),
  ],
  { ref: 'FlexBubble' },
)

export type FlexBubble = Static<typeof FlexBubbleSchema>

export const FlexCarouselSchema = Type.Intersect(
  [FlexContainerSchema, Type.Object({ contents: Type.Optional(Type.Array(FlexBubbleSchema)) })],
  { ref: 'FlexCarousel' },
)

export type FlexCarousel = Static<typeof FlexCarouselSchema>

export const FlexBoxBorderWidthSchema = Type.Union(
  [
    Type.Literal('none'),
    Type.Literal('light'),
    Type.Literal('normal'),
    Type.Literal('medium'),
    Type.Literal('semi-bold'),
    Type.Literal('bold'),
  ],
  {
    ref: 'FlexBoxBorderWidth',
    description:
      'Width of box border. This is only for `borderWidth` in FlexBox.\nA value of none means that borders are not rendered; the other values are listed in order of increasing width.\n',
  },
)

export type FlexBoxBorderWidth = Static<typeof FlexBoxBorderWidthSchema>

export const FlexBoxCornerRadiusSchema = Type.Union(
  [
    Type.Literal('none'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
  ],
  {
    ref: 'FlexBoxCornerRadius',
    description:
      'Radius at the time of rounding the corners of the box. This is only for `cornerRadius` in FlexBox.\nA value of none means that corners are not rounded; the other values are listed in order of increasing radius.\n',
  },
)

export type FlexBoxCornerRadius = Static<typeof FlexBoxCornerRadiusSchema>

export const FlexBoxSpacingSchema = Type.Union(
  [
    Type.Literal('none'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
  ],
  {
    ref: 'FlexBoxSpacing',
    description:
      'You can specify the minimum space between two components with the `spacing` property of the parent box component, in pixels or with a keyword.\nFlexBoxSpacing just provides only keywords.\n',
  },
)

export type FlexBoxSpacing = Static<typeof FlexBoxSpacingSchema>

export const FlexMarginSchema = Type.Union(
  [
    Type.Literal('none'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
  ],
  {
    ref: 'FlexMargin',
    description:
      'You can specify the minimum space before a child component with the `margin` property of the child component, in pixels or with a keyword.\nFlexMargin just provides only keywords.\n',
  },
)

export type FlexMargin = Static<typeof FlexMarginSchema>

export const FlexBoxPaddingSchema = Type.Union(
  [
    Type.Literal('none'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
  ],
  {
    ref: 'FlexBoxPadding',
    description:
      'Padding can be specified in pixels, percentage (to the parent box width) or with a keyword.\nFlexBoxPadding just provides only keywords.\n',
  },
)

export type FlexBoxPadding = Static<typeof FlexBoxPaddingSchema>

export const FlexImageSizeSchema = Type.Union(
  [
    Type.Literal('xxs'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
    Type.Literal('3xl'),
    Type.Literal('4xl'),
    Type.Literal('5xl'),
    Type.Literal('full'),
  ],
  {
    ref: 'FlexImageSize',
    description:
      'You can set the width of an Flex image component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexImageSize just provides only keywords.\n',
  },
)

export type FlexImageSize = Static<typeof FlexImageSizeSchema>

export const FlexIconSizeSchema = Type.Union(
  [
    Type.Literal('xxs'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
    Type.Literal('3xl'),
    Type.Literal('4xl'),
    Type.Literal('5xl'),
  ],
  {
    ref: 'FlexIconSize',
    description:
      'You can set the width of an Flex icon component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexIconSize just provides only keywords.\n',
  },
)

export type FlexIconSize = Static<typeof FlexIconSizeSchema>

export const FlexTextFontSizeSchema = Type.Union(
  [
    Type.Literal('xxs'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
    Type.Literal('3xl'),
    Type.Literal('4xl'),
    Type.Literal('5xl'),
  ],
  {
    ref: 'FlexTextFontSize',
    description:
      'Font size in the `size` property of the Flex text component.\nYou can specify the size in pixels or with a keyword.\nFlexTextFontSize just provides only keywords.\n',
  },
)

export type FlexTextFontSize = Static<typeof FlexTextFontSizeSchema>

export const FlexSpanSizeSchema = Type.Union(
  [
    Type.Literal('xxs'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
    Type.Literal('3xl'),
    Type.Literal('4xl'),
    Type.Literal('5xl'),
  ],
  {
    ref: 'FlexSpanSize',
    description:
      'Font size in the `size` property of the Flex span component.\nYou can specify the size in pixels or with a keyword.\nFlexSpanSize just provides only keywords.\n',
  },
)

export type FlexSpanSize = Static<typeof FlexSpanSizeSchema>

export const FlexOffsetSchema = Type.Union(
  [
    Type.Literal('none'),
    Type.Literal('xs'),
    Type.Literal('sm'),
    Type.Literal('md'),
    Type.Literal('lg'),
    Type.Literal('xl'),
    Type.Literal('xxl'),
  ],
  {
    ref: 'FlexOffset',
    description:
      'You can specify the offset of a component with the `offset*` property, in pixels or with a keyword.\nYou can also specify the percentage to the box width for `offsetStart` and `offsetEnd` and to the box height for `offsetTop` and `offsetBottom`.\nFlexOffset just provides only keywords.\n',
  },
)

export type FlexOffset = Static<typeof FlexOffsetSchema>

export const FlexButtonSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({
      flex: Type.Optional(Type.Integer()),
      color: Type.Optional(Type.String()),
      style: Type.Optional(
        Type.Union([Type.Literal('primary'), Type.Literal('secondary'), Type.Literal('link')]),
      ),
      action: Type.Optional(ActionSchema),
      gravity: Type.Optional(
        Type.Union([Type.Literal('top'), Type.Literal('bottom'), Type.Literal('center')]),
      ),
      margin: Type.Optional(Type.String()),
      position: Type.Optional(Type.Union([Type.Literal('relative'), Type.Literal('absolute')])),
      offsetTop: Type.Optional(Type.String()),
      offsetBottom: Type.Optional(Type.String()),
      offsetStart: Type.Optional(Type.String()),
      offsetEnd: Type.Optional(Type.String()),
      height: Type.Optional(Type.Union([Type.Literal('md'), Type.Literal('sm')])),
      adjustMode: Type.Optional(Type.Literal('shrink-to-fit')),
      scaling: Type.Optional(Type.Boolean()),
    }),
  ],
  { ref: 'FlexButton' },
)

export type FlexButton = Static<typeof FlexButtonSchema>

export const FlexImageSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({
      url: Type.Optional(
        Type.String({
          format: 'uri',
          description:
            'Image URL (Max character limit: 2000)\nProtocol: HTTPS (TLS 1.2 or later)\nImage format: JPEG or PNG\nMaximum image size: 1024×1024 pixels\nMaximum file size: 10 MB (300 KB when the animated property is true)\n',
        }),
      ),
      flex: Type.Optional(
        Type.Integer({
          description: 'The ratio of the width or height of this component within the parent box.',
        }),
      ),
      margin: Type.Optional(
        Type.String({
          description:
            'The minimum amount of space to include before this component in its parent container.\n',
        }),
      ),
      position: Type.Optional(
        Type.Union([Type.Literal('relative'), Type.Literal('absolute')], {
          description:
            'Reference for offsetTop, offsetBottom, offsetStart, and offsetEnd. Specify one of the following values:\n\n`relative`: Use the previous box as reference.\n`absolute`: Use the top left of parent element as reference. The default value is relative.\n',
        }),
      ),
      offsetTop: Type.Optional(Type.String({ description: 'Offset.' })),
      offsetBottom: Type.Optional(Type.String({ description: 'Offset.' })),
      offsetStart: Type.Optional(Type.String({ description: 'Offset.' })),
      offsetEnd: Type.Optional(Type.String({ description: 'Offset.' })),
      align: Type.Optional(
        Type.Union([Type.Literal('start'), Type.Literal('end'), Type.Literal('center')], {
          description: 'Alignment style in horizontal direction.\n',
        }),
      ),
      gravity: Type.Optional(
        Type.Union([Type.Literal('top'), Type.Literal('bottom'), Type.Literal('center')], {
          description: 'Alignment style in vertical direction.',
        }),
      ),
      size: Type.Optional(
        Type.String({
          description: 'The maximum image width. This is md by default.\n',
          default: 'md',
        }),
      ),
      aspectRatio: Type.Optional(
        Type.String({
          description:
            'Aspect ratio of the image.\n`{width}:{height}` format.\nSpecify the value of `{width}` and `{height}` in the range from `1` to `100000`.\nHowever, you cannot set `{height}` to a value that is more than three times the value of `{width}`.\nThe default value is `1:1`.\n',
        }),
      ),
      aspectMode: Type.Optional(
        Type.Union([Type.Literal('fit'), Type.Literal('cover')], {
          description:
            'The display style of the image if the aspect ratio of the image and that specified by the aspectRatio property do not match.\n',
        }),
      ),
      backgroundColor: Type.Optional(
        Type.String({
          description: 'Background color of the image. Use a hexadecimal color code.',
        }),
      ),
      action: Type.Optional(ActionSchema),
      animated: Type.Optional(
        Type.Boolean({
          description:
            "When this is `true`, an animated image (APNG) plays.\nYou can specify a value of true up to 10 images in a single message.\nYou can't send messages that exceed this limit.\nThis is `false` by default.\nAnimated images larger than 300 KB aren't played back.\n",
          default: false,
        }),
      ),
    }),
  ],
  {
    ref: 'FlexImage',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#f-image' },
  },
)

export type FlexImage = Static<typeof FlexImageSchema>

export const FlexVideoSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({
      url: Type.Optional(Type.String({ format: 'uri' })),
      previewUrl: Type.Optional(Type.String({ format: 'uri' })),
      altContent: Type.Optional(FlexComponentSchema),
      aspectRatio: Type.Optional(Type.String()),
      action: Type.Optional(ActionSchema),
    }),
  ],
  { ref: 'FlexVideo' },
)

export type FlexVideo = Static<typeof FlexVideoSchema>

export const FlexIconSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({
      url: Type.Optional(Type.String({ format: 'uri' })),
      size: Type.Optional(Type.String()),
      aspectRatio: Type.Optional(Type.String()),
      margin: Type.Optional(Type.String()),
      position: Type.Optional(Type.Union([Type.Literal('relative'), Type.Literal('absolute')])),
      offsetTop: Type.Optional(Type.String()),
      offsetBottom: Type.Optional(Type.String()),
      offsetStart: Type.Optional(Type.String()),
      offsetEnd: Type.Optional(Type.String()),
      scaling: Type.Optional(Type.Boolean()),
    }),
  ],
  {
    ref: 'FlexIcon',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#icon' },
  },
)

export type FlexIcon = Static<typeof FlexIconSchema>

export const FlexSpanSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({
      text: Type.Optional(Type.String()),
      size: Type.Optional(Type.String()),
      color: Type.Optional(Type.String()),
      weight: Type.Optional(Type.Union([Type.Literal('regular'), Type.Literal('bold')])),
      style: Type.Optional(Type.Union([Type.Literal('normal'), Type.Literal('italic')])),
      decoration: Type.Optional(
        Type.Union([Type.Literal('none'), Type.Literal('underline'), Type.Literal('line-through')]),
      ),
    }),
  ],
  { ref: 'FlexSpan' },
)

export type FlexSpan = Static<typeof FlexSpanSchema>

export const FlexTextSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({
      flex: Type.Optional(Type.Integer()),
      text: Type.Optional(Type.String()),
      size: Type.Optional(Type.String()),
      align: Type.Optional(
        Type.Union([Type.Literal('start'), Type.Literal('end'), Type.Literal('center')]),
      ),
      gravity: Type.Optional(
        Type.Union([Type.Literal('top'), Type.Literal('bottom'), Type.Literal('center')]),
      ),
      color: Type.Optional(Type.String()),
      weight: Type.Optional(Type.Union([Type.Literal('regular'), Type.Literal('bold')])),
      style: Type.Optional(Type.Union([Type.Literal('normal'), Type.Literal('italic')])),
      decoration: Type.Optional(
        Type.Union([Type.Literal('none'), Type.Literal('underline'), Type.Literal('line-through')]),
      ),
      wrap: Type.Optional(Type.Boolean()),
      lineSpacing: Type.Optional(Type.String()),
      margin: Type.Optional(Type.String()),
      position: Type.Optional(Type.Union([Type.Literal('relative'), Type.Literal('absolute')])),
      offsetTop: Type.Optional(Type.String()),
      offsetBottom: Type.Optional(Type.String()),
      offsetStart: Type.Optional(Type.String()),
      offsetEnd: Type.Optional(Type.String()),
      action: Type.Optional(ActionSchema),
      maxLines: Type.Optional(Type.Integer()),
      contents: Type.Optional(Type.Array(FlexSpanSchema)),
      adjustMode: Type.Optional(Type.Literal('shrink-to-fit')),
      scaling: Type.Optional(Type.Boolean()),
    }),
  ],
  { ref: 'FlexText' },
)

export type FlexText = Static<typeof FlexTextSchema>

export const FlexSeparatorSchema = Type.Intersect(
  [
    FlexComponentSchema,
    Type.Object({ margin: Type.Optional(Type.String()), color: Type.Optional(Type.String()) }),
  ],
  { ref: 'FlexSeparator' },
)

export type FlexSeparator = Static<typeof FlexSeparatorSchema>

export const FlexFillerSchema = Type.Intersect(
  [FlexComponentSchema, Type.Object({ flex: Type.Optional(Type.Integer()) })],
  { ref: 'FlexFiller' },
)

export type FlexFiller = Static<typeof FlexFillerSchema>

export const FlexBoxLinearGradientSchema = Type.Intersect(
  [
    FlexBoxBackgroundSchema,
    Type.Object({
      angle: Type.Optional(Type.String()),
      startColor: Type.Optional(Type.String()),
      endColor: Type.Optional(Type.String()),
      centerColor: Type.Optional(Type.String()),
      centerPosition: Type.Optional(Type.String()),
    }),
  ],
  { ref: 'FlexBoxLinearGradient' },
)

export type FlexBoxLinearGradient = Static<typeof FlexBoxLinearGradientSchema>

export const CameraActionSchema = ActionSchema

export type CameraAction = Static<typeof CameraActionSchema>

export const CameraRollActionSchema = ActionSchema

export type CameraRollAction = Static<typeof CameraRollActionSchema>

export const ClipboardActionSchema = Type.Intersect(
  [
    ActionSchema,
    Type.Object({
      clipboardText: Type.String({
        minLength: 1,
        maxLength: 1000,
        description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n',
      }),
    }),
  ],
  {
    ref: 'ClipboardAction',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#clipboard-action',
    },
  },
)

export type ClipboardAction = Static<typeof ClipboardActionSchema>

export const DatetimePickerActionSchema = Type.Intersect(
  [
    ActionSchema,
    Type.Object({
      data: Type.Optional(Type.String({ minLength: 0, maxLength: 300 })),
      mode: Type.Optional(
        Type.Union([Type.Literal('date'), Type.Literal('time'), Type.Literal('datetime')]),
      ),
      initial: Type.Optional(Type.String()),
      max: Type.Optional(Type.String()),
      min: Type.Optional(Type.String()),
    }),
  ],
  {
    ref: 'DatetimePickerAction',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action',
    },
  },
)

export type DatetimePickerAction = Static<typeof DatetimePickerActionSchema>

export const LocationActionSchema = ActionSchema

export type LocationAction = Static<typeof LocationActionSchema>

export const MessageActionSchema = Type.Intersect(
  [ActionSchema, Type.Object({ text: Type.Optional(Type.String()) })],
  { ref: 'MessageAction' },
)

export type MessageAction = Static<typeof MessageActionSchema>

export const PostbackActionSchema = Type.Intersect(
  [
    ActionSchema,
    Type.Object({
      data: Type.Optional(Type.String({ minLength: 0, maxLength: 300 })),
      displayText: Type.Optional(Type.String()),
      text: Type.Optional(Type.String()),
      inputOption: Type.Optional(
        Type.Union([
          Type.Literal('closeRichMenu'),
          Type.Literal('openRichMenu'),
          Type.Literal('openKeyboard'),
          Type.Literal('openVoice'),
        ]),
      ),
      fillInText: Type.Optional(Type.String()),
    }),
  ],
  { ref: 'PostbackAction' },
)

export type PostbackAction = Static<typeof PostbackActionSchema>

export const RichMenuSwitchActionSchema = Type.Intersect(
  [
    ActionSchema,
    Type.Object({
      data: Type.Optional(Type.String({ minLength: 0, maxLength: 300 })),
      richMenuAliasId: Type.Optional(Type.String({ minLength: 0, maxLength: 32 })),
    }),
  ],
  { ref: 'RichMenuSwitchAction' },
)

export type RichMenuSwitchAction = Static<typeof RichMenuSwitchActionSchema>

export const AltUriSchema = Type.Object(
  { desktop: Type.Optional(Type.String({ minLength: 0, maxLength: 10000 })) },
  { ref: 'AltUri' },
)

export type AltUri = Static<typeof AltUriSchema>

export const URIActionSchema = Type.Intersect(
  [
    ActionSchema,
    Type.Object({
      uri: Type.Optional(Type.String({ format: 'uri', maxLength: 10000 })),
      altUri: Type.Optional(AltUriSchema),
    }),
  ],
  { ref: 'URIAction' },
)

export type URIAction = Static<typeof URIActionSchema>

export const SubscribedMembershipPlanSchema = Type.Object(
  {
    membershipId: Type.Integer({ description: 'Membership plan ID.' }),
    title: Type.String({ description: 'Membership plan name.' }),
    description: Type.String({ description: 'Membership plan description.' }),
    benefits: Type.Array(Type.String(), {
      minItems: 1,
      description: 'List of membership plan perks.',
    }),
    price: Type.Number({
      description: 'Monthly fee for membership plan. (e.g. 1500.00)',
      examples: [500],
    }),
    currency: Type.Union([Type.Literal('JPY'), Type.Literal('TWD'), Type.Literal('THB')], {
      description: 'The currency of membership.price.',
    }),
  },
  {
    ref: 'SubscribedMembershipPlan',
    description: 'Object containing information about the membership plan.',
  },
)

export type SubscribedMembershipPlan = Static<typeof SubscribedMembershipPlanSchema>

export const SubscribedMembershipUserSchema = Type.Object(
  {
    membershipNo: Type.Integer({ description: "The user's member number in the membership plan." }),
    joinedTime: Type.Integer({
      description: 'UNIX timestamp at which the user subscribed to the membership.',
    }),
    nextBillingDate: Type.String({
      description:
        'Next payment date for membership plan.\n- Format: yyyy-MM-dd (e.g. 2024-02-08)\n- Timezone: UTC+9\n',
    }),
    totalSubscriptionMonths: Type.Integer({
      description:
        'The period of time in months that the user has been subscribed to a membership plan. If a user previously canceled and then re-subscribed to the same membership plan, only the period after the re-subscription will be counted.',
    }),
  },
  {
    ref: 'SubscribedMembershipUser',
    description: 'Object containing user membership subscription information.',
  },
)

export type SubscribedMembershipUser = Static<typeof SubscribedMembershipUserSchema>

export const SubscriptionSchema = Type.Object(
  { membership: SubscribedMembershipPlanSchema, user: SubscribedMembershipUserSchema },
  { ref: 'Subscription', description: 'An array of memberships.' },
)

export type Subscription = Static<typeof SubscriptionSchema>

export const GetMembershipSubscriptionResponseSchema = Type.Object(
  {
    subscriptions: Type.Array(SubscriptionSchema, {
      minItems: 0,
      description: 'List of subscription information',
    }),
  },
  {
    ref: 'GetMembershipSubscriptionResponse',
    description: "A user's membership subscription status",
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-a-users-membership-subscription-status',
    },
  },
)

export type GetMembershipSubscriptionResponse = Static<
  typeof GetMembershipSubscriptionResponseSchema
>

export const MembershipSchema = Type.Object(
  {
    membershipId: Type.Integer({ description: 'Membership plan ID.' }),
    title: Type.String({ description: 'Membership plan name.' }),
    description: Type.String({ description: 'Membership plan description.' }),
    benefits: Type.Array(Type.String(), {
      minItems: 1,
      description: 'List of membership plan perks.',
    }),
    price: Type.Number({
      description: 'Monthly fee for membership plan. (e.g. 1500.00)',
      examples: [500],
    }),
    currency: Type.Union([Type.Literal('JPY'), Type.Literal('TWD'), Type.Literal('THB')], {
      description: 'The currency of membership.price.',
    }),
    memberCount: Type.Integer({
      description: 'Number of members subscribed to the membership plan.',
      examples: [100],
    }),
    memberLimit: Type.Union([
      Type.Integer({
        description:
          'The upper limit of members who can subscribe. If no upper limit is set, it will be null.',
        examples: [1000],
      }),
      Type.Null(),
    ]),
    isInAppPurchase: Type.Boolean({
      description: 'Payment method for users who subscribe to a membership plan.',
    }),
    isPublished: Type.Boolean({ description: 'Membership plan status.' }),
  },
  { ref: 'Membership' },
)

export type Membership = Static<typeof MembershipSchema>

export const MembershipListResponseSchema = Type.Object(
  {
    memberships: Type.Array(MembershipSchema, {
      minItems: 0,
      description: 'List of membership information',
    }),
  },
  { ref: 'MembershipListResponse', description: 'List of memberships' },
)

export type MembershipListResponse = Static<typeof MembershipListResponseSchema>

export const GetJoinedMembershipUsersResponseSchema = Type.Object(
  {
    userIds: Type.Array(Type.String(), {
      maxItems: 1000,
      description:
        'A list of user IDs who joined the membership.\nUsers who have not agreed to the bot user agreement, are not following the bot, or are not active will be excluded.\nIf there are no users in the membership, an empty list will be returned.\n',
    }),
    next: Type.Optional(
      Type.String({
        description:
          "A continuation token to get next remaining membership user IDs.\nReturned only when there are remaining user IDs that weren't returned in the userIds property in the previous request.\nThe continuation token expires in 24 hours (86,400 seconds).\n\n",
      }),
    ),
  },
  {
    ref: 'GetJoinedMembershipUsersResponse',
    description: 'List of users who have joined the membership',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-membership-user-ids',
    },
  },
)

export type GetJoinedMembershipUsersResponse = Static<typeof GetJoinedMembershipUsersResponseSchema>

export const AcquisitionConditionRequestSchema = Type.Object(
  { type: Type.String({ description: 'Determines how the coupon is distributed or used.' }) },
  { ref: 'AcquisitionConditionRequest' },
)

export type AcquisitionConditionRequest = Static<typeof AcquisitionConditionRequestSchema>

export const CouponRewardRequestSchema = Type.Object(
  { type: Type.String({ description: 'Type of coupon. Determines the benefit provided.' }) },
  { ref: 'CouponRewardRequest' },
)

export type CouponRewardRequest = Static<typeof CouponRewardRequestSchema>

export const CouponCreateRequestSchema = Type.Object(
  {
    acquisitionCondition: AcquisitionConditionRequestSchema,
    barcodeImageUrl: Type.Optional(
      Type.String({
        description:
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
      }),
    ),
    couponCode: Type.Optional(
      Type.String({
        description: 'Unique code to be presented by the user to redeem the coupon. Optional.',
      }),
    ),
    description: Type.Optional(
      Type.String({
        minLength: 0,
        maxLength: 1000,
        description: 'Detailed description of the coupon. Displayed to users.',
      }),
    ),
    endTimestamp: Type.Integer({
      description: 'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
    }),
    imageUrl: Type.Optional(
      Type.String({
        description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
      }),
    ),
    maxUseCountPerTicket: Type.Integer({
      maximum: 1,
      description:
        'Maximum number of times a single coupon ticket can be used. Use -1 to indicate no limit.',
    }),
    startTimestamp: Type.Integer({
      description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
    }),
    title: Type.String({
      minLength: 1,
      maxLength: 60,
      description: 'Title of the coupon. Displayed in the coupon list.',
    }),
    usageCondition: Type.Optional(
      Type.String({
        minLength: 0,
        maxLength: 100,
        description: 'Conditions for using the coupon. Shown to users.',
      }),
    ),
    reward: Type.Optional(CouponRewardRequestSchema),
    visibility: Type.Union([Type.Literal('UNLISTED'), Type.Literal('PUBLIC')], {
      description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
    }),
    timezone: Type.Union(
      [
        Type.Literal('ETC_GMT_MINUS_12'),
        Type.Literal('ETC_GMT_MINUS_11'),
        Type.Literal('PACIFIC_HONOLULU'),
        Type.Literal('AMERICA_ANCHORAGE'),
        Type.Literal('AMERICA_LOS_ANGELES'),
        Type.Literal('AMERICA_PHOENIX'),
        Type.Literal('AMERICA_CHICAGO'),
        Type.Literal('AMERICA_NEW_YORK'),
        Type.Literal('AMERICA_CARACAS'),
        Type.Literal('AMERICA_SANTIAGO'),
        Type.Literal('AMERICA_ST_JOHNS'),
        Type.Literal('AMERICA_SAO_PAULO'),
        Type.Literal('ETC_GMT_MINUS_2'),
        Type.Literal('ATLANTIC_CAPE_VERDE'),
        Type.Literal('EUROPE_LONDON'),
        Type.Literal('EUROPE_PARIS'),
        Type.Literal('EUROPE_ISTANBUL'),
        Type.Literal('EUROPE_MOSCOW'),
        Type.Literal('ASIA_TEHRAN'),
        Type.Literal('ASIA_TBILISI'),
        Type.Literal('ASIA_KABUL'),
        Type.Literal('ASIA_TASHKENT'),
        Type.Literal('ASIA_COLOMBO'),
        Type.Literal('ASIA_KATHMANDU'),
        Type.Literal('ASIA_ALMATY'),
        Type.Literal('ASIA_RANGOON'),
        Type.Literal('ASIA_BANGKOK'),
        Type.Literal('ASIA_TAIPEI'),
        Type.Literal('ASIA_TOKYO'),
        Type.Literal('AUSTRALIA_DARWIN'),
        Type.Literal('AUSTRALIA_SYDNEY'),
        Type.Literal('ASIA_VLADIVOSTOK'),
        Type.Literal('ETC_GMT_PLUS_12'),
        Type.Literal('PACIFIC_TONGATAPU'),
      ],
      { description: 'Timezone for interpreting start and end timestamps.' },
    ),
  },
  {
    ref: 'CouponCreateRequest',
    description:
      'Request object for creating a coupon. Contains all configurable coupon properties.',
  },
)

export type CouponCreateRequest = Static<typeof CouponCreateRequestSchema>

export const NormalAcquisitionConditionRequestSchema = AcquisitionConditionRequestSchema

export type NormalAcquisitionConditionRequest = Static<
  typeof NormalAcquisitionConditionRequestSchema
>

export const LotteryAcquisitionConditionRequestSchema = Type.Intersect(
  [
    AcquisitionConditionRequestSchema,
    Type.Object({
      lotteryProbability: Type.Integer({
        minimum: 1,
        maximum: 99,
        description: 'Probability (1-99) of winning the coupon in lottery-type campaigns.',
      }),
      maxAcquireCount: Type.Integer({
        maximum: 999999,
        description:
          'Maximum number of coupons that can be issued in total. Use -1 to indicate no limit',
      }),
    }),
  ],
  { ref: 'LotteryAcquisitionConditionRequest' },
)

export type LotteryAcquisitionConditionRequest = Static<
  typeof LotteryAcquisitionConditionRequestSchema
>

export const CashBackPriceInfoRequestSchema = Type.Object(
  { type: Type.String() },
  { ref: 'CashBackPriceInfoRequest' },
)

export type CashBackPriceInfoRequest = Static<typeof CashBackPriceInfoRequestSchema>

export const CouponCashBackRewardRequestSchema = Type.Intersect(
  [
    CouponRewardRequestSchema,
    Type.Object({ priceInfo: Type.Optional(CashBackPriceInfoRequestSchema) }),
  ],
  { ref: 'CouponCashBackRewardRequest' },
)

export type CouponCashBackRewardRequest = Static<typeof CouponCashBackRewardRequestSchema>

export const DiscountPriceInfoRequestSchema = Type.Object(
  { type: Type.String() },
  { ref: 'DiscountPriceInfoRequest' },
)

export type DiscountPriceInfoRequest = Static<typeof DiscountPriceInfoRequestSchema>

export const CouponDiscountRewardRequestSchema = Type.Intersect(
  [
    CouponRewardRequestSchema,
    Type.Object({ priceInfo: Type.Optional(DiscountPriceInfoRequestSchema) }),
  ],
  { ref: 'CouponDiscountRewardRequest' },
)

export type CouponDiscountRewardRequest = Static<typeof CouponDiscountRewardRequestSchema>

export const CouponFreeRewardRequestSchema = CouponRewardRequestSchema

export type CouponFreeRewardRequest = Static<typeof CouponFreeRewardRequestSchema>

export const CouponGiftRewardRequestSchema = CouponRewardRequestSchema

export type CouponGiftRewardRequest = Static<typeof CouponGiftRewardRequestSchema>

export const CouponOthersRewardRequestSchema = CouponRewardRequestSchema

export type CouponOthersRewardRequest = Static<typeof CouponOthersRewardRequestSchema>

export const CashBackFixedPriceInfoRequestSchema = Type.Intersect(
  [CashBackPriceInfoRequestSchema, Type.Object({ fixedAmount: Type.Optional(Type.Integer()) })],
  { ref: 'CashBackFixedPriceInfoRequest' },
)

export type CashBackFixedPriceInfoRequest = Static<typeof CashBackFixedPriceInfoRequestSchema>

export const CashBackPercentagePriceInfoRequestSchema = Type.Intersect(
  [
    CashBackPriceInfoRequestSchema,
    Type.Object({
      percentage: Type.Optional(
        Type.Integer({
          minimum: 1,
          maximum: 99,
          description:
            'Specifies the cashback rate as a percentage. Must be an integer between 1 and 99.',
        }),
      ),
    }),
  ],
  { ref: 'CashBackPercentagePriceInfoRequest' },
)

export type CashBackPercentagePriceInfoRequest = Static<
  typeof CashBackPercentagePriceInfoRequestSchema
>

export const DiscountFixedPriceInfoRequestSchema = Type.Intersect(
  [DiscountPriceInfoRequestSchema, Type.Object({ fixedAmount: Type.Optional(Type.Integer()) })],
  { ref: 'DiscountFixedPriceInfoRequest' },
)

export type DiscountFixedPriceInfoRequest = Static<typeof DiscountFixedPriceInfoRequestSchema>

export const DiscountPercentagePriceInfoRequestSchema = Type.Intersect(
  [
    DiscountPriceInfoRequestSchema,
    Type.Object({
      percentage: Type.Optional(
        Type.Integer({
          minimum: 1,
          maximum: 99,
          description:
            'Specifies the discount rate as a percentage. Must be an integer between 1 and 99.',
        }),
      ),
    }),
  ],
  { ref: 'DiscountPercentagePriceInfoRequest' },
)

export type DiscountPercentagePriceInfoRequest = Static<
  typeof DiscountPercentagePriceInfoRequestSchema
>

export const DiscountExplicitPriceInfoRequestSchema = Type.Intersect(
  [
    DiscountPriceInfoRequestSchema,
    Type.Object({
      priceAfterDiscount: Type.Optional(Type.Integer()),
      originalPrice: Type.Optional(Type.Integer()),
    }),
  ],
  { ref: 'DiscountExplicitPriceInfoRequest' },
)

export type DiscountExplicitPriceInfoRequest = Static<typeof DiscountExplicitPriceInfoRequestSchema>

export const CouponCreateResponseSchema = Type.Object(
  { couponId: Type.String({ description: 'Unique identifier of the coupon.' }) },
  {
    ref: 'CouponCreateResponse',
    description: 'Response object returned after creating a coupon. Contains the coupon ID.',
  },
)

export type CouponCreateResponse = Static<typeof CouponCreateResponseSchema>

export const AcquisitionConditionResponseSchema = Type.Object(
  { type: Type.String({ description: 'Determines how the coupon is distributed or used.' }) },
  { ref: 'AcquisitionConditionResponse' },
)

export type AcquisitionConditionResponse = Static<typeof AcquisitionConditionResponseSchema>

export const CouponRewardResponseSchema = Type.Object(
  { type: Type.String({ description: 'Type of coupon. Determines the benefit provided.' }) },
  { ref: 'CouponRewardResponse' },
)

export type CouponRewardResponse = Static<typeof CouponRewardResponseSchema>

export const CouponResponseSchema = Type.Object(
  {
    acquisitionCondition: Type.Optional(AcquisitionConditionResponseSchema),
    barcodeImageUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
      }),
    ),
    couponCode: Type.Optional(
      Type.String({ description: 'Unique code to be presented by the user to redeem the coupon.' }),
    ),
    description: Type.Optional(
      Type.String({ description: 'Detailed description of the coupon. Displayed to users.' }),
    ),
    endTimestamp: Type.Optional(
      Type.Integer({
        description:
          'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
      }),
    ),
    imageUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
      }),
    ),
    maxAcquireCount: Type.Optional(
      Type.Integer({ description: 'Maximum number of coupons that can be issued in total.' }),
    ),
    maxUseCountPerTicket: Type.Optional(
      Type.Integer({ description: 'Maximum number of times a single coupon ticket can be used.' }),
    ),
    maxTicketPerUser: Type.Optional(
      Type.Integer({ description: 'Maximum number of coupon tickets a single user can acquire.' }),
    ),
    startTimestamp: Type.Optional(
      Type.Integer({
        description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
      }),
    ),
    title: Type.Optional(
      Type.String({ description: 'Title of the coupon. Displayed in the coupon list.' }),
    ),
    usageCondition: Type.Optional(
      Type.String({ description: 'Conditions for using the coupon. Shown to users.' }),
    ),
    reward: Type.Optional(CouponRewardResponseSchema),
    visibility: Type.Optional(
      Type.Union([Type.Literal('UNLISTED'), Type.Literal('PUBLIC'), Type.Literal('PRIVATE')], {
        description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
      }),
    ),
    timezone: Type.Optional(
      Type.Union(
        [
          Type.Literal('ETC_GMT_MINUS_12'),
          Type.Literal('ETC_GMT_MINUS_11'),
          Type.Literal('PACIFIC_HONOLULU'),
          Type.Literal('AMERICA_ANCHORAGE'),
          Type.Literal('AMERICA_LOS_ANGELES'),
          Type.Literal('AMERICA_PHOENIX'),
          Type.Literal('AMERICA_CHICAGO'),
          Type.Literal('AMERICA_NEW_YORK'),
          Type.Literal('AMERICA_CARACAS'),
          Type.Literal('AMERICA_SANTIAGO'),
          Type.Literal('AMERICA_ST_JOHNS'),
          Type.Literal('AMERICA_SAO_PAULO'),
          Type.Literal('ETC_GMT_MINUS_2'),
          Type.Literal('ATLANTIC_CAPE_VERDE'),
          Type.Literal('EUROPE_LONDON'),
          Type.Literal('EUROPE_PARIS'),
          Type.Literal('EUROPE_ISTANBUL'),
          Type.Literal('EUROPE_MOSCOW'),
          Type.Literal('ASIA_TEHRAN'),
          Type.Literal('ASIA_TBILISI'),
          Type.Literal('ASIA_KABUL'),
          Type.Literal('ASIA_TASHKENT'),
          Type.Literal('ASIA_COLOMBO'),
          Type.Literal('ASIA_KATHMANDU'),
          Type.Literal('ASIA_ALMATY'),
          Type.Literal('ASIA_RANGOON'),
          Type.Literal('ASIA_BANGKOK'),
          Type.Literal('ASIA_TAIPEI'),
          Type.Literal('ASIA_TOKYO'),
          Type.Literal('AUSTRALIA_DARWIN'),
          Type.Literal('AUSTRALIA_SYDNEY'),
          Type.Literal('ASIA_VLADIVOSTOK'),
          Type.Literal('ETC_GMT_PLUS_12'),
          Type.Literal('PACIFIC_TONGATAPU'),
        ],
        { description: 'Timezone for interpreting start and end timestamps.' },
      ),
    ),
    couponId: Type.Optional(Type.String({ description: 'Unique identifier of the coupon.' })),
    createdTimestamp: Type.Optional(
      Type.Integer({ description: 'Created timestamp (seconds) of the coupon.' }),
    ),
    status: Type.Optional(
      Type.Union([Type.Literal('DRAFT'), Type.Literal('RUNNING'), Type.Literal('CLOSED')], {
        description: 'Current status of the coupon.',
      }),
    ),
  },
  {
    ref: 'CouponResponse',
    description:
      'Detailed information about a coupon, including all properties and current status.',
  },
)

export type CouponResponse = Static<typeof CouponResponseSchema>

export const NormalAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type NormalAcquisitionConditionResponse = Static<
  typeof NormalAcquisitionConditionResponseSchema
>

export const LotteryAcquisitionConditionResponseSchema = Type.Intersect(
  [
    AcquisitionConditionResponseSchema,
    Type.Object({
      lotteryProbability: Type.Optional(Type.Integer()),
      maxAcquireCount: Type.Optional(Type.Integer()),
    }),
  ],
  { ref: 'LotteryAcquisitionConditionResponse' },
)

export type LotteryAcquisitionConditionResponse = Static<
  typeof LotteryAcquisitionConditionResponseSchema
>

export const ReferralAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type ReferralAcquisitionConditionResponse = Static<
  typeof ReferralAcquisitionConditionResponseSchema
>

export const CashBackPriceInfoResponseSchema = Type.Object(
  { type: Type.String() },
  { ref: 'CashBackPriceInfoResponse' },
)

export type CashBackPriceInfoResponse = Static<typeof CashBackPriceInfoResponseSchema>

export const CouponCashBackRewardResponseSchema = Type.Intersect(
  [
    CouponRewardResponseSchema,
    Type.Object({ priceInfo: Type.Optional(CashBackPriceInfoResponseSchema) }),
  ],
  { ref: 'CouponCashBackRewardResponse' },
)

export type CouponCashBackRewardResponse = Static<typeof CouponCashBackRewardResponseSchema>

export const DiscountPriceInfoResponseSchema = Type.Object(
  { type: Type.String() },
  { ref: 'DiscountPriceInfoResponse' },
)

export type DiscountPriceInfoResponse = Static<typeof DiscountPriceInfoResponseSchema>

export const CouponDiscountRewardResponseSchema = Type.Intersect(
  [
    CouponRewardResponseSchema,
    Type.Object({ priceInfo: Type.Optional(DiscountPriceInfoResponseSchema) }),
  ],
  { ref: 'CouponDiscountRewardResponse' },
)

export type CouponDiscountRewardResponse = Static<typeof CouponDiscountRewardResponseSchema>

export const CouponFreeRewardResponseSchema = CouponRewardResponseSchema

export type CouponFreeRewardResponse = Static<typeof CouponFreeRewardResponseSchema>

export const CouponGiftRewardResponseSchema = CouponRewardResponseSchema

export type CouponGiftRewardResponse = Static<typeof CouponGiftRewardResponseSchema>

export const CouponOthersRewardResponseSchema = CouponRewardResponseSchema

export type CouponOthersRewardResponse = Static<typeof CouponOthersRewardResponseSchema>

export const CashBackFixedPriceInfoResponseSchema = Type.Intersect(
  [
    CashBackPriceInfoResponseSchema,
    Type.Object({
      currency: Type.Optional(
        Type.Union([Type.Literal('JPY'), Type.Literal('THB'), Type.Literal('TWD')], {
          description: 'Currency code (e.g., JPY, THB, TWD).',
        }),
      ),
      fixedAmount: Type.Optional(Type.Integer()),
    }),
  ],
  { ref: 'CashBackFixedPriceInfoResponse' },
)

export type CashBackFixedPriceInfoResponse = Static<typeof CashBackFixedPriceInfoResponseSchema>

export const CashBackPercentagePriceInfoResponseSchema = Type.Intersect(
  [CashBackPriceInfoResponseSchema, Type.Object({ percentage: Type.Optional(Type.Integer()) })],
  { ref: 'CashBackPercentagePriceInfoResponse' },
)

export type CashBackPercentagePriceInfoResponse = Static<
  typeof CashBackPercentagePriceInfoResponseSchema
>

export const DiscountFixedPriceInfoResponseSchema = Type.Intersect(
  [
    DiscountPriceInfoResponseSchema,
    Type.Object({
      currency: Type.Optional(
        Type.Union([Type.Literal('JPY'), Type.Literal('THB'), Type.Literal('TWD')], {
          description: 'Currency code (e.g., JPY, THB, TWD).',
        }),
      ),
      fixedAmount: Type.Optional(Type.Integer()),
    }),
  ],
  { ref: 'DiscountFixedPriceInfoResponse' },
)

export type DiscountFixedPriceInfoResponse = Static<typeof DiscountFixedPriceInfoResponseSchema>

export const DiscountPercentagePriceInfoResponseSchema = Type.Intersect(
  [DiscountPriceInfoResponseSchema, Type.Object({ percentage: Type.Optional(Type.Integer()) })],
  { ref: 'DiscountPercentagePriceInfoResponse' },
)

export type DiscountPercentagePriceInfoResponse = Static<
  typeof DiscountPercentagePriceInfoResponseSchema
>

export const DiscountExplicitPriceInfoResponseSchema = Type.Intersect(
  [
    DiscountPriceInfoResponseSchema,
    Type.Object({
      currency: Type.Optional(
        Type.Union([Type.Literal('JPY'), Type.Literal('THB'), Type.Literal('TWD')], {
          description: 'Currency code (e.g., JPY, THB, TWD).',
        }),
      ),
      priceAfterDiscount: Type.Optional(Type.Integer()),
      originalPrice: Type.Optional(Type.Integer()),
    }),
  ],
  { ref: 'DiscountExplicitPriceInfoResponse' },
)

export type DiscountExplicitPriceInfoResponse = Static<
  typeof DiscountExplicitPriceInfoResponseSchema
>

export const CouponListResponseSchema = Type.Object(
  {
    couponId: Type.String({ description: 'Unique identifier of the coupon.' }),
    title: Type.String({ description: 'Title of the coupon. Displayed in the coupon list.' }),
  },
  {
    ref: 'CouponListResponse',
    description: 'Summary information about a coupon, used in coupon lists.',
  },
)

export type CouponListResponse = Static<typeof CouponListResponseSchema>

export const MessagingApiPagerCouponListResponseSchema = Type.Object(
  {
    items: Type.Array(CouponListResponseSchema, { description: 'List of coupon summary objects.' }),
    next: Type.Optional(
      Type.String({ description: 'Token for fetching the next page of results.' }),
    ),
  },
  {
    ref: 'MessagingApiPagerCouponListResponse',
    description: 'Paginated response object containing a list of coupons.',
  },
)

export type MessagingApiPagerCouponListResponse = Static<
  typeof MessagingApiPagerCouponListResponseSchema
>

export const ShowLoadingAnimationRequestSchema = Type.Object(
  {
    chatId: Type.String({
      description: 'User ID of the target user for whom the loading animation is to be displayed.',
    }),
    loadingSeconds: Type.Optional(
      Type.Integer({
        minimum: 5,
        maximum: 60,
        description:
          'The number of seconds to display the loading indicator.\nIt must be a multiple of 5. The maximum value is 60 seconds.\n',
      }),
    ),
  },
  {
    ref: 'ShowLoadingAnimationRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-request-body',
    },
  },
)

export type ShowLoadingAnimationRequest = Static<typeof ShowLoadingAnimationRequestSchema>

export const ShowLoadingAnimationResponseSchema = Type.Object(
  {},
  {
    ref: 'ShowLoadingAnimationResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-response',
    },
  },
)

export type ShowLoadingAnimationResponse = Static<typeof ShowLoadingAnimationResponseSchema>

export const MarkMessagesAsReadByTokenRequestSchema = Type.Object(
  { markAsReadToken: Type.String({ description: 'Token used to mark messages as read.' }) },
  {
    ref: 'MarkMessagesAsReadByTokenRequest',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#mark-as-read-request-body',
    },
  },
)

export type MarkMessagesAsReadByTokenRequest = Static<typeof MarkMessagesAsReadByTokenRequestSchema>

export const ErrorDetailSchema = Type.Object(
  {
    message: Type.Optional(
      Type.String({
        description: 'Details of the error. Not included in the response under certain situations.',
      }),
    ),
    property: Type.Optional(
      Type.String({
        description:
          'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
      }),
    ),
  },
  { ref: 'ErrorDetail' },
)

export type ErrorDetail = Static<typeof ErrorDetailSchema>

export const ErrorResponseSchema = Type.Object(
  {
    message: Type.String({ description: 'Message containing information about the error.' }),
    details: Type.Optional(
      Type.Array(ErrorDetailSchema, {
        description:
          'An array of error details. If the array is empty, this property will not be included in the response.',
      }),
    ),
    sentMessages: Type.Optional(
      Type.Array(SentMessageSchema, {
        minItems: 1,
        maxItems: 5,
        description: 'Array of sent messages.',
      }),
    ),
  },
  {
    ref: 'ErrorResponse',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  },
)

export type ErrorResponse = Static<typeof ErrorResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
