import { Schema } from 'effect'

export const ExternalUrlObjectSchema = Schema.Struct({
  spotify: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\n',
    }),
  ),
})

export type ExternalUrlObjectSchema = Schema.Schema.Type<typeof ExternalUrlObjectSchema>

export const LinkedTrackObjectSchema = Schema.Struct({
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'Known external URLs for this track.\n' }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  type: Schema.optional(Schema.String.annotate({ description: 'The object type: "track".\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
})

export type LinkedTrackObjectSchema = Schema.Schema.Type<typeof LinkedTrackObjectSchema>

export const TrackRestrictionObjectSchema = Schema.Struct({
  reason: Schema.optional(
    Schema.String.annotate({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export type TrackRestrictionObjectSchema = Schema.Schema.Type<typeof TrackRestrictionObjectSchema>

export const AlbumRestrictionObjectSchema = Schema.Struct({
  reason: Schema.optional(
    Schema.Literals(['market', 'product', 'explicit']).annotate({
      description:
        "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n",
    }),
  ),
})

export type AlbumRestrictionObjectSchema = Schema.Schema.Type<typeof AlbumRestrictionObjectSchema>

export const EpisodeRestrictionObjectSchema = Schema.Struct({
  reason: Schema.optional(
    Schema.String.annotate({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export type EpisodeRestrictionObjectSchema = Schema.Schema.Type<
  typeof EpisodeRestrictionObjectSchema
>

export const ChapterRestrictionObjectSchema = Schema.Struct({
  reason: Schema.optional(
    Schema.String.annotate({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n- `payment_required` - Payment is required to play the content item.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  ),
})

export type ChapterRestrictionObjectSchema = Schema.Schema.Type<
  typeof ChapterRestrictionObjectSchema
>

export const FollowersObjectSchema = Schema.Struct({
  href: Schema.optional(
    Schema.NullOr(Schema.String).annotate({
      description:
        'This will always be set to null, as the Web API does not support it at the moment.\n',
    }),
  ),
  total: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The total number of followers.\n',
    }),
  ),
})

export type FollowersObjectSchema = Schema.Schema.Type<typeof FollowersObjectSchema>

export const ImageObjectSchema = Schema.Struct({
  url: Schema.String.annotate({
    description: 'The source URL of the image.\n',
    jsonSchemaExamples: ['https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n'],
  }),
  height: Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
    description: 'The image height in pixels.\n',
    jsonSchemaExamples: [300],
  }),
  width: Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
    description: 'The image width in pixels.\n',
    jsonSchemaExamples: [300],
  }),
})

export type ImageObjectSchema = Schema.Schema.Type<typeof ImageObjectSchema>

export const ArtistObjectSchema = Schema.Struct({
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'Known external URLs for this artist.\n' }),
  ),
  followers: Schema.optional(
    FollowersObjectSchema.annotate({
      description: 'Information about the followers of the artist.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  genres: Schema.optional(
    Schema.Array(Schema.String).annotate({
      description:
        'A list of the genres the artist is associated with. If not yet classified, the array is empty.\n',
      jsonSchemaExamples: [['Prog rock', 'Grunge']],
      jsonSchemaDeprecated: true,
    }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
  images: Schema.optional(
    Schema.Array(ImageObjectSchema).annotate({
      description: 'Images of the artist in various sizes, widest first.\n',
    }),
  ),
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the artist.\n' })),
  popularity: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        "The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n",
      jsonSchemaDeprecated: true,
    }),
  ),
  type: Schema.optional(Schema.Literal('artist').annotate({ description: 'The object type.\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
})

export type ArtistObjectSchema = Schema.Schema.Type<typeof ArtistObjectSchema>

export const SimplifiedArtistObjectSchema = Schema.Struct({
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'Known external URLs for this artist.\n' }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the artist.\n' })),
  type: Schema.optional(Schema.Literal('artist').annotate({ description: 'The object type.\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  ),
})

export type SimplifiedArtistObjectSchema = Schema.Schema.Type<typeof SimplifiedArtistObjectSchema>

export const AlbumBaseSchema = Schema.Struct({
  album_type: Schema.Literals(['album', 'single', 'compilation']).annotate({
    description: 'The type of the album.\n',
    jsonSchemaExamples: ['compilation'],
  }),
  total_tracks: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The number of tracks in the album.',
    jsonSchemaExamples: [9],
  }),
  available_markets: Schema.Array(Schema.String).annotate({
    description:
      'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n',
    jsonSchemaExamples: [['CA', 'BR', 'IT']],
    jsonSchemaDeprecated: true,
  }),
  external_urls: ExternalUrlObjectSchema.annotate({
    description: 'Known external URLs for this album.\n',
  }),
  href: Schema.String.annotate({
    description: 'A link to the Web API endpoint providing full details of the album.\n',
  }),
  id: Schema.String.annotate({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
    jsonSchemaExamples: ['2up3OPMp9Tb4dAKM2erWXQ'],
  }),
  images: Schema.Array(ImageObjectSchema).annotate({
    description: 'The cover art for the album in various sizes, widest first.\n',
  }),
  name: Schema.String.annotate({
    description:
      'The name of the album. In case of an album takedown, the value may be an empty string.\n',
  }),
  release_date: Schema.String.annotate({
    description: 'The date the album was first released.\n',
    jsonSchemaExamples: ['1981-12'],
  }),
  release_date_precision: Schema.Literals(['year', 'month', 'day']).annotate({
    description: 'The precision with which `release_date` value is known.\n',
    jsonSchemaExamples: ['year'],
  }),
  restrictions: Schema.optional(
    AlbumRestrictionObjectSchema.annotate({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
  ),
  type: Schema.Literal('album').annotate({ description: 'The object type.\n' }),
  uri: Schema.String.annotate({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
    jsonSchemaExamples: ['spotify:album:2up3OPMp9Tb4dAKM2erWXQ'],
  }),
})

export type AlbumBaseSchema = Schema.Schema.Type<typeof AlbumBaseSchema>

export const SimplifiedAlbumObjectSchema = AlbumBaseSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        artists: Schema.Array(SimplifiedArtistObjectSchema).annotate({
          description:
            'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
        }),
      }),
    )(input),
  ),
)

export type SimplifiedAlbumObjectSchema = Schema.Schema.Type<typeof SimplifiedAlbumObjectSchema>

export const ExternalIdObjectSchema = Schema.Struct({
  isrc: Schema.optional(
    Schema.String.annotate({
      description:
        '[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n',
    }),
  ),
  ean: Schema.optional(
    Schema.String.annotate({
      description:
        '[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n',
    }),
  ),
  upc: Schema.optional(
    Schema.String.annotate({
      description:
        '[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n',
    }),
  ),
})

export type ExternalIdObjectSchema = Schema.Schema.Type<typeof ExternalIdObjectSchema>

export const TrackObjectSchema = Schema.Struct({
  album: Schema.optional(
    SimplifiedAlbumObjectSchema.annotate({
      description:
        'The album on which the track appears. The album object includes a link in `href` to full information about the album.\n',
    }),
  ),
  artists: Schema.optional(
    Schema.Array(SimplifiedArtistObjectSchema).annotate({
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    }),
  ),
  available_markets: Schema.optional(
    Schema.Array(Schema.String).annotate({
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  disc_number: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        'The disc number (usually `1` unless the album consists of more than one disc).\n',
    }),
  ),
  duration_ms: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The track length in milliseconds.\n',
    }),
  ),
  explicit: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n',
    }),
  ),
  external_ids: Schema.optional(
    ExternalIdObjectSchema.annotate({ description: 'Known external IDs for the track.\n' }),
  ),
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'Known external URLs for this track.\n' }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_playable: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
  ),
  linked_from: Schema.optional(
    LinkedTrackObjectSchema.annotate({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track.',
      jsonSchemaDeprecated: true,
    }),
  ),
  restrictions: Schema.optional(
    TrackRestrictionObjectSchema.annotate({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
  ),
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the track.\n' })),
  popularity: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  preview_url: Schema.optional(
    Schema.NullOr(Schema.String).annotate({
      description: 'A link to a 30 second preview (MP3 format) of the track. Can be `null`\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  track_number: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
  ),
  type: Schema.optional(
    Schema.Literal('track').annotate({ description: 'The object type: "track".\n' }),
  ),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_local: Schema.optional(
    Schema.Boolean.annotate({ description: 'Whether or not the track is from a local file.\n' }),
  ),
})

export type TrackObjectSchema = Schema.Schema.Type<typeof TrackObjectSchema>

export const ContextObjectSchema = Schema.Struct({
  type: Schema.optional(
    Schema.String.annotate({
      description: 'The object type, e.g. "artist", "playlist", "album", "show".\n',
    }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
  ),
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'External URLs for this context.' }),
  ),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.\n',
    }),
  ),
})

export type ContextObjectSchema = Schema.Schema.Type<typeof ContextObjectSchema>

export const PlayHistoryObjectSchema = Schema.Struct({
  track: Schema.optional(
    TrackObjectSchema.annotate({ description: 'The track the user listened to.' }),
  ),
  played_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({ description: 'The date and time the track was played.' }),
  ),
  context: Schema.optional(
    ContextObjectSchema.annotate({ description: 'The context the track was played from.' }),
  ),
})

export type PlayHistoryObjectSchema = Schema.Schema.Type<typeof PlayHistoryObjectSchema>

export const PlaylistUserObjectSchema = Schema.Struct({
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({
      description: 'Known public external URLs for this user.\n',
    }),
  ),
  href: Schema.optional(
    Schema.String.annotate({ description: 'A link to the Web API endpoint for this user.\n' }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
  type: Schema.optional(Schema.Literal('user').annotate({ description: 'The object type.\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
})

export type PlaylistUserObjectSchema = Schema.Schema.Type<typeof PlaylistUserObjectSchema>

export const ResumePointObjectSchema = Schema.Struct({
  fully_played: Schema.optional(
    Schema.Boolean.annotate({
      description: 'Whether or not the episode has been fully played by the user.\n',
    }),
  ),
  resume_position_ms: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: "The user's most recent position in the episode in milliseconds.\n",
    }),
  ),
})

export type ResumePointObjectSchema = Schema.Schema.Type<typeof ResumePointObjectSchema>

export const EpisodeBaseSchema = Schema.Struct({
  audio_preview_url: Schema.NullOr(Schema.String).annotate({
    description:
      'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
    jsonSchemaExamples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
    jsonSchemaDeprecated: true,
  }),
  description: Schema.String.annotate({
    description:
      'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    jsonSchemaExamples: [
      'A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n',
    ],
  }),
  html_description: Schema.String.annotate({
    description: 'A description of the episode. This field may contain HTML tags.\n',
    jsonSchemaExamples: [
      '<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n',
    ],
  }),
  duration_ms: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The episode length in milliseconds.\n',
    jsonSchemaExamples: [1686230],
  }),
  explicit: Schema.Boolean.annotate({
    description:
      'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema.annotate({
    description: 'External URLs for this episode.\n',
  }),
  href: Schema.String.annotate({
    description: 'A link to the Web API endpoint providing full details of the episode.\n',
    jsonSchemaExamples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'],
  }),
  id: Schema.String.annotate({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
    jsonSchemaExamples: ['5Xt5DXGzch68nYYamXrNxZ'],
  }),
  images: Schema.Array(ImageObjectSchema).annotate({
    description: 'The cover art for the episode in various sizes, widest first.\n',
  }),
  is_externally_hosted: Schema.Boolean.annotate({
    description: "True if the episode is hosted outside of Spotify's CDN.\n",
  }),
  is_playable: Schema.Boolean.annotate({
    description: 'True if the episode is playable in the given market. Otherwise false.\n',
  }),
  language: Schema.optional(
    Schema.String.annotate({
      description:
        'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n',
      jsonSchemaExamples: ['en'],
      jsonSchemaDeprecated: true,
    }),
  ),
  languages: Schema.Array(Schema.String).annotate({
    description:
      'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    jsonSchemaExamples: [['fr', 'en']],
  }),
  name: Schema.String.annotate({
    description: 'The name of the episode.\n',
    jsonSchemaExamples: [
      'Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n',
    ],
  }),
  release_date: Schema.String.annotate({
    description:
      'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
    jsonSchemaExamples: ['1981-12-15'],
  }),
  release_date_precision: Schema.Literals(['year', 'month', 'day']).annotate({
    description: 'The precision with which `release_date` value is known.\n',
    jsonSchemaExamples: ['day'],
  }),
  resume_point: Schema.optional(
    ResumePointObjectSchema.annotate({
      description:
        "The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
    }),
  ),
  type: Schema.Literal('episode').annotate({ description: 'The object type.\n' }),
  uri: Schema.String.annotate({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
    jsonSchemaExamples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'],
  }),
  restrictions: Schema.optional(
    EpisodeRestrictionObjectSchema.annotate({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
  ),
})

export type EpisodeBaseSchema = Schema.Schema.Type<typeof EpisodeBaseSchema>

export const CopyrightObjectSchema = Schema.Struct({
  text: Schema.optional(
    Schema.String.annotate({ description: 'The copyright text for this content.\n' }),
  ),
  type: Schema.optional(
    Schema.String.annotate({
      description:
        'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n',
    }),
  ),
})

export type CopyrightObjectSchema = Schema.Schema.Type<typeof CopyrightObjectSchema>

export const ShowBaseSchema = Schema.Struct({
  available_markets: Schema.Array(Schema.String).annotate({
    description:
      'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    jsonSchemaDeprecated: true,
  }),
  copyrights: Schema.Array(CopyrightObjectSchema).annotate({
    description: 'The copyright statements of the show.\n',
  }),
  description: Schema.String.annotate({
    description:
      'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: Schema.String.annotate({
    description: 'A description of the show. This field may contain HTML tags.\n',
  }),
  explicit: Schema.Boolean.annotate({
    description:
      'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema.annotate({
    description: 'External URLs for this show.\n',
  }),
  href: Schema.String.annotate({
    description: 'A link to the Web API endpoint providing full details of the show.\n',
  }),
  id: Schema.String.annotate({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  }),
  images: Schema.Array(ImageObjectSchema).annotate({
    description: 'The cover art for the show in various sizes, widest first.\n',
  }),
  is_externally_hosted: Schema.Boolean.annotate({
    description:
      "True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n",
  }),
  languages: Schema.Array(Schema.String).annotate({
    description:
      'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  media_type: Schema.String.annotate({ description: 'The media type of the show.\n' }),
  name: Schema.String.annotate({ description: 'The name of the episode.\n' }),
  publisher: Schema.String.annotate({
    description: 'The publisher of the show.\n',
    jsonSchemaDeprecated: true,
  }),
  type: Schema.Literal('show').annotate({ description: 'The object type.\n' }),
  uri: Schema.String.annotate({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  }),
  total_episodes: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The total number of episodes in the show.\n',
  }),
})

export type ShowBaseSchema = Schema.Schema.Type<typeof ShowBaseSchema>

export const SimplifiedShowObjectSchema = ShowBaseSchema

export type SimplifiedShowObjectSchema = Schema.Schema.Type<typeof SimplifiedShowObjectSchema>

export const EpisodeObjectSchema = EpisodeBaseSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        show: SimplifiedShowObjectSchema.annotate({
          description: 'The show on which the episode belongs.\n',
        }),
      }),
    )(input),
  ),
)

export type EpisodeObjectSchema = Schema.Schema.Type<typeof EpisodeObjectSchema>

export const PlaylistTrackObjectSchema = Schema.Struct({
  added_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._\n',
    }),
  ),
  added_by: Schema.optional(
    PlaylistUserObjectSchema.annotate({
      description:
        'The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._\n',
    }),
  ),
  is_local: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.\n',
    }),
  ),
  item: Schema.optional(
    Schema.Union([TrackObjectSchema, EpisodeObjectSchema]).annotate({
      description: 'Information about the track or episode.',
    }),
  ),
  track: Schema.optional(
    Schema.Union([TrackObjectSchema, EpisodeObjectSchema]).annotate({
      description: '**Deprecated:** Use `item` instead. Information about the track or episode.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
})

export type PlaylistTrackObjectSchema = Schema.Schema.Type<typeof PlaylistTrackObjectSchema>

export const QueueObjectSchema = Schema.Struct({
  currently_playing: Schema.optional(
    Schema.Union([TrackObjectSchema, EpisodeObjectSchema]).annotate({
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  queue: Schema.optional(
    Schema.Array(Schema.Union([TrackObjectSchema, EpisodeObjectSchema])).annotate({
      description: 'The tracks or episodes in the queue. Can be empty.',
    }),
  ),
})

export type QueueObjectSchema = Schema.Schema.Type<typeof QueueObjectSchema>

export const DeviceObjectSchema = Schema.Struct({
  id: Schema.optional(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.',
    }),
  ),
  is_active: Schema.optional(
    Schema.Boolean.annotate({ description: 'If this device is the currently active device.' }),
  ),
  is_private_session: Schema.optional(
    Schema.Boolean.annotate({ description: 'If this device is currently in a private session.' }),
  ),
  is_restricted: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.',
    }),
  ),
  name: Schema.optional(
    Schema.String.annotate({
      description:
        'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\"Loudest speaker\\") and some devices have a generic name associated with the manufacturer or device model.',
      jsonSchemaExamples: ['Kitchen speaker'],
    }),
  ),
  type: Schema.optional(
    Schema.String.annotate({
      description: 'Device type, such as "computer", "smartphone" or "speaker".',
      jsonSchemaExamples: ['computer'],
    }),
  ),
  volume_percent: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(100),
      ),
    ).annotate({ description: 'The current volume in percent.', jsonSchemaExamples: [59] }),
  ),
  supports_volume: Schema.optional(
    Schema.Boolean.annotate({ description: 'If this device can be used to set the volume.' }),
  ),
})

export type DeviceObjectSchema = Schema.Schema.Type<typeof DeviceObjectSchema>

export const DisallowsObjectSchema = Schema.Struct({
  interrupting_playback: Schema.optional(
    Schema.Boolean.annotate({ description: 'Interrupting playback. Optional field.' }),
  ),
  pausing: Schema.optional(Schema.Boolean.annotate({ description: 'Pausing. Optional field.' })),
  resuming: Schema.optional(Schema.Boolean.annotate({ description: 'Resuming. Optional field.' })),
  seeking: Schema.optional(
    Schema.Boolean.annotate({ description: 'Seeking playback location. Optional field.' }),
  ),
  skipping_next: Schema.optional(
    Schema.Boolean.annotate({ description: 'Skipping to the next context. Optional field.' }),
  ),
  skipping_prev: Schema.optional(
    Schema.Boolean.annotate({ description: 'Skipping to the previous context. Optional field.' }),
  ),
  toggling_repeat_context: Schema.optional(
    Schema.Boolean.annotate({ description: 'Toggling repeat context flag. Optional field.' }),
  ),
  toggling_shuffle: Schema.optional(
    Schema.Boolean.annotate({ description: 'Toggling shuffle flag. Optional field.' }),
  ),
  toggling_repeat_track: Schema.optional(
    Schema.Boolean.annotate({ description: 'Toggling repeat track flag. Optional field.' }),
  ),
  transferring_playback: Schema.optional(
    Schema.Boolean.annotate({
      description: 'Transfering playback between devices. Optional field.',
    }),
  ),
})

export type DisallowsObjectSchema = Schema.Schema.Type<typeof DisallowsObjectSchema>

export const CurrentlyPlayingContextObjectSchema = Schema.Struct({
  device: Schema.optional(
    DeviceObjectSchema.annotate({ description: 'The device that is currently active.\n' }),
  ),
  repeat_state: Schema.optional(Schema.String.annotate({ description: 'off, track, context' })),
  shuffle_state: Schema.optional(
    Schema.Boolean.annotate({ description: 'If shuffle is on or off.' }),
  ),
  context: Schema.optional(
    ContextObjectSchema.annotate({ description: 'A Context Object. Can be `null`.' }),
  ),
  timestamp: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.).',
      }),
  ),
  progress_ms: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
  ),
  is_playing: Schema.optional(
    Schema.Boolean.annotate({ description: 'If something is currently playing, return `true`.' }),
  ),
  item: Schema.optional(
    Schema.Union([TrackObjectSchema, EpisodeObjectSchema]).annotate({
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  currently_playing_type: Schema.optional(
    Schema.String.annotate({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
  ),
  actions: Schema.optional(
    DisallowsObjectSchema.annotate({
      description:
        'Allows to update the user interface based on which playback actions are available within the current context.\n',
    }),
  ),
})

export type CurrentlyPlayingContextObjectSchema = Schema.Schema.Type<
  typeof CurrentlyPlayingContextObjectSchema
>

export const ErrorObjectSchema = Schema.Struct({
  status: Schema.Number.check(
    Schema.isInt(),
    Schema.isGreaterThanOrEqualTo(400),
    Schema.isLessThanOrEqualTo(599),
  ).annotate({
    description:
      'The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).\n',
  }),
  message: Schema.String.annotate({
    description: 'A short description of the cause of the error.\n',
  }),
})

export type ErrorObjectSchema = Schema.Schema.Type<typeof ErrorObjectSchema>

export const ExplicitContentSettingsObjectSchema = Schema.Struct({
  filter_enabled: Schema.optional(
    Schema.Boolean.annotate({
      description: 'When `true`, indicates that explicit content should not be played.\n',
    }),
  ),
  filter_locked: Schema.optional(
    Schema.Boolean.annotate({
      description:
        "When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n",
    }),
  ),
})

export type ExplicitContentSettingsObjectSchema = Schema.Schema.Type<
  typeof ExplicitContentSettingsObjectSchema
>

export const PrivateUserObjectSchema = Schema.Struct({
  account_id: Schema.optional(
    Schema.String.annotate({
      description:
        "A public, immutable, pseudoanonymous identifier for the user's account. Use this field for account linking rather than the `id` field, as it is stable and will not change over the lifetime of the account.\n",
      jsonSchemaExamples: ['aB3dE5fG7h'],
    }),
  ),
  country: Schema.optional(
    Schema.String.annotate({
      description:
        "The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      jsonSchemaDeprecated: true,
    }),
  ),
  display_name: Schema.optional(
    Schema.String.annotate({
      description: "The name displayed on the user's profile. `null` if not available.\n",
    }),
  ),
  email: Schema.optional(
    Schema.String.annotate({
      description:
        "The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      jsonSchemaDeprecated: true,
    }),
  ),
  explicit_content: Schema.optional(
    ExplicitContentSettingsObjectSchema.annotate({
      description:
        "The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      jsonSchemaDeprecated: true,
    }),
  ),
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'Known external URLs for this user.' }),
  ),
  followers: Schema.optional(
    FollowersObjectSchema.annotate({
      description: 'Information about the followers of the user.',
      jsonSchemaDeprecated: true,
    }),
  ),
  href: Schema.optional(
    Schema.String.annotate({ description: 'A link to the Web API endpoint for this user.\n' }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. Do not use this field for account linking — use `account_id` instead, which is immutable.\n',
    }),
  ),
  images: Schema.optional(
    Schema.Array(ImageObjectSchema).annotate({ description: "The user's profile image." }),
  ),
  product: Schema.optional(
    Schema.String.annotate({
      description:
        'The user\'s Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  type: Schema.optional(Schema.String.annotate({ description: 'The object type: "user"\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
    }),
  ),
})

export type PrivateUserObjectSchema = Schema.Schema.Type<typeof PrivateUserObjectSchema>

export const PublicUserObjectSchema = Schema.Struct({
  display_name: Schema.optional(
    Schema.NullOr(Schema.String).annotate({
      description: "The name displayed on the user's profile. `null` if not available.\n",
    }),
  ),
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({
      description: 'Known public external URLs for this user.\n',
    }),
  ),
  followers: Schema.optional(
    FollowersObjectSchema.annotate({
      description: 'Information about the followers of this user.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  href: Schema.optional(
    Schema.String.annotate({ description: 'A link to the Web API endpoint for this user.\n' }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
  images: Schema.optional(
    Schema.Array(ImageObjectSchema).annotate({ description: "The user's profile image.\n" }),
  ),
  type: Schema.optional(Schema.Literal('user').annotate({ description: 'The object type.\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  ),
})

export type PublicUserObjectSchema = Schema.Schema.Type<typeof PublicUserObjectSchema>

export const LoudnessSchema = Schema.Number.check(
  Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
).annotate({
  description:
    'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n',
  jsonSchemaExamples: [-5.883],
})

export type LoudnessSchema = Schema.Schema.Type<typeof LoudnessSchema>

export const TempoSchema = Schema.Number.check(
  Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
).annotate({
  description:
    'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n',
  jsonSchemaExamples: [118.211],
})

export type TempoSchema = Schema.Schema.Type<typeof TempoSchema>

export const TimeSignatureSchema = Schema.Number.check(
  Schema.isInt(),
  Schema.isGreaterThanOrEqualTo(3),
  Schema.isLessThanOrEqualTo(7),
).annotate({
  description:
    'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
  jsonSchemaExamples: [4],
})

export type TimeSignatureSchema = Schema.Schema.Type<typeof TimeSignatureSchema>

export const KeySchema = Schema.Number.check(
  Schema.isInt(),
  Schema.isGreaterThanOrEqualTo(-1),
  Schema.isLessThanOrEqualTo(11),
).annotate({
  description:
    'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n',
  jsonSchemaExamples: [9],
})

export type KeySchema = Schema.Schema.Type<typeof KeySchema>

export const ModeSchema = Schema.Number.check(Schema.isInt()).annotate({
  description:
    'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n',
  jsonSchemaExamples: [0],
})

export type ModeSchema = Schema.Schema.Type<typeof ModeSchema>

export const TimeIntervalObjectSchema = Schema.Struct({
  start: Schema.optional(
    Schema.Number.annotate({
      description: 'The starting point (in seconds) of the time interval.',
      jsonSchemaExamples: [0.49567],
    }),
  ),
  duration: Schema.optional(
    Schema.Number.annotate({
      description: 'The duration (in seconds) of the time interval.',
      jsonSchemaExamples: [2.18749],
    }),
  ),
  confidence: Schema.optional(
    Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)).annotate({
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the interval.',
      jsonSchemaExamples: [0.925],
    }),
  ),
})

export type TimeIntervalObjectSchema = Schema.Schema.Type<typeof TimeIntervalObjectSchema>

export const SectionObjectSchema = Schema.Struct({
  start: Schema.optional(
    Schema.Number.annotate({
      description: 'The starting point (in seconds) of the section.',
      jsonSchemaExamples: [0],
    }),
  ),
  duration: Schema.optional(
    Schema.Number.annotate({
      description: 'The duration (in seconds) of the section.',
      jsonSchemaExamples: [6.97092],
    }),
  ),
  confidence: Schema.optional(
    Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)).annotate({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the section\'s "designation".',
      jsonSchemaExamples: [1],
    }),
  ),
  loudness: Schema.optional(
    Schema.Number.annotate({
      description:
        'The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.',
      jsonSchemaExamples: [-14.938],
    }),
  ),
  tempo: Schema.optional(
    Schema.Number.annotate({
      description:
        'The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
      jsonSchemaExamples: [113.178],
    }),
  ),
  tempo_confidence: Schema.optional(
    Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)).annotate({
      description:
        "The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.",
      jsonSchemaExamples: [0.647],
    }),
  ),
  key: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        'The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.',
      jsonSchemaExamples: [9],
    }),
  ),
  key_confidence: Schema.optional(
    Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)).annotate({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.',
      jsonSchemaExamples: [0.297],
    }),
  ),
  mode: Schema.optional(
    Schema.Literals([-1, 0, 1]).annotate({
      description:
        'Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.',
    }),
  ),
  mode_confidence: Schema.optional(
    Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)).annotate({
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
      jsonSchemaExamples: [0.471],
    }),
  ),
  time_signature: Schema.optional(TimeSignatureSchema),
  time_signature_confidence: Schema.optional(
    Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)).annotate({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.',
      jsonSchemaExamples: [1],
    }),
  ),
})

export type SectionObjectSchema = Schema.Schema.Type<typeof SectionObjectSchema>

export const SegmentObjectSchema = Schema.Struct({
  start: Schema.optional(
    Schema.Number.annotate({
      description: 'The starting point (in seconds) of the segment.',
      jsonSchemaExamples: [0.70154],
    }),
  ),
  duration: Schema.optional(
    Schema.Number.annotate({
      description: 'The duration (in seconds) of the segment.',
      jsonSchemaExamples: [0.19891],
    }),
  ),
  confidence: Schema.optional(
    Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)).annotate({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.\n',
      jsonSchemaExamples: [0.435],
    }),
  ),
  loudness_start: Schema.optional(
    Schema.Number.annotate({
      description:
        'The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      jsonSchemaExamples: [-23.053],
    }),
  ),
  loudness_max: Schema.optional(
    Schema.Number.annotate({
      description:
        'The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      jsonSchemaExamples: [-14.25],
    }),
  ),
  loudness_max_time: Schema.optional(
    Schema.Number.annotate({
      description:
        'The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.',
      jsonSchemaExamples: [0.07305],
    }),
  ),
  loudness_end: Schema.optional(
    Schema.Number.annotate({
      description:
        'The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.',
      jsonSchemaExamples: [0],
    }),
  ),
  pitches: Schema.optional(
    Schema.Array(
      Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)),
    ).annotate({
      description:
        'Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).\n\nVectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.\nAs can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.\n![pitch vector](/assets/audio/Pitch_vector.png)\n',
      jsonSchemaExamples: [[0.212, 0.141, 0.294]],
    }),
  ),
  timbre: Schema.optional(
    Schema.Array(Schema.Number).annotate({
      description:
        'Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n\nFor completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).\n![timbre basis functions](/assets/audio/Timbre_basis_functions.png)\n\nThe actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.\n',
      jsonSchemaExamples: [[42.115, 64.373, -0.233]],
    }),
  ),
})

export type SegmentObjectSchema = Schema.Schema.Type<typeof SegmentObjectSchema>

export const AudioAnalysisObjectSchema = Schema.Struct({
  meta: Schema.optional(
    Schema.Struct({
      analyzer_version: Schema.optional(
        Schema.String.annotate({
          description: 'The version of the Analyzer used to analyze this track.',
          jsonSchemaExamples: ['4.0.0'],
        }),
      ),
      platform: Schema.optional(
        Schema.String.annotate({
          description: "The platform used to read the track's audio data.",
          jsonSchemaExamples: ['Linux'],
        }),
      ),
      detailed_status: Schema.optional(
        Schema.String.annotate({
          description:
            'A detailed status code for this track. If analysis data is missing, this code may explain why.',
          jsonSchemaExamples: ['OK'],
        }),
      ),
      status_code: Schema.optional(
        Schema.Number.check(Schema.isInt()).annotate({
          description:
            'The return code of the analyzer process. 0 if successful, 1 if any errors occurred.',
          jsonSchemaExamples: [0],
        }),
      ),
      timestamp: Schema.optional(
        Schema.Union([
          Schema.BigInt,
          Schema.Number.check(Schema.isInt()),
          Schema.String.check(Schema.isPattern(/^-?\d+$/)),
        ])
          .pipe(
            Schema.decodeTo(
              Schema.BigInt,
              SchemaTransformation.transform({
                decode: (input) => BigInt(input),
                encode: (output) => output,
              }),
            ),
          )
          .check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          )
          .annotate({
            description: 'The Unix timestamp (in seconds) at which this track was analyzed.',
            jsonSchemaExamples: [1495193577],
          }),
      ),
      analysis_time: Schema.optional(
        Schema.Number.annotate({
          description: 'The amount of time taken to analyze this track.',
          jsonSchemaExamples: [6.93906],
        }),
      ),
      input_process: Schema.optional(
        Schema.String.annotate({
          description: "The method used to read the track's audio data.",
          jsonSchemaExamples: ['libvorbisfile L+R 44100->22050'],
        }),
      ),
    }),
  ),
  track: Schema.optional(
    Schema.Struct({
      num_samples: Schema.optional(
        Schema.Number.check(Schema.isInt()).annotate({
          description:
            'The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.',
          jsonSchemaExamples: [4585515],
        }),
      ),
      duration: Schema.optional(
        Schema.Number.annotate({
          description: 'Length of the track in seconds.',
          jsonSchemaExamples: [207.95985],
        }),
      ),
      sample_md5: Schema.optional(
        Schema.String.annotate({ description: 'This field will always contain the empty string.' }),
      ),
      offset_seconds: Schema.optional(
        Schema.Number.check(Schema.isInt()).annotate({
          description:
            'An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)',
          jsonSchemaExamples: [0],
        }),
      ),
      window_seconds: Schema.optional(
        Schema.Number.check(Schema.isInt()).annotate({
          description:
            'The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)',
          jsonSchemaExamples: [0],
        }),
      ),
      analysis_sample_rate: Schema.optional(
        Schema.Number.check(Schema.isInt()).annotate({
          description:
            'The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.',
          jsonSchemaExamples: [22050],
        }),
      ),
      analysis_channels: Schema.optional(
        Schema.Number.check(Schema.isInt()).annotate({
          description:
            'The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.',
          jsonSchemaExamples: [1],
        }),
      ),
      end_of_fade_in: Schema.optional(
        Schema.Number.annotate({
          description:
            "The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.",
          jsonSchemaExamples: [0],
        }),
      ),
      start_of_fade_out: Schema.optional(
        Schema.Number.annotate({
          description:
            "The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.",
          jsonSchemaExamples: [201.13705],
        }),
      ),
      loudness: Schema.optional(LoudnessSchema),
      tempo: Schema.optional(TempoSchema),
      tempo_confidence: Schema.optional(
        Schema.Number.check(
          Schema.isGreaterThanOrEqualTo(0),
          Schema.isLessThanOrEqualTo(1),
        ).annotate({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.',
          jsonSchemaExamples: [0.73],
        }),
      ),
      time_signature: Schema.optional(TimeSignatureSchema),
      time_signature_confidence: Schema.optional(
        Schema.Number.check(
          Schema.isGreaterThanOrEqualTo(0),
          Schema.isLessThanOrEqualTo(1),
        ).annotate({
          description:
            'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.',
          jsonSchemaExamples: [0.994],
        }),
      ),
      key: Schema.optional(KeySchema),
      key_confidence: Schema.optional(
        Schema.Number.check(
          Schema.isGreaterThanOrEqualTo(0),
          Schema.isLessThanOrEqualTo(1),
        ).annotate({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `key`.',
          jsonSchemaExamples: [0.408],
        }),
      ),
      mode: Schema.optional(ModeSchema),
      mode_confidence: Schema.optional(
        Schema.Number.check(
          Schema.isGreaterThanOrEqualTo(0),
          Schema.isLessThanOrEqualTo(1),
        ).annotate({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
          jsonSchemaExamples: [0.485],
        }),
      ),
      codestring: Schema.optional(
        Schema.String.annotate({
          description:
            'An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.',
        }),
      ),
      code_version: Schema.optional(
        Schema.Number.annotate({
          description:
            'A version number for the Echo Nest Musical Fingerprint format used in the codestring field.',
          jsonSchemaExamples: [3.15],
        }),
      ),
      echoprintstring: Schema.optional(
        Schema.String.annotate({
          description:
            'An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.',
        }),
      ),
      echoprint_version: Schema.optional(
        Schema.Number.annotate({
          description:
            'A version number for the EchoPrint format used in the echoprintstring field.',
          jsonSchemaExamples: [4.15],
        }),
      ),
      synchstring: Schema.optional(
        Schema.String.annotate({
          description: 'A [Synchstring](https://github.com/echonest/synchdata) for this track.',
        }),
      ),
      synch_version: Schema.optional(
        Schema.Number.annotate({
          description: 'A version number for the Synchstring used in the synchstring field.',
          jsonSchemaExamples: [1],
        }),
      ),
      rhythmstring: Schema.optional(
        Schema.String.annotate({
          description:
            'A Rhythmstring for this track. The format of this string is similar to the Synchstring.',
        }),
      ),
      rhythm_version: Schema.optional(
        Schema.Number.annotate({
          description: 'A version number for the Rhythmstring used in the rhythmstring field.',
          jsonSchemaExamples: [1],
        }),
      ),
    }),
  ),
  bars: Schema.optional(
    Schema.Array(TimeIntervalObjectSchema).annotate({
      description:
        'The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.',
    }),
  ),
  beats: Schema.optional(
    Schema.Array(TimeIntervalObjectSchema).annotate({
      description:
        'The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.',
    }),
  ),
  sections: Schema.optional(
    Schema.Array(SectionObjectSchema).annotate({
      description:
        'Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.',
    }),
  ),
  segments: Schema.optional(
    Schema.Array(SegmentObjectSchema).annotate({
      description: 'Each segment contains a roughly conisistent sound throughout its duration.',
    }),
  ),
  tatums: Schema.optional(
    Schema.Array(TimeIntervalObjectSchema).annotate({
      description:
        'A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).',
    }),
  ),
})

export type AudioAnalysisObjectSchema = Schema.Schema.Type<typeof AudioAnalysisObjectSchema>

export const AudioFeaturesObjectSchema = Schema.Struct({
  acousticness: Schema.optional(
    Schema.Number.check(
      Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
      Schema.isGreaterThanOrEqualTo(0),
      Schema.isLessThanOrEqualTo(1),
    ).annotate({
      description:
        'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
      jsonSchemaExamples: [0.00242],
    }),
  ),
  analysis_url: Schema.optional(
    Schema.String.annotate({
      description:
        'A URL to access the full audio analysis of this track. An access token is required to access this data.\n',
      jsonSchemaExamples: ['https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n'],
    }),
  ),
  danceability: Schema.optional(
    Schema.Number.check(
      Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
    ).annotate({
      description:
        'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
      jsonSchemaExamples: [0.585],
    }),
  ),
  duration_ms: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The duration of the track in milliseconds.\n',
      jsonSchemaExamples: [237040],
    }),
  ),
  energy: Schema.optional(
    Schema.Number.check(
      Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
    ).annotate({
      description:
        'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
      jsonSchemaExamples: [0.842],
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description: 'The Spotify ID for the track.\n',
      jsonSchemaExamples: ['2takcwOaAZWiXQijPHIx7B'],
    }),
  ),
  instrumentalness: Schema.optional(
    Schema.Number.check(
      Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
    ).annotate({
      description:
        'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
      jsonSchemaExamples: [0.00686],
    }),
  ),
  key: Schema.optional(KeySchema),
  liveness: Schema.optional(
    Schema.Number.check(
      Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
    ).annotate({
      description:
        'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
      jsonSchemaExamples: [0.0866],
    }),
  ),
  loudness: Schema.optional(LoudnessSchema),
  mode: Schema.optional(ModeSchema),
  speechiness: Schema.optional(
    Schema.Number.check(
      Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
    ).annotate({
      description:
        'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
      jsonSchemaExamples: [0.0556],
    }),
  ),
  tempo: Schema.optional(TempoSchema),
  time_signature: Schema.optional(TimeSignatureSchema),
  track_href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
      jsonSchemaExamples: ['https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n'],
    }),
  ),
  type: Schema.optional(
    Schema.Literal('audio_features').annotate({ description: 'The object type.\n' }),
  ),
  uri: Schema.optional(
    Schema.String.annotate({
      description: 'The Spotify URI for the track.\n',
      jsonSchemaExamples: ['spotify:track:2takcwOaAZWiXQijPHIx7B'],
    }),
  ),
  valence: Schema.optional(
    Schema.Number.check(
      Schema.isBetween({ minimum: -3.4028234663852886e38, maximum: 3.4028234663852886e38 }),
      Schema.isGreaterThanOrEqualTo(0),
      Schema.isLessThanOrEqualTo(1),
    ).annotate({
      description:
        'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
      jsonSchemaExamples: [0.428],
    }),
  ),
})

export type AudioFeaturesObjectSchema = Schema.Schema.Type<typeof AudioFeaturesObjectSchema>

export const SimplifiedTrackObjectSchema = Schema.Struct({
  artists: Schema.optional(
    Schema.Array(SimplifiedArtistObjectSchema).annotate({
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',
    }),
  ),
  available_markets: Schema.optional(
    Schema.Array(Schema.String).annotate({
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  disc_number: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The disc number (usually `1` unless the album consists of more than one disc).',
    }),
  ),
  duration_ms: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The track length in milliseconds.',
    }),
  ),
  explicit: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).',
    }),
  ),
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'External URLs for this track.\n' }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_playable: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
  ),
  linked_from: Schema.optional(
    LinkedTrackObjectSchema.annotate({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track.',
      jsonSchemaDeprecated: true,
    }),
  ),
  restrictions: Schema.optional(
    TrackRestrictionObjectSchema.annotate({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
  ),
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the track.' })),
  preview_url: Schema.optional(
    Schema.NullOr(Schema.String).annotate({
      description: 'A URL to a 30 second preview (MP3 format) of the track.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  track_number: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
  ),
  type: Schema.optional(Schema.String.annotate({ description: 'The object type: "track".\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  ),
  is_local: Schema.optional(
    Schema.Boolean.annotate({ description: 'Whether or not the track is from a local file.\n' }),
  ),
})

export type SimplifiedTrackObjectSchema = Schema.Schema.Type<typeof SimplifiedTrackObjectSchema>

export const CursorObjectSchema = Schema.Struct({
  after: Schema.optional(
    Schema.String.annotate({
      description: 'The cursor to use as key to find the next page of items.',
    }),
  ),
  before: Schema.optional(
    Schema.String.annotate({
      description: 'The cursor to use as key to find the previous page of items.',
    }),
  ),
})

export type CursorObjectSchema = Schema.Schema.Type<typeof CursorObjectSchema>

export const CursorPagingObjectSchema = Schema.Struct({
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint returning the full result of the request.',
    }),
  ),
  limit: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        'The maximum number of items in the response (as set in the query or by default).',
    }),
  ),
  next: Schema.optional(
    Schema.String.annotate({ description: 'URL to the next page of items. ( `null` if none)' }),
  ),
  cursors: Schema.optional(
    CursorObjectSchema.annotate({ description: 'The cursors used to find the next set of items.' }),
  ),
  total: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The total number of items available to return.',
    }),
  ),
})

export type CursorPagingObjectSchema = Schema.Schema.Type<typeof CursorPagingObjectSchema>

export const CursorPagingPlayHistoryObjectSchema = CursorPagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(PlayHistoryObjectSchema)) }))(
      input,
    ),
  ),
)

export type CursorPagingPlayHistoryObjectSchema = Schema.Schema.Type<
  typeof CursorPagingPlayHistoryObjectSchema
>

export const CursorPagingSimplifiedArtistObjectSchema = CursorPagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(ArtistObjectSchema)) }))(input),
  ),
)

export type CursorPagingSimplifiedArtistObjectSchema = Schema.Schema.Type<
  typeof CursorPagingSimplifiedArtistObjectSchema
>

export const PagingObjectSchema = Schema.Struct({
  href: Schema.String.annotate({
    description: 'A link to the Web API endpoint returning the full result of the request\n',
    jsonSchemaExamples: ['https://api.spotify.com/v1/me/shows?offset=0&limit=20\n'],
  }),
  limit: Schema.Number.check(Schema.isInt()).annotate({
    description:
      'The maximum number of items in the response (as set in the query or by default).\n',
    jsonSchemaExamples: [20],
  }),
  next: Schema.NullOr(Schema.String).annotate({
    description: 'URL to the next page of items. ( `null` if none)\n',
    jsonSchemaExamples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'],
  }),
  offset: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The offset of the items returned (as set in the query or by default)\n',
    jsonSchemaExamples: [0],
  }),
  previous: Schema.NullOr(Schema.String).annotate({
    description: 'URL to the previous page of items. ( `null` if none)\n',
    jsonSchemaExamples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'],
  }),
  total: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The total number of items available to return.\n',
    jsonSchemaExamples: [4],
  }),
})

export type PagingObjectSchema = Schema.Schema.Type<typeof PagingObjectSchema>

export const PlaylistOwnerObjectSchema = PlaylistUserObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        display_name: Schema.optional(
          Schema.NullOr(Schema.String).annotate({
            description: "The name displayed on the user's profile. `null` if not available.\n",
          }),
        ),
      }),
    )(input),
  ),
)

export type PlaylistOwnerObjectSchema = Schema.Schema.Type<typeof PlaylistOwnerObjectSchema>

export const PlaylistTracksRefObjectSchema = Schema.Struct({
  href: Schema.optional(
    Schema.String.annotate({
      description:
        "A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n",
    }),
  ),
  total: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'Number of tracks in the playlist.\n',
    }),
  ),
})

export type PlaylistTracksRefObjectSchema = Schema.Schema.Type<typeof PlaylistTracksRefObjectSchema>

export const SimplifiedPlaylistObjectSchema = Schema.Struct({
  collaborative: Schema.optional(
    Schema.Boolean.annotate({
      description: '`true` if the owner allows other users to modify the playlist.\n',
    }),
  ),
  description: Schema.optional(
    Schema.String.annotate({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    }),
  ),
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'Known external URLs for this playlist.\n' }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  images: Schema.optional(
    Schema.Array(ImageObjectSchema).annotate({
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
  ),
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the playlist.\n' })),
  owner: Schema.optional(
    PlaylistOwnerObjectSchema.annotate({ description: 'The user who owns the playlist\n' }),
  ),
  public: Schema.optional(
    Schema.Boolean.annotate({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
  ),
  snapshot_id: Schema.optional(
    Schema.String.annotate({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
  ),
  items: Schema.optional(
    PlaylistTracksRefObjectSchema.annotate({
      description:
        "A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's items can be retrieved, along with the `total` number of items in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
    }),
  ),
  tracks: Schema.optional(
    PlaylistTracksRefObjectSchema.annotate({
      description:
        "**Deprecated:** Use `items` instead. A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
      jsonSchemaDeprecated: true,
    }),
  ),
  type: Schema.optional(Schema.String.annotate({ description: 'The object type: "playlist"\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
})

export type SimplifiedPlaylistObjectSchema = Schema.Schema.Type<
  typeof SimplifiedPlaylistObjectSchema
>

export const PagingPlaylistObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({ items: Schema.optional(Schema.Array(SimplifiedPlaylistObjectSchema)) }),
    )(input),
  ),
)

export type PagingPlaylistObjectSchema = Schema.Schema.Type<typeof PagingPlaylistObjectSchema>

export const PagingFeaturedPlaylistObjectSchema = Schema.Struct({
  message: Schema.optional(
    Schema.String.annotate({
      description: 'The localized message of a playlist.\n',
      jsonSchemaExamples: ['Popular Playlists'],
    }),
  ),
  playlists: Schema.optional(PagingPlaylistObjectSchema),
})

export type PagingFeaturedPlaylistObjectSchema = Schema.Schema.Type<
  typeof PagingFeaturedPlaylistObjectSchema
>

export const ArtistDiscographyAlbumObjectSchema = SimplifiedAlbumObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        album_group: Schema.Literals(['album', 'single', 'compilation', 'appears_on']).annotate({
          description: 'This field describes the relationship between the artist and the album.\n',
          jsonSchemaExamples: ['compilation'],
          jsonSchemaDeprecated: true,
        }),
      }),
    )(input),
  ),
)

export type ArtistDiscographyAlbumObjectSchema = Schema.Schema.Type<
  typeof ArtistDiscographyAlbumObjectSchema
>

export const PagingArtistDiscographyAlbumObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({ items: Schema.optional(Schema.Array(ArtistDiscographyAlbumObjectSchema)) }),
    )(input),
  ),
)

export type PagingArtistDiscographyAlbumObjectSchema = Schema.Schema.Type<
  typeof PagingArtistDiscographyAlbumObjectSchema
>

export const PagingSimplifiedAlbumObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SimplifiedAlbumObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSimplifiedAlbumObjectSchema = Schema.Schema.Type<
  typeof PagingSimplifiedAlbumObjectSchema
>

export const PagingSimplifiedTrackObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SimplifiedTrackObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSimplifiedTrackObjectSchema = Schema.Schema.Type<
  typeof PagingSimplifiedTrackObjectSchema
>

export const AlbumObjectSchema = AlbumBaseSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        artists: Schema.optional(
          Schema.Array(SimplifiedArtistObjectSchema).annotate({
            description:
              'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
          }),
        ),
        tracks: Schema.optional(
          PagingSimplifiedTrackObjectSchema.annotate({ description: 'The tracks of the album.\n' }),
        ),
        copyrights: Schema.optional(
          Schema.Array(CopyrightObjectSchema).annotate({
            description: 'The copyright statements of the album.\n',
          }),
        ),
        external_ids: Schema.optional(
          ExternalIdObjectSchema.annotate({ description: 'Known external IDs for the album.\n' }),
        ),
        genres: Schema.optional(
          Schema.Array(Schema.String).annotate({
            description: '**Deprecated** The array is always empty.\n',
            jsonSchemaExamples: [[]],
            jsonSchemaDeprecated: true,
          }),
        ),
        label: Schema.optional(
          Schema.String.annotate({
            description: 'The label associated with the album.\n',
            jsonSchemaDeprecated: true,
          }),
        ),
        popularity: Schema.optional(
          Schema.Number.check(Schema.isInt()).annotate({
            description:
              'The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.\n',
            jsonSchemaDeprecated: true,
          }),
        ),
      }),
    )(input),
  ),
)

export type AlbumObjectSchema = Schema.Schema.Type<typeof AlbumObjectSchema>

export const SavedAlbumObjectSchema = Schema.Struct({
  added_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'The date and time the album was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  album: Schema.optional(
    AlbumObjectSchema.annotate({ description: 'Information about the album.' }),
  ),
})

export type SavedAlbumObjectSchema = Schema.Schema.Type<typeof SavedAlbumObjectSchema>

export const PagingSavedAlbumObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SavedAlbumObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSavedAlbumObjectSchema = Schema.Schema.Type<typeof PagingSavedAlbumObjectSchema>

export const SavedTrackObjectSchema = Schema.Struct({
  added_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'The date and time the track was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  track: Schema.optional(
    TrackObjectSchema.annotate({ description: 'Information about the track.' }),
  ),
})

export type SavedTrackObjectSchema = Schema.Schema.Type<typeof SavedTrackObjectSchema>

export const PagingSavedTrackObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SavedTrackObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSavedTrackObjectSchema = Schema.Schema.Type<typeof PagingSavedTrackObjectSchema>

export const PagingTrackObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(TrackObjectSchema)) }))(input),
  ),
)

export type PagingTrackObjectSchema = Schema.Schema.Type<typeof PagingTrackObjectSchema>

export const PagingPlaylistTrackObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(PlaylistTrackObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingPlaylistTrackObjectSchema = Schema.Schema.Type<
  typeof PagingPlaylistTrackObjectSchema
>

export const PagingSimplifiedShowObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SimplifiedShowObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSimplifiedShowObjectSchema = Schema.Schema.Type<
  typeof PagingSimplifiedShowObjectSchema
>

export const SavedShowObjectSchema = Schema.Struct({
  added_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'The date and time the show was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  show: Schema.optional(
    SimplifiedShowObjectSchema.annotate({ description: 'Information about the show.' }),
  ),
})

export type SavedShowObjectSchema = Schema.Schema.Type<typeof SavedShowObjectSchema>

export const PagingSavedShowObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SavedShowObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSavedShowObjectSchema = Schema.Schema.Type<typeof PagingSavedShowObjectSchema>

export const SimplifiedEpisodeObjectSchema = EpisodeBaseSchema

export type SimplifiedEpisodeObjectSchema = Schema.Schema.Type<typeof SimplifiedEpisodeObjectSchema>

export const PagingSimplifiedEpisodeObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({ items: Schema.optional(Schema.Array(SimplifiedEpisodeObjectSchema)) }),
    )(input),
  ),
)

export type PagingSimplifiedEpisodeObjectSchema = Schema.Schema.Type<
  typeof PagingSimplifiedEpisodeObjectSchema
>

export const SavedEpisodeObjectSchema = Schema.Struct({
  added_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'The date and time the episode was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\n',
    }),
  ),
  episode: Schema.optional(
    EpisodeObjectSchema.annotate({ description: 'Information about the episode.' }),
  ),
})

export type SavedEpisodeObjectSchema = Schema.Schema.Type<typeof SavedEpisodeObjectSchema>

export const PagingSavedEpisodeObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SavedEpisodeObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSavedEpisodeObjectSchema = Schema.Schema.Type<
  typeof PagingSavedEpisodeObjectSchema
>

export const AuthorObjectSchema = Schema.Struct({
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the author.\n' })),
})

export type AuthorObjectSchema = Schema.Schema.Type<typeof AuthorObjectSchema>

export const NarratorObjectSchema = Schema.Struct({
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the Narrator.\n' })),
})

export type NarratorObjectSchema = Schema.Schema.Type<typeof NarratorObjectSchema>

export const AudiobookBaseSchema = Schema.Struct({
  authors: Schema.Array(AuthorObjectSchema).annotate({
    description: 'The author(s) for the audiobook.\n',
  }),
  available_markets: Schema.Array(Schema.String).annotate({
    description:
      'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    jsonSchemaDeprecated: true,
  }),
  copyrights: Schema.Array(CopyrightObjectSchema).annotate({
    description: 'The copyright statements of the audiobook.\n',
  }),
  description: Schema.String.annotate({
    description:
      'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  }),
  html_description: Schema.String.annotate({
    description: 'A description of the audiobook. This field may contain HTML tags.\n',
  }),
  edition: Schema.optional(
    Schema.String.annotate({
      description: 'The edition of the audiobook.\n',
      jsonSchemaExamples: ['Unabridged'],
    }),
  ),
  explicit: Schema.Boolean.annotate({
    description:
      'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema.annotate({
    description: 'External URLs for this audiobook.\n',
  }),
  href: Schema.String.annotate({
    description: 'A link to the Web API endpoint providing full details of the audiobook.\n',
  }),
  id: Schema.String.annotate({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  }),
  images: Schema.Array(ImageObjectSchema).annotate({
    description: 'The cover art for the audiobook in various sizes, widest first.\n',
  }),
  languages: Schema.Array(Schema.String).annotate({
    description:
      'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  }),
  media_type: Schema.String.annotate({ description: 'The media type of the audiobook.\n' }),
  name: Schema.String.annotate({ description: 'The name of the audiobook.\n' }),
  narrators: Schema.Array(NarratorObjectSchema).annotate({
    description: 'The narrator(s) for the audiobook.\n',
  }),
  publisher: Schema.String.annotate({
    description: 'The publisher of the audiobook.\n',
    jsonSchemaDeprecated: true,
  }),
  type: Schema.Literal('audiobook').annotate({ description: 'The object type.\n' }),
  uri: Schema.String.annotate({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  }),
  total_chapters: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The number of chapters in this audiobook.\n',
  }),
})

export type AudiobookBaseSchema = Schema.Schema.Type<typeof AudiobookBaseSchema>

export const SimplifiedAudiobookObjectSchema = AudiobookBaseSchema

export type SimplifiedAudiobookObjectSchema = Schema.Schema.Type<
  typeof SimplifiedAudiobookObjectSchema
>

export const PagingSimplifiedAudiobookObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({ items: Schema.optional(Schema.Array(SimplifiedAudiobookObjectSchema)) }),
    )(input),
  ),
)

export type PagingSimplifiedAudiobookObjectSchema = Schema.Schema.Type<
  typeof PagingSimplifiedAudiobookObjectSchema
>

export const PagingArtistObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(ArtistObjectSchema)) }))(input),
  ),
)

export type PagingArtistObjectSchema = Schema.Schema.Type<typeof PagingArtistObjectSchema>

export const ChapterBaseSchema = Schema.Struct({
  audio_preview_url: Schema.NullOr(Schema.String).annotate({
    description:
      'A URL to a 30 second preview (MP3 format) of the chapter. `null` if not available.\n',
    jsonSchemaExamples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
    jsonSchemaDeprecated: true,
  }),
  available_markets: Schema.optional(
    Schema.Array(Schema.String).annotate({
      description:
        'A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  chapter_number: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The number of the chapter\n',
    jsonSchemaExamples: [1],
  }),
  description: Schema.String.annotate({
    description:
      'A description of the chapter. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    jsonSchemaExamples: [
      'We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.\n',
    ],
  }),
  html_description: Schema.String.annotate({
    description: 'A description of the chapter. This field may contain HTML tags.\n',
    jsonSchemaExamples: [
      '<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>\n',
    ],
  }),
  duration_ms: Schema.Number.check(Schema.isInt()).annotate({
    description: 'The chapter length in milliseconds.\n',
    jsonSchemaExamples: [1686230],
  }),
  explicit: Schema.Boolean.annotate({
    description:
      'Whether or not the chapter has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  }),
  external_urls: ExternalUrlObjectSchema.annotate({
    description: 'External URLs for this chapter.\n',
  }),
  href: Schema.String.annotate({
    description: 'A link to the Web API endpoint providing full details of the chapter.\n',
    jsonSchemaExamples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'],
  }),
  id: Schema.String.annotate({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
    jsonSchemaExamples: ['5Xt5DXGzch68nYYamXrNxZ'],
  }),
  images: Schema.Array(ImageObjectSchema).annotate({
    description: 'The cover art for the chapter in various sizes, widest first.\n',
  }),
  is_playable: Schema.Boolean.annotate({
    description: 'True if the chapter is playable in the given market. Otherwise false.\n',
  }),
  languages: Schema.Array(Schema.String).annotate({
    description:
      'A list of the languages used in the chapter, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    jsonSchemaExamples: [['fr', 'en']],
  }),
  name: Schema.String.annotate({
    description: 'The name of the chapter.\n',
    jsonSchemaExamples: [
      'Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n',
    ],
  }),
  release_date: Schema.String.annotate({
    description:
      'The date the chapter was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
    jsonSchemaExamples: ['1981-12-15'],
  }),
  release_date_precision: Schema.Literals(['year', 'month', 'day']).annotate({
    description: 'The precision with which `release_date` value is known.\n',
    jsonSchemaExamples: ['day'],
  }),
  resume_point: Schema.optional(
    ResumePointObjectSchema.annotate({
      description:
        "The user's most recent position in the chapter. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
    }),
  ),
  type: Schema.Literal('episode').annotate({ description: 'The object type.\n' }),
  uri: Schema.String.annotate({
    description:
      'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
    jsonSchemaExamples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'],
  }),
  restrictions: Schema.optional(
    ChapterRestrictionObjectSchema.annotate({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
  ),
})

export type ChapterBaseSchema = Schema.Schema.Type<typeof ChapterBaseSchema>

export const SimplifiedChapterObjectSchema = ChapterBaseSchema

export type SimplifiedChapterObjectSchema = Schema.Schema.Type<typeof SimplifiedChapterObjectSchema>

export const PagingSimplifiedChapterObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({ items: Schema.optional(Schema.Array(SimplifiedChapterObjectSchema)) }),
    )(input),
  ),
)

export type PagingSimplifiedChapterObjectSchema = Schema.Schema.Type<
  typeof PagingSimplifiedChapterObjectSchema
>

export const RecommendationSeedObjectSchema = Schema.Struct({
  afterFilteringSize: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description:
        'The number of tracks available after min\\_\\* and max\\_\\* filters have been applied.\n',
    }),
  ),
  afterRelinkingSize: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The number of tracks available after relinking for regional availability.\n',
    }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description:
        'A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`.\n',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.\n',
    }),
  ),
  initialPoolSize: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'The number of recommended tracks available for this seed.\n',
    }),
  ),
  type: Schema.optional(
    Schema.String.annotate({
      description: 'The entity type of this seed. One of `artist`, `track` or `genre`.\n',
    }),
  ),
})

export type RecommendationSeedObjectSchema = Schema.Schema.Type<
  typeof RecommendationSeedObjectSchema
>

export const RecommendationsObjectSchema = Schema.Struct({
  seeds: Schema.Array(RecommendationSeedObjectSchema).annotate({
    description: 'An array of recommendation seed objects.\n',
  }),
  tracks: Schema.Array(TrackObjectSchema).annotate({
    description: 'An array of track objects ordered according to the parameters supplied.\n',
  }),
})

export type RecommendationsObjectSchema = Schema.Schema.Type<typeof RecommendationsObjectSchema>

export const PlaylistObjectSchema = Schema.Struct({
  collaborative: Schema.optional(
    Schema.Boolean.annotate({
      description: '`true` if the owner allows other users to modify the playlist.\n',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    }),
  ),
  external_urls: Schema.optional(
    ExternalUrlObjectSchema.annotate({ description: 'Known external URLs for this playlist.\n' }),
  ),
  href: Schema.optional(
    Schema.String.annotate({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
  ),
  id: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  images: Schema.optional(
    Schema.Array(ImageObjectSchema).annotate({
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
  ),
  name: Schema.optional(Schema.String.annotate({ description: 'The name of the playlist.\n' })),
  owner: Schema.optional(
    PlaylistOwnerObjectSchema.annotate({ description: 'The user who owns the playlist\n' }),
  ),
  public: Schema.optional(
    Schema.Boolean.annotate({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
  ),
  snapshot_id: Schema.optional(
    Schema.String.annotate({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
  ),
  items: Schema.optional(
    PagingPlaylistTrackObjectSchema.annotate({
      description:
        'The items of the playlist. _**Note**: This field is only available for playlists owned by the current user or playlists the user is a collaborator of._\n',
    }),
  ),
  tracks: Schema.optional(
    PagingPlaylistTrackObjectSchema.annotate({
      description: '**Deprecated:** Use `items` instead. The tracks of the playlist.\n',
      jsonSchemaDeprecated: true,
    }),
  ),
  type: Schema.optional(Schema.String.annotate({ description: 'The object type: "playlist"\n' })),
  uri: Schema.optional(
    Schema.String.annotate({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  ),
  followers: Schema.optional(
    FollowersObjectSchema.annotate({
      description: 'Information about the followers of the playlist.',
    }),
  ),
})

export type PlaylistObjectSchema = Schema.Schema.Type<typeof PlaylistObjectSchema>

export const CategoryObjectSchema = Schema.Struct({
  href: Schema.String.annotate({
    description: 'A link to the Web API endpoint returning full details of the category.\n',
  }),
  icons: Schema.Array(ImageObjectSchema).annotate({
    description: 'The category icon, in various sizes.\n',
  }),
  id: Schema.String.annotate({
    description:
      'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\n',
    jsonSchemaExamples: ['equal'],
  }),
  name: Schema.String.annotate({
    description: 'The name of the category.\n',
    jsonSchemaExamples: ['EQUAL'],
  }),
})

export type CategoryObjectSchema = Schema.Schema.Type<typeof CategoryObjectSchema>

export const ShowObjectSchema = ShowBaseSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        episodes: PagingSimplifiedEpisodeObjectSchema.annotate({
          description: 'The episodes of the show.\n',
        }),
      }),
    )(input),
  ),
)

export type ShowObjectSchema = Schema.Schema.Type<typeof ShowObjectSchema>

export const AudiobookObjectSchema = AudiobookBaseSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        chapters: PagingSimplifiedChapterObjectSchema.annotate({
          description: 'The chapters of the audiobook.\n',
        }),
      }),
    )(input),
  ),
)

export type AudiobookObjectSchema = Schema.Schema.Type<typeof AudiobookObjectSchema>

export const ChapterObjectSchema = ChapterBaseSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        audiobook: SimplifiedAudiobookObjectSchema.annotate({
          description: 'The audiobook for which the chapter belongs.\n',
        }),
      }),
    )(input),
  ),
)

export type ChapterObjectSchema = Schema.Schema.Type<typeof ChapterObjectSchema>

export const CurrentlyPlayingObjectSchema = Schema.Struct({
  context: Schema.optional(
    ContextObjectSchema.annotate({ description: 'A Context Object. Can be `null`.' }),
  ),
  timestamp: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'Unix Millisecond Timestamp when data was fetched' }),
  ),
  progress_ms: Schema.optional(
    Schema.Number.check(Schema.isInt()).annotate({
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
  ),
  is_playing: Schema.optional(
    Schema.Boolean.annotate({ description: 'If something is currently playing, return `true`.' }),
  ),
  item: Schema.optional(
    Schema.Union([TrackObjectSchema, EpisodeObjectSchema]).annotate({
      description: 'The currently playing track or episode. Can be `null`.',
    }),
  ),
  currently_playing_type: Schema.optional(
    Schema.String.annotate({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
  ),
  actions: Schema.optional(
    DisallowsObjectSchema.annotate({
      description:
        'Allows to update the user interface based on which playback actions are available within the current context.\n',
    }),
  ),
})

export type CurrentlyPlayingObjectSchema = Schema.Schema.Type<typeof CurrentlyPlayingObjectSchema>

export const SavedAudiobookObjectSchema = Schema.Struct({
  added_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ).annotate({
      description:
        'The date and time the audiobook was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    }),
  ),
  audiobook: Schema.optional(
    AudiobookObjectSchema.annotate({ description: 'Information about the audiobook.' }),
  ),
})

export type SavedAudiobookObjectSchema = Schema.Schema.Type<typeof SavedAudiobookObjectSchema>

export const PagingSavedAudiobookObjectSchema = PagingObjectSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ items: Schema.optional(Schema.Array(SavedAudiobookObjectSchema)) }))(
      input,
    ),
  ),
)

export type PagingSavedAudiobookObjectSchema = Schema.Schema.Type<
  typeof PagingSavedAudiobookObjectSchema
>
