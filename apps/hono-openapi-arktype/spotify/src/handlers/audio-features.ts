import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ManyAudioFeaturesResponse,
  OneAudioFeaturesResponse,
} from '../components'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    describeRoute({
      deprecated: true,
      tags: ['Tracks'],
      operationId: 'get-several-audio-features',
      summary: "Get Several Tracks' Audio Features\n",
      description: 'Get audio features for multiple tracks based on their Spotify IDs.\n',
      responses: {
        '200': ManyAudioFeaturesResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio-features/:id',
    describeRoute({
      deprecated: true,
      tags: ['Tracks'],
      operationId: 'get-audio-features',
      summary: "Get Track's Audio Features\n",
      description:
        'Get audio feature information for a single track identified by its unique\nSpotify ID.\n',
      responses: {
        '200': OneAudioFeaturesResponse,
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
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
