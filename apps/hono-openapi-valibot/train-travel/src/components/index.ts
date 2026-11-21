import { resolver } from 'hono-openapi'
import * as v from 'valibot'

export const StationSchema = v.pipe(
  v.object({
    id: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
        ),
      ),
      v.description('Unique identifier for the station.'),
      v.metadata({
        examples: ['efdbb9d1-02c2-4bc3-afb7-6788d8782b1e', 'b2e783e1-c824-4d63-b37a-d8d698862f1d'],
      }),
    ),
    name: v.pipe(
      v.string(),
      v.description('The name of the station'),
      v.metadata({ examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'] }),
    ),
    address: v.pipe(
      v.string(),
      v.description('The address of the station.'),
      v.metadata({
        examples: [
          'Invalidenstraße 10557 Berlin, Germany',
          '18 Rue de Dunkerque 75010 Paris, France',
        ],
      }),
    ),
    country_code: v.pipe(
      v.string(),
      v.description('The country code of the station.'),
      v.metadata({ examples: ['DE', 'FR'] }),
    ),
    timezone: v.optional(
      v.pipe(
        v.string(),
        v.description(
          'The timezone of the station in the [IANA Time Zone Database format](https://www.iana.org/time-zones).',
        ),
        v.metadata({ examples: ['Europe/Berlin', 'Europe/Paris'] }),
      ),
    ),
  }),
  v.metadata({ ref: 'Station' }),
)

export type Station = v.InferOutput<typeof StationSchema>

export const LinksSelfSchema = v.pipe(
  v.partial(v.object({ self: v.pipe(v.string(), v.url()) })),
  v.metadata({ ref: 'Links-Self' }),
)

export type LinksSelf = v.InferOutput<typeof LinksSelfSchema>

export const LinksPaginationSchema = v.pipe(
  v.partial(v.object({ next: v.pipe(v.string(), v.url()), prev: v.pipe(v.string(), v.url()) })),
  v.metadata({ ref: 'Links-Pagination' }),
)

export type LinksPagination = v.InferOutput<typeof LinksPaginationSchema>

export const ProblemSchema = v.pipe(
  v.partial(
    v.object({
      type: v.pipe(
        v.string(),
        v.description('A URI reference that identifies the problem type'),
        v.metadata({ examples: ['https://example.com/probs/out-of-credit'] }),
      ),
      title: v.pipe(
        v.string(),
        v.description('A short, human-readable summary of the problem type'),
        v.metadata({ examples: ['You do not have enough credit.'] }),
      ),
      detail: v.pipe(
        v.string(),
        v.description('A human-readable explanation specific to this occurrence of the problem'),
        v.metadata({ examples: ['Your current balance is 30, but that costs 50.'] }),
      ),
      instance: v.pipe(
        v.string(),
        v.description('A URI reference that identifies the specific occurrence of the problem'),
        v.metadata({ examples: ['/account/12345/msgs/abc'] }),
      ),
      status: v.pipe(
        v.pipe(v.number(), v.integer()),
        v.description('The HTTP status code'),
        v.metadata({ examples: [400] }),
      ),
    }),
  ),
  v.metadata({ ref: 'Problem' }),
)

export type Problem = v.InferOutput<typeof ProblemSchema>

export const TripSchema = v.pipe(
  v.partial(
    v.object({
      id: v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
        v.description('Unique identifier for the trip'),
        v.metadata({ examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'] }),
      ),
      origin: v.pipe(
        v.string(),
        v.description('The starting station of the trip'),
        v.metadata({ examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'] }),
      ),
      destination: v.pipe(
        v.string(),
        v.description('The destination station of the trip'),
        v.metadata({ examples: ['Paris Gare du Nord', 'Berlin Hauptbahnhof'] }),
      ),
      departure_time: v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
        v.description('The date and time when the trip departs'),
        v.metadata({ examples: ['2024-02-01T10:00:00Z'] }),
      ),
      arrival_time: v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
        v.description('The date and time when the trip arrives'),
        v.metadata({ examples: ['2024-02-01T16:00:00Z'] }),
      ),
      operator: v.pipe(
        v.string(),
        v.description('The name of the operator of the trip'),
        v.metadata({ examples: ['Deutsche Bahn', 'SNCF'] }),
      ),
      price: v.pipe(
        v.number(),
        v.description('The cost of the trip'),
        v.metadata({ examples: [50] }),
      ),
      bicycles_allowed: v.pipe(
        v.boolean(),
        v.description('Indicates whether bicycles are allowed on the trip'),
      ),
      dogs_allowed: v.pipe(
        v.boolean(),
        v.description('Indicates whether dogs are allowed on the trip'),
      ),
    }),
  ),
  v.metadata({ ref: 'Trip' }),
)

export type Trip = v.InferOutput<typeof TripSchema>

export const BookingSchema = v.pipe(
  v.partial(
    v.object({
      id: v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
        v.description('Unique identifier for the booking'),
        v.metadata({ examples: ['3f3e3e1-c824-4d63-b37a-d8d698862f1d'], readOnly: true }),
      ),
      trip_id: v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
        v.description('Identifier of the booked trip'),
        v.metadata({ examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'] }),
      ),
      passenger_name: v.pipe(
        v.string(),
        v.description('Name of the passenger'),
        v.metadata({ examples: ['John Doe'] }),
      ),
      has_bicycle: v.pipe(
        v.boolean(),
        v.description('Indicates whether the passenger has a bicycle.'),
      ),
      has_dog: v.pipe(v.boolean(), v.description('Indicates whether the passenger has a dog.')),
    }),
  ),
  v.metadata({ ref: 'Booking' }),
)

export type Booking = v.InferOutput<typeof BookingSchema>

export const WrapperCollectionSchema = v.pipe(
  v.pipe(
    v.partial(
      v.object({
        data: v.pipe(
          v.array(v.object({})),
          v.description('The wrapper for a collection is an array of objects.'),
        ),
        links: v.pipe(
          v.object({}),
          v.description('A set of hypermedia links which serve as controls for the client.'),
          v.metadata({ readOnly: true }),
        ),
      }),
    ),
    v.description(
      'This is a generic request/response wrapper which contains both data and links which serve as hypermedia controls (HATEOAS).',
    ),
  ),
  v.metadata({ ref: 'Wrapper-Collection' }),
)

export type WrapperCollection = v.InferOutput<typeof WrapperCollectionSchema>

export const BookingPaymentSchema = v.pipe(
  v.partial(
    v.object({
      id: v.pipe(
        v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
        v.description(
          'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
        ),
        v.metadata({ readOnly: true }),
      ),
      amount: v.pipe(
        v.pipe(v.number(), v.gtValue(0)),
        v.description(
          'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
        ),
        v.metadata({ examples: [49.99] }),
      ),
      currency: v.pipe(
        v.picklist(['bam', 'bgn', 'chf', 'eur', 'gbp', 'nok', 'sek', 'try']),
        v.description(
          'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
        ),
      ),
      source: v.pipe(
        v.union([
          v.pipe(
            v.object({
              object: v.optional(v.literal('card')),
              name: v.pipe(
                v.string(),
                v.description("Cardholder's full name as it appears on the card."),
                v.metadata({ examples: ['Francis Bourgeois'] }),
              ),
              number: v.pipe(
                v.string(),
                v.description(
                  'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
                ),
                v.metadata({ examples: ['4242424242424242'] }),
              ),
              cvc: v.pipe(
                v.pipe(v.number(), v.integer()),
                v.description(
                  'Card security code, 3 or 4 digits usually found on the back of the card.',
                ),
                v.metadata({ examples: [123], writeOnly: true }),
              ),
              exp_month: v.pipe(
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
                v.description("Two-digit number representing the card's expiration month."),
                v.metadata({ examples: [12] }),
              ),
              exp_year: v.pipe(
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
                v.description("Four-digit number representing the card's expiration year."),
                v.metadata({ examples: [2025] }),
              ),
              address_line1: v.optional(v.pipe(v.string(), v.metadata({ writeOnly: true }))),
              address_line2: v.optional(v.pipe(v.string(), v.metadata({ writeOnly: true }))),
              address_city: v.optional(v.string()),
              address_country: v.string(),
              address_post_code: v.optional(v.string()),
            }),
            v.description('A card (debit or credit) to take payment from.'),
          ),
          v.pipe(
            v.object({
              object: v.optional(v.literal('bank_account')),
              name: v.string(),
              number: v.pipe(
                v.string(),
                v.description(
                  'The account number for the bank account, in string form. Must be a current account.',
                ),
              ),
              sort_code: v.optional(
                v.pipe(
                  v.string(),
                  v.description(
                    'The sort code for the bank account, in string form. Must be a six-digit number.',
                  ),
                ),
              ),
              account_type: v.pipe(
                v.picklist(['individual', 'company']),
                v.description(
                  'The type of entity that holds the account. This can be either `individual` or `company`.',
                ),
              ),
              bank_name: v.pipe(
                v.string(),
                v.description('The name of the bank associated with the routing number.'),
                v.metadata({ examples: ['Starling Bank'] }),
              ),
              country: v.pipe(
                v.string(),
                v.description('Two-letter country code (ISO 3166-1 alpha-2).'),
              ),
            }),
            v.description(
              'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
            ),
          ),
        ]),
        v.description(
          'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
        ),
      ),
      status: v.pipe(
        v.picklist(['pending', 'succeeded', 'failed']),
        v.description('The status of the payment, one of `pending`, `succeeded`, or `failed`.'),
        v.metadata({ readOnly: true }),
      ),
    }),
  ),
  v.metadata({ ref: 'BookingPayment' }),
)

export type BookingPayment = v.InferOutput<typeof BookingPaymentSchema>

export const LinksBookingSchema = v.pipe(
  v.partial(
    v.object({
      booking: v.pipe(
        v.pipe(v.string(), v.url()),
        v.metadata({
          examples: ['https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb'],
        }),
      ),
    }),
  ),
  v.metadata({ ref: 'Links-Booking' }),
)

export type LinksBooking = v.InferOutput<typeof LinksBookingSchema>

export const RateLimitHeaderSchema = resolver(
  v.pipe(v.string(), v.metadata({ examples: ['limit=10, remaining=0, reset=10'] })),
)
export const RetryAfterHeaderSchema = resolver(v.string())

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
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/bad-request',
        title: 'Bad Request',
        status: 400,
        detail: 'The request is invalid or missing required parameters.',
      },
    },
    'application/problem+xml': {
      schema: resolver(ProblemSchema),
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
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/conflict',
        title: 'Conflict',
        status: 409,
        detail: 'There is a conflict with an existing resource.',
      },
    },
    'application/problem+xml': {
      schema: resolver(ProblemSchema),
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
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/forbidden',
        title: 'Forbidden',
        status: 403,
        detail: 'Access is forbidden for the provided credentials.',
      },
    },
    'application/problem+xml': {
      schema: resolver(ProblemSchema),
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
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/internal-server-error',
        title: 'Internal Server Error',
        status: 500,
        detail: 'An unexpected error occurred.',
      },
    },
    'application/problem+xml': {
      schema: resolver(ProblemSchema),
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
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/not-found',
        title: 'Not Found',
        status: 404,
        detail: 'The requested resource was not found.',
      },
    },
    'application/problem+xml': {
      schema: resolver(ProblemSchema),
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
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/too-many-requests',
        title: 'Too Many Requests',
        status: 429,
        detail: 'You have exceeded the rate limit.',
      },
    },
    'application/problem+xml': {
      schema: resolver(ProblemSchema),
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
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail: 'You do not have the necessary permissions.',
      },
    },
    'application/problem+xml': {
      schema: resolver(ProblemSchema),
      example: {
        type: 'https://example.com/errors/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail: 'You do not have the necessary permissions.',
      },
    },
  },
}
