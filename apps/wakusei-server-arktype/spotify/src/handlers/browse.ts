import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      'locale?': type('string').describe(
        'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 50')
        .describe('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
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
    type({
      'locale?': type('string').describe(
        'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 50')
        .describe('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
    }),
  )
  .output(
    type({
      categories: type(PagingObjectSchema).and(
        type({ 'items?': type(CategoryObjectSchema).array() }),
      ),
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
    type({
      category_id: type('string').describe(
        'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
      ),
      'locale?': type('string').describe(
        'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
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
    type({
      category_id: type('string').describe(
        'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 50')
        .describe('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
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
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 50')
        .describe('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
    }),
  )
  .output(type({ albums: PagingSimplifiedAlbumObjectSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
