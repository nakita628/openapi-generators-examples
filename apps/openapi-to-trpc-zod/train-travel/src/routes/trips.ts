import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        origin: z.uuid(),
        destination: z.uuid(),
        date: z.iso.datetime({ offset: true }),
        bicycles: z.boolean().default(false).exactOptional(),
        dogs: z.boolean().default(false).exactOptional(),
      }),
    )
    .output(
      z.intersection(
        z.intersection(
          WrapperCollectionSchema,
          z.object({ data: z.array(TripSchema).exactOptional() }),
        ),
        z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
