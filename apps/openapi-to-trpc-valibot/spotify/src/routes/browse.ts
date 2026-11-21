import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
          v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50)), 20),
          v.description(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
          v.metadata({ examples: [10] }),
        ),
        offset: v.pipe(
          v.optional(v.pipe(v.number(), v.integer()), 0),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
    )
    .output(PagingFeaturedPlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategories: t.procedure
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
        limit: v.pipe(
          v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50)), 20),
          v.description(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
          v.metadata({ examples: [10] }),
        ),
        offset: v.pipe(
          v.optional(v.pipe(v.number(), v.integer()), 0),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategoriesCategoryId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategoriesCategoryIdPlaylists: t.procedure
    .input(
      v.object({
        category_id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
          ),
          v.metadata({ examples: ['dinner'] }),
        ),
        limit: v.pipe(
          v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50)), 20),
          v.description(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
          v.metadata({ examples: [10] }),
        ),
        offset: v.pipe(
          v.optional(v.pipe(v.number(), v.integer()), 0),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
    )
    .output(PagingFeaturedPlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseNewReleases: t.procedure
    .input(
      v.object({
        limit: v.pipe(
          v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50)), 20),
          v.description(
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          ),
          v.metadata({ examples: [10] }),
        ),
        offset: v.pipe(
          v.optional(v.pipe(v.number(), v.integer()), 0),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
    )
    .output(v.object({ albums: PagingSimplifiedAlbumObjectSchema }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
