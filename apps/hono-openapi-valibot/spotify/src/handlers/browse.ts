import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  PagedAlbumsResponse,
  PagedFeaturedPlaylistsResponse,
  PagedCategoriesResponse,
  OneCategoryResponse,
} from '../components'

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
      v.object({
        locale: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            ),
            v.metadata({ examples: ['sv_SE'] }),
          ),
        ),
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
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
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
      v.object({
        locale: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            ),
            v.metadata({ examples: ['sv_SE'] }),
          ),
        ),
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
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
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
      v.object({
        category_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
          ),
          v.metadata({ examples: ['dinner'] }),
        ),
      }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          locale: v.pipe(
            v.string(),
            v.description(
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            ),
            v.metadata({ examples: ['sv_SE'] }),
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
      v.object({
        category_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
          ),
          v.metadata({ examples: ['dinner'] }),
        ),
      }),
    ),
    validator(
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
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
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
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
