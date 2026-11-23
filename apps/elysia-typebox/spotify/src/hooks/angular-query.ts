import {
  injectQuery,
  injectMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  CreateMutationOptions,
  InjectQueryOptions,
  InjectMutationOptions,
} from '@tanstack/angular-query-experimental'
import { client } from '../lib'

export function getAlbumsKey() {
  return ['albums'] as const
}

export function getArtistsKey() {
  return ['artists'] as const
}

export function getAudioAnalysisKey() {
  return ['audio-analysis'] as const
}

export function getAudioFeaturesKey() {
  return ['audio-features'] as const
}

export function getAudiobooksKey() {
  return ['audiobooks'] as const
}

export function getBrowseKey() {
  return ['browse'] as const
}

export function getChaptersKey() {
  return ['chapters'] as const
}

export function getEpisodesKey() {
  return ['episodes'] as const
}

export function getMarketsKey() {
  return ['markets'] as const
}

export function getMeKey() {
  return ['me'] as const
}

export function getPlaylistsKey() {
  return ['playlists'] as const
}

export function getRecommendationsKey() {
  return ['recommendations'] as const
}

export function getSearchKey() {
  return ['search'] as const
}

export function getShowsKey() {
  return ['shows'] as const
}

export function getTracksKey() {
  return ['tracks'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getAlbumsIdQueryKey(
  params: Parameters<typeof client.albums>[0],
  options?: Parameters<ReturnType<typeof client.albums>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums/{id}', params, keyArgs] as const
}

export function getAlbumsIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.albums>[0],
  options?: Parameters<ReturnType<typeof client.albums>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getAlbumsIdQueryKey>
  >({
    queryKey: getAlbumsIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .albums(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectAlbumsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.albums>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getAlbumsIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.albums>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAlbumsIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getAlbumsQueryKey(options: Parameters<typeof client.albums.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums', keyArgs] as const
}

export function getAlbumsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.albums.get>>['error'], null>,
>(options: Parameters<typeof client.albums.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getAlbumsQueryKey>
  >({
    queryKey: getAlbumsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.albums.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.albums.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getAlbumsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.albums.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getAlbumsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getAlbumsIdTracksQueryKey(
  params: Parameters<typeof client.albums>[0],
  options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums/{id}/tracks', params, keyArgs] as const
}

export function getAlbumsIdTracksQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.albums>[0],
  options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getAlbumsIdTracksQueryKey>
  >({
    queryKey: getAlbumsIdTracksQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .albums(params)
        .tracks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectAlbumsIdTracks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.albums>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getAlbumsIdTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAlbumsIdTracksQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getArtistsIdQueryKey(params: Parameters<typeof client.artists>[0]) {
  return ['artists', '/artists/{id}', params] as const
}

export function getArtistsIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getArtistsIdQueryKey>
  >({
    queryKey: getArtistsIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .artists(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectArtistsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.artists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getArtistsIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getArtistsIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getArtistsQueryKey(options: Parameters<typeof client.artists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists', keyArgs] as const
}

export function getArtistsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.artists.get>>['error'], null>,
>(options: Parameters<typeof client.artists.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getArtistsQueryKey>
  >({
    queryKey: getArtistsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.artists.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectArtists<
  TData = Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.artists.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getArtistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.artists.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getArtistsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getArtistsIdAlbumsQueryKey(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists/{id}/albums', params, keyArgs] as const
}

export function getArtistsIdAlbumsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getArtistsIdAlbumsQueryKey>
  >({
    queryKey: getArtistsIdAlbumsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .artists(params)
        .albums.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectArtistsIdAlbums<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.artists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getArtistsIdAlbumsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getArtistsIdAlbumsQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getArtistsIdTopTracksQueryKey(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists/{id}/top-tracks', params, keyArgs] as const
}

export function getArtistsIdTopTracksQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getArtistsIdTopTracksQueryKey>
  >({
    queryKey: getArtistsIdTopTracksQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .artists(params)
        ['top-tracks'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectArtistsIdTopTracks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.artists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getArtistsIdTopTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getArtistsIdTopTracksQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getArtistsIdRelatedArtistsQueryKey(params: Parameters<typeof client.artists>[0]) {
  return ['artists', '/artists/{id}/related-artists', params] as const
}

export function getArtistsIdRelatedArtistsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['related-artists']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getArtistsIdRelatedArtistsQueryKey>
  >({
    queryKey: getArtistsIdRelatedArtistsQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .artists(params)
        ['related-artists'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectArtistsIdRelatedArtists<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.artists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getArtistsIdRelatedArtistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['related-artists']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getArtistsIdRelatedArtistsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getShowsIdQueryKey(
  params: Parameters<typeof client.shows>[0],
  options?: Parameters<ReturnType<typeof client.shows>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows/{id}', params, keyArgs] as const
}

export function getShowsIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.shows>[0],
  options?: Parameters<ReturnType<typeof client.shows>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getShowsIdQueryKey>
  >({
    queryKey: getShowsIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .shows(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectShowsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.shows>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getShowsIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.shows>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getShowsIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getShowsQueryKey(options: Parameters<typeof client.shows.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows', keyArgs] as const
}

export function getShowsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.shows.get>>['error'], null>,
>(options: Parameters<typeof client.shows.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getShowsQueryKey>
  >({
    queryKey: getShowsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.shows.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectShows<
  TData = Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.shows.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getShowsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.shows.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getShowsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getShowsIdEpisodesQueryKey(
  params: Parameters<typeof client.shows>[0],
  options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows/{id}/episodes', params, keyArgs] as const
}

export function getShowsIdEpisodesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.shows>[0],
  options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getShowsIdEpisodesQueryKey>
  >({
    queryKey: getShowsIdEpisodesQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .shows(params)
        .episodes.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectShowsIdEpisodes<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.shows>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getShowsIdEpisodesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getShowsIdEpisodesQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getEpisodesIdQueryKey(
  params: Parameters<typeof client.episodes>[0],
  options?: Parameters<ReturnType<typeof client.episodes>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['episodes', '/episodes/{id}', params, keyArgs] as const
}

export function getEpisodesIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.episodes>[0],
  options?: Parameters<ReturnType<typeof client.episodes>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getEpisodesIdQueryKey>
  >({
    queryKey: getEpisodesIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .episodes(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectEpisodesId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.episodes>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getEpisodesIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.episodes>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getEpisodesIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getEpisodesQueryKey(options: Parameters<typeof client.episodes.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['episodes', '/episodes', keyArgs] as const
}

export function getEpisodesQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.episodes.get>>['error'], null>,
>(options: Parameters<typeof client.episodes.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getEpisodesQueryKey>
  >({
    queryKey: getEpisodesQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.episodes.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.episodes.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getEpisodesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.episodes.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getEpisodesQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getAudiobooksIdQueryKey(
  params: Parameters<typeof client.audiobooks>[0],
  options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks/{id}', params, keyArgs] as const
}

export function getAudiobooksIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getAudiobooksIdQueryKey>
  >({
    queryKey: getAudiobooksIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .audiobooks(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectAudiobooksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.audiobooks>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getAudiobooksIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAudiobooksIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getAudiobooksQueryKey(options: Parameters<typeof client.audiobooks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks', keyArgs] as const
}

export function getAudiobooksQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.audiobooks.get>>['error'], null>,
>(options: Parameters<typeof client.audiobooks.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getAudiobooksQueryKey>
  >({
    queryKey: getAudiobooksQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.audiobooks.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.audiobooks.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getAudiobooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.audiobooks.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getAudiobooksQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getAudiobooksIdChaptersQueryKey(
  params: Parameters<typeof client.audiobooks>[0],
  options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks/{id}/chapters', params, keyArgs] as const
}

export function getAudiobooksIdChaptersQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getAudiobooksIdChaptersQueryKey>
  >({
    queryKey: getAudiobooksIdChaptersQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .audiobooks(params)
        .chapters.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectAudiobooksIdChapters<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.audiobooks>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getAudiobooksIdChaptersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getAudiobooksIdChaptersQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getMeAudiobooksQueryKey(options?: Parameters<typeof client.me.audiobooks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/audiobooks', keyArgs] as const
}

export function getMeAudiobooksQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.get>>['error'], null>,
>(options?: Parameters<typeof client.me.audiobooks.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeAudiobooksQueryKey>
  >({
    queryKey: getMeAudiobooksQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.audiobooks.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAudiobooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.audiobooks.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeAudiobooksQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMeAudiobooksMutationKey() {
  return ['me', '/me/audiobooks', 'PUT'] as const
}

export function getPutMeAudiobooksMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.put>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.audiobooks.put>[0]
      options: Parameters<typeof client.me.audiobooks.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMeAudiobooksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.audiobooks.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.audiobooks.put>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.audiobooks.put>[0]
          options: Parameters<typeof client.me.audiobooks.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMeAudiobooksMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeleteMeAudiobooksMutationKey() {
  return ['me', '/me/audiobooks', 'DELETE'] as const
}

export function getDeleteMeAudiobooksMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.delete>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.delete>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.audiobooks.delete>[0]
      options: Parameters<typeof client.me.audiobooks.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteMeAudiobooksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.audiobooks.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.audiobooks.delete>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.audiobooks.delete>[0]
          options: Parameters<typeof client.me.audiobooks.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteMeAudiobooksMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMeAudiobooksContainsQueryKey(
  options: Parameters<typeof client.me.audiobooks.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/audiobooks/contains', keyArgs] as const
}

export function getMeAudiobooksContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>['error'], null>,
>(options: Parameters<typeof client.me.audiobooks.contains.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeAudiobooksContainsQueryKey>
  >({
    queryKey: getMeAudiobooksContainsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.audiobooks.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeAudiobooksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getMeAudiobooksContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.audiobooks.contains.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeAudiobooksContainsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getChaptersIdQueryKey(
  params: Parameters<typeof client.chapters>[0],
  options?: Parameters<ReturnType<typeof client.chapters>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chapters', '/chapters/{id}', params, keyArgs] as const
}

export function getChaptersIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.chapters>[0],
  options?: Parameters<ReturnType<typeof client.chapters>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChaptersIdQueryKey>
  >({
    queryKey: getChaptersIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .chapters(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChaptersId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.chapters>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChaptersIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.chapters>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getChaptersIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getChaptersQueryKey(options: Parameters<typeof client.chapters.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chapters', '/chapters', keyArgs] as const
}

export function getChaptersQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.chapters.get>>['error'], null>,
>(options: Parameters<typeof client.chapters.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getChaptersQueryKey>
  >({
    queryKey: getChaptersQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.chapters.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectChapters<
  TData = Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.chapters.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getChaptersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.chapters.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getChaptersQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getTracksIdQueryKey(
  params: Parameters<typeof client.tracks>[0],
  options?: Parameters<ReturnType<typeof client.tracks>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['tracks', '/tracks/{id}', params, keyArgs] as const
}

export function getTracksIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.tracks>[0],
  options?: Parameters<ReturnType<typeof client.tracks>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getTracksIdQueryKey>
  >({
    queryKey: getTracksIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .tracks(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectTracksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.tracks>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getTracksIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.tracks>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getTracksIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getTracksQueryKey(options: Parameters<typeof client.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['tracks', '/tracks', keyArgs] as const
}

export function getTracksQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.tracks.get>>['error'], null>,
>(options: Parameters<typeof client.tracks.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getTracksQueryKey>
  >({
    queryKey: getTracksQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.tracks.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectTracks<
  TData = Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.tracks.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.tracks.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getTracksQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getSearchQueryKey(options: Parameters<typeof client.search.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['search', '/search', keyArgs] as const
}

export function getSearchQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.search.get>>['error'], null>,
>(options: Parameters<typeof client.search.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getSearchQueryKey>
  >({
    queryKey: getSearchQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.search.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectSearch<
  TData = Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.search.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getSearchQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.search.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getSearchQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeQueryKey() {
  return ['me', '/me'] as const
}

export function getMeQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.get>>['error'], null>,
>(options?: Parameters<typeof client.me.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeQueryKey>
  >({
    queryKey: getMeQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMe<
  TData = Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPlaylistsPlaylistIdQueryKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}', params, keyArgs] as const
}

export function getPlaylistsPlaylistIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getPlaylistsPlaylistIdQueryKey>
  >({
    queryKey: getPlaylistsPlaylistIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .playlists(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectPlaylistsPlaylistId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getPlaylistsPlaylistIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPlaylistsPlaylistIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getPutPlaylistsPlaylistIdMutationKey() {
  return ['playlists', '/playlists/{playlist_id}', 'PUT'] as const
}

export function getPutPlaylistsPlaylistIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['put']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutPlaylistsPlaylistIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutPlaylistsPlaylistId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['put']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutPlaylistsPlaylistIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPlaylistsPlaylistIdTracksQueryKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/tracks', params, keyArgs] as const
}

export function getPlaylistsPlaylistIdTracksQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getPlaylistsPlaylistIdTracksQueryKey>
  >({
    queryKey: getPlaylistsPlaylistIdTracksQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .playlists(params)
        .tracks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectPlaylistsPlaylistIdTracks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getPlaylistsPlaylistIdTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPlaylistsPlaylistIdTracksQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getPutPlaylistsPlaylistIdTracksMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/tracks', 'PUT'] as const
}

export function getPutPlaylistsPlaylistIdTracksMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutPlaylistsPlaylistIdTracksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).tracks.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutPlaylistsPlaylistIdTracksMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPostPlaylistsPlaylistIdTracksMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/tracks', 'POST'] as const
}

export function getPostPlaylistsPlaylistIdTracksMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPlaylistsPlaylistIdTracksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).tracks.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostPlaylistsPlaylistIdTracksMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeletePlaylistsPlaylistIdTracksMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/tracks', 'DELETE'] as const
}

export function getDeletePlaylistsPlaylistIdTracksMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeletePlaylistsPlaylistIdTracksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).tracks.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeletePlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeletePlaylistsPlaylistIdTracksMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPlaylistsPlaylistIdItemsQueryKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/items', params, keyArgs] as const
}

export function getPlaylistsPlaylistIdItemsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getPlaylistsPlaylistIdItemsQueryKey>
  >({
    queryKey: getPlaylistsPlaylistIdItemsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .playlists(params)
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectPlaylistsPlaylistIdItems<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getPlaylistsPlaylistIdItemsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPlaylistsPlaylistIdItemsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getPutPlaylistsPlaylistIdItemsMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/items', 'PUT'] as const
}

export function getPutPlaylistsPlaylistIdItemsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['items']['put']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['items']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutPlaylistsPlaylistIdItemsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).items.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['items']['put']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['items']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutPlaylistsPlaylistIdItemsMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPostPlaylistsPlaylistIdItemsMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/items', 'POST'] as const
}

export function getPostPlaylistsPlaylistIdItemsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['items']['post']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['items']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPlaylistsPlaylistIdItemsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).items.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['items']['post']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['items']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostPlaylistsPlaylistIdItemsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeletePlaylistsPlaylistIdItemsMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/items', 'DELETE'] as const
}

export function getDeletePlaylistsPlaylistIdItemsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeletePlaylistsPlaylistIdItemsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).items.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeletePlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeletePlaylistsPlaylistIdItemsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMePlaylistsQueryKey(options?: Parameters<typeof client.me.playlists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/playlists', keyArgs] as const
}

export function getMePlaylistsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.get>>['error'], null>,
>(options?: Parameters<typeof client.me.playlists.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMePlaylistsQueryKey>
  >({
    queryKey: getMePlaylistsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.playlists.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMePlaylists<
  TData = Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlaylistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.playlists.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMePlaylistsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPostMePlaylistsMutationKey() {
  return ['me', '/me/playlists', 'POST'] as const
}

export function getPostMePlaylistsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.playlists.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.playlists.post>[0]
      options?: Parameters<typeof client.me.playlists.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostMePlaylistsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.playlists.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostMePlaylists<
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.playlists.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.playlists.post>[0]
          options?: Parameters<typeof client.me.playlists.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostMePlaylistsMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPutMeLibraryMutationKey() {
  return ['me', '/me/library', 'PUT'] as const
}

export function getPutMeLibraryMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.library.put>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.library.put>[0]
      options: Parameters<typeof client.me.library.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMeLibraryMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.library.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMeLibrary<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.library.put>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.library.put>[0]
          options: Parameters<typeof client.me.library.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMeLibraryMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeleteMeLibraryMutationKey() {
  return ['me', '/me/library', 'DELETE'] as const
}

export function getDeleteMeLibraryMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.delete>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.library.delete>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.library.delete>[0]
      options: Parameters<typeof client.me.library.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteMeLibraryMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.library.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteMeLibrary<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.library.delete>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.library.delete>[0]
          options: Parameters<typeof client.me.library.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteMeLibraryMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMeLibraryContainsQueryKey(
  options: Parameters<typeof client.me.library.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/library/contains', keyArgs] as const
}

export function getMeLibraryContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.library.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.contains.get>>['error'], null>,
>(options: Parameters<typeof client.me.library.contains.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.library.contains.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeLibraryContainsQueryKey>
  >({
    queryKey: getMeLibraryContainsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.library.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeLibraryContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.library.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.contains.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.me.library.contains.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getMeLibraryContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.library.contains.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeLibraryContainsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeAlbumsQueryKey(options?: Parameters<typeof client.me.albums.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/albums', keyArgs] as const
}

export function getMeAlbumsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.get>>['error'], null>,
>(options?: Parameters<typeof client.me.albums.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeAlbumsQueryKey>
  >({
    queryKey: getMeAlbumsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.albums.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAlbumsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.albums.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeAlbumsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMeAlbumsMutationKey() {
  return ['me', '/me/albums', 'PUT'] as const
}

export function getPutMeAlbumsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.albums.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.albums.put>[0]
      options: Parameters<typeof client.me.albums.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMeAlbumsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.albums.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.albums.put>[0]
          options: Parameters<typeof client.me.albums.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMeAlbumsMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeleteMeAlbumsMutationKey() {
  return ['me', '/me/albums', 'DELETE'] as const
}

export function getDeleteMeAlbumsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.delete>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.albums.delete>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.albums.delete>[0]
      options: Parameters<typeof client.me.albums.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteMeAlbumsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.albums.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.delete>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.albums.delete>[0]
          options: Parameters<typeof client.me.albums.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteMeAlbumsMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMeAlbumsContainsQueryKey(
  options: Parameters<typeof client.me.albums.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/albums/contains', keyArgs] as const
}

export function getMeAlbumsContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.albums.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.contains.get>>['error'], null>,
>(options: Parameters<typeof client.me.albums.contains.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeAlbumsContainsQueryKey>
  >({
    queryKey: getMeAlbumsContainsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.albums.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeAlbumsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.albums.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.contains.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAlbumsContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.albums.contains.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeAlbumsContainsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeTracksQueryKey(options?: Parameters<typeof client.me.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/tracks', keyArgs] as const
}

export function getMeTracksQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.get>>['error'], null>,
>(options?: Parameters<typeof client.me.tracks.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeTracksQueryKey>
  >({
    queryKey: getMeTracksQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.tracks.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.tracks.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeTracksQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMeTracksMutationKey() {
  return ['me', '/me/tracks', 'PUT'] as const
}

export function getPutMeTracksMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.tracks.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.tracks.put>[0]
      options?: Parameters<typeof client.me.tracks.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMeTracksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.tracks.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.tracks.put>[0]
          options?: Parameters<typeof client.me.tracks.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMeTracksMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeleteMeTracksMutationKey() {
  return ['me', '/me/tracks', 'DELETE'] as const
}

export function getDeleteMeTracksMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.delete>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.tracks.delete>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.tracks.delete>[0]
      options: Parameters<typeof client.me.tracks.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteMeTracksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.tracks.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.delete>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.tracks.delete>[0]
          options: Parameters<typeof client.me.tracks.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteMeTracksMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMeTracksContainsQueryKey(
  options: Parameters<typeof client.me.tracks.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/tracks/contains', keyArgs] as const
}

export function getMeTracksContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.tracks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.contains.get>>['error'], null>,
>(options: Parameters<typeof client.me.tracks.contains.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeTracksContainsQueryKey>
  >({
    queryKey: getMeTracksContainsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.tracks.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeTracksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.tracks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.contains.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTracksContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.tracks.contains.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeTracksContainsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeEpisodesQueryKey(options?: Parameters<typeof client.me.episodes.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/episodes', keyArgs] as const
}

export function getMeEpisodesQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.get>>['error'], null>,
>(options?: Parameters<typeof client.me.episodes.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeEpisodesQueryKey>
  >({
    queryKey: getMeEpisodesQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.episodes.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeEpisodesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.episodes.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeEpisodesQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMeEpisodesMutationKey() {
  return ['me', '/me/episodes', 'PUT'] as const
}

export function getPutMeEpisodesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.episodes.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.episodes.put>[0]
      options: Parameters<typeof client.me.episodes.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMeEpisodesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.episodes.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.episodes.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.episodes.put>[0]
          options: Parameters<typeof client.me.episodes.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMeEpisodesMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeleteMeEpisodesMutationKey() {
  return ['me', '/me/episodes', 'DELETE'] as const
}

export function getDeleteMeEpisodesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.delete>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.episodes.delete>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.episodes.delete>[0]
      options: Parameters<typeof client.me.episodes.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteMeEpisodesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.episodes.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.episodes.delete>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.episodes.delete>[0]
          options: Parameters<typeof client.me.episodes.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteMeEpisodesMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMeEpisodesContainsQueryKey(
  options: Parameters<typeof client.me.episodes.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/episodes/contains', keyArgs] as const
}

export function getMeEpisodesContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.contains.get>>['error'], null>,
>(options: Parameters<typeof client.me.episodes.contains.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.episodes.contains.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeEpisodesContainsQueryKey>
  >({
    queryKey: getMeEpisodesContainsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.episodes.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeEpisodesContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.contains.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getMeEpisodesContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.episodes.contains.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeEpisodesContainsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeShowsQueryKey(options?: Parameters<typeof client.me.shows.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/shows', keyArgs] as const
}

export function getMeShowsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.get>>['error'], null>,
>(options?: Parameters<typeof client.me.shows.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeShowsQueryKey>
  >({
    queryKey: getMeShowsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.shows.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeShows<
  TData = Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeShowsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.shows.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeShowsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMeShowsMutationKey() {
  return ['me', '/me/shows', 'PUT'] as const
}

export function getPutMeShowsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.shows.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.shows.put>[0]
      options: Parameters<typeof client.me.shows.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMeShowsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.shows.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.shows.put>[0]
          options: Parameters<typeof client.me.shows.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMeShowsMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeleteMeShowsMutationKey() {
  return ['me', '/me/shows', 'DELETE'] as const
}

export function getDeleteMeShowsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.delete>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.shows.delete>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.shows.delete>[0]
      options: Parameters<typeof client.me.shows.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteMeShowsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.shows.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.delete>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.shows.delete>[0]
          options: Parameters<typeof client.me.shows.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteMeShowsMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMeShowsContainsQueryKey(
  options: Parameters<typeof client.me.shows.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/shows/contains', keyArgs] as const
}

export function getMeShowsContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.shows.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.contains.get>>['error'], null>,
>(options: Parameters<typeof client.me.shows.contains.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeShowsContainsQueryKey>
  >({
    queryKey: getMeShowsContainsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.shows.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeShowsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.shows.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.contains.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeShowsContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.shows.contains.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeShowsContainsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getUsersUserIdQueryKey(params: Parameters<typeof client.users>[0]) {
  return ['users', '/users/{user_id}', params] as const
}

export function getUsersUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.users>[0],
  options?: Parameters<ReturnType<typeof client.users>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getUsersUserIdQueryKey>
  >({
    queryKey: getUsersUserIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .users(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.users>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getUsersUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.users>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersUserIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getUsersUserIdPlaylistsQueryKey(
  params: Parameters<typeof client.users>[0],
  options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['users', '/users/{user_id}/playlists', params, keyArgs] as const
}

export function getUsersUserIdPlaylistsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.users>[0],
  options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getUsersUserIdPlaylistsQueryKey>
  >({
    queryKey: getUsersUserIdPlaylistsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .users(params)
        .playlists.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersUserIdPlaylists<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.users>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getUsersUserIdPlaylistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersUserIdPlaylistsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getPostUsersUserIdPlaylistsMutationKey() {
  return ['users', '/users/{user_id}/playlists', 'POST'] as const
}

export function getPostUsersUserIdPlaylistsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.users>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.users>['playlists']['post']>[0]
      options?: Parameters<ReturnType<typeof client.users>['playlists']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUsersUserIdPlaylistsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users(params).playlists.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostUsersUserIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.users>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.users>['playlists']['post']>[0]
          options?: Parameters<ReturnType<typeof client.users>['playlists']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostUsersUserIdPlaylistsMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPutPlaylistsPlaylistIdFollowersMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/followers', 'PUT'] as const
}

export function getPutPlaylistsPlaylistIdFollowersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutPlaylistsPlaylistIdFollowersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).followers.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutPlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutPlaylistsPlaylistIdFollowersMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeletePlaylistsPlaylistIdFollowersMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/followers', 'DELETE'] as const
}

export function getDeletePlaylistsPlaylistIdFollowersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeletePlaylistsPlaylistIdFollowersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).followers.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeletePlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeletePlaylistsPlaylistIdFollowersMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getBrowseFeaturedPlaylistsQueryKey(
  options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/featured-playlists', keyArgs] as const
}

export function getBrowseFeaturedPlaylistsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getBrowseFeaturedPlaylistsQueryKey>
  >({
    queryKey: getBrowseFeaturedPlaylistsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.browse['featured-playlists'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectBrowseFeaturedPlaylists<
  TData = Extract<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getBrowseFeaturedPlaylistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getBrowseFeaturedPlaylistsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getBrowseCategoriesQueryKey(
  options?: Parameters<typeof client.browse.categories.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories', keyArgs] as const
}

export function getBrowseCategoriesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.browse.categories.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.browse.categories.get>>['error'], null>,
>(options?: Parameters<typeof client.browse.categories.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getBrowseCategoriesQueryKey>
  >({
    queryKey: getBrowseCategoriesQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.browse.categories.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectBrowseCategories<
  TData = Extract<
    Awaited<ReturnType<typeof client.browse.categories.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.browse.categories.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getBrowseCategoriesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.browse.categories.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getBrowseCategoriesQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getBrowseCategoriesCategoryIdQueryKey(
  params: Parameters<typeof client.browse.categories>[0],
  options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories/{category_id}', params, keyArgs] as const
}

export function getBrowseCategoriesCategoryIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.browse.categories>[0],
  options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getBrowseCategoriesCategoryIdQueryKey>
  >({
    queryKey: getBrowseCategoriesCategoryIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.browse
        .categories(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectBrowseCategoriesCategoryId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.browse.categories>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getBrowseCategoriesCategoryIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getBrowseCategoriesCategoryIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getBrowseCategoriesCategoryIdPlaylistsQueryKey(
  params: Parameters<typeof client.browse.categories>[0],
  options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories/{category_id}/playlists', params, keyArgs] as const
}

export function getBrowseCategoriesCategoryIdPlaylistsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.browse.categories>[0],
  options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getBrowseCategoriesCategoryIdPlaylistsQueryKey>
  >({
    queryKey: getBrowseCategoriesCategoryIdPlaylistsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.browse
        .categories(params)
        .playlists.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectBrowseCategoriesCategoryIdPlaylists<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.browse.categories>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getBrowseCategoriesCategoryIdPlaylistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getBrowseCategoriesCategoryIdPlaylistsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getPlaylistsPlaylistIdImagesQueryKey(
  params: Parameters<typeof client.playlists>[0],
) {
  return ['playlists', '/playlists/{playlist_id}/images', params] as const
}

export function getPlaylistsPlaylistIdImagesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['images']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getPlaylistsPlaylistIdImagesQueryKey>
  >({
    queryKey: getPlaylistsPlaylistIdImagesQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .playlists(params)
        .images.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectPlaylistsPlaylistIdImages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getPlaylistsPlaylistIdImagesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['images']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPlaylistsPlaylistIdImagesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getPutPlaylistsPlaylistIdImagesMutationKey() {
  return ['playlists', '/playlists/{playlist_id}/images', 'PUT'] as const
}

export function getPutPlaylistsPlaylistIdImagesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.playlists>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.playlists>['images']['put']>[0]
      options?: Parameters<ReturnType<typeof client.playlists>['images']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutPlaylistsPlaylistIdImagesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.playlists(params).images.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutPlaylistsPlaylistIdImages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.playlists>['images']['put']>[0]
          options?: Parameters<ReturnType<typeof client.playlists>['images']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutPlaylistsPlaylistIdImagesMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getBrowseNewReleasesQueryKey(
  options?: Parameters<(typeof client.browse)['new-releases']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/new-releases', keyArgs] as const
}

export function getBrowseNewReleasesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.browse)['new-releases']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getBrowseNewReleasesQueryKey>
  >({
    queryKey: getBrowseNewReleasesQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.browse['new-releases'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectBrowseNewReleases<
  TData = Extract<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getBrowseNewReleasesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.browse)['new-releases']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getBrowseNewReleasesQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeFollowingQueryKey(options: Parameters<typeof client.me.following.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/following', keyArgs] as const
}

export function getMeFollowingQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.get>>['error'], null>,
>(options: Parameters<typeof client.me.following.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeFollowingQueryKey>
  >({
    queryKey: getMeFollowingQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.following.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeFollowing<
  TData = Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeFollowingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.following.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeFollowingQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMeFollowingMutationKey() {
  return ['me', '/me/following', 'PUT'] as const
}

export function getPutMeFollowingMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.following.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.following.put>[0]
      options: Parameters<typeof client.me.following.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMeFollowingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.following.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.following.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.following.put>[0]
          options: Parameters<typeof client.me.following.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMeFollowingMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getDeleteMeFollowingMutationKey() {
  return ['me', '/me/following', 'DELETE'] as const
}

export function getDeleteMeFollowingMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.delete>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.following.delete>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.following.delete>[0]
      options: Parameters<typeof client.me.following.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteMeFollowingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.following.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.following.delete>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.following.delete>[0]
          options: Parameters<typeof client.me.following.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteMeFollowingMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMeFollowingContainsQueryKey(
  options: Parameters<typeof client.me.following.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/following/contains', keyArgs] as const
}

export function getMeFollowingContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.following.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.contains.get>>['error'], null>,
>(options: Parameters<typeof client.me.following.contains.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.following.contains.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeFollowingContainsQueryKey>
  >({
    queryKey: getMeFollowingContainsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.following.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeFollowingContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.following.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.contains.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.me.following.contains.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getMeFollowingContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.following.contains.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMeFollowingContainsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPlaylistsPlaylistIdFollowersContainsQueryKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/followers/contains', params, keyArgs] as const
}

export function getPlaylistsPlaylistIdFollowersContainsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getPlaylistsPlaylistIdFollowersContainsQueryKey>
  >({
    queryKey: getPlaylistsPlaylistIdFollowersContainsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .playlists(params)
        .followers.contains.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectPlaylistsPlaylistIdFollowersContains<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.playlists>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getPlaylistsPlaylistIdFollowersContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPlaylistsPlaylistIdFollowersContainsQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  }, injectOptions)
}

export function getAudioFeaturesQueryKey(
  options: Parameters<(typeof client)['audio-features']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audio-features', '/audio-features', keyArgs] as const
}

export function getAudioFeaturesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['audio-features']['get']>>['error'], null>,
>(options: Parameters<(typeof client)['audio-features']['get']>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<(typeof client)['audio-features']['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getAudioFeaturesQueryKey>
  >({
    queryKey: getAudioFeaturesQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client['audio-features'].get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectAudioFeatures<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['audio-features']['get']>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getAudioFeaturesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<(typeof client)['audio-features']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getAudioFeaturesQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getAudioFeaturesIdQueryKey(
  params: Parameters<(typeof client)['audio-features']>[0],
) {
  return ['audio-features', '/audio-features/{id}', params] as const
}

export function getAudioFeaturesIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['audio-features']>[0],
  options?: Parameters<ReturnType<(typeof client)['audio-features']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getAudioFeaturesIdQueryKey>
  >({
    queryKey: getAudioFeaturesIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client['audio-features'](params).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectAudioFeaturesId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<(typeof client)['audio-features']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getAudioFeaturesIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['audio-features']>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAudioFeaturesIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getAudioAnalysisIdQueryKey(
  params: Parameters<(typeof client)['audio-analysis']>[0],
) {
  return ['audio-analysis', '/audio-analysis/{id}', params] as const
}

export function getAudioAnalysisIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['audio-analysis']>[0],
  options?: Parameters<ReturnType<(typeof client)['audio-analysis']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getAudioAnalysisIdQueryKey>
  >({
    queryKey: getAudioAnalysisIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client['audio-analysis'](params).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectAudioAnalysisId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<(typeof client)['audio-analysis']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getAudioAnalysisIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['audio-analysis']>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAudioAnalysisIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
}

export function getRecommendationsQueryKey(
  options?: Parameters<typeof client.recommendations.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['recommendations', '/recommendations', keyArgs] as const
}

export function getRecommendationsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.recommendations.get>>['error'], null>,
>(options?: Parameters<typeof client.recommendations.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getRecommendationsQueryKey>
  >({
    queryKey: getRecommendationsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.recommendations.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectRecommendations<
  TData = Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.recommendations.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getRecommendationsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.recommendations.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getRecommendationsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getRecommendationsAvailableGenreSeedsQueryKey() {
  return ['recommendations', '/recommendations/available-genre-seeds'] as const
}

export function getRecommendationsAvailableGenreSeedsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.recommendations)['available-genre-seeds']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getRecommendationsAvailableGenreSeedsQueryKey>
  >({
    queryKey: getRecommendationsAvailableGenreSeedsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.recommendations['available-genre-seeds'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectRecommendationsAvailableGenreSeeds<
  TData = Extract<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getRecommendationsAvailableGenreSeedsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.recommendations)['available-genre-seeds']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getRecommendationsAvailableGenreSeedsQueryOptions<TData, TError>(clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getMePlayerQueryKey(options?: Parameters<typeof client.me.player.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player', keyArgs] as const
}

export function getMePlayerQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.get>>['error'], null>,
>(options?: Parameters<typeof client.me.player.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMePlayerQueryKey>
  >({
    queryKey: getMePlayerQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.player.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMePlayer<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMePlayerQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMePlayerMutationKey() {
  return ['me', '/me/player', 'PUT'] as const
}

export function getPutMePlayerMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.player.put>[0]
      options?: Parameters<typeof client.me.player.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMePlayerMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMePlayer<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.player.put>[0]
          options?: Parameters<typeof client.me.player.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMePlayerMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMePlayerDevicesQueryKey() {
  return ['me', '/me/player/devices'] as const
}

export function getMePlayerDevicesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.player.devices.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.devices.get>>['error'], null>,
>(options?: Parameters<typeof client.me.player.devices.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMePlayerDevicesQueryKey>
  >({
    queryKey: getMePlayerDevicesQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.player.devices.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMePlayerDevices<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.player.devices.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.devices.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerDevicesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.devices.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMePlayerDevicesQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMePlayerCurrentlyPlayingQueryKey(
  options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player/currently-playing', keyArgs] as const
}

export function getMePlayerCurrentlyPlayingQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getMePlayerCurrentlyPlayingQueryKey>
  >({
    queryKey: getMePlayerCurrentlyPlayingQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.player['currently-playing'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMePlayerCurrentlyPlaying<
  TData = Extract<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerCurrentlyPlayingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMePlayerCurrentlyPlayingQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPutMePlayerPlayMutationKey() {
  return ['me', '/me/player/play', 'PUT'] as const
}

export function getPutMePlayerPlayMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.play.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.play.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.me.player.play.put>[0]
      options?: Parameters<typeof client.me.player.play.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMePlayerPlayMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.play.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMePlayerPlay<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.play.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.play.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.me.player.play.put>[0]
          options?: Parameters<typeof client.me.player.play.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMePlayerPlayMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPutMePlayerPauseMutationKey() {
  return ['me', '/me/player/pause', 'PUT'] as const
}

export function getPutMePlayerPauseMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.pause.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.pause.put>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.pause.put>[0]
      options?: Parameters<typeof client.me.player.pause.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMePlayerPauseMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.pause.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMePlayerPause<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.pause.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.pause.put>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.pause.put>[0]
          options?: Parameters<typeof client.me.player.pause.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMePlayerPauseMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPostMePlayerNextMutationKey() {
  return ['me', '/me/player/next', 'POST'] as const
}

export function getPostMePlayerNextMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.next.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.next.post>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.next.post>[0]
      options?: Parameters<typeof client.me.player.next.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostMePlayerNextMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.next.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostMePlayerNext<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.next.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.next.post>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.next.post>[0]
          options?: Parameters<typeof client.me.player.next.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostMePlayerNextMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPostMePlayerPreviousMutationKey() {
  return ['me', '/me/player/previous', 'POST'] as const
}

export function getPostMePlayerPreviousMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.previous.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.previous.post>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.previous.post>[0]
      options?: Parameters<typeof client.me.player.previous.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostMePlayerPreviousMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.previous.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostMePlayerPrevious<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.previous.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.me.player.previous.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.previous.post>[0]
          options?: Parameters<typeof client.me.player.previous.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostMePlayerPreviousMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPutMePlayerSeekMutationKey() {
  return ['me', '/me/player/seek', 'PUT'] as const
}

export function getPutMePlayerSeekMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.seek.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.seek.put>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.seek.put>[0]
      options: Parameters<typeof client.me.player.seek.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMePlayerSeekMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.seek.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMePlayerSeek<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.seek.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.seek.put>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.seek.put>[0]
          options: Parameters<typeof client.me.player.seek.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMePlayerSeekMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPutMePlayerRepeatMutationKey() {
  return ['me', '/me/player/repeat', 'PUT'] as const
}

export function getPutMePlayerRepeatMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.repeat.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.repeat.put>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.repeat.put>[0]
      options: Parameters<typeof client.me.player.repeat.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMePlayerRepeatMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.repeat.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMePlayerRepeat<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.repeat.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.repeat.put>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.repeat.put>[0]
          options: Parameters<typeof client.me.player.repeat.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMePlayerRepeatMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPutMePlayerVolumeMutationKey() {
  return ['me', '/me/player/volume', 'PUT'] as const
}

export function getPutMePlayerVolumeMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.volume.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.volume.put>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.volume.put>[0]
      options: Parameters<typeof client.me.player.volume.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMePlayerVolumeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.volume.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMePlayerVolume<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.volume.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.volume.put>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.volume.put>[0]
          options: Parameters<typeof client.me.player.volume.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMePlayerVolumeMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getPutMePlayerShuffleMutationKey() {
  return ['me', '/me/player/shuffle', 'PUT'] as const
}

export function getPutMePlayerShuffleMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.shuffle.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.shuffle.put>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.shuffle.put>[0]
      options: Parameters<typeof client.me.player.shuffle.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutMePlayerShuffleMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.shuffle.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutMePlayerShuffle<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.shuffle.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.shuffle.put>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.shuffle.put>[0]
          options: Parameters<typeof client.me.player.shuffle.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutMePlayerShuffleMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMePlayerRecentlyPlayedQueryKey(
  options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player/recently-played', keyArgs] as const
}

export function getMePlayerRecentlyPlayedQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getMePlayerRecentlyPlayedQueryKey>
  >({
    queryKey: getMePlayerRecentlyPlayedQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.player['recently-played'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMePlayerRecentlyPlayed<
  TData = Extract<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerRecentlyPlayedQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMePlayerRecentlyPlayedQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMePlayerQueueQueryKey() {
  return ['me', '/me/player/queue'] as const
}

export function getMePlayerQueueQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.get>>['error'], null>,
>(options?: Parameters<typeof client.me.player.queue.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMePlayerQueueQueryKey>
  >({
    queryKey: getMePlayerQueueQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.player.queue.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMePlayerQueue<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerQueueQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.queue.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMePlayerQueueQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getPostMePlayerQueueMutationKey() {
  return ['me', '/me/player/queue', 'POST'] as const
}

export function getPostMePlayerQueueMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.me.player.queue.post>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<typeof client.me.player.queue.post>[0]
      options: Parameters<typeof client.me.player.queue.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostMePlayerQueueMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.me.player.queue.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostMePlayerQueue<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.queue.post>>, { error: null }>['data'],
        TError,
        {
          body?: Parameters<typeof client.me.player.queue.post>[0]
          options: Parameters<typeof client.me.player.queue.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostMePlayerQueueMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getMarketsQueryKey() {
  return ['markets', '/markets'] as const
}

export function getMarketsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.markets.get>>['error'], null>,
>(options?: Parameters<typeof client.markets.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMarketsQueryKey>
  >({
    queryKey: getMarketsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.markets.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMarkets<
  TData = Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.markets.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMarketsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.markets.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMarketsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeTopArtistsQueryKey(options?: Parameters<typeof client.me.top.artists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/top/artists', keyArgs] as const
}

export function getMeTopArtistsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.artists.get>>['error'], null>,
>(options?: Parameters<typeof client.me.top.artists.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeTopArtistsQueryKey>
  >({
    queryKey: getMeTopArtistsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.top.artists.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeTopArtists<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.artists.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTopArtistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.artists.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeTopArtistsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getMeTopTracksQueryKey(options?: Parameters<typeof client.me.top.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/top/tracks', keyArgs] as const
}

export function getMeTopTracksQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.tracks.get>>['error'], null>,
>(options?: Parameters<typeof client.me.top.tracks.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getMeTopTracksQueryKey>
  >({
    queryKey: getMeTopTracksQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.me.top.tracks.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectMeTopTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.tracks.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTopTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.tracks.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMeTopTracksQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}
