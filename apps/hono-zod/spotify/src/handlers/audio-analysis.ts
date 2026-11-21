import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  sValidator(
    'param',
    z.object({
      id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
          examples: ['11dFghVXANMlKmJXsNCbNl'],
        }),
    }),
  ),
  (c) => {},
)
