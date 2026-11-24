import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const usersHandler = new Hono()
  .get(
    '/users/:user_id',
    sValidator(
      'param',
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/users/:user_id/playlists',
    sValidator(
      'param',
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
      }),
    ),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 50')
          .describe(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/users/:user_id/playlists',
    sValidator(
      'param',
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
      }),
    ),
    sValidator(
      'json',
      type({
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
        '+': 'delete',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
