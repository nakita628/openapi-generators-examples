import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema, SchemaGetter, SchemaIssue } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          locale: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
              jsonSchemaExamples: ['sv_SE'],
            }),
          ),
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.Number.check(Schema.isInt())
            .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PagingFeaturedPlaylistObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategories: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          locale: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
              jsonSchemaExamples: ['sv_SE'],
            }),
          ),
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.Number.check(Schema.isInt())
            .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          categories: (() => {
            const M0 = PagingObjectSchema
            const M1 = Schema.Struct({
              items: Schema.optionalKey(Schema.Array(CategoryObjectSchema)),
            })
            const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
              Schema.is(M0)(input) && Schema.is(M1)(input)
            return Schema.Unknown.pipe(
              Schema.decodeTo(Schema.declare(isAll), {
                decode: SchemaGetter.transformEffect((input) =>
                  Effect.all([
                    Schema.decodeUnknownEffect(M0)(input),
                    Schema.decodeUnknownEffect(M1)(input),
                  ]).pipe(
                    Effect.mapError((error) => error.issue),
                    Effect.flatMap((values) => {
                      const merged = values.every(
                        (value) =>
                          typeof value === 'object' && value !== null && !Array.isArray(value),
                      )
                        ? Object.assign({}, ...values)
                        : values[0]
                      return isAll(merged)
                        ? Effect.succeed(merged)
                        : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
                    }),
                  ),
                ),
                encode: SchemaGetter.passthrough({ strict: false }),
              }),
            )
          })(),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategoriesCategoryId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          category_id: Schema.String.annotate({
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            jsonSchemaExamples: ['dinner'],
          }),
          locale: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
              jsonSchemaExamples: ['sv_SE'],
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CategoryObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseCategoriesCategoryIdPlaylists: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          category_id: Schema.String.annotate({
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            jsonSchemaExamples: ['dinner'],
          }),
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.Number.check(Schema.isInt())
            .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PagingFeaturedPlaylistObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBrowseNewReleases: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20)))
            .annotate({
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              jsonSchemaExamples: [10],
            }),
          offset: Schema.Number.check(Schema.isInt())
            .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
            .annotate({
              description:
                'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
              jsonSchemaExamples: [5],
            }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Struct({ albums: PagingSimplifiedAlbumObjectSchema })))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
