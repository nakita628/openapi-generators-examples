import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const meHandler = new Hono()
  .get(
    '/me/audiobooks',
    sValidator(
      'query',
      z.object({
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/audiobooks',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/audiobooks',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/audiobooks/contains',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me', (c) => { throw new Error('Not implemented') })
  .get(
    '/me/playlists',
    sValidator(
      'query',
      z.object({
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
              "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
            examples: [5],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/playlists',
    sValidator(
      'json',
      z
        .looseObject({
          name: z
            .string()
            .meta({
              description:
                'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
            }),
          public: z
            .boolean()
            .meta({
              description:
                "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            })
            .exactOptional(),
          collaborative: z
            .boolean()
            .meta({
              description:
                'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
            })
            .exactOptional(),
          description: z
            .string()
            .meta({
              description:
                'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            })
            .exactOptional(),
        })
        .meta({
          examples: [
            { name: 'New Playlist', description: 'New playlist description', public: false },
          ],
        }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/library',
    sValidator(
      'query',
      z.object({
        uris: z
          .string()
          .meta({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
            examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/library',
    sValidator(
      'query',
      z.object({
        uris: z
          .string()
          .meta({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
            examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/library/contains',
    sValidator(
      'query',
      z.object({
        uris: z
          .string()
          .meta({
            description:
              'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
            examples: [
              'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy,spotify:artist:2takcwOaAZWiXQijPHIx7B',
            ],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/albums',
    sValidator(
      'query',
      z.object({
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
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/albums',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
            examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/albums',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
            examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/albums/contains',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
            examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/tracks',
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/tracks',
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
          }),
        timestamped_ids: z
          .array(
            z.object({
              id: z
                .string()
                .meta({
                  description:
                    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
                }),
              added_at: z.iso
                .datetime({ offset: true })
                .meta({
                  description:
                    "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
                }),
            }),
          )
          .meta({
            description:
              "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/tracks',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/tracks/contains',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/episodes',
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/episodes',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
            examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/episodes',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/episodes/contains',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
            examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/shows',
    sValidator(
      'query',
      z.object({
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/shows',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.object({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/shows',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
      }),
    ),
    sValidator(
      'json',
      z.object({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/shows/contains',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/following',
    sValidator(
      'query',
      z.object({
        type: z
          .literal('artist')
          .meta({
            description: 'The ID type: currently only `artist` is supported.\n',
            examples: ['artist'],
          }),
        after: z
          .string()
          .meta({
            description: 'The last artist ID retrieved from the previous request.\n',
            examples: ['0I2XqVXqHScXjHhk6AYYRe'],
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/following',
    sValidator(
      'query',
      z.object({
        type: z
          .enum(['artist', 'user'])
          .meta({ description: 'The ID type.\n', examples: ['artist'] }),
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/me/following',
    sValidator(
      'query',
      z.object({
        type: z
          .enum(['artist', 'user'])
          .meta({ description: 'The ID type: either `artist` or `user`.\n', examples: ['artist'] }),
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
      }),
    ),
    sValidator(
      'json',
      z.looseObject({
        ids: z
          .array(z.string())
          .meta({
            description:
              'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/following/contains',
    sValidator(
      'query',
      z.object({
        type: z
          .enum(['artist', 'user'])
          .meta({ description: 'The ID type: either `artist` or `user`.\n', examples: ['artist'] }),
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/player',
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
    '/me/player',
    sValidator(
      'json',
      z
        .looseObject({
          device_ids: z
            .array(z.string())
            .meta({
              description:
                'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
            }),
          play: z
            .boolean()
            .meta({
              description:
                '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
            })
            .exactOptional(),
        })
        .meta({ examples: [{ device_ids: ['74ASZWbe4lXaubB36ztrGX'] }] }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me/player/devices', (c) => { throw new Error('Not implemented') })
  .get(
    '/me/player/currently-playing',
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
    '/me/player/play',
    sValidator(
      'query',
      z.object({
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    sValidator(
      'json',
      z
        .looseObject({
          context_uri: z
            .string()
            .meta({
              description:
                'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
            })
            .exactOptional(),
          uris: z
            .array(z.string())
            .meta({
              description:
                'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
            })
            .exactOptional(),
          offset: z
            .any()
            .meta({
              description:
                'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
            })
            .exactOptional(),
          position_ms: z
            .int()
            .meta({
              description:
                'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
            })
            .exactOptional(),
        })
        .meta({
          examples: [
            {
              context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
              offset: { position: 5 },
              position_ms: 0,
            },
          ],
        }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/pause',
    sValidator(
      'query',
      z.object({
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/player/next',
    sValidator(
      'query',
      z.object({
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/me/player/previous',
    sValidator(
      'query',
      z.object({
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/seek',
    sValidator(
      'query',
      z.object({
        position_ms: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
            examples: [25000],
          }),
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/repeat',
    sValidator(
      'query',
      z.object({
        state: z
          .string()
          .meta({
            description:
              '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
            examples: ['context'],
          }),
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/volume',
    sValidator(
      'query',
      z.object({
        volume_percent: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description: 'The volume to set. Must be a value from 0 to 100 inclusive.\n',
            examples: [50],
          }),
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/me/player/shuffle',
    sValidator(
      'query',
      z.object({
        state: z
          .stringbool()
          .meta({
            description:
              "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
            examples: [true],
          }),
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/player/recently-played',
    sValidator(
      'query',
      z.object({
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
        after: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
            examples: [1484811043508],
          })
          .exactOptional(),
        before: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/me/player/queue', (c) => { throw new Error('Not implemented') })
  .post(
    '/me/player/queue',
    sValidator(
      'query',
      z.object({
        uri: z
          .string()
          .meta({
            description:
              'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
            examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'],
          }),
        device_id: z
          .string()
          .meta({
            description:
              "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
            examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/top/artists',
    sValidator(
      'query',
      z.object({
        time_range: z
          .string()
          .default('medium_term')
          .meta({
            description:
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            examples: ['medium_term'],
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/me/top/tracks',
    sValidator(
      'query',
      z.object({
        time_range: z
          .string()
          .default('medium_term')
          .meta({
            description:
              'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
            examples: ['medium_term'],
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
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
