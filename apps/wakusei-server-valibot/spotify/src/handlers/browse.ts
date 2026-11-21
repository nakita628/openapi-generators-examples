import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  CategoryObjectSchema,
  PagingFeaturedPlaylistObjectSchema,
  PagingObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
} from '../components'

export const getBrowseFeaturedPlaylists = os
  .route({
    method: 'GET',
    path: '/browse/featured-playlists',
    tags: ['Playlists'],
    summary: 'Get Featured Playlists\n',
    description:
      "Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n",
    deprecated: true,
    successDescription: 'A paged set of playlists',
  })
  .input(
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
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      ),
    }),
  )
  .output(PagingFeaturedPlaylistObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getBrowseCategories = os
  .route({
    method: 'GET',
    path: '/browse/categories',
    tags: ['Categories'],
    summary: 'Get Several Browse Categories\n',
    description:
      'Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
    deprecated: true,
    successDescription: 'A paged set of categories',
  })
  .input(
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
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      ),
    }),
  )
  .output(
    v.object({
      categories: v.intersect([
        PagingObjectSchema,
        v.partial(v.object({ items: v.array(CategoryObjectSchema) })),
      ]),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getBrowseCategoriesCategoryId = os
  .route({
    method: 'GET',
    path: '/browse/categories/{category_id}',
    tags: ['Categories'],
    summary: 'Get Single Browse Category\n',
    description:
      'Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
    deprecated: true,
    successDescription: 'A category',
  })
  .input(
    v.object({
      category_id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
        ),
        v.metadata({ examples: ['dinner'] }),
      ),
      locale: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
          ),
          v.metadata({ examples: ['sv_SE'] }),
        ),
      ),
    }),
  )
  .output(CategoryObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getBrowseCategoriesCategoryIdPlaylists = os
  .route({
    method: 'GET',
    path: '/browse/categories/{category_id}/playlists',
    tags: ['Playlists', 'Categories'],
    summary: "Get Category's Playlists\n",
    description: 'Get a list of Spotify playlists tagged with a particular category.\n',
    deprecated: true,
    successDescription: 'A paged set of playlists',
  })
  .input(
    v.object({
      category_id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
        ),
        v.metadata({ examples: ['dinner'] }),
      ),
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      ),
    }),
  )
  .output(PagingFeaturedPlaylistObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getBrowseNewReleases = os
  .route({
    method: 'GET',
    path: '/browse/new-releases',
    tags: ['Albums'],
    summary: 'Get New Releases\n',
    description:
      'Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n',
    deprecated: true,
    successDescription: 'A paged set of albums',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
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
      ),
      offset: v.optional(
        v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '0'),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      ),
    }),
  )
  .output(v.object({ albums: PagingSimplifiedAlbumObjectSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
