import { os } from '@orpc/server'
import { type } from 'arktype'
import { AudiobookObjectSchema, PagingSimplifiedChapterObjectSchema } from '../components'

export const getAudiobooksId = os
  .route({
    method: 'GET',
    path: '/audiobooks/{id}',
    tags: ['Audiobooks'],
    summary: 'Get an Audiobook\n',
    description:
      'Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    successDescription: 'An Audiobook',
  })
  .input(
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
    }),
  )
  .output(AudiobookObjectSchema)
  .handler(async ({ input }) => {})

export const getAudiobooks = os
  .route({
    method: 'GET',
    path: '/audiobooks',
    tags: ['Audiobooks'],
    summary: 'Get Several Audiobooks\n',
    description:
      'Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    deprecated: true,
    successDescription:
      "A set of audiobooks. If one of the requested audiobooks is unavailable then you'll find a `null` item in the `audiobooks` array where the audiobook object would otherwise be.",
  })
  .input(
    type({
      ids: type('string').describe(
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
    }),
  )
  .output(type({ audiobooks: type(AudiobookObjectSchema).array() }))
  .handler(async ({ input }) => {})

export const getAudiobooksIdChapters = os
  .route({
    method: 'GET',
    path: '/audiobooks/{id}/chapters',
    tags: ['Audiobooks', 'Chapters'],
    summary: 'Get Audiobook Chapters\n',
    description:
      "Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n",
    successDescription: 'Pages of chapters',
  })
  .input(
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
      ),
      'market?': type('string').describe(
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 50')
        .describe('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
    }),
  )
  .output(PagingSimplifiedChapterObjectSchema)
  .handler(async ({ input }) => {})
