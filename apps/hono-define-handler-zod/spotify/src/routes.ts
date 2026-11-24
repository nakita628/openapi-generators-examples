import { defineHandler } from 'hono/factory'
import * as z from 'zod'

export const ExternalUrlObjectSchema = z.object({
  spotify: z
    .string()
    .meta({
      description:
        'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\n',
    })
    .exactOptional(),
})

export type ExternalUrlObject = z.infer<typeof ExternalUrlObjectSchema>

export const LinkedTrackObjectSchema = z.object({
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this track.\n',
  }).exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the track.\n' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    })
    .exactOptional(),
  type: z.string().meta({ description: 'The object type: "track".\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    })
    .exactOptional(),
})

export type LinkedTrackObject = z.infer<typeof LinkedTrackObjectSchema>

export const TrackRestrictionObjectSchema = z.object({
  reason: z
    .string()
    .meta({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    })
    .exactOptional(),
})

export type TrackRestrictionObject = z.infer<typeof TrackRestrictionObjectSchema>

export const AlbumRestrictionObjectSchema = z.object({
  reason: z
    .enum(['market', 'product', 'explicit'])
    .meta({
      description:
        "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n",
    })
    .exactOptional(),
})

export type AlbumRestrictionObject = z.infer<typeof AlbumRestrictionObjectSchema>

export const EpisodeRestrictionObjectSchema = z.object({
  reason: z
    .string()
    .meta({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    })
    .exactOptional(),
})

export type EpisodeRestrictionObject = z.infer<typeof EpisodeRestrictionObjectSchema>

export const ChapterRestrictionObjectSchema = z.object({
  reason: z
    .string()
    .meta({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n- `payment_required` - Payment is required to play the content item.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    })
    .exactOptional(),
})

export type ChapterRestrictionObject = z.infer<typeof ChapterRestrictionObjectSchema>

export const FollowersObjectSchema = z.object({
  href: z
    .string()
    .nullable()
    .meta({
      description:
        'This will always be set to null, as the Web API does not support it at the moment.\n',
    })
    .exactOptional(),
  total: z.int().meta({ description: 'The total number of followers.\n' }).exactOptional(),
})

export type FollowersObject = z.infer<typeof FollowersObjectSchema>

export const ImageObjectSchema = z.object({
  url: z
    .string()
    .meta({
      description: 'The source URL of the image.\n',
      examples: ['https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n'],
    }),
  height: z
    .int()
    .nullable()
    .meta({ description: 'The image height in pixels.\n', examples: [300] }),
  width: z
    .int()
    .nullable()
    .meta({ description: 'The image width in pixels.\n', examples: [300] }),
})

export type ImageObject = z.infer<typeof ImageObjectSchema>

export const ArtistObjectSchema = z.object({
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this artist.\n',
  }).exactOptional(),
  followers: FollowersObjectSchema.meta({
    description: 'Information about the followers of the artist.\n',
    deprecated: true,
  }).exactOptional(),
  genres: z
    .array(z.string())
    .meta({
      description:
        'A list of the genres the artist is associated with. If not yet classified, the array is empty.\n',
      examples: [['Prog rock', 'Grunge']],
      deprecated: true,
    })
    .exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the artist.\n' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    })
    .exactOptional(),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: 'Images of the artist in various sizes, widest first.\n' })
    .exactOptional(),
  name: z.string().meta({ description: 'The name of the artist.\n' }).exactOptional(),
  popularity: z
    .int()
    .meta({
      description:
        "The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n",
      deprecated: true,
    })
    .exactOptional(),
  type: z.literal('artist').meta({ description: 'The object type.\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    })
    .exactOptional(),
})

export type ArtistObject = z.infer<typeof ArtistObjectSchema>

export const SimplifiedArtistObjectSchema = z.object({
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this artist.\n',
  }).exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the artist.\n' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    })
    .exactOptional(),
  name: z.string().meta({ description: 'The name of the artist.\n' }).exactOptional(),
  type: z.literal('artist').meta({ description: 'The object type.\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    })
    .exactOptional(),
})

export type SimplifiedArtistObject = z.infer<typeof SimplifiedArtistObjectSchema>

export const AlbumBaseSchema = z.object({
  album_type: z
    .enum(['album', 'single', 'compilation'])
    .meta({ description: 'The type of the album.\n', examples: ['compilation'] }),
  total_tracks: z.int().meta({ description: 'The number of tracks in the album.', examples: [9] }),
  available_markets: z
    .array(z.string())
    .meta({
      description:
        'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n',
      examples: [['CA', 'BR', 'IT']],
      deprecated: true,
    }),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this album.\n',
  }),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the album.\n' }),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
      examples: ['2up3OPMp9Tb4dAKM2erWXQ'],
    }),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: 'The cover art for the album in various sizes, widest first.\n' }),
  name: z
    .string()
    .meta({
      description:
        'The name of the album. In case of an album takedown, the value may be an empty string.\n',
    }),
  release_date: z
    .string()
    .meta({ description: 'The date the album was first released.\n', examples: ['1981-12'] }),
  release_date_precision: z
    .enum(['year', 'month', 'day'])
    .meta({
      description: 'The precision with which `release_date` value is known.\n',
      examples: ['year'],
    }),
  restrictions: AlbumRestrictionObjectSchema.meta({
    description: 'Included in the response when a content restriction is applied.\n',
  }).exactOptional(),
  type: z.literal('album').meta({ description: 'The object type.\n' }),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
      examples: ['spotify:album:2up3OPMp9Tb4dAKM2erWXQ'],
    }),
})

export type AlbumBase = z.infer<typeof AlbumBaseSchema>

export const SimplifiedAlbumObjectSchema = z.intersection(
  AlbumBaseSchema,
  z.object({
    artists: z
      .array(SimplifiedArtistObjectSchema)
      .meta({
        description:
          'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      }),
  }),
)

export type SimplifiedAlbumObject = z.infer<typeof SimplifiedAlbumObjectSchema>

export const ExternalIdObjectSchema = z.object({
  isrc: z
    .string()
    .meta({
      description:
        '[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n',
    })
    .exactOptional(),
  ean: z
    .string()
    .meta({
      description:
        '[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n',
    })
    .exactOptional(),
  upc: z
    .string()
    .meta({
      description:
        '[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n',
    })
    .exactOptional(),
})

export type ExternalIdObject = z.infer<typeof ExternalIdObjectSchema>

export const TrackObjectSchema = z.object({
  album: SimplifiedAlbumObjectSchema.meta({
    description:
      'The album on which the track appears. The album object includes a link in `href` to full information about the album.\n',
  }).exactOptional(),
  artists: z
    .array(SimplifiedArtistObjectSchema)
    .meta({
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    })
    .exactOptional(),
  available_markets: z
    .array(z.string())
    .meta({
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    })
    .exactOptional(),
  disc_number: z
    .int()
    .meta({
      description:
        'The disc number (usually `1` unless the album consists of more than one disc).\n',
    })
    .exactOptional(),
  duration_ms: z.int().meta({ description: 'The track length in milliseconds.\n' }).exactOptional(),
  explicit: z
    .boolean()
    .meta({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n',
    })
    .exactOptional(),
  external_ids: ExternalIdObjectSchema.meta({
    description: 'Known external IDs for the track.\n',
  }).exactOptional(),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this track.\n',
  }).exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the track.\n' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    })
    .exactOptional(),
  is_playable: z
    .boolean()
    .meta({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    })
    .exactOptional(),
  linked_from: LinkedTrackObjectSchema.meta({
    description:
      'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track.',
    deprecated: true,
  }).exactOptional(),
  restrictions: TrackRestrictionObjectSchema.meta({
    description: 'Included in the response when a content restriction is applied.\n',
  }).exactOptional(),
  name: z.string().meta({ description: 'The name of the track.\n' }).exactOptional(),
  popularity: z
    .int()
    .meta({
      description:
        'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n',
      deprecated: true,
    })
    .exactOptional(),
  preview_url: z
    .string()
    .nullable()
    .meta({
      description: 'A link to a 30 second preview (MP3 format) of the track. Can be `null`\n',
      deprecated: true,
    })
    .exactOptional(),
  track_number: z
    .int()
    .meta({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    })
    .exactOptional(),
  type: z.literal('track').meta({ description: 'The object type: "track".\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    })
    .exactOptional(),
  is_local: z
    .boolean()
    .meta({ description: 'Whether or not the track is from a local file.\n' })
    .exactOptional(),
})

export type TrackObject = z.infer<typeof TrackObjectSchema>

export const ContextObjectSchema = z.object({
  type: z
    .string()
    .meta({ description: 'The object type, e.g. "artist", "playlist", "album", "show".\n' })
    .exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the track.' })
    .exactOptional(),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'External URLs for this context.',
  }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.\n',
    })
    .exactOptional(),
})

export type ContextObject = z.infer<typeof ContextObjectSchema>

export const PlayHistoryObjectSchema = z.object({
  track: TrackObjectSchema.meta({ description: 'The track the user listened to.' }).exactOptional(),
  played_at: z.iso
    .datetime({ offset: true })
    .meta({ description: 'The date and time the track was played.' })
    .exactOptional(),
  context: ContextObjectSchema.meta({
    description: 'The context the track was played from.',
  }).exactOptional(),
})

export type PlayHistoryObject = z.infer<typeof PlayHistoryObjectSchema>

export const PlaylistUserObjectSchema = z.object({
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known public external URLs for this user.\n',
  }).exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint for this user.\n' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    })
    .exactOptional(),
  type: z.literal('user').meta({ description: 'The object type.\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    })
    .exactOptional(),
})

export type PlaylistUserObject = z.infer<typeof PlaylistUserObjectSchema>

export const ResumePointObjectSchema = z.object({
  fully_played: z
    .boolean()
    .meta({ description: 'Whether or not the episode has been fully played by the user.\n' })
    .exactOptional(),
  resume_position_ms: z
    .int()
    .meta({ description: "The user's most recent position in the episode in milliseconds.\n" })
    .exactOptional(),
})

export type ResumePointObject = z.infer<typeof ResumePointObjectSchema>

export const EpisodeBaseSchema = z.object({
  audio_preview_url: z
    .string()
    .nullable()
    .meta({
      description:
        'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
      examples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
      deprecated: true,
    }),
  description: z
    .string()
    .meta({
      description:
        'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
      examples: [
        'A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n',
      ],
    }),
  html_description: z
    .string()
    .meta({
      description: 'A description of the episode. This field may contain HTML tags.\n',
      examples: [
        '<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n',
      ],
    }),
  duration_ms: z
    .int()
    .meta({ description: 'The episode length in milliseconds.\n', examples: [1686230] }),
  explicit: z
    .boolean()
    .meta({
      description:
        'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
  external_urls: ExternalUrlObjectSchema.meta({ description: 'External URLs for this episode.\n' }),
  href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint providing full details of the episode.\n',
      examples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'],
    }),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
      examples: ['5Xt5DXGzch68nYYamXrNxZ'],
    }),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: 'The cover art for the episode in various sizes, widest first.\n' }),
  is_externally_hosted: z
    .boolean()
    .meta({ description: "True if the episode is hosted outside of Spotify's CDN.\n" }),
  is_playable: z
    .boolean()
    .meta({
      description: 'True if the episode is playable in the given market. Otherwise false.\n',
    }),
  language: z
    .string()
    .meta({
      description:
        'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n',
      examples: ['en'],
      deprecated: true,
    })
    .exactOptional(),
  languages: z
    .array(z.string())
    .meta({
      description:
        'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
      examples: [['fr', 'en']],
    }),
  name: z
    .string()
    .meta({
      description: 'The name of the episode.\n',
      examples: ['Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n'],
    }),
  release_date: z
    .string()
    .meta({
      description:
        'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
      examples: ['1981-12-15'],
    }),
  release_date_precision: z
    .enum(['year', 'month', 'day'])
    .meta({
      description: 'The precision with which `release_date` value is known.\n',
      examples: ['day'],
    }),
  resume_point: ResumePointObjectSchema.meta({
    description:
      "The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
  }).exactOptional(),
  type: z.literal('episode').meta({ description: 'The object type.\n' }),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
      examples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'],
    }),
  restrictions: EpisodeRestrictionObjectSchema.meta({
    description: 'Included in the response when a content restriction is applied.\n',
  }).exactOptional(),
})

export type EpisodeBase = z.infer<typeof EpisodeBaseSchema>

export const CopyrightObjectSchema = z.object({
  text: z.string().meta({ description: 'The copyright text for this content.\n' }).exactOptional(),
  type: z
    .string()
    .meta({
      description:
        'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n',
    })
    .exactOptional(),
})

export type CopyrightObject = z.infer<typeof CopyrightObjectSchema>

export const ShowBaseSchema = z.object({
  available_markets: z
    .array(z.string())
    .meta({
      description:
        'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  copyrights: z
    .array(CopyrightObjectSchema)
    .meta({ description: 'The copyright statements of the show.\n' }),
  description: z
    .string()
    .meta({
      description:
        'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    }),
  html_description: z
    .string()
    .meta({ description: 'A description of the show. This field may contain HTML tags.\n' }),
  explicit: z
    .boolean()
    .meta({
      description:
        'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
  external_urls: ExternalUrlObjectSchema.meta({ description: 'External URLs for this show.\n' }),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the show.\n' }),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
    }),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: 'The cover art for the show in various sizes, widest first.\n' }),
  is_externally_hosted: z
    .boolean()
    .meta({
      description:
        "True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n",
    }),
  languages: z
    .array(z.string())
    .meta({
      description:
        'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    }),
  media_type: z.string().meta({ description: 'The media type of the show.\n' }),
  name: z.string().meta({ description: 'The name of the episode.\n' }),
  publisher: z.string().meta({ description: 'The publisher of the show.\n', deprecated: true }),
  type: z.literal('show').meta({ description: 'The object type.\n' }),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
    }),
  total_episodes: z.int().meta({ description: 'The total number of episodes in the show.\n' }),
})

export type ShowBase = z.infer<typeof ShowBaseSchema>

export const SimplifiedShowObjectSchema = ShowBaseSchema

export type SimplifiedShowObject = z.infer<typeof SimplifiedShowObjectSchema>

export const EpisodeObjectSchema = z.intersection(
  EpisodeBaseSchema,
  z.object({
    show: SimplifiedShowObjectSchema.meta({
      description: 'The show on which the episode belongs.\n',
    }),
  }),
)

export type EpisodeObject = z.infer<typeof EpisodeObjectSchema>

export const PlaylistTrackObjectSchema = z.object({
  added_at: z.iso
    .datetime({ offset: true })
    .meta({
      description:
        'The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._\n',
    })
    .exactOptional(),
  added_by: PlaylistUserObjectSchema.meta({
    description:
      'The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._\n',
  }).exactOptional(),
  is_local: z
    .boolean()
    .meta({
      description:
        'Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.\n',
    })
    .exactOptional(),
  item: z
    .xor([
      z.intersection(TrackObjectSchema, z.object({ type: z.literal('TrackObject') })),
      z.intersection(EpisodeObjectSchema, z.object({ type: z.literal('EpisodeObject') })),
    ])
    .meta({ description: 'Information about the track or episode.' })
    .exactOptional(),
  track: z
    .xor([
      z.intersection(TrackObjectSchema, z.object({ type: z.literal('TrackObject') })),
      z.intersection(EpisodeObjectSchema, z.object({ type: z.literal('EpisodeObject') })),
    ])
    .meta({
      description: '**Deprecated:** Use `item` instead. Information about the track or episode.\n',
      deprecated: true,
    })
    .exactOptional(),
})

export type PlaylistTrackObject = z.infer<typeof PlaylistTrackObjectSchema>

export const QueueObjectSchema = z.object({
  currently_playing: z
    .xor([
      z.intersection(TrackObjectSchema, z.object({ type: z.literal('TrackObject') })),
      z.intersection(EpisodeObjectSchema, z.object({ type: z.literal('EpisodeObject') })),
    ])
    .meta({ description: 'The currently playing track or episode. Can be `null`.' })
    .exactOptional(),
  queue: z
    .array(
      z.xor([
        z.intersection(TrackObjectSchema, z.object({ type: z.literal('TrackObject') })),
        z.intersection(EpisodeObjectSchema, z.object({ type: z.literal('EpisodeObject') })),
      ]),
    )
    .meta({ description: 'The tracks or episodes in the queue. Can be empty.' })
    .exactOptional(),
})

export type QueueObject = z.infer<typeof QueueObjectSchema>

export const DeviceObjectSchema = z.object({
  id: z
    .string()
    .nullable()
    .meta({
      description:
        'The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.',
    })
    .exactOptional(),
  is_active: z
    .boolean()
    .meta({ description: 'If this device is the currently active device.' })
    .exactOptional(),
  is_private_session: z
    .boolean()
    .meta({ description: 'If this device is currently in a private session.' })
    .exactOptional(),
  is_restricted: z
    .boolean()
    .meta({
      description:
        'Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.',
    })
    .exactOptional(),
  name: z
    .string()
    .meta({
      description:
        'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\"Loudest speaker\\") and some devices have a generic name associated with the manufacturer or device model.',
      examples: ['Kitchen speaker'],
    })
    .exactOptional(),
  type: z
    .string()
    .meta({
      description: 'Device type, such as "computer", "smartphone" or "speaker".',
      examples: ['computer'],
    })
    .exactOptional(),
  volume_percent: z
    .int()
    .min(0)
    .max(100)
    .nullable()
    .meta({ description: 'The current volume in percent.', examples: [59] })
    .exactOptional(),
  supports_volume: z
    .boolean()
    .meta({ description: 'If this device can be used to set the volume.' })
    .exactOptional(),
})

export type DeviceObject = z.infer<typeof DeviceObjectSchema>

export const DisallowsObjectSchema = z.object({
  interrupting_playback: z
    .boolean()
    .meta({ description: 'Interrupting playback. Optional field.' })
    .exactOptional(),
  pausing: z.boolean().meta({ description: 'Pausing. Optional field.' }).exactOptional(),
  resuming: z.boolean().meta({ description: 'Resuming. Optional field.' }).exactOptional(),
  seeking: z
    .boolean()
    .meta({ description: 'Seeking playback location. Optional field.' })
    .exactOptional(),
  skipping_next: z
    .boolean()
    .meta({ description: 'Skipping to the next context. Optional field.' })
    .exactOptional(),
  skipping_prev: z
    .boolean()
    .meta({ description: 'Skipping to the previous context. Optional field.' })
    .exactOptional(),
  toggling_repeat_context: z
    .boolean()
    .meta({ description: 'Toggling repeat context flag. Optional field.' })
    .exactOptional(),
  toggling_shuffle: z
    .boolean()
    .meta({ description: 'Toggling shuffle flag. Optional field.' })
    .exactOptional(),
  toggling_repeat_track: z
    .boolean()
    .meta({ description: 'Toggling repeat track flag. Optional field.' })
    .exactOptional(),
  transferring_playback: z
    .boolean()
    .meta({ description: 'Transfering playback between devices. Optional field.' })
    .exactOptional(),
})

export type DisallowsObject = z.infer<typeof DisallowsObjectSchema>

export const CurrentlyPlayingContextObjectSchema = z.object({
  device: DeviceObjectSchema.meta({
    description: 'The device that is currently active.\n',
  }).exactOptional(),
  repeat_state: z.string().meta({ description: 'off, track, context' }).exactOptional(),
  shuffle_state: z.boolean().meta({ description: 'If shuffle is on or off.' }).exactOptional(),
  context: ContextObjectSchema.meta({
    description: 'A Context Object. Can be `null`.',
  }).exactOptional(),
  timestamp: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .meta({
      description:
        'Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.).',
    })
    .exactOptional(),
  progress_ms: z
    .int()
    .meta({ description: 'Progress into the currently playing track or episode. Can be `null`.' })
    .exactOptional(),
  is_playing: z
    .boolean()
    .meta({ description: 'If something is currently playing, return `true`.' })
    .exactOptional(),
  item: z
    .xor([
      z.intersection(TrackObjectSchema, z.object({ type: z.literal('TrackObject') })),
      z.intersection(EpisodeObjectSchema, z.object({ type: z.literal('EpisodeObject') })),
    ])
    .meta({ description: 'The currently playing track or episode. Can be `null`.' })
    .exactOptional(),
  currently_playing_type: z
    .string()
    .meta({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    })
    .exactOptional(),
  actions: DisallowsObjectSchema.meta({
    description:
      'Allows to update the user interface based on which playback actions are available within the current context.\n',
  }).exactOptional(),
})

export type CurrentlyPlayingContextObject = z.infer<typeof CurrentlyPlayingContextObjectSchema>

export const ErrorObjectSchema = z.object({
  status: z
    .int()
    .min(400)
    .max(599)
    .meta({
      description:
        'The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).\n',
    }),
  message: z.string().meta({ description: 'A short description of the cause of the error.\n' }),
})

export type ErrorObject = z.infer<typeof ErrorObjectSchema>

export const ExplicitContentSettingsObjectSchema = z.object({
  filter_enabled: z
    .boolean()
    .meta({ description: 'When `true`, indicates that explicit content should not be played.\n' })
    .exactOptional(),
  filter_locked: z
    .boolean()
    .meta({
      description:
        "When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n",
    })
    .exactOptional(),
})

export type ExplicitContentSettingsObject = z.infer<typeof ExplicitContentSettingsObjectSchema>

export const PrivateUserObjectSchema = z.object({
  account_id: z
    .string()
    .meta({
      description:
        "A public, immutable, pseudoanonymous identifier for the user's account. Use this field for account linking rather than the `id` field, as it is stable and will not change over the lifetime of the account.\n",
      examples: ['aB3dE5fG7h'],
    })
    .exactOptional(),
  country: z
    .string()
    .meta({
      description:
        "The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      deprecated: true,
    })
    .exactOptional(),
  display_name: z
    .string()
    .meta({ description: "The name displayed on the user's profile. `null` if not available.\n" })
    .exactOptional(),
  email: z
    .string()
    .meta({
      description:
        "The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
      deprecated: true,
    })
    .exactOptional(),
  explicit_content: ExplicitContentSettingsObjectSchema.meta({
    description:
      "The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
    deprecated: true,
  }).exactOptional(),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this user.',
  }).exactOptional(),
  followers: FollowersObjectSchema.meta({
    description: 'Information about the followers of the user.',
    deprecated: true,
  }).exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint for this user.\n' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. Do not use this field for account linking — use `account_id` instead, which is immutable.\n',
    })
    .exactOptional(),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: "The user's profile image." })
    .exactOptional(),
  product: z
    .string()
    .meta({
      description:
        'The user\'s Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n',
      deprecated: true,
    })
    .exactOptional(),
  type: z.string().meta({ description: 'The object type: "user"\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
    })
    .exactOptional(),
})

export type PrivateUserObject = z.infer<typeof PrivateUserObjectSchema>

export const PublicUserObjectSchema = z.object({
  display_name: z
    .string()
    .nullable()
    .meta({ description: "The name displayed on the user's profile. `null` if not available.\n" })
    .exactOptional(),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known public external URLs for this user.\n',
  }).exactOptional(),
  followers: FollowersObjectSchema.meta({
    description: 'Information about the followers of this user.\n',
    deprecated: true,
  }).exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint for this user.\n' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    })
    .exactOptional(),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: "The user's profile image.\n" })
    .exactOptional(),
  type: z.literal('user').meta({ description: 'The object type.\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    })
    .exactOptional(),
})

export type PublicUserObject = z.infer<typeof PublicUserObjectSchema>

export const LoudnessSchema = z
  .float32()
  .meta({
    description:
      'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n',
    examples: [-5.883],
  })

export type Loudness = z.infer<typeof LoudnessSchema>

export const TempoSchema = z
  .float32()
  .meta({
    description:
      'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n',
    examples: [118.211],
  })

export type Tempo = z.infer<typeof TempoSchema>

export const TimeSignatureSchema = z
  .int()
  .min(3)
  .max(7)
  .meta({
    description:
      'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
    examples: [4],
  })

export type TimeSignature = z.infer<typeof TimeSignatureSchema>

export const KeySchema = z
  .int()
  .min(-1)
  .max(11)
  .meta({
    description:
      'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n',
    examples: [9],
  })

export type Key = z.infer<typeof KeySchema>

export const ModeSchema = z
  .int()
  .meta({
    description:
      'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n',
    examples: [0],
  })

export type Mode = z.infer<typeof ModeSchema>

export const TimeIntervalObjectSchema = z.object({
  start: z
    .number()
    .meta({
      description: 'The starting point (in seconds) of the time interval.',
      examples: [0.49567],
    })
    .exactOptional(),
  duration: z
    .number()
    .meta({ description: 'The duration (in seconds) of the time interval.', examples: [2.18749] })
    .exactOptional(),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .meta({
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the interval.',
      examples: [0.925],
    })
    .exactOptional(),
})

export type TimeIntervalObject = z.infer<typeof TimeIntervalObjectSchema>

export const SectionObjectSchema = z.object({
  start: z
    .number()
    .meta({ description: 'The starting point (in seconds) of the section.', examples: [0] })
    .exactOptional(),
  duration: z
    .number()
    .meta({ description: 'The duration (in seconds) of the section.', examples: [6.97092] })
    .exactOptional(),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .meta({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the section\'s "designation".',
      examples: [1],
    })
    .exactOptional(),
  loudness: z
    .number()
    .meta({
      description:
        'The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.',
      examples: [-14.938],
    })
    .exactOptional(),
  tempo: z
    .number()
    .meta({
      description:
        'The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
      examples: [113.178],
    })
    .exactOptional(),
  tempo_confidence: z
    .number()
    .min(0)
    .max(1)
    .meta({
      description:
        "The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.",
      examples: [0.647],
    })
    .exactOptional(),
  key: z
    .int()
    .meta({
      description:
        'The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.',
      examples: [9],
    })
    .exactOptional(),
  key_confidence: z
    .number()
    .min(0)
    .max(1)
    .meta({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.',
      examples: [0.297],
    })
    .exactOptional(),
  mode: z
    .union([z.literal(-1), z.literal(0), z.literal(1)])
    .meta({
      description:
        'Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.',
    })
    .exactOptional(),
  mode_confidence: z
    .number()
    .min(0)
    .max(1)
    .meta({
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
      examples: [0.471],
    })
    .exactOptional(),
  time_signature: TimeSignatureSchema.exactOptional(),
  time_signature_confidence: z
    .number()
    .min(0)
    .max(1)
    .meta({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.',
      examples: [1],
    })
    .exactOptional(),
})

export type SectionObject = z.infer<typeof SectionObjectSchema>

export const SegmentObjectSchema = z.object({
  start: z
    .number()
    .meta({ description: 'The starting point (in seconds) of the segment.', examples: [0.70154] })
    .exactOptional(),
  duration: z
    .number()
    .meta({ description: 'The duration (in seconds) of the segment.', examples: [0.19891] })
    .exactOptional(),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .meta({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.\n',
      examples: [0.435],
    })
    .exactOptional(),
  loudness_start: z
    .number()
    .meta({
      description:
        'The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      examples: [-23.053],
    })
    .exactOptional(),
  loudness_max: z
    .number()
    .meta({
      description:
        'The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      examples: [-14.25],
    })
    .exactOptional(),
  loudness_max_time: z
    .number()
    .meta({
      description:
        'The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.',
      examples: [0.07305],
    })
    .exactOptional(),
  loudness_end: z
    .number()
    .meta({
      description:
        'The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.',
      examples: [0],
    })
    .exactOptional(),
  pitches: z
    .array(z.number().min(0).max(1))
    .meta({
      description:
        'Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).\n\nVectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.\nAs can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.\n![pitch vector](/assets/audio/Pitch_vector.png)\n',
      examples: [[0.212, 0.141, 0.294]],
    })
    .exactOptional(),
  timbre: z
    .array(z.number())
    .meta({
      description:
        'Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n\nFor completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).\n![timbre basis functions](/assets/audio/Timbre_basis_functions.png)\n\nThe actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.\n',
      examples: [[42.115, 64.373, -0.233]],
    })
    .exactOptional(),
})

export type SegmentObject = z.infer<typeof SegmentObjectSchema>

export const AudioAnalysisObjectSchema = z.object({
  meta: z
    .object({
      analyzer_version: z
        .string()
        .meta({
          description: 'The version of the Analyzer used to analyze this track.',
          examples: ['4.0.0'],
        })
        .exactOptional(),
      platform: z
        .string()
        .meta({
          description: "The platform used to read the track's audio data.",
          examples: ['Linux'],
        })
        .exactOptional(),
      detailed_status: z
        .string()
        .meta({
          description:
            'A detailed status code for this track. If analysis data is missing, this code may explain why.',
          examples: ['OK'],
        })
        .exactOptional(),
      status_code: z
        .int()
        .meta({
          description:
            'The return code of the analyzer process. 0 if successful, 1 if any errors occurred.',
          examples: [0],
        })
        .exactOptional(),
      timestamp: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .meta({
          description: 'The Unix timestamp (in seconds) at which this track was analyzed.',
          examples: [1495193577],
        })
        .exactOptional(),
      analysis_time: z
        .number()
        .meta({
          description: 'The amount of time taken to analyze this track.',
          examples: [6.93906],
        })
        .exactOptional(),
      input_process: z
        .string()
        .meta({
          description: "The method used to read the track's audio data.",
          examples: ['libvorbisfile L+R 44100->22050'],
        })
        .exactOptional(),
    })
    .exactOptional(),
  track: z
    .object({
      num_samples: z
        .int()
        .meta({
          description:
            'The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.',
          examples: [4585515],
        })
        .exactOptional(),
      duration: z
        .number()
        .meta({ description: 'Length of the track in seconds.', examples: [207.95985] })
        .exactOptional(),
      sample_md5: z
        .string()
        .meta({ description: 'This field will always contain the empty string.' })
        .exactOptional(),
      offset_seconds: z
        .int()
        .meta({
          description:
            'An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)',
          examples: [0],
        })
        .exactOptional(),
      window_seconds: z
        .int()
        .meta({
          description:
            'The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)',
          examples: [0],
        })
        .exactOptional(),
      analysis_sample_rate: z
        .int()
        .meta({
          description:
            'The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.',
          examples: [22050],
        })
        .exactOptional(),
      analysis_channels: z
        .int()
        .meta({
          description:
            'The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.',
          examples: [1],
        })
        .exactOptional(),
      end_of_fade_in: z
        .number()
        .meta({
          description:
            "The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.",
          examples: [0],
        })
        .exactOptional(),
      start_of_fade_out: z
        .number()
        .meta({
          description:
            "The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.",
          examples: [201.13705],
        })
        .exactOptional(),
      loudness: LoudnessSchema.exactOptional(),
      tempo: TempoSchema.exactOptional(),
      tempo_confidence: z
        .number()
        .min(0)
        .max(1)
        .meta({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.',
          examples: [0.73],
        })
        .exactOptional(),
      time_signature: TimeSignatureSchema.exactOptional(),
      time_signature_confidence: z
        .number()
        .min(0)
        .max(1)
        .meta({
          description:
            'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.',
          examples: [0.994],
        })
        .exactOptional(),
      key: KeySchema.exactOptional(),
      key_confidence: z
        .number()
        .min(0)
        .max(1)
        .meta({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `key`.',
          examples: [0.408],
        })
        .exactOptional(),
      mode: ModeSchema.exactOptional(),
      mode_confidence: z
        .number()
        .min(0)
        .max(1)
        .meta({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
          examples: [0.485],
        })
        .exactOptional(),
      codestring: z
        .string()
        .meta({
          description:
            'An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.',
        })
        .exactOptional(),
      code_version: z
        .number()
        .meta({
          description:
            'A version number for the Echo Nest Musical Fingerprint format used in the codestring field.',
          examples: [3.15],
        })
        .exactOptional(),
      echoprintstring: z
        .string()
        .meta({
          description:
            'An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.',
        })
        .exactOptional(),
      echoprint_version: z
        .number()
        .meta({
          description:
            'A version number for the EchoPrint format used in the echoprintstring field.',
          examples: [4.15],
        })
        .exactOptional(),
      synchstring: z
        .string()
        .meta({
          description: 'A [Synchstring](https://github.com/echonest/synchdata) for this track.',
        })
        .exactOptional(),
      synch_version: z
        .number()
        .meta({
          description: 'A version number for the Synchstring used in the synchstring field.',
          examples: [1],
        })
        .exactOptional(),
      rhythmstring: z
        .string()
        .meta({
          description:
            'A Rhythmstring for this track. The format of this string is similar to the Synchstring.',
        })
        .exactOptional(),
      rhythm_version: z
        .number()
        .meta({
          description: 'A version number for the Rhythmstring used in the rhythmstring field.',
          examples: [1],
        })
        .exactOptional(),
    })
    .exactOptional(),
  bars: z
    .array(TimeIntervalObjectSchema)
    .meta({
      description:
        'The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.',
    })
    .exactOptional(),
  beats: z
    .array(TimeIntervalObjectSchema)
    .meta({
      description:
        'The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.',
    })
    .exactOptional(),
  sections: z
    .array(SectionObjectSchema)
    .meta({
      description:
        'Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.',
    })
    .exactOptional(),
  segments: z
    .array(SegmentObjectSchema)
    .meta({
      description: 'Each segment contains a roughly conisistent sound throughout its duration.',
    })
    .exactOptional(),
  tatums: z
    .array(TimeIntervalObjectSchema)
    .meta({
      description:
        'A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).',
    })
    .exactOptional(),
})

export type AudioAnalysisObject = z.infer<typeof AudioAnalysisObjectSchema>

export const AudioFeaturesObjectSchema = z.object({
  acousticness: z
    .float32()
    .min(0)
    .max(1)
    .meta({
      description:
        'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
      examples: [0.00242],
    })
    .exactOptional(),
  analysis_url: z
    .string()
    .meta({
      description:
        'A URL to access the full audio analysis of this track. An access token is required to access this data.\n',
      examples: ['https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n'],
    })
    .exactOptional(),
  danceability: z
    .float32()
    .meta({
      description:
        'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
      examples: [0.585],
    })
    .exactOptional(),
  duration_ms: z
    .int()
    .meta({ description: 'The duration of the track in milliseconds.\n', examples: [237040] })
    .exactOptional(),
  energy: z
    .float32()
    .meta({
      description:
        'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
      examples: [0.842],
    })
    .exactOptional(),
  id: z
    .string()
    .meta({ description: 'The Spotify ID for the track.\n', examples: ['2takcwOaAZWiXQijPHIx7B'] })
    .exactOptional(),
  instrumentalness: z
    .float32()
    .meta({
      description:
        'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
      examples: [0.00686],
    })
    .exactOptional(),
  key: KeySchema.exactOptional(),
  liveness: z
    .float32()
    .meta({
      description:
        'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
      examples: [0.0866],
    })
    .exactOptional(),
  loudness: LoudnessSchema.exactOptional(),
  mode: ModeSchema.exactOptional(),
  speechiness: z
    .float32()
    .meta({
      description:
        'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
      examples: [0.0556],
    })
    .exactOptional(),
  tempo: TempoSchema.exactOptional(),
  time_signature: TimeSignatureSchema.exactOptional(),
  track_href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
      examples: ['https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n'],
    })
    .exactOptional(),
  type: z.literal('audio_features').meta({ description: 'The object type.\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description: 'The Spotify URI for the track.\n',
      examples: ['spotify:track:2takcwOaAZWiXQijPHIx7B'],
    })
    .exactOptional(),
  valence: z
    .float32()
    .min(0)
    .max(1)
    .meta({
      description:
        'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
      examples: [0.428],
    })
    .exactOptional(),
})

export type AudioFeaturesObject = z.infer<typeof AudioFeaturesObjectSchema>

export const SimplifiedTrackObjectSchema = z.object({
  artists: z
    .array(SimplifiedArtistObjectSchema)
    .meta({
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',
    })
    .exactOptional(),
  available_markets: z
    .array(z.string())
    .meta({
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    })
    .exactOptional(),
  disc_number: z
    .int()
    .meta({
      description: 'The disc number (usually `1` unless the album consists of more than one disc).',
    })
    .exactOptional(),
  duration_ms: z.int().meta({ description: 'The track length in milliseconds.' }).exactOptional(),
  explicit: z
    .boolean()
    .meta({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).',
    })
    .exactOptional(),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'External URLs for this track.\n',
  }).exactOptional(),
  href: z
    .string()
    .meta({ description: 'A link to the Web API endpoint providing full details of the track.' })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    })
    .exactOptional(),
  is_playable: z
    .boolean()
    .meta({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    })
    .exactOptional(),
  linked_from: LinkedTrackObjectSchema.meta({
    description:
      'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track.',
    deprecated: true,
  }).exactOptional(),
  restrictions: TrackRestrictionObjectSchema.meta({
    description: 'Included in the response when a content restriction is applied.\n',
  }).exactOptional(),
  name: z.string().meta({ description: 'The name of the track.' }).exactOptional(),
  preview_url: z
    .string()
    .nullable()
    .meta({
      description: 'A URL to a 30 second preview (MP3 format) of the track.\n',
      deprecated: true,
    })
    .exactOptional(),
  track_number: z
    .int()
    .meta({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    })
    .exactOptional(),
  type: z.string().meta({ description: 'The object type: "track".\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    })
    .exactOptional(),
  is_local: z
    .boolean()
    .meta({ description: 'Whether or not the track is from a local file.\n' })
    .exactOptional(),
})

export type SimplifiedTrackObject = z.infer<typeof SimplifiedTrackObjectSchema>

export const CursorObjectSchema = z.object({
  after: z
    .string()
    .meta({ description: 'The cursor to use as key to find the next page of items.' })
    .exactOptional(),
  before: z
    .string()
    .meta({ description: 'The cursor to use as key to find the previous page of items.' })
    .exactOptional(),
})

export type CursorObject = z.infer<typeof CursorObjectSchema>

export const CursorPagingObjectSchema = z.object({
  href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint returning the full result of the request.',
    })
    .exactOptional(),
  limit: z
    .int()
    .meta({
      description:
        'The maximum number of items in the response (as set in the query or by default).',
    })
    .exactOptional(),
  next: z
    .string()
    .meta({ description: 'URL to the next page of items. ( `null` if none)' })
    .exactOptional(),
  cursors: CursorObjectSchema.meta({
    description: 'The cursors used to find the next set of items.',
  }).exactOptional(),
  total: z
    .int()
    .meta({ description: 'The total number of items available to return.' })
    .exactOptional(),
})

export type CursorPagingObject = z.infer<typeof CursorPagingObjectSchema>

export const CursorPagingPlayHistoryObjectSchema = z.intersection(
  CursorPagingObjectSchema,
  z.object({ items: z.array(PlayHistoryObjectSchema).exactOptional() }),
)

export type CursorPagingPlayHistoryObject = z.infer<typeof CursorPagingPlayHistoryObjectSchema>

export const CursorPagingSimplifiedArtistObjectSchema = z.intersection(
  CursorPagingObjectSchema,
  z.object({ items: z.array(ArtistObjectSchema).exactOptional() }),
)

export type CursorPagingSimplifiedArtistObject = z.infer<
  typeof CursorPagingSimplifiedArtistObjectSchema
>

export const PagingObjectSchema = z
  .looseObject({
    href: z
      .string()
      .meta({
        description: 'A link to the Web API endpoint returning the full result of the request\n',
        examples: ['https://api.spotify.com/v1/me/shows?offset=0&limit=20\n'],
      }),
    limit: z
      .int()
      .meta({
        description:
          'The maximum number of items in the response (as set in the query or by default).\n',
        examples: [20],
      }),
    next: z
      .string()
      .nullable()
      .meta({
        description: 'URL to the next page of items. ( `null` if none)\n',
        examples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'],
      }),
    offset: z
      .int()
      .meta({
        description: 'The offset of the items returned (as set in the query or by default)\n',
        examples: [0],
      }),
    previous: z
      .string()
      .nullable()
      .meta({
        description: 'URL to the previous page of items. ( `null` if none)\n',
        examples: ['https://api.spotify.com/v1/me/shows?offset=1&limit=1'],
      }),
    total: z
      .int()
      .meta({ description: 'The total number of items available to return.\n', examples: [4] }),
  })
  .refine((val) => ['items'].every((key) => key in val))

export type PagingObject = z.infer<typeof PagingObjectSchema>

export const PlaylistOwnerObjectSchema = z.intersection(
  PlaylistUserObjectSchema,
  z.object({
    display_name: z
      .string()
      .nullable()
      .meta({ description: "The name displayed on the user's profile. `null` if not available.\n" })
      .exactOptional(),
  }),
)

export type PlaylistOwnerObject = z.infer<typeof PlaylistOwnerObjectSchema>

export const PlaylistTracksRefObjectSchema = z.object({
  href: z
    .string()
    .meta({
      description:
        "A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n",
    })
    .exactOptional(),
  total: z.int().meta({ description: 'Number of tracks in the playlist.\n' }).exactOptional(),
})

export type PlaylistTracksRefObject = z.infer<typeof PlaylistTracksRefObjectSchema>

export const SimplifiedPlaylistObjectSchema = z.object({
  collaborative: z
    .boolean()
    .meta({ description: '`true` if the owner allows other users to modify the playlist.\n' })
    .exactOptional(),
  description: z
    .string()
    .meta({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    })
    .exactOptional(),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this playlist.\n',
  }).exactOptional(),
  href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    })
    .exactOptional(),
  images: z
    .array(ImageObjectSchema)
    .meta({
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    })
    .exactOptional(),
  name: z.string().meta({ description: 'The name of the playlist.\n' }).exactOptional(),
  owner: PlaylistOwnerObjectSchema.meta({
    description: 'The user who owns the playlist\n',
  }).exactOptional(),
  public: z
    .boolean()
    .meta({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    })
    .exactOptional(),
  snapshot_id: z
    .string()
    .meta({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    })
    .exactOptional(),
  items: PlaylistTracksRefObjectSchema.meta({
    description:
      "A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's items can be retrieved, along with the `total` number of items in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
  }).exactOptional(),
  tracks: PlaylistTracksRefObjectSchema.meta({
    description:
      "**Deprecated:** Use `items` instead. A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
    deprecated: true,
  }).exactOptional(),
  type: z.string().meta({ description: 'The object type: "playlist"\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    })
    .exactOptional(),
})

export type SimplifiedPlaylistObject = z.infer<typeof SimplifiedPlaylistObjectSchema>

export const PagingPlaylistObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SimplifiedPlaylistObjectSchema).exactOptional() }),
)

export type PagingPlaylistObject = z.infer<typeof PagingPlaylistObjectSchema>

export const PagingFeaturedPlaylistObjectSchema = z.object({
  message: z
    .string()
    .meta({
      description: 'The localized message of a playlist.\n',
      examples: ['Popular Playlists'],
    })
    .exactOptional(),
  playlists: PagingPlaylistObjectSchema.exactOptional(),
})

export type PagingFeaturedPlaylistObject = z.infer<typeof PagingFeaturedPlaylistObjectSchema>

export const ArtistDiscographyAlbumObjectSchema = z.intersection(
  SimplifiedAlbumObjectSchema,
  z.object({
    album_group: z
      .enum(['album', 'single', 'compilation', 'appears_on'])
      .meta({
        description: 'This field describes the relationship between the artist and the album.\n',
        examples: ['compilation'],
        deprecated: true,
      }),
  }),
)

export type ArtistDiscographyAlbumObject = z.infer<typeof ArtistDiscographyAlbumObjectSchema>

export const PagingArtistDiscographyAlbumObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(ArtistDiscographyAlbumObjectSchema).exactOptional() }),
)

export type PagingArtistDiscographyAlbumObject = z.infer<
  typeof PagingArtistDiscographyAlbumObjectSchema
>

export const PagingSimplifiedAlbumObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SimplifiedAlbumObjectSchema).exactOptional() }),
)

export type PagingSimplifiedAlbumObject = z.infer<typeof PagingSimplifiedAlbumObjectSchema>

export const PagingSimplifiedTrackObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SimplifiedTrackObjectSchema).exactOptional() }),
)

export type PagingSimplifiedTrackObject = z.infer<typeof PagingSimplifiedTrackObjectSchema>

export const AlbumObjectSchema = z.intersection(
  AlbumBaseSchema,
  z.object({
    artists: z
      .array(SimplifiedArtistObjectSchema)
      .meta({
        description:
          'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      })
      .exactOptional(),
    tracks: PagingSimplifiedTrackObjectSchema.meta({
      description: 'The tracks of the album.\n',
    }).exactOptional(),
    copyrights: z
      .array(CopyrightObjectSchema)
      .meta({ description: 'The copyright statements of the album.\n' })
      .exactOptional(),
    external_ids: ExternalIdObjectSchema.meta({
      description: 'Known external IDs for the album.\n',
    }).exactOptional(),
    genres: z
      .array(z.string())
      .meta({
        description: '**Deprecated** The array is always empty.\n',
        examples: [[]],
        deprecated: true,
      })
      .exactOptional(),
    label: z
      .string()
      .meta({ description: 'The label associated with the album.\n', deprecated: true })
      .exactOptional(),
    popularity: z
      .int()
      .meta({
        description:
          'The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.\n',
        deprecated: true,
      })
      .exactOptional(),
  }),
)

export type AlbumObject = z.infer<typeof AlbumObjectSchema>

export const SavedAlbumObjectSchema = z.object({
  added_at: z.iso
    .datetime({ offset: true })
    .meta({
      description:
        'The date and time the album was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    })
    .exactOptional(),
  album: AlbumObjectSchema.meta({ description: 'Information about the album.' }).exactOptional(),
})

export type SavedAlbumObject = z.infer<typeof SavedAlbumObjectSchema>

export const PagingSavedAlbumObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SavedAlbumObjectSchema).exactOptional() }),
)

export type PagingSavedAlbumObject = z.infer<typeof PagingSavedAlbumObjectSchema>

export const SavedTrackObjectSchema = z.object({
  added_at: z.iso
    .datetime({ offset: true })
    .meta({
      description:
        'The date and time the track was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    })
    .exactOptional(),
  track: TrackObjectSchema.meta({ description: 'Information about the track.' }).exactOptional(),
})

export type SavedTrackObject = z.infer<typeof SavedTrackObjectSchema>

export const PagingSavedTrackObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SavedTrackObjectSchema).exactOptional() }),
)

export type PagingSavedTrackObject = z.infer<typeof PagingSavedTrackObjectSchema>

export const PagingTrackObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(TrackObjectSchema).exactOptional() }),
)

export type PagingTrackObject = z.infer<typeof PagingTrackObjectSchema>

export const PagingPlaylistTrackObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(PlaylistTrackObjectSchema).exactOptional() }),
)

export type PagingPlaylistTrackObject = z.infer<typeof PagingPlaylistTrackObjectSchema>

export const PagingSimplifiedShowObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SimplifiedShowObjectSchema).exactOptional() }),
)

export type PagingSimplifiedShowObject = z.infer<typeof PagingSimplifiedShowObjectSchema>

export const SavedShowObjectSchema = z.object({
  added_at: z.iso
    .datetime({ offset: true })
    .meta({
      description:
        'The date and time the show was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    })
    .exactOptional(),
  show: SimplifiedShowObjectSchema.meta({
    description: 'Information about the show.',
  }).exactOptional(),
})

export type SavedShowObject = z.infer<typeof SavedShowObjectSchema>

export const PagingSavedShowObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SavedShowObjectSchema).exactOptional() }),
)

export type PagingSavedShowObject = z.infer<typeof PagingSavedShowObjectSchema>

export const SimplifiedEpisodeObjectSchema = EpisodeBaseSchema

export type SimplifiedEpisodeObject = z.infer<typeof SimplifiedEpisodeObjectSchema>

export const PagingSimplifiedEpisodeObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SimplifiedEpisodeObjectSchema).exactOptional() }),
)

export type PagingSimplifiedEpisodeObject = z.infer<typeof PagingSimplifiedEpisodeObjectSchema>

export const SavedEpisodeObjectSchema = z.object({
  added_at: z.iso
    .datetime({ offset: true })
    .meta({
      description:
        'The date and time the episode was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\n',
    })
    .exactOptional(),
  episode: EpisodeObjectSchema.meta({
    description: 'Information about the episode.',
  }).exactOptional(),
})

export type SavedEpisodeObject = z.infer<typeof SavedEpisodeObjectSchema>

export const PagingSavedEpisodeObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SavedEpisodeObjectSchema).exactOptional() }),
)

export type PagingSavedEpisodeObject = z.infer<typeof PagingSavedEpisodeObjectSchema>

export const AuthorObjectSchema = z.object({
  name: z.string().meta({ description: 'The name of the author.\n' }).exactOptional(),
})

export type AuthorObject = z.infer<typeof AuthorObjectSchema>

export const NarratorObjectSchema = z.object({
  name: z.string().meta({ description: 'The name of the Narrator.\n' }).exactOptional(),
})

export type NarratorObject = z.infer<typeof NarratorObjectSchema>

export const AudiobookBaseSchema = z.object({
  authors: z.array(AuthorObjectSchema).meta({ description: 'The author(s) for the audiobook.\n' }),
  available_markets: z
    .array(z.string())
    .meta({
      description:
        'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    }),
  copyrights: z
    .array(CopyrightObjectSchema)
    .meta({ description: 'The copyright statements of the audiobook.\n' }),
  description: z
    .string()
    .meta({
      description:
        'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    }),
  html_description: z
    .string()
    .meta({ description: 'A description of the audiobook. This field may contain HTML tags.\n' }),
  edition: z
    .string()
    .meta({ description: 'The edition of the audiobook.\n', examples: ['Unabridged'] })
    .exactOptional(),
  explicit: z
    .boolean()
    .meta({
      description:
        'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'External URLs for this audiobook.\n',
  }),
  href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint providing full details of the audiobook.\n',
    }),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
    }),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: 'The cover art for the audiobook in various sizes, widest first.\n' }),
  languages: z
    .array(z.string())
    .meta({
      description:
        'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    }),
  media_type: z.string().meta({ description: 'The media type of the audiobook.\n' }),
  name: z.string().meta({ description: 'The name of the audiobook.\n' }),
  narrators: z
    .array(NarratorObjectSchema)
    .meta({ description: 'The narrator(s) for the audiobook.\n' }),
  publisher: z
    .string()
    .meta({ description: 'The publisher of the audiobook.\n', deprecated: true }),
  type: z.literal('audiobook').meta({ description: 'The object type.\n' }),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
    }),
  total_chapters: z.int().meta({ description: 'The number of chapters in this audiobook.\n' }),
})

export type AudiobookBase = z.infer<typeof AudiobookBaseSchema>

export const SimplifiedAudiobookObjectSchema = AudiobookBaseSchema

export type SimplifiedAudiobookObject = z.infer<typeof SimplifiedAudiobookObjectSchema>

export const PagingSimplifiedAudiobookObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SimplifiedAudiobookObjectSchema).exactOptional() }),
)

export type PagingSimplifiedAudiobookObject = z.infer<typeof PagingSimplifiedAudiobookObjectSchema>

export const PagingArtistObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(ArtistObjectSchema).exactOptional() }),
)

export type PagingArtistObject = z.infer<typeof PagingArtistObjectSchema>

export const ChapterBaseSchema = z.object({
  audio_preview_url: z
    .string()
    .nullable()
    .meta({
      description:
        'A URL to a 30 second preview (MP3 format) of the chapter. `null` if not available.\n',
      examples: ['https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17'],
      deprecated: true,
    }),
  available_markets: z
    .array(z.string())
    .meta({
      description:
        'A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
      deprecated: true,
    })
    .exactOptional(),
  chapter_number: z.int().meta({ description: 'The number of the chapter\n', examples: [1] }),
  description: z
    .string()
    .meta({
      description:
        'A description of the chapter. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
      examples: [
        'We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.\n',
      ],
    }),
  html_description: z
    .string()
    .meta({
      description: 'A description of the chapter. This field may contain HTML tags.\n',
      examples: [
        '<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>\n',
      ],
    }),
  duration_ms: z
    .int()
    .meta({ description: 'The chapter length in milliseconds.\n', examples: [1686230] }),
  explicit: z
    .boolean()
    .meta({
      description:
        'Whether or not the chapter has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
  external_urls: ExternalUrlObjectSchema.meta({ description: 'External URLs for this chapter.\n' }),
  href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint providing full details of the chapter.\n',
      examples: ['https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ'],
    }),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
      examples: ['5Xt5DXGzch68nYYamXrNxZ'],
    }),
  images: z
    .array(ImageObjectSchema)
    .meta({ description: 'The cover art for the chapter in various sizes, widest first.\n' }),
  is_playable: z
    .boolean()
    .meta({
      description: 'True if the chapter is playable in the given market. Otherwise false.\n',
    }),
  languages: z
    .array(z.string())
    .meta({
      description:
        'A list of the languages used in the chapter, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
      examples: [['fr', 'en']],
    }),
  name: z
    .string()
    .meta({
      description: 'The name of the chapter.\n',
      examples: ['Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n'],
    }),
  release_date: z
    .string()
    .meta({
      description:
        'The date the chapter was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
      examples: ['1981-12-15'],
    }),
  release_date_precision: z
    .enum(['year', 'month', 'day'])
    .meta({
      description: 'The precision with which `release_date` value is known.\n',
      examples: ['day'],
    }),
  resume_point: ResumePointObjectSchema.meta({
    description:
      "The user's most recent position in the chapter. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
  }).exactOptional(),
  type: z.literal('episode').meta({ description: 'The object type.\n' }),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
      examples: ['spotify:episode:0zLhl3WsOCQHbe1BPTiHgr'],
    }),
  restrictions: ChapterRestrictionObjectSchema.meta({
    description: 'Included in the response when a content restriction is applied.\n',
  }).exactOptional(),
})

export type ChapterBase = z.infer<typeof ChapterBaseSchema>

export const SimplifiedChapterObjectSchema = ChapterBaseSchema

export type SimplifiedChapterObject = z.infer<typeof SimplifiedChapterObjectSchema>

export const PagingSimplifiedChapterObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SimplifiedChapterObjectSchema).exactOptional() }),
)

export type PagingSimplifiedChapterObject = z.infer<typeof PagingSimplifiedChapterObjectSchema>

export const RecommendationSeedObjectSchema = z.object({
  afterFilteringSize: z
    .int()
    .meta({
      description:
        'The number of tracks available after min\\_\\* and max\\_\\* filters have been applied.\n',
    })
    .exactOptional(),
  afterRelinkingSize: z
    .int()
    .meta({
      description: 'The number of tracks available after relinking for regional availability.\n',
    })
    .exactOptional(),
  href: z
    .string()
    .meta({
      description:
        'A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`.\n',
    })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.\n',
    })
    .exactOptional(),
  initialPoolSize: z
    .int()
    .meta({ description: 'The number of recommended tracks available for this seed.\n' })
    .exactOptional(),
  type: z
    .string()
    .meta({ description: 'The entity type of this seed. One of `artist`, `track` or `genre`.\n' })
    .exactOptional(),
})

export type RecommendationSeedObject = z.infer<typeof RecommendationSeedObjectSchema>

export const RecommendationsObjectSchema = z.object({
  seeds: z
    .array(RecommendationSeedObjectSchema)
    .meta({ description: 'An array of recommendation seed objects.\n' }),
  tracks: z
    .array(TrackObjectSchema)
    .meta({
      description: 'An array of track objects ordered according to the parameters supplied.\n',
    }),
})

export type RecommendationsObject = z.infer<typeof RecommendationsObjectSchema>

export const PlaylistObjectSchema = z.object({
  collaborative: z
    .boolean()
    .meta({ description: '`true` if the owner allows other users to modify the playlist.\n' })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    })
    .exactOptional(),
  external_urls: ExternalUrlObjectSchema.meta({
    description: 'Known external URLs for this playlist.\n',
  }).exactOptional(),
  href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    })
    .exactOptional(),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    })
    .exactOptional(),
  images: z
    .array(ImageObjectSchema)
    .meta({
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    })
    .exactOptional(),
  name: z.string().meta({ description: 'The name of the playlist.\n' }).exactOptional(),
  owner: PlaylistOwnerObjectSchema.meta({
    description: 'The user who owns the playlist\n',
  }).exactOptional(),
  public: z
    .boolean()
    .meta({
      description:
        "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    })
    .exactOptional(),
  snapshot_id: z
    .string()
    .meta({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    })
    .exactOptional(),
  items: PagingPlaylistTrackObjectSchema.meta({
    description:
      'The items of the playlist. _**Note**: This field is only available for playlists owned by the current user or playlists the user is a collaborator of._\n',
  }).exactOptional(),
  tracks: PagingPlaylistTrackObjectSchema.meta({
    description: '**Deprecated:** Use `items` instead. The tracks of the playlist.\n',
    deprecated: true,
  }).exactOptional(),
  type: z.string().meta({ description: 'The object type: "playlist"\n' }).exactOptional(),
  uri: z
    .string()
    .meta({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    })
    .exactOptional(),
  followers: FollowersObjectSchema.meta({
    description: 'Information about the followers of the playlist.',
  }).exactOptional(),
})

export type PlaylistObject = z.infer<typeof PlaylistObjectSchema>

export const CategoryObjectSchema = z.object({
  href: z
    .string()
    .meta({
      description: 'A link to the Web API endpoint returning full details of the category.\n',
    }),
  icons: z.array(ImageObjectSchema).meta({ description: 'The category icon, in various sizes.\n' }),
  id: z
    .string()
    .meta({
      description:
        'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\n',
      examples: ['equal'],
    }),
  name: z.string().meta({ description: 'The name of the category.\n', examples: ['EQUAL'] }),
})

export type CategoryObject = z.infer<typeof CategoryObjectSchema>

export const ShowObjectSchema = z.intersection(
  ShowBaseSchema,
  z.object({
    episodes: PagingSimplifiedEpisodeObjectSchema.meta({
      description: 'The episodes of the show.\n',
    }),
  }),
)

export type ShowObject = z.infer<typeof ShowObjectSchema>

export const AudiobookObjectSchema = z.intersection(
  AudiobookBaseSchema,
  z.object({
    chapters: PagingSimplifiedChapterObjectSchema.meta({
      description: 'The chapters of the audiobook.\n',
    }),
  }),
)

export type AudiobookObject = z.infer<typeof AudiobookObjectSchema>

export const ChapterObjectSchema = z.intersection(
  ChapterBaseSchema,
  z.object({
    audiobook: SimplifiedAudiobookObjectSchema.meta({
      description: 'The audiobook for which the chapter belongs.\n',
    }),
  }),
)

export type ChapterObject = z.infer<typeof ChapterObjectSchema>

export const CurrentlyPlayingObjectSchema = z.object({
  context: ContextObjectSchema.meta({
    description: 'A Context Object. Can be `null`.',
  }).exactOptional(),
  timestamp: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .meta({ description: 'Unix Millisecond Timestamp when data was fetched' })
    .exactOptional(),
  progress_ms: z
    .int()
    .meta({ description: 'Progress into the currently playing track or episode. Can be `null`.' })
    .exactOptional(),
  is_playing: z
    .boolean()
    .meta({ description: 'If something is currently playing, return `true`.' })
    .exactOptional(),
  item: z
    .xor([
      z.intersection(TrackObjectSchema, z.object({ type: z.literal('TrackObject') })),
      z.intersection(EpisodeObjectSchema, z.object({ type: z.literal('EpisodeObject') })),
    ])
    .meta({ description: 'The currently playing track or episode. Can be `null`.' })
    .exactOptional(),
  currently_playing_type: z
    .string()
    .meta({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    })
    .exactOptional(),
  actions: DisallowsObjectSchema.meta({
    description:
      'Allows to update the user interface based on which playback actions are available within the current context.\n',
  }).exactOptional(),
})

export type CurrentlyPlayingObject = z.infer<typeof CurrentlyPlayingObjectSchema>

export const SavedAudiobookObjectSchema = z.object({
  added_at: z.iso
    .datetime({ offset: true })
    .meta({
      description:
        'The date and time the audiobook was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
    })
    .exactOptional(),
  audiobook: AudiobookObjectSchema.meta({
    description: 'Information about the audiobook.',
  }).exactOptional(),
})

export type SavedAudiobookObject = z.infer<typeof SavedAudiobookObjectSchema>

export const PagingSavedAudiobookObjectSchema = z.intersection(
  PagingObjectSchema,
  z.object({ items: z.array(SavedAudiobookObjectSchema).exactOptional() }),
)

export type PagingSavedAudiobookObject = z.infer<typeof PagingSavedAudiobookObjectSchema>

export const PathAlbumIdParamsSchema = z
  .string()
  .meta({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
    examples: ['4aawyAB9vmqN3uQ7FjRGTy'],
  })
export const PathPlaylistIdParamsSchema = z
  .string()
  .meta({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    examples: ['3cEYpjA9oz9GiPac4AsH4n'],
  })
export const QueryMarketParamsSchema = z
  .string()
  .meta({
    description:
      'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
    examples: ['ES'],
  })
export const QueryLimitParamsSchema = z
  .preprocess(
    (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
    z.number().int().min(1).max(50),
  )
  .default(20)
  .meta({
    description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
    examples: [10],
  })
export const QueryOffsetParamsSchema = z
  .preprocess(
    (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
    z.number().int(),
  )
  .default(0)
  .meta({
    description:
      'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
    examples: [5],
  })
export const QueryAdditionalTypesParamsSchema = z
  .string()
  .meta({
    description:
      'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
  })
export const QueryAlbumIdsParamsSchema = z
  .string()
  .meta({
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
    examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
  })
export const PathArtistIdParamsSchema = z
  .string()
  .meta({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
    examples: ['0TnOYISbd1XYRBk9myaseg'],
  })
export const PathShowIdParamsSchema = z
  .string()
  .meta({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
    examples: ['38bS44xjbVVZ3No3ByF1dJ'],
  })
export const PathAudiobookIdParamsSchema = z
  .string()
  .meta({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
    examples: ['7iHfbu1YPACw6oZPAFJtqe'],
  })
export const QueryAudiobookIdsParamsSchema = z
  .string()
  .meta({
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
    examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
  })
export const PathChapterIdParamsSchema = z
  .string()
  .meta({
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
    examples: ['0D5wENdkdwbqlrHoaJ9g29'],
  })
export const QueryChapterIdsParamsSchema = z
  .string()
  .meta({
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
    examples: ['0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29'],
  })
export const QueryTrackIdsParamsSchema = z
  .string()
  .meta({
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
    examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
  })
export const QueryIncludeGroupsParamsSchema = z
  .string()
  .meta({
    description:
      'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
    examples: ['single,appears_on'],
  })
export const QueryShowIdsParamsSchema = z
  .string()
  .meta({
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
    examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
  })
export const PathUserIdParamsSchema = z
  .string()
  .meta({
    description:
      "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
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
  content: { 'application/json': { schema: z.object({ error: ErrorObjectSchema }) } },
}
export const ForbiddenResponse = {
  description:
    "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
  content: { 'application/json': { schema: z.object({ error: ErrorObjectSchema }) } },
}
export const NotFoundResponse = {
  description: 'The requested resource cannot be found.\n',
  content: { 'application/json': { schema: z.object({ error: ErrorObjectSchema }) } },
}
export const BadRequestResponse = {
  description: 'The request contains malformed data in path, query parameters, or body.\n',
  content: { 'application/json': { schema: z.object({ error: ErrorObjectSchema }) } },
}
export const TooManyRequestsResponse = {
  description: 'The app has exceeded its rate limits.\n',
  content: { 'application/json': { schema: z.object({ error: ErrorObjectSchema }) } },
}
export const ManyAlbumsResponse = {
  description: 'A set of albums',
  content: { 'application/json': { schema: z.object({ albums: z.array(AlbumObjectSchema) }) } },
}
export const ManyAudiobooksResponse = {
  description:
    "A set of audiobooks. If one of the requested audiobooks is unavailable then you'll find a `null` item in the `audiobooks` array where the audiobook object would otherwise be.",
  content: {
    'application/json': { schema: z.object({ audiobooks: z.array(AudiobookObjectSchema) }) },
  },
}
export const ManyChaptersResponse = {
  description: 'A set of chapters',
  content: { 'application/json': { schema: z.object({ chapters: z.array(ChapterObjectSchema) }) } },
}
export const ManyDevicesResponse = {
  description: 'A set of devices',
  content: { 'application/json': { schema: z.object({ devices: z.array(DeviceObjectSchema) }) } },
}
export const PagedAlbumsResponse = {
  description: 'A paged set of albums',
  content: {
    'application/json': { schema: z.object({ albums: PagingSimplifiedAlbumObjectSchema }) },
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
      schema: z.object({
        categories: z.intersection(
          PagingObjectSchema,
          z.object({ items: z.array(CategoryObjectSchema).exactOptional() }),
        ),
      }),
    },
  },
}
export const CursorPagedArtistsResponse = {
  description: 'A paged set of artists',
  content: {
    'application/json': { schema: z.object({ artists: CursorPagingSimplifiedArtistObjectSchema }) },
  },
}
export const CursorPagedPlayHistoryResponse = {
  description: 'A paged set of tracks',
  content: { 'application/json': { schema: CursorPagingPlayHistoryObjectSchema } },
}
export const ManyArtistsResponse = {
  description: 'A set of artists',
  content: { 'application/json': { schema: z.object({ artists: z.array(ArtistObjectSchema) }) } },
}
export const ManyAudioFeaturesResponse = {
  description: 'A set of audio features',
  content: {
    'application/json': {
      schema: z.object({ audio_features: z.array(AudioFeaturesObjectSchema) }),
    },
  },
}
export const ManyEpisodesResponse = {
  description: 'A set of episodes',
  content: { 'application/json': { schema: z.object({ episodes: z.array(EpisodeObjectSchema) }) } },
}
export const ManyGenresResponse = {
  description: 'A set of genres',
  content: {
    'application/json': {
      schema: z.object({
        genres: z.array(z.string()).meta({ examples: [['alternative', 'samba']] }),
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
  content: { 'application/json': { schema: z.array(ImageObjectSchema) } },
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
  content: { 'application/json': { schema: z.object({ tracks: z.array(TrackObjectSchema) }) } },
}
export const ManySimplifiedShowsResponse = {
  description: 'A set of shows',
  content: {
    'application/json': { schema: z.object({ shows: z.array(SimplifiedShowObjectSchema) }) },
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
      schema: z.object({
        tracks: PagingTrackObjectSchema.exactOptional(),
        artists: PagingArtistObjectSchema.exactOptional(),
        albums: PagingSimplifiedAlbumObjectSchema.exactOptional(),
        playlists: PagingPlaylistObjectSchema.exactOptional(),
        shows: PagingSimplifiedShowObjectSchema.exactOptional(),
        episodes: PagingSimplifiedEpisodeObjectSchema.exactOptional(),
        audiobooks: PagingSimplifiedAudiobookObjectSchema.exactOptional(),
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
    'application/json': { schema: z.array(z.boolean()).meta({ examples: [[false, true]] }) },
  },
}
export const SingletonArrayOfBooleanResponse = {
  description: 'Array of boolean, containing a single boolean',
  content: { 'application/json': { schema: z.array(z.boolean()).meta({ examples: [[true]] }) } },
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
      schema: z.object({
        snapshot_id: z
          .string()
          .meta({ examples: ['abc'] })
          .exactOptional(),
      }),
    },
  },
}
export const MarketsResponse = {
  description: 'A markets object with an array of country codes',
  content: {
    'application/json': {
      schema: z.object({
        markets: z
          .array(z.string())
          .meta({ examples: [['CA', 'BR', 'IT']] })
          .exactOptional(),
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

export const getAlbumsIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
        examples: ['4aawyAB9vmqN3uQ7FjRGTy'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: AlbumObjectSchema,
})

export const getAlbumsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
      }),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: z.object({ albums: z.array(AlbumObjectSchema) }),
})

export const getAlbumsIdTracksHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
        examples: ['4aawyAB9vmqN3uQ7FjRGTy'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingSimplifiedTrackObjectSchema,
})

export const getArtistsIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        examples: ['0TnOYISbd1XYRBk9myaseg'],
      }),
  }),
  response: ArtistObjectSchema,
})

export const getArtistsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
        examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
      }),
  }),
  response: z.object({ artists: z.array(ArtistObjectSchema) }),
})

export const getArtistsIdAlbumsHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        examples: ['0TnOYISbd1XYRBk9myaseg'],
      }),
  }),
  query: z.object({
    include_groups: z
      .string()
      .meta({
        description:
          'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
        examples: ['single,appears_on'],
      })
      .exactOptional(),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(10),
      )
      .default(5)
      .meta({
        description:
          'The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n',
        examples: [5],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingArtistDiscographyAlbumObjectSchema,
})

export const getArtistsIdTopTracksHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        examples: ['0TnOYISbd1XYRBk9myaseg'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: z.object({ tracks: z.array(TrackObjectSchema) }),
})

export const getArtistsIdRelatedArtistsHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        examples: ['0TnOYISbd1XYRBk9myaseg'],
      }),
  }),
  response: z.object({ artists: z.array(ArtistObjectSchema) }),
})

export const getShowsIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
        examples: ['38bS44xjbVVZ3No3ByF1dJ'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: ShowObjectSchema,
})

export const getShowsHandler = defineHandler({
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
      }),
  }),
  response: z.object({ shows: z.array(SimplifiedShowObjectSchema) }),
})

export const getShowsIdEpisodesHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
        examples: ['38bS44xjbVVZ3No3ByF1dJ'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingSimplifiedEpisodeObjectSchema,
})

export const getEpisodesIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
        examples: ['512ojhOuo1ktJprKbVcKyQ'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: EpisodeObjectSchema,
})

export const getEpisodesHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
        examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
      }),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: z.object({ episodes: z.array(EpisodeObjectSchema) }),
})

export const getAudiobooksIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
        examples: ['7iHfbu1YPACw6oZPAFJtqe'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: AudiobookObjectSchema,
})

export const getAudiobooksHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
      }),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: z.object({ audiobooks: z.array(AudiobookObjectSchema) }),
})

export const getAudiobooksIdChaptersHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
        examples: ['7iHfbu1YPACw6oZPAFJtqe'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingSimplifiedChapterObjectSchema,
})

export const getMeAudiobooksHandler = defineHandler({
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingSavedAudiobookObjectSchema,
})

export const putMeAudiobooksHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
      }),
  }),
})

export const deleteMeAudiobooksHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
      }),
  }),
})

export const getMeAudiobooksContainsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        examples: ['18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'],
      }),
  }),
  response: z.array(z.boolean()).meta({ examples: [[false, true]] }),
})

export const getMeHandler = defineHandler({ response: PrivateUserObjectSchema })

export const getMePlaylistsHandler = defineHandler({
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingPlaylistObjectSchema,
})

export const postMePlaylistsHandler = defineHandler({
  json: z
    .looseObject({
      name: z
        .string()
        .meta({
          description:
            'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
        }),
      public: z
        .boolean()
        .meta({
          description:
            "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        })
        .exactOptional(),
      collaborative: z
        .boolean()
        .meta({
          description:
            'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
        })
        .exactOptional(),
      description: z
        .string()
        .meta({
          description:
            'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        })
        .exactOptional(),
    })
    .meta({
      examples: [{ name: 'New Playlist', description: 'New playlist description', public: false }],
    }),
  response: PlaylistObjectSchema,
})

export const putMeLibraryHandler = defineHandler({
  query: z.object({
    uris: z
      .string()
      .meta({
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
      }),
  }),
})

export const deleteMeLibraryHandler = defineHandler({
  query: z.object({
    uris: z
      .string()
      .meta({
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        examples: ['spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy'],
      }),
  }),
})

export const getMeLibraryContainsHandler = defineHandler({
  query: z.object({
    uris: z
      .string()
      .meta({
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 40 URIs.\n\nSupported URI types:\n- `spotify:track:{id}`\n- `spotify:album:{id}`\n- `spotify:episode:{id}`\n- `spotify:show:{id}`\n- `spotify:audiobook:{id}`\n- `spotify:artist:{id}`\n- `spotify:user:{id}`\n- `spotify:playlist:{id}`\n',
        examples: [
          'spotify:track:7a3LWj5xSFhFRYmztS8wgK,spotify:album:4aawyAB9vmqN3uQ7FjRGTy,spotify:artist:2takcwOaAZWiXQijPHIx7B',
        ],
      }),
  }),
  response: z.array(z.boolean()).meta({ examples: [[false, true]] }),
})

export const getMeAlbumsHandler = defineHandler({
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: PagingSavedAlbumObjectSchema,
})

export const putMeAlbumsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
      }),
  }),
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      })
      .exactOptional(),
  }),
})

export const deleteMeAlbumsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
      }),
  }),
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      })
      .exactOptional(),
  }),
})

export const getMeAlbumsContainsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        examples: ['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'],
      }),
  }),
  response: z.array(z.boolean()).meta({ examples: [[false, true]] }),
})

export const getMeTracksHandler = defineHandler({
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingSavedTrackObjectSchema,
})

export const putMeTracksHandler = defineHandler({
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
      }),
    timestamped_ids: z
      .array(
        z.object({
          id: z
            .string()
            .meta({
              description:
                'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            }),
          added_at: z.iso
            .datetime({ offset: true })
            .meta({
              description:
                "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
            }),
        }),
      )
      .meta({
        description:
          "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
      })
      .exactOptional(),
  }),
})

export const deleteMeTracksHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
      }),
  }),
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      })
      .exactOptional(),
  }),
})

export const getMeTracksContainsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
      }),
  }),
  response: z.array(z.boolean()).meta({ examples: [[false, true]] }),
})

export const getMeEpisodesHandler = defineHandler({
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingSavedEpisodeObjectSchema,
})

export const putMeEpisodesHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
        examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
      }),
  }),
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      }),
  }),
})

export const deleteMeEpisodesHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
      }),
  }),
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      })
      .exactOptional(),
  }),
})

export const getMeEpisodesContainsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
        examples: ['77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'],
      }),
  }),
  response: z.array(z.boolean()).meta({ examples: [[false, true]] }),
})

export const getMeShowsHandler = defineHandler({
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingSavedShowObjectSchema,
})

export const putMeShowsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
      }),
  }),
  json: z.object({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
      })
      .exactOptional(),
  }),
})

export const deleteMeShowsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
      }),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  json: z.object({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
      })
      .exactOptional(),
  }),
})

export const getMeShowsContainsHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        examples: ['5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'],
      }),
  }),
  response: z.array(z.boolean()).meta({ examples: [[false, true]] }),
})

export const getMeFollowingHandler = defineHandler({
  query: z.object({
    type: z
      .literal('artist')
      .meta({
        description: 'The ID type: currently only `artist` is supported.\n',
        examples: ['artist'],
      }),
    after: z
      .string()
      .meta({
        description: 'The last artist ID retrieved from the previous request.\n',
        examples: ['0I2XqVXqHScXjHhk6AYYRe'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
  }),
  response: z.object({ artists: CursorPagingSimplifiedArtistObjectSchema }),
})

export const putMeFollowingHandler = defineHandler({
  query: z.object({
    type: z.enum(['artist', 'user']).meta({ description: 'The ID type.\n', examples: ['artist'] }),
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
        examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
      }),
  }),
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      }),
  }),
})

export const deleteMeFollowingHandler = defineHandler({
  query: z.object({
    type: z
      .enum(['artist', 'user'])
      .meta({ description: 'The ID type: either `artist` or `user`.\n', examples: ['artist'] }),
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
      }),
  }),
  json: z.looseObject({
    ids: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
      })
      .exactOptional(),
  }),
})

export const getMeFollowingContainsHandler = defineHandler({
  query: z.object({
    type: z
      .enum(['artist', 'user'])
      .meta({ description: 'The ID type: either `artist` or `user`.\n', examples: ['artist'] }),
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        examples: ['2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'],
      }),
  }),
  response: z.array(z.boolean()).meta({ examples: [[false, true]] }),
})

export const getMePlayerHandler = defineHandler({
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    additional_types: z
      .string()
      .meta({
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      })
      .exactOptional(),
  }),
  response: CurrentlyPlayingContextObjectSchema,
})

export const putMePlayerHandler = defineHandler({
  json: z
    .looseObject({
      device_ids: z
        .array(z.string())
        .meta({
          description:
            'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
        }),
      play: z
        .boolean()
        .meta({
          description:
            '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
        })
        .exactOptional(),
    })
    .meta({ examples: [{ device_ids: ['74ASZWbe4lXaubB36ztrGX'] }] }),
})

export const getMePlayerDevicesHandler = defineHandler({
  response: z.object({ devices: z.array(DeviceObjectSchema) }),
})

export const getMePlayerCurrentlyPlayingHandler = defineHandler({
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    additional_types: z
      .string()
      .meta({
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      })
      .exactOptional(),
  }),
  response: CurrentlyPlayingObjectSchema,
})

export const putMePlayerPlayHandler = defineHandler({
  query: z.object({
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
  json: z
    .looseObject({
      context_uri: z
        .string()
        .meta({
          description:
            'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
        })
        .exactOptional(),
      uris: z
        .array(z.string())
        .meta({
          description:
            'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
        })
        .exactOptional(),
      offset: z
        .any()
        .meta({
          description:
            'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
        })
        .exactOptional(),
      position_ms: z
        .int()
        .meta({
          description:
            'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
        })
        .exactOptional(),
    })
    .meta({
      examples: [
        {
          context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
          offset: { position: 5 },
          position_ms: 0,
        },
      ],
    }),
})

export const putMePlayerPauseHandler = defineHandler({
  query: z.object({
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const postMePlayerNextHandler = defineHandler({
  query: z.object({
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const postMePlayerPreviousHandler = defineHandler({
  query: z.object({
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const putMePlayerSeekHandler = defineHandler({
  query: z.object({
    position_ms: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
        examples: [25000],
      }),
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const putMePlayerRepeatHandler = defineHandler({
  query: z.object({
    state: z
      .string()
      .meta({
        description:
          '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
        examples: ['context'],
      }),
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const putMePlayerVolumeHandler = defineHandler({
  query: z.object({
    volume_percent: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description: 'The volume to set. Must be a value from 0 to 100 inclusive.\n',
        examples: [50],
      }),
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const putMePlayerShuffleHandler = defineHandler({
  query: z.object({
    state: z
      .stringbool()
      .meta({
        description:
          "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
        examples: [true],
      }),
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const getMePlayerRecentlyPlayedHandler = defineHandler({
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    after: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
        examples: [1484811043508],
      })
      .exactOptional(),
    before: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
      })
      .exactOptional(),
  }),
  response: CursorPagingPlayHistoryObjectSchema,
})

export const getMePlayerQueueHandler = defineHandler({ response: QueueObjectSchema })

export const postMePlayerQueueHandler = defineHandler({
  query: z.object({
    uri: z
      .string()
      .meta({
        description:
          'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
        examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'],
      }),
    device_id: z
      .string()
      .meta({
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
        examples: ['0d1841b0976bae2a3a310dd74c0f3df354899bc8'],
      })
      .exactOptional(),
  }),
})

export const getMeTopArtistsHandler = defineHandler({
  query: z.object({
    time_range: z
      .string()
      .default('medium_term')
      .meta({
        description:
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
        examples: ['medium_term'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingArtistObjectSchema,
})

export const getMeTopTracksHandler = defineHandler({
  query: z.object({
    time_range: z
      .string()
      .default('medium_term')
      .meta({
        description:
          'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
        examples: ['medium_term'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingTrackObjectSchema,
})

export const getChaptersIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
        examples: ['0D5wENdkdwbqlrHoaJ9g29'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: ChapterObjectSchema,
})

export const getChaptersHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
        examples: ['0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29'],
      }),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: z.object({ chapters: z.array(ChapterObjectSchema) }),
})

export const getTracksIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        examples: ['11dFghVXANMlKmJXsNCbNl'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
  }),
  response: TrackObjectSchema,
})

export const getTracksHandler = defineHandler({
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
      }),
  }),
  response: z.object({ tracks: z.array(TrackObjectSchema) }),
})

export const getSearchHandler = defineHandler({
  query: z.object({
    q: z
      .string()
      .meta({
        description:
          'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
        examples: ['remaster%20track:Doxy%20artist:Miles%20Davis'],
      }),
    type: z
      .preprocess(
        (val) => (val === undefined || Array.isArray(val) ? val : [val]),
        z.array(z.enum(['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook'])),
      )
      .meta({
        description:
          'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
      }),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(10),
      )
      .default(5)
      .meta({
        description: 'The maximum number of results to return in each item type.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(1000),
      )
      .default(0)
      .meta({
        description:
          'The index of the first result to return. Use\nwith limit to get the next page of search results.\n',
        examples: [5],
      })
      .exactOptional(),
    include_external: z
      .literal('audio')
      .meta({
        description:
          'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n',
      })
      .exactOptional(),
  }),
  response: z.object({
    tracks: PagingTrackObjectSchema.exactOptional(),
    artists: PagingArtistObjectSchema.exactOptional(),
    albums: PagingSimplifiedAlbumObjectSchema.exactOptional(),
    playlists: PagingPlaylistObjectSchema.exactOptional(),
    shows: PagingSimplifiedShowObjectSchema.exactOptional(),
    episodes: PagingSimplifiedEpisodeObjectSchema.exactOptional(),
    audiobooks: PagingSimplifiedAudiobookObjectSchema.exactOptional(),
  }),
})

export const getPlaylistsPlaylistIdHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    fields: z
      .string()
      .meta({
        description:
          "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
        examples: ['items(added_by.id,track(name,href,album(name,href)))'],
      })
      .exactOptional(),
    additional_types: z
      .string()
      .meta({
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      })
      .exactOptional(),
  }),
  response: PlaylistObjectSchema,
})

export const putPlaylistsPlaylistIdHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  json: z
    .looseObject({
      name: z
        .string()
        .meta({
          description: 'The new name for the playlist, for example `"My New Playlist Title"`\n',
        })
        .exactOptional(),
      public: z
        .boolean()
        .meta({
          description:
            "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        })
        .exactOptional(),
      collaborative: z
        .boolean()
        .meta({
          description:
            'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
        })
        .exactOptional(),
      description: z
        .string()
        .meta({
          description:
            'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        })
        .exactOptional(),
    })
    .meta({
      examples: [
        {
          name: 'Updated Playlist Name',
          description: 'Updated playlist description',
          public: false,
        },
      ],
    }),
})

export const getPlaylistsPlaylistIdTracksHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    fields: z
      .string()
      .meta({
        description:
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
        examples: ['items(added_by.id,track(name,href,album(name,href)))'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(100),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
    additional_types: z
      .string()
      .meta({
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      })
      .exactOptional(),
  }),
  response: PagingPlaylistTrackObjectSchema,
})

export const putPlaylistsPlaylistIdTracksHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    uris: z
      .string()
      .meta({
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
      })
      .exactOptional(),
  }),
  json: z
    .looseObject({
      uris: z.array(z.string()).exactOptional(),
      range_start: z
        .int()
        .meta({ description: 'The position of the first item to be reordered.\n' })
        .exactOptional(),
      insert_before: z
        .int()
        .meta({
          description:
            'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        })
        .exactOptional(),
      range_length: z
        .int()
        .meta({
          description:
            'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        })
        .exactOptional(),
      snapshot_id: z
        .string()
        .meta({
          description: "The playlist's snapshot ID against which you want to make the changes.\n",
        })
        .exactOptional(),
    })
    .meta({ examples: [{ range_start: 1, insert_before: 3, range_length: 2 }] }),
  response: z.object({
    snapshot_id: z
      .string()
      .meta({ examples: ['abc'] })
      .exactOptional(),
  }),
})

export const postPlaylistsPlaylistIdTracksHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    position: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
        examples: [0],
      })
      .exactOptional(),
    uris: z
      .string()
      .meta({
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
        examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M'],
      })
      .exactOptional(),
  }),
  json: z.looseObject({
    uris: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
      })
      .exactOptional(),
    position: z
      .int()
      .meta({
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
      })
      .exactOptional(),
  }),
  response: z.object({
    snapshot_id: z
      .string()
      .meta({ examples: ['abc'] })
      .exactOptional(),
  }),
})

export const deletePlaylistsPlaylistIdTracksHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  json: z.object({
    tracks: z
      .array(z.object({ uri: z.string().meta({ description: 'Spotify URI' }).exactOptional() }))
      .meta({
        description:
          'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
      }),
    snapshot_id: z
      .string()
      .meta({
        description:
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
      })
      .exactOptional(),
  }),
  response: z.object({
    snapshot_id: z
      .string()
      .meta({ examples: ['abc'] })
      .exactOptional(),
  }),
})

export const getPlaylistsPlaylistIdItemsHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    fields: z
      .string()
      .meta({
        description:
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
        examples: ['items(added_by.id,track(name,href,album(name,href)))'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
    additional_types: z
      .string()
      .meta({
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      })
      .exactOptional(),
  }),
  response: PagingPlaylistTrackObjectSchema,
})

export const putPlaylistsPlaylistIdItemsHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    uris: z
      .string()
      .meta({
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
      })
      .exactOptional(),
  }),
  json: z
    .looseObject({
      uris: z.array(z.string()).exactOptional(),
      range_start: z
        .int()
        .meta({ description: 'The position of the first item to be reordered.\n' })
        .exactOptional(),
      insert_before: z
        .int()
        .meta({
          description:
            'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        })
        .exactOptional(),
      range_length: z
        .int()
        .meta({
          description:
            'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        })
        .exactOptional(),
      snapshot_id: z
        .string()
        .meta({
          description: "The playlist's snapshot ID against which you want to make the changes.\n",
        })
        .exactOptional(),
    })
    .meta({ examples: [{ range_start: 1, insert_before: 3, range_length: 2 }] }),
  response: z.object({
    snapshot_id: z
      .string()
      .meta({ examples: ['abc'] })
      .exactOptional(),
  }),
})

export const postPlaylistsPlaylistIdItemsHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    position: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
        examples: [0],
      })
      .exactOptional(),
    uris: z
      .string()
      .meta({
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
        examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M'],
      })
      .exactOptional(),
  }),
  json: z.looseObject({
    uris: z
      .array(z.string())
      .meta({
        description:
          'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
      })
      .exactOptional(),
    position: z
      .int()
      .meta({
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
      })
      .exactOptional(),
  }),
  response: z.object({
    snapshot_id: z
      .string()
      .meta({ examples: ['abc'] })
      .exactOptional(),
  }),
})

export const deletePlaylistsPlaylistIdItemsHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  json: z.object({
    items: z
      .array(z.object({ uri: z.string().meta({ description: 'Spotify URI' }).exactOptional() }))
      .meta({
        description:
          'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "items": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
      }),
    snapshot_id: z
      .string()
      .meta({
        description:
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
      })
      .exactOptional(),
  }),
  response: z.object({
    snapshot_id: z
      .string()
      .meta({ examples: ['abc'] })
      .exactOptional(),
  }),
})

export const putPlaylistsPlaylistIdFollowersHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  json: z
    .looseObject({
      public: z
        .boolean()
        .meta({
          description:
            "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        })
        .exactOptional(),
    })
    .meta({ examples: [{ public: false }] }),
})

export const deletePlaylistsPlaylistIdFollowersHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
})

export const getPlaylistsPlaylistIdImagesHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  response: z.array(ImageObjectSchema),
})

export const putPlaylistsPlaylistIdImagesHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
})

export const getPlaylistsPlaylistIdFollowersContainsHandler = defineHandler({
  param: z.object({
    playlist_id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        examples: ['3cEYpjA9oz9GiPac4AsH4n'],
      }),
  }),
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
        examples: ['jmperezperez'],
      })
      .exactOptional(),
  }),
  response: z.array(z.boolean()).meta({ examples: [[true]] }),
})

export const getUsersUserIdHandler = defineHandler({
  param: z.object({
    user_id: z
      .string()
      .meta({
        description:
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        examples: ['smedjan'],
      }),
  }),
  response: PublicUserObjectSchema,
})

export const getUsersUserIdPlaylistsHandler = defineHandler({
  param: z.object({
    user_id: z
      .string()
      .meta({
        description:
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        examples: ['smedjan'],
      }),
  }),
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingPlaylistObjectSchema,
})

export const postUsersUserIdPlaylistsHandler = defineHandler({
  param: z.object({
    user_id: z
      .string()
      .meta({
        description:
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        examples: ['smedjan'],
      }),
  }),
  json: z
    .looseObject({
      name: z
        .string()
        .meta({
          description:
            'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
        }),
      public: z
        .boolean()
        .meta({
          description:
            "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        })
        .exactOptional(),
      collaborative: z
        .boolean()
        .meta({
          description:
            'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
        })
        .exactOptional(),
      description: z
        .string()
        .meta({
          description:
            'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        })
        .exactOptional(),
    })
    .meta({
      examples: [{ name: 'New Playlist', description: 'New playlist description', public: false }],
    }),
  response: PlaylistObjectSchema,
})

export const getBrowseFeaturedPlaylistsHandler = defineHandler({
  query: z.object({
    locale: z
      .string()
      .meta({
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
        examples: ['sv_SE'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingFeaturedPlaylistObjectSchema,
})

export const getBrowseCategoriesHandler = defineHandler({
  query: z.object({
    locale: z
      .string()
      .meta({
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
        examples: ['sv_SE'],
      })
      .exactOptional(),
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: z.object({
    categories: z.intersection(
      PagingObjectSchema,
      z.object({ items: z.array(CategoryObjectSchema).exactOptional() }),
    ),
  }),
})

export const getBrowseCategoriesCategoryIdHandler = defineHandler({
  param: z.object({
    category_id: z
      .string()
      .meta({
        description:
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
        examples: ['dinner'],
      }),
  }),
  query: z.object({
    locale: z
      .string()
      .meta({
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
        examples: ['sv_SE'],
      })
      .exactOptional(),
  }),
  response: CategoryObjectSchema,
})

export const getBrowseCategoriesCategoryIdPlaylistsHandler = defineHandler({
  param: z.object({
    category_id: z
      .string()
      .meta({
        description:
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
        examples: ['dinner'],
      }),
  }),
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: PagingFeaturedPlaylistObjectSchema,
})

export const getBrowseNewReleasesHandler = defineHandler({
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(50),
      )
      .default(20)
      .meta({
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        examples: [10],
      })
      .exactOptional(),
    offset: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .default(0)
      .meta({
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        examples: [5],
      })
      .exactOptional(),
  }),
  response: z.object({ albums: PagingSimplifiedAlbumObjectSchema }),
})

export const getAudioFeaturesHandler = defineHandler({
  query: z.object({
    ids: z
      .string()
      .meta({
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
        examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
      }),
  }),
  response: z.object({ audio_features: z.array(AudioFeaturesObjectSchema) }),
})

export const getAudioFeaturesIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
        examples: ['11dFghVXANMlKmJXsNCbNl'],
      }),
  }),
  response: AudioFeaturesObjectSchema,
})

export const getAudioAnalysisIdHandler = defineHandler({
  param: z.object({
    id: z
      .string()
      .meta({
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        examples: ['11dFghVXANMlKmJXsNCbNl'],
      }),
  }),
  response: AudioAnalysisObjectSchema,
})

export const getRecommendationsHandler = defineHandler({
  query: z.object({
    limit: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(1).max(100),
      )
      .default(20)
      .meta({
        description:
          'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
        examples: [10],
      })
      .exactOptional(),
    market: z
      .string()
      .meta({
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        examples: ['ES'],
      })
      .exactOptional(),
    seed_artists: z
      .string()
      .meta({
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
        examples: ['4NHQUGzhtTLFvgF5SZesLK'],
      })
      .exactOptional(),
    seed_genres: z
      .string()
      .meta({
        description:
          'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
        examples: ['classical,country'],
      })
      .exactOptional(),
    seed_tracks: z
      .string()
      .meta({
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
        examples: ['0c6xIDDpzE81m2q797ordA'],
      })
      .exactOptional(),
    min_acousticness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_acousticness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_acousticness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_danceability: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_danceability: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_danceability: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_duration_ms: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_duration_ms: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_duration_ms: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({ description: 'Target duration of the track (ms)' })
      .exactOptional(),
    min_energy: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_energy: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_energy: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_instrumentalness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_instrumentalness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_instrumentalness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_key: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(11),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_key: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(11),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_key: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(11),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_liveness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_liveness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_liveness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_loudness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number(),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_loudness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number(),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_loudness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number(),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_mode: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_mode: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_mode: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_popularity: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(100),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_popularity: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(100),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_popularity: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0).max(100),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_speechiness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_speechiness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_speechiness: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_tempo: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number(),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_tempo: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number(),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_tempo: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number(),
      )
      .meta({ description: 'Target tempo (BPM)' })
      .exactOptional(),
    min_time_signature: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().max(11),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_time_signature: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_time_signature: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
    min_valence: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      })
      .exactOptional(),
    max_valence: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      })
      .exactOptional(),
    target_valence: z
      .preprocess(
        (val) =>
          typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
            ? Number(val)
            : val,
        z.number().min(0).max(1),
      )
      .meta({
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      })
      .exactOptional(),
  }),
  response: RecommendationsObjectSchema,
})

export const getRecommendationsAvailableGenreSeedsHandler = defineHandler({
  response: z.object({
    genres: z.array(z.string()).meta({ examples: [['alternative', 'samba']] }),
  }),
})

export const getMarketsHandler = defineHandler({
  response: z.object({
    markets: z
      .array(z.string())
      .meta({ examples: [['CA', 'BR', 'IT']] })
      .exactOptional(),
  }),
})
