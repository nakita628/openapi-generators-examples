import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  OneTrackResponse,
  ManyTracksResponse,
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

export const tracksHandler = new Hono()
  .get(
    '/tracks/:id',
    describeRoute({
      tags: ['Tracks'],
      operationId: 'get-track',
      summary: 'Get Track\n',
      description:
        'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
      responses: {
        '200': OneTrackResponse,
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
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
            examples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          market: Type.Optional(
            Type.String({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              examples: ['ES'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/tracks',
    describeRoute({
      deprecated: true,
      tags: ['Tracks'],
      operationId: 'get-several-tracks',
      summary: 'Get Several Tracks\n',
      description:
        'Get Spotify catalog information for multiple tracks based on their Spotify IDs.\n',
      responses: {
        '200': ManyTracksResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          market: Type.Optional(
            Type.String({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              examples: ['ES'],
            }),
          ),
          ids: Type.String({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
