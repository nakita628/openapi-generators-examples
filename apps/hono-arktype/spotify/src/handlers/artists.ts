import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const artistsHandler = new Hono()
  .get(
    '/artists/:id',
    sValidator(
      'param',
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists',
    sValidator(
      'query',
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/albums',
    sValidator(
      'param',
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
      }),
    ),
    sValidator(
      'query',
      type({
        'include_groups?': type('string').describe(
          'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 10')
          .describe(
            'The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n',
          ),
        'offset?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/top-tracks',
    sValidator(
      'param',
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
      }),
    ),
    sValidator(
      'query',
      type({
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/related-artists',
    sValidator(
      'param',
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
