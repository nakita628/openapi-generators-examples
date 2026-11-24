import * as z from 'zod'

export const GenderTileSchema = z
  .object({
    gender: z
      .enum(['male', 'female', 'unknown'])
      .meta({ description: "users' gender" })
      .exactOptional(),
    percentage: z.number().meta({ description: 'Percentage' }).exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  })

export type GenderTileSchema = z.infer<typeof GenderTileSchema>

export const AgeTileSchema = z
  .object({
    age: z
      .enum([
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
      ])
      .meta({ description: "users' age" })
      .exactOptional(),
    percentage: z.number().meta({ description: 'Percentage' }).exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  })

export type AgeTileSchema = z.infer<typeof AgeTileSchema>

export const AreaTileSchema = z
  .object({
    area: z.string().meta({ description: "users' country and region" }).exactOptional(),
    percentage: z.number().meta({ description: 'Percentage' }).exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  })

export type AreaTileSchema = z.infer<typeof AreaTileSchema>

export const AppTypeTileSchema = z
  .object({
    appType: z
      .enum(['ios', 'android', 'others'])
      .meta({ description: "users' OS" })
      .exactOptional(),
    percentage: z.number().meta({ description: 'Percentage' }).exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  })

export type AppTypeTileSchema = z.infer<typeof AppTypeTileSchema>

export const SubscriptionPeriodTileSchema = z
  .object({
    subscriptionPeriod: z
      .enum([
        'within7days',
        'within30days',
        'within90days',
        'within180days',
        'within365days',
        'over365days',
        'unknown',
      ])
      .meta({
        description:
          'Subscription period. Possible values: `within7days`, `within90days`, `unknown` etc.',
      })
      .exactOptional(),
    percentage: z
      .number()
      .meta({ description: 'Percentage. Possible values: [0.0,100.0] e.g. 0, 2.9, 37.6.' })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  })

export type SubscriptionPeriodTileSchema = z.infer<typeof SubscriptionPeriodTileSchema>

export const GetFriendsDemographicsResponseSchema = z
  .object({
    available: z
      .boolean()
      .meta({ description: 'true if friend demographic information is available.' })
      .exactOptional(),
    genders: z
      .array(GenderTileSchema)
      .meta({ description: 'Percentage per gender.' })
      .exactOptional(),
    ages: z.array(AgeTileSchema).meta({ description: 'Percentage per age group.' }).exactOptional(),
    areas: z.array(AreaTileSchema).meta({ description: 'Percentage per area.' }).exactOptional(),
    appTypes: z.array(AppTypeTileSchema).meta({ description: 'Percentage by OS.' }).exactOptional(),
    subscriptionPeriods: z
      .array(SubscriptionPeriodTileSchema)
      .meta({ description: 'Percentage per friendship duration.' })
      .exactOptional(),
  })
  .meta({
    description: 'Get friend demographics',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
    },
  })

export type GetFriendsDemographicsResponseSchema = z.infer<
  typeof GetFriendsDemographicsResponseSchema
>

export const GetNumberOfMessageDeliveriesResponseSchema = z
  .object({
    status: z
      .enum(['ready', 'unready', 'out_of_service'])
      .meta({ description: 'Status of the counting process.' })
      .exactOptional(),
    broadcast: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          "Number of messages sent to all of this LINE Official Account's friends (broadcast messages).",
      })
      .exactOptional(),
    targeting: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          "Number of messages sent to some of this LINE Official Account's friends, based on specific attributes (targeted messages).",
      })
      .exactOptional(),
    autoResponse: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Number of auto-response messages sent.' })
      .exactOptional(),
    welcomeResponse: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Number of greeting messages sent.' })
      .exactOptional(),
    chat: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Number of messages sent from LINE Official Account Manager [Chat screen](https://www.linebiz.com/jp/manual/OfficialAccountManager/chats/) (only available in Japanese).',
      })
      .exactOptional(),
    apiBroadcast: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Number of broadcast messages sent with the `Send broadcast message` Messaging API operation.',
      })
      .exactOptional(),
    apiPush: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Number of push messages sent with the `Send push message` Messaging API operation.',
      })
      .exactOptional(),
    apiMulticast: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Number of multicast messages sent with the `Send multicast message` Messaging API operation.',
      })
      .exactOptional(),
    apiNarrowcast: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Number of narrowcast messages sent with the `Send narrowcast message` Messaging API operation.',
      })
      .exactOptional(),
    apiReply: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Number of replies sent with the `Send reply message` Messaging API operation.',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Get number of message deliveries',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-delivery-messages',
    },
  })

export type GetNumberOfMessageDeliveriesResponseSchema = z.infer<
  typeof GetNumberOfMessageDeliveriesResponseSchema
>

export const GetNumberOfFollowersResponseSchema = z
  .object({
    status: z
      .enum(['ready', 'unready', 'out_of_service'])
      .meta({ description: 'Calculation status.' })
      .exactOptional(),
    followers: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          "The number of times, as of the specified date, that a user added this LINE Official Account as a friend for the first time.\nThe number doesn't decrease even if a user later blocks the account or when they delete their LINE account.\n",
      })
      .exactOptional(),
    targetedReaches: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'The number of users, as of the specified date, that the LINE Official Account can reach through targeted messages based on gender, age, and/or region.\nThis number only includes users who are active on LINE or LINE services and whose demographics have a high level of certainty.\n',
      })
      .exactOptional(),
    blocks: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'The number of users blocking the account as of the specified date.\nThe number decreases when a user unblocks the account.\n\n\n',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Get number of followers',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-followers',
    },
  })

export type GetNumberOfFollowersResponseSchema = z.infer<typeof GetNumberOfFollowersResponseSchema>

export const GetMessageEventResponseOverviewSchema = z
  .object({
    requestId: z.string().meta({ description: 'Request ID.' }).exactOptional(),
    timestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'UNIX timestamp for message delivery time in seconds.' })
      .exactOptional(),
    delivered: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Number of messages delivered.\nThis property shows values of less than 20.\nHowever, if all messages have not been sent, it will be null.\n',
      })
      .exactOptional(),
    uniqueImpression: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users who opened the message, meaning they displayed at least 1 bubble.',
      })
      .exactOptional(),
    uniqueClick: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of users who opened any URL in the message.' })
      .exactOptional(),
    uniqueMediaPlayed: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description: 'Number of users who started playing any video or audio in the message.',
      })
      .exactOptional(),
    uniqueMediaPlayed100Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users who played the entirety of any video or audio in the message.',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Summary of message statistics.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  })

export type GetMessageEventResponseOverviewSchema = z.infer<
  typeof GetMessageEventResponseOverviewSchema
>

export const GetMessageEventResponseMessageSchema = z
  .object({
    seq: z.int32().meta({ description: "Bubble's serial number." }).exactOptional(),
    impression: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of times the bubble was displayed.' })
      .exactOptional(),
    mediaPlayed: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of times audio or video in the bubble started playing.' })
      .exactOptional(),
    mediaPlayed25Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
      })
      .exactOptional(),
    mediaPlayed50Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
      })
      .exactOptional(),
    mediaPlayed75Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
      })
      .exactOptional(),
    mediaPlayed100Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
      })
      .exactOptional(),
    uniqueMediaPlayed: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of users that started playing audio or video in the bubble.' })
      .exactOptional(),
    uniqueMediaPlayed25Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
      })
      .exactOptional(),
    uniqueMediaPlayed50Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
      })
      .exactOptional(),
    uniqueMediaPlayed75Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
      })
      .exactOptional(),
    uniqueMediaPlayed100Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  })

export type GetMessageEventResponseMessageSchema = z.infer<
  typeof GetMessageEventResponseMessageSchema
>

export const GetMessageEventResponseClickSchema = z
  .object({
    seq: z.int32().meta({ description: "The URL's serial number." }).exactOptional(),
    url: z.string().meta({ description: 'URL.' }).exactOptional(),
    click: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of times the URL was opened.' })
      .exactOptional(),
    uniqueClick: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of users that opened the URL.' })
      .exactOptional(),
    uniqueClickOfRequest: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          "Number of users who opened this url through any link in the message. If a message contains two links to the same URL and a user opens both links, they're counted only once.",
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  })

export type GetMessageEventResponseClickSchema = z.infer<typeof GetMessageEventResponseClickSchema>

export const GetMessageEventResponseSchema = z
  .object({
    overview: GetMessageEventResponseOverviewSchema.exactOptional(),
    messages: z
      .array(GetMessageEventResponseMessageSchema)
      .meta({ description: 'Array of information about individual message bubbles.' })
      .exactOptional(),
    clicks: z
      .array(GetMessageEventResponseClickSchema)
      .meta({ description: 'Array of information about opened URLs in the message.' })
      .exactOptional(),
  })
  .meta({
    description:
      'Statistics about how users interact with narrowcast messages or broadcast messages sent from your LINE Official Account.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
    },
  })

export type GetMessageEventResponseSchema = z.infer<typeof GetMessageEventResponseSchema>

export const GetStatisticsPerUnitResponseOverviewSchema = z
  .object({
    uniqueImpression: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users who opened the message, meaning they displayed at least 1 bubble.',
      })
      .exactOptional(),
    uniqueClick: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of users who opened any URL in the message.' })
      .exactOptional(),
    uniqueMediaPlayed: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description: 'Number of users who started playing any video or audio in the message.',
      })
      .exactOptional(),
    uniqueMediaPlayed100Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users who played the entirety of any video or audio in the message.',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Statistics related to messages.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  })

export type GetStatisticsPerUnitResponseOverviewSchema = z.infer<
  typeof GetStatisticsPerUnitResponseOverviewSchema
>

export const GetStatisticsPerUnitResponseMessageSchema = z
  .object({
    seq: z.int32().meta({ description: "Bubble's serial number." }),
    impression: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of times the bubble was displayed.' })
      .exactOptional(),
    mediaPlayed: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of times audio or video in the bubble started playing.' })
      .exactOptional(),
    mediaPlayed25Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
      })
      .exactOptional(),
    mediaPlayed50Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
      })
      .exactOptional(),
    mediaPlayed75Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
      })
      .exactOptional(),
    mediaPlayed100Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
      })
      .exactOptional(),
    uniqueImpression: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of users the bubble was displayed.' })
      .exactOptional(),
    uniqueMediaPlayed: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of users that started playing audio or video in the bubble.' })
      .exactOptional(),
    uniqueMediaPlayed25Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
      })
      .exactOptional(),
    uniqueMediaPlayed50Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
      })
      .exactOptional(),
    uniqueMediaPlayed75Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
      })
      .exactOptional(),
    uniqueMediaPlayed100Percent: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  })

export type GetStatisticsPerUnitResponseMessageSchema = z.infer<
  typeof GetStatisticsPerUnitResponseMessageSchema
>

export const GetStatisticsPerUnitResponseClickSchema = z
  .object({
    seq: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: "The URL's serial number." }),
    url: z.string().meta({ description: 'URL.' }),
    click: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of times the URL in the bubble was opened.' })
      .exactOptional(),
    uniqueClick: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({ description: 'Number of users that opened the URL in the bubble.' })
      .exactOptional(),
    uniqueClickOfRequest: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .nullable()
      .meta({
        description:
          "Number of users who opened this url through any link in the message.\nIf another message bubble contains the same URL and a user opens both links, it's counted only once.\n",
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  })

export type GetStatisticsPerUnitResponseClickSchema = z.infer<
  typeof GetStatisticsPerUnitResponseClickSchema
>

export const GetStatisticsPerUnitResponseSchema = z
  .object({
    overview: GetStatisticsPerUnitResponseOverviewSchema,
    messages: z
      .array(GetStatisticsPerUnitResponseMessageSchema)
      .meta({ description: 'Array of information about individual message bubbles.' }),
    clicks: z
      .array(GetStatisticsPerUnitResponseClickSchema)
      .meta({ description: 'Array of information about opened URLs in the message.' }),
  })
  .meta({
    description: 'Response object for `get statistics per unit`',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
    },
  })

export type GetStatisticsPerUnitResponseSchema = z.infer<typeof GetStatisticsPerUnitResponseSchema>

export const GetRichMenuInsightSummaryResponseMetricsSchema = z
  .object({
    count: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Number of impressions or clicks.' }),
    uniqueUsers: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description: 'Approximate number of unique users who triggered an impression or click.',
      }),
  })
  .meta({ description: 'Aggregated number of events and unique users over the whole period.' })

export type GetRichMenuInsightSummaryResponseMetricsSchema = z.infer<
  typeof GetRichMenuInsightSummaryResponseMetricsSchema
>

export const GetRichMenuInsightSummaryResponseImpressionSchema = z
  .object({ metrics: GetRichMenuInsightSummaryResponseMetricsSchema })
  .meta({ description: 'Impression metrics for the whole rich menu.' })

export type GetRichMenuInsightSummaryResponseImpressionSchema = z.infer<
  typeof GetRichMenuInsightSummaryResponseImpressionSchema
>

export const GetRichMenuInsightSummaryResponseBoundsSchema = z
  .object({
    x: z
      .int32()
      .meta({ description: 'The x coordinate of the top-left corner of the target area.' }),
    y: z
      .int32()
      .meta({ description: 'The y coordinate of the top-left corner of the target area.' }),
    width: z.int32().meta({ description: 'The width of the target area.' }),
    height: z.int32().meta({ description: 'The height of the target area.' }),
  })
  .meta({
    description:
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
  })

export type GetRichMenuInsightSummaryResponseBoundsSchema = z.infer<
  typeof GetRichMenuInsightSummaryResponseBoundsSchema
>

export const GetRichMenuInsightSummaryResponseClickSchema = z
  .object({
    bounds: GetRichMenuInsightSummaryResponseBoundsSchema,
    metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
  })
  .meta({ description: 'Click metrics for a single tappable area of the rich menu.' })

export type GetRichMenuInsightSummaryResponseClickSchema = z.infer<
  typeof GetRichMenuInsightSummaryResponseClickSchema
>

export const GetRichMenuInsightSummaryResponseSchema = z
  .object({
    richMenuId: z.string().meta({ description: 'Rich menu ID.' }),
    metricsFrom: z
      .string()
      .regex(/^[0-9]{8}$/)
      .nullable()
      .meta({
        description:
          'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
        examples: ['20260213'],
      })
      .exactOptional(),
    metricsTo: z
      .string()
      .regex(/^[0-9]{8}$/)
      .nullable()
      .meta({
        description:
          'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
        examples: ['20260215'],
      })
      .exactOptional(),
    impression: GetRichMenuInsightSummaryResponseImpressionSchema.exactOptional(),
    clicks: z
      .array(GetRichMenuInsightSummaryResponseClickSchema)
      .meta({ description: 'Click metrics for each tappable area of the rich menu.' })
      .exactOptional(),
  })
  .meta({
    description:
      'Summary of impression and click statistics for a rich menu created via the Messaging API.',
  })

export type GetRichMenuInsightSummaryResponseSchema = z.infer<
  typeof GetRichMenuInsightSummaryResponseSchema
>

export const GetRichMenuInsightDailyResponseDailyMetricsSchema = z
  .object({
    date: z
      .string()
      .regex(/^[0-9]{8}$/)
      .meta({
        description: 'The date (JST) of these metrics. Format: yyyyMMdd (e.g. 20260213).',
        examples: ['20260213'],
      }),
    count: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Number of impressions or clicks on this day.' }),
    uniqueUsers: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Approximate number of unique users who triggered an impression or click on this day.',
      }),
  })
  .meta({ description: 'Aggregated number of events and unique users for a single day.' })

export type GetRichMenuInsightDailyResponseDailyMetricsSchema = z.infer<
  typeof GetRichMenuInsightDailyResponseDailyMetricsSchema
>

export const GetRichMenuInsightDailyResponseImpressionSchema = z
  .object({
    metrics: z
      .array(GetRichMenuInsightDailyResponseDailyMetricsSchema)
      .meta({ description: 'Per-day impression metrics.' }),
  })
  .meta({ description: 'Daily impression metrics for the whole rich menu.' })

export type GetRichMenuInsightDailyResponseImpressionSchema = z.infer<
  typeof GetRichMenuInsightDailyResponseImpressionSchema
>

export const GetRichMenuInsightDailyResponseBoundsSchema = z
  .object({
    x: z
      .int32()
      .meta({ description: 'The x coordinate of the top-left corner of the target area.' }),
    y: z
      .int32()
      .meta({ description: 'The y coordinate of the top-left corner of the target area.' }),
    width: z.int32().meta({ description: 'The width of the target area.' }),
    height: z.int32().meta({ description: 'The height of the target area.' }),
  })
  .meta({
    description:
      'Target area of the metrics, represented by the top-left coordinate, width, and height.',
  })

export type GetRichMenuInsightDailyResponseBoundsSchema = z.infer<
  typeof GetRichMenuInsightDailyResponseBoundsSchema
>

export const GetRichMenuInsightDailyResponseClickSchema = z
  .object({
    bounds: GetRichMenuInsightDailyResponseBoundsSchema,
    metrics: z
      .array(GetRichMenuInsightDailyResponseDailyMetricsSchema)
      .meta({ description: 'Per-day click metrics for the target area.' }),
  })
  .meta({ description: 'Daily click metrics for a single tappable area of the rich menu.' })

export type GetRichMenuInsightDailyResponseClickSchema = z.infer<
  typeof GetRichMenuInsightDailyResponseClickSchema
>

export const GetRichMenuInsightDailyResponseSchema = z
  .object({
    richMenuId: z.string().meta({ description: 'Rich menu ID.' }),
    metricsFrom: z
      .string()
      .regex(/^[0-9]{8}$/)
      .nullable()
      .meta({
        description:
          'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
        examples: ['20260213'],
      })
      .exactOptional(),
    metricsTo: z
      .string()
      .regex(/^[0-9]{8}$/)
      .nullable()
      .meta({
        description:
          'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
        examples: ['20260215'],
      })
      .exactOptional(),
    impression: GetRichMenuInsightDailyResponseImpressionSchema.exactOptional(),
    clicks: z
      .array(GetRichMenuInsightDailyResponseClickSchema)
      .meta({ description: 'Daily click metrics for each tappable area of the rich menu.' })
      .exactOptional(),
  })
  .meta({
    description:
      'Daily impression and click statistics for a rich menu created via the Messaging API.',
  })

export type GetRichMenuInsightDailyResponseSchema = z.infer<
  typeof GetRichMenuInsightDailyResponseSchema
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
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  })

export type ErrorDetailSchema = z.infer<typeof ErrorDetailSchema>

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
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  })

export type ErrorResponseSchema = z.infer<typeof ErrorResponseSchema>
