import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  PagingSimplifiedEpisodeObjectSchema,
  ShowObjectSchema,
  SimplifiedShowObjectSchema,
} from '../components'

export const getShowsId = os
  .route({
    method: 'GET',
    path: '/shows/{id}',
    tags: ['Shows'],
    summary: 'Get Show\n',
    description:
      'Get Spotify catalog information for a single show identified by its\nunique Spotify ID.\n',
    successDescription: 'A show',
  })
  .input(
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
    }),
  )
  .output(ShowObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getShows = os
  .route({
    method: 'GET',
    path: '/shows',
    tags: ['Shows'],
    summary: 'Get Several Shows\n',
    description: 'Get Spotify catalog information for several shows based on their Spotify IDs.\n',
    deprecated: true,
    successDescription: 'A set of shows',
  })
  .input(
    type({
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
      ids: type('string').describe(
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
      ),
    }),
  )
  .output(type({ shows: type(SimplifiedShowObjectSchema).array() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getShowsIdEpisodes = os
  .route({
    method: 'GET',
    path: '/shows/{id}/episodes',
    tags: ['Shows', 'Episodes'],
    summary: 'Get Show Episodes\n',
    description:
      'Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n',
    successDescription: 'Pages of episodes',
  })
  .input(
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 50')
        .describe('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
    }),
  )
  .output(PagingSimplifiedEpisodeObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
