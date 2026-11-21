import { os } from '@orpc/server'
import * as v from 'valibot'
import { TrackObjectSchema } from '../components'

export const getTracksId = os
  .route({
    method: 'GET',
    path: '/tracks/{id}',
    tags: ['Tracks'],
    summary: 'Get Track\n',
    description:
      'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
    successDescription: 'A track',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        ),
        v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
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
  .output(TrackObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getTracks = os
  .route({
    method: 'GET',
    path: '/tracks',
    tags: ['Tracks'],
    summary: 'Get Several Tracks\n',
    description:
      'Get Spotify catalog information for multiple tracks based on their Spotify IDs.\n',
    deprecated: true,
    successDescription: 'A set of tracks',
  })
  .input(
    v.object({
      market: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          ),
          v.metadata({ examples: ['ES'] }),
        ),
      ),
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        ),
        v.metadata({
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      ),
    }),
  )
  .output(v.object({ tracks: v.array(TrackObjectSchema) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
