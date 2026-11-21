import { t } from 'elysia'
import {
  AlbumObjectSchema,
  ArtistObjectSchema,
  AudioAnalysisObjectSchema,
  AudioFeaturesObjectSchema,
  AudiobookObjectSchema,
  CategoryObjectSchema,
  ChapterObjectSchema,
  CurrentlyPlayingContextObjectSchema,
  CurrentlyPlayingObjectSchema,
  CursorPagingPlayHistoryObjectSchema,
  CursorPagingSimplifiedArtistObjectSchema,
  DeviceObjectSchema,
  EpisodeObjectSchema,
  ErrorObjectSchema,
  ImageObjectSchema,
  PagingArtistDiscographyAlbumObjectSchema,
  PagingArtistObjectSchema,
  PagingFeaturedPlaylistObjectSchema,
  PagingObjectSchema,
  PagingPlaylistObjectSchema,
  PagingPlaylistTrackObjectSchema,
  PagingSavedAlbumObjectSchema,
  PagingSavedAudiobookObjectSchema,
  PagingSavedEpisodeObjectSchema,
  PagingSavedShowObjectSchema,
  PagingSavedTrackObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
  PagingSimplifiedAudiobookObjectSchema,
  PagingSimplifiedChapterObjectSchema,
  PagingSimplifiedEpisodeObjectSchema,
  PagingSimplifiedShowObjectSchema,
  PagingSimplifiedTrackObjectSchema,
  PagingTrackObjectSchema,
  PlaylistObjectSchema,
  PrivateUserObjectSchema,
  PublicUserObjectSchema,
  QueueObjectSchema,
  RecommendationsObjectSchema,
  ShowObjectSchema,
  SimplifiedShowObjectSchema,
  TrackObjectSchema,
} from './schemas'

export const UnauthorizedResponseSchema = t.Object({ error: ErrorObjectSchema })

export const ForbiddenResponseSchema = t.Object({ error: ErrorObjectSchema })

export const NotFoundResponseSchema = t.Object({ error: ErrorObjectSchema })

export const BadRequestResponseSchema = t.Object({ error: ErrorObjectSchema })

export const TooManyRequestsResponseSchema = t.Object({ error: ErrorObjectSchema })

export const ManyAlbumsResponseSchema = t.Object({ albums: t.Array(AlbumObjectSchema) })

export const ManyAudiobooksResponseSchema = t.Object({ audiobooks: t.Array(AudiobookObjectSchema) })

export const ManyChaptersResponseSchema = t.Object({ chapters: t.Array(ChapterObjectSchema) })

export const ManyDevicesResponseSchema = t.Object({ devices: t.Array(DeviceObjectSchema) })

export const PagedAlbumsResponseSchema = t.Object({ albums: PagingSimplifiedAlbumObjectSchema })

export const PagedPlaylistsResponseSchema = PagingPlaylistObjectSchema

export const PagedFeaturedPlaylistsResponseSchema = PagingFeaturedPlaylistObjectSchema

export const PagedCategoriesResponseSchema = t.Object({
  categories: t.Intersect([
    PagingObjectSchema,
    t.Object({ items: t.Optional(t.Array(CategoryObjectSchema)) }),
  ]),
})

export const CursorPagedArtistsResponseSchema = t.Object({
  artists: CursorPagingSimplifiedArtistObjectSchema,
})

export const CursorPagedPlayHistoryResponseSchema = CursorPagingPlayHistoryObjectSchema

export const ManyArtistsResponseSchema = t.Object({ artists: t.Array(ArtistObjectSchema) })

export const ManyAudioFeaturesResponseSchema = t.Object({
  audio_features: t.Array(AudioFeaturesObjectSchema),
})

export const ManyEpisodesResponseSchema = t.Object({ episodes: t.Array(EpisodeObjectSchema) })

export const ManyGenresResponseSchema = t.Object({
  genres: t.Array(t.String(), { example: ['alternative', 'samba'] }),
})

export const OneEpisodeResponseSchema = EpisodeObjectSchema

export const OneChapterResponseSchema = ChapterObjectSchema

export const OneAudiobookResponseSchema = AudiobookObjectSchema

export const OneAlbumResponseSchema = AlbumObjectSchema

export const ArrayOfImagesResponseSchema = t.Array(ImageObjectSchema)

export const OnePrivateUserResponseSchema = PrivateUserObjectSchema

export const OnePublicUserResponseSchema = PublicUserObjectSchema

export const OneTrackResponseSchema = TrackObjectSchema

export const OneShowResponseSchema = ShowObjectSchema

export const OneCategoryResponseSchema = CategoryObjectSchema

export const OnePlaylistResponseSchema = PlaylistObjectSchema

export const OneAudioFeaturesResponseSchema = AudioFeaturesObjectSchema

export const OneAudioAnalysisResponseSchema = AudioAnalysisObjectSchema

export const OneArtistResponseSchema = ArtistObjectSchema

export const ManyTracksResponseSchema = t.Object({ tracks: t.Array(TrackObjectSchema) })

export const ManySimplifiedShowsResponseSchema = t.Object({
  shows: t.Array(SimplifiedShowObjectSchema),
})

export const PagingSimplifiedTrackObjectResponseSchema = PagingSimplifiedTrackObjectSchema

export const PagingSavedTrackObjectResponseSchema = PagingSavedTrackObjectSchema

export const PagingPlaylistTrackObjectResponseSchema = PagingPlaylistTrackObjectSchema

export const PagingArtistDiscographyAlbumObjectResponseSchema =
  PagingArtistDiscographyAlbumObjectSchema

export const PagingSavedAlbumObjectResponseSchema = PagingSavedAlbumObjectSchema

export const PagingSavedShowObjectResponseSchema = PagingSavedShowObjectSchema

export const PagingSimplifiedEpisodeObjectResponseSchema = PagingSimplifiedEpisodeObjectSchema

export const PagingSavedEpisodeObjectResponseSchema = PagingSavedEpisodeObjectSchema

export const PagingSimplifiedAudiobookObjectResponseSchema = PagingSimplifiedAudiobookObjectSchema

export const PagingSimplifiedChapterObjectResponseSchema = PagingSimplifiedChapterObjectSchema

export const SearchItemsResponseSchema = t.Object({
  tracks: t.Optional(PagingTrackObjectSchema),
  artists: t.Optional(PagingArtistObjectSchema),
  albums: t.Optional(PagingSimplifiedAlbumObjectSchema),
  playlists: t.Optional(PagingPlaylistObjectSchema),
  shows: t.Optional(PagingSimplifiedShowObjectSchema),
  episodes: t.Optional(PagingSimplifiedEpisodeObjectSchema),
  audiobooks: t.Optional(PagingSimplifiedAudiobookObjectSchema),
})

export const OneRecommendationsResponseSchema = RecommendationsObjectSchema

export const ArrayOfBooleansResponseSchema = t.Array(t.Boolean(), { example: [false, true] })

export const SingletonArrayOfBooleanResponseSchema = t.Array(t.Boolean(), { example: [true] })

export const QueueResponseSchema = QueueObjectSchema

export const OneCurrentlyPlayingResponseSchema = CurrentlyPlayingContextObjectSchema

export const OneCurrentlyPlayingTrackResponseSchema = CurrentlyPlayingObjectSchema

export const PlaylistSnapshotIdResponseSchema = t.Object({
  snapshot_id: t.Optional(t.String({ example: 'abc' })),
})

export const MarketsResponseSchema = t.Object({
  markets: t.Optional(t.Array(t.String(), { example: ['CA', 'BR', 'IT'] })),
})

export const PagingArtistObjectResponseSchema = PagingArtistObjectSchema

export const PagingSavedAudiobookObjectResponseSchema = PagingSavedAudiobookObjectSchema

export const PagingTrackObjectResponseSchema = PagingTrackObjectSchema
