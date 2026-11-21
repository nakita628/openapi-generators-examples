import { os } from '@orpc/server'
import * as z from 'zod'
import {
  PagingPlaylistObjectSchema,
  PlaylistObjectSchema,
  PublicUserObjectSchema,
} from '../components'

export const getUsersUserId = os
  .route({
    method: 'GET',
    path: '/users/{user_id}',
    tags: ['Users'],
    summary: "Get User's Profile\n",
    description: 'Get public profile information about a Spotify user.\n',
    deprecated: true,
    successDescription: 'A user',
  })
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
  .handler(async ({ input }) => {})

export const getUsersUserIdPlaylists = os
  .route({
    method: 'GET',
    path: '/users/{user_id}/playlists',
    tags: ['Playlists', 'Users'],
    summary: "Get User's Playlists\n",
    description: 'Get a list of the playlists owned or followed by a Spotify user.\n',
    deprecated: true,
    successDescription: 'A paged set of playlists',
  })
  .input(
    z.object({
      user_id: z
        .string()
        .meta({
          description:
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          examples: ['smedjan'],
        }),
      limit: z.coerce
        .number()
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
      offset: z.coerce
        .number()
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
  .handler(async ({ input }) => {})

export const postUsersUserIdPlaylists = os
  .route({
    method: 'POST',
    path: '/users/{user_id}/playlists',
    tags: ['Playlists', 'Library'],
    summary: 'Create Playlist for user\n',
    description:
      '**Deprecated**: Use [Create Playlist](/documentation/web-api/reference/create-playlist) instead.\n\nCreate a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
    deprecated: true,
    successStatus: 201,
    successDescription: 'A playlist',
  })
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
  .handler(async ({ input }) => {})
