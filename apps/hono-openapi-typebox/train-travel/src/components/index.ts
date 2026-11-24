import { resolver, validator } from 'hono-openapi'
import { Type, type Static, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const StationSchema = Type.Object(
  {
    id: Type.String({
      format: 'uuid',
      description: 'Unique identifier for the station.',
      examples: ['efdbb9d1-02c2-4bc3-afb7-6788d8782b1e', 'b2e783e1-c824-4d63-b37a-d8d698862f1d'],
    }),
    name: Type.String({
      description: 'The name of the station',
      examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
    }),
    address: Type.String({
      description: 'The address of the station.',
      examples: [
        'Invalidenstraße 10557 Berlin, Germany',
        '18 Rue de Dunkerque 75010 Paris, France',
      ],
    }),
    country_code: Type.String({
      description: 'The country code of the station.',
      examples: ['DE', 'FR'],
    }),
    timezone: Type.Optional(
      Type.String({
        description:
          'The timezone of the station in the [IANA Time Zone Database format](https://www.iana.org/time-zones).',
        examples: ['Europe/Berlin', 'Europe/Paris'],
      }),
    ),
  },
  { ref: 'Station' },
)

export type Station = Static<typeof StationSchema>

export const LinksSelfSchema = Type.Object(
  { self: Type.Optional(Type.String({ format: 'uri' })) },
  { ref: 'Links-Self' },
)

export type LinksSelf = Static<typeof LinksSelfSchema>

export const LinksPaginationSchema = Type.Object(
  {
    next: Type.Optional(Type.String({ format: 'uri' })),
    prev: Type.Optional(Type.String({ format: 'uri' })),
  },
  { ref: 'Links-Pagination' },
)

export type LinksPagination = Static<typeof LinksPaginationSchema>

export const ProblemSchema = Type.Object(
  {
    type: Type.Optional(
      Type.String({
        description: 'A URI reference that identifies the problem type',
        examples: ['https://example.com/probs/out-of-credit'],
      }),
    ),
    title: Type.Optional(
      Type.String({
        description: 'A short, human-readable summary of the problem type',
        examples: ['You do not have enough credit.'],
      }),
    ),
    detail: Type.Optional(
      Type.String({
        description: 'A human-readable explanation specific to this occurrence of the problem',
        examples: ['Your current balance is 30, but that costs 50.'],
      }),
    ),
    instance: Type.Optional(
      Type.String({
        description: 'A URI reference that identifies the specific occurrence of the problem',
        examples: ['/account/12345/msgs/abc'],
      }),
    ),
    status: Type.Optional(Type.Integer({ description: 'The HTTP status code', examples: [400] })),
  },
  { ref: 'Problem' },
)

export type Problem = Static<typeof ProblemSchema>

export const TripSchema = Type.Object(
  {
    id: Type.Optional(
      Type.String({
        format: 'uuid',
        description: 'Unique identifier for the trip',
        examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
      }),
    ),
    origin: Type.Optional(
      Type.String({
        description: 'The starting station of the trip',
        examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
      }),
    ),
    destination: Type.Optional(
      Type.String({
        description: 'The destination station of the trip',
        examples: ['Paris Gare du Nord', 'Berlin Hauptbahnhof'],
      }),
    ),
    departure_time: Type.Optional(
      Type.String({
        format: 'date-time',
        description: 'The date and time when the trip departs',
        examples: ['2024-02-01T10:00:00Z'],
      }),
    ),
    arrival_time: Type.Optional(
      Type.String({
        format: 'date-time',
        description: 'The date and time when the trip arrives',
        examples: ['2024-02-01T16:00:00Z'],
      }),
    ),
    operator: Type.Optional(
      Type.String({
        description: 'The name of the operator of the trip',
        examples: ['Deutsche Bahn', 'SNCF'],
      }),
    ),
    price: Type.Optional(Type.Number({ description: 'The cost of the trip', examples: [50] })),
    bicycles_allowed: Type.Optional(
      Type.Boolean({ description: 'Indicates whether bicycles are allowed on the trip' }),
    ),
    dogs_allowed: Type.Optional(
      Type.Boolean({ description: 'Indicates whether dogs are allowed on the trip' }),
    ),
  },
  { ref: 'Trip' },
)

export type Trip = Static<typeof TripSchema>

export const BookingSchema = Type.Object(
  {
    id: Type.Optional(
      Type.String({
        format: 'uuid',
        description: 'Unique identifier for the booking',
        examples: ['3f3e3e1-c824-4d63-b37a-d8d698862f1d'],
        readOnly: true,
      }),
    ),
    trip_id: Type.Optional(
      Type.String({
        format: 'uuid',
        description: 'Identifier of the booked trip',
        examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
      }),
    ),
    passenger_name: Type.Optional(
      Type.String({ description: 'Name of the passenger', examples: ['John Doe'] }),
    ),
    has_bicycle: Type.Optional(
      Type.Boolean({ description: 'Indicates whether the passenger has a bicycle.' }),
    ),
    has_dog: Type.Optional(
      Type.Boolean({ description: 'Indicates whether the passenger has a dog.' }),
    ),
  },
  { ref: 'Booking' },
)

export type Booking = Static<typeof BookingSchema>

export const WrapperCollectionSchema = Type.Object(
  {
    data: Type.Optional(
      Type.Array(Type.Object({}), {
        description: 'The wrapper for a collection is an array of objects.',
      }),
    ),
    links: Type.Optional(
      Type.Object(
        {},
        {
          description: 'A set of hypermedia links which serve as controls for the client.',
          readOnly: true,
        },
      ),
    ),
  },
  {
    ref: 'Wrapper-Collection',
    description:
      'This is a generic request/response wrapper which contains both data and links which serve as hypermedia controls (HATEOAS).',
  },
)

export type WrapperCollection = Static<typeof WrapperCollectionSchema>

export const BookingPaymentSchema = Type.Object(
  {
    id: Type.Optional(
      Type.String({
        format: 'uuid',
        description:
          'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
        readOnly: true,
      }),
    ),
    amount: Type.Optional(
      Type.Number({
        exclusiveMinimum: 0,
        description:
          'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
        examples: [49.99],
      }),
    ),
    currency: Type.Optional(
      Type.Union(
        [
          Type.Literal('bam'),
          Type.Literal('bgn'),
          Type.Literal('chf'),
          Type.Literal('eur'),
          Type.Literal('gbp'),
          Type.Literal('nok'),
          Type.Literal('sek'),
          Type.Literal('try'),
        ],
        {
          description:
            'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
        },
      ),
    ),
    source: Type.Optional(
      Type.Union(
        [
          Type.Object(
            {
              object: Type.Optional(Type.Literal('card')),
              name: Type.String({
                description: "Cardholder's full name as it appears on the card.",
                examples: ['Francis Bourgeois'],
              }),
              number: Type.String({
                description:
                  'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
                examples: ['4242424242424242'],
              }),
              cvc: Type.Integer({
                description:
                  'Card security code, 3 or 4 digits usually found on the back of the card.',
                examples: [123],
                writeOnly: true,
              }),
              exp_month: Type.Integer({
                description: "Two-digit number representing the card's expiration month.",
                examples: [12],
              }),
              exp_year: Type.Integer({
                description: "Four-digit number representing the card's expiration year.",
                examples: [2025],
              }),
              address_line1: Type.Optional(Type.String({ writeOnly: true })),
              address_line2: Type.Optional(Type.String({ writeOnly: true })),
              address_city: Type.Optional(Type.String()),
              address_country: Type.String(),
              address_post_code: Type.Optional(Type.String()),
            },
            { description: 'A card (debit or credit) to take payment from.' },
          ),
          Type.Object(
            {
              object: Type.Optional(Type.Literal('bank_account')),
              name: Type.String(),
              number: Type.String({
                description:
                  'The account number for the bank account, in string form. Must be a current account.',
              }),
              sort_code: Type.Optional(
                Type.String({
                  description:
                    'The sort code for the bank account, in string form. Must be a six-digit number.',
                }),
              ),
              account_type: Type.Union([Type.Literal('individual'), Type.Literal('company')], {
                description:
                  'The type of entity that holds the account. This can be either `individual` or `company`.',
              }),
              bank_name: Type.String({
                description: 'The name of the bank associated with the routing number.',
                examples: ['Starling Bank'],
              }),
              country: Type.String({
                description: 'Two-letter country code (ISO 3166-1 alpha-2).',
              }),
            },
            {
              description:
                'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
            },
          ),
        ],
        {
          description:
            'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
        },
      ),
    ),
    status: Type.Optional(
      Type.Union([Type.Literal('pending'), Type.Literal('succeeded'), Type.Literal('failed')], {
        description: 'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
        readOnly: true,
      }),
    ),
  },
  { ref: 'BookingPayment' },
)

export type BookingPayment = Static<typeof BookingPaymentSchema>

export const LinksBookingSchema = Type.Object(
  {
    booking: Type.Optional(
      Type.String({
        format: 'uri',
        examples: ['https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb'],
      }),
    ),
  },
  { ref: 'Links-Booking' },
)

export type LinksBooking = Static<typeof LinksBookingSchema>

export const RateLimitHeaderSchema = resolver(
  toStandardSchemaV1(Type.String({ examples: ['limit=10, remaining=0, reset=10'] })),
)
export const RetryAfterHeaderSchema = resolver(toStandardSchemaV1(Type.String()))

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
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/bad-request',
        title: 'Bad Request',
        status: 400,
        detail: 'The request is invalid or missing required parameters.',
      },
    },
    'application/problem+xml': {
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
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
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/conflict',
        title: 'Conflict',
        status: 409,
        detail: 'There is a conflict with an existing resource.',
      },
    },
    'application/problem+xml': {
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
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
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/forbidden',
        title: 'Forbidden',
        status: 403,
        detail: 'Access is forbidden for the provided credentials.',
      },
    },
    'application/problem+xml': {
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
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
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/internal-server-error',
        title: 'Internal Server Error',
        status: 500,
        detail: 'An unexpected error occurred.',
      },
    },
    'application/problem+xml': {
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
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
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/not-found',
        title: 'Not Found',
        status: 404,
        detail: 'The requested resource was not found.',
      },
    },
    'application/problem+xml': {
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
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
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/too-many-requests',
        title: 'Too Many Requests',
        status: 429,
        detail: 'You have exceeded the rate limit.',
      },
    },
    'application/problem+xml': {
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
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
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail: 'You do not have the necessary permissions.',
      },
    },
    'application/problem+xml': {
      schema: resolver(toStandardSchemaV1(ProblemSchema)),
      example: {
        type: 'https://example.com/errors/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail: 'You do not have the necessary permissions.',
      },
    },
  },
}
