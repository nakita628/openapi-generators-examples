import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  SearchItemsResponse,
} from '../components'

export const searchHandler = new Hono().get(
  '/search',
  describeRoute({
    tags: ['Search'],
    operationId: 'search',
    summary: 'Search for Item\n',
    description:
      'Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks\nthat match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    responses: {
      '200': SearchItemsResponse,
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
        q: Type.String({
          description:
            'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
          examples: ['remaster%20track:Doxy%20artist:Miles%20Davis'],
        }),
        type: Type.Array(
          Type.Union([
            Type.Literal('album'),
            Type.Literal('artist'),
            Type.Literal('playlist'),
            Type.Literal('track'),
            Type.Literal('show'),
            Type.Literal('episode'),
            Type.Literal('audiobook'),
          ]),
          {
            description:
              'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
          },
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
        include_external: Type.Optional(
          Type.Literal('audio', {
            description:
              'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n',
          }),
        ),
      }),
    ),
  ),
  (c) => { throw new Error('Not implemented') },
)
