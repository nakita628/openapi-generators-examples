import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  StationSchema,
  WrapperCollectionSchema,
} from '../components'

const t = initTRPC.create()

export const stationsRouter = t.router({
  getStations: t.procedure
    .output(
      type(type(WrapperCollectionSchema).and(type({ 'data?': type(StationSchema).array() }))).and(
        type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
