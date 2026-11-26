import { type } from 'arktype'

declare global {
  interface ArkEnv {
    meta(): { ref?: string }
  }
}

export const GetWebhookEndpointResponseSchema = type({
  endpoint: type('string.url').describe('Webhook URL'),
  active: type('boolean').describe(
    'Webhook usage status. Send a webhook event from the LINE Platform to the webhook URL only if enabled.\n\n`true`: Webhook usage is enabled.\n`false`: Webhook usage is disabled.\n',
  ),
}).configure({ ref: 'GetWebhookEndpointResponse' })

export type GetWebhookEndpointResponse = typeof GetWebhookEndpointResponseSchema.infer

export const SetWebhookEndpointRequestSchema = type({
  endpoint: type('string.url')
    .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
    .narrow((data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'))
    .describe('A valid webhook URL.'),
}).configure({ ref: 'SetWebhookEndpointRequest' })

export type SetWebhookEndpointRequest = typeof SetWebhookEndpointRequestSchema.infer

export const TestWebhookEndpointRequestSchema = type({
  'endpoint?': type('string.url')
    .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
    .narrow((data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'))
    .describe('A webhook URL to be validated.'),
}).configure({ ref: 'TestWebhookEndpointRequest' })

export type TestWebhookEndpointRequest = typeof TestWebhookEndpointRequestSchema.infer

export const TestWebhookEndpointResponseSchema = type({
  'success?': type('boolean').describe(
    'Result of the communication from the LINE platform to the webhook URL.',
  ),
  timestamp: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered.\n',
  ),
  statusCode: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    "The HTTP status code. If the webhook response isn't received, the status code is set to zero or a negative number.",
  ),
  reason: type('string').describe('Reason for the response.'),
  detail: type('string').describe('Details of the response.'),
}).configure({ ref: 'TestWebhookEndpointResponse' })

export type TestWebhookEndpointResponse = typeof TestWebhookEndpointResponseSchema.infer

export const GetMessageContentTranscodingResponseSchema = type({
  status: type("'processing' | 'succeeded' | 'failed'").describe(
    'The preparation status. One of:\n\n`processing`: Preparing to get content.\n`succeeded`: Ready to get the content. You can get the content sent by users.\n`failed`: Failed to prepare to get the content.\n',
  ),
})
  .describe('Transcoding response')
  .configure({ ref: 'GetMessageContentTranscodingResponse' })

export type GetMessageContentTranscodingResponse =
  typeof GetMessageContentTranscodingResponseSchema.infer

export const ActionSchema = type({
  'type?': type('string').describe('Type of action'),
  'label?': type('string').describe('Label for the action.'),
})
  .describe('Action')
  .configure({ ref: 'Action' })

export type Action = typeof ActionSchema.infer

export const QuickReplyItemSchema = type({
  'imageUrl?': type('string.url')
    .narrow((data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'))
    .describe('URL of the icon that is displayed at the beginning of the button'),
  'action?': ActionSchema,
  'type?': type('string').describe('`action`'),
}).configure({ ref: 'QuickReplyItem' })

export type QuickReplyItem = typeof QuickReplyItemSchema.infer

export const QuickReplySchema = type({
  'items?': type(type(QuickReplyItemSchema).array())
    .and(type('unknown[] <= 13'))
    .describe('Quick reply button objects.'),
})
  .describe('Quick reply')
  .configure({ ref: 'QuickReply' })

export type QuickReply = typeof QuickReplySchema.infer

export const SenderSchema = type({
  'name?': type('string')
    .narrow((data, ctx) => [...data].length <= 20 || ctx.mustBe('at most 20 characters'))
    .describe('Display name. Certain words such as `LINE` may not be used.'),
  'iconUrl?': type('string.url')
    .narrow((data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'))
    .describe('URL of the image to display as an icon when sending a message'),
})
  .describe('Change icon and display name')
  .configure({ ref: 'Sender' })

export type Sender = typeof SenderSchema.infer

export const MessageSchema = type({
  type: type('string').describe('Type of message'),
  'quickReply?': QuickReplySchema,
  'sender?': SenderSchema,
}).configure({ ref: 'Message' })

export type Message = typeof MessageSchema.infer

export const NotificationDisabledSchema = type('boolean')
  .describe(
    '`true`: The user doesn’t receive a push notification when a message is sent.\n`false`: The user receives a push notification when the message is sent (unless they have disabled push notifications in LINE and/or their device).\nThe default value is false.\n',
  )
  .configure({ ref: 'NotificationDisabled' })

export type NotificationDisabled = typeof NotificationDisabledSchema.infer

export const ReplyMessageRequestSchema = type({
  replyToken: type('string').describe('replyToken received via webhook.'),
  messages: type(type(MessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('List of messages.'),
  'notificationDisabled?': NotificationDisabledSchema,
}).configure({ ref: 'ReplyMessageRequest' })

export type ReplyMessageRequest = typeof ReplyMessageRequestSchema.infer

export const SentMessageSchema = type({
  id: type('string').describe('ID of the sent message.'),
  'quoteToken?': type('string').describe(
    'Quote token of the message. Only included when a message object that can be specified as a quote target was sent as a push or reply message.\n',
  ),
}).configure({ ref: 'SentMessage' })

export type SentMessage = typeof SentMessageSchema.infer

export const ReplyMessageResponseSchema = type({
  sentMessages: type(type(SentMessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('Array of sent messages.'),
}).configure({ ref: 'ReplyMessageResponse' })

export type ReplyMessageResponse = typeof ReplyMessageResponseSchema.infer

export const PushMessageRequestSchema = type({
  to: type('string').describe('ID of the receiver.'),
  messages: type(type(MessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('List of Message objects.'),
  'notificationDisabled?': NotificationDisabledSchema,
  'customAggregationUnits?': type('string[]').describe(
    'List of aggregation unit name. Case-sensitive.\nThis functions can only be used by corporate users who have submitted the required applications.\n',
  ),
}).configure({ ref: 'PushMessageRequest' })

export type PushMessageRequest = typeof PushMessageRequestSchema.infer

export const PushMessageResponseSchema = type({
  sentMessages: type(type(SentMessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('Array of sent messages.'),
}).configure({ ref: 'PushMessageResponse' })

export type PushMessageResponse = typeof PushMessageResponseSchema.infer

export const MulticastRequestSchema = type({
  messages: type(type(MessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('Messages to send'),
  to: type('string[]')
    .and(type('1 <= unknown[] <= 500'))
    .describe(
      'Array of user IDs. Use userId values which are returned in webhook event objects. Do not use LINE IDs found on LINE.',
    ),
  'notificationDisabled?': NotificationDisabledSchema,
  'customAggregationUnits?': type(
    type(
      type('string')
        .and(/^[a-zA-Z0-9_]{1,30}$/)
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters')),
    ).array(),
  )
    .and(type('unknown[] <= 1'))
    .describe('Name of aggregation unit. Case-sensitive.'),
}).configure({ ref: 'MulticastRequest' })

export type MulticastRequest = typeof MulticastRequestSchema.infer

export const MulticastResponseSchema = type({}).configure({ ref: 'MulticastResponse' })

export type MulticastResponse = typeof MulticastResponseSchema.infer

export const RecipientSchema = type({ 'type?': type('string').describe('Type of recipient') })
  .describe('Recipient')
  .configure({ ref: 'Recipient' })

export type Recipient = typeof RecipientSchema.infer

export const DemographicFilterSchema = type({
  'type?': type('string').describe('Type of demographic filter'),
})
  .describe('Demographic filter')
  .configure({ ref: 'DemographicFilter' })

export type DemographicFilter = typeof DemographicFilterSchema.infer

export const FilterSchema = type({ 'demographic?': DemographicFilterSchema })
  .describe('Filter for narrowcast')
  .configure({ ref: 'Filter' })

export type Filter = typeof FilterSchema.infer

export const LimitSchema = type({
  'max?': type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1',
  ).describe(
    'The maximum number of narrowcast messages to send.\nUse this parameter to limit the number of narrowcast messages sent.\nThe recipients will be chosen at random.\n',
  ),
  'upToRemainingQuota?': type('boolean').describe(
    'If true, the message will be sent within the maximum number of deliverable messages. The default value is `false`.\n\nTargets will be selected at random.\n',
  ),
  'forbidPartialDelivery?': type('boolean').describe(
    'This option prevents messages from being delivered to only a subset of the target audience.\nIf true, the narrowcast request success but fails asynchronously.\nYou can check whether message delivery was canceled by retrieving the narrowcast message progress.\n\nThis property can be set to true only if upToRemainingQuota is set to true.\n',
  ),
})
  .describe('Limit of the Narrowcast')
  .configure({ ref: 'Limit' })

export type Limit = typeof LimitSchema.infer

export const NarrowcastRequestSchema = type({
  messages: type(type(MessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('List of Message objects.'),
  'recipient?': RecipientSchema,
  'filter?': FilterSchema,
  'limit?': LimitSchema,
  'notificationDisabled?': NotificationDisabledSchema,
}).configure({ ref: 'NarrowcastRequest' })

export type NarrowcastRequest = typeof NarrowcastRequestSchema.infer

export const NarrowcastResponseSchema = type({}).configure({ ref: 'NarrowcastResponse' })

export type NarrowcastResponse = typeof NarrowcastResponseSchema.infer

export const OperatorRecipientSchema = type(RecipientSchema)
  .and(
    type({
      'and?': type(RecipientSchema)
        .array()
        .describe(
          'Create a new recipient object by taking the logical conjunction (AND) of the specified array of recipient objects.\n',
        ),
      'or?': type(RecipientSchema)
        .array()
        .describe(
          'Create a new recipient object by taking the logical disjunction (OR) of the specified array of recipient objects.\n',
        ),
      'not?': RecipientSchema,
    }),
  )
  .configure({ ref: 'OperatorRecipient' })

export type OperatorRecipient = typeof OperatorRecipientSchema.infer

export const AudienceRecipientSchema = type(RecipientSchema)
  .and(
    type({
      'audienceGroupId?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'AudienceRecipient' })

export type AudienceRecipient = typeof AudienceRecipientSchema.infer

export const RedeliveryRecipientSchema = type(RecipientSchema)
  .and(type({ 'requestId?': 'string' }))
  .configure({ ref: 'RedeliveryRecipient' })

export type RedeliveryRecipient = typeof RedeliveryRecipientSchema.infer

export const AgeDemographicSchema = type(
  "'age_15' | 'age_20' | 'age_25' | 'age_30' | 'age_35' | 'age_40' | 'age_45' | 'age_50' | 'age_55' | 'age_60' | 'age_65' | 'age_70'",
).configure({ ref: 'AgeDemographic' })

export type AgeDemographic = typeof AgeDemographicSchema.infer

export const AgeDemographicFilterSchema = type(DemographicFilterSchema)
  .and(type({ 'gte?': AgeDemographicSchema, 'lt?': AgeDemographicSchema }))
  .configure({ ref: 'AgeDemographicFilter' })

export type AgeDemographicFilter = typeof AgeDemographicFilterSchema.infer

export const AppTypeDemographicSchema = type("'ios' | 'android'").configure({
  ref: 'AppTypeDemographic',
})

export type AppTypeDemographic = typeof AppTypeDemographicSchema.infer

export const AppTypeDemographicFilterSchema = type(DemographicFilterSchema)
  .and(type({ 'oneOf?': type(AppTypeDemographicSchema).array() }))
  .configure({ ref: 'AppTypeDemographicFilter' })

export type AppTypeDemographicFilter = typeof AppTypeDemographicFilterSchema.infer

export const AreaDemographicSchema = type
  .enumerated(
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
  )
  .configure({ ref: 'AreaDemographic' })

export type AreaDemographic = typeof AreaDemographicSchema.infer

export const AreaDemographicFilterSchema = type(DemographicFilterSchema)
  .and(type({ 'oneOf?': type(AreaDemographicSchema).array() }))
  .configure({ ref: 'AreaDemographicFilter' })

export type AreaDemographicFilter = typeof AreaDemographicFilterSchema.infer

export const GenderDemographicSchema = type("'male' | 'female'").configure({
  ref: 'GenderDemographic',
})

export type GenderDemographic = typeof GenderDemographicSchema.infer

export const GenderDemographicFilterSchema = type(DemographicFilterSchema)
  .and(type({ 'oneOf?': type(GenderDemographicSchema).array() }))
  .configure({ ref: 'GenderDemographicFilter' })

export type GenderDemographicFilter = typeof GenderDemographicFilterSchema.infer

export const OperatorDemographicFilterSchema = type(DemographicFilterSchema)
  .and(
    type({
      'and?': type(DemographicFilterSchema).array(),
      'or?': type(DemographicFilterSchema).array(),
      'not?': DemographicFilterSchema,
    }),
  )
  .configure({ ref: 'OperatorDemographicFilter' })

export type OperatorDemographicFilter = typeof OperatorDemographicFilterSchema.infer

export const SubscriptionPeriodDemographicSchema = type(
  "'day_7' | 'day_30' | 'day_90' | 'day_180' | 'day_365'",
).configure({ ref: 'SubscriptionPeriodDemographic' })

export type SubscriptionPeriodDemographic = typeof SubscriptionPeriodDemographicSchema.infer

export const SubscriptionPeriodDemographicFilterSchema = type(DemographicFilterSchema)
  .and(
    type({
      'gte?': SubscriptionPeriodDemographicSchema,
      'lt?': SubscriptionPeriodDemographicSchema,
    }),
  )
  .configure({ ref: 'SubscriptionPeriodDemographicFilter' })

export type SubscriptionPeriodDemographicFilter =
  typeof SubscriptionPeriodDemographicFilterSchema.infer

export const NarrowcastProgressResponseSchema = type({
  phase: type("'waiting' | 'sending' | 'succeeded' | 'failed'").describe(
    'The current status. One of:\n\n`waiting`: Messages are not yet ready to be sent. They are currently being filtered or processed in some way.\n`sending`: Messages are currently being sent.\n`succeeded`: Messages were sent successfully. This may not mean the messages were successfully received.\n`failed`: Messages failed to be sent. Use the failedDescription property to find the cause of the failure.\n',
  ),
  'successCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The number of users who successfully received the message.'),
  'failureCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The number of users who failed to send the message.'),
  'targetCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The number of intended recipients of the message.'),
  'failedDescription?': type('string').describe(
    'The reason the message failed to be sent. This is only included with a `phase` property value of `failed`.',
  ),
  'errorCode?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      "Error summary. This is only included with a phase property value of failed.\nOne of:\n\n`1`: An internal error occurred.\n`2`: An error occurred because there weren't enough recipients.\n`3`: A conflict error of requests occurs because a request that has already been accepted is retried.\n`4`: An audience of less than 50 recipients is included as a condition of sending.\n`5`: Message delivery has been canceled to prevent messages from being delivered only to a subset of the target audience.\n",
    ),
  acceptedTime: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'Narrowcast message request accepted time in milliseconds.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
  ),
  'completedTime?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'Processing of narrowcast message request completion time in milliseconds. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
  ),
}).configure({ ref: 'NarrowcastProgressResponse' })

export type NarrowcastProgressResponse = typeof NarrowcastProgressResponseSchema.infer

export const BroadcastRequestSchema = type({
  messages: type(type(MessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('List of Message objects.'),
  'notificationDisabled?': NotificationDisabledSchema,
}).configure({ ref: 'BroadcastRequest' })

export type BroadcastRequest = typeof BroadcastRequestSchema.infer

export const BroadcastResponseSchema = type({}).configure({ ref: 'BroadcastResponse' })

export type BroadcastResponse = typeof BroadcastResponseSchema.infer

export const QuotaTypeSchema = type("'none' | 'limited'")
  .describe('One of the following values to indicate whether a target limit is set or not.')
  .configure({ ref: 'QuotaType' })

export type QuotaType = typeof QuotaTypeSchema.infer

export const MessageQuotaResponseSchema = type({
  type: QuotaTypeSchema,
  'value?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'The target limit for sending messages in the current month. This property is returned when the `type` property has a value of `limited`.\n',
    ),
}).configure({ ref: 'MessageQuotaResponse' })

export type MessageQuotaResponse = typeof MessageQuotaResponseSchema.infer

export const QuotaConsumptionResponseSchema = type({
  totalUsage: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The number of sent messages in the current month'),
}).configure({ ref: 'QuotaConsumptionResponse' })

export type QuotaConsumptionResponse = typeof QuotaConsumptionResponseSchema.infer

export const NumberOfMessagesResponseSchema = type({
  status: type("'ready' | 'unready' | 'unavailable_for_privacy' | 'out_of_service'").describe(
    "Aggregation process status. One of:\n\n`ready`: The number of messages can be obtained.\n`unready`: We haven't finished calculating the number of sent messages for the specified in date. For example, this property is returned when the delivery date or a future date is specified. Calculation usually takes about a day.\n`unavailable_for_privacy`: The total number of messages on the specified day is less than 20.\n`out_of_service`: The specified date is earlier than the date on which we first started calculating sent messages (March 31, 2018).\n",
  ),
  'success?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'The number of messages delivered using the phone number on the date specified in `date`.\nThe response has this property only when the value of `status` is `ready`.\n\n',
    ),
}).configure({ ref: 'NumberOfMessagesResponse' })

export type NumberOfMessagesResponse = typeof NumberOfMessagesResponseSchema.infer

export const ValidateMessageRequestSchema = type({
  messages: type(type(MessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('Array of message objects to validate'),
}).configure({ ref: 'ValidateMessageRequest' })

export type ValidateMessageRequest = typeof ValidateMessageRequestSchema.infer

export const GetAggregationUnitUsageResponseSchema = type({
  numOfCustomAggregationUnits: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of aggregation units used this month.'),
}).configure({ ref: 'GetAggregationUnitUsageResponse' })

export type GetAggregationUnitUsageResponse = typeof GetAggregationUnitUsageResponseSchema.infer

export const GetAggregationUnitNameListResponseSchema = type({
  customAggregationUnits: type('string[]').describe(
    'An array of strings indicating the names of aggregation units used this month.',
  ),
  'next?': type('string').describe(
    "A continuation token to get the next array of unit names.\nReturned only when there are remaining aggregation units that weren't returned in customAggregationUnits in the original request.\n\n",
  ),
}).configure({ ref: 'GetAggregationUnitNameListResponse' })

export type GetAggregationUnitNameListResponse =
  typeof GetAggregationUnitNameListResponseSchema.infer

export const UserProfileResponseSchema = type({
  displayName: type('string').describe("User's display name"),
  userId: type('string').describe('User ID'),
  'pictureUrl?': type('string.url').describe(
    "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
  ),
  'statusMessage?': type('string').describe(
    "User's status message. Not included in the response if the user doesn't have a status message.",
  ),
  'language?': type('string').describe(
    "User's language, as a BCP 47 language tag. Not included in the response if the user hasn't yet consented to the LINE Privacy Policy.",
  ),
}).configure({ ref: 'UserProfileResponse' })

export type UserProfileResponse = typeof UserProfileResponseSchema.infer

export const GetFollowersResponseSchema = type({
  userIds: type('string[]')
    .and(type('unknown[] <= 1000'))
    .describe(
      'An array of strings indicating user IDs of users that have added the LINE Official Account as a friend.\nOnly users of LINE for iOS and LINE for Android are included in `userIds`.\n',
    ),
  'next?': type('string').describe(
    "A continuation token to get the next array of user IDs.\nReturned only when there are remaining user IDs that weren't returned in `userIds` in the original request.\nThe number of user IDs in the `userIds` element doesn't have to reach the maximum number specified by `limit` for the `next` property to be included in the response.\n\n",
  ),
}).configure({ ref: 'GetFollowersResponse' })

export type GetFollowersResponse = typeof GetFollowersResponseSchema.infer

export const BotInfoResponseSchema = type({
  userId: type('string').describe("Bot's user ID"),
  basicId: type('string').describe("Bot's basic ID"),
  'premiumId?': type('string').describe(
    "Bot's premium ID. Not included in the response if the premium ID isn't set.",
  ),
  displayName: type('string').describe("Bot's display name"),
  'pictureUrl?': type('string.url').describe(
    "Profile image URL. `https` image URL. Not included in the response if the bot doesn't have a profile image.",
  ),
  chatMode: type("'chat' | 'bot'").describe(
    'Chat settings set in the LINE Official Account Manager. One of:\n\n`chat`: Chat is set to "On".\n`bot`: Chat is set to "Off".\n',
  ),
  markAsReadMode: type("'auto' | 'manual'").describe(
    'Automatic read setting for messages. If the chat is set to "Off", auto is returned. If the chat is set to "On", manual is returned.\n\n`auto`: Auto read setting is enabled.\n`manual`: Auto read setting is disabled.\n\n',
  ),
}).configure({ ref: 'BotInfoResponse' })

export type BotInfoResponse = typeof BotInfoResponseSchema.infer

export const GroupUserProfileResponseSchema = type({
  displayName: type('string').describe("User's display name"),
  userId: type('string').describe('User ID'),
  'pictureUrl?': type('string.url').describe(
    "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
  ),
}).configure({ ref: 'GroupUserProfileResponse' })

export type GroupUserProfileResponse = typeof GroupUserProfileResponseSchema.infer

export const RoomUserProfileResponseSchema = type({
  displayName: type('string').describe("User's display name"),
  userId: type('string').describe('User ID'),
  'pictureUrl?': type('string.url').describe(
    "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
  ),
}).configure({ ref: 'RoomUserProfileResponse' })

export type RoomUserProfileResponse = typeof RoomUserProfileResponseSchema.infer

export const MembersIdsResponseSchema = type({
  memberIds: type('string[]')
    .and(type('unknown[] <= 100'))
    .describe(
      'List of user IDs of members in the group chat. Only users of LINE for iOS and LINE for Android are included in `memberIds`.',
    ),
  'next?': type('string').describe(
    'A continuation token to get the next array of user IDs of the members in the group chat.\nReturned only when there are remaining user IDs that were not returned in `memberIds` in the original request.\n',
  ),
}).configure({ ref: 'MembersIdsResponse' })

export type MembersIdsResponse = typeof MembersIdsResponseSchema.infer

export const GroupSummaryResponseSchema = type({
  groupId: type('string').describe('Group ID'),
  groupName: type('string').describe('Group name'),
  'pictureUrl?': type('string.url').describe(
    "Group icon URL. Not included in the response if the user doesn't set a group profile icon.",
  ),
}).configure({ ref: 'GroupSummaryResponse' })

export type GroupSummaryResponse = typeof GroupSummaryResponseSchema.infer

export const GroupMemberCountResponseSchema = type({
  count: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The count of members in the group chat. The number returned excludes the LINE Official Account.',
  ),
}).configure({ ref: 'GroupMemberCountResponse' })

export type GroupMemberCountResponse = typeof GroupMemberCountResponseSchema.infer

export const RoomMemberCountResponseSchema = type({
  count: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The count of members in the multi-person chat. The number returned excludes the LINE Official Account.',
  ),
}).configure({ ref: 'RoomMemberCountResponse' })

export type RoomMemberCountResponse = typeof RoomMemberCountResponseSchema.infer

export const RichMenuSizeSchema = type({
  'width?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
    .narrow((data, ctx) => data <= 2147483647n || ctx.mustBe('at most 2147483647'))
    .describe('width'),
  'height?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
    .narrow((data, ctx) => data <= 2147483647n || ctx.mustBe('at most 2147483647'))
    .describe('height'),
})
  .describe('Rich menu size')
  .configure({ ref: 'RichMenuSize' })

export type RichMenuSize = typeof RichMenuSizeSchema.infer

export const RichMenuBoundsSchema = type({
  'x?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .narrow((data, ctx) => data >= 0n || ctx.mustBe('at least 0'))
    .narrow((data, ctx) => data <= 2147483647n || ctx.mustBe('at most 2147483647'))
    .describe('Horizontal position relative to the top-left corner of the area.'),
  'y?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .narrow((data, ctx) => data >= 0n || ctx.mustBe('at least 0'))
    .narrow((data, ctx) => data <= 2147483647n || ctx.mustBe('at most 2147483647'))
    .describe('Vertical position relative to the top-left corner of the area.'),
  'width?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
    .narrow((data, ctx) => data <= 2147483647n || ctx.mustBe('at most 2147483647'))
    .describe('Width of the area.'),
  'height?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
    .narrow((data, ctx) => data <= 2147483647n || ctx.mustBe('at most 2147483647'))
    .describe('Height of the area.'),
})
  .describe('Rich menu bounds')
  .configure({ ref: 'RichMenuBounds' })

export type RichMenuBounds = typeof RichMenuBoundsSchema.infer

export const RichMenuAreaSchema = type({ 'bounds?': RichMenuBoundsSchema, 'action?': ActionSchema })
  .describe('Rich menu area')
  .configure({ ref: 'RichMenuArea' })

export type RichMenuArea = typeof RichMenuAreaSchema.infer

export const RichMenuRequestSchema = type({
  'size?': RichMenuSizeSchema,
  'selected?': type('boolean').describe(
    '`true` to display the rich menu by default. Otherwise, `false`.',
  ),
  'name?': type('string')
    .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'))
    .describe(
      'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
    ),
  'chatBarText?': type('string')
    .narrow((data, ctx) => [...data].length <= 14 || ctx.mustBe('at most 14 characters'))
    .describe('Text displayed in the chat bar'),
  'areas?': type(RichMenuAreaSchema)
    .array()
    .describe('Array of area objects which define the coordinates and size of tappable areas'),
}).configure({ ref: 'RichMenuRequest' })

export type RichMenuRequest = typeof RichMenuRequestSchema.infer

export const RichMenuIdResponseSchema = type({
  richMenuId: type('string').describe('Rich menu ID'),
}).configure({ ref: 'RichMenuIdResponse' })

export type RichMenuIdResponse = typeof RichMenuIdResponseSchema.infer

export const RichMenuResponseSchema = type({
  richMenuId: type('string').describe('ID of a rich menu'),
  size: RichMenuSizeSchema,
  selected: type('boolean').describe(
    '`true` to display the rich menu by default. Otherwise, `false`.',
  ),
  name: type('string')
    .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'))
    .describe(
      'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
    ),
  chatBarText: type('string')
    .narrow((data, ctx) => [...data].length <= 14 || ctx.mustBe('at most 14 characters'))
    .describe('Text displayed in the chat bar'),
  areas: type(type(RichMenuAreaSchema).array())
    .and(type('unknown[] <= 20'))
    .describe('Array of area objects which define the coordinates and size of tappable areas'),
}).configure({ ref: 'RichMenuResponse' })

export type RichMenuResponse = typeof RichMenuResponseSchema.infer

export const RichMenuListResponseSchema = type({
  richmenus: type(RichMenuResponseSchema).array().describe('Rich menus'),
}).configure({ ref: 'RichMenuListResponse' })

export type RichMenuListResponse = typeof RichMenuListResponseSchema.infer

export const CreateRichMenuAliasRequestSchema = type({
  richMenuAliasId: type('string')
    .and(/^[a-z0-9_-]{1,32}$/)
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'))
    .describe('Rich menu alias ID, which can be any ID, unique for each channel.'),
  richMenuId: type('string').describe(
    'The rich menu ID to be associated with the rich menu alias.',
  ),
}).configure({ ref: 'CreateRichMenuAliasRequest' })

export type CreateRichMenuAliasRequest = typeof CreateRichMenuAliasRequestSchema.infer

export const RichMenuAliasResponseSchema = type({
  richMenuAliasId: type('string').describe('Rich menu alias ID.'),
  richMenuId: type('string').describe('The rich menu ID associated with the rich menu alias.'),
}).configure({ ref: 'RichMenuAliasResponse' })

export type RichMenuAliasResponse = typeof RichMenuAliasResponseSchema.infer

export const UpdateRichMenuAliasRequestSchema = type({
  richMenuId: type('string').describe(
    'The rich menu ID to be associated with the rich menu alias.',
  ),
}).configure({ ref: 'UpdateRichMenuAliasRequest' })

export type UpdateRichMenuAliasRequest = typeof UpdateRichMenuAliasRequestSchema.infer

export const RichMenuAliasListResponseSchema = type({
  aliases: type(RichMenuAliasResponseSchema).array().describe('Rich menu aliases.'),
}).configure({ ref: 'RichMenuAliasListResponse' })

export type RichMenuAliasListResponse = typeof RichMenuAliasListResponseSchema.infer

export const RichMenuBulkLinkRequestSchema = type({
  richMenuId: type('string').describe('ID of a rich menu'),
  userIds: type('string[]')
    .and(type('1 <= unknown[] <= 500'))
    .describe(
      'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    ),
}).configure({ ref: 'RichMenuBulkLinkRequest' })

export type RichMenuBulkLinkRequest = typeof RichMenuBulkLinkRequestSchema.infer

export const RichMenuBulkUnlinkRequestSchema = type({
  userIds: type('string[]')
    .and(type('1 <= unknown[] <= 500'))
    .describe(
      'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
    ),
}).configure({ ref: 'RichMenuBulkUnlinkRequest' })

export type RichMenuBulkUnlinkRequest = typeof RichMenuBulkUnlinkRequestSchema.infer

export const RichMenuBatchOperationSchema = type({
  type: type('string').describe(
    'The type of operation to the rich menu linked to the user. One of link, unlink, or unlinkAll.',
  ),
})
  .describe(
    'Rich menu operation object represents the batch operation to the rich menu linked to the user.',
  )
  .configure({ ref: 'RichMenuBatchOperation' })

export type RichMenuBatchOperation = typeof RichMenuBatchOperationSchema.infer

export const RichMenuBatchRequestSchema = type({
  operations: type(type(RichMenuBatchOperationSchema).array())
    .and(type('unknown[] <= 1000'))
    .describe('Array of Rich menu operation object...'),
  'resumeRequestKey?': type('string')
    .and(/^[a-zA-Z0-9_-]{1,100}$/)
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'))
    .describe('Key for retry. Key value is a string matching the regular expression pattern'),
}).configure({ ref: 'RichMenuBatchRequest' })

export type RichMenuBatchRequest = typeof RichMenuBatchRequestSchema.infer

export const RichMenuBatchLinkOperationSchema = type(RichMenuBatchOperationSchema)
  .and(type({ 'from?': 'string', 'to?': 'string' }))
  .describe(
    'Replace the rich menu with the rich menu specified in the `to` property for all users linked to the rich menu specified in the `from` property.',
  )
  .configure({ ref: 'RichMenuBatchLinkOperation' })

export type RichMenuBatchLinkOperation = typeof RichMenuBatchLinkOperationSchema.infer

export const RichMenuBatchUnlinkOperationSchema = type(RichMenuBatchOperationSchema)
  .and(type({ 'from?': 'string' }))
  .describe(
    'Unlink the rich menu for all users linked to the rich menu specified in the `from` property.',
  )
  .configure({ ref: 'RichMenuBatchUnlinkOperation' })

export type RichMenuBatchUnlinkOperation = typeof RichMenuBatchUnlinkOperationSchema.infer

export const RichMenuBatchUnlinkAllOperationSchema = RichMenuBatchOperationSchema.describe(
  'Unlink the rich menu from all users linked to the rich menu.',
).configure({ ref: 'RichMenuBatchUnlinkAllOperation' })

export type RichMenuBatchUnlinkAllOperation = typeof RichMenuBatchUnlinkAllOperationSchema.infer

export const RichMenuBatchProgressPhaseSchema = type("'ongoing' | 'succeeded' | 'failed'")
  .describe(
    "The current status. One of:\n\n`ongoing`: Rich menu batch control is in progress.\n`succeeded`: Rich menu batch control is complete.\n`failed`: Rich menu batch control failed.\n          This means that the rich menu for one or more users couldn't be controlled.\n          There may also be users whose operations have been successfully completed.\n",
  )
  .configure({ ref: 'RichMenuBatchProgressPhase' })

export type RichMenuBatchProgressPhase = typeof RichMenuBatchProgressPhaseSchema.infer

export const RichMenuBatchProgressResponseSchema = type({
  phase: RichMenuBatchProgressPhaseSchema,
  acceptedTime: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The accepted time in milliseconds of the request of batch control the rich menu.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
  ),
  'completedTime?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The completed time in milliseconds of rich menu batch control. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
  ),
}).configure({ ref: 'RichMenuBatchProgressResponse' })

export type RichMenuBatchProgressResponse = typeof RichMenuBatchProgressResponseSchema.infer

export const IssueLinkTokenResponseSchema = type({
  linkToken: type('string').describe(
    'Link token.\nLink tokens are valid for 10 minutes and can only be used once.\n\n',
  ),
}).configure({ ref: 'IssueLinkTokenResponse' })

export type IssueLinkTokenResponse = typeof IssueLinkTokenResponseSchema.infer

export const ChatReferenceSchema = type({ userId: type('string').describe('The target user ID') })
  .describe('Chat reference')
  .configure({ ref: 'ChatReference' })

export type ChatReference = typeof ChatReferenceSchema.infer

export const MarkMessagesAsReadRequestSchema = type({ chat: ChatReferenceSchema }).configure({
  ref: 'MarkMessagesAsReadRequest',
})

export type MarkMessagesAsReadRequest = typeof MarkMessagesAsReadRequestSchema.infer

export const PnpMessagesRequestSchema = type({
  messages: type(type(MessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('Message to be sent.'),
  to: type('string').describe(
    'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
  ),
  'notificationDisabled?': NotificationDisabledSchema,
  'customAggregationUnits?': type(
    type(
      type('string')
        .and(/^[a-zA-Z0-9_]{1,30}$/)
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters')),
    ).array(),
  )
    .and(type('unknown[] <= 1'))
    .describe('Name of aggregation unit. Case-sensitive.'),
}).configure({ ref: 'PnpMessagesRequest' })

export type PnpMessagesRequest = typeof PnpMessagesRequestSchema.infer

export const PnpTemplatedEmphasizedItemSchema = type({
  itemKey: type('string').describe(
    'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
  ),
  content: type('string')
    .narrow((data, ctx) => [...data].length <= 15 || ctx.mustBe('at most 15 characters'))
    .describe('String to be displayed as the value of the item.'),
})
  .describe('Item to emphasize in the message.')
  .configure({ ref: 'PnpTemplatedEmphasizedItem' })

export type PnpTemplatedEmphasizedItem = typeof PnpTemplatedEmphasizedItemSchema.infer

export const PnpTemplatedItemSchema = type({
  itemKey: type('string').describe(
    'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
  ),
  content: type('string')
    .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'))
    .describe('String to be displayed as the value of the item.'),
}).configure({ ref: 'PnpTemplatedItem' })

export type PnpTemplatedItem = typeof PnpTemplatedItemSchema.infer

export const PnpTemplatedButtonSchema = type({
  buttonKey: type('string').describe(
    'Specify the key of the button you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#buttons\n',
  ),
  url: type('string')
    .narrow((data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'))
    .describe('URL of the page to be opened when the user presses the button.'),
}).configure({ ref: 'PnpTemplatedButton' })

export type PnpTemplatedButton = typeof PnpTemplatedButtonSchema.infer

export const PnpTemplatedMessageBodySchema = type({
  'emphasizedItem?': PnpTemplatedEmphasizedItemSchema,
  'items?': type(type(PnpTemplatedItemSchema).array())
    .and(type('unknown[] <= 15'))
    .describe(
      'Array of items to include in the message. The `itemKey` must be unique across `emphasizedItem` and `items`.',
    ),
  'buttons?': type(type(PnpTemplatedButtonSchema).array())
    .and(type('unknown[] <= 2'))
    .describe('Array of buttons to include in the message. The `buttonKey` must be unique.'),
})
  .describe(
    "The body object of the template you want to send. You can't specify the same item more than once in a single message.",
  )
  .configure({ ref: 'PnpTemplatedMessageBody' })

export type PnpTemplatedMessageBody = typeof PnpTemplatedMessageBodySchema.infer

export const PnpTemplatedMessageRequestSchema = type({
  to: type('string').describe(
    'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
  ),
  templateKey: type('string').describe(
    'Specify the key of the template you want to send.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#templates\n',
  ),
  'body?': PnpTemplatedMessageBodySchema,
  'customAggregationUnits?': type(
    type(
      type('string')
        .and(/^[a-zA-Z0-9_]{1,30}$/)
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters')),
    ).array(),
  )
    .and(type('unknown[] <= 1'))
    .describe(
      'Name of aggregation unit. Case-sensitive.\nFor more information about assigning a unit name, see https://developers.line.biz/en/docs/messaging-api/unit-based-statistics-aggregation/#assign-names-to-units-when-sending-messages\n',
    ),
}).configure({ ref: 'PnpTemplatedMessageRequest' })

export type PnpTemplatedMessageRequest = typeof PnpTemplatedMessageRequestSchema.infer

export const EmojiSchema = type({
  'index?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'productId?': 'string',
  'emojiId?': 'string',
}).configure({ ref: 'Emoji' })

export type Emoji = typeof EmojiSchema.infer

export const TextMessageSchema = type(MessageSchema)
  .and(
    type({
      'text?': 'string',
      'emojis?': type(EmojiSchema).array(),
      'quoteToken?': type('string').describe('Quote token of the message you want to quote.'),
    }),
  )
  .configure({ ref: 'TextMessage' })

export type TextMessage = typeof TextMessageSchema.infer

export const SubstitutionObjectSchema = type({
  type: type('string').describe('Type of substitution object'),
})
  .describe('An object that defines the replacement value for a placeholder in the text.')
  .configure({ ref: 'SubstitutionObject' })

export type SubstitutionObject = typeof SubstitutionObjectSchema.infer

export const TextMessageV2Schema = type(MessageSchema)
  .and(
    type({
      'text?': 'string',
      'substitution?': type({ '[string]': SubstitutionObjectSchema }).describe(
        'A mapping that specifies substitutions for parts enclosed in {} within the `text` field.',
      ),
      'quoteToken?': type('string').describe('Quote token of the message you want to quote.'),
    }),
  )
  .configure({ ref: 'TextMessageV2' })

export type TextMessageV2 = typeof TextMessageV2Schema.infer

export const MentionTargetSchema = type({
  type: type('string').describe('Target to be mentioned'),
}).configure({ ref: 'MentionTarget' })

export type MentionTarget = typeof MentionTargetSchema.infer

export const MentionSubstitutionObjectSchema = type(SubstitutionObjectSchema)
  .and(type({ mentionee: MentionTargetSchema }))
  .describe('An object representing a mention substitution.')
  .configure({ ref: 'MentionSubstitutionObject' })

export type MentionSubstitutionObject = typeof MentionSubstitutionObjectSchema.infer

export const UserMentionTargetSchema = type(MentionTargetSchema)
  .and(type({ userId: 'string' }))
  .configure({ ref: 'UserMentionTarget' })

export type UserMentionTarget = typeof UserMentionTargetSchema.infer

export const AllMentionTargetSchema = MentionTargetSchema

export type AllMentionTarget = typeof AllMentionTargetSchema.infer

export const EmojiSubstitutionObjectSchema = type(SubstitutionObjectSchema)
  .and(type({ productId: 'string', emojiId: 'string' }))
  .describe('An object representing a emoji substitution.')
  .configure({ ref: 'EmojiSubstitutionObject' })

export type EmojiSubstitutionObject = typeof EmojiSubstitutionObjectSchema.infer

export const StickerMessageSchema = type(MessageSchema)
  .and(
    type({
      'packageId?': 'string',
      'stickerId?': 'string',
      'quoteToken?': type('string').describe('Quote token of the message you want to quote.'),
    }),
  )
  .configure({ ref: 'StickerMessage' })

export type StickerMessage = typeof StickerMessageSchema.infer

export const ImageMessageSchema = type(MessageSchema)
  .and(type({ 'originalContentUrl?': 'string.url', 'previewImageUrl?': 'string.url' }))
  .configure({ ref: 'ImageMessage' })

export type ImageMessage = typeof ImageMessageSchema.infer

export const VideoMessageSchema = type(MessageSchema)
  .and(
    type({
      'originalContentUrl?': 'string.url',
      'previewImageUrl?': 'string.url',
      'trackingId?': 'string',
    }),
  )
  .configure({ ref: 'VideoMessage' })

export type VideoMessage = typeof VideoMessageSchema.infer

export const AudioMessageSchema = type(MessageSchema)
  .and(
    type({
      'originalContentUrl?': 'string.url',
      'duration?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'AudioMessage' })

export type AudioMessage = typeof AudioMessageSchema.infer

export const LocationMessageSchema = type(MessageSchema)
  .and(
    type({
      'title?': 'string',
      'address?': 'string',
      'latitude?': 'number',
      'longitude?': 'number',
    }),
  )
  .configure({ ref: 'LocationMessage' })

export type LocationMessage = typeof LocationMessageSchema.infer

export const ImagemapBaseSizeSchema = type({
  height: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  width: 'number.integer >= -2147483648 & number.integer <= 2147483647',
}).configure({ ref: 'ImagemapBaseSize' })

export type ImagemapBaseSize = typeof ImagemapBaseSizeSchema.infer

export const ImagemapAreaSchema = type({
  x: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  y: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  width: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  height: 'number.integer >= -2147483648 & number.integer <= 2147483647',
}).configure({ ref: 'ImagemapArea' })

export type ImagemapArea = typeof ImagemapAreaSchema.infer

export const ImagemapActionSchema = type({ type: 'string', area: ImagemapAreaSchema }).configure({
  ref: 'ImagemapAction',
})

export type ImagemapAction = typeof ImagemapActionSchema.infer

export const ImagemapExternalLinkSchema = type({
  'linkUri?': 'string.url',
  'label?': 'string',
}).configure({ ref: 'ImagemapExternalLink' })

export type ImagemapExternalLink = typeof ImagemapExternalLinkSchema.infer

export const ImagemapVideoSchema = type({
  'originalContentUrl?': 'string.url',
  'previewImageUrl?': 'string.url',
  'area?': ImagemapAreaSchema,
  'externalLink?': ImagemapExternalLinkSchema,
}).configure({ ref: 'ImagemapVideo' })

export type ImagemapVideo = typeof ImagemapVideoSchema.infer

export const ImagemapMessageSchema = type(MessageSchema)
  .and(
    type({
      'baseUrl?': 'string.url',
      'altText?': 'string',
      'baseSize?': ImagemapBaseSizeSchema,
      'actions?': type(ImagemapActionSchema).array(),
      'video?': ImagemapVideoSchema,
    }),
  )
  .configure({ ref: 'ImagemapMessage' })

export type ImagemapMessage = typeof ImagemapMessageSchema.infer

export const MessageImagemapActionSchema = type(ImagemapActionSchema)
  .and(type({ 'text?': 'string', 'label?': 'string' }))
  .configure({ ref: 'MessageImagemapAction' })

export type MessageImagemapAction = typeof MessageImagemapActionSchema.infer

export const URIImagemapActionSchema = type(ImagemapActionSchema)
  .and(type({ 'linkUri?': 'string', 'label?': 'string' }))
  .configure({ ref: 'URIImagemapAction' })

export type URIImagemapAction = typeof URIImagemapActionSchema.infer

export const ClipboardImagemapActionSchema = type(ImagemapActionSchema)
  .and(
    type({
      'clipboardText?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'))
        .describe('Text that is copied to the clipboard.\nMax character limit: 1000\n'),
      'label?': 'string',
    }),
  )
  .configure({ ref: 'ClipboardImagemapAction' })

export type ClipboardImagemapAction = typeof ClipboardImagemapActionSchema.infer

export const TemplateSchema = type({ type: 'string' }).configure({ ref: 'Template' })

export type Template = typeof TemplateSchema.infer

export const TemplateMessageSchema = type(MessageSchema)
  .and(type({ 'altText?': 'string', 'template?': TemplateSchema }))
  .configure({ ref: 'TemplateMessage' })

export type TemplateMessage = typeof TemplateMessageSchema.infer

export const ButtonsTemplateSchema = type(TemplateSchema)
  .and(
    type({
      'thumbnailImageUrl?': 'string.url',
      'imageAspectRatio?': 'string',
      'imageSize?': 'string',
      'imageBackgroundColor?': 'string',
      'title?': 'string',
      'text?': 'string',
      'defaultAction?': ActionSchema,
      'actions?': type(ActionSchema).array(),
    }),
  )
  .configure({ ref: 'ButtonsTemplate' })

export type ButtonsTemplate = typeof ButtonsTemplateSchema.infer

export const TemplateImageAspectRatioSchema = type("'rectangle' | 'square'")
  .describe(
    'Aspect ratio of the image. This is only for the `imageAspectRatio` in ButtonsTemplate.\nSpecify one of the following values:\n\n`rectangle`: 1.51:1\n`square`: 1:1\n',
  )
  .configure({ ref: 'TemplateImageAspectRatio' })

export type TemplateImageAspectRatio = typeof TemplateImageAspectRatioSchema.infer

export const TemplateImageSizeSchema = type("'cover' | 'contain'")
  .describe(
    'Size of the image.  This is only for the `imageSize` in ButtonsTemplate.\nSpecify one of the following values:\n\n`cover`: The image fills the entire image area. Parts of the image that do not fit in the area are not displayed.\n`contain`: The entire image is displayed in the image area. A background is displayed in the unused areas to the left and right of vertical images and in the areas above and below horizontal images.\n',
  )
  .configure({ ref: 'TemplateImageSize' })

export type TemplateImageSize = typeof TemplateImageSizeSchema.infer

export const ConfirmTemplateSchema = type(TemplateSchema)
  .and(type({ 'text?': 'string', 'actions?': type(ActionSchema).array() }))
  .configure({ ref: 'ConfirmTemplate' })

export type ConfirmTemplate = typeof ConfirmTemplateSchema.infer

export const CarouselColumnSchema = type({
  'thumbnailImageUrl?': 'string.url',
  'imageBackgroundColor?': 'string',
  'title?': 'string',
  text: 'string',
  'defaultAction?': ActionSchema,
  actions: type(ActionSchema).array(),
})
  .describe('Column object for carousel template.')
  .configure({ ref: 'CarouselColumn' })

export type CarouselColumn = typeof CarouselColumnSchema.infer

export const CarouselTemplateSchema = type(TemplateSchema)
  .and(
    type({
      'columns?': type(CarouselColumnSchema).array(),
      'imageAspectRatio?': 'string',
      'imageSize?': 'string',
    }),
  )
  .configure({ ref: 'CarouselTemplate' })

export type CarouselTemplate = typeof CarouselTemplateSchema.infer

export const ImageCarouselColumnSchema = type({
  imageUrl: 'string.url',
  action: ActionSchema,
}).configure({ ref: 'ImageCarouselColumn' })

export type ImageCarouselColumn = typeof ImageCarouselColumnSchema.infer

export const ImageCarouselTemplateSchema = type(TemplateSchema)
  .and(type({ 'columns?': type(ImageCarouselColumnSchema).array() }))
  .configure({ ref: 'ImageCarouselTemplate' })

export type ImageCarouselTemplate = typeof ImageCarouselTemplateSchema.infer

export const CouponMessageSchema = type(MessageSchema)
  .and(
    type({
      'couponId?': type('string').describe('Unique identifier of the coupon.'),
      'deliveryTag?': type('string')
        .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters'))
        .describe(
          'Delivery route tag information. It can be used for analysis in LINE OA Manager.',
        ),
    }),
  )
  .configure({ ref: 'CouponMessage' })

export type CouponMessage = typeof CouponMessageSchema.infer

export const FlexContainerSchema = type({ type: 'string' }).configure({ ref: 'FlexContainer' })

export type FlexContainer = typeof FlexContainerSchema.infer

export const FlexMessageSchema = type(MessageSchema)
  .and(type({ 'altText?': 'string', 'contents?': FlexContainerSchema }))
  .configure({ ref: 'FlexMessage' })

export type FlexMessage = typeof FlexMessageSchema.infer

export const FlexBlockStyleSchema = type({
  'backgroundColor?': 'string',
  'separator?': 'boolean',
  'separatorColor?': 'string',
}).configure({ ref: 'FlexBlockStyle' })

export type FlexBlockStyle = typeof FlexBlockStyleSchema.infer

export const FlexBubbleStylesSchema = type({
  'header?': FlexBlockStyleSchema,
  'hero?': FlexBlockStyleSchema,
  'body?': FlexBlockStyleSchema,
  'footer?': FlexBlockStyleSchema,
}).configure({ ref: 'FlexBubbleStyles' })

export type FlexBubbleStyles = typeof FlexBubbleStylesSchema.infer

export const FlexComponentSchema = type({ type: 'string' }).configure({ ref: 'FlexComponent' })

export type FlexComponent = typeof FlexComponentSchema.infer

export const FlexBoxBackgroundSchema = type({ type: 'string' }).configure({
  ref: 'FlexBoxBackground',
})

export type FlexBoxBackground = typeof FlexBoxBackgroundSchema.infer

export const FlexBoxSchema = type(FlexComponentSchema)
  .and(
    type({
      'layout?': "'horizontal' | 'vertical' | 'baseline'",
      'flex?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
      'contents?': type(FlexComponentSchema).array(),
      'spacing?': 'string',
      'margin?': 'string',
      'position?': "'relative' | 'absolute'",
      'offsetTop?': 'string',
      'offsetBottom?': 'string',
      'offsetStart?': 'string',
      'offsetEnd?': 'string',
      'backgroundColor?': 'string',
      'borderColor?': 'string',
      'borderWidth?': 'string',
      'cornerRadius?': 'string',
      'width?': 'string',
      'maxWidth?': 'string',
      'height?': 'string',
      'maxHeight?': 'string',
      'paddingAll?': 'string',
      'paddingTop?': 'string',
      'paddingBottom?': 'string',
      'paddingStart?': 'string',
      'paddingEnd?': 'string',
      'action?': ActionSchema,
      'justifyContent?':
        "'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'",
      'alignItems?': "'center' | 'flex-start' | 'flex-end'",
      'background?': FlexBoxBackgroundSchema,
    }),
  )
  .configure({ ref: 'FlexBox' })

export type FlexBox = typeof FlexBoxSchema.infer

export const FlexBubbleSchema = type(FlexContainerSchema)
  .and(
    type({
      'direction?': "'ltr' | 'rtl'",
      'styles?': FlexBubbleStylesSchema,
      'header?': FlexBoxSchema,
      'hero?': FlexComponentSchema,
      'body?': FlexBoxSchema,
      'footer?': FlexBoxSchema,
      'size?': "'nano' | 'micro' | 'deca' | 'hecto' | 'kilo' | 'mega' | 'giga'",
      'action?': ActionSchema,
    }),
  )
  .configure({ ref: 'FlexBubble' })

export type FlexBubble = typeof FlexBubbleSchema.infer

export const FlexCarouselSchema = type(FlexContainerSchema)
  .and(type({ 'contents?': type(FlexBubbleSchema).array() }))
  .configure({ ref: 'FlexCarousel' })

export type FlexCarousel = typeof FlexCarouselSchema.infer

export const FlexBoxBorderWidthSchema = type(
  "'none' | 'light' | 'normal' | 'medium' | 'semi-bold' | 'bold'",
)
  .describe(
    'Width of box border. This is only for `borderWidth` in FlexBox.\nA value of none means that borders are not rendered; the other values are listed in order of increasing width.\n',
  )
  .configure({ ref: 'FlexBoxBorderWidth' })

export type FlexBoxBorderWidth = typeof FlexBoxBorderWidthSchema.infer

export const FlexBoxCornerRadiusSchema = type("'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'")
  .describe(
    'Radius at the time of rounding the corners of the box. This is only for `cornerRadius` in FlexBox.\nA value of none means that corners are not rounded; the other values are listed in order of increasing radius.\n',
  )
  .configure({ ref: 'FlexBoxCornerRadius' })

export type FlexBoxCornerRadius = typeof FlexBoxCornerRadiusSchema.infer

export const FlexBoxSpacingSchema = type("'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'")
  .describe(
    'You can specify the minimum space between two components with the `spacing` property of the parent box component, in pixels or with a keyword.\nFlexBoxSpacing just provides only keywords.\n',
  )
  .configure({ ref: 'FlexBoxSpacing' })

export type FlexBoxSpacing = typeof FlexBoxSpacingSchema.infer

export const FlexMarginSchema = type("'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'")
  .describe(
    'You can specify the minimum space before a child component with the `margin` property of the child component, in pixels or with a keyword.\nFlexMargin just provides only keywords.\n',
  )
  .configure({ ref: 'FlexMargin' })

export type FlexMargin = typeof FlexMarginSchema.infer

export const FlexBoxPaddingSchema = type("'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'")
  .describe(
    'Padding can be specified in pixels, percentage (to the parent box width) or with a keyword.\nFlexBoxPadding just provides only keywords.\n',
  )
  .configure({ ref: 'FlexBoxPadding' })

export type FlexBoxPadding = typeof FlexBoxPaddingSchema.infer

export const FlexImageSizeSchema = type(
  "'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl' | 'full'",
)
  .describe(
    'You can set the width of an Flex image component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexImageSize just provides only keywords.\n',
  )
  .configure({ ref: 'FlexImageSize' })

export type FlexImageSize = typeof FlexImageSizeSchema.infer

export const FlexIconSizeSchema = type(
  "'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl'",
)
  .describe(
    'You can set the width of an Flex icon component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexIconSize just provides only keywords.\n',
  )
  .configure({ ref: 'FlexIconSize' })

export type FlexIconSize = typeof FlexIconSizeSchema.infer

export const FlexTextFontSizeSchema = type(
  "'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl'",
)
  .describe(
    'Font size in the `size` property of the Flex text component.\nYou can specify the size in pixels or with a keyword.\nFlexTextFontSize just provides only keywords.\n',
  )
  .configure({ ref: 'FlexTextFontSize' })

export type FlexTextFontSize = typeof FlexTextFontSizeSchema.infer

export const FlexSpanSizeSchema = type(
  "'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl'",
)
  .describe(
    'Font size in the `size` property of the Flex span component.\nYou can specify the size in pixels or with a keyword.\nFlexSpanSize just provides only keywords.\n',
  )
  .configure({ ref: 'FlexSpanSize' })

export type FlexSpanSize = typeof FlexSpanSizeSchema.infer

export const FlexOffsetSchema = type("'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'")
  .describe(
    'You can specify the offset of a component with the `offset*` property, in pixels or with a keyword.\nYou can also specify the percentage to the box width for `offsetStart` and `offsetEnd` and to the box height for `offsetTop` and `offsetBottom`.\nFlexOffset just provides only keywords.\n',
  )
  .configure({ ref: 'FlexOffset' })

export type FlexOffset = typeof FlexOffsetSchema.infer

export const FlexButtonSchema = type(FlexComponentSchema)
  .and(
    type({
      'flex?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
      'color?': 'string',
      'style?': "'primary' | 'secondary' | 'link'",
      'action?': ActionSchema,
      'gravity?': "'top' | 'bottom' | 'center'",
      'margin?': 'string',
      'position?': "'relative' | 'absolute'",
      'offsetTop?': 'string',
      'offsetBottom?': 'string',
      'offsetStart?': 'string',
      'offsetEnd?': 'string',
      'height?': "'md' | 'sm'",
      'adjustMode?': "'shrink-to-fit'",
      'scaling?': 'boolean',
    }),
  )
  .configure({ ref: 'FlexButton' })

export type FlexButton = typeof FlexButtonSchema.infer

export const FlexImageSchema = type(FlexComponentSchema)
  .and(
    type({
      'url?': type('string.url').describe(
        'Image URL (Max character limit: 2000)\nProtocol: HTTPS (TLS 1.2 or later)\nImage format: JPEG or PNG\nMaximum image size: 1024×1024 pixels\nMaximum file size: 10 MB (300 KB when the animated property is true)\n',
      ),
      'flex?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
        'The ratio of the width or height of this component within the parent box.',
      ),
      'margin?': type('string').describe(
        'The minimum amount of space to include before this component in its parent container.\n',
      ),
      'position?': type("'relative' | 'absolute'").describe(
        'Reference for offsetTop, offsetBottom, offsetStart, and offsetEnd. Specify one of the following values:\n\n`relative`: Use the previous box as reference.\n`absolute`: Use the top left of parent element as reference. The default value is relative.\n',
      ),
      'offsetTop?': type('string').describe('Offset.'),
      'offsetBottom?': type('string').describe('Offset.'),
      'offsetStart?': type('string').describe('Offset.'),
      'offsetEnd?': type('string').describe('Offset.'),
      'align?': type("'start' | 'end' | 'center'").describe(
        'Alignment style in horizontal direction.\n',
      ),
      'gravity?': type("'top' | 'bottom' | 'center'").describe(
        'Alignment style in vertical direction.',
      ),
      'size?': type('string').describe('The maximum image width. This is md by default.\n'),
      'aspectRatio?': type('string').describe(
        'Aspect ratio of the image.\n`{width}:{height}` format.\nSpecify the value of `{width}` and `{height}` in the range from `1` to `100000`.\nHowever, you cannot set `{height}` to a value that is more than three times the value of `{width}`.\nThe default value is `1:1`.\n',
      ),
      'aspectMode?': type("'fit' | 'cover'").describe(
        'The display style of the image if the aspect ratio of the image and that specified by the aspectRatio property do not match.\n',
      ),
      'backgroundColor?': type('string').describe(
        'Background color of the image. Use a hexadecimal color code.',
      ),
      'action?': ActionSchema,
      'animated?': type('boolean').describe(
        "When this is `true`, an animated image (APNG) plays.\nYou can specify a value of true up to 10 images in a single message.\nYou can't send messages that exceed this limit.\nThis is `false` by default.\nAnimated images larger than 300 KB aren't played back.\n",
      ),
    }),
  )
  .configure({ ref: 'FlexImage' })

export type FlexImage = typeof FlexImageSchema.infer

export const FlexVideoSchema = type(FlexComponentSchema)
  .and(
    type({
      'url?': 'string.url',
      'previewUrl?': 'string.url',
      'altContent?': FlexComponentSchema,
      'aspectRatio?': 'string',
      'action?': ActionSchema,
    }),
  )
  .configure({ ref: 'FlexVideo' })

export type FlexVideo = typeof FlexVideoSchema.infer

export const FlexIconSchema = type(FlexComponentSchema)
  .and(
    type({
      'url?': 'string.url',
      'size?': 'string',
      'aspectRatio?': 'string',
      'margin?': 'string',
      'position?': "'relative' | 'absolute'",
      'offsetTop?': 'string',
      'offsetBottom?': 'string',
      'offsetStart?': 'string',
      'offsetEnd?': 'string',
      'scaling?': 'boolean',
    }),
  )
  .configure({ ref: 'FlexIcon' })

export type FlexIcon = typeof FlexIconSchema.infer

export const FlexSpanSchema = type(FlexComponentSchema)
  .and(
    type({
      'text?': 'string',
      'size?': 'string',
      'color?': 'string',
      'weight?': "'regular' | 'bold'",
      'style?': "'normal' | 'italic'",
      'decoration?': "'none' | 'underline' | 'line-through'",
    }),
  )
  .configure({ ref: 'FlexSpan' })

export type FlexSpan = typeof FlexSpanSchema.infer

export const FlexTextSchema = type(FlexComponentSchema)
  .and(
    type({
      'flex?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
      'text?': 'string',
      'size?': 'string',
      'align?': "'start' | 'end' | 'center'",
      'gravity?': "'top' | 'bottom' | 'center'",
      'color?': 'string',
      'weight?': "'regular' | 'bold'",
      'style?': "'normal' | 'italic'",
      'decoration?': "'none' | 'underline' | 'line-through'",
      'wrap?': 'boolean',
      'lineSpacing?': 'string',
      'margin?': 'string',
      'position?': "'relative' | 'absolute'",
      'offsetTop?': 'string',
      'offsetBottom?': 'string',
      'offsetStart?': 'string',
      'offsetEnd?': 'string',
      'action?': ActionSchema,
      'maxLines?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
      'contents?': type(FlexSpanSchema).array(),
      'adjustMode?': "'shrink-to-fit'",
      'scaling?': 'boolean',
    }),
  )
  .configure({ ref: 'FlexText' })

export type FlexText = typeof FlexTextSchema.infer

export const FlexSeparatorSchema = type(FlexComponentSchema)
  .and(type({ 'margin?': 'string', 'color?': 'string' }))
  .configure({ ref: 'FlexSeparator' })

export type FlexSeparator = typeof FlexSeparatorSchema.infer

export const FlexFillerSchema = type(FlexComponentSchema)
  .and(type({ 'flex?': 'number.integer >= -2147483648 & number.integer <= 2147483647' }))
  .configure({ ref: 'FlexFiller' })

export type FlexFiller = typeof FlexFillerSchema.infer

export const FlexBoxLinearGradientSchema = type(FlexBoxBackgroundSchema)
  .and(
    type({
      'angle?': 'string',
      'startColor?': 'string',
      'endColor?': 'string',
      'centerColor?': 'string',
      'centerPosition?': 'string',
    }),
  )
  .configure({ ref: 'FlexBoxLinearGradient' })

export type FlexBoxLinearGradient = typeof FlexBoxLinearGradientSchema.infer

export const CameraActionSchema = ActionSchema

export type CameraAction = typeof CameraActionSchema.infer

export const CameraRollActionSchema = ActionSchema

export type CameraRollAction = typeof CameraRollActionSchema.infer

export const ClipboardActionSchema = type(ActionSchema)
  .and(
    type({
      clipboardText: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'))
        .describe('Text that is copied to the clipboard.\nMax character limit: 1000\n'),
    }),
  )
  .configure({ ref: 'ClipboardAction' })

export type ClipboardAction = typeof ClipboardActionSchema.infer

export const DatetimePickerActionSchema = type(ActionSchema)
  .and(
    type({
      'data?': type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
      'mode?': "'date' | 'time' | 'datetime'",
      'initial?': 'string',
      'max?': 'string',
      'min?': 'string',
    }),
  )
  .configure({ ref: 'DatetimePickerAction' })

export type DatetimePickerAction = typeof DatetimePickerActionSchema.infer

export const LocationActionSchema = ActionSchema

export type LocationAction = typeof LocationActionSchema.infer

export const MessageActionSchema = type(ActionSchema)
  .and(type({ 'text?': 'string' }))
  .configure({ ref: 'MessageAction' })

export type MessageAction = typeof MessageActionSchema.infer

export const PostbackActionSchema = type(ActionSchema)
  .and(
    type({
      'data?': type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
      'displayText?': 'string',
      'text?': 'string',
      'inputOption?': "'closeRichMenu' | 'openRichMenu' | 'openKeyboard' | 'openVoice'",
      'fillInText?': 'string',
    }),
  )
  .configure({ ref: 'PostbackAction' })

export type PostbackAction = typeof PostbackActionSchema.infer

export const RichMenuSwitchActionSchema = type(ActionSchema)
  .and(
    type({
      'data?': type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
      'richMenuAliasId?': type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  )
  .configure({ ref: 'RichMenuSwitchAction' })

export type RichMenuSwitchAction = typeof RichMenuSwitchActionSchema.infer

export const AltUriSchema = type({
  'desktop?': type('string')
    .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
    .narrow((data, ctx) => [...data].length <= 10000 || ctx.mustBe('at most 10000 characters')),
}).configure({ ref: 'AltUri' })

export type AltUri = typeof AltUriSchema.infer

export const URIActionSchema = type(ActionSchema)
  .and(
    type({
      'uri?': type('string.url').narrow(
        (data, ctx) => [...data].length <= 10000 || ctx.mustBe('at most 10000 characters'),
      ),
      'altUri?': AltUriSchema,
    }),
  )
  .configure({ ref: 'URIAction' })

export type URIAction = typeof URIActionSchema.infer

export const SubscribedMembershipPlanSchema = type({
  membershipId: type('number.integer').describe('Membership plan ID.'),
  title: type('string').describe('Membership plan name.'),
  description: type('string').describe('Membership plan description.'),
  benefits: type('string[]').and(type('unknown[] >= 1')).describe('List of membership plan perks.'),
  price: type('number').describe('Monthly fee for membership plan. (e.g. 1500.00)'),
  currency: type("'JPY' | 'TWD' | 'THB'").describe('The currency of membership.price.'),
})
  .describe('Object containing information about the membership plan.')
  .configure({ ref: 'SubscribedMembershipPlan' })

export type SubscribedMembershipPlan = typeof SubscribedMembershipPlanSchema.infer

export const SubscribedMembershipUserSchema = type({
  membershipNo: type('number.integer').describe("The user's member number in the membership plan."),
  joinedTime: type('number.integer').describe(
    'UNIX timestamp at which the user subscribed to the membership.',
  ),
  nextBillingDate: type('string').describe(
    'Next payment date for membership plan.\n- Format: yyyy-MM-dd (e.g. 2024-02-08)\n- Timezone: UTC+9\n',
  ),
  totalSubscriptionMonths: type('number.integer').describe(
    'The period of time in months that the user has been subscribed to a membership plan. If a user previously canceled and then re-subscribed to the same membership plan, only the period after the re-subscription will be counted.',
  ),
})
  .describe('Object containing user membership subscription information.')
  .configure({ ref: 'SubscribedMembershipUser' })

export type SubscribedMembershipUser = typeof SubscribedMembershipUserSchema.infer

export const SubscriptionSchema = type({
  membership: SubscribedMembershipPlanSchema,
  user: SubscribedMembershipUserSchema,
})
  .describe('An array of memberships.')
  .configure({ ref: 'Subscription' })

export type Subscription = typeof SubscriptionSchema.infer

export const GetMembershipSubscriptionResponseSchema = type({
  subscriptions: type(type(SubscriptionSchema).array())
    .and(type('unknown[] >= 0'))
    .describe('List of subscription information'),
})
  .describe("A user's membership subscription status")
  .configure({ ref: 'GetMembershipSubscriptionResponse' })

export type GetMembershipSubscriptionResponse = typeof GetMembershipSubscriptionResponseSchema.infer

export const MembershipSchema = type({
  membershipId: type('number.integer').describe('Membership plan ID.'),
  title: type('string').describe('Membership plan name.'),
  description: type('string').describe('Membership plan description.'),
  benefits: type('string[]').and(type('unknown[] >= 1')).describe('List of membership plan perks.'),
  price: type('number').describe('Monthly fee for membership plan. (e.g. 1500.00)'),
  currency: type("'JPY' | 'TWD' | 'THB'").describe('The currency of membership.price.'),
  memberCount: type('number.integer').describe(
    'Number of members subscribed to the membership plan.',
  ),
  memberLimit: type('number.integer | null').describe(
    'The upper limit of members who can subscribe. If no upper limit is set, it will be null.',
  ),
  isInAppPurchase: type('boolean').describe(
    'Payment method for users who subscribe to a membership plan.',
  ),
  isPublished: type('boolean').describe('Membership plan status.'),
}).configure({ ref: 'Membership' })

export type Membership = typeof MembershipSchema.infer

export const MembershipListResponseSchema = type({
  memberships: type(type(MembershipSchema).array())
    .and(type('unknown[] >= 0'))
    .describe('List of membership information'),
})
  .describe('List of memberships')
  .configure({ ref: 'MembershipListResponse' })

export type MembershipListResponse = typeof MembershipListResponseSchema.infer

export const GetJoinedMembershipUsersResponseSchema = type({
  userIds: type('string[]')
    .and(type('unknown[] <= 1000'))
    .describe(
      'A list of user IDs who joined the membership.\nUsers who have not agreed to the bot user agreement, are not following the bot, or are not active will be excluded.\nIf there are no users in the membership, an empty list will be returned.\n',
    ),
  'next?': type('string').describe(
    "A continuation token to get next remaining membership user IDs.\nReturned only when there are remaining user IDs that weren't returned in the userIds property in the previous request.\nThe continuation token expires in 24 hours (86,400 seconds).\n\n",
  ),
})
  .describe('List of users who have joined the membership')
  .configure({ ref: 'GetJoinedMembershipUsersResponse' })

export type GetJoinedMembershipUsersResponse = typeof GetJoinedMembershipUsersResponseSchema.infer

export const AcquisitionConditionRequestSchema = type({
  type: type('string').describe('Determines how the coupon is distributed or used.'),
}).configure({ ref: 'AcquisitionConditionRequest' })

export type AcquisitionConditionRequest = typeof AcquisitionConditionRequestSchema.infer

export const CouponRewardRequestSchema = type({
  type: type('string').describe('Type of coupon. Determines the benefit provided.'),
}).configure({ ref: 'CouponRewardRequest' })

export type CouponRewardRequest = typeof CouponRewardRequestSchema.infer

export const CouponCreateRequestSchema = type({
  acquisitionCondition: AcquisitionConditionRequestSchema,
  'barcodeImageUrl?': type('string').describe(
    'URL of the barcode image associated with the coupon. Used for in-store redemption.',
  ),
  'couponCode?': type('string').describe(
    'Unique code to be presented by the user to redeem the coupon. Optional.',
  ),
  'description?': type('string')
    .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
    .narrow((data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'))
    .describe('Detailed description of the coupon. Displayed to users.'),
  endTimestamp: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Coupon expiration time (epoch seconds). Coupon cannot be used after this time.'),
  'imageUrl?': type('string').describe(
    'URL of the main image representing the coupon. Displayed in the coupon list.',
  ),
  maxUseCountPerTicket: type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 1',
  ).describe(
    'Maximum number of times a single coupon ticket can be used. Use -1 to indicate no limit.',
  ),
  startTimestamp: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Coupon start time (epoch seconds). Coupon can be used from this time.'),
  title: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 60 || ctx.mustBe('at most 60 characters'))
    .describe('Title of the coupon. Displayed in the coupon list.'),
  'usageCondition?': type('string')
    .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'))
    .describe('Conditions for using the coupon. Shown to users.'),
  'reward?': CouponRewardRequestSchema,
  visibility: type("'UNLISTED' | 'PUBLIC'").describe(
    'Visibility of the coupon. Determines who can see or acquire the coupon.',
  ),
  timezone: type
    .enumerated(
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
    )
    .describe('Timezone for interpreting start and end timestamps.'),
})
  .describe('Request object for creating a coupon. Contains all configurable coupon properties.')
  .configure({ ref: 'CouponCreateRequest' })

export type CouponCreateRequest = typeof CouponCreateRequestSchema.infer

export const NormalAcquisitionConditionRequestSchema = AcquisitionConditionRequestSchema

export type NormalAcquisitionConditionRequest = typeof NormalAcquisitionConditionRequestSchema.infer

export const LotteryAcquisitionConditionRequestSchema = type(AcquisitionConditionRequestSchema)
  .and(
    type({
      lotteryProbability: type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 99',
      ).describe('Probability (1-99) of winning the coupon in lottery-type campaigns.'),
      maxAcquireCount: type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 999999',
      ).describe(
        'Maximum number of coupons that can be issued in total. Use -1 to indicate no limit',
      ),
    }),
  )
  .configure({ ref: 'LotteryAcquisitionConditionRequest' })

export type LotteryAcquisitionConditionRequest =
  typeof LotteryAcquisitionConditionRequestSchema.infer

export const CashBackPriceInfoRequestSchema = type({ type: 'string' }).configure({
  ref: 'CashBackPriceInfoRequest',
})

export type CashBackPriceInfoRequest = typeof CashBackPriceInfoRequestSchema.infer

export const CouponCashBackRewardRequestSchema = type(CouponRewardRequestSchema)
  .and(type({ 'priceInfo?': CashBackPriceInfoRequestSchema }))
  .configure({ ref: 'CouponCashBackRewardRequest' })

export type CouponCashBackRewardRequest = typeof CouponCashBackRewardRequestSchema.infer

export const DiscountPriceInfoRequestSchema = type({ type: 'string' }).configure({
  ref: 'DiscountPriceInfoRequest',
})

export type DiscountPriceInfoRequest = typeof DiscountPriceInfoRequestSchema.infer

export const CouponDiscountRewardRequestSchema = type(CouponRewardRequestSchema)
  .and(type({ 'priceInfo?': DiscountPriceInfoRequestSchema }))
  .configure({ ref: 'CouponDiscountRewardRequest' })

export type CouponDiscountRewardRequest = typeof CouponDiscountRewardRequestSchema.infer

export const CouponFreeRewardRequestSchema = CouponRewardRequestSchema

export type CouponFreeRewardRequest = typeof CouponFreeRewardRequestSchema.infer

export const CouponGiftRewardRequestSchema = CouponRewardRequestSchema

export type CouponGiftRewardRequest = typeof CouponGiftRewardRequestSchema.infer

export const CouponOthersRewardRequestSchema = CouponRewardRequestSchema

export type CouponOthersRewardRequest = typeof CouponOthersRewardRequestSchema.infer

export const CashBackFixedPriceInfoRequestSchema = type(CashBackPriceInfoRequestSchema)
  .and(
    type({
      'fixedAmount?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'CashBackFixedPriceInfoRequest' })

export type CashBackFixedPriceInfoRequest = typeof CashBackFixedPriceInfoRequestSchema.infer

export const CashBackPercentagePriceInfoRequestSchema = type(CashBackPriceInfoRequestSchema)
  .and(
    type({
      'percentage?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 99',
      ).describe(
        'Specifies the cashback rate as a percentage. Must be an integer between 1 and 99.',
      ),
    }),
  )
  .configure({ ref: 'CashBackPercentagePriceInfoRequest' })

export type CashBackPercentagePriceInfoRequest =
  typeof CashBackPercentagePriceInfoRequestSchema.infer

export const DiscountFixedPriceInfoRequestSchema = type(DiscountPriceInfoRequestSchema)
  .and(
    type({
      'fixedAmount?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'DiscountFixedPriceInfoRequest' })

export type DiscountFixedPriceInfoRequest = typeof DiscountFixedPriceInfoRequestSchema.infer

export const DiscountPercentagePriceInfoRequestSchema = type(DiscountPriceInfoRequestSchema)
  .and(
    type({
      'percentage?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 99',
      ).describe(
        'Specifies the discount rate as a percentage. Must be an integer between 1 and 99.',
      ),
    }),
  )
  .configure({ ref: 'DiscountPercentagePriceInfoRequest' })

export type DiscountPercentagePriceInfoRequest =
  typeof DiscountPercentagePriceInfoRequestSchema.infer

export const DiscountExplicitPriceInfoRequestSchema = type(DiscountPriceInfoRequestSchema)
  .and(
    type({
      'priceAfterDiscount?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'originalPrice?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'DiscountExplicitPriceInfoRequest' })

export type DiscountExplicitPriceInfoRequest = typeof DiscountExplicitPriceInfoRequestSchema.infer

export const CouponCreateResponseSchema = type({
  couponId: type('string').describe('Unique identifier of the coupon.'),
})
  .describe('Response object returned after creating a coupon. Contains the coupon ID.')
  .configure({ ref: 'CouponCreateResponse' })

export type CouponCreateResponse = typeof CouponCreateResponseSchema.infer

export const AcquisitionConditionResponseSchema = type({
  type: type('string').describe('Determines how the coupon is distributed or used.'),
}).configure({ ref: 'AcquisitionConditionResponse' })

export type AcquisitionConditionResponse = typeof AcquisitionConditionResponseSchema.infer

export const CouponRewardResponseSchema = type({
  type: type('string').describe('Type of coupon. Determines the benefit provided.'),
}).configure({ ref: 'CouponRewardResponse' })

export type CouponRewardResponse = typeof CouponRewardResponseSchema.infer

export const CouponResponseSchema = type({
  'acquisitionCondition?': AcquisitionConditionResponseSchema,
  'barcodeImageUrl?': type('string.url').describe(
    'URL of the barcode image associated with the coupon. Used for in-store redemption.',
  ),
  'couponCode?': type('string').describe(
    'Unique code to be presented by the user to redeem the coupon.',
  ),
  'description?': type('string').describe(
    'Detailed description of the coupon. Displayed to users.',
  ),
  'endTimestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Coupon expiration time (epoch seconds). Coupon cannot be used after this time.'),
  'imageUrl?': type('string.url').describe(
    'URL of the main image representing the coupon. Displayed in the coupon list.',
  ),
  'maxAcquireCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Maximum number of coupons that can be issued in total.'),
  'maxUseCountPerTicket?': type(
    'number.integer >= -2147483648 & number.integer <= 2147483647',
  ).describe('Maximum number of times a single coupon ticket can be used.'),
  'maxTicketPerUser?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Maximum number of coupon tickets a single user can acquire.'),
  'startTimestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Coupon start time (epoch seconds). Coupon can be used from this time.'),
  'title?': type('string').describe('Title of the coupon. Displayed in the coupon list.'),
  'usageCondition?': type('string').describe('Conditions for using the coupon. Shown to users.'),
  'reward?': CouponRewardResponseSchema,
  'visibility?': type("'UNLISTED' | 'PUBLIC' | 'PRIVATE'").describe(
    'Visibility of the coupon. Determines who can see or acquire the coupon.',
  ),
  'timezone?': type
    .enumerated(
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
    )
    .describe('Timezone for interpreting start and end timestamps.'),
  'couponId?': type('string').describe('Unique identifier of the coupon.'),
  'createdTimestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Created timestamp (seconds) of the coupon.'),
  'status?': type("'DRAFT' | 'RUNNING' | 'CLOSED'").describe('Current status of the coupon.'),
})
  .describe('Detailed information about a coupon, including all properties and current status.')
  .configure({ ref: 'CouponResponse' })

export type CouponResponse = typeof CouponResponseSchema.infer

export const NormalAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type NormalAcquisitionConditionResponse =
  typeof NormalAcquisitionConditionResponseSchema.infer

export const LotteryAcquisitionConditionResponseSchema = type(AcquisitionConditionResponseSchema)
  .and(
    type({
      'lotteryProbability?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
      'maxAcquireCount?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
    }),
  )
  .configure({ ref: 'LotteryAcquisitionConditionResponse' })

export type LotteryAcquisitionConditionResponse =
  typeof LotteryAcquisitionConditionResponseSchema.infer

export const ReferralAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type ReferralAcquisitionConditionResponse =
  typeof ReferralAcquisitionConditionResponseSchema.infer

export const CashBackPriceInfoResponseSchema = type({ type: 'string' }).configure({
  ref: 'CashBackPriceInfoResponse',
})

export type CashBackPriceInfoResponse = typeof CashBackPriceInfoResponseSchema.infer

export const CouponCashBackRewardResponseSchema = type(CouponRewardResponseSchema)
  .and(type({ 'priceInfo?': CashBackPriceInfoResponseSchema }))
  .configure({ ref: 'CouponCashBackRewardResponse' })

export type CouponCashBackRewardResponse = typeof CouponCashBackRewardResponseSchema.infer

export const DiscountPriceInfoResponseSchema = type({ type: 'string' }).configure({
  ref: 'DiscountPriceInfoResponse',
})

export type DiscountPriceInfoResponse = typeof DiscountPriceInfoResponseSchema.infer

export const CouponDiscountRewardResponseSchema = type(CouponRewardResponseSchema)
  .and(type({ 'priceInfo?': DiscountPriceInfoResponseSchema }))
  .configure({ ref: 'CouponDiscountRewardResponse' })

export type CouponDiscountRewardResponse = typeof CouponDiscountRewardResponseSchema.infer

export const CouponFreeRewardResponseSchema = CouponRewardResponseSchema

export type CouponFreeRewardResponse = typeof CouponFreeRewardResponseSchema.infer

export const CouponGiftRewardResponseSchema = CouponRewardResponseSchema

export type CouponGiftRewardResponse = typeof CouponGiftRewardResponseSchema.infer

export const CouponOthersRewardResponseSchema = CouponRewardResponseSchema

export type CouponOthersRewardResponse = typeof CouponOthersRewardResponseSchema.infer

export const CashBackFixedPriceInfoResponseSchema = type(CashBackPriceInfoResponseSchema)
  .and(
    type({
      'currency?': type("'JPY' | 'THB' | 'TWD'").describe('Currency code (e.g., JPY, THB, TWD).'),
      'fixedAmount?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'CashBackFixedPriceInfoResponse' })

export type CashBackFixedPriceInfoResponse = typeof CashBackFixedPriceInfoResponseSchema.infer

export const CashBackPercentagePriceInfoResponseSchema = type(CashBackPriceInfoResponseSchema)
  .and(type({ 'percentage?': 'number.integer >= -2147483648 & number.integer <= 2147483647' }))
  .configure({ ref: 'CashBackPercentagePriceInfoResponse' })

export type CashBackPercentagePriceInfoResponse =
  typeof CashBackPercentagePriceInfoResponseSchema.infer

export const DiscountFixedPriceInfoResponseSchema = type(DiscountPriceInfoResponseSchema)
  .and(
    type({
      'currency?': type("'JPY' | 'THB' | 'TWD'").describe('Currency code (e.g., JPY, THB, TWD).'),
      'fixedAmount?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'DiscountFixedPriceInfoResponse' })

export type DiscountFixedPriceInfoResponse = typeof DiscountFixedPriceInfoResponseSchema.infer

export const DiscountPercentagePriceInfoResponseSchema = type(DiscountPriceInfoResponseSchema)
  .and(type({ 'percentage?': 'number.integer >= -2147483648 & number.integer <= 2147483647' }))
  .configure({ ref: 'DiscountPercentagePriceInfoResponse' })

export type DiscountPercentagePriceInfoResponse =
  typeof DiscountPercentagePriceInfoResponseSchema.infer

export const DiscountExplicitPriceInfoResponseSchema = type(DiscountPriceInfoResponseSchema)
  .and(
    type({
      'currency?': type("'JPY' | 'THB' | 'TWD'").describe('Currency code (e.g., JPY, THB, TWD).'),
      'priceAfterDiscount?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'originalPrice?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .configure({ ref: 'DiscountExplicitPriceInfoResponse' })

export type DiscountExplicitPriceInfoResponse = typeof DiscountExplicitPriceInfoResponseSchema.infer

export const CouponListResponseSchema = type({
  couponId: type('string').describe('Unique identifier of the coupon.'),
  title: type('string').describe('Title of the coupon. Displayed in the coupon list.'),
})
  .describe('Summary information about a coupon, used in coupon lists.')
  .configure({ ref: 'CouponListResponse' })

export type CouponListResponse = typeof CouponListResponseSchema.infer

export const MessagingApiPagerCouponListResponseSchema = type({
  items: type(CouponListResponseSchema).array().describe('List of coupon summary objects.'),
  'next?': type('string').describe('Token for fetching the next page of results.'),
})
  .describe('Paginated response object containing a list of coupons.')
  .configure({ ref: 'MessagingApiPagerCouponListResponse' })

export type MessagingApiPagerCouponListResponse =
  typeof MessagingApiPagerCouponListResponseSchema.infer

export const ShowLoadingAnimationRequestSchema = type({
  chatId: type('string').describe(
    'User ID of the target user for whom the loading animation is to be displayed.',
  ),
  'loadingSeconds?': type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 60',
  ).describe(
    'The number of seconds to display the loading indicator.\nIt must be a multiple of 5. The maximum value is 60 seconds.\n',
  ),
}).configure({ ref: 'ShowLoadingAnimationRequest' })

export type ShowLoadingAnimationRequest = typeof ShowLoadingAnimationRequestSchema.infer

export const ShowLoadingAnimationResponseSchema = type({}).configure({
  ref: 'ShowLoadingAnimationResponse',
})

export type ShowLoadingAnimationResponse = typeof ShowLoadingAnimationResponseSchema.infer

export const MarkMessagesAsReadByTokenRequestSchema = type({
  markAsReadToken: type('string').describe('Token used to mark messages as read.'),
}).configure({ ref: 'MarkMessagesAsReadByTokenRequest' })

export type MarkMessagesAsReadByTokenRequest = typeof MarkMessagesAsReadByTokenRequestSchema.infer

export const ErrorDetailSchema = type({
  'message?': type('string').describe(
    'Details of the error. Not included in the response under certain situations.',
  ),
  'property?': type('string').describe(
    'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
  ),
}).configure({ ref: 'ErrorDetail' })

export type ErrorDetail = typeof ErrorDetailSchema.infer

export const ErrorResponseSchema = type({
  message: type('string').describe('Message containing information about the error.'),
  'details?': type(ErrorDetailSchema)
    .array()
    .describe(
      'An array of error details. If the array is empty, this property will not be included in the response.',
    ),
  'sentMessages?': type(type(SentMessageSchema).array())
    .and(type('1 <= unknown[] <= 5'))
    .describe('Array of sent messages.'),
}).configure({ ref: 'ErrorResponse' })

export type ErrorResponse = typeof ErrorResponseSchema.infer

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
