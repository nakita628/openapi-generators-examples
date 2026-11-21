import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  PagingPlaylistObjectSchema,
  PlaylistObjectSchema,
  PublicUserObjectSchema,
} from '../components'

const t = initTRPC.create()

export const usersRouter = t.router({
  getUsersUserId: t.procedure
    .input(
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
      }),
    )
    .output(PublicUserObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersUserIdPlaylists: t.procedure
    .input(
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
        ),
      }),
    )
    .output(PagingPlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUsersUserIdPlaylists: t.procedure
    .input(
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
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
      }),
    )
    .output(PlaylistObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
