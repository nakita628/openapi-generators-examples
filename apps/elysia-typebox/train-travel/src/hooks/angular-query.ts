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

export function getStationsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.stations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.stations.get>>['error'], null>,
>(options?: Parameters<typeof client.stations.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.stations.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getStationsQueryKey>
  >({
    queryKey: getStationsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.stations.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectStations<
  TData = Extract<Awaited<ReturnType<typeof client.stations.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.stations.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.stations.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getStationsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.stations.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getStationsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getTripsQueryKey(options: Parameters<typeof client.trips.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['trips', '/trips', keyArgs] as const
}

export function getTripsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.trips.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.trips.get>>['error'], null>,
>(options: Parameters<typeof client.trips.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.trips.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getTripsQueryKey>
  >({
    queryKey: getTripsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.trips.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectTrips<
  TData = Extract<Awaited<ReturnType<typeof client.trips.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.trips.get>>['error'], null>,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.trips.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getTripsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.trips.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getTripsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getBookingsQueryKey() {
  return ['bookings', '/bookings'] as const
}

export function getBookingsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.bookings.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.bookings.get>>['error'], null>,
>(options?: Parameters<typeof client.bookings.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.bookings.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getBookingsQueryKey>
  >({
    queryKey: getBookingsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.bookings.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectBookings<
  TData = Extract<Awaited<ReturnType<typeof client.bookings.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.bookings.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.bookings.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getBookingsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.bookings.get>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getBookingsQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
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

export function injectPostBookings<
  TError = Exclude<Awaited<ReturnType<typeof client.bookings.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.bookings.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.bookings.post>[0]
          options?: Parameters<typeof client.bookings.post>[1]
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
    const mutationDefaults = getPostBookingsMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}

export function getBookingsBookingIdQueryKey(params: Parameters<typeof client.bookings>[0]) {
  return ['bookings', '/bookings/{bookingId}', params] as const
}

export function getBookingsBookingIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.bookings>[0],
  options?: Parameters<ReturnType<typeof client.bookings>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getBookingsBookingIdQueryKey>
  >({
    queryKey: getBookingsBookingIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .bookings(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectBookingsBookingId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.bookings>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.bookings>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getBookingsBookingIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.bookings>['get']>[0]
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getBookingsBookingIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  }, injectOptions)
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
>(params: Parameters<typeof client.bookings>[0]) {
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
      const { data, error } = await client.bookings(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteBookingsBookingId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.bookings>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
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
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteBookingsBookingIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
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
>(params: Parameters<typeof client.bookings>[0]) {
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
      const { data, error } = await client.bookings(params).payment.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostBookingsBookingIdPayment<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.bookings>['payment']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.bookings>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
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
      'mutationFn'
    >
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostBookingsBookingIdPaymentMutationOptions<
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
