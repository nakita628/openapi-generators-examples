import { defineHandler } from 'hono/factory'
import { type } from 'arktype'

export const StationSchema = type({
  id: type('string.uuid').describe('Unique identifier for the station.'),
  name: type('string').describe('The name of the station'),
  address: type('string').describe('The address of the station.'),
  country_code: type('string').describe('The country code of the station.'),
  'timezone?': type('string').describe(
    'The timezone of the station in the [IANA Time Zone Database format](https://www.iana.org/time-zones).',
  ),
})

export type Station = typeof StationSchema.infer

export const LinksSelfSchema = type({ 'self?': 'string.url' })

export type LinksSelf = typeof LinksSelfSchema.infer

export const LinksPaginationSchema = type({ 'next?': 'string.url', 'prev?': 'string.url' })

export type LinksPagination = typeof LinksPaginationSchema.infer

export const ProblemSchema = type({
  'type?': type('string').describe('A URI reference that identifies the problem type'),
  'title?': type('string').describe('A short, human-readable summary of the problem type'),
  'detail?': type('string').describe(
    'A human-readable explanation specific to this occurrence of the problem',
  ),
  'instance?': type('string').describe(
    'A URI reference that identifies the specific occurrence of the problem',
  ),
  'status?': type('number.integer').describe('The HTTP status code'),
})

export type Problem = typeof ProblemSchema.infer

export const TripSchema = type({
  'id?': type('string.uuid').describe('Unique identifier for the trip'),
  'origin?': type('string').describe('The starting station of the trip'),
  'destination?': type('string').describe('The destination station of the trip'),
  'departure_time?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('The date and time when the trip departs'),
  'arrival_time?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('The date and time when the trip arrives'),
  'operator?': type('string').describe('The name of the operator of the trip'),
  'price?': type('number').describe('The cost of the trip'),
  'bicycles_allowed?': type('boolean').describe(
    'Indicates whether bicycles are allowed on the trip',
  ),
  'dogs_allowed?': type('boolean').describe('Indicates whether dogs are allowed on the trip'),
})

export type Trip = typeof TripSchema.infer

export const BookingSchema = type({
  'id?': type('string.uuid').describe('Unique identifier for the booking'),
  'trip_id?': type('string.uuid').describe('Identifier of the booked trip'),
  'passenger_name?': type('string').describe('Name of the passenger'),
  'has_bicycle?': type('boolean').describe('Indicates whether the passenger has a bicycle.'),
  'has_dog?': type('boolean').describe('Indicates whether the passenger has a dog.'),
})

export type Booking = typeof BookingSchema.infer

export const WrapperCollectionSchema = type({
  'data?': type(type({})).array().describe('The wrapper for a collection is an array of objects.'),
  'links?': type({}).describe('A set of hypermedia links which serve as controls for the client.'),
}).describe(
  'This is a generic request/response wrapper which contains both data and links which serve as hypermedia controls (HATEOAS).',
)

export type WrapperCollection = typeof WrapperCollectionSchema.infer

export const BookingPaymentSchema = type({
  'id?': type('string.uuid').describe(
    'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
  ),
  'amount?': type('number > 0').describe(
    'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
  ),
  'currency?': type("'bam' | 'bgn' | 'chf' | 'eur' | 'gbp' | 'nok' | 'sek' | 'try'").describe(
    'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
  ),
  'source?': type(
    type({
      'object?': "'card'",
      name: type('string').describe("Cardholder's full name as it appears on the card."),
      number: type('string').describe(
        'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
      ),
      cvc: type('number.integer').describe(
        'Card security code, 3 or 4 digits usually found on the back of the card.',
      ),
      exp_month: type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .describe("Two-digit number representing the card's expiration month."),
      exp_year: type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .describe("Four-digit number representing the card's expiration year."),
      'address_line1?': 'string',
      'address_line2?': 'string',
      'address_city?': 'string',
      address_country: 'string',
      'address_post_code?': 'string',
    }).describe('A card (debit or credit) to take payment from.'),
  )
    .or(
      type({
        'object?': "'bank_account'",
        name: 'string',
        number: type('string').describe(
          'The account number for the bank account, in string form. Must be a current account.',
        ),
        'sort_code?': type('string').describe(
          'The sort code for the bank account, in string form. Must be a six-digit number.',
        ),
        account_type: type("'individual' | 'company'").describe(
          'The type of entity that holds the account. This can be either `individual` or `company`.',
        ),
        bank_name: type('string').describe(
          'The name of the bank associated with the routing number.',
        ),
        country: type('string').describe('Two-letter country code (ISO 3166-1 alpha-2).'),
      }).describe(
        'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
      ),
    )
    .describe(
      'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
    ),
  'status?': type("'pending' | 'succeeded' | 'failed'").describe(
    'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
  ),
})

export type BookingPayment = typeof BookingPaymentSchema.infer

export const LinksBookingSchema = type({ 'booking?': 'string.url' })

export type LinksBooking = typeof LinksBookingSchema.infer

export const RateLimitHeaderSchema = type('string')
export const RetryAfterHeaderSchema = type('string')

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
  response: {
    '~standard': type(
      type(WrapperCollectionSchema).and(type({ 'data?': type(StationSchema).array() })),
    ).and(type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }))['~standard'],
  },
})

export const getTripsHandler = defineHandler({
  query: {
    '~standard': type({
      origin: 'string.uuid',
      destination: 'string.uuid',
      date: type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'bicycles?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'dogs?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    })['~standard'],
  },
  response: {
    '~standard': type(
      type(WrapperCollectionSchema).and(type({ 'data?': type(TripSchema).array() })),
    ).and(type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }))['~standard'],
  },
})

export const getBookingsHandler = defineHandler({
  response: {
    '~standard': type(
      type(WrapperCollectionSchema).and(type({ 'data?': type(BookingSchema).array() })),
    ).and(type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }))['~standard'],
  },
})

export const postBookingsHandler = defineHandler({
  json: { '~standard': BookingSchema['~standard'] },
  response: {
    '~standard': type(BookingSchema).and(type({ 'links?': LinksSelfSchema }))['~standard'],
  },
})

export const getBookingsBookingIdHandler = defineHandler({
  param: { '~standard': type({ bookingId: 'string.uuid' })['~standard'] },
  response: {
    '~standard': type(BookingSchema).and(type({ 'links?': LinksSelfSchema }))['~standard'],
  },
})

export const deleteBookingsBookingIdHandler = defineHandler({
  param: { '~standard': type({ bookingId: 'string.uuid' })['~standard'] },
})

export const postBookingsBookingIdPaymentHandler = defineHandler({
  param: { '~standard': type({ bookingId: 'string.uuid' })['~standard'] },
  json: { '~standard': BookingPaymentSchema['~standard'] },
  response: {
    '~standard': type(BookingPaymentSchema).and(type({ 'links?': LinksBookingSchema }))[
      '~standard'
    ],
  },
})
