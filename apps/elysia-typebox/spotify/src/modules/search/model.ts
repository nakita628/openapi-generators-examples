import { t, type UnwrapSchema } from 'elysia'
import {
  ErrorObjectSchema,
  PagingArtistObjectSchema,
  PagingPlaylistObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
  PagingSimplifiedAudiobookObjectSchema,
  PagingSimplifiedEpisodeObjectSchema,
  PagingSimplifiedShowObjectSchema,
  PagingTrackObjectSchema,
} from '../../components/schemas'

export const SearchModel = {
  searchQuery: t.Object({
    q: t.String({
      example: 'remaster%20track:Doxy%20artist:Miles%20Davis',
      title: 'Query',
      description:
        'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
    }),
    type: t.Array(
      t.UnionEnum(['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook'], {
        default: undefined,
      }),
      {
        title: 'Item type',
        description:
          'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
      },
    ),
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 10,
        example: 10,
        title: 'Limit',
        description: 'The maximum number of results to return in each item type.\n',
        default: 5,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 1000,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first result to return. Use\nwith limit to get the next page of search results.\n',
        default: 0,
      }),
    ),
    include_external: t.Optional(
      t.Literal('audio', {
        title: 'Include External',
        description:
          'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n',
      }),
    ),
  }),
  searchResponse200: t.Object({
    tracks: t.Optional(PagingTrackObjectSchema),
    artists: t.Optional(PagingArtistObjectSchema),
    albums: t.Optional(PagingSimplifiedAlbumObjectSchema),
    playlists: t.Optional(PagingPlaylistObjectSchema),
    shows: t.Optional(PagingSimplifiedShowObjectSchema),
    episodes: t.Optional(PagingSimplifiedEpisodeObjectSchema),
    audiobooks: t.Optional(PagingSimplifiedAudiobookObjectSchema),
  }),
  searchResponse401: t.Object({ error: ErrorObjectSchema }),
  searchResponse403: t.Object({ error: ErrorObjectSchema }),
  searchResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type SearchModel = { [k in keyof typeof SearchModel]: UnwrapSchema<(typeof SearchModel)[k]> }
