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
import type { Static } from 'elysia'
import type {
  ApiV2010AccountAddressSchema,
  ApiV2010AccountApplicationSchema,
  ApiV2010AccountAuthorizedConnectAppSchema,
  ApiV2010AccountAvailablePhoneNumberCountrySchema,
  ApiV2010AccountBalanceSchema,
  ApiV2010AccountCallCallNotificationInstanceSchema,
  ApiV2010AccountCallCallRecordingSchema,
  ApiV2010AccountCallPaymentsSchema,
  ApiV2010AccountCallRealtimeTranscriptionSchema,
  ApiV2010AccountCallSchema,
  ApiV2010AccountCallSiprecSchema,
  ApiV2010AccountCallStreamSchema,
  ApiV2010AccountCallUserDefinedMessageSchema,
  ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
  ApiV2010AccountConferenceConferenceRecordingSchema,
  ApiV2010AccountConferenceParticipantSchema,
  ApiV2010AccountConferenceSchema,
  ApiV2010AccountConnectAppSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
  ApiV2010AccountIncomingPhoneNumberSchema,
  ApiV2010AccountKeySchema,
  ApiV2010AccountMessageMediaSchema,
  ApiV2010AccountMessageMessageFeedbackSchema,
  ApiV2010AccountMessageSchema,
  ApiV2010AccountNewKeySchema,
  ApiV2010AccountNewSigningKeySchema,
  ApiV2010AccountNotificationInstanceSchema,
  ApiV2010AccountOutgoingCallerIdSchema,
  ApiV2010AccountQueueMemberSchema,
  ApiV2010AccountQueueSchema,
  ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  ApiV2010AccountRecordingRecordingAddOnResultSchema,
  ApiV2010AccountRecordingRecordingTranscriptionSchema,
  ApiV2010AccountRecordingSchema,
  ApiV2010AccountSchema,
  ApiV2010AccountShortCodeSchema,
  ApiV2010AccountSigningKeySchema,
  ApiV2010AccountSipSipCredentialListSchema,
  ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  ApiV2010AccountSipSipDomainSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipIpAccessControlListSchema,
  ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  ApiV2010AccountTokenSchema,
  ApiV2010AccountTranscriptionSchema,
  ApiV2010AccountUsageUsageTriggerSchema,
  ApiV2010AccountValidationRequestSchema,
} from '../components/schemas'
import { client, clientOrigin } from '../lib'

export function get_20100401Key() {
  return ['2010-04-01'] as const
}

export function get20100401AccountsJsonQueryKey(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts.json', keyArgs] as const
}

export function get20100401AccountsJsonQueryOptions<TData = unknown, TError = unknown>(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  return queryOptions<unknown, TError, TData, ReturnType<typeof get20100401AccountsJsonQueryKey>>({
    queryKey: get20100401AccountsJsonQueryKey(options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsJson<TData = unknown, TError = unknown>(
  options?: {
    query?: Omit<
      UseQueryOptions<unknown, TError, TData, ReturnType<typeof get20100401AccountsJsonQueryKey>>,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...get20100401AccountsJsonQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspense20100401AccountsJson<TData = unknown, TError = unknown>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...get20100401AccountsJsonQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getPost20100401AccountsJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts.json', 'POST'] as const
}

export function getPost20100401AccountsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Static<typeof ApiV2010AccountSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(`${clientOrigin}/2010-04-01/Accounts.json`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...options?.headers },
        body: body === undefined ? undefined : JSON.stringify(body),
      })
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsJson<TError = unknown, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsJsonMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsSidJsonQueryKey(params: string) {
  return ['2010-04-01', '/2010-04-01/Accounts/{Sid}.json', params] as const
}

export function get20100401AccountsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSchema>,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsSidJsonQueryKey(params),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsSidJson<
  TData = Static<typeof ApiV2010AccountSchema>,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsSidJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsSidJson<
  TData = Static<typeof ApiV2010AccountSchema>,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsSidJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsSidJson<TError = unknown, TOnMutateResult = unknown>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsSidJsonMutationOptions<TError, TOnMutateResult>(
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

export function get20100401AccountsAccountSidAddressesJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAddressesJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidAddressesJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidAddressesJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAddressesJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAddressesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAddressesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAddressesJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAddressesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAddressesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidAddressesJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Addresses.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidAddressesJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountAddressSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidAddressesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidAddressesJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountAddressSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidAddressesJsonMutationOptions<
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

export function get20100401AccountsAccountSidAddressesSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidAddressesSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountAddressSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountAddressSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidAddressesSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidAddressesSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAddressesSidJson<
  TData = Static<typeof ApiV2010AccountAddressSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountAddressSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAddressesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAddressesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAddressesSidJson<
  TData = Static<typeof ApiV2010AccountAddressSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountAddressSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAddressesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAddressesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidAddressesSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidAddressesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountAddressSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidAddressesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidAddressesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountAddressSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidAddressesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidAddressesSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json', 'DELETE'] as const
}

export function getDelete20100401AccountsAccountSidAddressesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidAddressesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidAddressesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidAddressesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidApplicationsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidApplicationsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidApplicationsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidApplicationsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidApplicationsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidApplicationsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidApplicationsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidApplicationsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidApplicationsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidApplicationsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidApplicationsJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Applications.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidApplicationsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountApplicationSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidApplicationsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidApplicationsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountApplicationSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidApplicationsJsonMutationOptions<
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

export function get20100401AccountsAccountSidApplicationsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidApplicationsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountApplicationSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountApplicationSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidApplicationsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidApplicationsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidApplicationsSidJson<
  TData = Static<typeof ApiV2010AccountApplicationSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountApplicationSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidApplicationsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidApplicationsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidApplicationsSidJson<
  TData = Static<typeof ApiV2010AccountApplicationSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountApplicationSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidApplicationsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidApplicationsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidApplicationsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidApplicationsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountApplicationSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidApplicationsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidApplicationsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountApplicationSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidApplicationsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidApplicationsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidApplicationsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidApplicationsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidApplicationsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidApplicationsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(
      params,
      params2,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AuthorizedConnectApps/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson<
  TData = Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson<
  TData = Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AuthorizedConnectApps.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAuthorizedConnectAppsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAuthorizedConnectAppsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(
      params,
      params2,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson<
  TData = Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson<
  TData = Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Local.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/MachineToMachine.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Mobile.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/National.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/SharedCost.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/TollFree.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Voip.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidBalanceJsonQueryKey(params: string) {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Balance.json', params] as const
}

export function get20100401AccountsAccountSidBalanceJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountBalanceSchema>,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountBalanceSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidBalanceJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidBalanceJsonQueryKey(params),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Balance.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidBalanceJson<
  TData = Static<typeof ApiV2010AccountBalanceSchema>,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountBalanceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidBalanceJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidBalanceJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidBalanceJson<
  TData = Static<typeof ApiV2010AccountBalanceSchema>,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountBalanceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidBalanceJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidBalanceJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls.json', params, keyArgs] as const
}

export function get20100401AccountsAccountSidCallsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidCallsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidCallsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidCallsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidCallsJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidCallsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidCallsJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidCallsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidCallsJsonMutationOptions<
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

export function get20100401AccountsAccountSidCallsSidJsonQueryKey(params: string, params2: string) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidCallsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountCallSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountCallSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidCallsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidCallsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidCallsSidJson<
  TData = Static<typeof ApiV2010AccountCallSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountCallSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidCallsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidCallsSidJson<
  TData = Static<typeof ApiV2010AccountCallSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountCallSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidCallsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidCallsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidCallsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidCallsSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json', 'DELETE'] as const
}

export function getDelete20100401AccountsAccountSidCallsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidCallsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidCallsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidCallsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidEventsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Events.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidCallsCallSidEventsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidEventsJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidCallsCallSidEventsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidEventsJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Notifications/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidCallsCallSidNotificationsSidJson<
  TData = Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidCallsCallSidNotificationsSidJson<
  TData = Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Notifications.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidCallsCallSidNotificationsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidCallsCallSidNotificationsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidCallsCallSidRecordingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidCallsCallSidRecordingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidRecordingsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidRecordingsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallCallRecordingSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidRecordingsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidRecordingsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallCallRecordingSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidRecordingsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountCallCallRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountCallCallRecordingSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidCallsCallSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountCallCallRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountCallCallRecordingSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidCallsCallSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountCallCallRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountCallCallRecordingSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallCallRecordingSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidRecordingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallCallRecordingSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConferencesSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidConferencesSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountConferenceSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountConferenceSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidConferencesSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidConferencesSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConferencesSidJson<
  TData = Static<typeof ApiV2010AccountConferenceSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountConferenceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConferencesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConferencesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConferencesSidJson<
  TData = Static<typeof ApiV2010AccountConferenceSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountConferenceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConferencesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConferencesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidConferencesSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidConferencesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountConferenceSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidConferencesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidConferencesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountConferenceSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidConferencesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConferencesJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConferencesJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidConferencesJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidConferencesJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConferencesJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConferencesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConferencesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConferencesJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConferencesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConferencesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConferencesConferenceSidRecordingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConferencesConferenceSidRecordingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConnectAppsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidConnectAppsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountConnectAppSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountConnectAppSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidConnectAppsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidConnectAppsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConnectAppsSidJson<
  TData = Static<typeof ApiV2010AccountConnectAppSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountConnectAppSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConnectAppsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConnectAppsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConnectAppsSidJson<
  TData = Static<typeof ApiV2010AccountConnectAppSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountConnectAppSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConnectAppsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConnectAppsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidConnectAppsSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidConnectAppsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountConnectAppSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidConnectAppsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidConnectAppsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountConnectAppSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidConnectAppsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidConnectAppsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidConnectAppsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidConnectAppsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidConnectAppsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidConnectAppsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConnectAppsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConnectAppsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidConnectAppsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidConnectAppsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConnectAppsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConnectAppsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConnectAppsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConnectAppsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidConnectAppsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConnectAppsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}/DependentPhoneNumbers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersSidJson<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersSidJson<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidIncomingPhoneNumbersJsonMutationOptions<
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

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
  params4: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json',
    params,
    params2,
    params3,
    params4,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryOptions<
  TData = Static<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<
      typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
    >,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
        params,
        params2,
        params3,
        params4,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}/Extensions/${encodeURIComponent(params4)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson<
  TData = Static<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<
          typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, params4, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson<
  TData = Static<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<
          typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, params4, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}/Extensions.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Local.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersLocalJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersLocalJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Local.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersLocalJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonMutationOptions<
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

export function get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Mobile.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersMobileJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersMobileJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Mobile.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersMobileJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonMutationOptions<
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

export function get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(
      params,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/TollFree.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/TollFree.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonMutationOptions<
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

export function get20100401AccountsAccountSidKeysSidJsonQueryKey(params: string, params2: string) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidKeysSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountKeySchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountKeySchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidKeysSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidKeysSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidKeysSidJson<
  TData = Static<typeof ApiV2010AccountKeySchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountKeySchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidKeysSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidKeysSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidKeysSidJson<
  TData = Static<typeof ApiV2010AccountKeySchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountKeySchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidKeysSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidKeysSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidKeysSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidKeysSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidKeysSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountKeySchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidKeysSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidKeysSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json', 'DELETE'] as const
}

export function getDelete20100401AccountsAccountSidKeysSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidKeysSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidKeysSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidKeysJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys.json', params, keyArgs] as const
}

export function get20100401AccountsAccountSidKeysJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidKeysJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidKeysJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidKeysJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidKeysJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidKeysJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidKeysJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidKeysJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidKeysJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidKeysJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidKeysJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountNewKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidKeysJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidKeysJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountNewKeySchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidKeysJsonMutationOptions<
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

export function get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountMessageMediaSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountMessageMediaSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidMessagesMessageSidMediaSidJson<
  TData = Static<typeof ApiV2010AccountMessageMediaSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountMessageMediaSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidMessagesMessageSidMediaSidJson<
  TData = Static<typeof ApiV2010AccountMessageMediaSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountMessageMediaSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidMessagesMessageSidMediaJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidMessagesMessageSidMediaJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountQueueMemberSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountQueueMemberSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson<
  TData = Static<typeof ApiV2010AccountQueueMemberSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountQueueMemberSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson<
  TData = Static<typeof ApiV2010AccountQueueMemberSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountQueueMemberSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        params3,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountQueueMemberSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountQueueMemberSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidQueuesQueueSidMembersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidQueuesQueueSidMembersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidMessagesJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages.json', params, keyArgs] as const
}

export function get20100401AccountsAccountSidMessagesJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidMessagesJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidMessagesJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidMessagesJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidMessagesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidMessagesJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidMessagesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidMessagesJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidMessagesJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountMessageSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidMessagesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidMessagesJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountMessageSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidMessagesJsonMutationOptions<
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

export function get20100401AccountsAccountSidMessagesSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidMessagesSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountMessageSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountMessageSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidMessagesSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidMessagesSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidMessagesSidJson<
  TData = Static<typeof ApiV2010AccountMessageSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountMessageSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidMessagesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidMessagesSidJson<
  TData = Static<typeof ApiV2010AccountMessageSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountMessageSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidMessagesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidMessagesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidMessagesSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidMessagesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountMessageSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidMessagesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidMessagesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountMessageSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidMessagesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidMessagesSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json', 'DELETE'] as const
}

export function getDelete20100401AccountsAccountSidMessagesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidMessagesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidMessagesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidMessagesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidMessagesMessageSidFeedbackJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidMessagesMessageSidFeedbackJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountMessageMessageFeedbackSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidMessagesMessageSidFeedbackJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Feedback.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidMessagesMessageSidFeedbackJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountMessageMessageFeedbackSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidMessagesMessageSidFeedbackJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSigningKeysJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSigningKeysJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSigningKeysJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSigningKeysJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSigningKeysJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSigningKeysJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSigningKeysJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSigningKeysJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSigningKeysJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSigningKeysJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSigningKeysJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SigningKeys.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidSigningKeysJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountNewSigningKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSigningKeysJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSigningKeysJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountNewSigningKeySchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidSigningKeysJsonMutationOptions<
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

export function get20100401AccountsAccountSidNotificationsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidNotificationsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountNotificationInstanceSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountNotificationInstanceSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidNotificationsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidNotificationsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Notifications/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidNotificationsSidJson<
  TData = Static<typeof ApiV2010AccountNotificationInstanceSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountNotificationInstanceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidNotificationsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidNotificationsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidNotificationsSidJson<
  TData = Static<typeof ApiV2010AccountNotificationInstanceSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountNotificationInstanceSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidNotificationsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidNotificationsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidNotificationsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Notifications.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidNotificationsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidNotificationsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidNotificationsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Notifications.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidNotificationsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidNotificationsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidNotificationsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidNotificationsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidNotificationsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidNotificationsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidOutgoingCallerIdsSidJson<
  TData = Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidOutgoingCallerIdsSidJson<
  TData = Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidOutgoingCallerIdsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidOutgoingCallerIdsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidOutgoingCallerIdsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidOutgoingCallerIdsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidOutgoingCallerIdsJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidOutgoingCallerIdsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountValidationRequestSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidOutgoingCallerIdsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidOutgoingCallerIdsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountValidationRequestSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidOutgoingCallerIdsJsonMutationOptions<
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

export function get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountConferenceParticipantSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountConferenceParticipantSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TData = Static<typeof ApiV2010AccountConferenceParticipantSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountConferenceParticipantSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TData = Static<typeof ApiV2010AccountConferenceParticipantSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountConferenceParticipantSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountConferenceParticipantSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountConferenceParticipantSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidConferencesConferenceSidParticipantsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidConferencesConferenceSidParticipantsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountConferenceParticipantSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidConferencesConferenceSidParticipantsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountConferenceParticipantSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidPaymentsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidPaymentsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallPaymentsSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidPaymentsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Payments.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidPaymentsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallPaymentsSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidCallsCallSidPaymentsJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidPaymentsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidPaymentsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallPaymentsSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidPaymentsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Payments/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidPaymentsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallPaymentsSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidPaymentsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidQueuesSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidQueuesSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountQueueSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountQueueSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidQueuesSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidQueuesSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidQueuesSidJson<
  TData = Static<typeof ApiV2010AccountQueueSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountQueueSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidQueuesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidQueuesSidJson<
  TData = Static<typeof ApiV2010AccountQueueSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountQueueSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidQueuesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidQueuesSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidQueuesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountQueueSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidQueuesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidQueuesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountQueueSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidQueuesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidQueuesSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json', 'DELETE'] as const
}

export function getDelete20100401AccountsAccountSidQueuesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidQueuesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidQueuesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidQueuesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidQueuesJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues.json', params, keyArgs] as const
}

export function get20100401AccountsAccountSidQueuesJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidQueuesJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidQueuesJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidQueuesJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidQueuesJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidQueuesJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidQueuesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidQueuesJsonQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidQueuesJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidQueuesJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountQueueSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidQueuesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidQueuesJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountQueueSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidQueuesJsonMutationOptions<
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

export function getPost20100401AccountsAccountSidCallsCallSidTranscriptionsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidTranscriptionsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidTranscriptionsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Transcriptions.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidTranscriptionsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidTranscriptionsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Transcriptions/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsSidJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountRecordingSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidRecordingsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidRecordingsSidJsonQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountRecordingSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidRecordingsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountRecordingSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidRecordingsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidRecordingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidRecordingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidRecordingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidRecordingsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidRecordingsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidRecordingsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidRecordingsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidRecordingsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
  params4: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json',
    params,
    params2,
    params3,
    params4,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryOptions<
  TData = Static<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
        params,
        params2,
        params3,
        params4,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson<
  TData = Static<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<
          typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, params4, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson<
  TData = Static<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<
          typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, params4, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string, params4: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3, params4)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
  params4: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json',
    params,
    params2,
    params3,
    params4,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryOptions<
  TData = void,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    void,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
        params,
        params2,
        params3,
        params4,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}/Data.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson<
  TData = void,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        void,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, params4, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson<
  TData = void,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        void,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, params4, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidSMSShortCodesSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountShortCodeSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountShortCodeSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSMSShortCodesSidJson<
  TData = Static<typeof ApiV2010AccountShortCodeSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountShortCodeSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSMSShortCodesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSMSShortCodesSidJson<
  TData = Static<typeof ApiV2010AccountShortCodeSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountShortCodeSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSMSShortCodesSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSMSShortCodesSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSMSShortCodesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountShortCodeSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSMSShortCodesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSMSShortCodesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountShortCodeSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidSMSShortCodesSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSMSShortCodesJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSMSShortCodesJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSMSShortCodesJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSMSShortCodesJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSMSShortCodesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSMSShortCodesJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSMSShortCodesJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSigningKeysSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidSigningKeysSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSigningKeySchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountSigningKeySchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSigningKeysSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSigningKeysSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSigningKeysSidJson<
  TData = Static<typeof ApiV2010AccountSigningKeySchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSigningKeySchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSigningKeysSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSigningKeysSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSigningKeysSidJson<
  TData = Static<typeof ApiV2010AccountSigningKeySchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSigningKeySchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSigningKeysSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSigningKeysSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSigningKeysSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidSigningKeysSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSigningKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSigningKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSigningKeysSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSigningKeySchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidSigningKeysSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSigningKeysSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSigningKeysSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSigningKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSigningKeysSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidSigningKeysSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<
      typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
    >,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
        >,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryOptions<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<
      typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
    >,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<
      typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
    >,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
        >,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryOptions<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<
      typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
    >,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<
      typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
    >,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
        >,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryOptions<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<
      typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
    >,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<
          typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
        >,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPCredentialListsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPCredentialListsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPCredentialListsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPCredentialListsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPCredentialListsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPCredentialListsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidSIPCredentialListsJsonMutationOptions<
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

export function get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPCredentialListsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPCredentialListsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPCredentialListsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPCredentialListsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPCredentialListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPCredentialListsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPCredentialListsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPCredentialListsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPCredentialListsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSIPCredentialListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPCredentialListsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPCredentialListsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey
    >
  >({
    queryKey: get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSIPDomainsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSIPDomainsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPDomainsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPDomainsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPDomainsJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidSIPDomainsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipDomainSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPDomainsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPDomainsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipDomainSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidSIPDomainsJsonMutationOptions<
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

export function get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSipSipDomainSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountSipSipDomainSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSipSipDomainSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSipSipDomainSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPDomainsSidJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidSIPDomainsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipDomainSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPDomainsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPDomainsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipDomainSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidSIPDomainsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPDomainsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPDomainsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSIPDomainsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPDomainsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidSIPDomainsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPIpAccessControlListsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPIpAccessControlListsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPIpAccessControlListsJsonMutationOptions<
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

export function get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPIpAccessControlListsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
        params,
        params2,
        options,
      ),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryOptions<
        TData,
        TError
      >(params, params2, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string> },
) {
  return queryOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
    TError,
    TData,
    ReturnType<
      typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey
    >
  >({
    queryKey:
      get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses/${encodeURIComponent(params3)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
        TError,
        TData,
        ReturnType<
          typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryOptions<
        TData,
        TError
      >(params, params2, params3, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidSiprecJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidSiprecJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSiprecSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidSiprecJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Siprec.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidSiprecJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallSiprecSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidCallsCallSidSiprecJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidSiprecSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidSiprecSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSiprecSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidSiprecSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Siprec/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidSiprecSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallSiprecSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidSiprecSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidStreamsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidStreamsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallStreamSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidStreamsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Streams.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidStreamsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallStreamSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidCallsCallSidStreamsJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidStreamsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidStreamsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallStreamSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidStreamsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Streams/${encodeURIComponent(params3)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidStreamsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallStreamSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidStreamsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidTokensJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Tokens.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidTokensJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountTokenSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidTokensJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Tokens.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidTokensJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountTokenSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidTokensJsonMutationOptions<
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

export function get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidTranscriptionsSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountTranscriptionSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountTranscriptionSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidTranscriptionsSidJson<
  TData = Static<typeof ApiV2010AccountTranscriptionSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountTranscriptionSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidTranscriptionsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidTranscriptionsSidJson<
  TData = Static<typeof ApiV2010AccountTranscriptionSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountTranscriptionSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidTranscriptionsSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidTranscriptionsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidTranscriptionsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidTranscriptionsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidTranscriptionsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidTranscriptionsSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidTranscriptionsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidTranscriptionsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidTranscriptionsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidTranscriptionsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidTranscriptionsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidTranscriptionsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidTranscriptionsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidTranscriptionsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidTranscriptionsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidTranscriptionsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/AllTime.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsAllTimeJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsAllTimeJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsDailyJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Daily.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsDailyJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsDailyJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsDailyJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsDailyJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/LastMonth.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsLastMonthJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsLastMonthJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Monthly.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsMonthlyJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsMonthlyJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/ThisMonth.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsThisMonthJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsThisMonthJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsTodayJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Today.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsTodayJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsTodayJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsTodayJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsTodayJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Yearly.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsYearlyJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsYearlyJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Yesterday.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageRecordsYesterdayJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageRecordsYesterdayJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
    params,
    params2,
  ] as const
}

export function get20100401AccountsAccountSidUsageTriggersSidJsonQueryOptions<
  TData = Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
  TError = unknown,
>(params: string, params2: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers/${encodeURIComponent(params2)}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageTriggersSidJson<
  TData = Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageTriggersSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageTriggersSidJson<
  TData = Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageTriggersSidJsonQueryOptions<TData, TError>(
        params,
        params2,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidUsageTriggersSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidUsageTriggersSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidUsageTriggersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers/${encodeURIComponent(params2)}.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidUsageTriggersSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidUsageTriggersSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidUsageTriggersSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidUsageTriggersSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidUsageTriggersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers/${encodeURIComponent(params2)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidUsageTriggersSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDelete20100401AccountsAccountSidUsageTriggersSidJsonMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageTriggersJsonQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json',
    params,
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageTriggersJsonQueryOptions<
  TData = unknown,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    unknown,
    TError,
    TData,
    ReturnType<typeof get20100401AccountsAccountSidUsageTriggersJsonQueryKey>
  >({
    queryKey: get20100401AccountsAccountSidUsageTriggersJsonQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
        if (v === undefined) continue
        if (Array.isArray(v)) {
          for (const x of v) {
            search.append(k, String(x))
          }
        } else {
          search.set(k, String(v))
        }
      }
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function use20100401AccountsAccountSidUsageTriggersJson<TData = unknown, TError = unknown>(
  params: string,
  options?: {
    query?: Omit<
      UseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageTriggersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...get20100401AccountsAccountSidUsageTriggersJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspense20100401AccountsAccountSidUsageTriggersJson<
  TData = unknown,
  TError = unknown,
>(
  params: string,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        unknown,
        TError,
        TData,
        ReturnType<typeof get20100401AccountsAccountSidUsageTriggersJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...get20100401AccountsAccountSidUsageTriggersJsonQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidUsageTriggersJsonMutationKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json', 'POST'] as const
}

export function getPost20100401AccountsAccountSidUsageTriggersJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidUsageTriggersJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidUsageTriggersJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPost20100401AccountsAccountSidUsageTriggersJsonMutationOptions<
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

export function getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallUserDefinedMessageSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/UserDefinedMessages.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallUserDefinedMessageSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json',
    'POST',
  ] as const
}

export function getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/UserDefinedMessageSubscriptions.json`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonMutationKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json',
    'DELETE',
  ] as const
}

export function getDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: string, params2: string, params3: string) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey:
      getDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/UserDefinedMessageSubscriptions/${encodeURIComponent(params3)}.json`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson<
  TError = unknown,
  TOnMutateResult = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
