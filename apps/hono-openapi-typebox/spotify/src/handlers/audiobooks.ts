import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  NotFoundResponse,
  BadRequestResponse,
  TooManyRequestsResponse,
  ManyAudiobooksResponse,
  OneAudiobookResponse,
  PagingSimplifiedChapterObjectResponse,
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

export const audiobooksHandler = new Hono()
  .get(
    '/audiobooks/:id',
    describeRoute({
      operationId: 'get-an-audiobook',
      tags: ['Audiobooks'],
      summary: 'Get an Audiobook\n',
      description:
        'Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      responses: {
        '200': OneAudiobookResponse,
        '400': BadRequestResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '404': NotFoundResponse,
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
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
            examples: ['7iHfbu1YPACw6oZPAFJtqe'],
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
    '/audiobooks',
    describeRoute({
      deprecated: true,
      operationId: 'get-multiple-audiobooks',
      tags: ['Audiobooks'],
      summary: 'Get Several Audiobooks\n',
      description:
        'Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      responses: {
        '200': ManyAudiobooksResponse,
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
          ids: Type.String({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
          }),
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
    '/audiobooks/:id/chapters',
    describeRoute({
      operationId: 'get-audiobook-chapters',
      tags: ['Audiobooks', 'Chapters'],
      summary: 'Get Audiobook Chapters\n',
      description:
        "Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n",
      responses: {
        '200': PagingSimplifiedChapterObjectResponse,
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
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
            examples: ['7iHfbu1YPACw6oZPAFJtqe'],
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
