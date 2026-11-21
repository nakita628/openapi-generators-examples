import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'

export const artistsHandler = new Hono()
  .get(
    '/artists/:id',
    tbValidator(
      'param',
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          examples: ['0TnOYISbd1XYRBk9myaseg'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/artists',
    tbValidator(
      'query',
      Type.Object({
        ids: Type.String({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
          examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
        }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/artists/:id/albums',
    tbValidator(
      'param',
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          examples: ['0TnOYISbd1XYRBk9myaseg'],
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        include_groups: Type.Optional(
          Type.String({
            description:
              'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
            examples: ['single,appears_on'],
          }),
        ),
        market: Type.Optional(
          Type.String({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            examples: ['ES'],
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ default: '5' }))
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
    (c) => {},
  )
  .get(
    '/artists/:id/top-tracks',
    tbValidator(
      'param',
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          examples: ['0TnOYISbd1XYRBk9myaseg'],
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
    (c) => {},
  )
  .get(
    '/artists/:id/related-artists',
    tbValidator(
      'param',
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
          examples: ['0TnOYISbd1XYRBk9myaseg'],
        }),
      }),
    ),
    (c) => {},
  )
