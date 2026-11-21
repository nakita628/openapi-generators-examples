import { Elysia, t } from 'elysia'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  StationSchema,
  WrapperCollectionSchema,
} from '../../components/schemas'
import { StationsModel } from './model'

export const stations = new Elysia()
  .model({
    LinksPagination: LinksPaginationSchema,
    LinksSelf: LinksSelfSchema,
    Station: StationSchema,
    WrapperCollection: WrapperCollectionSchema,
  })
  .get('/stations', () => {}, {
    response: {
      200: StationsModel.getStationsResponse200,
      400: t.Void(),
      401: t.Void(),
      403: t.Void(),
      429: t.Void(),
      500: t.Void(),
    },
    detail: {
      tags: ['Stations'],
      summary: 'Get a list of train stations',
      description: 'Returns a list of all train stations in the system.',
      operationId: 'get-stations',
    },
  })
