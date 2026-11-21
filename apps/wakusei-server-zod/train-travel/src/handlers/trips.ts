import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      origin: z.uuid(),
      destination: z.uuid(),
      date: z.iso.datetime({ offset: true }),
      bicycles: z.stringbool().default(false).exactOptional(),
      dogs: z.stringbool().default(false).exactOptional(),
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
  .handler(async ({ input }) => {})
