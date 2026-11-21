import { defineHandler } from 'hono/factory'
import { Effect, Schema, SchemaTransformation } from 'effect'

export const StationSchema = Schema.Struct({
  id: Schema.String.check(Schema.isUUID()).annotate({
    description: 'Unique identifier for the station.',
    jsonSchemaExamples: [
      'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
      'b2e783e1-c824-4d63-b37a-d8d698862f1d',
    ],
  }),
  name: Schema.String.annotate({
    description: 'The name of the station',
    jsonSchemaExamples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
  }),
  address: Schema.String.annotate({
    description: 'The address of the station.',
    jsonSchemaExamples: [
      'Invalidenstraße 10557 Berlin, Germany',
      '18 Rue de Dunkerque 75010 Paris, France',
    ],
  }),
  country_code: Schema.String.annotate({
    description: 'The country code of the station.',
    jsonSchemaExamples: ['DE', 'FR'],
  }),
  timezone: Schema.optional(
    Schema.String.annotate({
      description:
        'The timezone of the station in the [IANA Time Zone Database format](https://www.iana.org/time-zones).',
      jsonSchemaExamples: ['Europe/Berlin', 'Europe/Paris'],
    }),
  ),
})

export type Station = Schema.Schema.Type<typeof StationSchema>

export const LinksSelfSchema = Schema.Struct({
  self: Schema.optional(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
})

export type LinksSelf = Schema.Schema.Type<typeof LinksSelfSchema>

export const LinksPaginationSchema = Schema.Struct({
  next: Schema.optional(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
  prev: Schema.optional(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
})

export type LinksPagination = Schema.Schema.Type<typeof LinksPaginationSchema>

export const ProblemSchema = Schema.Struct({
  type: Schema.optional(
    Schema.String.annotate({
      description: 'A URI reference that identifies the problem type',
      jsonSchemaExamples: ['https://example.com/probs/out-of-credit'],
    }),
  ),
  title: Schema.optional(
    Schema.String.annotate({
      description: 'A short, human-readable summary of the problem type',
      jsonSchemaExamples: ['You do not have enough credit.'],
    }),
  ),
  detail: Schema.optional(
    Schema.String.annotate({
      description: 'A human-readable explanation specific to this occurrence of the problem',
      jsonSchemaExamples: ['Your current balance is 30, but that costs 50.'],
    }),
  ),
  instance: Schema.optional(
    Schema.String.annotate({
      description: 'A URI reference that identifies the specific occurrence of the problem',
      jsonSchemaExamples: ['/account/12345/msgs/abc'],
    }),
  ),
  status: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The HTTP status code',
      jsonSchemaExamples: [400],
    }),
  ),
})

export type Problem = Schema.Schema.Type<typeof ProblemSchema>

export const TripSchema = Schema.Struct({
  id: Schema.optional(
    Schema.String.check(Schema.isUUID()).annotate({
      description: 'Unique identifier for the trip',
      jsonSchemaExamples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
    }),
  ),
  origin: Schema.optional(
    Schema.String.annotate({
      description: 'The starting station of the trip',
      jsonSchemaExamples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
    }),
  ),
  destination: Schema.optional(
    Schema.String.annotate({
      description: 'The destination station of the trip',
      jsonSchemaExamples: ['Paris Gare du Nord', 'Berlin Hauptbahnhof'],
    }),
  ),
  departure_time: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description: 'The date and time when the trip departs',
      jsonSchemaExamples: ['2024-02-01T10:00:00Z'],
    }),
  ),
  arrival_time: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description: 'The date and time when the trip arrives',
      jsonSchemaExamples: ['2024-02-01T16:00:00Z'],
    }),
  ),
  operator: Schema.optional(
    Schema.String.annotate({
      description: 'The name of the operator of the trip',
      jsonSchemaExamples: ['Deutsche Bahn', 'SNCF'],
    }),
  ),
  price: Schema.optional(
    Schema.Number.annotate({ description: 'The cost of the trip', jsonSchemaExamples: [50] }),
  ),
  bicycles_allowed: Schema.optional(
    Schema.Boolean.annotate({ description: 'Indicates whether bicycles are allowed on the trip' }),
  ),
  dogs_allowed: Schema.optional(
    Schema.Boolean.annotate({ description: 'Indicates whether dogs are allowed on the trip' }),
  ),
})

export type Trip = Schema.Schema.Type<typeof TripSchema>

export const BookingSchema = Schema.Struct({
  id: Schema.optional(
    Schema.String.check(Schema.isUUID()).annotate({
      description: 'Unique identifier for the booking',
      jsonSchemaExamples: ['3f3e3e1-c824-4d63-b37a-d8d698862f1d'],
      readOnly: true,
    }),
  ),
  trip_id: Schema.optional(
    Schema.String.check(Schema.isUUID()).annotate({
      description: 'Identifier of the booked trip',
      jsonSchemaExamples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
    }),
  ),
  passenger_name: Schema.optional(
    Schema.String.annotate({
      description: 'Name of the passenger',
      jsonSchemaExamples: ['John Doe'],
    }),
  ),
  has_bicycle: Schema.optional(
    Schema.Boolean.annotate({ description: 'Indicates whether the passenger has a bicycle.' }),
  ),
  has_dog: Schema.optional(
    Schema.Boolean.annotate({ description: 'Indicates whether the passenger has a dog.' }),
  ),
})

export type Booking = Schema.Schema.Type<typeof BookingSchema>

export const WrapperCollectionSchema = Schema.Struct({
  data: Schema.optional(
    Schema.Array(Schema.Struct({})).annotate({
      description: 'The wrapper for a collection is an array of objects.',
    }),
  ),
  links: Schema.optional(
    Schema.Struct({}).annotate({
      description: 'A set of hypermedia links which serve as controls for the client.',
      readOnly: true,
    }),
  ),
}).annotate({
  description:
    'This is a generic request/response wrapper which contains both data and links which serve as hypermedia controls (HATEOAS).',
})

export type WrapperCollection = Schema.Schema.Type<typeof WrapperCollectionSchema>

export const BookingPaymentSchema = Schema.Struct({
  id: Schema.optional(
    Schema.String.check(Schema.isUUID()).annotate({
      description:
        'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
      readOnly: true,
    }),
  ),
  amount: Schema.optional(
    Schema.Number.check(Schema.isGreaterThan(0)).annotate({
      description:
        'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
      jsonSchemaExamples: [49.99],
    }),
  ),
  currency: Schema.optional(
    Schema.Literals(['bam', 'bgn', 'chf', 'eur', 'gbp', 'nok', 'sek', 'try']).annotate({
      description:
        'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
    }),
  ),
  source: Schema.optional(
    Schema.Union([
      Schema.Struct({
        object: Schema.optional(Schema.Literal('card')),
        name: Schema.String.annotate({
          description: "Cardholder's full name as it appears on the card.",
          jsonSchemaExamples: ['Francis Bourgeois'],
        }),
        number: Schema.String.annotate({
          description:
            'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
          jsonSchemaExamples: ['4242424242424242'],
        }),
        cvc: Schema.Number.check(Schema.isInt()).annotate({
          description: 'Card security code, 3 or 4 digits usually found on the back of the card.',
          jsonSchemaExamples: [123],
          writeOnly: true,
        }),
        exp_month: Schema.Union([
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
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          )
          .annotate({
            description: "Two-digit number representing the card's expiration month.",
            jsonSchemaExamples: [12],
          }),
        exp_year: Schema.Union([
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
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          )
          .annotate({
            description: "Four-digit number representing the card's expiration year.",
            jsonSchemaExamples: [2025],
          }),
        address_line1: Schema.optional(Schema.String.annotate({ writeOnly: true })),
        address_line2: Schema.optional(Schema.String.annotate({ writeOnly: true })),
        address_city: Schema.optional(Schema.String),
        address_country: Schema.String,
        address_post_code: Schema.optional(Schema.String),
      }).annotate({ description: 'A card (debit or credit) to take payment from.' }),
      Schema.Struct({
        object: Schema.optional(Schema.Literal('bank_account')),
        name: Schema.String,
        number: Schema.String.annotate({
          description:
            'The account number for the bank account, in string form. Must be a current account.',
        }),
        sort_code: Schema.optional(
          Schema.String.annotate({
            description:
              'The sort code for the bank account, in string form. Must be a six-digit number.',
          }),
        ),
        account_type: Schema.Literals(['individual', 'company']).annotate({
          description:
            'The type of entity that holds the account. This can be either `individual` or `company`.',
        }),
        bank_name: Schema.String.annotate({
          description: 'The name of the bank associated with the routing number.',
          jsonSchemaExamples: ['Starling Bank'],
        }),
        country: Schema.String.annotate({
          description: 'Two-letter country code (ISO 3166-1 alpha-2).',
        }),
      }).annotate({
        description:
          'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
      }),
    ]).annotate({
      description:
        'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
    }),
  ),
  status: Schema.optional(
    Schema.Literals(['pending', 'succeeded', 'failed']).annotate({
      description: 'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
      readOnly: true,
    }),
  ),
})

export type BookingPayment = Schema.Schema.Type<typeof BookingPaymentSchema>

export const LinksBookingSchema = Schema.Struct({
  booking: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      jsonSchemaExamples: ['https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb'],
    }),
  ),
})

export type LinksBooking = Schema.Schema.Type<typeof LinksBookingSchema>

export const RateLimitHeaderSchema = Schema.String.annotate({
  jsonSchemaExamples: ['limit=10, remaining=0, reset=10'],
})
export const RetryAfterHeaderSchema = Schema.String

export const OAuth2SecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 authorization code following RFC8725 best practices.',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
}

export const BadRequestResponse = {
  description: 'Bad Request',
  headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
  content: {
    'application/problem+json': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/bad-request',
        title: 'Bad Request',
        status: 400,
        detail: 'The request is invalid or missing required parameters.',
      },
    },
    'application/problem+xml': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/bad-request',
        title: 'Bad Request',
        status: 400,
        detail: 'The request is invalid or missing required parameters.',
      },
    },
  },
}
export const ConflictResponse = {
  description: 'Conflict',
  headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
  content: {
    'application/problem+json': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/conflict',
        title: 'Conflict',
        status: 409,
        detail: 'There is a conflict with an existing resource.',
      },
    },
    'application/problem+xml': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/conflict',
        title: 'Conflict',
        status: 409,
        detail: 'There is a conflict with an existing resource.',
      },
    },
  },
}
export const ForbiddenResponse = {
  description: 'Forbidden',
  headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
  content: {
    'application/problem+json': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/forbidden',
        title: 'Forbidden',
        status: 403,
        detail: 'Access is forbidden for the provided credentials.',
      },
    },
    'application/problem+xml': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/forbidden',
        title: 'Forbidden',
        status: 403,
        detail: 'Access is forbidden for the provided credentials.',
      },
    },
  },
}
export const InternalServerErrorResponse = {
  description: 'Internal Server Error',
  headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
  content: {
    'application/problem+json': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/internal-server-error',
        title: 'Internal Server Error',
        status: 500,
        detail: 'An unexpected error occurred.',
      },
    },
    'application/problem+xml': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/internal-server-error',
        title: 'Internal Server Error',
        status: 500,
        detail: 'An unexpected error occurred.',
      },
    },
  },
}
export const NotFoundResponse = {
  description: 'Not Found',
  headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
  content: {
    'application/problem+json': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/not-found',
        title: 'Not Found',
        status: 404,
        detail: 'The requested resource was not found.',
      },
    },
    'application/problem+xml': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/not-found',
        title: 'Not Found',
        status: 404,
        detail: 'The requested resource was not found.',
      },
    },
  },
}
export const TooManyRequestsResponse = {
  description: 'Too Many Requests',
  headers: {
    RateLimit: { $ref: '#/components/headers/RateLimit' },
    'Retry-After': { $ref: '#/components/headers/Retry-After' },
  },
  content: {
    'application/problem+json': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/too-many-requests',
        title: 'Too Many Requests',
        status: 429,
        detail: 'You have exceeded the rate limit.',
      },
    },
    'application/problem+xml': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/too-many-requests',
        title: 'Too Many Requests',
        status: 429,
        detail: 'You have exceeded the rate limit.',
      },
    },
  },
}
export const UnauthorizedResponse = {
  description: 'Unauthorized',
  headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
  content: {
    'application/problem+json': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail: 'You do not have the necessary permissions.',
      },
    },
    'application/problem+xml': {
      schema: ProblemSchema,
      example: {
        type: 'https://example.com/errors/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail: 'You do not have the necessary permissions.',
      },
    },
  },
}

export const getStationsHandler = defineHandler({
  response: Schema.toStandardSchemaV1(
    WrapperCollectionSchema.check(
      Schema.makeFilter((input) =>
        Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(StationSchema)) }))(input),
      ),
      Schema.makeFilter((input) =>
        Schema.is(
          Schema.Struct({
            links: Schema.optional(
              LinksSelfSchema.check(
                Schema.makeFilter((input) => Schema.is(LinksPaginationSchema)(input)),
              ),
            ),
          }),
        )(input),
      ),
    ),
  ),
})

export const getTripsHandler = defineHandler({
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      origin: Schema.String.check(Schema.isUUID()),
      destination: Schema.String.check(Schema.isUUID()),
      date: Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      bicycles: Schema.String.check(
        Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
      )
        .pipe(
          Schema.decodeTo(
            Schema.Boolean,
            SchemaTransformation.transform({
              decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
              encode: (output) => (output ? 'true' : 'false'),
            }),
          ),
        )
        .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
      dogs: Schema.String.check(
        Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
      )
        .pipe(
          Schema.decodeTo(
            Schema.Boolean,
            SchemaTransformation.transform({
              decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
              encode: (output) => (output ? 'true' : 'false'),
            }),
          ),
        )
        .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
    }),
  ),
  response: Schema.toStandardSchemaV1(
    WrapperCollectionSchema.check(
      Schema.makeFilter((input) =>
        Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(TripSchema)) }))(input),
      ),
      Schema.makeFilter((input) =>
        Schema.is(
          Schema.Struct({
            links: Schema.optional(
              LinksSelfSchema.check(
                Schema.makeFilter((input) => Schema.is(LinksPaginationSchema)(input)),
              ),
            ),
          }),
        )(input),
      ),
    ),
  ),
})

export const getBookingsHandler = defineHandler({
  response: Schema.toStandardSchemaV1(
    WrapperCollectionSchema.check(
      Schema.makeFilter((input) =>
        Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(BookingSchema)) }))(input),
      ),
      Schema.makeFilter((input) =>
        Schema.is(
          Schema.Struct({
            links: Schema.optional(
              LinksSelfSchema.check(
                Schema.makeFilter((input) => Schema.is(LinksPaginationSchema)(input)),
              ),
            ),
          }),
        )(input),
      ),
    ),
  ),
})

export const postBookingsHandler = defineHandler({
  json: Schema.toStandardSchemaV1(BookingSchema),
  response: Schema.toStandardSchemaV1(
    BookingSchema.check(
      Schema.makeFilter((input) =>
        Schema.is(Schema.Struct({ links: Schema.optional(LinksSelfSchema) }))(input),
      ),
    ),
  ),
})

export const getBookingsBookingIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) }),
  ),
  response: Schema.toStandardSchemaV1(
    BookingSchema.check(
      Schema.makeFilter((input) =>
        Schema.is(Schema.Struct({ links: Schema.optional(LinksSelfSchema) }))(input),
      ),
    ),
  ),
})

export const deleteBookingsBookingIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) }),
  ),
})

export const postBookingsBookingIdPaymentHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) }),
  ),
  json: Schema.toStandardSchemaV1(BookingPaymentSchema),
  response: Schema.toStandardSchemaV1(
    BookingPaymentSchema.check(
      Schema.makeFilter((input) =>
        Schema.is(Schema.Struct({ links: Schema.optional(LinksBookingSchema) }))(input),
      ),
    ),
  ),
})
