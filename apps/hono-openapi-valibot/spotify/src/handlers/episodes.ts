import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ManyEpisodesResponse,
  OneEpisodeResponse,
} from '../components'

export const episodesHandler = new Hono()
  .get(
    '/episodes/:id',
    describeRoute({
      tags: ['Episodes'],
      operationId: 'get-an-episode',
      summary: 'Get Episode\n',
      description:
        'Get Spotify catalog information for a single episode identified by its\nunique Spotify ID.\n',
      responses: {
        '200': OneEpisodeResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    }),
    validator(
      'param',
      v.object({
        id: v.pipe(
          v.string(),
          v.description(
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
          ),
          v.metadata({ examples: ['512ojhOuo1ktJprKbVcKyQ'] }),
        ),
      }),
    ),
    validator(
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
    (c) => {},
  )
  .get(
    '/episodes',
    describeRoute({
      deprecated: true,
      tags: ['Episodes'],
      operationId: 'get-multiple-episodes',
      summary: 'Get Several Episodes\n',
      description:
        'Get Spotify catalog information for several episodes based on their Spotify IDs.\n',
      responses: {
        '200': ManyEpisodesResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    }),
    validator(
      'query',
      v.object({
        ids: v.pipe(
          v.string(),
          v.description(
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
          ),
          v.metadata({ examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'] }),
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
      }),
    ),
    (c) => {},
  )
