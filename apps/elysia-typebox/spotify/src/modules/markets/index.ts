import { Elysia } from 'elysia'
import { ErrorObjectSchema } from '../../components/schemas'
import { MarketsModel } from './model'

export const markets = new Elysia()
  .model({ ErrorObject: ErrorObjectSchema })
  .get('/markets', () => { throw new Error('Not implemented') }, {
    response: {
      200: MarketsModel.getAvailableMarketsResponse200,
      401: MarketsModel.getAvailableMarketsResponse401,
      403: MarketsModel.getAvailableMarketsResponse403,
      429: MarketsModel.getAvailableMarketsResponse429,
    },
    detail: {
      tags: ['Markets'],
      summary: 'Get Available Markets\n',
      description: 'Get the list of markets where Spotify is available.\n',
      operationId: 'get-available-markets',
      security: [{ oauth_2_0: [] }],
    },
  })
