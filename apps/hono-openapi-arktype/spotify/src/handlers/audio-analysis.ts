import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  OneAudioAnalysisResponse,
} from '../components'

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  describeRoute({
    deprecated: true,
    tags: ['Tracks'],
    operationId: 'get-audio-analysis',
    summary: "Get Track's Audio Analysis\n",
    description:
      'Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n',
    responses: {
      '200': OneAudioAnalysisResponse,
      '401': UnauthorizedResponse,
      '403': ForbiddenResponse,
      '429': TooManyRequestsResponse,
    },
    security: [{ oauth_2_0: [] }],
  }),
  validator(
    'param',
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
      ),
    }),
  ),
  (c) => {},
)
