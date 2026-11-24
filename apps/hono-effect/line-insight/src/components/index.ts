import { Schema, SchemaTransformation } from 'effect'

export const GenderTileSchema = Schema.Struct({
  gender: Schema.optionalKey(
    Schema.Literals(['male', 'female', 'unknown']).annotate({ description: "users' gender" }),
  ),
  percentage: Schema.optionalKey(Schema.Number.annotate({ description: 'Percentage' })),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
  },
})

export type GenderTile = Schema.Schema.Type<typeof GenderTileSchema>

export const AgeTileSchema = Schema.Struct({
  age: Schema.optionalKey(
    Schema.Literals([
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
    ]).annotate({ description: "users' age" }),
  ),
  percentage: Schema.optionalKey(Schema.Number.annotate({ description: 'Percentage' })),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
  },
})

export type AgeTile = Schema.Schema.Type<typeof AgeTileSchema>

export const AreaTileSchema = Schema.Struct({
  area: Schema.optionalKey(Schema.String.annotate({ description: "users' country and region" })),
  percentage: Schema.optionalKey(Schema.Number.annotate({ description: 'Percentage' })),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
  },
})

export type AreaTile = Schema.Schema.Type<typeof AreaTileSchema>

export const AppTypeTileSchema = Schema.Struct({
  appType: Schema.optionalKey(
    Schema.Literals(['ios', 'android', 'others']).annotate({ description: "users' OS" }),
  ),
  percentage: Schema.optionalKey(Schema.Number.annotate({ description: 'Percentage' })),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
  },
})

export type AppTypeTile = Schema.Schema.Type<typeof AppTypeTileSchema>

export const SubscriptionPeriodTileSchema = Schema.Struct({
  subscriptionPeriod: Schema.optionalKey(
    Schema.Literals([
      'within7days',
      'within30days',
      'within90days',
      'within180days',
      'within365days',
      'over365days',
      'unknown',
    ]).annotate({
      description:
        'Subscription period. Possible values: `within7days`, `within90days`, `unknown` etc.',
    }),
  ),
  percentage: Schema.optionalKey(
    Schema.Number.annotate({
      description: 'Percentage. Possible values: [0.0,100.0] e.g. 0, 2.9, 37.6.',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
  },
})

export type SubscriptionPeriodTile = Schema.Schema.Type<typeof SubscriptionPeriodTileSchema>

export const GetFriendsDemographicsResponseSchema = Schema.Struct({
  available: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: 'true if friend demographic information is available.',
    }),
  ),
  genders: Schema.optionalKey(
    Schema.Array(GenderTileSchema).annotate({ description: 'Percentage per gender.' }),
  ),
  ages: Schema.optionalKey(
    Schema.Array(AgeTileSchema).annotate({ description: 'Percentage per age group.' }),
  ),
  areas: Schema.optionalKey(
    Schema.Array(AreaTileSchema).annotate({ description: 'Percentage per area.' }),
  ),
  appTypes: Schema.optionalKey(
    Schema.Array(AppTypeTileSchema).annotate({ description: 'Percentage by OS.' }),
  ),
  subscriptionPeriods: Schema.optionalKey(
    Schema.Array(SubscriptionPeriodTileSchema).annotate({
      description: 'Percentage per friendship duration.',
    }),
  ),
}).annotate({
  description: 'Get friend demographics',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
  },
})

export type GetFriendsDemographicsResponse = Schema.Schema.Type<
  typeof GetFriendsDemographicsResponseSchema
>

export const GetNumberOfMessageDeliveriesResponseSchema = Schema.Struct({
  status: Schema.optionalKey(
    Schema.Literals(['ready', 'unready', 'out_of_service']).annotate({
      description: 'Status of the counting process.',
    }),
  ),
  broadcast: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          "Number of messages sent to all of this LINE Official Account's friends (broadcast messages).",
      }),
  ),
  targeting: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          "Number of messages sent to some of this LINE Official Account's friends, based on specific attributes (targeted messages).",
      }),
  ),
  autoResponse: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'Number of auto-response messages sent.' }),
  ),
  welcomeResponse: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'Number of greeting messages sent.' }),
  ),
  chat: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Number of messages sent from LINE Official Account Manager [Chat screen](https://www.linebiz.com/jp/manual/OfficialAccountManager/chats/) (only available in Japanese).',
      }),
  ),
  apiBroadcast: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Number of broadcast messages sent with the `Send broadcast message` Messaging API operation.',
      }),
  ),
  apiPush: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Number of push messages sent with the `Send push message` Messaging API operation.',
      }),
  ),
  apiMulticast: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Number of multicast messages sent with the `Send multicast message` Messaging API operation.',
      }),
  ),
  apiNarrowcast: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Number of narrowcast messages sent with the `Send narrowcast message` Messaging API operation.',
      }),
  ),
  apiReply: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Number of replies sent with the `Send reply message` Messaging API operation.',
      }),
  ),
}).annotate({
  description: 'Get number of message deliveries',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-delivery-messages',
  },
})

export type GetNumberOfMessageDeliveriesResponse = Schema.Schema.Type<
  typeof GetNumberOfMessageDeliveriesResponseSchema
>

export const GetNumberOfFollowersResponseSchema = Schema.Struct({
  status: Schema.optionalKey(
    Schema.Literals(['ready', 'unready', 'out_of_service']).annotate({
      description: 'Calculation status.',
    }),
  ),
  followers: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          "The number of times, as of the specified date, that a user added this LINE Official Account as a friend for the first time.\nThe number doesn't decrease even if a user later blocks the account or when they delete their LINE account.\n",
      }),
  ),
  targetedReaches: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'The number of users, as of the specified date, that the LINE Official Account can reach through targeted messages based on gender, age, and/or region.\nThis number only includes users who are active on LINE or LINE services and whose demographics have a high level of certainty.\n',
      }),
  ),
  blocks: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'The number of users blocking the account as of the specified date.\nThe number decreases when a user unblocks the account.\n\n\n',
      }),
  ),
}).annotate({
  description: 'Get number of followers',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-followers',
  },
})

export type GetNumberOfFollowersResponse = Schema.Schema.Type<
  typeof GetNumberOfFollowersResponseSchema
>

export const GetMessageEventResponseOverviewSchema = Schema.Struct({
  requestId: Schema.optionalKey(Schema.String.annotate({ description: 'Request ID.' })),
  timestamp: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'UNIX timestamp for message delivery time in seconds.' }),
  ),
  delivered: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Number of messages delivered.\nThis property shows values of less than 20.\nHowever, if all messages have not been sent, it will be null.\n',
      }),
  ),
  uniqueImpression: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users who opened the message, meaning they displayed at least 1 bubble.',
    }),
  ),
  uniqueClick: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of users who opened any URL in the message.' }),
  ),
  uniqueMediaPlayed: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description: 'Number of users who started playing any video or audio in the message.',
    }),
  ),
  uniqueMediaPlayed100Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description: 'Number of users who played the entirety of any video or audio in the message.',
    }),
  ),
}).annotate({
  description: 'Summary of message statistics.',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
  },
})

export type GetMessageEventResponseOverview = Schema.Schema.Type<
  typeof GetMessageEventResponseOverviewSchema
>

export const GetMessageEventResponseMessageSchema = Schema.Struct({
  seq: Schema.optionalKey(
    Schema.Number.check(Schema.isInt32()).annotate({ description: "Bubble's serial number." }),
  ),
  impression: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of times the bubble was displayed.' }),
  ),
  mediaPlayed: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of times audio or video in the bubble started playing.' }),
  ),
  mediaPlayed25Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
    }),
  ),
  mediaPlayed50Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
    }),
  ),
  mediaPlayed75Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
    }),
  ),
  mediaPlayed100Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
    }),
  ),
  uniqueMediaPlayed: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description: 'Number of users that started playing audio or video in the bubble.',
    }),
  ),
  uniqueMediaPlayed25Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
    }),
  ),
  uniqueMediaPlayed50Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
    }),
  ),
  uniqueMediaPlayed75Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
    }),
  ),
  uniqueMediaPlayed100Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
  },
})

export type GetMessageEventResponseMessage = Schema.Schema.Type<
  typeof GetMessageEventResponseMessageSchema
>

export const GetMessageEventResponseClickSchema = Schema.Struct({
  seq: Schema.optionalKey(
    Schema.Number.check(Schema.isInt32()).annotate({ description: "The URL's serial number." }),
  ),
  url: Schema.optionalKey(Schema.String.annotate({ description: 'URL.' })),
  click: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of times the URL was opened.' }),
  ),
  uniqueClick: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of users that opened the URL.' }),
  ),
  uniqueClickOfRequest: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        "Number of users who opened this url through any link in the message. If a message contains two links to the same URL and a user opens both links, they're counted only once.",
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
  },
})

export type GetMessageEventResponseClick = Schema.Schema.Type<
  typeof GetMessageEventResponseClickSchema
>

export const GetMessageEventResponseSchema = Schema.Struct({
  overview: Schema.optionalKey(GetMessageEventResponseOverviewSchema),
  messages: Schema.optionalKey(
    Schema.Array(GetMessageEventResponseMessageSchema).annotate({
      description: 'Array of information about individual message bubbles.',
    }),
  ),
  clicks: Schema.optionalKey(
    Schema.Array(GetMessageEventResponseClickSchema).annotate({
      description: 'Array of information about opened URLs in the message.',
    }),
  ),
}).annotate({
  description:
    'Statistics about how users interact with narrowcast messages or broadcast messages sent from your LINE Official Account.',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-insight-message-event-response',
  },
})

export type GetMessageEventResponse = Schema.Schema.Type<typeof GetMessageEventResponseSchema>

export const GetStatisticsPerUnitResponseOverviewSchema = Schema.Struct({
  uniqueImpression: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users who opened the message, meaning they displayed at least 1 bubble.',
    }),
  ),
  uniqueClick: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of users who opened any URL in the message.' }),
  ),
  uniqueMediaPlayed: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description: 'Number of users who started playing any video or audio in the message.',
    }),
  ),
  uniqueMediaPlayed100Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description: 'Number of users who played the entirety of any video or audio in the message.',
    }),
  ),
}).annotate({
  description: 'Statistics related to messages.',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
  },
})

export type GetStatisticsPerUnitResponseOverview = Schema.Schema.Type<
  typeof GetStatisticsPerUnitResponseOverviewSchema
>

export const GetStatisticsPerUnitResponseMessageSchema = Schema.Struct({
  seq: Schema.Number.check(Schema.isInt32()).annotate({ description: "Bubble's serial number." }),
  impression: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of times the bubble was displayed.' }),
  ),
  mediaPlayed: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of times audio or video in the bubble started playing.' }),
  ),
  mediaPlayed25Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 25% of the total time.',
    }),
  ),
  mediaPlayed50Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 50% of the total time.',
    }),
  ),
  mediaPlayed75Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 75% of the total time.',
    }),
  ),
  mediaPlayed100Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of times audio or video in the bubble started playing and was played 100% of the total time.',
    }),
  ),
  uniqueImpression: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of users the bubble was displayed.' }),
  ),
  uniqueMediaPlayed: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description: 'Number of users that started playing audio or video in the bubble.',
    }),
  ),
  uniqueMediaPlayed25Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 25% of the total time.',
    }),
  ),
  uniqueMediaPlayed50Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 50% of the total time.',
    }),
  ),
  uniqueMediaPlayed75Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 75% of the total time.',
    }),
  ),
  uniqueMediaPlayed100Percent: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        'Number of users that started playing audio or video in the bubble and played 100% of the total time.',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
  },
})

export type GetStatisticsPerUnitResponseMessage = Schema.Schema.Type<
  typeof GetStatisticsPerUnitResponseMessageSchema
>

export const GetStatisticsPerUnitResponseClickSchema = Schema.Struct({
  seq: Schema.Union([
    Schema.BigInt,
    Schema.Number.check(Schema.isInt()),
    Schema.String.check(Schema.isPattern(/^-?\d+$/)),
  ])
    .pipe(
      Schema.decodeTo(
        Schema.BigInt,
        SchemaTransformation.transform({
          decode: (input) => BigInt(input),
          encode: (output) => output,
        }),
      ),
    )
    .check(
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({ description: "The URL's serial number." }),
  url: Schema.String.annotate({ description: 'URL.' }),
  click: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of times the URL in the bubble was opened.' }),
  ),
  uniqueClick: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({ description: 'Number of users that opened the URL in the bubble.' }),
  ),
  uniqueClickOfRequest: Schema.optionalKey(
    Schema.NullOr(
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ),
    ).annotate({
      description:
        "Number of users who opened this url through any link in the message.\nIf another message bubble contains the same URL and a user opens both links, it's counted only once.\n",
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
  },
})

export type GetStatisticsPerUnitResponseClick = Schema.Schema.Type<
  typeof GetStatisticsPerUnitResponseClickSchema
>

export const GetStatisticsPerUnitResponseSchema = Schema.Struct({
  overview: GetStatisticsPerUnitResponseOverviewSchema,
  messages: Schema.Array(GetStatisticsPerUnitResponseMessageSchema).annotate({
    description: 'Array of information about individual message bubbles.',
  }),
  clicks: Schema.Array(GetStatisticsPerUnitResponseClickSchema).annotate({
    description: 'Array of information about opened URLs in the message.',
  }),
}).annotate({
  description: 'Response object for `get statistics per unit`',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit-response',
  },
})

export type GetStatisticsPerUnitResponse = Schema.Schema.Type<
  typeof GetStatisticsPerUnitResponseSchema
>

export const GetRichMenuInsightSummaryResponseMetricsSchema = Schema.Struct({
  count: Schema.Union([
    Schema.BigInt,
    Schema.Number.check(Schema.isInt()),
    Schema.String.check(Schema.isPattern(/^-?\d+$/)),
  ])
    .pipe(
      Schema.decodeTo(
        Schema.BigInt,
        SchemaTransformation.transform({
          decode: (input) => BigInt(input),
          encode: (output) => output,
        }),
      ),
    )
    .check(
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({ description: 'Number of impressions or clicks.' }),
  uniqueUsers: Schema.Union([
    Schema.BigInt,
    Schema.Number.check(Schema.isInt()),
    Schema.String.check(Schema.isPattern(/^-?\d+$/)),
  ])
    .pipe(
      Schema.decodeTo(
        Schema.BigInt,
        SchemaTransformation.transform({
          decode: (input) => BigInt(input),
          encode: (output) => output,
        }),
      ),
    )
    .check(
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({
      description: 'Approximate number of unique users who triggered an impression or click.',
    }),
}).annotate({ description: 'Aggregated number of events and unique users over the whole period.' })

export type GetRichMenuInsightSummaryResponseMetrics = Schema.Schema.Type<
  typeof GetRichMenuInsightSummaryResponseMetricsSchema
>

export const GetRichMenuInsightSummaryResponseImpressionSchema = Schema.Struct({
  metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
}).annotate({ description: 'Impression metrics for the whole rich menu.' })

export type GetRichMenuInsightSummaryResponseImpression = Schema.Schema.Type<
  typeof GetRichMenuInsightSummaryResponseImpressionSchema
>

export const GetRichMenuInsightSummaryResponseBoundsSchema = Schema.Struct({
  x: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The x coordinate of the top-left corner of the target area.',
  }),
  y: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The y coordinate of the top-left corner of the target area.',
  }),
  width: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The width of the target area.',
  }),
  height: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The height of the target area.',
  }),
}).annotate({
  description:
    'Target area of the metrics, represented by the top-left coordinate, width, and height.',
})

export type GetRichMenuInsightSummaryResponseBounds = Schema.Schema.Type<
  typeof GetRichMenuInsightSummaryResponseBoundsSchema
>

export const GetRichMenuInsightSummaryResponseClickSchema = Schema.Struct({
  bounds: GetRichMenuInsightSummaryResponseBoundsSchema,
  metrics: GetRichMenuInsightSummaryResponseMetricsSchema,
}).annotate({ description: 'Click metrics for a single tappable area of the rich menu.' })

export type GetRichMenuInsightSummaryResponseClick = Schema.Schema.Type<
  typeof GetRichMenuInsightSummaryResponseClickSchema
>

export const GetRichMenuInsightSummaryResponseSchema = Schema.Struct({
  richMenuId: Schema.String.annotate({ description: 'Rich menu ID.' }),
  metricsFrom: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.isPattern(/^[0-9]{8}$/))).annotate({
      description:
        'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
      jsonSchemaExamples: ['20260213'],
    }),
  ),
  metricsTo: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.isPattern(/^[0-9]{8}$/))).annotate({
      description:
        'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
      jsonSchemaExamples: ['20260215'],
    }),
  ),
  impression: Schema.optionalKey(GetRichMenuInsightSummaryResponseImpressionSchema),
  clicks: Schema.optionalKey(
    Schema.Array(GetRichMenuInsightSummaryResponseClickSchema).annotate({
      description: 'Click metrics for each tappable area of the rich menu.',
    }),
  ),
}).annotate({
  description:
    'Summary of impression and click statistics for a rich menu created via the Messaging API.',
})

export type GetRichMenuInsightSummaryResponse = Schema.Schema.Type<
  typeof GetRichMenuInsightSummaryResponseSchema
>

export const GetRichMenuInsightDailyResponseDailyMetricsSchema = Schema.Struct({
  date: Schema.String.check(Schema.isPattern(/^[0-9]{8}$/)).annotate({
    description: 'The date (JST) of these metrics. Format: yyyyMMdd (e.g. 20260213).',
    jsonSchemaExamples: ['20260213'],
  }),
  count: Schema.Union([
    Schema.BigInt,
    Schema.Number.check(Schema.isInt()),
    Schema.String.check(Schema.isPattern(/^-?\d+$/)),
  ])
    .pipe(
      Schema.decodeTo(
        Schema.BigInt,
        SchemaTransformation.transform({
          decode: (input) => BigInt(input),
          encode: (output) => output,
        }),
      ),
    )
    .check(
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({ description: 'Number of impressions or clicks on this day.' }),
  uniqueUsers: Schema.Union([
    Schema.BigInt,
    Schema.Number.check(Schema.isInt()),
    Schema.String.check(Schema.isPattern(/^-?\d+$/)),
  ])
    .pipe(
      Schema.decodeTo(
        Schema.BigInt,
        SchemaTransformation.transform({
          decode: (input) => BigInt(input),
          encode: (output) => output,
        }),
      ),
    )
    .check(
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({
      description:
        'Approximate number of unique users who triggered an impression or click on this day.',
    }),
}).annotate({ description: 'Aggregated number of events and unique users for a single day.' })

export type GetRichMenuInsightDailyResponseDailyMetrics = Schema.Schema.Type<
  typeof GetRichMenuInsightDailyResponseDailyMetricsSchema
>

export const GetRichMenuInsightDailyResponseImpressionSchema = Schema.Struct({
  metrics: Schema.Array(GetRichMenuInsightDailyResponseDailyMetricsSchema).annotate({
    description: 'Per-day impression metrics.',
  }),
}).annotate({ description: 'Daily impression metrics for the whole rich menu.' })

export type GetRichMenuInsightDailyResponseImpression = Schema.Schema.Type<
  typeof GetRichMenuInsightDailyResponseImpressionSchema
>

export const GetRichMenuInsightDailyResponseBoundsSchema = Schema.Struct({
  x: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The x coordinate of the top-left corner of the target area.',
  }),
  y: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The y coordinate of the top-left corner of the target area.',
  }),
  width: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The width of the target area.',
  }),
  height: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The height of the target area.',
  }),
}).annotate({
  description:
    'Target area of the metrics, represented by the top-left coordinate, width, and height.',
})

export type GetRichMenuInsightDailyResponseBounds = Schema.Schema.Type<
  typeof GetRichMenuInsightDailyResponseBoundsSchema
>

export const GetRichMenuInsightDailyResponseClickSchema = Schema.Struct({
  bounds: GetRichMenuInsightDailyResponseBoundsSchema,
  metrics: Schema.Array(GetRichMenuInsightDailyResponseDailyMetricsSchema).annotate({
    description: 'Per-day click metrics for the target area.',
  }),
}).annotate({ description: 'Daily click metrics for a single tappable area of the rich menu.' })

export type GetRichMenuInsightDailyResponseClick = Schema.Schema.Type<
  typeof GetRichMenuInsightDailyResponseClickSchema
>

export const GetRichMenuInsightDailyResponseSchema = Schema.Struct({
  richMenuId: Schema.String.annotate({ description: 'Rich menu ID.' }),
  metricsFrom: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.isPattern(/^[0-9]{8}$/))).annotate({
      description:
        'Start date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260213).',
      jsonSchemaExamples: ['20260213'],
    }),
  ),
  metricsTo: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.isPattern(/^[0-9]{8}$/))).annotate({
      description:
        'End date (JST) of the period actually covered by the returned metrics. Format: yyyyMMdd (e.g. 20260215).',
      jsonSchemaExamples: ['20260215'],
    }),
  ),
  impression: Schema.optionalKey(GetRichMenuInsightDailyResponseImpressionSchema),
  clicks: Schema.optionalKey(
    Schema.Array(GetRichMenuInsightDailyResponseClickSchema).annotate({
      description: 'Daily click metrics for each tappable area of the rich menu.',
    }),
  ),
}).annotate({
  description:
    'Daily impression and click statistics for a rich menu created via the Messaging API.',
})

export type GetRichMenuInsightDailyResponse = Schema.Schema.Type<
  typeof GetRichMenuInsightDailyResponseSchema
>

export const ErrorDetailSchema = Schema.Struct({
  message: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Details of the error. Not included in the response under certain situations.',
    }),
  ),
  property: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
  },
})

export type ErrorDetail = Schema.Schema.Type<typeof ErrorDetailSchema>

export const ErrorResponseSchema = Schema.Struct({
  message: Schema.String.annotate({
    description: 'Message containing information about the error.',
  }),
  details: Schema.optionalKey(
    Schema.Array(ErrorDetailSchema).annotate({
      description:
        'An array of error details. If the array is empty, this property will not be included in the response.',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
  },
})

export type ErrorResponse = Schema.Schema.Type<typeof ErrorResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
