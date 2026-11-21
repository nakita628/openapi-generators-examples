import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  CategoryObjectSchema,
  PagingFeaturedPlaylistObjectSchema,
  PagingObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
} from '../components'

const t = initTRPC.create()

export const browseRouter = t.router({
  getBrowseFeaturedPlaylists: t.procedure
    .input(
      type({
        'locale?': type('string').describe(
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingFeaturedPlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategories: t.procedure
    .input(
      type({
        'locale?': type('string').describe(
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategoriesCategoryId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategoriesCategoryIdPlaylists: t.procedure
    .input(
      type({
        category_id: type('string').describe(
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(PagingFeaturedPlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseNewReleases: t.procedure
    .input(
      type({
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
      }),
    )
    .output(type({ albums: PagingSimplifiedAlbumObjectSchema }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
