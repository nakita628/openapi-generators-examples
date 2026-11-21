import { t } from 'elysia'

export const ExternalUrlObjectSchema = t.Object({
  spotify: t.Optional(
    t.String({
      description:
        'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\n',
    }),
  ),
})

export const LinkedTrackObjectSchema = t.Object({
  external_urls: t.Optional(ExternalUrlObjectSchema),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  type: t.Optional(t.String({ description: 'The object type: "track".\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
})

export const TrackRestrictionObjectSchema = t.Object({
  reason: t.Optional(
    t.String({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export const AlbumRestrictionObjectSchema = t.Object({
  reason: t.Optional(
    t.UnionEnum(['market', 'product', 'explicit'], {
      description:
        "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n",
      default: undefined,
    }),
  ),
})

export const EpisodeRestrictionObjectSchema = t.Object({
  reason: t.Optional(
    t.String({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export const ChapterRestrictionObjectSchema = t.Object({
  reason: t.Optional(
    t.String({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n- `payment_required` - Payment is required to play the content item.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export const FollowersObjectSchema = t.Object({
  href: t.Optional(
    t.Union([
      t.String({
        description:
          'This will always be set to null, as the Web API does not support it at the moment.\n',
      }),
      t.Null(),
    ]),
  ),
  total: t.Optional(
    t.Integer({ maximum: 9007199254740991, description: 'The total number of followers.\n' }),
  ),
})

export const ImageObjectSchema = t.Object({
  url: t.String({
    example: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
    description: 'The source URL of the image.\n',
  }),
  height: t.Union([
    t.Integer({
      maximum: 9007199254740991,
      example: 300,
      description: 'The image height in pixels.\n',
    }),
    t.Null(),
  ]),
  width: t.Union([
    t.Integer({
      maximum: 9007199254740991,
      example: 300,
      description: 'The image width in pixels.\n',
    }),
    t.Null(),
  ]),
})

export const ArtistObjectSchema = t.Object({
  external_urls: t.Optional(ExternalUrlObjectSchema),
  followers: t.Optional(FollowersObjectSchema),
  genres: t.Optional(
    t.Array(t.String(), {
      example: ['Prog rock', 'Grunge'],
      description:
        'A list of the genres the artist is associated with. If not yet classified, the array is empty.\n',
      deprecated: true,
    }),
  ),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
  images: t.Optional(
    t.Array(ImageObjectSchema, {
      description: 'Images of the artist in various sizes, widest first.\n',
    }),
  ),
  name: t.Optional(t.String({ description: 'The name of the artist.\n' })),
  popularity: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        "The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n",
      deprecated: true,
    }),
  ),
  type: t.Optional(t.Literal('artist', { description: 'The object type.\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
})

export const SimplifiedArtistObjectSchema = t.Object({
  external_urls: t.Optional(ExternalUrlObjectSchema),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
  name: t.Optional(t.String({ description: 'The name of the artist.\n' })),
  type: t.Optional(t.Literal('artist', { description: 'The object type.\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
})

export const AlbumBaseSchema = t.Object({
  album_type: t.UnionEnum(['album', 'single', 'compilation'], {
    example: 'compilation',
    description: 'The type of the album.\n',
    default: undefined,
  }),
  total_tracks: t.Integer({
    maximum: 9007199254740991,
    example: 9,
    description: 'The number of tracks in the album.',
  }),
  available_markets: t.Array(t.String(), {
    example: ['CA', 'BR', 'IT'],
    description:
      'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n',
    deprecated: true,
  }),
  external_urls: ExternalUrlObjectSchema,
  href: t.String({
    description: 'A link to the Web API endpoint providing full details of the album.\n',
  }),
  id: t.String({
    example: '2up3OPMp9Tb4dAKM2erWXQ',
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
  }),
  images: t.Array(ImageObjectSchema, {
    description: 'The cover art for the album in various sizes, widest first.\n',
  }),
  name: t.String({
    description:
      'The name of the album. In case of an album takedown, the value may be an empty string.\n',
  }),
  release_date: t.String({
    example: '1981-12',
    description: 'The date the album was first released.\n',
  }),
  release_date_precision: t.UnionEnum(['year', 'month', 'day'], {
    example: 'year',
    description: 'The precision with which `release_date` value is known.\n',
    default: undefined,
  }),
  restrictions: t.Optional(AlbumRestrictionObjectSchema),
  type: t.Literal('album', { description: 'The object type.\n' }),
  uri: t.String({
    example: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
  }),
})

export const SimplifiedAlbumObjectSchema = t.Intersect([
  AlbumBaseSchema,
  t.Object({
    artists: t.Array(SimplifiedArtistObjectSchema, {
      description:
        'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    }),
  }),
])

export const ExternalIdObjectSchema = t.Object({
  isrc: t.Optional(
    t.String({
      description:
        '[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n',
    }),
  ),
  ean: t.Optional(
    t.String({
      description:
        '[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n',
    }),
  ),
  upc: t.Optional(
    t.String({
      description:
        '[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n',
    }),
  ),
})

export const TrackObjectSchema = t.Object({
  album: t.Optional(SimplifiedAlbumObjectSchema),
  artists: t.Optional(
    t.Array(SimplifiedArtistObjectSchema, {
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    }),
  ),
  available_markets: t.Optional(
    t.Array(t.String(), {
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  ),
  disc_number: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The disc number (usually `1` unless the album consists of more than one disc).\n',
    }),
  ),
  duration_ms: t.Optional(
    t.Integer({ maximum: 9007199254740991, description: 'The track length in milliseconds.\n' }),
  ),
  explicit: t.Optional(
    t.Boolean({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n',
    }),
  ),
  external_ids: t.Optional(ExternalIdObjectSchema),
  external_urls: t.Optional(ExternalUrlObjectSchema),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_playable: t.Optional(
    t.Boolean({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
  ),
  linked_from: t.Optional(LinkedTrackObjectSchema),
  restrictions: t.Optional(TrackRestrictionObjectSchema),
  name: t.Optional(t.String({ description: 'The name of the track.\n' })),
  popularity: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n',
      deprecated: true,
    }),
  ),
  preview_url: t.Optional(
    t.Union([
      t.String({
        description: 'A link to a 30 second preview (MP3 format) of the track. Can be `null`\n',
        deprecated: true,
      }),
      t.Null(),
    ]),
  ),
  track_number: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
  ),
  type: t.Optional(t.Literal('track', { description: 'The object type: "track".\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_local: t.Optional(
    t.Boolean({ description: 'Whether or not the track is from a local file.\n' }),
  ),
})

export const ContextObjectSchema = t.Object({
  type: t.Optional(
    t.String({ description: 'The object type, e.g. "artist", "playlist", "album", "show".\n' }),
  ),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
  ),
  external_urls: t.Optional(ExternalUrlObjectSchema),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.\n',
    }),
  ),
})

export const PlayHistoryObjectSchema = t.Object({
  track: t.Optional(TrackObjectSchema),
  played_at: t.Optional(t.Date({ description: 'The date and time the track was played.' })),
  context: t.Optional(ContextObjectSchema),
})

export const PlaylistUserObjectSchema = t.Object({
  external_urls: t.Optional(ExternalUrlObjectSchema),
  href: t.Optional(t.String({ description: 'A link to the Web API endpoint for this user.\n' })),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
  type: t.Optional(t.Literal('user', { description: 'The object type.\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
})

export const ResumePointObjectSchema = t.Object({
  fully_played: t.Optional(
    t.Boolean({ description: 'Whether or not the episode has been fully played by the user.\n' }),
  ),
  resume_position_ms: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: "The user's most recent position in the episode in milliseconds.\n",
    }),
  ),
})

export const EpisodeBaseSchema = t.Object({
  audio_preview_url: t.Union([
    t.String({
      example: 'https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17',
      description:
        'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
      deprecated: true,
    }),
    t.Null(),
  ]),
  description: t.String({
    example:
      'A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n',
    description:
      'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: t.String({
    example:
      '<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n',
    description: 'A description of the episode. This field may contain HTML tags.\n',
  }),
  duration_ms: t.Integer({
    maximum: 9007199254740991,
    example: 1686230,
    description: 'The episode length in milliseconds.\n',
  }),
  explicit: t.Boolean({
    description:
      'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: t.String({
    example: 'https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ',
    description: 'A link to the Web API endpoint providing full details of the episode.\n',
  }),
  id: t.String({
    example: '5Xt5DXGzch68nYYamXrNxZ',
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
  }),
  images: t.Array(ImageObjectSchema, {
    description: 'The cover art for the episode in various sizes, widest first.\n',
  }),
  is_externally_hosted: t.Boolean({
    description: "True if the episode is hosted outside of Spotify's CDN.\n",
  }),
  is_playable: t.Boolean({
    description: 'True if the episode is playable in the given market. Otherwise false.\n',
  }),
  language: t.Optional(
    t.String({
      example: 'en',
      description:
        'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n',
      deprecated: true,
    }),
  ),
  languages: t.Array(t.String(), {
    example: ['fr', 'en'],
    description:
      'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  name: t.String({
    example: 'Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n',
    description: 'The name of the episode.\n',
  }),
  release_date: t.String({
    example: '1981-12-15',
    description:
      'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
  }),
  release_date_precision: t.UnionEnum(['year', 'month', 'day'], {
    example: 'day',
    description: 'The precision with which `release_date` value is known.\n',
    default: undefined,
  }),
  resume_point: t.Optional(ResumePointObjectSchema),
  type: t.Literal('episode', { description: 'The object type.\n' }),
  uri: t.String({
    example: 'spotify:episode:0zLhl3WsOCQHbe1BPTiHgr',
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
  }),
  restrictions: t.Optional(EpisodeRestrictionObjectSchema),
})

export const CopyrightObjectSchema = t.Object({
  text: t.Optional(t.String({ description: 'The copyright text for this content.\n' })),
  type: t.Optional(
    t.String({
      description:
        'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n',
    }),
  ),
})

export const ShowBaseSchema = t.Object({
  available_markets: t.Array(t.String(), {
    description:
      'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    deprecated: true,
  }),
  copyrights: t.Array(CopyrightObjectSchema, {
    description: 'The copyright statements of the show.\n',
  }),
  description: t.String({
    description:
      'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: t.String({
    description: 'A description of the show. This field may contain HTML tags.\n',
  }),
  explicit: t.Boolean({
    description:
      'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: t.String({
    description: 'A link to the Web API endpoint providing full details of the show.\n',
  }),
  id: t.String({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  }),
  images: t.Array(ImageObjectSchema, {
    description: 'The cover art for the show in various sizes, widest first.\n',
  }),
  is_externally_hosted: t.Boolean({
    description:
      "True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n",
  }),
  languages: t.Array(t.String(), {
    description:
      'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  media_type: t.String({ description: 'The media type of the show.\n' }),
  name: t.String({ description: 'The name of the episode.\n' }),
  publisher: t.String({ description: 'The publisher of the show.\n', deprecated: true }),
  type: t.Literal('show', { description: 'The object type.\n' }),
  uri: t.String({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  }),
  total_episodes: t.Integer({
    maximum: 9007199254740991,
    description: 'The total number of episodes in the show.\n',
  }),
})

export const SimplifiedShowObjectSchema = ShowBaseSchema

export const EpisodeObjectSchema = t.Intersect([
  EpisodeBaseSchema,
  t.Object({ show: SimplifiedShowObjectSchema }),
])

export const PlaylistTrackObjectSchema = t.Object({
  added_at: t.Optional(
    t.Date({
      description:
        'The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._\n',
    }),
  ),
  added_by: t.Optional(PlaylistUserObjectSchema),
  is_local: t.Optional(
    t.Boolean({
      description:
        'Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.\n',
    }),
  ),
  item: t.Optional(
    t.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'Information about the track or episode.',
    }),
  ),
  track: t.Optional(
    t.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: '**Deprecated:** Use `item` instead. Information about the track or episode.\n',
      deprecated: true,
    }),
  ),
})

export const QueueObjectSchema = t.Object({
  currently_playing: t.Optional(
    t.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  queue: t.Optional(
    t.Array(t.Union([TrackObjectSchema, EpisodeObjectSchema]), {
      description: 'The tracks or episodes in the queue. Can be empty.',
    }),
  ),
})

export const DeviceObjectSchema = t.Object({
  id: t.Optional(
    t.Union([
      t.String({
        description:
          'The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.',
      }),
      t.Null(),
    ]),
  ),
  is_active: t.Optional(
    t.Boolean({ description: 'If this device is the currently active device.' }),
  ),
  is_private_session: t.Optional(
    t.Boolean({ description: 'If this device is currently in a private session.' }),
  ),
  is_restricted: t.Optional(
    t.Boolean({
      description:
        'Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.',
    }),
  ),
  name: t.Optional(
    t.String({
      example: 'Kitchen speaker',
      description:
        'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\"Loudest speaker\\") and some devices have a generic name associated with the manufacturer or device model.',
    }),
  ),
  type: t.Optional(
    t.String({
      example: 'computer',
      description: 'Device type, such as "computer", "smartphone" or "speaker".',
    }),
  ),
  volume_percent: t.Optional(
    t.Union([
      t.Integer({
        minimum: 0,
        maximum: 100,
        example: 59,
        description: 'The current volume in percent.',
      }),
      t.Null(),
    ]),
  ),
  supports_volume: t.Optional(
    t.Boolean({ description: 'If this device can be used to set the volume.' }),
  ),
})

export const DisallowsObjectSchema = t.Object({
  interrupting_playback: t.Optional(
    t.Boolean({ description: 'Interrupting playback. Optional field.' }),
  ),
  pausing: t.Optional(t.Boolean({ description: 'Pausing. Optional field.' })),
  resuming: t.Optional(t.Boolean({ description: 'Resuming. Optional field.' })),
  seeking: t.Optional(t.Boolean({ description: 'Seeking playback location. Optional field.' })),
  skipping_next: t.Optional(
    t.Boolean({ description: 'Skipping to the next context. Optional field.' }),
  ),
  skipping_prev: t.Optional(
    t.Boolean({ description: 'Skipping to the previous context. Optional field.' }),
  ),
  toggling_repeat_context: t.Optional(
    t.Boolean({ description: 'Toggling repeat context flag. Optional field.' }),
  ),
  toggling_shuffle: t.Optional(
    t.Boolean({ description: 'Toggling shuffle flag. Optional field.' }),
  ),
  toggling_repeat_track: t.Optional(
    t.Boolean({ description: 'Toggling repeat track flag. Optional field.' }),
  ),
  transferring_playback: t.Optional(
    t.Boolean({ description: 'Transfering playback between devices. Optional field.' }),
  ),
})

export const CurrentlyPlayingContextObjectSchema = t.Object({
  device: t.Optional(DeviceObjectSchema),
  repeat_state: t.Optional(t.String({ description: 'off, track, context' })),
  shuffle_state: t.Optional(t.Boolean({ description: 'If shuffle is on or off.' })),
  context: t.Optional(ContextObjectSchema),
  timestamp: t.Optional(
    t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description:
        'Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.).',
    }),
  ),
  progress_ms: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
  ),
  is_playing: t.Optional(
    t.Boolean({ description: 'If something is currently playing, return `true`.' }),
  ),
  item: t.Optional(
    t.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  currently_playing_type: t.Optional(
    t.String({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
  ),
  actions: t.Optional(DisallowsObjectSchema),
})

export const ErrorObjectSchema = t.Object({
  status: t.Integer({
    minimum: 400,
    maximum: 599,
    description:
      'The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).\n',
  }),
  message: t.String({ description: 'A short description of the cause of the error.\n' }),
})

export const ExplicitContentSettingsObjectSchema = t.Object({
  filter_enabled: t.Optional(
    t.Boolean({
      description: 'When `true`, indicates that explicit content should not be played.\n',
    }),
  ),
  filter_locked: t.Optional(
    t.Boolean({
      description:
        "When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n",
    }),
  ),
})

export const PrivateUserObjectSchema = t.Object({
  account_id: t.Optional(
    t.String({
      example: 'aB3dE5fG7h',
      description:
        "A public, immutable, pseudoanonymous identifier for the user's account. Use this field for account linking rather than the `id` field, as it is stable and will not change over the lifetime of the account.\n",
    }),
  ),
  country: t.Optional(
    t.String({
      description:
        "The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      deprecated: true,
    }),
  ),
  display_name: t.Optional(
    t.String({
      description: "The name displayed on the user's profile. `null` if not available.\n",
    }),
  ),
  email: t.Optional(
    t.String({
      description:
        "The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      deprecated: true,
    }),
  ),
  explicit_content: t.Optional(ExplicitContentSettingsObjectSchema),
  external_urls: t.Optional(ExternalUrlObjectSchema),
  followers: t.Optional(FollowersObjectSchema),
  href: t.Optional(t.String({ description: 'A link to the Web API endpoint for this user.\n' })),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. Do not use this field for account linking — use `account_id` instead, which is immutable.\n',
    }),
  ),
  images: t.Optional(t.Array(ImageObjectSchema, { description: "The user's profile image." })),
  product: t.Optional(
    t.String({
      description:
        'The user\'s Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n',
      deprecated: true,
    }),
  ),
  type: t.Optional(t.String({ description: 'The object type: "user"\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
    }),
  ),
})

export const PublicUserObjectSchema = t.Object({
  display_name: t.Optional(
    t.Union([
      t.String({
        description: "The name displayed on the user's profile. `null` if not available.\n",
      }),
      t.Null(),
    ]),
  ),
  external_urls: t.Optional(ExternalUrlObjectSchema),
  followers: t.Optional(FollowersObjectSchema),
  href: t.Optional(t.String({ description: 'A link to the Web API endpoint for this user.\n' })),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
  images: t.Optional(t.Array(ImageObjectSchema, { description: "The user's profile image.\n" })),
  type: t.Optional(t.Literal('user', { description: 'The object type.\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
})

export const LoudnessSchema = t.Number({
  format: 'float',
  example: -5.883,
  description:
    'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n',
})

export const TempoSchema = t.Number({
  format: 'float',
  example: 118.211,
  description:
    'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n',
})

export const TimeSignatureSchema = t.Integer({
  minimum: 3,
  maximum: 7,
  example: 4,
  description:
    'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
})

export const KeySchema = t.Integer({
  minimum: -1,
  maximum: 11,
  example: 9,
  description:
    'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n',
})

export const ModeSchema = t.Integer({
  maximum: 9007199254740991,
  example: 0,
  description:
    'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n',
})

export const TimeIntervalObjectSchema = t.Object({
  start: t.Optional(
    t.Number({
      example: 0.49567,
      description: 'The starting point (in seconds) of the time interval.',
    }),
  ),
  duration: t.Optional(
    t.Number({ example: 2.18749, description: 'The duration (in seconds) of the time interval.' }),
  ),
  confidence: t.Optional(
    t.Number({
      minimum: 0,
      maximum: 1,
      example: 0.925,
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the interval.',
    }),
  ),
})

export const SectionObjectSchema = t.Object({
  start: t.Optional(
    t.Number({ example: 0, description: 'The starting point (in seconds) of the section.' }),
  ),
  duration: t.Optional(
    t.Number({ example: 6.97092, description: 'The duration (in seconds) of the section.' }),
  ),
  confidence: t.Optional(
    t.Number({
      minimum: 0,
      maximum: 1,
      example: 1,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the section\'s "designation".',
    }),
  ),
  loudness: t.Optional(
    t.Number({
      example: -14.938,
      description:
        'The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.',
    }),
  ),
  tempo: t.Optional(
    t.Number({
      example: 113.178,
      description:
        'The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
    }),
  ),
  tempo_confidence: t.Optional(
    t.Number({
      minimum: 0,
      maximum: 1,
      example: 0.647,
      description:
        "The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.",
    }),
  ),
  key: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      example: 9,
      description:
        'The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.',
    }),
  ),
  key_confidence: t.Optional(
    t.Number({
      minimum: 0,
      maximum: 1,
      example: 0.297,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.',
    }),
  ),
  mode: t.Optional(
    t.UnionEnum([-1, 0, 1], {
      description:
        'Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.',
      default: undefined,
    }),
  ),
  mode_confidence: t.Optional(
    t.Number({
      minimum: 0,
      maximum: 1,
      example: 0.471,
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
    }),
  ),
  time_signature: t.Optional(TimeSignatureSchema),
  time_signature_confidence: t.Optional(
    t.Number({
      minimum: 0,
      maximum: 1,
      example: 1,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.',
    }),
  ),
})

export const SegmentObjectSchema = t.Object({
  start: t.Optional(
    t.Number({ example: 0.70154, description: 'The starting point (in seconds) of the segment.' }),
  ),
  duration: t.Optional(
    t.Number({ example: 0.19891, description: 'The duration (in seconds) of the segment.' }),
  ),
  confidence: t.Optional(
    t.Number({
      minimum: 0,
      maximum: 1,
      example: 0.435,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.\n',
    }),
  ),
  loudness_start: t.Optional(
    t.Number({
      example: -23.053,
      description:
        'The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
    }),
  ),
  loudness_max: t.Optional(
    t.Number({
      example: -14.25,
      description:
        'The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
    }),
  ),
  loudness_max_time: t.Optional(
    t.Number({
      example: 0.07305,
      description:
        'The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.',
    }),
  ),
  loudness_end: t.Optional(
    t.Number({
      example: 0,
      description:
        'The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.',
    }),
  ),
  pitches: t.Optional(
    t.Array(t.Number({ minimum: 0, maximum: 1 }), {
      example: [0.212, 0.141, 0.294],
      description:
        'Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).\n\nVectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.\nAs can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.\n![pitch vector](/assets/audio/Pitch_vector.png)\n',
    }),
  ),
  timbre: t.Optional(
    t.Array(t.Number(), {
      example: [42.115, 64.373, -0.233],
      description:
        'Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n\nFor completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).\n![timbre basis functions](/assets/audio/Timbre_basis_functions.png)\n\nThe actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.\n',
    }),
  ),
})

export const AudioAnalysisObjectSchema = t.Object({
  meta: t.Optional(
    t.Object({
      analyzer_version: t.Optional(
        t.String({
          example: '4.0.0',
          description: 'The version of the Analyzer used to analyze this track.',
        }),
      ),
      platform: t.Optional(
        t.String({
          example: 'Linux',
          description: "The platform used to read the track's audio data.",
        }),
      ),
      detailed_status: t.Optional(
        t.String({
          example: 'OK',
          description:
            'A detailed status code for this track. If analysis data is missing, this code may explain why.',
        }),
      ),
      status_code: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          example: 0,
          description:
            'The return code of the analyzer process. 0 if successful, 1 if any errors occurred.',
        }),
      ),
      timestamp: t.Optional(
        t.Integer({
          format: 'int64',
          maximum: 9007199254740991,
          example: 1495193577,
          description: 'The Unix timestamp (in seconds) at which this track was analyzed.',
        }),
      ),
      analysis_time: t.Optional(
        t.Number({
          example: 6.93906,
          description: 'The amount of time taken to analyze this track.',
        }),
      ),
      input_process: t.Optional(
        t.String({
          example: 'libvorbisfile L+R 44100->22050',
          description: "The method used to read the track's audio data.",
        }),
      ),
    }),
  ),
  track: t.Optional(
    t.Object({
      num_samples: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          example: 4585515,
          description:
            'The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.',
        }),
      ),
      duration: t.Optional(
        t.Number({ example: 207.95985, description: 'Length of the track in seconds.' }),
      ),
      sample_md5: t.Optional(
        t.String({ description: 'This field will always contain the empty string.' }),
      ),
      offset_seconds: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          example: 0,
          description:
            'An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)',
        }),
      ),
      window_seconds: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          example: 0,
          description:
            'The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)',
        }),
      ),
      analysis_sample_rate: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          example: 22050,
          description:
            'The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.',
        }),
      ),
      analysis_channels: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          example: 1,
          description:
            'The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.',
        }),
      ),
      end_of_fade_in: t.Optional(
        t.Number({
          example: 0,
          description:
            "The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.",
        }),
      ),
      start_of_fade_out: t.Optional(
        t.Number({
          example: 201.13705,
          description:
            "The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.",
        }),
      ),
      loudness: t.Optional(LoudnessSchema),
      tempo: t.Optional(TempoSchema),
      tempo_confidence: t.Optional(
        t.Number({
          minimum: 0,
          maximum: 1,
          example: 0.73,
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.',
        }),
      ),
      time_signature: t.Optional(TimeSignatureSchema),
      time_signature_confidence: t.Optional(
        t.Number({
          minimum: 0,
          maximum: 1,
          example: 0.994,
          description:
            'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.',
        }),
      ),
      key: t.Optional(KeySchema),
      key_confidence: t.Optional(
        t.Number({
          minimum: 0,
          maximum: 1,
          example: 0.408,
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `key`.',
        }),
      ),
      mode: t.Optional(ModeSchema),
      mode_confidence: t.Optional(
        t.Number({
          minimum: 0,
          maximum: 1,
          example: 0.485,
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
        }),
      ),
      codestring: t.Optional(
        t.String({
          description:
            'An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.',
        }),
      ),
      code_version: t.Optional(
        t.Number({
          example: 3.15,
          description:
            'A version number for the Echo Nest Musical Fingerprint format used in the codestring field.',
        }),
      ),
      echoprintstring: t.Optional(
        t.String({
          description:
            'An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.',
        }),
      ),
      echoprint_version: t.Optional(
        t.Number({
          example: 4.15,
          description:
            'A version number for the EchoPrint format used in the echoprintstring field.',
        }),
      ),
      synchstring: t.Optional(
        t.String({
          description: 'A [Synchstring](https://github.com/echonest/synchdata) for this track.',
        }),
      ),
      synch_version: t.Optional(
        t.Number({
          example: 1,
          description: 'A version number for the Synchstring used in the synchstring field.',
        }),
      ),
      rhythmstring: t.Optional(
        t.String({
          description:
            'A Rhythmstring for this track. The format of this string is similar to the Synchstring.',
        }),
      ),
      rhythm_version: t.Optional(
        t.Number({
          example: 1,
          description: 'A version number for the Rhythmstring used in the rhythmstring field.',
        }),
      ),
    }),
  ),
  bars: t.Optional(
    t.Array(TimeIntervalObjectSchema, {
      description:
        'The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.',
    }),
  ),
  beats: t.Optional(
    t.Array(TimeIntervalObjectSchema, {
      description:
        'The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.',
    }),
  ),
  sections: t.Optional(
    t.Array(SectionObjectSchema, {
      description:
        'Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.',
    }),
  ),
  segments: t.Optional(
    t.Array(SegmentObjectSchema, {
      description: 'Each segment contains a roughly conisistent sound throughout its duration.',
    }),
  ),
  tatums: t.Optional(
    t.Array(TimeIntervalObjectSchema, {
      description:
        'A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).',
    }),
  ),
})

export const AudioFeaturesObjectSchema = t.Object({
  acousticness: t.Optional(
    t.Number({
      format: 'float',
      minimum: 0,
      maximum: 1,
      example: 0.00242,
      description:
        'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
    }),
  ),
  analysis_url: t.Optional(
    t.String({
      example: 'https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n',
      description:
        'A URL to access the full audio analysis of this track. An access token is required to access this data.\n',
    }),
  ),
  danceability: t.Optional(
    t.Number({
      format: 'float',
      example: 0.585,
      description:
        'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
    }),
  ),
  duration_ms: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      example: 237040,
      description: 'The duration of the track in milliseconds.\n',
    }),
  ),
  energy: t.Optional(
    t.Number({
      format: 'float',
      example: 0.842,
      description:
        'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
    }),
  ),
  id: t.Optional(
    t.String({ example: '2takcwOaAZWiXQijPHIx7B', description: 'The Spotify ID for the track.\n' }),
  ),
  instrumentalness: t.Optional(
    t.Number({
      format: 'float',
      example: 0.00686,
      description:
        'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
    }),
  ),
  key: t.Optional(KeySchema),
  liveness: t.Optional(
    t.Number({
      format: 'float',
      example: 0.0866,
      description:
        'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
    }),
  ),
  loudness: t.Optional(LoudnessSchema),
  mode: t.Optional(ModeSchema),
  speechiness: t.Optional(
    t.Number({
      format: 'float',
      example: 0.0556,
      description:
        'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
    }),
  ),
  tempo: t.Optional(TempoSchema),
  time_signature: t.Optional(TimeSignatureSchema),
  track_href: t.Optional(
    t.String({
      example: 'https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n',
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
  ),
  type: t.Optional(t.Literal('audio_features', { description: 'The object type.\n' })),
  uri: t.Optional(
    t.String({
      example: 'spotify:track:2takcwOaAZWiXQijPHIx7B',
      description: 'The Spotify URI for the track.\n',
    }),
  ),
  valence: t.Optional(
    t.Number({
      format: 'float',
      minimum: 0,
      maximum: 1,
      example: 0.428,
      description:
        'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
    }),
  ),
})

export const SimplifiedTrackObjectSchema = t.Object({
  artists: t.Optional(
    t.Array(SimplifiedArtistObjectSchema, {
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',
    }),
  ),
  available_markets: t.Optional(
    t.Array(t.String(), {
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  ),
  disc_number: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'The disc number (usually `1` unless the album consists of more than one disc).',
    }),
  ),
  duration_ms: t.Optional(
    t.Integer({ maximum: 9007199254740991, description: 'The track length in milliseconds.' }),
  ),
  explicit: t.Optional(
    t.Boolean({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).',
    }),
  ),
  external_urls: t.Optional(ExternalUrlObjectSchema),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_playable: t.Optional(
    t.Boolean({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
  ),
  linked_from: t.Optional(LinkedTrackObjectSchema),
  restrictions: t.Optional(TrackRestrictionObjectSchema),
  name: t.Optional(t.String({ description: 'The name of the track.' })),
  preview_url: t.Optional(
    t.Union([
      t.String({
        description: 'A URL to a 30 second preview (MP3 format) of the track.\n',
        deprecated: true,
      }),
      t.Null(),
    ]),
  ),
  track_number: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
  ),
  type: t.Optional(t.String({ description: 'The object type: "track".\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_local: t.Optional(
    t.Boolean({ description: 'Whether or not the track is from a local file.\n' }),
  ),
})

export const CursorObjectSchema = t.Object({
  after: t.Optional(
    t.String({ description: 'The cursor to use as key to find the next page of items.' }),
  ),
  before: t.Optional(
    t.String({ description: 'The cursor to use as key to find the previous page of items.' }),
  ),
})

export const CursorPagingObjectSchema = t.Object({
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint returning the full result of the request.',
    }),
  ),
  limit: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The maximum number of items in the response (as set in the query or by default).',
    }),
  ),
  next: t.Optional(t.String({ description: 'URL to the next page of items. ( `null` if none)' })),
  cursors: t.Optional(CursorObjectSchema),
  total: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'The total number of items available to return.',
    }),
  ),
})

export const CursorPagingPlayHistoryObjectSchema = t.Intersect([
  CursorPagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(PlayHistoryObjectSchema)) }),
])

export const CursorPagingSimplifiedArtistObjectSchema = t.Intersect([
  CursorPagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(ArtistObjectSchema)) }),
])

export const PagingObjectSchema = t.Object({
  href: t.String({
    example: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20\n',
    description: 'A link to the Web API endpoint returning the full result of the request\n',
  }),
  limit: t.Integer({
    maximum: 9007199254740991,
    example: 20,
    description:
      'The maximum number of items in the response (as set in the query or by default).\n',
  }),
  next: t.Union([
    t.String({
      example: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
      description: 'URL to the next page of items. ( `null` if none)\n',
    }),
    t.Null(),
  ]),
  offset: t.Integer({
    maximum: 9007199254740991,
    example: 0,
    description: 'The offset of the items returned (as set in the query or by default)\n',
  }),
  previous: t.Union([
    t.String({
      example: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
      description: 'URL to the previous page of items. ( `null` if none)\n',
    }),
    t.Null(),
  ]),
  total: t.Integer({
    maximum: 9007199254740991,
    example: 4,
    description: 'The total number of items available to return.\n',
  }),
})

export const PlaylistOwnerObjectSchema = t.Intersect([
  PlaylistUserObjectSchema,
  t.Object({
    display_name: t.Optional(
      t.Union([
        t.String({
          description: "The name displayed on the user's profile. `null` if not available.\n",
        }),
        t.Null(),
      ]),
    ),
  }),
])

export const PlaylistTracksRefObjectSchema = t.Object({
  href: t.Optional(
    t.String({
      description:
        "A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n",
    }),
  ),
  total: t.Optional(
    t.Integer({ maximum: 9007199254740991, description: 'Number of tracks in the playlist.\n' }),
  ),
})

export const SimplifiedPlaylistObjectSchema = t.Object({
  collaborative: t.Optional(
    t.Boolean({ description: '`true` if the owner allows other users to modify the playlist.\n' }),
  ),
  description: t.Optional(
    t.String({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    }),
  ),
  external_urls: t.Optional(ExternalUrlObjectSchema),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  images: t.Optional(
    t.Array(ImageObjectSchema, {
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
  ),
  name: t.Optional(t.String({ description: 'The name of the playlist.\n' })),
  owner: t.Optional(PlaylistOwnerObjectSchema),
  public: t.Optional(
    t.Boolean({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
  ),
  snapshot_id: t.Optional(
    t.String({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
  ),
  items: t.Optional(PlaylistTracksRefObjectSchema),
  tracks: t.Optional(PlaylistTracksRefObjectSchema),
  type: t.Optional(t.String({ description: 'The object type: "playlist"\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
})

export const PagingPlaylistObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SimplifiedPlaylistObjectSchema)) }),
])

export const PagingFeaturedPlaylistObjectSchema = t.Object({
  message: t.Optional(
    t.String({
      example: 'Popular Playlists',
      description: 'The localized message of a playlist.\n',
    }),
  ),
  playlists: t.Optional(PagingPlaylistObjectSchema),
})

export const ArtistDiscographyAlbumObjectSchema = t.Intersect([
  SimplifiedAlbumObjectSchema,
  t.Object({
    album_group: t.UnionEnum(['album', 'single', 'compilation', 'appears_on'], {
      example: 'compilation',
      description: 'This field describes the relationship between the artist and the album.\n',
      deprecated: true,
      default: undefined,
    }),
  }),
])

export const PagingArtistDiscographyAlbumObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(ArtistDiscographyAlbumObjectSchema)) }),
])

export const PagingSimplifiedAlbumObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SimplifiedAlbumObjectSchema)) }),
])

export const PagingSimplifiedTrackObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SimplifiedTrackObjectSchema)) }),
])

export const AlbumObjectSchema = t.Intersect([
  AlbumBaseSchema,
  t.Object({
    artists: t.Optional(
      t.Array(SimplifiedArtistObjectSchema, {
        description:
          'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      }),
    ),
    tracks: t.Optional(PagingSimplifiedTrackObjectSchema),
    copyrights: t.Optional(
      t.Array(CopyrightObjectSchema, { description: 'The copyright statements of the album.\n' }),
    ),
    external_ids: t.Optional(ExternalIdObjectSchema),
    genres: t.Optional(
      t.Array(t.String(), {
        example: [],
        description: '**Deprecated** The array is always empty.\n',
        deprecated: true,
      }),
    ),
    label: t.Optional(
      t.String({ description: 'The label associated with the album.\n', deprecated: true }),
    ),
    popularity: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.\n',
        deprecated: true,
      }),
    ),
  }),
])

export const SavedAlbumObjectSchema = t.Object({
  added_at: t.Optional(
    t.Date({
      description:
        'The date and time the album was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  album: t.Optional(AlbumObjectSchema),
})

export const PagingSavedAlbumObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SavedAlbumObjectSchema)) }),
])

export const SavedTrackObjectSchema = t.Object({
  added_at: t.Optional(
    t.Date({
      description:
        'The date and time the track was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  track: t.Optional(TrackObjectSchema),
})

export const PagingSavedTrackObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SavedTrackObjectSchema)) }),
])

export const PagingTrackObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(TrackObjectSchema)) }),
])

export const PagingPlaylistTrackObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(PlaylistTrackObjectSchema)) }),
])

export const PagingSimplifiedShowObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SimplifiedShowObjectSchema)) }),
])

export const SavedShowObjectSchema = t.Object({
  added_at: t.Optional(
    t.Date({
      description:
        'The date and time the show was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  show: t.Optional(SimplifiedShowObjectSchema),
})

export const PagingSavedShowObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SavedShowObjectSchema)) }),
])

export const SimplifiedEpisodeObjectSchema = EpisodeBaseSchema

export const PagingSimplifiedEpisodeObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SimplifiedEpisodeObjectSchema)) }),
])

export const SavedEpisodeObjectSchema = t.Object({
  added_at: t.Optional(
    t.Date({
      description:
        'The date and time the episode was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\n',
    }),
  ),
  episode: t.Optional(EpisodeObjectSchema),
})

export const PagingSavedEpisodeObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SavedEpisodeObjectSchema)) }),
])

export const AuthorObjectSchema = t.Object({
  name: t.Optional(t.String({ description: 'The name of the author.\n' })),
})

export const NarratorObjectSchema = t.Object({
  name: t.Optional(t.String({ description: 'The name of the Narrator.\n' })),
})

export const AudiobookBaseSchema = t.Object({
  authors: t.Array(AuthorObjectSchema, { description: 'The author(s) for the audiobook.\n' }),
  available_markets: t.Array(t.String(), {
    description:
      'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    deprecated: true,
  }),
  copyrights: t.Array(CopyrightObjectSchema, {
    description: 'The copyright statements of the audiobook.\n',
  }),
  description: t.String({
    description:
      'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: t.String({
    description: 'A description of the audiobook. This field may contain HTML tags.\n',
  }),
  edition: t.Optional(
    t.String({ example: 'Unabridged', description: 'The edition of the audiobook.\n' }),
  ),
  explicit: t.Boolean({
    description:
      'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: t.String({
    description: 'A link to the Web API endpoint providing full details of the audiobook.\n',
  }),
  id: t.String({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  }),
  images: t.Array(ImageObjectSchema, {
    description: 'The cover art for the audiobook in various sizes, widest first.\n',
  }),
  languages: t.Array(t.String(), {
    description:
      'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  media_type: t.String({ description: 'The media type of the audiobook.\n' }),
  name: t.String({ description: 'The name of the audiobook.\n' }),
  narrators: t.Array(NarratorObjectSchema, { description: 'The narrator(s) for the audiobook.\n' }),
  publisher: t.String({ description: 'The publisher of the audiobook.\n', deprecated: true }),
  type: t.Literal('audiobook', { description: 'The object type.\n' }),
  uri: t.String({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  }),
  total_chapters: t.Integer({
    maximum: 9007199254740991,
    description: 'The number of chapters in this audiobook.\n',
  }),
})

export const SimplifiedAudiobookObjectSchema = AudiobookBaseSchema

export const PagingSimplifiedAudiobookObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SimplifiedAudiobookObjectSchema)) }),
])

export const PagingArtistObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(ArtistObjectSchema)) }),
])

export const ChapterBaseSchema = t.Object({
  audio_preview_url: t.Union([
    t.String({
      example: 'https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17',
      description:
        'A URL to a 30 second preview (MP3 format) of the chapter. `null` if not available.\n',
      deprecated: true,
    }),
    t.Null(),
  ]),
  available_markets: t.Optional(
    t.Array(t.String(), {
      description:
        'A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  ),
  chapter_number: t.Integer({
    maximum: 9007199254740991,
    example: 1,
    description: 'The number of the chapter\n',
  }),
  description: t.String({
    example:
      'We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.\n',
    description:
      'A description of the chapter. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: t.String({
    example:
      '<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>\n',
    description: 'A description of the chapter. This field may contain HTML tags.\n',
  }),
  duration_ms: t.Integer({
    maximum: 9007199254740991,
    example: 1686230,
    description: 'The chapter length in milliseconds.\n',
  }),
  explicit: t.Boolean({
    description:
      'Whether or not the chapter has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: t.String({
    example: 'https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ',
    description: 'A link to the Web API endpoint providing full details of the chapter.\n',
  }),
  id: t.String({
    example: '5Xt5DXGzch68nYYamXrNxZ',
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
  }),
  images: t.Array(ImageObjectSchema, {
    description: 'The cover art for the chapter in various sizes, widest first.\n',
  }),
  is_playable: t.Boolean({
    description: 'True if the chapter is playable in the given market. Otherwise false.\n',
  }),
  languages: t.Array(t.String(), {
    example: ['fr', 'en'],
    description:
      'A list of the languages used in the chapter, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  name: t.String({
    example: 'Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n',
    description: 'The name of the chapter.\n',
  }),
  release_date: t.String({
    example: '1981-12-15',
    description:
      'The date the chapter was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
  }),
  release_date_precision: t.UnionEnum(['year', 'month', 'day'], {
    example: 'day',
    description: 'The precision with which `release_date` value is known.\n',
    default: undefined,
  }),
  resume_point: t.Optional(ResumePointObjectSchema),
  type: t.Literal('episode', { description: 'The object type.\n' }),
  uri: t.String({
    example: 'spotify:episode:0zLhl3WsOCQHbe1BPTiHgr',
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
  }),
  restrictions: t.Optional(ChapterRestrictionObjectSchema),
})

export const SimplifiedChapterObjectSchema = ChapterBaseSchema

export const PagingSimplifiedChapterObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SimplifiedChapterObjectSchema)) }),
])

export const RecommendationSeedObjectSchema = t.Object({
  afterFilteringSize: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The number of tracks available after min\\_\\* and max\\_\\* filters have been applied.\n',
    }),
  ),
  afterRelinkingSize: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'The number of tracks available after relinking for regional availability.\n',
    }),
  ),
  href: t.Optional(
    t.String({
      description:
        'A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`.\n',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.\n',
    }),
  ),
  initialPoolSize: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'The number of recommended tracks available for this seed.\n',
    }),
  ),
  type: t.Optional(
    t.String({
      description: 'The entity type of this seed. One of `artist`, `track` or `genre`.\n',
    }),
  ),
})

export const RecommendationsObjectSchema = t.Object({
  seeds: t.Array(RecommendationSeedObjectSchema, {
    description: 'An array of recommendation seed objects.\n',
  }),
  tracks: t.Array(TrackObjectSchema, {
    description: 'An array of track objects ordered according to the parameters supplied.\n',
  }),
})

export const PlaylistObjectSchema = t.Object({
  collaborative: t.Optional(
    t.Boolean({ description: '`true` if the owner allows other users to modify the playlist.\n' }),
  ),
  description: t.Optional(
    t.Union([
      t.String({
        description:
          'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
      }),
      t.Null(),
    ]),
  ),
  external_urls: t.Optional(ExternalUrlObjectSchema),
  href: t.Optional(
    t.String({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
  ),
  id: t.Optional(
    t.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  images: t.Optional(
    t.Array(ImageObjectSchema, {
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
  ),
  name: t.Optional(t.String({ description: 'The name of the playlist.\n' })),
  owner: t.Optional(PlaylistOwnerObjectSchema),
  public: t.Optional(
    t.Boolean({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
  ),
  snapshot_id: t.Optional(
    t.String({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
  ),
  items: t.Optional(PagingPlaylistTrackObjectSchema),
  tracks: t.Optional(PagingPlaylistTrackObjectSchema),
  type: t.Optional(t.String({ description: 'The object type: "playlist"\n' })),
  uri: t.Optional(
    t.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  followers: t.Optional(FollowersObjectSchema),
})

export const CategoryObjectSchema = t.Object({
  href: t.String({
    description: 'A link to the Web API endpoint returning full details of the category.\n',
  }),
  icons: t.Array(ImageObjectSchema, { description: 'The category icon, in various sizes.\n' }),
  id: t.String({
    example: 'equal',
    description:
      'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\n',
  }),
  name: t.String({ example: 'EQUAL', description: 'The name of the category.\n' }),
})

export const ShowObjectSchema = t.Intersect([
  ShowBaseSchema,
  t.Object({ episodes: PagingSimplifiedEpisodeObjectSchema }),
])

export const AudiobookObjectSchema = t.Intersect([
  AudiobookBaseSchema,
  t.Object({ chapters: PagingSimplifiedChapterObjectSchema }),
])

export const ChapterObjectSchema = t.Intersect([
  ChapterBaseSchema,
  t.Object({ audiobook: SimplifiedAudiobookObjectSchema }),
])

export const CurrentlyPlayingObjectSchema = t.Object({
  context: t.Optional(ContextObjectSchema),
  timestamp: t.Optional(
    t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Unix Millisecond Timestamp when data was fetched',
    }),
  ),
  progress_ms: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
  ),
  is_playing: t.Optional(
    t.Boolean({ description: 'If something is currently playing, return `true`.' }),
  ),
  item: t.Optional(
    t.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  currently_playing_type: t.Optional(
    t.String({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
  ),
  actions: t.Optional(DisallowsObjectSchema),
})

export const SavedAudiobookObjectSchema = t.Object({
  added_at: t.Optional(
    t.Date({
      description:
        'The date and time the audiobook was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  audiobook: t.Optional(AudiobookObjectSchema),
})

export const PagingSavedAudiobookObjectSchema = t.Intersect([
  PagingObjectSchema,
  t.Object({ items: t.Optional(t.Array(SavedAudiobookObjectSchema)) }),
])
