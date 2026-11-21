import { os } from '@orpc/server'
import { type } from 'arktype'
import { EpisodeObjectSchema } from '../components'

export const getEpisodesId = os
  .route({
    method: 'GET',
    path: '/episodes/{id}',
    tags: ['Episodes'],
    summary: 'Get Episode\n',
    description:
      'Get Spotify catalog information for a single episode identified by its\nunique Spotify ID.\n',
    successDescription: 'An episode',
  })
  .input(
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
    }),
  )
  .output(EpisodeObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getEpisodes = os
  .route({
    method: 'GET',
    path: '/episodes',
    tags: ['Episodes'],
    summary: 'Get Several Episodes\n',
    description:
      'Get Spotify catalog information for several episodes based on their Spotify IDs.\n',
    deprecated: true,
    successDescription: 'A set of episodes',
  })
  .input(
    type({
      ids: type('string').describe(
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
    }),
  )
  .output(type({ episodes: type(EpisodeObjectSchema).array() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
