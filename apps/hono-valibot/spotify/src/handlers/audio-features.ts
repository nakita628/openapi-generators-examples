import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    sValidator(
      'query',
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
          ),
          v.metadata({
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio-features/:id',
    sValidator(
      'param',
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
          ),
          v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
