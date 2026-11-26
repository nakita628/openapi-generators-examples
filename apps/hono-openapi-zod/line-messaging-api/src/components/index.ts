import * as z from 'zod'

export const GetWebhookEndpointResponseSchema = z
  .object({
    endpoint: z.url().meta({ description: 'Webhook URL' }),
    active: z
      .boolean()
      .meta({
        description:
          'Webhook usage status. Send a webhook event from the LINE Platform to the webhook URL only if enabled.\n\n`true`: Webhook usage is enabled.\n`false`: Webhook usage is disabled.\n',
      }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information',
    },
  })
  .meta({ ref: 'GetWebhookEndpointResponse' })

export type GetWebhookEndpointResponse = z.infer<typeof GetWebhookEndpointResponseSchema>

export const SetWebhookEndpointRequestSchema = z
  .object({ endpoint: z.url().min(0).max(500).meta({ description: 'A valid webhook URL.' }) })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url',
    },
  })
  .meta({ ref: 'SetWebhookEndpointRequest' })

export type SetWebhookEndpointRequest = z.infer<typeof SetWebhookEndpointRequestSchema>

export const TestWebhookEndpointRequestSchema = z
  .object({
    endpoint: z
      .url()
      .min(0)
      .max(500)
      .meta({ description: 'A webhook URL to be validated.' })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  })
  .meta({ ref: 'TestWebhookEndpointRequest' })

export type TestWebhookEndpointRequest = z.infer<typeof TestWebhookEndpointRequestSchema>

export const TestWebhookEndpointResponseSchema = z
  .object({
    success: z
      .boolean()
      .meta({
        description: 'Result of the communication from the LINE platform to the webhook URL.',
      })
      .exactOptional(),
    timestamp: z.iso
      .datetime({ offset: true })
      .meta({
        description:
          'Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered.\n',
      }),
    statusCode: z
      .int32()
      .meta({
        description:
          "The HTTP status code. If the webhook response isn't received, the status code is set to zero or a negative number.",
      }),
    reason: z.string().meta({ description: 'Reason for the response.' }),
    detail: z.string().meta({ description: 'Details of the response.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
    },
  })
  .meta({ ref: 'TestWebhookEndpointResponse' })

export type TestWebhookEndpointResponse = z.infer<typeof TestWebhookEndpointResponseSchema>

export const GetMessageContentTranscodingResponseSchema = z
  .object({
    status: z
      .enum(['processing', 'succeeded', 'failed'])
      .meta({
        description:
          'The preparation status. One of:\n\n`processing`: Preparing to get content.\n`succeeded`: Ready to get the content. You can get the content sent by users.\n`failed`: Failed to prepare to get the content.\n',
      }),
  })
  .meta({
    description: 'Transcoding response',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status',
    },
  })
  .meta({ ref: 'GetMessageContentTranscodingResponse' })

export type GetMessageContentTranscodingResponse = z.infer<
  typeof GetMessageContentTranscodingResponseSchema
>

export const ActionSchema = z
  .object({
    type: z.string().meta({ description: 'Type of action' }).exactOptional(),
    label: z.string().meta({ description: 'Label for the action.' }).exactOptional(),
  })
  .meta({
    description: 'Action',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#action-objects' },
  })
  .meta({ ref: 'Action' })

export type Action = z.infer<typeof ActionSchema>

export const QuickReplyItemSchema = z
  .object({
    imageUrl: z
      .url()
      .max(2000)
      .meta({ description: 'URL of the icon that is displayed at the beginning of the button' })
      .exactOptional(),
    action: ActionSchema.exactOptional(),
    type: z.string().default('action').meta({ description: '`action`' }).exactOptional(),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' },
  })
  .meta({ ref: 'QuickReplyItem' })

export type QuickReplyItem = z.infer<typeof QuickReplyItemSchema>

export const QuickReplySchema = z
  .object({
    items: z
      .array(QuickReplyItemSchema)
      .max(13)
      .meta({ description: 'Quick reply button objects.' })
      .exactOptional(),
  })
  .meta({
    description: 'Quick reply',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#items-object' },
  })
  .meta({ ref: 'QuickReply' })

export type QuickReply = z.infer<typeof QuickReplySchema>

export const SenderSchema = z
  .object({
    name: z
      .string()
      .max(20)
      .meta({ description: 'Display name. Certain words such as `LINE` may not be used.' })
      .exactOptional(),
    iconUrl: z
      .url()
      .max(2000)
      .meta({ description: 'URL of the image to display as an icon when sending a message' })
      .exactOptional(),
  })
  .meta({ description: 'Change icon and display name' })
  .meta({ ref: 'Sender' })

export type Sender = z.infer<typeof SenderSchema>

export const MessageSchema = z
  .object({
    type: z.string().meta({ description: 'Type of message' }),
    quickReply: QuickReplySchema.exactOptional(),
    sender: SenderSchema.exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#message-common-properties',
    },
  })
  .meta({ ref: 'Message' })

export type Message = z.infer<typeof MessageSchema>

export const NotificationDisabledSchema = z
  .boolean()
  .default(false)
  .meta({
    description:
      '`true`: The user doesn’t receive a push notification when a message is sent.\n`false`: The user receives a push notification when the message is sent (unless they have disabled push notifications in LINE and/or their device).\nThe default value is false.\n',
  })
  .meta({ ref: 'NotificationDisabled' })

export type NotificationDisabled = z.infer<typeof NotificationDisabledSchema>

export const ReplyMessageRequestSchema = z
  .object({
    replyToken: z.string().meta({ description: 'replyToken received via webhook.' }),
    messages: z.array(MessageSchema).min(1).max(5).meta({ description: 'List of messages.' }),
    notificationDisabled: NotificationDisabledSchema.exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message',
    },
  })
  .meta({ ref: 'ReplyMessageRequest' })

export type ReplyMessageRequest = z.infer<typeof ReplyMessageRequestSchema>

export const SentMessageSchema = z
  .object({
    id: z.string().meta({ description: 'ID of the sent message.' }),
    quoteToken: z
      .string()
      .meta({
        description:
          'Quote token of the message. Only included when a message object that can be specified as a quote target was sent as a push or reply message.\n',
      })
      .exactOptional(),
  })
  .meta({ ref: 'SentMessage' })

export type SentMessage = z.infer<typeof SentMessageSchema>

export const ReplyMessageResponseSchema = z
  .object({
    sentMessages: z
      .array(SentMessageSchema)
      .min(1)
      .max(5)
      .meta({ description: 'Array of sent messages.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message-response',
    },
  })
  .meta({ ref: 'ReplyMessageResponse' })

export type ReplyMessageResponse = z.infer<typeof ReplyMessageResponseSchema>

export const PushMessageRequestSchema = z
  .object({
    to: z.string().meta({ description: 'ID of the receiver.' }),
    messages: z
      .array(MessageSchema)
      .min(1)
      .max(5)
      .meta({ description: 'List of Message objects.' }),
    notificationDisabled: NotificationDisabledSchema.exactOptional(),
    customAggregationUnits: z
      .array(z.string())
      .meta({
        description:
          'List of aggregation unit name. Case-sensitive.\nThis functions can only be used by corporate users who have submitted the required applications.\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message',
    },
  })
  .meta({ ref: 'PushMessageRequest' })

export type PushMessageRequest = z.infer<typeof PushMessageRequestSchema>

export const PushMessageResponseSchema = z
  .object({
    sentMessages: z
      .array(SentMessageSchema)
      .min(1)
      .max(5)
      .meta({ description: 'Array of sent messages.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message-response',
    },
  })
  .meta({ ref: 'PushMessageResponse' })

export type PushMessageResponse = z.infer<typeof PushMessageResponseSchema>

export const MulticastRequestSchema = z
  .object({
    messages: z.array(MessageSchema).min(1).max(5).meta({ description: 'Messages to send' }),
    to: z
      .array(z.string())
      .min(1)
      .max(500)
      .meta({
        description:
          'Array of user IDs. Use userId values which are returned in webhook event objects. Do not use LINE IDs found on LINE.',
      }),
    notificationDisabled: NotificationDisabledSchema.exactOptional(),
    customAggregationUnits: z
      .array(
        z
          .string()
          .regex(/^[a-zA-Z0-9_]{1,30}$/)
          .min(1)
          .max(30),
      )
      .max(1)
      .meta({ description: 'Name of aggregation unit. Case-sensitive.' })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-message',
    },
  })
  .meta({ ref: 'MulticastRequest' })

export type MulticastRequest = z.infer<typeof MulticastRequestSchema>

export const MulticastResponseSchema = z
  .object({})
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-response',
    },
  })
  .meta({ ref: 'MulticastResponse' })

export type MulticastResponse = z.infer<typeof MulticastResponseSchema>

export const RecipientSchema = z
  .object({ type: z.string().meta({ description: 'Type of recipient' }).exactOptional() })
  .meta({ description: 'Recipient' })
  .meta({ ref: 'Recipient' })

export type Recipient = z.infer<typeof RecipientSchema>

export const DemographicFilterSchema = z
  .object({ type: z.string().meta({ description: 'Type of demographic filter' }).exactOptional() })
  .meta({ description: 'Demographic filter' })
  .meta({ ref: 'DemographicFilter' })

export type DemographicFilter = z.infer<typeof DemographicFilterSchema>

export const FilterSchema = z
  .object({ demographic: DemographicFilterSchema.exactOptional() })
  .meta({ description: 'Filter for narrowcast' })
  .meta({ ref: 'Filter' })

export type Filter = z.infer<typeof FilterSchema>

export const LimitSchema = z
  .object({
    max: z
      .int32()
      .min(1)
      .meta({
        description:
          'The maximum number of narrowcast messages to send.\nUse this parameter to limit the number of narrowcast messages sent.\nThe recipients will be chosen at random.\n',
      })
      .exactOptional(),
    upToRemainingQuota: z
      .boolean()
      .default(false)
      .meta({
        description:
          'If true, the message will be sent within the maximum number of deliverable messages. The default value is `false`.\n\nTargets will be selected at random.\n',
      })
      .exactOptional(),
    forbidPartialDelivery: z
      .boolean()
      .default(false)
      .meta({
        description:
          'This option prevents messages from being delivered to only a subset of the target audience.\nIf true, the narrowcast request success but fails asynchronously.\nYou can check whether message delivery was canceled by retrieving the narrowcast message progress.\n\nThis property can be set to true only if upToRemainingQuota is set to true.\n',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Limit of the Narrowcast',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  })
  .meta({ ref: 'Limit' })

export type Limit = z.infer<typeof LimitSchema>

export const NarrowcastRequestSchema = z
  .object({
    messages: z
      .array(MessageSchema)
      .min(1)
      .max(5)
      .meta({ description: 'List of Message objects.' }),
    recipient: RecipientSchema.exactOptional(),
    filter: FilterSchema.exactOptional(),
    limit: LimitSchema.exactOptional(),
    notificationDisabled: NotificationDisabledSchema.exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  })
  .meta({ ref: 'NarrowcastRequest' })

export type NarrowcastRequest = z.infer<typeof NarrowcastRequestSchema>

export const NarrowcastResponseSchema = z
  .object({})
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-response',
    },
  })
  .meta({ ref: 'NarrowcastResponse' })

export type NarrowcastResponse = z.infer<typeof NarrowcastResponseSchema>

export const OperatorRecipientSchema = z
  .intersection(
    RecipientSchema,
    z.object({
      and: z
        .array(RecipientSchema)
        .meta({
          description:
            'Create a new recipient object by taking the logical conjunction (AND) of the specified array of recipient objects.\n',
        })
        .exactOptional(),
      or: z
        .array(RecipientSchema)
        .meta({
          description:
            'Create a new recipient object by taking the logical disjunction (OR) of the specified array of recipient objects.\n',
        })
        .exactOptional(),
      not: RecipientSchema.exactOptional(),
    }),
  )
  .meta({ ref: 'OperatorRecipient' })

export type OperatorRecipient = z.infer<typeof OperatorRecipientSchema>

export const AudienceRecipientSchema = z
  .intersection(
    RecipientSchema,
    z.object({
      audienceGroupId: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({ ref: 'AudienceRecipient' })

export type AudienceRecipient = z.infer<typeof AudienceRecipientSchema>

export const RedeliveryRecipientSchema = z
  .intersection(RecipientSchema, z.object({ requestId: z.string().exactOptional() }))
  .meta({ ref: 'RedeliveryRecipient' })

export type RedeliveryRecipient = z.infer<typeof RedeliveryRecipientSchema>

export const AgeDemographicSchema = z
  .enum([
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
  .meta({ ref: 'AgeDemographic' })

export type AgeDemographic = z.infer<typeof AgeDemographicSchema>

export const AgeDemographicFilterSchema = z
  .intersection(
    DemographicFilterSchema,
    z.object({
      gte: AgeDemographicSchema.exactOptional(),
      lt: AgeDemographicSchema.exactOptional(),
    }),
  )
  .meta({ ref: 'AgeDemographicFilter' })

export type AgeDemographicFilter = z.infer<typeof AgeDemographicFilterSchema>

export const AppTypeDemographicSchema = z
  .enum(['ios', 'android'])
  .meta({ ref: 'AppTypeDemographic' })

export type AppTypeDemographic = z.infer<typeof AppTypeDemographicSchema>

export const AppTypeDemographicFilterSchema = z
  .intersection(
    DemographicFilterSchema,
    z.object({ oneOf: z.array(AppTypeDemographicSchema).exactOptional() }),
  )
  .meta({ ref: 'AppTypeDemographicFilter' })

export type AppTypeDemographicFilter = z.infer<typeof AppTypeDemographicFilterSchema>

export const AreaDemographicSchema = z
  .enum([
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
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
    },
  })
  .meta({ ref: 'AreaDemographic' })

export type AreaDemographic = z.infer<typeof AreaDemographicSchema>

export const AreaDemographicFilterSchema = z
  .intersection(
    DemographicFilterSchema,
    z.object({ oneOf: z.array(AreaDemographicSchema).exactOptional() }),
  )
  .meta({ ref: 'AreaDemographicFilter' })

export type AreaDemographicFilter = z.infer<typeof AreaDemographicFilterSchema>

export const GenderDemographicSchema = z.enum(['male', 'female']).meta({ ref: 'GenderDemographic' })

export type GenderDemographic = z.infer<typeof GenderDemographicSchema>

export const GenderDemographicFilterSchema = z
  .intersection(
    DemographicFilterSchema,
    z.object({ oneOf: z.array(GenderDemographicSchema).exactOptional() }),
  )
  .meta({ ref: 'GenderDemographicFilter' })

export type GenderDemographicFilter = z.infer<typeof GenderDemographicFilterSchema>

export const OperatorDemographicFilterSchema = z
  .intersection(
    DemographicFilterSchema,
    z.object({
      and: z.array(DemographicFilterSchema).exactOptional(),
      or: z.array(DemographicFilterSchema).exactOptional(),
      not: DemographicFilterSchema.exactOptional(),
    }),
  )
  .meta({ ref: 'OperatorDemographicFilter' })

export type OperatorDemographicFilter = z.infer<typeof OperatorDemographicFilterSchema>

export const SubscriptionPeriodDemographicSchema = z
  .enum(['day_7', 'day_30', 'day_90', 'day_180', 'day_365'])
  .meta({ ref: 'SubscriptionPeriodDemographic' })

export type SubscriptionPeriodDemographic = z.infer<typeof SubscriptionPeriodDemographicSchema>

export const SubscriptionPeriodDemographicFilterSchema = z
  .intersection(
    DemographicFilterSchema,
    z.object({
      gte: SubscriptionPeriodDemographicSchema.exactOptional(),
      lt: SubscriptionPeriodDemographicSchema.exactOptional(),
    }),
  )
  .meta({ ref: 'SubscriptionPeriodDemographicFilter' })

export type SubscriptionPeriodDemographicFilter = z.infer<
  typeof SubscriptionPeriodDemographicFilterSchema
>

export const NarrowcastProgressResponseSchema = z
  .object({
    phase: z
      .enum(['waiting', 'sending', 'succeeded', 'failed'])
      .meta({
        description:
          'The current status. One of:\n\n`waiting`: Messages are not yet ready to be sent. They are currently being filtered or processed in some way.\n`sending`: Messages are currently being sent.\n`succeeded`: Messages were sent successfully. This may not mean the messages were successfully received.\n`failed`: Messages failed to be sent. Use the failedDescription property to find the cause of the failure.\n',
      }),
    successCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The number of users who successfully received the message.' })
      .exactOptional(),
    failureCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The number of users who failed to send the message.' })
      .exactOptional(),
    targetCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The number of intended recipients of the message.' })
      .exactOptional(),
    failedDescription: z
      .string()
      .meta({
        description:
          'The reason the message failed to be sent. This is only included with a `phase` property value of `failed`.',
      })
      .exactOptional(),
    errorCode: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          "Error summary. This is only included with a phase property value of failed.\nOne of:\n\n`1`: An internal error occurred.\n`2`: An error occurred because there weren't enough recipients.\n`3`: A conflict error of requests occurs because a request that has already been accepted is retried.\n`4`: An audience of less than 50 recipients is included as a condition of sending.\n`5`: Message delivery has been canceled to prevent messages from being delivered only to a subset of the target audience.\n",
      })
      .exactOptional(),
    acceptedTime: z.iso
      .datetime({ offset: true })
      .meta({
        description:
          'Narrowcast message request accepted time in milliseconds.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
      }),
    completedTime: z.iso
      .datetime({ offset: true })
      .meta({
        description:
          'Processing of narrowcast message request completion time in milliseconds. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)\nTimezone: UTC\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status',
    },
  })
  .meta({ ref: 'NarrowcastProgressResponse' })

export type NarrowcastProgressResponse = z.infer<typeof NarrowcastProgressResponseSchema>

export const BroadcastRequestSchema = z
  .object({
    messages: z
      .array(MessageSchema)
      .min(1)
      .max(5)
      .meta({ description: 'List of Message objects.' }),
    notificationDisabled: NotificationDisabledSchema.exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message',
    },
  })
  .meta({ ref: 'BroadcastRequest' })

export type BroadcastRequest = z.infer<typeof BroadcastRequestSchema>

export const BroadcastResponseSchema = z
  .object({})
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-response',
    },
  })
  .meta({ ref: 'BroadcastResponse' })

export type BroadcastResponse = z.infer<typeof BroadcastResponseSchema>

export const QuotaTypeSchema = z
  .enum(['none', 'limited'])
  .meta({
    description: 'One of the following values to indicate whether a target limit is set or not.',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
  })
  .meta({ ref: 'QuotaType' })

export type QuotaType = z.infer<typeof QuotaTypeSchema>

export const MessageQuotaResponseSchema = z
  .object({
    type: QuotaTypeSchema,
    value: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'The target limit for sending messages in the current month. This property is returned when the `type` property has a value of `limited`.\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
  })
  .meta({ ref: 'MessageQuotaResponse' })

export type MessageQuotaResponse = z.infer<typeof MessageQuotaResponseSchema>

export const QuotaConsumptionResponseSchema = z
  .object({
    totalUsage: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The number of sent messages in the current month' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-consumption',
    },
  })
  .meta({ ref: 'QuotaConsumptionResponse' })

export type QuotaConsumptionResponse = z.infer<typeof QuotaConsumptionResponseSchema>

export const NumberOfMessagesResponseSchema = z
  .object({
    status: z
      .enum(['ready', 'unready', 'unavailable_for_privacy', 'out_of_service'])
      .meta({
        description:
          "Aggregation process status. One of:\n\n`ready`: The number of messages can be obtained.\n`unready`: We haven't finished calculating the number of sent messages for the specified in date. For example, this property is returned when the delivery date or a future date is specified. Calculation usually takes about a day.\n`unavailable_for_privacy`: The total number of messages on the specified day is less than 20.\n`out_of_service`: The specified date is earlier than the date on which we first started calculating sent messages (March 31, 2018).\n",
      }),
    success: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'The number of messages delivered using the phone number on the date specified in `date`.\nThe response has this property only when the value of `status` is `ready`.\n\n',
      })
      .exactOptional(),
  })
  .meta({ ref: 'NumberOfMessagesResponse' })

export type NumberOfMessagesResponse = z.infer<typeof NumberOfMessagesResponseSchema>

export const ValidateMessageRequestSchema = z
  .object({
    messages: z
      .array(MessageSchema)
      .min(1)
      .max(5)
      .meta({ description: 'Array of message objects to validate' }),
  })
  .meta({ ref: 'ValidateMessageRequest' })

export type ValidateMessageRequest = z.infer<typeof ValidateMessageRequestSchema>

export const GetAggregationUnitUsageResponseSchema = z
  .object({
    numOfCustomAggregationUnits: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Number of aggregation units used this month.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month',
    },
  })
  .meta({ ref: 'GetAggregationUnitUsageResponse' })

export type GetAggregationUnitUsageResponse = z.infer<typeof GetAggregationUnitUsageResponseSchema>

export const GetAggregationUnitNameListResponseSchema = z
  .object({
    customAggregationUnits: z
      .array(z.string())
      .meta({
        description:
          'An array of strings indicating the names of aggregation units used this month.',
      }),
    next: z
      .string()
      .meta({
        description:
          "A continuation token to get the next array of unit names.\nReturned only when there are remaining aggregation units that weren't returned in customAggregationUnits in the original request.\n\n",
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month',
    },
  })
  .meta({ ref: 'GetAggregationUnitNameListResponse' })

export type GetAggregationUnitNameListResponse = z.infer<
  typeof GetAggregationUnitNameListResponseSchema
>

export const UserProfileResponseSchema = z
  .object({
    displayName: z.string().meta({ description: "User's display name" }),
    userId: z.string().meta({ description: 'User ID' }),
    pictureUrl: z
      .url()
      .meta({
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      })
      .exactOptional(),
    statusMessage: z
      .string()
      .meta({
        description:
          "User's status message. Not included in the response if the user doesn't have a status message.",
      })
      .exactOptional(),
    language: z
      .string()
      .meta({
        description:
          "User's language, as a BCP 47 language tag. Not included in the response if the user hasn't yet consented to the LINE Privacy Policy.",
        examples: ['en'],
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-profile' },
  })
  .meta({ ref: 'UserProfileResponse' })

export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>

export const GetFollowersResponseSchema = z
  .object({
    userIds: z
      .array(z.string())
      .max(1000)
      .meta({
        description:
          'An array of strings indicating user IDs of users that have added the LINE Official Account as a friend.\nOnly users of LINE for iOS and LINE for Android are included in `userIds`.\n',
      }),
    next: z
      .string()
      .meta({
        description:
          "A continuation token to get the next array of user IDs.\nReturned only when there are remaining user IDs that weren't returned in `userIds` in the original request.\nThe number of user IDs in the `userIds` element doesn't have to reach the maximum number specified by `limit` for the `next` property to be included in the response.\n\n",
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-follower-ids',
    },
  })
  .meta({ ref: 'GetFollowersResponse' })

export type GetFollowersResponse = z.infer<typeof GetFollowersResponseSchema>

export const BotInfoResponseSchema = z
  .object({
    userId: z.string().meta({ description: "Bot's user ID" }),
    basicId: z.string().meta({ description: "Bot's basic ID" }),
    premiumId: z
      .string()
      .meta({
        description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
      })
      .exactOptional(),
    displayName: z.string().meta({ description: "Bot's display name" }),
    pictureUrl: z
      .url()
      .meta({
        description:
          "Profile image URL. `https` image URL. Not included in the response if the bot doesn't have a profile image.",
      })
      .exactOptional(),
    chatMode: z
      .enum(['chat', 'bot'])
      .meta({
        description:
          'Chat settings set in the LINE Official Account Manager. One of:\n\n`chat`: Chat is set to "On".\n`bot`: Chat is set to "Off".\n',
      }),
    markAsReadMode: z
      .enum(['auto', 'manual'])
      .meta({
        description:
          'Automatic read setting for messages. If the chat is set to "Off", auto is returned. If the chat is set to "On", manual is returned.\n\n`auto`: Auto read setting is enabled.\n`manual`: Auto read setting is disabled.\n\n',
      }),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-bot-info' },
  })
  .meta({ ref: 'BotInfoResponse' })

export type BotInfoResponse = z.infer<typeof BotInfoResponseSchema>

export const GroupUserProfileResponseSchema = z
  .object({
    displayName: z.string().meta({ description: "User's display name" }),
    userId: z.string().meta({ description: 'User ID' }),
    pictureUrl: z
      .url()
      .meta({
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile',
    },
  })
  .meta({ ref: 'GroupUserProfileResponse' })

export type GroupUserProfileResponse = z.infer<typeof GroupUserProfileResponseSchema>

export const RoomUserProfileResponseSchema = z
  .object({
    displayName: z.string().meta({ description: "User's display name" }),
    userId: z.string().meta({ description: 'User ID' }),
    pictureUrl: z
      .url()
      .meta({
        description:
          "Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image.",
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile',
    },
  })
  .meta({ ref: 'RoomUserProfileResponse' })

export type RoomUserProfileResponse = z.infer<typeof RoomUserProfileResponseSchema>

export const MembersIdsResponseSchema = z
  .object({
    memberIds: z
      .array(z.string())
      .max(100)
      .meta({
        description:
          'List of user IDs of members in the group chat. Only users of LINE for iOS and LINE for Android are included in `memberIds`.',
      }),
    next: z
      .string()
      .meta({
        description:
          'A continuation token to get the next array of user IDs of the members in the group chat.\nReturned only when there are remaining user IDs that were not returned in `memberIds` in the original request.\n',
      })
      .exactOptional(),
  })
  .meta({ ref: 'MembersIdsResponse' })

export type MembersIdsResponse = z.infer<typeof MembersIdsResponseSchema>

export const GroupSummaryResponseSchema = z
  .object({
    groupId: z.string().meta({ description: 'Group ID' }),
    groupName: z.string().meta({ description: 'Group name' }),
    pictureUrl: z
      .url()
      .meta({
        description:
          "Group icon URL. Not included in the response if the user doesn't set a group profile icon.",
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-summary',
    },
  })
  .meta({ ref: 'GroupSummaryResponse' })

export type GroupSummaryResponse = z.infer<typeof GroupSummaryResponseSchema>

export const GroupMemberCountResponseSchema = z
  .object({
    count: z
      .int32()
      .meta({
        description:
          'The count of members in the group chat. The number returned excludes the LINE Official Account.',
      }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-group-count',
    },
  })
  .meta({ ref: 'GroupMemberCountResponse' })

export type GroupMemberCountResponse = z.infer<typeof GroupMemberCountResponseSchema>

export const RoomMemberCountResponseSchema = z
  .object({
    count: z
      .int32()
      .meta({
        description:
          'The count of members in the multi-person chat. The number returned excludes the LINE Official Account.',
      }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-room-count',
    },
  })
  .meta({ ref: 'RoomMemberCountResponse' })

export type RoomMemberCountResponse = z.infer<typeof RoomMemberCountResponseSchema>

export const RichMenuSizeSchema = z
  .object({
    width: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64().min(1n).max(2147483647n))
      .meta({ description: 'width' })
      .exactOptional(),
    height: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64().min(1n).max(2147483647n))
      .meta({ description: 'height' })
      .exactOptional(),
  })
  .meta({ description: 'Rich menu size' })
  .meta({ ref: 'RichMenuSize' })

export type RichMenuSize = z.infer<typeof RichMenuSizeSchema>

export const RichMenuBoundsSchema = z
  .object({
    x: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64().min(0n).max(2147483647n))
      .meta({ description: 'Horizontal position relative to the top-left corner of the area.' })
      .exactOptional(),
    y: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64().min(0n).max(2147483647n))
      .meta({ description: 'Vertical position relative to the top-left corner of the area.' })
      .exactOptional(),
    width: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64().min(1n).max(2147483647n))
      .meta({ description: 'Width of the area.' })
      .exactOptional(),
    height: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64().min(1n).max(2147483647n))
      .meta({ description: 'Height of the area.' })
      .exactOptional(),
  })
  .meta({
    description: 'Rich menu bounds',
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#bounds-object' },
  })
  .meta({ ref: 'RichMenuBounds' })

export type RichMenuBounds = z.infer<typeof RichMenuBoundsSchema>

export const RichMenuAreaSchema = z
  .object({ bounds: RichMenuBoundsSchema.exactOptional(), action: ActionSchema.exactOptional() })
  .meta({ description: 'Rich menu area' })
  .meta({ ref: 'RichMenuArea' })

export type RichMenuArea = z.infer<typeof RichMenuAreaSchema>

export const RichMenuRequestSchema = z
  .object({
    size: RichMenuSizeSchema.exactOptional(),
    selected: z
      .boolean()
      .meta({ description: '`true` to display the rich menu by default. Otherwise, `false`.' })
      .exactOptional(),
    name: z
      .string()
      .max(300)
      .meta({
        description:
          'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
      })
      .exactOptional(),
    chatBarText: z
      .string()
      .max(14)
      .meta({ description: 'Text displayed in the chat bar' })
      .exactOptional(),
    areas: z
      .array(RichMenuAreaSchema)
      .meta({
        description:
          'Array of area objects which define the coordinates and size of tappable areas',
      })
      .exactOptional(),
  })
  .meta({ ref: 'RichMenuRequest' })

export type RichMenuRequest = z.infer<typeof RichMenuRequestSchema>

export const RichMenuIdResponseSchema = z
  .object({ richMenuId: z.string().meta({ description: 'Rich menu ID' }) })
  .meta({ ref: 'RichMenuIdResponse' })

export type RichMenuIdResponse = z.infer<typeof RichMenuIdResponseSchema>

export const RichMenuResponseSchema = z
  .object({
    richMenuId: z.string().meta({ description: 'ID of a rich menu' }),
    size: RichMenuSizeSchema,
    selected: z
      .boolean()
      .meta({ description: '`true` to display the rich menu by default. Otherwise, `false`.' }),
    name: z
      .string()
      .max(300)
      .meta({
        description:
          'Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users.',
      }),
    chatBarText: z.string().max(14).meta({ description: 'Text displayed in the chat bar' }),
    areas: z
      .array(RichMenuAreaSchema)
      .max(20)
      .meta({
        description:
          'Array of area objects which define the coordinates and size of tappable areas',
      }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#rich-menu-response-object',
    },
  })
  .meta({ ref: 'RichMenuResponse' })

export type RichMenuResponse = z.infer<typeof RichMenuResponseSchema>

export const RichMenuListResponseSchema = z
  .object({ richmenus: z.array(RichMenuResponseSchema).meta({ description: 'Rich menus' }) })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list',
    },
  })
  .meta({ ref: 'RichMenuListResponse' })

export type RichMenuListResponse = z.infer<typeof RichMenuListResponseSchema>

export const CreateRichMenuAliasRequestSchema = z
  .object({
    richMenuAliasId: z
      .string()
      .regex(/^[a-z0-9_-]{1,32}$/)
      .min(1)
      .max(32)
      .meta({ description: 'Rich menu alias ID, which can be any ID, unique for each channel.' }),
    richMenuId: z
      .string()
      .meta({ description: 'The rich menu ID to be associated with the rich menu alias.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias',
    },
  })
  .meta({ ref: 'CreateRichMenuAliasRequest' })

export type CreateRichMenuAliasRequest = z.infer<typeof CreateRichMenuAliasRequestSchema>

export const RichMenuAliasResponseSchema = z
  .object({
    richMenuAliasId: z.string().meta({ description: 'Rich menu alias ID.' }),
    richMenuId: z
      .string()
      .meta({ description: 'The rich menu ID associated with the rich menu alias.' }),
  })
  .meta({ ref: 'RichMenuAliasResponse' })

export type RichMenuAliasResponse = z.infer<typeof RichMenuAliasResponseSchema>

export const UpdateRichMenuAliasRequestSchema = z
  .object({
    richMenuId: z
      .string()
      .meta({ description: 'The rich menu ID to be associated with the rich menu alias.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias',
    },
  })
  .meta({ ref: 'UpdateRichMenuAliasRequest' })

export type UpdateRichMenuAliasRequest = z.infer<typeof UpdateRichMenuAliasRequestSchema>

export const RichMenuAliasListResponseSchema = z
  .object({
    aliases: z.array(RichMenuAliasResponseSchema).meta({ description: 'Rich menu aliases.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list',
    },
  })
  .meta({ ref: 'RichMenuAliasListResponse' })

export type RichMenuAliasListResponse = z.infer<typeof RichMenuAliasListResponseSchema>

export const RichMenuBulkLinkRequestSchema = z
  .object({
    richMenuId: z.string().meta({ description: 'ID of a rich menu' }),
    userIds: z
      .array(z.string())
      .min(1)
      .max(500)
      .meta({
        description:
          'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
      }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-users',
    },
  })
  .meta({ ref: 'RichMenuBulkLinkRequest' })

export type RichMenuBulkLinkRequest = z.infer<typeof RichMenuBulkLinkRequestSchema>

export const RichMenuBulkUnlinkRequestSchema = z
  .object({
    userIds: z
      .array(z.string())
      .min(1)
      .max(500)
      .meta({
        description:
          'Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE.',
      }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-users',
    },
  })
  .meta({ ref: 'RichMenuBulkUnlinkRequest' })

export type RichMenuBulkUnlinkRequest = z.infer<typeof RichMenuBulkUnlinkRequestSchema>

export const RichMenuBatchOperationSchema = z
  .object({
    type: z
      .string()
      .meta({
        description:
          'The type of operation to the rich menu linked to the user. One of link, unlink, or unlinkAll.',
      }),
  })
  .meta({
    description:
      'Rich menu operation object represents the batch operation to the rich menu linked to the user.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users-operations',
    },
  })
  .meta({ ref: 'RichMenuBatchOperation' })

export type RichMenuBatchOperation = z.infer<typeof RichMenuBatchOperationSchema>

export const RichMenuBatchRequestSchema = z
  .object({
    operations: z
      .array(RichMenuBatchOperationSchema)
      .max(1000)
      .meta({ description: 'Array of Rich menu operation object...' }),
    resumeRequestKey: z
      .string()
      .regex(/^[a-zA-Z0-9_-]{1,100}$/)
      .min(1)
      .max(100)
      .meta({
        description: 'Key for retry. Key value is a string matching the regular expression pattern',
      })
      .exactOptional(),
  })
  .meta({ ref: 'RichMenuBatchRequest' })

export type RichMenuBatchRequest = z.infer<typeof RichMenuBatchRequestSchema>

export const RichMenuBatchLinkOperationSchema = z
  .intersection(
    RichMenuBatchOperationSchema,
    z.object({ from: z.string().exactOptional(), to: z.string().exactOptional() }),
  )
  .meta({
    description:
      'Replace the rich menu with the rich menu specified in the `to` property for all users linked to the rich menu specified in the `from` property.',
  })
  .meta({ ref: 'RichMenuBatchLinkOperation' })

export type RichMenuBatchLinkOperation = z.infer<typeof RichMenuBatchLinkOperationSchema>

export const RichMenuBatchUnlinkOperationSchema = z
  .intersection(RichMenuBatchOperationSchema, z.object({ from: z.string().exactOptional() }))
  .meta({
    description:
      'Unlink the rich menu for all users linked to the rich menu specified in the `from` property.',
  })
  .meta({ ref: 'RichMenuBatchUnlinkOperation' })

export type RichMenuBatchUnlinkOperation = z.infer<typeof RichMenuBatchUnlinkOperationSchema>

export const RichMenuBatchUnlinkAllOperationSchema = RichMenuBatchOperationSchema.meta({
  description: 'Unlink the rich menu from all users linked to the rich menu.',
}).meta({ ref: 'RichMenuBatchUnlinkAllOperation' })

export type RichMenuBatchUnlinkAllOperation = z.infer<typeof RichMenuBatchUnlinkAllOperationSchema>

export const RichMenuBatchProgressPhaseSchema = z
  .enum(['ongoing', 'succeeded', 'failed'])
  .meta({
    description:
      "The current status. One of:\n\n`ongoing`: Rich menu batch control is in progress.\n`succeeded`: Rich menu batch control is complete.\n`failed`: Rich menu batch control failed.\n          This means that the rich menu for one or more users couldn't be controlled.\n          There may also be users whose operations have been successfully completed.\n",
  })
  .meta({ ref: 'RichMenuBatchProgressPhase' })

export type RichMenuBatchProgressPhase = z.infer<typeof RichMenuBatchProgressPhaseSchema>

export const RichMenuBatchProgressResponseSchema = z
  .object({
    phase: RichMenuBatchProgressPhaseSchema,
    acceptedTime: z.iso
      .datetime({ offset: true })
      .meta({
        description:
          'The accepted time in milliseconds of the request of batch control the rich menu.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
      }),
    completedTime: z.iso
      .datetime({ offset: true })
      .meta({
        description:
          'The completed time in milliseconds of rich menu batch control. Returned when the phase property is succeeded or failed.\n\nFormat: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)\nTimezone: UTC\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status-response',
    },
  })
  .meta({ ref: 'RichMenuBatchProgressResponse' })

export type RichMenuBatchProgressResponse = z.infer<typeof RichMenuBatchProgressResponseSchema>

export const IssueLinkTokenResponseSchema = z
  .object({
    linkToken: z
      .string()
      .meta({
        description:
          'Link token.\nLink tokens are valid for 10 minutes and can only be used once.\n\n',
      }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-link-token',
    },
  })
  .meta({ ref: 'IssueLinkTokenResponse' })

export type IssueLinkTokenResponse = z.infer<typeof IssueLinkTokenResponseSchema>

export const ChatReferenceSchema = z
  .object({ userId: z.string().meta({ description: 'The target user ID' }) })
  .meta({
    description: 'Chat reference',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  })
  .meta({ ref: 'ChatReference' })

export type ChatReference = z.infer<typeof ChatReferenceSchema>

export const MarkMessagesAsReadRequestSchema = z
  .object({ chat: ChatReferenceSchema })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
    },
  })
  .meta({ ref: 'MarkMessagesAsReadRequest' })

export type MarkMessagesAsReadRequest = z.infer<typeof MarkMessagesAsReadRequestSchema>

export const PnpMessagesRequestSchema = z
  .object({
    messages: z.array(MessageSchema).min(1).max(5).meta({ description: 'Message to be sent.' }),
    to: z
      .string()
      .meta({
        description:
          'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
      }),
    notificationDisabled: NotificationDisabledSchema.exactOptional(),
    customAggregationUnits: z
      .array(
        z
          .string()
          .regex(/^[a-zA-Z0-9_]{1,30}$/)
          .min(1)
          .max(30),
      )
      .max(1)
      .meta({ description: 'Name of aggregation unit. Case-sensitive.' })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message',
    },
  })
  .meta({ ref: 'PnpMessagesRequest' })

export type PnpMessagesRequest = z.infer<typeof PnpMessagesRequestSchema>

export const PnpTemplatedEmphasizedItemSchema = z
  .object({
    itemKey: z
      .string()
      .meta({
        description:
          'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
      }),
    content: z
      .string()
      .max(15)
      .meta({ description: 'String to be displayed as the value of the item.' }),
  })
  .meta({
    description: 'Item to emphasize in the message.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  })
  .meta({ ref: 'PnpTemplatedEmphasizedItem' })

export type PnpTemplatedEmphasizedItem = z.infer<typeof PnpTemplatedEmphasizedItemSchema>

export const PnpTemplatedItemSchema = z
  .object({
    itemKey: z
      .string()
      .meta({
        description:
          'Specify the key of the item you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#items\n',
      }),
    content: z
      .string()
      .max(300)
      .meta({ description: 'String to be displayed as the value of the item.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-items',
    },
  })
  .meta({ ref: 'PnpTemplatedItem' })

export type PnpTemplatedItem = z.infer<typeof PnpTemplatedItemSchema>

export const PnpTemplatedButtonSchema = z
  .object({
    buttonKey: z
      .string()
      .meta({
        description:
          'Specify the key of the button you want to include.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#buttons\n',
      }),
    url: z
      .string()
      .max(1000)
      .meta({ description: 'URL of the page to be opened when the user presses the button.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template-buttons',
    },
  })
  .meta({ ref: 'PnpTemplatedButton' })

export type PnpTemplatedButton = z.infer<typeof PnpTemplatedButtonSchema>

export const PnpTemplatedMessageBodySchema = z
  .object({
    emphasizedItem: PnpTemplatedEmphasizedItemSchema.exactOptional(),
    items: z
      .array(PnpTemplatedItemSchema)
      .max(15)
      .meta({
        description:
          'Array of items to include in the message. The `itemKey` must be unique across `emphasizedItem` and `items`.',
      })
      .exactOptional(),
    buttons: z
      .array(PnpTemplatedButtonSchema)
      .max(2)
      .meta({
        description: 'Array of buttons to include in the message. The `buttonKey` must be unique.',
      })
      .exactOptional(),
  })
  .meta({
    description:
      "The body object of the template you want to send. You can't specify the same item more than once in a single message.",
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  })
  .meta({ ref: 'PnpTemplatedMessageBody' })

export type PnpTemplatedMessageBody = z.infer<typeof PnpTemplatedMessageBodySchema>

export const PnpTemplatedMessageRequestSchema = z
  .object({
    to: z
      .string()
      .meta({
        description:
          'Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256.',
      }),
    templateKey: z
      .string()
      .meta({
        description:
          'Specify the key of the template you want to send.\nFor available keys, see https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/#templates\n',
      }),
    body: PnpTemplatedMessageBodySchema.exactOptional(),
    customAggregationUnits: z
      .array(
        z
          .string()
          .regex(/^[a-zA-Z0-9_]{1,30}$/)
          .min(1)
          .max(30),
      )
      .max(1)
      .meta({
        description:
          'Name of aggregation unit. Case-sensitive.\nFor more information about assigning a unit name, see https://developers.line.biz/en/docs/messaging-api/unit-based-statistics-aggregation/#assign-names-to-units-when-sending-messages\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
    },
  })
  .meta({ ref: 'PnpTemplatedMessageRequest' })

export type PnpTemplatedMessageRequest = z.infer<typeof PnpTemplatedMessageRequestSchema>

export const EmojiSchema = z
  .object({
    index: z.int32().exactOptional(),
    productId: z.string().exactOptional(),
    emojiId: z.string().exactOptional(),
  })
  .meta({ ref: 'Emoji' })

export type Emoji = z.infer<typeof EmojiSchema>

export const TextMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      text: z.string().exactOptional(),
      emojis: z.array(EmojiSchema).exactOptional(),
      quoteToken: z
        .string()
        .meta({ description: 'Quote token of the message you want to quote.' })
        .exactOptional(),
    }),
  )
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#text-message' },
  })
  .meta({ ref: 'TextMessage' })

export type TextMessage = z.infer<typeof TextMessageSchema>

export const SubstitutionObjectSchema = z
  .object({ type: z.string().meta({ description: 'Type of substitution object' }) })
  .meta({
    description: 'An object that defines the replacement value for a placeholder in the text.',
  })
  .meta({ ref: 'SubstitutionObject' })

export type SubstitutionObject = z.infer<typeof SubstitutionObjectSchema>

export const TextMessageV2Schema = z
  .intersection(
    MessageSchema,
    z.object({
      text: z.string().exactOptional(),
      substitution: z
        .record(z.string(), SubstitutionObjectSchema)
        .meta({
          description:
            'A mapping that specifies substitutions for parts enclosed in {} within the `text` field.',
        })
        .exactOptional(),
      quoteToken: z
        .string()
        .meta({ description: 'Quote token of the message you want to quote.' })
        .exactOptional(),
    }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2',
    },
  })
  .meta({ ref: 'TextMessageV2' })

export type TextMessageV2 = z.infer<typeof TextMessageV2Schema>

export const MentionTargetSchema = z
  .object({ type: z.string().meta({ description: 'Target to be mentioned' }) })
  .meta({ ref: 'MentionTarget' })

export type MentionTarget = z.infer<typeof MentionTargetSchema>

export const MentionSubstitutionObjectSchema = z
  .intersection(SubstitutionObjectSchema, z.object({ mentionee: MentionTargetSchema }))
  .meta({
    description: 'An object representing a mention substitution.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mention-object',
    },
  })
  .meta({ ref: 'MentionSubstitutionObject' })

export type MentionSubstitutionObject = z.infer<typeof MentionSubstitutionObjectSchema>

export const UserMentionTargetSchema = z
  .intersection(MentionTargetSchema, z.object({ userId: z.string() }))
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-user',
    },
  })
  .meta({ ref: 'UserMentionTarget' })

export type UserMentionTarget = z.infer<typeof UserMentionTargetSchema>

export const AllMentionTargetSchema = MentionTargetSchema.meta({
  externalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-mentionee-all',
  },
}).meta({ ref: 'AllMentionTarget' })

export type AllMentionTarget = z.infer<typeof AllMentionTargetSchema>

export const EmojiSubstitutionObjectSchema = z
  .intersection(SubstitutionObjectSchema, z.object({ productId: z.string(), emojiId: z.string() }))
  .meta({
    description: 'An object representing a emoji substitution.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#text-message-v2-emoji-object',
    },
  })
  .meta({ ref: 'EmojiSubstitutionObject' })

export type EmojiSubstitutionObject = z.infer<typeof EmojiSubstitutionObjectSchema>

export const StickerMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      packageId: z.string().exactOptional(),
      stickerId: z.string().exactOptional(),
      quoteToken: z
        .string()
        .meta({ description: 'Quote token of the message you want to quote.' })
        .exactOptional(),
    }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#sticker-message',
    },
  })
  .meta({ ref: 'StickerMessage' })

export type StickerMessage = z.infer<typeof StickerMessageSchema>

export const ImageMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      originalContentUrl: z.url().exactOptional(),
      previewImageUrl: z.url().exactOptional(),
    }),
  )
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#image-message' },
  })
  .meta({ ref: 'ImageMessage' })

export type ImageMessage = z.infer<typeof ImageMessageSchema>

export const VideoMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      originalContentUrl: z.url().exactOptional(),
      previewImageUrl: z.url().exactOptional(),
      trackingId: z.string().exactOptional(),
    }),
  )
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#video-message' },
  })
  .meta({ ref: 'VideoMessage' })

export type VideoMessage = z.infer<typeof VideoMessageSchema>

export const AudioMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      originalContentUrl: z.url().exactOptional(),
      duration: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#audio-message' },
  })
  .meta({ ref: 'AudioMessage' })

export type AudioMessage = z.infer<typeof AudioMessageSchema>

export const LocationMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      title: z.string().exactOptional(),
      address: z.string().exactOptional(),
      latitude: z.number().exactOptional(),
      longitude: z.number().exactOptional(),
    }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#location-message',
    },
  })
  .meta({ ref: 'LocationMessage' })

export type LocationMessage = z.infer<typeof LocationMessageSchema>

export const ImagemapBaseSizeSchema = z
  .object({ height: z.int32(), width: z.int32() })
  .meta({ ref: 'ImagemapBaseSize' })

export type ImagemapBaseSize = z.infer<typeof ImagemapBaseSizeSchema>

export const ImagemapAreaSchema = z
  .object({ x: z.int32(), y: z.int32(), width: z.int32(), height: z.int32() })
  .meta({ ref: 'ImagemapArea' })

export type ImagemapArea = z.infer<typeof ImagemapAreaSchema>

export const ImagemapActionSchema = z
  .object({ type: z.string(), area: ImagemapAreaSchema })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-action-objects',
    },
  })
  .meta({ ref: 'ImagemapAction' })

export type ImagemapAction = z.infer<typeof ImagemapActionSchema>

export const ImagemapExternalLinkSchema = z
  .object({ linkUri: z.url().exactOptional(), label: z.string().exactOptional() })
  .meta({ ref: 'ImagemapExternalLink' })

export type ImagemapExternalLink = z.infer<typeof ImagemapExternalLinkSchema>

export const ImagemapVideoSchema = z
  .object({
    originalContentUrl: z.url().exactOptional(),
    previewImageUrl: z.url().exactOptional(),
    area: ImagemapAreaSchema.exactOptional(),
    externalLink: ImagemapExternalLinkSchema.exactOptional(),
  })
  .meta({ ref: 'ImagemapVideo' })

export type ImagemapVideo = z.infer<typeof ImagemapVideoSchema>

export const ImagemapMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      baseUrl: z.url().exactOptional(),
      altText: z.string().exactOptional(),
      baseSize: ImagemapBaseSizeSchema.exactOptional(),
      actions: z.array(ImagemapActionSchema).exactOptional(),
      video: ImagemapVideoSchema.exactOptional(),
    }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-message',
    },
  })
  .meta({ ref: 'ImagemapMessage' })

export type ImagemapMessage = z.infer<typeof ImagemapMessageSchema>

export const MessageImagemapActionSchema = z
  .intersection(
    ImagemapActionSchema,
    z.object({ text: z.string().exactOptional(), label: z.string().exactOptional() }),
  )
  .meta({ ref: 'MessageImagemapAction' })

export type MessageImagemapAction = z.infer<typeof MessageImagemapActionSchema>

export const URIImagemapActionSchema = z
  .intersection(
    ImagemapActionSchema,
    z.object({ linkUri: z.string().exactOptional(), label: z.string().exactOptional() }),
  )
  .meta({ ref: 'URIImagemapAction' })

export type URIImagemapAction = z.infer<typeof URIImagemapActionSchema>

export const ClipboardImagemapActionSchema = z
  .intersection(
    ImagemapActionSchema,
    z.object({
      clipboardText: z
        .string()
        .min(1)
        .max(1000)
        .meta({ description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n' })
        .exactOptional(),
      label: z.string().exactOptional(),
    }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#imagemap-clipboard-action-object',
    },
  })
  .meta({ ref: 'ClipboardImagemapAction' })

export type ClipboardImagemapAction = z.infer<typeof ClipboardImagemapActionSchema>

export const TemplateSchema = z.object({ type: z.string() }).meta({ ref: 'Template' })

export type Template = z.infer<typeof TemplateSchema>

export const TemplateMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({ altText: z.string().exactOptional(), template: TemplateSchema.exactOptional() }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#template-messages',
    },
  })
  .meta({ ref: 'TemplateMessage' })

export type TemplateMessage = z.infer<typeof TemplateMessageSchema>

export const ButtonsTemplateSchema = z
  .intersection(
    TemplateSchema,
    z.object({
      thumbnailImageUrl: z.url().exactOptional(),
      imageAspectRatio: z.string().exactOptional(),
      imageSize: z.string().exactOptional(),
      imageBackgroundColor: z.string().exactOptional(),
      title: z.string().exactOptional(),
      text: z.string().exactOptional(),
      defaultAction: ActionSchema.exactOptional(),
      actions: z.array(ActionSchema).exactOptional(),
    }),
  )
  .meta({ ref: 'ButtonsTemplate' })

export type ButtonsTemplate = z.infer<typeof ButtonsTemplateSchema>

export const TemplateImageAspectRatioSchema = z
  .enum(['rectangle', 'square'])
  .meta({
    description:
      'Aspect ratio of the image. This is only for the `imageAspectRatio` in ButtonsTemplate.\nSpecify one of the following values:\n\n`rectangle`: 1.51:1\n`square`: 1:1\n',
  })
  .meta({ ref: 'TemplateImageAspectRatio' })

export type TemplateImageAspectRatio = z.infer<typeof TemplateImageAspectRatioSchema>

export const TemplateImageSizeSchema = z
  .enum(['cover', 'contain'])
  .meta({
    description:
      'Size of the image.  This is only for the `imageSize` in ButtonsTemplate.\nSpecify one of the following values:\n\n`cover`: The image fills the entire image area. Parts of the image that do not fit in the area are not displayed.\n`contain`: The entire image is displayed in the image area. A background is displayed in the unused areas to the left and right of vertical images and in the areas above and below horizontal images.\n',
  })
  .meta({ ref: 'TemplateImageSize' })

export type TemplateImageSize = z.infer<typeof TemplateImageSizeSchema>

export const ConfirmTemplateSchema = z
  .intersection(
    TemplateSchema,
    z.object({ text: z.string().exactOptional(), actions: z.array(ActionSchema).exactOptional() }),
  )
  .meta({ ref: 'ConfirmTemplate' })

export type ConfirmTemplate = z.infer<typeof ConfirmTemplateSchema>

export const CarouselColumnSchema = z
  .object({
    thumbnailImageUrl: z.url().exactOptional(),
    imageBackgroundColor: z.string().exactOptional(),
    title: z.string().exactOptional(),
    text: z.string(),
    defaultAction: ActionSchema.exactOptional(),
    actions: z.array(ActionSchema),
  })
  .meta({ description: 'Column object for carousel template.' })
  .meta({ ref: 'CarouselColumn' })

export type CarouselColumn = z.infer<typeof CarouselColumnSchema>

export const CarouselTemplateSchema = z
  .intersection(
    TemplateSchema,
    z.object({
      columns: z.array(CarouselColumnSchema).exactOptional(),
      imageAspectRatio: z.string().exactOptional(),
      imageSize: z.string().exactOptional(),
    }),
  )
  .meta({ ref: 'CarouselTemplate' })

export type CarouselTemplate = z.infer<typeof CarouselTemplateSchema>

export const ImageCarouselColumnSchema = z
  .object({ imageUrl: z.url(), action: ActionSchema })
  .meta({ ref: 'ImageCarouselColumn' })

export type ImageCarouselColumn = z.infer<typeof ImageCarouselColumnSchema>

export const ImageCarouselTemplateSchema = z
  .intersection(
    TemplateSchema,
    z.object({ columns: z.array(ImageCarouselColumnSchema).exactOptional() }),
  )
  .meta({ ref: 'ImageCarouselTemplate' })

export type ImageCarouselTemplate = z.infer<typeof ImageCarouselTemplateSchema>

export const CouponMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      couponId: z
        .string()
        .meta({ description: 'Unique identifier of the coupon.' })
        .exactOptional(),
      deliveryTag: z
        .string()
        .max(30)
        .meta({
          description:
            'Delivery route tag information. It can be used for analysis in LINE OA Manager.',
        })
        .exactOptional(),
    }),
  )
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#coupon-message' },
  })
  .meta({ ref: 'CouponMessage' })

export type CouponMessage = z.infer<typeof CouponMessageSchema>

export const FlexContainerSchema = z.object({ type: z.string() }).meta({ ref: 'FlexContainer' })

export type FlexContainer = z.infer<typeof FlexContainerSchema>

export const FlexMessageSchema = z
  .intersection(
    MessageSchema,
    z.object({
      altText: z.string().exactOptional(),
      contents: FlexContainerSchema.exactOptional(),
    }),
  )
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#flex-message' },
  })
  .meta({ ref: 'FlexMessage' })

export type FlexMessage = z.infer<typeof FlexMessageSchema>

export const FlexBlockStyleSchema = z
  .object({
    backgroundColor: z.string().exactOptional(),
    separator: z.boolean().exactOptional(),
    separatorColor: z.string().exactOptional(),
  })
  .meta({ ref: 'FlexBlockStyle' })

export type FlexBlockStyle = z.infer<typeof FlexBlockStyleSchema>

export const FlexBubbleStylesSchema = z
  .object({
    header: FlexBlockStyleSchema.exactOptional(),
    hero: FlexBlockStyleSchema.exactOptional(),
    body: FlexBlockStyleSchema.exactOptional(),
    footer: FlexBlockStyleSchema.exactOptional(),
  })
  .meta({ ref: 'FlexBubbleStyles' })

export type FlexBubbleStyles = z.infer<typeof FlexBubbleStylesSchema>

export const FlexComponentSchema = z.object({ type: z.string() }).meta({ ref: 'FlexComponent' })

export type FlexComponent = z.infer<typeof FlexComponentSchema>

export const FlexBoxBackgroundSchema = z
  .object({ type: z.string() })
  .meta({ ref: 'FlexBoxBackground' })

export type FlexBoxBackground = z.infer<typeof FlexBoxBackgroundSchema>

export const FlexBoxSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({
      layout: z.enum(['horizontal', 'vertical', 'baseline']).exactOptional(),
      flex: z.int32().exactOptional(),
      contents: z.array(FlexComponentSchema).exactOptional(),
      spacing: z.string().exactOptional(),
      margin: z.string().exactOptional(),
      position: z.enum(['relative', 'absolute']).exactOptional(),
      offsetTop: z.string().exactOptional(),
      offsetBottom: z.string().exactOptional(),
      offsetStart: z.string().exactOptional(),
      offsetEnd: z.string().exactOptional(),
      backgroundColor: z.string().exactOptional(),
      borderColor: z.string().exactOptional(),
      borderWidth: z.string().exactOptional(),
      cornerRadius: z.string().exactOptional(),
      width: z.string().exactOptional(),
      maxWidth: z.string().exactOptional(),
      height: z.string().exactOptional(),
      maxHeight: z.string().exactOptional(),
      paddingAll: z.string().exactOptional(),
      paddingTop: z.string().exactOptional(),
      paddingBottom: z.string().exactOptional(),
      paddingStart: z.string().exactOptional(),
      paddingEnd: z.string().exactOptional(),
      action: ActionSchema.exactOptional(),
      justifyContent: z
        .enum(['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'])
        .exactOptional(),
      alignItems: z.enum(['center', 'flex-start', 'flex-end']).exactOptional(),
      background: FlexBoxBackgroundSchema.exactOptional(),
    }),
  )
  .meta({ ref: 'FlexBox' })

export type FlexBox = z.infer<typeof FlexBoxSchema>

export const FlexBubbleSchema = z
  .intersection(
    FlexContainerSchema,
    z.object({
      direction: z.enum(['ltr', 'rtl']).exactOptional(),
      styles: FlexBubbleStylesSchema.exactOptional(),
      header: FlexBoxSchema.exactOptional(),
      hero: FlexComponentSchema.exactOptional(),
      body: FlexBoxSchema.exactOptional(),
      footer: FlexBoxSchema.exactOptional(),
      size: z.enum(['nano', 'micro', 'deca', 'hecto', 'kilo', 'mega', 'giga']).exactOptional(),
      action: ActionSchema.exactOptional(),
    }),
  )
  .meta({ ref: 'FlexBubble' })

export type FlexBubble = z.infer<typeof FlexBubbleSchema>

export const FlexCarouselSchema = z
  .intersection(
    FlexContainerSchema,
    z.object({ contents: z.array(FlexBubbleSchema).exactOptional() }),
  )
  .meta({ ref: 'FlexCarousel' })

export type FlexCarousel = z.infer<typeof FlexCarouselSchema>

export const FlexBoxBorderWidthSchema = z
  .enum(['none', 'light', 'normal', 'medium', 'semi-bold', 'bold'])
  .meta({
    description:
      'Width of box border. This is only for `borderWidth` in FlexBox.\nA value of none means that borders are not rendered; the other values are listed in order of increasing width.\n',
  })
  .meta({ ref: 'FlexBoxBorderWidth' })

export type FlexBoxBorderWidth = z.infer<typeof FlexBoxBorderWidthSchema>

export const FlexBoxCornerRadiusSchema = z
  .enum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .meta({
    description:
      'Radius at the time of rounding the corners of the box. This is only for `cornerRadius` in FlexBox.\nA value of none means that corners are not rounded; the other values are listed in order of increasing radius.\n',
  })
  .meta({ ref: 'FlexBoxCornerRadius' })

export type FlexBoxCornerRadius = z.infer<typeof FlexBoxCornerRadiusSchema>

export const FlexBoxSpacingSchema = z
  .enum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .meta({
    description:
      'You can specify the minimum space between two components with the `spacing` property of the parent box component, in pixels or with a keyword.\nFlexBoxSpacing just provides only keywords.\n',
  })
  .meta({ ref: 'FlexBoxSpacing' })

export type FlexBoxSpacing = z.infer<typeof FlexBoxSpacingSchema>

export const FlexMarginSchema = z
  .enum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .meta({
    description:
      'You can specify the minimum space before a child component with the `margin` property of the child component, in pixels or with a keyword.\nFlexMargin just provides only keywords.\n',
  })
  .meta({ ref: 'FlexMargin' })

export type FlexMargin = z.infer<typeof FlexMarginSchema>

export const FlexBoxPaddingSchema = z
  .enum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .meta({
    description:
      'Padding can be specified in pixels, percentage (to the parent box width) or with a keyword.\nFlexBoxPadding just provides only keywords.\n',
  })
  .meta({ ref: 'FlexBoxPadding' })

export type FlexBoxPadding = z.infer<typeof FlexBoxPaddingSchema>

export const FlexImageSizeSchema = z
  .enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl', 'full'])
  .meta({
    description:
      'You can set the width of an Flex image component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexImageSize just provides only keywords.\n',
  })
  .meta({ ref: 'FlexImageSize' })

export type FlexImageSize = z.infer<typeof FlexImageSizeSchema>

export const FlexIconSizeSchema = z
  .enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl'])
  .meta({
    description:
      'You can set the width of an Flex icon component with the `size` property, in pixels, as a percentage, or with a keyword.\nFlexIconSize just provides only keywords.\n',
  })
  .meta({ ref: 'FlexIconSize' })

export type FlexIconSize = z.infer<typeof FlexIconSizeSchema>

export const FlexTextFontSizeSchema = z
  .enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl'])
  .meta({
    description:
      'Font size in the `size` property of the Flex text component.\nYou can specify the size in pixels or with a keyword.\nFlexTextFontSize just provides only keywords.\n',
  })
  .meta({ ref: 'FlexTextFontSize' })

export type FlexTextFontSize = z.infer<typeof FlexTextFontSizeSchema>

export const FlexSpanSizeSchema = z
  .enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl'])
  .meta({
    description:
      'Font size in the `size` property of the Flex span component.\nYou can specify the size in pixels or with a keyword.\nFlexSpanSize just provides only keywords.\n',
  })
  .meta({ ref: 'FlexSpanSize' })

export type FlexSpanSize = z.infer<typeof FlexSpanSizeSchema>

export const FlexOffsetSchema = z
  .enum(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
  .meta({
    description:
      'You can specify the offset of a component with the `offset*` property, in pixels or with a keyword.\nYou can also specify the percentage to the box width for `offsetStart` and `offsetEnd` and to the box height for `offsetTop` and `offsetBottom`.\nFlexOffset just provides only keywords.\n',
  })
  .meta({ ref: 'FlexOffset' })

export type FlexOffset = z.infer<typeof FlexOffsetSchema>

export const FlexButtonSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({
      flex: z.int32().exactOptional(),
      color: z.string().exactOptional(),
      style: z.enum(['primary', 'secondary', 'link']).exactOptional(),
      action: ActionSchema.exactOptional(),
      gravity: z.enum(['top', 'bottom', 'center']).exactOptional(),
      margin: z.string().exactOptional(),
      position: z.enum(['relative', 'absolute']).exactOptional(),
      offsetTop: z.string().exactOptional(),
      offsetBottom: z.string().exactOptional(),
      offsetStart: z.string().exactOptional(),
      offsetEnd: z.string().exactOptional(),
      height: z.enum(['md', 'sm']).exactOptional(),
      adjustMode: z.literal('shrink-to-fit').exactOptional(),
      scaling: z.boolean().exactOptional(),
    }),
  )
  .meta({ ref: 'FlexButton' })

export type FlexButton = z.infer<typeof FlexButtonSchema>

export const FlexImageSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({
      url: z
        .url()
        .meta({
          description:
            'Image URL (Max character limit: 2000)\nProtocol: HTTPS (TLS 1.2 or later)\nImage format: JPEG or PNG\nMaximum image size: 1024×1024 pixels\nMaximum file size: 10 MB (300 KB when the animated property is true)\n',
        })
        .exactOptional(),
      flex: z
        .int32()
        .meta({
          description: 'The ratio of the width or height of this component within the parent box.',
        })
        .exactOptional(),
      margin: z
        .string()
        .meta({
          description:
            'The minimum amount of space to include before this component in its parent container.\n',
        })
        .exactOptional(),
      position: z
        .enum(['relative', 'absolute'])
        .meta({
          description:
            'Reference for offsetTop, offsetBottom, offsetStart, and offsetEnd. Specify one of the following values:\n\n`relative`: Use the previous box as reference.\n`absolute`: Use the top left of parent element as reference. The default value is relative.\n',
        })
        .exactOptional(),
      offsetTop: z.string().meta({ description: 'Offset.' }).exactOptional(),
      offsetBottom: z.string().meta({ description: 'Offset.' }).exactOptional(),
      offsetStart: z.string().meta({ description: 'Offset.' }).exactOptional(),
      offsetEnd: z.string().meta({ description: 'Offset.' }).exactOptional(),
      align: z
        .enum(['start', 'end', 'center'])
        .meta({ description: 'Alignment style in horizontal direction.\n' })
        .exactOptional(),
      gravity: z
        .enum(['top', 'bottom', 'center'])
        .meta({ description: 'Alignment style in vertical direction.' })
        .exactOptional(),
      size: z
        .string()
        .default('md')
        .meta({ description: 'The maximum image width. This is md by default.\n' })
        .exactOptional(),
      aspectRatio: z
        .string()
        .meta({
          description:
            'Aspect ratio of the image.\n`{width}:{height}` format.\nSpecify the value of `{width}` and `{height}` in the range from `1` to `100000`.\nHowever, you cannot set `{height}` to a value that is more than three times the value of `{width}`.\nThe default value is `1:1`.\n',
        })
        .exactOptional(),
      aspectMode: z
        .enum(['fit', 'cover'])
        .meta({
          description:
            'The display style of the image if the aspect ratio of the image and that specified by the aspectRatio property do not match.\n',
        })
        .exactOptional(),
      backgroundColor: z
        .string()
        .meta({ description: 'Background color of the image. Use a hexadecimal color code.' })
        .exactOptional(),
      action: ActionSchema.exactOptional(),
      animated: z
        .boolean()
        .default(false)
        .meta({
          description:
            "When this is `true`, an animated image (APNG) plays.\nYou can specify a value of true up to 10 images in a single message.\nYou can't send messages that exceed this limit.\nThis is `false` by default.\nAnimated images larger than 300 KB aren't played back.\n",
        })
        .exactOptional(),
    }),
  )
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#f-image' },
  })
  .meta({ ref: 'FlexImage' })

export type FlexImage = z.infer<typeof FlexImageSchema>

export const FlexVideoSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({
      url: z.url().exactOptional(),
      previewUrl: z.url().exactOptional(),
      altContent: FlexComponentSchema.exactOptional(),
      aspectRatio: z.string().exactOptional(),
      action: ActionSchema.exactOptional(),
    }),
  )
  .meta({ ref: 'FlexVideo' })

export type FlexVideo = z.infer<typeof FlexVideoSchema>

export const FlexIconSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({
      url: z.url().exactOptional(),
      size: z.string().exactOptional(),
      aspectRatio: z.string().exactOptional(),
      margin: z.string().exactOptional(),
      position: z.enum(['relative', 'absolute']).exactOptional(),
      offsetTop: z.string().exactOptional(),
      offsetBottom: z.string().exactOptional(),
      offsetStart: z.string().exactOptional(),
      offsetEnd: z.string().exactOptional(),
      scaling: z.boolean().exactOptional(),
    }),
  )
  .meta({ externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#icon' } })
  .meta({ ref: 'FlexIcon' })

export type FlexIcon = z.infer<typeof FlexIconSchema>

export const FlexSpanSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({
      text: z.string().exactOptional(),
      size: z.string().exactOptional(),
      color: z.string().exactOptional(),
      weight: z.enum(['regular', 'bold']).exactOptional(),
      style: z.enum(['normal', 'italic']).exactOptional(),
      decoration: z.enum(['none', 'underline', 'line-through']).exactOptional(),
    }),
  )
  .meta({ ref: 'FlexSpan' })

export type FlexSpan = z.infer<typeof FlexSpanSchema>

export const FlexTextSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({
      flex: z.int32().exactOptional(),
      text: z.string().exactOptional(),
      size: z.string().exactOptional(),
      align: z.enum(['start', 'end', 'center']).exactOptional(),
      gravity: z.enum(['top', 'bottom', 'center']).exactOptional(),
      color: z.string().exactOptional(),
      weight: z.enum(['regular', 'bold']).exactOptional(),
      style: z.enum(['normal', 'italic']).exactOptional(),
      decoration: z.enum(['none', 'underline', 'line-through']).exactOptional(),
      wrap: z.boolean().exactOptional(),
      lineSpacing: z.string().exactOptional(),
      margin: z.string().exactOptional(),
      position: z.enum(['relative', 'absolute']).exactOptional(),
      offsetTop: z.string().exactOptional(),
      offsetBottom: z.string().exactOptional(),
      offsetStart: z.string().exactOptional(),
      offsetEnd: z.string().exactOptional(),
      action: ActionSchema.exactOptional(),
      maxLines: z.int32().exactOptional(),
      contents: z.array(FlexSpanSchema).exactOptional(),
      adjustMode: z.literal('shrink-to-fit').exactOptional(),
      scaling: z.boolean().exactOptional(),
    }),
  )
  .meta({ ref: 'FlexText' })

export type FlexText = z.infer<typeof FlexTextSchema>

export const FlexSeparatorSchema = z
  .intersection(
    FlexComponentSchema,
    z.object({ margin: z.string().exactOptional(), color: z.string().exactOptional() }),
  )
  .meta({ ref: 'FlexSeparator' })

export type FlexSeparator = z.infer<typeof FlexSeparatorSchema>

export const FlexFillerSchema = z
  .intersection(FlexComponentSchema, z.object({ flex: z.int32().exactOptional() }))
  .meta({ ref: 'FlexFiller' })

export type FlexFiller = z.infer<typeof FlexFillerSchema>

export const FlexBoxLinearGradientSchema = z
  .intersection(
    FlexBoxBackgroundSchema,
    z.object({
      angle: z.string().exactOptional(),
      startColor: z.string().exactOptional(),
      endColor: z.string().exactOptional(),
      centerColor: z.string().exactOptional(),
      centerPosition: z.string().exactOptional(),
    }),
  )
  .meta({ ref: 'FlexBoxLinearGradient' })

export type FlexBoxLinearGradient = z.infer<typeof FlexBoxLinearGradientSchema>

export const CameraActionSchema = ActionSchema

export type CameraAction = z.infer<typeof CameraActionSchema>

export const CameraRollActionSchema = ActionSchema

export type CameraRollAction = z.infer<typeof CameraRollActionSchema>

export const ClipboardActionSchema = z
  .intersection(
    ActionSchema,
    z.object({
      clipboardText: z
        .string()
        .min(1)
        .max(1000)
        .meta({
          description: 'Text that is copied to the clipboard.\nMax character limit: 1000\n',
        }),
    }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#clipboard-action',
    },
  })
  .meta({ ref: 'ClipboardAction' })

export type ClipboardAction = z.infer<typeof ClipboardActionSchema>

export const DatetimePickerActionSchema = z
  .intersection(
    ActionSchema,
    z.object({
      data: z.string().min(0).max(300).exactOptional(),
      mode: z.enum(['date', 'time', 'datetime']).exactOptional(),
      initial: z.string().exactOptional(),
      max: z.string().exactOptional(),
      min: z.string().exactOptional(),
    }),
  )
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action',
    },
  })
  .meta({ ref: 'DatetimePickerAction' })

export type DatetimePickerAction = z.infer<typeof DatetimePickerActionSchema>

export const LocationActionSchema = ActionSchema

export type LocationAction = z.infer<typeof LocationActionSchema>

export const MessageActionSchema = z
  .intersection(ActionSchema, z.object({ text: z.string().exactOptional() }))
  .meta({ ref: 'MessageAction' })

export type MessageAction = z.infer<typeof MessageActionSchema>

export const PostbackActionSchema = z
  .intersection(
    ActionSchema,
    z.object({
      data: z.string().min(0).max(300).exactOptional(),
      displayText: z.string().exactOptional(),
      text: z.string().exactOptional(),
      inputOption: z
        .enum(['closeRichMenu', 'openRichMenu', 'openKeyboard', 'openVoice'])
        .exactOptional(),
      fillInText: z.string().exactOptional(),
    }),
  )
  .meta({ ref: 'PostbackAction' })

export type PostbackAction = z.infer<typeof PostbackActionSchema>

export const RichMenuSwitchActionSchema = z
  .intersection(
    ActionSchema,
    z.object({
      data: z.string().min(0).max(300).exactOptional(),
      richMenuAliasId: z.string().min(0).max(32).exactOptional(),
    }),
  )
  .meta({ ref: 'RichMenuSwitchAction' })

export type RichMenuSwitchAction = z.infer<typeof RichMenuSwitchActionSchema>

export const AltUriSchema = z
  .object({ desktop: z.string().min(0).max(10000).exactOptional() })
  .meta({ ref: 'AltUri' })

export type AltUri = z.infer<typeof AltUriSchema>

export const URIActionSchema = z
  .intersection(
    ActionSchema,
    z.object({ uri: z.url().max(10000).exactOptional(), altUri: AltUriSchema.exactOptional() }),
  )
  .meta({ ref: 'URIAction' })

export type URIAction = z.infer<typeof URIActionSchema>

export const SubscribedMembershipPlanSchema = z
  .object({
    membershipId: z.int().meta({ description: 'Membership plan ID.' }),
    title: z.string().meta({ description: 'Membership plan name.' }),
    description: z.string().meta({ description: 'Membership plan description.' }),
    benefits: z.array(z.string()).min(1).meta({ description: 'List of membership plan perks.' }),
    price: z
      .number()
      .meta({ description: 'Monthly fee for membership plan. (e.g. 1500.00)', examples: [500] }),
    currency: z
      .enum(['JPY', 'TWD', 'THB'])
      .meta({ description: 'The currency of membership.price.' }),
  })
  .meta({ description: 'Object containing information about the membership plan.' })
  .meta({ ref: 'SubscribedMembershipPlan' })

export type SubscribedMembershipPlan = z.infer<typeof SubscribedMembershipPlanSchema>

export const SubscribedMembershipUserSchema = z
  .object({
    membershipNo: z.int().meta({ description: "The user's member number in the membership plan." }),
    joinedTime: z
      .int()
      .meta({ description: 'UNIX timestamp at which the user subscribed to the membership.' }),
    nextBillingDate: z
      .string()
      .meta({
        description:
          'Next payment date for membership plan.\n- Format: yyyy-MM-dd (e.g. 2024-02-08)\n- Timezone: UTC+9\n',
      }),
    totalSubscriptionMonths: z
      .int()
      .meta({
        description:
          'The period of time in months that the user has been subscribed to a membership plan. If a user previously canceled and then re-subscribed to the same membership plan, only the period after the re-subscription will be counted.',
      }),
  })
  .meta({ description: 'Object containing user membership subscription information.' })
  .meta({ ref: 'SubscribedMembershipUser' })

export type SubscribedMembershipUser = z.infer<typeof SubscribedMembershipUserSchema>

export const SubscriptionSchema = z
  .object({ membership: SubscribedMembershipPlanSchema, user: SubscribedMembershipUserSchema })
  .meta({ description: 'An array of memberships.' })
  .meta({ ref: 'Subscription' })

export type Subscription = z.infer<typeof SubscriptionSchema>

export const GetMembershipSubscriptionResponseSchema = z
  .object({
    subscriptions: z
      .array(SubscriptionSchema)
      .min(0)
      .meta({ description: 'List of subscription information' }),
  })
  .meta({
    description: "A user's membership subscription status",
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-a-users-membership-subscription-status',
    },
  })
  .meta({ ref: 'GetMembershipSubscriptionResponse' })

export type GetMembershipSubscriptionResponse = z.infer<
  typeof GetMembershipSubscriptionResponseSchema
>

export const MembershipSchema = z
  .object({
    membershipId: z.int().meta({ description: 'Membership plan ID.' }),
    title: z.string().meta({ description: 'Membership plan name.' }),
    description: z.string().meta({ description: 'Membership plan description.' }),
    benefits: z.array(z.string()).min(1).meta({ description: 'List of membership plan perks.' }),
    price: z
      .number()
      .meta({ description: 'Monthly fee for membership plan. (e.g. 1500.00)', examples: [500] }),
    currency: z
      .enum(['JPY', 'TWD', 'THB'])
      .meta({ description: 'The currency of membership.price.' }),
    memberCount: z
      .int()
      .meta({
        description: 'Number of members subscribed to the membership plan.',
        examples: [100],
      }),
    memberLimit: z
      .int()
      .nullable()
      .meta({
        description:
          'The upper limit of members who can subscribe. If no upper limit is set, it will be null.',
        examples: [1000],
      }),
    isInAppPurchase: z
      .boolean()
      .meta({ description: 'Payment method for users who subscribe to a membership plan.' }),
    isPublished: z.boolean().meta({ description: 'Membership plan status.' }),
  })
  .meta({ ref: 'Membership' })

export type Membership = z.infer<typeof MembershipSchema>

export const MembershipListResponseSchema = z
  .object({
    memberships: z
      .array(MembershipSchema)
      .min(0)
      .meta({ description: 'List of membership information' }),
  })
  .meta({ description: 'List of memberships' })
  .meta({ ref: 'MembershipListResponse' })

export type MembershipListResponse = z.infer<typeof MembershipListResponseSchema>

export const GetJoinedMembershipUsersResponseSchema = z
  .object({
    userIds: z
      .array(z.string())
      .max(1000)
      .meta({
        description:
          'A list of user IDs who joined the membership.\nUsers who have not agreed to the bot user agreement, are not following the bot, or are not active will be excluded.\nIf there are no users in the membership, an empty list will be returned.\n',
      }),
    next: z
      .string()
      .meta({
        description:
          "A continuation token to get next remaining membership user IDs.\nReturned only when there are remaining user IDs that weren't returned in the userIds property in the previous request.\nThe continuation token expires in 24 hours (86,400 seconds).\n\n",
      })
      .exactOptional(),
  })
  .meta({
    description: 'List of users who have joined the membership',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-membership-user-ids',
    },
  })
  .meta({ ref: 'GetJoinedMembershipUsersResponse' })

export type GetJoinedMembershipUsersResponse = z.infer<
  typeof GetJoinedMembershipUsersResponseSchema
>

export const AcquisitionConditionRequestSchema = z
  .object({
    type: z.string().meta({ description: 'Determines how the coupon is distributed or used.' }),
  })
  .meta({ ref: 'AcquisitionConditionRequest' })

export type AcquisitionConditionRequest = z.infer<typeof AcquisitionConditionRequestSchema>

export const CouponRewardRequestSchema = z
  .object({
    type: z.string().meta({ description: 'Type of coupon. Determines the benefit provided.' }),
  })
  .meta({ ref: 'CouponRewardRequest' })

export type CouponRewardRequest = z.infer<typeof CouponRewardRequestSchema>

export const CouponCreateRequestSchema = z
  .object({
    acquisitionCondition: AcquisitionConditionRequestSchema,
    barcodeImageUrl: z
      .string()
      .meta({
        description:
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
      })
      .exactOptional(),
    couponCode: z
      .string()
      .meta({
        description: 'Unique code to be presented by the user to redeem the coupon. Optional.',
      })
      .exactOptional(),
    description: z
      .string()
      .min(0)
      .max(1000)
      .meta({ description: 'Detailed description of the coupon. Displayed to users.' })
      .exactOptional(),
    endTimestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
      }),
    imageUrl: z
      .string()
      .meta({
        description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
      })
      .exactOptional(),
    maxUseCountPerTicket: z
      .int32()
      .max(1)
      .meta({
        description:
          'Maximum number of times a single coupon ticket can be used. Use -1 to indicate no limit.',
      }),
    startTimestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
      }),
    title: z
      .string()
      .min(1)
      .max(60)
      .meta({ description: 'Title of the coupon. Displayed in the coupon list.' }),
    usageCondition: z
      .string()
      .min(0)
      .max(100)
      .meta({ description: 'Conditions for using the coupon. Shown to users.' })
      .exactOptional(),
    reward: CouponRewardRequestSchema.exactOptional(),
    visibility: z
      .enum(['UNLISTED', 'PUBLIC'])
      .meta({
        description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
      }),
    timezone: z
      .enum([
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
      ])
      .meta({ description: 'Timezone for interpreting start and end timestamps.' }),
  })
  .meta({
    description:
      'Request object for creating a coupon. Contains all configurable coupon properties.',
  })
  .meta({ ref: 'CouponCreateRequest' })

export type CouponCreateRequest = z.infer<typeof CouponCreateRequestSchema>

export const NormalAcquisitionConditionRequestSchema = AcquisitionConditionRequestSchema

export type NormalAcquisitionConditionRequest = z.infer<
  typeof NormalAcquisitionConditionRequestSchema
>

export const LotteryAcquisitionConditionRequestSchema = z
  .intersection(
    AcquisitionConditionRequestSchema,
    z.object({
      lotteryProbability: z
        .int32()
        .min(1)
        .max(99)
        .meta({
          description: 'Probability (1-99) of winning the coupon in lottery-type campaigns.',
        }),
      maxAcquireCount: z
        .int32()
        .max(999999)
        .meta({
          description:
            'Maximum number of coupons that can be issued in total. Use -1 to indicate no limit',
        }),
    }),
  )
  .meta({ ref: 'LotteryAcquisitionConditionRequest' })

export type LotteryAcquisitionConditionRequest = z.infer<
  typeof LotteryAcquisitionConditionRequestSchema
>

export const CashBackPriceInfoRequestSchema = z
  .object({ type: z.string() })
  .meta({ ref: 'CashBackPriceInfoRequest' })

export type CashBackPriceInfoRequest = z.infer<typeof CashBackPriceInfoRequestSchema>

export const CouponCashBackRewardRequestSchema = z
  .intersection(
    CouponRewardRequestSchema,
    z.object({ priceInfo: CashBackPriceInfoRequestSchema.exactOptional() }),
  )
  .meta({ ref: 'CouponCashBackRewardRequest' })

export type CouponCashBackRewardRequest = z.infer<typeof CouponCashBackRewardRequestSchema>

export const DiscountPriceInfoRequestSchema = z
  .object({ type: z.string() })
  .meta({ ref: 'DiscountPriceInfoRequest' })

export type DiscountPriceInfoRequest = z.infer<typeof DiscountPriceInfoRequestSchema>

export const CouponDiscountRewardRequestSchema = z
  .intersection(
    CouponRewardRequestSchema,
    z.object({ priceInfo: DiscountPriceInfoRequestSchema.exactOptional() }),
  )
  .meta({ ref: 'CouponDiscountRewardRequest' })

export type CouponDiscountRewardRequest = z.infer<typeof CouponDiscountRewardRequestSchema>

export const CouponFreeRewardRequestSchema = CouponRewardRequestSchema

export type CouponFreeRewardRequest = z.infer<typeof CouponFreeRewardRequestSchema>

export const CouponGiftRewardRequestSchema = CouponRewardRequestSchema

export type CouponGiftRewardRequest = z.infer<typeof CouponGiftRewardRequestSchema>

export const CouponOthersRewardRequestSchema = CouponRewardRequestSchema

export type CouponOthersRewardRequest = z.infer<typeof CouponOthersRewardRequestSchema>

export const CashBackFixedPriceInfoRequestSchema = z
  .intersection(
    CashBackPriceInfoRequestSchema,
    z.object({
      fixedAmount: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({ ref: 'CashBackFixedPriceInfoRequest' })

export type CashBackFixedPriceInfoRequest = z.infer<typeof CashBackFixedPriceInfoRequestSchema>

export const CashBackPercentagePriceInfoRequestSchema = z
  .intersection(
    CashBackPriceInfoRequestSchema,
    z.object({
      percentage: z
        .int32()
        .min(1)
        .max(99)
        .meta({
          description:
            'Specifies the cashback rate as a percentage. Must be an integer between 1 and 99.',
        })
        .exactOptional(),
    }),
  )
  .meta({ ref: 'CashBackPercentagePriceInfoRequest' })

export type CashBackPercentagePriceInfoRequest = z.infer<
  typeof CashBackPercentagePriceInfoRequestSchema
>

export const DiscountFixedPriceInfoRequestSchema = z
  .intersection(
    DiscountPriceInfoRequestSchema,
    z.object({
      fixedAmount: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({ ref: 'DiscountFixedPriceInfoRequest' })

export type DiscountFixedPriceInfoRequest = z.infer<typeof DiscountFixedPriceInfoRequestSchema>

export const DiscountPercentagePriceInfoRequestSchema = z
  .intersection(
    DiscountPriceInfoRequestSchema,
    z.object({
      percentage: z
        .int32()
        .min(1)
        .max(99)
        .meta({
          description:
            'Specifies the discount rate as a percentage. Must be an integer between 1 and 99.',
        })
        .exactOptional(),
    }),
  )
  .meta({ ref: 'DiscountPercentagePriceInfoRequest' })

export type DiscountPercentagePriceInfoRequest = z.infer<
  typeof DiscountPercentagePriceInfoRequestSchema
>

export const DiscountExplicitPriceInfoRequestSchema = z
  .intersection(
    DiscountPriceInfoRequestSchema,
    z.object({
      priceAfterDiscount: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
      originalPrice: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({ ref: 'DiscountExplicitPriceInfoRequest' })

export type DiscountExplicitPriceInfoRequest = z.infer<
  typeof DiscountExplicitPriceInfoRequestSchema
>

export const CouponCreateResponseSchema = z
  .object({ couponId: z.string().meta({ description: 'Unique identifier of the coupon.' }) })
  .meta({
    description: 'Response object returned after creating a coupon. Contains the coupon ID.',
  })
  .meta({ ref: 'CouponCreateResponse' })

export type CouponCreateResponse = z.infer<typeof CouponCreateResponseSchema>

export const AcquisitionConditionResponseSchema = z
  .object({
    type: z.string().meta({ description: 'Determines how the coupon is distributed or used.' }),
  })
  .meta({ ref: 'AcquisitionConditionResponse' })

export type AcquisitionConditionResponse = z.infer<typeof AcquisitionConditionResponseSchema>

export const CouponRewardResponseSchema = z
  .object({
    type: z.string().meta({ description: 'Type of coupon. Determines the benefit provided.' }),
  })
  .meta({ ref: 'CouponRewardResponse' })

export type CouponRewardResponse = z.infer<typeof CouponRewardResponseSchema>

export const CouponResponseSchema = z
  .object({
    acquisitionCondition: AcquisitionConditionResponseSchema.exactOptional(),
    barcodeImageUrl: z
      .url()
      .meta({
        description:
          'URL of the barcode image associated with the coupon. Used for in-store redemption.',
      })
      .exactOptional(),
    couponCode: z
      .string()
      .meta({ description: 'Unique code to be presented by the user to redeem the coupon.' })
      .exactOptional(),
    description: z
      .string()
      .meta({ description: 'Detailed description of the coupon. Displayed to users.' })
      .exactOptional(),
    endTimestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Coupon expiration time (epoch seconds). Coupon cannot be used after this time.',
      })
      .exactOptional(),
    imageUrl: z
      .url()
      .meta({
        description: 'URL of the main image representing the coupon. Displayed in the coupon list.',
      })
      .exactOptional(),
    maxAcquireCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Maximum number of coupons that can be issued in total.' })
      .exactOptional(),
    maxUseCountPerTicket: z
      .int32()
      .meta({ description: 'Maximum number of times a single coupon ticket can be used.' })
      .exactOptional(),
    maxTicketPerUser: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Maximum number of coupon tickets a single user can acquire.' })
      .exactOptional(),
    startTimestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description: 'Coupon start time (epoch seconds). Coupon can be used from this time.',
      })
      .exactOptional(),
    title: z
      .string()
      .meta({ description: 'Title of the coupon. Displayed in the coupon list.' })
      .exactOptional(),
    usageCondition: z
      .string()
      .meta({ description: 'Conditions for using the coupon. Shown to users.' })
      .exactOptional(),
    reward: CouponRewardResponseSchema.exactOptional(),
    visibility: z
      .enum(['UNLISTED', 'PUBLIC', 'PRIVATE'])
      .meta({
        description: 'Visibility of the coupon. Determines who can see or acquire the coupon.',
      })
      .exactOptional(),
    timezone: z
      .enum([
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
      ])
      .meta({ description: 'Timezone for interpreting start and end timestamps.' })
      .exactOptional(),
    couponId: z.string().meta({ description: 'Unique identifier of the coupon.' }).exactOptional(),
    createdTimestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Created timestamp (seconds) of the coupon.' })
      .exactOptional(),
    status: z
      .enum(['DRAFT', 'RUNNING', 'CLOSED'])
      .meta({ description: 'Current status of the coupon.' })
      .exactOptional(),
  })
  .meta({
    description:
      'Detailed information about a coupon, including all properties and current status.',
  })
  .meta({ ref: 'CouponResponse' })

export type CouponResponse = z.infer<typeof CouponResponseSchema>

export const NormalAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type NormalAcquisitionConditionResponse = z.infer<
  typeof NormalAcquisitionConditionResponseSchema
>

export const LotteryAcquisitionConditionResponseSchema = z
  .intersection(
    AcquisitionConditionResponseSchema,
    z.object({
      lotteryProbability: z.int32().exactOptional(),
      maxAcquireCount: z.int32().exactOptional(),
    }),
  )
  .meta({ ref: 'LotteryAcquisitionConditionResponse' })

export type LotteryAcquisitionConditionResponse = z.infer<
  typeof LotteryAcquisitionConditionResponseSchema
>

export const ReferralAcquisitionConditionResponseSchema = AcquisitionConditionResponseSchema

export type ReferralAcquisitionConditionResponse = z.infer<
  typeof ReferralAcquisitionConditionResponseSchema
>

export const CashBackPriceInfoResponseSchema = z
  .object({ type: z.string() })
  .meta({ ref: 'CashBackPriceInfoResponse' })

export type CashBackPriceInfoResponse = z.infer<typeof CashBackPriceInfoResponseSchema>

export const CouponCashBackRewardResponseSchema = z
  .intersection(
    CouponRewardResponseSchema,
    z.object({ priceInfo: CashBackPriceInfoResponseSchema.exactOptional() }),
  )
  .meta({ ref: 'CouponCashBackRewardResponse' })

export type CouponCashBackRewardResponse = z.infer<typeof CouponCashBackRewardResponseSchema>

export const DiscountPriceInfoResponseSchema = z
  .object({ type: z.string() })
  .meta({ ref: 'DiscountPriceInfoResponse' })

export type DiscountPriceInfoResponse = z.infer<typeof DiscountPriceInfoResponseSchema>

export const CouponDiscountRewardResponseSchema = z
  .intersection(
    CouponRewardResponseSchema,
    z.object({ priceInfo: DiscountPriceInfoResponseSchema.exactOptional() }),
  )
  .meta({ ref: 'CouponDiscountRewardResponse' })

export type CouponDiscountRewardResponse = z.infer<typeof CouponDiscountRewardResponseSchema>

export const CouponFreeRewardResponseSchema = CouponRewardResponseSchema

export type CouponFreeRewardResponse = z.infer<typeof CouponFreeRewardResponseSchema>

export const CouponGiftRewardResponseSchema = CouponRewardResponseSchema

export type CouponGiftRewardResponse = z.infer<typeof CouponGiftRewardResponseSchema>

export const CouponOthersRewardResponseSchema = CouponRewardResponseSchema

export type CouponOthersRewardResponse = z.infer<typeof CouponOthersRewardResponseSchema>

export const CashBackFixedPriceInfoResponseSchema = z
  .intersection(
    CashBackPriceInfoResponseSchema,
    z.object({
      currency: z
        .enum(['JPY', 'THB', 'TWD'])
        .meta({ description: 'Currency code (e.g., JPY, THB, TWD).' })
        .exactOptional(),
      fixedAmount: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({ ref: 'CashBackFixedPriceInfoResponse' })

export type CashBackFixedPriceInfoResponse = z.infer<typeof CashBackFixedPriceInfoResponseSchema>

export const CashBackPercentagePriceInfoResponseSchema = z
  .intersection(
    CashBackPriceInfoResponseSchema,
    z.object({ percentage: z.int32().exactOptional() }),
  )
  .meta({ ref: 'CashBackPercentagePriceInfoResponse' })

export type CashBackPercentagePriceInfoResponse = z.infer<
  typeof CashBackPercentagePriceInfoResponseSchema
>

export const DiscountFixedPriceInfoResponseSchema = z
  .intersection(
    DiscountPriceInfoResponseSchema,
    z.object({
      currency: z
        .enum(['JPY', 'THB', 'TWD'])
        .meta({ description: 'Currency code (e.g., JPY, THB, TWD).' })
        .exactOptional(),
      fixedAmount: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({ ref: 'DiscountFixedPriceInfoResponse' })

export type DiscountFixedPriceInfoResponse = z.infer<typeof DiscountFixedPriceInfoResponseSchema>

export const DiscountPercentagePriceInfoResponseSchema = z
  .intersection(
    DiscountPriceInfoResponseSchema,
    z.object({ percentage: z.int32().exactOptional() }),
  )
  .meta({ ref: 'DiscountPercentagePriceInfoResponse' })

export type DiscountPercentagePriceInfoResponse = z.infer<
  typeof DiscountPercentagePriceInfoResponseSchema
>

export const DiscountExplicitPriceInfoResponseSchema = z
  .intersection(
    DiscountPriceInfoResponseSchema,
    z.object({
      currency: z
        .enum(['JPY', 'THB', 'TWD'])
        .meta({ description: 'Currency code (e.g., JPY, THB, TWD).' })
        .exactOptional(),
      priceAfterDiscount: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
      originalPrice: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .exactOptional(),
    }),
  )
  .meta({ ref: 'DiscountExplicitPriceInfoResponse' })

export type DiscountExplicitPriceInfoResponse = z.infer<
  typeof DiscountExplicitPriceInfoResponseSchema
>

export const CouponListResponseSchema = z
  .object({
    couponId: z.string().meta({ description: 'Unique identifier of the coupon.' }),
    title: z.string().meta({ description: 'Title of the coupon. Displayed in the coupon list.' }),
  })
  .meta({ description: 'Summary information about a coupon, used in coupon lists.' })
  .meta({ ref: 'CouponListResponse' })

export type CouponListResponse = z.infer<typeof CouponListResponseSchema>

export const MessagingApiPagerCouponListResponseSchema = z
  .object({
    items: z
      .array(CouponListResponseSchema)
      .meta({ description: 'List of coupon summary objects.' }),
    next: z
      .string()
      .meta({ description: 'Token for fetching the next page of results.' })
      .exactOptional(),
  })
  .meta({ description: 'Paginated response object containing a list of coupons.' })
  .meta({ ref: 'MessagingApiPagerCouponListResponse' })

export type MessagingApiPagerCouponListResponse = z.infer<
  typeof MessagingApiPagerCouponListResponseSchema
>

export const ShowLoadingAnimationRequestSchema = z
  .object({
    chatId: z
      .string()
      .meta({
        description:
          'User ID of the target user for whom the loading animation is to be displayed.',
      }),
    loadingSeconds: z
      .int32()
      .min(5)
      .max(60)
      .meta({
        description:
          'The number of seconds to display the loading indicator.\nIt must be a multiple of 5. The maximum value is 60 seconds.\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-request-body',
    },
  })
  .meta({ ref: 'ShowLoadingAnimationRequest' })

export type ShowLoadingAnimationRequest = z.infer<typeof ShowLoadingAnimationRequestSchema>

export const ShowLoadingAnimationResponseSchema = z
  .object({})
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-response',
    },
  })
  .meta({ ref: 'ShowLoadingAnimationResponse' })

export type ShowLoadingAnimationResponse = z.infer<typeof ShowLoadingAnimationResponseSchema>

export const MarkMessagesAsReadByTokenRequestSchema = z
  .object({
    markAsReadToken: z.string().meta({ description: 'Token used to mark messages as read.' }),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#mark-as-read-request-body',
    },
  })
  .meta({ ref: 'MarkMessagesAsReadByTokenRequest' })

export type MarkMessagesAsReadByTokenRequest = z.infer<
  typeof MarkMessagesAsReadByTokenRequestSchema
>

export const ErrorDetailSchema = z
  .object({
    message: z
      .string()
      .meta({
        description: 'Details of the error. Not included in the response under certain situations.',
      })
      .exactOptional(),
    property: z
      .string()
      .meta({
        description:
          'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
      })
      .exactOptional(),
  })
  .meta({ ref: 'ErrorDetail' })

export type ErrorDetail = z.infer<typeof ErrorDetailSchema>

export const ErrorResponseSchema = z
  .object({
    message: z.string().meta({ description: 'Message containing information about the error.' }),
    details: z
      .array(ErrorDetailSchema)
      .meta({
        description:
          'An array of error details. If the array is empty, this property will not be included in the response.',
      })
      .exactOptional(),
    sentMessages: z
      .array(SentMessageSchema)
      .min(1)
      .max(5)
      .meta({ description: 'Array of sent messages.' })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  })
  .meta({ ref: 'ErrorResponse' })

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
