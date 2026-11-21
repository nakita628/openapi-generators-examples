import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const meHandler = new Hono()
  .get(
    '/me/audiobooks',
    sValidator(
      'query',
      type({
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/audiobooks',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/audiobooks',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/audiobooks/contains',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me', (c) => { throw new Error('Not implemented') })
  .get(
    '/me/playlists',
    sValidator(
      'query',
      type({
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
            "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/playlists',
    sValidator(
      'json',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/library',
    sValidator(
      'query',
      type({
        uris: type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/library',
    sValidator(
      'query',
      type({
        uris: type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/library/contains',
    sValidator(
      'query',
      type({
        uris: type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/albums',
    sValidator(
      'query',
      type({
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
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/albums',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        'ids?': type('string[]').describe(
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/albums',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        'ids?': type('string[]').describe(
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/albums/contains',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/tracks',
    sValidator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/tracks',
    sValidator(
      'json',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/tracks',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        'ids?': type('string[]').describe(
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/tracks/contains',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/episodes',
    sValidator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/episodes',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        ids: type('string[]').describe(
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/episodes',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        'ids?': type('string[]').describe(
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/episodes/contains',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/shows',
    sValidator(
      'query',
      type({
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/shows',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        'ids?': type('string[]').describe(
          'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/shows',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        'ids?': type('string[]').describe(
          'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/shows/contains',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/following',
    sValidator(
      'query',
      type({
        type: type("'artist'").describe('The ID type: currently only `artist` is supported.\n'),
        'after?': type('string').describe(
          'The last artist ID retrieved from the previous request.\n',
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/following',
    sValidator(
      'query',
      type({
        type: type("'artist' | 'user'").describe('The ID type.\n'),
        ids: type('string').describe(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        ids: type('string[]').describe(
          'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/following',
    sValidator(
      'query',
      type({
        type: type("'artist' | 'user'").describe('The ID type: either `artist` or `user`.\n'),
        ids: type('string').describe(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        'ids?': type('string[]').describe(
          'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/following/contains',
    sValidator(
      'query',
      type({
        type: type("'artist' | 'user'").describe('The ID type: either `artist` or `user`.\n'),
        ids: type('string').describe(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/player',
    sValidator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player',
    sValidator(
      'json',
      type({
        device_ids: type('string[]').describe(
          'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
        ),
        'play?': type('boolean').describe(
          '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
        ),
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me/player/devices', (c) => { throw new Error('Not implemented') })
  .get(
    '/me/player/currently-playing',
    sValidator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/play',
    sValidator(
      'query',
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
        ),
      }),
    ),
    sValidator(
      'json',
      type({
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
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/pause',
    sValidator(
      'query',
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/player/next',
    sValidator(
      'query',
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/player/previous',
    sValidator(
      'query',
      type({
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/seek',
    sValidator(
      'query',
      type({
        position_ms: type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
          ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/repeat',
    sValidator(
      'query',
      type({
        state: type('string').describe(
          '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
        ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/volume',
    sValidator(
      'query',
      type({
        volume_percent: type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe('The volume to set. Must be a value from 0 to 100 inclusive.\n'),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/shuffle',
    sValidator(
      'query',
      type({
        state: type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
          ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/player/recently-played',
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 50')
          .describe(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
        'after?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
          ),
        'before?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me/player/queue', (c) => { throw new Error('Not implemented') })
  .post(
    '/me/player/queue',
    sValidator(
      'query',
      type({
        uri: type('string').describe(
          'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
        ),
        'device_id?': type('string').describe(
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/top/artists',
    sValidator(
      'query',
      type({
        'time_range?': type('string').describe(
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/top/tracks',
    sValidator(
      'query',
      type({
        'time_range?': type('string').describe(
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
