import { os } from '@orpc/server'
import * as v from 'valibot'

export const getMarkets = os
  .route({
    method: 'GET',
    path: '/markets',
    tags: ['Markets'],
    summary: 'Get Available Markets\n',
    description: 'Get the list of markets where Spotify is available.\n',
    deprecated: true,
    successDescription: 'A markets object with an array of country codes',
  })
  .output(
    v.partial(
      v.object({
        markets: v.pipe(v.array(v.string()), v.metadata({ examples: [['CA', 'BR', 'IT']] })),
      }),
    ),
  )
  .handler(async ({ input }) => {})
