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

export function getLiffKey() {
  return ['liff'] as const
}

export function getLiffV1AppsQueryKey() {
  return ['liff', '/liff/v1/apps'] as const
}

export function getLiffV1AppsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.get>>['error'], null>,
>(options?: Parameters<typeof client.liff.v1.apps.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getLiffV1AppsQueryKey>
  >({
    queryKey: getLiffV1AppsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.liff.v1.apps.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function useLiffV1Apps<
  TData = Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getLiffV1AppsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.liff.v1.apps.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getLiffV1AppsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseLiffV1Apps<
  TData = Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getLiffV1AppsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.liff.v1.apps.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getLiffV1AppsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getPostLiffV1AppsMutationKey() {
  return ['liff', '/liff/v1/apps', 'POST'] as const
}

export function getPostLiffV1AppsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.liff.v1.apps.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.liff.v1.apps.post>[0]
      options?: Parameters<typeof client.liff.v1.apps.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLiffV1AppsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.liff.v1.apps.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLiffV1Apps<
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<Awaited<ReturnType<typeof client.liff.v1.apps.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.liff.v1.apps.post>[0]
          options?: Parameters<typeof client.liff.v1.apps.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLiffV1AppsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutLiffV1AppsLiffIdMutationKey() {
  return ['liff', '/liff/v1/apps/{liffId}', 'PUT'] as const
}

export function getPutLiffV1AppsLiffIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.liff.v1.apps>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[0]
      options?: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutLiffV1AppsLiffIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.liff.v1.apps(params).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutLiffV1AppsLiffId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.liff.v1.apps>[0],
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[0]
          options?: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutLiffV1AppsLiffIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteLiffV1AppsLiffIdMutationKey() {
  return ['liff', '/liff/v1/apps/{liffId}', 'DELETE'] as const
}

export function getDeleteLiffV1AppsLiffIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.liff.v1.apps>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteLiffV1AppsLiffIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.liff.v1.apps(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteLiffV1AppsLiffId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.liff.v1.apps>[0],
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteLiffV1AppsLiffIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
