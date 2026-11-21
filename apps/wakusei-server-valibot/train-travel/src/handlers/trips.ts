import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  TripSchema,
  WrapperCollectionSchema,
} from '../components'

export const getTrips = os
  .route({
    method: 'GET',
    path: '/trips',
    tags: ['Trips'],
    summary: 'Get available train trips',
    description:
      'Returns a list of available train trips between the specified origin and destination stations on the given date, and allows for filtering by bicycle and dog allowances.',
    successDescription: 'A list of available train trips',
  })
  .input(
    v.object({
      origin: v.pipe(
        v.string(),
        v.regex(
          /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
        ),
      ),
      destination: v.pipe(
        v.string(),
        v.regex(
          /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
        ),
      ),
      date: v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      bicycles: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
      ),
      dogs: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
      ),
    }),
  )
  .output(
    v.intersect([
      WrapperCollectionSchema,
      v.partial(v.object({ data: v.array(TripSchema) })),
      v.partial(v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) })),
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
