import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  ArtistObjectSchema,
  PagingArtistDiscographyAlbumObjectSchema,
  TrackObjectSchema,
} from '../components'

const t = initTRPC.create()

export const artistsRouter = t.router({
  getArtistsId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getArtists: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getArtistsIdAlbums: t.procedure
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
        limit: v.pipe(
          v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(10)), 5),
          v.description(
            'The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
        offset: v.pipe(
          v.optional(v.pipe(v.number(), v.integer()), 0),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
    )
    .output(PagingArtistDiscographyAlbumObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getArtistsIdTopTracks: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getArtistsIdRelatedArtists: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
