import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  TripSchema,
  WrapperCollectionSchema,
} from '../components'

const t = initTRPC.create()

export const tripsRouter = t.router({
  getTrips: t.procedure
    .input(
      type({
        origin: 'string.uuid',
        destination: 'string.uuid',
        date: type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'bicycles?': 'boolean',
        'dogs?': 'boolean',
      }),
    )
    .output(
      type(type(WrapperCollectionSchema).and(type({ 'data?': type(TripSchema).array() }))).and(
        type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
