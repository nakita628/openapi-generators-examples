import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/audio-features/:id',
    sValidator(
      'param',
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
        ),
      }),
    ),
    (c) => {},
  )
