import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  PagedPlaylistsResponse,
  OnePublicUserResponse,
  OnePlaylistResponse,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
      toStandardSchemaV1(
        Type.Object({
          user_id: Type.String({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            examples: ['smedjan'],
          }),
        }),
      ),
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
      toStandardSchemaV1(
        Type.Object({
          user_id: Type.String({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            examples: ['smedjan'],
          }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
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
      toStandardSchemaV1(
        Type.Object({
          user_id: Type.String({
            description:
              "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
            examples: ['smedjan'],
          }),
        }),
      ),
    ),
    validator(
      'json',
      toStandardSchemaV1(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
