import * as v from 'valibot'

export const GetWebhookEndpointResponseSchema = v.pipe(
  v.object({
    endpoint: v.pipe(v.pipe(v.string(), v.url()), v.description('Webhook URL')),
    active: v.pipe(
      v.boolean(),
      v.description(
        'Webhook usage status. Send a webhook event from the LINE Platform to the webhook URL only if enabled.\n\n`true`: Webhook usage is enabled.\n`false`: Webhook usage is disabled.\n',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information',
    },
  }),
)

export type GetWebhookEndpointResponseSchema = v.InferOutput<
  typeof GetWebhookEndpointResponseSchema
>

export const SetWebhookEndpointRequestSchema = v.pipe(
  v.object({
    endpoint: v.pipe(
      v.pipe(v.string(), v.url(), v.minCodePoints(0), v.maxCodePoints(500)),
      v.description('A valid webhook URL.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url',
    },
  }),
)

export type SetWebhookEndpointRequestSchema = v.InferOutput<typeof SetWebhookEndpointRequestSchema>

export const TestWebhookEndpointRequestSchema = v.pipe(
  v.partial(
    v.object({
      endpoint: v.pipe(
        v.pipe(v.string(), v.url(), v.minCodePoints(0), v.maxCodePoints(500)),
        v.description('A webhook URL to be validated.'),
      ),
    }),
  ),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  }),
)

export type TestWebhookEndpointRequestSchema = v.InferOutput<
  typeof TestWebhookEndpointRequestSchema
>

export const TestWebhookEndpointResponseSchema = v.pipe(
  v.object({
    success: v.optional(
      v.pipe(
        v.boolean(),
        v.description('Result of the communication from the LINE platform to the webhook URL.'),
      ),
    ),
    timestamp: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered.\n',
      ),
    ),
    statusCode: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description(
        "The HTTP status code. If the webhook response isn't received, the status code is set to zero or a negative number.",
      ),
    ),
    reason: v.pipe(v.string(), v.description('Reason for the response.')),
    detail: v.pipe(v.string(), v.description('Details of the response.')),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  }),
)

export type TestWebhookEndpointResponseSchema = v.InferOutput<
  typeof TestWebhookEndpointResponseSchema
>

export const GetMessageContentTranscodingResponseSchema = v.pipe(
  v.object({
    status: v.pipe(
      v.picklist(['processing', 'succeeded', 'failed']),
      v.description(
        'The preparation status. One of:\n\n`processing`: Preparing to get content.\n`succeeded`: Ready to get the content. You can get the content sent by users.\n`failed`: Failed to prepare to get the content.\n',
      ),
    ),
  }),
  v.description('Transcoding response'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status',
    },
  }),
)

export type GetMessageContentTranscodingResponseSchema = v.InferOutput<
  typeof GetMessageContentTranscodingResponseSchema
>

export const ActionSchema = v.pipe(
  v.partial(
    v.object({
      type: v.pipe(v.string(), v.description('Type of action')),
      label: v.pipe(v.string(), v.description('Label for the action.')),
    }),
  ),
  v.description('Action'),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#action-objects' },
  }),
)

export type ActionSchema = v.InferOutput<typeof ActionSchema>

export const QuickReplyItemSchema = v.pipe(
  v.object({
    imageUrl: v.optional(
      v.pipe(
        v.pipe(v.string(), v.url(), v.maxCodePoints(2000)),
        v.description('URL of the icon that is displayed at the beginning of the button'),
      ),
    ),
    action: v.optional(ActionSchema),
    type: v.pipe(v.optional(v.string(), 'action'), v.description('`action`')),
  }),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' },
  }),
)

export type QuickReplyItemSchema = v.InferOutput<typeof QuickReplyItemSchema>

export const QuickReplySchema = v.pipe(
  v.partial(
    v.object({
      items: v.pipe(
        v.pipe(v.array(QuickReplyItemSchema), v.maxLength(13)),
        v.description('Quick reply button objects.'),
      ),
    }),
  ),
  v.description('Quick reply'),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' },
  }),
)

export type QuickReplySchema = v.InferOutput<typeof QuickReplySchema>

export const SenderSchema = v.pipe(
  v.partial(
    v.object({
      name: v.pipe(
        v.pipe(v.string(), v.maxCodePoints(20)),
        v.description('Display name. Certain words such as `LINE` may not be used.'),
      ),
      iconUrl: v.pipe(
        v.pipe(v.string(), v.url(), v.maxCodePoints(2000)),
        v.description('URL of the image to display as an icon when sending a message'),
      ),
    }),
  ),
  v.description('Change icon and display name'),
)

export type SenderSchema = v.InferOutput<typeof SenderSchema>

export const MessageSchema = v.pipe(
  v.object({
    type: v.pipe(v.string(), v.description('Type of message')),
    quickReply: v.optional(QuickReplySchema),
    sender: v.optional(SenderSchema),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#message-common-properties',
    },
  }),
)

export type MessageSchema = v.InferOutput<typeof MessageSchema>

export const NotificationDisabledSchema = v.pipe(
  v.optional(v.boolean(), false),
  v.description(
    '`true`: The user doesn’t receive a push notification when a message is sent.\n`false`: The user receives a push notification when the message is sent (unless they have disabled push notifications in LINE and/or their device).\nThe default value is false.\n',
  ),
)

export type NotificationDisabledSchema = v.InferOutput<typeof NotificationDisabledSchema>

export const ReplyMessageRequestSchema = v.pipe(
  v.object({
    replyToken: v.pipe(v.string(), v.description('replyToken received via webhook.')),
    messages: v.pipe(
      v.pipe(v.array(MessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('List of messages.'),
    ),
    notificationDisabled: v.optional(NotificationDisabledSchema),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message',
    },
  }),
)

export type ReplyMessageRequestSchema = v.InferOutput<typeof ReplyMessageRequestSchema>

export const SentMessageSchema = v.object({
  id: v.pipe(v.string(), v.description('ID of the sent message.')),
  quoteToken: v.optional(
    v.pipe(
      v.string(),
      v.description(
        'Quote token of the message. Only included when a message object that can be specified as a quote target was sent as a push or reply message.\n',
      ),
    ),
  ),
})

export type SentMessageSchema = v.InferOutput<typeof SentMessageSchema>

export const ReplyMessageResponseSchema = v.pipe(
  v.object({
    sentMessages: v.pipe(
      v.pipe(v.array(SentMessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('Array of sent messages.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message-response',
    },
  }),
)

export type ReplyMessageResponseSchema = v.InferOutput<typeof ReplyMessageResponseSchema>

export const PushMessageRequestSchema = v.pipe(
  v.object({
    to: v.pipe(v.string(), v.description('ID of the receiver.')),
    messages: v.pipe(
      v.pipe(v.array(MessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('List of Message objects.'),
    ),
    notificationDisabled: v.optional(NotificationDisabledSchema),
    customAggregationUnits: v.optional(
      v.pipe(
        v.array(v.string()),
        v.description(
          'List of aggregation unit name. Case-sensitive.\nThis functions can only be used by corporate users who have submitted the required applications.\n',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message',
    },
  }),
)

export type PushMessageRequestSchema = v.InferOutput<typeof PushMessageRequestSchema>

export const PushMessageResponseSchema = v.pipe(
  v.object({
    sentMessages: v.pipe(
      v.pipe(v.array(SentMessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('Array of sent messages.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message-response',
    },
  }),
)

export type PushMessageResponseSchema = v.InferOutput<typeof PushMessageResponseSchema>

export const MulticastRequestSchema = v.pipe(
  v.object({
    messages: v.pipe(
      v.pipe(v.array(MessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('Messages to send'),
    ),
    to: v.pipe(
      v.pipe(v.array(v.string()), v.minLength(1), v.maxLength(500)),
      v.description(
        'Array of user IDs. Use userId values which are returned in webhook event objects. Do not use LINE IDs found on LINE.',
      ),
    ),
    notificationDisabled: v.optional(NotificationDisabledSchema),
    customAggregationUnits: v.optional(
      v.pipe(
        v.pipe(
          v.array(
            v.pipe(
              v.string(),
              v.regex(/^[a-zA-Z0-9_]{1,30}$/),
              v.minCodePoints(1),
              v.maxCodePoints(30),
            ),
          ),
          v.maxLength(1),
        ),
        v.description('Name of aggregation unit. Case-sensitive.'),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-message',
    },
  }),
)

export type MulticastRequestSchema = v.InferOutput<typeof MulticastRequestSchema>

export const MulticastResponseSchema = v.pipe(
  v.object({}),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-response',
    },
  }),
)

export type MulticastResponseSchema = v.InferOutput<typeof MulticastResponseSchema>

export const RecipientSchema = v.pipe(
  v.partial(v.object({ type: v.pipe(v.string(), v.description('Type of recipient')) })),
  v.description('Recipient'),
)

export type RecipientSchema = v.InferOutput<typeof RecipientSchema>

export const DemographicFilterSchema = v.pipe(
  v.partial(v.object({ type: v.pipe(v.string(), v.description('Type of demographic filter')) })),
  v.description('Demographic filter'),
)

export type DemographicFilterSchema = v.InferOutput<typeof DemographicFilterSchema>

export const FilterSchema = v.pipe(
  v.partial(v.object({ demographic: DemographicFilterSchema })),
  v.description('Filter for narrowcast'),
)

export type FilterSchema = v.InferOutput<typeof FilterSchema>

export const LimitSchema = v.pipe(
  v.object({
    max: v.optional(
      v.pipe(
        v.pipe(
          v.number(),
          v.integer(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.minValue(1),
        ),
        v.description(
          'The maximum number of narrowcast messages to send.\nUse this parameter to limit the number of narrowcast messages sent.\nThe recipients will be chosen at random.\n',
        ),
      ),
    ),
    upToRemainingQuota: v.pipe(
      v.optional(v.boolean(), false),
      v.description(
        'If true, the message will be sent within the maximum number of deliverable messages. The default value is `false`.\n\nTargets will be selected at random.\n',
      ),
    ),
    forbidPartialDelivery: v.pipe(
      v.optional(v.boolean(), false),
      v.description(
        'This option prevents messages from being delivered to only a subset of the target audience.\nIf true, the narrowcast request success but fails asynchronously.\nYou can check whether message delivery was canceled by retrieving the narrowcast message progress.\n\nThis property can be set to true only if upToRemainingQuota is set to true.\n',
      ),
    ),
  }),
  v.description('Limit of the Narrowcast'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  }),
)

export type LimitSchema = v.InferOutput<typeof LimitSchema>

export const NarrowcastRequestSchema = v.pipe(
  v.object({
    messages: v.pipe(
      v.pipe(v.array(MessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('List of Message objects.'),
    ),
    recipient: v.optional(RecipientSchema),
    filter: v.optional(FilterSchema),
    limit: v.optional(LimitSchema),
    notificationDisabled: v.optional(NotificationDisabledSchema),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  }),
)

export type NarrowcastRequestSchema = v.InferOutput<typeof NarrowcastRequestSchema>

export const NarrowcastResponseSchema = v.pipe(
  v.object({}),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-response',
    },
  }),
)

export type NarrowcastResponseSchema = v.InferOutput<typeof NarrowcastResponseSchema>

export const OperatorRecipientSchema = v.intersect([
  RecipientSchema,
  v.partial(
    v.object({
      and: v.pipe(
        v.array(RecipientSchema),
        v.description(
          'Create a new recipient object by taking the logical conjunction (AND) of the specified array of recipient objects.\n',
        ),
      ),
      or: v.pipe(
        v.array(RecipientSchema),
        v.description(
          'Create a new recipient object by taking the logical disjunction (OR) of the specified array of recipient objects.\n',
        ),
      ),
      not: RecipientSchema,
    }),
  ),
])

export type OperatorRecipientSchema = v.InferOutput<typeof OperatorRecipientSchema>

export const AudienceRecipientSchema = v.intersect([
  RecipientSchema,
  v.partial(
    v.object({
      audienceGroupId: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  ),
])

export type AudienceRecipientSchema = v.InferOutput<typeof AudienceRecipientSchema>

export const RedeliveryRecipientSchema = v.intersect([
  RecipientSchema,
  v.partial(v.object({ requestId: v.string() })),
])

export type RedeliveryRecipientSchema = v.InferOutput<typeof RedeliveryRecipientSchema>

export const AgeDemographicSchema = v.picklist([
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
])

export type AgeDemographicSchema = v.InferOutput<typeof AgeDemographicSchema>

export const AgeDemographicFilterSchema = v.intersect([
  DemographicFilterSchema,
  v.partial(v.object({ gte: AgeDemographicSchema, lt: AgeDemographicSchema })),
])

export type AgeDemographicFilterSchema = v.InferOutput<typeof AgeDemographicFilterSchema>

export const AppTypeDemographicSchema = v.picklist(['ios', 'android'])

export type AppTypeDemographicSchema = v.InferOutput<typeof AppTypeDemographicSchema>

export const AppTypeDemographicFilterSchema = v.intersect([
  DemographicFilterSchema,
  v.partial(v.object({ oneOf: v.array(AppTypeDemographicSchema) })),
])

export type AppTypeDemographicFilterSchema = v.InferOutput<typeof AppTypeDemographicFilterSchema>

export const AreaDemographicSchema = v.pipe(
  v.picklist([
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
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  }),
)

export type AreaDemographicSchema = v.InferOutput<typeof AreaDemographicSchema>

export const AreaDemographicFilterSchema = v.intersect([
  DemographicFilterSchema,
  v.partial(v.object({ oneOf: v.array(AreaDemographicSchema) })),
])

export type AreaDemographicFilterSchema = v.InferOutput<typeof AreaDemographicFilterSchema>

export const GenderDemographicSchema = v.picklist(['male', 'female'])

export type GenderDemographicSchema = v.InferOutput<typeof GenderDemographicSchema>

export const GenderDemographicFilterSchema = v.intersect([
  DemographicFilterSchema,
  v.partial(v.object({ oneOf: v.array(GenderDemographicSchema) })),
])

export type GenderDemographicFilterSchema = v.InferOutput<typeof GenderDemographicFilterSchema>

export const OperatorDemographicFilterSchema = v.intersect([
  DemographicFilterSchema,
  v.partial(
    v.object({
      and: v.array(DemographicFilterSchema),
      or: v.array(DemographicFilterSchema),
      not: DemographicFilterSchema,
    }),
  ),
])

export type OperatorDemographicFilterSchema = v.InferOutput<typeof OperatorDemographicFilterSchema>

export const SubscriptionPeriodDemographicSchema = v.picklist([
  'day_7',
  'day_30',
  'day_90',
  'day_180',
  'day_365',
])

export type SubscriptionPeriodDemographicSchema = v.InferOutput<
  typeof SubscriptionPeriodDemographicSchema
>

export const SubscriptionPeriodDemographicFilterSchema = v.intersect([
  DemographicFilterSchema,
  v.partial(
    v.object({ gte: SubscriptionPeriodDemographicSchema, lt: SubscriptionPeriodDemographicSchema }),
  ),
])

export type SubscriptionPeriodDemographicFilterSchema = v.InferOutput<
  typeof SubscriptionPeriodDemographicFilterSchema
>

export const NarrowcastProgressResponseSchema = v.pipe(
  v.object({
    phase: v.pipe(
      v.picklist(['waiting', 'sending', 'succeeded', 'failed']),
      v.description(
        'The current status. One of:\n\n`waiting`: Messages are not yet ready to be sent. They are currently being filtered or processed in some way.\n`sending`: Messages are currently being sent.\n`succeeded`: Messages were sent successfully. This may not mean the messages were successfully received.\n`failed`: Messages failed to be sent. Use the failedDescription property to find the cause of the failure.\n',
      ),
    ),
    successCount: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The number of users who successfully received the message.'),
      ),
    ),
    failureCount: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The number of users who failed to send the message.'),
      ),
    ),
    targetCount: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The number of intended recipients of the message.'),
      ),
    ),
    failedDescription: v.optional(
      v.pipe(
        v.string(),
        v.description(
          'The reason the message failed to be sent. This is only included with a `phase` property value of `failed`.',
        ),
      ),
    ),
    errorCode: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description(
          "Error summary. This is only included with a phase property value of failed.\nOne of:\n\n`1`: An internal error occurred.\n`2`: An error occurred because there weren't enough recipients.\n`3`: A conflict error of requests occurs because a request that has already been accepted is retried.\n`4`: An audience of less than 50 recipients is included as a condition of sending.\n`5`: Message delivery has been canceled to prevent messages from being delivered only to a subset of the target audience.\n",
        ),
      ),
    ),
    acceptedTime: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'Narrowcast message request accepted time in milliseconds.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
      ),
    ),
    completedTime: v.optional(
      v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
        v.description(
          'Processing of narrowcast message request completion time in milliseconds. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status',
    },
  }),
)

export type NarrowcastProgressResponseSchema = v.InferOutput<
  typeof NarrowcastProgressResponseSchema
>

export const BroadcastRequestSchema = v.pipe(
  v.object({
    messages: v.pipe(
      v.pipe(v.array(MessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('List of Message objects.'),
    ),
    notificationDisabled: v.optional(NotificationDisabledSchema),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message',
    },
  }),
)

export type BroadcastRequestSchema = v.InferOutput<typeof BroadcastRequestSchema>

export const BroadcastResponseSchema = v.pipe(
  v.object({}),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-response',
    },
  }),
)

export type BroadcastResponseSchema = v.InferOutput<typeof BroadcastResponseSchema>

export const QuotaTypeSchema = v.pipe(
  v.picklist(['none', 'limited']),
  v.description('One of the following values to indicate whether a target limit is set or not.'),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
  }),
)

export type QuotaTypeSchema = v.InferOutput<typeof QuotaTypeSchema>

export const MessageQuotaResponseSchema = v.pipe(
  v.object({
    type: QuotaTypeSchema,
    value: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description(
          'The target limit for sending messages in the current month. This property is returned when the `type` property has a value of `limited`.\n',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
  }),
)

export type MessageQuotaResponseSchema = v.InferOutput<typeof MessageQuotaResponseSchema>

export const QuotaConsumptionResponseSchema = v.pipe(
  v.object({
    totalUsage: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description('The number of sent messages in the current month'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-consumption',
    },
  }),
)

export type QuotaConsumptionResponseSchema = v.InferOutput<typeof QuotaConsumptionResponseSchema>

export const NumberOfMessagesResponseSchema = v.object({
  status: v.pipe(
    v.picklist(['ready', 'unready', 'unavailable_for_privacy', 'out_of_service']),
    v.description(
      "Aggregation process status. One of:\n\n`ready`: The number of messages can be obtained.\n`unready`: We haven't finished calculating the number of sent messages for the specified in date. For example, this property is returned when the delivery date or a future date is specified. Calculation usually takes about a day.\n`unavailable_for_privacy`: The total number of messages on the specified day is less than 20.\n`out_of_service`: The specified date is earlier than the date on which we first started calculating sent messages (March 31, 2018).\n",
    ),
  ),
  success: v.optional(
    v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description(
        'The number of messages delivered using the phone number on the date specified in `date`.\nThe response has this property only when the value of `status` is `ready`.\n\n',
      ),
    ),
  ),
})

export type NumberOfMessagesResponseSchema = v.InferOutput<typeof NumberOfMessagesResponseSchema>

export const ValidateMessageRequestSchema = v.object({
  messages: v.pipe(
    v.pipe(v.array(MessageSchema), v.minLength(1), v.maxLength(5)),
    v.description('Array of message objects to validate'),
  ),
})

export type ValidateMessageRequestSchema = v.InferOutput<typeof ValidateMessageRequestSchema>

export const GetAggregationUnitUsageResponseSchema = v.pipe(
  v.object({
    numOfCustomAggregationUnits: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description('Number of aggregation units used this month.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month',
    },
  }),
)

export type GetAggregationUnitUsageResponseSchema = v.InferOutput<
  typeof GetAggregationUnitUsageResponseSchema
>

export const GetAggregationUnitNameListResponseSchema = v.pipe(
  v.object({
    customAggregationUnits: v.pipe(
      v.array(v.string()),
      v.description(
        'An array of strings indicating the names of aggregation units used this month.',
      ),
    ),
    next: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "A continuation token to get the next array of unit names.\nReturned only when there are remaining aggregation units that weren't returned in customAggregationUnits in the original request.\n\n",
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month',
    },
  }),
)

export type GetAggregationUnitNameListResponseSchema = v.InferOutput<
  typeof GetAggregationUnitNameListResponseSchema
>

export const UserProfileResponseSchema = v.pipe(
  v.object({
    displayName: v.pipe(v.string(), v.description("User's display name")),
    userId: v.pipe(v.string(), v.description('User ID')),
    pictureUrl: v.optional(
      v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
        ),
      ),
    ),
    statusMessage: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "User's status message. Not included in the response if the user doesn't have a status message.",
        ),
      ),
    ),
    language: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "User's language, as a BCP 47 language tag. Not included in the response if the user hasn't yet consented to the LINE Privacy Policy.",
        ),
        v.metadata({ examples: ['en'] }),
      ),
    ),
  }),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-profile' },
  }),
)

export type UserProfileResponseSchema = v.InferOutput<typeof UserProfileResponseSchema>

export const GetFollowersResponseSchema = v.pipe(
  v.object({
    userIds: v.pipe(
      v.pipe(v.array(v.string()), v.maxLength(1000)),
      v.description(
        'An array of strings indicating user IDs of users that have added the LINE Official Account as a friend.\nOnly users of LINE for iOS and LINE for Android are included in `userIds`.\n',
      ),
    ),
    next: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "A continuation token to get the next array of user IDs.\nReturned only when there are remaining user IDs that weren't returned in `userIds` in the original request.\nThe number of user IDs in the `userIds` element doesn't have to reach the maximum number specified by `limit` for the `next` property to be included in the response.\n\n",
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-follower-ids',
    },
  }),
)

export type GetFollowersResponseSchema = v.InferOutput<typeof GetFollowersResponseSchema>

export const BotInfoResponseSchema = v.pipe(
  v.object({
    userId: v.pipe(v.string(), v.description("Bot's user ID")),
    basicId: v.pipe(v.string(), v.description("Bot's basic ID")),
    premiumId: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "Bot's premium ID. Not included in the response if the premium ID isn't set.",
        ),
      ),
    ),
    displayName: v.pipe(v.string(), v.description("Bot's display name")),
    pictureUrl: v.optional(
      v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          "Profile image URL. `https` image URL. Not included in the response if the bot doesn't have a profile image.",
        ),
      ),
    ),
    chatMode: v.pipe(
      v.picklist(['chat', 'bot']),
      v.description(
        'Chat settings set in the LINE Official Account Manager. One of:\n\n`chat`: Chat is set to "On".\n`bot`: Chat is set to "Off".\n',
      ),
    ),
    markAsReadMode: v.pipe(
      v.picklist(['auto', 'manual']),
      v.description(
        'Automatic read setting for messages. If the chat is set to "Off", auto is returned. If the chat is set to "On", manual is returned.\n\n`auto`: Auto read setting is enabled.\n`manual`: Auto read setting is disabled.\n\n',
      ),
    ),
  }),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-bot-info' },
  }),
)

export type BotInfoResponseSchema = v.InferOutput<typeof BotInfoResponseSchema>

export const GroupUserProfileResponseSchema = v.pipe(
  v.object({
    displayName: v.pipe(v.string(), v.description("User's display name")),
    userId: v.pipe(v.string(), v.description('User ID')),
    pictureUrl: v.optional(
      v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile',
    },
  }),
)

export type GroupUserProfileResponseSchema = v.InferOutput<typeof GroupUserProfileResponseSchema>

export const RoomUserProfileResponseSchema = v.pipe(
  v.object({
    displayName: v.pipe(v.string(), v.description("User's display name")),
    userId: v.pipe(v.string(), v.description('User ID')),
    pictureUrl: v.optional(
      v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile',
    },
  }),
)

export type RoomUserProfileResponseSchema = v.InferOutput<typeof RoomUserProfileResponseSchema>

export const MembersIdsResponseSchema = v.object({
  memberIds: v.pipe(
    v.pipe(v.array(v.string()), v.maxLength(100)),
    v.description(
      'List of user IDs of members in the group chat. Only users of LINE for iOS and LINE for Android are included in `memberIds`.',
    ),
  ),
  next: v.optional(
    v.pipe(
      v.string(),
      v.description(
        'A continuation token to get the next array of user IDs of the members in the group chat.\nReturned only when there are remaining user IDs that were not returned in `memberIds` in the original request.\n',
      ),
    ),
  ),
})

export type MembersIdsResponseSchema = v.InferOutput<typeof MembersIdsResponseSchema>

export const GroupSummaryResponseSchema = v.pipe(
  v.object({
    groupId: v.pipe(v.string(), v.description('Group ID')),
    groupName: v.pipe(v.string(), v.description('Group name')),
    pictureUrl: v.optional(
      v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          "Group icon URL. Not included in the response if the user doesn't set a group profile icon.",
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-summary',
    },
  }),
)

export type GroupSummaryResponseSchema = v.InferOutput<typeof GroupSummaryResponseSchema>

export const GroupMemberCountResponseSchema = v.pipe(
  v.object({
    count: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description(
        'The count of members in the group chat. The number returned excludes the LINE Official Account.',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-group-count',
    },
  }),
)

export type GroupMemberCountResponseSchema = v.InferOutput<typeof GroupMemberCountResponseSchema>

export const RoomMemberCountResponseSchema = v.pipe(
  v.object({
    count: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description(
        'The count of members in the multi-person chat. The number returned excludes the LINE Official Account.',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-room-count',
    },
  }),
)

export type RoomMemberCountResponseSchema = v.InferOutput<typeof RoomMemberCountResponseSchema>

export const RichMenuSizeSchema = v.pipe(
  v.partial(
    v.object({
      width: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
          v.maxValue(2147483647n),
        ),
        v.description('width'),
      ),
      height: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
          v.maxValue(2147483647n),
        ),
        v.description('height'),
      ),
    }),
  ),
  v.description('Rich menu size'),
)

export type RichMenuSizeSchema = v.InferOutput<typeof RichMenuSizeSchema>

export const RichMenuBoundsSchema = v.pipe(
  v.partial(
    v.object({
      x: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(0n),
          v.maxValue(2147483647n),
        ),
        v.description('Horizontal position relative to the top-left corner of the area.'),
      ),
      y: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(0n),
          v.maxValue(2147483647n),
        ),
        v.description('Vertical position relative to the top-left corner of the area.'),
      ),
      width: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
          v.maxValue(2147483647n),
        ),
        v.description('Width of the area.'),
      ),
      height: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
          v.maxValue(2147483647n),
        ),
        v.description('Height of the area.'),
      ),
    }),
  ),
  v.description('Rich menu bounds'),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#bounds-object' },
  }),
)

export type RichMenuBoundsSchema = v.InferOutput<typeof RichMenuBoundsSchema>

export const RichMenuAreaSchema = v.pipe(
  v.partial(v.object({ bounds: RichMenuBoundsSchema, action: ActionSchema })),
  v.description('Rich menu area'),
)

export type RichMenuAreaSchema = v.InferOutput<typeof RichMenuAreaSchema>

export const RichMenuRequestSchema = v.partial(
  v.object({
    size: RichMenuSizeSchema,
    selected: v.pipe(
      v.boolean(),
      v.description('`true` to display the rich menu by default. Otherwise, `false`.'),
    ),
    name: v.pipe(
      v.pipe(v.string(), v.maxCodePoints(300)),
      v.description(
        'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
      ),
    ),
    chatBarText: v.pipe(
      v.pipe(v.string(), v.maxCodePoints(14)),
      v.description('Text displayed in the chat bar'),
    ),
    areas: v.pipe(
      v.array(RichMenuAreaSchema),
      v.description(
        'Array of area objects which define the coordinates and size of tappable areas',
      ),
    ),
  }),
)

export type RichMenuRequestSchema = v.InferOutput<typeof RichMenuRequestSchema>

export const RichMenuIdResponseSchema = v.object({
  richMenuId: v.pipe(v.string(), v.description('Rich menu ID')),
})

export type RichMenuIdResponseSchema = v.InferOutput<typeof RichMenuIdResponseSchema>

export const RichMenuResponseSchema = v.pipe(
  v.object({
    richMenuId: v.pipe(v.string(), v.description('ID of a rich menu')),
    size: RichMenuSizeSchema,
    selected: v.pipe(
      v.boolean(),
      v.description('`true` to display the rich menu by default. Otherwise, `false`.'),
    ),
    name: v.pipe(
      v.pipe(v.string(), v.maxCodePoints(300)),
      v.description(
        'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
      ),
    ),
    chatBarText: v.pipe(
      v.pipe(v.string(), v.maxCodePoints(14)),
      v.description('Text displayed in the chat bar'),
    ),
    areas: v.pipe(
      v.pipe(v.array(RichMenuAreaSchema), v.maxLength(20)),
      v.description(
        'Array of area objects which define the coordinates and size of tappable areas',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#rich-menu-response-object',
    },
  }),
)

export type RichMenuResponseSchema = v.InferOutput<typeof RichMenuResponseSchema>

export const RichMenuListResponseSchema = v.pipe(
  v.object({ richmenus: v.pipe(v.array(RichMenuResponseSchema), v.description('Rich menus')) }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list',
    },
  }),
)

export type RichMenuListResponseSchema = v.InferOutput<typeof RichMenuListResponseSchema>

export const CreateRichMenuAliasRequestSchema = v.pipe(
  v.object({
    richMenuAliasId: v.pipe(
      v.pipe(v.string(), v.regex(/^[a-z0-9_-]{1,32}$/), v.minCodePoints(1), v.maxCodePoints(32)),
      v.description('Rich menu alias ID, which can be any ID, unique for each channel.'),
    ),
    richMenuId: v.pipe(
      v.string(),
      v.description('The rich menu ID to be associated with the rich menu alias.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias',
    },
  }),
)

export type CreateRichMenuAliasRequestSchema = v.InferOutput<
  typeof CreateRichMenuAliasRequestSchema
>

export const RichMenuAliasResponseSchema = v.object({
  richMenuAliasId: v.pipe(v.string(), v.description('Rich menu alias ID.')),
  richMenuId: v.pipe(
    v.string(),
    v.description('The rich menu ID associated with the rich menu alias.'),
  ),
})

export type RichMenuAliasResponseSchema = v.InferOutput<typeof RichMenuAliasResponseSchema>

export const UpdateRichMenuAliasRequestSchema = v.pipe(
  v.object({
    richMenuId: v.pipe(
      v.string(),
      v.description('The rich menu ID to be associated with the rich menu alias.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias',
    },
  }),
)

export type UpdateRichMenuAliasRequestSchema = v.InferOutput<
  typeof UpdateRichMenuAliasRequestSchema
>

export const RichMenuAliasListResponseSchema = v.pipe(
  v.object({
    aliases: v.pipe(v.array(RichMenuAliasResponseSchema), v.description('Rich menu aliases.')),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list',
    },
  }),
)

export type RichMenuAliasListResponseSchema = v.InferOutput<typeof RichMenuAliasListResponseSchema>

export const RichMenuBulkLinkRequestSchema = v.pipe(
  v.object({
    richMenuId: v.pipe(v.string(), v.description('ID of a rich menu')),
    userIds: v.pipe(
      v.pipe(v.array(v.string()), v.minLength(1), v.maxLength(500)),
      v.description(
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-users',
    },
  }),
)

export type RichMenuBulkLinkRequestSchema = v.InferOutput<typeof RichMenuBulkLinkRequestSchema>

export const RichMenuBulkUnlinkRequestSchema = v.pipe(
  v.object({
    userIds: v.pipe(
      v.pipe(v.array(v.string()), v.minLength(1), v.maxLength(500)),
      v.description(
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-users',
    },
  }),
)

export type RichMenuBulkUnlinkRequestSchema = v.InferOutput<typeof RichMenuBulkUnlinkRequestSchema>

export const RichMenuBatchOperationSchema = v.pipe(
  v.object({
    type: v.pipe(
      v.string(),
      v.description(
        'The type of operation to the rich menu linked to the user. One of link, unlink, or unlinkAll.',
      ),
    ),
  }),
  v.description(
    'Rich menu operation object represents the batch operation to the rich menu linked to the user.',
  ),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users-operations',
    },
  }),
)

export type RichMenuBatchOperationSchema = v.InferOutput<typeof RichMenuBatchOperationSchema>

export const RichMenuBatchRequestSchema = v.object({
  operations: v.pipe(
    v.pipe(v.array(RichMenuBatchOperationSchema), v.maxLength(1000)),
    v.description('Array of Rich menu operation object...'),
  ),
  resumeRequestKey: v.optional(
    v.pipe(
      v.pipe(
        v.string(),
        v.regex(/^[a-zA-Z0-9_-]{1,100}$/),
        v.minCodePoints(1),
        v.maxCodePoints(100),
      ),
      v.description('Key for retry. Key value is a string matching the regular expression pattern'),
    ),
  ),
})

export type RichMenuBatchRequestSchema = v.InferOutput<typeof RichMenuBatchRequestSchema>

export const RichMenuBatchLinkOperationSchema = v.pipe(
  v.intersect([
    RichMenuBatchOperationSchema,
    v.partial(v.object({ from: v.string(), to: v.string() })),
  ]),
  v.description(
    'Replace the rich menu with the rich menu specified in the `to` property for all users linked to the rich menu specified in the `from` property.',
  ),
)

export type RichMenuBatchLinkOperationSchema = v.InferOutput<
  typeof RichMenuBatchLinkOperationSchema
>

export const RichMenuBatchUnlinkOperationSchema = v.pipe(
  v.intersect([RichMenuBatchOperationSchema, v.partial(v.object({ from: v.string() }))]),
  v.description(
    'Unlink the rich menu for all users linked to the rich menu specified in the `from` property.',
  ),
)

export type RichMenuBatchUnlinkOperationSchema = v.InferOutput<
  typeof RichMenuBatchUnlinkOperationSchema
>

export const RichMenuBatchUnlinkAllOperationSchema = v.pipe(
  RichMenuBatchOperationSchema,
  v.description('Unlink the rich menu from all users linked to the rich menu.'),
)

export type RichMenuBatchUnlinkAllOperationSchema = v.InferOutput<
  typeof RichMenuBatchUnlinkAllOperationSchema
>

export const RichMenuBatchProgressPhaseSchema = v.pipe(
  v.picklist(['ongoing', 'succeeded', 'failed']),
  v.description(
    "The current status. One of:\n\n`ongoing`: Rich menu batch control is in progress.\n`succeeded`: Rich menu batch control is complete.\n`failed`: Rich menu batch control failed.\n          This means that the rich menu for one or more users couldn't be controlled.\n          There may also be users whose operations have been successfully completed.\n",
  ),
)

export type RichMenuBatchProgressPhaseSchema = v.InferOutput<
  typeof RichMenuBatchProgressPhaseSchema
>

export const RichMenuBatchProgressResponseSchema = v.pipe(
  v.object({
    phase: RichMenuBatchProgressPhaseSchema,
    acceptedTime: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'The accepted time in milliseconds of the request of batch control the rich menu.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
      ),
    ),
    completedTime: v.optional(
      v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
        v.description(
          'The completed time in milliseconds of rich menu batch control. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status-response',
    },
  }),
)

export type RichMenuBatchProgressResponseSchema = v.InferOutput<
  typeof RichMenuBatchProgressResponseSchema
>

export const IssueLinkTokenResponseSchema = v.pipe(
  v.object({
    linkToken: v.pipe(
      v.string(),
      v.description(
        'Link token.\nLink tokens are valid for 10 minutes and can only be used once.\n\n',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-link-token',
    },
  }),
)

export type IssueLinkTokenResponseSchema = v.InferOutput<typeof IssueLinkTokenResponseSchema>

export const ChatReferenceSchema = v.pipe(
  v.object({ userId: v.pipe(v.string(), v.description('The target user ID')) }),
  v.description('Chat reference'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  }),
)

export type ChatReferenceSchema = v.InferOutput<typeof ChatReferenceSchema>

export const MarkMessagesAsReadRequestSchema = v.pipe(
  v.object({ chat: ChatReferenceSchema }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  }),
)

export type MarkMessagesAsReadRequestSchema = v.InferOutput<typeof MarkMessagesAsReadRequestSchema>

export const PnpMessagesRequestSchema = v.pipe(
  v.object({
    messages: v.pipe(
      v.pipe(v.array(MessageSchema), v.minLength(1), v.maxLength(5)),
      v.description('Message to be sent.'),
    ),
    to: v.pipe(
      v.string(),
      v.description(
        'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
      ),
    ),
    notificationDisabled: v.optional(NotificationDisabledSchema),
    customAggregationUnits: v.optional(
      v.pipe(
        v.pipe(
          v.array(
            v.pipe(
              v.string(),
              v.regex(/^[a-zA-Z0-9_]{1,30}$/),
              v.minCodePoints(1),
              v.maxCodePoints(30),
            ),
          ),
          v.maxLength(1),
        ),
        v.description('Name of aggregation unit. Case-sensitive.'),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message',
    },
  }),
)

export type PnpMessagesRequestSchema = v.InferOutput<typeof PnpMessagesRequestSchema>

export const PnpTemplatedEmphasizedItemSchema = v.pipe(
  v.object({
    itemKey: v.pipe(
      v.string(),
      v.description(
        'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
      ),
    ),
    content: v.pipe(
      v.pipe(v.string(), v.maxCodePoints(15)),
      v.description('String to be displayed as the value of the item.'),
    ),
  }),
  v.description('Item to emphasize in the message.'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  }),
)

export type PnpTemplatedEmphasizedItemSchema = v.InferOutput<
  typeof PnpTemplatedEmphasizedItemSchema
>

export const PnpTemplatedItemSchema = v.pipe(
  v.object({
    itemKey: v.pipe(
      v.string(),
      v.description(
        'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
      ),
    ),
    content: v.pipe(
      v.pipe(v.string(), v.maxCodePoints(300)),
      v.description('String to be displayed as the value of the item.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  }),
)

export type PnpTemplatedItemSchema = v.InferOutput<typeof PnpTemplatedItemSchema>

export const PnpTemplatedButtonSchema = v.pipe(
  v.object({
    buttonKey: v.pipe(
      v.string(),
      v.description(
        'Specify the key of the button you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#buttons\n',
      ),
    ),
    url: v.pipe(
      v.pipe(v.string(), v.maxCodePoints(1000)),
      v.description('URL of the page to be opened when the user presses the button.'),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-buttons',
    },
  }),
)

export type PnpTemplatedButtonSchema = v.InferOutput<typeof PnpTemplatedButtonSchema>

export const PnpTemplatedMessageBodySchema = v.pipe(
  v.partial(
    v.object({
      emphasizedItem: PnpTemplatedEmphasizedItemSchema,
      items: v.pipe(
        v.pipe(v.array(PnpTemplatedItemSchema), v.maxLength(15)),
        v.description(
          'Array of items to include in the message. The `itemKey` must be unique across `emphasizedItem` and `items`.',
        ),
      ),
      buttons: v.pipe(
        v.pipe(v.array(PnpTemplatedButtonSchema), v.maxLength(2)),
        v.description(
          'Array of buttons to include in the message. The `buttonKey` must be unique.',
        ),
      ),
    }),
  ),
  v.description(
    "The body object of the template you want to send. You can't specify the same item more than once in a single message.",
  ),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  }),
)

export type PnpTemplatedMessageBodySchema = v.InferOutput<typeof PnpTemplatedMessageBodySchema>

export const PnpTemplatedMessageRequestSchema = v.pipe(
  v.object({
    to: v.pipe(
      v.string(),
      v.description(
        'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
      ),
    ),
    templateKey: v.pipe(
      v.string(),
      v.description(
        'Specify the key of the template you want to send.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#templates\n',
      ),
    ),
    body: v.optional(PnpTemplatedMessageBodySchema),
    customAggregationUnits: v.optional(
      v.pipe(
        v.pipe(
          v.array(
            v.pipe(
              v.string(),
              v.regex(/^[a-zA-Z0-9_]{1,30}$/),
              v.minCodePoints(1),
              v.maxCodePoints(30),
            ),
          ),
          v.maxLength(1),
        ),
        v.description(
          'Name of aggregation unit. Case-sensitive.\nFor more information about assigning a unit name, see https://developers.line.biz/en/docs/messaging-api/unit-based-statistics-aggregation/#assign-names-to-units-when-sending-messages\n',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  }),
)

export type PnpTemplatedMessageRequestSchema = v.InferOutput<
  typeof PnpTemplatedMessageRequestSchema
>

export const EmojiSchema = v.partial(
  v.object({
    index: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    productId: v.string(),
    emojiId: v.string(),
  }),
)

export type EmojiSchema = v.InferOutput<typeof EmojiSchema>

export const TextMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        text: v.string(),
        emojis: v.array(EmojiSchema),
        quoteToken: v.pipe(
          v.string(),
          v.description('Quote token of the message you want to quote.'),
        ),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#text-message' },
  }),
)

export type TextMessageSchema = v.InferOutput<typeof TextMessageSchema>

export const SubstitutionObjectSchema = v.pipe(
  v.object({ type: v.pipe(v.string(), v.description('Type of substitution object')) }),
  v.description('An object that defines the replacement value for a placeholder in the text.'),
)

export type SubstitutionObjectSchema = v.InferOutput<typeof SubstitutionObjectSchema>

export const TextMessageV2Schema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        text: v.string(),
        substitution: v.pipe(
          v.record(v.string(), SubstitutionObjectSchema),
          v.description(
            'A mapping that specifies substitutions for parts enclosed in {} within the `text` field.',
          ),
        ),
        quoteToken: v.pipe(
          v.string(),
          v.description('Quote token of the message you want to quote.'),
        ),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2',
    },
  }),
)

export type TextMessageV2Schema = v.InferOutput<typeof TextMessageV2Schema>

export const MentionTargetSchema = v.object({
  type: v.pipe(v.string(), v.description('Target to be mentioned')),
})

export type MentionTargetSchema = v.InferOutput<typeof MentionTargetSchema>

export const MentionSubstitutionObjectSchema = v.pipe(
  v.intersect([SubstitutionObjectSchema, v.object({ mentionee: MentionTargetSchema })]),
  v.description('An object representing a mention substitution.'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mention-object',
    },
  }),
)

export type MentionSubstitutionObjectSchema = v.InferOutput<typeof MentionSubstitutionObjectSchema>

export const UserMentionTargetSchema = v.pipe(
  v.intersect([MentionTargetSchema, v.object({ userId: v.string() })]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-user',
    },
  }),
)

export type UserMentionTargetSchema = v.InferOutput<typeof UserMentionTargetSchema>

export const AllMentionTargetSchema = v.pipe(
  MentionTargetSchema,
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-all',
    },
  }),
)

export type AllMentionTargetSchema = v.InferOutput<typeof AllMentionTargetSchema>

export const EmojiSubstitutionObjectSchema = v.pipe(
  v.intersect([SubstitutionObjectSchema, v.object({ productId: v.string(), emojiId: v.string() })]),
  v.description('An object representing a emoji substitution.'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-emoji-object',
    },
  }),
)

export type EmojiSubstitutionObjectSchema = v.InferOutput<typeof EmojiSubstitutionObjectSchema>

export const StickerMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        packageId: v.string(),
        stickerId: v.string(),
        quoteToken: v.pipe(
          v.string(),
          v.description('Quote token of the message you want to quote.'),
        ),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#sticker-message',
    },
  }),
)

export type StickerMessageSchema = v.InferOutput<typeof StickerMessageSchema>

export const ImageMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        originalContentUrl: v.pipe(v.string(), v.url()),
        previewImageUrl: v.pipe(v.string(), v.url()),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#image-message' },
  }),
)

export type ImageMessageSchema = v.InferOutput<typeof ImageMessageSchema>

export const VideoMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        originalContentUrl: v.pipe(v.string(), v.url()),
        previewImageUrl: v.pipe(v.string(), v.url()),
        trackingId: v.string(),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#video-message' },
  }),
)

export type VideoMessageSchema = v.InferOutput<typeof VideoMessageSchema>

export const AudioMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        originalContentUrl: v.pipe(v.string(), v.url()),
        duration: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#audio-message' },
  }),
)

export type AudioMessageSchema = v.InferOutput<typeof AudioMessageSchema>

export const LocationMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        title: v.string(),
        address: v.string(),
        latitude: v.number(),
        longitude: v.number(),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#location-message',
    },
  }),
)

export type LocationMessageSchema = v.InferOutput<typeof LocationMessageSchema>

export const ImagemapBaseSizeSchema = v.object({
  height: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  width: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type ImagemapBaseSizeSchema = v.InferOutput<typeof ImagemapBaseSizeSchema>

export const ImagemapAreaSchema = v.object({
  x: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  y: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  width: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  height: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type ImagemapAreaSchema = v.InferOutput<typeof ImagemapAreaSchema>

export const ImagemapActionSchema = v.pipe(
  v.object({ type: v.string(), area: ImagemapAreaSchema }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-action-objects',
    },
  }),
)

export type ImagemapActionSchema = v.InferOutput<typeof ImagemapActionSchema>

export const ImagemapExternalLinkSchema = v.partial(
  v.object({ linkUri: v.pipe(v.string(), v.url()), label: v.string() }),
)

export type ImagemapExternalLinkSchema = v.InferOutput<typeof ImagemapExternalLinkSchema>

export const ImagemapVideoSchema = v.partial(
  v.object({
    originalContentUrl: v.pipe(v.string(), v.url()),
    previewImageUrl: v.pipe(v.string(), v.url()),
    area: ImagemapAreaSchema,
    externalLink: ImagemapExternalLinkSchema,
  }),
)

export type ImagemapVideoSchema = v.InferOutput<typeof ImagemapVideoSchema>

export const ImagemapMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        baseUrl: v.pipe(v.string(), v.url()),
        altText: v.string(),
        baseSize: ImagemapBaseSizeSchema,
        actions: v.array(ImagemapActionSchema),
        video: ImagemapVideoSchema,
      }),
    ),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-message',
    },
  }),
)

export type ImagemapMessageSchema = v.InferOutput<typeof ImagemapMessageSchema>

export const MessageImagemapActionSchema = v.intersect([
  ImagemapActionSchema,
  v.partial(v.object({ text: v.string(), label: v.string() })),
])

export type MessageImagemapActionSchema = v.InferOutput<typeof MessageImagemapActionSchema>

export const URIImagemapActionSchema = v.intersect([
  ImagemapActionSchema,
  v.partial(v.object({ linkUri: v.string(), label: v.string() })),
])

export type URIImagemapActionSchema = v.InferOutput<typeof URIImagemapActionSchema>

export const ClipboardImagemapActionSchema = v.pipe(
  v.intersect([
    ImagemapActionSchema,
    v.partial(
      v.object({
        clipboardText: v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1000)),
          v.description('Text that is copied to the clipboard.\nMax character limit: 1000\n'),
        ),
        label: v.string(),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-clipboard-action-object',
    },
  }),
)

export type ClipboardImagemapActionSchema = v.InferOutput<typeof ClipboardImagemapActionSchema>

export const TemplateSchema = v.object({ type: v.string() })

export type TemplateSchema = v.InferOutput<typeof TemplateSchema>

export const TemplateMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(v.object({ altText: v.string(), template: TemplateSchema })),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#template-messages',
    },
  }),
)

export type TemplateMessageSchema = v.InferOutput<typeof TemplateMessageSchema>

export const ButtonsTemplateSchema = v.intersect([
  TemplateSchema,
  v.partial(
    v.object({
      thumbnailImageUrl: v.pipe(v.string(), v.url()),
      imageAspectRatio: v.string(),
      imageSize: v.string(),
      imageBackgroundColor: v.string(),
      title: v.string(),
      text: v.string(),
      defaultAction: ActionSchema,
      actions: v.array(ActionSchema),
    }),
  ),
])

export type ButtonsTemplateSchema = v.InferOutput<typeof ButtonsTemplateSchema>

export const TemplateImageAspectRatioSchema = v.pipe(
  v.picklist(['rectangle', 'square']),
  v.description(
    'Aspect ratio of the image. This is only for the `imageAspectRatio` in ButtonsTemplate.\nSpecify one of the following values:\n\n`rectangle`: 1.51:1\n`square`: 1:1\n',
  ),
)

export type TemplateImageAspectRatioSchema = v.InferOutput<typeof TemplateImageAspectRatioSchema>

export const TemplateImageSizeSchema = v.pipe(
  v.picklist(['cover', 'contain']),
  v.description(
    'Size of the image.  This is only for the `imageSize` in ButtonsTemplate.\nSpecify one of the following values:\n\n`cover`: The image fills the entire image area. Parts of the image that do not fit in the area are not displayed.\n`contain`: The entire image is displayed in the image area. A background is displayed in the unused areas to the left and right of vertical images and in the areas above and below horizontal images.\n',
  ),
)

export type TemplateImageSizeSchema = v.InferOutput<typeof TemplateImageSizeSchema>

export const ConfirmTemplateSchema = v.intersect([
  TemplateSchema,
  v.partial(v.object({ text: v.string(), actions: v.array(ActionSchema) })),
])

export type ConfirmTemplateSchema = v.InferOutput<typeof ConfirmTemplateSchema>

export const CarouselColumnSchema = v.pipe(
  v.object({
    thumbnailImageUrl: v.optional(v.pipe(v.string(), v.url())),
    imageBackgroundColor: v.optional(v.string()),
    title: v.optional(v.string()),
    text: v.string(),
    defaultAction: v.optional(ActionSchema),
    actions: v.array(ActionSchema),
  }),
  v.description('Column object for carousel template.'),
)

export type CarouselColumnSchema = v.InferOutput<typeof CarouselColumnSchema>

export const CarouselTemplateSchema = v.intersect([
  TemplateSchema,
  v.partial(
    v.object({
      columns: v.array(CarouselColumnSchema),
      imageAspectRatio: v.string(),
      imageSize: v.string(),
    }),
  ),
])

export type CarouselTemplateSchema = v.InferOutput<typeof CarouselTemplateSchema>

export const ImageCarouselColumnSchema = v.object({
  imageUrl: v.pipe(v.string(), v.url()),
  action: ActionSchema,
})

export type ImageCarouselColumnSchema = v.InferOutput<typeof ImageCarouselColumnSchema>

export const ImageCarouselTemplateSchema = v.intersect([
  TemplateSchema,
  v.partial(v.object({ columns: v.array(ImageCarouselColumnSchema) })),
])

export type ImageCarouselTemplateSchema = v.InferOutput<typeof ImageCarouselTemplateSchema>

export const CouponMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(
      v.object({
        couponId: v.pipe(v.string(), v.description('Unique identifier of the coupon.')),
        deliveryTag: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(30)),
          v.description(
            'Delivery route tag information. It can be used for analysis in LINE OA Manager.',
          ),
        ),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#coupon-message' },
  }),
)

export type CouponMessageSchema = v.InferOutput<typeof CouponMessageSchema>

export const FlexContainerSchema = v.object({ type: v.string() })

export type FlexContainerSchema = v.InferOutput<typeof FlexContainerSchema>

export const FlexMessageSchema = v.pipe(
  v.intersect([
    MessageSchema,
    v.partial(v.object({ altText: v.string(), contents: FlexContainerSchema })),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#flex-message' },
  }),
)

export type FlexMessageSchema = v.InferOutput<typeof FlexMessageSchema>

export const FlexBlockStyleSchema = v.partial(
  v.object({ backgroundColor: v.string(), separator: v.boolean(), separatorColor: v.string() }),
)

export type FlexBlockStyleSchema = v.InferOutput<typeof FlexBlockStyleSchema>

export const FlexBubbleStylesSchema = v.partial(
  v.object({
    header: FlexBlockStyleSchema,
    hero: FlexBlockStyleSchema,
    body: FlexBlockStyleSchema,
    footer: FlexBlockStyleSchema,
  }),
)

export type FlexBubbleStylesSchema = v.InferOutput<typeof FlexBubbleStylesSchema>

export const FlexComponentSchema = v.object({ type: v.string() })

export type FlexComponentSchema = v.InferOutput<typeof FlexComponentSchema>

export const FlexBoxBackgroundSchema = v.object({ type: v.string() })

export type FlexBoxBackgroundSchema = v.InferOutput<typeof FlexBoxBackgroundSchema>

export const FlexBoxSchema = v.intersect([
  FlexComponentSchema,
  v.partial(
    v.object({
      layout: v.picklist(['horizontal', 'vertical', 'baseline']),
      flex: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      contents: v.array(FlexComponentSchema),
      spacing: v.string(),
      margin: v.string(),
      position: v.picklist(['relative', 'absolute']),
      offsetTop: v.string(),
      offsetBottom: v.string(),
      offsetStart: v.string(),
      offsetEnd: v.string(),
      backgroundColor: v.string(),
      borderColor: v.string(),
      borderWidth: v.string(),
      cornerRadius: v.string(),
      width: v.string(),
      maxWidth: v.string(),
      height: v.string(),
      maxHeight: v.string(),
      paddingAll: v.string(),
      paddingTop: v.string(),
      paddingBottom: v.string(),
      paddingStart: v.string(),
      paddingEnd: v.string(),
      action: ActionSchema,
      justifyContent: v.picklist([
        'center',
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ]),
      alignItems: v.picklist(['center', 'flex-start', 'flex-end']),
      background: FlexBoxBackgroundSchema,
    }),
  ),
])

export type FlexBoxSchema = v.InferOutput<typeof FlexBoxSchema>

export const FlexBubbleSchema = v.intersect([
  FlexContainerSchema,
  v.partial(
    v.object({
      direction: v.picklist(['ltr', 'rtl']),
      styles: FlexBubbleStylesSchema,
      header: FlexBoxSchema,
      hero: FlexComponentSchema,
      body: FlexBoxSchema,
      footer: FlexBoxSchema,
      size: v.picklist(['nano', 'micro', 'deca', 'hecto', 'kilo', 'mega', 'giga']),
      action: ActionSchema,
    }),
  ),
])

export type FlexBubbleSchema = v.InferOutput<typeof FlexBubbleSchema>

export const FlexCarouselSchema = v.intersect([
  FlexContainerSchema,
  v.partial(v.object({ contents: v.array(FlexBubbleSchema) })),
])

export type FlexCarouselSchema = v.InferOutput<typeof FlexCarouselSchema>

export const FlexBoxBorderWidthSchema = v.pipe(
  v.picklist(['none', 'light', 'normal', 'medium', 'semi-bold', 'bold']),
  v.description(
    'Width of box border. This is only for `borderWidth` in FlexBox.\nA value of none means that borders are not rendered; the other values are listed in order of increasing width.\n',
  ),
)

export type FlexBoxBorderWidthSchema = v.InferOutput<typeof FlexBoxBorderWidthSchema>

export const FlexBoxCornerRadiusSchema = v.pipe(
  v.picklist(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  v.description(
    'Radius at the time of rounding the corners of the box. This is only for `cornerRadius` in FlexBox.\nA value of none means that corners are not rounded; the other values are listed in order of increasing radius.\n',
  ),
)

export type FlexBoxCornerRadiusSchema = v.InferOutput<typeof FlexBoxCornerRadiusSchema>

export const FlexBoxSpacingSchema = v.pipe(
  v.picklist(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  v.description(
    'You can specify the minimum space between two components with the `spacing` property of the parent box component, in pixels or with a keyword.\nFlexBoxSpacing just provides only keywords.\n',
  ),
)

export type FlexBoxSpacingSchema = v.InferOutput<typeof FlexBoxSpacingSchema>

export const FlexMarginSchema = v.pipe(
  v.picklist(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  v.description(
    'You can specify the minimum space before a child component with the `margin` property of the child component, in pixels or with a keyword.\nFlexMargin just provides only keywords.\n',
  ),
)

export type FlexMarginSchema = v.InferOutput<typeof FlexMarginSchema>

export const FlexBoxPaddingSchema = v.pipe(
  v.picklist(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  v.description(
    'Padding can be specified in pixels, percentage (to the parent box width) or with a keyword.\nFlexBoxPadding just provides only keywords.\n',
  ),
)

export type FlexBoxPaddingSchema = v.InferOutput<typeof FlexBoxPaddingSchema>

export const FlexImageSizeSchema = v.pipe(
  v.picklist(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl', 'full']),
  v.description(
    'You can set the width of an Flex image component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexImageSize just provides only keywords.\n',
  ),
)

export type FlexImageSizeSchema = v.InferOutput<typeof FlexImageSizeSchema>

export const FlexIconSizeSchema = v.pipe(
  v.picklist(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl']),
  v.description(
    'You can set the width of an Flex icon component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexIconSize just provides only keywords.\n',
  ),
)

export type FlexIconSizeSchema = v.InferOutput<typeof FlexIconSizeSchema>

export const FlexTextFontSizeSchema = v.pipe(
  v.picklist(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl']),
  v.description(
    'Font size in the `size` property of the Flex text component.\nYou can specify the size in pixels or with a keyword.\nFlexTextFontSize just provides only keywords.\n',
  ),
)

export type FlexTextFontSizeSchema = v.InferOutput<typeof FlexTextFontSizeSchema>

export const FlexSpanSizeSchema = v.pipe(
  v.picklist(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl']),
  v.description(
    'Font size in the `size` property of the Flex span component.\nYou can specify the size in pixels or with a keyword.\nFlexSpanSize just provides only keywords.\n',
  ),
)

export type FlexSpanSizeSchema = v.InferOutput<typeof FlexSpanSizeSchema>

export const FlexOffsetSchema = v.pipe(
  v.picklist(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  v.description(
    'You can specify the offset of a component with the `offset*` property, in pixels or with a keyword.\nYou can also specify the percentage to the box width for `offsetStart` and `offsetEnd` and to the box height for `offsetTop` and `offsetBottom`.\nFlexOffset just provides only keywords.\n',
  ),
)

export type FlexOffsetSchema = v.InferOutput<typeof FlexOffsetSchema>

export const FlexButtonSchema = v.intersect([
  FlexComponentSchema,
  v.partial(
    v.object({
      flex: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      color: v.string(),
      style: v.picklist(['primary', 'secondary', 'link']),
      action: ActionSchema,
      gravity: v.picklist(['top', 'bottom', 'center']),
      margin: v.string(),
      position: v.picklist(['relative', 'absolute']),
      offsetTop: v.string(),
      offsetBottom: v.string(),
      offsetStart: v.string(),
      offsetEnd: v.string(),
      height: v.picklist(['md', 'sm']),
      adjustMode: v.literal('shrink-to-fit'),
      scaling: v.boolean(),
    }),
  ),
])

export type FlexButtonSchema = v.InferOutput<typeof FlexButtonSchema>

export const FlexImageSchema = v.pipe(
  v.intersect([
    FlexComponentSchema,
    v.object({
      url: v.optional(
        v.pipe(
          v.pipe(v.string(), v.url()),
          v.description(
            'Image URL (Max character limit: 2000)\nProtocol: HTTPS (TLS 1.2 or later)\nImage format: JPEG or PNG\nMaximum image size: 1024×1024 pixels\nMaximum file size: 10 MB (300 KB when the animated property is true)\n',
          ),
        ),
      ),
      flex: v.optional(
        v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
          v.description(
            'The ratio of the width or height of this component within the parent box.',
          ),
        ),
      ),
      margin: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'The minimum amount of space to include before this component in its parent container.\n',
          ),
        ),
      ),
      position: v.optional(
        v.pipe(
          v.picklist(['relative', 'absolute']),
          v.description(
            'Reference for offsetTop, offsetBottom, offsetStart, and offsetEnd. Specify one of the following values:\n\n`relative`: Use the previous box as reference.\n`absolute`: Use the top left of parent element as reference. The default value is relative.\n',
          ),
        ),
      ),
      offsetTop: v.optional(v.pipe(v.string(), v.description('Offset.'))),
      offsetBottom: v.optional(v.pipe(v.string(), v.description('Offset.'))),
      offsetStart: v.optional(v.pipe(v.string(), v.description('Offset.'))),
      offsetEnd: v.optional(v.pipe(v.string(), v.description('Offset.'))),
      align: v.optional(
        v.pipe(
          v.picklist(['start', 'end', 'center']),
          v.description('Alignment style in horizontal direction.\n'),
        ),
      ),
      gravity: v.optional(
        v.pipe(
          v.picklist(['top', 'bottom', 'center']),
          v.description('Alignment style in vertical direction.'),
        ),
      ),
      size: v.pipe(
        v.optional(v.string(), 'md'),
        v.description('The maximum image width. This is md by default.\n'),
      ),
      aspectRatio: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'Aspect ratio of the image.\n`{width}:{height}` format.\nSpecify the value of `{width}` and `{height}` in the range from `1` to `100000`.\nHowever, you cannot set `{height}` to a value that is more than three times the value of `{width}`.\nThe default value is `1:1`.\n',
          ),
        ),
      ),
      aspectMode: v.optional(
        v.pipe(
          v.picklist(['fit', 'cover']),
          v.description(
            'The display style of the image if the aspect ratio of the image and that specified by the aspectRatio property do not match.\n',
          ),
        ),
      ),
      backgroundColor: v.optional(
        v.pipe(
          v.string(),
          v.description('Background color of the image. Use a hexadecimal color code.'),
        ),
      ),
      action: v.optional(ActionSchema),
      animated: v.pipe(
        v.optional(v.boolean(), false),
        v.description(
          "When this is `true`, an animated image (APNG) plays.\nYou can specify a value of true up to 10 images in a single message.\nYou can't send messages that exceed this limit.\nThis is `false` by default.\nAnimated images larger than 300 KB aren't played back.\n",
        ),
      ),
    }),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#f-image' },
  }),
)

export type FlexImageSchema = v.InferOutput<typeof FlexImageSchema>

export const FlexVideoSchema = v.intersect([
  FlexComponentSchema,
  v.partial(
    v.object({
      url: v.pipe(v.string(), v.url()),
      previewUrl: v.pipe(v.string(), v.url()),
      altContent: FlexComponentSchema,
      aspectRatio: v.string(),
      action: ActionSchema,
    }),
  ),
])

export type FlexVideoSchema = v.InferOutput<typeof FlexVideoSchema>

export const FlexIconSchema = v.pipe(
  v.intersect([
    FlexComponentSchema,
    v.partial(
      v.object({
        url: v.pipe(v.string(), v.url()),
        size: v.string(),
        aspectRatio: v.string(),
        margin: v.string(),
        position: v.picklist(['relative', 'absolute']),
        offsetTop: v.string(),
        offsetBottom: v.string(),
        offsetStart: v.string(),
        offsetEnd: v.string(),
        scaling: v.boolean(),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#icon' },
  }),
)

export type FlexIconSchema = v.InferOutput<typeof FlexIconSchema>

export const FlexSpanSchema = v.intersect([
  FlexComponentSchema,
  v.partial(
    v.object({
      text: v.string(),
      size: v.string(),
      color: v.string(),
      weight: v.picklist(['regular', 'bold']),
      style: v.picklist(['normal', 'italic']),
      decoration: v.picklist(['none', 'underline', 'line-through']),
    }),
  ),
])

export type FlexSpanSchema = v.InferOutput<typeof FlexSpanSchema>

export const FlexTextSchema = v.intersect([
  FlexComponentSchema,
  v.partial(
    v.object({
      flex: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      text: v.string(),
      size: v.string(),
      align: v.picklist(['start', 'end', 'center']),
      gravity: v.picklist(['top', 'bottom', 'center']),
      color: v.string(),
      weight: v.picklist(['regular', 'bold']),
      style: v.picklist(['normal', 'italic']),
      decoration: v.picklist(['none', 'underline', 'line-through']),
      wrap: v.boolean(),
      lineSpacing: v.string(),
      margin: v.string(),
      position: v.picklist(['relative', 'absolute']),
      offsetTop: v.string(),
      offsetBottom: v.string(),
      offsetStart: v.string(),
      offsetEnd: v.string(),
      action: ActionSchema,
      maxLines: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      contents: v.array(FlexSpanSchema),
      adjustMode: v.literal('shrink-to-fit'),
      scaling: v.boolean(),
    }),
  ),
])

export type FlexTextSchema = v.InferOutput<typeof FlexTextSchema>

export const FlexSeparatorSchema = v.intersect([
  FlexComponentSchema,
  v.partial(v.object({ margin: v.string(), color: v.string() })),
])

export type FlexSeparatorSchema = v.InferOutput<typeof FlexSeparatorSchema>

export const FlexFillerSchema = v.intersect([
  FlexComponentSchema,
  v.partial(
    v.object({
      flex: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    }),
  ),
])

export type FlexFillerSchema = v.InferOutput<typeof FlexFillerSchema>

export const FlexBoxLinearGradientSchema = v.intersect([
  FlexBoxBackgroundSchema,
  v.partial(
    v.object({
      angle: v.string(),
      startColor: v.string(),
      endColor: v.string(),
      centerColor: v.string(),
      centerPosition: v.string(),
    }),
  ),
])

export type FlexBoxLinearGradientSchema = v.InferOutput<typeof FlexBoxLinearGradientSchema>

export const CameraActionSchema = ActionSchema

export type CameraActionSchema = v.InferOutput<typeof CameraActionSchema>

export const CameraRollActionSchema = ActionSchema

export type CameraRollActionSchema = v.InferOutput<typeof CameraRollActionSchema>

export const ClipboardActionSchema = v.pipe(
  v.intersect([
    ActionSchema,
    v.object({
      clipboardText: v.pipe(
        v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1000)),
        v.description('Text that is copied to the clipboard.\nMax character limit: 1000\n'),
      ),
    }),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#clipboard-action',
    },
  }),
)

export type ClipboardActionSchema = v.InferOutput<typeof ClipboardActionSchema>

export const DatetimePickerActionSchema = v.pipe(
  v.intersect([
    ActionSchema,
    v.partial(
      v.object({
        data: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(300)),
        mode: v.picklist(['date', 'time', 'datetime']),
        initial: v.string(),
        max: v.string(),
        min: v.string(),
      }),
    ),
  ]),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action',
    },
  }),
)

export type DatetimePickerActionSchema = v.InferOutput<typeof DatetimePickerActionSchema>

export const LocationActionSchema = ActionSchema

export type LocationActionSchema = v.InferOutput<typeof LocationActionSchema>

export const MessageActionSchema = v.intersect([
  ActionSchema,
  v.partial(v.object({ text: v.string() })),
])

export type MessageActionSchema = v.InferOutput<typeof MessageActionSchema>

export const PostbackActionSchema = v.intersect([
  ActionSchema,
  v.partial(
    v.object({
      data: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(300)),
      displayText: v.string(),
      text: v.string(),
      inputOption: v.picklist(['closeRichMenu', 'openRichMenu', 'openKeyboard', 'openVoice']),
      fillInText: v.string(),
    }),
  ),
])

export type PostbackActionSchema = v.InferOutput<typeof PostbackActionSchema>

export const RichMenuSwitchActionSchema = v.intersect([
  ActionSchema,
  v.partial(
    v.object({
      data: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(300)),
      richMenuAliasId: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(32)),
    }),
  ),
])

export type RichMenuSwitchActionSchema = v.InferOutput<typeof RichMenuSwitchActionSchema>

export const AltUriSchema = v.partial(
  v.object({ desktop: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(10000)) }),
)

export type AltUriSchema = v.InferOutput<typeof AltUriSchema>

export const URIActionSchema = v.intersect([
  ActionSchema,
  v.partial(
    v.object({ uri: v.pipe(v.string(), v.url(), v.maxCodePoints(10000)), altUri: AltUriSchema }),
  ),
])

export type URIActionSchema = v.InferOutput<typeof URIActionSchema>

export const SubscribedMembershipPlanSchema = v.pipe(
  v.object({
    membershipId: v.pipe(v.pipe(v.number(), v.integer()), v.description('Membership plan ID.')),
    title: v.pipe(v.string(), v.description('Membership plan name.')),
    description: v.pipe(v.string(), v.description('Membership plan description.')),
    benefits: v.pipe(
      v.pipe(v.array(v.string()), v.minLength(1)),
      v.description('List of membership plan perks.'),
    ),
    price: v.pipe(
      v.number(),
      v.description('Monthly fee for membership plan. (e.g. 1500.00)'),
      v.metadata({ examples: [500] }),
    ),
    currency: v.pipe(
      v.picklist(['JPY', 'TWD', 'THB']),
      v.description('The currency of membership.price.'),
    ),
  }),
  v.description('Object containing information about the membership plan.'),
)

export type SubscribedMembershipPlanSchema = v.InferOutput<typeof SubscribedMembershipPlanSchema>

export const SubscribedMembershipUserSchema = v.pipe(
  v.object({
    membershipNo: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description("The user's member number in the membership plan."),
    ),
    joinedTime: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('UNIX timestamp at which the user subscribed to the membership.'),
    ),
    nextBillingDate: v.pipe(
      v.string(),
      v.description(
        'Next payment date for membership plan.\n- Format: yyyy-MM-dd (e.g. 2024-02-08)\n- Timezone: UTC+9\n',
      ),
    ),
    totalSubscriptionMonths: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The period of time in months that the user has been subscribed to a membership plan. If a user previously canceled and then re-subscribed to the same membership plan, only the period after the re-subscription will be counted.',
      ),
    ),
  }),
  v.description('Object containing user membership subscription information.'),
)

export type SubscribedMembershipUserSchema = v.InferOutput<typeof SubscribedMembershipUserSchema>

export const SubscriptionSchema = v.pipe(
  v.object({ membership: SubscribedMembershipPlanSchema, user: SubscribedMembershipUserSchema }),
  v.description('An array of memberships.'),
)

export type SubscriptionSchema = v.InferOutput<typeof SubscriptionSchema>

export const GetMembershipSubscriptionResponseSchema = v.pipe(
  v.object({
    subscriptions: v.pipe(
      v.pipe(v.array(SubscriptionSchema), v.minLength(0)),
      v.description('List of subscription information'),
    ),
  }),
  v.description("A user's membership subscription status"),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-a-users-membership-subscription-status',
    },
  }),
)

export type GetMembershipSubscriptionResponseSchema = v.InferOutput<
  typeof GetMembershipSubscriptionResponseSchema
>

export const MembershipSchema = v.object({
  membershipId: v.pipe(v.pipe(v.number(), v.integer()), v.description('Membership plan ID.')),
  title: v.pipe(v.string(), v.description('Membership plan name.')),
  description: v.pipe(v.string(), v.description('Membership plan description.')),
  benefits: v.pipe(
    v.pipe(v.array(v.string()), v.minLength(1)),
    v.description('List of membership plan perks.'),
  ),
  price: v.pipe(
    v.number(),
    v.description('Monthly fee for membership plan. (e.g. 1500.00)'),
    v.metadata({ examples: [500] }),
  ),
  currency: v.pipe(
    v.picklist(['JPY', 'TWD', 'THB']),
    v.description('The currency of membership.price.'),
  ),
  memberCount: v.pipe(
    v.pipe(v.number(), v.integer()),
    v.description('Number of members subscribed to the membership plan.'),
    v.metadata({ examples: [100] }),
  ),
  memberLimit: v.pipe(
    v.nullable(v.pipe(v.number(), v.integer())),
    v.description(
      'The upper limit of members who can subscribe. If no upper limit is set, it will be null.',
    ),
    v.metadata({ examples: [1000] }),
  ),
  isInAppPurchase: v.pipe(
    v.boolean(),
    v.description('Payment method for users who subscribe to a membership plan.'),
  ),
  isPublished: v.pipe(v.boolean(), v.description('Membership plan status.')),
})

export type MembershipSchema = v.InferOutput<typeof MembershipSchema>

export const MembershipListResponseSchema = v.pipe(
  v.object({
    memberships: v.pipe(
      v.pipe(v.array(MembershipSchema), v.minLength(0)),
      v.description('List of membership information'),
    ),
  }),
  v.description('List of memberships'),
)

export type MembershipListResponseSchema = v.InferOutput<typeof MembershipListResponseSchema>

export const GetJoinedMembershipUsersResponseSchema = v.pipe(
  v.object({
    userIds: v.pipe(
      v.pipe(v.array(v.string()), v.maxLength(1000)),
      v.description(
        'A list of user IDs who joined the membership.\nUsers who have not agreed to the bot user agreement, are not following the bot, or are not active will be excluded.\nIf there are no users in the membership, an empty list will be returned.\n',
      ),
    ),
    next: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "A continuation token to get next remaining membership user IDs.\nReturned only when there are remaining user IDs that weren't returned in the userIds property in the previous request.\nThe continuation token expires in 24 hours (86,400 seconds).\n\n",
        ),
      ),
    ),
  }),
  v.description('List of users who have joined the membership'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-membership-user-ids',
    },
  }),
)

export type GetJoinedMembershipUsersResponseSchema = v.InferOutput<
  typeof GetJoinedMembershipUsersResponseSchema
>

export const AcquisitionConditionRequestSchema = v.object({
  type: v.pipe(v.string(), v.description('Determines how the coupon is distributed or used.')),
})

export type AcquisitionConditionRequestSchema = v.InferOutput<
  typeof AcquisitionConditionRequestSchema
>

export const CouponRewardRequestSchema = v.object({
  type: v.pipe(v.string(), v.description('Type of coupon. Determines the benefit provided.')),
})

export type CouponRewardRequestSchema = v.InferOutput<typeof CouponRewardRequestSchema>

export const CouponCreateRequestSchema = v.pipe(
  v.object({
    acquisitionCondition: AcquisitionConditionRequestSchema,
    barcodeImageUrl: v.optional(
      v.pipe(
        v.string(),
        v.description(
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
        ),
      ),
    ),
    couponCode: v.optional(
      v.pipe(
        v.string(),
        v.description('Unique code to be presented by the user to redeem the coupon. Optional.'),
      ),
    ),
    description: v.optional(
      v.pipe(
        v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1000)),
        v.description('Detailed description of the coupon. Displayed to users.'),
      ),
    ),
    endTimestamp: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description(
        'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
      ),
    ),
    imageUrl: v.optional(
      v.pipe(
        v.string(),
        v.description(
          'URL of the main image representing the coupon. Displayed in the coupon list.',
        ),
      ),
    ),
    maxUseCountPerTicket: v.pipe(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.maxValue(1),
      ),
      v.description(
        'Maximum number of times a single coupon ticket can be used. Use -1 to indicate no limit.',
      ),
    ),
    startTimestamp: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description('Coupon start time (epoch seconds). Coupon can be used from this time.'),
    ),
    title: v.pipe(
      v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(60)),
      v.description('Title of the coupon. Displayed in the coupon list.'),
    ),
    usageCondition: v.optional(
      v.pipe(
        v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(100)),
        v.description('Conditions for using the coupon. Shown to users.'),
      ),
    ),
    reward: v.optional(CouponRewardRequestSchema),
    visibility: v.pipe(
      v.picklist(['UNLISTED', 'PUBLIC']),
      v.description('Visibility of the coupon. Determines who can see or acquire the coupon.'),
    ),
    timezone: v.pipe(
      v.picklist([
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
      ]),
      v.description('Timezone for interpreting start and end timestamps.'),
    ),
  }),
  v.description(
    'Request object for creating a coupon. Contains all configurable coupon properties.',
  ),
)

export type CouponCreateRequestSchema = v.InferOutput<typeof CouponCreateRequestSchema>

export const NormalAcquisitionConditionRequestSchema = AcquisitionConditionRequestSchema

export type NormalAcquisitionConditionRequestSchema = v.InferOutput<
  typeof NormalAcquisitionConditionRequestSchema
>

export const LotteryAcquisitionConditionRequestSchema = v.intersect([
  AcquisitionConditionRequestSchema,
  v.object({
    lotteryProbability: v.pipe(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(1),
        v.maxValue(99),
      ),
      v.description('Probability (1-99) of winning the coupon in lottery-type campaigns.'),
    ),
    maxAcquireCount: v.pipe(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.maxValue(999999),
      ),
      v.description(
        'Maximum number of coupons that can be issued in total. Use -1 to indicate no limit',
      ),
    ),
  }),
])

export type LotteryAcquisitionConditionRequestSchema = v.InferOutput<
  typeof LotteryAcquisitionConditionRequestSchema
>

export const CashBackPriceInfoRequestSchema = v.object({ type: v.string() })

export type CashBackPriceInfoRequestSchema = v.InferOutput<typeof CashBackPriceInfoRequestSchema>

export const CouponCashBackRewardRequestSchema = v.intersect([
  CouponRewardRequestSchema,
  v.partial(v.object({ priceInfo: CashBackPriceInfoRequestSchema })),
])

export type CouponCashBackRewardRequestSchema = v.InferOutput<
  typeof CouponCashBackRewardRequestSchema
>

export const DiscountPriceInfoRequestSchema = v.object({ type: v.string() })

export type DiscountPriceInfoRequestSchema = v.InferOutput<typeof DiscountPriceInfoRequestSchema>

export const CouponDiscountRewardRequestSchema = v.intersect([
  CouponRewardRequestSchema,
  v.partial(v.object({ priceInfo: DiscountPriceInfoRequestSchema })),
])

export type CouponDiscountRewardRequestSchema = v.InferOutput<
  typeof CouponDiscountRewardRequestSchema
>

export const CouponFreeRewardRequestSchema = CouponRewardRequestSchema

export type CouponFreeRewardRequestSchema = v.InferOutput<typeof CouponFreeRewardRequestSchema>

export const CouponGiftRewardRequestSchema = CouponRewardRequestSchema

export type CouponGiftRewardRequestSchema = v.InferOutput<typeof CouponGiftRewardRequestSchema>

export const CouponOthersRewardRequestSchema = CouponRewardRequestSchema

export type CouponOthersRewardRequestSchema = v.InferOutput<typeof CouponOthersRewardRequestSchema>

export const CashBackFixedPriceInfoRequestSchema = v.intersect([
  CashBackPriceInfoRequestSchema,
  v.partial(
    v.object({
      fixedAmount: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  ),
])

export type CashBackFixedPriceInfoRequestSchema = v.InferOutput<
  typeof CashBackFixedPriceInfoRequestSchema
>

export const CashBackPercentagePriceInfoRequestSchema = v.intersect([
  CashBackPriceInfoRequestSchema,
  v.partial(
    v.object({
      percentage: v.pipe(
        v.pipe(
          v.number(),
          v.integer(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.minValue(1),
          v.maxValue(99),
        ),
        v.description(
          'Specifies the cashback rate as a percentage. Must be an integer between 1 and 99.',
        ),
      ),
    }),
  ),
])

export type CashBackPercentagePriceInfoRequestSchema = v.InferOutput<
  typeof CashBackPercentagePriceInfoRequestSchema
>

export const DiscountFixedPriceInfoRequestSchema = v.intersect([
  DiscountPriceInfoRequestSchema,
  v.partial(
    v.object({
      fixedAmount: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  ),
])

export type DiscountFixedPriceInfoRequestSchema = v.InferOutput<
  typeof DiscountFixedPriceInfoRequestSchema
>

export const DiscountPercentagePriceInfoRequestSchema = v.intersect([
  DiscountPriceInfoRequestSchema,
  v.partial(
    v.object({
      percentage: v.pipe(
        v.pipe(
          v.number(),
          v.integer(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.minValue(1),
          v.maxValue(99),
        ),
        v.description(
          'Specifies the discount rate as a percentage. Must be an integer between 1 and 99.',
        ),
      ),
    }),
  ),
])

export type DiscountPercentagePriceInfoRequestSchema = v.InferOutput<
  typeof DiscountPercentagePriceInfoRequestSchema
>

export const DiscountExplicitPriceInfoRequestSchema = v.intersect([
  DiscountPriceInfoRequestSchema,
  v.partial(
    v.object({
      priceAfterDiscount: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      originalPrice: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  ),
])

export type DiscountExplicitPriceInfoRequestSchema = v.InferOutput<
  typeof DiscountExplicitPriceInfoRequestSchema
>

export const CouponCreateResponseSchema = v.pipe(
  v.object({ couponId: v.pipe(v.string(), v.description('Unique identifier of the coupon.')) }),
  v.description('Response object returned after creating a coupon. Contains the coupon ID.'),
)

export type CouponCreateResponseSchema = v.InferOutput<typeof CouponCreateResponseSchema>

export const AcquisitionConditionResponseSchema = v.object({
  type: v.pipe(v.string(), v.description('Determines how the coupon is distributed or used.')),
})

export type AcquisitionConditionResponseSchema = v.InferOutput<
  typeof AcquisitionConditionResponseSchema
>

export const CouponRewardResponseSchema = v.object({
  type: v.pipe(v.string(), v.description('Type of coupon. Determines the benefit provided.')),
})

export type CouponRewardResponseSchema = v.InferOutput<typeof CouponRewardResponseSchema>

export const CouponResponseSchema = v.pipe(
  v.partial(
    v.object({
      acquisitionCondition: AcquisitionConditionResponseSchema,
      barcodeImageUrl: v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
        ),
      ),
      couponCode: v.pipe(
        v.string(),
        v.description('Unique code to be presented by the user to redeem the coupon.'),
      ),
      description: v.pipe(
        v.string(),
        v.description('Detailed description of the coupon. Displayed to users.'),
      ),
      endTimestamp: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description(
          'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
        ),
      ),
      imageUrl: v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          'URL of the main image representing the coupon. Displayed in the coupon list.',
        ),
      ),
      maxAcquireCount: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('Maximum number of coupons that can be issued in total.'),
      ),
      maxUseCountPerTicket: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('Maximum number of times a single coupon ticket can be used.'),
      ),
      maxTicketPerUser: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('Maximum number of coupon tickets a single user can acquire.'),
      ),
      startTimestamp: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('Coupon start time (epoch seconds). Coupon can be used from this time.'),
      ),
      title: v.pipe(
        v.string(),
        v.description('Title of the coupon. Displayed in the coupon list.'),
      ),
      usageCondition: v.pipe(
        v.string(),
        v.description('Conditions for using the coupon. Shown to users.'),
      ),
      reward: CouponRewardResponseSchema,
      visibility: v.pipe(
        v.picklist(['UNLISTED', 'PUBLIC', 'PRIVATE']),
        v.description('Visibility of the coupon. Determines who can see or acquire the coupon.'),
      ),
      timezone: v.pipe(
        v.picklist([
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
        ]),
        v.description('Timezone for interpreting start and end timestamps.'),
      ),
      couponId: v.pipe(v.string(), v.description('Unique identifier of the coupon.')),
      createdTimestamp: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('Created timestamp (seconds) of the coupon.'),
      ),
      status: v.pipe(
        v.picklist(['DRAFT', 'RUNNING', 'CLOSED']),
        v.description('Current status of the coupon.'),
      ),
    }),
  ),
  v.description(
    'Detailed information about a coupon, including all properties and current status.',
  ),
)

export type CouponResponseSchema = v.InferOutput<typeof CouponResponseSchema>

export const NormalAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type NormalAcquisitionConditionResponseSchema = v.InferOutput<
  typeof NormalAcquisitionConditionResponseSchema
>

export const LotteryAcquisitionConditionResponseSchema = v.intersect([
  AcquisitionConditionResponseSchema,
  v.partial(
    v.object({
      lotteryProbability: v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
      ),
      maxAcquireCount: v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
      ),
    }),
  ),
])

export type LotteryAcquisitionConditionResponseSchema = v.InferOutput<
  typeof LotteryAcquisitionConditionResponseSchema
>

export const ReferralAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type ReferralAcquisitionConditionResponseSchema = v.InferOutput<
  typeof ReferralAcquisitionConditionResponseSchema
>

export const CashBackPriceInfoResponseSchema = v.object({ type: v.string() })

export type CashBackPriceInfoResponseSchema = v.InferOutput<typeof CashBackPriceInfoResponseSchema>

export const CouponCashBackRewardResponseSchema = v.intersect([
  CouponRewardResponseSchema,
  v.partial(v.object({ priceInfo: CashBackPriceInfoResponseSchema })),
])

export type CouponCashBackRewardResponseSchema = v.InferOutput<
  typeof CouponCashBackRewardResponseSchema
>

export const DiscountPriceInfoResponseSchema = v.object({ type: v.string() })

export type DiscountPriceInfoResponseSchema = v.InferOutput<typeof DiscountPriceInfoResponseSchema>

export const CouponDiscountRewardResponseSchema = v.intersect([
  CouponRewardResponseSchema,
  v.partial(v.object({ priceInfo: DiscountPriceInfoResponseSchema })),
])

export type CouponDiscountRewardResponseSchema = v.InferOutput<
  typeof CouponDiscountRewardResponseSchema
>

export const CouponFreeRewardResponseSchema = CouponRewardResponseSchema

export type CouponFreeRewardResponseSchema = v.InferOutput<typeof CouponFreeRewardResponseSchema>

export const CouponGiftRewardResponseSchema = CouponRewardResponseSchema

export type CouponGiftRewardResponseSchema = v.InferOutput<typeof CouponGiftRewardResponseSchema>

export const CouponOthersRewardResponseSchema = CouponRewardResponseSchema

export type CouponOthersRewardResponseSchema = v.InferOutput<
  typeof CouponOthersRewardResponseSchema
>

export const CashBackFixedPriceInfoResponseSchema = v.intersect([
  CashBackPriceInfoResponseSchema,
  v.partial(
    v.object({
      currency: v.pipe(
        v.picklist(['JPY', 'THB', 'TWD']),
        v.description('Currency code (e.g., JPY, THB, TWD).'),
      ),
      fixedAmount: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  ),
])

export type CashBackFixedPriceInfoResponseSchema = v.InferOutput<
  typeof CashBackFixedPriceInfoResponseSchema
>

export const CashBackPercentagePriceInfoResponseSchema = v.intersect([
  CashBackPriceInfoResponseSchema,
  v.partial(
    v.object({
      percentage: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    }),
  ),
])

export type CashBackPercentagePriceInfoResponseSchema = v.InferOutput<
  typeof CashBackPercentagePriceInfoResponseSchema
>

export const DiscountFixedPriceInfoResponseSchema = v.intersect([
  DiscountPriceInfoResponseSchema,
  v.partial(
    v.object({
      currency: v.pipe(
        v.picklist(['JPY', 'THB', 'TWD']),
        v.description('Currency code (e.g., JPY, THB, TWD).'),
      ),
      fixedAmount: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  ),
])

export type DiscountFixedPriceInfoResponseSchema = v.InferOutput<
  typeof DiscountFixedPriceInfoResponseSchema
>

export const DiscountPercentagePriceInfoResponseSchema = v.intersect([
  DiscountPriceInfoResponseSchema,
  v.partial(
    v.object({
      percentage: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    }),
  ),
])

export type DiscountPercentagePriceInfoResponseSchema = v.InferOutput<
  typeof DiscountPercentagePriceInfoResponseSchema
>

export const DiscountExplicitPriceInfoResponseSchema = v.intersect([
  DiscountPriceInfoResponseSchema,
  v.partial(
    v.object({
      currency: v.pipe(
        v.picklist(['JPY', 'THB', 'TWD']),
        v.description('Currency code (e.g., JPY, THB, TWD).'),
      ),
      priceAfterDiscount: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      originalPrice: v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  ),
])

export type DiscountExplicitPriceInfoResponseSchema = v.InferOutput<
  typeof DiscountExplicitPriceInfoResponseSchema
>

export const CouponListResponseSchema = v.pipe(
  v.object({
    couponId: v.pipe(v.string(), v.description('Unique identifier of the coupon.')),
    title: v.pipe(v.string(), v.description('Title of the coupon. Displayed in the coupon list.')),
  }),
  v.description('Summary information about a coupon, used in coupon lists.'),
)

export type CouponListResponseSchema = v.InferOutput<typeof CouponListResponseSchema>

export const MessagingApiPagerCouponListResponseSchema = v.pipe(
  v.object({
    items: v.pipe(
      v.array(CouponListResponseSchema),
      v.description('List of coupon summary objects.'),
    ),
    next: v.optional(
      v.pipe(v.string(), v.description('Token for fetching the next page of results.')),
    ),
  }),
  v.description('Paginated response object containing a list of coupons.'),
)

export type MessagingApiPagerCouponListResponseSchema = v.InferOutput<
  typeof MessagingApiPagerCouponListResponseSchema
>

export const ShowLoadingAnimationRequestSchema = v.pipe(
  v.object({
    chatId: v.pipe(
      v.string(),
      v.description(
        'User ID of the target user for whom the loading animation is to be displayed.',
      ),
    ),
    loadingSeconds: v.optional(
      v.pipe(
        v.pipe(
          v.number(),
          v.integer(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.minValue(5),
          v.maxValue(60),
        ),
        v.description(
          'The number of seconds to display the loading indicator.\nIt must be a multiple of 5. The maximum value is 60 seconds.\n',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-request-body',
    },
  }),
)

export type ShowLoadingAnimationRequestSchema = v.InferOutput<
  typeof ShowLoadingAnimationRequestSchema
>

export const ShowLoadingAnimationResponseSchema = v.pipe(
  v.object({}),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-response',
    },
  }),
)

export type ShowLoadingAnimationResponseSchema = v.InferOutput<
  typeof ShowLoadingAnimationResponseSchema
>

export const MarkMessagesAsReadByTokenRequestSchema = v.pipe(
  v.object({
    markAsReadToken: v.pipe(v.string(), v.description('Token used to mark messages as read.')),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#mark-as-read-request-body',
    },
  }),
)

export type MarkMessagesAsReadByTokenRequestSchema = v.InferOutput<
  typeof MarkMessagesAsReadByTokenRequestSchema
>

export const ErrorDetailSchema = v.partial(
  v.object({
    message: v.pipe(
      v.string(),
      v.description('Details of the error. Not included in the response under certain situations.'),
    ),
    property: v.pipe(
      v.string(),
      v.description(
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
      ),
    ),
  }),
)

export type ErrorDetailSchema = v.InferOutput<typeof ErrorDetailSchema>

export const ErrorResponseSchema = v.pipe(
  v.object({
    message: v.pipe(v.string(), v.description('Message containing information about the error.')),
    details: v.optional(
      v.pipe(
        v.array(ErrorDetailSchema),
        v.description(
          'An array of error details. If the array is empty, this property will not be included in the response.',
        ),
      ),
    ),
    sentMessages: v.optional(
      v.pipe(
        v.pipe(v.array(SentMessageSchema), v.minLength(1), v.maxLength(5)),
        v.description('Array of sent messages.'),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  }),
)

export type ErrorResponseSchema = v.InferOutput<typeof ErrorResponseSchema>
