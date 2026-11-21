import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ArrayOfImagesResponse,
  OnePlaylistResponse,
  PagingPlaylistTrackObjectResponse,
  SingletonArrayOfBooleanResponse,
  PlaylistSnapshotIdResponse,
} from '../components'

export const playlistsHandler = new Hono()
  .get(
    '/playlists/:playlist_id',
    describeRoute({
      tags: ['Playlists'],
      operationId: 'get-playlist',
      summary: 'Get Playlist\n',
      description: 'Get a playlist owned by a Spotify user.\n',
      responses: {
        '200': OnePlaylistResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'fields?': type('string').describe(
          "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id',
    describeRoute({
      tags: ['Playlists', 'Library'],
      operationId: 'change-playlist-details',
      summary: 'Change Playlist Details\n',
      description:
        "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n",
      responses: {
        '200': { description: 'Playlist updated' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        'name?': type('string').describe(
          'The new name for the playlist, for example `"My New Playlist Title"`\n',
        ),
        'public?': type('boolean').describe(
          "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        ),
        'collaborative?': type('boolean').describe(
          'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
        ),
        'description?': type('string').describe(
          'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/tracks',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'get-playlists-tracks',
      deprecated: true,
      summary: 'Get Playlist Items [DEPRECATED]\n',
      description:
        '**Deprecated:** Use [Get Playlist Items](/documentation/web-api/reference/get-playlists-items) instead.\n\nGet full details of the items of a playlist owned by a Spotify user.\n',
      responses: {
        '200': PagingPlaylistTrackObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-read-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'fields?': type('string').describe(
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100')
          .describe(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
          ),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/tracks',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'reorder-or-replace-playlists-tracks',
      deprecated: true,
      summary: 'Update Playlist Items [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Update Playlist Items](/documentation/web-api/reference/reorder-or-replace-playlists-items) instead.\n\nEither reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
      responses: {
        '200': PlaylistSnapshotIdResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        'uris?': 'string[]',
        'range_start?': type('number.integer').describe(
          'The position of the first item to be reordered.\n',
        ),
        'insert_before?': type('number.integer').describe(
          'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        ),
        'range_length?': type('number.integer').describe(
          'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\n",
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/playlists/:playlist_id/tracks',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'add-tracks-to-playlist',
      deprecated: true,
      summary: 'Add Items to Playlist [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Add Items to Playlist](/documentation/web-api/reference/add-items-to-playlist) instead.\n\nAdd one or more items to a user's playlist.\n",
      responses: {
        '201': PlaylistSnapshotIdResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'position?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
          ),
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        'uris?': type('string[]').describe(
          'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
        ),
        'position?': type('number.integer').describe(
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/tracks',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'remove-tracks-playlist',
      deprecated: true,
      summary: 'Remove Playlist Items [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Remove Playlist Items](/documentation/web-api/reference/remove-items-playlist) instead.\n\nRemove one or more items from a user's playlist.\n",
      responses: {
        '200': PlaylistSnapshotIdResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        tracks: type(type({ 'uri?': type('string').describe('Spotify URI') }))
          .array()
          .describe(
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/items',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'get-playlists-items',
      summary: 'Get Playlist Items\n',
      description:
        'Get full details of the items of a playlist owned by a Spotify user.\n\n**Note**: This endpoint is only accessible for playlists owned by the current user or playlists the user is a collaborator of. A `403 Forbidden` status code will be returned if the user is neither the owner nor a collaborator of the playlist.\n',
      responses: {
        '200': PagingPlaylistTrackObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-read-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'fields?': type('string').describe(
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 50')
          .describe(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/items',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'reorder-or-replace-playlists-items',
      summary: 'Update Playlist Items\n',
      description:
        "Either reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
      responses: {
        '200': PlaylistSnapshotIdResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        'uris?': 'string[]',
        'range_start?': type('number.integer').describe(
          'The position of the first item to be reordered.\n',
        ),
        'insert_before?': type('number.integer').describe(
          'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        ),
        'range_length?': type('number.integer').describe(
          'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\n",
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/playlists/:playlist_id/items',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'add-items-to-playlist',
      summary: 'Add Items to Playlist\n',
      description: "Add one or more items to a user's playlist.\n",
      responses: {
        '201': PlaylistSnapshotIdResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'position?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
          ),
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        'uris?': type('string[]').describe(
          'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
        ),
        'position?': type('number.integer').describe(
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/items',
    describeRoute({
      tags: ['Playlists', 'Tracks'],
      operationId: 'remove-items-playlist',
      summary: 'Remove Playlist Items\n',
      description: "Remove one or more items from a user's playlist.\n",
      responses: {
        '200': PlaylistSnapshotIdResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        items: type(type({ 'uri?': type('string').describe('Spotify URI') }))
          .array()
          .describe(
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "items": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/followers',
    describeRoute({
      deprecated: true,
      tags: ['Users', 'Playlists'],
      operationId: 'follow-playlist',
      description:
        'Add the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
      summary: 'Follow Playlist\n',
      responses: {
        '200': { description: 'Playlist followed' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'json',
      type({
        'public?': type('boolean').describe(
          "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/followers',
    describeRoute({
      deprecated: true,
      tags: ['Users', 'Playlists'],
      operationId: 'unfollow-playlist',
      summary: 'Unfollow Playlist\n',
      description:
        'Remove the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
      responses: {
        '200': { description: 'Playlist unfollowed' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/images',
    describeRoute({
      tags: ['Playlists'],
      operationId: 'get-playlist-cover',
      summary: 'Get Playlist Cover Image\n',
      description: 'Get the current image associated with a specific playlist.\n',
      responses: {
        '200': ArrayOfImagesResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/images',
    describeRoute({
      tags: ['Playlists'],
      operationId: 'upload-custom-playlist-cover',
      summary: 'Add Custom Playlist Cover Image\n',
      description: 'Replace the image used to represent a specific playlist.\n',
      responses: {
        '202': { description: 'Image uploaded' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [
        { oauth_2_0: ['ugc-image-upload', 'playlist-modify-public', 'playlist-modify-private'] },
      ],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/followers/contains',
    describeRoute({
      tags: ['Users', 'Playlists'],
      operationId: 'check-if-user-follows-playlist',
      summary: 'Check if Current User Follows Playlist\n',
      deprecated: true,
      description:
        "Check to see if the current user is following a specified playlist.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      responses: {
        '200': SingletonArrayOfBooleanResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    ),
    validator(
      'query',
      type({
        'ids?': type('string').describe(
          "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
