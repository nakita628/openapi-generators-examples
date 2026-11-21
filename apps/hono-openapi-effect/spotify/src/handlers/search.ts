import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
    Schema.toStandardSchemaV1(
      Schema.Struct({
        q: Schema.String.annotate({
          description:
            'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
          jsonSchemaExamples: ['remaster%20track:Doxy%20artist:Miles%20Davis'],
        }),
        type: Schema.Unknown.pipe(
          Schema.decodeTo(
            Schema.Unknown,
            SchemaTransformation.transform<unknown, unknown>({
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
              encode: (output) => output,
            }),
          ),
          Schema.decodeTo(
            Schema.Array(
              Schema.Literals([
                'album',
                'artist',
                'playlist',
                'track',
                'show',
                'episode',
                'audiobook',
              ]),
            ),
          ),
        ).annotate({
          description:
            'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
        }),
        market: Schema.optional(
          Schema.String.annotate({
            description:
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            jsonSchemaExamples: ['ES'],
          }),
        ),
        limit: Schema.FiniteFromString.check(
          Schema.isInt(),
          Schema.isGreaterThanOrEqualTo(1),
          Schema.isLessThanOrEqualTo(10),
        )
          .pipe(Schema.withDecodingDefaultType(Effect.succeed(5)))
          .annotate({
            description: 'The maximum number of results to return in each item type.\n',
            jsonSchemaExamples: [10],
          }),
        offset: Schema.FiniteFromString.check(
          Schema.isInt(),
          Schema.isGreaterThanOrEqualTo(0),
          Schema.isLessThanOrEqualTo(1000),
        )
          .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
          .annotate({
            description:
              'The index of the first result to return. Use\nwith limit to get the next page of search results.\n',
            jsonSchemaExamples: [5],
          }),
        include_external: Schema.optional(
          Schema.Literal('audio').annotate({
            description:
              'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n',
          }),
        ),
      }),
    ),
  ),
  (c) => { throw new Error('Not implemented') },
)
