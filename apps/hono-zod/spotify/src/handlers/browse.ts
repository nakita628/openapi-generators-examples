import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const browseHandler = new Hono()
  .get(
    '/browse/featured-playlists',
    sValidator(
      'query',
      z.object({
        locale: z
          .string()
          .meta({
            description:
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            examples: ['sv_SE'],
          })
          .exactOptional(),
        limit: z.coerce
          .number()
          .int()
          .min(1)
          .max(50)
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z.coerce
          .number()
          .int()
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/browse/categories',
    sValidator(
      'query',
      z.object({
        locale: z
          .string()
          .meta({
            description:
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            examples: ['sv_SE'],
          })
          .exactOptional(),
        limit: z.coerce
          .number()
          .int()
          .min(1)
          .max(50)
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z.coerce
          .number()
          .int()
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/browse/categories/:category_id',
    sValidator(
      'param',
      z.object({
        category_id: z
          .string()
          .meta({
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            examples: ['dinner'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        locale: z
          .string()
          .meta({
            description:
              'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
            examples: ['sv_SE'],
          })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/browse/categories/:category_id/playlists',
    sValidator(
      'param',
      z.object({
        category_id: z
          .string()
          .meta({
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            examples: ['dinner'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        limit: z.coerce
          .number()
          .int()
          .min(1)
          .max(50)
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z.coerce
          .number()
          .int()
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/browse/new-releases',
    sValidator(
      'query',
      z.object({
        limit: z.coerce
          .number()
          .int()
          .min(1)
          .max(50)
          .default(20)
          .meta({
            description:
              'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
            examples: [10],
          })
          .exactOptional(),
        offset: z.coerce
          .number()
          .int()
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
