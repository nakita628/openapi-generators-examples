import { defineHandler } from 'hono/factory'
import * as z from 'zod'

export const StationSchema = z.object({
  id: z
    .uuid()
    .meta({
      description: 'Unique identifier for the station.',
      examples: ['efdbb9d1-02c2-4bc3-afb7-6788d8782b1e', 'b2e783e1-c824-4d63-b37a-d8d698862f1d'],
    }),
  name: z
    .string()
    .meta({
      description: 'The name of the station',
      examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
    }),
  address: z
    .string()
    .meta({
      description: 'The address of the station.',
      examples: [
        'Invalidenstraße 10557 Berlin, Germany',
        '18 Rue de Dunkerque 75010 Paris, France',
      ],
    }),
  country_code: z
    .string()
    .meta({ description: 'The country code of the station.', examples: ['DE', 'FR'] }),
  timezone: z
    .string()
    .meta({
      description:
        'The timezone of the station in the [IANA Time Zone Database format](https://www.iana.org/time-zones).',
      examples: ['Europe/Berlin', 'Europe/Paris'],
    })
    .exactOptional(),
})

export type Station = z.infer<typeof StationSchema>

export const LinksSelfSchema = z.object({ self: z.url().exactOptional() })

export type LinksSelf = z.infer<typeof LinksSelfSchema>

export const LinksPaginationSchema = z.object({
  next: z.url().exactOptional(),
  prev: z.url().exactOptional(),
})

export type LinksPagination = z.infer<typeof LinksPaginationSchema>

export const ProblemSchema = z.object({
  type: z
    .string()
    .meta({
      description: 'A URI reference that identifies the problem type',
      examples: ['https://example.com/probs/out-of-credit'],
    })
    .exactOptional(),
  title: z
    .string()
    .meta({
      description: 'A short, human-readable summary of the problem type',
      examples: ['You do not have enough credit.'],
    })
    .exactOptional(),
  detail: z
    .string()
    .meta({
      description: 'A human-readable explanation specific to this occurrence of the problem',
      examples: ['Your current balance is 30, but that costs 50.'],
    })
    .exactOptional(),
  instance: z
    .string()
    .meta({
      description: 'A URI reference that identifies the specific occurrence of the problem',
      examples: ['/account/12345/msgs/abc'],
    })
    .exactOptional(),
  status: z
    .int()
    .meta({ description: 'The HTTP status code', examples: [400] })
    .exactOptional(),
})

export type Problem = z.infer<typeof ProblemSchema>

export const TripSchema = z.object({
  id: z
    .uuid()
    .meta({
      description: 'Unique identifier for the trip',
      examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
    })
    .exactOptional(),
  origin: z
    .string()
    .meta({
      description: 'The starting station of the trip',
      examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
    })
    .exactOptional(),
  destination: z
    .string()
    .meta({
      description: 'The destination station of the trip',
      examples: ['Paris Gare du Nord', 'Berlin Hauptbahnhof'],
    })
    .exactOptional(),
  departure_time: z.iso
    .datetime({ offset: true })
    .meta({
      description: 'The date and time when the trip departs',
      examples: ['2024-02-01T10:00:00Z'],
    })
    .exactOptional(),
  arrival_time: z.iso
    .datetime({ offset: true })
    .meta({
      description: 'The date and time when the trip arrives',
      examples: ['2024-02-01T16:00:00Z'],
    })
    .exactOptional(),
  operator: z
    .string()
    .meta({
      description: 'The name of the operator of the trip',
      examples: ['Deutsche Bahn', 'SNCF'],
    })
    .exactOptional(),
  price: z
    .number()
    .meta({ description: 'The cost of the trip', examples: [50] })
    .exactOptional(),
  bicycles_allowed: z
    .boolean()
    .meta({ description: 'Indicates whether bicycles are allowed on the trip' })
    .exactOptional(),
  dogs_allowed: z
    .boolean()
    .meta({ description: 'Indicates whether dogs are allowed on the trip' })
    .exactOptional(),
})

export type Trip = z.infer<typeof TripSchema>

export const BookingSchema = z.object({
  id: z
    .uuid()
    .meta({
      description: 'Unique identifier for the booking',
      examples: ['3f3e3e1-c824-4d63-b37a-d8d698862f1d'],
      readOnly: true,
    })
    .exactOptional(),
  trip_id: z
    .uuid()
    .meta({
      description: 'Identifier of the booked trip',
      examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
    })
    .exactOptional(),
  passenger_name: z
    .string()
    .meta({ description: 'Name of the passenger', examples: ['John Doe'] })
    .exactOptional(),
  has_bicycle: z
    .boolean()
    .meta({ description: 'Indicates whether the passenger has a bicycle.' })
    .exactOptional(),
  has_dog: z
    .boolean()
    .meta({ description: 'Indicates whether the passenger has a dog.' })
    .exactOptional(),
})

export type Booking = z.infer<typeof BookingSchema>

export const WrapperCollectionSchema = z
  .object({
    data: z
      .array(z.object({}))
      .meta({ description: 'The wrapper for a collection is an array of objects.' })
      .exactOptional(),
    links: z
      .object({})
      .meta({
        description: 'A set of hypermedia links which serve as controls for the client.',
        readOnly: true,
      })
      .exactOptional(),
  })
  .meta({
    description:
      'This is a generic request/response wrapper which contains both data and links which serve as hypermedia controls (HATEOAS).',
  })

export type WrapperCollection = z.infer<typeof WrapperCollectionSchema>

export const BookingPaymentSchema = z.object({
  id: z
    .uuid()
    .meta({
      description:
        'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
      readOnly: true,
    })
    .exactOptional(),
  amount: z
    .number()
    .gt(0)
    .meta({
      description:
        'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
      examples: [49.99],
    })
    .exactOptional(),
  currency: z
    .enum(['bam', 'bgn', 'chf', 'eur', 'gbp', 'nok', 'sek', 'try'])
    .meta({
      description:
        'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
    })
    .exactOptional(),
  source: z
    .union([
      z
        .object({
          object: z.literal('card').exactOptional(),
          name: z
            .string()
            .meta({
              description: "Cardholder's full name as it appears on the card.",
              examples: ['Francis Bourgeois'],
            }),
          number: z
            .string()
            .meta({
              description:
                'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
              examples: ['4242424242424242'],
            }),
          cvc: z
            .int()
            .meta({
              description:
                'Card security code, 3 or 4 digits usually found on the back of the card.',
              examples: [123],
              writeOnly: true,
            }),
          exp_month: z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64())
            .meta({
              description: "Two-digit number representing the card's expiration month.",
              examples: [12],
            }),
          exp_year: z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64())
            .meta({
              description: "Four-digit number representing the card's expiration year.",
              examples: [2025],
            }),
          address_line1: z.string().meta({ writeOnly: true }).exactOptional(),
          address_line2: z.string().meta({ writeOnly: true }).exactOptional(),
          address_city: z.string().exactOptional(),
          address_country: z.string(),
          address_post_code: z.string().exactOptional(),
        })
        .meta({ description: 'A card (debit or credit) to take payment from.' }),
      z
        .object({
          object: z.literal('bank_account').exactOptional(),
          name: z.string(),
          number: z
            .string()
            .meta({
              description:
                'The account number for the bank account, in string form. Must be a current account.',
            }),
          sort_code: z
            .string()
            .meta({
              description:
                'The sort code for the bank account, in string form. Must be a six-digit number.',
            })
            .exactOptional(),
          account_type: z
            .enum(['individual', 'company'])
            .meta({
              description:
                'The type of entity that holds the account. This can be either `individual` or `company`.',
            }),
          bank_name: z
            .string()
            .meta({
              description: 'The name of the bank associated with the routing number.',
              examples: ['Starling Bank'],
            }),
          country: z
            .string()
            .meta({ description: 'Two-letter country code (ISO 3166-1 alpha-2).' }),
        })
        .meta({
          description:
            'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
        }),
    ])
    .meta({
      description:
        'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
    })
    .exactOptional(),
  status: z
    .enum(['pending', 'succeeded', 'failed'])
    .meta({
      description: 'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
      readOnly: true,
    })
    .exactOptional(),
})

export type BookingPayment = z.infer<typeof BookingPaymentSchema>

export const LinksBookingSchema = z.object({
  booking: z
    .url()
    .meta({ examples: ['https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb'] })
    .exactOptional(),
})

export type LinksBooking = z.infer<typeof LinksBookingSchema>

export const RateLimitHeaderSchema = z
  .string()
  .meta({ examples: ['limit=10, remaining=0, reset=10'] })
export const RetryAfterHeaderSchema = z.string()

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
  response: z.intersection(
    z.intersection(
      WrapperCollectionSchema,
      z.object({ data: z.array(StationSchema).exactOptional() }),
    ),
    z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
  ),
})

export const getTripsHandler = defineHandler({
  query: z.object({
    origin: z.uuid(),
    destination: z.uuid(),
    date: z.iso.datetime({ offset: true }),
    bicycles: z.stringbool().default(false).exactOptional(),
    dogs: z.stringbool().default(false).exactOptional(),
  }),
  response: z.intersection(
    z.intersection(
      WrapperCollectionSchema,
      z.object({ data: z.array(TripSchema).exactOptional() }),
    ),
    z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
  ),
})

export const getBookingsHandler = defineHandler({
  response: z.intersection(
    z.intersection(
      WrapperCollectionSchema,
      z.object({ data: z.array(BookingSchema).exactOptional() }),
    ),
    z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
  ),
})

export const postBookingsHandler = defineHandler({
  json: BookingSchema,
  response: z.intersection(BookingSchema, z.object({ links: LinksSelfSchema.exactOptional() })),
})

export const getBookingsBookingIdHandler = defineHandler({
  param: z.object({ bookingId: z.uuid() }),
  response: z.intersection(BookingSchema, z.object({ links: LinksSelfSchema.exactOptional() })),
})

export const deleteBookingsBookingIdHandler = defineHandler({
  param: z.object({ bookingId: z.uuid() }),
})

export const postBookingsBookingIdPaymentHandler = defineHandler({
  param: z.object({ bookingId: z.uuid() }),
  json: BookingPaymentSchema,
  response: z.intersection(
    BookingPaymentSchema,
    z.object({ links: LinksBookingSchema.exactOptional() }),
  ),
})
