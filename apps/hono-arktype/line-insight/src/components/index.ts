import { type } from 'arktype'

export const GenderTileSchema = type({
  'gender?': type("'male' | 'female' | 'unknown'").describe("users' gender"),
  'percentage?': type('number').describe('Percentage'),
})

export type GenderTile = typeof GenderTileSchema.infer

export const AgeTileSchema = type({
  'age?': type(
    "'from0to14' | 'from15to19' | 'from20to24' | 'from25to29' | 'from30to34' | 'from35to39' | 'from40to44' | 'from45to49' | 'from50' | 'from50to54' | 'from55to59' | 'from60to64' | 'from65to69' | 'from70' | 'unknown'",
  ).describe("users' age"),
  'percentage?': type('number').describe('Percentage'),
})

export type AgeTile = typeof AgeTileSchema.infer

export const AreaTileSchema = type({
  'area?': type('string').describe("users' country and region"),
  'percentage?': type('number').describe('Percentage'),
})

export type AreaTile = typeof AreaTileSchema.infer

export const AppTypeTileSchema = type({
  'appType?': type("'ios' | 'android' | 'others'").describe("users' OS"),
  'percentage?': type('number').describe('Percentage'),
})

export type AppTypeTile = typeof AppTypeTileSchema.infer

export const SubscriptionPeriodTileSchema = type({
  'subscriptionPeriod?': type(
    "'within7days' | 'within30days' | 'within90days' | 'within180days' | 'within365days' | 'over365days' | 'unknown'",
  ).describe('Subscription period. Possible values: `within7days`, `within90days`, `unknown` etc.'),
  'percentage?': type('number').describe(
    'Percentage. Possible values: [0.0,100.0] e.g. 0, 2.9, 37.6.',
  ),
})

export type SubscriptionPeriodTile = typeof SubscriptionPeriodTileSchema.infer

export const GetFriendsDemographicsResponseSchema = type({
  'available?': type('boolean').describe('true if friend demographic information is available.'),
  'genders?': type(GenderTileSchema).array().describe('Percentage per gender.'),
  'ages?': type(AgeTileSchema).array().describe('Percentage per age group.'),
  'areas?': type(AreaTileSchema).array().describe('Percentage per area.'),
  'appTypes?': type(AppTypeTileSchema).array().describe('Percentage by OS.'),
  'subscriptionPeriods?': type(SubscriptionPeriodTileSchema)
    .array()
    .describe('Percentage per friendship duration.'),
}).describe('Get friend demographics')

export type GetFriendsDemographicsResponse = typeof GetFriendsDemographicsResponseSchema.infer

export const GetNumberOfMessageDeliveriesResponseSchema = type({
  'status?': type("'ready' | 'unready' | 'out_of_service'").describe(
    'Status of the counting process.',
  ),
  'broadcast?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      "Number of messages sent to all of this LINE Official Account's friends (broadcast messages).",
    ),
  'targeting?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      "Number of messages sent to some of this LINE Official Account's friends, based on specific attributes (targeted messages).",
    ),
  'autoResponse?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of auto-response messages sent.'),
  'welcomeResponse?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of greeting messages sent.'),
  'chat?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Number of messages sent from LINE Official Account Manager [Chat screen](https://www.linebiz.com/jp/manual/OfficialAccountManager/chats/) (only available in Japanese).',
    ),
  'apiBroadcast?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Number of broadcast messages sent with the `Send broadcast message` Messaging API operation.',
    ),
  'apiPush?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of push messages sent with the `Send push message` Messaging API operation.'),
  'apiMulticast?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Number of multicast messages sent with the `Send multicast message` Messaging API operation.',
    ),
  'apiNarrowcast?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Number of narrowcast messages sent with the `Send narrowcast message` Messaging API operation.',
    ),
  'apiReply?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of replies sent with the `Send reply message` Messaging API operation.'),
}).describe('Get number of message deliveries')

export type GetNumberOfMessageDeliveriesResponse =
  typeof GetNumberOfMessageDeliveriesResponseSchema.infer

export const GetNumberOfFollowersResponseSchema = type({
  'status?': type("'ready' | 'unready' | 'out_of_service'").describe('Calculation status.'),
  'followers?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      "The number of times, as of the specified date, that a user added this LINE Official Account as a friend for the first time.\nThe number doesn't decrease even if a user later blocks the account or when they delete their LINE account.\n",
    ),
  'targetedReaches?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'The number of users, as of the specified date, that the LINE Official Account can reach through targeted messages based on gender, age, and/or region.\nThis number only includes users who are active on LINE or LINE services and whose demographics have a high level of certainty.\n',
    ),
  'blocks?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'The number of users blocking the account as of the specified date.\nThe number decreases when a user unblocks the account.\n\n\n',
    ),
}).describe('Get number of followers')

export type GetNumberOfFollowersResponse = typeof GetNumberOfFollowersResponseSchema.infer

export const GetMessageEventResponseOverviewSchema = type({
  'requestId?': type('string').describe('Request ID.'),
  'timestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('UNIX timestamp for message delivery time in seconds.'),
  'delivered?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Number of messages delivered.\nThis property shows values of less than 20.\nHowever, if all messages have not been sent, it will be null.\n',
    ),
  'uniqueImpression?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who opened the message, meaning they displayed at least 1 bubble.'),
  'uniqueClick?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who opened any URL in the message.'),
  'uniqueMediaPlayed?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who started playing any video or audio in the message.'),
  'uniqueMediaPlayed100Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who played the entirety of any video or audio in the message.'),
}).describe('Summary of message statistics.')

export type GetMessageEventResponseOverview = typeof GetMessageEventResponseOverviewSchema.infer

export const GetMessageEventResponseMessageSchema = type({
  'seq?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    "Bubble's serial number.",
  ),
  'impression?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of times the bubble was displayed.'),
  'mediaPlayed?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of times audio or video in the bubble started playing.'),
  'mediaPlayed25Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
    ),
  'mediaPlayed50Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
    ),
  'mediaPlayed75Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
    ),
  'mediaPlayed100Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
    ),
  'uniqueMediaPlayed?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users that started playing audio or video in the bubble.'),
  'uniqueMediaPlayed25Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
    ),
  'uniqueMediaPlayed50Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
    ),
  'uniqueMediaPlayed75Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
    ),
  'uniqueMediaPlayed100Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
    ),
})

export type GetMessageEventResponseMessage = typeof GetMessageEventResponseMessageSchema.infer

export const GetMessageEventResponseClickSchema = type({
  'seq?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    "The URL's serial number.",
  ),
  'url?': type('string').describe('URL.'),
  'click?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of times the URL was opened.'),
  'uniqueClick?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users that opened the URL.'),
  'uniqueClickOfRequest?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      "Number of users who opened this url through any link in the message. If a message contains two links to the same URL and a user opens both links, they're counted only once.",
    ),
})

export type GetMessageEventResponseClick = typeof GetMessageEventResponseClickSchema.infer

export const GetMessageEventResponseSchema = type({
  'overview?': GetMessageEventResponseOverviewSchema,
  'messages?': type(GetMessageEventResponseMessageSchema)
    .array()
    .describe('Array of information about individual message bubbles.'),
  'clicks?': type(GetMessageEventResponseClickSchema)
    .array()
    .describe('Array of information about opened URLs in the message.'),
}).describe(
  'Statistics about how users interact with narrowcast messages or broadcast messages sent from your LINE Official Account.',
)

export type GetMessageEventResponse = typeof GetMessageEventResponseSchema.infer

export const GetStatisticsPerUnitResponseOverviewSchema = type({
  'uniqueImpression?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who opened the message, meaning they displayed at least 1 bubble.'),
  'uniqueClick?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who opened any URL in the message.'),
  'uniqueMediaPlayed?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who started playing any video or audio in the message.'),
  'uniqueMediaPlayed100Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users who played the entirety of any video or audio in the message.'),
}).describe('Statistics related to messages.')

export type GetStatisticsPerUnitResponseOverview =
  typeof GetStatisticsPerUnitResponseOverviewSchema.infer

export const GetStatisticsPerUnitResponseMessageSchema = type({
  seq: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    "Bubble's serial number.",
  ),
  'impression?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of times the bubble was displayed.'),
  'mediaPlayed?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of times audio or video in the bubble started playing.'),
  'mediaPlayed25Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
    ),
  'mediaPlayed50Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
    ),
  'mediaPlayed75Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
    ),
  'mediaPlayed100Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
    ),
  'uniqueImpression?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users the bubble was displayed.'),
  'uniqueMediaPlayed?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users that started playing audio or video in the bubble.'),
  'uniqueMediaPlayed25Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
    ),
  'uniqueMediaPlayed50Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
    ),
  'uniqueMediaPlayed75Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
    ),
  'uniqueMediaPlayed100Percent?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
    ),
})

export type GetStatisticsPerUnitResponseMessage =
  typeof GetStatisticsPerUnitResponseMessageSchema.infer

export const GetStatisticsPerUnitResponseClickSchema = type({
  seq: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe("The URL's serial number."),
  url: type('string').describe('URL.'),
  'click?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of times the URL in the bubble was opened.'),
  'uniqueClick?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe('Number of users that opened the URL in the bubble.'),
  'uniqueClickOfRequest?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      ),
  )
    .or('null')
    .describe(
      "Number of users who opened this url through any link in the message.\nIf another message bubble contains the same URL and a user opens both links, it's counted only once.\n",
    ),
})

export type GetStatisticsPerUnitResponseClick = typeof GetStatisticsPerUnitResponseClickSchema.infer

export const GetStatisticsPerUnitResponseSchema = type({
  overview: GetStatisticsPerUnitResponseOverviewSchema,
  messages: type(GetStatisticsPerUnitResponseMessageSchema)
    .array()
    .describe('Array of information about individual message bubbles.'),
  clicks: type(GetStatisticsPerUnitResponseClickSchema)
    .array()
    .describe('Array of information about opened URLs in the message.'),
}).describe('Response object for `get statistics per unit`')

export type GetStatisticsPerUnitResponse = typeof GetStatisticsPerUnitResponseSchema.infer

export const GetRichMenuInsightSummaryResponseMetricsSchema = type({
  count: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of impressions or clicks.'),
  uniqueUsers: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Approximate number of unique users who triggered an impression or click.'),
}).describe('Aggregated number of events and unique users over the whole period.')

export type GetRichMenuInsightSummaryResponseMetrics =
  typeof GetRichMenuInsightSummaryResponseMetricsSchema.infer

export const GetRichMenuInsightSummaryResponseImpressionSchema = type({
  metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
}).describe('Impression metrics for the whole rich menu.')

export type GetRichMenuInsightSummaryResponseImpression =
  typeof GetRichMenuInsightSummaryResponseImpressionSchema.infer

export const GetRichMenuInsightSummaryResponseBoundsSchema = type({
  x: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The x coordinate of the top-left corner of the target area.',
  ),
  y: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The y coordinate of the top-left corner of the target area.',
  ),
  width: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The width of the target area.',
  ),
  height: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The height of the target area.',
  ),
}).describe(
  'Target area of the metrics, represented by the top-left coordinate, width, and height.',
)

export type GetRichMenuInsightSummaryResponseBounds =
  typeof GetRichMenuInsightSummaryResponseBoundsSchema.infer

export const GetRichMenuInsightSummaryResponseClickSchema = type({
  bounds: GetRichMenuInsightSummaryResponseBoundsSchema,
  metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
}).describe('Click metrics for a single tappable area of the rich menu.')

export type GetRichMenuInsightSummaryResponseClick =
  typeof GetRichMenuInsightSummaryResponseClickSchema.infer

export const GetRichMenuInsightSummaryResponseSchema = type({
  richMenuId: type('string').describe('Rich menu ID.'),
  'metricsFrom?': type(type('string').and(/^[0-9]{8}$/))
    .or('null')
    .describe(
      'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
    ),
  'metricsTo?': type(type('string').and(/^[0-9]{8}$/))
    .or('null')
    .describe(
      'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
    ),
  'impression?': GetRichMenuInsightSummaryResponseImpressionSchema,
  'clicks?': type(GetRichMenuInsightSummaryResponseClickSchema)
    .array()
    .describe('Click metrics for each tappable area of the rich menu.'),
}).describe(
  'Summary of impression and click statistics for a rich menu created via the Messaging API.',
)

export type GetRichMenuInsightSummaryResponse = typeof GetRichMenuInsightSummaryResponseSchema.infer

export const GetRichMenuInsightDailyResponseDailyMetricsSchema = type({
  date: type('string')
    .and(/^[0-9]{8}$/)
    .describe('The date (JST) of these metrics. Format: yyyyMMdd (e.g. 20260213).'),
  count: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of impressions or clicks on this day.'),
  uniqueUsers: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Approximate number of unique users who triggered an impression or click on this day.',
    ),
}).describe('Aggregated number of events and unique users for a single day.')

export type GetRichMenuInsightDailyResponseDailyMetrics =
  typeof GetRichMenuInsightDailyResponseDailyMetricsSchema.infer

export const GetRichMenuInsightDailyResponseImpressionSchema = type({
  metrics: type(GetRichMenuInsightDailyResponseDailyMetricsSchema)
    .array()
    .describe('Per-day impression metrics.'),
}).describe('Daily impression metrics for the whole rich menu.')

export type GetRichMenuInsightDailyResponseImpression =
  typeof GetRichMenuInsightDailyResponseImpressionSchema.infer

export const GetRichMenuInsightDailyResponseBoundsSchema = type({
  x: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The x coordinate of the top-left corner of the target area.',
  ),
  y: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The y coordinate of the top-left corner of the target area.',
  ),
  width: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The width of the target area.',
  ),
  height: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The height of the target area.',
  ),
}).describe(
  'Target area of the metrics, represented by the top-left coordinate, width, and height.',
)

export type GetRichMenuInsightDailyResponseBounds =
  typeof GetRichMenuInsightDailyResponseBoundsSchema.infer

export const GetRichMenuInsightDailyResponseClickSchema = type({
  bounds: GetRichMenuInsightDailyResponseBoundsSchema,
  metrics: type(GetRichMenuInsightDailyResponseDailyMetricsSchema)
    .array()
    .describe('Per-day click metrics for the target area.'),
}).describe('Daily click metrics for a single tappable area of the rich menu.')

export type GetRichMenuInsightDailyResponseClick =
  typeof GetRichMenuInsightDailyResponseClickSchema.infer

export const GetRichMenuInsightDailyResponseSchema = type({
  richMenuId: type('string').describe('Rich menu ID.'),
  'metricsFrom?': type(type('string').and(/^[0-9]{8}$/))
    .or('null')
    .describe(
      'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
    ),
  'metricsTo?': type(type('string').and(/^[0-9]{8}$/))
    .or('null')
    .describe(
      'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
    ),
  'impression?': GetRichMenuInsightDailyResponseImpressionSchema,
  'clicks?': type(GetRichMenuInsightDailyResponseClickSchema)
    .array()
    .describe('Daily click metrics for each tappable area of the rich menu.'),
}).describe('Daily impression and click statistics for a rich menu created via the Messaging API.')

export type GetRichMenuInsightDailyResponse = typeof GetRichMenuInsightDailyResponseSchema.infer

export const ErrorDetailSchema = type({
  'message?': type('string').describe(
    'Details of the error. Not included in the response under certain situations.',
  ),
  'property?': type('string').describe(
    'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
  ),
})

export type ErrorDetail = typeof ErrorDetailSchema.infer

export const ErrorResponseSchema = type({
  message: type('string').describe('Message containing information about the error.'),
  'details?': type(ErrorDetailSchema)
    .array()
    .describe(
      'An array of error details. If the array is empty, this property will not be included in the response.',
    ),
})

export type ErrorResponse = typeof ErrorResponseSchema.infer

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
