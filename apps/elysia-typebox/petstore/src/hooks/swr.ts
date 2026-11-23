import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import { client } from '../lib'

export function getPetKey() {
  return ['pet'] as const
}

export function getStoreKey() {
  return ['store'] as const
}

export function getUserKey() {
  return ['user'] as const
}

export function getPutPetKey() {
  return ['pet', '/pet', 'PUT'] as const
}

export function usePutPet<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.pet.put>>, { error: null }>['data'],
    TError,
    Key,
    { body: Parameters<typeof client.pet.put>[0]; options?: Parameters<typeof client.pet.put>[1] }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPetKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.pet.put>>, { error: null }>['data'],
      TError,
      Key,
      { body: Parameters<typeof client.pet.put>[0]; options?: Parameters<typeof client.pet.put>[1] }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.pet.put>[0]
            options?: Parameters<typeof client.pet.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.pet.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPetKey() {
  return ['pet', '/pet', 'POST'] as const
}

export function usePostPet<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.pet.post>>, { error: null }>['data'],
    TError,
    Key,
    { body: Parameters<typeof client.pet.post>[0]; options?: Parameters<typeof client.pet.post>[1] }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPetKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.pet.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.pet.post>[0]
        options?: Parameters<typeof client.pet.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.pet.post>[0]
            options?: Parameters<typeof client.pet.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.pet.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetPetFindByStatusKey(
  options: Parameters<typeof client.pet.findByStatus.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['pet', '/pet/findByStatus', keyArgs] as const
}

export function useGetPetFindByStatus<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.findByStatus.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.pet.findByStatus.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.pet.findByStatus.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPetFindByStatusKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.pet.findByStatus.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.pet.findByStatus.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPetFindByStatus<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.findByStatus.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.pet.findByStatus.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.pet.findByStatus.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPetFindByStatusKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.pet.findByStatus.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.pet.findByStatus.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetPetFindByTagsKey(options: Parameters<typeof client.pet.findByTags.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['pet', '/pet/findByTags', keyArgs] as const
}

export function useGetPetFindByTags<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.findByTags.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.pet.findByTags.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.pet.findByTags.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPetFindByTagsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.pet.findByTags.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.pet.findByTags.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPetFindByTags<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.findByTags.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.pet.findByTags.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.pet.findByTags.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetPetFindByTagsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.pet.findByTags.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.pet.findByTags.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetPetPetIdKey(params: Parameters<typeof client.pet>[0]) {
  return ['pet', '/pet/{petId}', params] as const
}

export function useGetPetPetId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.pet>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.pet>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetPetPetIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.pet(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPetPetId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.pet>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.pet>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetPetPetIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.pet(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostPetPetIdKey() {
  return ['pet', '/pet/{petId}', 'POST'] as const
}

export function usePostPetPetId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['post']>>['error'], null>,
>(
  params: Parameters<typeof client.pet>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['post']>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.pet>['post']>[0]
        options?: Parameters<ReturnType<typeof client.pet>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPetPetIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['post']>>, { error: null }>['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.pet>['post']>[0]
        options?: Parameters<ReturnType<typeof client.pet>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.pet>['post']>[0]
            options?: Parameters<ReturnType<typeof client.pet>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.pet(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeletePetPetIdKey() {
  return ['pet', '/pet/{petId}', 'DELETE'] as const
}

export function useDeletePetPetId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.pet>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.pet>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.pet>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.pet>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePetPetIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.pet>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.pet>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.pet>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.pet>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.pet>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.pet(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPetPetIdUploadImageKey() {
  return ['pet', '/pet/{petId}/uploadImage', 'POST'] as const
}

export function usePostPetPetIdUploadImage<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.pet>['uploadImage']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.pet>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.pet>['uploadImage']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[0]
        options?: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPetPetIdUploadImageKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.pet>['uploadImage']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[0]
        options?: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[0]
            options?: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.pet(params).uploadImage.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetStoreInventoryKey() {
  return ['store', '/store/inventory'] as const
}

export function useGetStoreInventory<
  TError = Exclude<Awaited<ReturnType<typeof client.store.inventory.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.store.inventory.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.store.inventory.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetStoreInventoryKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.store.inventory.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.store.inventory.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetStoreInventory<
  TError = Exclude<Awaited<ReturnType<typeof client.store.inventory.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.store.inventory.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.store.inventory.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetStoreInventoryKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.store.inventory.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.store.inventory.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostStoreOrderKey() {
  return ['store', '/store/order', 'POST'] as const
}

export function usePostStoreOrder<
  TError = Exclude<Awaited<ReturnType<typeof client.store.order.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.store.order.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.store.order.post>[0]
      options?: Parameters<typeof client.store.order.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostStoreOrderKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.store.order.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.store.order.post>[0]
        options?: Parameters<typeof client.store.order.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.store.order.post>[0]
            options?: Parameters<typeof client.store.order.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.store.order.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetStoreOrderOrderIdKey(params: Parameters<typeof client.store.order>[0]) {
  return ['store', '/store/order/{orderId}', params] as const
}

export function useGetStoreOrderOrderId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.store.order>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.store.order>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStoreOrderOrderIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.store.order(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetStoreOrderOrderId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.store.order>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.store.order>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStoreOrderOrderIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.store.order(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteStoreOrderOrderIdKey() {
  return ['store', '/store/order/{orderId}', 'DELETE'] as const
}

export function useDeleteStoreOrderOrderId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.store.order>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.store.order>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.store.order>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.store.order>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.store.order>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteStoreOrderOrderIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.store.order>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.store.order>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.store.order>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.store.order>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.store.order>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.store.order(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostUserKey() {
  return ['user', '/user', 'POST'] as const
}

export function usePostUser<
  TError = Exclude<Awaited<ReturnType<typeof client.user.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.user.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.user.post>[0]
      options?: Parameters<typeof client.user.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUserKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.user.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.user.post>[0]
        options?: Parameters<typeof client.user.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.user.post>[0]
            options?: Parameters<typeof client.user.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.user.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostUserCreateWithListKey() {
  return ['user', '/user/createWithList', 'POST'] as const
}

export function usePostUserCreateWithList<
  TError = Exclude<Awaited<ReturnType<typeof client.user.createWithList.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.user.createWithList.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.user.createWithList.post>[0]
      options?: Parameters<typeof client.user.createWithList.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUserCreateWithListKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.user.createWithList.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.user.createWithList.post>[0]
        options?: Parameters<typeof client.user.createWithList.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.user.createWithList.post>[0]
            options?: Parameters<typeof client.user.createWithList.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.user.createWithList.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetUserLoginKey(options?: Parameters<typeof client.user.login.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['user', '/user/login', keyArgs] as const
}

export function useGetUserLogin<
  TError = Exclude<Awaited<ReturnType<typeof client.user.login.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.user.login.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.user.login.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUserLoginKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.user.login.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.user.login.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUserLogin<
  TError = Exclude<Awaited<ReturnType<typeof client.user.login.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.user.login.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.user.login.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUserLoginKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.user.login.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.user.login.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUserLogoutKey() {
  return ['user', '/user/logout'] as const
}

export function useGetUserLogout<
  TError = Exclude<Awaited<ReturnType<typeof client.user.logout.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.user.logout.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.user.logout.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUserLogoutKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.user.logout.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.user.logout.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUserLogout<
  TError = Exclude<Awaited<ReturnType<typeof client.user.logout.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.user.logout.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.user.logout.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUserLogoutKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.user.logout.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.user.logout.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUserUsernameKey(params: Parameters<typeof client.user>[0]) {
  return ['user', '/user/{username}', params] as const
}

export function useGetUserUsername<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.user>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.user>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.user>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUserUsernameKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<ReturnType<typeof client.user>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.user(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUserUsername<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.user>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.user>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.user>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUserUsernameKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<ReturnType<typeof client.user>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.user(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutUserUsernameKey() {
  return ['user', '/user/{username}', 'PUT'] as const
}

export function usePutUserUsername<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['put']>>['error'], null>,
>(
  params: Parameters<typeof client.user>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.user>['put']>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.user>['put']>[0]
        options?: Parameters<ReturnType<typeof client.user>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutUserUsernameKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<ReturnType<typeof client.user>['put']>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.user>['put']>[0]
        options?: Parameters<ReturnType<typeof client.user>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.user>['put']>[0]
            options?: Parameters<ReturnType<typeof client.user>['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.user(params).put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteUserUsernameKey() {
  return ['user', '/user/{username}', 'DELETE'] as const
}

export function useDeleteUserUsername<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.user>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.user>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.user>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.user>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUserUsernameKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.user>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.user>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.user>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.user>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.user>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.user(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}
