import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'

export const meHandler = new Hono()
  .get(
    '/me/audiobooks',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/audiobooks',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
          examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
        }),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/me/audiobooks',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
          examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/audiobooks/contains',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
          examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
        }),
      }),
    ),
    (c) => {},
  )
  .get('/me', (c) => {})
  .get(
    '/me/playlists',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/me/playlists',
    tbValidator(
      'json',
      Type.Object(
        {
          name: Type.String({
            description:
              'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
          }),
          public: Type.Optional(
            Type.Boolean({
              description:
                "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            }),
          ),
          collaborative: Type.Optional(
            Type.Boolean({
              description:
                'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
            }),
          ),
          description: Type.Optional(
            Type.String({
              description:
                'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            }),
          ),
        },
        {
          examples: [
            { name: 'New Playlist', description: 'New playlist description', public: false },
          ],
        },
      ),
    ),
    (c) => {},
  )
  .put(
    '/me/library',
    tbValidator(
      'query',
      Type.Object({
        uris: Type.String({
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
          examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
        }),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/me/library',
    tbValidator(
      'query',
      Type.Object({
        uris: Type.String({
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
          examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/library/contains',
    tbValidator(
      'query',
      Type.Object({
        uris: Type.String({
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
          examples: [
            'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy,spotify:artist:2takcwOaAZWiXQijPHIx7B',
          ],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/albums',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/albums',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
          examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/me/albums',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
          examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/albums/contains',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
          examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/tracks',
    tbValidator(
      'query',
      Type.Object({
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/tracks',
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Array(Type.String(), {
          description:
            'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
        }),
        timestamped_ids: Type.Optional(
          Type.Array(
            Type.Object({
              id: Type.String({
                description:
                  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
              }),
              added_at: Type.String({
                format: 'date-time',
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
    ),
    (c) => {},
  )
  .delete(
    '/me/tracks',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/tracks/contains',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/episodes',
    tbValidator(
      'query',
      Type.Object({
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/episodes',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
          examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Array(Type.String(), {
          description:
            'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        }),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/me/episodes',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/episodes/contains',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
          examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/shows',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/shows',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/me/shows',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
        }),
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/shows/contains',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/following',
    tbValidator(
      'query',
      Type.Object({
        type: Type.Literal('artist', {
          description: 'The ID type: currently only `artist` is supported.\n',
          examples: ['artist'],
        }),
        after: Type.Optional(
          Type.String({
            description: 'The last artist ID retrieved from the previous request.\n',
            examples: ['0I2XqVXqHScXjHhk6AYYRe'],
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/following',
    tbValidator(
      'query',
      Type.Object({
        type: Type.Union([Type.Literal('artist'), Type.Literal('user')], {
          description: 'The ID type.\n',
          examples: ['artist'],
        }),
        ids: Type.String({
          description:
            'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Array(Type.String(), {
          description:
            'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        }),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/me/following',
    tbValidator(
      'query',
      Type.Object({
        type: Type.Union([Type.Literal('artist'), Type.Literal('user')], {
          description: 'The ID type: either `artist` or `user`.\n',
          examples: ['artist'],
        }),
        ids: Type.String({
          description:
            'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      }),
    ),
    tbValidator(
      'json',
      Type.Object({
        ids: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/following/contains',
    tbValidator(
      'query',
      Type.Object({
        type: Type.Union([Type.Literal('artist'), Type.Literal('user')], {
          description: 'The ID type: either `artist` or `user`.\n',
          examples: ['artist'],
        }),
        ids: Type.String({
          description:
            'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/player',
    tbValidator(
      'query',
      Type.Object({
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
        additional_types: Type.Optional(
          Type.String({
            description:
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/player',
    tbValidator(
      'json',
      Type.Object(
        {
          device_ids: Type.Array(Type.String(), {
            description:
              'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
          }),
          play: Type.Optional(
            Type.Boolean({
              description:
                '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
            }),
          ),
        },
        { examples: [{ device_ids: ['74ASZWbe4lXaubB36ztrGX'] }] },
      ),
    ),
    (c) => {},
  )
  .get('/me/player/devices', (c) => {})
  .get(
    '/me/player/currently-playing',
    tbValidator(
      'query',
      Type.Object({
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
        additional_types: Type.Optional(
          Type.String({
            description:
              'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/player/play',
    tbValidator(
      'query',
      Type.Object({
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    tbValidator(
      'json',
      Type.Object(
        {
          context_uri: Type.Optional(
            Type.String({
              description:
                'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
            }),
          ),
          uris: Type.Optional(
            Type.Array(Type.String(), {
              description:
                'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
            }),
          ),
          offset: Type.Optional(
            Type.Any({
              description:
                'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
            }),
          ),
          position_ms: Type.Optional(
            Type.Integer({
              description:
                'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
            }),
          ),
        },
        {
          examples: [
            {
              context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
              offset: { position: 5 },
              position_ms: 0,
            },
          ],
        },
      ),
    ),
    (c) => {},
  )
  .put(
    '/me/player/pause',
    tbValidator(
      'query',
      Type.Object({
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/me/player/next',
    tbValidator(
      'query',
      Type.Object({
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/me/player/previous',
    tbValidator(
      'query',
      Type.Object({
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/player/seek',
    tbValidator(
      'query',
      Type.Object({
        position_ms: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/player/repeat',
    tbValidator(
      'query',
      Type.Object({
        state: Type.String({
          description:
            '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
          examples: ['context'],
        }),
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/player/volume',
    tbValidator(
      'query',
      Type.Object({
        volume_percent: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .put(
    '/me/player/shuffle',
    tbValidator(
      'query',
      Type.Object({
        state: Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
          .Decode((value) => value === 'true')
          .Encode((value) => (value ? 'true' : 'false')),
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/player/recently-played',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        before: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .get('/me/player/queue', (c) => {})
  .post(
    '/me/player/queue',
    tbValidator(
      'query',
      Type.Object({
        uri: Type.String({
          description:
            'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
          examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'],
        }),
        device_id: Type.Optional(
          Type.String({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/top/artists',
    tbValidator(
      'query',
      Type.Object({
        time_range: Type.Optional(
          Type.String({
            description:
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            examples: ['medium_term'],
            default: 'medium_term',
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/me/top/tracks',
    tbValidator(
      'query',
      Type.Object({
        time_range: Type.Optional(
          Type.String({
            description:
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            examples: ['medium_term'],
            default: 'medium_term',
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
