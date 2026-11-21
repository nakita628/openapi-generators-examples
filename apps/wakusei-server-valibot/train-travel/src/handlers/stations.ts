import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.intersect([
      WrapperCollectionSchema,
      v.partial(v.object({ data: v.array(StationSchema) })),
      v.partial(v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) })),
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
