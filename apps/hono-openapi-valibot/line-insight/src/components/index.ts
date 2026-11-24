import * as v from 'valibot'

export const GenderTileSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        gender: v.pipe(v.picklist(['male', 'female', 'unknown']), v.description("users' gender")),
        percentage: v.pipe(v.number(), v.description('Percentage')),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
      },
    }),
  ),
  v.metadata({ ref: 'GenderTile' }),
)

export type GenderTile = v.InferOutput<typeof GenderTileSchema>

export const AgeTileSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        age: v.pipe(
          v.picklist([
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
          ]),
          v.description("users' age"),
        ),
        percentage: v.pipe(v.number(), v.description('Percentage')),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
      },
    }),
  ),
  v.metadata({ ref: 'AgeTile' }),
)

export type AgeTile = v.InferOutput<typeof AgeTileSchema>

export const AreaTileSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        area: v.pipe(v.string(), v.description("users' country and region")),
        percentage: v.pipe(v.number(), v.description('Percentage')),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
      },
    }),
  ),
  v.metadata({ ref: 'AreaTile' }),
)

export type AreaTile = v.InferOutput<typeof AreaTileSchema>

export const AppTypeTileSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        appType: v.pipe(v.picklist(['ios', 'android', 'others']), v.description("users' OS")),
        percentage: v.pipe(v.number(), v.description('Percentage')),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
      },
    }),
  ),
  v.metadata({ ref: 'AppTypeTile' }),
)

export type AppTypeTile = v.InferOutput<typeof AppTypeTileSchema>

export const SubscriptionPeriodTileSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        subscriptionPeriod: v.pipe(
          v.picklist([
            'within7days',
            'within30days',
            'within90days',
            'within180days',
            'within365days',
            'over365days',
            'unknown',
          ]),
          v.description(
            'Subscription period. Possible values: `within7days`, `within90days`, `unknown` etc.',
          ),
        ),
        percentage: v.pipe(
          v.number(),
          v.description('Percentage. Possible values: [0.0,100.0] e.g. 0, 2.9, 37.6.'),
        ),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
      },
    }),
  ),
  v.metadata({ ref: 'SubscriptionPeriodTile' }),
)

export type SubscriptionPeriodTile = v.InferOutput<typeof SubscriptionPeriodTileSchema>

export const GetFriendsDemographicsResponseSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        available: v.pipe(
          v.boolean(),
          v.description('true if friend demographic information is available.'),
        ),
        genders: v.pipe(v.array(GenderTileSchema), v.description('Percentage per gender.')),
        ages: v.pipe(v.array(AgeTileSchema), v.description('Percentage per age group.')),
        areas: v.pipe(v.array(AreaTileSchema), v.description('Percentage per area.')),
        appTypes: v.pipe(v.array(AppTypeTileSchema), v.description('Percentage by OS.')),
        subscriptionPeriods: v.pipe(
          v.array(SubscriptionPeriodTileSchema),
          v.description('Percentage per friendship duration.'),
        ),
      }),
    ),
    v.description('Get friend demographics'),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
      },
    }),
  ),
  v.metadata({ ref: 'GetFriendsDemographicsResponse' }),
)

export type GetFriendsDemographicsResponse = v.InferOutput<
  typeof GetFriendsDemographicsResponseSchema
>

export const GetNumberOfMessageDeliveriesResponseSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        status: v.pipe(
          v.picklist(['ready', 'unready', 'out_of_service']),
          v.description('Status of the counting process.'),
        ),
        broadcast: v.pipe(
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
            "Number of messages sent to all of this LINE Official Account's friends (broadcast messages).",
          ),
        ),
        targeting: v.pipe(
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
            "Number of messages sent to some of this LINE Official Account's friends, based on specific attributes (targeted messages).",
          ),
        ),
        autoResponse: v.pipe(
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
          v.description('Number of auto-response messages sent.'),
        ),
        welcomeResponse: v.pipe(
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
          v.description('Number of greeting messages sent.'),
        ),
        chat: v.pipe(
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
            'Number of messages sent from LINE Official Account Manager [Chat screen](https://www.linebiz.com/jp/manual/OfficialAccountManager/chats/) (only available in Japanese).',
          ),
        ),
        apiBroadcast: v.pipe(
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
            'Number of broadcast messages sent with the `Send broadcast message` Messaging API operation.',
          ),
        ),
        apiPush: v.pipe(
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
            'Number of push messages sent with the `Send push message` Messaging API operation.',
          ),
        ),
        apiMulticast: v.pipe(
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
            'Number of multicast messages sent with the `Send multicast message` Messaging API operation.',
          ),
        ),
        apiNarrowcast: v.pipe(
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
            'Number of narrowcast messages sent with the `Send narrowcast message` Messaging API operation.',
          ),
        ),
        apiReply: v.pipe(
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
            'Number of replies sent with the `Send reply message` Messaging API operation.',
          ),
        ),
      }),
    ),
    v.description('Get number of message deliveries'),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-delivery-messages',
      },
    }),
  ),
  v.metadata({ ref: 'GetNumberOfMessageDeliveriesResponse' }),
)

export type GetNumberOfMessageDeliveriesResponse = v.InferOutput<
  typeof GetNumberOfMessageDeliveriesResponseSchema
>

export const GetNumberOfFollowersResponseSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        status: v.pipe(
          v.picklist(['ready', 'unready', 'out_of_service']),
          v.description('Calculation status.'),
        ),
        followers: v.pipe(
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
            "The number of times, as of the specified date, that a user added this LINE Official Account as a friend for the first time.\nThe number doesn't decrease even if a user later blocks the account or when they delete their LINE account.\n",
          ),
        ),
        targetedReaches: v.pipe(
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
            'The number of users, as of the specified date, that the LINE Official Account can reach through targeted messages based on gender, age, and/or region.\nThis number only includes users who are active on LINE or LINE services and whose demographics have a high level of certainty.\n',
          ),
        ),
        blocks: v.pipe(
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
            'The number of users blocking the account as of the specified date.\nThe number decreases when a user unblocks the account.\n\n\n',
          ),
        ),
      }),
    ),
    v.description('Get number of followers'),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-followers',
      },
    }),
  ),
  v.metadata({ ref: 'GetNumberOfFollowersResponse' }),
)

export type GetNumberOfFollowersResponse = v.InferOutput<typeof GetNumberOfFollowersResponseSchema>

export const GetMessageEventResponseOverviewSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        requestId: v.pipe(v.string(), v.description('Request ID.')),
        timestamp: v.pipe(
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
          v.description('UNIX timestamp for message delivery time in seconds.'),
        ),
        delivered: v.pipe(
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
            'Number of messages delivered.\nThis property shows values of less than 20.\nHowever, if all messages have not been sent, it will be null.\n',
          ),
        ),
        uniqueImpression: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users who opened the message, meaning they displayed at least 1 bubble.',
          ),
        ),
        uniqueClick: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users who opened any URL in the message.'),
        ),
        uniqueMediaPlayed: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users who started playing any video or audio in the message.'),
        ),
        uniqueMediaPlayed100Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users who played the entirety of any video or audio in the message.',
          ),
        ),
      }),
    ),
    v.description('Summary of message statistics.'),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetMessageEventResponseOverview' }),
)

export type GetMessageEventResponseOverview = v.InferOutput<
  typeof GetMessageEventResponseOverviewSchema
>

export const GetMessageEventResponseMessageSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        seq: v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
          v.description("Bubble's serial number."),
        ),
        impression: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of times the bubble was displayed.'),
        ),
        mediaPlayed: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of times audio or video in the bubble started playing.'),
        ),
        mediaPlayed25Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
          ),
        ),
        mediaPlayed50Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
          ),
        ),
        mediaPlayed75Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
          ),
        ),
        mediaPlayed100Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
          ),
        ),
        uniqueMediaPlayed: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users that started playing audio or video in the bubble.'),
        ),
        uniqueMediaPlayed25Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
          ),
        ),
        uniqueMediaPlayed50Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
          ),
        ),
        uniqueMediaPlayed75Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
          ),
        ),
        uniqueMediaPlayed100Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
          ),
        ),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetMessageEventResponseMessage' }),
)

export type GetMessageEventResponseMessage = v.InferOutput<
  typeof GetMessageEventResponseMessageSchema
>

export const GetMessageEventResponseClickSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        seq: v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
          v.description("The URL's serial number."),
        ),
        url: v.pipe(v.string(), v.description('URL.')),
        click: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of times the URL was opened.'),
        ),
        uniqueClick: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users that opened the URL.'),
        ),
        uniqueClickOfRequest: v.pipe(
          v.nullable(
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
          ),
          v.description(
            "Number of users who opened this url through any link in the message. If a message contains two links to the same URL and a user opens both links, they're counted only once.",
          ),
        ),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetMessageEventResponseClick' }),
)

export type GetMessageEventResponseClick = v.InferOutput<typeof GetMessageEventResponseClickSchema>

export const GetMessageEventResponseSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        overview: GetMessageEventResponseOverviewSchema,
        messages: v.pipe(
          v.array(GetMessageEventResponseMessageSchema),
          v.description('Array of information about individual message bubbles.'),
        ),
        clicks: v.pipe(
          v.array(GetMessageEventResponseClickSchema),
          v.description('Array of information about opened URLs in the message.'),
        ),
      }),
    ),
    v.description(
      'Statistics about how users interact with narrowcast messages or broadcast messages sent from your LINE Official Account.',
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetMessageEventResponse' }),
)

export type GetMessageEventResponse = v.InferOutput<typeof GetMessageEventResponseSchema>

export const GetStatisticsPerUnitResponseOverviewSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        uniqueImpression: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users who opened the message, meaning they displayed at least 1 bubble.',
          ),
        ),
        uniqueClick: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users who opened any URL in the message.'),
        ),
        uniqueMediaPlayed: v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users who started playing any video or audio in the message.'),
        ),
        uniqueMediaPlayed100Percent: v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users who played the entirety of any video or audio in the message.',
          ),
        ),
      }),
    ),
    v.description('Statistics related to messages.'),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetStatisticsPerUnitResponseOverview' }),
)

export type GetStatisticsPerUnitResponseOverview = v.InferOutput<
  typeof GetStatisticsPerUnitResponseOverviewSchema
>

export const GetStatisticsPerUnitResponseMessageSchema = v.pipe(
  v.pipe(
    v.object({
      seq: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description("Bubble's serial number."),
      ),
      impression: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description('Number of times the bubble was displayed.'),
        ),
      ),
      mediaPlayed: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description('Number of times audio or video in the bubble started playing.'),
        ),
      ),
      mediaPlayed25Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
          ),
        ),
      ),
      mediaPlayed50Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
          ),
        ),
      ),
      mediaPlayed75Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
          ),
        ),
      ),
      mediaPlayed100Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
          ),
        ),
      ),
      uniqueImpression: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users the bubble was displayed.'),
        ),
      ),
      uniqueMediaPlayed: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users that started playing audio or video in the bubble.'),
        ),
      ),
      uniqueMediaPlayed25Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
          ),
        ),
      ),
      uniqueMediaPlayed50Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
          ),
        ),
      ),
      uniqueMediaPlayed75Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
          ),
        ),
      ),
      uniqueMediaPlayed100Percent: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
          ),
        ),
      ),
    }),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetStatisticsPerUnitResponseMessage' }),
)

export type GetStatisticsPerUnitResponseMessage = v.InferOutput<
  typeof GetStatisticsPerUnitResponseMessageSchema
>

export const GetStatisticsPerUnitResponseClickSchema = v.pipe(
  v.pipe(
    v.object({
      seq: v.pipe(
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
        v.description("The URL's serial number."),
      ),
      url: v.pipe(v.string(), v.description('URL.')),
      click: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description('Number of times the URL in the bubble was opened.'),
        ),
      ),
      uniqueClick: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description('Number of users that opened the URL in the bubble.'),
        ),
      ),
      uniqueClickOfRequest: v.optional(
        v.pipe(
          v.nullable(
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
          ),
          v.description(
            "Number of users who opened this url through any link in the message.\nIf another message bubble contains the same URL and a user opens both links, it's counted only once.\n",
          ),
        ),
      ),
    }),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetStatisticsPerUnitResponseClick' }),
)

export type GetStatisticsPerUnitResponseClick = v.InferOutput<
  typeof GetStatisticsPerUnitResponseClickSchema
>

export const GetStatisticsPerUnitResponseSchema = v.pipe(
  v.pipe(
    v.object({
      overview: GetStatisticsPerUnitResponseOverviewSchema,
      messages: v.pipe(
        v.array(GetStatisticsPerUnitResponseMessageSchema),
        v.description('Array of information about individual message bubbles.'),
      ),
      clicks: v.pipe(
        v.array(GetStatisticsPerUnitResponseClickSchema),
        v.description('Array of information about opened URLs in the message.'),
      ),
    }),
    v.description('Response object for `get statistics per unit`'),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
      },
    }),
  ),
  v.metadata({ ref: 'GetStatisticsPerUnitResponse' }),
)

export type GetStatisticsPerUnitResponse = v.InferOutput<typeof GetStatisticsPerUnitResponseSchema>

export const GetRichMenuInsightSummaryResponseMetricsSchema = v.pipe(
  v.pipe(
    v.object({
      count: v.pipe(
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
        v.description('Number of impressions or clicks.'),
      ),
      uniqueUsers: v.pipe(
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
        v.description('Approximate number of unique users who triggered an impression or click.'),
      ),
    }),
    v.description('Aggregated number of events and unique users over the whole period.'),
  ),
  v.metadata({ ref: 'GetRichMenuInsightSummaryResponseMetrics' }),
)

export type GetRichMenuInsightSummaryResponseMetrics = v.InferOutput<
  typeof GetRichMenuInsightSummaryResponseMetricsSchema
>

export const GetRichMenuInsightSummaryResponseImpressionSchema = v.pipe(
  v.pipe(
    v.object({ metrics: GetRichMenuInsightSummaryResponseMetricsSchema }),
    v.description('Impression metrics for the whole rich menu.'),
  ),
  v.metadata({ ref: 'GetRichMenuInsightSummaryResponseImpression' }),
)

export type GetRichMenuInsightSummaryResponseImpression = v.InferOutput<
  typeof GetRichMenuInsightSummaryResponseImpressionSchema
>

export const GetRichMenuInsightSummaryResponseBoundsSchema = v.pipe(
  v.pipe(
    v.object({
      x: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The x coordinate of the top-left corner of the target area.'),
      ),
      y: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The y coordinate of the top-left corner of the target area.'),
      ),
      width: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The width of the target area.'),
      ),
      height: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The height of the target area.'),
      ),
    }),
    v.description(
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
    ),
  ),
  v.metadata({ ref: 'GetRichMenuInsightSummaryResponseBounds' }),
)

export type GetRichMenuInsightSummaryResponseBounds = v.InferOutput<
  typeof GetRichMenuInsightSummaryResponseBoundsSchema
>

export const GetRichMenuInsightSummaryResponseClickSchema = v.pipe(
  v.pipe(
    v.object({
      bounds: GetRichMenuInsightSummaryResponseBoundsSchema,
      metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
    }),
    v.description('Click metrics for a single tappable area of the rich menu.'),
  ),
  v.metadata({ ref: 'GetRichMenuInsightSummaryResponseClick' }),
)

export type GetRichMenuInsightSummaryResponseClick = v.InferOutput<
  typeof GetRichMenuInsightSummaryResponseClickSchema
>

export const GetRichMenuInsightSummaryResponseSchema = v.pipe(
  v.pipe(
    v.object({
      richMenuId: v.pipe(v.string(), v.description('Rich menu ID.')),
      metricsFrom: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.regex(/^[0-9]{8}$/))),
          v.description(
            'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
          ),
          v.metadata({ examples: ['20260213'] }),
        ),
      ),
      metricsTo: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.regex(/^[0-9]{8}$/))),
          v.description(
            'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
          ),
          v.metadata({ examples: ['20260215'] }),
        ),
      ),
      impression: v.optional(GetRichMenuInsightSummaryResponseImpressionSchema),
      clicks: v.optional(
        v.pipe(
          v.array(GetRichMenuInsightSummaryResponseClickSchema),
          v.description('Click metrics for each tappable area of the rich menu.'),
        ),
      ),
    }),
    v.description(
      'Summary of impression and click statistics for a rich menu created via the Messaging API.',
    ),
  ),
  v.metadata({ ref: 'GetRichMenuInsightSummaryResponse' }),
)

export type GetRichMenuInsightSummaryResponse = v.InferOutput<
  typeof GetRichMenuInsightSummaryResponseSchema
>

export const GetRichMenuInsightDailyResponseDailyMetricsSchema = v.pipe(
  v.pipe(
    v.object({
      date: v.pipe(
        v.pipe(v.string(), v.regex(/^[0-9]{8}$/)),
        v.description('The date (JST) of these metrics. Format: yyyyMMdd (e.g. 20260213).'),
        v.metadata({ examples: ['20260213'] }),
      ),
      count: v.pipe(
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
        v.description('Number of impressions or clicks on this day.'),
      ),
      uniqueUsers: v.pipe(
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
          'Approximate number of unique users who triggered an impression or click on this day.',
        ),
      ),
    }),
    v.description('Aggregated number of events and unique users for a single day.'),
  ),
  v.metadata({ ref: 'GetRichMenuInsightDailyResponseDailyMetrics' }),
)

export type GetRichMenuInsightDailyResponseDailyMetrics = v.InferOutput<
  typeof GetRichMenuInsightDailyResponseDailyMetricsSchema
>

export const GetRichMenuInsightDailyResponseImpressionSchema = v.pipe(
  v.pipe(
    v.object({
      metrics: v.pipe(
        v.array(GetRichMenuInsightDailyResponseDailyMetricsSchema),
        v.description('Per-day impression metrics.'),
      ),
    }),
    v.description('Daily impression metrics for the whole rich menu.'),
  ),
  v.metadata({ ref: 'GetRichMenuInsightDailyResponseImpression' }),
)

export type GetRichMenuInsightDailyResponseImpression = v.InferOutput<
  typeof GetRichMenuInsightDailyResponseImpressionSchema
>

export const GetRichMenuInsightDailyResponseBoundsSchema = v.pipe(
  v.pipe(
    v.object({
      x: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The x coordinate of the top-left corner of the target area.'),
      ),
      y: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The y coordinate of the top-left corner of the target area.'),
      ),
      width: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The width of the target area.'),
      ),
      height: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('The height of the target area.'),
      ),
    }),
    v.description(
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
    ),
  ),
  v.metadata({ ref: 'GetRichMenuInsightDailyResponseBounds' }),
)

export type GetRichMenuInsightDailyResponseBounds = v.InferOutput<
  typeof GetRichMenuInsightDailyResponseBoundsSchema
>

export const GetRichMenuInsightDailyResponseClickSchema = v.pipe(
  v.pipe(
    v.object({
      bounds: GetRichMenuInsightDailyResponseBoundsSchema,
      metrics: v.pipe(
        v.array(GetRichMenuInsightDailyResponseDailyMetricsSchema),
        v.description('Per-day click metrics for the target area.'),
      ),
    }),
    v.description('Daily click metrics for a single tappable area of the rich menu.'),
  ),
  v.metadata({ ref: 'GetRichMenuInsightDailyResponseClick' }),
)

export type GetRichMenuInsightDailyResponseClick = v.InferOutput<
  typeof GetRichMenuInsightDailyResponseClickSchema
>

export const GetRichMenuInsightDailyResponseSchema = v.pipe(
  v.pipe(
    v.object({
      richMenuId: v.pipe(v.string(), v.description('Rich menu ID.')),
      metricsFrom: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.regex(/^[0-9]{8}$/))),
          v.description(
            'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
          ),
          v.metadata({ examples: ['20260213'] }),
        ),
      ),
      metricsTo: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.regex(/^[0-9]{8}$/))),
          v.description(
            'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
          ),
          v.metadata({ examples: ['20260215'] }),
        ),
      ),
      impression: v.optional(GetRichMenuInsightDailyResponseImpressionSchema),
      clicks: v.optional(
        v.pipe(
          v.array(GetRichMenuInsightDailyResponseClickSchema),
          v.description('Daily click metrics for each tappable area of the rich menu.'),
        ),
      ),
    }),
    v.description(
      'Daily impression and click statistics for a rich menu created via the Messaging API.',
    ),
  ),
  v.metadata({ ref: 'GetRichMenuInsightDailyResponse' }),
)

export type GetRichMenuInsightDailyResponse = v.InferOutput<
  typeof GetRichMenuInsightDailyResponseSchema
>

export const ErrorDetailSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        message: v.pipe(
          v.string(),
          v.description(
            'Details of the error. Not included in the response under certain situations.',
          ),
        ),
        property: v.pipe(
          v.string(),
          v.description(
            'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
          ),
        ),
      }),
    ),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
      },
    }),
  ),
  v.metadata({ ref: 'ErrorDetail' }),
)

export type ErrorDetail = v.InferOutput<typeof ErrorDetailSchema>

export const ErrorResponseSchema = v.pipe(
  v.pipe(
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
    }),
    v.metadata({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
      },
    }),
  ),
  v.metadata({ ref: 'ErrorResponse' }),
)

export type ErrorResponse = v.InferOutput<typeof ErrorResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
