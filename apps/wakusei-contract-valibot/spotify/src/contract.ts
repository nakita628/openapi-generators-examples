import { oc } from '@orpc/contract'
import * as v from 'valibot'
import {
  AlbumObjectSchema,
  ArtistObjectSchema,
  AudioAnalysisObjectSchema,
  AudioFeaturesObjectSchema,
  AudiobookObjectSchema,
  CategoryObjectSchema,
  ChapterObjectSchema,
  CurrentlyPlayingContextObjectSchema,
  CurrentlyPlayingObjectSchema,
  CursorPagingPlayHistoryObjectSchema,
  CursorPagingSimplifiedArtistObjectSchema,
  DeviceObjectSchema,
  EpisodeObjectSchema,
  ImageObjectSchema,
  PagingArtistDiscographyAlbumObjectSchema,
  PagingArtistObjectSchema,
  PagingFeaturedPlaylistObjectSchema,
  PagingObjectSchema,
  PagingPlaylistObjectSchema,
  PagingPlaylistTrackObjectSchema,
  PagingSavedAlbumObjectSchema,
  PagingSavedAudiobookObjectSchema,
  PagingSavedEpisodeObjectSchema,
  PagingSavedShowObjectSchema,
  PagingSavedTrackObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
  PagingSimplifiedAudiobookObjectSchema,
  PagingSimplifiedChapterObjectSchema,
  PagingSimplifiedEpisodeObjectSchema,
  PagingSimplifiedShowObjectSchema,
  PagingSimplifiedTrackObjectSchema,
  PagingTrackObjectSchema,
  PlaylistObjectSchema,
  PrivateUserObjectSchema,
  PublicUserObjectSchema,
  QueueObjectSchema,
  RecommendationsObjectSchema,
  ShowObjectSchema,
  SimplifiedShowObjectSchema,
  TrackObjectSchema,
} from './components'

export const contract = {
  getAlbumsId: oc
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
    .output(AlbumObjectSchema),
  getAlbums: oc
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
    .output(v.object({ albums: v.array(AlbumObjectSchema) })),
  getAlbumsIdTracks: oc
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
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingSimplifiedTrackObjectSchema),
  getArtistsId: oc
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
    .output(ArtistObjectSchema),
  getArtists: oc
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
    .output(v.object({ artists: v.array(ArtistObjectSchema) })),
  getArtistsIdAlbums: oc
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
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingArtistDiscographyAlbumObjectSchema),
  getArtistsIdTopTracks: oc
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
    .output(v.object({ tracks: v.array(TrackObjectSchema) })),
  getArtistsIdRelatedArtists: oc
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
    .output(v.object({ artists: v.array(ArtistObjectSchema) })),
  getShowsId: oc
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
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
          ),
          v.metadata({ examples: ['38bS44xjbVVZ3No3ByF1dJ'] }),
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
    .output(ShowObjectSchema),
  getShows: oc
    .route({
      method: 'GET',
      path: '/shows',
      tags: ['Shows'],
      summary: 'Get Several Shows\n',
      description:
        'Get Spotify catalog information for several shows based on their Spotify IDs.\n',
      deprecated: true,
      successDescription: 'A set of shows',
    })
    .input(
      v.object({
        market: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        ),
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'] }),
        ),
      }),
    )
    .output(v.object({ shows: v.array(SimplifiedShowObjectSchema) })),
  getShowsIdEpisodes: oc
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
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
          ),
          v.metadata({ examples: ['38bS44xjbVVZ3No3ByF1dJ'] }),
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
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingSimplifiedEpisodeObjectSchema),
  getEpisodesId: oc
    .route({
      method: 'GET',
      path: '/episodes/{id}',
      tags: ['Episodes'],
      summary: 'Get Episode\n',
      description:
        'Get Spotify catalog information for a single episode identified by its\nunique Spotify ID.\n',
      successDescription: 'An episode',
    })
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
          ),
          v.metadata({ examples: ['512ojhOuo1ktJprKbVcKyQ'] }),
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
    .output(EpisodeObjectSchema),
  getEpisodes: oc
    .route({
      method: 'GET',
      path: '/episodes',
      tags: ['Episodes'],
      summary: 'Get Several Episodes\n',
      description:
        'Get Spotify catalog information for several episodes based on their Spotify IDs.\n',
      deprecated: true,
      successDescription: 'A set of episodes',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'] }),
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
    .output(v.object({ episodes: v.array(EpisodeObjectSchema) })),
  getAudiobooksId: oc
    .route({
      method: 'GET',
      path: '/audiobooks/{id}',
      tags: ['Audiobooks'],
      summary: 'Get an Audiobook\n',
      description:
        'Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      successDescription: 'An Audiobook',
    })
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
          ),
          v.metadata({ examples: ['7iHfbu1YPACw6oZPAFJtqe'] }),
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
    .output(AudiobookObjectSchema),
  getAudiobooks: oc
    .route({
      method: 'GET',
      path: '/audiobooks',
      tags: ['Audiobooks'],
      summary: 'Get Several Audiobooks\n',
      description:
        'Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      deprecated: true,
      successDescription:
        "A set of audiobooks. If one of the requested audiobooks is unavailable then you'll find a `null` item in the `audiobooks` array where the audiobook object would otherwise be.",
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
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
    .output(v.object({ audiobooks: v.array(AudiobookObjectSchema) })),
  getAudiobooksIdChapters: oc
    .route({
      method: 'GET',
      path: '/audiobooks/{id}/chapters',
      tags: ['Audiobooks', 'Chapters'],
      summary: 'Get Audiobook Chapters\n',
      description:
        "Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n",
      successDescription: 'Pages of chapters',
    })
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
          ),
          v.metadata({ examples: ['7iHfbu1YPACw6oZPAFJtqe'] }),
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
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingSimplifiedChapterObjectSchema),
  getMeAudiobooks: oc
    .route({
      method: 'GET',
      path: '/me/audiobooks',
      tags: ['Audiobooks', 'Library'],
      summary: "Get User's Saved Audiobooks\n",
      description:
        "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n",
      successDescription: 'Pages of saved audiobooks',
    })
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingSavedAudiobookObjectSchema),
  putMeAudiobooks: oc
    .route({
      method: 'PUT',
      path: '/me/audiobooks',
      tags: ['Audiobooks', 'Library'],
      summary: 'Save Audiobooks for Current User\n',
      description:
        "Save one or more audiobooks to the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Audiobook(s) are saved to the library',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
          }),
        ),
      }),
    ),
  deleteMeAudiobooks: oc
    .route({
      method: 'DELETE',
      path: '/me/audiobooks',
      tags: ['Audiobooks', 'Library'],
      summary: "Remove User's Saved Audiobooks\n",
      description:
        "Remove one or more audiobooks from the Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Audiobook(s) have been removed from the library',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
          }),
        ),
      }),
    ),
  getMeAudiobooksContains: oc
    .route({
      method: 'GET',
      path: '/me/audiobooks/contains',
      tags: ['Audiobooks', 'Library'],
      summary: "Check User's Saved Audiobooks\n",
      description:
        "Check if one or more audiobooks are already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      deprecated: true,
      successDescription: 'Array of booleans',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
          }),
        ),
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] }))),
  getChaptersId: oc
    .route({
      method: 'GET',
      path: '/chapters/{id}',
      tags: ['Chapters'],
      summary: 'Get a Chapter\n',
      description:
        'Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      successDescription: 'A Chapter',
    })
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
          ),
          v.metadata({ examples: ['0D5wENdkdwbqlrHoaJ9g29'] }),
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
    .output(ChapterObjectSchema),
  getChapters: oc
    .route({
      method: 'GET',
      path: '/chapters',
      tags: ['Chapters'],
      summary: 'Get Several Chapters\n',
      description:
        'Get Spotify catalog information for several audiobook chapters identified by their Spotify IDs. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      deprecated: true,
      successDescription: 'A set of chapters',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29'],
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
    .output(v.object({ chapters: v.array(ChapterObjectSchema) })),
  getTracksId: oc
    .route({
      method: 'GET',
      path: '/tracks/{id}',
      tags: ['Tracks'],
      summary: 'Get Track\n',
      description:
        'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
      successDescription: 'A track',
    })
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
          ),
          v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
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
    .output(TrackObjectSchema),
  getTracks: oc
    .route({
      method: 'GET',
      path: '/tracks',
      tags: ['Tracks'],
      summary: 'Get Several Tracks\n',
      description:
        'Get Spotify catalog information for multiple tracks based on their Spotify IDs.\n',
      deprecated: true,
      successDescription: 'A set of tracks',
    })
    .input(
      v.object({
        market: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        ),
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        ),
      }),
    )
    .output(v.object({ tracks: v.array(TrackObjectSchema) })),
  getSearch: oc
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
                v.transform(Number),
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
                v.transform(Number),
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
    ),
  getMe: oc
    .route({
      method: 'GET',
      path: '/me',
      tags: ['Users'],
      summary: "Get Current User's Profile\n",
      description:
        "Get detailed profile information about the current user (including the\ncurrent user's username).\n",
      successDescription: 'A user',
    })
    .output(PrivateUserObjectSchema),
  getPlaylistsPlaylistId: oc
    .route({
      method: 'GET',
      path: '/playlists/{playlist_id}',
      tags: ['Playlists'],
      summary: 'Get Playlist\n',
      description: 'Get a playlist owned by a Spotify user.\n',
      successDescription: 'A playlist',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
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
        fields: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
            ),
            v.metadata({ examples: ['items(added_by.id,track(name,href,album(name,href)))'] }),
          ),
        ),
        additional_types: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        ),
      }),
    )
    .output(PlaylistObjectSchema),
  putPlaylistsPlaylistId: oc
    .route({
      method: 'PUT',
      path: '/playlists/{playlist_id}',
      tags: ['Playlists', 'Library'],
      summary: 'Change Playlist Details\n',
      description:
        "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n",
      successDescription: 'Playlist updated',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        name: v.optional(
          v.pipe(
            v.string(),
            v.description('The new name for the playlist, for example `"My New Playlist Title"`\n'),
          ),
        ),
        public: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            ),
          ),
        ),
        collaborative: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
            ),
          ),
        ),
        description: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            ),
          ),
        ),
      }),
    ),
  getPlaylistsPlaylistIdTracks: oc
    .route({
      method: 'GET',
      path: '/playlists/{playlist_id}/tracks',
      tags: ['Playlists', 'Tracks'],
      summary: 'Get Playlist Items [DEPRECATED]\n',
      description:
        '**Deprecated:** Use [Get Playlist Items](/documentation/web-api/reference/get-playlists-items) instead.\n\nGet full details of the items of a playlist owned by a Spotify user.\n',
      deprecated: true,
      successDescription: 'Pages of tracks',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
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
        fields: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
            ),
            v.metadata({ examples: ['items(added_by.id,track(name,href,album(name,href)))'] }),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
                v.number(),
                v.safeInteger(),
                v.minValue(1),
                v.maxValue(100),
              ),
              '20',
            ),
            v.description(
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
            ),
            v.metadata({ examples: [10] }),
          ),
        ),
        offset: v.optional(
          v.pipe(
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
        additional_types: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        ),
      }),
    )
    .output(PagingPlaylistTrackObjectSchema),
  postPlaylistsPlaylistIdTracks: oc
    .route({
      method: 'POST',
      path: '/playlists/{playlist_id}/tracks',
      tags: ['Playlists', 'Tracks'],
      summary: 'Add Items to Playlist [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Add Items to Playlist](/documentation/web-api/reference/add-items-to-playlist) instead.\n\nAdd one or more items to a user's playlist.\n",
      deprecated: true,
      successStatus: 201,
      successDescription: 'A snapshot ID for the playlist',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        position: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
            ),
            v.metadata({ examples: [0] }),
          ),
        ),
        uris: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
            ),
            v.metadata({
              examples: [
                'spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M',
              ],
            }),
          ),
        ),
      }),
    )
    .output(
      v.partial(v.object({ snapshot_id: v.pipe(v.string(), v.metadata({ examples: ['abc'] })) })),
    ),
  putPlaylistsPlaylistIdTracks: oc
    .route({
      method: 'PUT',
      path: '/playlists/{playlist_id}/tracks',
      tags: ['Playlists', 'Tracks'],
      summary: 'Update Playlist Items [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Update Playlist Items](/documentation/web-api/reference/reorder-or-replace-playlists-items) instead.\n\nEither reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
      deprecated: true,
      successDescription: 'A snapshot ID for the playlist',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        uris: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
            ),
          ),
        ),
        range_start: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description('The position of the first item to be reordered.\n'),
          ),
        ),
        insert_before: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
            ),
          ),
        ),
        range_length: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
            ),
          ),
        ),
        snapshot_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The playlist's snapshot ID against which you want to make the changes.\n",
            ),
          ),
        ),
      }),
    )
    .output(
      v.partial(v.object({ snapshot_id: v.pipe(v.string(), v.metadata({ examples: ['abc'] })) })),
    ),
  deletePlaylistsPlaylistIdTracks: oc
    .route({
      method: 'DELETE',
      path: '/playlists/{playlist_id}/tracks',
      tags: ['Playlists', 'Tracks'],
      summary: 'Remove Playlist Items [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Remove Playlist Items](/documentation/web-api/reference/remove-items-playlist) instead.\n\nRemove one or more items from a user's playlist.\n",
      deprecated: true,
      successDescription: 'A snapshot ID for the playlist',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        tracks: v.pipe(
          v.array(v.partial(v.object({ uri: v.pipe(v.string(), v.description('Spotify URI')) }))),
          v.description(
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          ),
        ),
        snapshot_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
            ),
          ),
        ),
      }),
    )
    .output(
      v.partial(v.object({ snapshot_id: v.pipe(v.string(), v.metadata({ examples: ['abc'] })) })),
    ),
  getPlaylistsPlaylistIdItems: oc
    .route({
      method: 'GET',
      path: '/playlists/{playlist_id}/items',
      tags: ['Playlists', 'Tracks'],
      summary: 'Get Playlist Items\n',
      description:
        'Get full details of the items of a playlist owned by a Spotify user.\n\n**Note**: This endpoint is only accessible for playlists owned by the current user or playlists the user is a collaborator of. A `403 Forbidden` status code will be returned if the user is neither the owner nor a collaborator of the playlist.\n',
      successDescription: 'Pages of tracks',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
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
        fields: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
            ),
            v.metadata({ examples: ['items(added_by.id,track(name,href,album(name,href)))'] }),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
        additional_types: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        ),
      }),
    )
    .output(PagingPlaylistTrackObjectSchema),
  postPlaylistsPlaylistIdItems: oc
    .route({
      method: 'POST',
      path: '/playlists/{playlist_id}/items',
      tags: ['Playlists', 'Tracks'],
      summary: 'Add Items to Playlist\n',
      description: "Add one or more items to a user's playlist.\n",
      successStatus: 201,
      successDescription: 'A snapshot ID for the playlist',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        position: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
            ),
            v.metadata({ examples: [0] }),
          ),
        ),
        uris: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
            ),
            v.metadata({
              examples: [
                'spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M',
              ],
            }),
          ),
        ),
      }),
    )
    .output(
      v.partial(v.object({ snapshot_id: v.pipe(v.string(), v.metadata({ examples: ['abc'] })) })),
    ),
  putPlaylistsPlaylistIdItems: oc
    .route({
      method: 'PUT',
      path: '/playlists/{playlist_id}/items',
      tags: ['Playlists', 'Tracks'],
      summary: 'Update Playlist Items\n',
      description:
        "Either reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
      successDescription: 'A snapshot ID for the playlist',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        uris: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
            ),
          ),
        ),
        range_start: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description('The position of the first item to be reordered.\n'),
          ),
        ),
        insert_before: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
            ),
          ),
        ),
        range_length: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
            ),
          ),
        ),
        snapshot_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The playlist's snapshot ID against which you want to make the changes.\n",
            ),
          ),
        ),
      }),
    )
    .output(
      v.partial(v.object({ snapshot_id: v.pipe(v.string(), v.metadata({ examples: ['abc'] })) })),
    ),
  deletePlaylistsPlaylistIdItems: oc
    .route({
      method: 'DELETE',
      path: '/playlists/{playlist_id}/items',
      tags: ['Playlists', 'Tracks'],
      summary: 'Remove Playlist Items\n',
      description: "Remove one or more items from a user's playlist.\n",
      successDescription: 'A snapshot ID for the playlist',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        items: v.pipe(
          v.array(v.partial(v.object({ uri: v.pipe(v.string(), v.description('Spotify URI')) }))),
          v.description(
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "items": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          ),
        ),
        snapshot_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
            ),
          ),
        ),
      }),
    )
    .output(
      v.partial(v.object({ snapshot_id: v.pipe(v.string(), v.metadata({ examples: ['abc'] })) })),
    ),
  getMePlaylists: oc
    .route({
      method: 'GET',
      path: '/me/playlists',
      tags: ['Playlists', 'Library'],
      summary: "Get Current User's Playlists\n",
      description: 'Get a list of the playlists owned or followed by the current Spotify\nuser.\n',
      successDescription: 'A paged set of playlists',
    })
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingPlaylistObjectSchema),
  postMePlaylists: oc
    .route({
      method: 'POST',
      path: '/me/playlists',
      tags: ['Playlists', 'Library'],
      summary: 'Create Playlist\n',
      description:
        'Create a playlist for the current Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
      successStatus: 201,
      successDescription: 'A playlist',
    })
    .input(
      v.pipe(
        v.looseObject({
          name: v.pipe(
            v.string(),
            v.description(
              'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
            ),
          ),
          public: v.optional(
            v.pipe(
              v.boolean(),
              v.description(
                "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
              ),
            ),
          ),
          collaborative: v.optional(
            v.pipe(
              v.boolean(),
              v.description(
                'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
              ),
            ),
          ),
          description: v.optional(
            v.pipe(
              v.string(),
              v.description(
                'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
              ),
            ),
          ),
        }),
        v.metadata({
          examples: [
            { name: 'New Playlist', description: 'New playlist description', public: false },
          ],
        }),
      ),
    )
    .output(PlaylistObjectSchema),
  putMeLibrary: oc
    .route({
      method: 'PUT',
      path: '/me/library',
      tags: ['Library'],
      summary: 'Save Items to Library\n',
      description:
        "Add one or more items to the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
      successDescription: 'Items saved to library',
    })
    .input(
      v.object({
        uris: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
          ),
          v.metadata({
            examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
          }),
        ),
      }),
    ),
  deleteMeLibrary: oc
    .route({
      method: 'DELETE',
      path: '/me/library',
      tags: ['Library'],
      summary: 'Remove Items from Library\n',
      description:
        "Remove one or more items from the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
      successDescription: 'Items removed from library',
    })
    .input(
      v.object({
        uris: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
          ),
          v.metadata({
            examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
          }),
        ),
      }),
    ),
  getMeLibraryContains: oc
    .route({
      method: 'GET',
      path: '/me/library/contains',
      tags: ['Library'],
      summary: "Check User's Saved Items\n",
      description:
        "Check if one or more items are already saved in the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, artists, users, and playlists.\n",
      successDescription: 'Array of booleans',
    })
    .input(
      v.object({
        uris: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
          ),
          v.metadata({
            examples: [
              'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy,spotify:artist:2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        ),
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] }))),
  getMeAlbums: oc
    .route({
      method: 'GET',
      path: '/me/albums',
      tags: ['Albums', 'Library'],
      summary: "Get User's Saved Albums\n",
      description:
        "Get a list of the albums saved in the current Spotify user's 'Your Music' library.\n",
      successDescription: 'Pages of albums',
    })
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
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
      }),
    )
    .output(PagingSavedAlbumObjectSchema),
  putMeAlbums: oc
    .route({
      method: 'PUT',
      path: '/me/albums',
      tags: ['Albums', 'Library'],
      summary: 'Save Albums for Current User\n',
      description:
        "Save one or more albums to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      deprecated: true,
      successDescription: 'The album is saved',
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
      }),
    ),
  deleteMeAlbums: oc
    .route({
      method: 'DELETE',
      path: '/me/albums',
      tags: ['Albums', 'Library'],
      summary: "Remove Users' Saved Albums\n",
      description:
        "Remove one or more albums from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Album(s) have been removed from the library',
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
      }),
    ),
  getMeAlbumsContains: oc
    .route({
      method: 'GET',
      path: '/me/albums/contains',
      tags: ['Albums', 'Library'],
      summary: "Check User's Saved Albums\n",
      description:
        "Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      deprecated: true,
      successDescription: 'Array of booleans',
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
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] }))),
  getMeTracks: oc
    .route({
      method: 'GET',
      path: '/me/tracks',
      tags: ['Tracks', 'Library'],
      summary: "Get User's Saved Tracks\n",
      description:
        "Get a list of the songs saved in the current Spotify user's 'Your Music' library.\n",
      successDescription: 'Pages of tracks',
    })
    .input(
      v.object({
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
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingSavedTrackObjectSchema),
  putMeTracks: oc
    .route({
      method: 'PUT',
      path: '/me/tracks',
      tags: ['Tracks', 'Library'],
      summary: 'Save Tracks for Current User\n',
      description:
        "Save one or more tracks to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Track saved',
    })
    .input(
      v.looseObject({
        ids: v.pipe(
          v.array(v.string()),
          v.description(
            'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
          ),
        ),
        timestamped_ids: v.optional(
          v.pipe(
            v.array(
              v.object({
                id: v.pipe(
                  v.string(),
                  v.description(
                    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
                  ),
                ),
                added_at: v.pipe(
                  v.pipe(
                    v.string(),
                    v.regex(
                      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                    ),
                  ),
                  v.description(
                    "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
                  ),
                ),
              }),
            ),
            v.description(
              "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
            ),
          ),
        ),
      }),
    ),
  deleteMeTracks: oc
    .route({
      method: 'DELETE',
      path: '/me/tracks',
      tags: ['Tracks', 'Library'],
      summary: "Remove User's Saved Tracks\n",
      description:
        "Remove one or more tracks from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Track removed',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        ),
      }),
    ),
  getMeTracksContains: oc
    .route({
      method: 'GET',
      path: '/me/tracks/contains',
      tags: ['Tracks', 'Library'],
      summary: "Check User's Saved Tracks\n",
      description:
        "Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      deprecated: true,
      successDescription: 'Array of booleans',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        ),
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] }))),
  getMeEpisodes: oc
    .route({
      method: 'GET',
      path: '/me/episodes',
      tags: ['Episodes', 'Library'],
      summary: "Get User's Saved Episodes\n",
      description: "Get a list of the episodes saved in the current Spotify user's library.\n",
      successDescription: 'Pages of episodes',
    })
    .input(
      v.object({
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
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingSavedEpisodeObjectSchema),
  putMeEpisodes: oc
    .route({
      method: 'PUT',
      path: '/me/episodes',
      tags: ['Episodes', 'Library'],
      summary: 'Save Episodes for Current User\n',
      description:
        "Save one or more episodes to the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Episode saved',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'] }),
        ),
      }),
    ),
  deleteMeEpisodes: oc
    .route({
      method: 'DELETE',
      path: '/me/episodes',
      tags: ['Episodes', 'Library'],
      summary: "Remove User's Saved Episodes\n",
      description:
        "Remove one or more episodes from the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Episode removed',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        ),
      }),
    ),
  getMeEpisodesContains: oc
    .route({
      method: 'GET',
      path: '/me/episodes/contains',
      tags: ['Episodes', 'Library'],
      summary: "Check User's Saved Episodes\n",
      description:
        "Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      deprecated: true,
      successDescription: 'Array of booleans',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'] }),
        ),
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] }))),
  getMeShows: oc
    .route({
      method: 'GET',
      path: '/me/shows',
      tags: ['Shows', 'Library'],
      summary: "Get User's Saved Shows\n",
      description:
        "Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n",
      successDescription: 'Pages of shows',
    })
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingSavedShowObjectSchema),
  putMeShows: oc
    .route({
      method: 'PUT',
      path: '/me/shows',
      tags: ['Shows', 'Library'],
      summary: 'Save Shows for Current User\n',
      description:
        "Save one or more shows to current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Show saved',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'] }),
        ),
      }),
    ),
  deleteMeShows: oc
    .route({
      method: 'DELETE',
      path: '/me/shows',
      tags: ['Shows', 'Library'],
      summary: "Remove User's Saved Shows\n",
      description:
        "Delete one or more shows from current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      deprecated: true,
      successDescription: 'Show removed',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'] }),
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
    ),
  getMeShowsContains: oc
    .route({
      method: 'GET',
      path: '/me/shows/contains',
      tags: ['Shows', 'Library'],
      summary: "Check User's Saved Shows\n",
      description:
        "Check if one or more shows is already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      deprecated: true,
      successDescription: 'Array of booleans',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'] }),
        ),
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] }))),
  getUsersUserId: oc
    .route({
      method: 'GET',
      path: '/users/{user_id}',
      tags: ['Users'],
      summary: "Get User's Profile\n",
      description: 'Get public profile information about a Spotify user.\n',
      deprecated: true,
      successDescription: 'A user',
    })
    .input(
      v.object({
        user_id: v.pipe(
          v.string(),
          v.description(
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          ),
          v.metadata({ examples: ['smedjan'] }),
        ),
      }),
    )
    .output(PublicUserObjectSchema),
  getUsersUserIdPlaylists: oc
    .route({
      method: 'GET',
      path: '/users/{user_id}/playlists',
      tags: ['Playlists', 'Users'],
      summary: "Get User's Playlists\n",
      description: 'Get a list of the playlists owned or followed by a Spotify user.\n',
      deprecated: true,
      successDescription: 'A paged set of playlists',
    })
    .input(
      v.object({
        user_id: v.pipe(
          v.string(),
          v.description(
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          ),
          v.metadata({ examples: ['smedjan'] }),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingPlaylistObjectSchema),
  postUsersUserIdPlaylists: oc
    .route({
      method: 'POST',
      path: '/users/{user_id}/playlists',
      tags: ['Playlists', 'Library'],
      summary: 'Create Playlist for user\n',
      description:
        '**Deprecated**: Use [Create Playlist](/documentation/web-api/reference/create-playlist) instead.\n\nCreate a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
      deprecated: true,
      successStatus: 201,
      successDescription: 'A playlist',
    })
    .input(
      v.object({
        user_id: v.pipe(
          v.string(),
          v.description(
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          ),
          v.metadata({ examples: ['smedjan'] }),
        ),
        name: v.pipe(
          v.string(),
          v.description(
            'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
          ),
        ),
        public: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            ),
          ),
        ),
        collaborative: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
            ),
          ),
        ),
        description: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            ),
          ),
        ),
      }),
    )
    .output(PlaylistObjectSchema),
  putPlaylistsPlaylistIdFollowers: oc
    .route({
      method: 'PUT',
      path: '/playlists/{playlist_id}/followers',
      tags: ['Users', 'Playlists'],
      summary: 'Follow Playlist\n',
      description:
        'Add the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
      deprecated: true,
      successDescription: 'Playlist followed',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        public: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            ),
          ),
        ),
      }),
    ),
  deletePlaylistsPlaylistIdFollowers: oc
    .route({
      method: 'DELETE',
      path: '/playlists/{playlist_id}/followers',
      tags: ['Users', 'Playlists'],
      summary: 'Unfollow Playlist\n',
      description:
        'Remove the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
      deprecated: true,
      successDescription: 'Playlist unfollowed',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
      }),
    ),
  getBrowseFeaturedPlaylists: oc
    .route({
      method: 'GET',
      path: '/browse/featured-playlists',
      tags: ['Playlists'],
      summary: 'Get Featured Playlists\n',
      description:
        "Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n",
      deprecated: true,
      successDescription: 'A paged set of playlists',
    })
    .input(
      v.object({
        locale: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            ),
            v.metadata({ examples: ['sv_SE'] }),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingFeaturedPlaylistObjectSchema),
  getBrowseCategories: oc
    .route({
      method: 'GET',
      path: '/browse/categories',
      tags: ['Categories'],
      summary: 'Get Several Browse Categories\n',
      description:
        'Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
      deprecated: true,
      successDescription: 'A paged set of categories',
    })
    .input(
      v.object({
        locale: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            ),
            v.metadata({ examples: ['sv_SE'] }),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(
      v.object({
        categories: v.intersect([
          PagingObjectSchema,
          v.partial(v.object({ items: v.array(CategoryObjectSchema) })),
        ]),
      }),
    ),
  getBrowseCategoriesCategoryId: oc
    .route({
      method: 'GET',
      path: '/browse/categories/{category_id}',
      tags: ['Categories'],
      summary: 'Get Single Browse Category\n',
      description:
        'Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
      deprecated: true,
      successDescription: 'A category',
    })
    .input(
      v.object({
        category_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
          ),
          v.metadata({ examples: ['dinner'] }),
        ),
        locale: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            ),
            v.metadata({ examples: ['sv_SE'] }),
          ),
        ),
      }),
    )
    .output(CategoryObjectSchema),
  getBrowseCategoriesCategoryIdPlaylists: oc
    .route({
      method: 'GET',
      path: '/browse/categories/{category_id}/playlists',
      tags: ['Playlists', 'Categories'],
      summary: "Get Category's Playlists\n",
      description: 'Get a list of Spotify playlists tagged with a particular category.\n',
      deprecated: true,
      successDescription: 'A paged set of playlists',
    })
    .input(
      v.object({
        category_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
          ),
          v.metadata({ examples: ['dinner'] }),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingFeaturedPlaylistObjectSchema),
  getPlaylistsPlaylistIdImages: oc
    .route({
      method: 'GET',
      path: '/playlists/{playlist_id}/images',
      tags: ['Playlists'],
      summary: 'Get Playlist Cover Image\n',
      description: 'Get the current image associated with a specific playlist.\n',
      successDescription: 'A set of images',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
      }),
    )
    .output(v.array(ImageObjectSchema)),
  putPlaylistsPlaylistIdImages: oc
    .route({
      method: 'PUT',
      path: '/playlists/{playlist_id}/images',
      tags: ['Playlists'],
      summary: 'Add Custom Playlist Cover Image\n',
      description: 'Replace the image used to represent a specific playlist.\n',
      successStatus: 202,
      successDescription: 'Image uploaded',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
      }),
    ),
  getBrowseNewReleases: oc
    .route({
      method: 'GET',
      path: '/browse/new-releases',
      tags: ['Albums'],
      summary: 'Get New Releases\n',
      description:
        'Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n',
      deprecated: true,
      successDescription: 'A paged set of albums',
    })
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(v.object({ albums: PagingSimplifiedAlbumObjectSchema })),
  getMeFollowing: oc
    .route({
      method: 'GET',
      path: '/me/following',
      tags: ['Users', 'Library', 'Artists'],
      summary: 'Get Followed Artists\n',
      description: "Get the current user's followed artists.\n",
      successDescription: 'A paged set of artists',
    })
    .input(
      v.object({
        type: v.pipe(
          v.literal('artist'),
          v.description('The ID type: currently only `artist` is supported.\n'),
          v.metadata({ examples: ['artist'] }),
        ),
        after: v.optional(
          v.pipe(
            v.string(),
            v.description('The last artist ID retrieved from the previous request.\n'),
            v.metadata({ examples: ['0I2XqVXqHScXjHhk6AYYRe'] }),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
      }),
    )
    .output(v.object({ artists: CursorPagingSimplifiedArtistObjectSchema })),
  putMeFollowing: oc
    .route({
      method: 'PUT',
      path: '/me/following',
      tags: ['Users', 'Artists', 'Library'],
      summary: 'Follow Artists or Users\n',
      description:
        'Add the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
      deprecated: true,
      successStatus: 204,
      successDescription: 'Artist or user followed',
    })
    .input(
      v.object({
        type: v.pipe(
          v.picklist(['artist', 'user']),
          v.description('The ID type.\n'),
          v.metadata({ examples: ['artist'] }),
        ),
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
          ),
          v.metadata({
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
        ),
      }),
    ),
  deleteMeFollowing: oc
    .route({
      method: 'DELETE',
      path: '/me/following',
      tags: ['Users', 'Artists', 'Library'],
      summary: 'Unfollow Artists or Users\n',
      description:
        'Remove the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
      deprecated: true,
      successStatus: 204,
      successDescription: 'Artist or user unfollowed',
    })
    .input(
      v.object({
        type: v.pipe(
          v.picklist(['artist', 'user']),
          v.description('The ID type: either `artist` or `user`.\n'),
          v.metadata({ examples: ['artist'] }),
        ),
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
          ),
          v.metadata({
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
        ),
      }),
    ),
  getMeFollowingContains: oc
    .route({
      method: 'GET',
      path: '/me/following/contains',
      tags: ['Users', 'Artists', 'Library'],
      summary: 'Check If User Follows Artists or Users\n',
      description:
        "Check to see if the current user is following one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      deprecated: true,
      successDescription: 'Array of booleans',
    })
    .input(
      v.object({
        type: v.pipe(
          v.picklist(['artist', 'user']),
          v.description('The ID type: either `artist` or `user`.\n'),
          v.metadata({ examples: ['artist'] }),
        ),
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
          ),
          v.metadata({
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
        ),
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] }))),
  getPlaylistsPlaylistIdFollowersContains: oc
    .route({
      method: 'GET',
      path: '/playlists/{playlist_id}/followers/contains',
      tags: ['Users', 'Playlists'],
      summary: 'Check if Current User Follows Playlist\n',
      description:
        "Check to see if the current user is following a specified playlist.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      deprecated: true,
      successDescription: 'Array of boolean, containing a single boolean',
    })
    .input(
      v.object({
        playlist_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          ),
          v.metadata({ examples: ['3cEYpjA9oz9GiPac4AsH4n'] }),
        ),
        ids: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
            ),
            v.metadata({ examples: ['jmperezperez'] }),
          ),
        ),
      }),
    )
    .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[true]] }))),
  getAudioFeatures: oc
    .route({
      method: 'GET',
      path: '/audio-features',
      tags: ['Tracks'],
      summary: "Get Several Tracks' Audio Features\n",
      description: 'Get audio features for multiple tracks based on their Spotify IDs.\n',
      deprecated: true,
      successDescription: 'A set of audio features',
    })
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
          ),
          v.metadata({
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        ),
      }),
    )
    .output(v.object({ audio_features: v.array(AudioFeaturesObjectSchema) })),
  getAudioFeaturesId: oc
    .route({
      method: 'GET',
      path: '/audio-features/{id}',
      tags: ['Tracks'],
      summary: "Get Track's Audio Features\n",
      description:
        'Get audio feature information for a single track identified by its unique\nSpotify ID.\n',
      deprecated: true,
      successDescription: 'Audio features for one track',
    })
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
          ),
          v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
        ),
      }),
    )
    .output(AudioFeaturesObjectSchema),
  getAudioAnalysisId: oc
    .route({
      method: 'GET',
      path: '/audio-analysis/{id}',
      tags: ['Tracks'],
      summary: "Get Track's Audio Analysis\n",
      description:
        'Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n',
      deprecated: true,
      successDescription: 'Audio analysis for one track',
    })
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
          ),
          v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
        ),
      }),
    )
    .output(AudioAnalysisObjectSchema),
  getRecommendations: oc
    .route({
      method: 'GET',
      path: '/recommendations',
      tags: ['Tracks'],
      summary: 'Get Recommendations\n',
      description:
        'Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n',
      deprecated: true,
      successDescription: 'A set of recommendations',
    })
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
                v.number(),
                v.safeInteger(),
                v.minValue(1),
                v.maxValue(100),
              ),
              '20',
            ),
            v.description(
              'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
            ),
            v.metadata({ examples: [10] }),
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
        seed_artists: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
            ),
            v.metadata({ examples: ['4NHQUGzhtTLFvgF5SZesLK'] }),
          ),
        ),
        seed_genres: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
            ),
            v.metadata({ examples: ['classical,country'] }),
          ),
        ),
        seed_tracks: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
            ),
            v.metadata({ examples: ['0c6xIDDpzE81m2q797ordA'] }),
          ),
        ),
        min_acousticness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_acousticness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_acousticness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_danceability: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_danceability: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_danceability: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_duration_ms: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_duration_ms: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_duration_ms: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description('Target duration of the track (ms)'),
          ),
        ),
        min_energy: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_energy: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_energy: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_instrumentalness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_instrumentalness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_instrumentalness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_key: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(11),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_key: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(11),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_key: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(11),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_liveness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_liveness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_liveness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_loudness: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.finite()),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_loudness: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.finite()),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_loudness: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.finite()),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_mode: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_mode: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_mode: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_popularity: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(100),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_popularity: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(100),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_popularity: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(100),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_speechiness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_speechiness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_speechiness: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_tempo: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.finite()),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_tempo: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.finite()),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_tempo: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.finite()),
            v.description('Target tempo (BPM)'),
          ),
        ),
        min_time_signature: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger(), v.maxValue(11)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_time_signature: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_time_signature: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_valence: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_valence: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_valence: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.finite(),
              v.minValue(0),
              v.maxValue(1),
            ),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
      }),
    )
    .output(RecommendationsObjectSchema),
  getRecommendationsAvailableGenreSeeds: oc
    .route({
      method: 'GET',
      path: '/recommendations/available-genre-seeds',
      tags: ['Genres'],
      summary: 'Get Available Genre Seeds\n',
      description:
        'Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).\n',
      deprecated: true,
      successDescription: 'A set of genres',
    })
    .output(
      v.object({
        genres: v.pipe(v.array(v.string()), v.metadata({ examples: [['alternative', 'samba']] })),
      }),
    ),
  getMePlayer: oc
    .route({
      method: 'GET',
      path: '/me/player',
      tags: ['Player'],
      summary: 'Get Playback State\n',
      description:
        'Get information about the user’s current playback state, including track or episode, progress, and active device.\n',
      successDescription: 'Information about playback',
    })
    .input(
      v.object({
        market: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        ),
        additional_types: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        ),
      }),
    )
    .output(CurrentlyPlayingContextObjectSchema),
  putMePlayer: oc
    .route({
      method: 'PUT',
      path: '/me/player',
      tags: ['Player'],
      summary: 'Transfer Playback\n',
      description:
        'Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      successStatus: 204,
      successDescription: 'Playback transferred',
    })
    .input(
      v.pipe(
        v.looseObject({
          device_ids: v.pipe(
            v.array(v.string()),
            v.description(
              'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
            ),
          ),
          play: v.optional(
            v.pipe(
              v.boolean(),
              v.description(
                '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
              ),
            ),
          ),
        }),
        v.metadata({ examples: [{ device_ids: ['74ASZWbe4lXaubB36ztrGX'] }] }),
      ),
    ),
  getMePlayerDevices: oc
    .route({
      method: 'GET',
      path: '/me/player/devices',
      tags: ['Player'],
      summary: 'Get Available Devices\n',
      description:
        'Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.\n',
      successDescription: 'A set of devices',
    })
    .output(v.object({ devices: v.array(DeviceObjectSchema) })),
  getMePlayerCurrentlyPlaying: oc
    .route({
      method: 'GET',
      path: '/me/player/currently-playing',
      tags: ['Player'],
      summary: 'Get Currently Playing Track\n',
      description: "Get the object currently being played on the user's Spotify account.\n",
      successDescription: 'Information about the currently playing track',
    })
    .input(
      v.object({
        market: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        ),
        additional_types: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        ),
      }),
    )
    .output(CurrentlyPlayingObjectSchema),
  putMePlayerPlay: oc
    .route({
      method: 'PUT',
      path: '/me/player/play',
      tags: ['Player'],
      summary: 'Start/Resume Playback\n',
      description:
        "Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      successStatus: 204,
      successDescription: 'Playback started',
    })
    .input(
      v.object({
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
        context_uri: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
            ),
          ),
        ),
        uris: v.optional(
          v.pipe(
            v.array(v.string()),
            v.description(
              'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
            ),
          ),
        ),
        offset: v.optional(
          v.pipe(
            v.any(),
            v.description(
              'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
            ),
          ),
        ),
        position_ms: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
            ),
          ),
        ),
      }),
    ),
  putMePlayerPause: oc
    .route({
      method: 'PUT',
      path: '/me/player/pause',
      tags: ['Player'],
      summary: 'Pause Playback\n',
      description:
        "Pause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      successStatus: 204,
      successDescription: 'Playback paused',
    })
    .input(
      v.object({
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  postMePlayerNext: oc
    .route({
      method: 'POST',
      path: '/me/player/next',
      tags: ['Player'],
      summary: 'Skip To Next\n',
      description:
        'Skips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      successStatus: 204,
      successDescription: 'Command sent',
    })
    .input(
      v.object({
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  postMePlayerPrevious: oc
    .route({
      method: 'POST',
      path: '/me/player/previous',
      tags: ['Player'],
      summary: 'Skip To Previous\n',
      description:
        'Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      successStatus: 204,
      successDescription: 'Command sent',
    })
    .input(
      v.object({
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  putMePlayerSeek: oc
    .route({
      method: 'PUT',
      path: '/me/player/seek',
      tags: ['Player'],
      summary: 'Seek To Position\n',
      description:
        'Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      successStatus: 204,
      successDescription: 'Command sent',
    })
    .input(
      v.object({
        position_ms: v.pipe(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          v.description(
            'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
          ),
          v.metadata({ examples: [25000] }),
        ),
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  putMePlayerRepeat: oc
    .route({
      method: 'PUT',
      path: '/me/player/repeat',
      tags: ['Player'],
      summary: 'Set Repeat Mode\n',
      description:
        "Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      successStatus: 204,
      successDescription: 'Command sent',
    })
    .input(
      v.object({
        state: v.pipe(
          v.string(),
          v.description(
            '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
          ),
          v.metadata({ examples: ['context'] }),
        ),
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  putMePlayerVolume: oc
    .route({
      method: 'PUT',
      path: '/me/player/volume',
      tags: ['Player'],
      summary: 'Set Playback Volume\n',
      description:
        'Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      successStatus: 204,
      successDescription: 'Command sent',
    })
    .input(
      v.object({
        volume_percent: v.pipe(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          v.description('The volume to set. Must be a value from 0 to 100 inclusive.\n'),
          v.metadata({ examples: [50] }),
        ),
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  putMePlayerShuffle: oc
    .route({
      method: 'PUT',
      path: '/me/player/shuffle',
      tags: ['Player'],
      summary: 'Toggle Playback Shuffle\n',
      description:
        'Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      successStatus: 204,
      successDescription: 'Command sent',
    })
    .input(
      v.object({
        state: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          v.description(
            "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
          ),
          v.metadata({ examples: [true] }),
        ),
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  getMePlayerRecentlyPlayed: oc
    .route({
      method: 'GET',
      path: '/me/player/recently-played',
      tags: ['Player'],
      summary: 'Get Recently Played Tracks\n',
      description:
        "Get tracks from the current user's recently played tracks.\n_**Note**: Currently doesn't support podcast episodes._\n",
      successDescription: 'A paged set of tracks',
    })
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
        after: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
            ),
            v.metadata({ examples: [1484811043508] }),
          ),
        ),
        before: v.optional(
          v.pipe(
            v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
            v.description(
              'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
            ),
          ),
        ),
      }),
    )
    .output(CursorPagingPlayHistoryObjectSchema),
  getMePlayerQueue: oc
    .route({
      method: 'GET',
      path: '/me/player/queue',
      tags: ['Player'],
      summary: "Get the User's Queue\n",
      description: "Get the list of objects that make up the user's queue.\n",
      successDescription: 'Information about the queue',
    })
    .output(QueueObjectSchema),
  postMePlayerQueue: oc
    .route({
      method: 'POST',
      path: '/me/player/queue',
      tags: ['Player'],
      summary: 'Add Item to Playback Queue\n',
      description:
        "Add an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      successStatus: 204,
      successDescription: 'Command received',
    })
    .input(
      v.object({
        uri: v.pipe(
          v.string(),
          v.description(
            'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
          ),
          v.metadata({ examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'] }),
        ),
        device_id: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            ),
            v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
          ),
        ),
      }),
    ),
  getMarkets: oc
    .route({
      method: 'GET',
      path: '/markets',
      tags: ['Markets'],
      summary: 'Get Available Markets\n',
      description: 'Get the list of markets where Spotify is available.\n',
      deprecated: true,
      successDescription: 'A markets object with an array of country codes',
    })
    .output(
      v.partial(
        v.object({
          markets: v.pipe(v.array(v.string()), v.metadata({ examples: [['CA', 'BR', 'IT']] })),
        }),
      ),
    ),
  getMeTopArtists: oc
    .route({
      method: 'GET',
      path: '/me/top/artists',
      tags: ['Users', 'Artists', 'Library'],
      summary: "Get User's Top Artists\n",
      description: "Get the current user's top artists based on calculated affinity.\n",
      successDescription: 'Pages of artists',
    })
    .input(
      v.object({
        time_range: v.optional(
          v.pipe(
            v.optional(v.string(), 'medium_term'),
            v.description(
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            ),
            v.metadata({ examples: ['medium_term'] }),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingArtistObjectSchema),
  getMeTopTracks: oc
    .route({
      method: 'GET',
      path: '/me/top/tracks',
      tags: ['Users', 'Tracks', 'Library'],
      summary: "Get User's Top Tracks\n",
      description: "Get the current user's top tracks based on calculated affinity.\n",
      successDescription: 'Pages of tracks',
    })
    .input(
      v.object({
        time_range: v.optional(
          v.pipe(
            v.optional(v.string(), 'medium_term'),
            v.description(
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            ),
            v.metadata({ examples: ['medium_term'] }),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.optional(
              v.pipe(
                v.string(),
                v.transform(Number),
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
            v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
            v.description(
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            ),
            v.metadata({ examples: [5] }),
          ),
        ),
      }),
    )
    .output(PagingTrackObjectSchema),
}
