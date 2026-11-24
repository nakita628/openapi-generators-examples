import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const playlistsHandler = new Hono()
  .get(
    '/playlists/:playlist_id',
    sValidator(
      'param',
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
    sValidator(
      'query',
      v.partial(
        v.object({
          market: v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
          fields: v.pipe(
            v.string(),
            v.description(
              "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
            ),
            v.metadata({ examples: ['items(added_by.id,track(name,href,album(name,href)))'] }),
          ),
          additional_types: v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id',
    sValidator(
      'param',
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
    sValidator(
      'json',
      v.pipe(
        v.partial(
          v.looseObject({
            name: v.pipe(
              v.string(),
              v.description(
                'The new name for the playlist, for example `"My New Playlist Title"`\n',
              ),
            ),
            public: v.pipe(
              v.boolean(),
              v.description(
                "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
              ),
            ),
            collaborative: v.pipe(
              v.boolean(),
              v.description(
                'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
              ),
            ),
            description: v.pipe(
              v.string(),
              v.description(
                'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
              ),
            ),
          }),
        ),
        v.metadata({
          examples: [
            {
              name: 'Updated Playlist Name',
              description: 'Updated playlist description',
              public: false,
            },
          ],
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
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
    sValidator(
      'query',
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
        fields: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
            ),
            v.metadata({ examples: ['items(added_by.id,track(name,href,album(name,href)))'] }),
          ),
        ),
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
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
        offset: v.pipe(
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
        additional_types: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
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
    sValidator(
      'query',
      v.partial(
        v.object({
          uris: v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
            ),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      v.pipe(
        v.partial(
          v.looseObject({
            uris: v.array(v.string()),
            range_start: v.pipe(
              v.pipe(v.number(), v.integer()),
              v.description('The position of the first item to be reordered.\n'),
            ),
            insert_before: v.pipe(
              v.pipe(v.number(), v.integer()),
              v.description(
                'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
              ),
            ),
            range_length: v.pipe(
              v.pipe(v.number(), v.integer()),
              v.description(
                'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
              ),
            ),
            snapshot_id: v.pipe(
              v.string(),
              v.description(
                "The playlist's snapshot ID against which you want to make the changes.\n",
              ),
            ),
          }),
        ),
        v.metadata({ examples: [{ range_start: 1, insert_before: 3, range_length: 2 }] }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
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
    sValidator(
      'query',
      v.partial(
        v.object({
          position: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
            ),
            v.metadata({ examples: [0] }),
          ),
          uris: v.pipe(
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
        }),
      ),
    ),
    sValidator(
      'json',
      v.partial(
        v.looseObject({
          uris: v.pipe(
            v.array(v.string()),
            v.description(
              'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
            ),
          ),
          position: v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
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
    sValidator(
      'json',
      v.object({
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
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
    sValidator(
      'query',
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
        fields: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
            ),
            v.metadata({ examples: ['items(added_by.id,track(name,href,album(name,href)))'] }),
          ),
        ),
        limit: v.pipe(
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
        offset: v.pipe(
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
        additional_types: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
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
    sValidator(
      'query',
      v.partial(
        v.object({
          uris: v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
            ),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      v.pipe(
        v.partial(
          v.looseObject({
            uris: v.array(v.string()),
            range_start: v.pipe(
              v.pipe(v.number(), v.integer()),
              v.description('The position of the first item to be reordered.\n'),
            ),
            insert_before: v.pipe(
              v.pipe(v.number(), v.integer()),
              v.description(
                'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
              ),
            ),
            range_length: v.pipe(
              v.pipe(v.number(), v.integer()),
              v.description(
                'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
              ),
            ),
            snapshot_id: v.pipe(
              v.string(),
              v.description(
                "The playlist's snapshot ID against which you want to make the changes.\n",
              ),
            ),
          }),
        ),
        v.metadata({ examples: [{ range_start: 1, insert_before: 3, range_length: 2 }] }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
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
    sValidator(
      'query',
      v.partial(
        v.object({
          position: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
            ),
            v.metadata({ examples: [0] }),
          ),
          uris: v.pipe(
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
        }),
      ),
    ),
    sValidator(
      'json',
      v.partial(
        v.looseObject({
          uris: v.pipe(
            v.array(v.string()),
            v.description(
              'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
            ),
          ),
          position: v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
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
    sValidator(
      'json',
      v.object({
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/followers',
    sValidator(
      'param',
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
    sValidator(
      'json',
      v.pipe(
        v.partial(
          v.looseObject({
            public: v.pipe(
              v.boolean(),
              v.description(
                "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
              ),
            ),
          }),
        ),
        v.metadata({ examples: [{ public: false }] }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/followers',
    sValidator(
      'param',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/images',
    sValidator(
      'param',
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
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/images',
    sValidator(
      'param',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/followers/contains',
    sValidator(
      'param',
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
    sValidator(
      'query',
      v.partial(
        v.object({
          ids: v.pipe(
            v.string(),
            v.description(
              "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
            ),
            v.metadata({ examples: ['jmperezperez'] }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
