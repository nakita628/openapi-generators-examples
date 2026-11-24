import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const artistsHandler = new Hono()
  .get(
    '/artists/:id',
    sValidator(
      'param',
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          ),
          v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists',
    sValidator(
      'query',
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
          ),
          v.metadata({
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/albums',
    sValidator(
      'param',
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          ),
          v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        include_groups: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
            ),
            v.metadata({ examples: ['single,appears_on'] }),
          ),
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
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(10),
            ),
            '5',
          ),
          v.description(
            'The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
        offset: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '0',
          ),
          v.description(
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          ),
          v.metadata({ examples: [5] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/top-tracks',
    sValidator(
      'param',
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          ),
          v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          market: v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/related-artists',
    sValidator(
      'param',
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          ),
          v.metadata({ examples: ['0TnOYISbd1XYRBk9myaseg'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
