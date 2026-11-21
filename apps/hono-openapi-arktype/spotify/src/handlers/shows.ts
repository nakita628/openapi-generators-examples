import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { type } from 'arktype'
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
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
      }),
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
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
      }),
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
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 50')
          .describe(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
