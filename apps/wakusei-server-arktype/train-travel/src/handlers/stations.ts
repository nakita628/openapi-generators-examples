import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type(type(WrapperCollectionSchema).and(type({ 'data?': type(StationSchema).array() }))).and(
      type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }),
    ),
  )
  .handler(async ({ input }) => {})
