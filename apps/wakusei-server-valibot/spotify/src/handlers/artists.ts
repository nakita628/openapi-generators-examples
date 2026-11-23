import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  ArtistObjectSchema,
  PagingArtistDiscographyAlbumObjectSchema,
  TrackObjectSchema,
} from '../components'

export const getArtistsId = os
  .route({
    method: 'GET',
    path: '/artists/{id}',
    tags: ['Artists'],
    summary: 'Get Artist\n',
    description:
      'Get Spotify catalog information for a single artist identified by their unique Spotify ID.\n',
    successDescription: 'An artist',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
        v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
      ),
    }),
  )
  .output(ArtistObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getArtists = os
  .route({
    method: 'GET',
    path: '/artists',
    tags: ['Artists'],
    summary: 'Get Several Artists\n',
    description:
      'Get Spotify catalog information for several artists based on their Spotify IDs.\n',
    deprecated: true,
    successDescription: 'A set of artists',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      ),
    }),
  )
  .output(v.object({ artists: v.array(ArtistObjectSchema) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getArtistsIdAlbums = os
  .route({
    method: 'GET',
    path: '/artists/{id}/albums',
    tags: ['Artists', 'Albums'],
    summary: "Get Artist's Albums\n",
    description: "Get Spotify catalog information about an artist's albums.\n",
    successDescription: 'Pages of albums',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
        v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
      ),
      include_groups: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
          ),
          v.metadata({ examples: ['single,appears_on'] }),
        ),
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
              v.minValue(0),
              v.maxValue(10),
            ),
            '5',
          ),
          v.description(
            'The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n',
          ),
          v.metadata({ examples: [5] }),
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
  .output(PagingArtistDiscographyAlbumObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getArtistsIdTopTracks = os
  .route({
    method: 'GET',
    path: '/artists/{id}/top-tracks',
    tags: ['Artists', 'Tracks'],
    summary: "Get Artist's Top Tracks\n",
    description: "Get Spotify catalog information about an artist's top tracks by country.\n",
    deprecated: true,
    successDescription: 'A set of tracks',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
        v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
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
  .output(v.object({ tracks: v.array(TrackObjectSchema) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getArtistsIdRelatedArtists = os
  .route({
    method: 'GET',
    path: '/artists/{id}/related-artists',
    tags: ['Artists'],
    summary: "Get Artist's Related Artists\n",
    description:
      "Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.\n",
    deprecated: true,
    successDescription: 'A set of artists',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
        v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
      ),
    }),
  )
  .output(v.object({ artists: v.array(ArtistObjectSchema) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
