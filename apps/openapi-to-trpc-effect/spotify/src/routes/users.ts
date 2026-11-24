import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import {
  PagingPlaylistObjectSchema,
  PlaylistObjectSchema,
  PublicUserObjectSchema,
} from '../components'

const t = initTRPC.create()

export const usersRouter = t.router({
  getUsersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.String.annotate({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            jsonSchemaExamples: ['smedjan'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PublicUserObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersUserIdPlaylists: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.String.annotate({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            jsonSchemaExamples: ['smedjan'],
          }),
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.Number.check(Schema.isInt())
            .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PagingPlaylistObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUsersUserIdPlaylists: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.String.annotate({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            jsonSchemaExamples: ['smedjan'],
          }),
          name: Schema.String.annotate({
            description:
              'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
          }),
          public: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
            }),
          ),
          collaborative: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
            }),
          ),
          description: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlaylistObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
