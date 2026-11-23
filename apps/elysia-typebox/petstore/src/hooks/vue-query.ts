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

export function getPetKey() {
  return ['pet'] as const
}

export function getStoreKey() {
  return ['store'] as const
}

export function getUserKey() {
  return ['user'] as const
}

export function getPutPetMutationKey() {
  return ['pet', '/pet', 'PUT'] as const
}

export function getPutPetMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.pet.put>>, { error: null }>['data'],
    TError,
    { body: Parameters<typeof client.pet.put>[0]; options?: Parameters<typeof client.pet.put>[1] },
    TOnMutateResult
  >({
    mutationKey: getPutPetMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.pet.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutPet<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.pet.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.pet.put>[0]
            options?: Parameters<typeof client.pet.put>[1]
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
  const mutationDefaults = getPutPetMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostPetMutationKey() {
  return ['pet', '/pet', 'POST'] as const
}

export function getPostPetMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.pet.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.pet.post>[0]
      options?: Parameters<typeof client.pet.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPetMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.pet.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostPet<
  TError = Exclude<Awaited<ReturnType<typeof client.pet.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.pet.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.pet.post>[0]
            options?: Parameters<typeof client.pet.post>[1]
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
  const mutationDefaults = getPostPetMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPetFindByStatusQueryKey(
  options: Parameters<typeof client.pet.findByStatus.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['pet', '/pet/findByStatus', keyArgs] as const
}

export function getPetFindByStatusQueryOptions(
  options: Parameters<typeof client.pet.findByStatus.get>[0],
) {
  return {
    queryKey: getPetFindByStatusQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.pet.findByStatus.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function usePetFindByStatus<
  TData = Extract<Awaited<ReturnType<typeof client.pet.findByStatus.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.pet.findByStatus.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.pet.findByStatus.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.pet.findByStatus.get>>, { error: null }>['data'],
          ReturnType<typeof getPetFindByStatusQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.pet.findByStatus.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getPetFindByStatusQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.pet.findByStatus.get({
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

export function getPetFindByTagsQueryKey(options: Parameters<typeof client.pet.findByTags.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['pet', '/pet/findByTags', keyArgs] as const
}

export function getPetFindByTagsQueryOptions(
  options: Parameters<typeof client.pet.findByTags.get>[0],
) {
  return {
    queryKey: getPetFindByTagsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.pet.findByTags.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function usePetFindByTags<
  TData = Extract<Awaited<ReturnType<typeof client.pet.findByTags.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.pet.findByTags.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.pet.findByTags.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.pet.findByTags.get>>, { error: null }>['data'],
          ReturnType<typeof getPetFindByTagsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.pet.findByTags.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getPetFindByTagsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.pet.findByTags.get({
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

export function getPetPetIdQueryKey(params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>) {
  return ['pet', '/pet/{petId}', toValue(params)] as const
}

export function getPetPetIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>,
  options?: Parameters<ReturnType<typeof client.pet>['get']>[0],
) {
  return {
    queryKey: computed(() => getPetPetIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .pet(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function usePetPetId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.pet>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getPetPetIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.pet>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getPetPetIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .pet(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostPetPetIdMutationKey() {
  return ['pet', '/pet/{petId}', 'POST'] as const
}

export function getPostPetPetIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['post']>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.pet>['post']>[0]
      options?: Parameters<ReturnType<typeof client.pet>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPetPetIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.pet(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostPetPetId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.pet>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.pet>['post']>[0]
            options?: Parameters<ReturnType<typeof client.pet>['post']>[1]
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
  const mutationDefaults = getPostPetPetIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeletePetPetIdMutationKey() {
  return ['pet', '/pet/{petId}', 'DELETE'] as const
}

export function getDeletePetPetIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.pet>['delete']>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.pet>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.pet>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeletePetPetIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.pet(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeletePetPetId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.pet>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.pet>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.pet>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.pet>['delete']>[1]
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
  const mutationDefaults = getDeletePetPetIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostPetPetIdUploadImageMutationKey() {
  return ['pet', '/pet/{petId}/uploadImage', 'POST'] as const
}

export function getPostPetPetIdUploadImageMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.pet>['uploadImage']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.pet>['uploadImage']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[0]
      options?: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPetPetIdUploadImageMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.pet(toValue(params)).uploadImage.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostPetPetIdUploadImage<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.pet>['uploadImage']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.pet>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.pet>['uploadImage']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[0]
            options?: Parameters<ReturnType<typeof client.pet>['uploadImage']['post']>[1]
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
  const mutationDefaults = getPostPetPetIdUploadImageMutationOptions<TError, TOnMutateResult>(
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

export function getStoreInventoryQueryKey() {
  return ['store', '/store/inventory'] as const
}

export function getStoreInventoryQueryOptions(
  options?: Parameters<typeof client.store.inventory.get>[0],
) {
  return {
    queryKey: getStoreInventoryQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.store.inventory.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useStoreInventory<
  TData = Extract<Awaited<ReturnType<typeof client.store.inventory.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.store.inventory.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.store.inventory.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.store.inventory.get>>, { error: null }>['data'],
          ReturnType<typeof getStoreInventoryQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.store.inventory.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getStoreInventoryQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.store.inventory.get({
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

export function getPostStoreOrderMutationKey() {
  return ['store', '/store/order', 'POST'] as const
}

export function getPostStoreOrderMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.store.order.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.store.order.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.store.order.post>[0]
      options?: Parameters<typeof client.store.order.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostStoreOrderMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.store.order.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostStoreOrder<
  TError = Exclude<Awaited<ReturnType<typeof client.store.order.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.store.order.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.store.order.post>[0]
            options?: Parameters<typeof client.store.order.post>[1]
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
  const mutationDefaults = getPostStoreOrderMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getStoreOrderOrderIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.store.order>[0]>,
) {
  return ['store', '/store/order/{orderId}', toValue(params)] as const
}

export function getStoreOrderOrderIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.store.order>[0]>,
  options?: Parameters<ReturnType<typeof client.store.order>['get']>[0],
) {
  return {
    queryKey: computed(() => getStoreOrderOrderIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.store
        .order(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useStoreOrderOrderId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.store.order>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.store.order>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getStoreOrderOrderIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.store.order>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getStoreOrderOrderIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.store
          .order(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteStoreOrderOrderIdMutationKey() {
  return ['store', '/store/order/{orderId}', 'DELETE'] as const
}

export function getDeleteStoreOrderOrderIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.store.order>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.store.order>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.store.order>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.store.order>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.store.order>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteStoreOrderOrderIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.store.order(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteStoreOrderOrderId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.store.order>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.store.order>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.store.order>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.store.order>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.store.order>['delete']>[1]
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
  const mutationDefaults = getDeleteStoreOrderOrderIdMutationOptions<TError, TOnMutateResult>(
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

export function getPostUserMutationKey() {
  return ['user', '/user', 'POST'] as const
}

export function getPostUserMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.user.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.user.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.user.post>[0]
      options?: Parameters<typeof client.user.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUserMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.user.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUser<
  TError = Exclude<Awaited<ReturnType<typeof client.user.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.user.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.user.post>[0]
            options?: Parameters<typeof client.user.post>[1]
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
  const mutationDefaults = getPostUserMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostUserCreateWithListMutationKey() {
  return ['user', '/user/createWithList', 'POST'] as const
}

export function getPostUserCreateWithListMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.user.createWithList.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.user.createWithList.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.user.createWithList.post>[0]
      options?: Parameters<typeof client.user.createWithList.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUserCreateWithListMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.user.createWithList.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUserCreateWithList<
  TError = Exclude<Awaited<ReturnType<typeof client.user.createWithList.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.user.createWithList.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.user.createWithList.post>[0]
            options?: Parameters<typeof client.user.createWithList.post>[1]
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
  const mutationDefaults = getPostUserCreateWithListMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getUserLoginQueryKey(options?: Parameters<typeof client.user.login.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['user', '/user/login', keyArgs] as const
}

export function getUserLoginQueryOptions(options?: Parameters<typeof client.user.login.get>[0]) {
  return {
    queryKey: getUserLoginQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.user.login.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useUserLogin<
  TData = Extract<Awaited<ReturnType<typeof client.user.login.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.user.login.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.user.login.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.user.login.get>>, { error: null }>['data'],
          ReturnType<typeof getUserLoginQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.user.login.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getUserLoginQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.user.login.get({
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

export function getUserLogoutQueryKey() {
  return ['user', '/user/logout'] as const
}

export function getUserLogoutQueryOptions(options?: Parameters<typeof client.user.logout.get>[0]) {
  return {
    queryKey: getUserLogoutQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.user.logout.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useUserLogout<
  TData = Extract<Awaited<ReturnType<typeof client.user.logout.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.user.logout.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.user.logout.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.user.logout.get>>, { error: null }>['data'],
          ReturnType<typeof getUserLogoutQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.user.logout.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getUserLogoutQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.user.logout.get({
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

export function getUserUsernameQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.user>[0]>,
) {
  return ['user', '/user/{username}', toValue(params)] as const
}

export function getUserUsernameQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.user>[0]>,
  options?: Parameters<ReturnType<typeof client.user>['get']>[0],
) {
  return {
    queryKey: computed(() => getUserUsernameQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .user(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useUserUsername<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.user>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.user>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.user>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.user>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getUserUsernameQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.user>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUserUsernameQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .user(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutUserUsernameMutationKey() {
  return ['user', '/user/{username}', 'PUT'] as const
}

export function getPutUserUsernameMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['put']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.user>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.user>['put']>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.user>['put']>[0]
      options?: Parameters<ReturnType<typeof client.user>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutUserUsernameMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.user(toValue(params)).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutUserUsername<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['put']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.user>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.user>['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.user>['put']>[0]
            options?: Parameters<ReturnType<typeof client.user>['put']>[1]
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
  const mutationDefaults = getPutUserUsernameMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteUserUsernameMutationKey() {
  return ['user', '/user/{username}', 'DELETE'] as const
}

export function getDeleteUserUsernameMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.user>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.user>['delete']>>, { error: null }>['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.user>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.user>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteUserUsernameMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.user(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteUserUsername<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.user>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.user>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.user>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.user>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.user>['delete']>[1]
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
  const mutationDefaults = getDeleteUserUsernameMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
