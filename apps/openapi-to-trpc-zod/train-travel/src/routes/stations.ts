import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.intersection(
        z.intersection(
          WrapperCollectionSchema,
          z.object({ data: z.array(StationSchema).exactOptional() }),
        ),
        z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
