import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { ChapterObjectSchema } from '../components'

const t = initTRPC.create()

export const chaptersRouter = t.router({
  getChaptersId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.annotate({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
            jsonSchemaExamples: ['0D5wENdkdwbqlrHoaJ9g29'],
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
    .output(Schema.toStandardSchemaV1(ChapterObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChapters: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
            jsonSchemaExamples: [
              '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29',
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
      Schema.toStandardSchemaV1(Schema.Struct({ chapters: Schema.Array(ChapterObjectSchema) })),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
