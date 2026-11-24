import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  PagedPlaylistsResponse,
  OnePublicUserResponse,
  OnePlaylistResponse,
} from '../components'

export const usersHandler = new Hono()
  .get(
    '/users/:user_id',
    describeRoute({
      deprecated: true,
      tags: ['Users'],
      operationId: 'get-users-profile',
      summary: "Get User's Profile\n",
      description: 'Get public profile information about a Spotify user.\n',
      responses: {
        '200': OnePublicUserResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
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
    describeRoute({
      deprecated: true,
      tags: ['Playlists', 'Users'],
      operationId: 'get-list-users-playlists',
      summary: "Get User's Playlists\n",
      description: 'Get a list of the playlists owned or followed by a Spotify user.\n',
      responses: {
        '200': PagedPlaylistsResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-read-private', 'playlist-read-collaborative'] }],
    }),
    validator(
      'param',
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
      }),
    ),
    validator(
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
    describeRoute({
      tags: ['Playlists', 'Library'],
      operationId: 'create-playlist-for-user',
      deprecated: true,
      summary: 'Create Playlist for user\n',
      description:
        '**Deprecated**: Use [Create Playlist](/documentation/web-api/reference/create-playlist) instead.\n\nCreate a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
      responses: {
        '201': OnePlaylistResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    }),
    validator(
      'param',
      type({
        user_id: type('string').describe(
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        ),
      }),
    ),
    validator(
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
