import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  sValidator(
    'param',
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        ),
        v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
      ),
    }),
  ),
  (c) => { throw new Error('Not implemented') },
)
