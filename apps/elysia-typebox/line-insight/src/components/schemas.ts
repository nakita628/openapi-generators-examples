import { t } from 'elysia'

export const GenderTileSchema = t.Object(
  {
    gender: t.Optional(
      t.UnionEnum(['male', 'female', 'unknown'], {
        description: "users' gender",
        default: undefined,
      }),
    ),
    percentage: t.Optional(t.Number({ format: 'double', description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export const AgeTileSchema = t.Object(
  {
    age: t.Optional(
      t.UnionEnum(
        [
          'from0to14',
          'from15to19',
          'from20to24',
          'from25to29',
          'from30to34',
          'from35to39',
          'from40to44',
          'from45to49',
          'from50',
          'from50to54',
          'from55to59',
          'from60to64',
          'from65to69',
          'from70',
          'unknown',
        ],
        { description: "users' age", default: undefined },
      ),
    ),
    percentage: t.Optional(t.Number({ format: 'double', description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export const AreaTileSchema = t.Object(
  {
    area: t.Optional(t.String({ description: "users' country and region" })),
    percentage: t.Optional(t.Number({ format: 'double', description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export const AppTypeTileSchema = t.Object(
  {
    appType: t.Optional(
      t.UnionEnum(['ios', 'android', 'others'], { description: "users' OS", default: undefined }),
    ),
    percentage: t.Optional(t.Number({ format: 'double', description: 'Percentage' })),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export const SubscriptionPeriodTileSchema = t.Object(
  {
    subscriptionPeriod: t.Optional(
      t.UnionEnum(
        [
          'within7days',
          'within30days',
          'within90days',
          'within180days',
          'within365days',
          'over365days',
          'unknown',
        ],
        {
          description:
            'Subscription period. Possible values: `within7days`, `within90days`, `unknown` etc.',
          default: undefined,
        },
      ),
    ),
    percentage: t.Optional(
      t.Number({
        format: 'double',
        description: 'Percentage. Possible values: [0.0,100.0] e.g. 0, 2.9, 37.6.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  },
)

export const GetFriendsDemographicsResponseSchema = t.Object(
  {
    available: t.Optional(
      t.Boolean({ description: 'true if friend demographic information is available.' }),
    ),
    genders: t.Optional(t.Array(GenderTileSchema, { description: 'Percentage per gender.' })),
    ages: t.Optional(t.Array(AgeTileSchema, { description: 'Percentage per age group.' })),
    areas: t.Optional(t.Array(AreaTileSchema, { description: 'Percentage per area.' })),
    appTypes: t.Optional(t.Array(AppTypeTileSchema, { description: 'Percentage by OS.' })),
    subscriptionPeriods: t.Optional(
      t.Array(SubscriptionPeriodTileSchema, { description: 'Percentage per friendship duration.' }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
    description: 'Get friend demographics',
  },
)

export const GetNumberOfMessageDeliveriesResponseSchema = t.Object(
  {
    status: t.Optional(
      t.UnionEnum(['ready', 'unready', 'out_of_service'], {
        description: 'Status of the counting process.',
        default: undefined,
      }),
    ),
    broadcast: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          "Number of messages sent to all of this LINE Official Account's friends (broadcast messages).",
      }),
    ),
    targeting: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          "Number of messages sent to some of this LINE Official Account's friends, based on specific attributes (targeted messages).",
      }),
    ),
    autoResponse: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Number of auto-response messages sent.',
      }),
    ),
    welcomeResponse: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Number of greeting messages sent.',
      }),
    ),
    chat: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Number of messages sent from LINE Official Account Manager [Chat screen](https://www.linebiz.com/jp/manual/OfficialAccountManager/chats/) (only available in Japanese).',
      }),
    ),
    apiBroadcast: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Number of broadcast messages sent with the `Send broadcast message` Messaging API operation.',
      }),
    ),
    apiPush: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Number of push messages sent with the `Send push message` Messaging API operation.',
      }),
    ),
    apiMulticast: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Number of multicast messages sent with the `Send multicast message` Messaging API operation.',
      }),
    ),
    apiNarrowcast: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Number of narrowcast messages sent with the `Send narrowcast message` Messaging API operation.',
      }),
    ),
    apiReply: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Number of replies sent with the `Send reply message` Messaging API operation.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-delivery-messages',
    },
    description: 'Get number of message deliveries',
  },
)

export const GetNumberOfFollowersResponseSchema = t.Object(
  {
    status: t.Optional(
      t.UnionEnum(['ready', 'unready', 'out_of_service'], {
        description: 'Calculation status.',
        default: undefined,
      }),
    ),
    followers: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          "The number of times, as of the specified date, that a user added this LINE Official Account as a friend for the first time.\nThe number doesn't decrease even if a user later blocks the account or when they delete their LINE account.\n",
      }),
    ),
    targetedReaches: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'The number of users, as of the specified date, that the LINE Official Account can reach through targeted messages based on gender, age, and/or region.\nThis number only includes users who are active on LINE or LINE services and whose demographics have a high level of certainty.\n',
      }),
    ),
    blocks: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'The number of users blocking the account as of the specified date.\nThe number decreases when a user unblocks the account.\n\n\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-followers',
    },
    description: 'Get number of followers',
  },
)

export const GetMessageEventResponseOverviewSchema = t.Object(
  {
    requestId: t.Optional(t.String({ description: 'Request ID.' })),
    timestamp: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'UNIX timestamp for message delivery time in seconds.',
      }),
    ),
    delivered: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Number of messages delivered.\nThis property shows values of less than 20.\nHowever, if all messages have not been sent, it will be null.\n',
      }),
    ),
    uniqueImpression: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users who opened the message, meaning they displayed at least 1 bubble.',
        }),
        t.Null(),
      ]),
    ),
    uniqueClick: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users who opened any URL in the message.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users who started playing any video or audio in the message.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users who played the entirety of any video or audio in the message.',
        }),
        t.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
    description: 'Summary of message statistics.',
  },
)

export const GetMessageEventResponseMessageSchema = t.Object(
  {
    seq: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: "Bubble's serial number.",
      }),
    ),
    impression: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of times the bubble was displayed.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of times audio or video in the bubble started playing.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed25Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed50Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed75Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed100Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users that started playing audio or video in the bubble.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed25Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed50Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed75Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
        }),
        t.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  },
)

export const GetMessageEventResponseClickSchema = t.Object(
  {
    seq: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: "The URL's serial number.",
      }),
    ),
    url: t.Optional(t.String({ description: 'URL.' })),
    click: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of times the URL was opened.',
        }),
        t.Null(),
      ]),
    ),
    uniqueClick: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users that opened the URL.',
        }),
        t.Null(),
      ]),
    ),
    uniqueClickOfRequest: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            "Number of users who opened this url through any link in the message. If a message contains two links to the same URL and a user opens both links, they're counted only once.",
        }),
        t.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  },
)

export const GetMessageEventResponseSchema = t.Object(
  {
    overview: t.Optional(GetMessageEventResponseOverviewSchema),
    messages: t.Optional(
      t.Array(GetMessageEventResponseMessageSchema, {
        description: 'Array of information about individual message bubbles.',
      }),
    ),
    clicks: t.Optional(
      t.Array(GetMessageEventResponseClickSchema, {
        description: 'Array of information about opened URLs in the message.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
    description:
      'Statistics about how users interact with narrowcast messages or broadcast messages sent from your LINE Official Account.',
  },
)

export const GetStatisticsPerUnitResponseOverviewSchema = t.Object(
  {
    uniqueImpression: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users who opened the message, meaning they displayed at least 1 bubble.',
        }),
        t.Null(),
      ]),
    ),
    uniqueClick: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users who opened any URL in the message.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users who started playing any video or audio in the message.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users who played the entirety of any video or audio in the message.',
        }),
        t.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
    description: 'Statistics related to messages.',
  },
)

export const GetStatisticsPerUnitResponseMessageSchema = t.Object(
  {
    seq: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: "Bubble's serial number.",
    }),
    impression: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of times the bubble was displayed.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of times audio or video in the bubble started playing.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed25Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed50Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed75Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    mediaPlayed100Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueImpression: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users the bubble was displayed.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users that started playing audio or video in the bubble.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed25Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed50Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed75Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
        }),
        t.Null(),
      ]),
    ),
    uniqueMediaPlayed100Percent: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
        }),
        t.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  },
)

export const GetStatisticsPerUnitResponseClickSchema = t.Object(
  {
    seq: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: "The URL's serial number.",
    }),
    url: t.String({ description: 'URL.' }),
    click: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of times the URL in the bubble was opened.',
        }),
        t.Null(),
      ]),
    ),
    uniqueClick: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description: 'Number of users that opened the URL in the bubble.',
        }),
        t.Null(),
      ]),
    ),
    uniqueClickOfRequest: t.Optional(
      t.Union([
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          description:
            "Number of users who opened this url through any link in the message.\nIf another message bubble contains the same URL and a user opens both links, it's counted only once.\n",
        }),
        t.Null(),
      ]),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  },
)

export const GetStatisticsPerUnitResponseSchema = t.Object(
  {
    overview: GetStatisticsPerUnitResponseOverviewSchema,
    messages: t.Array(GetStatisticsPerUnitResponseMessageSchema, {
      description: 'Array of information about individual message bubbles.',
    }),
    clicks: t.Array(GetStatisticsPerUnitResponseClickSchema, {
      description: 'Array of information about opened URLs in the message.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
    description: 'Response object for `get statistics per unit`',
  },
)

export const GetRichMenuInsightSummaryResponseMetricsSchema = t.Object(
  {
    count: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Number of impressions or clicks.',
    }),
    uniqueUsers: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Approximate number of unique users who triggered an impression or click.',
    }),
  },
  { description: 'Aggregated number of events and unique users over the whole period.' },
)

export const GetRichMenuInsightSummaryResponseImpressionSchema = t.Object(
  { metrics: GetRichMenuInsightSummaryResponseMetricsSchema },
  { description: 'Impression metrics for the whole rich menu.' },
)

export const GetRichMenuInsightSummaryResponseBoundsSchema = t.Object(
  {
    x: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The x coordinate of the top-left corner of the target area.',
    }),
    y: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The y coordinate of the top-left corner of the target area.',
    }),
    width: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The width of the target area.',
    }),
    height: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The height of the target area.',
    }),
  },
  {
    description:
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
  },
)

export const GetRichMenuInsightSummaryResponseClickSchema = t.Object(
  {
    bounds: GetRichMenuInsightSummaryResponseBoundsSchema,
    metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
  },
  { description: 'Click metrics for a single tappable area of the rich menu.' },
)

export const GetRichMenuInsightSummaryResponseSchema = t.Object(
  {
    richMenuId: t.String({ description: 'Rich menu ID.' }),
    metricsFrom: t.Optional(
      t.Union([
        t.String({
          pattern: '^[0-9]{8}$',
          example: '20260213',
          description:
            'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
        }),
        t.Null(),
      ]),
    ),
    metricsTo: t.Optional(
      t.Union([
        t.String({
          pattern: '^[0-9]{8}$',
          example: '20260215',
          description:
            'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
        }),
        t.Null(),
      ]),
    ),
    impression: t.Optional(GetRichMenuInsightSummaryResponseImpressionSchema),
    clicks: t.Optional(
      t.Array(GetRichMenuInsightSummaryResponseClickSchema, {
        description: 'Click metrics for each tappable area of the rich menu.',
      }),
    ),
  },
  {
    description:
      'Summary of impression and click statistics for a rich menu created via the Messaging API.',
  },
)

export const GetRichMenuInsightDailyResponseDailyMetricsSchema = t.Object(
  {
    date: t.String({
      pattern: '^[0-9]{8}$',
      example: '20260213',
      description: 'The date (JST) of these metrics. Format: yyyyMMdd (e.g. 20260213).',
    }),
    count: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Number of impressions or clicks on this day.',
    }),
    uniqueUsers: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description:
        'Approximate number of unique users who triggered an impression or click on this day.',
    }),
  },
  { description: 'Aggregated number of events and unique users for a single day.' },
)

export const GetRichMenuInsightDailyResponseImpressionSchema = t.Object(
  {
    metrics: t.Array(GetRichMenuInsightDailyResponseDailyMetricsSchema, {
      description: 'Per-day impression metrics.',
    }),
  },
  { description: 'Daily impression metrics for the whole rich menu.' },
)

export const GetRichMenuInsightDailyResponseBoundsSchema = t.Object(
  {
    x: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The x coordinate of the top-left corner of the target area.',
    }),
    y: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The y coordinate of the top-left corner of the target area.',
    }),
    width: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The width of the target area.',
    }),
    height: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'The height of the target area.',
    }),
  },
  {
    description:
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
  },
)

export const GetRichMenuInsightDailyResponseClickSchema = t.Object(
  {
    bounds: GetRichMenuInsightDailyResponseBoundsSchema,
    metrics: t.Array(GetRichMenuInsightDailyResponseDailyMetricsSchema, {
      description: 'Per-day click metrics for the target area.',
    }),
  },
  { description: 'Daily click metrics for a single tappable area of the rich menu.' },
)

export const GetRichMenuInsightDailyResponseSchema = t.Object(
  {
    richMenuId: t.String({ description: 'Rich menu ID.' }),
    metricsFrom: t.Optional(
      t.Union([
        t.String({
          pattern: '^[0-9]{8}$',
          example: '20260213',
          description:
            'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
        }),
        t.Null(),
      ]),
    ),
    metricsTo: t.Optional(
      t.Union([
        t.String({
          pattern: '^[0-9]{8}$',
          example: '20260215',
          description:
            'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
        }),
        t.Null(),
      ]),
    ),
    impression: t.Optional(GetRichMenuInsightDailyResponseImpressionSchema),
    clicks: t.Optional(
      t.Array(GetRichMenuInsightDailyResponseClickSchema, {
        description: 'Daily click metrics for each tappable area of the rich menu.',
      }),
    ),
  },
  {
    description:
      'Daily impression and click statistics for a rich menu created via the Messaging API.',
  },
)

export const ErrorDetailSchema = t.Object(
  {
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
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  },
)

export const ErrorResponseSchema = t.Object(
  {
    message: t.String({ description: 'Message containing information about the error.' }),
    details: t.Optional(
      t.Array(ErrorDetailSchema, {
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
