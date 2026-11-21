import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const usersHandler = new Hono()
  .get(
    '/users/:user_id',
    sValidator(
      'param',
      v.object({
        user_id: v.pipe(
          v.string(),
          v.description(
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          ),
          v.metadata({ examples: ['smedjan'] }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/users/:user_id/playlists',
    sValidator(
      'param',
      v.object({
        user_id: v.pipe(
          v.string(),
          v.description(
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          ),
          v.metadata({ examples: ['smedjan'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.transform(Number),
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
        offset: v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
          v.description(
            'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/users/:user_id/playlists',
    sValidator(
      'param',
      v.object({
        user_id: v.pipe(
          v.string(),
          v.description(
            "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
          ),
          v.metadata({ examples: ['smedjan'] }),
        ),
      }),
    ),
    sValidator(
      'json',
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
    ),
    (c) => {},
  )
