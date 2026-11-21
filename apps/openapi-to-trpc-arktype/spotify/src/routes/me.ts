import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  CurrentlyPlayingContextObjectSchema,
  CurrentlyPlayingObjectSchema,
  CursorPagingPlayHistoryObjectSchema,
  CursorPagingSimplifiedArtistObjectSchema,
  DeviceObjectSchema,
  PagingArtistObjectSchema,
  PagingPlaylistObjectSchema,
  PagingSavedAlbumObjectSchema,
  PagingSavedAudiobookObjectSchema,
  PagingSavedEpisodeObjectSchema,
  PagingSavedShowObjectSchema,
  PagingSavedTrackObjectSchema,
  PagingTrackObjectSchema,
  PlaylistObjectSchema,
  PrivateUserObjectSchema,
  QueueObjectSchema,
} from '../components'

const t = initTRPC.create()

export const meRouter = t.router({
  getMeAudiobooks: t.procedure
    .input(
      type({
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingSavedAudiobookObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMeAudiobooks: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteMeAudiobooks: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeAudiobooksContains: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMe: t.procedure.output(PrivateUserObjectSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getMePlaylists: t.procedure
    .input(
      type({
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
        ),
      }),
    )
    .output(PagingPlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postMePlaylists: t.procedure
    .input(
      type({
        name: type('string').describe(
          'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
        ),
        'public?': type('boolean').describe(
          "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        ),
        'collaborative?': type('boolean').describe(
          'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
        ),
        'description?': type('string').describe(
          'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        ),
        '+': 'delete',
      }),
    )
    .output(PlaylistObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMeLibrary: t.procedure
    .input(
      type({
        uris: type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteMeLibrary: t.procedure
    .input(
      type({
        uris: type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeLibraryContains: t.procedure
    .input(
      type({
        uris: type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeAlbums: t.procedure
    .input(
      type({
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
      }),
    )
    .output(PagingSavedAlbumObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMeAlbums: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteMeAlbums: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeAlbumsContains: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeTracks: t.procedure
    .input(
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingSavedTrackObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMeTracks: t.procedure
    .input(
      type({
        ids: type('string[]').describe(
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
        ),
        'timestamped_ids?': type(
          type({
            id: type('string').describe(
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            ),
            added_at: type(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ).describe(
              "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
            ),
          }),
        )
          .array()
          .describe(
            "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
          ),
        '+': 'delete',
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteMeTracks: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeTracksContains: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeEpisodes: t.procedure
    .input(
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingSavedEpisodeObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMeEpisodes: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteMeEpisodes: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeEpisodesContains: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeShows: t.procedure
    .input(
      type({
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingSavedShowObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMeShows: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteMeShows: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeShowsContains: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeFollowing: t.procedure
    .input(
      type({
        type: type("'artist'").describe('The ID type: currently only `artist` is supported.\n'),
        'after?': type('string').describe(
          'The last artist ID retrieved from the previous request.\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
      }),
    )
    .output(type({ artists: CursorPagingSimplifiedArtistObjectSchema }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMeFollowing: t.procedure
    .input(
      type({
        type: type("'artist' | 'user'").describe('The ID type.\n'),
        ids: type('string').describe(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteMeFollowing: t.procedure
    .input(
      type({
        type: type("'artist' | 'user'").describe('The ID type: either `artist` or `user`.\n'),
        ids: type('string').describe(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeFollowingContains: t.procedure
    .input(
      type({
        type: type("'artist' | 'user'").describe('The ID type: either `artist` or `user`.\n'),
        ids: type('string').describe(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMePlayer: t.procedure
    .input(
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    )
    .output(CurrentlyPlayingContextObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMePlayer: t.procedure
    .input(
      type({
        device_ids: type('string[]').describe(
          'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
        ),
        'play?': type('boolean').describe(
          '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
        ),
        '+': 'delete',
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMePlayerDevices: t.procedure
    .output(type({ devices: type(DeviceObjectSchema).array() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMePlayerCurrentlyPlaying: t.procedure
    .input(
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    )
    .output(CurrentlyPlayingObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMePlayerPlay: t.procedure
    .input(
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
        ),
        'context_uri?': type('string').describe(
          'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
        ),
        'uris?': type('string[]').describe(
          'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
        ),
        'offset?': type('unknown').describe(
          'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
        ),
        'position_ms?': type('number.integer').describe(
          'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMePlayerPause: t.procedure
    .input(
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postMePlayerNext: t.procedure
    .input(
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postMePlayerPrevious: t.procedure
    .input(
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMePlayerSeek: t.procedure
    .input(
      type({
        position_ms: type('number.integer').describe(
          'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
        ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMePlayerRepeat: t.procedure
    .input(
      type({
        state: type('string').describe(
          '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
        ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMePlayerVolume: t.procedure
    .input(
      type({
        volume_percent: type('number.integer').describe(
          'The volume to set. Must be a value from 0 to 100 inclusive.\n',
        ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putMePlayerShuffle: t.procedure
    .input(
      type({
        state: type('boolean').describe(
          "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
        ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMePlayerRecentlyPlayed: t.procedure
    .input(
      type({
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'after?': type('number.integer').describe(
          'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
        ),
        'before?': type('number.integer').describe(
          'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
        ),
      }),
    )
    .output(CursorPagingPlayHistoryObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMePlayerQueue: t.procedure.output(QueueObjectSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postMePlayerQueue: t.procedure
    .input(
      type({
        uri: type('string').describe(
          'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
        ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeTopArtists: t.procedure
    .input(
      type({
        'time_range?': type('string').describe(
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingArtistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getMeTopTracks: t.procedure
    .input(
      type({
        'time_range?': type('string').describe(
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingTrackObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
