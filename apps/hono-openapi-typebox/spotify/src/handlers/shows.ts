import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  OneShowResponse,
  ManySimplifiedShowsResponse,
  PagingSimplifiedEpisodeObjectResponse,
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

export const showsHandler = new Hono()
  .get(
    '/shows/:id',
    describeRoute({
      tags: ['Shows'],
      operationId: 'get-a-show',
      summary: 'Get Show\n',
      description:
        'Get Spotify catalog information for a single show identified by its\nunique Spotify ID.\n',
      responses: {
        '200': OneShowResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
            examples: ['38bS44xjbVVZ3No3ByF1dJ'],
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
    '/shows',
    describeRoute({
      deprecated: true,
      tags: ['Shows'],
      operationId: 'get-multiple-shows',
      summary: 'Get Several Shows\n',
      description:
        'Get Spotify catalog information for several shows based on their Spotify IDs.\n',
      responses: {
        '200': ManySimplifiedShowsResponse,
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
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
            examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/shows/:id/episodes',
    describeRoute({
      tags: ['Shows', 'Episodes'],
      operationId: 'get-a-shows-episodes',
      summary: 'Get Show Episodes\n',
      description:
        'Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n',
      responses: {
        '200': PagingSimplifiedEpisodeObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
            examples: ['38bS44xjbVVZ3No3ByF1dJ'],
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
