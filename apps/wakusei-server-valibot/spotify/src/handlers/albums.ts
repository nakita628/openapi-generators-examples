import { os } from '@orpc/server'
import * as v from 'valibot'
import { AlbumObjectSchema, PagingSimplifiedTrackObjectSchema } from '../components'

export const getAlbumsId = os
  .route({
    method: 'GET',
    path: '/albums/{id}',
    tags: ['Albums'],
    summary: 'Get Album\n',
    description: 'Get Spotify catalog information for a single album.\n',
    successDescription: 'An album',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
        ),
        v.metadata({ examples: ['4aawyAB9vmqN3uQ7FjRGTy'] }),
      ),
      market: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          ),
          v.metadata({ examples: ['ES'] }),
        ),
      ),
    }),
  )
  .output(AlbumObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getAlbums = os
  .route({
    method: 'GET',
    path: '/albums',
    tags: ['Albums'],
    summary: 'Get Several Albums\n',
    description:
      'Get Spotify catalog information for multiple albums identified by their Spotify IDs.\n',
    deprecated: true,
    successDescription: 'A set of albums',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
        v.metadata({
          examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
        }),
      ),
      market: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          ),
          v.metadata({ examples: ['ES'] }),
        ),
      ),
    }),
  )
  .output(v.object({ albums: v.array(AlbumObjectSchema) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getAlbumsIdTracks = os
  .route({
    method: 'GET',
    path: '/albums/{id}/tracks',
    tags: ['Albums', 'Tracks'],
    summary: 'Get Album Tracks\n',
    description:
      'Get Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.\n',
    successDescription: 'Pages of tracks',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
        ),
        v.metadata({ examples: ['4aawyAB9vmqN3uQ7FjRGTy'] }),
      ),
      market: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          ),
          v.metadata({ examples: ['ES'] }),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(1),
              v.maxValue(50),
            ),
            '20',
          ),
          v.description(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
          v.metadata({ examples: [10] }),
        ),
      ),
      offset: v.optional(
        v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '0',
          ),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      ),
    }),
  )
  .output(PagingSimplifiedTrackObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
