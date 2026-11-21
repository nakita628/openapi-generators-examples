import { t, type UnwrapSchema } from 'elysia'
import { ErrorObjectSchema } from '../../components/schemas'

export const UsersModel = {
  getUsersProfileParams: t.Object({
    user_id: t.String({
      example: 'smedjan',
      title: 'User ID',
      description:
        "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
    }),
  }),
  getUsersProfileResponse401: t.Object({ error: ErrorObjectSchema }),
  getUsersProfileResponse403: t.Object({ error: ErrorObjectSchema }),
  getUsersProfileResponse429: t.Object({ error: ErrorObjectSchema }),
  getListUsersPlaylistsParams: t.Object({
    user_id: t.String({
      example: 'smedjan',
      title: 'User ID',
      description:
        "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
    }),
  }),
  getListUsersPlaylistsQuery: t.Object({
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
          'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
        default: 0,
      }),
    ),
  }),
  getListUsersPlaylistsResponse401: t.Object({ error: ErrorObjectSchema }),
  getListUsersPlaylistsResponse403: t.Object({ error: ErrorObjectSchema }),
  getListUsersPlaylistsResponse429: t.Object({ error: ErrorObjectSchema }),
  createPlaylistForUserParams: t.Object({
    user_id: t.String({
      example: 'smedjan',
      title: 'User ID',
      description:
        "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
    }),
  }),
  createPlaylistForUserBody: t.Object(
    {
      name: t.String({
        description:
          'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
      }),
      public: t.Optional(
        t.Boolean({
          description:
            "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        }),
      ),
      collaborative: t.Optional(
        t.Boolean({
          description:
            'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
        }),
      ),
      description: t.Optional(
        t.String({
          description:
            'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        }),
      ),
    },
    { example: { name: 'New Playlist', description: 'New playlist description', public: false } },
  ),
  createPlaylistForUserResponse401: t.Object({ error: ErrorObjectSchema }),
  createPlaylistForUserResponse403: t.Object({ error: ErrorObjectSchema }),
  createPlaylistForUserResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type UsersModel = { [k in keyof typeof UsersModel]: UnwrapSchema<(typeof UsersModel)[k]> }
