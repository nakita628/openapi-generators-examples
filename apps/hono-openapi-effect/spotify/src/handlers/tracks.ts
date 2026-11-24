import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Schema } from 'effect'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  OneTrackResponse,
  ManyTracksResponse,
} from '../components'

export const tracksHandler = new Hono()
  .get(
    '/tracks/:id',
    describeRoute({
      tags: ['Tracks'],
      operationId: 'get-track',
      summary: 'Get Track\n',
      description:
        'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
      responses: {
        '200': OneTrackResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
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
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          market: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/tracks',
    describeRoute({
      deprecated: true,
      tags: ['Tracks'],
      operationId: 'get-several-tracks',
      summary: 'Get Several Tracks\n',
      description:
        'Get Spotify catalog information for multiple tracks based on their Spotify IDs.\n',
      responses: {
        '200': ManyTracksResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          market: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
