import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
            jsonSchemaExamples: [
              '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio-features/:id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.annotate({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            jsonSchemaExamples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
