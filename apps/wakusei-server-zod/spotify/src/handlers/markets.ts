import { os } from '@orpc/server'
import * as z from 'zod'

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
    z.object({
      markets: z
        .array(z.string())
        .meta({ examples: [['CA', 'BR', 'IT']] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => {})
