import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  PagedAlbumsResponse,
  PagedFeaturedPlaylistsResponse,
  PagedCategoriesResponse,
  OneCategoryResponse,
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

export const browseHandler = new Hono()
  .get(
    '/browse/featured-playlists',
    describeRoute({
      deprecated: true,
      tags: ['Playlists'],
      operationId: 'get-featured-playlists',
      summary: 'Get Featured Playlists\n',
      description:
        "Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n",
      responses: {
        '200': PagedFeaturedPlaylistsResponse,
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
          locale: Type.Optional(
            Type.String({
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
              examples: ['sv_SE'],
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
  .get(
    '/browse/categories',
    describeRoute({
      deprecated: true,
      tags: ['Categories'],
      operationId: 'get-categories',
      summary: 'Get Several Browse Categories\n',
      description:
        'Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
      responses: {
        '200': PagedCategoriesResponse,
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
          locale: Type.Optional(
            Type.String({
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
              examples: ['sv_SE'],
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
  .get(
    '/browse/categories/:category_id',
    describeRoute({
      deprecated: true,
      tags: ['Categories'],
      operationId: 'get-a-category',
      summary: 'Get Single Browse Category\n',
      description:
        'Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
      responses: {
        '200': OneCategoryResponse,
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
          category_id: Type.String({
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            examples: ['dinner'],
          }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          locale: Type.Optional(
            Type.String({
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
              examples: ['sv_SE'],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/browse/categories/:category_id/playlists',
    describeRoute({
      deprecated: true,
      tags: ['Playlists', 'Categories'],
      operationId: 'get-a-categories-playlists',
      summary: "Get Category's Playlists\n",
      description: 'Get a list of Spotify playlists tagged with a particular category.\n',
      responses: {
        '200': PagedFeaturedPlaylistsResponse,
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
          category_id: Type.String({
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            examples: ['dinner'],
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
  .get(
    '/browse/new-releases',
    describeRoute({
      deprecated: true,
      tags: ['Albums'],
      operationId: 'get-new-releases',
      summary: 'Get New Releases\n',
      description:
        'Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n',
      responses: {
        '200': PagedAlbumsResponse,
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
