import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  PagingArtistObjectSchema,
  PagingPlaylistObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
  PagingSimplifiedAudiobookObjectSchema,
  PagingSimplifiedEpisodeObjectSchema,
  PagingSimplifiedShowObjectSchema,
  PagingTrackObjectSchema,
} from '../components'

export const getSearch = os
  .route({
    method: 'GET',
    path: '/search',
    tags: ['Search'],
    summary: 'Search for Item\n',
    description:
      'Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks\nthat match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    successDescription: 'Search response',
  })
  .input(
    v.object({
      q: v.pipe(
        v.string(),
        v.description(
          'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
        ),
        v.metadata({ examples: ['remaster%20track:Doxy%20artist:Miles%20Davis'] }),
      ),
      type: v.pipe(
        v.unknown(),
        v.transform((input) => {
          if (typeof input !== 'string') return input
          const text = input
          return text === '' ? [] : text.split(',')
        }),
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(
            v.picklist(['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook']),
          ),
        ),
        v.description(
          'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
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
              v.minValue(1),
              v.maxValue(10),
            ),
            '5',
          ),
          v.description('The maximum number of results to return in each item type.\n'),
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
              v.minValue(0),
              v.maxValue(1000),
            ),
            '0',
          ),
          v.description(
            'The index of the first result to return. Use\nwith limit to get the next page of search results.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      ),
      include_external: v.optional(
        v.pipe(
          v.literal('audio'),
          v.description(
            'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n',
          ),
        ),
      ),
    }),
  )
  .output(
    v.partial(
      v.object({
        tracks: PagingTrackObjectSchema,
        artists: PagingArtistObjectSchema,
        albums: PagingSimplifiedAlbumObjectSchema,
        playlists: PagingPlaylistObjectSchema,
        shows: PagingSimplifiedShowObjectSchema,
        episodes: PagingSimplifiedEpisodeObjectSchema,
        audiobooks: PagingSimplifiedAudiobookObjectSchema,
      }),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
