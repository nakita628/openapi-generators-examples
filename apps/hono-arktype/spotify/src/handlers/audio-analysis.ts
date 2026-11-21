import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  sValidator(
    'param',
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
      ),
    }),
  ),
  (c) => { throw new Error('Not implemented') },
)
