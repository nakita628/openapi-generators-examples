import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/audio-features/:id',
    sValidator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            examples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
      }),
    ),
    (c) => {},
  )
