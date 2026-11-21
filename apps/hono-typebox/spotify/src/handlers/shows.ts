import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'

export const showsHandler = new Hono()
  .get(
    '/shows/:id',
    tbValidator(
      'param',
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
          examples: ['38bS44xjbVVZ3No3ByF1dJ'],
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/shows',
    tbValidator(
      'query',
      Type.Object({
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
          examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/shows/:id/episodes',
    tbValidator(
      'param',
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
          examples: ['38bS44xjbVVZ3No3ByF1dJ'],
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ default: '20' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String({ default: '0' }))
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
