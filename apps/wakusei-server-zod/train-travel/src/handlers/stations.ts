import { os } from '@orpc/server'
import * as z from 'zod'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  StationSchema,
  WrapperCollectionSchema,
} from '../components'

export const getStations = os
  .route({
    method: 'GET',
    path: '/stations',
    tags: ['Stations'],
    summary: 'Get a list of train stations',
    description: 'Returns a list of all train stations in the system.',
    successDescription: 'A list of train stations',
  })
  .output(
    z.intersection(
      z.intersection(
        WrapperCollectionSchema,
        z.object({ data: z.array(StationSchema).exactOptional() }),
      ),
      z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
