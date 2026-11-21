import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  sValidator(
    'param',
    Schema.toStandardSchemaV1(
      Schema.Struct({
        id: Schema.String.annotate({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
          jsonSchemaExamples: ['11dFghVXANMlKmJXsNCbNl'],
        }),
      }),
    ),
  ),
  (c) => {},
)
