import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ManyArtistsResponse,
  OneArtistResponse,
  ManyTracksResponse,
  PagingArtistDiscographyAlbumObjectResponse,
} from '../components'

export const artistsHandler = new Hono()
  .get(
    '/artists/:id',
    describeRoute({
      tags: ['Artists'],
      operationId: 'get-an-artist',
      summary: 'Get Artist\n',
      description:
        'Get Spotify catalog information for a single artist identified by their unique Spotify ID.\n',
      responses: {
        '200': OneArtistResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists',
    describeRoute({
      deprecated: true,
      tags: ['Artists'],
      operationId: 'get-multiple-artists',
      summary: 'Get Several Artists\n',
      description:
        'Get Spotify catalog information for several artists based on their Spotify IDs.\n',
      responses: {
        '200': ManyArtistsResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'query',
      Compile(
        Type.Object({
          ids: Type.String({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
            examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/albums',
    describeRoute({
      tags: ['Artists', 'Albums'],
      operationId: 'get-an-artists-albums',
      summary: "Get Artist's Albums\n",
      description: "Get Spotify catalog information about an artist's albums.\n",
      responses: {
        '200': PagingArtistDiscographyAlbumObjectResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/top-tracks',
    describeRoute({
      deprecated: true,
      tags: ['Artists', 'Tracks'],
      operationId: 'get-an-artists-top-tracks',
      summary: "Get Artist's Top Tracks\n",
      description: "Get Spotify catalog information about an artist's top tracks by country.\n",
      responses: {
        '200': ManyTracksResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/artists/:id/related-artists',
    describeRoute({
      deprecated: true,
      tags: ['Artists'],
      operationId: 'get-an-artists-related-artists',
      summary: "Get Artist's Related Artists\n",
      description:
        "Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.\n",
      responses: {
        '200': ManyArtistsResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
            examples: ['0TnOYISbd1XYRBk9myaseg'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
