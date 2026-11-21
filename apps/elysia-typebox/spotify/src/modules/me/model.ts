import { t, type UnwrapSchema } from 'elysia'
import {
  CursorPagingSimplifiedArtistObjectSchema,
  DeviceObjectSchema,
  ErrorObjectSchema,
} from '../../components/schemas'

export const MeModel = {
  getUsersSavedAudiobooksQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getUsersSavedAudiobooksResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedAudiobooksResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedAudiobooksResponse429: t.Object({ error: ErrorObjectSchema }),
  saveAudiobooksUserQuery: t.Object({
    ids: t.String({
      example: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
      title: 'Spotify Audiobook IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
    }),
  }),
  saveAudiobooksUserResponse401: t.Object({ error: ErrorObjectSchema }),
  saveAudiobooksUserResponse403: t.Object({ error: ErrorObjectSchema }),
  saveAudiobooksUserResponse429: t.Object({ error: ErrorObjectSchema }),
  removeAudiobooksUserQuery: t.Object({
    ids: t.String({
      example: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
      title: 'Spotify Audiobook IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
    }),
  }),
  removeAudiobooksUserResponse401: t.Object({ error: ErrorObjectSchema }),
  removeAudiobooksUserResponse403: t.Object({ error: ErrorObjectSchema }),
  removeAudiobooksUserResponse429: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedAudiobooksQuery: t.Object({
    ids: t.String({
      example: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
      title: 'Spotify Audiobook IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
    }),
  }),
  checkUsersSavedAudiobooksResponse200: t.Array(t.Boolean(), { example: [false, true] }),
  checkUsersSavedAudiobooksResponse401: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedAudiobooksResponse403: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedAudiobooksResponse429: t.Object({ error: ErrorObjectSchema }),
  getCurrentUsersProfileResponse401: t.Object({ error: ErrorObjectSchema }),
  getCurrentUsersProfileResponse403: t.Object({ error: ErrorObjectSchema }),
  getCurrentUsersProfileResponse429: t.Object({ error: ErrorObjectSchema }),
  getAListOfCurrentUsersPlaylistsQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
        default: 0,
      }),
    ),
  }),
  getAListOfCurrentUsersPlaylistsResponse401: t.Object({ error: ErrorObjectSchema }),
  getAListOfCurrentUsersPlaylistsResponse403: t.Object({ error: ErrorObjectSchema }),
  getAListOfCurrentUsersPlaylistsResponse429: t.Object({ error: ErrorObjectSchema }),
  createPlaylistBody: t.Object(
    {
      name: t.String({
        description:
          'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
      }),
      public: t.Optional(
        t.Boolean({
          description:
            "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        }),
      ),
      collaborative: t.Optional(
        t.Boolean({
          description:
            'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
        }),
      ),
      description: t.Optional(
        t.String({
          description:
            'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        }),
      ),
    },
    { example: { name: 'New Playlist', description: 'New playlist description', public: false } },
  ),
  createPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  createPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  createPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  saveLibraryItemsQuery: t.Object({
    uris: t.String({
      example: 'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy',
      title: 'Spotify URIs',
      description:
        'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
    }),
  }),
  saveLibraryItemsResponse401: t.Object({ error: ErrorObjectSchema }),
  saveLibraryItemsResponse403: t.Object({ error: ErrorObjectSchema }),
  saveLibraryItemsResponse429: t.Object({ error: ErrorObjectSchema }),
  removeLibraryItemsQuery: t.Object({
    uris: t.String({
      example: 'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy',
      title: 'Spotify URIs',
      description:
        'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
    }),
  }),
  removeLibraryItemsResponse401: t.Object({ error: ErrorObjectSchema }),
  removeLibraryItemsResponse403: t.Object({ error: ErrorObjectSchema }),
  removeLibraryItemsResponse429: t.Object({ error: ErrorObjectSchema }),
  checkLibraryContainsQuery: t.Object({
    uris: t.String({
      example:
        'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy,spotify:artist:2takcwOaAZWiXQijPHIx7B',
      title: 'Spotify URIs',
      description:
        'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
    }),
  }),
  checkLibraryContainsResponse200: t.Array(t.Boolean(), { example: [false, true] }),
  checkLibraryContainsResponse401: t.Object({ error: ErrorObjectSchema }),
  checkLibraryContainsResponse403: t.Object({ error: ErrorObjectSchema }),
  checkLibraryContainsResponse429: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedAlbumsQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getUsersSavedAlbumsResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedAlbumsResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedAlbumsResponse429: t.Object({ error: ErrorObjectSchema }),
  saveAlbumsUserQuery: t.Object({
    ids: t.String({
      example: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
      title: 'Spotify Album IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
    }),
  }),
  saveAlbumsUserBody: t.Object({
    ids: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      }),
    ),
  }),
  saveAlbumsUserResponse401: t.Object({ error: ErrorObjectSchema }),
  saveAlbumsUserResponse403: t.Object({ error: ErrorObjectSchema }),
  saveAlbumsUserResponse429: t.Object({ error: ErrorObjectSchema }),
  removeAlbumsUserQuery: t.Object({
    ids: t.String({
      example: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
      title: 'Spotify Album IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
    }),
  }),
  removeAlbumsUserBody: t.Object({
    ids: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      }),
    ),
  }),
  removeAlbumsUserResponse401: t.Object({ error: ErrorObjectSchema }),
  removeAlbumsUserResponse403: t.Object({ error: ErrorObjectSchema }),
  removeAlbumsUserResponse429: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedAlbumsQuery: t.Object({
    ids: t.String({
      example: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
      title: 'Spotify Album IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
    }),
  }),
  checkUsersSavedAlbumsResponse200: t.Array(t.Boolean(), { example: [false, true] }),
  checkUsersSavedAlbumsResponse401: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedAlbumsResponse403: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedAlbumsResponse429: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedTracksQuery: t.Object({
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
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getUsersSavedTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedTracksResponse429: t.Object({ error: ErrorObjectSchema }),
  saveTracksUserBody: t.Object({
    ids: t.Array(t.String(), {
      description:
        'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
    }),
    timestamped_ids: t.Optional(
      t.Array(
        t.Object({
          id: t.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
          }),
          added_at: t.Date({
            description:
              "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
          }),
        }),
        {
          description:
            "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
        },
      ),
    ),
  }),
  saveTracksUserResponse401: t.Object({ error: ErrorObjectSchema }),
  saveTracksUserResponse403: t.Object({ error: ErrorObjectSchema }),
  saveTracksUserResponse429: t.Object({ error: ErrorObjectSchema }),
  removeTracksUserQuery: t.Object({
    ids: t.String({
      example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
      title: 'Spotify Track IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
    }),
  }),
  removeTracksUserBody: t.Object({
    ids: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      }),
    ),
  }),
  removeTracksUserResponse401: t.Object({ error: ErrorObjectSchema }),
  removeTracksUserResponse403: t.Object({ error: ErrorObjectSchema }),
  removeTracksUserResponse429: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedTracksQuery: t.Object({
    ids: t.String({
      example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
      title: 'Spotify Track IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
    }),
  }),
  checkUsersSavedTracksResponse200: t.Array(t.Boolean(), { example: [false, true] }),
  checkUsersSavedTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedTracksResponse429: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedEpisodesQuery: t.Object({
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
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getUsersSavedEpisodesResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedEpisodesResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedEpisodesResponse429: t.Object({ error: ErrorObjectSchema }),
  saveEpisodesUserQuery: t.Object({
    ids: t.String({
      example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
      title: 'Spotify Episodes IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
    }),
  }),
  saveEpisodesUserBody: t.Object({
    ids: t.Array(t.String(), {
      description:
        'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
    }),
  }),
  saveEpisodesUserResponse401: t.Object({ error: ErrorObjectSchema }),
  saveEpisodesUserResponse403: t.Object({ error: ErrorObjectSchema }),
  saveEpisodesUserResponse429: t.Object({ error: ErrorObjectSchema }),
  removeEpisodesUserQuery: t.Object({
    ids: t.String({
      example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
      title: 'Spotify Track IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
    }),
  }),
  removeEpisodesUserBody: t.Object({
    ids: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      }),
    ),
  }),
  removeEpisodesUserResponse401: t.Object({ error: ErrorObjectSchema }),
  removeEpisodesUserResponse403: t.Object({ error: ErrorObjectSchema }),
  removeEpisodesUserResponse429: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedEpisodesQuery: t.Object({
    ids: t.String({
      example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
      title: 'Spotify Episode IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
    }),
  }),
  checkUsersSavedEpisodesResponse200: t.Array(t.Boolean(), { example: [false, true] }),
  checkUsersSavedEpisodesResponse401: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedEpisodesResponse403: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedEpisodesResponse429: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedShowsQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getUsersSavedShowsResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedShowsResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersSavedShowsResponse429: t.Object({ error: ErrorObjectSchema }),
  saveShowsUserQuery: t.Object({
    ids: t.String({
      example: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
      title: 'Ids',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
    }),
  }),
  saveShowsUserBody: t.Object({
    ids: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
      }),
    ),
  }),
  saveShowsUserResponse401: t.Object({ error: ErrorObjectSchema }),
  saveShowsUserResponse403: t.Object({ error: ErrorObjectSchema }),
  saveShowsUserResponse429: t.Object({ error: ErrorObjectSchema }),
  removeShowsUserQuery: t.Object({
    ids: t.String({
      example: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
      title: 'Ids',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
    }),
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  removeShowsUserBody: t.Object({
    ids: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
      }),
    ),
  }),
  removeShowsUserResponse401: t.Object({ error: ErrorObjectSchema }),
  removeShowsUserResponse403: t.Object({ error: ErrorObjectSchema }),
  removeShowsUserResponse429: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedShowsQuery: t.Object({
    ids: t.String({
      example: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
      title: 'Ids',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
    }),
  }),
  checkUsersSavedShowsResponse200: t.Array(t.Boolean(), { example: [false, true] }),
  checkUsersSavedShowsResponse401: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedShowsResponse403: t.Object({ error: ErrorObjectSchema }),
  checkUsersSavedShowsResponse429: t.Object({ error: ErrorObjectSchema }),
  getFollowedQuery: t.Object({
    type: t.Literal('artist', {
      example: 'artist',
      title: 'Item Type',
      description: 'The ID type: currently only `artist` is supported.\n',
    }),
    after: t.Optional(
      t.String({
        example: '0I2XqVXqHScXjHhk6AYYRe',
        title: 'After',
        description: 'The last artist ID retrieved from the previous request.\n',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
  }),
  getFollowedResponse200: t.Object({ artists: CursorPagingSimplifiedArtistObjectSchema }),
  getFollowedResponse401: t.Object({ error: ErrorObjectSchema }),
  getFollowedResponse403: t.Object({ error: ErrorObjectSchema }),
  getFollowedResponse429: t.Object({ error: ErrorObjectSchema }),
  followArtistsUsersQuery: t.Object({
    type: t.UnionEnum(['artist', 'user'], {
      example: 'artist',
      title: 'Item Type',
      description: 'The ID type.\n',
      default: undefined,
    }),
    ids: t.String({
      example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
      title: 'Spotify IDs',
      description:
        'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
    }),
  }),
  followArtistsUsersBody: t.Object({
    ids: t.Array(t.String(), {
      description:
        'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
    }),
  }),
  followArtistsUsersResponse401: t.Object({ error: ErrorObjectSchema }),
  followArtistsUsersResponse403: t.Object({ error: ErrorObjectSchema }),
  followArtistsUsersResponse429: t.Object({ error: ErrorObjectSchema }),
  unfollowArtistsUsersQuery: t.Object({
    type: t.UnionEnum(['artist', 'user'], {
      example: 'artist',
      title: 'Item Type',
      description: 'The ID type: either `artist` or `user`.\n',
      default: undefined,
    }),
    ids: t.String({
      example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
      title: 'Spotify IDs',
      description:
        'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
    }),
  }),
  unfollowArtistsUsersBody: t.Object({
    ids: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      }),
    ),
  }),
  unfollowArtistsUsersResponse401: t.Object({ error: ErrorObjectSchema }),
  unfollowArtistsUsersResponse403: t.Object({ error: ErrorObjectSchema }),
  unfollowArtistsUsersResponse429: t.Object({ error: ErrorObjectSchema }),
  checkCurrentUserFollowsQuery: t.Object({
    type: t.UnionEnum(['artist', 'user'], {
      example: 'artist',
      title: 'Item Type',
      description: 'The ID type: either `artist` or `user`.\n',
      default: undefined,
    }),
    ids: t.String({
      example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
      title: 'Spotify IDs',
      description:
        'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
    }),
  }),
  checkCurrentUserFollowsResponse200: t.Array(t.Boolean(), { example: [false, true] }),
  checkCurrentUserFollowsResponse401: t.Object({ error: ErrorObjectSchema }),
  checkCurrentUserFollowsResponse403: t.Object({ error: ErrorObjectSchema }),
  checkCurrentUserFollowsResponse429: t.Object({ error: ErrorObjectSchema }),
  getInformationAboutTheUsersCurrentPlaybackQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    additional_types: t.Optional(
      t.String({
        title: 'Additional Types',
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      }),
    ),
  }),
  getInformationAboutTheUsersCurrentPlaybackResponse401: t.Object({ error: ErrorObjectSchema }),
  getInformationAboutTheUsersCurrentPlaybackResponse403: t.Object({ error: ErrorObjectSchema }),
  getInformationAboutTheUsersCurrentPlaybackResponse429: t.Object({ error: ErrorObjectSchema }),
  transferAUsersPlaybackBody: t.Object(
    {
      device_ids: t.Array(t.String(), {
        description:
          'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
      }),
      play: t.Optional(
        t.Boolean({
          description:
            '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
        }),
      ),
    },
    { example: { device_ids: ['74ASZWbe4lXaubB36ztrGX'] } },
  ),
  transferAUsersPlaybackResponse401: t.Object({ error: ErrorObjectSchema }),
  transferAUsersPlaybackResponse403: t.Object({ error: ErrorObjectSchema }),
  transferAUsersPlaybackResponse429: t.Object({ error: ErrorObjectSchema }),
  getAUsersAvailableDevicesResponse200: t.Object({ devices: t.Array(DeviceObjectSchema) }),
  getAUsersAvailableDevicesResponse401: t.Object({ error: ErrorObjectSchema }),
  getAUsersAvailableDevicesResponse403: t.Object({ error: ErrorObjectSchema }),
  getAUsersAvailableDevicesResponse429: t.Object({ error: ErrorObjectSchema }),
  getTheUsersCurrentlyPlayingTrackQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    additional_types: t.Optional(
      t.String({
        title: 'Additional Types',
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      }),
    ),
  }),
  getTheUsersCurrentlyPlayingTrackResponse401: t.Object({ error: ErrorObjectSchema }),
  getTheUsersCurrentlyPlayingTrackResponse403: t.Object({ error: ErrorObjectSchema }),
  getTheUsersCurrentlyPlayingTrackResponse429: t.Object({ error: ErrorObjectSchema }),
  startAUsersPlaybackQuery: t.Object({
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
      }),
    ),
  }),
  startAUsersPlaybackBody: t.Object(
    {
      context_uri: t.Optional(
        t.String({
          description:
            'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
        }),
      ),
      uris: t.Optional(
        t.Array(t.String(), {
          description:
            'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
        }),
      ),
      offset: t.Optional(
        t.Object(
          {},
          {
            description:
              'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
          },
        ),
      ),
      position_ms: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
        }),
      ),
    },
    {
      example: {
        context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
        offset: { position: 5 },
        position_ms: 0,
      },
    },
  ),
  startAUsersPlaybackResponse401: t.Object({ error: ErrorObjectSchema }),
  startAUsersPlaybackResponse403: t.Object({ error: ErrorObjectSchema }),
  startAUsersPlaybackResponse429: t.Object({ error: ErrorObjectSchema }),
  pauseAUsersPlaybackQuery: t.Object({
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
      }),
    ),
  }),
  pauseAUsersPlaybackResponse401: t.Object({ error: ErrorObjectSchema }),
  pauseAUsersPlaybackResponse403: t.Object({ error: ErrorObjectSchema }),
  pauseAUsersPlaybackResponse429: t.Object({ error: ErrorObjectSchema }),
  skipUsersPlaybackToNextTrackQuery: t.Object({
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
      }),
    ),
  }),
  skipUsersPlaybackToNextTrackResponse401: t.Object({ error: ErrorObjectSchema }),
  skipUsersPlaybackToNextTrackResponse403: t.Object({ error: ErrorObjectSchema }),
  skipUsersPlaybackToNextTrackResponse429: t.Object({ error: ErrorObjectSchema }),
  skipUsersPlaybackToPreviousTrackQuery: t.Object({
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      }),
    ),
  }),
  skipUsersPlaybackToPreviousTrackResponse401: t.Object({ error: ErrorObjectSchema }),
  skipUsersPlaybackToPreviousTrackResponse403: t.Object({ error: ErrorObjectSchema }),
  skipUsersPlaybackToPreviousTrackResponse429: t.Object({ error: ErrorObjectSchema }),
  seekToPositionInCurrentlyPlayingTrackQuery: t.Object({
    position_ms: t.Integer({
      maximum: 9007199254740991,
      example: 25000,
      title: 'Position (ms)',
      description:
        'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
    }),
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      }),
    ),
  }),
  seekToPositionInCurrentlyPlayingTrackResponse401: t.Object({ error: ErrorObjectSchema }),
  seekToPositionInCurrentlyPlayingTrackResponse403: t.Object({ error: ErrorObjectSchema }),
  seekToPositionInCurrentlyPlayingTrackResponse429: t.Object({ error: ErrorObjectSchema }),
  setRepeatModeOnUsersPlaybackQuery: t.Object({
    state: t.String({
      example: 'context',
      title: 'State',
      description:
        '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
    }),
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      }),
    ),
  }),
  setRepeatModeOnUsersPlaybackResponse401: t.Object({ error: ErrorObjectSchema }),
  setRepeatModeOnUsersPlaybackResponse403: t.Object({ error: ErrorObjectSchema }),
  setRepeatModeOnUsersPlaybackResponse429: t.Object({ error: ErrorObjectSchema }),
  setVolumeForUsersPlaybackQuery: t.Object({
    volume_percent: t.Integer({
      maximum: 9007199254740991,
      example: 50,
      title: 'Volume %',
      description: 'The volume to set. Must be a value from 0 to 100 inclusive.\n',
    }),
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
      }),
    ),
  }),
  setVolumeForUsersPlaybackResponse401: t.Object({ error: ErrorObjectSchema }),
  setVolumeForUsersPlaybackResponse403: t.Object({ error: ErrorObjectSchema }),
  setVolumeForUsersPlaybackResponse429: t.Object({ error: ErrorObjectSchema }),
  toggleShuffleForUsersPlaybackQuery: t.Object({
    state: t.Boolean({
      example: true,
      title: 'State',
      description:
        "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
    }),
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      }),
    ),
  }),
  toggleShuffleForUsersPlaybackResponse401: t.Object({ error: ErrorObjectSchema }),
  toggleShuffleForUsersPlaybackResponse403: t.Object({ error: ErrorObjectSchema }),
  toggleShuffleForUsersPlaybackResponse429: t.Object({ error: ErrorObjectSchema }),
  getRecentlyPlayedQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    after: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 1484811043508,
        title: 'After',
        description:
          'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
      }),
    ),
    before: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        title: 'Before',
        description:
          'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
      }),
    ),
  }),
  getRecentlyPlayedResponse401: t.Object({ error: ErrorObjectSchema }),
  getRecentlyPlayedResponse403: t.Object({ error: ErrorObjectSchema }),
  getRecentlyPlayedResponse429: t.Object({ error: ErrorObjectSchema }),
  getQueueResponse401: t.Object({ error: ErrorObjectSchema }),
  getQueueResponse403: t.Object({ error: ErrorObjectSchema }),
  getQueueResponse429: t.Object({ error: ErrorObjectSchema }),
  addToQueueQuery: t.Object({
    uri: t.String({
      example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
      title: 'Spotify URI',
      description: 'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
    }),
    device_id: t.Optional(
      t.String({
        example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      }),
    ),
  }),
  addToQueueResponse401: t.Object({ error: ErrorObjectSchema }),
  addToQueueResponse403: t.Object({ error: ErrorObjectSchema }),
  addToQueueResponse429: t.Object({ error: ErrorObjectSchema }),
  getUsersTopArtistsQuery: t.Object({
    time_range: t.Optional(
      t.String({
        example: 'medium_term',
        title: 'Time Range',
        description:
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
        default: 'medium_term',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getUsersTopArtistsResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersTopArtistsResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersTopArtistsResponse429: t.Object({ error: ErrorObjectSchema }),
  getUsersTopTracksQuery: t.Object({
    time_range: t.Optional(
      t.String({
        example: 'medium_term',
        title: 'Time Range',
        description:
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
        default: 'medium_term',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getUsersTopTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersTopTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersTopTracksResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type MeModel = { [k in keyof typeof MeModel]: UnwrapSchema<(typeof MeModel)[k]> }
