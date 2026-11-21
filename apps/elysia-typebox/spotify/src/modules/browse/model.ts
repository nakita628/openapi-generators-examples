import { t, type UnwrapSchema } from 'elysia'
import {
  CategoryObjectSchema,
  ErrorObjectSchema,
  PagingObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
} from '../../components/schemas'

export const BrowseModel = {
  getFeaturedPlaylistsQuery: t.Object({
    locale: t.Optional(
      t.String({
        example: 'sv_SE',
        title: 'Locale',
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getFeaturedPlaylistsResponse401: t.Object({ error: ErrorObjectSchema }),
  getFeaturedPlaylistsResponse403: t.Object({ error: ErrorObjectSchema }),
  getFeaturedPlaylistsResponse429: t.Object({ error: ErrorObjectSchema }),
  getCategoriesQuery: t.Object({
    locale: t.Optional(
      t.String({
        example: 'sv_SE',
        title: 'Locale',
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getCategoriesResponse200: t.Object({
    categories: t.Intersect([
      PagingObjectSchema,
      t.Object({ items: t.Optional(t.Array(CategoryObjectSchema)) }),
    ]),
  }),
  getCategoriesResponse401: t.Object({ error: ErrorObjectSchema }),
  getCategoriesResponse403: t.Object({ error: ErrorObjectSchema }),
  getCategoriesResponse429: t.Object({ error: ErrorObjectSchema }),
  getACategoryParams: t.Object({
    category_id: t.String({
      example: 'dinner',
      title: 'Category ID',
      description:
        'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
    }),
  }),
  getACategoryQuery: t.Object({
    locale: t.Optional(
      t.String({
        example: 'sv_SE',
        title: 'Locale',
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
      }),
    ),
  }),
  getACategoryResponse401: t.Object({ error: ErrorObjectSchema }),
  getACategoryResponse403: t.Object({ error: ErrorObjectSchema }),
  getACategoryResponse429: t.Object({ error: ErrorObjectSchema }),
  getACategoriesPlaylistsParams: t.Object({
    category_id: t.String({
      example: 'dinner',
      title: 'Category ID',
      description:
        'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
    }),
  }),
  getACategoriesPlaylistsQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getACategoriesPlaylistsResponse401: t.Object({ error: ErrorObjectSchema }),
  getACategoriesPlaylistsResponse403: t.Object({ error: ErrorObjectSchema }),
  getACategoriesPlaylistsResponse429: t.Object({ error: ErrorObjectSchema }),
  getNewReleasesQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getNewReleasesResponse200: t.Object({ albums: PagingSimplifiedAlbumObjectSchema }),
  getNewReleasesResponse401: t.Object({ error: ErrorObjectSchema }),
  getNewReleasesResponse403: t.Object({ error: ErrorObjectSchema }),
  getNewReleasesResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type BrowseModel = { [k in keyof typeof BrowseModel]: UnwrapSchema<(typeof BrowseModel)[k]> }
