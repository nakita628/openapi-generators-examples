import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      origin: type('string.uuid'),
      destination: type('string.uuid'),
      date: type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'bicycles?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'dogs?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(
    type(type(WrapperCollectionSchema).and(type({ 'data?': type(TripSchema).array() }))).and(
      type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
