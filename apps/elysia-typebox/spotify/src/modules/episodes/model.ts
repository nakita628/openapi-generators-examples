import { t, type UnwrapSchema } from 'elysia'
import { EpisodeObjectSchema, ErrorObjectSchema } from '../../components/schemas'

export const EpisodesModel = {
  getAnEpisodeParams: t.Object({
    id: t.String({
      example: '512ojhOuo1ktJprKbVcKyQ',
      title: 'Get an Episode',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
    }),
  }),
  getAnEpisodeQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getAnEpisodeResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnEpisodeResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnEpisodeResponse429: t.Object({ error: ErrorObjectSchema }),
  getMultipleEpisodesQuery: t.Object({
    ids: t.String({
      example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
      title: 'Ids',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
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
  getMultipleEpisodesResponse200: t.Object({ episodes: t.Array(EpisodeObjectSchema) }),
  getMultipleEpisodesResponse401: t.Object({ error: ErrorObjectSchema }),
  getMultipleEpisodesResponse403: t.Object({ error: ErrorObjectSchema }),
  getMultipleEpisodesResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type EpisodesModel = {
  [k in keyof typeof EpisodesModel]: UnwrapSchema<(typeof EpisodesModel)[k]>
}
