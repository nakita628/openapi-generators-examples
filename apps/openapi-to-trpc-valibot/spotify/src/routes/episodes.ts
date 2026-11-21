import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { EpisodeObjectSchema } from '../components'

const t = initTRPC.create()

export const episodesRouter = t.router({
  getEpisodesId: t.procedure
    .input(
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
          ),
          v.metadata({ examples: ['512ojhOuo1ktJprKbVcKyQ'] }),
        ),
        market: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        ),
      }),
    )
    .output(EpisodeObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEpisodes: t.procedure
    .input(
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'] }),
        ),
        market: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        ),
      }),
    )
    .output(v.object({ episodes: v.array(EpisodeObjectSchema) }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
