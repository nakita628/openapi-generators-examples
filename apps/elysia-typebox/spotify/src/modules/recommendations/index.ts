import { Elysia } from 'elysia'
import {
  AlbumBaseSchema,
  AlbumRestrictionObjectSchema,
  ErrorObjectSchema,
  ExternalIdObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  LinkedTrackObjectSchema,
  RecommendationSeedObjectSchema,
  RecommendationsObjectSchema,
  SimplifiedAlbumObjectSchema,
  SimplifiedArtistObjectSchema,
  TrackObjectSchema,
  TrackRestrictionObjectSchema,
} from '../../components/schemas'
import { RecommendationsModel } from './model'

export const recommendations = new Elysia()
  .model({
    AlbumBase: AlbumBaseSchema,
    AlbumRestrictionObject: AlbumRestrictionObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalIdObject: ExternalIdObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    LinkedTrackObject: LinkedTrackObjectSchema,
    RecommendationSeedObject: RecommendationSeedObjectSchema,
    RecommendationsObject: RecommendationsObjectSchema,
    SimplifiedAlbumObject: SimplifiedAlbumObjectSchema,
    SimplifiedArtistObject: SimplifiedArtistObjectSchema,
    TrackObject: TrackObjectSchema,
    TrackRestrictionObject: TrackRestrictionObjectSchema,
  })
  .get('/recommendations', ({ query }) => {}, {
    query: RecommendationsModel.getRecommendationsQuery,
    response: {
      200: 'RecommendationsObject',
      401: RecommendationsModel.getRecommendationsResponse401,
      403: RecommendationsModel.getRecommendationsResponse403,
      429: RecommendationsModel.getRecommendationsResponse429,
    },
    detail: {
      tags: ['Tracks'],
      summary: 'Get Recommendations\n',
      description:
        'Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n',
      operationId: 'get-recommendations',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/recommendations/available-genre-seeds', () => {}, {
    response: {
      200: RecommendationsModel.getRecommendationGenresResponse200,
      401: RecommendationsModel.getRecommendationGenresResponse401,
      403: RecommendationsModel.getRecommendationGenresResponse403,
      429: RecommendationsModel.getRecommendationGenresResponse429,
    },
    detail: {
      tags: ['Genres'],
      summary: 'Get Available Genre Seeds\n',
      description:
        'Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).\n',
      operationId: 'get-recommendation-genres',
      security: [{ oauth_2_0: [] }],
    },
  })
