import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.intersect([
        WrapperCollectionSchema,
        v.partial(v.object({ data: v.array(StationSchema) })),
        v.partial(v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) })),
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
