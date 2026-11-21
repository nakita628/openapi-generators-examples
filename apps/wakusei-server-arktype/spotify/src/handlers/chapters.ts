import { os } from '@orpc/server'
import { type } from 'arktype'
import { ChapterObjectSchema } from '../components'

export const getChaptersId = os
  .route({
    method: 'GET',
    path: '/chapters/{id}',
    tags: ['Chapters'],
    summary: 'Get a Chapter\n',
    description:
      'Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    successDescription: 'A Chapter',
  })
  .input(
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
    }),
  )
  .output(ChapterObjectSchema)
  .handler(async ({ input }) => {})

export const getChapters = os
  .route({
    method: 'GET',
    path: '/chapters',
    tags: ['Chapters'],
    summary: 'Get Several Chapters\n',
    description:
      'Get Spotify catalog information for several audiobook chapters identified by their Spotify IDs. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    deprecated: true,
    successDescription: 'A set of chapters',
  })
  .input(
    type({
      ids: type('string').describe(
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
    }),
  )
  .output(type({ chapters: type(ChapterObjectSchema).array() }))
  .handler(async ({ input }) => {})
