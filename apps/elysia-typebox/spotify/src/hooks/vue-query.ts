import { useQuery, useMutation, mutationOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
  QueryClient,
} from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
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
  params: MaybeRefOrGetter<Parameters<typeof client.albums>[0]>,
  options?: Parameters<ReturnType<typeof client.albums>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums/{id}', toValue(params), keyArgs] as const
}

export function getAlbumsIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.albums>[0]>,
  options?: Parameters<ReturnType<typeof client.albums>['get']>[0],
) {
  return {
    queryKey: computed(() => getAlbumsIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .albums(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAlbumsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.albums>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAlbumsIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.albums>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAlbumsIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .albums(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAlbumsQueryKey(options: Parameters<typeof client.albums.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums', keyArgs] as const
}

export function getAlbumsQueryOptions(options: Parameters<typeof client.albums.get>[0]) {
  return {
    queryKey: getAlbumsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.albums.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.albums.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
          ReturnType<typeof getAlbumsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.albums.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAlbumsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.albums.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAlbumsIdTracksQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.albums>[0]>,
  options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums/{id}/tracks', toValue(params), keyArgs] as const
}

export function getAlbumsIdTracksQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.albums>[0]>,
  options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0],
) {
  return {
    queryKey: computed(() => getAlbumsIdTracksQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .albums(toValue(params))
        .tracks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAlbumsIdTracks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.albums>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAlbumsIdTracksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAlbumsIdTracksQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .albums(toValue(params))
          .tracks.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getArtistsIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
) {
  return ['artists', '/artists/{id}', toValue(params)] as const
}

export function getArtistsIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: Parameters<ReturnType<typeof client.artists>['get']>[0],
) {
  return {
    queryKey: computed(() => getArtistsIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .artists(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useArtistsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getArtistsIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getArtistsIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .artists(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getArtistsQueryKey(options: Parameters<typeof client.artists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists', keyArgs] as const
}

export function getArtistsQueryOptions(options: Parameters<typeof client.artists.get>[0]) {
  return {
    queryKey: getArtistsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.artists.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useArtists<
  TData = Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.artists.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
          ReturnType<typeof getArtistsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.artists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getArtistsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.artists.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getArtistsIdAlbumsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists/{id}/albums', toValue(params), keyArgs] as const
}

export function getArtistsIdAlbumsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0],
) {
  return {
    queryKey: computed(() => getArtistsIdAlbumsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .artists(toValue(params))
        .albums.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useArtistsIdAlbums<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getArtistsIdAlbumsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getArtistsIdAlbumsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .artists(toValue(params))
          .albums.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getArtistsIdTopTracksQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists/{id}/top-tracks', toValue(params), keyArgs] as const
}

export function getArtistsIdTopTracksQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0],
) {
  return {
    queryKey: computed(() => getArtistsIdTopTracksQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .artists(toValue(params))
        ['top-tracks'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useArtistsIdTopTracks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getArtistsIdTopTracksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getArtistsIdTopTracksQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .artists(toValue(params))
          ['top-tracks'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getArtistsIdRelatedArtistsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
) {
  return ['artists', '/artists/{id}/related-artists', toValue(params)] as const
}

export function getArtistsIdRelatedArtistsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: Parameters<ReturnType<typeof client.artists>['related-artists']['get']>[0],
) {
  return {
    queryKey: computed(() => getArtistsIdRelatedArtistsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .artists(toValue(params))
        ['related-artists'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useArtistsIdRelatedArtists<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.artists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getArtistsIdRelatedArtistsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.artists>['related-artists']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getArtistsIdRelatedArtistsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .artists(toValue(params))
          ['related-artists'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getShowsIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.shows>[0]>,
  options?: Parameters<ReturnType<typeof client.shows>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows/{id}', toValue(params), keyArgs] as const
}

export function getShowsIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.shows>[0]>,
  options?: Parameters<ReturnType<typeof client.shows>['get']>[0],
) {
  return {
    queryKey: computed(() => getShowsIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .shows(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useShowsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.shows>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getShowsIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.shows>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getShowsIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .shows(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getShowsQueryKey(options: Parameters<typeof client.shows.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows', keyArgs] as const
}

export function getShowsQueryOptions(options: Parameters<typeof client.shows.get>[0]) {
  return {
    queryKey: getShowsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.shows.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useShows<
  TData = Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.shows.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
          ReturnType<typeof getShowsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.shows.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getShowsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.shows.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getShowsIdEpisodesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.shows>[0]>,
  options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows/{id}/episodes', toValue(params), keyArgs] as const
}

export function getShowsIdEpisodesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.shows>[0]>,
  options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0],
) {
  return {
    queryKey: computed(() => getShowsIdEpisodesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .shows(toValue(params))
        .episodes.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useShowsIdEpisodes<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.shows>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getShowsIdEpisodesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getShowsIdEpisodesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .shows(toValue(params))
          .episodes.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getEpisodesIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.episodes>[0]>,
  options?: Parameters<ReturnType<typeof client.episodes>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['episodes', '/episodes/{id}', toValue(params), keyArgs] as const
}

export function getEpisodesIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.episodes>[0]>,
  options?: Parameters<ReturnType<typeof client.episodes>['get']>[0],
) {
  return {
    queryKey: computed(() => getEpisodesIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .episodes(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useEpisodesId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.episodes>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getEpisodesIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.episodes>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getEpisodesIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .episodes(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getEpisodesQueryKey(options: Parameters<typeof client.episodes.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['episodes', '/episodes', keyArgs] as const
}

export function getEpisodesQueryOptions(options: Parameters<typeof client.episodes.get>[0]) {
  return {
    queryKey: getEpisodesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.episodes.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.episodes.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
          ReturnType<typeof getEpisodesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.episodes.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getEpisodesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.episodes.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAudiobooksIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.audiobooks>[0]>,
  options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks/{id}', toValue(params), keyArgs] as const
}

export function getAudiobooksIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.audiobooks>[0]>,
  options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0],
) {
  return {
    queryKey: computed(() => getAudiobooksIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .audiobooks(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAudiobooksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.audiobooks>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAudiobooksIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAudiobooksIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .audiobooks(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAudiobooksQueryKey(options: Parameters<typeof client.audiobooks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks', keyArgs] as const
}

export function getAudiobooksQueryOptions(options: Parameters<typeof client.audiobooks.get>[0]) {
  return {
    queryKey: getAudiobooksQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.audiobooks.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.audiobooks.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
          ReturnType<typeof getAudiobooksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.audiobooks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAudiobooksQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.audiobooks.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAudiobooksIdChaptersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.audiobooks>[0]>,
  options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks/{id}/chapters', toValue(params), keyArgs] as const
}

export function getAudiobooksIdChaptersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.audiobooks>[0]>,
  options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0],
) {
  return {
    queryKey: computed(() => getAudiobooksIdChaptersQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .audiobooks(toValue(params))
        .chapters.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAudiobooksIdChapters<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.audiobooks>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAudiobooksIdChaptersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAudiobooksIdChaptersQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .audiobooks(toValue(params))
          .chapters.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeAudiobooksQueryKey(options?: Parameters<typeof client.me.audiobooks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/audiobooks', keyArgs] as const
}

export function getMeAudiobooksQueryOptions(
  options?: Parameters<typeof client.me.audiobooks.get>[0],
) {
  return {
    queryKey: getMeAudiobooksQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.audiobooks.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
          ReturnType<typeof getMeAudiobooksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.audiobooks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeAudiobooksQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.audiobooks.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.audiobooks.put>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.audiobooks.put>[0]
            options: Parameters<typeof client.me.audiobooks.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMeAudiobooksMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function useDeleteMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.audiobooks.delete>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.audiobooks.delete>[0]
            options: Parameters<typeof client.me.audiobooks.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteMeAudiobooksMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMeAudiobooksContainsQueryKey(
  options: Parameters<typeof client.me.audiobooks.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/audiobooks/contains', keyArgs] as const
}

export function getMeAudiobooksContainsQueryOptions(
  options: Parameters<typeof client.me.audiobooks.contains.get>[0],
) {
  return {
    queryKey: getMeAudiobooksContainsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.audiobooks.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeAudiobooksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMeAudiobooksContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.audiobooks.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeAudiobooksContainsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.audiobooks.contains.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getChaptersIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.chapters>[0]>,
  options?: Parameters<ReturnType<typeof client.chapters>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chapters', '/chapters/{id}', toValue(params), keyArgs] as const
}

export function getChaptersIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.chapters>[0]>,
  options?: Parameters<ReturnType<typeof client.chapters>['get']>[0],
) {
  return {
    queryKey: computed(() => getChaptersIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .chapters(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChaptersId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chapters>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChaptersIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.chapters>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChaptersIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .chapters(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getChaptersQueryKey(options: Parameters<typeof client.chapters.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chapters', '/chapters', keyArgs] as const
}

export function getChaptersQueryOptions(options: Parameters<typeof client.chapters.get>[0]) {
  return {
    queryKey: getChaptersQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.chapters.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useChapters<
  TData = Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.chapters.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
          ReturnType<typeof getChaptersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.chapters.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getChaptersQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.chapters.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getTracksIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.tracks>[0]>,
  options?: Parameters<ReturnType<typeof client.tracks>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['tracks', '/tracks/{id}', toValue(params), keyArgs] as const
}

export function getTracksIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.tracks>[0]>,
  options?: Parameters<ReturnType<typeof client.tracks>['get']>[0],
) {
  return {
    queryKey: computed(() => getTracksIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .tracks(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useTracksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.tracks>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getTracksIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.tracks>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getTracksIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .tracks(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getTracksQueryKey(options: Parameters<typeof client.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['tracks', '/tracks', keyArgs] as const
}

export function getTracksQueryOptions(options: Parameters<typeof client.tracks.get>[0]) {
  return {
    queryKey: getTracksQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.tracks.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useTracks<
  TData = Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.tracks.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
          ReturnType<typeof getTracksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getTracksQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.tracks.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getSearchQueryKey(options: Parameters<typeof client.search.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['search', '/search', keyArgs] as const
}

export function getSearchQueryOptions(options: Parameters<typeof client.search.get>[0]) {
  return {
    queryKey: getSearchQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.search.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useSearch<
  TData = Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.search.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
          ReturnType<typeof getSearchQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.search.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getSearchQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.search.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeQueryKey() {
  return ['me', '/me'] as const
}

export function getMeQueryOptions(options?: Parameters<typeof client.me.get>[0]) {
  return {
    queryKey: getMeQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMe<
  TData = Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
          ReturnType<typeof getMeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPlaylistsPlaylistIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}', toValue(params), keyArgs] as const
}

export function getPlaylistsPlaylistIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['get']>[0],
) {
  return {
    queryKey: computed(() => getPlaylistsPlaylistIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .playlists(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function usePlaylistsPlaylistId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getPlaylistsPlaylistIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getPlaylistsPlaylistIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .playlists(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutPlaylistsPlaylistIdMutationKey() {
  return ['playlists', '/playlists/{playlist_id}', 'PUT'] as const
}

export function getPutPlaylistsPlaylistIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutPlaylistsPlaylistId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutPlaylistsPlaylistIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPlaylistsPlaylistIdTracksQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/tracks', toValue(params), keyArgs] as const
}

export function getPlaylistsPlaylistIdTracksQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0],
) {
  return {
    queryKey: computed(() => getPlaylistsPlaylistIdTracksQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .playlists(toValue(params))
        .tracks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function usePlaylistsPlaylistIdTracks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getPlaylistsPlaylistIdTracksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getPlaylistsPlaylistIdTracksQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .playlists(toValue(params))
          .tracks.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).tracks.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutPlaylistsPlaylistIdTracksMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).tracks.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostPlaylistsPlaylistIdTracksMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).tracks.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeletePlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeletePlaylistsPlaylistIdTracksMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPlaylistsPlaylistIdItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/items', toValue(params), keyArgs] as const
}

export function getPlaylistsPlaylistIdItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0],
) {
  return {
    queryKey: computed(() => getPlaylistsPlaylistIdItemsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .playlists(toValue(params))
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function usePlaylistsPlaylistIdItems<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getPlaylistsPlaylistIdItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getPlaylistsPlaylistIdItemsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .playlists(toValue(params))
          .items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).items.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutPlaylistsPlaylistIdItemsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).items.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostPlaylistsPlaylistIdItemsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).items.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeletePlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeletePlaylistsPlaylistIdItemsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMePlaylistsQueryKey(options?: Parameters<typeof client.me.playlists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/playlists', keyArgs] as const
}

export function getMePlaylistsQueryOptions(
  options?: Parameters<typeof client.me.playlists.get>[0],
) {
  return {
    queryKey: getMePlaylistsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.playlists.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMePlaylists<
  TData = Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
          ReturnType<typeof getMePlaylistsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.playlists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMePlaylistsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.playlists.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePostMePlaylists<
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.playlists.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.playlists.post>[0]
            options?: Parameters<typeof client.me.playlists.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostMePlaylistsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePutMeLibrary<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.library.put>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.library.put>[0]
            options: Parameters<typeof client.me.library.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMeLibraryMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function useDeleteMeLibrary<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.library.delete>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.library.delete>[0]
            options: Parameters<typeof client.me.library.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteMeLibraryMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMeLibraryContainsQueryKey(
  options: Parameters<typeof client.me.library.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/library/contains', keyArgs] as const
}

export function getMeLibraryContainsQueryOptions(
  options: Parameters<typeof client.me.library.contains.get>[0],
) {
  return {
    queryKey: getMeLibraryContainsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.library.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeLibraryContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.library.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.library.contains.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.library.contains.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMeLibraryContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.library.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeLibraryContainsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.library.contains.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeAlbumsQueryKey(options?: Parameters<typeof client.me.albums.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/albums', keyArgs] as const
}

export function getMeAlbumsQueryOptions(options?: Parameters<typeof client.me.albums.get>[0]) {
  return {
    queryKey: getMeAlbumsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.albums.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
          ReturnType<typeof getMeAlbumsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.albums.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeAlbumsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.albums.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.albums.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.albums.put>[0]
            options: Parameters<typeof client.me.albums.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMeAlbumsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function useDeleteMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.albums.delete>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.albums.delete>[0]
            options: Parameters<typeof client.me.albums.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteMeAlbumsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMeAlbumsContainsQueryKey(
  options: Parameters<typeof client.me.albums.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/albums/contains', keyArgs] as const
}

export function getMeAlbumsContainsQueryOptions(
  options: Parameters<typeof client.me.albums.contains.get>[0],
) {
  return {
    queryKey: getMeAlbumsContainsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.albums.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeAlbumsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.albums.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.albums.contains.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.albums.contains.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMeAlbumsContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.albums.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeAlbumsContainsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.albums.contains.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeTracksQueryKey(options?: Parameters<typeof client.me.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/tracks', keyArgs] as const
}

export function getMeTracksQueryOptions(options?: Parameters<typeof client.me.tracks.get>[0]) {
  return {
    queryKey: getMeTracksQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.tracks.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
          ReturnType<typeof getMeTracksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeTracksQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.tracks.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.tracks.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.tracks.put>[0]
            options?: Parameters<typeof client.me.tracks.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMeTracksMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function useDeleteMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.tracks.delete>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.tracks.delete>[0]
            options: Parameters<typeof client.me.tracks.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteMeTracksMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMeTracksContainsQueryKey(
  options: Parameters<typeof client.me.tracks.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/tracks/contains', keyArgs] as const
}

export function getMeTracksContainsQueryOptions(
  options: Parameters<typeof client.me.tracks.contains.get>[0],
) {
  return {
    queryKey: getMeTracksContainsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.tracks.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeTracksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.tracks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.tracks.contains.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.tracks.contains.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMeTracksContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.tracks.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeTracksContainsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.tracks.contains.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeEpisodesQueryKey(options?: Parameters<typeof client.me.episodes.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/episodes', keyArgs] as const
}

export function getMeEpisodesQueryOptions(options?: Parameters<typeof client.me.episodes.get>[0]) {
  return {
    queryKey: getMeEpisodesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.episodes.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
          ReturnType<typeof getMeEpisodesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.episodes.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeEpisodesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.episodes.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.episodes.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.episodes.put>[0]
            options: Parameters<typeof client.me.episodes.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMeEpisodesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function useDeleteMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.episodes.delete>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.episodes.delete>[0]
            options: Parameters<typeof client.me.episodes.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteMeEpisodesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMeEpisodesContainsQueryKey(
  options: Parameters<typeof client.me.episodes.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/episodes/contains', keyArgs] as const
}

export function getMeEpisodesContainsQueryOptions(
  options: Parameters<typeof client.me.episodes.contains.get>[0],
) {
  return {
    queryKey: getMeEpisodesContainsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.episodes.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeEpisodesContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMeEpisodesContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.episodes.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeEpisodesContainsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.episodes.contains.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeShowsQueryKey(options?: Parameters<typeof client.me.shows.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/shows', keyArgs] as const
}

export function getMeShowsQueryOptions(options?: Parameters<typeof client.me.shows.get>[0]) {
  return {
    queryKey: getMeShowsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.shows.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeShows<
  TData = Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
          ReturnType<typeof getMeShowsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.shows.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeShowsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.shows.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.shows.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.shows.put>[0]
            options: Parameters<typeof client.me.shows.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMeShowsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function useDeleteMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.shows.delete>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.shows.delete>[0]
            options: Parameters<typeof client.me.shows.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteMeShowsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMeShowsContainsQueryKey(
  options: Parameters<typeof client.me.shows.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/shows/contains', keyArgs] as const
}

export function getMeShowsContainsQueryOptions(
  options: Parameters<typeof client.me.shows.contains.get>[0],
) {
  return {
    queryKey: getMeShowsContainsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.shows.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeShowsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.shows.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.shows.contains.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.shows.contains.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMeShowsContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.shows.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeShowsContainsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.shows.contains.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getUsersUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
) {
  return ['users', '/users/{user_id}', toValue(params)] as const
}

export function getUsersUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: Parameters<ReturnType<typeof client.users>['get']>[0],
) {
  return {
    queryKey: computed(() => getUsersUserIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .users(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.users>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersUserIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .users(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getUsersUserIdPlaylistsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['users', '/users/{user_id}/playlists', toValue(params), keyArgs] as const
}

export function getUsersUserIdPlaylistsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0],
) {
  return {
    queryKey: computed(() => getUsersUserIdPlaylistsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .users(toValue(params))
        .playlists.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useUsersUserIdPlaylists<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersUserIdPlaylistsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersUserIdPlaylistsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .users(toValue(params))
          .playlists.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>) {
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
      const { data, error } = await client.users(toValue(params)).playlists.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUsersUserIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostUsersUserIdPlaylistsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).followers.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutPlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutPlaylistsPlaylistIdFollowersMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client
        .playlists(toValue(params))
        .followers.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeletePlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeletePlaylistsPlaylistIdFollowersMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getBrowseFeaturedPlaylistsQueryKey(
  options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/featured-playlists', keyArgs] as const
}

export function getBrowseFeaturedPlaylistsQueryOptions(
  options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0],
) {
  return {
    queryKey: getBrowseFeaturedPlaylistsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.browse['featured-playlists'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useBrowseFeaturedPlaylists<
  TData = Extract<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getBrowseFeaturedPlaylistsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getBrowseFeaturedPlaylistsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.browse['featured-playlists'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getBrowseCategoriesQueryKey(
  options?: Parameters<typeof client.browse.categories.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories', keyArgs] as const
}

export function getBrowseCategoriesQueryOptions(
  options?: Parameters<typeof client.browse.categories.get>[0],
) {
  return {
    queryKey: getBrowseCategoriesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.browse.categories.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useBrowseCategories<
  TData = Extract<
    Awaited<ReturnType<typeof client.browse.categories.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.browse.categories.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.browse.categories.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.browse.categories.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getBrowseCategoriesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.browse.categories.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getBrowseCategoriesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.browse.categories.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getBrowseCategoriesCategoryIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.browse.categories>[0]>,
  options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories/{category_id}', toValue(params), keyArgs] as const
}

export function getBrowseCategoriesCategoryIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.browse.categories>[0]>,
  options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0],
) {
  return {
    queryKey: computed(() => getBrowseCategoriesCategoryIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.browse
        .categories(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useBrowseCategoriesCategoryId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.browse.categories>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getBrowseCategoriesCategoryIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getBrowseCategoriesCategoryIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.browse
          .categories(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getBrowseCategoriesCategoryIdPlaylistsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.browse.categories>[0]>,
  options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories/{category_id}/playlists', toValue(params), keyArgs] as const
}

export function getBrowseCategoriesCategoryIdPlaylistsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.browse.categories>[0]>,
  options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0],
) {
  return {
    queryKey: computed(() => getBrowseCategoriesCategoryIdPlaylistsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.browse
        .categories(toValue(params))
        .playlists.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useBrowseCategoriesCategoryIdPlaylists<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.browse.categories>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getBrowseCategoriesCategoryIdPlaylistsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getBrowseCategoriesCategoryIdPlaylistsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.browse
          .categories(toValue(params))
          .playlists.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPlaylistsPlaylistIdImagesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
) {
  return ['playlists', '/playlists/{playlist_id}/images', toValue(params)] as const
}

export function getPlaylistsPlaylistIdImagesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['images']['get']>[0],
) {
  return {
    queryKey: computed(() => getPlaylistsPlaylistIdImagesQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .playlists(toValue(params))
        .images.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function usePlaylistsPlaylistIdImages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getPlaylistsPlaylistIdImagesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['images']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getPlaylistsPlaylistIdImagesQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .playlists(toValue(params))
          .images.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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
>(params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>) {
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
      const { data, error } = await client.playlists(toValue(params)).images.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutPlaylistsPlaylistIdImages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutPlaylistsPlaylistIdImagesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getBrowseNewReleasesQueryKey(
  options?: Parameters<(typeof client.browse)['new-releases']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/new-releases', keyArgs] as const
}

export function getBrowseNewReleasesQueryOptions(
  options?: Parameters<(typeof client.browse)['new-releases']['get']>[0],
) {
  return {
    queryKey: getBrowseNewReleasesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.browse['new-releases'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useBrowseNewReleases<
  TData = Extract<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getBrowseNewReleasesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.browse)['new-releases']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getBrowseNewReleasesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.browse['new-releases'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeFollowingQueryKey(options: Parameters<typeof client.me.following.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/following', keyArgs] as const
}

export function getMeFollowingQueryOptions(options: Parameters<typeof client.me.following.get>[0]) {
  return {
    queryKey: getMeFollowingQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.following.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeFollowing<
  TData = Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
          ReturnType<typeof getMeFollowingQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.following.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeFollowingQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.following.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.following.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.following.put>[0]
            options: Parameters<typeof client.me.following.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMeFollowingMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function useDeleteMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.delete>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.following.delete>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.following.delete>[0]
            options: Parameters<typeof client.me.following.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteMeFollowingMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMeFollowingContainsQueryKey(
  options: Parameters<typeof client.me.following.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/following/contains', keyArgs] as const
}

export function getMeFollowingContainsQueryOptions(
  options: Parameters<typeof client.me.following.contains.get>[0],
) {
  return {
    queryKey: getMeFollowingContainsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.following.contains.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeFollowingContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.following.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.following.contains.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.following.contains.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMeFollowingContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.following.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeFollowingContainsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.following.contains.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPlaylistsPlaylistIdFollowersContainsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'playlists',
    '/playlists/{playlist_id}/followers/contains',
    toValue(params),
    keyArgs,
  ] as const
}

export function getPlaylistsPlaylistIdFollowersContainsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0],
) {
  return {
    queryKey: computed(() => getPlaylistsPlaylistIdFollowersContainsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .playlists(toValue(params))
        .followers.contains.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function usePlaylistsPlaylistIdFollowersContains<
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
  params: MaybeRefOrGetter<Parameters<typeof client.playlists>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getPlaylistsPlaylistIdFollowersContainsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getPlaylistsPlaylistIdFollowersContainsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .playlists(toValue(params))
          .followers.contains.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAudioFeaturesQueryKey(
  options: Parameters<(typeof client)['audio-features']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audio-features', '/audio-features', keyArgs] as const
}

export function getAudioFeaturesQueryOptions(
  options: Parameters<(typeof client)['audio-features']['get']>[0],
) {
  return {
    queryKey: getAudioFeaturesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client['audio-features'].get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAudioFeatures<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['audio-features']['get']>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAudioFeaturesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<(typeof client)['audio-features']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAudioFeaturesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client['audio-features'].get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAudioFeaturesIdQueryKey(
  params: MaybeRefOrGetter<Parameters<(typeof client)['audio-features']>[0]>,
) {
  return ['audio-features', '/audio-features/{id}', toValue(params)] as const
}

export function getAudioFeaturesIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<(typeof client)['audio-features']>[0]>,
  options?: Parameters<ReturnType<(typeof client)['audio-features']>['get']>[0],
) {
  return {
    queryKey: computed(() => getAudioFeaturesIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client['audio-features'](toValue(params)).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAudioFeaturesId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['audio-features']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAudioFeaturesIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['audio-features']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAudioFeaturesIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client['audio-features'](toValue(params)).get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAudioAnalysisIdQueryKey(
  params: MaybeRefOrGetter<Parameters<(typeof client)['audio-analysis']>[0]>,
) {
  return ['audio-analysis', '/audio-analysis/{id}', toValue(params)] as const
}

export function getAudioAnalysisIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<(typeof client)['audio-analysis']>[0]>,
  options?: Parameters<ReturnType<(typeof client)['audio-analysis']>['get']>[0],
) {
  return {
    queryKey: computed(() => getAudioAnalysisIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client['audio-analysis'](toValue(params)).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAudioAnalysisId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['audio-analysis']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAudioAnalysisIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['audio-analysis']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAudioAnalysisIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client['audio-analysis'](toValue(params)).get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getRecommendationsQueryKey(
  options?: Parameters<typeof client.recommendations.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['recommendations', '/recommendations', keyArgs] as const
}

export function getRecommendationsQueryOptions(
  options?: Parameters<typeof client.recommendations.get>[0],
) {
  return {
    queryKey: getRecommendationsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.recommendations.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useRecommendations<
  TData = Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.recommendations.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
          ReturnType<typeof getRecommendationsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.recommendations.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getRecommendationsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.recommendations.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getRecommendationsAvailableGenreSeedsQueryKey() {
  return ['recommendations', '/recommendations/available-genre-seeds'] as const
}

export function getRecommendationsAvailableGenreSeedsQueryOptions(
  options?: Parameters<(typeof client.recommendations)['available-genre-seeds']['get']>[0],
) {
  return {
    queryKey: getRecommendationsAvailableGenreSeedsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.recommendations['available-genre-seeds'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useRecommendationsAvailableGenreSeeds<
  TData = Extract<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getRecommendationsAvailableGenreSeedsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.recommendations)['available-genre-seeds']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getRecommendationsAvailableGenreSeedsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.recommendations['available-genre-seeds'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMePlayerQueryKey(options?: Parameters<typeof client.me.player.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player', keyArgs] as const
}

export function getMePlayerQueryOptions(options?: Parameters<typeof client.me.player.get>[0]) {
  return {
    queryKey: getMePlayerQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.player.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMePlayer<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
          ReturnType<typeof getMePlayerQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMePlayerQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.player.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMePlayer<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.player.put>[0]
            options?: Parameters<typeof client.me.player.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMePlayerMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMePlayerDevicesQueryKey() {
  return ['me', '/me/player/devices'] as const
}

export function getMePlayerDevicesQueryOptions(
  options?: Parameters<typeof client.me.player.devices.get>[0],
) {
  return {
    queryKey: getMePlayerDevicesQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.player.devices.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMePlayerDevices<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.player.devices.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.devices.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.player.devices.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.me.player.devices.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMePlayerDevicesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.devices.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMePlayerDevicesQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.player.devices.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMePlayerCurrentlyPlayingQueryKey(
  options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player/currently-playing', keyArgs] as const
}

export function getMePlayerCurrentlyPlayingQueryOptions(
  options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0],
) {
  return {
    queryKey: getMePlayerCurrentlyPlayingQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.player['currently-playing'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMePlayerCurrentlyPlaying<
  TData = Extract<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMePlayerCurrentlyPlayingQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMePlayerCurrentlyPlayingQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.player['currently-playing'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePutMePlayerPlay<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.play.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.play.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.me.player.play.put>[0]
            options?: Parameters<typeof client.me.player.play.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMePlayerPlayMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePutMePlayerPause<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.pause.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.pause.put>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.player.pause.put>[0]
            options?: Parameters<typeof client.me.player.pause.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMePlayerPauseMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePostMePlayerNext<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.next.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.next.post>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.player.next.post>[0]
            options?: Parameters<typeof client.me.player.next.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostMePlayerNextMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePostMePlayerPrevious<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.previous.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostMePlayerPreviousMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePutMePlayerSeek<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.seek.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.seek.put>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.player.seek.put>[0]
            options: Parameters<typeof client.me.player.seek.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMePlayerSeekMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePutMePlayerRepeat<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.repeat.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.repeat.put>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.player.repeat.put>[0]
            options: Parameters<typeof client.me.player.repeat.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMePlayerRepeatMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePutMePlayerVolume<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.volume.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.volume.put>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.player.volume.put>[0]
            options: Parameters<typeof client.me.player.volume.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMePlayerVolumeMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
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

export function usePutMePlayerShuffle<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.shuffle.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.me.player.shuffle.put>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<typeof client.me.player.shuffle.put>[0]
            options: Parameters<typeof client.me.player.shuffle.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutMePlayerShuffleMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMePlayerRecentlyPlayedQueryKey(
  options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player/recently-played', keyArgs] as const
}

export function getMePlayerRecentlyPlayedQueryOptions(
  options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0],
) {
  return {
    queryKey: getMePlayerRecentlyPlayedQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.player['recently-played'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMePlayerRecentlyPlayed<
  TData = Extract<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getMePlayerRecentlyPlayedQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMePlayerRecentlyPlayedQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.player['recently-played'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMePlayerQueueQueryKey() {
  return ['me', '/me/player/queue'] as const
}

export function getMePlayerQueueQueryOptions(
  options?: Parameters<typeof client.me.player.queue.get>[0],
) {
  return {
    queryKey: getMePlayerQueueQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.player.queue.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMePlayerQueue<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
          ReturnType<typeof getMePlayerQueueQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.queue.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMePlayerQueueQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.player.queue.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
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

export function usePostMePlayerQueue<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.me.player.queue.post>>, { error: null }>['data'],
          TError,
          {
            body?: Parameters<typeof client.me.player.queue.post>[0]
            options: Parameters<typeof client.me.player.queue.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostMePlayerQueueMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getMarketsQueryKey() {
  return ['markets', '/markets'] as const
}

export function getMarketsQueryOptions(options?: Parameters<typeof client.markets.get>[0]) {
  return {
    queryKey: getMarketsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.markets.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMarkets<
  TData = Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.markets.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
          ReturnType<typeof getMarketsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.markets.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMarketsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.markets.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeTopArtistsQueryKey(options?: Parameters<typeof client.me.top.artists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/top/artists', keyArgs] as const
}

export function getMeTopArtistsQueryOptions(
  options?: Parameters<typeof client.me.top.artists.get>[0],
) {
  return {
    queryKey: getMeTopArtistsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.top.artists.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeTopArtists<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.artists.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
          ReturnType<typeof getMeTopArtistsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.artists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeTopArtistsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.top.artists.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getMeTopTracksQueryKey(options?: Parameters<typeof client.me.top.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/top/tracks', keyArgs] as const
}

export function getMeTopTracksQueryOptions(
  options?: Parameters<typeof client.me.top.tracks.get>[0],
) {
  return {
    queryKey: getMeTopTracksQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.me.top.tracks.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useMeTopTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.tracks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
          ReturnType<typeof getMeTopTracksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getMeTopTracksQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.me.top.tracks.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}
