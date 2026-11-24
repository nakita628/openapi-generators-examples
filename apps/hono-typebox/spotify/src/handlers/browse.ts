import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'

export const browseHandler = new Hono()
  .get(
    '/browse/featured-playlists',
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/browse/categories',
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/browse/categories/:category_id',
    tbValidator(
      'param',
      Type.Object({
        category_id: Type.String({
          description:
            'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
          examples: ['dinner'],
        }),
      }),
    ),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/browse/categories/:category_id/playlists',
    tbValidator(
      'param',
      Type.Object({
        category_id: Type.String({
          description:
            'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
          examples: ['dinner'],
        }),
      }),
    ),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/browse/new-releases',
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
