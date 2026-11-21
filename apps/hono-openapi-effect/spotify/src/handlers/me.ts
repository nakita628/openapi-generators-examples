import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  ErrorObjectSchema,
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ManyDevicesResponse,
  PagedPlaylistsResponse,
  CursorPagedArtistsResponse,
  CursorPagedPlayHistoryResponse,
  OnePrivateUserResponse,
  OnePlaylistResponse,
  PagingSavedTrackObjectResponse,
  PagingSavedAlbumObjectResponse,
  PagingSavedShowObjectResponse,
  PagingSavedEpisodeObjectResponse,
  ArrayOfBooleansResponse,
  QueueResponse,
  OneCurrentlyPlayingResponse,
  OneCurrentlyPlayingTrackResponse,
  PagingArtistObjectResponse,
  PagingSavedAudiobookObjectResponse,
  PagingTrackObjectResponse,
} from '../components'

export const meHandler = new Hono()
  .get(
    '/me/audiobooks',
    describeRoute({
      tags: ['Audiobooks', 'Library'],
      operationId: 'get-users-saved-audiobooks',
      summary: "Get User's Saved Audiobooks\n",
      description:
        "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n",
      responses: {
        '200': PagingSavedAudiobookObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/audiobooks',
    describeRoute({
      deprecated: true,
      tags: ['Audiobooks', 'Library'],
      operationId: 'save-audiobooks-user',
      summary: 'Save Audiobooks for Current User\n',
      description:
        "Save one or more audiobooks to the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      responses: {
        '200': { description: 'Audiobook(s) are saved to the library' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    (c) => {},
  )
  .delete(
    '/me/audiobooks',
    describeRoute({
      deprecated: true,
      tags: ['Audiobooks', 'Library'],
      operationId: 'remove-audiobooks-user',
      summary: "Remove User's Saved Audiobooks\n",
      description:
        "Remove one or more audiobooks from the Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      responses: {
        '200': { description: 'Audiobook(s) have been removed from the library' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/audiobooks/contains',
    describeRoute({
      tags: ['Audiobooks', 'Library'],
      operationId: 'check-users-saved-audiobooks',
      summary: "Check User's Saved Audiobooks\n",
      deprecated: true,
      description:
        "Check if one or more audiobooks are already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      responses: {
        '200': ArrayOfBooleansResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me',
    describeRoute({
      tags: ['Users'],
      operationId: 'get-current-users-profile',
      summary: "Get Current User's Profile\n",
      description:
        "Get detailed profile information about the current user (including the\ncurrent user's username).\n",
      responses: {
        '200': OnePrivateUserResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-private', 'user-read-email'] }],
    }),
    (c) => {},
  )
  .get(
    '/me/playlists',
    describeRoute({
      tags: ['Playlists', 'Library'],
      operationId: 'get-a-list-of-current-users-playlists',
      summary: "Get Current User's Playlists\n",
      description: 'Get a list of the playlists owned or followed by the current Spotify\nuser.\n',
      responses: {
        '200': PagedPlaylistsResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-read-private'] }],
    }),
    validator(
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
    (c) => {},
  )
  .post(
    '/me/playlists',
    describeRoute({
      tags: ['Playlists', 'Library'],
      operationId: 'create-playlist',
      summary: 'Create Playlist\n',
      description:
        'Create a playlist for the current Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
      responses: {
        '201': OnePlaylistResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/library',
    describeRoute({
      tags: ['Library'],
      operationId: 'save-library-items',
      summary: 'Save Items to Library\n',
      description:
        "Add one or more items to the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
      responses: {
        '200': { description: 'Items saved to library' },
        '400': {
          description:
            'Bad Request. Possible reasons: missing `uris` parameter, invalid URI format, unsupported URI type, or more than 40 URIs provided.\n',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorObjectSchema)) },
          },
        },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [
        { oauth_2_0: ['user-library-modify', 'user-follow-modify', 'playlist-modify-public'] },
      ],
    }),
    validator(
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
    (c) => {},
  )
  .delete(
    '/me/library',
    describeRoute({
      tags: ['Library'],
      operationId: 'remove-library-items',
      summary: 'Remove Items from Library\n',
      description:
        "Remove one or more items from the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
      responses: {
        '200': { description: 'Items removed from library' },
        '400': {
          description:
            'Bad Request. Possible reasons: missing `uris` parameter, invalid URI format, unsupported URI type, or more than 40 URIs provided.\n',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorObjectSchema)) },
          },
        },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [
        { oauth_2_0: ['user-library-modify', 'user-follow-modify', 'playlist-modify-public'] },
      ],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/library/contains',
    describeRoute({
      tags: ['Library'],
      operationId: 'check-library-contains',
      summary: "Check User's Saved Items\n",
      description:
        "Check if one or more items are already saved in the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, artists, users, and playlists.\n",
      responses: {
        '200': ArrayOfBooleansResponse,
        '400': {
          description:
            'Bad Request. Possible reasons: missing `uris` parameter, invalid URI format, unsupported URI type, or more than 40 URIs provided.\n',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorObjectSchema)) },
          },
        },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read', 'user-follow-read', 'playlist-read-private'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/albums',
    describeRoute({
      tags: ['Albums', 'Library'],
      operationId: 'get-users-saved-albums',
      summary: "Get User's Saved Albums\n",
      description:
        "Get a list of the albums saved in the current Spotify user's 'Your Music' library.\n",
      responses: {
        '200': PagingSavedAlbumObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/albums',
    describeRoute({
      deprecated: true,
      tags: ['Albums', 'Library'],
      operationId: 'save-albums-user',
      summary: 'Save Albums for Current User\n',
      description:
        "Save one or more albums to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      responses: {
        '200': { description: 'The album is saved' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .delete(
    '/me/albums',
    describeRoute({
      deprecated: true,
      tags: ['Albums', 'Library'],
      operationId: 'remove-albums-user',
      summary: "Remove Users' Saved Albums\n",
      description:
        "Remove one or more albums from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      responses: {
        '200': { description: 'Album(s) have been removed from the library' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .get(
    '/me/albums/contains',
    describeRoute({
      tags: ['Albums', 'Library'],
      operationId: 'check-users-saved-albums',
      summary: "Check User's Saved Albums\n",
      deprecated: true,
      description:
        "Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      responses: {
        '200': ArrayOfBooleansResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/tracks',
    describeRoute({
      tags: ['Tracks', 'Library'],
      operationId: 'get-users-saved-tracks',
      summary: "Get User's Saved Tracks\n",
      description:
        "Get a list of the songs saved in the current Spotify user's 'Your Music' library.\n",
      responses: {
        '200': PagingSavedTrackObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/tracks',
    describeRoute({
      deprecated: true,
      tags: ['Tracks', 'Library'],
      operationId: 'save-tracks-user',
      summary: 'Save Tracks for Current User\n',
      description:
        "Save one or more tracks to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      responses: {
        '200': { description: 'Track saved' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    (c) => {},
  )
  .delete(
    '/me/tracks',
    describeRoute({
      deprecated: true,
      tags: ['Tracks', 'Library'],
      operationId: 'remove-tracks-user',
      summary: "Remove User's Saved Tracks\n",
      description:
        "Remove one or more tracks from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      responses: {
        '200': { description: 'Track removed' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .get(
    '/me/tracks/contains',
    describeRoute({
      tags: ['Tracks', 'Library'],
      operationId: 'check-users-saved-tracks',
      summary: "Check User's Saved Tracks\n",
      deprecated: true,
      description:
        "Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      responses: {
        '200': ArrayOfBooleansResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/episodes',
    describeRoute({
      tags: ['Episodes', 'Library'],
      operationId: 'get-users-saved-episodes',
      summary: "Get User's Saved Episodes\n",
      description: "Get a list of the episodes saved in the current Spotify user's library.\n",
      responses: {
        '200': PagingSavedEpisodeObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read', 'user-read-playback-position'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/episodes',
    describeRoute({
      deprecated: true,
      tags: ['Episodes', 'Library'],
      operationId: 'save-episodes-user',
      summary: 'Save Episodes for Current User\n',
      description:
        "Save one or more episodes to the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      responses: {
        '200': { description: 'Episode saved' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .delete(
    '/me/episodes',
    describeRoute({
      deprecated: true,
      tags: ['Episodes', 'Library'],
      operationId: 'remove-episodes-user',
      summary: "Remove User's Saved Episodes\n",
      description:
        "Remove one or more episodes from the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      responses: {
        '200': { description: 'Episode removed' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .get(
    '/me/episodes/contains',
    describeRoute({
      tags: ['Episodes', 'Library'],
      operationId: 'check-users-saved-episodes',
      summary: "Check User's Saved Episodes\n",
      deprecated: true,
      description:
        "Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      responses: {
        '200': ArrayOfBooleansResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/shows',
    describeRoute({
      tags: ['Shows', 'Library'],
      operationId: 'get-users-saved-shows',
      summary: "Get User's Saved Shows\n",
      description:
        "Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n",
      responses: {
        '200': PagingSavedShowObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/shows',
    describeRoute({
      deprecated: true,
      tags: ['Shows', 'Library'],
      operationId: 'save-shows-user',
      summary: 'Save Shows for Current User\n',
      description:
        "Save one or more shows to current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      responses: {
        '200': { description: 'Show saved' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .delete(
    '/me/shows',
    describeRoute({
      deprecated: true,
      tags: ['Shows', 'Library'],
      operationId: 'remove-shows-user',
      summary: "Remove User's Saved Shows\n",
      description:
        "Delete one or more shows from current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      responses: {
        '200': { description: 'Show removed' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .get(
    '/me/shows/contains',
    describeRoute({
      tags: ['Shows', 'Library'],
      operationId: 'check-users-saved-shows',
      summary: "Check User's Saved Shows\n",
      deprecated: true,
      description:
        "Check if one or more shows is already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      responses: {
        '200': ArrayOfBooleansResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-library-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/following',
    describeRoute({
      tags: ['Users', 'Library', 'Artists'],
      operationId: 'get-followed',
      summary: 'Get Followed Artists\n',
      description: "Get the current user's followed artists.\n",
      responses: {
        '200': CursorPagedArtistsResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-follow-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/following',
    describeRoute({
      deprecated: true,
      tags: ['Users', 'Artists', 'Library'],
      operationId: 'follow-artists-users',
      summary: 'Follow Artists or Users\n',
      description:
        'Add the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
      responses: {
        '204': { description: 'Artist or user followed' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-follow-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .delete(
    '/me/following',
    describeRoute({
      deprecated: true,
      tags: ['Users', 'Artists', 'Library'],
      operationId: 'unfollow-artists-users',
      summary: 'Unfollow Artists or Users\n',
      description:
        'Remove the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
      responses: {
        '204': { description: 'Artist or user unfollowed' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-follow-modify'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .get(
    '/me/following/contains',
    describeRoute({
      tags: ['Users', 'Artists', 'Library'],
      operationId: 'check-current-user-follows',
      summary: 'Check If User Follows Artists or Users\n',
      deprecated: true,
      description:
        "Check to see if the current user is following one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      responses: {
        '200': ArrayOfBooleansResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-follow-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/player',
    describeRoute({
      tags: ['Player'],
      operationId: 'get-information-about-the-users-current-playback',
      summary: 'Get Playback State\n',
      description:
        'Get information about the user’s current playback state, including track or episode, progress, and active device.\n',
      responses: {
        '200': OneCurrentlyPlayingResponse,
        '204': { description: 'Playback not available or active' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/player',
    describeRoute({
      tags: ['Player'],
      operationId: 'transfer-a-users-playback',
      summary: 'Transfer Playback\n',
      description:
        'Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      responses: {
        '204': { description: 'Playback transferred' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/player/devices',
    describeRoute({
      tags: ['Player'],
      operationId: 'get-a-users-available-devices',
      summary: 'Get Available Devices\n',
      description:
        'Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.\n',
      responses: {
        '200': ManyDevicesResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-state'] }],
    }),
    (c) => {},
  )
  .get(
    '/me/player/currently-playing',
    describeRoute({
      tags: ['Player'],
      operationId: 'get-the-users-currently-playing-track',
      summary: 'Get Currently Playing Track\n',
      description: "Get the object currently being played on the user's Spotify account.\n",
      responses: {
        '200': OneCurrentlyPlayingTrackResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-currently-playing'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/player/play',
    describeRoute({
      tags: ['Player'],
      operationId: 'start-a-users-playback',
      summary: 'Start/Resume Playback\n',
      description:
        "Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      responses: {
        '204': { description: 'Playback started' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    validator(
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
    (c) => {},
  )
  .put(
    '/me/player/pause',
    describeRoute({
      tags: ['Player'],
      operationId: 'pause-a-users-playback',
      summary: 'Pause Playback\n',
      description:
        "Pause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      responses: {
        '204': { description: 'Playback paused' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .post(
    '/me/player/next',
    describeRoute({
      tags: ['Player'],
      operationId: 'skip-users-playback-to-next-track',
      summary: 'Skip To Next\n',
      description:
        'Skips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      responses: {
        '204': { description: 'Command sent' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .post(
    '/me/player/previous',
    describeRoute({
      tags: ['Player'],
      operationId: 'skip-users-playback-to-previous-track',
      summary: 'Skip To Previous\n',
      description:
        'Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      responses: {
        '204': { description: 'Command sent' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/player/seek',
    describeRoute({
      tags: ['Player'],
      operationId: 'seek-to-position-in-currently-playing-track',
      summary: 'Seek To Position\n',
      description:
        'Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      responses: {
        '204': { description: 'Command sent' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/player/repeat',
    describeRoute({
      tags: ['Player'],
      operationId: 'set-repeat-mode-on-users-playback',
      summary: 'Set Repeat Mode\n',
      description:
        "Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      responses: {
        '204': { description: 'Command sent' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/player/volume',
    describeRoute({
      tags: ['Player'],
      operationId: 'set-volume-for-users-playback',
      summary: 'Set Playback Volume\n',
      description:
        'Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      responses: {
        '204': { description: 'Command sent' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .put(
    '/me/player/shuffle',
    describeRoute({
      tags: ['Player'],
      operationId: 'toggle-shuffle-for-users-playback',
      summary: 'Toggle Playback Shuffle\n',
      description:
        'Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      responses: {
        '204': { description: 'Command sent' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/player/recently-played',
    describeRoute({
      tags: ['Player'],
      operationId: 'get-recently-played',
      summary: 'Get Recently Played Tracks\n',
      description:
        "Get tracks from the current user's recently played tracks.\n_**Note**: Currently doesn't support podcast episodes._\n",
      responses: {
        '200': CursorPagedPlayHistoryResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-recently-played'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/player/queue',
    describeRoute({
      tags: ['Player'],
      operationId: 'get-queue',
      summary: "Get the User's Queue\n",
      description: "Get the list of objects that make up the user's queue.\n",
      responses: {
        '200': QueueResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-currently-playing', 'user-read-playback-state'] }],
    }),
    (c) => {},
  )
  .post(
    '/me/player/queue',
    describeRoute({
      tags: ['Player'],
      operationId: 'add-to-queue',
      summary: 'Add Item to Playback Queue\n',
      description:
        "Add an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      responses: {
        '204': { description: 'Command received' },
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/top/artists',
    describeRoute({
      tags: ['Users', 'Artists', 'Library'],
      operationId: 'get-users-top-artists',
      summary: "Get User's Top Artists\n",
      description: "Get the current user's top artists based on calculated affinity.\n",
      responses: {
        '200': PagingArtistObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-top-read'] }],
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/me/top/tracks',
    describeRoute({
      tags: ['Users', 'Tracks', 'Library'],
      operationId: 'get-users-top-tracks',
      summary: "Get User's Top Tracks\n",
      description: "Get the current user's top tracks based on calculated affinity.\n",
      responses: {
        '200': PagingTrackObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-top-read'] }],
    }),
    validator(
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
    (c) => {},
  )
