import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
          examples: ['38bS44xjbVVZ3No3ByF1dJ'],
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
    z.object({
      market: z
        .string()
        .meta({
          description:
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          examples: ['ES'],
        })
        .exactOptional(),
      ids: z
        .string()
        .meta({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
        }),
    }),
  )
  .output(z.object({ shows: z.array(SimplifiedShowObjectSchema) }))
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
    z.object({
      id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
          examples: ['38bS44xjbVVZ3No3ByF1dJ'],
        }),
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
  )
  .output(PagingSimplifiedEpisodeObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
