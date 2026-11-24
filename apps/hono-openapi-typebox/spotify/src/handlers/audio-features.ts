import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ManyAudioFeaturesResponse,
  OneAudioFeaturesResponse,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    describeRoute({
      deprecated: true,
      tags: ['Tracks'],
      operationId: 'get-several-audio-features',
      summary: "Get Several Tracks' Audio Features\n",
      description: 'Get audio features for multiple tracks based on their Spotify IDs.\n',
      responses: {
        '200': ManyAudioFeaturesResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          ids: Type.String({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
            examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/audio-features/:id',
    describeRoute({
      deprecated: true,
      tags: ['Tracks'],
      operationId: 'get-audio-features',
      summary: "Get Track's Audio Features\n",
      description:
        'Get audio feature information for a single track identified by its unique\nSpotify ID.\n',
      responses: {
        '200': OneAudioFeaturesResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          id: Type.String({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            examples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
