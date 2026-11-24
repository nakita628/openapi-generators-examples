import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import { AudiobookObjectSchema, PagingSimplifiedChapterObjectSchema } from '../components'

const t = initTRPC.create()

export const audiobooksRouter = t.router({
  getAudiobooksId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.annotate({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
            jsonSchemaExamples: ['7iHfbu1YPACw6oZPAFJtqe'],
          }),
          market: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AudiobookObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudiobooks: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
            ],
          }),
          market: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.Struct({ audiobooks: Schema.Array(AudiobookObjectSchema) })),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudiobooksIdChapters: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.annotate({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
            jsonSchemaExamples: ['7iHfbu1YPACw6oZPAFJtqe'],
          }),
          market: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
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
    .output(Schema.toStandardSchemaV1(PagingSimplifiedChapterObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
