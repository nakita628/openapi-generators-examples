import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio-features/:id',
    tbValidator(
      'param',
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
          examples: ['11dFghVXANMlKmJXsNCbNl'],
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
