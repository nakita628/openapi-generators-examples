import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ManyAlbumsResponse,
  OneAlbumResponse,
  PagingSimplifiedTrackObjectResponse,
} from '../components'

export const albumsHandler = new Hono()
  .get(
    '/albums/:id',
    describeRoute({
      operationId: 'get-an-album',
      tags: ['Albums'],
      summary: 'Get Album\n',
      description: 'Get Spotify catalog information for a single album.\n',
      responses: {
        '200': OneAlbumResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
            examples: ['4aawyAB9vmqN3uQ7FjRGTy'],
          }),
      }),
    ),
    validator(
      'query',
      z.object({
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/albums',
    describeRoute({
      deprecated: true,
      operationId: 'get-multiple-albums',
      tags: ['Albums'],
      summary: 'Get Several Albums\n',
      description:
        'Get Spotify catalog information for multiple albums identified by their Spotify IDs.\n',
      responses: {
        '200': ManyAlbumsResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
            examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
          }),
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/albums/:id/tracks',
    describeRoute({
      operationId: 'get-an-albums-tracks',
      tags: ['Albums', 'Tracks'],
      summary: 'Get Album Tracks\n',
      description:
        'Get Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.\n',
      responses: {
        '200': PagingSimplifiedTrackObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
            examples: ['4aawyAB9vmqN3uQ7FjRGTy'],
          }),
      }),
    ),
    validator(
      'query',
      z.object({
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
        limit: z.coerce
          .number()
          .int()
          .min(1)
          .max(50)
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z.coerce
          .number()
          .int()
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
