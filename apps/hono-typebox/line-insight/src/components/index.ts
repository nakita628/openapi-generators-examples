import { Type, type Static } from 'typebox'

export const GenderTileSchema = Type.Object(
  {
    gender: Type.Optional(
      Type.Union([Type.Literal('male'), Type.Literal('female'), Type.Literal('unknown')], {
        description: "users' gender",
      }),
    ),
    percentage: Type.Optional(Type.Number({ description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export type GenderTile = Static<typeof GenderTileSchema>

export const AgeTileSchema = Type.Object(
  {
    age: Type.Optional(
      Type.Union(
        [
          Type.Literal('from0to14'),
          Type.Literal('from15to19'),
          Type.Literal('from20to24'),
          Type.Literal('from25to29'),
          Type.Literal('from30to34'),
          Type.Literal('from35to39'),
          Type.Literal('from40to44'),
          Type.Literal('from45to49'),
          Type.Literal('from50'),
          Type.Literal('from50to54'),
          Type.Literal('from55to59'),
          Type.Literal('from60to64'),
          Type.Literal('from65to69'),
          Type.Literal('from70'),
          Type.Literal('unknown'),
        ],
        { description: "users' age" },
      ),
    ),
    percentage: Type.Optional(Type.Number({ description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export type AgeTile = Static<typeof AgeTileSchema>

export const AreaTileSchema = Type.Object(
  {
    area: Type.Optional(Type.String({ description: "users' country and region" })),
    percentage: Type.Optional(Type.Number({ description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export type AreaTile = Static<typeof AreaTileSchema>

export const AppTypeTileSchema = Type.Object(
  {
    appType: Type.Optional(
      Type.Union([Type.Literal('ios'), Type.Literal('android'), Type.Literal('others')], {
        description: "users' OS",
      }),
    ),
    percentage: Type.Optional(Type.Number({ description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export type AppTypeTile = Static<typeof AppTypeTileSchema>

export const SubscriptionPeriodTileSchema = Type.Object(
  {
    subscriptionPeriod: Type.Optional(
      Type.Union(
        [
          Type.Literal('within7days'),
          Type.Literal('within30days'),
          Type.Literal('within90days'),
          Type.Literal('within180days'),
          Type.Literal('within365days'),
          Type.Literal('over365days'),
          Type.Literal('unknown'),
        ],
        {
          description:
            'Subscription period. Possible values: `within7days`, `within90days`, `unknown` etc.',
        },
      ),
    ),
    percentage: Type.Optional(
      Type.Number({ description: 'Percentage. Possible values: [0.0,100.0] e.g. 0, 2.9, 37.6.' }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export type SubscriptionPeriodTile = Static<typeof SubscriptionPeriodTileSchema>

export const GetFriendsDemographicsResponseSchema = Type.Object(
  {
    available: Type.Optional(
      Type.Boolean({ description: 'true if friend demographic information is available.' }),
    ),
    genders: Type.Optional(Type.Array(GenderTileSchema, { description: 'Percentage per gender.' })),
    ages: Type.Optional(Type.Array(AgeTileSchema, { description: 'Percentage per age group.' })),
    areas: Type.Optional(Type.Array(AreaTileSchema, { description: 'Percentage per area.' })),
    appTypes: Type.Optional(Type.Array(AppTypeTileSchema, { description: 'Percentage by OS.' })),
    subscriptionPeriods: Type.Optional(
      Type.Array(SubscriptionPeriodTileSchema, {
        description: 'Percentage per friendship duration.',
      }),
    ),
  },
  {
    description: 'Get friend demographics',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export type GetFriendsDemographicsResponse = Static<typeof GetFriendsDemographicsResponseSchema>

export const GetNumberOfMessageDeliveriesResponseSchema = Type.Object(
  {
    status: Type.Optional(
      Type.Union([Type.Literal('ready'), Type.Literal('unready'), Type.Literal('out_of_service')], {
        description: 'Status of the counting process.',
      }),
    ),
    broadcast: Type.Optional(
      Type.Integer({
        description:
          "Number of messages sent to all of this LINE Official Account's friends (broadcast messages).",
      }),
    ),
    targeting: Type.Optional(
      Type.Integer({
        description:
          "Number of messages sent to some of this LINE Official Account's friends, based on specific attributes (targeted messages).",
      }),
    ),
    autoResponse: Type.Optional(
      Type.Integer({ description: 'Number of auto-response messages sent.' }),
    ),
    welcomeResponse: Type.Optional(
      Type.Integer({ description: 'Number of greeting messages sent.' }),
    ),
    chat: Type.Optional(
      Type.Integer({
        description:
          'Number of messages sent from LINE Official Account Manager [Chat screen](https://www.linebiz.com/jp/manual/OfficialAccountManager/chats/) (only available in Japanese).',
      }),
    ),
    apiBroadcast: Type.Optional(
      Type.Integer({
        description:
          'Number of broadcast messages sent with the `Send broadcast message` Messaging API operation.',
      }),
    ),
    apiPush: Type.Optional(
      Type.Integer({
        description:
          'Number of push messages sent with the `Send push message` Messaging API operation.',
      }),
    ),
    apiMulticast: Type.Optional(
      Type.Integer({
        description:
          'Number of multicast messages sent with the `Send multicast message` Messaging API operation.',
      }),
    ),
    apiNarrowcast: Type.Optional(
      Type.Integer({
        description:
          'Number of narrowcast messages sent with the `Send narrowcast message` Messaging API operation.',
      }),
    ),
    apiReply: Type.Optional(
      Type.Integer({
        description:
          'Number of replies sent with the `Send reply message` Messaging API operation.',
      }),
    ),
  },
  {
    description: 'Get number of message deliveries',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-delivery-messages',
    },
  },
)

export type GetNumberOfMessageDeliveriesResponse = Static<
  typeof GetNumberOfMessageDeliveriesResponseSchema
>

export const GetNumberOfFollowersResponseSchema = Type.Object(
  {
    status: Type.Optional(
      Type.Union([Type.Literal('ready'), Type.Literal('unready'), Type.Literal('out_of_service')], {
        description: 'Calculation status.',
      }),
    ),
    followers: Type.Optional(
      Type.Integer({
        description:
          "The number of times, as of the specified date, that a user added this LINE Official Account as a friend for the first time.\nThe number doesn't decrease even if a user later blocks the account or when they delete their LINE account.\n",
      }),
    ),
    targetedReaches: Type.Optional(
      Type.Integer({
        description:
          'The number of users, as of the specified date, that the LINE Official Account can reach through targeted messages based on gender, age, and/or region.\nThis number only includes users who are active on LINE or LINE services and whose demographics have a high level of certainty.\n',
      }),
    ),
    blocks: Type.Optional(
      Type.Integer({
        description:
          'The number of users blocking the account as of the specified date.\nThe number decreases when a user unblocks the account.\n\n\n',
      }),
    ),
  },
  {
    description: 'Get number of followers',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-followers',
    },
  },
)

export type GetNumberOfFollowersResponse = Static<typeof GetNumberOfFollowersResponseSchema>

export const GetMessageEventResponseOverviewSchema = Type.Object(
  {
    requestId: Type.Optional(Type.String({ description: 'Request ID.' })),
    timestamp: Type.Optional(
      Type.Integer({ description: 'UNIX timestamp for message delivery time in seconds.' }),
    ),
    delivered: Type.Optional(
      Type.Integer({
        description:
          'Number of messages delivered.\nThis property shows values of less than 20.\nHowever, if all messages have not been sent, it will be null.\n',
      }),
    ),
    uniqueImpression: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users who opened the message, meaning they displayed at least 1 bubble.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueClick: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of users who opened any URL in the message.' }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed: Type.Optional(
      Type.Union([
        Type.Integer({
          description: 'Number of users who started playing any video or audio in the message.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users who played the entirety of any video or audio in the message.',
        }),
        Type.Null(),
      ]),
    ),
  },
  {
    description: 'Summary of message statistics.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  },
)

export type GetMessageEventResponseOverview = Static<typeof GetMessageEventResponseOverviewSchema>

export const GetMessageEventResponseMessageSchema = Type.Object(
  {
    seq: Type.Optional(Type.Integer({ description: "Bubble's serial number." })),
    impression: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of times the bubble was displayed.' }),
        Type.Null(),
      ]),
    ),
    mediaPlayed: Type.Optional(
      Type.Union([
        Type.Integer({
          description: 'Number of times audio or video in the bubble started playing.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed25Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed50Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed75Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed100Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed: Type.Optional(
      Type.Union([
        Type.Integer({
          description: 'Number of users that started playing audio or video in the bubble.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed25Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed50Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed75Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  },
)

export type GetMessageEventResponseMessage = Static<typeof GetMessageEventResponseMessageSchema>

export const GetMessageEventResponseClickSchema = Type.Object(
  {
    seq: Type.Optional(Type.Integer({ description: "The URL's serial number." })),
    url: Type.Optional(Type.String({ description: 'URL.' })),
    click: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of times the URL was opened.' }),
        Type.Null(),
      ]),
    ),
    uniqueClick: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of users that opened the URL.' }),
        Type.Null(),
      ]),
    ),
    uniqueClickOfRequest: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            "Number of users who opened this url through any link in the message. If a message contains two links to the same URL and a user opens both links, they're counted only once.",
        }),
        Type.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  },
)

export type GetMessageEventResponseClick = Static<typeof GetMessageEventResponseClickSchema>

export const GetMessageEventResponseSchema = Type.Object(
  {
    overview: Type.Optional(GetMessageEventResponseOverviewSchema),
    messages: Type.Optional(
      Type.Array(GetMessageEventResponseMessageSchema, {
        description: 'Array of information about individual message bubbles.',
      }),
    ),
    clicks: Type.Optional(
      Type.Array(GetMessageEventResponseClickSchema, {
        description: 'Array of information about opened URLs in the message.',
      }),
    ),
  },
  {
    description:
      'Statistics about how users interact with narrowcast messages or broadcast messages sent from your LINE Official Account.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  },
)

export type GetMessageEventResponse = Static<typeof GetMessageEventResponseSchema>

export const GetStatisticsPerUnitResponseOverviewSchema = Type.Object(
  {
    uniqueImpression: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users who opened the message, meaning they displayed at least 1 bubble.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueClick: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of users who opened any URL in the message.' }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed: Type.Optional(
      Type.Union([
        Type.Integer({
          description: 'Number of users who started playing any video or audio in the message.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users who played the entirety of any video or audio in the message.',
        }),
        Type.Null(),
      ]),
    ),
  },
  {
    description: 'Statistics related to messages.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  },
)

export type GetStatisticsPerUnitResponseOverview = Static<
  typeof GetStatisticsPerUnitResponseOverviewSchema
>

export const GetStatisticsPerUnitResponseMessageSchema = Type.Object(
  {
    seq: Type.Integer({ description: "Bubble's serial number." }),
    impression: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of times the bubble was displayed.' }),
        Type.Null(),
      ]),
    ),
    mediaPlayed: Type.Optional(
      Type.Union([
        Type.Integer({
          description: 'Number of times audio or video in the bubble started playing.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed25Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed50Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed75Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    mediaPlayed100Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueImpression: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of users the bubble was displayed.' }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed: Type.Optional(
      Type.Union([
        Type.Integer({
          description: 'Number of users that started playing audio or video in the bubble.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed25Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed50Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed75Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
        }),
        Type.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  },
)

export type GetStatisticsPerUnitResponseMessage = Static<
  typeof GetStatisticsPerUnitResponseMessageSchema
>

export const GetStatisticsPerUnitResponseClickSchema = Type.Object(
  {
    seq: Type.Integer({ description: "The URL's serial number." }),
    url: Type.String({ description: 'URL.' }),
    click: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of times the URL in the bubble was opened.' }),
        Type.Null(),
      ]),
    ),
    uniqueClick: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Number of users that opened the URL in the bubble.' }),
        Type.Null(),
      ]),
    ),
    uniqueClickOfRequest: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            "Number of users who opened this url through any link in the message.\nIf another message bubble contains the same URL and a user opens both links, it's counted only once.\n",
        }),
        Type.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  },
)

export type GetStatisticsPerUnitResponseClick = Static<
  typeof GetStatisticsPerUnitResponseClickSchema
>

export const GetStatisticsPerUnitResponseSchema = Type.Object(
  {
    overview: GetStatisticsPerUnitResponseOverviewSchema,
    messages: Type.Array(GetStatisticsPerUnitResponseMessageSchema, {
      description: 'Array of information about individual message bubbles.',
    }),
    clicks: Type.Array(GetStatisticsPerUnitResponseClickSchema, {
      description: 'Array of information about opened URLs in the message.',
    }),
  },
  {
    description: 'Response object for `get statistics per unit`',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  },
)

export type GetStatisticsPerUnitResponse = Static<typeof GetStatisticsPerUnitResponseSchema>

export const GetRichMenuInsightSummaryResponseMetricsSchema = Type.Object(
  {
    count: Type.Integer({ description: 'Number of impressions or clicks.' }),
    uniqueUsers: Type.Integer({
      description: 'Approximate number of unique users who triggered an impression or click.',
    }),
  },
  { description: 'Aggregated number of events and unique users over the whole period.' },
)

export type GetRichMenuInsightSummaryResponseMetrics = Static<
  typeof GetRichMenuInsightSummaryResponseMetricsSchema
>

export const GetRichMenuInsightSummaryResponseImpressionSchema = Type.Object(
  { metrics: GetRichMenuInsightSummaryResponseMetricsSchema },
  { description: 'Impression metrics for the whole rich menu.' },
)

export type GetRichMenuInsightSummaryResponseImpression = Static<
  typeof GetRichMenuInsightSummaryResponseImpressionSchema
>

export const GetRichMenuInsightSummaryResponseBoundsSchema = Type.Object(
  {
    x: Type.Integer({ description: 'The x coordinate of the top-left corner of the target area.' }),
    y: Type.Integer({ description: 'The y coordinate of the top-left corner of the target area.' }),
    width: Type.Integer({ description: 'The width of the target area.' }),
    height: Type.Integer({ description: 'The height of the target area.' }),
  },
  {
    description:
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
  },
)

export type GetRichMenuInsightSummaryResponseBounds = Static<
  typeof GetRichMenuInsightSummaryResponseBoundsSchema
>

export const GetRichMenuInsightSummaryResponseClickSchema = Type.Object(
  {
    bounds: GetRichMenuInsightSummaryResponseBoundsSchema,
    metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
  },
  { description: 'Click metrics for a single tappable area of the rich menu.' },
)

export type GetRichMenuInsightSummaryResponseClick = Static<
  typeof GetRichMenuInsightSummaryResponseClickSchema
>

export const GetRichMenuInsightSummaryResponseSchema = Type.Object(
  {
    richMenuId: Type.String({ description: 'Rich menu ID.' }),
    metricsFrom: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^[0-9]{8}$',
          description:
            'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
          examples: ['20260213'],
        }),
        Type.Null(),
      ]),
    ),
    metricsTo: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^[0-9]{8}$',
          description:
            'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
          examples: ['20260215'],
        }),
        Type.Null(),
      ]),
    ),
    impression: Type.Optional(GetRichMenuInsightSummaryResponseImpressionSchema),
    clicks: Type.Optional(
      Type.Array(GetRichMenuInsightSummaryResponseClickSchema, {
        description: 'Click metrics for each tappable area of the rich menu.',
      }),
    ),
  },
  {
    description:
      'Summary of impression and click statistics for a rich menu created via the Messaging API.',
  },
)

export type GetRichMenuInsightSummaryResponse = Static<
  typeof GetRichMenuInsightSummaryResponseSchema
>

export const GetRichMenuInsightDailyResponseDailyMetricsSchema = Type.Object(
  {
    date: Type.String({
      pattern: '^[0-9]{8}$',
      description: 'The date (JST) of these metrics. Format: yyyyMMdd (e.g. 20260213).',
      examples: ['20260213'],
    }),
    count: Type.Integer({ description: 'Number of impressions or clicks on this day.' }),
    uniqueUsers: Type.Integer({
      description:
        'Approximate number of unique users who triggered an impression or click on this day.',
    }),
  },
  { description: 'Aggregated number of events and unique users for a single day.' },
)

export type GetRichMenuInsightDailyResponseDailyMetrics = Static<
  typeof GetRichMenuInsightDailyResponseDailyMetricsSchema
>

export const GetRichMenuInsightDailyResponseImpressionSchema = Type.Object(
  {
    metrics: Type.Array(GetRichMenuInsightDailyResponseDailyMetricsSchema, {
      description: 'Per-day impression metrics.',
    }),
  },
  { description: 'Daily impression metrics for the whole rich menu.' },
)

export type GetRichMenuInsightDailyResponseImpression = Static<
  typeof GetRichMenuInsightDailyResponseImpressionSchema
>

export const GetRichMenuInsightDailyResponseBoundsSchema = Type.Object(
  {
    x: Type.Integer({ description: 'The x coordinate of the top-left corner of the target area.' }),
    y: Type.Integer({ description: 'The y coordinate of the top-left corner of the target area.' }),
    width: Type.Integer({ description: 'The width of the target area.' }),
    height: Type.Integer({ description: 'The height of the target area.' }),
  },
  {
    description:
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
  },
)

export type GetRichMenuInsightDailyResponseBounds = Static<
  typeof GetRichMenuInsightDailyResponseBoundsSchema
>

export const GetRichMenuInsightDailyResponseClickSchema = Type.Object(
  {
    bounds: GetRichMenuInsightDailyResponseBoundsSchema,
    metrics: Type.Array(GetRichMenuInsightDailyResponseDailyMetricsSchema, {
      description: 'Per-day click metrics for the target area.',
    }),
  },
  { description: 'Daily click metrics for a single tappable area of the rich menu.' },
)

export type GetRichMenuInsightDailyResponseClick = Static<
  typeof GetRichMenuInsightDailyResponseClickSchema
>

export const GetRichMenuInsightDailyResponseSchema = Type.Object(
  {
    richMenuId: Type.String({ description: 'Rich menu ID.' }),
    metricsFrom: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^[0-9]{8}$',
          description:
            'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
          examples: ['20260213'],
        }),
        Type.Null(),
      ]),
    ),
    metricsTo: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^[0-9]{8}$',
          description:
            'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
          examples: ['20260215'],
        }),
        Type.Null(),
      ]),
    ),
    impression: Type.Optional(GetRichMenuInsightDailyResponseImpressionSchema),
    clicks: Type.Optional(
      Type.Array(GetRichMenuInsightDailyResponseClickSchema, {
        description: 'Daily click metrics for each tappable area of the rich menu.',
      }),
    ),
  },
  {
    description:
      'Daily impression and click statistics for a rich menu created via the Messaging API.',
  },
)

export type GetRichMenuInsightDailyResponse = Static<typeof GetRichMenuInsightDailyResponseSchema>

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
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  },
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
  },
  {
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
