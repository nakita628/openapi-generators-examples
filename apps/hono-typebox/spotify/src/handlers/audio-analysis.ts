import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  tbValidator(
    'param',
    Type.Object({
      id: Type.String({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        examples: ['11dFghVXANMlKmJXsNCbNl'],
      }),
    }),
  ),
  (c) => {},
)
