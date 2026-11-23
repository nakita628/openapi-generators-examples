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

export function getBookingsKey() {
  return ['bookings'] as const
}

export function getStationsKey() {
  return ['stations'] as const
}

export function getTripsKey() {
  return ['trips'] as const
}

export function getStationsQueryKey() {
  return ['stations', '/stations'] as const
}

export function getStationsQueryOptions(options?: Parameters<typeof client.stations.get>[0]) {
  return {
    queryKey: getStationsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.stations.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useStations<
  TData = Extract<Awaited<ReturnType<typeof client.stations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.stations.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.stations.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.stations.get>>, { error: null }>['data'],
          ReturnType<typeof getStationsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.stations.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getStationsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.stations.get({
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

export function getTripsQueryKey(options: Parameters<typeof client.trips.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['trips', '/trips', keyArgs] as const
}

export function getTripsQueryOptions(options: Parameters<typeof client.trips.get>[0]) {
  return {
    queryKey: getTripsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.trips.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useTrips<
  TData = Extract<Awaited<ReturnType<typeof client.trips.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.trips.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.trips.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.trips.get>>, { error: null }>['data'],
          ReturnType<typeof getTripsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.trips.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getTripsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.trips.get({
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

export function getBookingsQueryKey() {
  return ['bookings', '/bookings'] as const
}

export function getBookingsQueryOptions(options?: Parameters<typeof client.bookings.get>[0]) {
  return {
    queryKey: getBookingsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.bookings.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useBookings<
  TData = Extract<Awaited<ReturnType<typeof client.bookings.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.bookings.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.bookings.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.bookings.get>>, { error: null }>['data'],
          ReturnType<typeof getBookingsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.bookings.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getBookingsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.bookings.get({
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

export function getPostBookingsMutationKey() {
  return ['bookings', '/bookings', 'POST'] as const
}

export function getPostBookingsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.bookings.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.bookings.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.bookings.post>[0]
      options?: Parameters<typeof client.bookings.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostBookingsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.bookings.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostBookings<
  TError = Exclude<Awaited<ReturnType<typeof client.bookings.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.bookings.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.bookings.post>[0]
            options?: Parameters<typeof client.bookings.post>[1]
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
  const mutationDefaults = getPostBookingsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getBookingsBookingIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.bookings>[0]>,
) {
  return ['bookings', '/bookings/{bookingId}', toValue(params)] as const
}

export function getBookingsBookingIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.bookings>[0]>,
  options?: Parameters<ReturnType<typeof client.bookings>['get']>[0],
) {
  return {
    queryKey: computed(() => getBookingsBookingIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .bookings(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useBookingsBookingId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.bookings>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getBookingsBookingIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.bookings>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getBookingsBookingIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .bookings(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteBookingsBookingIdMutationKey() {
  return ['bookings', '/bookings/{bookingId}', 'DELETE'] as const
}

export function getDeleteBookingsBookingIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.bookings>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.bookings>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.bookings>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.bookings>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteBookingsBookingIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.bookings(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteBookingsBookingId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.bookings>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.bookings>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.bookings>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.bookings>['delete']>[1]
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
  const mutationDefaults = getDeleteBookingsBookingIdMutationOptions<TError, TOnMutateResult>(
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

export function getPostBookingsBookingIdPaymentMutationKey() {
  return ['bookings', '/bookings/{bookingId}/payment', 'POST'] as const
}

export function getPostBookingsBookingIdPaymentMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['payment']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.bookings>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.bookings>['payment']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.bookings>['payment']['post']>[0]
      options?: Parameters<ReturnType<typeof client.bookings>['payment']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostBookingsBookingIdPaymentMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.bookings(toValue(params)).payment.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostBookingsBookingIdPayment<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['payment']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.bookings>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.bookings>['payment']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.bookings>['payment']['post']>[0]
            options?: Parameters<ReturnType<typeof client.bookings>['payment']['post']>[1]
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
  const mutationDefaults = getPostBookingsBookingIdPaymentMutationOptions<TError, TOnMutateResult>(
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
