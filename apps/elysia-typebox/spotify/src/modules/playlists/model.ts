import { t, type UnwrapSchema } from 'elysia'
import { ErrorObjectSchema, ImageObjectSchema } from '../../components/schemas'

export const PlaylistsModel = {
  getPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  getPlaylistQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    fields: t.Optional(
      t.String({
        example: 'items(added_by.id,track(name,href,album(name,href)))',
        title: 'Fields',
        description:
          "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
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
  getPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  getPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  getPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  changePlaylistDetailsParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  changePlaylistDetailsBody: t.Object(
    {
      name: t.Optional(
        t.String({
          description: 'The new name for the playlist, for example `"My New Playlist Title"`\n',
        }),
      ),
      public: t.Optional(
        t.Boolean({
          description:
            "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        }),
      ),
      collaborative: t.Optional(
        t.Boolean({
          description:
            'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
        }),
      ),
      description: t.Optional(
        t.String({
          description:
            'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        }),
      ),
    },
    {
      example: {
        name: 'Updated Playlist Name',
        description: 'Updated playlist description',
        public: false,
      },
    },
  ),
  changePlaylistDetailsResponse401: t.Object({ error: ErrorObjectSchema }),
  changePlaylistDetailsResponse403: t.Object({ error: ErrorObjectSchema }),
  changePlaylistDetailsResponse429: t.Object({ error: ErrorObjectSchema }),
  getPlaylistsTracksParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  getPlaylistsTracksQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    fields: t.Optional(
      t.String({
        example: 'items(added_by.id,track(name,href,album(name,href)))',
        title: 'Fields',
        description:
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 100,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
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
    additional_types: t.Optional(
      t.String({
        title: 'Additional Types',
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      }),
    ),
  }),
  getPlaylistsTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  getPlaylistsTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  getPlaylistsTracksResponse429: t.Object({ error: ErrorObjectSchema }),
  reorderOrReplacePlaylistsTracksParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  reorderOrReplacePlaylistsTracksQuery: t.Object({
    uris: t.Optional(
      t.String({
        title: 'Spotify Track URIs',
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
      }),
    ),
  }),
  reorderOrReplacePlaylistsTracksBody: t.Object(
    {
      uris: t.Optional(t.Array(t.String())),
      range_start: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description: 'The position of the first item to be reordered.\n',
        }),
      ),
      insert_before: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        }),
      ),
      range_length: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        }),
      ),
      snapshot_id: t.Optional(
        t.String({
          description: "The playlist's snapshot ID against which you want to make the changes.\n",
        }),
      ),
    },
    { example: { range_start: 1, insert_before: 3, range_length: 2 } },
  ),
  reorderOrReplacePlaylistsTracksResponse200: t.Object({
    snapshot_id: t.Optional(t.String({ example: 'abc' })),
  }),
  reorderOrReplacePlaylistsTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  reorderOrReplacePlaylistsTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  reorderOrReplacePlaylistsTracksResponse429: t.Object({ error: ErrorObjectSchema }),
  addTracksToPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  addTracksToPlaylistQuery: t.Object({
    position: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 0,
        title: 'Position (append by default)',
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
      }),
    ),
    uris: t.Optional(
      t.String({
        example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M',
        title: 'Spotify Track URIs',
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
      }),
    ),
  }),
  addTracksToPlaylistBody: t.Object({
    uris: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
      }),
    ),
    position: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
      }),
    ),
  }),
  addTracksToPlaylistResponse201: t.Object({
    snapshot_id: t.Optional(t.String({ example: 'abc' })),
  }),
  addTracksToPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  addTracksToPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  addTracksToPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  removeTracksPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  removeTracksPlaylistBody: t.Object({
    tracks: t.Array(t.Object({ uri: t.Optional(t.String({ description: 'Spotify URI' })) }), {
      description:
        'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
    }),
    snapshot_id: t.Optional(
      t.String({
        description:
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
      }),
    ),
  }),
  removeTracksPlaylistResponse200: t.Object({
    snapshot_id: t.Optional(t.String({ example: 'abc' })),
  }),
  removeTracksPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  removeTracksPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  removeTracksPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  getPlaylistsItemsParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  getPlaylistsItemsQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    fields: t.Optional(
      t.String({
        example: 'items(added_by.id,track(name,href,album(name,href)))',
        title: 'Fields',
        description:
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
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
    additional_types: t.Optional(
      t.String({
        title: 'Additional Types',
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      }),
    ),
  }),
  getPlaylistsItemsResponse401: t.Object({ error: ErrorObjectSchema }),
  getPlaylistsItemsResponse403: t.Object({ error: ErrorObjectSchema }),
  getPlaylistsItemsResponse429: t.Object({ error: ErrorObjectSchema }),
  reorderOrReplacePlaylistsItemsParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  reorderOrReplacePlaylistsItemsQuery: t.Object({
    uris: t.Optional(
      t.String({
        title: 'Spotify Track URIs',
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
      }),
    ),
  }),
  reorderOrReplacePlaylistsItemsBody: t.Object(
    {
      uris: t.Optional(t.Array(t.String())),
      range_start: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description: 'The position of the first item to be reordered.\n',
        }),
      ),
      insert_before: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        }),
      ),
      range_length: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        }),
      ),
      snapshot_id: t.Optional(
        t.String({
          description: "The playlist's snapshot ID against which you want to make the changes.\n",
        }),
      ),
    },
    { example: { range_start: 1, insert_before: 3, range_length: 2 } },
  ),
  reorderOrReplacePlaylistsItemsResponse200: t.Object({
    snapshot_id: t.Optional(t.String({ example: 'abc' })),
  }),
  reorderOrReplacePlaylistsItemsResponse401: t.Object({ error: ErrorObjectSchema }),
  reorderOrReplacePlaylistsItemsResponse403: t.Object({ error: ErrorObjectSchema }),
  reorderOrReplacePlaylistsItemsResponse429: t.Object({ error: ErrorObjectSchema }),
  addItemsToPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  addItemsToPlaylistQuery: t.Object({
    position: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 0,
        title: 'Position (append by default)',
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
      }),
    ),
    uris: t.Optional(
      t.String({
        example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M',
        title: 'Spotify Track URIs',
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
      }),
    ),
  }),
  addItemsToPlaylistBody: t.Object({
    uris: t.Optional(
      t.Array(t.String(), {
        description:
          'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
      }),
    ),
    position: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
      }),
    ),
  }),
  addItemsToPlaylistResponse201: t.Object({
    snapshot_id: t.Optional(t.String({ example: 'abc' })),
  }),
  addItemsToPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  addItemsToPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  addItemsToPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  removeItemsPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  removeItemsPlaylistBody: t.Object({
    items: t.Array(t.Object({ uri: t.Optional(t.String({ description: 'Spotify URI' })) }), {
      description:
        'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "items": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
    }),
    snapshot_id: t.Optional(
      t.String({
        description:
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
      }),
    ),
  }),
  removeItemsPlaylistResponse200: t.Object({
    snapshot_id: t.Optional(t.String({ example: 'abc' })),
  }),
  removeItemsPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  removeItemsPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  removeItemsPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  followPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  followPlaylistBody: t.Object(
    {
      public: t.Optional(
        t.Boolean({
          description:
            "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        }),
      ),
    },
    { example: { public: false } },
  ),
  followPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  followPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  followPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  unfollowPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  unfollowPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  unfollowPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  unfollowPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
  getPlaylistCoverParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  getPlaylistCoverResponse200: t.Array(ImageObjectSchema),
  getPlaylistCoverResponse401: t.Object({ error: ErrorObjectSchema }),
  getPlaylistCoverResponse403: t.Object({ error: ErrorObjectSchema }),
  getPlaylistCoverResponse429: t.Object({ error: ErrorObjectSchema }),
  uploadCustomPlaylistCoverParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  uploadCustomPlaylistCoverResponse401: t.Object({ error: ErrorObjectSchema }),
  uploadCustomPlaylistCoverResponse403: t.Object({ error: ErrorObjectSchema }),
  uploadCustomPlaylistCoverResponse429: t.Object({ error: ErrorObjectSchema }),
  checkIfUserFollowsPlaylistParams: t.Object({
    playlist_id: t.String({
      example: '3cEYpjA9oz9GiPac4AsH4n',
      title: 'Playlist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    }),
  }),
  checkIfUserFollowsPlaylistQuery: t.Object({
    ids: t.Optional(
      t.String({
        example: 'jmperezperez',
        title: 'Spotify user IDs',
        description:
          "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
      }),
    ),
  }),
  checkIfUserFollowsPlaylistResponse200: t.Array(t.Boolean(), { example: [true] }),
  checkIfUserFollowsPlaylistResponse401: t.Object({ error: ErrorObjectSchema }),
  checkIfUserFollowsPlaylistResponse403: t.Object({ error: ErrorObjectSchema }),
  checkIfUserFollowsPlaylistResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type PlaylistsModel = {
  [k in keyof typeof PlaylistsModel]: UnwrapSchema<(typeof PlaylistsModel)[k]>
}
