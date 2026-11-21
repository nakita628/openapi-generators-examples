import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'

export const meHandler = new Hono()
  .get(
    '/me/audiobooks',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/audiobooks',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/audiobooks',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/audiobooks/contains',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me', (c) => { throw new Error('Not implemented') })
  .get(
    '/me/playlists',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/playlists',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.String.annotate({
            description:
              'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
          }),
          public: Schema.optional(
            Schema.Boolean.annotate({
              description:
                "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            }),
          ),
          collaborative: Schema.optional(
            Schema.Boolean.annotate({
              description:
                'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
            }),
          ),
          description: Schema.optional(
            Schema.String.annotate({
              description:
                'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            }),
          ),
        }).annotate({
          jsonSchemaExamples: [
            { name: 'New Playlist', description: 'New playlist description', public: false },
          ],
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/library',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          uris: Schema.String.annotate({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
            jsonSchemaExamples: [
              'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/library',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          uris: Schema.String.annotate({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
            jsonSchemaExamples: [
              'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/library/contains',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          uris: Schema.String.annotate({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
            jsonSchemaExamples: [
              'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy,spotify:artist:2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/albums',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
          market: Schema.optional(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/albums',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
            jsonSchemaExamples: [
              '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
            ],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/albums',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
            jsonSchemaExamples: [
              '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
            ],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/albums/contains',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
            jsonSchemaExamples: [
              '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/tracks',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          market: Schema.optional(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/tracks',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.Array(Schema.String).annotate({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
          }),
          timestamped_ids: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.String.annotate({
                  description:
                    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
                }),
                added_at: Schema.String.check(
                  Schema.isPattern(
                    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                  ),
                ).annotate({
                  description:
                    "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
                }),
              }),
            ).annotate({
              description:
                "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/tracks',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/tracks/contains',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/episodes',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          market: Schema.optional(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/episodes',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
            jsonSchemaExamples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.Array(Schema.String).annotate({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/episodes',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/episodes/contains',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
            jsonSchemaExamples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/shows',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/shows',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            jsonSchemaExamples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/shows',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            jsonSchemaExamples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
          market: Schema.optional(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/shows/contains',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            jsonSchemaExamples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/following',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          type: Schema.Literal('artist').annotate({
            description: 'The ID type: currently only `artist` is supported.\n',
            jsonSchemaExamples: ['artist'],
          }),
          after: Schema.optional(
            Schema.String.annotate({
              description: 'The last artist ID retrieved from the previous request.\n',
              jsonSchemaExamples: ['0I2XqVXqHScXjHhk6AYYRe'],
            }),
          ),
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/following',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          type: Schema.Literals(['artist', 'user']).annotate({
            description: 'The ID type.\n',
            jsonSchemaExamples: ['artist'],
          }),
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
            jsonSchemaExamples: [
              '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
            ],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.Array(Schema.String).annotate({
            description:
              'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/following',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          type: Schema.Literals(['artist', 'user']).annotate({
            description: 'The ID type: either `artist` or `user`.\n',
            jsonSchemaExamples: ['artist'],
          }),
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
            jsonSchemaExamples: [
              '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
            ],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/following/contains',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          type: Schema.Literals(['artist', 'user']).annotate({
            description: 'The ID type: either `artist` or `user`.\n',
            jsonSchemaExamples: ['artist'],
          }),
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
            jsonSchemaExamples: [
              '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
            ],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/player',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          market: Schema.optional(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
          additional_types: Schema.optional(
            Schema.String.annotate({
              description:
                'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          device_ids: Schema.Array(Schema.String).annotate({
            description:
              'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
          }),
          play: Schema.optional(
            Schema.Boolean.annotate({
              description:
                '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
            }),
          ),
        }).annotate({ jsonSchemaExamples: [{ device_ids: ['74ASZWbe4lXaubB36ztrGX'] }] }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me/player/devices', (c) => { throw new Error('Not implemented') })
  .get(
    '/me/player/currently-playing',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          market: Schema.optional(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
          additional_types: Schema.optional(
            Schema.String.annotate({
              description:
                'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/play',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          context_uri: Schema.optional(
            Schema.String.annotate({
              description:
                'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
            }),
          ),
          uris: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
            }),
          ),
          offset: Schema.optional(
            Schema.Unknown.annotate({
              description:
                'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
            }),
          ),
          position_ms: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
            }),
          ),
        }).annotate({
          jsonSchemaExamples: [
            {
              context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
              offset: { position: 5 },
              position_ms: 0,
            },
          ],
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/pause',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/player/next',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/player/previous',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/seek',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          position_ms: Schema.FiniteFromString.check(Schema.isInt()).annotate({
            description:
              'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
            jsonSchemaExamples: [25000],
          }),
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/repeat',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          state: Schema.String.annotate({
            description:
              '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
            jsonSchemaExamples: ['context'],
          }),
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/volume',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          volume_percent: Schema.FiniteFromString.check(Schema.isInt()).annotate({
            description: 'The volume to set. Must be a value from 0 to 100 inclusive.\n',
            jsonSchemaExamples: [50],
          }),
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/shuffle',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          state: Schema.String.check(
            Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          )
            .pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            )
            .annotate({
              description:
                "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
              jsonSchemaExamples: [true],
            }),
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/player/recently-played',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          after: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt()).annotate({
              description:
                'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
              jsonSchemaExamples: [1484811043508],
            }),
          ),
          before: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt()).annotate({
              description:
                'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me/player/queue', (c) => { throw new Error('Not implemented') })
  .post(
    '/me/player/queue',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          uri: Schema.String.annotate({
            description:
              'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
            jsonSchemaExamples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'],
          }),
          device_id: Schema.optional(
            Schema.String.annotate({
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              jsonSchemaExamples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/top/artists',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          time_range: Schema.String.pipe(
            Schema.withDecodingDefaultType(Effect.succeed('medium_term')),
          ).annotate({
            description:
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            jsonSchemaExamples: ['medium_term'],
          }),
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/top/tracks',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          time_range: Schema.String.pipe(
            Schema.withDecodingDefaultType(Effect.succeed('medium_term')),
          ).annotate({
            description:
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            jsonSchemaExamples: ['medium_term'],
          }),
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
