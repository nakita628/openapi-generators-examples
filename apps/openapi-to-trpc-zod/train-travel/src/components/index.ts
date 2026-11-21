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

export type StationSchema = z.infer<typeof StationSchema>

export const LinksSelfSchema = z.object({ self: z.url().exactOptional() })

export type LinksSelfSchema = z.infer<typeof LinksSelfSchema>

export const LinksPaginationSchema = z.object({
  next: z.url().exactOptional(),
  prev: z.url().exactOptional(),
})

export type LinksPaginationSchema = z.infer<typeof LinksPaginationSchema>

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

export type ProblemSchema = z.infer<typeof ProblemSchema>

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

export type TripSchema = z.infer<typeof TripSchema>

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

export type BookingSchema = z.infer<typeof BookingSchema>

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

export type WrapperCollectionSchema = z.infer<typeof WrapperCollectionSchema>

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

export type BookingPaymentSchema = z.infer<typeof BookingPaymentSchema>

export const LinksBookingSchema = z.object({
  booking: z
    .url()
    .meta({ examples: ['https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb'] })
    .exactOptional(),
})

export type LinksBookingSchema = z.infer<typeof LinksBookingSchema>
