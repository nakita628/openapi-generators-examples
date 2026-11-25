import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import { client } from '../lib'

export function getLiffKey() {
  return ['liff'] as const
}

export function getGetLiffV1AppsKey() {
  return ['liff', '/liff/v1/apps'] as const
}

export function useGetLiffV1Apps<
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.liff.v1.apps.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetLiffV1AppsKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.liff.v1.apps.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetLiffV1Apps<
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.liff.v1.apps.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetLiffV1AppsKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.liff.v1.apps.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.liff.v1.apps.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostLiffV1AppsKey() {
  return ['liff', '/liff/v1/apps', 'POST'] as const
}

export function usePostLiffV1Apps<
  TError = Exclude<Awaited<ReturnType<typeof client.liff.v1.apps.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.liff.v1.apps.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.liff.v1.apps.post>[0]
      options?: Parameters<typeof client.liff.v1.apps.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLiffV1AppsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.liff.v1.apps.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.liff.v1.apps.post>[0]
        options?: Parameters<typeof client.liff.v1.apps.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.liff.v1.apps.post>[0]
            options?: Parameters<typeof client.liff.v1.apps.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.liff.v1.apps.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutLiffV1AppsLiffIdKey() {
  return ['liff', '/liff/v1/apps/{liffId}', 'PUT'] as const
}

export function usePutLiffV1AppsLiffId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.liff.v1.apps>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[0]
        options?: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutLiffV1AppsLiffIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[0]
        options?: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[0]
            options?: Parameters<ReturnType<typeof client.liff.v1.apps>['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.liff.v1.apps(params).put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteLiffV1AppsLiffIdKey() {
  return ['liff', '/liff/v1/apps/{liffId}', 'DELETE'] as const
}

export function useDeleteLiffV1AppsLiffId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.liff.v1.apps>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLiffV1AppsLiffIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.liff.v1.apps>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.liff.v1.apps>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.liff.v1.apps(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}
