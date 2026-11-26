import { t } from 'elysia'

export const GetWebhookEndpointResponseSchema = t.Object(
  {
    endpoint: t.String({ format: 'uri', description: 'Webhook URL' }),
    active: t.Boolean({
      description:
        'Webhook usage status. Send a webhook event from the LINE Platform to the webhook URL only if enabled.\n\n`true`: Webhook usage is enabled.\n`false`: Webhook usage is disabled.\n',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information',
    },
  },
)

export const SetWebhookEndpointRequestSchema = t.Object(
  {
    endpoint: t.String({
      format: 'uri',
      minLength: 0,
      maxLength: 500,
      description: 'A valid webhook URL.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url',
    },
  },
)

export const TestWebhookEndpointRequestSchema = t.Object(
  {
    endpoint: t.Optional(
      t.String({
        format: 'uri',
        minLength: 0,
        maxLength: 500,
        description: 'A webhook URL to be validated.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  },
)

export const TestWebhookEndpointResponseSchema = t.Object(
  {
    success: t.Optional(
      t.Boolean({
        description: 'Result of the communication from the LINE platform to the webhook URL.',
      }),
    ),
    timestamp: t.Date({
      description:
        'Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered.\n',
    }),
    statusCode: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description:
        "The HTTP status code. If the webhook response isn't received, the status code is set to zero or a negative number.",
    }),
    reason: t.String({ description: 'Reason for the response.' }),
    detail: t.String({ description: 'Details of the response.' }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  },
)

export const GetMessageContentTranscodingResponseSchema = t.Object(
  {
    status: t.UnionEnum(['processing', 'succeeded', 'failed'], {
      description:
        'The preparation status. One of:\n\n`processing`: Preparing to get content.\n`succeeded`: Ready to get the content. You can get the content sent by users.\n`failed`: Failed to prepare to get the content.\n',
      default: undefined,
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status',
    },
    description: 'Transcoding response',
  },
)

export const ActionSchema = t.Object(
  {
    type: t.Optional(t.String({ description: 'Type of action' })),
    label: t.Optional(t.String({ description: 'Label for the action.' })),
  },
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#action-objects' },
    description: 'Action',
  },
)

export const QuickReplyItemSchema = t.Object(
  {
    imageUrl: t.Optional(
      t.String({
        format: 'uri',
        maxLength: 2000,
        description: 'URL of the icon that is displayed at the beginning of the button',
      }),
    ),
    action: t.Optional(ActionSchema),
    type: t.Optional(t.String({ description: '`action`', default: 'action' })),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' } },
)

export const QuickReplySchema = t.Object(
  {
    items: t.Optional(
      t.Array(QuickReplyItemSchema, { maxItems: 13, description: 'Quick reply button objects.' }),
    ),
  },
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' },
    description: 'Quick reply',
  },
)

export const SenderSchema = t.Object(
  {
    name: t.Optional(
      t.String({
        maxLength: 20,
        description: 'Display name. Certain words such as `LINE` may not be used.',
      }),
    ),
    iconUrl: t.Optional(
      t.String({
        format: 'uri',
        maxLength: 2000,
        description: 'URL of the image to display as an icon when sending a message',
      }),
    ),
  },
  { description: 'Change icon and display name' },
)

export const MessageSchema = t.Object(
  {
    type: t.String({ description: 'Type of message' }),
    quickReply: t.Optional(QuickReplySchema),
    sender: t.Optional(SenderSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#message-common-properties',
    },
  },
)

export const NotificationDisabledSchema = t.Boolean({
  description:
    '`true`: The user doesn’t receive a push notification when a message is sent.\n`false`: The user receives a push notification when the message is sent (unless they have disabled push notifications in LINE and/or their device).\nThe default value is false.\n',
  default: false,
})

export const ReplyMessageRequestSchema = t.Object(
  {
    replyToken: t.String({ description: 'replyToken received via webhook.' }),
    messages: t.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of messages.',
    }),
    notificationDisabled: t.Optional(NotificationDisabledSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message',
    },
  },
)

export const SentMessageSchema = t.Object({
  id: t.String({ description: 'ID of the sent message.' }),
  quoteToken: t.Optional(
    t.String({
      description:
        'Quote token of the message. Only included when a message object that can be specified as a quote target was sent as a push or reply message.\n',
    }),
  ),
})

export const ReplyMessageResponseSchema = t.Object(
  {
    sentMessages: t.Array(SentMessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Array of sent messages.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message-response',
    },
  },
)

export const PushMessageRequestSchema = t.Object(
  {
    to: t.String({ description: 'ID of the receiver.' }),
    messages: t.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of Message objects.',
    }),
    notificationDisabled: t.Optional(NotificationDisabledSchema),
    customAggregationUnits: t.Optional(
      t.Array(t.String(), {
        description:
          'List of aggregation unit name. Case-sensitive.\nThis functions can only be used by corporate users who have submitted the required applications.\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message',
    },
  },
)

export const PushMessageResponseSchema = t.Object(
  {
    sentMessages: t.Array(SentMessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Array of sent messages.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message-response',
    },
  },
)

export const MulticastRequestSchema = t.Object(
  {
    messages: t.Array(MessageSchema, { minItems: 1, maxItems: 5, description: 'Messages to send' }),
    to: t.Array(t.String(), {
      minItems: 1,
      maxItems: 500,
      description:
        'Array of user IDs. Use userId values which are returned in webhook event objects. Do not use LINE IDs found on LINE.',
    }),
    notificationDisabled: t.Optional(NotificationDisabledSchema),
    customAggregationUnits: t.Optional(
      t.Array(t.String({ pattern: '^[a-zA-Z0-9_]{1,30}$', minLength: 1, maxLength: 30 }), {
        maxItems: 1,
        description: 'Name of aggregation unit. Case-sensitive.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-message',
    },
  },
)

export const MulticastResponseSchema = t.Object(
  {},
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-response',
    },
  },
)

export const RecipientSchema = t.Object(
  { type: t.Optional(t.String({ description: 'Type of recipient' })) },
  { description: 'Recipient' },
)

export const DemographicFilterSchema = t.Object(
  { type: t.Optional(t.String({ description: 'Type of demographic filter' })) },
  { description: 'Demographic filter' },
)

export const FilterSchema = t.Object(
  { demographic: t.Optional(DemographicFilterSchema) },
  { description: 'Filter for narrowcast' },
)

export const LimitSchema = t.Object(
  {
    max: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: 1,
        maximum: 2147483647,
        description:
          'The maximum number of narrowcast messages to send.\nUse this parameter to limit the number of narrowcast messages sent.\nThe recipients will be chosen at random.\n',
      }),
    ),
    upToRemainingQuota: t.Optional(
      t.Boolean({
        description:
          'If true, the message will be sent within the maximum number of deliverable messages. The default value is `false`.\n\nTargets will be selected at random.\n',
        default: false,
      }),
    ),
    forbidPartialDelivery: t.Optional(
      t.Boolean({
        description:
          'This option prevents messages from being delivered to only a subset of the target audience.\nIf true, the narrowcast request success but fails asynchronously.\nYou can check whether message delivery was canceled by retrieving the narrowcast message progress.\n\nThis property can be set to true only if upToRemainingQuota is set to true.\n',
        default: false,
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
    description: 'Limit of the Narrowcast',
  },
)

export const NarrowcastRequestSchema = t.Object(
  {
    messages: t.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of Message objects.',
    }),
    recipient: t.Optional(RecipientSchema),
    filter: t.Optional(FilterSchema),
    limit: t.Optional(LimitSchema),
    notificationDisabled: t.Optional(NotificationDisabledSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  },
)

export const NarrowcastResponseSchema = t.Object(
  {},
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-response',
    },
  },
)

export const OperatorRecipientSchema = t.Intersect([
  RecipientSchema,
  t.Object({
    and: t.Optional(
      t.Array(RecipientSchema, {
        description:
          'Create a new recipient object by taking the logical conjunction (AND) of the specified array of recipient objects.\n',
      }),
    ),
    or: t.Optional(
      t.Array(RecipientSchema, {
        description:
          'Create a new recipient object by taking the logical disjunction (OR) of the specified array of recipient objects.\n',
      }),
    ),
    not: t.Optional(RecipientSchema),
  }),
])

export const AudienceRecipientSchema = t.Intersect([
  RecipientSchema,
  t.Object({
    audienceGroupId: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
  }),
])

export const RedeliveryRecipientSchema = t.Intersect([
  RecipientSchema,
  t.Object({ requestId: t.Optional(t.String()) }),
])

export const AgeDemographicSchema = t.UnionEnum(
  [
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
  ],
  { default: undefined },
)

export const AgeDemographicFilterSchema = t.Intersect([
  DemographicFilterSchema,
  t.Object({ gte: t.Optional(AgeDemographicSchema), lt: t.Optional(AgeDemographicSchema) }),
])

export const AppTypeDemographicSchema = t.UnionEnum(['ios', 'android'], { default: undefined })

export const AppTypeDemographicFilterSchema = t.Intersect([
  DemographicFilterSchema,
  t.Object({ oneOf: t.Optional(t.Array(AppTypeDemographicSchema)) }),
])

export const AreaDemographicSchema = t.UnionEnum(
  [
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
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
    default: undefined,
  },
)

export const AreaDemographicFilterSchema = t.Intersect([
  DemographicFilterSchema,
  t.Object({ oneOf: t.Optional(t.Array(AreaDemographicSchema)) }),
])

export const GenderDemographicSchema = t.UnionEnum(['male', 'female'], { default: undefined })

export const GenderDemographicFilterSchema = t.Intersect([
  DemographicFilterSchema,
  t.Object({ oneOf: t.Optional(t.Array(GenderDemographicSchema)) }),
])

export const OperatorDemographicFilterSchema = t.Intersect([
  DemographicFilterSchema,
  t.Object({
    and: t.Optional(t.Array(DemographicFilterSchema)),
    or: t.Optional(t.Array(DemographicFilterSchema)),
    not: t.Optional(DemographicFilterSchema),
  }),
])

export const SubscriptionPeriodDemographicSchema = t.UnionEnum(
  ['day_7', 'day_30', 'day_90', 'day_180', 'day_365'],
  { default: undefined },
)

export const SubscriptionPeriodDemographicFilterSchema = t.Intersect([
  DemographicFilterSchema,
  t.Object({
    gte: t.Optional(SubscriptionPeriodDemographicSchema),
    lt: t.Optional(SubscriptionPeriodDemographicSchema),
  }),
])

export const NarrowcastProgressResponseSchema = t.Object(
  {
    phase: t.UnionEnum(['waiting', 'sending', 'succeeded', 'failed'], {
      description:
        'The current status. One of:\n\n`waiting`: Messages are not yet ready to be sent. They are currently being filtered or processed in some way.\n`sending`: Messages are currently being sent.\n`succeeded`: Messages were sent successfully. This may not mean the messages were successfully received.\n`failed`: Messages failed to be sent. Use the failedDescription property to find the cause of the failure.\n',
      default: undefined,
    }),
    successCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The number of users who successfully received the message.',
      }),
    ),
    failureCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The number of users who failed to send the message.',
      }),
    ),
    targetCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The number of intended recipients of the message.',
      }),
    ),
    failedDescription: t.Optional(
      t.String({
        description:
          'The reason the message failed to be sent. This is only included with a `phase` property value of `failed`.',
      }),
    ),
    errorCode: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          "Error summary. This is only included with a phase property value of failed.\nOne of:\n\n`1`: An internal error occurred.\n`2`: An error occurred because there weren't enough recipients.\n`3`: A conflict error of requests occurs because a request that has already been accepted is retried.\n`4`: An audience of less than 50 recipients is included as a condition of sending.\n`5`: Message delivery has been canceled to prevent messages from being delivered only to a subset of the target audience.\n",
      }),
    ),
    acceptedTime: t.Date({
      description:
        'Narrowcast message request accepted time in milliseconds.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
    }),
    completedTime: t.Optional(
      t.Date({
        description:
          'Processing of narrowcast message request completion time in milliseconds. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status',
    },
  },
)

export const BroadcastRequestSchema = t.Object(
  {
    messages: t.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'List of Message objects.',
    }),
    notificationDisabled: t.Optional(NotificationDisabledSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message',
    },
  },
)

export const BroadcastResponseSchema = t.Object(
  {},
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-response',
    },
  },
)

export const QuotaTypeSchema = t.UnionEnum(['none', 'limited'], {
  externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
  description: 'One of the following values to indicate whether a target limit is set or not.',
  default: undefined,
})

export const MessageQuotaResponseSchema = t.Object(
  {
    type: QuotaTypeSchema,
    value: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'The target limit for sending messages in the current month. This property is returned when the `type` property has a value of `limited`.\n',
      }),
    ),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' } },
)

export const QuotaConsumptionResponseSchema = t.Object(
  {
    totalUsage: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'The number of sent messages in the current month',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-consumption',
    },
  },
)

export const NumberOfMessagesResponseSchema = t.Object({
  status: t.UnionEnum(['ready', 'unready', 'unavailable_for_privacy', 'out_of_service'], {
    description:
      "Aggregation process status. One of:\n\n`ready`: The number of messages can be obtained.\n`unready`: We haven't finished calculating the number of sent messages for the specified in date. For example, this property is returned when the delivery date or a future date is specified. Calculation usually takes about a day.\n`unavailable_for_privacy`: The total number of messages on the specified day is less than 20.\n`out_of_service`: The specified date is earlier than the date on which we first started calculating sent messages (March 31, 2018).\n",
    default: undefined,
  }),
  success: t.Optional(
    t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description:
        'The number of messages delivered using the phone number on the date specified in `date`.\nThe response has this property only when the value of `status` is `ready`.\n\n',
    }),
  ),
})

export const ValidateMessageRequestSchema = t.Object({
  messages: t.Array(MessageSchema, {
    minItems: 1,
    maxItems: 5,
    description: 'Array of message objects to validate',
  }),
})

export const GetAggregationUnitUsageResponseSchema = t.Object(
  {
    numOfCustomAggregationUnits: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Number of aggregation units used this month.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month',
    },
  },
)

export const GetAggregationUnitNameListResponseSchema = t.Object(
  {
    customAggregationUnits: t.Array(t.String(), {
      description: 'An array of strings indicating the names of aggregation units used this month.',
    }),
    next: t.Optional(
      t.String({
        description:
          "A continuation token to get the next array of unit names.\nReturned only when there are remaining aggregation units that weren't returned in customAggregationUnits in the original request.\n\n",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month',
    },
  },
)

export const UserProfileResponseSchema = t.Object(
  {
    displayName: t.String({ description: "User's display name" }),
    userId: t.String({ description: 'User ID' }),
    pictureUrl: t.Optional(
      t.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      }),
    ),
    statusMessage: t.Optional(
      t.String({
        description:
          "User's status message. Not included in the response if the user doesn't have a status message.",
      }),
    ),
    language: t.Optional(
      t.String({
        example: 'en',
        description:
          "User's language, as a BCP 47 language tag. Not included in the response if the user hasn't yet consented to the LINE Privacy Policy.",
      }),
    ),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-profile' } },
)

export const GetFollowersResponseSchema = t.Object(
  {
    userIds: t.Array(t.String(), {
      maxItems: 1000,
      description:
        'An array of strings indicating user IDs of users that have added the LINE Official Account as a friend.\nOnly users of LINE for iOS and LINE for Android are included in `userIds`.\n',
    }),
    next: t.Optional(
      t.String({
        description:
          "A continuation token to get the next array of user IDs.\nReturned only when there are remaining user IDs that weren't returned in `userIds` in the original request.\nThe number of user IDs in the `userIds` element doesn't have to reach the maximum number specified by `limit` for the `next` property to be included in the response.\n\n",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-follower-ids',
    },
  },
)

export const BotInfoResponseSchema = t.Object(
  {
    userId: t.String({ description: "Bot's user ID" }),
    basicId: t.String({ description: "Bot's basic ID" }),
    premiumId: t.Optional(
      t.String({
        description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
      }),
    ),
    displayName: t.String({ description: "Bot's display name" }),
    pictureUrl: t.Optional(
      t.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the bot doesn't have a profile image.",
      }),
    ),
    chatMode: t.UnionEnum(['chat', 'bot'], {
      description:
        'Chat settings set in the LINE Official Account Manager. One of:\n\n`chat`: Chat is set to "On".\n`bot`: Chat is set to "Off".\n',
      default: undefined,
    }),
    markAsReadMode: t.UnionEnum(['auto', 'manual'], {
      description:
        'Automatic read setting for messages. If the chat is set to "Off", auto is returned. If the chat is set to "On", manual is returned.\n\n`auto`: Auto read setting is enabled.\n`manual`: Auto read setting is disabled.\n\n',
      default: undefined,
    }),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-bot-info' } },
)

export const GroupUserProfileResponseSchema = t.Object(
  {
    displayName: t.String({ description: "User's display name" }),
    userId: t.String({ description: 'User ID' }),
    pictureUrl: t.Optional(
      t.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile',
    },
  },
)

export const RoomUserProfileResponseSchema = t.Object(
  {
    displayName: t.String({ description: "User's display name" }),
    userId: t.String({ description: 'User ID' }),
    pictureUrl: t.Optional(
      t.String({
        format: 'uri',
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile',
    },
  },
)

export const MembersIdsResponseSchema = t.Object({
  memberIds: t.Array(t.String(), {
    maxItems: 100,
    description:
      'List of user IDs of members in the group chat. Only users of LINE for iOS and LINE for Android are included in `memberIds`.',
  }),
  next: t.Optional(
    t.String({
      description:
        'A continuation token to get the next array of user IDs of the members in the group chat.\nReturned only when there are remaining user IDs that were not returned in `memberIds` in the original request.\n',
    }),
  ),
})

export const GroupSummaryResponseSchema = t.Object(
  {
    groupId: t.String({ description: 'Group ID' }),
    groupName: t.String({ description: 'Group name' }),
    pictureUrl: t.Optional(
      t.String({
        format: 'uri',
        description:
          "Group icon URL. Not included in the response if the user doesn't set a group profile icon.",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-summary',
    },
  },
)

export const GroupMemberCountResponseSchema = t.Object(
  {
    count: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description:
        'The count of members in the group chat. The number returned excludes the LINE Official Account.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-group-count',
    },
  },
)

export const RoomMemberCountResponseSchema = t.Object(
  {
    count: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description:
        'The count of members in the multi-person chat. The number returned excludes the LINE Official Account.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-room-count',
    },
  },
)

export const RichMenuSizeSchema = t.Object(
  {
    width: t.Optional(
      t.Integer({ format: 'int64', minimum: 1, maximum: 2147483647, description: 'width' }),
    ),
    height: t.Optional(
      t.Integer({ format: 'int64', minimum: 1, maximum: 2147483647, description: 'height' }),
    ),
  },
  { description: 'Rich menu size' },
)

export const RichMenuBoundsSchema = t.Object(
  {
    x: t.Optional(
      t.Integer({
        format: 'int64',
        minimum: 0,
        maximum: 2147483647,
        description: 'Horizontal position relative to the top-left corner of the area.',
      }),
    ),
    y: t.Optional(
      t.Integer({
        format: 'int64',
        minimum: 0,
        maximum: 2147483647,
        description: 'Vertical position relative to the top-left corner of the area.',
      }),
    ),
    width: t.Optional(
      t.Integer({
        format: 'int64',
        minimum: 1,
        maximum: 2147483647,
        description: 'Width of the area.',
      }),
    ),
    height: t.Optional(
      t.Integer({
        format: 'int64',
        minimum: 1,
        maximum: 2147483647,
        description: 'Height of the area.',
      }),
    ),
  },
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#bounds-object' },
    description: 'Rich menu bounds',
  },
)

export const RichMenuAreaSchema = t.Object(
  { bounds: t.Optional(RichMenuBoundsSchema), action: t.Optional(ActionSchema) },
  { description: 'Rich menu area' },
)

export const RichMenuRequestSchema = t.Object({
  size: t.Optional(RichMenuSizeSchema),
  selected: t.Optional(
    t.Boolean({ description: '`true` to display the rich menu by default. Otherwise, `false`.' }),
  ),
  name: t.Optional(
    t.String({
      maxLength: 300,
      description:
        'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
    }),
  ),
  chatBarText: t.Optional(
    t.String({ maxLength: 14, description: 'Text displayed in the chat bar' }),
  ),
  areas: t.Optional(
    t.Array(RichMenuAreaSchema, {
      description: 'Array of area objects which define the coordinates and size of tappable areas',
    }),
  ),
})

export const RichMenuIdResponseSchema = t.Object({
  richMenuId: t.String({ description: 'Rich menu ID' }),
})

export const RichMenuResponseSchema = t.Object(
  {
    richMenuId: t.String({ description: 'ID of a rich menu' }),
    size: RichMenuSizeSchema,
    selected: t.Boolean({
      description: '`true` to display the rich menu by default. Otherwise, `false`.',
    }),
    name: t.String({
      maxLength: 300,
      description:
        'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
    }),
    chatBarText: t.String({ maxLength: 14, description: 'Text displayed in the chat bar' }),
    areas: t.Array(RichMenuAreaSchema, {
      maxItems: 20,
      description: 'Array of area objects which define the coordinates and size of tappable areas',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#rich-menu-response-object',
    },
  },
)

export const RichMenuListResponseSchema = t.Object(
  { richmenus: t.Array(RichMenuResponseSchema, { description: 'Rich menus' }) },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list',
    },
  },
)

export const CreateRichMenuAliasRequestSchema = t.Object(
  {
    richMenuAliasId: t.String({
      pattern: '^[a-z0-9_-]{1,32}$',
      minLength: 1,
      maxLength: 32,
      description: 'Rich menu alias ID, which can be any ID, unique for each channel.',
    }),
    richMenuId: t.String({
      description: 'The rich menu ID to be associated with the rich menu alias.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias',
    },
  },
)

export const RichMenuAliasResponseSchema = t.Object({
  richMenuAliasId: t.String({ description: 'Rich menu alias ID.' }),
  richMenuId: t.String({ description: 'The rich menu ID associated with the rich menu alias.' }),
})

export const UpdateRichMenuAliasRequestSchema = t.Object(
  {
    richMenuId: t.String({
      description: 'The rich menu ID to be associated with the rich menu alias.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias',
    },
  },
)

export const RichMenuAliasListResponseSchema = t.Object(
  { aliases: t.Array(RichMenuAliasResponseSchema, { description: 'Rich menu aliases.' }) },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list',
    },
  },
)

export const RichMenuBulkLinkRequestSchema = t.Object(
  {
    richMenuId: t.String({ description: 'ID of a rich menu' }),
    userIds: t.Array(t.String(), {
      minItems: 1,
      maxItems: 500,
      description:
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-users',
    },
  },
)

export const RichMenuBulkUnlinkRequestSchema = t.Object(
  {
    userIds: t.Array(t.String(), {
      minItems: 1,
      maxItems: 500,
      description:
        'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-users',
    },
  },
)

export const RichMenuBatchOperationSchema = t.Object(
  {
    type: t.String({
      description:
        'The type of operation to the rich menu linked to the user. One of link, unlink, or unlinkAll.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users-operations',
    },
    description:
      'Rich menu operation object represents the batch operation to the rich menu linked to the user.',
  },
)

export const RichMenuBatchRequestSchema = t.Object({
  operations: t.Array(RichMenuBatchOperationSchema, {
    maxItems: 1000,
    description: 'Array of Rich menu operation object...',
  }),
  resumeRequestKey: t.Optional(
    t.String({
      pattern: '^[a-zA-Z0-9_-]{1,100}$',
      minLength: 1,
      maxLength: 100,
      description: 'Key for retry. Key value is a string matching the regular expression pattern',
    }),
  ),
})

export const RichMenuBatchLinkOperationSchema = t.Intersect(
  [
    RichMenuBatchOperationSchema,
    t.Object({ from: t.Optional(t.String()), to: t.Optional(t.String()) }),
  ],
  {
    description:
      'Replace the rich menu with the rich menu specified in the `to` property for all users linked to the rich menu specified in the `from` property.',
  },
)

export const RichMenuBatchUnlinkOperationSchema = t.Intersect(
  [RichMenuBatchOperationSchema, t.Object({ from: t.Optional(t.String()) })],
  {
    description:
      'Unlink the rich menu for all users linked to the rich menu specified in the `from` property.',
  },
)

export const RichMenuBatchUnlinkAllOperationSchema = RichMenuBatchOperationSchema

export const RichMenuBatchProgressPhaseSchema = t.UnionEnum(['ongoing', 'succeeded', 'failed'], {
  description:
    "The current status. One of:\n\n`ongoing`: Rich menu batch control is in progress.\n`succeeded`: Rich menu batch control is complete.\n`failed`: Rich menu batch control failed.\n          This means that the rich menu for one or more users couldn't be controlled.\n          There may also be users whose operations have been successfully completed.\n",
  default: undefined,
})

export const RichMenuBatchProgressResponseSchema = t.Object(
  {
    phase: RichMenuBatchProgressPhaseSchema,
    acceptedTime: t.Date({
      description:
        'The accepted time in milliseconds of the request of batch control the rich menu.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
    }),
    completedTime: t.Optional(
      t.Date({
        description:
          'The completed time in milliseconds of rich menu batch control. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status-response',
    },
  },
)

export const IssueLinkTokenResponseSchema = t.Object(
  {
    linkToken: t.String({
      description:
        'Link token.\nLink tokens are valid for 10 minutes and can only be used once.\n\n',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-link-token',
    },
  },
)

export const ChatReferenceSchema = t.Object(
  { userId: t.String({ description: 'The target user ID' }) },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
    description: 'Chat reference',
  },
)

export const MarkMessagesAsReadRequestSchema = t.Object(
  { chat: ChatReferenceSchema },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  },
)

export const PnpMessagesRequestSchema = t.Object(
  {
    messages: t.Array(MessageSchema, {
      minItems: 1,
      maxItems: 5,
      description: 'Message to be sent.',
    }),
    to: t.String({
      description:
        'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
    }),
    notificationDisabled: t.Optional(NotificationDisabledSchema),
    customAggregationUnits: t.Optional(
      t.Array(t.String({ pattern: '^[a-zA-Z0-9_]{1,30}$', minLength: 1, maxLength: 30 }), {
        maxItems: 1,
        description: 'Name of aggregation unit. Case-sensitive.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message',
    },
  },
)

export const PnpTemplatedEmphasizedItemSchema = t.Object(
  {
    itemKey: t.String({
      description:
        'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
    }),
    content: t.String({
      maxLength: 15,
      description: 'String to be displayed as the value of the item.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
    description: 'Item to emphasize in the message.',
  },
)

export const PnpTemplatedItemSchema = t.Object(
  {
    itemKey: t.String({
      description:
        'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
    }),
    content: t.String({
      maxLength: 300,
      description: 'String to be displayed as the value of the item.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  },
)

export const PnpTemplatedButtonSchema = t.Object(
  {
    buttonKey: t.String({
      description:
        'Specify the key of the button you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#buttons\n',
    }),
    url: t.String({
      maxLength: 1000,
      description: 'URL of the page to be opened when the user presses the button.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-buttons',
    },
  },
)

export const PnpTemplatedMessageBodySchema = t.Object(
  {
    emphasizedItem: t.Optional(PnpTemplatedEmphasizedItemSchema),
    items: t.Optional(
      t.Array(PnpTemplatedItemSchema, {
        maxItems: 15,
        description:
          'Array of items to include in the message. The `itemKey` must be unique across `emphasizedItem` and `items`.',
      }),
    ),
    buttons: t.Optional(
      t.Array(PnpTemplatedButtonSchema, {
        maxItems: 2,
        description: 'Array of buttons to include in the message. The `buttonKey` must be unique.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
    description:
      "The body object of the template you want to send. You can't specify the same item more than once in a single message.",
  },
)

export const PnpTemplatedMessageRequestSchema = t.Object(
  {
    to: t.String({
      description:
        'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
    }),
    templateKey: t.String({
      description:
        'Specify the key of the template you want to send.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#templates\n',
    }),
    body: t.Optional(PnpTemplatedMessageBodySchema),
    customAggregationUnits: t.Optional(
      t.Array(t.String({ pattern: '^[a-zA-Z0-9_]{1,30}$', minLength: 1, maxLength: 30 }), {
        maxItems: 1,
        description:
          'Name of aggregation unit. Case-sensitive.\nFor more information about assigning a unit name, see https://developers.line.biz/en/docs/messaging-api/unit-based-statistics-aggregation/#assign-names-to-units-when-sending-messages\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  },
)

export const EmojiSchema = t.Object({
  index: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  productId: t.Optional(t.String()),
  emojiId: t.Optional(t.String()),
})

export const TextMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      text: t.Optional(t.String()),
      emojis: t.Optional(t.Array(EmojiSchema)),
      quoteToken: t.Optional(
        t.String({ description: 'Quote token of the message you want to quote.' }),
      ),
    }),
  ],
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#text-message' } },
)

export const SubstitutionObjectSchema = t.Object(
  { type: t.String({ description: 'Type of substitution object' }) },
  { description: 'An object that defines the replacement value for a placeholder in the text.' },
)

export const TextMessageV2Schema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      text: t.Optional(t.String()),
      substitution: t.Optional(
        t.Record(t.String(), SubstitutionObjectSchema, {
          description:
            'A mapping that specifies substitutions for parts enclosed in {} within the `text` field.',
        }),
      ),
      quoteToken: t.Optional(
        t.String({ description: 'Quote token of the message you want to quote.' }),
      ),
    }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2',
    },
  },
)

export const MentionTargetSchema = t.Object({
  type: t.String({ description: 'Target to be mentioned' }),
})

export const MentionSubstitutionObjectSchema = t.Intersect(
  [SubstitutionObjectSchema, t.Object({ mentionee: MentionTargetSchema })],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mention-object',
    },
    description: 'An object representing a mention substitution.',
  },
)

export const UserMentionTargetSchema = t.Intersect(
  [MentionTargetSchema, t.Object({ userId: t.String() })],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-user',
    },
  },
)

export const AllMentionTargetSchema = MentionTargetSchema

export const EmojiSubstitutionObjectSchema = t.Intersect(
  [SubstitutionObjectSchema, t.Object({ productId: t.String(), emojiId: t.String() })],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-emoji-object',
    },
    description: 'An object representing a emoji substitution.',
  },
)

export const StickerMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      packageId: t.Optional(t.String()),
      stickerId: t.Optional(t.String()),
      quoteToken: t.Optional(
        t.String({ description: 'Quote token of the message you want to quote.' }),
      ),
    }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#sticker-message',
    },
  },
)

export const ImageMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      originalContentUrl: t.Optional(t.String({ format: 'uri' })),
      previewImageUrl: t.Optional(t.String({ format: 'uri' })),
    }),
  ],
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#image-message' },
  },
)

export const VideoMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      originalContentUrl: t.Optional(t.String({ format: 'uri' })),
      previewImageUrl: t.Optional(t.String({ format: 'uri' })),
      trackingId: t.Optional(t.String()),
    }),
  ],
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#video-message' },
  },
)

export const AudioMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      originalContentUrl: t.Optional(t.String({ format: 'uri' })),
      duration: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
    }),
  ],
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#audio-message' },
  },
)

export const LocationMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      title: t.Optional(t.String()),
      address: t.Optional(t.String()),
      latitude: t.Optional(t.Number({ format: 'double' })),
      longitude: t.Optional(t.Number({ format: 'double' })),
    }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#location-message',
    },
  },
)

export const ImagemapBaseSizeSchema = t.Object({
  height: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  width: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const ImagemapAreaSchema = t.Object({
  x: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  y: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  width: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  height: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const ImagemapActionSchema = t.Object(
  { type: t.String(), area: ImagemapAreaSchema },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-action-objects',
    },
  },
)

export const ImagemapExternalLinkSchema = t.Object({
  linkUri: t.Optional(t.String({ format: 'uri' })),
  label: t.Optional(t.String()),
})

export const ImagemapVideoSchema = t.Object({
  originalContentUrl: t.Optional(t.String({ format: 'uri' })),
  previewImageUrl: t.Optional(t.String({ format: 'uri' })),
  area: t.Optional(ImagemapAreaSchema),
  externalLink: t.Optional(ImagemapExternalLinkSchema),
})

export const ImagemapMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      baseUrl: t.Optional(t.String({ format: 'uri' })),
      altText: t.Optional(t.String()),
      baseSize: t.Optional(ImagemapBaseSizeSchema),
      actions: t.Optional(t.Array(ImagemapActionSchema)),
      video: t.Optional(ImagemapVideoSchema),
    }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-message',
    },
  },
)

export const MessageImagemapActionSchema = t.Intersect([
  ImagemapActionSchema,
  t.Object({ text: t.Optional(t.String()), label: t.Optional(t.String()) }),
])

export const URIImagemapActionSchema = t.Intersect([
  ImagemapActionSchema,
  t.Object({ linkUri: t.Optional(t.String()), label: t.Optional(t.String()) }),
])

export const ClipboardImagemapActionSchema = t.Intersect(
  [
    ImagemapActionSchema,
    t.Object({
      clipboardText: t.Optional(
        t.String({
          minLength: 1,
          maxLength: 1000,
          description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n',
        }),
      ),
      label: t.Optional(t.String()),
    }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-clipboard-action-object',
    },
  },
)

export const TemplateSchema = t.Object({ type: t.String() })

export const TemplateMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({ altText: t.Optional(t.String()), template: t.Optional(TemplateSchema) }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#template-messages',
    },
  },
)

export const ButtonsTemplateSchema = t.Intersect([
  TemplateSchema,
  t.Object({
    thumbnailImageUrl: t.Optional(t.String({ format: 'uri' })),
    imageAspectRatio: t.Optional(t.String()),
    imageSize: t.Optional(t.String()),
    imageBackgroundColor: t.Optional(t.String()),
    title: t.Optional(t.String()),
    text: t.Optional(t.String()),
    defaultAction: t.Optional(ActionSchema),
    actions: t.Optional(t.Array(ActionSchema)),
  }),
])

export const TemplateImageAspectRatioSchema = t.UnionEnum(['rectangle', 'square'], {
  description:
    'Aspect ratio of the image. This is only for the `imageAspectRatio` in ButtonsTemplate.\nSpecify one of the following values:\n\n`rectangle`: 1.51:1\n`square`: 1:1\n',
  default: undefined,
})

export const TemplateImageSizeSchema = t.UnionEnum(['cover', 'contain'], {
  description:
    'Size of the image.  This is only for the `imageSize` in ButtonsTemplate.\nSpecify one of the following values:\n\n`cover`: The image fills the entire image area. Parts of the image that do not fit in the area are not displayed.\n`contain`: The entire image is displayed in the image area. A background is displayed in the unused areas to the left and right of vertical images and in the areas above and below horizontal images.\n',
  default: undefined,
})

export const ConfirmTemplateSchema = t.Intersect([
  TemplateSchema,
  t.Object({ text: t.Optional(t.String()), actions: t.Optional(t.Array(ActionSchema)) }),
])

export const CarouselColumnSchema = t.Object(
  {
    thumbnailImageUrl: t.Optional(t.String({ format: 'uri' })),
    imageBackgroundColor: t.Optional(t.String()),
    title: t.Optional(t.String()),
    text: t.String(),
    defaultAction: t.Optional(ActionSchema),
    actions: t.Array(ActionSchema),
  },
  { description: 'Column object for carousel template.' },
)

export const CarouselTemplateSchema = t.Intersect([
  TemplateSchema,
  t.Object({
    columns: t.Optional(t.Array(CarouselColumnSchema)),
    imageAspectRatio: t.Optional(t.String()),
    imageSize: t.Optional(t.String()),
  }),
])

export const ImageCarouselColumnSchema = t.Object({
  imageUrl: t.String({ format: 'uri' }),
  action: ActionSchema,
})

export const ImageCarouselTemplateSchema = t.Intersect([
  TemplateSchema,
  t.Object({ columns: t.Optional(t.Array(ImageCarouselColumnSchema)) }),
])

export const CouponMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({
      couponId: t.Optional(t.String({ description: 'Unique identifier of the coupon.' })),
      deliveryTag: t.Optional(
        t.String({
          maxLength: 30,
          description:
            'Delivery route tag information. It can be used for analysis in LINE OA Manager.',
        }),
      ),
    }),
  ],
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#coupon-message' },
  },
)

export const FlexContainerSchema = t.Object({ type: t.String() })

export const FlexMessageSchema = t.Intersect(
  [
    MessageSchema,
    t.Object({ altText: t.Optional(t.String()), contents: t.Optional(FlexContainerSchema) }),
  ],
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#flex-message' } },
)

export const FlexBlockStyleSchema = t.Object({
  backgroundColor: t.Optional(t.String()),
  separator: t.Optional(t.Boolean()),
  separatorColor: t.Optional(t.String()),
})

export const FlexBubbleStylesSchema = t.Object({
  header: t.Optional(FlexBlockStyleSchema),
  hero: t.Optional(FlexBlockStyleSchema),
  body: t.Optional(FlexBlockStyleSchema),
  footer: t.Optional(FlexBlockStyleSchema),
})

export const FlexComponentSchema = t.Object({ type: t.String() })

export const FlexBoxBackgroundSchema = t.Object({ type: t.String() })

export const FlexBoxSchema = t.Intersect([
  FlexComponentSchema,
  t.Object({
    layout: t.Optional(t.UnionEnum(['horizontal', 'vertical', 'baseline'], { default: undefined })),
    flex: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
    contents: t.Optional(t.Array(FlexComponentSchema)),
    spacing: t.Optional(t.String()),
    margin: t.Optional(t.String()),
    position: t.Optional(t.UnionEnum(['relative', 'absolute'], { default: undefined })),
    offsetTop: t.Optional(t.String()),
    offsetBottom: t.Optional(t.String()),
    offsetStart: t.Optional(t.String()),
    offsetEnd: t.Optional(t.String()),
    backgroundColor: t.Optional(t.String()),
    borderColor: t.Optional(t.String()),
    borderWidth: t.Optional(t.String()),
    cornerRadius: t.Optional(t.String()),
    width: t.Optional(t.String()),
    maxWidth: t.Optional(t.String()),
    height: t.Optional(t.String()),
    maxHeight: t.Optional(t.String()),
    paddingAll: t.Optional(t.String()),
    paddingTop: t.Optional(t.String()),
    paddingBottom: t.Optional(t.String()),
    paddingStart: t.Optional(t.String()),
    paddingEnd: t.Optional(t.String()),
    action: t.Optional(ActionSchema),
    justifyContent: t.Optional(
      t.UnionEnum(
        ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
        { default: undefined },
      ),
    ),
    alignItems: t.Optional(
      t.UnionEnum(['center', 'flex-start', 'flex-end'], { default: undefined }),
    ),
    background: t.Optional(FlexBoxBackgroundSchema),
  }),
])

export const FlexBubbleSchema = t.Intersect([
  FlexContainerSchema,
  t.Object({
    direction: t.Optional(t.UnionEnum(['ltr', 'rtl'], { default: undefined })),
    styles: t.Optional(FlexBubbleStylesSchema),
    header: t.Optional(FlexBoxSchema),
    hero: t.Optional(FlexComponentSchema),
    body: t.Optional(FlexBoxSchema),
    footer: t.Optional(FlexBoxSchema),
    size: t.Optional(
      t.UnionEnum(['nano', 'micro', 'deca', 'hecto', 'kilo', 'mega', 'giga'], {
        default: undefined,
      }),
    ),
    action: t.Optional(ActionSchema),
  }),
])

export const FlexCarouselSchema = t.Intersect([
  FlexContainerSchema,
  t.Object({ contents: t.Optional(t.Array(FlexBubbleSchema)) }),
])

export const FlexBoxBorderWidthSchema = t.UnionEnum(
  ['none', 'light', 'normal', 'medium', 'semi-bold', 'bold'],
  {
    description:
      'Width of box border. This is only for `borderWidth` in FlexBox.\nA value of none means that borders are not rendered; the other values are listed in order of increasing width.\n',
    default: undefined,
  },
)

export const FlexBoxCornerRadiusSchema = t.UnionEnum(
  ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
  {
    description:
      'Radius at the time of rounding the corners of the box. This is only for `cornerRadius` in FlexBox.\nA value of none means that corners are not rounded; the other values are listed in order of increasing radius.\n',
    default: undefined,
  },
)

export const FlexBoxSpacingSchema = t.UnionEnum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'], {
  description:
    'You can specify the minimum space between two components with the `spacing` property of the parent box component, in pixels or with a keyword.\nFlexBoxSpacing just provides only keywords.\n',
  default: undefined,
})

export const FlexMarginSchema = t.UnionEnum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'], {
  description:
    'You can specify the minimum space before a child component with the `margin` property of the child component, in pixels or with a keyword.\nFlexMargin just provides only keywords.\n',
  default: undefined,
})

export const FlexBoxPaddingSchema = t.UnionEnum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'], {
  description:
    'Padding can be specified in pixels, percentage (to the parent box width) or with a keyword.\nFlexBoxPadding just provides only keywords.\n',
  default: undefined,
})

export const FlexImageSizeSchema = t.UnionEnum(
  ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl', 'full'],
  {
    description:
      'You can set the width of an Flex image component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexImageSize just provides only keywords.\n',
    default: undefined,
  },
)

export const FlexIconSizeSchema = t.UnionEnum(
  ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl'],
  {
    description:
      'You can set the width of an Flex icon component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexIconSize just provides only keywords.\n',
    default: undefined,
  },
)

export const FlexTextFontSizeSchema = t.UnionEnum(
  ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl'],
  {
    description:
      'Font size in the `size` property of the Flex text component.\nYou can specify the size in pixels or with a keyword.\nFlexTextFontSize just provides only keywords.\n',
    default: undefined,
  },
)

export const FlexSpanSizeSchema = t.UnionEnum(
  ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl'],
  {
    description:
      'Font size in the `size` property of the Flex span component.\nYou can specify the size in pixels or with a keyword.\nFlexSpanSize just provides only keywords.\n',
    default: undefined,
  },
)

export const FlexOffsetSchema = t.UnionEnum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'], {
  description:
    'You can specify the offset of a component with the `offset*` property, in pixels or with a keyword.\nYou can also specify the percentage to the box width for `offsetStart` and `offsetEnd` and to the box height for `offsetTop` and `offsetBottom`.\nFlexOffset just provides only keywords.\n',
  default: undefined,
})

export const FlexButtonSchema = t.Intersect([
  FlexComponentSchema,
  t.Object({
    flex: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
    color: t.Optional(t.String()),
    style: t.Optional(t.UnionEnum(['primary', 'secondary', 'link'], { default: undefined })),
    action: t.Optional(ActionSchema),
    gravity: t.Optional(t.UnionEnum(['top', 'bottom', 'center'], { default: undefined })),
    margin: t.Optional(t.String()),
    position: t.Optional(t.UnionEnum(['relative', 'absolute'], { default: undefined })),
    offsetTop: t.Optional(t.String()),
    offsetBottom: t.Optional(t.String()),
    offsetStart: t.Optional(t.String()),
    offsetEnd: t.Optional(t.String()),
    height: t.Optional(t.UnionEnum(['md', 'sm'], { default: undefined })),
    adjustMode: t.Optional(t.Literal('shrink-to-fit')),
    scaling: t.Optional(t.Boolean()),
  }),
])

export const FlexImageSchema = t.Intersect(
  [
    FlexComponentSchema,
    t.Object({
      url: t.Optional(
        t.String({
          format: 'uri',
          description:
            'Image URL (Max character limit: 2000)\nProtocol: HTTPS (TLS 1.2 or later)\nImage format: JPEG or PNG\nMaximum image size: 1024×1024 pixels\nMaximum file size: 10 MB (300 KB when the animated property is true)\n',
        }),
      ),
      flex: t.Optional(
        t.Integer({
          format: 'int32',
          minimum: -2147483648,
          maximum: 2147483647,
          description: 'The ratio of the width or height of this component within the parent box.',
        }),
      ),
      margin: t.Optional(
        t.String({
          description:
            'The minimum amount of space to include before this component in its parent container.\n',
        }),
      ),
      position: t.Optional(
        t.UnionEnum(['relative', 'absolute'], {
          description:
            'Reference for offsetTop, offsetBottom, offsetStart, and offsetEnd. Specify one of the following values:\n\n`relative`: Use the previous box as reference.\n`absolute`: Use the top left of parent element as reference. The default value is relative.\n',
          default: undefined,
        }),
      ),
      offsetTop: t.Optional(t.String({ description: 'Offset.' })),
      offsetBottom: t.Optional(t.String({ description: 'Offset.' })),
      offsetStart: t.Optional(t.String({ description: 'Offset.' })),
      offsetEnd: t.Optional(t.String({ description: 'Offset.' })),
      align: t.Optional(
        t.UnionEnum(['start', 'end', 'center'], {
          description: 'Alignment style in horizontal direction.\n',
          default: undefined,
        }),
      ),
      gravity: t.Optional(
        t.UnionEnum(['top', 'bottom', 'center'], {
          description: 'Alignment style in vertical direction.',
          default: undefined,
        }),
      ),
      size: t.Optional(
        t.String({
          description: 'The maximum image width. This is md by default.\n',
          default: 'md',
        }),
      ),
      aspectRatio: t.Optional(
        t.String({
          description:
            'Aspect ratio of the image.\n`{width}:{height}` format.\nSpecify the value of `{width}` and `{height}` in the range from `1` to `100000`.\nHowever, you cannot set `{height}` to a value that is more than three times the value of `{width}`.\nThe default value is `1:1`.\n',
        }),
      ),
      aspectMode: t.Optional(
        t.UnionEnum(['fit', 'cover'], {
          description:
            'The display style of the image if the aspect ratio of the image and that specified by the aspectRatio property do not match.\n',
          default: undefined,
        }),
      ),
      backgroundColor: t.Optional(
        t.String({ description: 'Background color of the image. Use a hexadecimal color code.' }),
      ),
      action: t.Optional(ActionSchema),
      animated: t.Optional(
        t.Boolean({
          description:
            "When this is `true`, an animated image (APNG) plays.\nYou can specify a value of true up to 10 images in a single message.\nYou can't send messages that exceed this limit.\nThis is `false` by default.\nAnimated images larger than 300 KB aren't played back.\n",
          default: false,
        }),
      ),
    }),
  ],
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#f-image' } },
)

export const FlexVideoSchema = t.Intersect([
  FlexComponentSchema,
  t.Object({
    url: t.Optional(t.String({ format: 'uri' })),
    previewUrl: t.Optional(t.String({ format: 'uri' })),
    altContent: t.Optional(FlexComponentSchema),
    aspectRatio: t.Optional(t.String()),
    action: t.Optional(ActionSchema),
  }),
])

export const FlexIconSchema = t.Intersect(
  [
    FlexComponentSchema,
    t.Object({
      url: t.Optional(t.String({ format: 'uri' })),
      size: t.Optional(t.String()),
      aspectRatio: t.Optional(t.String()),
      margin: t.Optional(t.String()),
      position: t.Optional(t.UnionEnum(['relative', 'absolute'], { default: undefined })),
      offsetTop: t.Optional(t.String()),
      offsetBottom: t.Optional(t.String()),
      offsetStart: t.Optional(t.String()),
      offsetEnd: t.Optional(t.String()),
      scaling: t.Optional(t.Boolean()),
    }),
  ],
  { externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#icon' } },
)

export const FlexSpanSchema = t.Intersect([
  FlexComponentSchema,
  t.Object({
    text: t.Optional(t.String()),
    size: t.Optional(t.String()),
    color: t.Optional(t.String()),
    weight: t.Optional(t.UnionEnum(['regular', 'bold'], { default: undefined })),
    style: t.Optional(t.UnionEnum(['normal', 'italic'], { default: undefined })),
    decoration: t.Optional(
      t.UnionEnum(['none', 'underline', 'line-through'], { default: undefined }),
    ),
  }),
])

export const FlexTextSchema = t.Intersect([
  FlexComponentSchema,
  t.Object({
    flex: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
    text: t.Optional(t.String()),
    size: t.Optional(t.String()),
    align: t.Optional(t.UnionEnum(['start', 'end', 'center'], { default: undefined })),
    gravity: t.Optional(t.UnionEnum(['top', 'bottom', 'center'], { default: undefined })),
    color: t.Optional(t.String()),
    weight: t.Optional(t.UnionEnum(['regular', 'bold'], { default: undefined })),
    style: t.Optional(t.UnionEnum(['normal', 'italic'], { default: undefined })),
    decoration: t.Optional(
      t.UnionEnum(['none', 'underline', 'line-through'], { default: undefined }),
    ),
    wrap: t.Optional(t.Boolean()),
    lineSpacing: t.Optional(t.String()),
    margin: t.Optional(t.String()),
    position: t.Optional(t.UnionEnum(['relative', 'absolute'], { default: undefined })),
    offsetTop: t.Optional(t.String()),
    offsetBottom: t.Optional(t.String()),
    offsetStart: t.Optional(t.String()),
    offsetEnd: t.Optional(t.String()),
    action: t.Optional(ActionSchema),
    maxLines: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
    contents: t.Optional(t.Array(FlexSpanSchema)),
    adjustMode: t.Optional(t.Literal('shrink-to-fit')),
    scaling: t.Optional(t.Boolean()),
  }),
])

export const FlexSeparatorSchema = t.Intersect([
  FlexComponentSchema,
  t.Object({ margin: t.Optional(t.String()), color: t.Optional(t.String()) }),
])

export const FlexFillerSchema = t.Intersect([
  FlexComponentSchema,
  t.Object({
    flex: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  }),
])

export const FlexBoxLinearGradientSchema = t.Intersect([
  FlexBoxBackgroundSchema,
  t.Object({
    angle: t.Optional(t.String()),
    startColor: t.Optional(t.String()),
    endColor: t.Optional(t.String()),
    centerColor: t.Optional(t.String()),
    centerPosition: t.Optional(t.String()),
  }),
])

export const CameraActionSchema = ActionSchema

export const CameraRollActionSchema = ActionSchema

export const ClipboardActionSchema = t.Intersect(
  [
    ActionSchema,
    t.Object({
      clipboardText: t.String({
        minLength: 1,
        maxLength: 1000,
        description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n',
      }),
    }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#clipboard-action',
    },
  },
)

export const DatetimePickerActionSchema = t.Intersect(
  [
    ActionSchema,
    t.Object({
      data: t.Optional(t.String({ minLength: 0, maxLength: 300 })),
      mode: t.Optional(t.UnionEnum(['date', 'time', 'datetime'], { default: undefined })),
      initial: t.Optional(t.String()),
      max: t.Optional(t.String()),
      min: t.Optional(t.String()),
    }),
  ],
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action',
    },
  },
)

export const LocationActionSchema = ActionSchema

export const MessageActionSchema = t.Intersect([
  ActionSchema,
  t.Object({ text: t.Optional(t.String()) }),
])

export const PostbackActionSchema = t.Intersect([
  ActionSchema,
  t.Object({
    data: t.Optional(t.String({ minLength: 0, maxLength: 300 })),
    displayText: t.Optional(t.String()),
    text: t.Optional(t.String()),
    inputOption: t.Optional(
      t.UnionEnum(['closeRichMenu', 'openRichMenu', 'openKeyboard', 'openVoice'], {
        default: undefined,
      }),
    ),
    fillInText: t.Optional(t.String()),
  }),
])

export const RichMenuSwitchActionSchema = t.Intersect([
  ActionSchema,
  t.Object({
    data: t.Optional(t.String({ minLength: 0, maxLength: 300 })),
    richMenuAliasId: t.Optional(t.String({ minLength: 0, maxLength: 32 })),
  }),
])

export const AltUriSchema = t.Object({
  desktop: t.Optional(t.String({ minLength: 0, maxLength: 10000 })),
})

export const URIActionSchema = t.Intersect([
  ActionSchema,
  t.Object({
    uri: t.Optional(t.String({ format: 'uri', maxLength: 10000 })),
    altUri: t.Optional(AltUriSchema),
  }),
])

export const SubscribedMembershipPlanSchema = t.Object(
  {
    membershipId: t.Integer({ maximum: 9007199254740991, description: 'Membership plan ID.' }),
    title: t.String({ description: 'Membership plan name.' }),
    description: t.String({ description: 'Membership plan description.' }),
    benefits: t.Array(t.String(), { minItems: 1, description: 'List of membership plan perks.' }),
    price: t.Number({
      format: 'double',
      example: 500,
      description: 'Monthly fee for membership plan. (e.g. 1500.00)',
    }),
    currency: t.UnionEnum(['JPY', 'TWD', 'THB'], {
      description: 'The currency of membership.price.',
      default: undefined,
    }),
  },
  { description: 'Object containing information about the membership plan.' },
)

export const SubscribedMembershipUserSchema = t.Object(
  {
    membershipNo: t.Integer({
      maximum: 9007199254740991,
      description: "The user's member number in the membership plan.",
    }),
    joinedTime: t.Integer({
      maximum: 9007199254740991,
      description: 'UNIX timestamp at which the user subscribed to the membership.',
    }),
    nextBillingDate: t.String({
      description:
        'Next payment date for membership plan.\n- Format: yyyy-MM-dd (e.g. 2024-02-08)\n- Timezone: UTC+9\n',
    }),
    totalSubscriptionMonths: t.Integer({
      maximum: 9007199254740991,
      description:
        'The period of time in months that the user has been subscribed to a membership plan. If a user previously canceled and then re-subscribed to the same membership plan, only the period after the re-subscription will be counted.',
    }),
  },
  { description: 'Object containing user membership subscription information.' },
)

export const SubscriptionSchema = t.Object(
  { membership: SubscribedMembershipPlanSchema, user: SubscribedMembershipUserSchema },
  { description: 'An array of memberships.' },
)

export const GetMembershipSubscriptionResponseSchema = t.Object(
  {
    subscriptions: t.Array(SubscriptionSchema, {
      minItems: 0,
      description: 'List of subscription information',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-a-users-membership-subscription-status',
    },
    description: "A user's membership subscription status",
  },
)

export const MembershipSchema = t.Object({
  membershipId: t.Integer({ maximum: 9007199254740991, description: 'Membership plan ID.' }),
  title: t.String({ description: 'Membership plan name.' }),
  description: t.String({ description: 'Membership plan description.' }),
  benefits: t.Array(t.String(), { minItems: 1, description: 'List of membership plan perks.' }),
  price: t.Number({
    format: 'double',
    example: 500,
    description: 'Monthly fee for membership plan. (e.g. 1500.00)',
  }),
  currency: t.UnionEnum(['JPY', 'TWD', 'THB'], {
    description: 'The currency of membership.price.',
    default: undefined,
  }),
  memberCount: t.Integer({
    maximum: 9007199254740991,
    example: 100,
    description: 'Number of members subscribed to the membership plan.',
  }),
  memberLimit: t.Union([
    t.Integer({
      maximum: 9007199254740991,
      example: 1000,
      description:
        'The upper limit of members who can subscribe. If no upper limit is set, it will be null.',
    }),
    t.Null(),
  ]),
  isInAppPurchase: t.Boolean({
    description: 'Payment method for users who subscribe to a membership plan.',
  }),
  isPublished: t.Boolean({ description: 'Membership plan status.' }),
})

export const MembershipListResponseSchema = t.Object(
  {
    memberships: t.Array(MembershipSchema, {
      minItems: 0,
      description: 'List of membership information',
    }),
  },
  { description: 'List of memberships' },
)

export const GetJoinedMembershipUsersResponseSchema = t.Object(
  {
    userIds: t.Array(t.String(), {
      maxItems: 1000,
      description:
        'A list of user IDs who joined the membership.\nUsers who have not agreed to the bot user agreement, are not following the bot, or are not active will be excluded.\nIf there are no users in the membership, an empty list will be returned.\n',
    }),
    next: t.Optional(
      t.String({
        description:
          "A continuation token to get next remaining membership user IDs.\nReturned only when there are remaining user IDs that weren't returned in the userIds property in the previous request.\nThe continuation token expires in 24 hours (86,400 seconds).\n\n",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-membership-user-ids',
    },
    description: 'List of users who have joined the membership',
  },
)

export const AcquisitionConditionRequestSchema = t.Object({
  type: t.String({ description: 'Determines how the coupon is distributed or used.' }),
})

export const CouponRewardRequestSchema = t.Object({
  type: t.String({ description: 'Type of coupon. Determines the benefit provided.' }),
})

export const CouponCreateRequestSchema = t.Object(
  {
    acquisitionCondition: AcquisitionConditionRequestSchema,
    barcodeImageUrl: t.Optional(
      t.String({
        description:
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
      }),
    ),
    couponCode: t.Optional(
      t.String({
        description: 'Unique code to be presented by the user to redeem the coupon. Optional.',
      }),
    ),
    description: t.Optional(
      t.String({
        minLength: 0,
        maxLength: 1000,
        description: 'Detailed description of the coupon. Displayed to users.',
      }),
    ),
    endTimestamp: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
    }),
    imageUrl: t.Optional(
      t.String({
        description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
      }),
    ),
    maxUseCountPerTicket: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 1,
      description:
        'Maximum number of times a single coupon ticket can be used. Use -1 to indicate no limit.',
    }),
    startTimestamp: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
    }),
    title: t.String({
      minLength: 1,
      maxLength: 60,
      description: 'Title of the coupon. Displayed in the coupon list.',
    }),
    usageCondition: t.Optional(
      t.String({
        minLength: 0,
        maxLength: 100,
        description: 'Conditions for using the coupon. Shown to users.',
      }),
    ),
    reward: t.Optional(CouponRewardRequestSchema),
    visibility: t.UnionEnum(['UNLISTED', 'PUBLIC'], {
      description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
      default: undefined,
    }),
    timezone: t.UnionEnum(
      [
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
      ],
      { description: 'Timezone for interpreting start and end timestamps.', default: undefined },
    ),
  },
  {
    description:
      'Request object for creating a coupon. Contains all configurable coupon properties.',
  },
)

export const NormalAcquisitionConditionRequestSchema = AcquisitionConditionRequestSchema

export const LotteryAcquisitionConditionRequestSchema = t.Intersect([
  AcquisitionConditionRequestSchema,
  t.Object({
    lotteryProbability: t.Integer({
      format: 'int32',
      minimum: 1,
      maximum: 99,
      description: 'Probability (1-99) of winning the coupon in lottery-type campaigns.',
    }),
    maxAcquireCount: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 999999,
      description:
        'Maximum number of coupons that can be issued in total. Use -1 to indicate no limit',
    }),
  }),
])

export const CashBackPriceInfoRequestSchema = t.Object({ type: t.String() })

export const CouponCashBackRewardRequestSchema = t.Intersect([
  CouponRewardRequestSchema,
  t.Object({ priceInfo: t.Optional(CashBackPriceInfoRequestSchema) }),
])

export const DiscountPriceInfoRequestSchema = t.Object({ type: t.String() })

export const CouponDiscountRewardRequestSchema = t.Intersect([
  CouponRewardRequestSchema,
  t.Object({ priceInfo: t.Optional(DiscountPriceInfoRequestSchema) }),
])

export const CouponFreeRewardRequestSchema = CouponRewardRequestSchema

export const CouponGiftRewardRequestSchema = CouponRewardRequestSchema

export const CouponOthersRewardRequestSchema = CouponRewardRequestSchema

export const CashBackFixedPriceInfoRequestSchema = t.Intersect([
  CashBackPriceInfoRequestSchema,
  t.Object({ fixedAmount: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })) }),
])

export const CashBackPercentagePriceInfoRequestSchema = t.Intersect([
  CashBackPriceInfoRequestSchema,
  t.Object({
    percentage: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: 1,
        maximum: 99,
        description:
          'Specifies the cashback rate as a percentage. Must be an integer between 1 and 99.',
      }),
    ),
  }),
])

export const DiscountFixedPriceInfoRequestSchema = t.Intersect([
  DiscountPriceInfoRequestSchema,
  t.Object({ fixedAmount: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })) }),
])

export const DiscountPercentagePriceInfoRequestSchema = t.Intersect([
  DiscountPriceInfoRequestSchema,
  t.Object({
    percentage: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: 1,
        maximum: 99,
        description:
          'Specifies the discount rate as a percentage. Must be an integer between 1 and 99.',
      }),
    ),
  }),
])

export const DiscountExplicitPriceInfoRequestSchema = t.Intersect([
  DiscountPriceInfoRequestSchema,
  t.Object({
    priceAfterDiscount: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
    originalPrice: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
  }),
])

export const CouponCreateResponseSchema = t.Object(
  { couponId: t.String({ description: 'Unique identifier of the coupon.' }) },
  { description: 'Response object returned after creating a coupon. Contains the coupon ID.' },
)

export const AcquisitionConditionResponseSchema = t.Object({
  type: t.String({ description: 'Determines how the coupon is distributed or used.' }),
})

export const CouponRewardResponseSchema = t.Object({
  type: t.String({ description: 'Type of coupon. Determines the benefit provided.' }),
})

export const CouponResponseSchema = t.Object(
  {
    acquisitionCondition: t.Optional(AcquisitionConditionResponseSchema),
    barcodeImageUrl: t.Optional(
      t.String({
        format: 'uri',
        description:
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
      }),
    ),
    couponCode: t.Optional(
      t.String({ description: 'Unique code to be presented by the user to redeem the coupon.' }),
    ),
    description: t.Optional(
      t.String({ description: 'Detailed description of the coupon. Displayed to users.' }),
    ),
    endTimestamp: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
      }),
    ),
    imageUrl: t.Optional(
      t.String({
        format: 'uri',
        description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
      }),
    ),
    maxAcquireCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Maximum number of coupons that can be issued in total.',
      }),
    ),
    maxUseCountPerTicket: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'Maximum number of times a single coupon ticket can be used.',
      }),
    ),
    maxTicketPerUser: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Maximum number of coupon tickets a single user can acquire.',
      }),
    ),
    startTimestamp: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
      }),
    ),
    title: t.Optional(
      t.String({ description: 'Title of the coupon. Displayed in the coupon list.' }),
    ),
    usageCondition: t.Optional(
      t.String({ description: 'Conditions for using the coupon. Shown to users.' }),
    ),
    reward: t.Optional(CouponRewardResponseSchema),
    visibility: t.Optional(
      t.UnionEnum(['UNLISTED', 'PUBLIC', 'PRIVATE'], {
        description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
        default: undefined,
      }),
    ),
    timezone: t.Optional(
      t.UnionEnum(
        [
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
        ],
        { description: 'Timezone for interpreting start and end timestamps.', default: undefined },
      ),
    ),
    couponId: t.Optional(t.String({ description: 'Unique identifier of the coupon.' })),
    createdTimestamp: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Created timestamp (seconds) of the coupon.',
      }),
    ),
    status: t.Optional(
      t.UnionEnum(['DRAFT', 'RUNNING', 'CLOSED'], {
        description: 'Current status of the coupon.',
        default: undefined,
      }),
    ),
  },
  {
    description:
      'Detailed information about a coupon, including all properties and current status.',
  },
)

export const NormalAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export const LotteryAcquisitionConditionResponseSchema = t.Intersect([
  AcquisitionConditionResponseSchema,
  t.Object({
    lotteryProbability: t.Optional(
      t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    ),
    maxAcquireCount: t.Optional(
      t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    ),
  }),
])

export const ReferralAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export const CashBackPriceInfoResponseSchema = t.Object({ type: t.String() })

export const CouponCashBackRewardResponseSchema = t.Intersect([
  CouponRewardResponseSchema,
  t.Object({ priceInfo: t.Optional(CashBackPriceInfoResponseSchema) }),
])

export const DiscountPriceInfoResponseSchema = t.Object({ type: t.String() })

export const CouponDiscountRewardResponseSchema = t.Intersect([
  CouponRewardResponseSchema,
  t.Object({ priceInfo: t.Optional(DiscountPriceInfoResponseSchema) }),
])

export const CouponFreeRewardResponseSchema = CouponRewardResponseSchema

export const CouponGiftRewardResponseSchema = CouponRewardResponseSchema

export const CouponOthersRewardResponseSchema = CouponRewardResponseSchema

export const CashBackFixedPriceInfoResponseSchema = t.Intersect([
  CashBackPriceInfoResponseSchema,
  t.Object({
    currency: t.Optional(
      t.UnionEnum(['JPY', 'THB', 'TWD'], {
        description: 'Currency code (e.g., JPY, THB, TWD).',
        default: undefined,
      }),
    ),
    fixedAmount: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
  }),
])

export const CashBackPercentagePriceInfoResponseSchema = t.Intersect([
  CashBackPriceInfoResponseSchema,
  t.Object({
    percentage: t.Optional(
      t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    ),
  }),
])

export const DiscountFixedPriceInfoResponseSchema = t.Intersect([
  DiscountPriceInfoResponseSchema,
  t.Object({
    currency: t.Optional(
      t.UnionEnum(['JPY', 'THB', 'TWD'], {
        description: 'Currency code (e.g., JPY, THB, TWD).',
        default: undefined,
      }),
    ),
    fixedAmount: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
  }),
])

export const DiscountPercentagePriceInfoResponseSchema = t.Intersect([
  DiscountPriceInfoResponseSchema,
  t.Object({
    percentage: t.Optional(
      t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    ),
  }),
])

export const DiscountExplicitPriceInfoResponseSchema = t.Intersect([
  DiscountPriceInfoResponseSchema,
  t.Object({
    currency: t.Optional(
      t.UnionEnum(['JPY', 'THB', 'TWD'], {
        description: 'Currency code (e.g., JPY, THB, TWD).',
        default: undefined,
      }),
    ),
    priceAfterDiscount: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
    originalPrice: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
  }),
])

export const CouponListResponseSchema = t.Object(
  {
    couponId: t.String({ description: 'Unique identifier of the coupon.' }),
    title: t.String({ description: 'Title of the coupon. Displayed in the coupon list.' }),
  },
  { description: 'Summary information about a coupon, used in coupon lists.' },
)

export const MessagingApiPagerCouponListResponseSchema = t.Object(
  {
    items: t.Array(CouponListResponseSchema, { description: 'List of coupon summary objects.' }),
    next: t.Optional(t.String({ description: 'Token for fetching the next page of results.' })),
  },
  { description: 'Paginated response object containing a list of coupons.' },
)

export const ShowLoadingAnimationRequestSchema = t.Object(
  {
    chatId: t.String({
      description: 'User ID of the target user for whom the loading animation is to be displayed.',
    }),
    loadingSeconds: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: 5,
        maximum: 60,
        description:
          'The number of seconds to display the loading indicator.\nIt must be a multiple of 5. The maximum value is 60 seconds.\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-request-body',
    },
  },
)

export const ShowLoadingAnimationResponseSchema = t.Object(
  {},
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-response',
    },
  },
)

export const MarkMessagesAsReadByTokenRequestSchema = t.Object(
  { markAsReadToken: t.String({ description: 'Token used to mark messages as read.' }) },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#mark-as-read-request-body',
    },
  },
)

export const ErrorDetailSchema = t.Object({
  message: t.Optional(
    t.String({
      description: 'Details of the error. Not included in the response under certain situations.',
    }),
  ),
  property: t.Optional(
    t.String({
      description:
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
    }),
  ),
})

export const ErrorResponseSchema = t.Object(
  {
    message: t.String({ description: 'Message containing information about the error.' }),
    details: t.Optional(
      t.Array(ErrorDetailSchema, {
        description:
          'An array of error details. If the array is empty, this property will not be included in the response.',
      }),
    ),
    sentMessages: t.Optional(
      t.Array(SentMessageSchema, {
        minItems: 1,
        maxItems: 5,
        description: 'Array of sent messages.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  },
)
