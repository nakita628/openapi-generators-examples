import { t, type UnwrapSchema } from 'elysia'
import { ChapterObjectSchema, ErrorObjectSchema } from '../../components/schemas'

export const ChaptersModel = {
  getAChapterParams: t.Object({
    id: t.String({
      example: '0D5wENdkdwbqlrHoaJ9g29',
      title: 'Spotify Chapter ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
    }),
  }),
  getAChapterQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getAChapterResponse401: t.Object({ error: ErrorObjectSchema }),
  getAChapterResponse403: t.Object({ error: ErrorObjectSchema }),
  getAChapterResponse429: t.Object({ error: ErrorObjectSchema }),
  getSeveralChaptersQuery: t.Object({
    ids: t.String({
      example: '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29',
      title: 'Spotify Chapter IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
    }),
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getSeveralChaptersResponse200: t.Object({ chapters: t.Array(ChapterObjectSchema) }),
  getSeveralChaptersResponse401: t.Object({ error: ErrorObjectSchema }),
  getSeveralChaptersResponse403: t.Object({ error: ErrorObjectSchema }),
  getSeveralChaptersResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type ChaptersModel = {
  [k in keyof typeof ChaptersModel]: UnwrapSchema<(typeof ChaptersModel)[k]>
}
