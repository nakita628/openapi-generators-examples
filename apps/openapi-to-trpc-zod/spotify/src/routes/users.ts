import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  PagingPlaylistObjectSchema,
  PlaylistObjectSchema,
  PublicUserObjectSchema,
} from '../components'

const t = initTRPC.create()

export const usersRouter = t.router({
  getUsersUserId: t.procedure
    .input(
      z.object({
        user_id: z
          .string()
          .meta({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            examples: ['smedjan'],
          }),
      }),
    )
    .output(PublicUserObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersUserIdPlaylists: t.procedure
    .input(
      z.object({
        user_id: z
          .string()
          .meta({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            examples: ['smedjan'],
          }),
        limit: z
          .int()
          .min(1)
          .max(50)
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z
          .int()
          .default(0)
          .meta({
            description:
              'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
            examples: [5],
          })
          .exactOptional(),
      }),
    )
    .output(PagingPlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUsersUserIdPlaylists: t.procedure
    .input(
      z.object({
        user_id: z
          .string()
          .meta({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            examples: ['smedjan'],
          }),
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
      }),
    )
    .output(PlaylistObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
