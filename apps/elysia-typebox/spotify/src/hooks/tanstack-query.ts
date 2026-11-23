import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseSuspenseQueryOptions,
  UseMutationOptions,
  QueryClient,
} from '@tanstack/react-query'
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

export function useAlbumsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.albums>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getAlbumsIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAlbumsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.albums>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getAlbumsIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.albums.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getAlbumsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.albums.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getAlbumsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.albums.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getAlbumsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.albums.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getAlbumsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.albums>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getAlbumsIdTracksQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAlbumsIdTracks<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getAlbumsIdTracksQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useArtistsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getArtistsIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseArtistsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getArtistsIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useArtists<
  TData = Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.artists.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getArtistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.artists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getArtistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseArtists<
  TData = Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.artists.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getArtistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.artists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getArtistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.artists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getArtistsIdAlbumsQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseArtistsIdAlbums<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getArtistsIdAlbumsQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.artists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getArtistsIdTopTracksQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseArtistsIdTopTracks<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getArtistsIdTopTracksQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.artists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getArtistsIdRelatedArtistsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseArtistsIdRelatedArtists<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getArtistsIdRelatedArtistsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
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

export function useShowsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.shows>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getShowsIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseShowsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.shows>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getShowsIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useShows<
  TData = Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.shows.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getShowsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.shows.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getShowsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseShows<
  TData = Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.shows.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getShowsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.shows.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getShowsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.shows>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getShowsIdEpisodesQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseShowsIdEpisodes<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getShowsIdEpisodesQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useEpisodesId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.episodes>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getEpisodesIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseEpisodesId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.episodes>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getEpisodesIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.episodes.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getEpisodesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.episodes.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getEpisodesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.episodes.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getEpisodesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.episodes.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getEpisodesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useAudiobooksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getAudiobooksIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAudiobooksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getAudiobooksIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.audiobooks.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getAudiobooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.audiobooks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getAudiobooksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.audiobooks.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getAudiobooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.audiobooks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getAudiobooksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.audiobooks>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getAudiobooksIdChaptersQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseAudiobooksIdChapters<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getAudiobooksIdChaptersQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
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

export function useMeAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAudiobooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.audiobooks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeAudiobooksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeAudiobooks<
  TData = Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAudiobooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.audiobooks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeAudiobooksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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

export function useMeAudiobooksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeAudiobooksContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeAudiobooksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeAudiobooksContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useChaptersId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.chapters>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getChaptersIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseChaptersId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.chapters>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getChaptersIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useChapters<
  TData = Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.chapters.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getChaptersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.chapters.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getChaptersQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseChapters<
  TData = Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.chapters.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getChaptersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.chapters.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getChaptersQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useTracksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.tracks>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getTracksIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseTracksId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.tracks>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getTracksIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useTracks<
  TData = Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.tracks.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getTracksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseTracks<
  TData = Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.tracks.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getTracksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useSearch<
  TData = Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.search.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getSearchQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.search.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getSearchQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseSearch<
  TData = Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.search.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getSearchQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.search.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getSearchQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMe<
  TData = Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMe<
  TData = Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function usePlaylistsPlaylistId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getPlaylistsPlaylistIdQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspensePlaylistsPlaylistId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getPlaylistsPlaylistIdQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
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

export function usePutPlaylistsPlaylistId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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
  params: Parameters<typeof client.playlists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getPlaylistsPlaylistIdTracksQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspensePlaylistsPlaylistIdTracks<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getPlaylistsPlaylistIdTracksQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
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

export function usePutPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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

export function usePostPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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

export function useDeletePlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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
  params: Parameters<typeof client.playlists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getPlaylistsPlaylistIdItemsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspensePlaylistsPlaylistIdItems<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getPlaylistsPlaylistIdItemsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
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

export function usePutPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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

export function usePostPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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

export function useDeletePlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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

export function useMePlaylists<
  TData = Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlaylistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.playlists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMePlaylistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMePlaylists<
  TData = Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlaylistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.playlists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMePlaylistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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
      UseMutationOptions<
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

export function useMeLibraryContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.library.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeLibraryContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeLibraryContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.library.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeLibraryContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMeAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAlbumsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.albums.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeAlbumsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeAlbums<
  TData = Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAlbumsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.albums.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeAlbumsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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

export function useMeAlbumsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.albums.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAlbumsContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.albums.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeAlbumsContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeAlbumsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.albums.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeAlbumsContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.albums.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeAlbumsContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMeTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeTracksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeTracksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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

export function useMeTracksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.tracks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTracksContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.tracks.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeTracksContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeTracksContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.tracks.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTracksContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.tracks.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeTracksContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMeEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeEpisodesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.episodes.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeEpisodesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeEpisodes<
  TData = Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeEpisodesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.episodes.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeEpisodesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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

export function useMeEpisodesContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeEpisodesContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeEpisodesContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.episodes.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeEpisodesContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMeShows<
  TData = Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeShowsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.shows.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeShowsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeShows<
  TData = Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeShowsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.shows.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeShowsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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

export function useMeShowsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.shows.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeShowsContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.shows.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeShowsContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeShowsContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.shows.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeShowsContainsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.shows.contains.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeShowsContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersUserIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersUserIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.users>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getUsersUserIdPlaylistsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseUsersUserIdPlaylists<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getUsersUserIdPlaylistsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
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

export function usePostUsersUserIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    mutation?: Omit<
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

export function usePutPlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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

export function useDeletePlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getBrowseFeaturedPlaylistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseBrowseFeaturedPlaylists<
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
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getBrowseFeaturedPlaylistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useBrowseCategories<
  TData = Extract<
    Awaited<ReturnType<typeof client.browse.categories.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.browse.categories.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getBrowseCategoriesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.browse.categories.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getBrowseCategoriesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseBrowseCategories<
  TData = Extract<
    Awaited<ReturnType<typeof client.browse.categories.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.browse.categories.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getBrowseCategoriesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.browse.categories.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getBrowseCategoriesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.browse.categories>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getBrowseCategoriesCategoryIdQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseBrowseCategoriesCategoryId<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getBrowseCategoriesCategoryIdQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
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
  params: Parameters<typeof client.browse.categories>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getBrowseCategoriesCategoryIdPlaylistsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseBrowseCategoriesCategoryIdPlaylists<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getBrowseCategoriesCategoryIdPlaylistsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
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
  params: Parameters<typeof client.playlists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getPlaylistsPlaylistIdImagesQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspensePlaylistsPlaylistIdImages<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getPlaylistsPlaylistIdImagesQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
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

export function usePutPlaylistsPlaylistIdImages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: Omit<
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
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getBrowseNewReleasesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseBrowseNewReleases<
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
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getBrowseNewReleasesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMeFollowing<
  TData = Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeFollowingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.following.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeFollowingQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeFollowing<
  TData = Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeFollowingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.me.following.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeFollowingQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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

export function useMeFollowingContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.following.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getMeFollowingContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeFollowingContains<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.following.contains.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.contains.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getMeFollowingContainsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<typeof client.playlists>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getPlaylistsPlaylistIdFollowersContainsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspensePlaylistsPlaylistIdFollowersContains<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getPlaylistsPlaylistIdFollowersContainsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
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

export function useAudioFeatures<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['audio-features']['get']>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getAudioFeaturesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAudioFeatures<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['audio-features']['get']>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getAudioFeaturesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<(typeof client)['audio-features']>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getAudioFeaturesIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAudioFeaturesId<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getAudioFeaturesIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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
  params: Parameters<(typeof client)['audio-analysis']>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getAudioAnalysisIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseAudioAnalysisId<
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
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getAudioAnalysisIdQueryOptions<TData, TError>(params, clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useRecommendations<
  TData = Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.recommendations.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getRecommendationsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.recommendations.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getRecommendationsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseRecommendations<
  TData = Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.recommendations.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getRecommendationsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.recommendations.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getRecommendationsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getRecommendationsAvailableGenreSeedsQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseRecommendationsAvailableGenreSeeds<
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
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getRecommendationsAvailableGenreSeedsQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
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

export function useMePlayer<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMePlayerQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMePlayer<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMePlayerQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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

export function useMePlayerDevices<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.player.devices.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.devices.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerDevicesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.devices.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMePlayerDevicesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMePlayerDevices<
  TData = Extract<
    Awaited<ReturnType<typeof client.me.player.devices.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.devices.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerDevicesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.devices.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMePlayerDevicesQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMePlayerCurrentlyPlayingQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMePlayerCurrentlyPlaying<
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
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMePlayerCurrentlyPlayingQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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
      UseMutationOptions<
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
      UseMutationOptions<
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
      UseMutationOptions<
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
      UseMutationOptions<
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
      UseMutationOptions<
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
      UseMutationOptions<
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
      UseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMePlayerRecentlyPlayedQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMePlayerRecentlyPlayed<
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
      UseSuspenseQueryOptions<
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
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMePlayerRecentlyPlayedQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMePlayerQueue<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerQueueQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.queue.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMePlayerQueueQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMePlayerQueue<
  TData = Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMePlayerQueueQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.player.queue.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMePlayerQueueQueryOptions<TData, TError>(clientOptions), ...queryOptions },
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
      UseMutationOptions<
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

export function useMarkets<
  TData = Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.markets.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMarketsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.markets.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMarketsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMarkets<
  TData = Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.markets.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMarketsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.markets.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMarketsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMeTopArtists<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.artists.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTopArtistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.artists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeTopArtistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeTopArtists<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.artists.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTopArtistsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.artists.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeTopArtistsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
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

export function useMeTopTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.tracks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTopTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getMeTopTracksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseMeTopTracks<
  TData = Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.tracks.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getMeTopTracksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.me.top.tracks.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getMeTopTracksQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}
