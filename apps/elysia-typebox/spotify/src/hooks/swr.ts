import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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

export function getGetAlbumsIdKey(
  params: Parameters<typeof client.albums>[0],
  options?: Parameters<ReturnType<typeof client.albums>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums/{id}', params, keyArgs] as const
}

export function useGetAlbumsId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.albums>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.albums>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAlbumsIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.albums(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAlbumsId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.albums>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.albums>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAlbumsIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.albums(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAlbumsKey(options: Parameters<typeof client.albums.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums', keyArgs] as const
}

export function useGetAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.albums.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.albums.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAlbumsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.albums.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.albums.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.albums.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAlbumsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.albums.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.albums.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAlbumsIdTracksKey(
  params: Parameters<typeof client.albums>[0],
  options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['albums', '/albums/{id}/tracks', params, keyArgs] as const
}

export function useGetAlbumsIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.albums>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAlbumsIdTracksKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.albums(params).tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAlbumsIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.albums>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.albums>['tracks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAlbumsIdTracksKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.albums>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.albums(params).tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetArtistsIdKey(params: Parameters<typeof client.artists>[0]) {
  return ['artists', '/artists/{id}', params] as const
}

export function useGetArtistsId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetArtistsIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArtistsId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetArtistsIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetArtistsKey(options: Parameters<typeof client.artists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists', keyArgs] as const
}

export function useGetArtists<
  TError = Exclude<Awaited<ReturnType<typeof client.artists.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.artists.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArtists<
  TError = Exclude<Awaited<ReturnType<typeof client.artists.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.artists.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.artists.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetArtistsIdAlbumsKey(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists/{id}/albums', params, keyArgs] as const
}

export function useGetArtistsIdAlbums<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsIdAlbumsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params).albums.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArtistsIdAlbums<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['albums']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsIdAlbumsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['albums']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params).albums.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetArtistsIdTopTracksKey(
  params: Parameters<typeof client.artists>[0],
  options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['artists', '/artists/{id}/top-tracks', params, keyArgs] as const
}

export function useGetArtistsIdTopTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsIdTopTracksKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params)['top-tracks'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArtistsIdTopTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['top-tracks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsIdTopTracksKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['top-tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params)['top-tracks'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetArtistsIdRelatedArtistsKey(params: Parameters<typeof client.artists>[0]) {
  return ['artists', '/artists/{id}/related-artists', params] as const
}

export function useGetArtistsIdRelatedArtists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['related-artists']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsIdRelatedArtistsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params)['related-artists'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArtistsIdRelatedArtists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.artists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.artists>['related-artists']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetArtistsIdRelatedArtistsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.artists>['related-artists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.artists(params)['related-artists'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetShowsIdKey(
  params: Parameters<typeof client.shows>[0],
  options?: Parameters<ReturnType<typeof client.shows>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows/{id}', params, keyArgs] as const
}

export function useGetShowsId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.shows>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.shows>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetShowsIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.shows(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetShowsId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.shows>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.shows>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetShowsIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<ReturnType<typeof client.shows>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.shows(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetShowsKey(options: Parameters<typeof client.shows.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows', keyArgs] as const
}

export function useGetShows<
  TError = Exclude<Awaited<ReturnType<typeof client.shows.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.shows.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetShowsKey(clientOptions) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.shows.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetShows<
  TError = Exclude<Awaited<ReturnType<typeof client.shows.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.shows.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetShowsKey(clientOptions) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.shows.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.shows.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetShowsIdEpisodesKey(
  params: Parameters<typeof client.shows>[0],
  options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['shows', '/shows/{id}/episodes', params, keyArgs] as const
}

export function useGetShowsIdEpisodes<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.shows>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetShowsIdEpisodesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.shows(params).episodes.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetShowsIdEpisodes<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.shows>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.shows>['episodes']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetShowsIdEpisodesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.shows>['episodes']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.shows(params).episodes.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetEpisodesIdKey(
  params: Parameters<typeof client.episodes>[0],
  options?: Parameters<ReturnType<typeof client.episodes>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['episodes', '/episodes/{id}', params, keyArgs] as const
}

export function useGetEpisodesId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.episodes>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.episodes>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEpisodesIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.episodes(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEpisodesId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.episodes>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.episodes>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEpisodesIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.episodes>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.episodes(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetEpisodesKey(options: Parameters<typeof client.episodes.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['episodes', '/episodes', keyArgs] as const
}

export function useGetEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.episodes.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.episodes.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEpisodesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.episodes.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.episodes.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.episodes.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEpisodesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.episodes.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.episodes.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAudiobooksIdKey(
  params: Parameters<typeof client.audiobooks>[0],
  options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks/{id}', params, keyArgs] as const
}

export function useGetAudiobooksId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudiobooksIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audiobooks(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudiobooksId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.audiobooks>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudiobooksIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audiobooks(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAudiobooksKey(options: Parameters<typeof client.audiobooks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks', keyArgs] as const
}

export function useGetAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.audiobooks.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.audiobooks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudiobooksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audiobooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.audiobooks.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.audiobooks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudiobooksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.audiobooks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audiobooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAudiobooksIdChaptersKey(
  params: Parameters<typeof client.audiobooks>[0],
  options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audiobooks', '/audiobooks/{id}/chapters', params, keyArgs] as const
}

export function useGetAudiobooksIdChapters<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudiobooksIdChaptersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audiobooks(params).chapters.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudiobooksIdChapters<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audiobooks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.audiobooks>['chapters']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudiobooksIdChaptersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audiobooks>['chapters']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audiobooks(params).chapters.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeAudiobooksKey(options?: Parameters<typeof client.me.audiobooks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/audiobooks', keyArgs] as const
}

export function useGetMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.audiobooks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAudiobooksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.audiobooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.audiobooks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAudiobooksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.audiobooks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.audiobooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMeAudiobooksKey() {
  return ['me', '/me/audiobooks', 'PUT'] as const
}

export function usePutMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.audiobooks.put>[0]
      options: Parameters<typeof client.me.audiobooks.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeAudiobooksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.audiobooks.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.audiobooks.put>[0]
        options: Parameters<typeof client.me.audiobooks.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.audiobooks.put>[0]
            options: Parameters<typeof client.me.audiobooks.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.audiobooks.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteMeAudiobooksKey() {
  return ['me', '/me/audiobooks', 'DELETE'] as const
}

export function useDeleteMeAudiobooks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.delete>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.delete>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.audiobooks.delete>[0]
      options: Parameters<typeof client.me.audiobooks.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeAudiobooksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.audiobooks.delete>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.audiobooks.delete>[0]
        options: Parameters<typeof client.me.audiobooks.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.audiobooks.delete>[0]
            options: Parameters<typeof client.me.audiobooks.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.audiobooks.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMeAudiobooksContainsKey(
  options: Parameters<typeof client.me.audiobooks.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/audiobooks/contains', keyArgs] as const
}

export function useGetMeAudiobooksContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.audiobooks.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAudiobooksContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.audiobooks.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeAudiobooksContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.audiobooks.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAudiobooksContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.me.audiobooks.contains.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.audiobooks.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetChaptersIdKey(
  params: Parameters<typeof client.chapters>[0],
  options?: Parameters<ReturnType<typeof client.chapters>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chapters', '/chapters/{id}', params, keyArgs] as const
}

export function useGetChaptersId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.chapters>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chapters>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChaptersIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chapters(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChaptersId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.chapters>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chapters>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChaptersIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chapters>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chapters(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetChaptersKey(options: Parameters<typeof client.chapters.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chapters', '/chapters', keyArgs] as const
}

export function useGetChapters<
  TError = Exclude<Awaited<ReturnType<typeof client.chapters.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.chapters.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChaptersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chapters.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChapters<
  TError = Exclude<Awaited<ReturnType<typeof client.chapters.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.chapters.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChaptersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.chapters.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chapters.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetTracksIdKey(
  params: Parameters<typeof client.tracks>[0],
  options?: Parameters<ReturnType<typeof client.tracks>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['tracks', '/tracks/{id}', params, keyArgs] as const
}

export function useGetTracksId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.tracks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.tracks>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetTracksIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.tracks(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTracksId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.tracks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.tracks>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetTracksIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.tracks>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.tracks(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetTracksKey(options: Parameters<typeof client.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['tracks', '/tracks', keyArgs] as const
}

export function useGetTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.tracks.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.tracks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetTracksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.tracks.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.tracks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetTracksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.tracks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetSearchKey(options: Parameters<typeof client.search.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['search', '/search', keyArgs] as const
}

export function useGetSearch<
  TError = Exclude<Awaited<ReturnType<typeof client.search.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.search.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSearchKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSearch<
  TError = Exclude<Awaited<ReturnType<typeof client.search.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.search.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSearchKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.search.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeKey() {
  return ['me', '/me'] as const
}

export function useGetMe<
  TError = Exclude<Awaited<ReturnType<typeof client.me.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey === undefined ? getGetMeKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'], TError>(
      swrKey,
      async () => {
        const { data, error } = await client.me.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMe<
  TError = Exclude<Awaited<ReturnType<typeof client.me.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey === undefined ? getGetMeKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetPlaylistsPlaylistIdKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}', params, keyArgs] as const
}

export function useGetPlaylistsPlaylistId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPlaylistsPlaylistId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutPlaylistsPlaylistIdKey() {
  return ['playlists', '/playlists/{playlist_id}', 'PUT'] as const
}

export function usePutPlaylistsPlaylistId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>['error'], null>,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['put']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetPlaylistsPlaylistIdTracksKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/tracks', params, keyArgs] as const
}

export function useGetPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdTracksKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['tracks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdTracksKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutPlaylistsPlaylistIdTracksKey() {
  return ['playlists', '/playlists/{playlist_id}/tracks', 'PUT'] as const
}

export function usePutPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdTracksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['tracks']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).tracks.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPlaylistsPlaylistIdTracksKey() {
  return ['playlists', '/playlists/{playlist_id}/tracks', 'POST'] as const
}

export function usePostPlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPlaylistsPlaylistIdTracksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['tracks']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).tracks.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeletePlaylistsPlaylistIdTracksKey() {
  return ['playlists', '/playlists/{playlist_id}/tracks', 'DELETE'] as const
}

export function useDeletePlaylistsPlaylistIdTracks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePlaylistsPlaylistIdTracksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['tracks']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['tracks']['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).tracks.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetPlaylistsPlaylistIdItemsKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/items', params, keyArgs] as const
}

export function useGetPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutPlaylistsPlaylistIdItemsKey() {
  return ['playlists', '/playlists/{playlist_id}/items', 'PUT'] as const
}

export function usePutPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['items']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['items']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdItemsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['items']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['items']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['items']['put']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['items']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).items.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPlaylistsPlaylistIdItemsKey() {
  return ['playlists', '/playlists/{playlist_id}/items', 'POST'] as const
}

export function usePostPlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['items']['post']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['items']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPlaylistsPlaylistIdItemsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['items']['post']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['items']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['items']['post']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['items']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).items.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeletePlaylistsPlaylistIdItemsKey() {
  return ['playlists', '/playlists/{playlist_id}/items', 'DELETE'] as const
}

export function useDeletePlaylistsPlaylistIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePlaylistsPlaylistIdItemsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['items']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['items']['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).items.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMePlaylistsKey(options?: Parameters<typeof client.me.playlists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/playlists', keyArgs] as const
}

export function useGetMePlaylists<
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.playlists.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlaylistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.playlists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMePlaylists<
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.playlists.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlaylistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.playlists.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.playlists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostMePlaylistsKey() {
  return ['me', '/me/playlists', 'POST'] as const
}

export function usePostMePlaylists<
  TError = Exclude<Awaited<ReturnType<typeof client.me.playlists.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.playlists.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.playlists.post>[0]
      options?: Parameters<typeof client.me.playlists.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMePlaylistsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.playlists.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.playlists.post>[0]
        options?: Parameters<typeof client.me.playlists.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.playlists.post>[0]
            options?: Parameters<typeof client.me.playlists.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.playlists.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutMeLibraryKey() {
  return ['me', '/me/library', 'PUT'] as const
}

export function usePutMeLibrary<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.library.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.library.put>[0]
      options: Parameters<typeof client.me.library.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeLibraryKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.library.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.library.put>[0]
        options: Parameters<typeof client.me.library.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.library.put>[0]
            options: Parameters<typeof client.me.library.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.library.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteMeLibraryKey() {
  return ['me', '/me/library', 'DELETE'] as const
}

export function useDeleteMeLibrary<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.delete>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.library.delete>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.library.delete>[0]
      options: Parameters<typeof client.me.library.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeLibraryKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.library.delete>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.library.delete>[0]
        options: Parameters<typeof client.me.library.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.library.delete>[0]
            options: Parameters<typeof client.me.library.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.library.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMeLibraryContainsKey(
  options: Parameters<typeof client.me.library.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/library/contains', keyArgs] as const
}

export function useGetMeLibraryContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.library.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.library.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeLibraryContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.library.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.library.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeLibraryContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.library.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.library.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.library.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeLibraryContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.library.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.library.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeAlbumsKey(options?: Parameters<typeof client.me.albums.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/albums', keyArgs] as const
}

export function useGetMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.albums.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAlbumsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.albums.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.albums.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAlbumsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.albums.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.albums.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMeAlbumsKey() {
  return ['me', '/me/albums', 'PUT'] as const
}

export function usePutMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.albums.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.albums.put>[0]
      options: Parameters<typeof client.me.albums.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeAlbumsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.albums.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.albums.put>[0]
        options: Parameters<typeof client.me.albums.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.albums.put>[0]
            options: Parameters<typeof client.me.albums.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.albums.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteMeAlbumsKey() {
  return ['me', '/me/albums', 'DELETE'] as const
}

export function useDeleteMeAlbums<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.delete>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.albums.delete>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.albums.delete>[0]
      options: Parameters<typeof client.me.albums.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeAlbumsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.albums.delete>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.albums.delete>[0]
        options: Parameters<typeof client.me.albums.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.albums.delete>[0]
            options: Parameters<typeof client.me.albums.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.albums.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMeAlbumsContainsKey(
  options: Parameters<typeof client.me.albums.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/albums/contains', keyArgs] as const
}

export function useGetMeAlbumsContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.albums.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAlbumsContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.albums.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeAlbumsContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.albums.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.albums.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeAlbumsContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.albums.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.albums.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeTracksKey(options?: Parameters<typeof client.me.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/tracks', keyArgs] as const
}

export function useGetMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.tracks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTracksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.tracks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTracksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.tracks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMeTracksKey() {
  return ['me', '/me/tracks', 'PUT'] as const
}

export function usePutMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.tracks.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.tracks.put>[0]
      options?: Parameters<typeof client.me.tracks.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeTracksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.tracks.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.tracks.put>[0]
        options?: Parameters<typeof client.me.tracks.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.tracks.put>[0]
            options?: Parameters<typeof client.me.tracks.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.tracks.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteMeTracksKey() {
  return ['me', '/me/tracks', 'DELETE'] as const
}

export function useDeleteMeTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.delete>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.tracks.delete>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.tracks.delete>[0]
      options: Parameters<typeof client.me.tracks.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeTracksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.tracks.delete>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.tracks.delete>[0]
        options: Parameters<typeof client.me.tracks.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.tracks.delete>[0]
            options: Parameters<typeof client.me.tracks.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.tracks.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMeTracksContainsKey(
  options: Parameters<typeof client.me.tracks.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/tracks/contains', keyArgs] as const
}

export function useGetMeTracksContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.tracks.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTracksContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.tracks.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeTracksContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.tracks.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.tracks.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTracksContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.tracks.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.tracks.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeEpisodesKey(options?: Parameters<typeof client.me.episodes.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/episodes', keyArgs] as const
}

export function useGetMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.episodes.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeEpisodesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.episodes.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.episodes.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeEpisodesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.episodes.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.episodes.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMeEpisodesKey() {
  return ['me', '/me/episodes', 'PUT'] as const
}

export function usePutMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.episodes.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.episodes.put>[0]
      options: Parameters<typeof client.me.episodes.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeEpisodesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.episodes.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.episodes.put>[0]
        options: Parameters<typeof client.me.episodes.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.episodes.put>[0]
            options: Parameters<typeof client.me.episodes.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.episodes.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteMeEpisodesKey() {
  return ['me', '/me/episodes', 'DELETE'] as const
}

export function useDeleteMeEpisodes<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.delete>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.episodes.delete>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.episodes.delete>[0]
      options: Parameters<typeof client.me.episodes.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeEpisodesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.episodes.delete>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.episodes.delete>[0]
        options: Parameters<typeof client.me.episodes.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.episodes.delete>[0]
            options: Parameters<typeof client.me.episodes.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.episodes.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMeEpisodesContainsKey(
  options: Parameters<typeof client.me.episodes.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/episodes/contains', keyArgs] as const
}

export function useGetMeEpisodesContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.episodes.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.episodes.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeEpisodesContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.episodes.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.episodes.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeEpisodesContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.episodes.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.episodes.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.episodes.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeEpisodesContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.episodes.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.episodes.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeShowsKey(options?: Parameters<typeof client.me.shows.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/shows', keyArgs] as const
}

export function useGetMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.shows.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeShowsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.shows.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.shows.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeShowsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.shows.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.shows.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMeShowsKey() {
  return ['me', '/me/shows', 'PUT'] as const
}

export function usePutMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.shows.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.shows.put>[0]
      options: Parameters<typeof client.me.shows.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeShowsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.shows.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.shows.put>[0]
        options: Parameters<typeof client.me.shows.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.shows.put>[0]
            options: Parameters<typeof client.me.shows.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.shows.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteMeShowsKey() {
  return ['me', '/me/shows', 'DELETE'] as const
}

export function useDeleteMeShows<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.delete>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.shows.delete>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.shows.delete>[0]
      options: Parameters<typeof client.me.shows.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeShowsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.shows.delete>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.shows.delete>[0]
        options: Parameters<typeof client.me.shows.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.shows.delete>[0]
            options: Parameters<typeof client.me.shows.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.shows.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMeShowsContainsKey(
  options: Parameters<typeof client.me.shows.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/shows/contains', keyArgs] as const
}

export function useGetMeShowsContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.shows.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeShowsContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.shows.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeShowsContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.shows.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.shows.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeShowsContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.shows.contains.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.shows.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUsersUserIdKey(params: Parameters<typeof client.users>[0]) {
  return ['users', '/users/{user_id}', params] as const
}

export function useGetUsersUserId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.users>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersUserIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersUserId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.users>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersUserIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUsersUserIdPlaylistsKey(
  params: Parameters<typeof client.users>[0],
  options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['users', '/users/{user_id}/playlists', params, keyArgs] as const
}

export function useGetUsersUserIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersUserIdPlaylistsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users(params).playlists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersUserIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.users>['playlists']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersUserIdPlaylistsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users(params).playlists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostUsersUserIdPlaylistsKey() {
  return ['users', '/users/{user_id}/playlists', 'POST'] as const
}

export function usePostUsersUserIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.users>['playlists']['post']>[0]
        options?: Parameters<ReturnType<typeof client.users>['playlists']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersUserIdPlaylistsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.users>['playlists']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.users>['playlists']['post']>[0]
        options?: Parameters<ReturnType<typeof client.users>['playlists']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.users>['playlists']['post']>[0]
            options?: Parameters<ReturnType<typeof client.users>['playlists']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.users(params).playlists.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutPlaylistsPlaylistIdFollowersKey() {
  return ['playlists', '/playlists/{playlist_id}/followers', 'PUT'] as const
}

export function usePutPlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdFollowersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['followers']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).followers.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeletePlaylistsPlaylistIdFollowersKey() {
  return ['playlists', '/playlists/{playlist_id}/followers', 'DELETE'] as const
}

export function useDeletePlaylistsPlaylistIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePlaylistsPlaylistIdFollowersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['followers']['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .playlists(params)
          .followers.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetBrowseFeaturedPlaylistsKey(
  options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/featured-playlists', keyArgs] as const
}

export function useGetBrowseFeaturedPlaylists<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseFeaturedPlaylistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse['featured-playlists'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetBrowseFeaturedPlaylists<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.browse)['featured-playlists']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseFeaturedPlaylistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.browse)['featured-playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse['featured-playlists'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetBrowseCategoriesKey(
  options?: Parameters<typeof client.browse.categories.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories', keyArgs] as const
}

export function useGetBrowseCategories<
  TError = Exclude<Awaited<ReturnType<typeof client.browse.categories.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.browse.categories.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseCategoriesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse.categories.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetBrowseCategories<
  TError = Exclude<Awaited<ReturnType<typeof client.browse.categories.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.browse.categories.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseCategoriesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.browse.categories.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse.categories.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetBrowseCategoriesCategoryIdKey(
  params: Parameters<typeof client.browse.categories>[0],
  options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories/{category_id}', params, keyArgs] as const
}

export function useGetBrowseCategoriesCategoryId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.browse.categories>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseCategoriesCategoryIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse.categories(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetBrowseCategoriesCategoryId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.browse.categories>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.browse.categories>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseCategoriesCategoryIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse.categories(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetBrowseCategoriesCategoryIdPlaylistsKey(
  params: Parameters<typeof client.browse.categories>[0],
  options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/categories/{category_id}/playlists', params, keyArgs] as const
}

export function useGetBrowseCategoriesCategoryIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.browse.categories>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseCategoriesCategoryIdPlaylistsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse.categories(params).playlists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetBrowseCategoriesCategoryIdPlaylists<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.browse.categories>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.browse.categories>['playlists']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseCategoriesCategoryIdPlaylistsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.browse.categories>['playlists']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse.categories(params).playlists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetPlaylistsPlaylistIdImagesKey(params: Parameters<typeof client.playlists>[0]) {
  return ['playlists', '/playlists/{playlist_id}/images', params] as const
}

export function useGetPlaylistsPlaylistIdImages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['images']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdImagesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).images.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPlaylistsPlaylistIdImages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['images']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdImagesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).images.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutPlaylistsPlaylistIdImagesKey() {
  return ['playlists', '/playlists/{playlist_id}/images', 'PUT'] as const
}

export function usePutPlaylistsPlaylistIdImages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['images']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['images']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdImagesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['images']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.playlists>['images']['put']>[0]
        options?: Parameters<ReturnType<typeof client.playlists>['images']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.playlists>['images']['put']>[0]
            options?: Parameters<ReturnType<typeof client.playlists>['images']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.playlists(params).images.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetBrowseNewReleasesKey(
  options?: Parameters<(typeof client.browse)['new-releases']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['browse', '/browse/new-releases', keyArgs] as const
}

export function useGetBrowseNewReleases<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.browse)['new-releases']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseNewReleasesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse['new-releases'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetBrowseNewReleases<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.browse)['new-releases']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBrowseNewReleasesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.browse)['new-releases']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.browse['new-releases'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeFollowingKey(options: Parameters<typeof client.me.following.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/following', keyArgs] as const
}

export function useGetMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.following.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeFollowingKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.following.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.following.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeFollowingKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.following.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.following.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMeFollowingKey() {
  return ['me', '/me/following', 'PUT'] as const
}

export function usePutMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.following.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.following.put>[0]
      options: Parameters<typeof client.me.following.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeFollowingKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.following.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.following.put>[0]
        options: Parameters<typeof client.me.following.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.following.put>[0]
            options: Parameters<typeof client.me.following.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.following.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteMeFollowingKey() {
  return ['me', '/me/following', 'DELETE'] as const
}

export function useDeleteMeFollowing<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.delete>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.following.delete>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.following.delete>[0]
      options: Parameters<typeof client.me.following.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeFollowingKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.following.delete>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.following.delete>[0]
        options: Parameters<typeof client.me.following.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.following.delete>[0]
            options: Parameters<typeof client.me.following.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.following.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMeFollowingContainsKey(
  options: Parameters<typeof client.me.following.contains.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/following/contains', keyArgs] as const
}

export function useGetMeFollowingContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.following.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.following.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeFollowingContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.me.following.contains.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.following.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeFollowingContains<
  TError = Exclude<Awaited<ReturnType<typeof client.me.following.contains.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.following.contains.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.me.following.contains.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeFollowingContainsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.me.following.contains.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.following.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetPlaylistsPlaylistIdFollowersContainsKey(
  params: Parameters<typeof client.playlists>[0],
  options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['playlists', '/playlists/{playlist_id}/followers/contains', params, keyArgs] as const
}

export function useGetPlaylistsPlaylistIdFollowersContains<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdFollowersContainsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).followers.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPlaylistsPlaylistIdFollowersContains<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.playlists>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.playlists>['followers']['contains']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPlaylistsPlaylistIdFollowersContainsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.playlists>['followers']['contains']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.playlists(params).followers.contains.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAudioFeaturesKey(
  options: Parameters<(typeof client)['audio-features']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audio-features', '/audio-features', keyArgs] as const
}

export function useGetAudioFeatures<
  TError = Exclude<Awaited<ReturnType<(typeof client)['audio-features']['get']>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client)['audio-features']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<(typeof client)['audio-features']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioFeaturesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['audio-features'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudioFeatures<
  TError = Exclude<Awaited<ReturnType<(typeof client)['audio-features']['get']>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client)['audio-features']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<(typeof client)['audio-features']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioFeaturesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client)['audio-features']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['audio-features'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAudioFeaturesIdKey(params: Parameters<(typeof client)['audio-features']>[0]) {
  return ['audio-features', '/audio-features/{id}', params] as const
}

export function useGetAudioFeaturesId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['audio-features']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['audio-features']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioFeaturesIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['audio-features'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudioFeaturesId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['audio-features']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['audio-features']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioFeaturesIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-features']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['audio-features'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAudioAnalysisIdKey(params: Parameters<(typeof client)['audio-analysis']>[0]) {
  return ['audio-analysis', '/audio-analysis/{id}', params] as const
}

export function useGetAudioAnalysisId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['audio-analysis']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['audio-analysis']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioAnalysisIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['audio-analysis'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudioAnalysisId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['audio-analysis']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['audio-analysis']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioAnalysisIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['audio-analysis']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['audio-analysis'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetRecommendationsKey(
  options?: Parameters<typeof client.recommendations.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['recommendations', '/recommendations', keyArgs] as const
}

export function useGetRecommendations<
  TError = Exclude<Awaited<ReturnType<typeof client.recommendations.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.recommendations.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetRecommendationsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.recommendations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetRecommendations<
  TError = Exclude<Awaited<ReturnType<typeof client.recommendations.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.recommendations.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetRecommendationsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.recommendations.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.recommendations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetRecommendationsAvailableGenreSeedsKey() {
  return ['recommendations', '/recommendations/available-genre-seeds'] as const
}

export function useGetRecommendationsAvailableGenreSeeds<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.recommendations)['available-genre-seeds']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetRecommendationsAvailableGenreSeedsKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.recommendations['available-genre-seeds'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetRecommendationsAvailableGenreSeeds<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.recommendations)['available-genre-seeds']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetRecommendationsAvailableGenreSeedsKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.recommendations['available-genre-seeds'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMePlayerKey(options?: Parameters<typeof client.me.player.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player', keyArgs] as const
}

export function useGetMePlayer<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.player.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlayerKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMePlayer<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.player.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlayerKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.player.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMePlayerKey() {
  return ['me', '/me/player', 'PUT'] as const
}

export function usePutMePlayer<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.player.put>[0]
      options?: Parameters<typeof client.me.player.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.player.put>[0]
        options?: Parameters<typeof client.me.player.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.player.put>[0]
            options?: Parameters<typeof client.me.player.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMePlayerDevicesKey() {
  return ['me', '/me/player/devices'] as const
}

export function useGetMePlayerDevices<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.devices.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.player.devices.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetMePlayerDevicesKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player.devices.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMePlayerDevices<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.devices.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.player.devices.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetMePlayerDevicesKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.player.devices.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player.devices.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMePlayerCurrentlyPlayingKey(
  options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player/currently-playing', keyArgs] as const
}

export function useGetMePlayerCurrentlyPlaying<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlayerCurrentlyPlayingKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player['currently-playing'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMePlayerCurrentlyPlaying<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.me.player)['currently-playing']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlayerCurrentlyPlayingKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.me.player)['currently-playing']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player['currently-playing'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutMePlayerPlayKey() {
  return ['me', '/me/player/play', 'PUT'] as const
}

export function usePutMePlayerPlay<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.play.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.play.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.me.player.play.put>[0]
      options?: Parameters<typeof client.me.player.play.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerPlayKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.play.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.me.player.play.put>[0]
        options?: Parameters<typeof client.me.player.play.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.me.player.play.put>[0]
            options?: Parameters<typeof client.me.player.play.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.play.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutMePlayerPauseKey() {
  return ['me', '/me/player/pause', 'PUT'] as const
}

export function usePutMePlayerPause<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.pause.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.pause.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.pause.put>[0]
      options?: Parameters<typeof client.me.player.pause.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerPauseKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.pause.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.pause.put>[0]
        options?: Parameters<typeof client.me.player.pause.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.pause.put>[0]
            options?: Parameters<typeof client.me.player.pause.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.pause.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostMePlayerNextKey() {
  return ['me', '/me/player/next', 'POST'] as const
}

export function usePostMePlayerNext<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.next.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.next.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.next.post>[0]
      options?: Parameters<typeof client.me.player.next.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMePlayerNextKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.next.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.next.post>[0]
        options?: Parameters<typeof client.me.player.next.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.next.post>[0]
            options?: Parameters<typeof client.me.player.next.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.next.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostMePlayerPreviousKey() {
  return ['me', '/me/player/previous', 'POST'] as const
}

export function usePostMePlayerPrevious<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.previous.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.previous.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.previous.post>[0]
      options?: Parameters<typeof client.me.player.previous.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMePlayerPreviousKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.previous.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.previous.post>[0]
        options?: Parameters<typeof client.me.player.previous.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.previous.post>[0]
            options?: Parameters<typeof client.me.player.previous.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.previous.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutMePlayerSeekKey() {
  return ['me', '/me/player/seek', 'PUT'] as const
}

export function usePutMePlayerSeek<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.seek.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.seek.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.seek.put>[0]
      options: Parameters<typeof client.me.player.seek.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerSeekKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.seek.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.seek.put>[0]
        options: Parameters<typeof client.me.player.seek.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.seek.put>[0]
            options: Parameters<typeof client.me.player.seek.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.seek.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutMePlayerRepeatKey() {
  return ['me', '/me/player/repeat', 'PUT'] as const
}

export function usePutMePlayerRepeat<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.repeat.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.repeat.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.repeat.put>[0]
      options: Parameters<typeof client.me.player.repeat.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerRepeatKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.repeat.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.repeat.put>[0]
        options: Parameters<typeof client.me.player.repeat.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.repeat.put>[0]
            options: Parameters<typeof client.me.player.repeat.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.repeat.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutMePlayerVolumeKey() {
  return ['me', '/me/player/volume', 'PUT'] as const
}

export function usePutMePlayerVolume<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.volume.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.volume.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.volume.put>[0]
      options: Parameters<typeof client.me.player.volume.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerVolumeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.volume.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.volume.put>[0]
        options: Parameters<typeof client.me.player.volume.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.volume.put>[0]
            options: Parameters<typeof client.me.player.volume.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.volume.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutMePlayerShuffleKey() {
  return ['me', '/me/player/shuffle', 'PUT'] as const
}

export function usePutMePlayerShuffle<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.shuffle.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.shuffle.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.shuffle.put>[0]
      options: Parameters<typeof client.me.player.shuffle.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerShuffleKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.shuffle.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.shuffle.put>[0]
        options: Parameters<typeof client.me.player.shuffle.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.shuffle.put>[0]
            options: Parameters<typeof client.me.player.shuffle.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.shuffle.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMePlayerRecentlyPlayedKey(
  options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/player/recently-played', keyArgs] as const
}

export function useGetMePlayerRecentlyPlayed<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlayerRecentlyPlayedKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player['recently-played'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMePlayerRecentlyPlayed<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.me.player)['recently-played']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMePlayerRecentlyPlayedKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.me.player)['recently-played']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player['recently-played'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMePlayerQueueKey() {
  return ['me', '/me/player/queue'] as const
}

export function useGetMePlayerQueue<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.player.queue.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetMePlayerQueueKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player.queue.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMePlayerQueue<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.player.queue.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetMePlayerQueueKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.player.queue.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.player.queue.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostMePlayerQueueKey() {
  return ['me', '/me/player/queue', 'POST'] as const
}

export function usePostMePlayerQueue<
  TError = Exclude<Awaited<ReturnType<typeof client.me.player.queue.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.player.queue.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.me.player.queue.post>[0]
      options: Parameters<typeof client.me.player.queue.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMePlayerQueueKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.me.player.queue.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.me.player.queue.post>[0]
        options: Parameters<typeof client.me.player.queue.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.me.player.queue.post>[0]
            options: Parameters<typeof client.me.player.queue.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.me.player.queue.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetMarketsKey() {
  return ['markets', '/markets'] as const
}

export function useGetMarkets<
  TError = Exclude<Awaited<ReturnType<typeof client.markets.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.markets.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetMarketsKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.markets.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMarkets<
  TError = Exclude<Awaited<ReturnType<typeof client.markets.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.markets.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetMarketsKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.markets.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.markets.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeTopArtistsKey(options?: Parameters<typeof client.me.top.artists.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/top/artists', keyArgs] as const
}

export function useGetMeTopArtists<
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.artists.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.top.artists.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTopArtistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.top.artists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeTopArtists<
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.artists.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.top.artists.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTopArtistsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.top.artists.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.top.artists.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetMeTopTracksKey(options?: Parameters<typeof client.me.top.tracks.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['me', '/me/top/tracks', keyArgs] as const
}

export function useGetMeTopTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.tracks.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.top.tracks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTopTracksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.top.tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMeTopTracks<
  TError = Exclude<Awaited<ReturnType<typeof client.me.top.tracks.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.me.top.tracks.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetMeTopTracksKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.me.top.tracks.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.me.top.tracks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}
