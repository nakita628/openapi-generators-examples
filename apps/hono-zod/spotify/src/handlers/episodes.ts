import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const episodesHandler = new Hono()
  .get(
    '/episodes/:id',
    sValidator(
      'param',
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
            examples: ['512ojhOuo1ktJprKbVcKyQ'],
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
    '/episodes',
    sValidator(
      'query',
      z.object({
        ids: z
          .string()
          .meta({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
            examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
          }),
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
