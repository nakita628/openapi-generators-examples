import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  NotFoundResponse,
  BadRequestResponse,
  TooManyRequestsResponse,
  ManyAudiobooksResponse,
  OneAudiobookResponse,
  PagingSimplifiedChapterObjectResponse,
} from '../components'

export const audiobooksHandler = new Hono()
  .get(
    '/audiobooks/:id',
    describeRoute({
      operationId: 'get-an-audiobook',
      tags: ['Audiobooks'],
      summary: 'Get an Audiobook\n',
      description:
        'Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      responses: {
        '200': OneAudiobookResponse,
        '400': BadRequestResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '404': NotFoundResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
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
    '/audiobooks',
    describeRoute({
      deprecated: true,
      operationId: 'get-multiple-audiobooks',
      tags: ['Audiobooks'],
      summary: 'Get Several Audiobooks\n',
      description:
        'Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      responses: {
        '200': ManyAudiobooksResponse,
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
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audiobooks/:id/chapters',
    describeRoute({
      operationId: 'get-audiobook-chapters',
      tags: ['Audiobooks', 'Chapters'],
      summary: 'Get Audiobook Chapters\n',
      description:
        "Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n",
      responses: {
        '200': PagingSimplifiedChapterObjectResponse,
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
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
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
