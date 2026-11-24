import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'

export const usersHandler = new Hono()
  .get(
    '/users/:user_id',
    tbValidator(
      'param',
      Type.Object({
        user_id: Type.String({
          description:
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          examples: ['smedjan'],
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/:user_id/playlists',
    tbValidator(
      'param',
      Type.Object({
        user_id: Type.String({
          description:
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          examples: ['smedjan'],
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 50,
              () => 'must be <= 50',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '0' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/users/:user_id/playlists',
    tbValidator(
      'param',
      Type.Object({
        user_id: Type.String({
          description:
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          examples: ['smedjan'],
        }),
      }),
    ),
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
    (c) => { throw new Error('Not implemented') },
  )
