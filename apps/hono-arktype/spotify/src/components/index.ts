import { type } from 'arktype'

export const ExternalUrlObjectSchema = type({
  'spotify?': type('string').describe(
    'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\n',
  ),
})

export type ExternalUrlObject = typeof ExternalUrlObjectSchema.infer

export const LinkedTrackObjectSchema = type({
  'external_urls?': ExternalUrlObjectSchema.describe('Known external URLs for this track.\n'),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the track.\n',
  ),
  'id?': type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
  ),
  'type?': type('string').describe('The object type: "track".\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
  ),
})

export type LinkedTrackObject = typeof LinkedTrackObjectSchema.infer

export const TrackRestrictionObjectSchema = type({
  'reason?': type('string').describe(
    "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
  ),
})

export type TrackRestrictionObject = typeof TrackRestrictionObjectSchema.infer

export const AlbumRestrictionObjectSchema = type({
  'reason?': type("'market' | 'product' | 'explicit'").describe(
    "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n",
  ),
})

export type AlbumRestrictionObject = typeof AlbumRestrictionObjectSchema.infer

export const EpisodeRestrictionObjectSchema = type({
  'reason?': type('string').describe(
    "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
  ),
})

export type EpisodeRestrictionObject = typeof EpisodeRestrictionObjectSchema.infer

export const ChapterRestrictionObjectSchema = type({
  'reason?': type('string').describe(
    "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n- `payment_required` - Payment is required to play the content item.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
  ),
})

export type ChapterRestrictionObject = typeof ChapterRestrictionObjectSchema.infer

export const FollowersObjectSchema = type({
  'href?': type('string | null').describe(
    'This will always be set to null, as the Web API does not support it at the moment.\n',
  ),
  'total?': type('number.integer').describe('The total number of followers.\n'),
})

export type FollowersObject = typeof FollowersObjectSchema.infer

export const ImageObjectSchema = type({
  url: type('string').describe('The source URL of the image.\n'),
  height: type('number.integer | null').describe('The image height in pixels.\n'),
  width: type('number.integer | null').describe('The image width in pixels.\n'),
})

export type ImageObject = typeof ImageObjectSchema.infer

export const ArtistObjectSchema = type({
  'external_urls?': ExternalUrlObjectSchema.describe('Known external URLs for this artist.\n'),
  'followers?': FollowersObjectSchema.describe('Information about the followers of the artist.\n'),
  'genres?': type('string[]').describe(
    'A list of the genres the artist is associated with. If not yet classified, the array is empty.\n',
  ),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the artist.\n',
  ),
  'id?': type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
  ),
  'images?': type(ImageObjectSchema)
    .array()
    .describe('Images of the artist in various sizes, widest first.\n'),
  'name?': type('string').describe('The name of the artist.\n'),
  'popularity?': type('number.integer').describe(
    "The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n",
  ),
  'type?': type("'artist'").describe('The object type.\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
  ),
})

export type ArtistObject = typeof ArtistObjectSchema.infer

export const SimplifiedArtistObjectSchema = type({
  'external_urls?': ExternalUrlObjectSchema.describe('Known external URLs for this artist.\n'),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the artist.\n',
  ),
  'id?': type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
  ),
  'name?': type('string').describe('The name of the artist.\n'),
  'type?': type("'artist'").describe('The object type.\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
  ),
})

export type SimplifiedArtistObject = typeof SimplifiedArtistObjectSchema.infer

export const AlbumBaseSchema = type({
  album_type: type("'album' | 'single' | 'compilation'").describe('The type of the album.\n'),
  total_tracks: type('number.integer').describe('The number of tracks in the album.'),
  available_markets: type('string[]').describe(
    'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n',
  ),
  external_urls: ExternalUrlObjectSchema.describe('Known external URLs for this album.\n'),
  href: type('string').describe(
    'A link to the Web API endpoint providing full details of the album.\n',
  ),
  id: type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
  ),
  images: type(ImageObjectSchema)
    .array()
    .describe('The cover art for the album in various sizes, widest first.\n'),
  name: type('string').describe(
    'The name of the album. In case of an album takedown, the value may be an empty string.\n',
  ),
  release_date: type('string').describe('The date the album was first released.\n'),
  release_date_precision: type("'year' | 'month' | 'day'").describe(
    'The precision with which `release_date` value is known.\n',
  ),
  'restrictions?': AlbumRestrictionObjectSchema.describe(
    'Included in the response when a content restriction is applied.\n',
  ),
  type: type("'album'").describe('The object type.\n'),
  uri: type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
  ),
})

export type AlbumBase = typeof AlbumBaseSchema.infer

export const SimplifiedAlbumObjectSchema = type(AlbumBaseSchema).and(
  type({
    artists: type(SimplifiedArtistObjectSchema)
      .array()
      .describe(
        'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      ),
  }),
)

export type SimplifiedAlbumObject = typeof SimplifiedAlbumObjectSchema.infer

export const ExternalIdObjectSchema = type({
  'isrc?': type('string').describe(
    '[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n',
  ),
  'ean?': type('string').describe(
    '[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n',
  ),
  'upc?': type('string').describe(
    '[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n',
  ),
})

export type ExternalIdObject = typeof ExternalIdObjectSchema.infer

export const TrackObjectSchema = type({
  'album?': SimplifiedAlbumObjectSchema.describe(
    'The album on which the track appears. The album object includes a link in `href` to full information about the album.\n',
  ),
  'artists?': type(SimplifiedArtistObjectSchema)
    .array()
    .describe(
      'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    ),
  'available_markets?': type('string[]').describe(
    'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
  ),
  'disc_number?': type('number.integer').describe(
    'The disc number (usually `1` unless the album consists of more than one disc).\n',
  ),
  'duration_ms?': type('number.integer').describe('The track length in milliseconds.\n'),
  'explicit?': type('boolean').describe(
    'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n',
  ),
  'external_ids?': ExternalIdObjectSchema.describe('Known external IDs for the track.\n'),
  'external_urls?': ExternalUrlObjectSchema.describe('Known external URLs for this track.\n'),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the track.\n',
  ),
  'id?': type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
  ),
  'is_playable?': type('boolean').describe(
    'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
  ),
  'linked_from?': LinkedTrackObjectSchema.describe(
    'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track.',
  ),
  'restrictions?': TrackRestrictionObjectSchema.describe(
    'Included in the response when a content restriction is applied.\n',
  ),
  'name?': type('string').describe('The name of the track.\n'),
  'popularity?': type('number.integer').describe(
    'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n',
  ),
  'preview_url?': type('string | null').describe(
    'A link to a 30 second preview (MP3 format) of the track. Can be `null`\n',
  ),
  'track_number?': type('number.integer').describe(
    'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
  ),
  'type?': type("'track'").describe('The object type: "track".\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
  ),
  'is_local?': type('boolean').describe('Whether or not the track is from a local file.\n'),
})

export type TrackObject = typeof TrackObjectSchema.infer

export const ContextObjectSchema = type({
  'type?': type('string').describe(
    'The object type, e.g. "artist", "playlist", "album", "show".\n',
  ),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the track.',
  ),
  'external_urls?': ExternalUrlObjectSchema.describe('External URLs for this context.'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.\n',
  ),
})

export type ContextObject = typeof ContextObjectSchema.infer

export const PlayHistoryObjectSchema = type({
  'track?': TrackObjectSchema.describe('The track the user listened to.'),
  'played_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('The date and time the track was played.'),
  'context?': ContextObjectSchema.describe('The context the track was played from.'),
})

export type PlayHistoryObject = typeof PlayHistoryObjectSchema.infer

export const PlaylistUserObjectSchema = type({
  'external_urls?': ExternalUrlObjectSchema.describe('Known public external URLs for this user.\n'),
  'href?': type('string').describe('A link to the Web API endpoint for this user.\n'),
  'id?': type('string').describe(
    'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
  ),
  'type?': type("'user'").describe('The object type.\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
  ),
})

export type PlaylistUserObject = typeof PlaylistUserObjectSchema.infer

export const ResumePointObjectSchema = type({
  'fully_played?': type('boolean').describe(
    'Whether or not the episode has been fully played by the user.\n',
  ),
  'resume_position_ms?': type('number.integer').describe(
    "The user's most recent position in the episode in milliseconds.\n",
  ),
})

export type ResumePointObject = typeof ResumePointObjectSchema.infer

export const EpisodeBaseSchema = type({
  audio_preview_url: type('string | null').describe(
    'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
  ),
  description: type('string').describe(
    'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  ),
  html_description: type('string').describe(
    'A description of the episode. This field may contain HTML tags.\n',
  ),
  duration_ms: type('number.integer').describe('The episode length in milliseconds.\n'),
  explicit: type('boolean').describe(
    'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  ),
  external_urls: ExternalUrlObjectSchema.describe('External URLs for this episode.\n'),
  href: type('string').describe(
    'A link to the Web API endpoint providing full details of the episode.\n',
  ),
  id: type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
  ),
  images: type(ImageObjectSchema)
    .array()
    .describe('The cover art for the episode in various sizes, widest first.\n'),
  is_externally_hosted: type('boolean').describe(
    "True if the episode is hosted outside of Spotify's CDN.\n",
  ),
  is_playable: type('boolean').describe(
    'True if the episode is playable in the given market. Otherwise false.\n',
  ),
  'language?': type('string').describe(
    'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n',
  ),
  languages: type('string[]').describe(
    'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  ),
  name: type('string').describe('The name of the episode.\n'),
  release_date: type('string').describe(
    'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
  ),
  release_date_precision: type("'year' | 'month' | 'day'").describe(
    'The precision with which `release_date` value is known.\n',
  ),
  'resume_point?': ResumePointObjectSchema.describe(
    "The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
  ),
  type: type("'episode'").describe('The object type.\n'),
  uri: type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
  ),
  'restrictions?': EpisodeRestrictionObjectSchema.describe(
    'Included in the response when a content restriction is applied.\n',
  ),
})

export type EpisodeBase = typeof EpisodeBaseSchema.infer

export const CopyrightObjectSchema = type({
  'text?': type('string').describe('The copyright text for this content.\n'),
  'type?': type('string').describe(
    'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n',
  ),
})

export type CopyrightObject = typeof CopyrightObjectSchema.infer

export const ShowBaseSchema = type({
  available_markets: type('string[]').describe(
    'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
  ),
  copyrights: type(CopyrightObjectSchema)
    .array()
    .describe('The copyright statements of the show.\n'),
  description: type('string').describe(
    'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  ),
  html_description: type('string').describe(
    'A description of the show. This field may contain HTML tags.\n',
  ),
  explicit: type('boolean').describe(
    'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  ),
  external_urls: ExternalUrlObjectSchema.describe('External URLs for this show.\n'),
  href: type('string').describe(
    'A link to the Web API endpoint providing full details of the show.\n',
  ),
  id: type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  ),
  images: type(ImageObjectSchema)
    .array()
    .describe('The cover art for the show in various sizes, widest first.\n'),
  is_externally_hosted: type('boolean').describe(
    "True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n",
  ),
  languages: type('string[]').describe(
    'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  ),
  media_type: type('string').describe('The media type of the show.\n'),
  name: type('string').describe('The name of the episode.\n'),
  publisher: type('string').describe('The publisher of the show.\n'),
  type: type("'show'").describe('The object type.\n'),
  uri: type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
  ),
  total_episodes: type('number.integer').describe('The total number of episodes in the show.\n'),
})

export type ShowBase = typeof ShowBaseSchema.infer

export const SimplifiedShowObjectSchema = ShowBaseSchema

export type SimplifiedShowObject = typeof SimplifiedShowObjectSchema.infer

export const EpisodeObjectSchema = type(EpisodeBaseSchema).and(
  type({ show: SimplifiedShowObjectSchema.describe('The show on which the episode belongs.\n') }),
)

export type EpisodeObject = typeof EpisodeObjectSchema.infer

export const PlaylistTrackObjectSchema = type({
  'added_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._\n',
  ),
  'added_by?': PlaylistUserObjectSchema.describe(
    'The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._\n',
  ),
  'is_local?': type('boolean').describe(
    'Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.\n',
  ),
  'item?': type(type(TrackObjectSchema).and({ type: "'TrackObject'" }))
    .or(type(EpisodeObjectSchema).and({ type: "'EpisodeObject'" }))
    .describe('Information about the track or episode.'),
  'track?': type(type(TrackObjectSchema).and({ type: "'TrackObject'" }))
    .or(type(EpisodeObjectSchema).and({ type: "'EpisodeObject'" }))
    .describe('**Deprecated:** Use `item` instead. Information about the track or episode.\n'),
})

export type PlaylistTrackObject = typeof PlaylistTrackObjectSchema.infer

export const QueueObjectSchema = type({
  'currently_playing?': type(type(TrackObjectSchema).and({ type: "'TrackObject'" }))
    .or(type(EpisodeObjectSchema).and({ type: "'EpisodeObject'" }))
    .describe('The currently playing track or episode. Can be `null`.'),
  'queue?': type(
    type(type(TrackObjectSchema).and({ type: "'TrackObject'" })).or(
      type(EpisodeObjectSchema).and({ type: "'EpisodeObject'" }),
    ),
  )
    .array()
    .describe('The tracks or episodes in the queue. Can be empty.'),
})

export type QueueObject = typeof QueueObjectSchema.infer

export const DeviceObjectSchema = type({
  'id?': type('string | null').describe(
    'The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.',
  ),
  'is_active?': type('boolean').describe('If this device is the currently active device.'),
  'is_private_session?': type('boolean').describe(
    'If this device is currently in a private session.',
  ),
  'is_restricted?': type('boolean').describe(
    'Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.',
  ),
  'name?': type('string').describe(
    'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\"Loudest speaker\\") and some devices have a generic name associated with the manufacturer or device model.',
  ),
  'type?': type('string').describe('Device type, such as "computer", "smartphone" or "speaker".'),
  'volume_percent?': type('number.integer >= 0 & number.integer <= 100 | null').describe(
    'The current volume in percent.',
  ),
  'supports_volume?': type('boolean').describe('If this device can be used to set the volume.'),
})

export type DeviceObject = typeof DeviceObjectSchema.infer

export const DisallowsObjectSchema = type({
  'interrupting_playback?': type('boolean').describe('Interrupting playback. Optional field.'),
  'pausing?': type('boolean').describe('Pausing. Optional field.'),
  'resuming?': type('boolean').describe('Resuming. Optional field.'),
  'seeking?': type('boolean').describe('Seeking playback location. Optional field.'),
  'skipping_next?': type('boolean').describe('Skipping to the next context. Optional field.'),
  'skipping_prev?': type('boolean').describe('Skipping to the previous context. Optional field.'),
  'toggling_repeat_context?': type('boolean').describe(
    'Toggling repeat context flag. Optional field.',
  ),
  'toggling_shuffle?': type('boolean').describe('Toggling shuffle flag. Optional field.'),
  'toggling_repeat_track?': type('boolean').describe('Toggling repeat track flag. Optional field.'),
  'transferring_playback?': type('boolean').describe(
    'Transfering playback between devices. Optional field.',
  ),
})

export type DisallowsObject = typeof DisallowsObjectSchema.infer

export const CurrentlyPlayingContextObjectSchema = type({
  'device?': DeviceObjectSchema.describe('The device that is currently active.\n'),
  'repeat_state?': type('string').describe('off, track, context'),
  'shuffle_state?': type('boolean').describe('If shuffle is on or off.'),
  'context?': ContextObjectSchema.describe('A Context Object. Can be `null`.'),
  'timestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.).',
    ),
  'progress_ms?': type('number.integer').describe(
    'Progress into the currently playing track or episode. Can be `null`.',
  ),
  'is_playing?': type('boolean').describe('If something is currently playing, return `true`.'),
  'item?': type(type(TrackObjectSchema).and({ type: "'TrackObject'" }))
    .or(type(EpisodeObjectSchema).and({ type: "'EpisodeObject'" }))
    .describe('The currently playing track or episode. Can be `null`.'),
  'currently_playing_type?': type('string').describe(
    'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
  ),
  'actions?': DisallowsObjectSchema.describe(
    'Allows to update the user interface based on which playback actions are available within the current context.\n',
  ),
})

export type CurrentlyPlayingContextObject = typeof CurrentlyPlayingContextObjectSchema.infer

export const ErrorObjectSchema = type({
  status: type('number.integer >= 400 & number.integer <= 599').describe(
    'The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).\n',
  ),
  message: type('string').describe('A short description of the cause of the error.\n'),
})

export type ErrorObject = typeof ErrorObjectSchema.infer

export const ExplicitContentSettingsObjectSchema = type({
  'filter_enabled?': type('boolean').describe(
    'When `true`, indicates that explicit content should not be played.\n',
  ),
  'filter_locked?': type('boolean').describe(
    "When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n",
  ),
})

export type ExplicitContentSettingsObject = typeof ExplicitContentSettingsObjectSchema.infer

export const PrivateUserObjectSchema = type({
  'account_id?': type('string').describe(
    "A public, immutable, pseudoanonymous identifier for the user's account. Use this field for account linking rather than the `id` field, as it is stable and will not change over the lifetime of the account.\n",
  ),
  'country?': type('string').describe(
    "The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
  ),
  'display_name?': type('string').describe(
    "The name displayed on the user's profile. `null` if not available.\n",
  ),
  'email?': type('string').describe(
    "The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
  ),
  'explicit_content?': ExplicitContentSettingsObjectSchema.describe(
    "The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
  ),
  'external_urls?': ExternalUrlObjectSchema.describe('Known external URLs for this user.'),
  'followers?': FollowersObjectSchema.describe('Information about the followers of the user.'),
  'href?': type('string').describe('A link to the Web API endpoint for this user.\n'),
  'id?': type('string').describe(
    'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. Do not use this field for account linking — use `account_id` instead, which is immutable.\n',
  ),
  'images?': type(ImageObjectSchema).array().describe("The user's profile image."),
  'product?': type('string').describe(
    'The user\'s Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n',
  ),
  'type?': type('string').describe('The object type: "user"\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
  ),
})

export type PrivateUserObject = typeof PrivateUserObjectSchema.infer

export const PublicUserObjectSchema = type({
  'display_name?': type('string | null').describe(
    "The name displayed on the user's profile. `null` if not available.\n",
  ),
  'external_urls?': ExternalUrlObjectSchema.describe('Known public external URLs for this user.\n'),
  'followers?': FollowersObjectSchema.describe('Information about the followers of this user.\n'),
  'href?': type('string').describe('A link to the Web API endpoint for this user.\n'),
  'id?': type('string').describe(
    'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
  ),
  'images?': type(ImageObjectSchema).array().describe("The user's profile image.\n"),
  'type?': type("'user'").describe('The object type.\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
  ),
})

export type PublicUserObject = typeof PublicUserObjectSchema.infer

export const LoudnessSchema = type('number')
  .atLeast(-3.4028234663852886e38)
  .atMost(3.4028234663852886e38)
  .describe(
    'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n',
  )

export type Loudness = typeof LoudnessSchema.infer

export const TempoSchema = type('number')
  .atLeast(-3.4028234663852886e38)
  .atMost(3.4028234663852886e38)
  .describe(
    'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n',
  )

export type Tempo = typeof TempoSchema.infer

export const TimeSignatureSchema = type('number.integer >= 3 & number.integer <= 7').describe(
  'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
)

export type TimeSignature = typeof TimeSignatureSchema.infer

export const KeySchema = type('number.integer >= -1 & number.integer <= 11').describe(
  'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n',
)

export type Key = typeof KeySchema.infer

export const ModeSchema = type('number.integer').describe(
  'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n',
)

export type Mode = typeof ModeSchema.infer

export const TimeIntervalObjectSchema = type({
  'start?': type('number').describe('The starting point (in seconds) of the time interval.'),
  'duration?': type('number').describe('The duration (in seconds) of the time interval.'),
  'confidence?': type('number >= 0 & number <= 1').describe(
    'The confidence, from 0.0 to 1.0, of the reliability of the interval.',
  ),
})

export type TimeIntervalObject = typeof TimeIntervalObjectSchema.infer

export const SectionObjectSchema = type({
  'start?': type('number').describe('The starting point (in seconds) of the section.'),
  'duration?': type('number').describe('The duration (in seconds) of the section.'),
  'confidence?': type('number >= 0 & number <= 1').describe(
    'The confidence, from 0.0 to 1.0, of the reliability of the section\'s "designation".',
  ),
  'loudness?': type('number').describe(
    'The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.',
  ),
  'tempo?': type('number').describe(
    'The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
  ),
  'tempo_confidence?': type('number >= 0 & number <= 1').describe(
    "The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.",
  ),
  'key?': type('number.integer').describe(
    'The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.',
  ),
  'key_confidence?': type('number >= 0 & number <= 1').describe(
    'The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.',
  ),
  'mode?': type('-1 | 0 | 1').describe(
    'Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.',
  ),
  'mode_confidence?': type('number >= 0 & number <= 1').describe(
    'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
  ),
  'time_signature?': TimeSignatureSchema,
  'time_signature_confidence?': type('number >= 0 & number <= 1').describe(
    'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.',
  ),
})

export type SectionObject = typeof SectionObjectSchema.infer

export const SegmentObjectSchema = type({
  'start?': type('number').describe('The starting point (in seconds) of the segment.'),
  'duration?': type('number').describe('The duration (in seconds) of the segment.'),
  'confidence?': type('number >= 0 & number <= 1').describe(
    'The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.\n',
  ),
  'loudness_start?': type('number').describe(
    'The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
  ),
  'loudness_max?': type('number').describe(
    'The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
  ),
  'loudness_max_time?': type('number').describe(
    'The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.',
  ),
  'loudness_end?': type('number').describe(
    'The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.',
  ),
  'pitches?': type('number >= 0 & number <= 1[]').describe(
    'Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).\n\nVectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.\nAs can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.\n![pitch vector](/assets/audio/Pitch_vector.png)\n',
  ),
  'timbre?': type('number[]').describe(
    'Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n\nFor completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).\n![timbre basis functions](/assets/audio/Timbre_basis_functions.png)\n\nThe actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.\n',
  ),
})

export type SegmentObject = typeof SegmentObjectSchema.infer

export const AudioAnalysisObjectSchema = type({
  'meta?': type({
    'analyzer_version?': type('string').describe(
      'The version of the Analyzer used to analyze this track.',
    ),
    'platform?': type('string').describe("The platform used to read the track's audio data."),
    'detailed_status?': type('string').describe(
      'A detailed status code for this track. If analysis data is missing, this code may explain why.',
    ),
    'status_code?': type('number.integer').describe(
      'The return code of the analyzer process. 0 if successful, 1 if any errors occurred.',
    ),
    'timestamp?': type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      )
      .describe('The Unix timestamp (in seconds) at which this track was analyzed.'),
    'analysis_time?': type('number').describe('The amount of time taken to analyze this track.'),
    'input_process?': type('string').describe("The method used to read the track's audio data."),
  }),
  'track?': type({
    'num_samples?': type('number.integer').describe(
      'The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.',
    ),
    'duration?': type('number').describe('Length of the track in seconds.'),
    'sample_md5?': type('string').describe('This field will always contain the empty string.'),
    'offset_seconds?': type('number.integer').describe(
      'An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)',
    ),
    'window_seconds?': type('number.integer').describe(
      'The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)',
    ),
    'analysis_sample_rate?': type('number.integer').describe(
      'The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.',
    ),
    'analysis_channels?': type('number.integer').describe(
      'The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.',
    ),
    'end_of_fade_in?': type('number').describe(
      "The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.",
    ),
    'start_of_fade_out?': type('number').describe(
      "The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.",
    ),
    'loudness?': LoudnessSchema,
    'tempo?': TempoSchema,
    'tempo_confidence?': type('number >= 0 & number <= 1').describe(
      'The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.',
    ),
    'time_signature?': TimeSignatureSchema,
    'time_signature_confidence?': type('number >= 0 & number <= 1').describe(
      'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.',
    ),
    'key?': KeySchema,
    'key_confidence?': type('number >= 0 & number <= 1').describe(
      'The confidence, from 0.0 to 1.0, of the reliability of the `key`.',
    ),
    'mode?': ModeSchema,
    'mode_confidence?': type('number >= 0 & number <= 1').describe(
      'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
    ),
    'codestring?': type('string').describe(
      'An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.',
    ),
    'code_version?': type('number').describe(
      'A version number for the Echo Nest Musical Fingerprint format used in the codestring field.',
    ),
    'echoprintstring?': type('string').describe(
      'An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.',
    ),
    'echoprint_version?': type('number').describe(
      'A version number for the EchoPrint format used in the echoprintstring field.',
    ),
    'synchstring?': type('string').describe(
      'A [Synchstring](https://github.com/echonest/synchdata) for this track.',
    ),
    'synch_version?': type('number').describe(
      'A version number for the Synchstring used in the synchstring field.',
    ),
    'rhythmstring?': type('string').describe(
      'A Rhythmstring for this track. The format of this string is similar to the Synchstring.',
    ),
    'rhythm_version?': type('number').describe(
      'A version number for the Rhythmstring used in the rhythmstring field.',
    ),
  }),
  'bars?': type(TimeIntervalObjectSchema)
    .array()
    .describe(
      'The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.',
    ),
  'beats?': type(TimeIntervalObjectSchema)
    .array()
    .describe(
      'The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.',
    ),
  'sections?': type(SectionObjectSchema)
    .array()
    .describe(
      'Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.',
    ),
  'segments?': type(SegmentObjectSchema)
    .array()
    .describe('Each segment contains a roughly conisistent sound throughout its duration.'),
  'tatums?': type(TimeIntervalObjectSchema)
    .array()
    .describe(
      'A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).',
    ),
})

export type AudioAnalysisObject = typeof AudioAnalysisObjectSchema.infer

export const AudioFeaturesObjectSchema = type({
  'acousticness?': type('number')
    .atLeast(-3.4028234663852886e38)
    .atMost(3.4028234663852886e38)
    .atLeast(0)
    .atMost(1)
    .describe(
      'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
    ),
  'analysis_url?': type('string').describe(
    'A URL to access the full audio analysis of this track. An access token is required to access this data.\n',
  ),
  'danceability?': type('number')
    .atLeast(-3.4028234663852886e38)
    .atMost(3.4028234663852886e38)
    .describe(
      'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
    ),
  'duration_ms?': type('number.integer').describe('The duration of the track in milliseconds.\n'),
  'energy?': type('number')
    .atLeast(-3.4028234663852886e38)
    .atMost(3.4028234663852886e38)
    .describe(
      'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
    ),
  'id?': type('string').describe('The Spotify ID for the track.\n'),
  'instrumentalness?': type('number')
    .atLeast(-3.4028234663852886e38)
    .atMost(3.4028234663852886e38)
    .describe(
      'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
    ),
  'key?': KeySchema,
  'liveness?': type('number')
    .atLeast(-3.4028234663852886e38)
    .atMost(3.4028234663852886e38)
    .describe(
      'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
    ),
  'loudness?': LoudnessSchema,
  'mode?': ModeSchema,
  'speechiness?': type('number')
    .atLeast(-3.4028234663852886e38)
    .atMost(3.4028234663852886e38)
    .describe(
      'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
    ),
  'tempo?': TempoSchema,
  'time_signature?': TimeSignatureSchema,
  'track_href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the track.\n',
  ),
  'type?': type("'audio_features'").describe('The object type.\n'),
  'uri?': type('string').describe('The Spotify URI for the track.\n'),
  'valence?': type('number')
    .atLeast(-3.4028234663852886e38)
    .atMost(3.4028234663852886e38)
    .atLeast(0)
    .atMost(1)
    .describe(
      'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
    ),
})

export type AudioFeaturesObject = typeof AudioFeaturesObjectSchema.infer

export const SimplifiedTrackObjectSchema = type({
  'artists?': type(SimplifiedArtistObjectSchema)
    .array()
    .describe(
      'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',
    ),
  'available_markets?': type('string[]').describe(
    'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
  ),
  'disc_number?': type('number.integer').describe(
    'The disc number (usually `1` unless the album consists of more than one disc).',
  ),
  'duration_ms?': type('number.integer').describe('The track length in milliseconds.'),
  'explicit?': type('boolean').describe(
    'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).',
  ),
  'external_urls?': ExternalUrlObjectSchema.describe('External URLs for this track.\n'),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the track.',
  ),
  'id?': type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
  ),
  'is_playable?': type('boolean').describe(
    'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
  ),
  'linked_from?': LinkedTrackObjectSchema.describe(
    'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track.',
  ),
  'restrictions?': TrackRestrictionObjectSchema.describe(
    'Included in the response when a content restriction is applied.\n',
  ),
  'name?': type('string').describe('The name of the track.'),
  'preview_url?': type('string | null').describe(
    'A URL to a 30 second preview (MP3 format) of the track.\n',
  ),
  'track_number?': type('number.integer').describe(
    'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
  ),
  'type?': type('string').describe('The object type: "track".\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
  ),
  'is_local?': type('boolean').describe('Whether or not the track is from a local file.\n'),
})

export type SimplifiedTrackObject = typeof SimplifiedTrackObjectSchema.infer

export const CursorObjectSchema = type({
  'after?': type('string').describe('The cursor to use as key to find the next page of items.'),
  'before?': type('string').describe(
    'The cursor to use as key to find the previous page of items.',
  ),
})

export type CursorObject = typeof CursorObjectSchema.infer

export const CursorPagingObjectSchema = type({
  'href?': type('string').describe(
    'A link to the Web API endpoint returning the full result of the request.',
  ),
  'limit?': type('number.integer').describe(
    'The maximum number of items in the response (as set in the query or by default).',
  ),
  'next?': type('string').describe('URL to the next page of items. ( `null` if none)'),
  'cursors?': CursorObjectSchema.describe('The cursors used to find the next set of items.'),
  'total?': type('number.integer').describe('The total number of items available to return.'),
})

export type CursorPagingObject = typeof CursorPagingObjectSchema.infer

export const CursorPagingPlayHistoryObjectSchema = type(CursorPagingObjectSchema).and(
  type({ 'items?': type(PlayHistoryObjectSchema).array() }),
)

export type CursorPagingPlayHistoryObject = typeof CursorPagingPlayHistoryObjectSchema.infer

export const CursorPagingSimplifiedArtistObjectSchema = type(CursorPagingObjectSchema).and(
  type({ 'items?': type(ArtistObjectSchema).array() }),
)

export type CursorPagingSimplifiedArtistObject =
  typeof CursorPagingSimplifiedArtistObjectSchema.infer

export const PagingObjectSchema = type({
  href: type('string').describe(
    'A link to the Web API endpoint returning the full result of the request\n',
  ),
  limit: type('number.integer').describe(
    'The maximum number of items in the response (as set in the query or by default).\n',
  ),
  next: type('string | null').describe('URL to the next page of items. ( `null` if none)\n'),
  offset: type('number.integer').describe(
    'The offset of the items returned (as set in the query or by default)\n',
  ),
  previous: type('string | null').describe(
    'URL to the previous page of items. ( `null` if none)\n',
  ),
  total: type('number.integer').describe('The total number of items available to return.\n'),
  items: 'unknown',
})

export type PagingObject = typeof PagingObjectSchema.infer

export const PlaylistOwnerObjectSchema = type(PlaylistUserObjectSchema).and(
  type({
    'display_name?': type('string | null').describe(
      "The name displayed on the user's profile. `null` if not available.\n",
    ),
  }),
)

export type PlaylistOwnerObject = typeof PlaylistOwnerObjectSchema.infer

export const PlaylistTracksRefObjectSchema = type({
  'href?': type('string').describe(
    "A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n",
  ),
  'total?': type('number.integer').describe('Number of tracks in the playlist.\n'),
})

export type PlaylistTracksRefObject = typeof PlaylistTracksRefObjectSchema.infer

export const SimplifiedPlaylistObjectSchema = type({
  'collaborative?': type('boolean').describe(
    '`true` if the owner allows other users to modify the playlist.\n',
  ),
  'description?': type('string').describe(
    'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
  ),
  'external_urls?': ExternalUrlObjectSchema.describe('Known external URLs for this playlist.\n'),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the playlist.\n',
  ),
  'id?': type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
  ),
  'images?': type(ImageObjectSchema)
    .array()
    .describe(
      'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    ),
  'name?': type('string').describe('The name of the playlist.\n'),
  'owner?': PlaylistOwnerObjectSchema.describe('The user who owns the playlist\n'),
  'public?': type('boolean').describe(
    "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
  ),
  'snapshot_id?': type('string').describe(
    'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
  ),
  'items?': PlaylistTracksRefObjectSchema.describe(
    "A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's items can be retrieved, along with the `total` number of items in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
  ),
  'tracks?': PlaylistTracksRefObjectSchema.describe(
    "**Deprecated:** Use `items` instead. A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
  ),
  'type?': type('string').describe('The object type: "playlist"\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
  ),
})

export type SimplifiedPlaylistObject = typeof SimplifiedPlaylistObjectSchema.infer

export const PagingPlaylistObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SimplifiedPlaylistObjectSchema).array() }),
)

export type PagingPlaylistObject = typeof PagingPlaylistObjectSchema.infer

export const PagingFeaturedPlaylistObjectSchema = type({
  'message?': type('string').describe('The localized message of a playlist.\n'),
  'playlists?': PagingPlaylistObjectSchema,
})

export type PagingFeaturedPlaylistObject = typeof PagingFeaturedPlaylistObjectSchema.infer

export const ArtistDiscographyAlbumObjectSchema = type(SimplifiedAlbumObjectSchema).and(
  type({
    album_group: type("'album' | 'single' | 'compilation' | 'appears_on'").describe(
      'This field describes the relationship between the artist and the album.\n',
    ),
  }),
)

export type ArtistDiscographyAlbumObject = typeof ArtistDiscographyAlbumObjectSchema.infer

export const PagingArtistDiscographyAlbumObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(ArtistDiscographyAlbumObjectSchema).array() }),
)

export type PagingArtistDiscographyAlbumObject =
  typeof PagingArtistDiscographyAlbumObjectSchema.infer

export const PagingSimplifiedAlbumObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SimplifiedAlbumObjectSchema).array() }),
)

export type PagingSimplifiedAlbumObject = typeof PagingSimplifiedAlbumObjectSchema.infer

export const PagingSimplifiedTrackObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SimplifiedTrackObjectSchema).array() }),
)

export type PagingSimplifiedTrackObject = typeof PagingSimplifiedTrackObjectSchema.infer

export const AlbumObjectSchema = type(AlbumBaseSchema).and(
  type({
    'artists?': type(SimplifiedArtistObjectSchema)
      .array()
      .describe(
        'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      ),
    'tracks?': PagingSimplifiedTrackObjectSchema.describe('The tracks of the album.\n'),
    'copyrights?': type(CopyrightObjectSchema)
      .array()
      .describe('The copyright statements of the album.\n'),
    'external_ids?': ExternalIdObjectSchema.describe('Known external IDs for the album.\n'),
    'genres?': type('string[]').describe('**Deprecated** The array is always empty.\n'),
    'label?': type('string').describe('The label associated with the album.\n'),
    'popularity?': type('number.integer').describe(
      'The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.\n',
    ),
  }),
)

export type AlbumObject = typeof AlbumObjectSchema.infer

export const SavedAlbumObjectSchema = type({
  'added_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The date and time the album was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
  ),
  'album?': AlbumObjectSchema.describe('Information about the album.'),
})

export type SavedAlbumObject = typeof SavedAlbumObjectSchema.infer

export const PagingSavedAlbumObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SavedAlbumObjectSchema).array() }),
)

export type PagingSavedAlbumObject = typeof PagingSavedAlbumObjectSchema.infer

export const SavedTrackObjectSchema = type({
  'added_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The date and time the track was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
  ),
  'track?': TrackObjectSchema.describe('Information about the track.'),
})

export type SavedTrackObject = typeof SavedTrackObjectSchema.infer

export const PagingSavedTrackObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SavedTrackObjectSchema).array() }),
)

export type PagingSavedTrackObject = typeof PagingSavedTrackObjectSchema.infer

export const PagingTrackObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(TrackObjectSchema).array() }),
)

export type PagingTrackObject = typeof PagingTrackObjectSchema.infer

export const PagingPlaylistTrackObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(PlaylistTrackObjectSchema).array() }),
)

export type PagingPlaylistTrackObject = typeof PagingPlaylistTrackObjectSchema.infer

export const PagingSimplifiedShowObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SimplifiedShowObjectSchema).array() }),
)

export type PagingSimplifiedShowObject = typeof PagingSimplifiedShowObjectSchema.infer

export const SavedShowObjectSchema = type({
  'added_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The date and time the show was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
  ),
  'show?': SimplifiedShowObjectSchema.describe('Information about the show.'),
})

export type SavedShowObject = typeof SavedShowObjectSchema.infer

export const PagingSavedShowObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SavedShowObjectSchema).array() }),
)

export type PagingSavedShowObject = typeof PagingSavedShowObjectSchema.infer

export const SimplifiedEpisodeObjectSchema = EpisodeBaseSchema

export type SimplifiedEpisodeObject = typeof SimplifiedEpisodeObjectSchema.infer

export const PagingSimplifiedEpisodeObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SimplifiedEpisodeObjectSchema).array() }),
)

export type PagingSimplifiedEpisodeObject = typeof PagingSimplifiedEpisodeObjectSchema.infer

export const SavedEpisodeObjectSchema = type({
  'added_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The date and time the episode was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\n',
  ),
  'episode?': EpisodeObjectSchema.describe('Information about the episode.'),
})

export type SavedEpisodeObject = typeof SavedEpisodeObjectSchema.infer

export const PagingSavedEpisodeObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SavedEpisodeObjectSchema).array() }),
)

export type PagingSavedEpisodeObject = typeof PagingSavedEpisodeObjectSchema.infer

export const AuthorObjectSchema = type({
  'name?': type('string').describe('The name of the author.\n'),
})

export type AuthorObject = typeof AuthorObjectSchema.infer

export const NarratorObjectSchema = type({
  'name?': type('string').describe('The name of the Narrator.\n'),
})

export type NarratorObject = typeof NarratorObjectSchema.infer

export const AudiobookBaseSchema = type({
  authors: type(AuthorObjectSchema).array().describe('The author(s) for the audiobook.\n'),
  available_markets: type('string[]').describe(
    'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
  ),
  copyrights: type(CopyrightObjectSchema)
    .array()
    .describe('The copyright statements of the audiobook.\n'),
  description: type('string').describe(
    'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  ),
  html_description: type('string').describe(
    'A description of the audiobook. This field may contain HTML tags.\n',
  ),
  'edition?': type('string').describe('The edition of the audiobook.\n'),
  explicit: type('boolean').describe(
    'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  ),
  external_urls: ExternalUrlObjectSchema.describe('External URLs for this audiobook.\n'),
  href: type('string').describe(
    'A link to the Web API endpoint providing full details of the audiobook.\n',
  ),
  id: type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  ),
  images: type(ImageObjectSchema)
    .array()
    .describe('The cover art for the audiobook in various sizes, widest first.\n'),
  languages: type('string[]').describe(
    'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  ),
  media_type: type('string').describe('The media type of the audiobook.\n'),
  name: type('string').describe('The name of the audiobook.\n'),
  narrators: type(NarratorObjectSchema).array().describe('The narrator(s) for the audiobook.\n'),
  publisher: type('string').describe('The publisher of the audiobook.\n'),
  type: type("'audiobook'").describe('The object type.\n'),
  uri: type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
  ),
  total_chapters: type('number.integer').describe('The number of chapters in this audiobook.\n'),
})

export type AudiobookBase = typeof AudiobookBaseSchema.infer

export const SimplifiedAudiobookObjectSchema = AudiobookBaseSchema

export type SimplifiedAudiobookObject = typeof SimplifiedAudiobookObjectSchema.infer

export const PagingSimplifiedAudiobookObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SimplifiedAudiobookObjectSchema).array() }),
)

export type PagingSimplifiedAudiobookObject = typeof PagingSimplifiedAudiobookObjectSchema.infer

export const PagingArtistObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(ArtistObjectSchema).array() }),
)

export type PagingArtistObject = typeof PagingArtistObjectSchema.infer

export const ChapterBaseSchema = type({
  audio_preview_url: type('string | null').describe(
    'A URL to a 30 second preview (MP3 format) of the chapter. `null` if not available.\n',
  ),
  'available_markets?': type('string[]').describe(
    'A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
  ),
  chapter_number: type('number.integer').describe('The number of the chapter\n'),
  description: type('string').describe(
    'A description of the chapter. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
  ),
  html_description: type('string').describe(
    'A description of the chapter. This field may contain HTML tags.\n',
  ),
  duration_ms: type('number.integer').describe('The chapter length in milliseconds.\n'),
  explicit: type('boolean').describe(
    'Whether or not the chapter has explicit content (true = yes it does; false = no it does not OR unknown).\n',
  ),
  external_urls: ExternalUrlObjectSchema.describe('External URLs for this chapter.\n'),
  href: type('string').describe(
    'A link to the Web API endpoint providing full details of the chapter.\n',
  ),
  id: type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
  ),
  images: type(ImageObjectSchema)
    .array()
    .describe('The cover art for the chapter in various sizes, widest first.\n'),
  is_playable: type('boolean').describe(
    'True if the chapter is playable in the given market. Otherwise false.\n',
  ),
  languages: type('string[]').describe(
    'A list of the languages used in the chapter, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
  ),
  name: type('string').describe('The name of the chapter.\n'),
  release_date: type('string').describe(
    'The date the chapter was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
  ),
  release_date_precision: type("'year' | 'month' | 'day'").describe(
    'The precision with which `release_date` value is known.\n',
  ),
  'resume_point?': ResumePointObjectSchema.describe(
    "The user's most recent position in the chapter. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
  ),
  type: type("'episode'").describe('The object type.\n'),
  uri: type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the chapter.\n',
  ),
  'restrictions?': ChapterRestrictionObjectSchema.describe(
    'Included in the response when a content restriction is applied.\n',
  ),
})

export type ChapterBase = typeof ChapterBaseSchema.infer

export const SimplifiedChapterObjectSchema = ChapterBaseSchema

export type SimplifiedChapterObject = typeof SimplifiedChapterObjectSchema.infer

export const PagingSimplifiedChapterObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SimplifiedChapterObjectSchema).array() }),
)

export type PagingSimplifiedChapterObject = typeof PagingSimplifiedChapterObjectSchema.infer

export const RecommendationSeedObjectSchema = type({
  'afterFilteringSize?': type('number.integer').describe(
    'The number of tracks available after min\\_\\* and max\\_\\* filters have been applied.\n',
  ),
  'afterRelinkingSize?': type('number.integer').describe(
    'The number of tracks available after relinking for regional availability.\n',
  ),
  'href?': type('string').describe(
    'A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`.\n',
  ),
  'id?': type('string').describe(
    'The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.\n',
  ),
  'initialPoolSize?': type('number.integer').describe(
    'The number of recommended tracks available for this seed.\n',
  ),
  'type?': type('string').describe(
    'The entity type of this seed. One of `artist`, `track` or `genre`.\n',
  ),
})

export type RecommendationSeedObject = typeof RecommendationSeedObjectSchema.infer

export const RecommendationsObjectSchema = type({
  seeds: type(RecommendationSeedObjectSchema)
    .array()
    .describe('An array of recommendation seed objects.\n'),
  tracks: type(TrackObjectSchema)
    .array()
    .describe('An array of track objects ordered according to the parameters supplied.\n'),
})

export type RecommendationsObject = typeof RecommendationsObjectSchema.infer

export const PlaylistObjectSchema = type({
  'collaborative?': type('boolean').describe(
    '`true` if the owner allows other users to modify the playlist.\n',
  ),
  'description?': type('string | null').describe(
    'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
  ),
  'external_urls?': ExternalUrlObjectSchema.describe('Known external URLs for this playlist.\n'),
  'href?': type('string').describe(
    'A link to the Web API endpoint providing full details of the playlist.\n',
  ),
  'id?': type('string').describe(
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
  ),
  'images?': type(ImageObjectSchema)
    .array()
    .describe(
      'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    ),
  'name?': type('string').describe('The name of the playlist.\n'),
  'owner?': PlaylistOwnerObjectSchema.describe('The user who owns the playlist\n'),
  'public?': type('boolean').describe(
    "The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
  ),
  'snapshot_id?': type('string').describe(
    'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
  ),
  'items?': PagingPlaylistTrackObjectSchema.describe(
    'The items of the playlist. _**Note**: This field is only available for playlists owned by the current user or playlists the user is a collaborator of._\n',
  ),
  'tracks?': PagingPlaylistTrackObjectSchema.describe(
    '**Deprecated:** Use `items` instead. The tracks of the playlist.\n',
  ),
  'type?': type('string').describe('The object type: "playlist"\n'),
  'uri?': type('string').describe(
    'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
  ),
  'followers?': FollowersObjectSchema.describe('Information about the followers of the playlist.'),
})

export type PlaylistObject = typeof PlaylistObjectSchema.infer

export const CategoryObjectSchema = type({
  href: type('string').describe(
    'A link to the Web API endpoint returning full details of the category.\n',
  ),
  icons: type(ImageObjectSchema).array().describe('The category icon, in various sizes.\n'),
  id: type('string').describe(
    'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\n',
  ),
  name: type('string').describe('The name of the category.\n'),
})

export type CategoryObject = typeof CategoryObjectSchema.infer

export const ShowObjectSchema = type(ShowBaseSchema).and(
  type({ episodes: PagingSimplifiedEpisodeObjectSchema.describe('The episodes of the show.\n') }),
)

export type ShowObject = typeof ShowObjectSchema.infer

export const AudiobookObjectSchema = type(AudiobookBaseSchema).and(
  type({
    chapters: PagingSimplifiedChapterObjectSchema.describe('The chapters of the audiobook.\n'),
  }),
)

export type AudiobookObject = typeof AudiobookObjectSchema.infer

export const ChapterObjectSchema = type(ChapterBaseSchema).and(
  type({
    audiobook: SimplifiedAudiobookObjectSchema.describe(
      'The audiobook for which the chapter belongs.\n',
    ),
  }),
)

export type ChapterObject = typeof ChapterObjectSchema.infer

export const CurrentlyPlayingObjectSchema = type({
  'context?': ContextObjectSchema.describe('A Context Object. Can be `null`.'),
  'timestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Unix Millisecond Timestamp when data was fetched'),
  'progress_ms?': type('number.integer').describe(
    'Progress into the currently playing track or episode. Can be `null`.',
  ),
  'is_playing?': type('boolean').describe('If something is currently playing, return `true`.'),
  'item?': type(type(TrackObjectSchema).and({ type: "'TrackObject'" }))
    .or(type(EpisodeObjectSchema).and({ type: "'EpisodeObject'" }))
    .describe('The currently playing track or episode. Can be `null`.'),
  'currently_playing_type?': type('string').describe(
    'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
  ),
  'actions?': DisallowsObjectSchema.describe(
    'Allows to update the user interface based on which playback actions are available within the current context.\n',
  ),
})

export type CurrentlyPlayingObject = typeof CurrentlyPlayingObjectSchema.infer

export const SavedAudiobookObjectSchema = type({
  'added_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe(
    'The date and time the audiobook was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
  ),
  'audiobook?': AudiobookObjectSchema.describe('Information about the audiobook.'),
})

export type SavedAudiobookObject = typeof SavedAudiobookObjectSchema.infer

export const PagingSavedAudiobookObjectSchema = type(PagingObjectSchema).and(
  type({ 'items?': type(SavedAudiobookObjectSchema).array() }),
)

export type PagingSavedAudiobookObject = typeof PagingSavedAudiobookObjectSchema.infer

export const PathAlbumIdParamsSchema = type('string').describe(
  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
)
export const PathPlaylistIdParamsSchema = type('string').describe(
  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
)
export const QueryMarketParamsSchema = type('string').describe(
  'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
)
export const QueryLimitParamsSchema = type('string')
  .pipe((data, ctx) => {
    const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
    return Number.isSafeInteger(value) ? value : ctx.error('an integer')
  })
  .to('number.integer >= 1 & number.integer <= 50')
  .describe('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n')
export const QueryOffsetParamsSchema = type('string')
  .pipe((data, ctx) => {
    const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
    return Number.isSafeInteger(value) ? value : ctx.error('an integer')
  })
  .describe(
    'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
  )
export const QueryAdditionalTypesParamsSchema = type('string').describe(
  'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
)
export const QueryAlbumIdsParamsSchema = type('string').describe(
  'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
)
export const PathArtistIdParamsSchema = type('string').describe(
  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
)
export const PathShowIdParamsSchema = type('string').describe(
  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
)
export const PathAudiobookIdParamsSchema = type('string').describe(
  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
)
export const QueryAudiobookIdsParamsSchema = type('string').describe(
  'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
)
export const PathChapterIdParamsSchema = type('string').describe(
  'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
)
export const QueryChapterIdsParamsSchema = type('string').describe(
  'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
)
export const QueryTrackIdsParamsSchema = type('string').describe(
  'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
)
export const QueryIncludeGroupsParamsSchema = type('string').describe(
  'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
)
export const QueryShowIdsParamsSchema = type('string').describe(
  'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
)
export const PathUserIdParamsSchema = type('string').describe(
  "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
)

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
  content: { 'application/json': { schema: type({ error: ErrorObjectSchema }) } },
}
export const ForbiddenResponse = {
  description:
    "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
  content: { 'application/json': { schema: type({ error: ErrorObjectSchema }) } },
}
export const NotFoundResponse = {
  description: 'The requested resource cannot be found.\n',
  content: { 'application/json': { schema: type({ error: ErrorObjectSchema }) } },
}
export const BadRequestResponse = {
  description: 'The request contains malformed data in path, query parameters, or body.\n',
  content: { 'application/json': { schema: type({ error: ErrorObjectSchema }) } },
}
export const TooManyRequestsResponse = {
  description: 'The app has exceeded its rate limits.\n',
  content: { 'application/json': { schema: type({ error: ErrorObjectSchema }) } },
}
export const ManyAlbumsResponse = {
  description: 'A set of albums',
  content: { 'application/json': { schema: type({ albums: type(AlbumObjectSchema).array() }) } },
}
export const ManyAudiobooksResponse = {
  description:
    "A set of audiobooks. If one of the requested audiobooks is unavailable then you'll find a `null` item in the `audiobooks` array where the audiobook object would otherwise be.",
  content: {
    'application/json': { schema: type({ audiobooks: type(AudiobookObjectSchema).array() }) },
  },
}
export const ManyChaptersResponse = {
  description: 'A set of chapters',
  content: {
    'application/json': { schema: type({ chapters: type(ChapterObjectSchema).array() }) },
  },
}
export const ManyDevicesResponse = {
  description: 'A set of devices',
  content: { 'application/json': { schema: type({ devices: type(DeviceObjectSchema).array() }) } },
}
export const PagedAlbumsResponse = {
  description: 'A paged set of albums',
  content: { 'application/json': { schema: type({ albums: PagingSimplifiedAlbumObjectSchema }) } },
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
      schema: type({
        categories: type(PagingObjectSchema).and(
          type({ 'items?': type(CategoryObjectSchema).array() }),
        ),
      }),
    },
  },
}
export const CursorPagedArtistsResponse = {
  description: 'A paged set of artists',
  content: {
    'application/json': { schema: type({ artists: CursorPagingSimplifiedArtistObjectSchema }) },
  },
}
export const CursorPagedPlayHistoryResponse = {
  description: 'A paged set of tracks',
  content: { 'application/json': { schema: CursorPagingPlayHistoryObjectSchema } },
}
export const ManyArtistsResponse = {
  description: 'A set of artists',
  content: { 'application/json': { schema: type({ artists: type(ArtistObjectSchema).array() }) } },
}
export const ManyAudioFeaturesResponse = {
  description: 'A set of audio features',
  content: {
    'application/json': {
      schema: type({ audio_features: type(AudioFeaturesObjectSchema).array() }),
    },
  },
}
export const ManyEpisodesResponse = {
  description: 'A set of episodes',
  content: {
    'application/json': { schema: type({ episodes: type(EpisodeObjectSchema).array() }) },
  },
}
export const ManyGenresResponse = {
  description: 'A set of genres',
  content: { 'application/json': { schema: type({ genres: 'string[]' }) } },
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
  content: { 'application/json': { schema: type(ImageObjectSchema).array() } },
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
  content: { 'application/json': { schema: type({ tracks: type(TrackObjectSchema).array() }) } },
}
export const ManySimplifiedShowsResponse = {
  description: 'A set of shows',
  content: {
    'application/json': { schema: type({ shows: type(SimplifiedShowObjectSchema).array() }) },
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
      schema: type({
        'tracks?': PagingTrackObjectSchema,
        'artists?': PagingArtistObjectSchema,
        'albums?': PagingSimplifiedAlbumObjectSchema,
        'playlists?': PagingPlaylistObjectSchema,
        'shows?': PagingSimplifiedShowObjectSchema,
        'episodes?': PagingSimplifiedEpisodeObjectSchema,
        'audiobooks?': PagingSimplifiedAudiobookObjectSchema,
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
  content: { 'application/json': { schema: type('boolean[]') } },
}
export const SingletonArrayOfBooleanResponse = {
  description: 'Array of boolean, containing a single boolean',
  content: { 'application/json': { schema: type('boolean[]') } },
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
  content: { 'application/json': { schema: type({ 'snapshot_id?': 'string' }) } },
}
export const MarketsResponse = {
  description: 'A markets object with an array of country codes',
  content: { 'application/json': { schema: type({ 'markets?': 'string[]' }) } },
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
