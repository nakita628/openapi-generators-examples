import { Type, Codec, type Static } from 'typebox'

export const ExternalUrlObjectSchema = Type.Object({
  spotify: Type.Optional(
    Type.String({
      description:
        'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\n',
    }),
  ),
})

export type ExternalUrlObject = Static<typeof ExternalUrlObjectSchema>

export const LinkedTrackObjectSchema = Type.Object({
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  type: Type.Optional(Type.String({ description: 'The object type: "track".\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
})

export type LinkedTrackObject = Static<typeof LinkedTrackObjectSchema>

export const TrackRestrictionObjectSchema = Type.Object({
  reason: Type.Optional(
    Type.String({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export type TrackRestrictionObject = Static<typeof TrackRestrictionObjectSchema>

export const AlbumRestrictionObjectSchema = Type.Object({
  reason: Type.Optional(
    Type.Union([Type.Literal('market'), Type.Literal('product'), Type.Literal('explicit')], {
      description:
        "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n",
    }),
  ),
})

export type AlbumRestrictionObject = Static<typeof AlbumRestrictionObjectSchema>

export const EpisodeRestrictionObjectSchema = Type.Object({
  reason: Type.Optional(
    Type.String({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export type EpisodeRestrictionObject = Static<typeof EpisodeRestrictionObjectSchema>

export const ChapterRestrictionObjectSchema = Type.Object({
  reason: Type.Optional(
    Type.String({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n- `payment_required` - Payment is required to play the content item.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export type ChapterRestrictionObject = Static<typeof ChapterRestrictionObjectSchema>

export const FollowersObjectSchema = Type.Object({
  href: Type.Optional(
    Type.Union([
      Type.String({
        description:
          'This will always be set to null, as the Web API does not support it at the moment.\n',
      }),
      Type.Null(),
    ]),
  ),
  total: Type.Optional(Type.Integer({ description: 'The total number of followers.\n' })),
})

export type FollowersObject = Static<typeof FollowersObjectSchema>

export const ImageObjectSchema = Type.Object({
  url: Type.String({
    description: 'The source URL of the image.\n',
    examples: ['https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n'],
  }),
  height: Type.Union([
    Type.Integer({ description: 'The image height in pixels.\n', examples: [300] }),
    Type.Null(),
  ]),
  width: Type.Union([
    Type.Integer({ description: 'The image width in pixels.\n', examples: [300] }),
    Type.Null(),
  ]),
})

export type ImageObject = Static<typeof ImageObjectSchema>

export const ArtistObjectSchema = Type.Object({
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  followers: Type.Optional(FollowersObjectSchema),
  genres: Type.Optional(
    Type.Array(Type.String(), {
      description:
        'A list of the genres the artist is associated with. If not yet classified, the array is empty.\n',
      examples: [['Prog rock', 'Grunge']],
      deprecated: true,
    }),
  ),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
  images: Type.Optional(
    Type.Array(ImageObjectSchema, {
      description: 'Images of the artist in various sizes, widest first.\n',
    }),
  ),
  name: Type.Optional(Type.String({ description: 'The name of the artist.\n' })),
  popularity: Type.Optional(
    Type.Integer({
      description:
        "The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n",
      deprecated: true,
    }),
  ),
  type: Type.Optional(Type.Literal('artist', { description: 'The object type.\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
})

export type ArtistObject = Static<typeof ArtistObjectSchema>

export const SimplifiedArtistObjectSchema = Type.Object({
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
  name: Type.Optional(Type.String({ description: 'The name of the artist.\n' })),
  type: Type.Optional(Type.Literal('artist', { description: 'The object type.\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
})

export type SimplifiedArtistObject = Static<typeof SimplifiedArtistObjectSchema>

export const AlbumBaseSchema = Type.Object({
  album_type: Type.Union(
    [Type.Literal('album'), Type.Literal('single'), Type.Literal('compilation')],
    { description: 'The type of the album.\n', examples: ['compilation'] },
  ),
  total_tracks: Type.Integer({ description: 'The number of tracks in the album.', examples: [9] }),
  available_markets: Type.Array(Type.String(), {
    description:
      'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n',
    examples: [['CA', 'BR', 'IT']],
    deprecated: true,
  }),
  external_urls: ExternalUrlObjectSchema,
  href: Type.String({
    description: 'A link to the Web API endpoint providing full details of the album.\n',
  }),
  id: Type.String({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
    examples: ['2up3OPMp9Tb4dAKM2erWXQ'],
  }),
  images: Type.Array(ImageObjectSchema, {
    description: 'The cover art for the album in various sizes, widest first.\n',
  }),
  name: Type.String({
    description:
      'The name of the album. In case of an album takedown, the value may be an empty string.\n',
  }),
  release_date: Type.String({
    description: 'The date the album was first released.\n',
    examples: ['1981-12'],
  }),
  release_date_precision: Type.Union(
    [Type.Literal('year'), Type.Literal('month'), Type.Literal('day')],
    {
      description: 'The precision with which `release_date` value is known.\n',
      examples: ['year'],
    },
  ),
  restrictions: Type.Optional(AlbumRestrictionObjectSchema),
  type: Type.Literal('album', { description: 'The object type.\n' }),
  uri: Type.String({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
    examples: ['spotify:album:2up3OPMp9Tb4dAKM2erWXQ'],
  }),
})

export type AlbumBase = Static<typeof AlbumBaseSchema>

export const SimplifiedAlbumObjectSchema = Type.Intersect([
  AlbumBaseSchema,
  Type.Object({
    artists: Type.Array(SimplifiedArtistObjectSchema, {
      description:
        'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    }),
  }),
])

export type SimplifiedAlbumObject = Static<typeof SimplifiedAlbumObjectSchema>

export const ExternalIdObjectSchema = Type.Object({
  isrc: Type.Optional(
    Type.String({
      description:
        '[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n',
    }),
  ),
  ean: Type.Optional(
    Type.String({
      description:
        '[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n',
    }),
  ),
  upc: Type.Optional(
    Type.String({
      description:
        '[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n',
    }),
  ),
})

export type ExternalIdObject = Static<typeof ExternalIdObjectSchema>

export const TrackObjectSchema = Type.Object({
  album: Type.Optional(SimplifiedAlbumObjectSchema),
  artists: Type.Optional(
    Type.Array(SimplifiedArtistObjectSchema, {
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    }),
  ),
  available_markets: Type.Optional(
    Type.Array(Type.String(), {
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  ),
  disc_number: Type.Optional(
    Type.Integer({
      description:
        'The disc number (usually `1` unless the album consists of more than one disc).\n',
    }),
  ),
  duration_ms: Type.Optional(Type.Integer({ description: 'The track length in milliseconds.\n' })),
  explicit: Type.Optional(
    Type.Boolean({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n',
    }),
  ),
  external_ids: Type.Optional(ExternalIdObjectSchema),
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_playable: Type.Optional(
    Type.Boolean({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
  ),
  linked_from: Type.Optional(LinkedTrackObjectSchema),
  restrictions: Type.Optional(TrackRestrictionObjectSchema),
  name: Type.Optional(Type.String({ description: 'The name of the track.\n' })),
  popularity: Type.Optional(
    Type.Integer({
      description:
        'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n',
      deprecated: true,
    }),
  ),
  preview_url: Type.Optional(
    Type.Union([
      Type.String({
        description: 'A link to a 30 second preview (MP3 format) of the track. Can be `null`\n',
        deprecated: true,
      }),
      Type.Null(),
    ]),
  ),
  track_number: Type.Optional(
    Type.Integer({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
  ),
  type: Type.Optional(Type.Literal('track', { description: 'The object type: "track".\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_local: Type.Optional(
    Type.Boolean({ description: 'Whether or not the track is from a local file.\n' }),
  ),
})

export type TrackObject = Static<typeof TrackObjectSchema>

export const ContextObjectSchema = Type.Object({
  type: Type.Optional(
    Type.String({ description: 'The object type, e.g. "artist", "playlist", "album", "show".\n' }),
  ),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
  ),
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.\n',
    }),
  ),
})

export type ContextObject = Static<typeof ContextObjectSchema>

export const PlayHistoryObjectSchema = Type.Object({
  track: Type.Optional(TrackObjectSchema),
  played_at: Type.Optional(
    Type.String({ format: 'date-time', description: 'The date and time the track was played.' }),
  ),
  context: Type.Optional(ContextObjectSchema),
})

export type PlayHistoryObject = Static<typeof PlayHistoryObjectSchema>

export const PlaylistUserObjectSchema = Type.Object({
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  href: Type.Optional(
    Type.String({ description: 'A link to the Web API endpoint for this user.\n' }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
  type: Type.Optional(Type.Literal('user', { description: 'The object type.\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
})

export type PlaylistUserObject = Static<typeof PlaylistUserObjectSchema>

export const ResumePointObjectSchema = Type.Object({
  fully_played: Type.Optional(
    Type.Boolean({
      description: 'Whether or not the episode has been fully played by the user.\n',
    }),
  ),
  resume_position_ms: Type.Optional(
    Type.Integer({
      description: "The user's most recent position in the episode in milliseconds.\n",
    }),
  ),
})

export type ResumePointObject = Static<typeof ResumePointObjectSchema>

export const EpisodeBaseSchema = Type.Object({
  audio_preview_url: Type.Union([
    Type.String({
      description:
        'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
      examples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
      deprecated: true,
    }),
    Type.Null(),
  ]),
  description: Type.String({
    description:
      'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    examples: [
      'A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n',
    ],
  }),
  html_description: Type.String({
    description: 'A description of the episode. This field may contain HTML tags.\n',
    examples: [
      '<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n',
    ],
  }),
  duration_ms: Type.Integer({
    description: 'The episode length in milliseconds.\n',
    examples: [1686230],
  }),
  explicit: Type.Boolean({
    description:
      'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: Type.String({
    description: 'A link to the Web API endpoint providing full details of the episode.\n',
    examples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'],
  }),
  id: Type.String({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
    examples: ['5Xt5DXGzch68nYYamXrNxZ'],
  }),
  images: Type.Array(ImageObjectSchema, {
    description: 'The cover art for the episode in various sizes, widest first.\n',
  }),
  is_externally_hosted: Type.Boolean({
    description: "True if the episode is hosted outside of Spotify's CDN.\n",
  }),
  is_playable: Type.Boolean({
    description: 'True if the episode is playable in the given market. Otherwise false.\n',
  }),
  language: Type.Optional(
    Type.String({
      description:
        'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n',
      examples: ['en'],
      deprecated: true,
    }),
  ),
  languages: Type.Array(Type.String(), {
    description:
      'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    examples: [['fr', 'en']],
  }),
  name: Type.String({
    description: 'The name of the episode.\n',
    examples: ['Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n'],
  }),
  release_date: Type.String({
    description:
      'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
    examples: ['1981-12-15'],
  }),
  release_date_precision: Type.Union(
    [Type.Literal('year'), Type.Literal('month'), Type.Literal('day')],
    { description: 'The precision with which `release_date` value is known.\n', examples: ['day'] },
  ),
  resume_point: Type.Optional(ResumePointObjectSchema),
  type: Type.Literal('episode', { description: 'The object type.\n' }),
  uri: Type.String({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
    examples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'],
  }),
  restrictions: Type.Optional(EpisodeRestrictionObjectSchema),
})

export type EpisodeBase = Static<typeof EpisodeBaseSchema>

export const CopyrightObjectSchema = Type.Object({
  text: Type.Optional(Type.String({ description: 'The copyright text for this content.\n' })),
  type: Type.Optional(
    Type.String({
      description:
        'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n',
    }),
  ),
})

export type CopyrightObject = Static<typeof CopyrightObjectSchema>

export const ShowBaseSchema = Type.Object({
  available_markets: Type.Array(Type.String(), {
    description:
      'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    deprecated: true,
  }),
  copyrights: Type.Array(CopyrightObjectSchema, {
    description: 'The copyright statements of the show.\n',
  }),
  description: Type.String({
    description:
      'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: Type.String({
    description: 'A description of the show. This field may contain HTML tags.\n',
  }),
  explicit: Type.Boolean({
    description:
      'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: Type.String({
    description: 'A link to the Web API endpoint providing full details of the show.\n',
  }),
  id: Type.String({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  }),
  images: Type.Array(ImageObjectSchema, {
    description: 'The cover art for the show in various sizes, widest first.\n',
  }),
  is_externally_hosted: Type.Boolean({
    description:
      "True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n",
  }),
  languages: Type.Array(Type.String(), {
    description:
      'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  media_type: Type.String({ description: 'The media type of the show.\n' }),
  name: Type.String({ description: 'The name of the episode.\n' }),
  publisher: Type.String({ description: 'The publisher of the show.\n', deprecated: true }),
  type: Type.Literal('show', { description: 'The object type.\n' }),
  uri: Type.String({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  }),
  total_episodes: Type.Integer({ description: 'The total number of episodes in the show.\n' }),
})

export type ShowBase = Static<typeof ShowBaseSchema>

export const SimplifiedShowObjectSchema = ShowBaseSchema

export type SimplifiedShowObject = Static<typeof SimplifiedShowObjectSchema>

export const EpisodeObjectSchema = Type.Intersect([
  EpisodeBaseSchema,
  Type.Object({ show: SimplifiedShowObjectSchema }),
])

export type EpisodeObject = Static<typeof EpisodeObjectSchema>

export const PlaylistTrackObjectSchema = Type.Object({
  added_at: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._\n',
    }),
  ),
  added_by: Type.Optional(PlaylistUserObjectSchema),
  is_local: Type.Optional(
    Type.Boolean({
      description:
        'Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.\n',
    }),
  ),
  item: Type.Optional(
    Type.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'Information about the track or episode.',
    }),
  ),
  track: Type.Optional(
    Type.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: '**Deprecated:** Use `item` instead. Information about the track or episode.\n',
      deprecated: true,
    }),
  ),
})

export type PlaylistTrackObject = Static<typeof PlaylistTrackObjectSchema>

export const QueueObjectSchema = Type.Object({
  currently_playing: Type.Optional(
    Type.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  queue: Type.Optional(
    Type.Array(Type.Union([TrackObjectSchema, EpisodeObjectSchema]), {
      description: 'The tracks or episodes in the queue. Can be empty.',
    }),
  ),
})

export type QueueObject = Static<typeof QueueObjectSchema>

export const DeviceObjectSchema = Type.Object({
  id: Type.Optional(
    Type.Union([
      Type.String({
        description:
          'The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.',
      }),
      Type.Null(),
    ]),
  ),
  is_active: Type.Optional(
    Type.Boolean({ description: 'If this device is the currently active device.' }),
  ),
  is_private_session: Type.Optional(
    Type.Boolean({ description: 'If this device is currently in a private session.' }),
  ),
  is_restricted: Type.Optional(
    Type.Boolean({
      description:
        'Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.',
    }),
  ),
  name: Type.Optional(
    Type.String({
      description:
        'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\"Loudest speaker\\") and some devices have a generic name associated with the manufacturer or device model.',
      examples: ['Kitchen speaker'],
    }),
  ),
  type: Type.Optional(
    Type.String({
      description: 'Device type, such as "computer", "smartphone" or "speaker".',
      examples: ['computer'],
    }),
  ),
  volume_percent: Type.Optional(
    Type.Union([
      Type.Integer({
        minimum: 0,
        maximum: 100,
        description: 'The current volume in percent.',
        examples: [59],
      }),
      Type.Null(),
    ]),
  ),
  supports_volume: Type.Optional(
    Type.Boolean({ description: 'If this device can be used to set the volume.' }),
  ),
})

export type DeviceObject = Static<typeof DeviceObjectSchema>

export const DisallowsObjectSchema = Type.Object({
  interrupting_playback: Type.Optional(
    Type.Boolean({ description: 'Interrupting playback. Optional field.' }),
  ),
  pausing: Type.Optional(Type.Boolean({ description: 'Pausing. Optional field.' })),
  resuming: Type.Optional(Type.Boolean({ description: 'Resuming. Optional field.' })),
  seeking: Type.Optional(
    Type.Boolean({ description: 'Seeking playback location. Optional field.' }),
  ),
  skipping_next: Type.Optional(
    Type.Boolean({ description: 'Skipping to the next context. Optional field.' }),
  ),
  skipping_prev: Type.Optional(
    Type.Boolean({ description: 'Skipping to the previous context. Optional field.' }),
  ),
  toggling_repeat_context: Type.Optional(
    Type.Boolean({ description: 'Toggling repeat context flag. Optional field.' }),
  ),
  toggling_shuffle: Type.Optional(
    Type.Boolean({ description: 'Toggling shuffle flag. Optional field.' }),
  ),
  toggling_repeat_track: Type.Optional(
    Type.Boolean({ description: 'Toggling repeat track flag. Optional field.' }),
  ),
  transferring_playback: Type.Optional(
    Type.Boolean({ description: 'Transfering playback between devices. Optional field.' }),
  ),
})

export type DisallowsObject = Static<typeof DisallowsObjectSchema>

export const CurrentlyPlayingContextObjectSchema = Type.Object({
  device: Type.Optional(DeviceObjectSchema),
  repeat_state: Type.Optional(Type.String({ description: 'off, track, context' })),
  shuffle_state: Type.Optional(Type.Boolean({ description: 'If shuffle is on or off.' })),
  context: Type.Optional(ContextObjectSchema),
  timestamp: Type.Optional(
    Type.Integer({
      description:
        'Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.).',
    }),
  ),
  progress_ms: Type.Optional(
    Type.Integer({
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
  ),
  is_playing: Type.Optional(
    Type.Boolean({ description: 'If something is currently playing, return `true`.' }),
  ),
  item: Type.Optional(
    Type.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  currently_playing_type: Type.Optional(
    Type.String({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
  ),
  actions: Type.Optional(DisallowsObjectSchema),
})

export type CurrentlyPlayingContextObject = Static<typeof CurrentlyPlayingContextObjectSchema>

export const ErrorObjectSchema = Type.Object({
  status: Type.Integer({
    minimum: 400,
    maximum: 599,
    description:
      'The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).\n',
  }),
  message: Type.String({ description: 'A short description of the cause of the error.\n' }),
})

export type ErrorObject = Static<typeof ErrorObjectSchema>

export const ExplicitContentSettingsObjectSchema = Type.Object({
  filter_enabled: Type.Optional(
    Type.Boolean({
      description: 'When `true`, indicates that explicit content should not be played.\n',
    }),
  ),
  filter_locked: Type.Optional(
    Type.Boolean({
      description:
        "When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n",
    }),
  ),
})

export type ExplicitContentSettingsObject = Static<typeof ExplicitContentSettingsObjectSchema>

export const PrivateUserObjectSchema = Type.Object({
  account_id: Type.Optional(
    Type.String({
      description:
        "A public, immutable, pseudoanonymous identifier for the user's account. Use this field for account linking rather than the `id` field, as it is stable and will not change over the lifetime of the account.\n",
      examples: ['aB3dE5fG7h'],
    }),
  ),
  country: Type.Optional(
    Type.String({
      description:
        "The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      deprecated: true,
    }),
  ),
  display_name: Type.Optional(
    Type.String({
      description: "The name displayed on the user's profile. `null` if not available.\n",
    }),
  ),
  email: Type.Optional(
    Type.String({
      description:
        "The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      deprecated: true,
    }),
  ),
  explicit_content: Type.Optional(ExplicitContentSettingsObjectSchema),
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  followers: Type.Optional(FollowersObjectSchema),
  href: Type.Optional(
    Type.String({ description: 'A link to the Web API endpoint for this user.\n' }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. Do not use this field for account linking — use `account_id` instead, which is immutable.\n',
    }),
  ),
  images: Type.Optional(
    Type.Array(ImageObjectSchema, { description: "The user's profile image." }),
  ),
  product: Type.Optional(
    Type.String({
      description:
        'The user\'s Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n',
      deprecated: true,
    }),
  ),
  type: Type.Optional(Type.String({ description: 'The object type: "user"\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
    }),
  ),
})

export type PrivateUserObject = Static<typeof PrivateUserObjectSchema>

export const PublicUserObjectSchema = Type.Object({
  display_name: Type.Optional(
    Type.Union([
      Type.String({
        description: "The name displayed on the user's profile. `null` if not available.\n",
      }),
      Type.Null(),
    ]),
  ),
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  followers: Type.Optional(FollowersObjectSchema),
  href: Type.Optional(
    Type.String({ description: 'A link to the Web API endpoint for this user.\n' }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
  images: Type.Optional(
    Type.Array(ImageObjectSchema, { description: "The user's profile image.\n" }),
  ),
  type: Type.Optional(Type.Literal('user', { description: 'The object type.\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
})

export type PublicUserObject = Static<typeof PublicUserObjectSchema>

export const LoudnessSchema = Type.Number({
  description:
    'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n',
  examples: [-5.883],
})

export type Loudness = Static<typeof LoudnessSchema>

export const TempoSchema = Type.Number({
  description:
    'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n',
  examples: [118.211],
})

export type Tempo = Static<typeof TempoSchema>

export const TimeSignatureSchema = Type.Integer({
  minimum: 3,
  maximum: 7,
  description:
    'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
  examples: [4],
})

export type TimeSignature = Static<typeof TimeSignatureSchema>

export const KeySchema = Type.Integer({
  minimum: -1,
  maximum: 11,
  description:
    'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n',
  examples: [9],
})

export type Key = Static<typeof KeySchema>

export const ModeSchema = Type.Integer({
  description:
    'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n',
  examples: [0],
})

export type Mode = Static<typeof ModeSchema>

export const TimeIntervalObjectSchema = Type.Object({
  start: Type.Optional(
    Type.Number({
      description: 'The starting point (in seconds) of the time interval.',
      examples: [0.49567],
    }),
  ),
  duration: Type.Optional(
    Type.Number({
      description: 'The duration (in seconds) of the time interval.',
      examples: [2.18749],
    }),
  ),
  confidence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the interval.',
      examples: [0.925],
    }),
  ),
})

export type TimeIntervalObject = Static<typeof TimeIntervalObjectSchema>

export const SectionObjectSchema = Type.Object({
  start: Type.Optional(
    Type.Number({ description: 'The starting point (in seconds) of the section.', examples: [0] }),
  ),
  duration: Type.Optional(
    Type.Number({ description: 'The duration (in seconds) of the section.', examples: [6.97092] }),
  ),
  confidence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the section\'s "designation".',
      examples: [1],
    }),
  ),
  loudness: Type.Optional(
    Type.Number({
      description:
        'The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.',
      examples: [-14.938],
    }),
  ),
  tempo: Type.Optional(
    Type.Number({
      description:
        'The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
      examples: [113.178],
    }),
  ),
  tempo_confidence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description:
        "The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.",
      examples: [0.647],
    }),
  ),
  key: Type.Optional(
    Type.Integer({
      description:
        'The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.',
      examples: [9],
    }),
  ),
  key_confidence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.',
      examples: [0.297],
    }),
  ),
  mode: Type.Optional(
    Type.Union([Type.Literal(-1), Type.Literal(0), Type.Literal(1)], {
      description:
        'Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.',
    }),
  ),
  mode_confidence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
      examples: [0.471],
    }),
  ),
  time_signature: Type.Optional(TimeSignatureSchema),
  time_signature_confidence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.',
      examples: [1],
    }),
  ),
})

export type SectionObject = Static<typeof SectionObjectSchema>

export const SegmentObjectSchema = Type.Object({
  start: Type.Optional(
    Type.Number({
      description: 'The starting point (in seconds) of the segment.',
      examples: [0.70154],
    }),
  ),
  duration: Type.Optional(
    Type.Number({ description: 'The duration (in seconds) of the segment.', examples: [0.19891] }),
  ),
  confidence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.\n',
      examples: [0.435],
    }),
  ),
  loudness_start: Type.Optional(
    Type.Number({
      description:
        'The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      examples: [-23.053],
    }),
  ),
  loudness_max: Type.Optional(
    Type.Number({
      description:
        'The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      examples: [-14.25],
    }),
  ),
  loudness_max_time: Type.Optional(
    Type.Number({
      description:
        'The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.',
      examples: [0.07305],
    }),
  ),
  loudness_end: Type.Optional(
    Type.Number({
      description:
        'The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.',
      examples: [0],
    }),
  ),
  pitches: Type.Optional(
    Type.Array(Type.Number({ minimum: 0, maximum: 1 }), {
      description:
        'Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).\n\nVectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.\nAs can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.\n![pitch vector](/assets/audio/Pitch_vector.png)\n',
      examples: [[0.212, 0.141, 0.294]],
    }),
  ),
  timbre: Type.Optional(
    Type.Array(Type.Number(), {
      description:
        'Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n\nFor completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).\n![timbre basis functions](/assets/audio/Timbre_basis_functions.png)\n\nThe actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.\n',
      examples: [[42.115, 64.373, -0.233]],
    }),
  ),
})

export type SegmentObject = Static<typeof SegmentObjectSchema>

export const AudioAnalysisObjectSchema = Type.Object({
  meta: Type.Optional(
    Type.Object({
      analyzer_version: Type.Optional(
        Type.String({
          description: 'The version of the Analyzer used to analyze this track.',
          examples: ['4.0.0'],
        }),
      ),
      platform: Type.Optional(
        Type.String({
          description: "The platform used to read the track's audio data.",
          examples: ['Linux'],
        }),
      ),
      detailed_status: Type.Optional(
        Type.String({
          description:
            'A detailed status code for this track. If analysis data is missing, this code may explain why.',
          examples: ['OK'],
        }),
      ),
      status_code: Type.Optional(
        Type.Integer({
          description:
            'The return code of the analyzer process. 0 if successful, 1 if any errors occurred.',
          examples: [0],
        }),
      ),
      timestamp: Type.Optional(
        Type.Integer({
          description: 'The Unix timestamp (in seconds) at which this track was analyzed.',
          examples: [1495193577],
        }),
      ),
      analysis_time: Type.Optional(
        Type.Number({
          description: 'The amount of time taken to analyze this track.',
          examples: [6.93906],
        }),
      ),
      input_process: Type.Optional(
        Type.String({
          description: "The method used to read the track's audio data.",
          examples: ['libvorbisfile L+R 44100->22050'],
        }),
      ),
    }),
  ),
  track: Type.Optional(
    Type.Object({
      num_samples: Type.Optional(
        Type.Integer({
          description:
            'The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.',
          examples: [4585515],
        }),
      ),
      duration: Type.Optional(
        Type.Number({ description: 'Length of the track in seconds.', examples: [207.95985] }),
      ),
      sample_md5: Type.Optional(
        Type.String({ description: 'This field will always contain the empty string.' }),
      ),
      offset_seconds: Type.Optional(
        Type.Integer({
          description:
            'An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)',
          examples: [0],
        }),
      ),
      window_seconds: Type.Optional(
        Type.Integer({
          description:
            'The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)',
          examples: [0],
        }),
      ),
      analysis_sample_rate: Type.Optional(
        Type.Integer({
          description:
            'The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.',
          examples: [22050],
        }),
      ),
      analysis_channels: Type.Optional(
        Type.Integer({
          description:
            'The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.',
          examples: [1],
        }),
      ),
      end_of_fade_in: Type.Optional(
        Type.Number({
          description:
            "The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.",
          examples: [0],
        }),
      ),
      start_of_fade_out: Type.Optional(
        Type.Number({
          description:
            "The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.",
          examples: [201.13705],
        }),
      ),
      loudness: Type.Optional(LoudnessSchema),
      tempo: Type.Optional(TempoSchema),
      tempo_confidence: Type.Optional(
        Type.Number({
          minimum: 0,
          maximum: 1,
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.',
          examples: [0.73],
        }),
      ),
      time_signature: Type.Optional(TimeSignatureSchema),
      time_signature_confidence: Type.Optional(
        Type.Number({
          minimum: 0,
          maximum: 1,
          description:
            'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.',
          examples: [0.994],
        }),
      ),
      key: Type.Optional(KeySchema),
      key_confidence: Type.Optional(
        Type.Number({
          minimum: 0,
          maximum: 1,
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `key`.',
          examples: [0.408],
        }),
      ),
      mode: Type.Optional(ModeSchema),
      mode_confidence: Type.Optional(
        Type.Number({
          minimum: 0,
          maximum: 1,
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
          examples: [0.485],
        }),
      ),
      codestring: Type.Optional(
        Type.String({
          description:
            'An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.',
        }),
      ),
      code_version: Type.Optional(
        Type.Number({
          description:
            'A version number for the Echo Nest Musical Fingerprint format used in the codestring field.',
          examples: [3.15],
        }),
      ),
      echoprintstring: Type.Optional(
        Type.String({
          description:
            'An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.',
        }),
      ),
      echoprint_version: Type.Optional(
        Type.Number({
          description:
            'A version number for the EchoPrint format used in the echoprintstring field.',
          examples: [4.15],
        }),
      ),
      synchstring: Type.Optional(
        Type.String({
          description: 'A [Synchstring](https://github.com/echonest/synchdata) for this track.',
        }),
      ),
      synch_version: Type.Optional(
        Type.Number({
          description: 'A version number for the Synchstring used in the synchstring field.',
          examples: [1],
        }),
      ),
      rhythmstring: Type.Optional(
        Type.String({
          description:
            'A Rhythmstring for this track. The format of this string is similar to the Synchstring.',
        }),
      ),
      rhythm_version: Type.Optional(
        Type.Number({
          description: 'A version number for the Rhythmstring used in the rhythmstring field.',
          examples: [1],
        }),
      ),
    }),
  ),
  bars: Type.Optional(
    Type.Array(TimeIntervalObjectSchema, {
      description:
        'The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.',
    }),
  ),
  beats: Type.Optional(
    Type.Array(TimeIntervalObjectSchema, {
      description:
        'The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.',
    }),
  ),
  sections: Type.Optional(
    Type.Array(SectionObjectSchema, {
      description:
        'Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.',
    }),
  ),
  segments: Type.Optional(
    Type.Array(SegmentObjectSchema, {
      description: 'Each segment contains a roughly conisistent sound throughout its duration.',
    }),
  ),
  tatums: Type.Optional(
    Type.Array(TimeIntervalObjectSchema, {
      description:
        'A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).',
    }),
  ),
})

export type AudioAnalysisObject = Static<typeof AudioAnalysisObjectSchema>

export const AudioFeaturesObjectSchema = Type.Object({
  acousticness: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description:
        'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
      examples: [0.00242],
    }),
  ),
  analysis_url: Type.Optional(
    Type.String({
      description:
        'A URL to access the full audio analysis of this track. An access token is required to access this data.\n',
      examples: ['https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n'],
    }),
  ),
  danceability: Type.Optional(
    Type.Number({
      description:
        'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
      examples: [0.585],
    }),
  ),
  duration_ms: Type.Optional(
    Type.Integer({
      description: 'The duration of the track in milliseconds.\n',
      examples: [237040],
    }),
  ),
  energy: Type.Optional(
    Type.Number({
      description:
        'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
      examples: [0.842],
    }),
  ),
  id: Type.Optional(
    Type.String({
      description: 'The Spotify ID for the track.\n',
      examples: ['2takcwOaAZWiXQijPHIx7B'],
    }),
  ),
  instrumentalness: Type.Optional(
    Type.Number({
      description:
        'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
      examples: [0.00686],
    }),
  ),
  key: Type.Optional(KeySchema),
  liveness: Type.Optional(
    Type.Number({
      description:
        'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
      examples: [0.0866],
    }),
  ),
  loudness: Type.Optional(LoudnessSchema),
  mode: Type.Optional(ModeSchema),
  speechiness: Type.Optional(
    Type.Number({
      description:
        'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
      examples: [0.0556],
    }),
  ),
  tempo: Type.Optional(TempoSchema),
  time_signature: Type.Optional(TimeSignatureSchema),
  track_href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
      examples: ['https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n'],
    }),
  ),
  type: Type.Optional(Type.Literal('audio_features', { description: 'The object type.\n' })),
  uri: Type.Optional(
    Type.String({
      description: 'The Spotify URI for the track.\n',
      examples: ['spotify:track:2takcwOaAZWiXQijPHIx7B'],
    }),
  ),
  valence: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 1,
      description:
        'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
      examples: [0.428],
    }),
  ),
})

export type AudioFeaturesObject = Static<typeof AudioFeaturesObjectSchema>

export const SimplifiedTrackObjectSchema = Type.Object({
  artists: Type.Optional(
    Type.Array(SimplifiedArtistObjectSchema, {
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',
    }),
  ),
  available_markets: Type.Optional(
    Type.Array(Type.String(), {
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  ),
  disc_number: Type.Optional(
    Type.Integer({
      description: 'The disc number (usually `1` unless the album consists of more than one disc).',
    }),
  ),
  duration_ms: Type.Optional(Type.Integer({ description: 'The track length in milliseconds.' })),
  explicit: Type.Optional(
    Type.Boolean({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).',
    }),
  ),
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_playable: Type.Optional(
    Type.Boolean({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
  ),
  linked_from: Type.Optional(LinkedTrackObjectSchema),
  restrictions: Type.Optional(TrackRestrictionObjectSchema),
  name: Type.Optional(Type.String({ description: 'The name of the track.' })),
  preview_url: Type.Optional(
    Type.Union([
      Type.String({
        description: 'A URL to a 30 second preview (MP3 format) of the track.\n',
        deprecated: true,
      }),
      Type.Null(),
    ]),
  ),
  track_number: Type.Optional(
    Type.Integer({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
  ),
  type: Type.Optional(Type.String({ description: 'The object type: "track".\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_local: Type.Optional(
    Type.Boolean({ description: 'Whether or not the track is from a local file.\n' }),
  ),
})

export type SimplifiedTrackObject = Static<typeof SimplifiedTrackObjectSchema>

export const CursorObjectSchema = Type.Object({
  after: Type.Optional(
    Type.String({ description: 'The cursor to use as key to find the next page of items.' }),
  ),
  before: Type.Optional(
    Type.String({ description: 'The cursor to use as key to find the previous page of items.' }),
  ),
})

export type CursorObject = Static<typeof CursorObjectSchema>

export const CursorPagingObjectSchema = Type.Object({
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint returning the full result of the request.',
    }),
  ),
  limit: Type.Optional(
    Type.Integer({
      description:
        'The maximum number of items in the response (as set in the query or by default).',
    }),
  ),
  next: Type.Optional(
    Type.String({ description: 'URL to the next page of items. ( `null` if none)' }),
  ),
  cursors: Type.Optional(CursorObjectSchema),
  total: Type.Optional(
    Type.Integer({ description: 'The total number of items available to return.' }),
  ),
})

export type CursorPagingObject = Static<typeof CursorPagingObjectSchema>

export const CursorPagingPlayHistoryObjectSchema = Type.Intersect([
  CursorPagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(PlayHistoryObjectSchema)) }),
])

export type CursorPagingPlayHistoryObject = Static<typeof CursorPagingPlayHistoryObjectSchema>

export const CursorPagingSimplifiedArtistObjectSchema = Type.Intersect([
  CursorPagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(ArtistObjectSchema)) }),
])

export type CursorPagingSimplifiedArtistObject = Static<
  typeof CursorPagingSimplifiedArtistObjectSchema
>

export const PagingObjectSchema = Type.Object({
  href: Type.String({
    description: 'A link to the Web API endpoint returning the full result of the request\n',
    examples: ['https://api.spotify.com/v1/me/shows?offset=0&limit=20\n'],
  }),
  limit: Type.Integer({
    description:
      'The maximum number of items in the response (as set in the query or by default).\n',
    examples: [20],
  }),
  next: Type.Union([
    Type.String({
      description: 'URL to the next page of items. ( `null` if none)\n',
      examples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'],
    }),
    Type.Null(),
  ]),
  offset: Type.Integer({
    description: 'The offset of the items returned (as set in the query or by default)\n',
    examples: [0],
  }),
  previous: Type.Union([
    Type.String({
      description: 'URL to the previous page of items. ( `null` if none)\n',
      examples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'],
    }),
    Type.Null(),
  ]),
  total: Type.Integer({
    description: 'The total number of items available to return.\n',
    examples: [4],
  }),
})

export type PagingObject = Static<typeof PagingObjectSchema>

export const PlaylistOwnerObjectSchema = Type.Intersect([
  PlaylistUserObjectSchema,
  Type.Object({
    display_name: Type.Optional(
      Type.Union([
        Type.String({
          description: "The name displayed on the user's profile. `null` if not available.\n",
        }),
        Type.Null(),
      ]),
    ),
  }),
])

export type PlaylistOwnerObject = Static<typeof PlaylistOwnerObjectSchema>

export const PlaylistTracksRefObjectSchema = Type.Object({
  href: Type.Optional(
    Type.String({
      description:
        "A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n",
    }),
  ),
  total: Type.Optional(Type.Integer({ description: 'Number of tracks in the playlist.\n' })),
})

export type PlaylistTracksRefObject = Static<typeof PlaylistTracksRefObjectSchema>

export const SimplifiedPlaylistObjectSchema = Type.Object({
  collaborative: Type.Optional(
    Type.Boolean({
      description: '`true` if the owner allows other users to modify the playlist.\n',
    }),
  ),
  description: Type.Optional(
    Type.String({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    }),
  ),
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  images: Type.Optional(
    Type.Array(ImageObjectSchema, {
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
  ),
  name: Type.Optional(Type.String({ description: 'The name of the playlist.\n' })),
  owner: Type.Optional(PlaylistOwnerObjectSchema),
  public: Type.Optional(
    Type.Boolean({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
  ),
  snapshot_id: Type.Optional(
    Type.String({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
  ),
  items: Type.Optional(PlaylistTracksRefObjectSchema),
  tracks: Type.Optional(PlaylistTracksRefObjectSchema),
  type: Type.Optional(Type.String({ description: 'The object type: "playlist"\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
})

export type SimplifiedPlaylistObject = Static<typeof SimplifiedPlaylistObjectSchema>

export const PagingPlaylistObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SimplifiedPlaylistObjectSchema)) }),
])

export type PagingPlaylistObject = Static<typeof PagingPlaylistObjectSchema>

export const PagingFeaturedPlaylistObjectSchema = Type.Object({
  message: Type.Optional(
    Type.String({
      description: 'The localized message of a playlist.\n',
      examples: ['Popular Playlists'],
    }),
  ),
  playlists: Type.Optional(PagingPlaylistObjectSchema),
})

export type PagingFeaturedPlaylistObject = Static<typeof PagingFeaturedPlaylistObjectSchema>

export const ArtistDiscographyAlbumObjectSchema = Type.Intersect([
  SimplifiedAlbumObjectSchema,
  Type.Object({
    album_group: Type.Union(
      [
        Type.Literal('album'),
        Type.Literal('single'),
        Type.Literal('compilation'),
        Type.Literal('appears_on'),
      ],
      {
        description: 'This field describes the relationship between the artist and the album.\n',
        examples: ['compilation'],
        deprecated: true,
      },
    ),
  }),
])

export type ArtistDiscographyAlbumObject = Static<typeof ArtistDiscographyAlbumObjectSchema>

export const PagingArtistDiscographyAlbumObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(ArtistDiscographyAlbumObjectSchema)) }),
])

export type PagingArtistDiscographyAlbumObject = Static<
  typeof PagingArtistDiscographyAlbumObjectSchema
>

export const PagingSimplifiedAlbumObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SimplifiedAlbumObjectSchema)) }),
])

export type PagingSimplifiedAlbumObject = Static<typeof PagingSimplifiedAlbumObjectSchema>

export const PagingSimplifiedTrackObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SimplifiedTrackObjectSchema)) }),
])

export type PagingSimplifiedTrackObject = Static<typeof PagingSimplifiedTrackObjectSchema>

export const AlbumObjectSchema = Type.Intersect([
  AlbumBaseSchema,
  Type.Object({
    artists: Type.Optional(
      Type.Array(SimplifiedArtistObjectSchema, {
        description:
          'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      }),
    ),
    tracks: Type.Optional(PagingSimplifiedTrackObjectSchema),
    copyrights: Type.Optional(
      Type.Array(CopyrightObjectSchema, {
        description: 'The copyright statements of the album.\n',
      }),
    ),
    external_ids: Type.Optional(ExternalIdObjectSchema),
    genres: Type.Optional(
      Type.Array(Type.String(), {
        description: '**Deprecated** The array is always empty.\n',
        examples: [[]],
        deprecated: true,
      }),
    ),
    label: Type.Optional(
      Type.String({ description: 'The label associated with the album.\n', deprecated: true }),
    ),
    popularity: Type.Optional(
      Type.Integer({
        description:
          'The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.\n',
        deprecated: true,
      }),
    ),
  }),
])

export type AlbumObject = Static<typeof AlbumObjectSchema>

export const SavedAlbumObjectSchema = Type.Object({
  added_at: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'The date and time the album was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  album: Type.Optional(AlbumObjectSchema),
})

export type SavedAlbumObject = Static<typeof SavedAlbumObjectSchema>

export const PagingSavedAlbumObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SavedAlbumObjectSchema)) }),
])

export type PagingSavedAlbumObject = Static<typeof PagingSavedAlbumObjectSchema>

export const SavedTrackObjectSchema = Type.Object({
  added_at: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'The date and time the track was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  track: Type.Optional(TrackObjectSchema),
})

export type SavedTrackObject = Static<typeof SavedTrackObjectSchema>

export const PagingSavedTrackObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SavedTrackObjectSchema)) }),
])

export type PagingSavedTrackObject = Static<typeof PagingSavedTrackObjectSchema>

export const PagingTrackObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(TrackObjectSchema)) }),
])

export type PagingTrackObject = Static<typeof PagingTrackObjectSchema>

export const PagingPlaylistTrackObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(PlaylistTrackObjectSchema)) }),
])

export type PagingPlaylistTrackObject = Static<typeof PagingPlaylistTrackObjectSchema>

export const PagingSimplifiedShowObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SimplifiedShowObjectSchema)) }),
])

export type PagingSimplifiedShowObject = Static<typeof PagingSimplifiedShowObjectSchema>

export const SavedShowObjectSchema = Type.Object({
  added_at: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'The date and time the show was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  show: Type.Optional(SimplifiedShowObjectSchema),
})

export type SavedShowObject = Static<typeof SavedShowObjectSchema>

export const PagingSavedShowObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SavedShowObjectSchema)) }),
])

export type PagingSavedShowObject = Static<typeof PagingSavedShowObjectSchema>

export const SimplifiedEpisodeObjectSchema = EpisodeBaseSchema

export type SimplifiedEpisodeObject = Static<typeof SimplifiedEpisodeObjectSchema>

export const PagingSimplifiedEpisodeObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SimplifiedEpisodeObjectSchema)) }),
])

export type PagingSimplifiedEpisodeObject = Static<typeof PagingSimplifiedEpisodeObjectSchema>

export const SavedEpisodeObjectSchema = Type.Object({
  added_at: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'The date and time the episode was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\n',
    }),
  ),
  episode: Type.Optional(EpisodeObjectSchema),
})

export type SavedEpisodeObject = Static<typeof SavedEpisodeObjectSchema>

export const PagingSavedEpisodeObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SavedEpisodeObjectSchema)) }),
])

export type PagingSavedEpisodeObject = Static<typeof PagingSavedEpisodeObjectSchema>

export const AuthorObjectSchema = Type.Object({
  name: Type.Optional(Type.String({ description: 'The name of the author.\n' })),
})

export type AuthorObject = Static<typeof AuthorObjectSchema>

export const NarratorObjectSchema = Type.Object({
  name: Type.Optional(Type.String({ description: 'The name of the Narrator.\n' })),
})

export type NarratorObject = Static<typeof NarratorObjectSchema>

export const AudiobookBaseSchema = Type.Object({
  authors: Type.Array(AuthorObjectSchema, { description: 'The author(s) for the audiobook.\n' }),
  available_markets: Type.Array(Type.String(), {
    description:
      'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    deprecated: true,
  }),
  copyrights: Type.Array(CopyrightObjectSchema, {
    description: 'The copyright statements of the audiobook.\n',
  }),
  description: Type.String({
    description:
      'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: Type.String({
    description: 'A description of the audiobook. This field may contain HTML tags.\n',
  }),
  edition: Type.Optional(
    Type.String({ description: 'The edition of the audiobook.\n', examples: ['Unabridged'] }),
  ),
  explicit: Type.Boolean({
    description:
      'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: Type.String({
    description: 'A link to the Web API endpoint providing full details of the audiobook.\n',
  }),
  id: Type.String({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  }),
  images: Type.Array(ImageObjectSchema, {
    description: 'The cover art for the audiobook in various sizes, widest first.\n',
  }),
  languages: Type.Array(Type.String(), {
    description:
      'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  media_type: Type.String({ description: 'The media type of the audiobook.\n' }),
  name: Type.String({ description: 'The name of the audiobook.\n' }),
  narrators: Type.Array(NarratorObjectSchema, {
    description: 'The narrator(s) for the audiobook.\n',
  }),
  publisher: Type.String({ description: 'The publisher of the audiobook.\n', deprecated: true }),
  type: Type.Literal('audiobook', { description: 'The object type.\n' }),
  uri: Type.String({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  }),
  total_chapters: Type.Integer({ description: 'The number of chapters in this audiobook.\n' }),
})

export type AudiobookBase = Static<typeof AudiobookBaseSchema>

export const SimplifiedAudiobookObjectSchema = AudiobookBaseSchema

export type SimplifiedAudiobookObject = Static<typeof SimplifiedAudiobookObjectSchema>

export const PagingSimplifiedAudiobookObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SimplifiedAudiobookObjectSchema)) }),
])

export type PagingSimplifiedAudiobookObject = Static<typeof PagingSimplifiedAudiobookObjectSchema>

export const PagingArtistObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(ArtistObjectSchema)) }),
])

export type PagingArtistObject = Static<typeof PagingArtistObjectSchema>

export const ChapterBaseSchema = Type.Object({
  audio_preview_url: Type.Union([
    Type.String({
      description:
        'A URL to a 30 second preview (MP3 format) of the chapter. `null` if not available.\n',
      examples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
      deprecated: true,
    }),
    Type.Null(),
  ]),
  available_markets: Type.Optional(
    Type.Array(Type.String(), {
      description:
        'A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  ),
  chapter_number: Type.Integer({ description: 'The number of the chapter\n', examples: [1] }),
  description: Type.String({
    description:
      'A description of the chapter. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    examples: [
      'We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.\n',
    ],
  }),
  html_description: Type.String({
    description: 'A description of the chapter. This field may contain HTML tags.\n',
    examples: [
      '<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>\n',
    ],
  }),
  duration_ms: Type.Integer({
    description: 'The chapter length in milliseconds.\n',
    examples: [1686230],
  }),
  explicit: Type.Boolean({
    description:
      'Whether or not the chapter has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema,
  href: Type.String({
    description: 'A link to the Web API endpoint providing full details of the chapter.\n',
    examples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'],
  }),
  id: Type.String({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
    examples: ['5Xt5DXGzch68nYYamXrNxZ'],
  }),
  images: Type.Array(ImageObjectSchema, {
    description: 'The cover art for the chapter in various sizes, widest first.\n',
  }),
  is_playable: Type.Boolean({
    description: 'True if the chapter is playable in the given market. Otherwise false.\n',
  }),
  languages: Type.Array(Type.String(), {
    description:
      'A list of the languages used in the chapter, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    examples: [['fr', 'en']],
  }),
  name: Type.String({
    description: 'The name of the chapter.\n',
    examples: ['Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n'],
  }),
  release_date: Type.String({
    description:
      'The date the chapter was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
    examples: ['1981-12-15'],
  }),
  release_date_precision: Type.Union(
    [Type.Literal('year'), Type.Literal('month'), Type.Literal('day')],
    { description: 'The precision with which `release_date` value is known.\n', examples: ['day'] },
  ),
  resume_point: Type.Optional(ResumePointObjectSchema),
  type: Type.Literal('episode', { description: 'The object type.\n' }),
  uri: Type.String({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
    examples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'],
  }),
  restrictions: Type.Optional(ChapterRestrictionObjectSchema),
})

export type ChapterBase = Static<typeof ChapterBaseSchema>

export const SimplifiedChapterObjectSchema = ChapterBaseSchema

export type SimplifiedChapterObject = Static<typeof SimplifiedChapterObjectSchema>

export const PagingSimplifiedChapterObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SimplifiedChapterObjectSchema)) }),
])

export type PagingSimplifiedChapterObject = Static<typeof PagingSimplifiedChapterObjectSchema>

export const RecommendationSeedObjectSchema = Type.Object({
  afterFilteringSize: Type.Optional(
    Type.Integer({
      description:
        'The number of tracks available after min\\_\\* and max\\_\\* filters have been applied.\n',
    }),
  ),
  afterRelinkingSize: Type.Optional(
    Type.Integer({
      description: 'The number of tracks available after relinking for regional availability.\n',
    }),
  ),
  href: Type.Optional(
    Type.String({
      description:
        'A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`.\n',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.\n',
    }),
  ),
  initialPoolSize: Type.Optional(
    Type.Integer({ description: 'The number of recommended tracks available for this seed.\n' }),
  ),
  type: Type.Optional(
    Type.String({
      description: 'The entity type of this seed. One of `artist`, `track` or `genre`.\n',
    }),
  ),
})

export type RecommendationSeedObject = Static<typeof RecommendationSeedObjectSchema>

export const RecommendationsObjectSchema = Type.Object({
  seeds: Type.Array(RecommendationSeedObjectSchema, {
    description: 'An array of recommendation seed objects.\n',
  }),
  tracks: Type.Array(TrackObjectSchema, {
    description: 'An array of track objects ordered according to the parameters supplied.\n',
  }),
})

export type RecommendationsObject = Static<typeof RecommendationsObjectSchema>

export const PlaylistObjectSchema = Type.Object({
  collaborative: Type.Optional(
    Type.Boolean({
      description: '`true` if the owner allows other users to modify the playlist.\n',
    }),
  ),
  description: Type.Optional(
    Type.Union([
      Type.String({
        description:
          'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
      }),
      Type.Null(),
    ]),
  ),
  external_urls: Type.Optional(ExternalUrlObjectSchema),
  href: Type.Optional(
    Type.String({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
  ),
  id: Type.Optional(
    Type.String({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  images: Type.Optional(
    Type.Array(ImageObjectSchema, {
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
  ),
  name: Type.Optional(Type.String({ description: 'The name of the playlist.\n' })),
  owner: Type.Optional(PlaylistOwnerObjectSchema),
  public: Type.Optional(
    Type.Boolean({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
  ),
  snapshot_id: Type.Optional(
    Type.String({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
  ),
  items: Type.Optional(PagingPlaylistTrackObjectSchema),
  tracks: Type.Optional(PagingPlaylistTrackObjectSchema),
  type: Type.Optional(Type.String({ description: 'The object type: "playlist"\n' })),
  uri: Type.Optional(
    Type.String({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  followers: Type.Optional(FollowersObjectSchema),
})

export type PlaylistObject = Static<typeof PlaylistObjectSchema>

export const CategoryObjectSchema = Type.Object({
  href: Type.String({
    description: 'A link to the Web API endpoint returning full details of the category.\n',
  }),
  icons: Type.Array(ImageObjectSchema, { description: 'The category icon, in various sizes.\n' }),
  id: Type.String({
    description:
      'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\n',
    examples: ['equal'],
  }),
  name: Type.String({ description: 'The name of the category.\n', examples: ['EQUAL'] }),
})

export type CategoryObject = Static<typeof CategoryObjectSchema>

export const ShowObjectSchema = Type.Intersect([
  ShowBaseSchema,
  Type.Object({ episodes: PagingSimplifiedEpisodeObjectSchema }),
])

export type ShowObject = Static<typeof ShowObjectSchema>

export const AudiobookObjectSchema = Type.Intersect([
  AudiobookBaseSchema,
  Type.Object({ chapters: PagingSimplifiedChapterObjectSchema }),
])

export type AudiobookObject = Static<typeof AudiobookObjectSchema>

export const ChapterObjectSchema = Type.Intersect([
  ChapterBaseSchema,
  Type.Object({ audiobook: SimplifiedAudiobookObjectSchema }),
])

export type ChapterObject = Static<typeof ChapterObjectSchema>

export const CurrentlyPlayingObjectSchema = Type.Object({
  context: Type.Optional(ContextObjectSchema),
  timestamp: Type.Optional(
    Type.Integer({ description: 'Unix Millisecond Timestamp when data was fetched' }),
  ),
  progress_ms: Type.Optional(
    Type.Integer({
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
  ),
  is_playing: Type.Optional(
    Type.Boolean({ description: 'If something is currently playing, return `true`.' }),
  ),
  item: Type.Optional(
    Type.Union([TrackObjectSchema, EpisodeObjectSchema], {
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  currently_playing_type: Type.Optional(
    Type.String({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
  ),
  actions: Type.Optional(DisallowsObjectSchema),
})

export type CurrentlyPlayingObject = Static<typeof CurrentlyPlayingObjectSchema>

export const SavedAudiobookObjectSchema = Type.Object({
  added_at: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'The date and time the audiobook was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  audiobook: Type.Optional(AudiobookObjectSchema),
})

export type SavedAudiobookObject = Static<typeof SavedAudiobookObjectSchema>

export const PagingSavedAudiobookObjectSchema = Type.Intersect([
  PagingObjectSchema,
  Type.Object({ items: Type.Optional(Type.Array(SavedAudiobookObjectSchema)) }),
])

export type PagingSavedAudiobookObject = Static<typeof PagingSavedAudiobookObjectSchema>

export const PathAlbumIdParamsSchema = Type.String({
  description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
  examples: ['4aawyAB9vmqN3uQ7FjRGTy'],
})
export const PathPlaylistIdParamsSchema = Type.String({
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
  examples: ['3cEYpjA9oz9GiPac4AsH4n'],
})
export const QueryMarketParamsSchema = Type.String({
  description:
    'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
  examples: ['ES'],
})
export const QueryLimitParamsSchema = Type.Optional(
  Codec(Type.String({ default: '20' }))
    .Decode((value) => Number.parseInt(value, 10))
    .Encode((value) => String(value)),
)
export const QueryOffsetParamsSchema = Type.Optional(
  Codec(Type.String({ default: '0' }))
    .Decode((value) => Number.parseInt(value, 10))
    .Encode((value) => String(value)),
)
export const QueryAdditionalTypesParamsSchema = Type.String({
  description:
    'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
})
export const QueryAlbumIdsParamsSchema = Type.String({
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
  examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
})
export const PathArtistIdParamsSchema = Type.String({
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
  examples: ['0TnOYISbd1XYRBk9myaseg'],
})
export const PathShowIdParamsSchema = Type.String({
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
  examples: ['38bS44xjbVVZ3No3ByF1dJ'],
})
export const PathAudiobookIdParamsSchema = Type.String({
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
  examples: ['7iHfbu1YPACw6oZPAFJtqe'],
})
export const QueryAudiobookIdsParamsSchema = Type.String({
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
  examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
})
export const PathChapterIdParamsSchema = Type.String({
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
  examples: ['0D5wENdkdwbqlrHoaJ9g29'],
})
export const QueryChapterIdsParamsSchema = Type.String({
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
  examples: ['0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29'],
})
export const QueryTrackIdsParamsSchema = Type.String({
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
  examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
})
export const QueryIncludeGroupsParamsSchema = Type.String({
  description:
    'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
  examples: ['single,appears_on'],
})
export const QueryShowIdsParamsSchema = Type.String({
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
  examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
})
export const PathUserIdParamsSchema = Type.String({
  description: "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
  examples: ['smedjan'],
})

export const Oauth20SecurityScheme = {
  type: 'oauth2',
  description: 'Spotify supports OAuth 2.0 for authenticating all API requests.',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://accounts.spotify.com/authorize',
      tokenUrl: 'https://accounts.spotify.com/api/token',
      scopes: {
        'app-remote-control': 'Communicate with the Spotify app on your device.\n',
        'playlist-read-private': 'Access your private playlists.\n',
        'playlist-read-collaborative': 'Access your collaborative playlists.\n',
        'playlist-modify-public': 'Manage your public playlists.\n',
        'playlist-modify-private': 'Manage your private playlists.\n',
        'user-library-read': 'Access your saved content.\n',
        'user-library-modify': 'Manage your saved content.\n',
        'user-read-private': 'Access your subscription details.\n',
        'user-read-email': 'Get your real email address.\n',
        'user-follow-read': 'Access your followers and who you are following.\n',
        'user-follow-modify': 'Manage your saved content.\n',
        'user-top-read': 'Read your top artists and content.\n',
        'user-read-playback-position': 'Read your position in content you have played.\n',
        'user-read-playback-state':
          'Read your currently playing content and Spotify Connect devices information.\n',
        'user-read-recently-played': 'Access your recently played items.\n',
        'user-read-currently-playing': 'Read your currently playing content.\n',
        'user-modify-playback-state':
          'Control playback on your Spotify clients and Spotify Connect devices.\n',
        'ugc-image-upload': 'Upload images to Spotify on your behalf.\n',
        streaming: 'Play content and control playback on your other devices.\n',
      },
    },
  },
}

export const UnauthorizedResponse = {
  description:
    'Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n',
  content: { 'application/json': { schema: Type.Object({ error: ErrorObjectSchema }) } },
}
export const ForbiddenResponse = {
  description:
    "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
  content: { 'application/json': { schema: Type.Object({ error: ErrorObjectSchema }) } },
}
export const NotFoundResponse = {
  description: 'The requested resource cannot be found.\n',
  content: { 'application/json': { schema: Type.Object({ error: ErrorObjectSchema }) } },
}
export const BadRequestResponse = {
  description: 'The request contains malformed data in path, query parameters, or body.\n',
  content: { 'application/json': { schema: Type.Object({ error: ErrorObjectSchema }) } },
}
export const TooManyRequestsResponse = {
  description: 'The app has exceeded its rate limits.\n',
  content: { 'application/json': { schema: Type.Object({ error: ErrorObjectSchema }) } },
}
export const ManyAlbumsResponse = {
  description: 'A set of albums',
  content: {
    'application/json': { schema: Type.Object({ albums: Type.Array(AlbumObjectSchema) }) },
  },
}
export const ManyAudiobooksResponse = {
  description:
    "A set of audiobooks. If one of the requested audiobooks is unavailable then you'll find a `null` item in the `audiobooks` array where the audiobook object would otherwise be.",
  content: {
    'application/json': { schema: Type.Object({ audiobooks: Type.Array(AudiobookObjectSchema) }) },
  },
}
export const ManyChaptersResponse = {
  description: 'A set of chapters',
  content: {
    'application/json': { schema: Type.Object({ chapters: Type.Array(ChapterObjectSchema) }) },
  },
}
export const ManyDevicesResponse = {
  description: 'A set of devices',
  content: {
    'application/json': { schema: Type.Object({ devices: Type.Array(DeviceObjectSchema) }) },
  },
}
export const PagedAlbumsResponse = {
  description: 'A paged set of albums',
  content: {
    'application/json': { schema: Type.Object({ albums: PagingSimplifiedAlbumObjectSchema }) },
  },
}
export const PagedPlaylistsResponse = {
  description: 'A paged set of playlists',
  content: { 'application/json': { schema: PagingPlaylistObjectSchema } },
}
export const PagedFeaturedPlaylistsResponse = {
  description: 'A paged set of playlists',
  content: { 'application/json': { schema: PagingFeaturedPlaylistObjectSchema } },
}
export const PagedCategoriesResponse = {
  description: 'A paged set of categories',
  content: {
    'application/json': {
      schema: Type.Object({
        categories: Type.Intersect([
          PagingObjectSchema,
          Type.Object({ items: Type.Optional(Type.Array(CategoryObjectSchema)) }),
        ]),
      }),
    },
  },
}
export const CursorPagedArtistsResponse = {
  description: 'A paged set of artists',
  content: {
    'application/json': {
      schema: Type.Object({ artists: CursorPagingSimplifiedArtistObjectSchema }),
    },
  },
}
export const CursorPagedPlayHistoryResponse = {
  description: 'A paged set of tracks',
  content: { 'application/json': { schema: CursorPagingPlayHistoryObjectSchema } },
}
export const ManyArtistsResponse = {
  description: 'A set of artists',
  content: {
    'application/json': { schema: Type.Object({ artists: Type.Array(ArtistObjectSchema) }) },
  },
}
export const ManyAudioFeaturesResponse = {
  description: 'A set of audio features',
  content: {
    'application/json': {
      schema: Type.Object({ audio_features: Type.Array(AudioFeaturesObjectSchema) }),
    },
  },
}
export const ManyEpisodesResponse = {
  description: 'A set of episodes',
  content: {
    'application/json': { schema: Type.Object({ episodes: Type.Array(EpisodeObjectSchema) }) },
  },
}
export const ManyGenresResponse = {
  description: 'A set of genres',
  content: {
    'application/json': {
      schema: Type.Object({
        genres: Type.Array(Type.String(), { examples: [['alternative', 'samba']] }),
      }),
    },
  },
}
export const OneEpisodeResponse = {
  description: 'An episode',
  content: { 'application/json': { schema: EpisodeObjectSchema } },
}
export const OneChapterResponse = {
  description: 'A Chapter',
  content: { 'application/json': { schema: ChapterObjectSchema } },
}
export const OneAudiobookResponse = {
  description: 'An Audiobook',
  content: { 'application/json': { schema: AudiobookObjectSchema } },
}
export const OneAlbumResponse = {
  description: 'An album',
  content: { 'application/json': { schema: AlbumObjectSchema } },
}
export const ArrayOfImagesResponse = {
  description: 'A set of images',
  content: { 'application/json': { schema: Type.Array(ImageObjectSchema) } },
}
export const OnePrivateUserResponse = {
  description: 'A user',
  content: { 'application/json': { schema: PrivateUserObjectSchema } },
}
export const OnePublicUserResponse = {
  description: 'A user',
  content: { 'application/json': { schema: PublicUserObjectSchema } },
}
export const OneTrackResponse = {
  description: 'A track',
  content: { 'application/json': { schema: TrackObjectSchema } },
}
export const OneShowResponse = {
  description: 'A show',
  content: { 'application/json': { schema: ShowObjectSchema } },
}
export const OneCategoryResponse = {
  description: 'A category',
  content: { 'application/json': { schema: CategoryObjectSchema } },
}
export const OnePlaylistResponse = {
  description: 'A playlist',
  content: { 'application/json': { schema: PlaylistObjectSchema } },
}
export const OneAudioFeaturesResponse = {
  description: 'Audio features for one track',
  content: { 'application/json': { schema: AudioFeaturesObjectSchema } },
}
export const OneAudioAnalysisResponse = {
  description: 'Audio analysis for one track',
  content: { 'application/json': { schema: AudioAnalysisObjectSchema } },
}
export const OneArtistResponse = {
  description: 'An artist',
  content: { 'application/json': { schema: ArtistObjectSchema } },
}
export const ManyTracksResponse = {
  description: 'A set of tracks',
  content: {
    'application/json': { schema: Type.Object({ tracks: Type.Array(TrackObjectSchema) }) },
  },
}
export const ManySimplifiedShowsResponse = {
  description: 'A set of shows',
  content: {
    'application/json': { schema: Type.Object({ shows: Type.Array(SimplifiedShowObjectSchema) }) },
  },
}
export const PagingSimplifiedTrackObjectResponse = {
  description: 'Pages of tracks',
  content: { 'application/json': { schema: PagingSimplifiedTrackObjectSchema } },
}
export const PagingSavedTrackObjectResponse = {
  description: 'Pages of tracks',
  content: { 'application/json': { schema: PagingSavedTrackObjectSchema } },
}
export const PagingPlaylistTrackObjectResponse = {
  description: 'Pages of tracks',
  content: { 'application/json': { schema: PagingPlaylistTrackObjectSchema } },
}
export const PagingArtistDiscographyAlbumObjectResponse = {
  description: 'Pages of albums',
  content: { 'application/json': { schema: PagingArtistDiscographyAlbumObjectSchema } },
}
export const PagingSavedAlbumObjectResponse = {
  description: 'Pages of albums',
  content: { 'application/json': { schema: PagingSavedAlbumObjectSchema } },
}
export const PagingSavedShowObjectResponse = {
  description: 'Pages of shows',
  content: { 'application/json': { schema: PagingSavedShowObjectSchema } },
}
export const PagingSimplifiedEpisodeObjectResponse = {
  description: 'Pages of episodes',
  content: { 'application/json': { schema: PagingSimplifiedEpisodeObjectSchema } },
}
export const PagingSavedEpisodeObjectResponse = {
  description: 'Pages of episodes',
  content: { 'application/json': { schema: PagingSavedEpisodeObjectSchema } },
}
export const PagingSimplifiedAudiobookObjectResponse = {
  description: 'Pages of audiobooks',
  content: { 'application/json': { schema: PagingSimplifiedAudiobookObjectSchema } },
}
export const PagingSimplifiedChapterObjectResponse = {
  description: 'Pages of chapters',
  content: { 'application/json': { schema: PagingSimplifiedChapterObjectSchema } },
}
export const SearchItemsResponse = {
  description: 'Search response',
  content: {
    'application/json': {
      schema: Type.Object({
        tracks: Type.Optional(PagingTrackObjectSchema),
        artists: Type.Optional(PagingArtistObjectSchema),
        albums: Type.Optional(PagingSimplifiedAlbumObjectSchema),
        playlists: Type.Optional(PagingPlaylistObjectSchema),
        shows: Type.Optional(PagingSimplifiedShowObjectSchema),
        episodes: Type.Optional(PagingSimplifiedEpisodeObjectSchema),
        audiobooks: Type.Optional(PagingSimplifiedAudiobookObjectSchema),
      }),
    },
  },
}
export const OneRecommendationsResponse = {
  description: 'A set of recommendations',
  content: { 'application/json': { schema: RecommendationsObjectSchema } },
}
export const ArrayOfBooleansResponse = {
  description: 'Array of booleans',
  content: {
    'application/json': { schema: Type.Array(Type.Boolean(), { examples: [[false, true]] }) },
  },
}
export const SingletonArrayOfBooleanResponse = {
  description: 'Array of boolean, containing a single boolean',
  content: { 'application/json': { schema: Type.Array(Type.Boolean(), { examples: [[true]] }) } },
}
export const QueueResponse = {
  description: 'Information about the queue',
  content: { 'application/json': { schema: QueueObjectSchema } },
}
export const OneCurrentlyPlayingResponse = {
  description: 'Information about playback',
  content: { 'application/json': { schema: CurrentlyPlayingContextObjectSchema } },
}
export const OneCurrentlyPlayingTrackResponse = {
  description: 'Information about the currently playing track',
  content: { 'application/json': { schema: CurrentlyPlayingObjectSchema } },
}
export const PlaylistSnapshotIdResponse = {
  description: 'A snapshot ID for the playlist',
  content: {
    'application/json': {
      schema: Type.Object({ snapshot_id: Type.Optional(Type.String({ examples: ['abc'] })) }),
    },
  },
}
export const MarketsResponse = {
  description: 'A markets object with an array of country codes',
  content: {
    'application/json': {
      schema: Type.Object({
        markets: Type.Optional(Type.Array(Type.String(), { examples: [['CA', 'BR', 'IT']] })),
      }),
    },
  },
}
export const PagingArtistObjectResponse = {
  description: 'Pages of artists',
  content: { 'application/json': { schema: PagingArtistObjectSchema } },
}
export const PagingSavedAudiobookObjectResponse = {
  description: 'Pages of saved audiobooks',
  content: { 'application/json': { schema: PagingSavedAudiobookObjectSchema } },
}
export const PagingTrackObjectResponse = {
  description: 'Pages of tracks',
  content: { 'application/json': { schema: PagingTrackObjectSchema } },
}
