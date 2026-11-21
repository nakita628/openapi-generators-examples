import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  OneShowResponse,
  ManySimplifiedShowsResponse,
  PagingSimplifiedEpisodeObjectResponse,
} from '../components'

export const showsHandler = new Hono()
  .get(
    '/shows/:id',
    describeRoute({
      tags: ['Shows'],
      operationId: 'get-a-show',
      summary: 'Get Show\n',
      description:
        'Get Spotify catalog information for a single show identified by its\nunique Spotify ID.\n',
      responses: {
        '200': OneShowResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
            examples: ['38bS44xjbVVZ3No3ByF1dJ'],
          }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          market: Type.Optional(
            Type.String({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              examples: ['ES'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/shows',
    describeRoute({
      deprecated: true,
      tags: ['Shows'],
      operationId: 'get-multiple-shows',
      summary: 'Get Several Shows\n',
      description:
        'Get Spotify catalog information for several shows based on their Spotify IDs.\n',
      responses: {
        '200': ManySimplifiedShowsResponse,
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
          market: Type.Optional(
            Type.String({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              examples: ['ES'],
            }),
          ),
          ids: Type.String({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/shows/:id/episodes',
    describeRoute({
      tags: ['Shows', 'Episodes'],
      operationId: 'get-a-shows-episodes',
      summary: 'Get Show Episodes\n',
      description:
        'Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n',
      responses: {
        '200': PagingSimplifiedEpisodeObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
            examples: ['38bS44xjbVVZ3No3ByF1dJ'],
          }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          market: Type.Optional(
            Type.String({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              examples: ['ES'],
            }),
          ),
          limit: Type.Optional(
            Codec(Type.String({ default: '20' }))
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          offset: Type.Optional(
            Codec(Type.String({ default: '0' }))
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
