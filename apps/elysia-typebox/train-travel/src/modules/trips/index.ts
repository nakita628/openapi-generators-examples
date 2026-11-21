import { Elysia, t } from 'elysia'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  TripSchema,
  WrapperCollectionSchema,
} from '../../components/schemas'
import { TripsModel } from './model'

export const trips = new Elysia()
  .model({
    LinksPagination: LinksPaginationSchema,
    LinksSelf: LinksSelfSchema,
    Trip: TripSchema,
    WrapperCollection: WrapperCollectionSchema,
  })
  .get('/trips', ({ query }) => {}, {
    query: TripsModel.getTripsQuery,
    response: {
      200: TripsModel.getTripsResponse200,
      400: t.Void(),
      401: t.Void(),
      403: t.Void(),
      429: t.Void(),
      500: t.Void(),
    },
    detail: {
      tags: ['Trips'],
      summary: 'Get available train trips',
      description:
        'Returns a list of available train trips between the specified origin and destination stations on the given date, and allows for filtering by bicycle and dog allowances.',
      operationId: 'get-trips',
    },
  })
