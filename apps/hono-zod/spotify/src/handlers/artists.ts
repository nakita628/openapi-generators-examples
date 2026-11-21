import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const artistsHandler = new Hono()
  .get(
    '/artists/:id',
    sValidator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/albums',
    sValidator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        include_groups: z
          .string()
          .meta({
            description:
              'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
            examples: ['single,appears_on'],
          })
          .exactOptional(),
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
        limit: z.coerce
          .number()
          .int()
          .min(0)
          .max(10)
          .default(5)
          .meta({
            description:
              'The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n',
            examples: [5],
          })
          .exactOptional(),
        offset: z.coerce
          .number()
          .int()
          .default(0)
          .meta({
            description:
              'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
            examples: [5],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/top-tracks',
    sValidator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        market: z
          .string()
          .meta({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/related-artists',
    sValidator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
