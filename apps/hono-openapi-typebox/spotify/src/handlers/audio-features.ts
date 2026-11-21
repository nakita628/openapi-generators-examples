import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type } from 'typebox'
import { Compile } from 'typebox/compile'
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
      Compile(
        Type.Object({
          ids: Type.String({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        }),
      ),
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
      Compile(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            examples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
