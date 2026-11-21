import { t } from 'elysia'

export const StationSchema = t.Object({
  id: t.String({
    format: 'uuid',
    examples: ['efdbb9d1-02c2-4bc3-afb7-6788d8782b1e', 'b2e783e1-c824-4d63-b37a-d8d698862f1d'],
    description: 'Unique identifier for the station.',
  }),
  name: t.String({
    examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
    description: 'The name of the station',
  }),
  address: t.String({
    examples: ['Invalidenstraße 10557 Berlin, Germany', '18 Rue de Dunkerque 75010 Paris, France'],
    description: 'The address of the station.',
  }),
  country_code: t.String({
    examples: ['DE', 'FR'],
    description: 'The country code of the station.',
  }),
  timezone: t.Optional(
    t.String({
      examples: ['Europe/Berlin', 'Europe/Paris'],
      description:
        'The timezone of the station in the [IANA Time Zone Database format](https://www.iana.org/time-zones).',
    }),
  ),
})

export const LinksSelfSchema = t.Object({ self: t.Optional(t.String({ format: 'uri' })) })

export const LinksPaginationSchema = t.Object({
  next: t.Optional(t.String({ format: 'uri' })),
  prev: t.Optional(t.String({ format: 'uri' })),
})

export const ProblemSchema = t.Object({
  type: t.Optional(
    t.String({
      example: 'https://example.com/probs/out-of-credit',
      description: 'A URI reference that identifies the problem type',
    }),
  ),
  title: t.Optional(
    t.String({
      example: 'You do not have enough credit.',
      description: 'A short, human-readable summary of the problem type',
    }),
  ),
  detail: t.Optional(
    t.String({
      example: 'Your current balance is 30, but that costs 50.',
      description: 'A human-readable explanation specific to this occurrence of the problem',
    }),
  ),
  instance: t.Optional(
    t.String({
      example: '/account/12345/msgs/abc',
      description: 'A URI reference that identifies the specific occurrence of the problem',
    }),
  ),
  status: t.Optional(
    t.Integer({ maximum: 9007199254740991, example: 400, description: 'The HTTP status code' }),
  ),
})

export const TripSchema = t.Object({
  id: t.Optional(
    t.String({
      format: 'uuid',
      examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
      description: 'Unique identifier for the trip',
    }),
  ),
  origin: t.Optional(
    t.String({
      examples: ['Berlin Hauptbahnhof', 'Paris Gare du Nord'],
      description: 'The starting station of the trip',
    }),
  ),
  destination: t.Optional(
    t.String({
      examples: ['Paris Gare du Nord', 'Berlin Hauptbahnhof'],
      description: 'The destination station of the trip',
    }),
  ),
  departure_time: t.Optional(
    t.Date({
      examples: ['2024-02-01T10:00:00Z'],
      description: 'The date and time when the trip departs',
    }),
  ),
  arrival_time: t.Optional(
    t.Date({
      examples: ['2024-02-01T16:00:00Z'],
      description: 'The date and time when the trip arrives',
    }),
  ),
  operator: t.Optional(
    t.String({
      examples: ['Deutsche Bahn', 'SNCF'],
      description: 'The name of the operator of the trip',
    }),
  ),
  price: t.Optional(t.Number({ examples: [50], description: 'The cost of the trip' })),
  bicycles_allowed: t.Optional(
    t.Boolean({ description: 'Indicates whether bicycles are allowed on the trip' }),
  ),
  dogs_allowed: t.Optional(
    t.Boolean({ description: 'Indicates whether dogs are allowed on the trip' }),
  ),
})

export const BookingSchema = t.Object({
  id: t.ReadonlyOptional(
    t.String({
      format: 'uuid',
      examples: ['3f3e3e1-c824-4d63-b37a-d8d698862f1d'],
      description: 'Unique identifier for the booking',
      readOnly: true,
    }),
  ),
  trip_id: t.Optional(
    t.String({
      format: 'uuid',
      examples: ['4f4e4e1-c824-4d63-b37a-d8d698862f1d'],
      description: 'Identifier of the booked trip',
    }),
  ),
  passenger_name: t.Optional(
    t.String({ examples: ['John Doe'], description: 'Name of the passenger' }),
  ),
  has_bicycle: t.Optional(
    t.Boolean({ description: 'Indicates whether the passenger has a bicycle.' }),
  ),
  has_dog: t.Optional(t.Boolean({ description: 'Indicates whether the passenger has a dog.' })),
})

export const WrapperCollectionSchema = t.Object(
  {
    data: t.Optional(
      t.Array(t.Object({}), {
        description: 'The wrapper for a collection is an array of objects.',
      }),
    ),
    links: t.ReadonlyOptional(
      t.Object(
        {},
        {
          description: 'A set of hypermedia links which serve as controls for the client.',
          readOnly: true,
        },
      ),
    ),
  },
  {
    description:
      'This is a generic request/response wrapper which contains both data and links which serve as hypermedia controls (HATEOAS).',
  },
)

export const BookingPaymentSchema = t.Object({
  id: t.ReadonlyOptional(
    t.String({
      format: 'uuid',
      description:
        'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
      readOnly: true,
    }),
  ),
  amount: t.Optional(
    t.Number({
      exclusiveMinimum: 0,
      examples: [49.99],
      description:
        'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
    }),
  ),
  currency: t.Optional(
    t.UnionEnum(['bam', 'bgn', 'chf', 'eur', 'gbp', 'nok', 'sek', 'try'], {
      description:
        'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
      default: undefined,
    }),
  ),
  source: t.Optional(
    t.Union(
      [
        t.Object(
          {
            object: t.Optional(t.Literal('card')),
            name: t.String({
              examples: ['Francis Bourgeois'],
              description: "Cardholder's full name as it appears on the card.",
            }),
            number: t.String({
              examples: ['4242424242424242'],
              description:
                'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
            }),
            cvc: t.Integer({
              maximum: 9007199254740991,
              example: 123,
              description:
                'Card security code, 3 or 4 digits usually found on the back of the card.',
              writeOnly: true,
            }),
            exp_month: t.Integer({
              format: 'int64',
              maximum: 9007199254740991,
              examples: [12],
              description: "Two-digit number representing the card's expiration month.",
            }),
            exp_year: t.Integer({
              format: 'int64',
              maximum: 9007199254740991,
              examples: [2025],
              description: "Four-digit number representing the card's expiration year.",
            }),
            address_line1: t.Optional(t.String({ writeOnly: true })),
            address_line2: t.Optional(t.String({ writeOnly: true })),
            address_city: t.Optional(t.String()),
            address_country: t.String(),
            address_post_code: t.Optional(t.String()),
          },
          { title: 'Card', description: 'A card (debit or credit) to take payment from.' },
        ),
        t.Object(
          {
            object: t.Optional(t.Literal('bank_account')),
            name: t.String(),
            number: t.String({
              description:
                'The account number for the bank account, in string form. Must be a current account.',
            }),
            sort_code: t.Optional(
              t.String({
                description:
                  'The sort code for the bank account, in string form. Must be a six-digit number.',
              }),
            ),
            account_type: t.UnionEnum(['individual', 'company'], {
              description:
                'The type of entity that holds the account. This can be either `individual` or `company`.',
              default: undefined,
            }),
            bank_name: t.String({
              examples: ['Starling Bank'],
              description: 'The name of the bank associated with the routing number.',
            }),
            country: t.String({ description: 'Two-letter country code (ISO 3166-1 alpha-2).' }),
          },
          {
            title: 'Bank Account',
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
  status: t.ReadonlyOptional(
    t.UnionEnum(['pending', 'succeeded', 'failed'], {
      description: 'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
      readOnly: true,
      default: undefined,
    }),
  ),
})

export const LinksBookingSchema = t.Object({
  booking: t.Optional(
    t.String({
      format: 'uri',
      examples: ['https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb'],
    }),
  ),
})
