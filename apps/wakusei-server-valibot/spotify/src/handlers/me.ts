import { os } from '@orpc/server'
import * as v from 'valibot'
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

export const getMeAudiobooks = os
  .route({
    method: 'GET',
    path: '/me/audiobooks',
    tags: ['Audiobooks', 'Library'],
    summary: "Get User's Saved Audiobooks\n",
    description:
      "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n",
    successDescription: 'Pages of saved audiobooks',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(PagingSavedAudiobookObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMeAudiobooks = os
  .route({
    method: 'PUT',
    path: '/me/audiobooks',
    tags: ['Audiobooks', 'Library'],
    summary: 'Save Audiobooks for Current User\n',
    description:
      "Save one or more audiobooks to the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Audiobook(s) are saved to the library',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteMeAudiobooks = os
  .route({
    method: 'DELETE',
    path: '/me/audiobooks',
    tags: ['Audiobooks', 'Library'],
    summary: "Remove User's Saved Audiobooks\n",
    description:
      "Remove one or more audiobooks from the Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Audiobook(s) have been removed from the library',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeAudiobooksContains = os
  .route({
    method: 'GET',
    path: '/me/audiobooks/contains',
    tags: ['Audiobooks', 'Library'],
    summary: "Check User's Saved Audiobooks\n",
    description:
      "Check if one or more audiobooks are already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    deprecated: true,
    successDescription: 'Array of booleans',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
        }),
      ),
    }),
  )
  .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMe = os
  .route({
    method: 'GET',
    path: '/me',
    tags: ['Users'],
    summary: "Get Current User's Profile\n",
    description:
      "Get detailed profile information about the current user (including the\ncurrent user's username).\n",
    successDescription: 'A user',
  })
  .output(PrivateUserObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMePlaylists = os
  .route({
    method: 'GET',
    path: '/me/playlists',
    tags: ['Playlists', 'Library'],
    summary: "Get Current User's Playlists\n",
    description: 'Get a list of the playlists owned or followed by the current Spotify\nuser.\n',
    successDescription: 'A paged set of playlists',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
            "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
          ),
          v.metadata({ examples: [5] }),
        ),
      ),
    }),
  )
  .output(PagingPlaylistObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postMePlaylists = os
  .route({
    method: 'POST',
    path: '/me/playlists',
    tags: ['Playlists', 'Library'],
    summary: 'Create Playlist\n',
    description:
      'Create a playlist for the current Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
    successStatus: 201,
    successDescription: 'A playlist',
  })
  .input(
    v.pipe(
      v.looseObject({
        name: v.pipe(
          v.string(),
          v.description(
            'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
          ),
        ),
        public: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            ),
          ),
        ),
        collaborative: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
            ),
          ),
        ),
        description: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            ),
          ),
        ),
      }),
      v.metadata({
        examples: [
          { name: 'New Playlist', description: 'New playlist description', public: false },
        ],
      }),
    ),
  )
  .output(PlaylistObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMeLibrary = os
  .route({
    method: 'PUT',
    path: '/me/library',
    tags: ['Library'],
    summary: 'Save Items to Library\n',
    description:
      "Add one or more items to the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
    successDescription: 'Items saved to library',
  })
  .input(
    v.object({
      uris: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
        v.metadata({
          examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteMeLibrary = os
  .route({
    method: 'DELETE',
    path: '/me/library',
    tags: ['Library'],
    summary: 'Remove Items from Library\n',
    description:
      "Remove one or more items from the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
    successDescription: 'Items removed from library',
  })
  .input(
    v.object({
      uris: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
        v.metadata({
          examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeLibraryContains = os
  .route({
    method: 'GET',
    path: '/me/library/contains',
    tags: ['Library'],
    summary: "Check User's Saved Items\n",
    description:
      "Check if one or more items are already saved in the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, artists, users, and playlists.\n",
    successDescription: 'Array of booleans',
  })
  .input(
    v.object({
      uris: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        ),
        v.metadata({
          examples: [
            'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy,spotify:artist:2takcwOaAZWiXQijPHIx7B',
          ],
        }),
      ),
    }),
  )
  .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeAlbums = os
  .route({
    method: 'GET',
    path: '/me/albums',
    tags: ['Albums', 'Library'],
    summary: "Get User's Saved Albums\n",
    description:
      "Get a list of the albums saved in the current Spotify user's 'Your Music' library.\n",
    successDescription: 'Pages of albums',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
      ),
      market: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          ),
          v.metadata({ examples: ['ES'] }),
        ),
      ),
    }),
  )
  .output(PagingSavedAlbumObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMeAlbums = os
  .route({
    method: 'PUT',
    path: '/me/albums',
    tags: ['Albums', 'Library'],
    summary: 'Save Albums for Current User\n',
    description:
      "Save one or more albums to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    deprecated: true,
    successDescription: 'The album is saved',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
        v.metadata({
          examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteMeAlbums = os
  .route({
    method: 'DELETE',
    path: '/me/albums',
    tags: ['Albums', 'Library'],
    summary: "Remove Users' Saved Albums\n",
    description:
      "Remove one or more albums from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Album(s) have been removed from the library',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
        v.metadata({
          examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeAlbumsContains = os
  .route({
    method: 'GET',
    path: '/me/albums/contains',
    tags: ['Albums', 'Library'],
    summary: "Check User's Saved Albums\n",
    description:
      "Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    deprecated: true,
    successDescription: 'Array of booleans',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        ),
        v.metadata({
          examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
        }),
      ),
    }),
  )
  .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeTracks = os
  .route({
    method: 'GET',
    path: '/me/tracks',
    tags: ['Tracks', 'Library'],
    summary: "Get User's Saved Tracks\n",
    description:
      "Get a list of the songs saved in the current Spotify user's 'Your Music' library.\n",
    successDescription: 'Pages of tracks',
  })
  .input(
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
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(PagingSavedTrackObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMeTracks = os
  .route({
    method: 'PUT',
    path: '/me/tracks',
    tags: ['Tracks', 'Library'],
    summary: 'Save Tracks for Current User\n',
    description:
      "Save one or more tracks to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Track saved',
  })
  .input(
    v.looseObject({
      ids: v.pipe(
        v.array(v.string()),
        v.description(
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
        ),
      ),
      timestamped_ids: v.optional(
        v.pipe(
          v.array(
            v.object({
              id: v.pipe(
                v.string(),
                v.description(
                  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
                ),
              ),
              added_at: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(
                    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                  ),
                ),
                v.description(
                  "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
                ),
              ),
            }),
          ),
          v.description(
            "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
          ),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteMeTracks = os
  .route({
    method: 'DELETE',
    path: '/me/tracks',
    tags: ['Tracks', 'Library'],
    summary: "Remove User's Saved Tracks\n",
    description:
      "Remove one or more tracks from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Track removed',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeTracksContains = os
  .route({
    method: 'GET',
    path: '/me/tracks/contains',
    tags: ['Tracks', 'Library'],
    summary: "Check User's Saved Tracks\n",
    description:
      "Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    deprecated: true,
    successDescription: 'Array of booleans',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      ),
    }),
  )
  .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeEpisodes = os
  .route({
    method: 'GET',
    path: '/me/episodes',
    tags: ['Episodes', 'Library'],
    summary: "Get User's Saved Episodes\n",
    description: "Get a list of the episodes saved in the current Spotify user's library.\n",
    successDescription: 'Pages of episodes',
  })
  .input(
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
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(PagingSavedEpisodeObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMeEpisodes = os
  .route({
    method: 'PUT',
    path: '/me/episodes',
    tags: ['Episodes', 'Library'],
    summary: 'Save Episodes for Current User\n',
    description:
      "Save one or more episodes to the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Episode saved',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
        ),
        v.metadata({ examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'] }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteMeEpisodes = os
  .route({
    method: 'DELETE',
    path: '/me/episodes',
    tags: ['Episodes', 'Library'],
    summary: "Remove User's Saved Episodes\n",
    description:
      "Remove one or more episodes from the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Episode removed',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeEpisodesContains = os
  .route({
    method: 'GET',
    path: '/me/episodes/contains',
    tags: ['Episodes', 'Library'],
    summary: "Check User's Saved Episodes\n",
    description:
      "Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    deprecated: true,
    successDescription: 'Array of booleans',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
        ),
        v.metadata({ examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'] }),
      ),
    }),
  )
  .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeShows = os
  .route({
    method: 'GET',
    path: '/me/shows',
    tags: ['Shows', 'Library'],
    summary: "Get User's Saved Shows\n",
    description:
      "Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n",
    successDescription: 'Pages of shows',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(PagingSavedShowObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMeShows = os
  .route({
    method: 'PUT',
    path: '/me/shows',
    tags: ['Shows', 'Library'],
    summary: 'Save Shows for Current User\n',
    description:
      "Save one or more shows to current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Show saved',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
        v.metadata({ examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'] }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteMeShows = os
  .route({
    method: 'DELETE',
    path: '/me/shows',
    tags: ['Shows', 'Library'],
    summary: "Remove User's Saved Shows\n",
    description:
      "Delete one or more shows from current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    deprecated: true,
    successDescription: 'Show removed',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
        v.metadata({ examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'] }),
      ),
      market: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          ),
          v.metadata({ examples: ['ES'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeShowsContains = os
  .route({
    method: 'GET',
    path: '/me/shows/contains',
    tags: ['Shows', 'Library'],
    summary: "Check User's Saved Shows\n",
    description:
      "Check if one or more shows is already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    deprecated: true,
    successDescription: 'Array of booleans',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        ),
        v.metadata({ examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'] }),
      ),
    }),
  )
  .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeFollowing = os
  .route({
    method: 'GET',
    path: '/me/following',
    tags: ['Users', 'Library', 'Artists'],
    summary: 'Get Followed Artists\n',
    description: "Get the current user's followed artists.\n",
    successDescription: 'A paged set of artists',
  })
  .input(
    v.object({
      type: v.pipe(
        v.literal('artist'),
        v.description('The ID type: currently only `artist` is supported.\n'),
        v.metadata({ examples: ['artist'] }),
      ),
      after: v.optional(
        v.pipe(
          v.string(),
          v.description('The last artist ID retrieved from the previous request.\n'),
          v.metadata({ examples: ['0I2XqVXqHScXjHhk6AYYRe'] }),
        ),
      ),
      limit: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(v.object({ artists: CursorPagingSimplifiedArtistObjectSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMeFollowing = os
  .route({
    method: 'PUT',
    path: '/me/following',
    tags: ['Users', 'Artists', 'Library'],
    summary: 'Follow Artists or Users\n',
    description:
      'Add the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
    deprecated: true,
    successStatus: 204,
    successDescription: 'Artist or user followed',
  })
  .input(
    v.object({
      type: v.pipe(
        v.picklist(['artist', 'user']),
        v.description('The ID type.\n'),
        v.metadata({ examples: ['artist'] }),
      ),
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
        ),
        v.metadata({
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteMeFollowing = os
  .route({
    method: 'DELETE',
    path: '/me/following',
    tags: ['Users', 'Artists', 'Library'],
    summary: 'Unfollow Artists or Users\n',
    description:
      'Remove the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
    deprecated: true,
    successStatus: 204,
    successDescription: 'Artist or user unfollowed',
  })
  .input(
    v.object({
      type: v.pipe(
        v.picklist(['artist', 'user']),
        v.description('The ID type: either `artist` or `user`.\n'),
        v.metadata({ examples: ['artist'] }),
      ),
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        ),
        v.metadata({
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeFollowingContains = os
  .route({
    method: 'GET',
    path: '/me/following/contains',
    tags: ['Users', 'Artists', 'Library'],
    summary: 'Check If User Follows Artists or Users\n',
    description:
      "Check to see if the current user is following one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    deprecated: true,
    successDescription: 'Array of booleans',
  })
  .input(
    v.object({
      type: v.pipe(
        v.picklist(['artist', 'user']),
        v.description('The ID type: either `artist` or `user`.\n'),
        v.metadata({ examples: ['artist'] }),
      ),
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        ),
        v.metadata({
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      ),
    }),
  )
  .output(v.pipe(v.array(v.boolean()), v.metadata({ examples: [[false, true]] })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMePlayer = os
  .route({
    method: 'GET',
    path: '/me/player',
    tags: ['Player'],
    summary: 'Get Playback State\n',
    description:
      'Get information about the user’s current playback state, including track or episode, progress, and active device.\n',
    successDescription: 'Information about playback',
  })
  .input(
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
      additional_types: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
          ),
        ),
      ),
    }),
  )
  .output(CurrentlyPlayingContextObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMePlayer = os
  .route({
    method: 'PUT',
    path: '/me/player',
    tags: ['Player'],
    summary: 'Transfer Playback\n',
    description:
      'Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    successStatus: 204,
    successDescription: 'Playback transferred',
  })
  .input(
    v.pipe(
      v.looseObject({
        device_ids: v.pipe(
          v.array(v.string()),
          v.description(
            'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
          ),
        ),
        play: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
            ),
          ),
        ),
      }),
      v.metadata({ examples: [{ device_ids: ['74ASZWbe4lXaubB36ztrGX'] }] }),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMePlayerDevices = os
  .route({
    method: 'GET',
    path: '/me/player/devices',
    tags: ['Player'],
    summary: 'Get Available Devices\n',
    description:
      'Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.\n',
    successDescription: 'A set of devices',
  })
  .output(v.object({ devices: v.array(DeviceObjectSchema) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMePlayerCurrentlyPlaying = os
  .route({
    method: 'GET',
    path: '/me/player/currently-playing',
    tags: ['Player'],
    summary: 'Get Currently Playing Track\n',
    description: "Get the object currently being played on the user's Spotify account.\n",
    successDescription: 'Information about the currently playing track',
  })
  .input(
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
      additional_types: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
          ),
        ),
      ),
    }),
  )
  .output(CurrentlyPlayingObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMePlayerPlay = os
  .route({
    method: 'PUT',
    path: '/me/player/play',
    tags: ['Player'],
    summary: 'Start/Resume Playback\n',
    description:
      "Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    successStatus: 204,
    successDescription: 'Playback started',
  })
  .input(
    v.object({
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
      context_uri: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
          ),
        ),
      ),
      uris: v.optional(
        v.pipe(
          v.array(v.string()),
          v.description(
            'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
          ),
        ),
      ),
      offset: v.optional(
        v.pipe(
          v.any(),
          v.description(
            'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
          ),
        ),
      ),
      position_ms: v.optional(
        v.pipe(
          v.pipe(v.number(), v.integer()),
          v.description(
            'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
          ),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMePlayerPause = os
  .route({
    method: 'PUT',
    path: '/me/player/pause',
    tags: ['Player'],
    summary: 'Pause Playback\n',
    description:
      "Pause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    successStatus: 204,
    successDescription: 'Playback paused',
  })
  .input(
    v.object({
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postMePlayerNext = os
  .route({
    method: 'POST',
    path: '/me/player/next',
    tags: ['Player'],
    summary: 'Skip To Next\n',
    description:
      'Skips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    successStatus: 204,
    successDescription: 'Command sent',
  })
  .input(
    v.object({
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postMePlayerPrevious = os
  .route({
    method: 'POST',
    path: '/me/player/previous',
    tags: ['Player'],
    summary: 'Skip To Previous\n',
    description:
      'Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    successStatus: 204,
    successDescription: 'Command sent',
  })
  .input(
    v.object({
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMePlayerSeek = os
  .route({
    method: 'PUT',
    path: '/me/player/seek',
    tags: ['Player'],
    summary: 'Seek To Position\n',
    description:
      'Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    successStatus: 204,
    successDescription: 'Command sent',
  })
  .input(
    v.object({
      position_ms: v.pipe(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        v.description(
          'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
        ),
        v.metadata({ examples: [25000] }),
      ),
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMePlayerRepeat = os
  .route({
    method: 'PUT',
    path: '/me/player/repeat',
    tags: ['Player'],
    summary: 'Set Repeat Mode\n',
    description:
      "Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    successStatus: 204,
    successDescription: 'Command sent',
  })
  .input(
    v.object({
      state: v.pipe(
        v.string(),
        v.description(
          '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
        ),
        v.metadata({ examples: ['context'] }),
      ),
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMePlayerVolume = os
  .route({
    method: 'PUT',
    path: '/me/player/volume',
    tags: ['Player'],
    summary: 'Set Playback Volume\n',
    description:
      'Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    successStatus: 204,
    successDescription: 'Command sent',
  })
  .input(
    v.object({
      volume_percent: v.pipe(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        v.description('The volume to set. Must be a value from 0 to 100 inclusive.\n'),
        v.metadata({ examples: [50] }),
      ),
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putMePlayerShuffle = os
  .route({
    method: 'PUT',
    path: '/me/player/shuffle',
    tags: ['Player'],
    summary: 'Toggle Playback Shuffle\n',
    description:
      'Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    successStatus: 204,
    successDescription: 'Command sent',
  })
  .input(
    v.object({
      state: v.pipe(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
        v.description(
          "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
        ),
        v.metadata({ examples: [true] }),
      ),
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMePlayerRecentlyPlayed = os
  .route({
    method: 'GET',
    path: '/me/player/recently-played',
    tags: ['Player'],
    summary: 'Get Recently Played Tracks\n',
    description:
      "Get tracks from the current user's recently played tracks.\n_**Note**: Currently doesn't support podcast episodes._\n",
    successDescription: 'A paged set of tracks',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
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
      ),
      after: v.optional(
        v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          v.description(
            'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
          ),
          v.metadata({ examples: [1484811043508] }),
        ),
      ),
      before: v.optional(
        v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          v.description(
            'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
          ),
        ),
      ),
    }),
  )
  .output(CursorPagingPlayHistoryObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMePlayerQueue = os
  .route({
    method: 'GET',
    path: '/me/player/queue',
    tags: ['Player'],
    summary: "Get the User's Queue\n",
    description: "Get the list of objects that make up the user's queue.\n",
    successDescription: 'Information about the queue',
  })
  .output(QueueObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postMePlayerQueue = os
  .route({
    method: 'POST',
    path: '/me/player/queue',
    tags: ['Player'],
    summary: 'Add Item to Playback Queue\n',
    description:
      "Add an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    successStatus: 204,
    successDescription: 'Command received',
  })
  .input(
    v.object({
      uri: v.pipe(
        v.string(),
        v.description(
          'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
        ),
        v.metadata({ examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'] }),
      ),
      device_id: v.optional(
        v.pipe(
          v.string(),
          v.description(
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          ),
          v.metadata({ examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'] }),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeTopArtists = os
  .route({
    method: 'GET',
    path: '/me/top/artists',
    tags: ['Users', 'Artists', 'Library'],
    summary: "Get User's Top Artists\n",
    description: "Get the current user's top artists based on calculated affinity.\n",
    successDescription: 'Pages of artists',
  })
  .input(
    v.object({
      time_range: v.optional(
        v.pipe(
          v.optional(v.string(), 'medium_term'),
          v.description(
            'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
          ),
          v.metadata({ examples: ['medium_term'] }),
        ),
      ),
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(PagingArtistObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getMeTopTracks = os
  .route({
    method: 'GET',
    path: '/me/top/tracks',
    tags: ['Users', 'Tracks', 'Library'],
    summary: "Get User's Top Tracks\n",
    description: "Get the current user's top tracks based on calculated affinity.\n",
    successDescription: 'Pages of tracks',
  })
  .input(
    v.object({
      time_range: v.optional(
        v.pipe(
          v.optional(v.string(), 'medium_term'),
          v.description(
            'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
          ),
          v.metadata({ examples: ['medium_term'] }),
        ),
      ),
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(PagingTrackObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
