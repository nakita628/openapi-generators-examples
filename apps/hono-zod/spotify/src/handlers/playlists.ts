import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const playlistsHandler = new Hono()
  .get(
    '/playlists/:playlist_id',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
        fields: z
          .string()
          .meta({
            description:
              "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
            examples: ['items(added_by.id,track(name,href,album(name,href)))'],
          })
          .exactOptional(),
        additional_types: z
          .string()
          .meta({
            description:
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'json',
      z
        .looseObject({
          name: z
            .string()
            .meta({
              description: 'The new name for the playlist, for example `"My New Playlist Title"`\n',
            })
            .exactOptional(),
          public: z
            .boolean()
            .meta({
              description:
                "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            })
            .exactOptional(),
          collaborative: z
            .boolean()
            .meta({
              description:
                'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
            })
            .exactOptional(),
          description: z
            .string()
            .meta({
              description:
                'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            })
            .exactOptional(),
        })
        .meta({
          examples: [
            {
              name: 'Updated Playlist Name',
              description: 'Updated playlist description',
              public: false,
            },
          ],
        }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
        fields: z
          .string()
          .meta({
            description:
              'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
            examples: ['items(added_by.id,track(name,href,album(name,href)))'],
          })
          .exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
        additional_types: z
          .string()
          .meta({
            description:
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        uris: z
          .string()
          .meta({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
          })
          .exactOptional(),
      }),
    ),
    sValidator(
      'json',
      z
        .looseObject({
          uris: z.array(z.string()).exactOptional(),
          range_start: z
            .int()
            .meta({ description: 'The position of the first item to be reordered.\n' })
            .exactOptional(),
          insert_before: z
            .int()
            .meta({
              description:
                'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
            })
            .exactOptional(),
          range_length: z
            .int()
            .meta({
              description:
                'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
            })
            .exactOptional(),
          snapshot_id: z
            .string()
            .meta({
              description:
                "The playlist's snapshot ID against which you want to make the changes.\n",
            })
            .exactOptional(),
        })
        .meta({ examples: [{ range_start: 1, insert_before: 3, range_length: 2 }] }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        position: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
            examples: [0],
          })
          .exactOptional(),
        uris: z
          .string()
          .meta({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
            examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M'],
          })
          .exactOptional(),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        uris: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
          })
          .exactOptional(),
        position: z
          .int()
          .meta({
            description:
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/tracks',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.object({
        tracks: z
          .array(z.object({ uri: z.string().meta({ description: 'Spotify URI' }).exactOptional() }))
          .meta({
            description:
              'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          }),
        snapshot_id: z
          .string()
          .meta({
            description:
              "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
        fields: z
          .string()
          .meta({
            description:
              'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
            examples: ['items(added_by.id,track(name,href,album(name,href)))'],
          })
          .exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(50),
          )
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
        additional_types: z
          .string()
          .meta({
            description:
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        uris: z
          .string()
          .meta({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
          })
          .exactOptional(),
      }),
    ),
    sValidator(
      'json',
      z
        .looseObject({
          uris: z.array(z.string()).exactOptional(),
          range_start: z
            .int()
            .meta({ description: 'The position of the first item to be reordered.\n' })
            .exactOptional(),
          insert_before: z
            .int()
            .meta({
              description:
                'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
            })
            .exactOptional(),
          range_length: z
            .int()
            .meta({
              description:
                'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
            })
            .exactOptional(),
          snapshot_id: z
            .string()
            .meta({
              description:
                "The playlist's snapshot ID against which you want to make the changes.\n",
            })
            .exactOptional(),
        })
        .meta({ examples: [{ range_start: 1, insert_before: 3, range_length: 2 }] }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        position: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
            examples: [0],
          })
          .exactOptional(),
        uris: z
          .string()
          .meta({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
            examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M'],
          })
          .exactOptional(),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        uris: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
          })
          .exactOptional(),
        position: z
          .int()
          .meta({
            description:
              'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/items',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.object({
        items: z
          .array(z.object({ uri: z.string().meta({ description: 'Spotify URI' }).exactOptional() }))
          .meta({
            description:
              'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "items": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          }),
        snapshot_id: z
          .string()
          .meta({
            description:
              "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/followers',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'json',
      z
        .looseObject({
          public: z
            .boolean()
            .meta({
              description:
                "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            })
            .exactOptional(),
        })
        .meta({ examples: [{ public: false }] }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/playlists/:playlist_id/followers',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/images',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/playlists/:playlist_id/images',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/playlists/:playlist_id/followers/contains',
    sValidator(
      'param',
      z.object({
        playlist_id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
            examples: ['3cEYpjA9oz9GiPac4AsH4n'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
            examples: ['jmperezperez'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
