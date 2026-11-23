import * as v from 'valibot'

export const ExternalUrlObjectSchema = v.partial(
  v.object({
    spotify: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\n',
      ),
    ),
  }),
)

export type ExternalUrlObjectSchema = v.InferOutput<typeof ExternalUrlObjectSchema>

export const LinkedTrackObjectSchema = v.partial(
  v.object({
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known external URLs for this track.\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the track.\n'),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
      ),
    ),
    type: v.pipe(v.string(), v.description('The object type: "track".\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
      ),
    ),
  }),
)

export type LinkedTrackObjectSchema = v.InferOutput<typeof LinkedTrackObjectSchema>

export const TrackRestrictionObjectSchema = v.partial(
  v.object({
    reason: v.pipe(
      v.string(),
      v.description(
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
      ),
    ),
  }),
)

export type TrackRestrictionObjectSchema = v.InferOutput<typeof TrackRestrictionObjectSchema>

export const AlbumRestrictionObjectSchema = v.partial(
  v.object({
    reason: v.pipe(
      v.picklist(['market', 'product', 'explicit']),
      v.description(
        "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n",
      ),
    ),
  }),
)

export type AlbumRestrictionObjectSchema = v.InferOutput<typeof AlbumRestrictionObjectSchema>

export const EpisodeRestrictionObjectSchema = v.partial(
  v.object({
    reason: v.pipe(
      v.string(),
      v.description(
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
      ),
    ),
  }),
)

export type EpisodeRestrictionObjectSchema = v.InferOutput<typeof EpisodeRestrictionObjectSchema>

export const ChapterRestrictionObjectSchema = v.partial(
  v.object({
    reason: v.pipe(
      v.string(),
      v.description(
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n- `payment_required` - Payment is required to play the content item.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
      ),
    ),
  }),
)

export type ChapterRestrictionObjectSchema = v.InferOutput<typeof ChapterRestrictionObjectSchema>

export const FollowersObjectSchema = v.partial(
  v.object({
    href: v.pipe(
      v.nullable(v.string()),
      v.description(
        'This will always be set to null, as the Web API does not support it at the moment.\n',
      ),
    ),
    total: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The total number of followers.\n'),
    ),
  }),
)

export type FollowersObjectSchema = v.InferOutput<typeof FollowersObjectSchema>

export const ImageObjectSchema = v.object({
  url: v.pipe(
    v.string(),
    v.description('The source URL of the image.\n'),
    v.metadata({
      examples: ['https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n'],
    }),
  ),
  height: v.pipe(
    v.nullable(v.pipe(v.number(), v.integer())),
    v.description('The image height in pixels.\n'),
    v.metadata({ examples: [300] }),
  ),
  width: v.pipe(
    v.nullable(v.pipe(v.number(), v.integer())),
    v.description('The image width in pixels.\n'),
    v.metadata({ examples: [300] }),
  ),
})

export type ImageObjectSchema = v.InferOutput<typeof ImageObjectSchema>

export const ArtistObjectSchema = v.partial(
  v.object({
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known external URLs for this artist.\n'),
    ),
    followers: v.pipe(
      FollowersObjectSchema,
      v.description('Information about the followers of the artist.\n'),
      v.metadata({ deprecated: true }),
    ),
    genres: v.pipe(
      v.array(v.string()),
      v.description(
        'A list of the genres the artist is associated with. If not yet classified, the array is empty.\n',
      ),
      v.metadata({ examples: [['Prog rock', 'Grunge']], deprecated: true }),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the artist.\n'),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
      ),
    ),
    images: v.pipe(
      v.array(ImageObjectSchema),
      v.description('Images of the artist in various sizes, widest first.\n'),
    ),
    name: v.pipe(v.string(), v.description('The name of the artist.\n')),
    popularity: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        "The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n",
      ),
      v.metadata({ deprecated: true }),
    ),
    type: v.pipe(v.literal('artist'), v.description('The object type.\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
      ),
    ),
  }),
)

export type ArtistObjectSchema = v.InferOutput<typeof ArtistObjectSchema>

export const SimplifiedArtistObjectSchema = v.partial(
  v.object({
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known external URLs for this artist.\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the artist.\n'),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
      ),
    ),
    name: v.pipe(v.string(), v.description('The name of the artist.\n')),
    type: v.pipe(v.literal('artist'), v.description('The object type.\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
      ),
    ),
  }),
)

export type SimplifiedArtistObjectSchema = v.InferOutput<typeof SimplifiedArtistObjectSchema>

export const AlbumBaseSchema = v.object({
  album_type: v.pipe(
    v.picklist(['album', 'single', 'compilation']),
    v.description('The type of the album.\n'),
    v.metadata({ examples: ['compilation'] }),
  ),
  total_tracks: v.pipe(
    v.pipe(v.number(), v.integer()),
    v.description('The number of tracks in the album.'),
    v.metadata({ examples: [9] }),
  ),
  available_markets: v.pipe(
    v.array(v.string()),
    v.description(
      'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n',
    ),
    v.metadata({ examples: [['CA', 'BR', 'IT']], deprecated: true }),
  ),
  external_urls: v.pipe(
    ExternalUrlObjectSchema,
    v.description('Known external URLs for this album.\n'),
  ),
  href: v.pipe(
    v.string(),
    v.description('A link to the Web API endpoint providing full details of the album.\n'),
  ),
  id: v.pipe(
    v.string(),
    v.description(
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
    ),
    v.metadata({ examples: ['2up3OPMp9Tb4dAKM2erWXQ'] }),
  ),
  images: v.pipe(
    v.array(ImageObjectSchema),
    v.description('The cover art for the album in various sizes, widest first.\n'),
  ),
  name: v.pipe(
    v.string(),
    v.description(
      'The name of the album. In case of an album takedown, the value may be an empty string.\n',
    ),
  ),
  release_date: v.pipe(
    v.string(),
    v.description('The date the album was first released.\n'),
    v.metadata({ examples: ['1981-12'] }),
  ),
  release_date_precision: v.pipe(
    v.picklist(['year', 'month', 'day']),
    v.description('The precision with which `release_date` value is known.\n'),
    v.metadata({ examples: ['year'] }),
  ),
  restrictions: v.optional(
    v.pipe(
      AlbumRestrictionObjectSchema,
      v.description('Included in the response when a content restriction is applied.\n'),
    ),
  ),
  type: v.pipe(v.literal('album'), v.description('The object type.\n')),
  uri: v.pipe(
    v.string(),
    v.description(
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
    ),
    v.metadata({ examples: ['spotify:album:2up3OPMp9Tb4dAKM2erWXQ'] }),
  ),
})

export type AlbumBaseSchema = v.InferOutput<typeof AlbumBaseSchema>

export const SimplifiedAlbumObjectSchema = v.intersect([
  AlbumBaseSchema,
  v.object({
    artists: v.pipe(
      v.array(SimplifiedArtistObjectSchema),
      v.description(
        'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      ),
    ),
  }),
])

export type SimplifiedAlbumObjectSchema = v.InferOutput<typeof SimplifiedAlbumObjectSchema>

export const ExternalIdObjectSchema = v.partial(
  v.object({
    isrc: v.pipe(
      v.string(),
      v.description(
        '[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n',
      ),
    ),
    ean: v.pipe(
      v.string(),
      v.description(
        '[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n',
      ),
    ),
    upc: v.pipe(
      v.string(),
      v.description(
        '[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n',
      ),
    ),
  }),
)

export type ExternalIdObjectSchema = v.InferOutput<typeof ExternalIdObjectSchema>

export const TrackObjectSchema = v.partial(
  v.object({
    album: v.pipe(
      SimplifiedAlbumObjectSchema,
      v.description(
        'The album on which the track appears. The album object includes a link in `href` to full information about the album.\n',
      ),
    ),
    artists: v.pipe(
      v.array(SimplifiedArtistObjectSchema),
      v.description(
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      ),
    ),
    available_markets: v.pipe(
      v.array(v.string()),
      v.description(
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      ),
      v.metadata({ deprecated: true }),
    ),
    disc_number: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The disc number (usually `1` unless the album consists of more than one disc).\n',
      ),
    ),
    duration_ms: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The track length in milliseconds.\n'),
    ),
    explicit: v.pipe(
      v.boolean(),
      v.description(
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n',
      ),
    ),
    external_ids: v.pipe(
      ExternalIdObjectSchema,
      v.description('Known external IDs for the track.\n'),
    ),
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known external URLs for this track.\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the track.\n'),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
      ),
    ),
    is_playable: v.pipe(
      v.boolean(),
      v.description(
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
      ),
    ),
    linked_from: v.pipe(
      LinkedTrackObjectSchema,
      v.description(
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track.',
      ),
      v.metadata({ deprecated: true }),
    ),
    restrictions: v.pipe(
      TrackRestrictionObjectSchema,
      v.description('Included in the response when a content restriction is applied.\n'),
    ),
    name: v.pipe(v.string(), v.description('The name of the track.\n')),
    popularity: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n',
      ),
      v.metadata({ deprecated: true }),
    ),
    preview_url: v.pipe(
      v.nullable(v.string()),
      v.description('A link to a 30 second preview (MP3 format) of the track. Can be `null`\n'),
      v.metadata({ deprecated: true }),
    ),
    track_number: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
      ),
    ),
    type: v.pipe(v.literal('track'), v.description('The object type: "track".\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
      ),
    ),
    is_local: v.pipe(
      v.boolean(),
      v.description('Whether or not the track is from a local file.\n'),
    ),
  }),
)

export type TrackObjectSchema = v.InferOutput<typeof TrackObjectSchema>

export const ContextObjectSchema = v.partial(
  v.object({
    type: v.pipe(
      v.string(),
      v.description('The object type, e.g. "artist", "playlist", "album", "show".\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the track.'),
    ),
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('External URLs for this context.'),
    ),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.\n',
      ),
    ),
  }),
)

export type ContextObjectSchema = v.InferOutput<typeof ContextObjectSchema>

export const PlayHistoryObjectSchema = v.partial(
  v.object({
    track: v.pipe(TrackObjectSchema, v.description('The track the user listened to.')),
    played_at: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description('The date and time the track was played.'),
    ),
    context: v.pipe(ContextObjectSchema, v.description('The context the track was played from.')),
  }),
)

export type PlayHistoryObjectSchema = v.InferOutput<typeof PlayHistoryObjectSchema>

export const PlaylistUserObjectSchema = v.partial(
  v.object({
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known public external URLs for this user.\n'),
    ),
    href: v.pipe(v.string(), v.description('A link to the Web API endpoint for this user.\n')),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
      ),
    ),
    type: v.pipe(v.literal('user'), v.description('The object type.\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
      ),
    ),
  }),
)

export type PlaylistUserObjectSchema = v.InferOutput<typeof PlaylistUserObjectSchema>

export const ResumePointObjectSchema = v.partial(
  v.object({
    fully_played: v.pipe(
      v.boolean(),
      v.description('Whether or not the episode has been fully played by the user.\n'),
    ),
    resume_position_ms: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description("The user's most recent position in the episode in milliseconds.\n"),
    ),
  }),
)

export type ResumePointObjectSchema = v.InferOutput<typeof ResumePointObjectSchema>

export const EpisodeBaseSchema = v.object({
  audio_preview_url: v.pipe(
    v.nullable(v.string()),
    v.description(
      'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
    ),
    v.metadata({
      examples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
      deprecated: true,
    }),
  ),
  description: v.pipe(
    v.string(),
    v.description(
      'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    ),
    v.metadata({
      examples: [
        'A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n',
      ],
    }),
  ),
  html_description: v.pipe(
    v.string(),
    v.description('A description of the episode. This field may contain HTML tags.\n'),
    v.metadata({
      examples: [
        '<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n',
      ],
    }),
  ),
  duration_ms: v.pipe(
    v.pipe(v.number(), v.integer()),
    v.description('The episode length in milliseconds.\n'),
    v.metadata({ examples: [1686230] }),
  ),
  explicit: v.pipe(
    v.boolean(),
    v.description(
      'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    ),
  ),
  external_urls: v.pipe(
    ExternalUrlObjectSchema,
    v.description('External URLs for this episode.\n'),
  ),
  href: v.pipe(
    v.string(),
    v.description('A link to the Web API endpoint providing full details of the episode.\n'),
    v.metadata({ examples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'] }),
  ),
  id: v.pipe(
    v.string(),
    v.description(
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
    ),
    v.metadata({ examples: ['5Xt5DXGzch68nYYamXrNxZ'] }),
  ),
  images: v.pipe(
    v.array(ImageObjectSchema),
    v.description('The cover art for the episode in various sizes, widest first.\n'),
  ),
  is_externally_hosted: v.pipe(
    v.boolean(),
    v.description("True if the episode is hosted outside of Spotify's CDN.\n"),
  ),
  is_playable: v.pipe(
    v.boolean(),
    v.description('True if the episode is playable in the given market. Otherwise false.\n'),
  ),
  language: v.optional(
    v.pipe(
      v.string(),
      v.description(
        'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n',
      ),
      v.metadata({ examples: ['en'], deprecated: true }),
    ),
  ),
  languages: v.pipe(
    v.array(v.string()),
    v.description(
      'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    ),
    v.metadata({ examples: [['fr', 'en']] }),
  ),
  name: v.pipe(
    v.string(),
    v.description('The name of the episode.\n'),
    v.metadata({
      examples: ['Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n'],
    }),
  ),
  release_date: v.pipe(
    v.string(),
    v.description(
      'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
    ),
    v.metadata({ examples: ['1981-12-15'] }),
  ),
  release_date_precision: v.pipe(
    v.picklist(['year', 'month', 'day']),
    v.description('The precision with which `release_date` value is known.\n'),
    v.metadata({ examples: ['day'] }),
  ),
  resume_point: v.optional(
    v.pipe(
      ResumePointObjectSchema,
      v.description(
        "The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
      ),
    ),
  ),
  type: v.pipe(v.literal('episode'), v.description('The object type.\n')),
  uri: v.pipe(
    v.string(),
    v.description(
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
    ),
    v.metadata({ examples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'] }),
  ),
  restrictions: v.optional(
    v.pipe(
      EpisodeRestrictionObjectSchema,
      v.description('Included in the response when a content restriction is applied.\n'),
    ),
  ),
})

export type EpisodeBaseSchema = v.InferOutput<typeof EpisodeBaseSchema>

export const CopyrightObjectSchema = v.partial(
  v.object({
    text: v.pipe(v.string(), v.description('The copyright text for this content.\n')),
    type: v.pipe(
      v.string(),
      v.description(
        'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n',
      ),
    ),
  }),
)

export type CopyrightObjectSchema = v.InferOutput<typeof CopyrightObjectSchema>

export const ShowBaseSchema = v.object({
  available_markets: v.pipe(
    v.array(v.string()),
    v.description(
      'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    ),
    v.metadata({ deprecated: true }),
  ),
  copyrights: v.pipe(
    v.array(CopyrightObjectSchema),
    v.description('The copyright statements of the show.\n'),
  ),
  description: v.pipe(
    v.string(),
    v.description(
      'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    ),
  ),
  html_description: v.pipe(
    v.string(),
    v.description('A description of the show. This field may contain HTML tags.\n'),
  ),
  explicit: v.pipe(
    v.boolean(),
    v.description(
      'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    ),
  ),
  external_urls: v.pipe(ExternalUrlObjectSchema, v.description('External URLs for this show.\n')),
  href: v.pipe(
    v.string(),
    v.description('A link to the Web API endpoint providing full details of the show.\n'),
  ),
  id: v.pipe(
    v.string(),
    v.description(
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
    ),
  ),
  images: v.pipe(
    v.array(ImageObjectSchema),
    v.description('The cover art for the show in various sizes, widest first.\n'),
  ),
  is_externally_hosted: v.pipe(
    v.boolean(),
    v.description(
      "True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n",
    ),
  ),
  languages: v.pipe(
    v.array(v.string()),
    v.description(
      'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    ),
  ),
  media_type: v.pipe(v.string(), v.description('The media type of the show.\n')),
  name: v.pipe(v.string(), v.description('The name of the episode.\n')),
  publisher: v.pipe(
    v.string(),
    v.description('The publisher of the show.\n'),
    v.metadata({ deprecated: true }),
  ),
  type: v.pipe(v.literal('show'), v.description('The object type.\n')),
  uri: v.pipe(
    v.string(),
    v.description(
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
    ),
  ),
  total_episodes: v.pipe(
    v.pipe(v.number(), v.integer()),
    v.description('The total number of episodes in the show.\n'),
  ),
})

export type ShowBaseSchema = v.InferOutput<typeof ShowBaseSchema>

export const SimplifiedShowObjectSchema = ShowBaseSchema

export type SimplifiedShowObjectSchema = v.InferOutput<typeof SimplifiedShowObjectSchema>

export const EpisodeObjectSchema = v.intersect([
  EpisodeBaseSchema,
  v.object({
    show: v.pipe(
      SimplifiedShowObjectSchema,
      v.description('The show on which the episode belongs.\n'),
    ),
  }),
])

export type EpisodeObjectSchema = v.InferOutput<typeof EpisodeObjectSchema>

export const PlaylistTrackObjectSchema = v.partial(
  v.object({
    added_at: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._\n',
      ),
    ),
    added_by: v.pipe(
      PlaylistUserObjectSchema,
      v.description(
        'The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._\n',
      ),
    ),
    is_local: v.pipe(
      v.boolean(),
      v.description(
        'Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.\n',
      ),
    ),
    item: v.pipe(
      v.union([
        v.intersect([TrackObjectSchema, v.object({ type: v.literal('TrackObject') })]),
        v.intersect([EpisodeObjectSchema, v.object({ type: v.literal('EpisodeObject') })]),
      ]),
      v.description('Information about the track or episode.'),
    ),
    track: v.pipe(
      v.union([
        v.intersect([TrackObjectSchema, v.object({ type: v.literal('TrackObject') })]),
        v.intersect([EpisodeObjectSchema, v.object({ type: v.literal('EpisodeObject') })]),
      ]),
      v.description(
        '**Deprecated:** Use `item` instead. Information about the track or episode.\n',
      ),
      v.metadata({ deprecated: true }),
    ),
  }),
)

export type PlaylistTrackObjectSchema = v.InferOutput<typeof PlaylistTrackObjectSchema>

export const QueueObjectSchema = v.partial(
  v.object({
    currently_playing: v.pipe(
      v.union([
        v.intersect([TrackObjectSchema, v.object({ type: v.literal('TrackObject') })]),
        v.intersect([EpisodeObjectSchema, v.object({ type: v.literal('EpisodeObject') })]),
      ]),
      v.description('The currently playing track or episode. Can be `null`.'),
    ),
    queue: v.pipe(
      v.array(
        v.union([
          v.intersect([TrackObjectSchema, v.object({ type: v.literal('TrackObject') })]),
          v.intersect([EpisodeObjectSchema, v.object({ type: v.literal('EpisodeObject') })]),
        ]),
      ),
      v.description('The tracks or episodes in the queue. Can be empty.'),
    ),
  }),
)

export type QueueObjectSchema = v.InferOutput<typeof QueueObjectSchema>

export const DeviceObjectSchema = v.partial(
  v.object({
    id: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.',
      ),
    ),
    is_active: v.pipe(v.boolean(), v.description('If this device is the currently active device.')),
    is_private_session: v.pipe(
      v.boolean(),
      v.description('If this device is currently in a private session.'),
    ),
    is_restricted: v.pipe(
      v.boolean(),
      v.description(
        'Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.',
      ),
    ),
    name: v.pipe(
      v.string(),
      v.description(
        'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\"Loudest speaker\\") and some devices have a generic name associated with the manufacturer or device model.',
      ),
      v.metadata({ examples: ['Kitchen speaker'] }),
    ),
    type: v.pipe(
      v.string(),
      v.description('Device type, such as "computer", "smartphone" or "speaker".'),
      v.metadata({ examples: ['computer'] }),
    ),
    volume_percent: v.pipe(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
      v.description('The current volume in percent.'),
      v.metadata({ examples: [59] }),
    ),
    supports_volume: v.pipe(
      v.boolean(),
      v.description('If this device can be used to set the volume.'),
    ),
  }),
)

export type DeviceObjectSchema = v.InferOutput<typeof DeviceObjectSchema>

export const DisallowsObjectSchema = v.partial(
  v.object({
    interrupting_playback: v.pipe(
      v.boolean(),
      v.description('Interrupting playback. Optional field.'),
    ),
    pausing: v.pipe(v.boolean(), v.description('Pausing. Optional field.')),
    resuming: v.pipe(v.boolean(), v.description('Resuming. Optional field.')),
    seeking: v.pipe(v.boolean(), v.description('Seeking playback location. Optional field.')),
    skipping_next: v.pipe(
      v.boolean(),
      v.description('Skipping to the next context. Optional field.'),
    ),
    skipping_prev: v.pipe(
      v.boolean(),
      v.description('Skipping to the previous context. Optional field.'),
    ),
    toggling_repeat_context: v.pipe(
      v.boolean(),
      v.description('Toggling repeat context flag. Optional field.'),
    ),
    toggling_shuffle: v.pipe(v.boolean(), v.description('Toggling shuffle flag. Optional field.')),
    toggling_repeat_track: v.pipe(
      v.boolean(),
      v.description('Toggling repeat track flag. Optional field.'),
    ),
    transferring_playback: v.pipe(
      v.boolean(),
      v.description('Transfering playback between devices. Optional field.'),
    ),
  }),
)

export type DisallowsObjectSchema = v.InferOutput<typeof DisallowsObjectSchema>

export const CurrentlyPlayingContextObjectSchema = v.partial(
  v.object({
    device: v.pipe(DeviceObjectSchema, v.description('The device that is currently active.\n')),
    repeat_state: v.pipe(v.string(), v.description('off, track, context')),
    shuffle_state: v.pipe(v.boolean(), v.description('If shuffle is on or off.')),
    context: v.pipe(ContextObjectSchema, v.description('A Context Object. Can be `null`.')),
    timestamp: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description(
        'Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.).',
      ),
    ),
    progress_ms: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('Progress into the currently playing track or episode. Can be `null`.'),
    ),
    is_playing: v.pipe(
      v.boolean(),
      v.description('If something is currently playing, return `true`.'),
    ),
    item: v.pipe(
      v.union([
        v.intersect([TrackObjectSchema, v.object({ type: v.literal('TrackObject') })]),
        v.intersect([EpisodeObjectSchema, v.object({ type: v.literal('EpisodeObject') })]),
      ]),
      v.description('The currently playing track or episode. Can be `null`.'),
    ),
    currently_playing_type: v.pipe(
      v.string(),
      v.description(
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
      ),
    ),
    actions: v.pipe(
      DisallowsObjectSchema,
      v.description(
        'Allows to update the user interface based on which playback actions are available within the current context.\n',
      ),
    ),
  }),
)

export type CurrentlyPlayingContextObjectSchema = v.InferOutput<
  typeof CurrentlyPlayingContextObjectSchema
>

export const ErrorObjectSchema = v.object({
  status: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(400), v.maxValue(599)),
    v.description(
      'The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).\n',
    ),
  ),
  message: v.pipe(v.string(), v.description('A short description of the cause of the error.\n')),
})

export type ErrorObjectSchema = v.InferOutput<typeof ErrorObjectSchema>

export const ExplicitContentSettingsObjectSchema = v.partial(
  v.object({
    filter_enabled: v.pipe(
      v.boolean(),
      v.description('When `true`, indicates that explicit content should not be played.\n'),
    ),
    filter_locked: v.pipe(
      v.boolean(),
      v.description(
        "When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n",
      ),
    ),
  }),
)

export type ExplicitContentSettingsObjectSchema = v.InferOutput<
  typeof ExplicitContentSettingsObjectSchema
>

export const PrivateUserObjectSchema = v.partial(
  v.object({
    account_id: v.pipe(
      v.string(),
      v.description(
        "A public, immutable, pseudoanonymous identifier for the user's account. Use this field for account linking rather than the `id` field, as it is stable and will not change over the lifetime of the account.\n",
      ),
      v.metadata({ examples: ['aB3dE5fG7h'] }),
    ),
    country: v.pipe(
      v.string(),
      v.description(
        "The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      ),
      v.metadata({ deprecated: true }),
    ),
    display_name: v.pipe(
      v.string(),
      v.description("The name displayed on the user's profile. `null` if not available.\n"),
    ),
    email: v.pipe(
      v.string(),
      v.description(
        "The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      ),
      v.metadata({ deprecated: true }),
    ),
    explicit_content: v.pipe(
      ExplicitContentSettingsObjectSchema,
      v.description(
        "The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      ),
      v.metadata({ deprecated: true }),
    ),
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known external URLs for this user.'),
    ),
    followers: v.pipe(
      FollowersObjectSchema,
      v.description('Information about the followers of the user.'),
      v.metadata({ deprecated: true }),
    ),
    href: v.pipe(v.string(), v.description('A link to the Web API endpoint for this user.\n')),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. Do not use this field for account linking — use `account_id` instead, which is immutable.\n',
      ),
    ),
    images: v.pipe(v.array(ImageObjectSchema), v.description("The user's profile image.")),
    product: v.pipe(
      v.string(),
      v.description(
        'The user\'s Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n',
      ),
      v.metadata({ deprecated: true }),
    ),
    type: v.pipe(v.string(), v.description('The object type: "user"\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
      ),
    ),
  }),
)

export type PrivateUserObjectSchema = v.InferOutput<typeof PrivateUserObjectSchema>

export const PublicUserObjectSchema = v.partial(
  v.object({
    display_name: v.pipe(
      v.nullable(v.string()),
      v.description("The name displayed on the user's profile. `null` if not available.\n"),
    ),
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known public external URLs for this user.\n'),
    ),
    followers: v.pipe(
      FollowersObjectSchema,
      v.description('Information about the followers of this user.\n'),
      v.metadata({ deprecated: true }),
    ),
    href: v.pipe(v.string(), v.description('A link to the Web API endpoint for this user.\n')),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
      ),
    ),
    images: v.pipe(v.array(ImageObjectSchema), v.description("The user's profile image.\n")),
    type: v.pipe(v.literal('user'), v.description('The object type.\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
      ),
    ),
  }),
)

export type PublicUserObjectSchema = v.InferOutput<typeof PublicUserObjectSchema>

export const LoudnessSchema = v.pipe(
  v.pipe(v.number(), v.minValue(-3.4028234663852886e38), v.maxValue(3.4028234663852886e38)),
  v.description(
    'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n',
  ),
  v.metadata({ examples: [-5.883] }),
)

export type LoudnessSchema = v.InferOutput<typeof LoudnessSchema>

export const TempoSchema = v.pipe(
  v.pipe(v.number(), v.minValue(-3.4028234663852886e38), v.maxValue(3.4028234663852886e38)),
  v.description(
    'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n',
  ),
  v.metadata({ examples: [118.211] }),
)

export type TempoSchema = v.InferOutput<typeof TempoSchema>

export const TimeSignatureSchema = v.pipe(
  v.pipe(v.number(), v.integer(), v.minValue(3), v.maxValue(7)),
  v.description(
    'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
  ),
  v.metadata({ examples: [4] }),
)

export type TimeSignatureSchema = v.InferOutput<typeof TimeSignatureSchema>

export const KeySchema = v.pipe(
  v.pipe(v.number(), v.integer(), v.minValue(-1), v.maxValue(11)),
  v.description(
    'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n',
  ),
  v.metadata({ examples: [9] }),
)

export type KeySchema = v.InferOutput<typeof KeySchema>

export const ModeSchema = v.pipe(
  v.pipe(v.number(), v.integer()),
  v.description(
    'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n',
  ),
  v.metadata({ examples: [0] }),
)

export type ModeSchema = v.InferOutput<typeof ModeSchema>

export const TimeIntervalObjectSchema = v.partial(
  v.object({
    start: v.pipe(
      v.number(),
      v.description('The starting point (in seconds) of the time interval.'),
      v.metadata({ examples: [0.49567] }),
    ),
    duration: v.pipe(
      v.number(),
      v.description('The duration (in seconds) of the time interval.'),
      v.metadata({ examples: [2.18749] }),
    ),
    confidence: v.pipe(
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.description('The confidence, from 0.0 to 1.0, of the reliability of the interval.'),
      v.metadata({ examples: [0.925] }),
    ),
  }),
)

export type TimeIntervalObjectSchema = v.InferOutput<typeof TimeIntervalObjectSchema>

export const SectionObjectSchema = v.partial(
  v.object({
    start: v.pipe(
      v.number(),
      v.description('The starting point (in seconds) of the section.'),
      v.metadata({ examples: [0] }),
    ),
    duration: v.pipe(
      v.number(),
      v.description('The duration (in seconds) of the section.'),
      v.metadata({ examples: [6.97092] }),
    ),
    confidence: v.pipe(
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.description(
        'The confidence, from 0.0 to 1.0, of the reliability of the section\'s "designation".',
      ),
      v.metadata({ examples: [1] }),
    ),
    loudness: v.pipe(
      v.number(),
      v.description(
        'The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.',
      ),
      v.metadata({ examples: [-14.938] }),
    ),
    tempo: v.pipe(
      v.number(),
      v.description(
        'The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
      ),
      v.metadata({ examples: [113.178] }),
    ),
    tempo_confidence: v.pipe(
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.description(
        "The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.",
      ),
      v.metadata({ examples: [0.647] }),
    ),
    key: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.',
      ),
      v.metadata({ examples: [9] }),
    ),
    key_confidence: v.pipe(
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.description(
        'The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.',
      ),
      v.metadata({ examples: [0.297] }),
    ),
    mode: v.pipe(
      v.union([v.literal(-1), v.literal(0), v.literal(1)]),
      v.description(
        'Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.',
      ),
    ),
    mode_confidence: v.pipe(
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.description('The confidence, from 0.0 to 1.0, of the reliability of the `mode`.'),
      v.metadata({ examples: [0.471] }),
    ),
    time_signature: TimeSignatureSchema,
    time_signature_confidence: v.pipe(
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.description(
        'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.',
      ),
      v.metadata({ examples: [1] }),
    ),
  }),
)

export type SectionObjectSchema = v.InferOutput<typeof SectionObjectSchema>

export const SegmentObjectSchema = v.partial(
  v.object({
    start: v.pipe(
      v.number(),
      v.description('The starting point (in seconds) of the segment.'),
      v.metadata({ examples: [0.70154] }),
    ),
    duration: v.pipe(
      v.number(),
      v.description('The duration (in seconds) of the segment.'),
      v.metadata({ examples: [0.19891] }),
    ),
    confidence: v.pipe(
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.description(
        'The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.\n',
      ),
      v.metadata({ examples: [0.435] }),
    ),
    loudness_start: v.pipe(
      v.number(),
      v.description(
        'The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      ),
      v.metadata({ examples: [-23.053] }),
    ),
    loudness_max: v.pipe(
      v.number(),
      v.description(
        'The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      ),
      v.metadata({ examples: [-14.25] }),
    ),
    loudness_max_time: v.pipe(
      v.number(),
      v.description(
        'The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.',
      ),
      v.metadata({ examples: [0.07305] }),
    ),
    loudness_end: v.pipe(
      v.number(),
      v.description(
        'The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.',
      ),
      v.metadata({ examples: [0] }),
    ),
    pitches: v.pipe(
      v.array(v.pipe(v.number(), v.minValue(0), v.maxValue(1))),
      v.description(
        'Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).\n\nVectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.\nAs can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.\n![pitch vector](/assets/audio/Pitch_vector.png)\n',
      ),
      v.metadata({ examples: [[0.212, 0.141, 0.294]] }),
    ),
    timbre: v.pipe(
      v.array(v.number()),
      v.description(
        'Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n\nFor completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).\n![timbre basis functions](/assets/audio/Timbre_basis_functions.png)\n\nThe actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.\n',
      ),
      v.metadata({ examples: [[42.115, 64.373, -0.233]] }),
    ),
  }),
)

export type SegmentObjectSchema = v.InferOutput<typeof SegmentObjectSchema>

export const AudioAnalysisObjectSchema = v.partial(
  v.object({
    meta: v.partial(
      v.object({
        analyzer_version: v.pipe(
          v.string(),
          v.description('The version of the Analyzer used to analyze this track.'),
          v.metadata({ examples: ['4.0.0'] }),
        ),
        platform: v.pipe(
          v.string(),
          v.description("The platform used to read the track's audio data."),
          v.metadata({ examples: ['Linux'] }),
        ),
        detailed_status: v.pipe(
          v.string(),
          v.description(
            'A detailed status code for this track. If analysis data is missing, this code may explain why.',
          ),
          v.metadata({ examples: ['OK'] }),
        ),
        status_code: v.pipe(
          v.pipe(v.number(), v.integer()),
          v.description(
            'The return code of the analyzer process. 0 if successful, 1 if any errors occurred.',
          ),
          v.metadata({ examples: [0] }),
        ),
        timestamp: v.pipe(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
          ),
          v.description('The Unix timestamp (in seconds) at which this track was analyzed.'),
          v.metadata({ examples: [1495193577] }),
        ),
        analysis_time: v.pipe(
          v.number(),
          v.description('The amount of time taken to analyze this track.'),
          v.metadata({ examples: [6.93906] }),
        ),
        input_process: v.pipe(
          v.string(),
          v.description("The method used to read the track's audio data."),
          v.metadata({ examples: ['libvorbisfile L+R 44100->22050'] }),
        ),
      }),
    ),
    track: v.partial(
      v.object({
        num_samples: v.pipe(
          v.pipe(v.number(), v.integer()),
          v.description(
            'The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.',
          ),
          v.metadata({ examples: [4585515] }),
        ),
        duration: v.pipe(
          v.number(),
          v.description('Length of the track in seconds.'),
          v.metadata({ examples: [207.95985] }),
        ),
        sample_md5: v.pipe(
          v.string(),
          v.description('This field will always contain the empty string.'),
        ),
        offset_seconds: v.pipe(
          v.pipe(v.number(), v.integer()),
          v.description(
            'An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)',
          ),
          v.metadata({ examples: [0] }),
        ),
        window_seconds: v.pipe(
          v.pipe(v.number(), v.integer()),
          v.description(
            'The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)',
          ),
          v.metadata({ examples: [0] }),
        ),
        analysis_sample_rate: v.pipe(
          v.pipe(v.number(), v.integer()),
          v.description(
            'The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.',
          ),
          v.metadata({ examples: [22050] }),
        ),
        analysis_channels: v.pipe(
          v.pipe(v.number(), v.integer()),
          v.description(
            'The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.',
          ),
          v.metadata({ examples: [1] }),
        ),
        end_of_fade_in: v.pipe(
          v.number(),
          v.description(
            "The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.",
          ),
          v.metadata({ examples: [0] }),
        ),
        start_of_fade_out: v.pipe(
          v.number(),
          v.description(
            "The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.",
          ),
          v.metadata({ examples: [201.13705] }),
        ),
        loudness: LoudnessSchema,
        tempo: TempoSchema,
        tempo_confidence: v.pipe(
          v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
          v.description('The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.'),
          v.metadata({ examples: [0.73] }),
        ),
        time_signature: TimeSignatureSchema,
        time_signature_confidence: v.pipe(
          v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
          v.description(
            'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.',
          ),
          v.metadata({ examples: [0.994] }),
        ),
        key: KeySchema,
        key_confidence: v.pipe(
          v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
          v.description('The confidence, from 0.0 to 1.0, of the reliability of the `key`.'),
          v.metadata({ examples: [0.408] }),
        ),
        mode: ModeSchema,
        mode_confidence: v.pipe(
          v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
          v.description('The confidence, from 0.0 to 1.0, of the reliability of the `mode`.'),
          v.metadata({ examples: [0.485] }),
        ),
        codestring: v.pipe(
          v.string(),
          v.description(
            'An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.',
          ),
        ),
        code_version: v.pipe(
          v.number(),
          v.description(
            'A version number for the Echo Nest Musical Fingerprint format used in the codestring field.',
          ),
          v.metadata({ examples: [3.15] }),
        ),
        echoprintstring: v.pipe(
          v.string(),
          v.description(
            'An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.',
          ),
        ),
        echoprint_version: v.pipe(
          v.number(),
          v.description(
            'A version number for the EchoPrint format used in the echoprintstring field.',
          ),
          v.metadata({ examples: [4.15] }),
        ),
        synchstring: v.pipe(
          v.string(),
          v.description('A [Synchstring](https://github.com/echonest/synchdata) for this track.'),
        ),
        synch_version: v.pipe(
          v.number(),
          v.description('A version number for the Synchstring used in the synchstring field.'),
          v.metadata({ examples: [1] }),
        ),
        rhythmstring: v.pipe(
          v.string(),
          v.description(
            'A Rhythmstring for this track. The format of this string is similar to the Synchstring.',
          ),
        ),
        rhythm_version: v.pipe(
          v.number(),
          v.description('A version number for the Rhythmstring used in the rhythmstring field.'),
          v.metadata({ examples: [1] }),
        ),
      }),
    ),
    bars: v.pipe(
      v.array(TimeIntervalObjectSchema),
      v.description(
        'The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.',
      ),
    ),
    beats: v.pipe(
      v.array(TimeIntervalObjectSchema),
      v.description(
        'The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.',
      ),
    ),
    sections: v.pipe(
      v.array(SectionObjectSchema),
      v.description(
        'Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.',
      ),
    ),
    segments: v.pipe(
      v.array(SegmentObjectSchema),
      v.description('Each segment contains a roughly conisistent sound throughout its duration.'),
    ),
    tatums: v.pipe(
      v.array(TimeIntervalObjectSchema),
      v.description(
        'A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).',
      ),
    ),
  }),
)

export type AudioAnalysisObjectSchema = v.InferOutput<typeof AudioAnalysisObjectSchema>

export const AudioFeaturesObjectSchema = v.partial(
  v.object({
    acousticness: v.pipe(
      v.pipe(
        v.number(),
        v.minValue(-3.4028234663852886e38),
        v.maxValue(3.4028234663852886e38),
        v.minValue(0),
        v.maxValue(1),
      ),
      v.description(
        'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
      ),
      v.metadata({ examples: [0.00242] }),
    ),
    analysis_url: v.pipe(
      v.string(),
      v.description(
        'A URL to access the full audio analysis of this track. An access token is required to access this data.\n',
      ),
      v.metadata({
        examples: ['https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n'],
      }),
    ),
    danceability: v.pipe(
      v.pipe(v.number(), v.minValue(-3.4028234663852886e38), v.maxValue(3.4028234663852886e38)),
      v.description(
        'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
      ),
      v.metadata({ examples: [0.585] }),
    ),
    duration_ms: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The duration of the track in milliseconds.\n'),
      v.metadata({ examples: [237040] }),
    ),
    energy: v.pipe(
      v.pipe(v.number(), v.minValue(-3.4028234663852886e38), v.maxValue(3.4028234663852886e38)),
      v.description(
        'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
      ),
      v.metadata({ examples: [0.842] }),
    ),
    id: v.pipe(
      v.string(),
      v.description('The Spotify ID for the track.\n'),
      v.metadata({ examples: ['2takcwOaAZWiXQijPHIx7B'] }),
    ),
    instrumentalness: v.pipe(
      v.pipe(v.number(), v.minValue(-3.4028234663852886e38), v.maxValue(3.4028234663852886e38)),
      v.description(
        'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
      ),
      v.metadata({ examples: [0.00686] }),
    ),
    key: KeySchema,
    liveness: v.pipe(
      v.pipe(v.number(), v.minValue(-3.4028234663852886e38), v.maxValue(3.4028234663852886e38)),
      v.description(
        'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
      ),
      v.metadata({ examples: [0.0866] }),
    ),
    loudness: LoudnessSchema,
    mode: ModeSchema,
    speechiness: v.pipe(
      v.pipe(v.number(), v.minValue(-3.4028234663852886e38), v.maxValue(3.4028234663852886e38)),
      v.description(
        'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
      ),
      v.metadata({ examples: [0.0556] }),
    ),
    tempo: TempoSchema,
    time_signature: TimeSignatureSchema,
    track_href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the track.\n'),
      v.metadata({ examples: ['https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n'] }),
    ),
    type: v.pipe(v.literal('audio_features'), v.description('The object type.\n')),
    uri: v.pipe(
      v.string(),
      v.description('The Spotify URI for the track.\n'),
      v.metadata({ examples: ['spotify:track:2takcwOaAZWiXQijPHIx7B'] }),
    ),
    valence: v.pipe(
      v.pipe(
        v.number(),
        v.minValue(-3.4028234663852886e38),
        v.maxValue(3.4028234663852886e38),
        v.minValue(0),
        v.maxValue(1),
      ),
      v.description(
        'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
      ),
      v.metadata({ examples: [0.428] }),
    ),
  }),
)

export type AudioFeaturesObjectSchema = v.InferOutput<typeof AudioFeaturesObjectSchema>

export const SimplifiedTrackObjectSchema = v.partial(
  v.object({
    artists: v.pipe(
      v.array(SimplifiedArtistObjectSchema),
      v.description(
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',
      ),
    ),
    available_markets: v.pipe(
      v.array(v.string()),
      v.description(
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      ),
      v.metadata({ deprecated: true }),
    ),
    disc_number: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The disc number (usually `1` unless the album consists of more than one disc).',
      ),
    ),
    duration_ms: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The track length in milliseconds.'),
    ),
    explicit: v.pipe(
      v.boolean(),
      v.description(
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).',
      ),
    ),
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('External URLs for this track.\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the track.'),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
      ),
    ),
    is_playable: v.pipe(
      v.boolean(),
      v.description(
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
      ),
    ),
    linked_from: v.pipe(
      LinkedTrackObjectSchema,
      v.description(
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track.',
      ),
      v.metadata({ deprecated: true }),
    ),
    restrictions: v.pipe(
      TrackRestrictionObjectSchema,
      v.description('Included in the response when a content restriction is applied.\n'),
    ),
    name: v.pipe(v.string(), v.description('The name of the track.')),
    preview_url: v.pipe(
      v.nullable(v.string()),
      v.description('A URL to a 30 second preview (MP3 format) of the track.\n'),
      v.metadata({ deprecated: true }),
    ),
    track_number: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
      ),
    ),
    type: v.pipe(v.string(), v.description('The object type: "track".\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
      ),
    ),
    is_local: v.pipe(
      v.boolean(),
      v.description('Whether or not the track is from a local file.\n'),
    ),
  }),
)

export type SimplifiedTrackObjectSchema = v.InferOutput<typeof SimplifiedTrackObjectSchema>

export const CursorObjectSchema = v.partial(
  v.object({
    after: v.pipe(
      v.string(),
      v.description('The cursor to use as key to find the next page of items.'),
    ),
    before: v.pipe(
      v.string(),
      v.description('The cursor to use as key to find the previous page of items.'),
    ),
  }),
)

export type CursorObjectSchema = v.InferOutput<typeof CursorObjectSchema>

export const CursorPagingObjectSchema = v.partial(
  v.object({
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint returning the full result of the request.'),
    ),
    limit: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The maximum number of items in the response (as set in the query or by default).',
      ),
    ),
    next: v.pipe(v.string(), v.description('URL to the next page of items. ( `null` if none)')),
    cursors: v.pipe(
      CursorObjectSchema,
      v.description('The cursors used to find the next set of items.'),
    ),
    total: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The total number of items available to return.'),
    ),
  }),
)

export type CursorPagingObjectSchema = v.InferOutput<typeof CursorPagingObjectSchema>

export const CursorPagingPlayHistoryObjectSchema = v.intersect([
  CursorPagingObjectSchema,
  v.partial(v.object({ items: v.array(PlayHistoryObjectSchema) })),
])

export type CursorPagingPlayHistoryObjectSchema = v.InferOutput<
  typeof CursorPagingPlayHistoryObjectSchema
>

export const CursorPagingSimplifiedArtistObjectSchema = v.intersect([
  CursorPagingObjectSchema,
  v.partial(v.object({ items: v.array(ArtistObjectSchema) })),
])

export type CursorPagingSimplifiedArtistObjectSchema = v.InferOutput<
  typeof CursorPagingSimplifiedArtistObjectSchema
>

export const PagingObjectSchema = v.pipe(
  v.looseObject({
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint returning the full result of the request\n'),
      v.metadata({ examples: ['https://api.spotify.com/v1/me/shows?offset=0&limit=20\n'] }),
    ),
    limit: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The maximum number of items in the response (as set in the query or by default).\n',
      ),
      v.metadata({ examples: [20] }),
    ),
    next: v.pipe(
      v.nullable(v.string()),
      v.description('URL to the next page of items. ( `null` if none)\n'),
      v.metadata({ examples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'] }),
    ),
    offset: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The offset of the items returned (as set in the query or by default)\n'),
      v.metadata({ examples: [0] }),
    ),
    previous: v.pipe(
      v.nullable(v.string()),
      v.description('URL to the previous page of items. ( `null` if none)\n'),
      v.metadata({ examples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'] }),
    ),
    total: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The total number of items available to return.\n'),
      v.metadata({ examples: [4] }),
    ),
  }),
  v.check((input) => ['items'].every((key) => key in input)),
)

export type PagingObjectSchema = v.InferOutput<typeof PagingObjectSchema>

export const PlaylistOwnerObjectSchema = v.intersect([
  PlaylistUserObjectSchema,
  v.partial(
    v.object({
      display_name: v.pipe(
        v.nullable(v.string()),
        v.description("The name displayed on the user's profile. `null` if not available.\n"),
      ),
    }),
  ),
])

export type PlaylistOwnerObjectSchema = v.InferOutput<typeof PlaylistOwnerObjectSchema>

export const PlaylistTracksRefObjectSchema = v.partial(
  v.object({
    href: v.pipe(
      v.string(),
      v.description(
        "A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n",
      ),
    ),
    total: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('Number of tracks in the playlist.\n'),
    ),
  }),
)

export type PlaylistTracksRefObjectSchema = v.InferOutput<typeof PlaylistTracksRefObjectSchema>

export const SimplifiedPlaylistObjectSchema = v.partial(
  v.object({
    collaborative: v.pipe(
      v.boolean(),
      v.description('`true` if the owner allows other users to modify the playlist.\n'),
    ),
    description: v.pipe(
      v.string(),
      v.description(
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
      ),
    ),
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known external URLs for this playlist.\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the playlist.\n'),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
      ),
    ),
    images: v.pipe(
      v.array(ImageObjectSchema),
      v.description(
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
      ),
    ),
    name: v.pipe(v.string(), v.description('The name of the playlist.\n')),
    owner: v.pipe(PlaylistOwnerObjectSchema, v.description('The user who owns the playlist\n')),
    public: v.pipe(
      v.boolean(),
      v.description(
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
      ),
    ),
    snapshot_id: v.pipe(
      v.string(),
      v.description(
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
      ),
    ),
    items: v.pipe(
      PlaylistTracksRefObjectSchema,
      v.description(
        "A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's items can be retrieved, along with the `total` number of items in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
      ),
    ),
    tracks: v.pipe(
      PlaylistTracksRefObjectSchema,
      v.description(
        "**Deprecated:** Use `items` instead. A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
      ),
      v.metadata({ deprecated: true }),
    ),
    type: v.pipe(v.string(), v.description('The object type: "playlist"\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
      ),
    ),
  }),
)

export type SimplifiedPlaylistObjectSchema = v.InferOutput<typeof SimplifiedPlaylistObjectSchema>

export const PagingPlaylistObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SimplifiedPlaylistObjectSchema) })),
])

export type PagingPlaylistObjectSchema = v.InferOutput<typeof PagingPlaylistObjectSchema>

export const PagingFeaturedPlaylistObjectSchema = v.partial(
  v.object({
    message: v.pipe(
      v.string(),
      v.description('The localized message of a playlist.\n'),
      v.metadata({ examples: ['Popular Playlists'] }),
    ),
    playlists: PagingPlaylistObjectSchema,
  }),
)

export type PagingFeaturedPlaylistObjectSchema = v.InferOutput<
  typeof PagingFeaturedPlaylistObjectSchema
>

export const ArtistDiscographyAlbumObjectSchema = v.intersect([
  SimplifiedAlbumObjectSchema,
  v.object({
    album_group: v.pipe(
      v.picklist(['album', 'single', 'compilation', 'appears_on']),
      v.description('This field describes the relationship between the artist and the album.\n'),
      v.metadata({ examples: ['compilation'], deprecated: true }),
    ),
  }),
])

export type ArtistDiscographyAlbumObjectSchema = v.InferOutput<
  typeof ArtistDiscographyAlbumObjectSchema
>

export const PagingArtistDiscographyAlbumObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(ArtistDiscographyAlbumObjectSchema) })),
])

export type PagingArtistDiscographyAlbumObjectSchema = v.InferOutput<
  typeof PagingArtistDiscographyAlbumObjectSchema
>

export const PagingSimplifiedAlbumObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SimplifiedAlbumObjectSchema) })),
])

export type PagingSimplifiedAlbumObjectSchema = v.InferOutput<
  typeof PagingSimplifiedAlbumObjectSchema
>

export const PagingSimplifiedTrackObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SimplifiedTrackObjectSchema) })),
])

export type PagingSimplifiedTrackObjectSchema = v.InferOutput<
  typeof PagingSimplifiedTrackObjectSchema
>

export const AlbumObjectSchema = v.intersect([
  AlbumBaseSchema,
  v.partial(
    v.object({
      artists: v.pipe(
        v.array(SimplifiedArtistObjectSchema),
        v.description(
          'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
        ),
      ),
      tracks: v.pipe(
        PagingSimplifiedTrackObjectSchema,
        v.description('The tracks of the album.\n'),
      ),
      copyrights: v.pipe(
        v.array(CopyrightObjectSchema),
        v.description('The copyright statements of the album.\n'),
      ),
      external_ids: v.pipe(
        ExternalIdObjectSchema,
        v.description('Known external IDs for the album.\n'),
      ),
      genres: v.pipe(
        v.array(v.string()),
        v.description('**Deprecated** The array is always empty.\n'),
        v.metadata({ examples: [[]], deprecated: true }),
      ),
      label: v.pipe(
        v.string(),
        v.description('The label associated with the album.\n'),
        v.metadata({ deprecated: true }),
      ),
      popularity: v.pipe(
        v.pipe(v.number(), v.integer()),
        v.description(
          'The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.\n',
        ),
        v.metadata({ deprecated: true }),
      ),
    }),
  ),
])

export type AlbumObjectSchema = v.InferOutput<typeof AlbumObjectSchema>

export const SavedAlbumObjectSchema = v.partial(
  v.object({
    added_at: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'The date and time the album was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
      ),
    ),
    album: v.pipe(AlbumObjectSchema, v.description('Information about the album.')),
  }),
)

export type SavedAlbumObjectSchema = v.InferOutput<typeof SavedAlbumObjectSchema>

export const PagingSavedAlbumObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SavedAlbumObjectSchema) })),
])

export type PagingSavedAlbumObjectSchema = v.InferOutput<typeof PagingSavedAlbumObjectSchema>

export const SavedTrackObjectSchema = v.partial(
  v.object({
    added_at: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'The date and time the track was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
      ),
    ),
    track: v.pipe(TrackObjectSchema, v.description('Information about the track.')),
  }),
)

export type SavedTrackObjectSchema = v.InferOutput<typeof SavedTrackObjectSchema>

export const PagingSavedTrackObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SavedTrackObjectSchema) })),
])

export type PagingSavedTrackObjectSchema = v.InferOutput<typeof PagingSavedTrackObjectSchema>

export const PagingTrackObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(TrackObjectSchema) })),
])

export type PagingTrackObjectSchema = v.InferOutput<typeof PagingTrackObjectSchema>

export const PagingPlaylistTrackObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(PlaylistTrackObjectSchema) })),
])

export type PagingPlaylistTrackObjectSchema = v.InferOutput<typeof PagingPlaylistTrackObjectSchema>

export const PagingSimplifiedShowObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SimplifiedShowObjectSchema) })),
])

export type PagingSimplifiedShowObjectSchema = v.InferOutput<
  typeof PagingSimplifiedShowObjectSchema
>

export const SavedShowObjectSchema = v.partial(
  v.object({
    added_at: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'The date and time the show was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
      ),
    ),
    show: v.pipe(SimplifiedShowObjectSchema, v.description('Information about the show.')),
  }),
)

export type SavedShowObjectSchema = v.InferOutput<typeof SavedShowObjectSchema>

export const PagingSavedShowObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SavedShowObjectSchema) })),
])

export type PagingSavedShowObjectSchema = v.InferOutput<typeof PagingSavedShowObjectSchema>

export const SimplifiedEpisodeObjectSchema = EpisodeBaseSchema

export type SimplifiedEpisodeObjectSchema = v.InferOutput<typeof SimplifiedEpisodeObjectSchema>

export const PagingSimplifiedEpisodeObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SimplifiedEpisodeObjectSchema) })),
])

export type PagingSimplifiedEpisodeObjectSchema = v.InferOutput<
  typeof PagingSimplifiedEpisodeObjectSchema
>

export const SavedEpisodeObjectSchema = v.partial(
  v.object({
    added_at: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'The date and time the episode was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\n',
      ),
    ),
    episode: v.pipe(EpisodeObjectSchema, v.description('Information about the episode.')),
  }),
)

export type SavedEpisodeObjectSchema = v.InferOutput<typeof SavedEpisodeObjectSchema>

export const PagingSavedEpisodeObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SavedEpisodeObjectSchema) })),
])

export type PagingSavedEpisodeObjectSchema = v.InferOutput<typeof PagingSavedEpisodeObjectSchema>

export const AuthorObjectSchema = v.partial(
  v.object({ name: v.pipe(v.string(), v.description('The name of the author.\n')) }),
)

export type AuthorObjectSchema = v.InferOutput<typeof AuthorObjectSchema>

export const NarratorObjectSchema = v.partial(
  v.object({ name: v.pipe(v.string(), v.description('The name of the Narrator.\n')) }),
)

export type NarratorObjectSchema = v.InferOutput<typeof NarratorObjectSchema>

export const AudiobookBaseSchema = v.object({
  authors: v.pipe(v.array(AuthorObjectSchema), v.description('The author(s) for the audiobook.\n')),
  available_markets: v.pipe(
    v.array(v.string()),
    v.description(
      'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    ),
    v.metadata({ deprecated: true }),
  ),
  copyrights: v.pipe(
    v.array(CopyrightObjectSchema),
    v.description('The copyright statements of the audiobook.\n'),
  ),
  description: v.pipe(
    v.string(),
    v.description(
      'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    ),
  ),
  html_description: v.pipe(
    v.string(),
    v.description('A description of the audiobook. This field may contain HTML tags.\n'),
  ),
  edition: v.optional(
    v.pipe(
      v.string(),
      v.description('The edition of the audiobook.\n'),
      v.metadata({ examples: ['Unabridged'] }),
    ),
  ),
  explicit: v.pipe(
    v.boolean(),
    v.description(
      'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    ),
  ),
  external_urls: v.pipe(
    ExternalUrlObjectSchema,
    v.description('External URLs for this audiobook.\n'),
  ),
  href: v.pipe(
    v.string(),
    v.description('A link to the Web API endpoint providing full details of the audiobook.\n'),
  ),
  id: v.pipe(
    v.string(),
    v.description(
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
    ),
  ),
  images: v.pipe(
    v.array(ImageObjectSchema),
    v.description('The cover art for the audiobook in various sizes, widest first.\n'),
  ),
  languages: v.pipe(
    v.array(v.string()),
    v.description(
      'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    ),
  ),
  media_type: v.pipe(v.string(), v.description('The media type of the audiobook.\n')),
  name: v.pipe(v.string(), v.description('The name of the audiobook.\n')),
  narrators: v.pipe(
    v.array(NarratorObjectSchema),
    v.description('The narrator(s) for the audiobook.\n'),
  ),
  publisher: v.pipe(
    v.string(),
    v.description('The publisher of the audiobook.\n'),
    v.metadata({ deprecated: true }),
  ),
  type: v.pipe(v.literal('audiobook'), v.description('The object type.\n')),
  uri: v.pipe(
    v.string(),
    v.description(
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
    ),
  ),
  total_chapters: v.pipe(
    v.pipe(v.number(), v.integer()),
    v.description('The number of chapters in this audiobook.\n'),
  ),
})

export type AudiobookBaseSchema = v.InferOutput<typeof AudiobookBaseSchema>

export const SimplifiedAudiobookObjectSchema = AudiobookBaseSchema

export type SimplifiedAudiobookObjectSchema = v.InferOutput<typeof SimplifiedAudiobookObjectSchema>

export const PagingSimplifiedAudiobookObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SimplifiedAudiobookObjectSchema) })),
])

export type PagingSimplifiedAudiobookObjectSchema = v.InferOutput<
  typeof PagingSimplifiedAudiobookObjectSchema
>

export const PagingArtistObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(ArtistObjectSchema) })),
])

export type PagingArtistObjectSchema = v.InferOutput<typeof PagingArtistObjectSchema>

export const ChapterBaseSchema = v.object({
  audio_preview_url: v.pipe(
    v.nullable(v.string()),
    v.description(
      'A URL to a 30 second preview (MP3 format) of the chapter. `null` if not available.\n',
    ),
    v.metadata({
      examples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
      deprecated: true,
    }),
  ),
  available_markets: v.optional(
    v.pipe(
      v.array(v.string()),
      v.description(
        'A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      ),
      v.metadata({ deprecated: true }),
    ),
  ),
  chapter_number: v.pipe(
    v.pipe(v.number(), v.integer()),
    v.description('The number of the chapter\n'),
    v.metadata({ examples: [1] }),
  ),
  description: v.pipe(
    v.string(),
    v.description(
      'A description of the chapter. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    ),
    v.metadata({
      examples: [
        'We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.\n',
      ],
    }),
  ),
  html_description: v.pipe(
    v.string(),
    v.description('A description of the chapter. This field may contain HTML tags.\n'),
    v.metadata({
      examples: [
        '<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>\n',
      ],
    }),
  ),
  duration_ms: v.pipe(
    v.pipe(v.number(), v.integer()),
    v.description('The chapter length in milliseconds.\n'),
    v.metadata({ examples: [1686230] }),
  ),
  explicit: v.pipe(
    v.boolean(),
    v.description(
      'Whether or not the chapter has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    ),
  ),
  external_urls: v.pipe(
    ExternalUrlObjectSchema,
    v.description('External URLs for this chapter.\n'),
  ),
  href: v.pipe(
    v.string(),
    v.description('A link to the Web API endpoint providing full details of the chapter.\n'),
    v.metadata({ examples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'] }),
  ),
  id: v.pipe(
    v.string(),
    v.description(
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
    ),
    v.metadata({ examples: ['5Xt5DXGzch68nYYamXrNxZ'] }),
  ),
  images: v.pipe(
    v.array(ImageObjectSchema),
    v.description('The cover art for the chapter in various sizes, widest first.\n'),
  ),
  is_playable: v.pipe(
    v.boolean(),
    v.description('True if the chapter is playable in the given market. Otherwise false.\n'),
  ),
  languages: v.pipe(
    v.array(v.string()),
    v.description(
      'A list of the languages used in the chapter, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    ),
    v.metadata({ examples: [['fr', 'en']] }),
  ),
  name: v.pipe(
    v.string(),
    v.description('The name of the chapter.\n'),
    v.metadata({
      examples: ['Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n'],
    }),
  ),
  release_date: v.pipe(
    v.string(),
    v.description(
      'The date the chapter was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
    ),
    v.metadata({ examples: ['1981-12-15'] }),
  ),
  release_date_precision: v.pipe(
    v.picklist(['year', 'month', 'day']),
    v.description('The precision with which `release_date` value is known.\n'),
    v.metadata({ examples: ['day'] }),
  ),
  resume_point: v.optional(
    v.pipe(
      ResumePointObjectSchema,
      v.description(
        "The user's most recent position in the chapter. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
      ),
    ),
  ),
  type: v.pipe(v.literal('episode'), v.description('The object type.\n')),
  uri: v.pipe(
    v.string(),
    v.description(
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
    ),
    v.metadata({ examples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'] }),
  ),
  restrictions: v.optional(
    v.pipe(
      ChapterRestrictionObjectSchema,
      v.description('Included in the response when a content restriction is applied.\n'),
    ),
  ),
})

export type ChapterBaseSchema = v.InferOutput<typeof ChapterBaseSchema>

export const SimplifiedChapterObjectSchema = ChapterBaseSchema

export type SimplifiedChapterObjectSchema = v.InferOutput<typeof SimplifiedChapterObjectSchema>

export const PagingSimplifiedChapterObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SimplifiedChapterObjectSchema) })),
])

export type PagingSimplifiedChapterObjectSchema = v.InferOutput<
  typeof PagingSimplifiedChapterObjectSchema
>

export const RecommendationSeedObjectSchema = v.partial(
  v.object({
    afterFilteringSize: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description(
        'The number of tracks available after min\\_\\* and max\\_\\* filters have been applied.\n',
      ),
    ),
    afterRelinkingSize: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The number of tracks available after relinking for regional availability.\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description(
        'A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`.\n',
      ),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.\n',
      ),
    ),
    initialPoolSize: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('The number of recommended tracks available for this seed.\n'),
    ),
    type: v.pipe(
      v.string(),
      v.description('The entity type of this seed. One of `artist`, `track` or `genre`.\n'),
    ),
  }),
)

export type RecommendationSeedObjectSchema = v.InferOutput<typeof RecommendationSeedObjectSchema>

export const RecommendationsObjectSchema = v.object({
  seeds: v.pipe(
    v.array(RecommendationSeedObjectSchema),
    v.description('An array of recommendation seed objects.\n'),
  ),
  tracks: v.pipe(
    v.array(TrackObjectSchema),
    v.description('An array of track objects ordered according to the parameters supplied.\n'),
  ),
})

export type RecommendationsObjectSchema = v.InferOutput<typeof RecommendationsObjectSchema>

export const PlaylistObjectSchema = v.partial(
  v.object({
    collaborative: v.pipe(
      v.boolean(),
      v.description('`true` if the owner allows other users to modify the playlist.\n'),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
      ),
    ),
    external_urls: v.pipe(
      ExternalUrlObjectSchema,
      v.description('Known external URLs for this playlist.\n'),
    ),
    href: v.pipe(
      v.string(),
      v.description('A link to the Web API endpoint providing full details of the playlist.\n'),
    ),
    id: v.pipe(
      v.string(),
      v.description(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
      ),
    ),
    images: v.pipe(
      v.array(ImageObjectSchema),
      v.description(
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
      ),
    ),
    name: v.pipe(v.string(), v.description('The name of the playlist.\n')),
    owner: v.pipe(PlaylistOwnerObjectSchema, v.description('The user who owns the playlist\n')),
    public: v.pipe(
      v.boolean(),
      v.description(
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
      ),
    ),
    snapshot_id: v.pipe(
      v.string(),
      v.description(
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
      ),
    ),
    items: v.pipe(
      PagingPlaylistTrackObjectSchema,
      v.description(
        'The items of the playlist. _**Note**: This field is only available for playlists owned by the current user or playlists the user is a collaborator of._\n',
      ),
    ),
    tracks: v.pipe(
      PagingPlaylistTrackObjectSchema,
      v.description('**Deprecated:** Use `items` instead. The tracks of the playlist.\n'),
      v.metadata({ deprecated: true }),
    ),
    type: v.pipe(v.string(), v.description('The object type: "playlist"\n')),
    uri: v.pipe(
      v.string(),
      v.description(
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
      ),
    ),
    followers: v.pipe(
      FollowersObjectSchema,
      v.description('Information about the followers of the playlist.'),
    ),
  }),
)

export type PlaylistObjectSchema = v.InferOutput<typeof PlaylistObjectSchema>

export const CategoryObjectSchema = v.object({
  href: v.pipe(
    v.string(),
    v.description('A link to the Web API endpoint returning full details of the category.\n'),
  ),
  icons: v.pipe(
    v.array(ImageObjectSchema),
    v.description('The category icon, in various sizes.\n'),
  ),
  id: v.pipe(
    v.string(),
    v.description(
      'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\n',
    ),
    v.metadata({ examples: ['equal'] }),
  ),
  name: v.pipe(
    v.string(),
    v.description('The name of the category.\n'),
    v.metadata({ examples: ['EQUAL'] }),
  ),
})

export type CategoryObjectSchema = v.InferOutput<typeof CategoryObjectSchema>

export const ShowObjectSchema = v.intersect([
  ShowBaseSchema,
  v.object({
    episodes: v.pipe(
      PagingSimplifiedEpisodeObjectSchema,
      v.description('The episodes of the show.\n'),
    ),
  }),
])

export type ShowObjectSchema = v.InferOutput<typeof ShowObjectSchema>

export const AudiobookObjectSchema = v.intersect([
  AudiobookBaseSchema,
  v.object({
    chapters: v.pipe(
      PagingSimplifiedChapterObjectSchema,
      v.description('The chapters of the audiobook.\n'),
    ),
  }),
])

export type AudiobookObjectSchema = v.InferOutput<typeof AudiobookObjectSchema>

export const ChapterObjectSchema = v.intersect([
  ChapterBaseSchema,
  v.object({
    audiobook: v.pipe(
      SimplifiedAudiobookObjectSchema,
      v.description('The audiobook for which the chapter belongs.\n'),
    ),
  }),
])

export type ChapterObjectSchema = v.InferOutput<typeof ChapterObjectSchema>

export const CurrentlyPlayingObjectSchema = v.partial(
  v.object({
    context: v.pipe(ContextObjectSchema, v.description('A Context Object. Can be `null`.')),
    timestamp: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description('Unix Millisecond Timestamp when data was fetched'),
    ),
    progress_ms: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('Progress into the currently playing track or episode. Can be `null`.'),
    ),
    is_playing: v.pipe(
      v.boolean(),
      v.description('If something is currently playing, return `true`.'),
    ),
    item: v.pipe(
      v.union([
        v.intersect([TrackObjectSchema, v.object({ type: v.literal('TrackObject') })]),
        v.intersect([EpisodeObjectSchema, v.object({ type: v.literal('EpisodeObject') })]),
      ]),
      v.description('The currently playing track or episode. Can be `null`.'),
    ),
    currently_playing_type: v.pipe(
      v.string(),
      v.description(
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
      ),
    ),
    actions: v.pipe(
      DisallowsObjectSchema,
      v.description(
        'Allows to update the user interface based on which playback actions are available within the current context.\n',
      ),
    ),
  }),
)

export type CurrentlyPlayingObjectSchema = v.InferOutput<typeof CurrentlyPlayingObjectSchema>

export const SavedAudiobookObjectSchema = v.partial(
  v.object({
    added_at: v.pipe(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
      v.description(
        'The date and time the audiobook was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
      ),
    ),
    audiobook: v.pipe(AudiobookObjectSchema, v.description('Information about the audiobook.')),
  }),
)

export type SavedAudiobookObjectSchema = v.InferOutput<typeof SavedAudiobookObjectSchema>

export const PagingSavedAudiobookObjectSchema = v.intersect([
  PagingObjectSchema,
  v.partial(v.object({ items: v.array(SavedAudiobookObjectSchema) })),
])

export type PagingSavedAudiobookObjectSchema = v.InferOutput<
  typeof PagingSavedAudiobookObjectSchema
>
